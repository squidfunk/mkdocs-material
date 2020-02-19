/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

import { NEVER, Observable, of } from "rxjs"
import { switchMap, tap } from "rxjs/operators"

import { getElement, getElements } from "observables"
import { renderSource } from "templates"

import { cache } from "utilities"
import { fetchSourceFactsFromGitHub } from "./github"
import { fetchSourceFactsFromGitLab } from "./gitlab"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Source facts
 */
export type SourceFacts = string[]

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Setup options
 */
interface SetupOptions {
  document$: Observable<Document>      /* Document observable */
}

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Fetch source facts
 *
 * @param url - Source repository URL
 *
 * @return Source facts observable
 */
function fetchSourceFacts(
  url: string
): Observable<SourceFacts> {
  const [type] = url.match(/(git(?:hub|lab))/i) || []
  switch (type.toLowerCase()) {

    /* GitHub repository */
    case "github":
      const [, user, repo] = url.match(/^.+github\.com\/([^\/]+)\/?([^\/]+)/i)
      return fetchSourceFactsFromGitHub(user, repo)

    /* GitLab repository */
    case "gitlab":
      const [, base, project] = url.match(/^.+?([^\/]*gitlab[^\/]+)\/(.+)/i)
      return fetchSourceFactsFromGitLab(base, project)

    /* Everything else */
    default:
      return of([])
  }
}

// provide a function to set a unique key?

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

// TODO: this doesnt belong here...

// cache type.. session or local storage...
// subscribe to observable and cache automatically

// withCache or useCache

/**
 * Setup source facts
 *
 * @param options - Options
 *
 * @return Source facts observable
 */
export function setupSourceFacts(
  { document$ }: SetupOptions
): Observable<any> {
  return document$
    .pipe(
      switchMap(() => cache("repository", () => {
        tap(console.log)
        const el = getElement<HTMLAnchorElement>(".md-source[href]") // TODO: useElement( document$ ) ? doesnt emit if no result
        if (!el) {
          return NEVER
        } else {
          // TODO: hash should be calculated from el.href
          return fetchSourceFacts(el.href)
        }
      })),

      tap(facts => {
        console.log(facts)
        if (facts.length) {
          const sources = getElements(".md-source__repository")
          sources.forEach(repo => {
            repo.dataset.mdState = "done"
            repo.appendChild(renderSource(facts))
          })
        }
      })
      // TODO: use URL? to dinstinguish
    )
}

// /**
//  * Only emit a value if it is non-empty
//  *
//  * @template T - Value type
//  *
//  * @return Operator function
//  */
// export function exists<T>(): OperatorFunction<T, NonNullable<T>> {
//   return pipe(
//     switchMap(value => !!value ? NEVER : of(value as NonNullable<T>))
//   )
// }
