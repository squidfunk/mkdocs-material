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

import { reduce, reverse } from "ramda"
import { Observable } from "rxjs"
import {
  distinctUntilChanged,
  map,
  scan,
  shareReplay
} from "rxjs/operators"

import { ViewportOffset, getElement } from "../../ui"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Anchors
 */
export interface Anchors {
  past: HTMLAnchorElement[][]          /* Past anchors */
  next: HTMLAnchorElement[][]          /* Next anchors */
}

/* ----------------------------------------------------------------------------
 * Function types
 * ------------------------------------------------------------------------- */

/**
 * Options
 */
interface Options {
  offset$: Observable<ViewportOffset>  /* Viewport offset observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Set anchor blur
 *
 * @param anchor - Anchor HTML element
 * @param blur - Anchor blur
 */
export function setAnchorBlur(
  anchor: HTMLAnchorElement, blur: boolean
): void {
  anchor.setAttribute("data-md-state", blur ? "blur" : "")
}

/**
 * Set sidebar state lock
 *
 * @param anchor - Anchor HTML element
 * @param active - Whether the anchor is active
 */
export function setAnchorActive(
  anchor: HTMLAnchorElement, active: boolean
): void {
  anchor.classList.toggle("md-nav__link--active", active)
}

/**
 * Reset anchor
 *
 * @param anchor - Anchor HTML element
 */
export function resetAnchor(anchor: HTMLAnchorElement) {
  anchor.removeAttribute("data-md-state")
  anchor.classList.remove("md-nav__link--active")
}

/* ------------------------------------------------------------------------- */

/**
 * Create an observable to monitor all anchors in respect to viewport offset
 *
 * @param anchors - Anchor elements
 * @param header - Header element
 * @param options - Options
 *
 * @return Sidebar observable
 */
export function watchAnchors(
  anchors: HTMLAnchorElement[], header: HTMLElement, { offset$ }: Options
): Observable<Anchors> {

  /* Adjust for header offset if fixed */
  const adjust = getComputedStyle(header)
    .getPropertyValue("position") === "fixed"
      ? 18 + header.offsetHeight
      : 18

  /* Build index to map anchors to their targets */
  const index = new Map<HTMLAnchorElement, HTMLElement>()
  for (const anchor of anchors) {
    const target = getElement(decodeURIComponent(anchor.hash))
    if (typeof target !== "undefined")
      index.set(anchor, target)
  }

  /* Build table to map anchor paths to vertical offsets */
  const table = new Map<HTMLAnchorElement[], number>()
  reduce((path, [anchor, target]) => {
    while (path.length) {
      const last = index.get(path[path.length - 1])!
      if (last.tagName >= target.tagName)
        path.pop()
      else
        break
    }
    table.set(reverse(path = [...path, anchor]), target.offsetTop)
    return path
  }, [] as HTMLAnchorElement[], [...index])

  /* Compute partition of past and next anchors */
  const partition$ = offset$
    .pipe(
      scan(([past, next], { y }) => {
        y = y + adjust

        /* Look forward */
        while (next.length) {
          const [, offset] = next[0]
          if (offset < y) {
            past = [...past, next.shift()!]
          } else {
            break
          }
        }

        /* Look backward */
        while (past.length) {
          const [, offset] = past[past.length - 1]
          if (offset >= y) {
            next = [past.pop()!, ...next]
          } else {
            break
          }
        }

        /* Return new partition */
        return [past, next]
      }, [[], [...table]]),
      distinctUntilChanged(([a0, a1], [b0, b1]) => {
        return a0 === b0 && a1 === b1
      })
    )

  /* Extract anchors and return hot observable */
  return partition$
    .pipe(
      map(([past, next]) => ({
        past: past.map(([els]) => els),
        next: next.map(([els]) => els)
      })),
      shareReplay(1)
    )
}
