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
  defer,
  finalize,
  merge,
  share,
  startWith,
  takeLast,
  takeUntil
} from "rxjs"

import {
  getElement,
  getElements
} from "~/browser"
import { renderAnnotation } from "~/templates"

import { Component } from "../../../../_"
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
 * Find all code annotation markers in the given code block
 *
 * @param container - Containing code block element
 *
 * @returns Code annotation markers
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
 * Mount code annotation list
 *
 * @param el - Code annotation list element
 * @param container - Containing code block element
 * @param options - Options
 *
 * @returns Code annotation list component observable
 */
export function mountAnnotationList(
  el: HTMLElement, container: HTMLElement, options: MountOptions
): Observable<Component<Annotation>> {
  const { print$ } = options

  /* Find and replace all markers with empty annotations */
  const annotations = new Map<number, HTMLElement>()
  for (const marker of findAnnotationMarkers(container)) {
    const [, id] = marker.textContent!.match(/\((\d+)\)/)!
    annotations.set(+id, renderAnnotation(+id))
    marker.replaceWith(annotations.get(+id)!)
  }

  /* Create and return component */
  return defer(() => {
    const done$ = new Subject<void>()

    /* Handle print mode - see https://bit.ly/3rgPdpt */
    print$
      .pipe(
        startWith(false),
        takeUntil(done$.pipe(takeLast(1)))
      )
        .subscribe(active => {
          el.hidden = !active

          /* Move annotation contents back into list */
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
