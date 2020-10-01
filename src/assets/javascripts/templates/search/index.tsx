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

import {
  SearchDocument,
  SearchMetadata,
  SearchResult
} from "integrations/search"
import { h, translate, truncate } from "utilities"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Render flag
 */
const enum Flag {
  TEASER = 1,                          /* Render teaser */
  PARENT = 2                           /* Render as parent */
}

/* ----------------------------------------------------------------------------
 * Helper function
 * ------------------------------------------------------------------------- */

/**
 * Render a search document
 *
 * @param section - Search document
 * @param flag - Render flags
 *
 * @return Element
 */
function renderSearchDocument(
  document: SearchDocument & SearchMetadata, flag: Flag
) {
  const parent = flag & Flag.PARENT
  const teaser = flag & Flag.TEASER

  /* Render missing query terms */
  const missing = Object.keys(document.terms)
    .filter(key => !document.terms[key])
    .map(key => [<del>{key}</del>, " "])
    .flat()
    .slice(0, -1)

  /* Render article or section, depending on flags */
  const url = document.location
  return (
    <a href={url} class="md-search-result__link" tabIndex={-1}>
      <article
        class={["md-search-result__article", ...parent
          ? ["md-search-result__article--document"]
          : []
        ].join(" ")}
        data-md-score={document.score.toFixed(2)}
      >
        {parent > 0 && <div class="md-search-result__icon md-icon"></div>}
        <h1 class="md-search-result__title">{document.title}</h1>
        {teaser > 0 && document.text.length > 0 &&
          <p class="md-search-result__teaser">
            {truncate(document.text, 320)}
          </p>
        }
        {teaser > 0 && missing.length > 0 &&
          <p class="md-search-result__terms">
            {translate("search.result.term.missing")}: {...missing}
          </p>
        }
      </article>
    </a>
  )
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Render a search result
 *
 * @param result - Search result
 * @param threshold - Score threshold
 *
 * @return Element
 */
export function renderSearchResult(
  result: SearchResult, threshold: number = Infinity
) {
  const docs = [...result]

  /* Find and extract parent article */
  const parent = docs.findIndex(doc => !doc.location.includes("#"))
  const [article] = docs.splice(parent, 1)

  /* Determine last index above threshold */
  let index = docs.findIndex(doc => doc.score < threshold)
  if (index === -1)
    index = docs.length

  /* Partition sections */
  const best = docs.slice(0, index)
  const more = docs.slice(index)

  /* Render children */
  const children = [
    renderSearchDocument(article, Flag.PARENT | +(!parent && index === 0)),
    ...best.map(section => renderSearchDocument(section, Flag.TEASER)),
    ...more.length ? [
      <details class="md-search-result__more">
        <summary tabIndex={-1}>
          {more.length > 0 && more.length === 1
            ? translate("search.result.more.one")
            : translate("search.result.more.other", more.length)
          }
        </summary>
        {...more.map(section => renderSearchDocument(section, Flag.TEASER))}
      </details>
    ] : []
  ]

  /* Render search result */
  return (
    <li class="md-search-result__item">
      {children}
    </li>
  )
}
