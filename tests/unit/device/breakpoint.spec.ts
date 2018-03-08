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

import { Subject } from "rxjs/Subject"

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

    /* Set viewport in next animation frame to force rendering */
    beforeEach(done => {
      requestAnimationFrame(() => {
        viewport.set(480, 320)
        done()
      })
    })

    /* Reset viewport after each test */
    afterEach(() => {
      viewport.reset()
    })

    /* Create a subject for the given media query */
    describe(".query", () => {

      /* Media query for testing purposes */
      const media = window.matchMedia("(min-width: 480px)")

      /* Test: it should return a subject */
      it("should return a subject", () => {
        const media$ = query(media)
        expect(media$).toEqual(jasmine.any(Subject))
      })

      /* Test: it should emit on subscription immediately */
      it("should emit on subscription immediately", done => {
        const media$ = query(media)
        media$
          .take(1)
          .subscribe(({ active }) => {
            expect(active).toEqual(true)
            done()
          }, done.fail)
      })

      /* Test: it should emit on media query status change */
      it("should emit on media query status change", done => {
        const media$ = query(media)
        media$
          .take(2)
          .toArray()
          .subscribe(([initial, changed]) => {
            expect(initial.active).toEqual(true)
            expect(changed.active).toEqual(false)
            done()
          }, done.fail)
        requestAnimationFrame(() => {
          viewport.set(479)
        })
      })
    })

    /* Create a subject for a minimum media query */
    describe(".from", () => {

      /* Test: it should return a subject */
      it("should return a subject", () => {
        const media$ = from(480)
        expect(media$).toEqual(jasmine.any(Subject))
      })

      /* Test: it should emit on subscription immediately */
      it("should emit on subscription immediately", done => {
        const media$ = from(480)
        media$
          .take(1)
          .subscribe(({ active }) => {
            expect(active).toEqual(true)
            done()
          }, done.fail)
      })

      /* Test: it should emit on media query status change */
      it("should emit on media query status change", done => {
        const media$ = from(480)
        media$
          .take(2)
          .toArray()
          .subscribe(([initial, changed]) => {
            expect(initial.active).toEqual(true)
            expect(changed.active).toEqual(false)
            done()
          }, done.fail)
        requestAnimationFrame(() => {
          viewport.set(479)
        })
      })
    })

    /* Create a subject for a maximum media query */
    describe(".to", () => {

      /* Test: it should return a subject */
      it("should return a subject", () => {
        const media$ = to(479)
        expect(media$).toEqual(jasmine.any(Subject))
      })

      /* Test: it should emit on subscription immediately */
      it("should emit on subscription immediately", done => {
        const media$ = to(479)
        media$
          .take(1)
          .subscribe(({ active }) => {
            expect(active).toEqual(false)
            done()
          }, done.fail)
      })

      /* Test: it should emit on media query status change */
      it("should emit on media query status change", done => {
        const media$ = to(479)
        media$
          .take(2)
          .toArray()
          .subscribe(([initial, changed]) => {
            expect(initial.active).toEqual(false)
            expect(changed.active).toEqual(true)
            done()
          }, done.fail)
        requestAnimationFrame(() => {
          viewport.set(479)
        })
      })
    })
  })
})
