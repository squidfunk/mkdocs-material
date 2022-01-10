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
  finalize,
  fromEvent,
  map,
  tap
} from "rxjs"

import { getLocation } from "~/browser"

import { Component } from "../../_"
import { SearchQuery } from "../query"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Search sharing
 */
export interface SearchShare {
  url: URL                             /* Deep link for sharing */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Watch options
 */
interface WatchOptions {
  query$: Observable<SearchQuery>      /* Search query observable */
}

/**
 * Mount options
 */
interface MountOptions {
  query$: Observable<SearchQuery>      /* Search query observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount search sharing
 *
 * @param _el - Search sharing element
 * @param options - Options
 *
 * @returns Search sharing observable
 */
export function watchSearchShare(
  _el: HTMLElement, { query$ }: WatchOptions
): Observable<SearchShare> {
  return query$
    .pipe(
      map(({ value }) => {
        const url = getLocation()
        url.hash = ""
        url.searchParams.delete("h")
        url.searchParams.set("q", value)
        return { url }
      })
    )
}

/**
 * Mount search sharing
 *
 * @param el - Search sharing element
 * @param options - Options
 *
 * @returns Search sharing component observable
 */
export function mountSearchShare(
  el: HTMLAnchorElement, options: MountOptions
): Observable<Component<SearchShare>> {
  const push$ = new Subject<SearchShare>()
  push$.subscribe(({ url }) => {
    el.setAttribute("data-clipboard-text", el.href)
    el.href = `${url}`
  })

  /* Prevent following of link */
  fromEvent(el, "click")
    .subscribe(ev => ev.preventDefault())

  /* Create and return component */
  return watchSearchShare(el, options)
    .pipe(
      tap(state => push$.next(state)),
      finalize(() => push$.complete()),
      map(state => ({ ref: el, ...state }))
    )
}
