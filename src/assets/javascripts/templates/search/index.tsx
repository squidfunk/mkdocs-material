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
 * Helper function
 * ------------------------------------------------------------------------- */

/**
 * Render an article document
 *
 * @param document - Article document
 * @param teaser - Whether to render the teaser
 *
 * @return Element
 */
function renderArticleDocument(
  { location, title, text, terms, score }: SearchDocument & SearchMetadata,
  teaser: boolean
) {
  const miss = Object.keys(terms)
    // tslint:disable-next-line: array-type
    .reduce<Array<Element | string>>((list, key) => [
      ...list, ...!terms[key] ? [<del>{key}</del>, " "] : []
    ], [])
  return (
    <a href={location.toString().replace(/%20/g, "+")} class="md-search-result__link" tabIndex={-1}>
      <article
        class="md-search-result__article md-search-result__article--document"
        data-md-score={score.toFixed(2)}
      >
        <div class="md-search-result__icon md-icon"></div>
        <h1 class="md-search-result__title">{title}</h1>
        {teaser && text.length > 0 &&
          <p class="md-search-result__teaser">{truncate(text, 320)}</p>
        }
        {teaser && miss.length > 0 &&
          <p class="md-search-result__terms">
            {translate("search.result.term.missing")}: {...miss.slice(0, -1)}
          </p>
        }
      </article>
    </a>
  )
}

/**
 * Render a search document
 *
 * @param section - Search document
 *
 * @return Element
 */
function renderSection(
  { location, title, text, terms, score }: SearchDocument & SearchMetadata
) {
  const miss = Object.keys(terms)
    // tslint:disable-next-line: array-type
    .reduce<Array<Element | string>>((list, key) => [
      ...list, ...!terms[key] ? [<del>{key}</del>, " "] : []
    ], [])
  return (
    <a href={location.toString().replace(/%20/g, "+")} class="md-search-result__link" tabIndex={-1}>
      <article class="md-search-result__article" data-md-score={score.toFixed(2)}>
        <h1 class="md-search-result__title">{title}</h1>
        {text.length > 0 &&
          <p class="md-search-result__teaser">{truncate(text, 320)}</p>
        }
        {miss.length > 0 &&
          <p class="md-search-result__terms">
            {translate("search.result.term.missing")}: {...miss.slice(0, -1)}
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
    renderArticleDocument(article, !parent && index === 0),
    ...best.map(renderSection),
    ...more.length ? [
      <details class="md-search-result__more">
        <summary tabIndex={-1}>
          {more.length > 0 && more.length === 1
            ? translate("search.result.more.one")
            : translate("search.result.more.other", more.length)
          }
        </summary>
        {...more.map(renderSection)}
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
