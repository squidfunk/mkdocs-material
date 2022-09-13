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

import { ElementSize } from "../_"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Retrieve element content size (= scroll width and height)
 *
 * @param el - Element
 *
 * @returns Element content size
 */
export function getElementContentSize(
  el: HTMLElement
): ElementSize {
  return {
    width:  el.scrollWidth,
    height: el.scrollHeight
  }
}

/**
 * Retrieve the overflowing container of an element, if any
 *
 * @param el - Element
 *
 * @returns Overflowing container or nothing
 */
export function getElementContainer(
  el: HTMLElement
): HTMLElement | undefined {
  let parent = el.parentElement
  while (parent)
    if (
      el.scrollWidth <= parent.scrollWidth &&
      el.scrollHeight <= parent.scrollHeight
    )
      parent = (el = parent).parentElement
    else
      break

  /* Return overflowing container */
  return parent ? el : undefined
}
