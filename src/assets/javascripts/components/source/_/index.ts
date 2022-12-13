/*
 * Copyright (c) 2016-2022 Martin Donath <martin.donath@squidfunk.com>
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
  EMPTY,
  Observable,
  Subject,
  catchError,
  defer,
  filter,
  finalize,
  map,
  of,
  shareReplay,
  tap
} from "rxjs"

import { getElement } from "~/browser"
import { ConsentDefaults } from "~/components/consent"
import { renderSourceFacts } from "~/templates"

import {
  Component,
  getComponentElements
} from "../../_"
import {
  SourceFacts,
  fetchSourceFacts
} from "../facts"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Repository information
 */
export interface Source {
  facts: SourceFacts                   /* Repository facts */
}

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Repository information observable
 */
let fetch$: Observable<Source>

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch repository information
 *
 * This function tries to read the repository facts from session storage, and
 * if unsuccessful, fetches them from the underlying provider.
 *
 * @param el - Repository information element
 *
 * @returns Repository information observable
 */
export function watchSource(
  el: HTMLAnchorElement
): Observable<Source> {
  return fetch$ ||= defer(() => {
    const cached = __md_get<SourceFacts>("__source", sessionStorage)
    if (cached) {
      return of(cached)
    } else {

      /* Check if consent is configured and was given */
      const els = getComponentElements("consent")
      if (els.length) {
        const consent = __md_get<ConsentDefaults>("__consent")
        if (!(consent && consent.github))
          return EMPTY
      }

      /* Fetch repository facts */
      return fetchSourceFacts(el.href)
        .pipe(
          tap(facts => __md_set("__source", facts, sessionStorage))
        )
    }
  })
    .pipe(
      catchError(() => EMPTY),
      filter(facts => Object.keys(facts).length > 0),
      map(facts => ({ facts })),
      shareReplay(1)
    )
}

/**
 * Mount repository information
 *
 * @param el - Repository information element
 *
 * @returns Repository information component observable
 */
export function mountSource(
  el: HTMLAnchorElement
): Observable<Component<Source>> {
  const inner = getElement(":scope > :last-child", el)
  return defer(() => {
    const push$ = new Subject<Source>()
    push$.subscribe(({ facts }) => {
      inner.appendChild(renderSourceFacts(facts))
      inner.classList.add("md-source__repository--active")
    })

    /* Create and return component */
    return watchSource(el)
      .pipe(
        tap(state => push$.next(state)),
        finalize(() => push$.complete()),
        map(state => ({ ref: el, ...state }))
      )
  })
}
