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

import { EMPTY, Observable, of } from "rxjs"
import {
  distinctUntilChanged,
  map,
  scan,
  shareReplay,
  switchMap
} from "rxjs/operators"

import { getElement, replaceElement } from "browser"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Component
 */
export type Component =
  | "announce"                         /* Announcement bar */
  | "container"                        /* Container */
  | "header"                           /* Header */
  | "header-title"                     /* Header title */
  | "hero"                             /* Hero */
  | "main"                             /* Main area */
  | "navigation"                       /* Navigation */
  | "search"                           /* Search */
  | "search-query"                     /* Search input */
  | "search-reset"                     /* Search reset */
  | "search-result"                    /* Search results */
  | "skip"                             /* Skip link */
  | "tabs"                             /* Tabs */
  | "toc"                              /* Table of contents */

/**
 * Component map
 */
export type ComponentMap = {
  [P in Component]?: HTMLElement
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Watch options
 */
interface WatchOptions {
  document$: Observable<Document>      /* Document observable */
}

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Component map observable
 */
let components$: Observable<ComponentMap>

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Set up bindings to components with given names
 *
 * This function will maintain bindings to the elements identified by the given
 * names in-between document switches and update the elements in-place.
 *
 * @param names - Component names
 * @param options - Options
 */
export function setupComponents(
  names: Component[], { document$ }: WatchOptions
): void {
  components$ = document$
    .pipe(

      /* Build component map */
      map(document => names.reduce<ComponentMap>((components, name) => {
        const el = getElement(`[data-md-component=${name}]`, document)
        return {
          ...components,
          ...typeof el !== "undefined" ? { [name]: el } : {}
        }
      }, {})),

      /* Re-compute component map on document switch */
      scan((prev, next) => {
        for (const name of names) {
          switch (name) {

            /* Top-level components: update */
            case "announce":
            case "header-title":
            case "container":
            case "skip":
              if (name in prev && typeof prev[name] !== "undefined") {
                replaceElement(prev[name]!, next[name]!)
                prev[name] = next[name]
              }
              break

            /* All other components: rebind */
            default:
              if (typeof next[name] !== "undefined")
                prev[name] = getElement(`[data-md-component=${name}]`)
              else
                delete prev[name]
          }
        }
        return prev
      }),

      /* Convert to hot observable */
      shareReplay(1)
    )
}

/**
 * Retrieve a component
 *
 * The returned observable will only re-emit if the element changed, i.e. if
 * it was replaced from a document which was switched to.
 *
 * @template T - Element type
 *
 * @param name - Component name
 *
 * @return Component observable
 */
export function useComponent<T extends HTMLInputElement>(
  name: "search-query"
): Observable<T>
export function useComponent<T extends HTMLElement>(
  name: Component
): Observable<T>
export function useComponent<T extends HTMLElement>(
  name: Component
): Observable<T> {
  return components$
    .pipe(
      switchMap(components => (
        typeof components[name] !== "undefined"
          ? of(components[name] as T)
          : EMPTY
      )),
      distinctUntilChanged()
    )
}
