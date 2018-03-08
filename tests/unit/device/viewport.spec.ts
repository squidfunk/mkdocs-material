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

import { offset, size } from "~/device/viewport"

/* ----------------------------------------------------------------------------
 * Tests
 * ------------------------------------------------------------------------- */

/* Device utilities */
describe("device", () => {

  /* Viewport observable factories */
  describe("viewport", () => {

    /* Set viewport in next animation frame to force rendering */
    beforeEach(done => {
      requestAnimationFrame(() => {
        document.body.style.minHeight = `${window.innerHeight * 2}px`
        viewport.set(480, 320)
        done()
      })
    })

    /* Reset viewport after each test */
    afterEach(() => {
      document.body.style.minHeight = undefined
      viewport.reset()
    })

    /* Create a subject emitting changes in viewport offset */
    describe(".offset", () => {

      /* Test: it should return a subject */
      it("should return a subject", () => {
        const offset$ = offset()
        expect(offset$).toEqual(jasmine.any(Subject))
      })

      /* Test: it should emit on subscription immediately */
      it("should emit on subscription immediately", done => {
        const offset$ = offset()
        offset$
          .take(1)
          .subscribe(initial => {
            expect(initial).toEqual({
              x: window.pageXOffset,
              y: window.pageYOffset
            })
            done()
          }, done.fail)
      })

      /* Test: it should emit on viewport offset change */
      it("should emit on viewport offset change", done => {
        const offset$ = offset()
        offset$
          .take(2)
          .toArray()
          .subscribe(([initial, changed]) => {
            expect(initial).toEqual({
              x: 0,
              y: 0
            })
            expect(changed).toEqual({
              x: 0,
              y: 1
            })
            done()
          }, done.fail)
        window.scrollTo(0, 1)
      })
    })

    /* Create a subject emitting changes in viewport size */
    describe(".size", () => {

      /* Test: it should return a subject */
      it("should return a subject", () => {
        const size$ = size()
        expect(size$).toEqual(jasmine.any(Subject))
      })

      /* Test: it should emit on subscription immediately */
      it("should emit on subscription immediately", done => {
        const size$ = size()
        size$
          .take(1)
          .subscribe(initial => {
            expect(initial).toEqual({
              width: window.innerWidth,
              height: window.innerHeight
            })
            done()
          }, done.fail)
      })

      /* Test: it should emit on viewport size change */
      it("should emit on viewport size change", done => {
        const size$ = size()
        size$
          .take(2)
          .toArray()
          .subscribe(([initial, changed]) => {
            expect(initial).toEqual({
              width: 480,
              height: 320
            })
            expect(changed).toEqual({
              width: 479,
              height: 319
            })
            done()
          }, done.fail)
        viewport.set(479, 319)
      })
    })
  })
})
