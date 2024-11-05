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

import { Observable, merge } from "rxjs"

import { feature } from "~/_"
import { Viewport, getElements } from "~/browser"

import { Component } from "../../_"
import {
  Tooltip,
  mountInlineTooltip2
} from "../../tooltip2"
import {
  Annotation,
  mountAnnotationBlock
} from "../annotation"
import {
  CodeBlock,
  mountCodeBlock
} from "../code"
import {
  Details,
  mountDetails
} from "../details"
import {
  Mermaid,
  mountMermaid
} from "../mermaid"
import {
  DataTable,
  mountDataTable
} from "../table"
import {
  ContentTabs,
  mountContentTabs
} from "../tabs"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Content
 */
export type Content =
  | Annotation
  | CodeBlock
  | ContentTabs
  | DataTable
  | Details
  | Mermaid
  | Tooltip

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Mount options
 */
interface MountOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
  target$: Observable<HTMLElement>     /* Location target observable */
  print$: Observable<boolean>          /* Media print observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount content
 *
 * This function mounts all components that are found in the content of the
 * actual article, including code blocks, data tables and details.
 *
 * @param el - Content element
 * @param options - Options
 *
 * @returns Content component observable
 */
export function mountContent(
  el: HTMLElement, { viewport$, target$, print$ }: MountOptions
): Observable<Component<Content>> {
  return merge(

    /* Annotations */
    ...getElements(".annotate:not(.highlight)", el)
      .map(child => mountAnnotationBlock(child, { target$, print$ })),

    /* Code blocks */
    ...getElements("pre:not(.mermaid) > code", el)
      .map(child => mountCodeBlock(child, { target$, print$ })),

    /* Mermaid diagrams */
    ...getElements("pre.mermaid", el)
      .map(child => mountMermaid(child)),

    /* Data tables */
    ...getElements("table:not([class])", el)
      .map(child => mountDataTable(child)),

    /* Details */
    ...getElements("details", el)
      .map(child => mountDetails(child, { target$, print$ })),

    /* Content tabs */
    ...getElements("[data-tabs]", el)
      .map(child => mountContentTabs(child, { viewport$, target$ })),

    /* Tooltips */
    ...getElements("[title]", el)
      .filter(() => feature("content.tooltips"))
      .map(child => mountInlineTooltip2(child, { viewport$ }))
  )
}
