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

import {
  Observable,
  OperatorFunction,
  combineLatest,
  of,
  pipe
} from "rxjs"
import { map, switchMap } from "rxjs/operators"

import { Viewport, getElements } from "browser"

import { Header } from "../../header"
import { Main } from "../../main"
import {
  Sidebar,
  applySidebar,
  watchSidebar
} from "../../shared"
import {
  AnchorList,
  applyAnchorList,
  watchAnchorList
} from "../anchor"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Table of contents for [tablet -]
 */
interface TableOfContentsBelowTablet {} // tslint:disable-line

/**
 * Table of contents for [tablet +]
 */
interface TableOfContentsAboveTablet {
  sidebar: Sidebar                     /* Sidebar */
  anchors: AnchorList                  /* Anchor list */
}

/* ------------------------------------------------------------------------- */

/**
 * Table of contents
 */
export type TableOfContents =
  | TableOfContentsBelowTablet
  | TableOfContentsAboveTablet

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Mount options
 */
interface MountOptions {
  header$: Observable<Header>          /* Header observable */
  main$: Observable<Main>              /* Main area observable */
  viewport$: Observable<Viewport>      /* Viewport observable */
  tablet$: Observable<boolean>         /* Tablet media observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount table of contents from source observable
 *
 * @param options - Options
 *
 * @return Operator function
 */
export function mountTableOfContents(
  { header$, main$, viewport$, tablet$ }: MountOptions
): OperatorFunction<HTMLElement, TableOfContents> {
  return pipe(
    switchMap(el => tablet$
      .pipe(
        switchMap(tablet => {

          /* [tablet +]: Mount table of contents in sidebar */
          if (tablet) {
            const els = getElements<HTMLAnchorElement>(".md-nav__link", el)

            /* Watch and apply sidebar */
            const sidebar$ = watchSidebar(el, { main$, viewport$ })
              .pipe(
                applySidebar(el, { header$ })
              )

            /* Watch and apply anchor list (scroll spy) */
            const anchors$ = watchAnchorList(els, { header$, viewport$ })
              .pipe(
                applyAnchorList(els)
              )

            /* Combine into single hot observable */
            return combineLatest([sidebar$, anchors$])
              .pipe(
                map(([sidebar, anchors]) => ({ sidebar, anchors }))
              )

          /* [tablet -]: Unmount table of contents */
          } else {
            return of({})
          }
        })
      )
    )
  )
}
