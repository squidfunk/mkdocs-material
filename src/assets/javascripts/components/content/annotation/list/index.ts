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
  EMPTY,
  Observable,
  Subject,
  defer,
  finalize,
  merge,
  share,
  takeLast,
  takeUntil
} from "rxjs"

import {
  getElement,
  getElements,
  getOptionalElement
} from "~/browser"
import { renderAnnotation } from "~/templates"

import { Component } from "../../../_"
import {
  Annotation,
  mountAnnotation
} from "../_"

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
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Find all annotation markers in the given code block
 *
 * @param container - Containing element
 *
 * @returns Annotation markers
 */
function findAnnotationMarkers(container: HTMLElement): Text[] {
  const markers: Text[] = []
  for (const comment of getElements(".c, .c1, .cm", container)) {
    let match: RegExpExecArray | null
    let text = comment.firstChild as Text

    /* Split text at marker and add to list */
    while ((match = /\((\d+)\)/.exec(text.textContent!))) {
      const marker = text.splitText(match.index)
      text = marker.splitText(match[0].length)
      markers.push(marker)
    }
  }
  return markers
}

/**
 * Swap the child nodes of two elements
 *
 * @param source - Source element
 * @param target - Target element
 */
function swap(source: HTMLElement, target: HTMLElement): void {
  target.append(...Array.from(source.childNodes))
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount annotation list
 *
 * This function analyzes the containing code block and checks for markers
 * referring to elements in the given annotation list. If no markers are found,
 * the list is left untouched. Otherwise, list elements are rendered as
 * annotations inside the code block.
 *
 * @param el - Annotation list element
 * @param container - Containing element
 * @param options - Options
 *
 * @returns Annotation component observable
 */
export function mountAnnotationList(
  el: HTMLElement, container: HTMLElement, { print$ }: MountOptions
): Observable<Component<Annotation>> {

  /* Find and replace all markers with empty annotations */
  const annotations = new Map<number, HTMLElement>()
  for (const marker of findAnnotationMarkers(container)) {
    const [, id] = marker.textContent!.match(/\((\d+)\)/)!
    if (getOptionalElement(`li:nth-child(${id})`, el)) {
      annotations.set(+id, renderAnnotation(+id))
      marker.replaceWith(annotations.get(+id)!)
    }
  }

  /* Keep list if there are no annotations to render */
  if (annotations.size === 0)
    return EMPTY

  /* Create and return component */
  return defer(() => {
    const done$ = new Subject<void>()

    /* Handle print mode - see https://bit.ly/3rgPdpt */
    print$
      .pipe(
        takeUntil(done$.pipe(takeLast(1)))
      )
        .subscribe(active => {
          el.hidden = !active

          /* Show annotations in code block or list (print) */
          for (const [id, annotation] of annotations) {
            const inner = getElement(".md-typeset", annotation)
            const child = getElement(`li:nth-child(${id})`, el)
            if (!active)
              swap(child, inner)
            else
              swap(inner, child)
          }
        })

    /* Create and return component */
    return merge(...[...annotations]
      .map(([, annotation]) => (
        mountAnnotation(annotation, container)
      ))
    )
      .pipe(
        finalize(() => done$.complete()),
        share()
      )
  })
}
