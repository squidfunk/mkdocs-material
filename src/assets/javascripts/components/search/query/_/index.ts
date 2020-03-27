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

import { OperatorFunction, pipe } from "rxjs"
import {
  distinctUntilKeyChanged,
  map,
  switchMap
} from "rxjs/operators"

import { WorkerHandler, setToggle } from "browser"
import {
  SearchMessage,
  SearchMessageType,
  SearchQueryMessage,
  SearchTransformFn
} from "integrations"

import { watchSearchQuery } from "../react"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Search query
 */
export interface SearchQuery {
  value: string                        /* Query value */
  focus: boolean                       /* Query focus */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Mount options
 */
interface MountOptions {
  transform?: SearchTransformFn        /* Transformation function */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount search query from source observable
 *
 * @param handler - Worker handler
 * @param options - Options
 *
 * @return Operator function
 */
export function mountSearchQuery(
  { tx$ }: WorkerHandler<SearchMessage>, options: MountOptions = {}
): OperatorFunction<HTMLInputElement, SearchQuery> {
  return pipe(
    switchMap(el => {
      const query$ = watchSearchQuery(el, options)

      /* Subscribe worker to search query */
      query$
        .pipe(
          distinctUntilKeyChanged("value"),
          map(({ value }): SearchQueryMessage => ({
            type: SearchMessageType.QUERY,
            data: value
          }))
        )
          .subscribe(tx$.next.bind(tx$))

      /* Toggle search on focus */
      query$
        .pipe(
          distinctUntilKeyChanged("focus")
        )
          .subscribe(({ focus }) => {
            if (focus)
              setToggle("search", focus)
          })

      /* Return search query */
      return query$
    })
  )
}
