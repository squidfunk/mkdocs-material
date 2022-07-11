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
  bufferCount,
  combineLatest,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  endWith,
  finalize,
  map,
  repeat,
  skip,
  takeLast,
  takeUntil,
  tap
} from "rxjs"

import { Viewport } from "~/browser"

import { Component } from "../_"
import { Header } from "../header"
import { Main } from "../main"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Back-to-top button
 */
export interface BackToTop {
  hidden: boolean                      /* Back-to-top button is hidden */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Watch options
 */
interface WatchOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
  main$: Observable<Main>              /* Main area observable */
  target$: Observable<HTMLElement>     /* Location target observable */
}

/**
 * Mount options
 */
interface MountOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
  header$: Observable<Header>          /* Header observable */
  main$: Observable<Main>              /* Main area observable */
  target$: Observable<HTMLElement>     /* Location target observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch back-to-top
 *
 * @param _el - Back-to-top element
 * @param options - Options
 *
 * @returns Back-to-top observable
 */
export function watchBackToTop(
  _el: HTMLElement, { viewport$, main$, target$ }: WatchOptions
): Observable<BackToTop> {

  /* Compute direction */
  const direction$ = viewport$
    .pipe(
      map(({ offset: { y } }) => y),
      bufferCount(2, 1),
      map(([a, b]) => a > b && b > 0),
      distinctUntilChanged()
    )

  /* Compute whether main area is active */
  const active$ = main$
    .pipe(
      map(({ active }) => active)
    )

  /* Compute threshold for hiding */
  return combineLatest([active$, direction$])
    .pipe(
      map(([active, direction]) => !(active && direction)),
      distinctUntilChanged(),
      takeUntil(target$.pipe(skip(1))),
      endWith(true),
      repeat({ delay: 250 }),
      map(hidden => ({ hidden }))
    )
}

/* ------------------------------------------------------------------------- */

/**
 * Mount back-to-top
 *
 * @param el - Back-to-top element
 * @param options - Options
 *
 * @returns Back-to-top component observable
 */
export function mountBackToTop(
  el: HTMLElement, { viewport$, header$, main$, target$ }: MountOptions
): Observable<Component<BackToTop>> {
  const push$ = new Subject<BackToTop>()
  const done$ = push$.pipe(takeLast(1))
  push$.subscribe({

    /* Handle emission */
    next({ hidden }) {
      el.hidden = hidden
      if (hidden) {
        el.setAttribute("tabindex", "-1")
        el.blur()
      } else {
        el.removeAttribute("tabindex")
      }
    },

    /* Handle complete */
    complete() {
      el.style.top = ""
      el.hidden = true
      el.removeAttribute("tabindex")
    }
  })

  /* Watch header height */
  header$
    .pipe(
      takeUntil(done$),
      distinctUntilKeyChanged("height")
    )
      .subscribe(({ height }) => {
        el.style.top = `${height + 16}px`
      })

  /* Create and return component */
  return watchBackToTop(el, { viewport$, main$, target$ })
    .pipe(
      tap(state => push$.next(state)),
      finalize(() => push$.complete()),
      map(state => ({ ref: el, ...state }))
    )
}
