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

import { wrap } from "fuzzaldrin-plus"

import { h } from "~/utilities"
import { translation } from "~/_"

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Icon CDN URL
 */
const base =
  "https://raw.githubusercontent.com/" +
  "squidfunk/mkdocs-material/" +
  "master/material/.icons/"

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Convert icon search result to shortcode
 *
 * @param value - Icon search result
 *
 * @returns Shortcode
 */
function shortcode(value: string): string {
  return `:${value.replace(/\.svg$/, "").replace(/\//g, "-")}:`
}

/**
 * Highlight an icon search result
 *
 * @param value - Icon search result
 * @param query - Icon search query
 *
 * @returns Highlighted result
 */
function highlight(value: string, query: string) {
  return wrap(shortcode(value), query, {
    wrap: {
      tagOpen: "<b>",
      tagClose: "</b>"
    }
  })
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Render an icon search result
 *
 * @param value - Icon search result
 * @param query - Icon search query
 *
 * @returns Element
 */
export function renderIconSearchResult(
  value: string, query: string
): HTMLElement {
  return (
    <li class="mdx-icon-search-result__item">
      <span class="twemoji">
        <img src={base + value} />
      </span>
      <button
        class="md-clipboard--inline"
        title={translation("clipboard.copy")}
        data-clipboard-text={shortcode(value)}
      >
        <code>{highlight(value, query)}</code>
      </button>
    </li>
  )
}
