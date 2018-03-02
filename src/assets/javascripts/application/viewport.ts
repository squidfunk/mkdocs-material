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

import "rxjs/add/observable/fromEvent"
import "rxjs/add/operator/map"
import "rxjs/add/operator/merge"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Viewport offset
 */
export interface ViewportOffset {
  x: number                            /* Horizontal offset */
  y: number                            /* Vertical offset */
}

/**
 * Viewport size
 */
export interface ViewportSize {
  width: number                        /* Viewport width */
  height: number                       /* Viewport height */
}

/* ----------------------------------------------------------------------------
 * Values
 * ------------------------------------------------------------------------- */

/**
 * Observable for window scroll events
 */
export const scroll$ = Observable.fromEvent<UIEvent>(window, "scroll")

/**
 * Observable for window resize events
 */
export const resize$ = Observable.fromEvent<UIEvent>(window, "resize")

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Create a subject emitting changes in viewport offset
 *
 * Resizing the browser window might also change the scroll offset by text
 * breaking across lines, so we need to observe resize events as well.
 *
 * The viewport size and offset observables must be implemented as behavior
 * subjects, because they are required to always report a value. This is a
 * problem, as a breakpoint hit (resize event) may trigger the viewport size
 * observable to be returned by the breakpoint subject with its initial
 * value, while also triggering a resize event which will emit another value,
 * leading to a duplicate emission. At the time of writing, this can be
 * observed in Chrome and Firefox, while Safari seems to handle it correctly.
 *
 * Browser environments can be pretty unpredictable, so it's best to always
 * create a fresh observable when necessary, e.g. when a breakpoint is hit,
 * and to filter for duplicate values (or just accept that it could happen).
 * For decision, context is necessary, so it must be done by the caller.
 *
 * @return Subject
 */
export const offset = () => {
  const subject$ = new BehaviorSubject<ViewportOffset>({
    x: window.pageXOffset,
    y: window.pageYOffset
  })
  scroll$
    .merge(resize$)
    .map<UIEvent, ViewportOffset>(() => ({
      x: window.pageXOffset,
      y: window.pageYOffset
    }))
    .subscribe(subject$)
  return subject$
}

/**
 * Create a subject emitting changes in viewport size
 *
 * @see {@link offset}
 *
 * @return Subject
 */
export const size = () => {
  const subject$ = new BehaviorSubject<ViewportSize>({
    width: window.innerWidth,
    height: window.innerHeight
  })
  resize$
    .map<UIEvent, ViewportSize>(() => ({
      width: window.innerWidth,
      height: window.innerHeight
    }))
    .subscribe(subject$)
  return subject$
}
