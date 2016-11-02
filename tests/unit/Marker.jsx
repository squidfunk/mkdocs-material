/*
 * Copyright (c) 2016 Martin Donath <martin.donath@squidfunk.com>
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

import chai from "chai"

import Marker from
  "../../src/assets/javascripts/components/Material/Nav/Blur"

describe("Karma test runner", function() {
  chai.should()

  // TODO: sandbox shit! should be okay once?
  beforeEach(function() {

    for (let i = 0; i < 25; i++)
      document.body.appendChild(
        <p id={`anchor_${i + 1}`}>{i + 1}</p>
      )

    document.body.appendChild(
      <ul>
        {[...Array(25)].map((_, i) => {
          return (
            <li>
              <a href={`#anchor_${i + 1}`}>{i + 1}</a>
            </li>
          )
        })}
      </ul>
    )
  })

  it("should compile JSX correctly",
    shouldCompileJSXCorrectly)
})

// iframe?
function shouldCompileJSXCorrectly(done) {
  const marker = new Marker("a")
  marker.listen()

  // window.location.hash = "#_5"
  // window.addEventListener("hashchange", function(e) {
  //   console.log(document.querySelectorAll("[data-md-blurred]"))
  //   done()
  // })
  window.scrollTo(200, 200)
  setTimeout(() => {
    console.log(document.querySelectorAll("[data-md-blurred]"))
    done()
  }, 100)

  // console.log(marker)
  // return true

}
