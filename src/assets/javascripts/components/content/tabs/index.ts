/*
 * Copyright (c) 2016-2022 Martin Donath <martin.donath@squidfunk.com>
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

import {
  Observable,
  Subject,
  animationFrameScheduler,
  auditTime,
  combineLatest,
  defer,
  finalize,
  fromEvent,
  map,
  mapTo,
  merge,
  startWith,
  takeLast,
  takeUntil,
  tap
} from "rxjs"

import {
  getElement,
  getElementOffset,
  getElementSize,
  getElements,
  watchElementSize
} from "~/browser"

import { Component } from "../../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Content tabs
 */
export interface ContentTabs {
  active: HTMLLabelElement             /* Active tab label */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch content tabs
 *
 * @param el - Content tabs element
 *
 * @returns Content tabs observable
 */
export function watchContentTabs(
  el: HTMLElement
): Observable<ContentTabs> {
  const inputs = getElements(":scope > input", el)
  return merge(...inputs.map(input => fromEvent(input, "change")
    .pipe(
      mapTo<ContentTabs>({
        active: getElement(`label[for=${input.id}]`)
      })
    )
  ))
    .pipe(
      startWith({
        active: getElement(`label[for=${inputs[0].id}]`)
      } as ContentTabs)
    )
}

/**
 * Mount content tabs
 *
 * This function scrolls the active tab into view. While this functionality is
 * provided by browsers as part of `scrollInfoView`, browsers will always also
 * scroll the vertical axis, which we do not want. Thus, we decided to provide
 * this functionality ourselves.
 *
 * @param el - Content tabs element
 *
 * @returns Content tabs component observable
 */
export function mountContentTabs(
  el: HTMLElement
): Observable<Component<ContentTabs>> {
  const container = getElement(".tabbed-labels", el)
  return defer(() => {
    const push$ = new Subject<ContentTabs>()
    combineLatest([push$, watchElementSize(el)])
      .pipe(
        auditTime(1, animationFrameScheduler),
        takeUntil(push$.pipe(takeLast(1)))
      )
        .subscribe({

          /* Handle emission */
          next([{ active }]) {
            const offset = getElementOffset(active)
            const { width } = getElementSize(active)

            /* Set tab indicator offset and width */
            el.style.setProperty("--md-indicator-x", `${offset.x}px`)
            el.style.setProperty("--md-indicator-width", `${width}px`)

            /* Smoothly scroll container */
            container.scrollTo({
              behavior: "smooth",
              left: offset.x
            })
          },

          /* Handle complete */
          complete() {
            el.style.removeProperty("--md-indicator-x")
            el.style.removeProperty("--md-indicator-width")
          }
        })

    /* Create and return component */
    return watchContentTabs(el)
      .pipe(
        tap(state => push$.next(state)),
        finalize(() => push$.complete()),
        map(state => ({ ref: el, ...state }))
      )
  })
}
