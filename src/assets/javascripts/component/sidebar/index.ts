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

import { Observable } from "rxjs"
import {
  filter,
  finalize,
  map,
  shareReplay,
  switchMap,
  takeUntil
} from "rxjs/operators"

import { Container } from "../container"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Sidebar state
 */
interface Sidebar {
  height: number                       /* Sidebar height */
  lock: boolean                        /* Sidebar lock */
}

/* ----------------------------------------------------------------------------
 * Function types
 * ------------------------------------------------------------------------- */

/**
 * Options
 */
interface Options {
  container$: Observable<Container>    /* Container state observable */
  toggle$: Observable<boolean>         /* Toggle observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Set sidebar height
 *
 * @param sidebar - Sidebar HTML element
 * @param height - Sidebar height
 */
export function setSidebarHeight(sidebar: HTMLElement, height: number): void {
  sidebar.style.height = `${height}px`
}

/**
 * Unset sidebar height
 *
 * @param sidebar - Sidebar HTML element
 */
export function unsetSidebarHeight(sidebar: HTMLElement): void {
  sidebar.style.height = ""
}

/* ------------------------------------------------------------------------- */

/**
 * Set sidebar lock
 *
 * @param sidebar - Sidebar HTML element
 * @param lock - Sidebar lock
 */
export function setSidebarLock(sidebar: HTMLElement, lock: boolean): void {
  sidebar.setAttribute("data-md-state", lock ? "lock" : "")
}

/**
 * Unset sidebar lock
 *
 * @param sidebar - Sidebar HTML element
 */
export function unsetSidebarLock(sidebar: HTMLElement): void {
  sidebar.removeAttribute("data-md-state")
}

/* ------------------------------------------------------------------------- */

/**
 * Create a observable for a sidebar component
 *
 * @param sidebar - Sidebar element
 * @param options - Options
 *
 * @return Sidebar state observable
 */
export function fromSidebar(
  sidebar: HTMLElement, { container$, toggle$ }: Options
): Observable<Sidebar> {
  const sidebar$ = toggle$.pipe(
    filter(toggle => toggle === true),
    switchMap(() => container$.pipe(
      finalize(() => {
        unsetSidebarHeight(sidebar)
        unsetSidebarLock(sidebar)
      }),
      takeUntil(toggle$.pipe(
        filter(toggle => toggle === false)
      ))
    )),
    map<Container, Sidebar>(({ height, active }) => ({
      height,
      lock: active
    })),
    shareReplay({ bufferSize: 1, refCount: true })
  )

  /* Subscribe sidebar element */
  sidebar$.subscribe(({ height, lock }) => {
    setSidebarHeight(sidebar, height)
    setSidebarLock(sidebar, lock)
  })

  /* Return sidebar observable */
  return sidebar$
}
