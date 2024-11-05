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

import ClipboardJS from "clipboard"
import {
  EMPTY,
  Observable,
  Subject,
  defer,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  finalize,
  map,
  mergeWith,
  switchMap,
  take,
  takeLast,
  takeUntil,
  tap
} from "rxjs"

import { feature } from "~/_"
import {
  getElementContentSize,
  getElements,
  watchElementSize,
  watchElementVisibility
} from "~/browser"
import {
  Tooltip,
  mountInlineTooltip2
} from "~/components/tooltip2"
import { renderClipboardButton } from "~/templates"

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

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Find candidate list element directly following a code block
 *
 * @param el - Code block element
 *
 * @returns List element or nothing
 */
function findCandidateList(el: HTMLElement): HTMLElement | undefined {
  if (el.nextElementSibling) {
    const sibling = el.nextElementSibling as HTMLElement
    if (sibling.tagName === "OL")
      return sibling

    /* Skip empty paragraphs - see https://bit.ly/3r4ZJ2O */
    else if (sibling.tagName === "P" && !sibling.children.length)
      return findCandidateList(sibling)
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

    /* Render button for Clipboard.js integration */
    const content$: Array<Observable<Component<CodeBlock>>> = []
    if (ClipboardJS.isSupported()) {
      if (el.closest(".copy") || (
        feature("content.code.copy") && !el.closest(".no-copy")
      )) {
        const parent = el.closest("pre")!
        parent.id = `__code_${sequence++}`

        /* Mount tooltip, if enabled */
        const button = renderClipboardButton(parent.id)
        parent.insertBefore(button, el)
        if (feature("content.tooltips"))
          content$.push(mountInlineTooltip2(button, { viewport$ }))
      }
    }

    /* Handle code annotations */
    const container = el.closest(".highlight")
    if (container instanceof HTMLElement) {
      const list = findCandidateList(container)

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

    // If the code block has line spans, we can add this additional class to
    // the code block element, which fixes the problem for highlighted code
    // lines not stretching to the entirety of the screen when the code block
    // overflows, e.g., on mobile - see
    const spans = getElements(":scope > span[id]", el)
    if (spans.length)
      el.classList.add("md-code__content")

    /* Create and return component */
    return watchCodeBlock(el)
      .pipe(
        tap(state => push$.next(state)),
        finalize(() => push$.complete()),
        map(state => ({ ref: el, ...state })),
        mergeWith(...content$)
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
