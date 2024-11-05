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

import { EMPTY, Observable, defer } from "rxjs"

import { Component } from "../../../_"
import { Annotation } from "../_"
import { mountAnnotationList } from "../list"

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
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Find list element directly following a block
 *
 * @param el - Annotation block element
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
 * Mount annotation block
 *
 * @param el - Annotation block element
 * @param options - Options
 *
 * @returns Annotation component observable
 */
export function mountAnnotationBlock(
  el: HTMLElement, options: MountOptions
): Observable<Component<Annotation>> {
  return defer(() => {
    const list = findList(el)
    return typeof list !== "undefined"
      ? mountAnnotationList(list, el, options)
      : EMPTY
  })
}
