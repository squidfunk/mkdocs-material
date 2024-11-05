/*
 * Copyright (c) 2016-2024 Martin Donath <martin.donath@squidfunk.com>
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

import { Subject } from "rxjs"

import { feature } from "~/_"
import { h } from "~/utilities"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Retrieve location
 *
 * This function returns a `URL` object (and not `Location`) to normalize the
 * typings across the application. Furthermore, locations need to be tracked
 * without setting them and `Location` is a singleton which represents the
 * current location.
 *
 * @returns URL
 */
export function getLocation(): URL {
  return new URL(location.href)
}

/**
 * Set location
 *
 * If instant navigation is enabled, this function creates a temporary anchor
 * element, sets the `href` attribute, appends it to the body, clicks it, and
 * then removes it again. The event will bubble up the DOM and trigger be
 * intercepted by the instant loading business logic.
 *
 * Note that we must append and remove the anchor element, or the event will
 * not bubble up the DOM, making it impossible to intercept it.
 *
 * @param url - URL to navigate to
 * @param navigate - Force navigation
 */
export function setLocation(
  url: URL | HTMLLinkElement, navigate = false
): void {
  if (feature("navigation.instant") && !navigate) {
    const el = h("a", { href: url.href })
    document.body.appendChild(el)
    el.click()
    el.remove()

  // If we're not using instant navigation, and the page should not be reloaded
  // just instruct the browser to navigate to the given URL
  } else {
    location.href = url.href
  }
}

/* ------------------------------------------------------------------------- */

/**
 * Watch location
 *
 * @returns Location subject
 */
export function watchLocation(): Subject<URL> {
  return new Subject<URL>()
}
