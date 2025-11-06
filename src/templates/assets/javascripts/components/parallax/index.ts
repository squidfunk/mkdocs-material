/*
 * Copyright (c) 2016-2025 Martin Donath <martin.donath@squidfunk.com>
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
  combineLatest,
  defer,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  merge,
  take,
  tap
} from "rxjs"

import {
  getElement,
  getElements,
  watchElementContentOffset,
  watchElementOffset,
  watchElementVisibility
} from "~/browser"

import {
  Component,
  getComponentElement
} from "../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Parallax
 */
export interface Parallax {
  active: HTMLElement                  /* Active parallax element */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch parallax
 *
 * @param el - Parallax element
 *
 * @returns Parallax observable
 */
export function watchParallax(
  el: HTMLElement
): Observable<Parallax> {
  return merge(
    ...getElements(":scope [hidden]", el)
      .map(child => watchElementVisibility(child)
        .pipe(
          filter(visible => visible),
          take(1),
          map(() => ({ active: child }))
        )
      )
  )
}

/**
 * Mount parallax
 *
 * @param el - Parallax element
 *
 * @returns Parallax component observable
 */
export function mountParallax(
  el: HTMLElement
): Observable<Component<Parallax>> {
  return defer(() => {
    const push$ = new Subject<Parallax>()
    push$.subscribe(({ active }) => {
      active.hidden = false
    })

    /* Hack: immediately hide hero on Firefox due to rendering bugs. */
    if (navigator.userAgent.includes("Gecko/"))
      watchElementContentOffset(el)
        .pipe(
          map(({ y }) => y > 1),
          distinctUntilChanged()
        )
          .subscribe(hidden => {
            const hero = getComponentElement("hero")
            hero.hidden = hidden
          })

    /* Another hack: reset containment to mitigate #8462 */
    if (navigator.userAgent.includes("Gecko/"))
      watchElementContentOffset(el)
        .pipe(
          map(({ y }) => y > 3000),
          distinctUntilChanged()
        )
          .subscribe(active => {
            document.body.classList.toggle("ff-hack", !active)
          })

    /* Reveal header when scrolling past second group */
    const group = getElement(":scope > :nth-child(2)", el)
    combineLatest([
      watchElementContentOffset(el),
      watchElementOffset(group)
    ])
      .subscribe(([{ y }, offset]) => {
        const header = getElement("header")
        header.classList.toggle("md-header--shadow", y > offset.y)
      })

    /* Create and return component */
    return watchParallax(el)
      .pipe(
        tap(state => push$.next(state)),
        finalize(() => push$.complete()),
        map(state => ({ ref: el, ...state }))
      )
  })
}
