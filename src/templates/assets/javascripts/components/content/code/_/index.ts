/*
 * Copyright (c) 2016-2025 Martin Donath <martin.donath@squidfunk.com>
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

import ClipboardJS from "clipboard"
import {
  EMPTY,
  Observable,
  Subject,
  asyncScheduler,
  defer,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  finalize,
  from,
  fromEvent,
  map,
  merge,
  mergeMap,
  mergeWith,
  observeOn,
  scan,
  share,
  shareReplay,
  startWith,
  switchMap,
  take,
  takeLast,
  takeUntil,
  tap,
  withLatestFrom
} from "rxjs"

import { feature } from "~/_"
import {
  getElement,
  getElementContentSize,
  getElements,
  getOptionalElement,
  watchElementHover,
  watchElementSize,
  watchElementVisibility,
  watchLocationHash
} from "~/browser"
import {
  Tooltip,
  mountInlineTooltip2
} from "~/components/tooltip2"
import {
  renderClipboardButton,
  renderCodeBlockNavigation,
  renderSelectionButton
} from "~/templates"

import { Component } from "../../../_"
import {
  Annotation,
  mountAnnotationList
} from "../../annotation"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Code block overflow
 */
export interface Overflow {
  scrollable: boolean                  /* Code block overflows */
}

/**
 * Code block
 */
export type CodeBlock =
  | Overflow
  | Annotation
  | Tooltip

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Mount options
 */
interface MountOptions {
  target$: Observable<HTMLElement>     /* Location target observable */
  print$: Observable<boolean>          /* Media print observable */
}

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Global sequence number for code blocks
 */
let sequence = 0

/**
 * Shift-key observable - @todo consolidate with keyboard observable
 */
const shift$ = merge(
  fromEvent(window, "keydown").pipe(map(() => true)),
  merge(
    fromEvent(window, "keyup"),
    fromEvent(window, "contextmenu")
  )
    .pipe(map(() => false))
)
  .pipe(
    startWith(false),
    shareReplay(1)
  )

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Find list element directly following a code block
 *
 * @param el - Code block element
 *
 * @returns List element or nothing
 */
