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

import { ViewportOffset, ViewportSize, getElement } from "../../../ui"
import { Header } from "../../header"
import {
  resetAnchorActive,
  resetAnchorBlur,
  setAnchorActive,
  setAnchorBlur
} from "../element"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Anchor list
 */
export interface AnchorList {
  done: HTMLAnchorElement[][]          /* Done anchors */
  next: HTMLAnchorElement[][]          /* Next anchors */
}

/* ----------------------------------------------------------------------------
 * Function types
 * ------------------------------------------------------------------------- */

/**
 * Watch options
 */
interface WatchOptions {
  size$: Observable<ViewportSize>      /* Viewport size observable */
  offset$: Observable<ViewportOffset>  /* Viewport offset observable */
  header$: Observable<Header>          /* Header observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Create an observable to watch an anchor list
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
 * @param els - Anchor elements
 * @param options - Options
 *
 * @return Anchor list observable
 */
export function watchAnchorList(
  els: HTMLAnchorElement[], { size$, offset$, header$ }: WatchOptions
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

  /* Compute partition of done and next anchors */
  const partition$ = size$.pipe(

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
    switchMap(index => combineLatest(offset$, adjust$)
      .pipe(
        scan(([done, next], [{ y }, adjust]) => {

          /* Look forward */
          while (next.length) {
            const [, offset] = next[0]
            if (offset - adjust < y) {
              done = [...done, next.shift()!]
            } else {
              break
            }
          }

          /* Look backward */
          while (done.length) {
            const [, offset] = done[done.length - 1]
            if (offset - adjust >= y) {
              next = [done.pop()!, ...next]
            } else {
              break
            }
          }

          /* Return partition */
          return [done, next]
        }, [[], [...index]]),
        distinctUntilChanged((a, b) => {
          return a[0] === b[0]
              && a[1] === b[1]
        })
      )
    )
  )

  /* Extract anchor list and return hot observable */
  return partition$
    .pipe(
      map(([done, next]) => ({
        done: done.map(([path]) => path),
        next: next.map(([path]) => path)
      })),
      shareReplay({ bufferSize: 1, refCount: true })
    )
}

/* ------------------------------------------------------------------------- */

/**
 * Paint anchor list from source observable
 *
 * This operator function will keep track of the anchor list in-between emits
 * in order to optimize rendering by only repainting anchor list migrations.
 * After determining which anchors need to be repainted, the actual rendering
 * is deferred to the next animation frame.
 *
 * @param els - Anchor elements
 *
 * @return Operator function
 */
export function paintAnchorList(
  els: HTMLAnchorElement[]
): MonoTypeOperatorFunction<AnchorList> {
  return pipe(

    /* Extract anchor list migrations only */
    scan<AnchorList>((a, b) => {
      const begin = Math.max(0, Math.min(b.done.length, a.done.length) - 1)
      const end   = Math.max(b.done.length, a.done.length)
      return {
        done: b.done.slice(begin, end + 1),
        next: difference(b.next, a.next)
      }
    }, { done: [], next: [] }),

    /* Defer repaint to next animation frame */
    observeOn(animationFrameScheduler),
    tap(({ done, next }) => {

      /* Look forward */
      for (const [el] of next) {
        resetAnchorActive(el)
        resetAnchorBlur(el)
      }

      /* Look backward */
      for (const [index, [el]] of done.entries()) {
        setAnchorActive(el, index === done.length - 1)
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
