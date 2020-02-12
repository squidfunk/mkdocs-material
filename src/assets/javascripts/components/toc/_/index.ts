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

import { Observable, OperatorFunction, combineLatest, pipe } from "rxjs"
import { map, shareReplay } from "rxjs/operators"

import {
  AnchorList,
  Header,
  Main,
  Sidebar,
  Viewport,
  getElements,
  paintAnchorList,
  paintSidebar,
  watchAnchorList,
  watchSidebar
} from "observables"
import { switchMapIf } from "utilities"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Table of contents state
 */
export interface TableOfContentsState {
  sidebar: Sidebar                     /* Sidebar state */
  anchors: AnchorList                  /* Anchor list */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Options
 */
interface Options {
  header$: Observable<Header>          /* Header observable */
  main$: Observable<Main>              /* Main area observable */
  viewport$: Observable<Viewport>      /* Viewport observable */
  tablet$: Observable<boolean>         /* Media tablet observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch table of contents
 *
 * @param el - Table of contents element
 * @param agent - Agent
 * @param options - Options
 *
 * @return Table of contents state observable
 */
export function watchTableOfContents(
  el: HTMLElement, { header$, main$, viewport$ }: Options
): Observable<TableOfContentsState> {

  /* Watch and paint sidebar */
  const sidebar$ = watchSidebar(el, { main$, viewport$ })
    .pipe(
      paintSidebar(el)
    )

  /* Watch and paint anchor list (scroll spy) */
  const els = getElements<HTMLAnchorElement>(".md-nav__link", el)
  const anchors$ = watchAnchorList(els, { header$, viewport$ })
    .pipe(
      paintAnchorList(els)
    )

  /* Combine into a single hot observable */
  return combineLatest([sidebar$, anchors$])
    .pipe(
      map(([sidebar, anchors]) => ({ sidebar, anchors }))
    )
}

/* ------------------------------------------------------------------------- */

/**
 * Mount table of contents from source observable
 *
 * @param agent - Agent
 * @param options - Options
 *
 * @return Operator function
 */
export function mountTableOfContents(
  options: Options
): OperatorFunction<HTMLElement, TableOfContentsState> {
  return pipe(
    switchMapIf(options.tablet$, el => watchTableOfContents(el, options)),
    shareReplay(1)
  )
}
