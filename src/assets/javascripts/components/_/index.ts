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

import { getElementOrThrow, getElements } from "~/browser"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Component
 */
export type ComponentType =
  | "announce"                         /* Announcement bar */
  | "container"                        /* Container */
  | "content"                          /* Content */
  | "dialog"                           /* Dialog */
  | "header"                           /* Header */
  | "header-title"                     /* Header title */
  | "header-topic"                     /* Header topic */
  | "main"                             /* Main area */
  | "search"                           /* Search */
  | "search-query"                     /* Search input */
  | "search-result"                    /* Search results */
  | "sidebar"                          /* Sidebar */
  | "skip"                             /* Skip link */
  | "source"                           /* Repository information */
  | "tabs"                             /* Navigation tabs */
  | "toc"                              /* Table of contents */

/**
 * A component
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
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Retrieve the element for a given component or throw a reference error
 *
 * @template T - Element type
 *
 * @param type - Component type
 * @param node - Node of reference
 *
 * @returns Element
 */
export function getComponentElement<T extends HTMLElement>(
  type: ComponentType, node: ParentNode = document
): T {
  return getElementOrThrow(`[data-md-component=${type}]`, node)
}

/**
 * Retrieve all elements for a given component
 *
 * @template T - Element type
 *
 * @param type - Component type
 * @param node - Node of reference
 *
 * @returns Elements
 */
export function getComponentElements<T extends HTMLElement>(
  type: ComponentType, node: ParentNode = document
): T[] {
  return getElements(`[data-md-component=${type}]`, node)
}
