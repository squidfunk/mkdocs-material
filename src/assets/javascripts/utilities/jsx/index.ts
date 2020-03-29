/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

// tslint:disable no-null-keyword

import { JSX as JSXInternal } from "preact"
import { keys } from "ramda"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * HTML and SVG attributes
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
  | SVGElement
  | Text
  | string
  | number

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Create an element
 *
 * @param tagName - HTML or SVG tag
 *
 * @return Element
 */
function createElement(tagName: string): HTMLElement | SVGElement {
  switch (tagName) {

    /* SVG elements */
    case "svg":
    case "path":
      return document.createElementNS("http://www.w3.org/2000/svg", tagName)

    /* HTML elements */
    default:
      return document.createElement(tagName)
  }
}

/**
 * Set an attribute
 *
 * @param el - Element
 * @param name - Attribute name
 * @param value - Attribute value
 */
function setAttribute(
  el: HTMLElement | SVGElement, name: string, value: string) {
  switch (name) {

    /* Attributes to be ignored */
    case "xmlns":
      break

    /* Attributes of SVG elements */
    case "viewBox":
    case "d":
      if (typeof value !== "boolean")
        el.setAttributeNS(null, name, value)
      else if (value)
        el.setAttributeNS(null, name, "")
      break

    /* Attributes of HTML elements */
    default:
      if (typeof value !== "boolean")
        el.setAttribute(name, value)
      else if (value)
        el.setAttribute(name, "")
  }
}

/**
 * Append a child node to an element
 *
 * @param el - Element
 * @param child - Child node(s)
 */
function appendChild(
  el: HTMLElement | SVGElement, child: Child | Child[]
): void {

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
 * @param tagName - HTML or SVG tag
 * @param attributes - HTML attributes
 * @param children - Child elements
 *
 * @return Element
 */
export function h(
  tagName: string, attributes: Attributes | null, ...children: Child[]
): HTMLElement | SVGElement {
  const el = createElement(tagName)

  /* Set attributes, if any */
  if (attributes)
    for (const attr of keys(attributes))
      setAttribute(el, attr, attributes[attr])

  /* Append child nodes */
  for (const child of children)
    appendChild(el, child)

  /* Return element */
  return el
}

/* ----------------------------------------------------------------------------
 * Namespace
 * ------------------------------------------------------------------------- */

export declare namespace h {
  namespace JSX {
    type Element = HTMLElement | SVGElement
    type IntrinsicElements = JSXInternal.IntrinsicElements
  }
}
