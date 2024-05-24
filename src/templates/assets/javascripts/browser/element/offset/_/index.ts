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
  Observable,
  animationFrameScheduler,
  auditTime,
  fromEvent,
  map,
  merge,
  startWith
} from "rxjs"

import { watchElementSize } from "../../size"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Element offset
 */
export interface ElementOffset {
  x: number                            /* Horizontal offset */
  y: number                            /* Vertical offset */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Retrieve element offset
 *
 * @param el - Element
 *
 * @returns Element offset
 */
export function getElementOffset(
  el: HTMLElement
): ElementOffset {
  return {
    x: el.offsetLeft,
    y: el.offsetTop
  }
}

/**
 * Retrieve absolute element offset
 *
 * @param el - Element
 *
 * @returns Element offset
 */
export function getElementOffsetAbsolute(
  el: HTMLElement
): ElementOffset {
  const rect = el.getBoundingClientRect()
  return {
    x: rect.x + window.scrollX,
    y: rect.y + window.scrollY
  }
}

/* ------------------------------------------------------------------------- */

/**
 * Watch element offset
 *
 * @param el - Element
 *
 * @returns Element offset observable
 */
export function watchElementOffset(
  el: HTMLElement
): Observable<ElementOffset> {
  return merge(
    fromEvent(window, "load"),
    fromEvent(window, "resize")
  )
    .pipe(
      auditTime(0, animationFrameScheduler),
      map(() => getElementOffset(el)),
      startWith(getElementOffset(el))
    )
}

/**
 * Watch absolute element offset
 *
 * @param el - Element
 *
 * @returns Element offset observable
 */
export function watchElementOffsetAbsolute(
  el: HTMLElement
): Observable<ElementOffset> {
  return merge(
    watchElementOffset(el),
    watchElementSize(document.body) // @todo find a better way for this
  )
    .pipe(
      map(() => getElementOffsetAbsolute(el)),
      startWith(getElementOffsetAbsolute(el))
    )
}
