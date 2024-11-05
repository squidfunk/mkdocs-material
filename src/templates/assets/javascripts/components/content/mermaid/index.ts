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

import {
  Observable,
  map,
  of,
  shareReplay,
  tap
} from "rxjs"

import { watchScript } from "~/browser"
import { h } from "~/utilities"

import { Component } from "../../_"

import themeCSS from "./index.css"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Mermaid diagram
 */
export interface Mermaid {}

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Mermaid instance observable
 */
let mermaid$: Observable<void>

/**
 * Global sequence number for diagrams
 */
let sequence = 0

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Fetch Mermaid script
 *
 * @returns Mermaid scripts observable
 */
function fetchScripts(): Observable<void> {
  return typeof mermaid === "undefined" || mermaid instanceof Element
    ? watchScript("https://unpkg.com/mermaid@11/dist/mermaid.min.js")
    : of(undefined)
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount Mermaid diagram
 *
 * @param el - Code block element
 *
 * @returns Mermaid diagram component observable
 */
export function mountMermaid(
  el: HTMLElement
): Observable<Component<Mermaid>> {
  el.classList.remove("mermaid") // Hack: mitigate https://bit.ly/3CiN6Du
  mermaid$ ||= fetchScripts()
    .pipe(
      tap(() => mermaid.initialize({
        startOnLoad: false,
        themeCSS,
        sequence: {
          actorFontSize: "16px", // Hack: mitigate https://bit.ly/3y0NEi3
          messageFontSize: "16px",
          noteFontSize: "16px"
        }
      })),
      map(() => undefined),
      shareReplay(1)
    )

  /* Render diagram */
  mermaid$.subscribe(async () => {
    el.classList.add("mermaid") // Hack: mitigate https://bit.ly/3CiN6Du
    const id = `__mermaid_${sequence++}`

    /* Create host element to replace code block */
    const host = h("div", { class: "mermaid" })
    const text = el.textContent

    /* Render and inject diagram */
    const { svg, fn } = await mermaid.render(id, text)

    /* Create a shadow root and inject diagram */
    const shadow = host.attachShadow({ mode: "closed" })
    shadow.innerHTML = svg

    /* Replace code block with diagram and bind functions */
    el.replaceWith(host)
    fn?.(shadow)
  })

  /* Create and return component */
  return mermaid$
    .pipe(
      map(() => ({ ref: el }))
    )
}
