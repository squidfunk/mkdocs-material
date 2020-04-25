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

import { NEVER, Observable } from "rxjs"
import { catchError, map, switchMap } from "rxjs/operators"

import { getElementOrThrow, getElements } from "browser"
import { renderSource } from "templates"
import { cache, hash } from "utilities"

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
 * Patch options
 */
interface PatchOptions {
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
      const [, base, slug] = url.match(/^.+?([^\/]*gitlab[^\/]+)\/(.+?)\/?$/i)
      return fetchSourceFactsFromGitLab(base, slug)

    /* Everything else */
    default:
      return NEVER
  }
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Patch elements containing repository information
 *
 * This function will retrieve the URL from the repository link and try to
 * query data from integrated source code platforms like GitHub or GitLab.
 *
 * @param options - Options
 */
export function patchSource(
  { document$ }: PatchOptions
): void {
  document$
    .pipe(
      map(() => getElementOrThrow<HTMLAnchorElement>(".md-source[href]")),
      switchMap(({ href }) => (
        cache(`${hash(href)}`, () => fetchSourceFacts(href))
      )),
      catchError(() => NEVER)
    )
      .subscribe(facts => {
        for (const el of getElements(".md-source__repository")) {
          if (!el.hasAttribute("data-md-state")) {
            el.setAttribute("data-md-state", "done")
            el.appendChild(renderSource(facts))
          }
        }
      })
}
