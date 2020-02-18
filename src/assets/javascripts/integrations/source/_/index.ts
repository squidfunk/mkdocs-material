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

import { Observable, of } from "rxjs"

import { fetchSourceFactsFromGitHub } from "../github"
import { fetchSourceFactsFromGitLab } from "../gitlab"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Source facts
 */
export type SourceFacts = string[]

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Fetch source facts
 *
 * @param url - Source repository URL
 *
 * @return Source facts observable
 */
export function fetchSourceFacts(
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

/* ------------------------------------------------------------------------- */

/**
 * Round a number for display with source facts
 *
 * This is a reverse engineered implementation of GitHub's weird rounding
 * algorithm for stars, forks and all other numbers. Probably incorrect.
 *
 * @param value - Original value
 *
 * @return Rounded value
 */
export function roundSourceFactValue(value: number) {
  if (value > 999) {
    const digits = +((value - 950) % 1000 > 99)
    return `${((value + 1) / 1000).toFixed(digits)}k`
  } else {
    return value.toString()
  }
}
