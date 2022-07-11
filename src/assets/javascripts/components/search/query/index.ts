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
  Observable,
  Subject,
  combineLatest,
  delay,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  finalize,
  fromEvent,
  map,
  merge,
  share,
  shareReplay,
  startWith,
  take,
  takeLast,
  takeUntil,
  tap
} from "rxjs"

import { translation } from "~/_"
import {
  getLocation,
  setToggle,
  watchElementFocus,
  watchToggle
} from "~/browser"
import {
  SearchMessageType,
  SearchQueryMessage,
  SearchWorker,
  defaultTransform,
  isSearchReadyMessage
} from "~/integrations"

import { Component } from "../../_"

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
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch search query
 *
 * Note that the focus event which triggers re-reading the current query value
 * is delayed by `1ms` so the input's empty state is allowed to propagate.
 *
 * @param el - Search query element
 * @param worker - Search worker
 *
 * @returns Search query observable
 */
export function watchSearchQuery(
  el: HTMLInputElement, { rx$ }: SearchWorker
): Observable<SearchQuery> {
  const fn = __search?.transform || defaultTransform

  /* Immediately show search dialog */
  const { searchParams } = getLocation()
  if (searchParams.has("q"))
    setToggle("search", true)

  /* Intercept query parameter (deep link) */
  const param$ = rx$
    .pipe(
      filter(isSearchReadyMessage),
      take(1),
      map(() => searchParams.get("q") || "")
    )

  /* Remove query parameter when search is closed */
  watchToggle("search")
    .pipe(
      filter(active => !active),
      take(1)
    )
      .subscribe(() => {
        const url = new URL(location.href)
        url.searchParams.delete("q")
        history.replaceState({}, "", `${url}`)
      })

  /* Set query from parameter */
  param$.subscribe(value => { // TODO: not ideal - find a better way
    if (value) {
      el.value = value
      el.focus()
    }
  })

  /* Intercept focus and input events */
  const focus$ = watchElementFocus(el)
  const value$ = merge(
    fromEvent(el, "keyup"),
    fromEvent(el, "focus").pipe(delay(1)),
    param$
  )
    .pipe(
      map(() => fn(el.value)),
      startWith(""),
      distinctUntilChanged(),
    )

  /* Combine into single observable */
  return combineLatest([value$, focus$])
    .pipe(
      map(([value, focus]) => ({ value, focus })),
      shareReplay(1)
    )
}

/**
 * Mount search query
 *
 * @param el - Search query element
 * @param worker - Search worker
 *
 * @returns Search query component observable
 */
export function mountSearchQuery(
  el: HTMLInputElement, { tx$, rx$ }: SearchWorker
): Observable<Component<SearchQuery, HTMLInputElement>> {
  const push$ = new Subject<SearchQuery>()
  const done$ = push$.pipe(takeLast(1))

  /* Handle value changes */
  push$
    .pipe(
      distinctUntilKeyChanged("value"),
      map(({ value }): SearchQueryMessage => ({
        type: SearchMessageType.QUERY,
        data: value
      }))
    )
      .subscribe(tx$.next.bind(tx$))

  /* Handle focus changes */
  push$
    .pipe(
      distinctUntilKeyChanged("focus")
    )
      .subscribe(({ focus }) => {
        if (focus) {
          setToggle("search", focus)
          el.placeholder = ""
        } else {
          el.placeholder = translation("search.placeholder")
        }
      })

  /* Handle reset */
  fromEvent(el.form!, "reset")
    .pipe(
      takeUntil(done$)
    )
      .subscribe(() => el.focus())

  /* Create and return component */
  return watchSearchQuery(el, { tx$, rx$ })
    .pipe(
      tap(state => push$.next(state)),
      finalize(() => push$.complete()),
      map(state => ({ ref: el, ...state })),
      share()
    )
}
