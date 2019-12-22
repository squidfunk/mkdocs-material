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

import { difference, reverse } from "ramda"
import {
  MonoTypeOperatorFunction,
  Observable,
  animationFrameScheduler,
  combineLatest,
  pipe
} from "rxjs"
import {
  distinctUntilChanged,
  finalize,
  map,
  observeOn,
  scan,
  shareReplay,
  switchMap,
  tap
} from "rxjs/operators"

import {
  resetAnchorActive,
  resetAnchorBlur,
  setAnchorActive,
  setAnchorBlur
} from "actions"
import { Agent,  getElement } from "utilities"

import { HeaderState } from "../../header"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Anchor list
 */
export interface AnchorList {
  prev: HTMLAnchorElement[][]          /* Anchors (previous) */
  next: HTMLAnchorElement[][]          /* Anchors (next) */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Options
 */
interface Options {
  header$: Observable<HeaderState>     /* Header state observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch anchor list
 *
 * This is effectively a scroll-spy implementation which will account for the
 * fixed header and automatically re-calculate anchor offsets when the viewport
 * is resized. The returned observable will only emit if the anchor list needs
 * to be repainted.
 *
 * This implementation tracks an anchor element's entire path starting from its
 * level up to the top-most anchor element, e.g. `[h3, h2, h1]`. Although the
 * Material theme currently doesn't make use of this information, it enables
 * the styling of the entire hierarchy through customization.
 *
 * Note that the current anchor is the last item of the `prev` anchor list.
 *
 * @param els - Anchor elements
 * @param agent - Agent
 * @param options - Options
 *
 * @return Anchor list observable
 */
export function watchAnchorList(
  els: HTMLAnchorElement[], { viewport }: Agent, { header$ }: Options
): Observable<AnchorList> {
  const table = new Map<HTMLAnchorElement, HTMLElement>()
  for (const el of els) {
    const id = decodeURIComponent(el.hash.substring(1))
    const target = getElement(`[id="${id}"]`)
    if (typeof target !== "undefined")
      table.set(el, target)
  }

  /* Compute necessary adjustment for header */
  const adjust$ = header$
    .pipe(
      map(header => 18 + header.height)
    )

  /* Compute partition of previous and next anchors */
  const partition$ = viewport.size$
    .pipe(

      /* Build index to map anchor paths to vertical offsets */
      map(() => {
        let path: HTMLAnchorElement[] = []
        return [...table].reduce((index, [anchor, target]) => {
          while (path.length) {
            const last = table.get(path[path.length - 1])!
            if (last.tagName >= target.tagName) {
              path.pop()
            } else {
              break
            }
          }
          return index.set(
            reverse(path = [...path, anchor]),
            target.offsetTop
          )
        }, new Map<HTMLAnchorElement[], number>())
      }),

      /* Re-compute partition when viewport offset changes */
      switchMap(index => combineLatest(viewport.offset$, adjust$)
        .pipe(
          scan(([prev, next], [{ y }, adjust]) => {

            /* Look forward */
            while (next.length) {
              const [, offset] = next[0]
              if (offset - adjust < y) {
                prev = [...prev, next.shift()!]
              } else {
                break
              }
            }

            /* Look backward */
            while (prev.length) {
              const [, offset] = prev[prev.length - 1]
              if (offset - adjust >= y) {
                next = [prev.pop()!, ...next]
              } else {
                break
              }
            }

            /* Return partition */
            return [prev, next]
          }, [[], [...index]]),
          distinctUntilChanged((a, b) => {
            return a[0] === b[0]
                && a[1] === b[1]
          })
        )
      )
    )

  /* Compute anchor list migrations */
  const migration$ = partition$
    .pipe(
      map(([prev, next]) => ({
        prev: prev.map(([path]) => path),
        next: next.map(([path]) => path)
      })),

      /* Extract anchor list migrations */
      scan<AnchorList>((a, b) => {
        const begin = Math.max(0, Math.min(b.prev.length, a.prev.length) - 1)
        const end   = Math.max(b.prev.length, a.prev.length)
        return {
          prev: b.prev.slice(begin, end + 1),
          next: difference(b.next, a.next)
        }
      }, { prev: [], next: [] })
    )

  /* Return anchor list migrations as hot observable */
  return migration$
    .pipe(
      shareReplay(1)
    )
}

/* ------------------------------------------------------------------------- */

/**
 * Paint anchor list from source observable
 *
 * @param els - Anchor elements
 *
 * @return Operator function
 */
export function paintAnchorList(
  els: HTMLAnchorElement[]
): MonoTypeOperatorFunction<AnchorList> {
  return pipe(

    /* Defer repaint to next animation frame */
    observeOn(animationFrameScheduler),
    tap(({ prev, next }) => {

      /* Look forward */
      for (const [el] of next) {
        resetAnchorActive(el)
        resetAnchorBlur(el)
      }

      /* Look backward */
      for (const [index, [el]] of prev.entries()) {
        setAnchorActive(el, index === prev.length - 1)
        setAnchorBlur(el, true)
      }
    }),

    /* Reset on complete or error */
    finalize(() => {
      for (const el of els) {
        resetAnchorActive(el)
        resetAnchorBlur(el)
      }
    })
  )
}
