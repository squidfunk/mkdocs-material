/*
 * Copyright (c) 2016-2021 Martin Donath <martin.donath@squidfunk.com>
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
  defer,
  finalize,
  fromEvent,
  map,
  mapTo,
  merge,
  tap
} from "rxjs"

import {
  getElement,
  getElementOffset,
  getElements
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
  return merge(...getElements(":scope > input", el)
    .map(input => fromEvent(input, "change")
      .pipe(
        mapTo<ContentTabs>({
          active: getElement(`label[for=${input.id}]`)
        })
      )
    )
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
    push$.subscribe(({ active }) => {
      const { x } = getElementOffset(active)
      container.scrollTo({
        behavior: "smooth",
        left: x
      })
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
