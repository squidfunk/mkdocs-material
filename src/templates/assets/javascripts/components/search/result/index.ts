/*
 * Copyright (c) 2016-2024 Martin Donath <martin.donath@squidfunk.com>
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
  bufferCount,
  filter,
  finalize,
  first,
  fromEvent,
  map,
  merge,
  mergeMap,
  of,
  share,
  skipUntil,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
  zipWith
} from "rxjs"

import { translation } from "~/_"
import {
  getElement,
  getOptionalElement,
  watchElementBoundary,
  watchToggle
} from "~/browser"
import {
  SearchMessage,
  SearchResult,
  isSearchReadyMessage,
  isSearchResultMessage
} from "~/integrations"
import { renderSearchResultItem } from "~/templates"
import { round } from "~/utilities"

import { Component } from "../../_"
import { SearchQuery } from "../query"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Mount options
 */
interface MountOptions {
  query$: Observable<SearchQuery>      /* Search query observable */
  worker$: Subject<SearchMessage>      /* Search worker */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount search result list
 *
 * This function performs a lazy rendering of the search results, depending on
 * the vertical offset of the search result container.
 *
 * @param el - Search result list element
 * @param options - Options
 *
 * @returns Search result list component observable
 */
export function mountSearchResult(
  el: HTMLElement, { worker$, query$ }: MountOptions
): Observable<Component<SearchResult>> {
  const push$ = new Subject<SearchResult>()
  const boundary$ = watchElementBoundary(el.parentElement!)
    .pipe(
      filter(Boolean)
    )

  /* Retrieve container */
  const container = el.parentElement!

  /* Retrieve nested components */
  const meta = getElement(":scope > :first-child", el)
  const list = getElement(":scope > :last-child", el)

  /* Reveal to accessibility tree – see https://bit.ly/3iAA7t8 */
  watchToggle("search")
    .subscribe(active => list.setAttribute(
      "role", active ? "list" : "presentation"
    ))

  /* Update search result metadata */
  push$
    .pipe(
      withLatestFrom(query$),
      skipUntil(worker$.pipe(first(isSearchReadyMessage)))
    )
      .subscribe(([{ items }, { value }]) => {
        switch (items.length) {

          /* No results */
          case 0:
            meta.textContent = value.length
              ? translation("search.result.none")
              : translation("search.result.placeholder")
            break

          /* One result */
          case 1:
            meta.textContent = translation("search.result.one")
            break

          /* Multiple result */
          default:
            const count = round(items.length)
            meta.textContent = translation("search.result.other", count)
        }
      })

  /* Render search result item */
  const render$ = push$
    .pipe(
      tap(() => list.innerHTML = ""),
      switchMap(({ items }) => merge(
        of(...items.slice(0, 10)),
        of(...items.slice(10))
          .pipe(
            bufferCount(4),
            zipWith(boundary$),
            switchMap(([chunk]) => chunk)
          )
      )),
      map(renderSearchResultItem),
      share()
    )

  /* Update search result list */
  render$.subscribe(item => list.appendChild(item))
  render$
    .pipe(
      mergeMap(item => {
        const details = getOptionalElement("details", item)
        if (typeof details === "undefined")
          return EMPTY

        /* Keep position of details element stable */
        return fromEvent(details, "toggle")
          .pipe(
            takeUntil(push$),
            map(() => details)
          )
      })
    )
      .subscribe(details => {
        if (
          details.open === false &&
          details.offsetTop <= container.scrollTop
        )
          container.scrollTo({ top: details.offsetTop })
      })

  /* Filter search result message */
  const result$ = worker$
    .pipe(
      filter(isSearchResultMessage),
      map(({ data }) => data)
    )

  /* Create and return component */
  return result$
    .pipe(
      tap(state => push$.next(state)),
      finalize(() => push$.complete()),
      map(state => ({ ref: el, ...state }))
    )
}
