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

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Retrieve all elements matching the query selector
 *
 * @template T - Element type
 *
 * @param selector - Query selector
 * @param node - Node of reference
 *
 * @returns Elements
 */
export function getElements<T extends keyof HTMLElementTagNameMap>(
  selector: T, node?: ParentNode
): HTMLElementTagNameMap[T][]

export function getElements<T extends HTMLElement>(
  selector: string, node?: ParentNode
): T[]

export function getElements<T extends HTMLElement>(
  selector: string, node: ParentNode = document
): T[] {
  return Array.from(node.querySelectorAll<T>(selector))
}

/**
 * Retrieve an element matching a query selector or throw a reference error
 *
 * Note that this function assumes that the element is present. If unsure if an
 * element is existent, use the `getOptionalElement` function instead.
 *
 * @template T - Element type
 *
 * @param selector - Query selector
 * @param node - Node of reference
 *
 * @returns Element
 */
export function getElement<T extends keyof HTMLElementTagNameMap>(
  selector: T, node?: ParentNode
): HTMLElementTagNameMap[T]

export function getElement<T extends HTMLElement>(
  selector: string, node?: ParentNode
): T

export function getElement<T extends HTMLElement>(
  selector: string, node: ParentNode = document
): T {
  const el = getOptionalElement<T>(selector, node)
  if (typeof el === "undefined")
    throw new ReferenceError(
      `Missing element: expected "${selector}" to be present`
    )

  /* Return element */
  return el
}

/* ------------------------------------------------------------------------- */

/**
 * Retrieve an optional element matching the query selector
 *
 * @template T - Element type
 *
 * @param selector - Query selector
 * @param node - Node of reference
 *
 * @returns Element or nothing
 */
export function getOptionalElement<T extends keyof HTMLElementTagNameMap>(
  selector: T, node?: ParentNode
): HTMLElementTagNameMap[T] | undefined

export function getOptionalElement<T extends HTMLElement>(
  selector: string, node?: ParentNode
): T | undefined

export function getOptionalElement<T extends HTMLElement>(
  selector: string, node: ParentNode = document
): T | undefined {
  return node.querySelector<T>(selector) || undefined
}

/**
 * Retrieve the currently active element
 *
 * @returns Element or nothing
 */
export function getActiveElement(): HTMLElement | undefined {
  return document.activeElement instanceof HTMLElement
    ? document.activeElement || undefined
    : undefined
}
