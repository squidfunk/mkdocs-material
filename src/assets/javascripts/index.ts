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

import {
  fromContainer,
  fromSidebar
} from "./component"
import {
  fromMediaQuery,
  fromViewportOffset,
  fromViewportSize,
  getElement,
} from "./ui"

// ----------------------------------------------------------------------------

const offset$ = fromViewportOffset()
const size$   = fromViewportSize()

const screenAndAbove$ = fromMediaQuery("(min-width: 1220px)")
const tabletAndAbove$ = fromMediaQuery("(min-width: 960px)")

// ----------------------------------------------------------------------------

// modernizr for the poor
document.documentElement.classList.remove("no-js")
document.documentElement.classList.add("js")

// ----------------------------------------------------------------------------
// sidebar lock + height
// ----------------------------------------------------------------------------

const container = getElement("[data-md-component=container]")!
const header    = getElement("[data-md-component=header]")!

const container$ = fromContainer(container, header, { size$, offset$ })

// ---

const nav = getElement("[data-md-component=navigation")!
const nav$ = fromSidebar(nav, { container$, toggle$: screenAndAbove$ })

const toc = getElement("[data-md-component=toc")!
const toc$ = fromSidebar(toc, { container$, toggle$: tabletAndAbove$ })

// ----------------------------------------------------------------------------

export function app(config: any) {
}
