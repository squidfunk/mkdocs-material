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

import spec from "~/tests/visual/helpers/spec"

/* ----------------------------------------------------------------------------
 * Tests
 * ------------------------------------------------------------------------- */

/*
 * Admonition extension
 *
 * The admonition block looks the same on everything above tablet
 * portrait, so we can save a few test cases.
 */
spec.register(__dirname, {
  "admonition": {
    "url": "/",
    "capture": "#default + .admonition",
    "break": "-@tablet-portrait",
    "suite": {

      /* Admonition block with a custom title */
      "#custom-title": {
        "capture": "#custom-title + .admonition",
        "break": "@screen"
      },

      /* Admonition block with a long title */
      "#long-title": {
        "capture": "#long-title + .admonition",
        "break": "@screen"
      },

      /* Admonition block with an empty title */
      "#empty-title": {
        "capture": "#empty-title + .admonition",
        "break": "@screen"
      },

      /* Admonition block of type "note" */
      "#note": {
        "capture": "#note + .admonition",
        "break": "@screen"
      },

      /* Admonition block of type "summary" */
      "#summary": {
        "capture": "#summary + .admonition",
        "break": "@screen"
      },

      /* Admonition block of type "tip" */
      "#tip": {
        "capture": "#tip + .admonition",
        "break": "@screen"
      },

      /* Admonition block of type "success" */
      "#success": {
        "capture": "#success + .admonition",
        "break": "@screen"
      },

      /* Admonition block of type "warning" */
      "#warning": {
        "capture": "#warning + .admonition",
        "break": "@screen"
      },

      /* Admonition block of type "failure" */
      "#failure": {
        "capture": "#failure + .admonition",
        "break": "@screen"
      },

      /* Admonition block of type "danger" */
      "#danger": {
        "capture": "#danger + .admonition",
        "break": "@screen"
      },

      /* Admonition block of type "bug" */
      "#bug": {
        "capture": "#bug + .admonition",
        "break": "@screen"
      }
    }
  }
})
