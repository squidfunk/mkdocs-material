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

import { JSX as JSXInternal } from "preact"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * HTML attributes
 */
type Attributes =
  & JSXInternal.HTMLAttributes
  & JSXInternal.SVGAttributes
  & Record<string, any>

/**
 * Child element
 */
type Child =
  | HTMLElement
  | Text
  | string
  | number

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Append a child node to an element
 *
 * @param el - Element
 * @param child - Child node(s)
 */
function appendChild(el: HTMLElement, child: Child | Child[]): void {

  /* Handle primitive types (including raw HTML) */
  if (typeof child === "string" || typeof child === "number") {
    el.innerHTML += child.toString()

  /* Handle nodes */
  } else if (child instanceof Node) {
    el.appendChild(child)

  /* Handle nested children */
  } else if (Array.isArray(child)) {
    for (const node of child)
      appendChild(el, node)
  }
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * JSX factory
 *
 * @template T - Element type
 *
 * @param tag - HTML tag
 * @param attributes - HTML attributes
 * @param children - Child elements
 *
 * @returns Element
 */
export function h<T extends keyof HTMLElementTagNameMap>(
  tag: T, attributes?: Attributes | null, ...children: Child[]
): HTMLElementTagNameMap[T]

export function h<T extends h.JSX.Element>(
  tag: string, attributes?: Attributes | null, ...children: Child[]
): T

export function h<T extends h.JSX.Element>(
  tag: string, attributes?: Attributes | null, ...children: Child[]
): T {
  const el = document.createElement(tag)

  /* Set attributes, if any */
  if (attributes)
    for (const attr of Object.keys(attributes)) {
      if (typeof attributes[attr] === "undefined")
        continue

      /* Set default attribute or boolean */
      if (typeof attributes[attr] !== "boolean")
        el.setAttribute(attr, attributes[attr])
      else
        el.setAttribute(attr, "")
    }

  /* Append child nodes */
  for (const child of children)
    appendChild(el, child)

  /* Return element */
  return el as T
}

/* ----------------------------------------------------------------------------
 * Namespace
 * ------------------------------------------------------------------------- */

export declare namespace h {
  namespace JSX {
    type Element = HTMLElement
    type IntrinsicElements = JSXInternal.IntrinsicElements
  }
}
