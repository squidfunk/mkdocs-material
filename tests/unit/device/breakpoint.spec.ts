/*
 * Copyright (c) 2017 Martin Donath <martin.donath@squidfunk.com>
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

import "rxjs/add/operator/take"
import "rxjs/add/operator/toArray"

import { from, query, to } from "~/device/breakpoint"

/* ----------------------------------------------------------------------------
 * Tests
 * ------------------------------------------------------------------------- */

/* Device utilities */
describe("device", () => {

  /* Breakpoint observable factories */
  describe("breakpoint", () => {

    /* Reset viewport after each test */
    beforeEach(() => {
      viewport.set(400)
    })

    /* Reset viewport after each test */
    afterEach(() => {
      viewport.reset()
    })

    /* Create a subject for the given media query */
    describe(".query", () => {

      /* Media query for testing purposes */
      const media = window.matchMedia("(min-width: 400px)")

      /* Test: it should return a behavior subject */
      it("should return a behavior subject", () => {
        const media$ = query(media)
        expect(media$).toEqual(jasmine.any(BehaviorSubject))
      })

      /* Test: it should emit on subscription immediately */
      it("should emit on subscription immediately", done => {
        const media$ = query(media)
        media$
          .take(1)
          .subscribe(active => {
            expect(active).toBeTruthy()
            done()
          }, done.fail)
      })

      /* Test: it should emit on media query status change */
      it("should emit on media query status change", done => {
        const media$ = query(media)
        viewport.set(399)
        media$
          .take(2)
          .toArray()
          .subscribe(([initial, changed]) => {
            expect(initial).toBeTruthy()
            expect(changed).toBeFalsy()
            done()
          }, done.fail)
      })
    })

    /* Create a subject for a minimum media query */
    describe(".from", () => {

      /* Test: it should return a behavior subject */
      it("should return a behavior subject", () => {
        const media$ = from(400)
        expect(media$).toEqual(jasmine.any(BehaviorSubject))
      })

      /* Test: it should emit on subscription immediately */
      it("should emit on subscription immediately", done => {
        const media$ = from(400)
        media$
          .take(1)
          .subscribe(active => {
            expect(active).toBeTruthy()
            done()
          }, done.fail)
      })

      /* Test: it should emit on media query status change */
      it("should emit on media query status change", done => {
        const media$ = from(400)
        viewport.set(399)
        media$
          .take(2)
          .toArray()
          .subscribe(([initial, changed]) => {
            expect(initial).toBeTruthy()
            expect(changed).toBeFalsy()
            done()
          }, done.fail)
      })
    })

    /* Create a subject for a minimum media query */
    describe(".to", () => {

      /* Test: it should return a behavior subject */
      it("should return a behavior subject", () => {
        const media$ = to(399)
        expect(media$).toEqual(jasmine.any(BehaviorSubject))
      })

      /* Test: it should emit on subscription immediately */
      it("should emit on subscription immediately", done => {
        const media$ = to(399)
        media$
          .take(1).subscribe(active => {
            expect(active).toBeFalsy()
            done()
          }, done.fail)
      })

      /* Test: it should emit on media query status change */
      it("should emit on media query status change", done => {
        const media$ = to(399)
        viewport.set(399)
        media$
          .take(2)
          .toArray()
          .subscribe(([initial, changed]) => {
            expect(initial).toBeFalsy()
            expect(changed).toBeTruthy()
            done()
          }, done.fail)
      })
    })
  })
})
