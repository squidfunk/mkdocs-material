/*
 * Copyright (c) 2016-2021 Martin Donath <martin.donath@squidfunk.com>
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

import { translation } from "~/_"
import { h } from "~/utilities"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Icon
 */
export interface Icon {
  shortcode: string                    /* Icon shortcode */
  url: string                          /* Icon URL */
}

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Highlight an icon search result
 *
 * @param icon - Icon
 * @param query - Search query
 *
 * @returns Highlighted result
 */
function highlight(icon: Icon, query: string): string {
  return wrap(icon.shortcode, query, {
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
 * @param icon - Icon
 * @param query - Search query
 *
 * @returns Element
 */
export function renderIconSearchResult(
  icon: Icon, query: string
): HTMLElement {
  return (
    <li class="mdx-iconsearch-result__item">
      <span class="twemoji">
        <img src={icon.url} />
      </span>
      <button
        class="md-clipboard--inline"
        title={translation("clipboard.copy")}
        data-clipboard-text={`:${icon.shortcode}:`}
      >
        <code>{`:${highlight(icon, query)}:`}</code>
      </button>
    </li>
  )
}
