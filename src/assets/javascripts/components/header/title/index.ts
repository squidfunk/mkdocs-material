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
  NEVER,
  Observable,
  Subject,
  animationFrameScheduler
} from "rxjs"
import {
  distinctUntilKeyChanged,
  finalize,
  map,
  observeOn,
  tap
} from "rxjs/operators"

import {
  resetHeaderTitleState,
  setHeaderTitleState
} from "~/actions"
import {
  Viewport,
  getElement,
  getElementSize,
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
  active: boolean                      /* User scrolled past first headline */
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
  el: HTMLHeadingElement, { viewport$, header$ }: WatchOptions
): Observable<HeaderTitle> {
  return watchViewportAt(el, { header$, viewport$ })
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
  const internal$ = new Subject<HeaderTitle>()
  internal$
    .pipe(
      observeOn(animationFrameScheduler)
    )
      .subscribe(({ active }) => {
        if (active)
          setHeaderTitleState(el, "active")
        else
          resetHeaderTitleState(el)
      })

  /* Obtain headline, if any */
  const headline = getElement<HTMLHeadingElement>("article h1")
  if (typeof headline === "undefined")
    return NEVER

  /* Create and return component */
  return watchHeaderTitle(headline, options)
    .pipe(
      tap(internal$),
      finalize(() => internal$.complete()),
      map(state => ({ ref: el, ...state }))
    )
}
