/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

/* eslint-disable */

import { filter } from "fuzzaldrin-plus"
import { from, fromEvent } from "rxjs"
import { map, switchMap } from "rxjs/operators"

import { getElement, getElementOrThrow } from "~/browser"

import { renderIconSearch } from "./templates/icon"

// Obtain configuration
const el = getElementOrThrow("#__config")
const config = JSON.parse(el.textContent!)

// Now, load icons.json
const icons$ =
  from(fetch(`${config.base}/overrides/assets/javascripts/icons.json`)
    .then(res => res.json())
  )

// Render icon search, if present
const search = getElement<HTMLInputElement>("#icon-search")
if (search) {
  icons$
    .pipe(
      switchMap(icons => fromEvent<InputEvent>(search, "keyup")
        .pipe(
          map(() => filter(icons, search.value))
        )
      )
    )
      .subscribe((result: any[]) => {
        const list = getElementOrThrow(".tx-icon-result")
        list.innerHTML = ""
        list.appendChild(renderIconSearch(result, search.value))
      })
}

// Track click events
fromEvent(document.body, "click")
  .subscribe(ev => {
    if (ev.target instanceof HTMLElement) {
      const el2 = ev.target.closest("a[href^=http]")
      if (el2 instanceof HTMLLinkElement)
        // @ts-ignore
        ga("send", "event", "outbound", "click", el.href)
    }
  })

