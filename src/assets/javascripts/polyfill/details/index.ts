/*
 * Copyright (c) 2016-2019 Martin Donath <martin.donath@squidfunk.com>
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
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Check if browser supports the `<details>` tag
 *
 * As this polyfill is executed at the end of `<body>`, not all checks from the
 * original source were necessary, so the script was stripped down a little.
 *
 * @see https://bit.ly/2O1teyP - Original source
 *
 * @return Test result
 */
function isSupported(): boolean {
  const details = document.createElement("details")
  if (!("open" in details))
    return false

  /* Insert summary and append element */
  details.innerHTML = "<summary>_</summary>_"
  details.style.display = "block"
  document.body.appendChild(details)

  /* Measure height difference */
  const h0 = details.offsetHeight
  details.open = true
  const h1 = details.offsetHeight

  /* Remove element and return test result */
  document.body.removeChild(details)
  return h1 - h0 !== 0
}

/* ----------------------------------------------------------------------------
 * Polyfill
 * ------------------------------------------------------------------------- */

/* Execute polyfill when DOM is available */
document.addEventListener("DOMContentLoaded", () => {
  if (isSupported())
    return

  /* Indicate presence of details polyfill */
  document.documentElement.classList.add("no-details")

  /* Retrieve all summaries and polyfill open/close functionality */
  const summaries = document.querySelectorAll("details > summary")
  summaries.forEach(summary => {
    summary.addEventListener("click", ev => {
      const details = summary.parentNode as HTMLElement
      if (details.hasAttribute("open")) {
        details.removeAttribute("open")
      } else {
        details.setAttribute("open", "")
      }
    })
  })
})
