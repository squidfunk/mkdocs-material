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

import { ComponentChild } from "preact"

import { h } from "~/utilities"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Tooltip style
 */
export type TooltipStyle =
  | "inline"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Render a tooltip
 *
 * @param id - Tooltip identifier
 * @param style - Tooltip style
 *
 * @returns Element
 */
export function renderTooltip(
  id?: string, style?: TooltipStyle
): HTMLElement {
  if (style === "inline") { // @todo refactor control flow
    return (
      <div class="md-tooltip md-tooltip--inline" id={id} role="tooltip">
        <div class="md-tooltip__inner md-typeset"></div>
      </div>
    )
  } else {
    return (
      <div class="md-tooltip" id={id} role="tooltip">
        <div class="md-tooltip__inner md-typeset"></div>
      </div>
    )
  }
}

// @todo: rename
export function renderInlineTooltip2(
  ...children: ComponentChild[]
): HTMLElement {
  return (
    <div class="md-tooltip2" role="tooltip">
      <div class="md-tooltip2__inner md-typeset">
        {children}
      </div>
    </div>
  )
}
