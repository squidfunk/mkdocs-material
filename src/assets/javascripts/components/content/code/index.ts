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

import ClipboardJS from "clipboard"
import {
  EMPTY,
  Observable,
  Subject,
  defer,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  finalize,
  map,
  mergeWith,
  switchMap,
  takeLast,
  takeUntil,
  tap
} from "rxjs"

import { feature } from "~/_"
import {
  getElementContentSize,
  watchElementSize
} from "~/browser"
import { renderClipboardButton } from "~/templates"

import { Component } from "../../_"
import {
  Annotation,
  mountAnnotationList
} from "../annotation"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Code block
 */
export interface CodeBlock {
  scrollable: boolean                  /* Code block overflows */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Mount options
 */
interface MountOptions {
  print$: Observable<boolean>          /* Media print observable */
}

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Global sequence number for Clipboard.js integration
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
): Observable<CodeBlock> {
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
 * @param el - Code block element
 * @param options - Options
 *
 * @returns Code block and annotation component observable
 */
export function mountCodeBlock(
  el: HTMLElement, options: MountOptions
): Observable<Component<CodeBlock | Annotation>> {
  const { matches: hover } = matchMedia("(hover)")
  return defer(() => {
    const push$ = new Subject<CodeBlock>()
    push$.subscribe(({ scrollable }) => {
      if (scrollable && hover)
        el.setAttribute("tabindex", "0")
      else
        el.removeAttribute("tabindex")
    })

    /* Render button for Clipboard.js integration */
    if (ClipboardJS.isSupported()) {
      const parent = el.closest("pre")!
      parent.id = `__code_${++sequence}`
      parent.insertBefore(
        renderClipboardButton(parent.id),
        el
      )
    }

    /* Handle code annotations */
    const container = el.closest([
      ":not(td):not(.code) > .highlight",
      ".highlighttable"
    ].join(", "))
    if (container instanceof HTMLElement) {
      const list = findCandidateList(container)

      /* Mount code annotations, if enabled */
      if (typeof list !== "undefined" && (
        container.classList.contains("annotate") ||
        feature("content.code.annotate")
      )) {
        const annotations$ = mountAnnotationList(list, el, options)

        /* Create and return component */
        return watchCodeBlock(el)
          .pipe(
            tap(state => push$.next(state)),
            finalize(() => push$.complete()),
            map(state => ({ ref: el, ...state })),
            mergeWith(watchElementSize(container)
              .pipe(
                takeUntil(push$.pipe(takeLast(1))),
                map(({ width, height }) => width && height),
                distinctUntilChanged(),
                switchMap(active => active ? annotations$ : EMPTY)
              )
            )
          )
      }
    }

    /* Create and return component */
    return watchCodeBlock(el)
      .pipe(
        tap(state => push$.next(state)),
        finalize(() => push$.complete()),
        map(state => ({ ref: el, ...state }))
      )
  })
}
