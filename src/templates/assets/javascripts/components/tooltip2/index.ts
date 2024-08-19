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
  BehaviorSubject,
  EMPTY,
  Observable,
  Subject,
  animationFrameScheduler,
  combineLatest,
  combineLatestWith,
  debounce,
  defer,
  distinctUntilChanged,
  endWith,
  filter,
  finalize,
  first,
  ignoreElements,
  map,
  mergeMap,
  observeOn,
  queueScheduler,
  share,
  startWith,
  switchMap,
  tap,
  throttleTime,
  timer,
  withLatestFrom
} from "rxjs"

import {
  ElementOffset,
  Viewport,
  getElement,
  getElementContainers,
  getElementOffsetAbsolute,
  getElementSize,
  watchElementContentOffset,
  watchElementFocus,
  watchElementHover
} from "~/browser"
import { renderInlineTooltip2 } from "~/templates"

import { Component } from "../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Tooltip
 */
export interface Tooltip {
  active: boolean                      // Tooltip is active
  offset: ElementOffset                // Tooltip offset
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Dependencies
 */
interface Dependencies {
  content$: Observable<HTMLElement>    // Tooltip content observable
  viewport$: Observable<Viewport>      // Viewport observable
}

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Global sequence number for tooltips
 */
let sequence = 0

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch tooltip
 *
 * This function tracks the tooltip host element, and deduces the active state
 * and offset of the tooltip from it. The active state is determined by whether
 * the host element is focused or hovered, and the offset is determined by the
 * host element's absolute position in the document.
 *
 * @param el - Tooltip host element
 *
 * @returns Tooltip observable
 */
export function watchTooltip2(
  el: HTMLElement
): Observable<Tooltip> {

  // Compute whether tooltip should be shown - we need to watch both focus and
  // hover events on the host element and emit if one of them is active. In case
  // of a hover event, we keep the element visible for a short amount of time
  // after the pointer left the host element for a better user experience.
  const active$ =
    combineLatest([
      watchElementFocus(el),
      watchElementHover(el)
    ])
      .pipe(
        map(([focus, hover]) => focus || hover),
        distinctUntilChanged()
      )

  // We need to determine all parent elements of the host element that are
  // currently scrollable, as they might affect the position of the tooltip
  // depending on their horizontal of vertical offset. We must track all of
  // them and recompute the position of the tooltip if they change.
  const offset$ =
    defer(() => getElementContainers(el)).pipe(
      mergeMap(watchElementContentOffset),
      throttleTime(1),
      // Note that we need to poll the value again if the active state changes,
      // as otherwise the tooltip might be misplaced. This particularly happens
      // when using third-party integrations like tablesort that change the
      // position of elements – see https://t.ly/Y-V7X
      combineLatestWith(active$),
      map(() => getElementOffsetAbsolute(el)),
    )

  // Only track parent elements and compute offset of the tooltip host if the
  // tooltip should be shown - we defer the computation of the offset until the
  // tooltip becomes active for the first time. This is necessary, because we
  // must also keep the tooltip active as long as it is focused or hovered.
  return active$.pipe(
    first(active => active),
    switchMap(() => combineLatest([active$, offset$])),
    map(([active, offset]) => ({ active, offset })),
    share()
  )
}

/**
 * Mount tooltip
 *
 * This function renders a tooltip with the content from the provided `content$`
 * observable as passed via the dependencies. If the returned element has a role
 * of type `dialog`, the tooltip is considered to be interactive, and rendered
 * either above or below the host element, depending on the available space.
 *
 * If the returned element has a role of type `tooltip`, the tooltip is always
 * rendered below the host element and considered to be non-interactive. This
 * allows us to reuse the same positioning logic for both interactive and
 * non-interactive tooltips, as it is largely the same.
 *
 * @param el - Tooltip host element
 * @param dependencies - Dependencies
 *
 * @returns Tooltip component observable
 */
export function mountTooltip2(
  el: HTMLElement, dependencies: Dependencies
): Observable<Component<Tooltip>> {
  const { content$, viewport$ } = dependencies

  // Compute unique tooltip id - this is necessary to associate the tooltip host
  // element with the tooltip element for ARIA purposes
  const id = `__tooltip2_${sequence++}`

  // Create component on subscription
  return defer(() => {
    const push$ = new Subject<Tooltip>()

    // Create subject to track tooltip presence and visibility - we use another
    // purely internal subject to track the tooltip's presence and visibility,
    // as the tooltip should be visible if the host element or tooltip itself
    // is focused or hovered to allow for smooth pointer migration
    const show$ = new BehaviorSubject(false)
    push$.pipe(ignoreElements(), endWith(false))
      .subscribe(show$)

    // Create observable controlling tooltip element - we create and attach the
    // tooltip only if it is actually present, in order to keep the number of
    // elements low. We need to keep the tooltip visible for a short time after
    // the pointer left the host element or tooltip itself. For this, we use an
    // inner subscription to the tooltip observable, which we terminate when the
    // tooltip should not be shown, automatically removing the element. Moreover
    // we use the queue scheduler, which will schedule synchronously in case the
    // tooltip should be shown, and asynchronously if it should be hidden.
    const node$ = show$.pipe(
      debounce(active => timer(+!active * 250, queueScheduler)),
      distinctUntilChanged(),
      switchMap(active => active ? content$ : EMPTY),
      tap(node => node.id = id),
      share()
    )

    // Compute tooltip presence and visibility - the tooltip should be shown if
    // the host element or the tooltip itself is focused or hovered
    combineLatest([
      push$.pipe(map(({ active }) => active)),
      node$.pipe(
        switchMap(node => watchElementHover(node, 250)),
        startWith(false)
      )
    ])
      .pipe(map(states => states.some(active => active)))
      .subscribe(show$)

    // Compute tooltip origin - we need to compute the tooltip origin depending
    // on the position of the host element, the viewport size, as well as the
    // actual size of the tooltip, if positioned above. The tooltip must about
    // to be rendered for this to be correct, which is why we do it here.
    const origin$ = show$.pipe(
      filter(active => active),
      withLatestFrom(node$, viewport$),
      map(([_, node, { size }]) => {
        const host = el.getBoundingClientRect()
        const x = host.width / 2

        // If the tooltip is non-interactive, we always render it below the
        // actual element because all operating systems do it that way
        if (node.role === "tooltip") {
          return { x, y: 8 + host.height }

        // Otherwise, we determine where there is more space, and render the
        // tooltip either above or below the host element
        } else if (host.y >= size.height / 2) {
          const { height } = getElementSize(node)
          return { x, y: -16 - height }
        } else {
          return { x, y: +16 + host.height }
        }
      })
    )

    // Update tooltip position - we always need to update the position of the
    // tooltip, as it might change depending on the viewport offset of the host
    combineLatest([node$, push$, origin$])
      .subscribe(([node, { offset }, origin]) => {
        node.style.setProperty("--md-tooltip-host-x", `${offset.x}px`)
        node.style.setProperty("--md-tooltip-host-y", `${offset.y}px`)

        // Update tooltip origin - this is mainly set to determine the position
        // of the tooltip tail, to show the direction it is originating from
        node.style.setProperty("--md-tooltip-x", `${origin.x}px`)
        node.style.setProperty("--md-tooltip-y", `${origin.y}px`)

        // Update tooltip render location, i.e., whether the tooltip is shown
        // above or below the host element, depending on the available space
        node.classList.toggle("md-tooltip2--top",    origin.y <  0)
        node.classList.toggle("md-tooltip2--bottom", origin.y >= 0)
      })

    // Update tooltip width - we only explicitly set the width of the tooltip
    // if it is non-interactive, in case it should always be rendered centered
    show$.pipe(
      filter(active => active),
      withLatestFrom(node$, (_, node) => node),
      filter(node => node.role === "tooltip")
    )
      .subscribe(node => {
        const size = getElementSize(getElement(":scope > *", node))

        // Set tooltip width and remove tail by setting it to a width of zero -
        // if authors want to keep the tail, we can move this to CSS later
        node.style.setProperty("--md-tooltip-width", `${size.width}px`)
        node.style.setProperty("--md-tooltip-tail",  `${0}px`)
      })

    // Update tooltip visibility - we defer to the next animation frame, because
    // the tooltip must first be added to the document before we make it appear,
    // or it will appear instantly without delay. Additionally, we need to keep
    // the tooltip visible for a short time after the pointer left the host.
    show$.pipe(
      distinctUntilChanged(),
      observeOn(animationFrameScheduler),
      withLatestFrom(node$)
    )
      .subscribe(([active, node]) => {
        node.classList.toggle("md-tooltip2--active", active)
      })

    // Set up ARIA attributes when tooltip is visible
    combineLatest([
      show$.pipe(filter(active => active)),
      node$
    ])
      .subscribe(([_, node]) => {
        if (node.role === "dialog") {
          el.setAttribute("aria-controls", id)
          el.setAttribute("aria-haspopup", "dialog")
        } else {
          el.setAttribute("aria-describedby", id)
        }
      })

    // Remove ARIA attributes when tooltip is hidden
    show$.pipe(filter(active => !active))
      .subscribe(() => {
        el.removeAttribute("aria-controls")
        el.removeAttribute("aria-describedby")
        el.removeAttribute("aria-haspopup")
      })

    // Create and return component
    return watchTooltip2(el)
      .pipe(
        tap(state => push$.next(state)),
        finalize(() => push$.complete()),
        map(state => ({ ref: el, ...state }))
      )
  })
}

// ----------------------------------------------------------------------------

/**
 * Mount inline tooltip
 *
 * @todo refactor this function
 *
 * @param el - Tooltip host element
 * @param dependencies - Dependencies
 * @param container - Container
 *
 * @returns Tooltip component observable
 */
export function mountInlineTooltip2(
  el: HTMLElement, { viewport$ }: { viewport$: Observable<Viewport> },
  container = document.body
): Observable<Component<Tooltip>> {
  return mountTooltip2(el, {
    content$: new Observable<HTMLElement>(observer => {
      const title = el.title
      const node = renderInlineTooltip2(title)
      observer.next(node)
      el.removeAttribute("title")
      // Append tooltip and remove on unsubscription
      container.append(node)
      return () => {
        node.remove()
        el.setAttribute("title", title)
      }
    }),
    viewport$
  })
}
