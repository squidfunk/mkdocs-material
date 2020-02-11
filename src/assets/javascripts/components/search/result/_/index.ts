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

import { identity } from "ramda"
import { Observable, OperatorFunction, pipe } from "rxjs"
import {
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  switchMap
} from "rxjs/operators"

import { SearchResult } from "modules"
import { Agent, watchElementOffset } from "utilities"

import { paintSearchResultList } from "../list"
import { paintSearchResultMeta } from "../meta"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Options
 */
interface Options {
  result$: Observable<SearchResult[]>  /* Search result observable */
  query$: Observable<string>           /* Search query observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch search result
 *
 * @param el - Search result element
 * @param agent - Agent
 * @param options - Options
 *
 * @return Search result state observable
 */
export function watchSearchResult(
  el: HTMLElement, agent: Agent, { result$, query$ }: Options
): Observable<SearchResult[]> {
  const container = el.parentElement!

  /* Compute whether there are more search results elements */
  const render$ = watchElementOffset(container, agent)
    .pipe(
      map(({ y }) => y >= container.scrollHeight - container.offsetHeight - 16),
      distinctUntilChanged(),
      filter(identity)
    )

  /* Paint search results */
  return result$
    .pipe(
      paintSearchResultMeta(el, { query$ }),
      paintSearchResultList(el, { render$ })
    )
}

/* ------------------------------------------------------------------------- */

/**
 * Mount search result from source observable
 *
 * @param agent - Agent
 * @param options - Options
 *
 * @return Operator function
 */
export function mountSearchResult(
  agent: Agent, options: Options
): OperatorFunction<HTMLElement, SearchResult[]> {
  return pipe(
    switchMap(el => watchSearchResult(el, agent, options)),
    shareReplay(1)
  )
}
