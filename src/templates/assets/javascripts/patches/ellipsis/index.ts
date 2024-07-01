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
  filter,
  finalize,
  map,
  mergeMap,
  skip,
  switchMap,
  take,
  takeUntil
} from "rxjs"

import { feature } from "~/_"
import {
  Viewport,
  getElements,
  watchElementVisibility
} from "~/browser"
import { mountInlineTooltip2 } from "~/components/tooltip2"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Patch options
 */
interface PatchOptions {
  document$: Observable<Document>      /* Document observable */
  viewport$: Observable<Viewport>      /* Viewport observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Patch ellipsis
 *
 * This function will fetch all elements that are shortened with ellipsis, and
 * filter those which are visible. Once they become visible, they stay in that
 * state, even though they may be hidden again. This optimization is necessary
 * to reduce pressure on the browser, with elements fading in and out of view.
 *
 * @param options - Options
 */
export function patchEllipsis(
  { document$, viewport$ }: PatchOptions
): void {
  document$
    .pipe(
      switchMap(() => getElements(".md-ellipsis")),
      mergeMap(el => watchElementVisibility(el)
        .pipe(
          takeUntil(document$.pipe(skip(1))),
          filter(visible => visible),
          map(() => el),
          take(1)
        )
      ),
      filter(el => el.offsetWidth < el.scrollWidth),
      mergeMap(el => {
        const text = el.innerText
        const host = el.closest("a") || el
        host.title = text

        // Do not mount improved tooltip if feature is disabled
        if (!feature("content.tooltips"))
          return EMPTY

        /* Mount tooltip */
        return mountInlineTooltip2(host, { viewport$ })
          .pipe(
            takeUntil(document$.pipe(skip(1))),
            finalize(() => host.removeAttribute("title"))
          )
      })
    )
      .subscribe()

  // @todo move this outside of here and fix memleaks
  if (feature("content.tooltips"))
    document$
      .pipe(
        switchMap(() => getElements(".md-status")),
        mergeMap(el => mountInlineTooltip2(el, { viewport$ }))
      )
        .subscribe()
}
