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
  Observable,
  ObservableInput,
  combineLatest,
  filter,
  map,
  startWith
} from "rxjs"

import { getLocation } from "~/browser"
import {
  SearchIndex,
  setupSearchHighlighter
} from "~/integrations"
import { h } from "~/utilities"

import { Component } from "../../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Search highlighting
 */
export interface SearchHighlight {
  nodes: Map<ChildNode, string>        /* Map of replacements */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Mount options
 */
interface MountOptions {
  index$: ObservableInput<SearchIndex> /* Search index observable */
  location$: Observable<URL>           /* Location observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount search highlighting
 *
 * @param el - Content element
 * @param options - Options
 *
 * @returns Search highlighting component observable
 */
export function mountSearchHiglight(
  el: HTMLElement, { index$, location$ }: MountOptions
): Observable<Component<SearchHighlight>> {
  return combineLatest([
    index$,
    location$
      .pipe(
        startWith(getLocation()),
        filter(url => !!url.searchParams.get("h"))
      )
  ])
    .pipe(
      map(([index, url]) => setupSearchHighlighter(index.config)(
        url.searchParams.get("h")!
      )),
      map(fn => {
        const nodes = new Map<ChildNode, string>()

        /* Traverse text nodes and collect matches */
        const it = document.createNodeIterator(el, NodeFilter.SHOW_TEXT)
        for (let node = it.nextNode(); node; node = it.nextNode()) {
          if (node.parentElement?.offsetHeight) {
            const original = node.textContent!
            const replaced = fn(original)
            if (replaced.length > original.length)
              nodes.set(node as ChildNode, replaced)
          }
        }

        /* Replace original nodes with matches */
        for (const [node, text] of nodes) {
          const { childNodes } = h("span", null, text)
          node.replaceWith(...Array.from(childNodes))
        }

        /* Return component */
        return { ref: el, nodes }
      })
    )
}
