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
  Subject,
  animationFrameScheduler,
  asyncScheduler,
  auditTime,
  combineLatest,
  defer,
  distinctUntilChanged,
  endWith,
  finalize,
  first,
  from,
  fromEvent,
  ignoreElements,
  map,
  mergeMap,
  observeOn,
  takeUntil,
  tap,
  withLatestFrom
} from "rxjs"

import {
  Viewport,
  getElement,
  getElementOffset,
  getElementSize,
  getElements
} from "~/browser"

import { Component } from "../_"
import { Header } from "../header"
import { Main } from "../main"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Sidebar
 */
export interface Sidebar {
  height: number                       /* Sidebar height */
  locked: boolean                      /* Sidebar is locked */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Watch options
 */
interface WatchOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
  main$: Observable<Main>              /* Main area observable */
}

/**
 * Mount options
 */
interface MountOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
  header$: Observable<Header>          /* Header observable */
  main$: Observable<Main>              /* Main area observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch sidebar
 *
 * This function returns an observable that computes the visual parameters of
 * the sidebar which depends on the vertical viewport offset, as well as the
 * height of the main area. When the page is scrolled beyond the header, the
 * sidebar is locked and fills the remaining space.
 *
 * @param el - Sidebar element
 * @param options - Options
 *
 * @returns Sidebar observable
 */
export function watchSidebar(
  el: HTMLElement, { viewport$, main$ }: WatchOptions
): Observable<Sidebar> {
  const parent = el.closest<HTMLElement>(".md-grid")!
  const adjust =
    parent.offsetTop -
    parent.parentElement!.offsetTop

  /* Compute the sidebar's available height and if it should be locked */
  return combineLatest([main$, viewport$])
    .pipe(
      map(([{ offset, height }, { offset: { y } }]) => {
        height = height
          + Math.min(adjust, Math.max(0, y - offset))
          - adjust
        return {
          height,
          locked: y >= offset + adjust
        }
      }),
      distinctUntilChanged((a, b) => (
        a.height === b.height &&
        a.locked === b.locked
      ))
    )
}

/**
 * Mount sidebar
 *
 * This function doesn't set the height of the actual sidebar, but of its first
 * child – the `.md-sidebar__scrollwrap` element in order to mitigiate jittery
 * sidebars when the footer is scrolled into view. At some point we switched
 * from `absolute` / `fixed` positioning to `sticky` positioning, significantly
 * reducing jitter in some browsers (respectively Firefox and Safari) when
 * scrolling from the top. However, top-aligned sticky positioning means that
 * the sidebar snaps to the bottom when the end of the container is reached.
 * This is what leads to the mentioned jitter, as the sidebar's height may be
 * updated too slowly.
 *
 * This behaviour can be mitigiated by setting the height of the sidebar to `0`
 * while preserving the padding, and the height on its first element.
 *
 * @param el - Sidebar element
 * @param options - Options
 *
 * @returns Sidebar component observable
 */
export function mountSidebar(
  el: HTMLElement, { header$, ...options }: MountOptions
): Observable<Component<Sidebar>> {
  const inner = getElement(".md-sidebar__scrollwrap", el)
  const { y } = getElementOffset(inner)
  return defer(() => {
    const push$ = new Subject<Sidebar>()
    const done$ = push$.pipe(ignoreElements(), endWith(true))
    const next$ = push$
      .pipe(
        auditTime(0, animationFrameScheduler)
      )

    /* Update sidebar height and offset */
    next$.pipe(withLatestFrom(header$))
      .subscribe({

        /* Handle emission */
        next([{ height }, { height: offset }]) {
          inner.style.height = `${height - 2 * y}px`
          el.style.top       = `${offset}px`
        },

        /* Handle complete */
        complete() {
          inner.style.height = ""
          el.style.top       = ""
        }
      })

    /* Bring active item into view on initial load */
    next$.pipe(first())
      .subscribe(() => {
        for (const item of getElements(".md-nav__link--active[href]", el)) {
          if (!item.clientHeight) // skip invisible toc in left sidebar
            continue
          const container = item.closest<HTMLElement>(".md-sidebar__scrollwrap")!
          if (typeof container !== "undefined") {
            const offset = item.offsetTop - container.offsetTop
            const { height } = getElementSize(container)
            container.scrollTo({
              top: offset - height / 2
            })
          }
        }
      })

    /* Handle accessibility for expandable items, see https://bit.ly/3jaod9p */
    from(getElements<HTMLLabelElement>("label[tabindex]", el))
      .pipe(
        mergeMap(label => fromEvent(label, "click")
          .pipe(
            observeOn(asyncScheduler),
            map(() => label),
            takeUntil(done$)
          )
        )
      )
        .subscribe(label => {
          const input = getElement<HTMLInputElement>(`[id="${label.htmlFor}"]`)
          const nav = getElement(`[aria-labelledby="${label.id}"]`)
          nav.setAttribute("aria-expanded", `${input.checked}`)
        })

    /* Create and return component */
    return watchSidebar(el, options)
      .pipe(
        tap(state => push$.next(state)),
        finalize(() => push$.complete()),
        map(state => ({ ref: el, ...state }))
      )
  })
}
