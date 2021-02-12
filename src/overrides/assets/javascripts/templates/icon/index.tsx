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

import { wrap } from "fuzzaldrin-plus"
import { h, round } from "utilities"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

function transform(value: string, query: string) {
  return `:${wrap(value.replace(/\.svg$/, "").replace(/\//g, "-"), query, {
    wrap: {
      tagOpen: "<b>",
      tagClose: "</b>"
    }
  })}:`
}

const base = "https://raw.githubusercontent.com/squidfunk/mkdocs-material/master/material/.icons/"

export function renderIconSearch(
  results: string[], query: string
) {
  if (!query.length)
    return <div class=""></div>
  return (
    <div class="">
      <span>{round(results.length)} results</span>
      <ul class="tx-icon-search__list">
        {results.slice(0, 10).map(result => (
          <li class="tx-icon-search__item">
            <span class="twemoji">
              <img src={base + result} style="width: 18px; height: 18px" />
            </span> – <button
              class="md-clipboard--inline"
              data-clipboard-text={
                ":" + result.replace(/\.svg$/, "").replace(/\//g, "-") + ":"
              }
            >
              <code>{transform(result, query)}</code>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