function findList(el: HTMLElement): HTMLElement | undefined {
  if (el.nextElementSibling) {
    const sibling = el.nextElementSibling as HTMLElement
    if (sibling.tagName === "OL")
      return sibling

    /* Skip empty paragraphs - see https://bit.ly/3r4ZJ2O */
    else if (sibling.tagName === "P" && !sibling.children.length)
      return findList(sibling)
  }

  /* Everything else */
  return undefined
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch code block
 *
 * This function monitors size changes of the viewport, as well as switches of
 * content tabs with embedded code blocks, as both may trigger overflow.
 *
 * @param el - Code block element
 *
 * @returns Code block observable
 */
export function watchCodeBlock(
  el: HTMLElement
): Observable<Overflow> {
  return watchElementSize(el)
    .pipe(
      map(({ width }) => {
        const content = getElementContentSize(el)
        return {
          scrollable: content.width > width
        }
      }),
      distinctUntilKeyChanged("scrollable")
    )
}

/**
 * Mount code block
 *
 * This function ensures that an overflowing code block is focusable through
 * keyboard, so it can be scrolled without a mouse to improve on accessibility.
 * Furthermore, if code annotations are enabled, they are mounted if and only
 * if the code block is currently visible, e.g., not in a hidden content tab.
 *
 * Note that code blocks may be mounted eagerly or lazily. If they're mounted
 * lazily (on first visibility), code annotation anchor links will not work,
 * as they are evaluated on initial page load, and code annotations in general
 * might feel a little bumpier.
 *
 * @param el - Code block element
 * @param options - Options
 *
 * @returns Code block and annotation component observable
 */
export function mountCodeBlock(
  el: HTMLElement, options: MountOptions
): Observable<Component<CodeBlock>> {
  const { matches: hover } = matchMedia("(hover)")

  /* Defer mounting of code block - see https://bit.ly/3vHVoVD */
  const factory$ = defer(() => {
    const push$ = new Subject<Overflow>()
    const done$ = push$.pipe(takeLast(1))
    push$.subscribe(({ scrollable }) => {
      if (scrollable && hover)
        el.setAttribute("tabindex", "0")
      else
        el.removeAttribute("tabindex")
    })

    // Code block sequence number
    const buttons: HTMLElement[] = []
    const parent = el.closest("pre")!

    // Check if there's a parent element with an id, and use that id, otherwise
    // generate a new one. This is necessary to allow for authors to define
    // unique ids for code blocks - see https://t.ly/q7UEq
    const unique = parent.closest("[id]")
    const id = unique ? unique.id : sequence++
    parent.id = `__code_${id}`

    /* Handle code annotations and highlights */
    const content$: Array<Observable<Component<CodeBlock>>> = []
    const container = el.closest(".highlight")
    if (container instanceof HTMLElement) {
      const list = findList(container)

      /* Mount code annotations, if enabled */
      if (typeof list !== "undefined" && (
        container.classList.contains("annotate") ||
        feature("content.code.annotate")
      )) {
        const annotations$ = mountAnnotationList(list, el, options)
        content$.push(
          watchElementSize(container)
            .pipe(
              takeUntil(done$),
              map(({ width, height }) => width && height),
              distinctUntilChanged(),
              switchMap(active => active ? annotations$ : EMPTY)
            )
        )
      }
    }

    // @todo: refactor and move into separate component

    /* Check if code block has line spans */
    const spans = getElements(":scope > span[id]", el)
    if (spans.length) {
      el.classList.add("md-code__content")

      /* Mount code selection */
      if (el.closest(".select") || (
        feature("content.code.select") && !el.closest(".no-select")
      )) {
        const base = +spans[0].id.split("-").pop()!

        /* Mount tooltip, if enabled */
        const button = renderSelectionButton()
        buttons.push(button)
        if (feature("content.tooltips"))
          content$.push(mountInlineTooltip2(button, { viewport$ }))

        /* Selection state */
        const select$ = fromEvent(button, "click")
          .pipe(
            scan(active => !active, false),
            tap(() => button.blur()),
            share()
          )

        /* Toggle active selection state on button */
        select$.subscribe(active => {
          button.classList.toggle("md-code__button--active", active)
        })

        /* Observable that monitors hovering */
        const hover$ = from(spans)
          .pipe(
            mergeMap(span => watchElementHover(span)
              .pipe(
                map(active => [span, active] as const)
              )
            )
          )

        /* Trigger hover selection state based on state */
        select$
          .pipe(
            switchMap(active => active ? hover$ : EMPTY)
          )
            .subscribe(([span, active]) => {
              // @todo: don't mutate, but wrap everything in selection elements
              const highlight = getOptionalElement(".hll.select", span)
              if (highlight && !active) {
                highlight.replaceWith(...Array.from(highlight.childNodes))
              } else if (!highlight && active) {
                const hll = document.createElement("span")
                hll.className = "hll select"
                hll.append(...Array.from(span.childNodes).slice(1))
                span.append(hll)
              }
            })

        // @todo: use a single event handler and consolidate events
        const click$ = from(spans)
          .pipe(
            mergeMap(span => fromEvent(span, "mousedown")
              .pipe(
                tap(ev => ev.preventDefault()),
                map(() => span)
              )
            )
          )

        const range$ = select$
          .pipe(
            switchMap(active => active ? click$ : EMPTY),
            withLatestFrom(shift$),
            map(([span, shift]) => {

              /* Determine focused line number */
              const active = spans.indexOf(span) + base
              if (shift === false) {
                return [active, active] as const

                /* Shift is pressed, so extend selection */
              } else {
                const range = getElements(".hll", el)
                  .map(line => spans.indexOf(line.parentElement!) + base)

                // Hack: this is a side effect, but we need to remove all ranges
                // or rendering might look weird.
                window.getSelection()?.removeAllRanges()

                /* Return range */
                return [
                  Math.min(active, ...range),
                  Math.max(active, ...range)
                ] as const
              }
            })
          )

        // Currently, all mounted code blocks will receive this event. That#s
        // not ideal, since we should handle this higher up the tree
        const hash$ = watchLocationHash(EMPTY)
          .pipe(
            // @todo: make more resilient
            filter(hash => hash.startsWith(`__codelineno-${id}-`))
          )

        hash$.subscribe(hash => {
          const [, , line] = hash.split("-")
          const range = line.split(":").map(value => +value - base + 1)
          if (range.length === 1)
            range.push(range[0])

          // remove all existing, then set range...
          for (const span of getElements(".hll:not(.select)", el)) {
            span.replaceWith(...Array.from(span.childNodes))
          }

          // set new range @todo move this into one block
          const selection = spans.slice(range[0] - 1, range[1])
          for (const span of selection) {
            const hll = document.createElement("span")
            hll.className = "hll"
            hll.append(...Array.from(span.childNodes).slice(1))
            span.append(hll)
          }
        })

        hash$.pipe(take(1), observeOn(asyncScheduler))
          .subscribe(hash => {
            if (hash.includes(":")) {
              const anchor = document.getElementById(hash.split(":")[0])
              if (anchor) {
                // this is a hack - we will refactor anchor / targetting as one
                // of the next big things when merging one of the next goals.
                // we need to unify how offsets are computed for tooltips and
                // make the whole experience smoother.
                setTimeout(() => {
                  let tmp = anchor
                  let top = -(48 + 16)
                  while (tmp !== document.body) {
                    top += tmp.offsetTop
                    tmp  = tmp.offsetParent as HTMLElement
                  }
                  window.scrollTo({ top })
                }, 1)
              }
            }
          })

        /* Allow selection via anchor links */
        const jump$ = from(
          getElements("a[href^=\"#__codelineno\"]", container!)
        )
          .pipe(
            mergeMap(anchor => fromEvent(anchor, "click")
              .pipe(
                tap(ev => ev.preventDefault()),
                map(() => anchor as HTMLAnchorElement)
              )
            )
          )

        /* Determine next highlighted lines */
        const next$ = jump$
          .pipe(
            takeUntil(done$),
            withLatestFrom(shift$),
            map(([anchor, shift]) => {
              const target = getElement(`[id="${anchor.hash.slice(1)}"]`)

              /* Determine focused line number */
              const active = +target.parentElement!.id.split("-").pop()!
              if (shift === false) {
                return [active, active] as const

              /* Shift is pressed, so extend selection */
              } else {
                const range = getElements(".hll", el)
                  .map(line => +line.parentElement!.id.split("-").pop()!)

                /* Return range */
                return [
                  Math.min(active, ...range),
                  Math.max(active, ...range)
                ] as const
              }
            })
          )

        // Push selection to URL
        merge(range$, next$).subscribe(range => {
          // @todo: improve resilience, so we're not dependent on class names
          let hash = `#__codelineno-${id}-`
          if (range[0] === range[1]) {
            hash += range[0]
          } else {
            hash += `${range[0]}:${range[1]}`
          }
          history.replaceState({}, "", hash)
          // @hack dispatch artificial hashchange event
          window.dispatchEvent(new HashChangeEvent("hashchange", {
            newURL: window.location.origin + window.location.pathname + hash,
            oldURL: window.location.href
          }))
        })
      }
    }

    /* Render button for Clipboard.js integration */
    if (ClipboardJS.isSupported()) {
      if (el.closest(".copy") || (
        feature("content.code.copy") && !el.closest(".no-copy")
      )) {

        /* Mount tooltip, if enabled */
        const button = renderClipboardButton(parent.id)
        buttons.push(button)
        if (feature("content.tooltips"))
          content$.push(mountInlineTooltip2(button, { viewport$ }))
      }
    }

    // @hack Render code navigation and buttons
    if (buttons.length) {
      const nav = renderCodeBlockNavigation()
      nav.append(...buttons)
      parent.insertBefore(nav, el)
    }

    /* Create and return component */
    return watchCodeBlock(el)
      .pipe(
        tap(state => push$.next(state)),
        finalize(() => push$.complete()),
        map(state => ({ ref: el, ...state })),
        mergeWith(merge(...content$).pipe(
          takeUntil(done$)
        )),
      )
  })

  /* Mount code block lazily */
  if (feature("content.lazy"))
    return watchElementVisibility(el)
      .pipe(
        filter(visible => visible),
        take(1),
        switchMap(() => factory$)
      )

  /* Mount code block */
  return factory$
}
