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

import {
  Observable,
  map,
  of,
  shareReplay,
  tap
} from "rxjs"

import { watchScript } from "~/browser"
import { h } from "~/utilities"

import { Component } from "../../../_"

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
    ? watchScript("https://unpkg.com/mermaid@9.1.7/dist/mermaid.min.js")
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
        themeCSS
      })),
      map(() => undefined),
      shareReplay(1)
    )

  /* Render diagram */
  mermaid$.subscribe(() => {
    el.classList.add("mermaid") // Hack: mitigate https://bit.ly/3CiN6Du
    const id = `__mermaid_${sequence++}`
    const host = h("div", { class: "mermaid" })
    mermaid.mermaidAPI.render(id, el.textContent, (svg: string) => {

      /* Create a shadow root and inject diagram */
      const shadow = host.attachShadow({ mode: "closed" })
      shadow.innerHTML = svg

      /* Replace code block with diagram */
      el.replaceWith(host)
    })
  })

  /* Create and return component */
  return mermaid$
    .pipe(
      map(() => ({ ref: el }))
    )
}
