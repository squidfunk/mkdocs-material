/*
 * Copyright (c) 2016-2022 Martin Donath <martin.donath@squidfunk.com>
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
  finalize,
  fromEvent,
  map,
  merge,
  skip,
  startWith,
  subscribeOn,
  takeLast,
  takeUntil,
  tap,
  withLatestFrom
} from "rxjs"

import { feature } from "~/_"
import {
  Viewport,
  getElement,
  getElementContentOffset,
  getElementContentSize,
  getElementOffset,
  getElementSize,
  getElements,
  watchElementContentOffset,
  watchElementSize
} from "~/browser"
import { renderTabbedControl } from "~/templates"

import { Component } from "../../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Content tabs
 */
export interface ContentTabs {
  active: HTMLLabelElement             /* Active tab label */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Mount options
 */
interface MountOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch content tabs
 *
 * @param el - Content tabs element
 *
 * @returns Content tabs observable
 */
export function watchContentTabs(
  el: HTMLElement
): Observable<ContentTabs> {
  const inputs = getElements<HTMLInputElement>(":scope > input", el)
  const initial = inputs.find(input => input.checked) || inputs[0]
  return merge(...inputs.map(input => fromEvent(input, "change")
    .pipe(
      map(() => getElement<HTMLLabelElement>(`label[for="${input.id}"]`))
    )
  ))
    .pipe(
      startWith(getElement<HTMLLabelElement>(`label[for="${initial.id}"]`)),
      map(active => ({ active }))
    )
}

/**
 * Mount content tabs
 *
 * This function scrolls the active tab into view. While this functionality is
 * provided by browsers as part of `scrollInfoView`, browsers will always also
 * scroll the vertical axis, which we do not want. Thus, we decided to provide
 * this functionality ourselves.
 *
 * @param el - Content tabs element
 * @param options - Options
 *
 * @returns Content tabs component observable
 */
export function mountContentTabs(
  el: HTMLElement, { viewport$ }: MountOptions
): Observable<Component<ContentTabs>> {

  /* Render content tab previous button for pagination */
  const prev = renderTabbedControl("prev")
  el.append(prev)

  /* Render content tab next button for pagination */
  const next = renderTabbedControl("next")
  el.append(next)

  /* Mount component on subscription */
  const container = getElement(".tabbed-labels", el)
  return defer(() => {
    const push$ = new Subject<ContentTabs>()
    const done$ = push$.pipe(takeLast(1))
    combineLatest([push$, watchElementSize(el)])
      .pipe(
        auditTime(1, animationFrameScheduler),
        takeUntil(done$)
      )
        .subscribe({

          /* Handle emission */
          next([{ active }, size]) {
            const offset = getElementOffset(active)
            const { width } = getElementSize(active)

            /* Set tab indicator offset and width */
            el.style.setProperty("--md-indicator-x", `${offset.x}px`)
            el.style.setProperty("--md-indicator-width", `${width}px`)

            /* Scroll container to active content tab */
            const content = getElementContentOffset(container)
            if (
              offset.x         < content.x              ||
              offset.x + width > content.x + size.width
            )
              container.scrollTo({
                left: Math.max(0, offset.x - 16),
                behavior: "smooth"
              })
          },

          /* Handle complete */
          complete() {
            el.style.removeProperty("--md-indicator-x")
            el.style.removeProperty("--md-indicator-width")
          }
        })

    /* Hide content tab buttons on borders */
    combineLatest([
      watchElementContentOffset(container),
      watchElementSize(container)
    ])
      .pipe(
        takeUntil(done$)
      )
        .subscribe(([offset, size]) => {
          const content = getElementContentSize(container)
          prev.hidden = offset.x < 16
          next.hidden = offset.x > content.width - size.width - 16
        })

    /* Paginate content tab container on click */
    merge(
      fromEvent(prev, "click").pipe(map(() => -1)),
      fromEvent(next, "click").pipe(map(() => +1))
    )
      .pipe(
        takeUntil(done$)
      )
        .subscribe(direction => {
          const { width } = getElementSize(container)
          container.scrollBy({
            left: width * direction,
            behavior: "smooth"
          })
        })

    /* Set up linking of content tabs, if enabled */
    if (feature("content.tabs.link"))
      push$.pipe(
        skip(1),
        withLatestFrom(viewport$)
      )
        .subscribe(([{ active }, { offset }]) => {
          const tab = active.innerText.trim()
          if (active.hasAttribute("data-md-switching")) {
            active.removeAttribute("data-md-switching")

          /* Determine viewport offset of active tab */
          } else {
            const y = el.offsetTop - offset.y

            /* Passively activate other tabs */
            for (const set of getElements("[data-tabs]"))
              for (const input of getElements<HTMLInputElement>(
                ":scope > input", set
              )) {
                const label = getElement(`label[for="${input.id}"]`)
                if (
                  label !== active &&
                  label.innerText.trim() === tab
                ) {
                  label.setAttribute("data-md-switching", "")
                  input.click()
                  break
                }
              }

            /* Bring active tab into view */
            window.scrollTo({
              top: el.offsetTop - y
            })

            /* Persist active tabs in local storage */
            const tabs = __md_get<string[]>("__tabs") || []
            __md_set("__tabs", [...new Set([tab, ...tabs])])
          }
        })

    /* Create and return component */
    return watchContentTabs(el)
      .pipe(
        tap(state => push$.next(state)),
        finalize(() => push$.complete()),
        map(state => ({ ref: el, ...state }))
      )
  })
    .pipe(
      subscribeOn(asyncScheduler)
    )
}
