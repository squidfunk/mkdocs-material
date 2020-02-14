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

import { SearchResult } from "integrations"
import { h, truncate } from "utilities"

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * CSS classes
 */
const css = {
  item:    "md-search-result__item",
  link:    "md-search-result__link",
  article: "md-search-result__article md-search-result__article--document",
  section: "md-search-result__article",
  title:   "md-search-result__title",
  teaser:  "md-search-result__teaser"
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Render a search result
 *
 * @param result - Search result
 *
 * @return Element
 */
export function renderSearchResult(
  { article, sections }: SearchResult
): HTMLElement {
  const children = [article, ...sections].map(document => {
    const { location, title, text } = document
    return (
      <a href={location} class={css.link} tabIndex={-1}>
        <article class={"parent" in document ? css.section : css.article}>
          <h1 class={css.title}>{title}</h1>
          {text.length
            ? <p class={css.teaser}>{truncate(text, 320)}</p>
            : undefined
          }
        </article>
      </a>
    )
  })
  return (
    <li class={css.item}>
      {...children}
    </li>
  )
}
