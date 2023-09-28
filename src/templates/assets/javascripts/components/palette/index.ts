/*
 * Copyright (c) 2016-2023 Martin Donath <martin.donath@squidfunk.com>
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
  Subject,
  asyncScheduler,
  defer,
  finalize,
  fromEvent,
  map,
  mergeMap,
  observeOn,
  of,
  shareReplay,
  startWith,
  tap
} from "rxjs"

import { getElements } from "~/browser"
import { h } from "~/utilities"

import {
  Component,
  getComponentElement
} from "../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Palette colors
 */
export interface PaletteColor {
  scheme?: string                      /* Color scheme */
  primary?: string                     /* Primary color */
  accent?: string                      /* Accent color */
}

/**
 * Palette
 */
export interface Palette {
  index: number                        /* Palette index */
  color: PaletteColor                  /* Palette colors */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch color palette
 *
 * @param inputs - Color palette element
 *
 * @returns Color palette observable
 */
export function watchPalette(
  inputs: HTMLInputElement[]
): Observable<Palette> {
  const current = __md_get<Palette>("__palette") || {
    index: inputs.findIndex(input => matchMedia(
      input.getAttribute("data-md-color-media")!
    ).matches)
  }

  /* Emit changes in color palette */
  return of(...inputs)
    .pipe(
      mergeMap(input => fromEvent(input, "change")
        .pipe(
          map(() => input)
        )
      ),
      startWith(inputs[Math.max(0, current.index)]),
      map(input => ({
        index: inputs.indexOf(input),
        color: {
          scheme:  input.getAttribute("data-md-color-scheme"),
          primary: input.getAttribute("data-md-color-primary"),
          accent:  input.getAttribute("data-md-color-accent")
        }
      } as Palette)),
      shareReplay(1)
    )
}

/**
 * Mount color palette
 *
 * @param el - Color palette element
 *
 * @returns Color palette component observable
 */
export function mountPalette(
  el: HTMLElement
): Observable<Component<Palette>> {
  const meta = h("meta", { name: "theme-color" })
  document.head.appendChild(meta)

  // Add color scheme meta tag
  const scheme = h("meta", { name: "color-scheme" })
  document.head.appendChild(scheme)

  /* Mount component on subscription */
  return defer(() => {
    const push$ = new Subject<Palette>()
    push$.subscribe(palette => {
      document.body.setAttribute("data-md-color-switching", "")

      /* Set color palette */
      for (const [key, value] of Object.entries(palette.color))
        document.body.setAttribute(`data-md-color-${key}`, value)

      /* Toggle visibility */
      for (let index = 0; index < inputs.length; index++) {
        const label = inputs[index].nextElementSibling
        if (label instanceof HTMLElement)
          label.hidden = palette.index !== index
      }

      /* Persist preference in local storage */
      __md_set("__palette", palette)
    })

    /* Update theme-color meta tag */
    push$
      .pipe(
        map(() => {
          const header = getComponentElement("header")
          const style  = window.getComputedStyle(header)

          // Set color scheme
          scheme.content = style.colorScheme

          /* Return color in hexadecimal format */
          return style.backgroundColor.match(/\d+/g)!
            .map(value => (+value).toString(16).padStart(2, "0"))
            .join("")
        })
      )
        .subscribe(color => meta.content = `#${color}`)

    /* Revert transition durations after color switch */
    push$.pipe(observeOn(asyncScheduler))
      .subscribe(() => {
        document.body.removeAttribute("data-md-color-switching")
      })

    /* Create and return component */
    const inputs = getElements<HTMLInputElement>("input", el)
    return watchPalette(inputs)
      .pipe(
        tap(state => push$.next(state)),
        finalize(() => push$.complete()),
        map(state => ({ ref: el, ...state }))
      )
  })
}
