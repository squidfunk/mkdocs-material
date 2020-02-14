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
  delay,
  finalize,
  map,
  observeOn,
  scan,
  shareReplay,
  tap
} from "rxjs/operators"

import {
  resetOverflowScrolling,
  setOverflowScrolling
} from "actions"

import {
  getElement,
  getElementOrThrow
} from "../../agent"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Navigation layer
 */
export interface NavigationLayer {
  prev?: HTMLElement                   /* Layer (previous) */
  next: HTMLElement                    /* Layer (next) */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch navigation layer
 *
 * On iOS we want to add `-webkit-overflow-scrolling: touch` for the menus
 * contained in the drawer, but as the navigational layers are nested, we can
 * only add it to the topmost layer or extremely weird cropping will occur.
 * This implementation keeps track of the previous and current layer.
 *
 * @param els - Navigation elements
 *
 * @return Navigation layer observable
 */
export function watchNavigationLayer(
  els: HTMLElement[]
): Observable<NavigationLayer> {
  const table = new Map<HTMLInputElement, HTMLElement>()
  for (const el of els) {
    const label = getElement<HTMLLabelElement>("label", el)
    if (typeof label !== "undefined") {
      const input = getElementOrThrow<HTMLInputElement>(`#${label.htmlFor}`)
      table.set(input, el)
    }
  }

  /* Determine topmost layer */
  const layer$ = merge(
    ...[...table.keys()].map(input => fromEvent(input, "change"))
  )
    .pipe(
      map(() => getElementOrThrow(".md-nav__list", table.get(
        findLast(({ checked }) => checked, [...table.keys()])!
      )))
    )

  /* Return previous and next layer */
  return layer$
    .pipe(
      map(next => ({ next })),
      scan(({ next: prev }, { next }) => ({ prev, next })),
      shareReplay(1)
    )
}

/* ------------------------------------------------------------------------- */

/**
 * Paint navigation layer from source observable
 *
 * @param els - Navigation elements
 *
 * @return Operator function
 */
export function paintNavigationLayer(
  els: HTMLElement[]
): MonoTypeOperatorFunction<NavigationLayer> {
  return pipe(

    /* Defer repaint to next animation frame */
    observeOn(animationFrameScheduler),
    tap(({ prev }) => {
      if (prev)
        resetOverflowScrolling(prev)
    }),

    /* Wait until transition has finished */
    delay(250),

    /* Defer repaint to next animation frame */
    observeOn(animationFrameScheduler),
    tap(({ next }) => {
      setOverflowScrolling(next)
    }),

    /* Reset on complete or error */
    finalize(() => {
      for (const el of els)
        resetOverflowScrolling(
          getElementOrThrow(".md-nav__list", el)
        )
    })
  )
}
