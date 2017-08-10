/*
 * Copyright (c) 2016-2017 Martin Donath <martin.donath@squidfunk.com>
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

/* ----------------------------------------------------------------------------
 * Tests
 * ------------------------------------------------------------------------- */

/* Extensions */
describe("extensions", () => {

  /* Admonition */
  describe("admonition", () => {

    /* Load fixtures */
    beforeAll(done => {
      viewport.load("/extensions/admonition/_/index.html", done)
    })

    /* Reset viewport */
    afterEach(() => {
      viewport.reset()
    })

    /* Test: should capture layout */
    it("should capture layout", () => {
      viewport.each(name => {
        expect(ginseng.capture(`@${name}`, "#default + .admonition"))
          .toEqual(true)
      })
    })

    /* Test: should capture styles */
    it("should capture styles", () => {
      viewport.set("screen")
      ;[
        "#custom-title",               /* Block with a custom title */
        "#long-title",                 /* Block with a long title */
        "#empty-title",                /* Block with an empty title */
        "#note",                       /* Block of type "note" */
        "#summary",                    /* Block of type "summary" */
        "#tip",                        /* Block of type "tip" */
        "#success",                    /* Block of type "success" */
        "#warning",                    /* Block of type "warning" */
        "#failure",                    /* Block of type "failure" */
        "#danger",                     /* Block of type "danger" */
        "#bug",                        /* Block of type "bug" */
        "#quote"                       /* Block of type "quote" */
      ].forEach(style => {
        expect(ginseng.capture(`${style}/@screen`, `${style} + .admonition`))
          .toEqual(true)
      })
    })
  })
})
