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

import { NEVER, Observable, Subject, defer, of } from "rxjs"
import {
  catchError,
  filter,
  finalize,
  map,
  shareReplay,
  tap
} from "rxjs/operators"

import { setSourceFacts, setSourceState } from "~/actions"
import { renderSourceFacts } from "~/templates"

import { Component } from "../../_"
import { SourceFacts, fetchSourceFacts } from "../facts"

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
    const data = sessionStorage.getItem(__prefix("__source"))
    if (data) {
      return of<SourceFacts>(JSON.parse(data))
    } else {
      const value$ = fetchSourceFacts(el.href)
      value$.subscribe(value => {
        try {
          sessionStorage.setItem(__prefix("__source"), JSON.stringify(value))
        } catch (err) {
          /* Uncritical, just swallow */
        }
      })

      /* Return value */
      return value$
    }
  })
    .pipe(
      catchError(() => NEVER),
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
  const internal$ = new Subject<Source>()
  internal$.subscribe(({ facts }) => {
    setSourceFacts(el, renderSourceFacts(facts))
    setSourceState(el, "done")
  })

  /* Create and return component */
  return watchSource(el)
    .pipe(
      tap(internal$),
      finalize(() => internal$.complete()),
      map(state => ({ ref: el, ...state }))
    )
}
