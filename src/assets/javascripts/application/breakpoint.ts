/*
 * Copyright (c) 2016-2018 Martin Donath <martin.donath@squidfunk.com>
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

import { BehaviorSubject } from "rxjs/BehaviorSubject"
import { Observable } from "rxjs/Observable"

import "rxjs/add/observable/fromEventPattern"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Create a subject for the given media query
 *
 * @param media - Media query
 */
export const query = (media: MediaQueryList) => {
  const subject$ = new BehaviorSubject<boolean>(media.matches)
  Observable.fromEventPattern<boolean>(next =>
    media.addListener(
      (mq: MediaQueryList) => next(mq.matches)
    ))
    .subscribe(subject$)
  return subject$
}

/**
 * Create a subject for a minimum media query
 *
 * @param value - Breakpoint in pixels
 *
 * @return Subject
 */
export const from = (value: number) =>
  query(window.matchMedia(`(min-width: ${value}px)`))

/**
 * Create a subject for a maximum media query
 *
 * @param value - Breakpoint in pixels
 *
 * @return Subject
 */
export const to = (value: number) =>
  query(window.matchMedia(`(max-width: ${value}px)`))
