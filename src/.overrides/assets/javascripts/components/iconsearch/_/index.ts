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

import { Observable, merge } from "rxjs"

import { configuration } from "~/_"
import { requestJSON } from "~/browser"

import { Component, getComponentElement } from "../../_"
import {
  IconSearchQuery,
  mountIconSearchQuery
} from "../query"
import {
  IconSearchResult,
  mountIconSearchResult
} from "../result"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Icon category
 */
export interface IconCategory {
  base: string                         /* Category base URL */
  data: Record<string, string>         /* Category data */
}

/**
 * Icon search index
 */
export interface IconSearchIndex {
  icons: IconCategory                  /* Icons */
  emojis: IconCategory                 /* Emojis */
}

/* ------------------------------------------------------------------------- */

/**
 * Icon search
 */
export type IconSearch =
  | IconSearchQuery
  | IconSearchResult

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount icon search
 *
 * @param el - Icon search element
 *
 * @returns Icon search component observable
 */
export function mountIconSearch(
  el: HTMLElement
): Observable<Component<IconSearch>> {
  const config = configuration()
  const index$ = requestJSON<IconSearchIndex>(
    new URL("assets/javascripts/iconsearch_index.json", config.base)
  )

  /* Retrieve query and result components */
  const query  = getComponentElement("iconsearch-query", el)
  const result = getComponentElement("iconsearch-result", el)

  /* Create and return component */
  const query$  = mountIconSearchQuery(query)
  const result$ = mountIconSearchResult(result, { index$, query$ })
  return merge(query$, result$)
}
