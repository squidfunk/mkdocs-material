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
  EMPTY,
  Observable,
  Subject,
  defer,
  distinctUntilKeyChanged,
  finalize,
  map,
  tap
} from "rxjs"

import {
  Viewport,
  getElementSize,
  getOptionalElement,
  watchViewportAt
} from "~/browser"

import { Component } from "../../_"
import { Header } from "../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Header
 */
export interface HeaderTitle {
  active: boolean                      /* Header title is active */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Watch options
 */
interface WatchOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
  header$: Observable<Header>          /* Header observable */
}

/**
 * Mount options
 */
interface MountOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
  header$: Observable<Header>          /* Header observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch header title
 *
 * @param el - Heading element
 * @param options - Options
 *
 * @returns Header title observable
 */
export function watchHeaderTitle(
  el: HTMLElement, { viewport$, header$ }: WatchOptions
): Observable<HeaderTitle> {
  return watchViewportAt(el, { viewport$, header$ })
    .pipe(
      map(({ offset: { y } }) => {
        const { height } = getElementSize(el)
        return {
          active: y >= height
        }
      }),
      distinctUntilKeyChanged("active")
    )
}

/**
 * Mount header title
 *
 * This function swaps the header title from the site title to the title of the
 * current page when the user scrolls past the first headline.
 *
 * @param el - Header title element
 * @param options - Options
 *
 * @returns Header title component observable
 */
export function mountHeaderTitle(
  el: HTMLElement, options: MountOptions
): Observable<Component<HeaderTitle>> {
  return defer(() => {
    const push$ = new Subject<HeaderTitle>()
    push$.subscribe(({ active }) => {
      if (active)
        el.setAttribute("data-md-state", "active")
      else
        el.removeAttribute("data-md-state")
    })

    /* Obtain headline, if any */
    const heading = getOptionalElement("article h1")
    if (typeof heading === "undefined")
      return EMPTY

    /* Create and return component */
    return watchHeaderTitle(heading, options)
      .pipe(
        tap(state => push$.next(state)),
        finalize(() => push$.complete()),
        map(state => ({ ref: el, ...state }))
      )
  })
}
