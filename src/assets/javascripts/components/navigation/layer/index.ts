/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

import { findLast } from "ramda"
import {
  MonoTypeOperatorFunction,
  Observable,
  animationFrameScheduler,
  fromEvent,
  merge,
  pipe
} from "rxjs"
import {
  bufferCount,
  delay,
  map,
  observeOn,
  shareReplay,
  tap
} from "rxjs/operators"

import {
  resetOverflowScrolling,
  setOverflowScrolling
} from "actions"
import { getElement, getElements } from "utilities"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Active layer
 */
export interface ActiveLayer {
  prev?: HTMLElement                   /* Anchors (previous) */
  next: HTMLElement                    /* Anchors (next) */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch active layer
 *
 * On iOS we want to add `-webkit-overflow-scrolling: touch` for the menus
 * contained in the drawer, but as the navigational layers are nested, we can
 * only add it to the active layer because otherwise weird stuff will happen.
 * This implementation keeps track of the previous and currently active layer.
 *
 * @param el - Navigation element (top-level)
 *
 * @return Active layer observable
 */
export function watchActiveLayer(
  el: HTMLElement
): Observable<ActiveLayer> {
  const table = new Map<HTMLInputElement, HTMLElement>()
  for (const nav of getElements("nav", el)) {
    const label = getElement<HTMLLabelElement>("label", nav)
    if (typeof label !== "undefined") {
      const input = getElement<HTMLInputElement>(`#${label.htmlFor}`)!
      table.set(input, nav)
    }
  }

  /* Determine active layer */
  const active$ = merge(
    ...[...table.keys()].map(input => fromEvent(input, "change"))
  )
    .pipe(
      map(() => getElement(".md-nav__list", table.get(
        findLast(({ checked }) => checked, [...table.keys()])!
      ))!)
    )

  /* Return previous and next layer */
  return active$
    .pipe(
      // TODO: this doesnt emit correctly
      bufferCount(2, 1),
      map(([prev, next]) => ({ prev, next })),
      shareReplay(1)
    )
}

/* ------------------------------------------------------------------------- */

/**
 * Paint active layer from source observable
 *
 * @param els - Anchor elements
 *
 * @return Operator function
 */
export function paintActiveLayer(): MonoTypeOperatorFunction<ActiveLayer> {
  return pipe(

    /* Unset overflow scrolling on previous layer */
    observeOn(animationFrameScheduler),
    tap(({ prev }) => {
      if (prev) resetOverflowScrolling(prev)
    }),

    /* Wait until transition has finished */
    delay(250),

    /* Set overflow scrolling on next layer */
    observeOn(animationFrameScheduler),
    tap(({ next }) => {
      setOverflowScrolling(next)
    })
  )
}
