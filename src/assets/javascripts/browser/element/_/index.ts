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

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Retrieve an element matching the query selector
 *
 * @template T - Element type
 *
 * @param selector - Query selector
 * @param node - Node of reference
 *
 * @return Element or nothing
 */
export function getElement<T extends HTMLElement>(
  selector: string, node: ParentNode = document
): T | undefined {
  return node.querySelector<T>(selector) || undefined
}

/**
 * Retrieve an element matching a query selector or throw a reference error
 *
 * @template T - Element type
 *
 * @param selector - Query selector
 * @param node - Node of reference
 *
 * @return Element
 */
export function getElementOrThrow<T extends HTMLElement>(
  selector: string, node: ParentNode = document
): T {
  const el = getElement<T>(selector, node)
  if (typeof el === "undefined")
    throw new ReferenceError(
      `Missing element: expected "${selector}" to be present`
    )
  return el
}

/**
 * Retrieve the currently active element
 *
 * @return Element or nothing
 */
export function getActiveElement(): HTMLElement | undefined {
  return document.activeElement instanceof HTMLElement
    ? document.activeElement
    : undefined
}

/**
 * Retrieve all elements matching the query selector
 *
 * @template T - Element type
 *
 * @param selector - Query selector
 * @param node - Node of reference
 *
 * @return Elements
 */
export function getElements<T extends HTMLElement>(
  selector: string, node: ParentNode = document
): T[] {
  return Array.from(node.querySelectorAll<T>(selector))
}

/* ------------------------------------------------------------------------- */

/**
 * Create an element
 *
 * @template T - Tag name type
 *
 * @param tagName - Tag name
 *
 * @return Element
 */
export function createElement<
  T extends keyof HTMLElementTagNameMap
>(tagName: T): HTMLElementTagNameMap[T] {
  return document.createElement(tagName)
}

/**
 * Replace an element with another element
 *
 * @param source - Source element
 * @param target - Target element
 */
export function replaceElement(
  source: HTMLElement, target: Node
): void {
  source.replaceWith(target)
}
