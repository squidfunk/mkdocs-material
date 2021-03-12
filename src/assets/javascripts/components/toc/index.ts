/*
 * Copyright (c) 2016-2021 Martin Donath <martin.donath@squidfunk.com>
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
  Subject,
  animationFrameScheduler,
  combineLatest
} from "rxjs"
import {
  bufferCount,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  finalize,
  map,
  observeOn,
  scan,
  startWith,
  switchMap,
  tap
} from "rxjs/operators"

import {
  resetAnchorActive,
  resetAnchorState,
  setAnchorActive,
  setAnchorState
} from "~/actions"
import {
  Viewport,
  getElement,
  getElements,
  watchElementSize
} from "~/browser"

import { Component } from "../_"
import { Header } from "../header"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Table of contents
 */
export interface TableOfContents {
  prev: HTMLAnchorElement[][]          /* Anchors (previous) */
  next: HTMLAnchorElement[][]          /* Anchors (next) */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Watch options
 */
interface WatchOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
  header$: Observable<Header>          /* Header observable */
}

/**
 * Mount options
 */
interface MountOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
  header$: Observable<Header>          /* Header observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch table of contents
 *
 * This is effectively a scroll spy implementation which will account for the
 * fixed header and automatically re-calculate anchor offsets when the viewport
 * is resized. The returned observable will only emit if the table of contents
 * needs to be repainted.
 *
 * This implementation tracks an anchor element's entire path starting from its
 * level up to the top-most anchor element, e.g. `[h3, h2, h1]`. Although the
 * Material theme currently doesn't make use of this information, it enables
 * the styling of the entire hierarchy through customization.
 *
 * Note that the current anchor is the last item of the `prev` anchor list.
 *
 * @param anchors - Anchor elements
 * @param options - Options
 *
 * @returns Table of contents observable
 */
export function watchTableOfContents(
  anchors: HTMLAnchorElement[], { viewport$, header$ }: WatchOptions
): Observable<TableOfContents> {
  const table = new Map<HTMLAnchorElement, HTMLElement>()
  for (const anchor of anchors) {
    const id = decodeURIComponent(anchor.hash.substring(1))
    const target = getElement(`[id="${id}"]`)
    if (typeof target !== "undefined")
      table.set(anchor, target)
  }

  /* Compute necessary adjustment for header */
  const adjust$ = header$
    .pipe(
      map(header => 24 + header.height)
    )

  /* Compute partition of previous and next anchors */
  const partition$ = watchElementSize(document.body)
    .pipe(
      distinctUntilKeyChanged("height"),

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

          /* If the current anchor is hidden, continue with its parent */
          let offset = target.offsetTop
          while (!offset && target.parentElement) {
            target = target.parentElement
            offset = target.offsetTop
          }

          /* Map reversed anchor path to vertical offset */
          return index.set(
            [...path = [...path, anchor]].reverse(),
            offset
          )
        }, new Map<HTMLAnchorElement[], number>())
      }),

      /* Sort index by vertical offset (see https://bit.ly/30z6QSO) */
      map(index => new Map([...index].sort(([, a], [, b]) => a - b))),

      /* Re-compute partition when viewport offset changes */
      switchMap(index => combineLatest([adjust$, viewport$])
        .pipe(
          scan(([prev, next], [adjust, { offset: { y } }]) => {

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
          distinctUntilChanged((a, b) => (
            a[0] === b[0] &&
            a[1] === b[1]
          ))
        )
      )
    )

  /* Compute and return anchor list migrations */
  return partition$
    .pipe(
      map(([prev, next]) => ({
        prev: prev.map(([path]) => path),
        next: next.map(([path]) => path)
      })),

      /* Extract anchor list migrations */
      startWith({ prev: [], next: [] }),
      bufferCount(2, 1),
      map(([a, b]) => {

        /* Moving down */
        if (a.prev.length < b.prev.length) {
          return {
            prev: b.prev.slice(Math.max(0, a.prev.length - 1), b.prev.length),
            next: []
          }

        /* Moving up */
        } else {
          return {
            prev: b.prev.slice(-1),
            next: b.next.slice(0, b.next.length - a.next.length)
          }
        }
      })
    )
}

/* ------------------------------------------------------------------------- */

/**
 * Mount table of contents
 *
 * @param el - Anchor list element
 * @param options - Options
 *
 * @returns Table of contents component observable
 */
export function mountTableOfContents(
  el: HTMLElement, options: MountOptions
): Observable<Component<TableOfContents>> {
  const internal$ = new Subject<TableOfContents>()
  internal$
    .pipe(
      observeOn(animationFrameScheduler),
    )
      .subscribe(({ prev, next }) => {

        /* Look forward */
        for (const [anchor] of next) {
          resetAnchorActive(anchor)
          resetAnchorState(anchor)
        }

        /* Look backward */
        for (const [index, [anchor]] of prev.entries()) {
          setAnchorActive(anchor, index === prev.length - 1)
          setAnchorState(anchor, "blur")
        }
      })

  /* Create and return component */
  const anchors = getElements<HTMLAnchorElement>("[href^=\\#]", el)
  return watchTableOfContents(anchors, options)
    .pipe(
      tap(internal$),
      finalize(() => internal$.complete()),
      map(state => ({ ref: el, ...state }))
    )
}
