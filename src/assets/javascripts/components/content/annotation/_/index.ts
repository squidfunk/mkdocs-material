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
  animationFrameScheduler,
  combineLatest,
  defer,
  finalize,
  fromEvent,
  map,
  switchMap,
  take,
  tap,
  throttleTime
} from "rxjs"

import {
  ElementOffset,
  getElement,
  getElementSize,
  watchElementContentOffset,
  watchElementFocus,
  watchElementOffset
} from "~/browser"

import { Component } from "../../../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Annotation
 */
export interface Annotation {
  active: boolean                      /* Annotation is active */
  offset: ElementOffset                /* Annotation offset */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch annotation
 *
 * @param el - Annotation element
 * @param container - Containing element
 *
 * @returns Annotation observable
 */
export function watchAnnotation(
  el: HTMLElement, container: HTMLElement
): Observable<Annotation> {
  const offset$ = defer(() => combineLatest([
    watchElementOffset(el),
    watchElementContentOffset(container)
  ]))
    .pipe(
      map(([{ x, y }, scroll]) => {
        const { width } = getElementSize(el)
        return ({
          x: x - scroll.x + width / 2,
          y: y - scroll.y
        })
      })
    )

  /* Actively watch annotation on focus */
  return watchElementFocus(el)
    .pipe(
      switchMap(active => offset$
        .pipe(
          map(offset => ({ active, offset })),
          take(+!active || Infinity)
        )
      )
    )
}

/**
 * Mount annotation
 *
 * @param el - Annotation element
 * @param container - Containing element
 *
 * @returns Annotation component observable
 */
export function mountAnnotation(
  el: HTMLElement, container: HTMLElement
): Observable<Component<Annotation>> {
  return defer(() => {
    const push$ = new Subject<Annotation>()
    push$.subscribe({

      /* Handle emission */
      next({ offset }) {
        el.style.setProperty("--md-tooltip-x", `${offset.x}px`)
        el.style.setProperty("--md-tooltip-y", `${offset.y}px`)
      },

      /* Handle complete */
      complete() {
        el.style.removeProperty("--md-tooltip-x")
        el.style.removeProperty("--md-tooltip-y")
      }
    })

    /* Track relative origin of tooltip */
    push$
      .pipe(
        throttleTime(500, animationFrameScheduler),
        map(() => container.getBoundingClientRect()),
        map(({ x }) => x)
      )
        .subscribe({

          /* Handle emission */
          next(origin) {
            if (origin)
              el.style.setProperty("--md-tooltip-0", `${-origin}px`)
            else
              el.style.removeProperty("--md-tooltip-0")
          },

          /* Handle complete */
          complete() {
            el.style.removeProperty("--md-tooltip-0")
          }
        })

    /* Close open annotation on click */
    const index = getElement(":scope > :last-child", el)
    const blur$ = fromEvent(index, "mousedown", { once: true })
    push$
      .pipe(
        switchMap(({ active }) => active ? blur$ : EMPTY),
        tap(ev => ev.preventDefault())
      )
        .subscribe(() => el.blur())

    /* Create and return component */
    return watchAnnotation(el, container)
      .pipe(
        tap(state => push$.next(state)),
        finalize(() => push$.complete()),
        map(state => ({ ref: el, ...state }))
      )
  })
}
