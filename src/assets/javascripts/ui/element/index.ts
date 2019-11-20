/*
 * Copyright (c) 2016-2019 Martin Donath <martin.donath@squidfunk.com>
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

import { OperatorFunction, pipe } from "rxjs"
import { filter, map } from "rxjs/operators"

import { toArray } from "../../utilities"

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
 * @return HTML element
 */
export function getElement<T extends HTMLElement>(
  selector: string, node: ParentNode = document
): T | undefined {
  return node.querySelector<T>(selector) || undefined
}

/**
 * Retrieve all elements matching the query selector
 *
 * @template T - Element type
 *
 * @param selector - Query selector
 * @param node - Node of reference
 *
 * @return HTML elements
 */
export function getElements<T extends HTMLElement>(
  selector: string, node: ParentNode = document
): T[] {
  return toArray(node.querySelectorAll<T>(selector))
}

/* ----------------------------------------------------------------------------
 * Operators
 * ------------------------------------------------------------------------- */

/**
 * Retrieve an element matching the query selector
 *
 * @template T - Element type
 *
 * @param node - Node of reference
 *
 * @return HTML element observable
 */
export function withElement<T extends HTMLElement>(
  node: ParentNode = document
): OperatorFunction<string, T> {
  return pipe(
    map(selector => getElement<T>(selector, node)!),
    filter<T>(Boolean)
  )
}

/**
 * Retrieve all elements matching the query selector
 *
 * @template T - Element type
 *
 * @param node - Node of reference
 *
 * @return HTML elements observable
 */
export function withElements<T extends HTMLElement>(
  node: ParentNode = document
): OperatorFunction<string, T[]> {
  return pipe(
    map(selector => getElements<T>(selector, node))
  )
}
