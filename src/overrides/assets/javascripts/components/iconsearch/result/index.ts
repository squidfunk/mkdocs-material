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

import { filter as search } from "fuzzaldrin-plus"
import {
  Observable,
  Subject,
  bufferCount,
  combineLatest,
  distinctUntilKeyChanged,
  filter,
  finalize,
  map,
  merge,
  of,
  switchMap,
  tap,
  withLatestFrom,
  zipWith
} from "rxjs"

import {
  getElement,
  watchElementBoundary
} from "~/browser"
import { round } from "~/utilities"

import { Icon, renderIconSearchResult } from "_/templates"

import { Component } from "../../_"
import { IconSearchIndex } from "../_"
import { IconSearchQuery } from "../query"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Icon search result
 */
export interface IconSearchResult {
  data: Icon[]                         /* Search result data */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Watch options
 */
interface WatchOptions {
  index$: Observable<IconSearchIndex>  /* Search index observable */
  query$: Observable<IconSearchQuery>  /* Search query observable */
}

/**
 * Mount options
 */
interface MountOptions {
  index$: Observable<IconSearchIndex>  /* Search index observable */
  query$: Observable<IconSearchQuery>  /* Search query observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch icon search result
 *
 * @param el - Icon search result element
 * @param options - Options
 *
 * @returns Icon search result observable
 */
export function watchIconSearchResult(
  el: HTMLElement, { index$, query$ }: WatchOptions
): Observable<IconSearchResult> {
  switch (el.getAttribute("data-mdx-mode")) {

    case "file":
      return combineLatest([
        query$.pipe(distinctUntilKeyChanged("value")),
        index$
          .pipe(
            map(({ icons }) => Object.values(icons.data)
              .map(icon => icon.replace(/\.svg$/, ""))
            )
          )
      ])
        .pipe(
          map(([{ value }, data]) => search(data, value)),
          switchMap(files => index$.pipe(
            map(({ icons }) => ({
              data: files.map<Icon>(shortcode => {
                return {
                  shortcode,
                  url: [
                    icons.base,
                    shortcode,
                    ".svg"
                  ].join("")
                }
              })
            }))
          ))
        )

    default:
      return combineLatest([
        query$.pipe(distinctUntilKeyChanged("value")),
        index$
          .pipe(
            map(({ icons, emojis }) => [
              ...Object.keys(icons.data),
              ...Object.keys(emojis.data)
            ])
          )
      ])
        .pipe(
          map(([{ value }, data]) => search(data, value)),
          switchMap(shortcodes => index$.pipe(
            map(({ icons, emojis }) => ({
              data: shortcodes.map<Icon>(shortcode => {
                const category =
                  shortcode in icons.data
                    ? icons
                    : emojis
                return {
                  shortcode,
                  url: [
                    category.base,
                    category.data[shortcode]
                  ].join("")
                }
              })
            }))
          ))
        )
  }
}

/**
 * Mount icon search result
 *
 * @param el - Icon search result element
 * @param options - Options
 *
 * @returns Icon search result component observable
 */
export function mountIconSearchResult(
  el: HTMLElement, { index$, query$ }: MountOptions
): Observable<Component<IconSearchResult, HTMLElement>> {
  const push$ = new Subject<IconSearchResult>()
  const boundary$ = watchElementBoundary(el)
    .pipe(
      filter(Boolean)
    )

  /* Update search result metadata */
  const meta = getElement(":scope > :first-child", el)
  push$
    .pipe(
      withLatestFrom(query$)
    )
      .subscribe(([{ data }, { value }]) => {
        if (value) {
          switch (data.length) {

            /* No results */
            case 0:
              meta.textContent = "No matches"
              break

            /* One result */
            case 1:
              meta.textContent = "1 match"
              break

            /* Multiple result */
            default:
              meta.textContent = `${round(data.length)} matches`
          }
        } else {
          meta.textContent = "Type to start searching"
        }
      })

  /* Update icon search result list */
  const file = el.getAttribute("data-mdx-mode") === "file"
  const list = getElement(":scope > :last-child", el)
  push$
    .pipe(
      tap(() => list.innerHTML = ""),
      switchMap(({ data }) => merge(
        of(...data.slice(0, 10)),
        of(...data.slice(10))
          .pipe(
            bufferCount(10),
            zipWith(boundary$),
            switchMap(([chunk]) => of(...chunk))
          )
      )),
      withLatestFrom(query$)
    )
      .subscribe(([result, { value }]) => list.appendChild(
        renderIconSearchResult(result, value, file)
      ))

  /* Create and return component */
  return watchIconSearchResult(el, { query$, index$ })
    .pipe(
      tap(state => push$.next(state)),
      finalize(() => push$.complete()),
      map(state => ({ ref: el, ...state }))
    )
}
