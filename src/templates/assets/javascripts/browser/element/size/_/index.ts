/*
 * Copyright (c) 2016-2024 Martin Donath <martin.donath@squidfunk.com>
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
  defer,
  filter,
  finalize,
  map,
  merge,
  of,
  shareReplay,
  startWith,
  switchMap,
  tap
} from "rxjs"

import { watchScript } from "../../../script"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Element offset
 */
export interface ElementSize {
  width: number                        /* Element width */
  height: number                       /* Element height */
}

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Resize observer entry subject
 */
const entry$ = new Subject<ResizeObserverEntry>()

/**
 * Resize observer observable
 *
 * This observable will create a `ResizeObserver` on the first subscription
 * and will automatically terminate it when there are no more subscribers.
 * It's quite important to centralize observation in a single `ResizeObserver`,
 * as the performance difference can be quite dramatic, as the link shows.
 *
 * If the browser doesn't have a `ResizeObserver` implementation available, a
 * polyfill is automatically downloaded from unpkg.com. This is also compatible
 * with the built-in privacy plugin, which will download the polyfill and put
 * it alongside the built site for self-hosting.
 *
 * @see https://bit.ly/3iIYfEm - Google Groups on performance
 */
const observer$ = defer(() => (
  typeof ResizeObserver === "undefined"
    ? watchScript("https://unpkg.com/resize-observer-polyfill")
    : of(undefined)
))
  .pipe(
    map(() => new ResizeObserver(entries => (
      entries.forEach(entry => entry$.next(entry))
    ))),
    switchMap(observer => merge(NEVER, of(observer)).pipe(
      finalize(() => observer.disconnect())
    )),
    shareReplay(1)
  )

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Retrieve element size
 *
 * @param el - Element
 *
 * @returns Element size
 */
export function getElementSize(
  el: HTMLElement
): ElementSize {
  return {
    width:  el.offsetWidth,
    height: el.offsetHeight
  }
}

/* ------------------------------------------------------------------------- */

/**
 * Watch element size
 *
 * This function returns an observable that subscribes to a single internal
 * instance of `ResizeObserver` upon subscription, and emit resize events until
 * termination. Note that this function should not be called with the same
 * element twice, as the first unsubscription will terminate observation.
 *
 * Sadly, we can't use the `DOMRect` objects returned by the observer, because
 * we need the emitted values to be consistent with `getElementSize`, which will
 * return the used values (rounded) and not actual values (unrounded). Thus, we
 * use the `offset*` properties. See the linked GitHub issue.
 *
 * @see https://bit.ly/3m0k3he - GitHub issue
 *
 * @param el - Element
 *
 * @returns Element size observable
 */
export function watchElementSize(
  el: HTMLElement
): Observable<ElementSize> {

  // Compute target element - since inline elements cannot be observed by the
  // current `ResizeObserver` implementation as provided by browsers, we need
  // to determine the first containing parent element and use that one as a
  // target, while we always compute the actual size from the element.
  let target = el
  while (target.clientWidth === 0)
    if (target.parentElement)
      target = target.parentElement
    else
      break

  // Observe target element and recompute element size on resize - as described
  // above, the target element is not necessarily the element of interest
  return observer$.pipe(
    tap(observer => observer.observe(target)),
    switchMap(observer => entry$.pipe(
      filter(entry => entry.target === target),
      finalize(() => observer.unobserve(target))
    )),
    map(() => getElementSize(el)),
    startWith(getElementSize(el))
  )
}
