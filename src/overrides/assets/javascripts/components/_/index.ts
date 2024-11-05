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

import { getElement, getElements } from "~/browser"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Component type
 */
export type ComponentType =
  | "iconsearch"                       /* Icon search */
  | "iconsearch-query"                 /* Icon search input */
  | "iconsearch-result"                /* Icon search results */
  | "iconsearch-select"                /* Icon search select */
  | "sponsorship"                      /* Sponsorship */
  | "sponsorship-count"                /* Sponsorship count */
  | "sponsorship-total"                /* Sponsorship total */

/**
 * Component
 *
 * @template T - Component type
 * @template U - Reference type
 */
export type Component<
  T extends {} = {},
  U extends HTMLElement = HTMLElement
> =
  T & {
    ref: U                             /* Component reference */
  }

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Component type map
 */
interface ComponentTypeMap {
  "iconsearch": HTMLElement            /* Icon search */
  "iconsearch-query": HTMLInputElement /* Icon search input */
  "iconsearch-result": HTMLElement     /* Icon search results */
  "iconsearch-select": HTMLSelectElement
  "sponsorship": HTMLElement           /* Sponsorship */
  "sponsorship-count": HTMLElement     /* Sponsorship count */
  "sponsorship-total": HTMLElement     /* Sponsorship total */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Retrieve the element for a given component or throw a reference error
 *
 * @template T - Component type
 *
 * @param type - Component type
 * @param node - Node of reference
 *
 * @returns Element
 */
export function getComponentElement<T extends ComponentType>(
  type: T, node: ParentNode = document
): ComponentTypeMap[T] {
  return getElement(`[data-mdx-component=${type}]`, node)
}

/**
 * Retrieve all elements for a given component
 *
 * @template T - Component type
 *
 * @param type - Component type
 * @param node - Node of reference
 *
 * @returns Elements
 */
export function getComponentElements<T extends ComponentType>(
  type: T, node: ParentNode = document
): ComponentTypeMap[T][] {
  return getElements(`[data-mdx-component=${type}]`, node)
}
