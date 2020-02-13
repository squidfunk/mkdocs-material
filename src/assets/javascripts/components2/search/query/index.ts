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
  switchMap,
  withLatestFrom
} from "rxjs/operators"

import { setToggle } from "actions"
import {
  SearchQuery,
  WorkerHandler,
  useToggle,
  watchSearchQuery
} from "observables"
import {
  SearchMessage,
  SearchMessageType,
  SearchQueryMessage
} from "workers"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount search query from source observable
 *
 * @param handler - Worker handler
 *
 * @return Operator function
 */
export function mountSearchQuery(
  { tx$ }: WorkerHandler<SearchMessage>
): OperatorFunction<HTMLInputElement, SearchQuery> {
  const toggle$ = useToggle("search")
  return pipe(
    switchMap(el => {
      const query$ = watchSearchQuery(el)

      /* Subscribe worker to search query */
      query$
        .pipe(
          distinctUntilKeyChanged("value"),
          map<SearchQuery, SearchQueryMessage>(({ value }) => ({
            type: SearchMessageType.QUERY,
            data: value
          }))
        )
          .subscribe(tx$)

      /* Toggle search on focus */
      query$
        .pipe(
          distinctUntilKeyChanged("focus"),
          withLatestFrom(toggle$)
        )
          .subscribe(([{ focus }, toggle]) => {
            if (focus)
              setToggle(toggle, focus)
          })

      /* Return search query */
      return query$
    })
  )
}
