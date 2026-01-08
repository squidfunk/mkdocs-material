/*
 * Copyright (c) 2016-2025 Martin Donath <martin.donath@squidfunk.com>
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
  EMPTY,
  Observable,
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
  of,
  switchMap,
  zip
} from "rxjs"

import { feature } from "~/_"
import {
  Viewport,
  getElements,
  getOptionalElement,
  requestHTML,
  watchElementFocus,
  watchElementHover
} from "~/browser"
import { Sitemap } from "~/integrations"
import { renderTooltip2 } from "~/templates"

import { Component } from "../../_"
import { mountTooltip2 } from "../../tooltip2"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Link
 */
export interface Link {}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Dependencies
 */
interface Dependencies {
  sitemap$: Observable<Sitemap>        // Sitemap observable
  viewport$: Observable<Viewport>      // Viewport observable
  target$: Observable<HTMLElement>     // Location target observable
  print$: Observable<boolean>          // Media print observable
}

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Global sequence number for instant previews
 */
let sequence = 0

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Extract elements until next heading
 *
 * @param headline - Heading
 *
 * @returns Elements until next heading
 */
function extract(headline: HTMLElement): HTMLElement[] {
  const newHeading = document.createElement("h3")
  newHeading.innerHTML = headline.innerHTML
  const els = [newHeading]

  //
  let nextElement = headline.nextElementSibling
  while (nextElement && !(nextElement instanceof HTMLHeadingElement)) {
    // @ts-expect-error - fix once instant previews are stable
    els.push(nextElement as HTMLElement)
    nextElement = nextElement.nextElementSibling
  }

  //
  return els
}

/**
 * Resolve relative URLs in the given document
 *
 * @todo deduplicate with resolution in instant navigation. This functoion also
 * adds the ability to resolve from a specific base URL, which is essential for
 * instant previews to work, so we should generalize this functionality the
 * next time we work on instant navigation.
 *
 * @param document - Document
 * @param base - Base URL
 *
 * @returns Document observable
 */
function resolve(
  document: Document, base: URL | string
): Observable<Document> {

  // Replace all links
  for (const el of getElements("[href], [src]", document))
    for (const key of ["href", "src"]) {
      const value = el.getAttribute(key)
      if (value && !/^(?:[a-z]+:)?\/\//i.test(value)) {
        // @ts-expect-error - trick: self-assign to resolve URL
        el[key] = new URL(el.getAttribute(key), base).toString()
        break
      }
    }

  // Ensure ids are free of collisions (e.g. content tabs)
  for (const el of getElements("[name^=__], [for]", document))
    for (const key of ["id", "for", "name"]) {
      const value = el.getAttribute(key)
      if (value) {
        el.setAttribute(key, `${value}$preview_${sequence}`)
      }
    }

  // Return document observable
  sequence++
  return of(document)
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount Link
 *
 * @param el - Link element
 * @param dependencies - Depenendencies
 *
 * @returns Link component observable
 */
export function mountLink(
  el: HTMLElement, dependencies: Dependencies
): Observable<Component<Link>> {
  const { sitemap$ } = dependencies
  if (!(el instanceof HTMLAnchorElement))
    return EMPTY

  //
  if (!(
    feature("navigation.instant.preview") ||
    el.hasAttribute("data-preview")
  ))
    return EMPTY

  // Remove title, as it will overlay the instant preview, and we want to give
  // instant previews precedence over titles – see https://t.ly/o0_Rk
  el.removeAttribute("title")

  const active$ =
    combineLatest([
      watchElementFocus(el),
      watchElementHover(el)
    ])
      .pipe(
        map(([focus, hover]) => focus || hover),
        distinctUntilChanged(),
        filter(active => active)
      )

  // @todo: this is taken from the handle function in instant loading - we
  // should generalize this once instant loading becomes stable.
  const elements$ = zip([sitemap$, active$]).pipe(
    switchMap(([sitemap]) => {
      const url = new URL(el.href)
      url.search = url.hash = ""

      //
      if (!sitemap.has(`${url}`))
        return EMPTY

      //
      return of(url)
    }),
    switchMap(url => requestHTML(url).pipe(
      switchMap(doc => resolve(doc, url))
    )),
    switchMap(doc => {
      const selector = el.hash
        ? `article [id="${el.hash.slice(1)}"]`
        : "article h1"

      //
      const target = getOptionalElement(selector, doc)
      if (typeof target === "undefined")
        return EMPTY

      //
      return of(extract(target))
    })
  )

  //
  return elements$.pipe(
    switchMap(els => {
      const content$ = new Observable<HTMLElement>(observer => {
        const node = renderTooltip2(...els)
        observer.next(node)

        //
        document.body.append(node)
        return () => node.remove()
      })

      //
      return mountTooltip2(el, { content$,  ...dependencies })
    })
  )
}
