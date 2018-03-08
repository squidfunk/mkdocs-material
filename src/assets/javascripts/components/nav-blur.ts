/*
 * Copyright (c) 2016-2018 Martin Donath <martin.donath@squidfunk.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

import { Observable } from "rxjs/Observable"

import "rxjs/add/observable/empty"
import "rxjs/add/observable/of"
import "rxjs/add/operator/switchMap"

import {
  Component,
  ComponentState,
  create,
  destroy
} from "../base/component"
import * as viewport from "../device/viewport"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Component state
 */
export interface NavBlurState extends ComponentState {
  anchors: HTMLAnchorElement[]         /* Anchor elements */
  targets: HTMLElement[]               /* Target elements */
  index: number                        /* Current index */
  offset: number                       /* Current offset */
  direction: boolean                   /* Current scroll direction */
}

/**
 * Component value
 */
export interface NavBlur {
  anchor: HTMLAnchorElement            /* Active anchor */
  target: HTMLElement                  /* Active target */
}

/* ----------------------------------------------------------------------------
 * Values
 * ------------------------------------------------------------------------- */

/**
 * Initial values for component state
 */
export const initial: NavBlurState = {
  active: false,                       /* Whether the component is active */
  anchors: [],                         /* Anchor elements */
  targets: [],                         /* Target elements */
  index: 0,                            /* Current index */
  offset: 0,                           /* Current offset */
  direction: false                     /* Current scroll direction */
}

/* ----------------------------------------------------------------------------
 * Lifecycle hooks
 * ------------------------------------------------------------------------- */

/**
 * Blur links within the table of contents above current page y-offset
 *
 * @param state - Component state
 *
 * @return Altered state
 */
export function update(state: NavBlurState) {
  const { anchors, targets } = state
  return viewport.offset()
    .switchMap(({ y }) => {
      const direction = (state.offset - y < 0)
      const index = state.index

      /* Exit when there are no anchors/targets */
      if (targets.length === 0)
        return Observable.empty<NavBlur>()

      /* Hack: reset index if direction changed to catch very fast scrolling,
         because otherwise we would have to register a timer and that sucks */
      if (state.direction !== direction)
        state.index = direction
          ? state.index = 0
          : state.index = anchors.length - 1

      /* Scroll direction is down */
      if (state.offset <= y) {
        for (let i = state.index + 1; i < anchors.length; i++) {
          if (targets[i].offsetTop - (56 + 24) <= y) {                          // TODO: Refactor value determination
            if (i > 0)
              anchors[i - 1].dataset.mdState = "blur"
            state.index = i
          } else {
            break
          }
        }

      /* Scroll direction is up */
      } else {
        for (let i = state.index; i >= 0; i--) {
          if (targets[i].offsetTop - (56 + 24) > y) {
            if (i > 0)
              anchors[i - 1].dataset.mdState = ""
          } else {
            state.index = i
            break
          }
        }
      }

      /* Remember current offset and direction for next iteration */
      state.offset = y
      state.direction = direction

      /* Emit current anchor and target if index changed */
      return state.index !== index
        ? Observable.of<NavBlur>({
          anchor: anchors[state.index],
          target: targets[state.index]
        })
        : Observable.empty<NavBlur>()
    })
}

/**
 * Component factory method
 *
 * @param els - Anchor elements
 *
 * @return Component
 */
export function factory(
  els: ArrayLike<HTMLAnchorElement>
): Component<NavBlurState, NavBlur> {
  const anchors = Array.from(els)
  const targets: HTMLElement[] = anchors.reduce((result, anchor) => [
    ...result, document.getElementById(anchor.hash.substring(1)) || []
  ], [])
  return {
    initial: { ...initial, anchors, targets }, create, destroy, update
  }
}
