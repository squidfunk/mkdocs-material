/*
 * Copyright (c) 2016-2019 Martin Donath <martin.donath@squidfunk.com>
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

import { keys } from "ramda"
import { MonoTypeOperatorFunction, Observable, of, pipe } from "rxjs"
import { scan, shareReplay } from "rxjs/operators"

import { getElement } from "../../ui"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Components
 */
export type Component =
  | "header"                           /* Header */
  | "title"                            /* Header title */
  | "search"                           /* Search */
  | "query"                            /* Search input */
  | "reset"                            /* Search reset */
  | "result"                           /* Search results */
  | "container"                        /* Container */
  | "main"                             /* Main area */
  | "hero"                             /* Hero */
  | "tabs"                             /* Tabs */
  | "navigation"                       /* Navigation */
  | "toc"                              /* Table of contents */

/**
 * Component map
 */
export type ComponentMap = {
  [P in Component]?: HTMLElement
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Retrieve the component to element mapping
 *
 * The document must be passed as a parameter to support retrieving elements
 * from the document object returned through asynchronous loading.
 *
 * @param document - Document of reference
 *
 * @return Component map observable
 */
export function watchComponentMap(
  document: Document
): Observable<ComponentMap> {

  /* Build component map */
  const map$ = of([
    "header",                          /* Header */
    "title",                           /* Header title */
    "search",                          /* Search */
    "query",                           /* Search input */
    "reset",                           /* Search reset */
    "result",                          /* Search results */
    "container",                       /* Container */
    "main",                            /* Main area */
    "hero",                            /* Hero */
    "tabs",                            /* Tabs */
    "navigation",                      /* Navigation */
    "toc"                              /* Table of contents */
  ].reduce<ComponentMap>((map, name) => {
    const el = getElement(`[data-md-component=${name}]`, document)
    return {
      ...map,
      ...typeof el !== "undefined" ? { [name]: el } : {}
    }
  }, {}))

  /* Return component map as hot observable */
  return map$
    .pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    )
}

/* ------------------------------------------------------------------------- */

/**
 * Paint component map from source observable
 *
 * This operator function will swap the components in the previous component
 * map with the new components identified by the given names and rebind all
 * remaining components, as they may be children of swapped components.
 *
 * @param names - Components to paint
 *
 * @return Operator function
 */
export function paintComponentMap(
  names: Component[] = ["title", "container"]
): MonoTypeOperatorFunction<ComponentMap> {
  return pipe(
    scan<ComponentMap>((prev, next) => {
      for (const name of keys(prev)) {

        /* Swap component */
        if (names.includes(name)) {
          if (name in prev && typeof prev[name] !== "undefined") {
            prev[name]!.replaceWith(next[name]!)
            prev[name] = next[name]
          }

        /* Bind component */
        } else {
          prev[name] = getElement(`[data-md-component=${name}]`)
        }
      }
      return prev
    })
  )
}
