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

import { EMPTY, Observable } from "rxjs"

import { fetchSourceFactsFromGitHub } from "../github"
import { fetchSourceFactsFromGitLab } from "../gitlab"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Repository facts for repositories
 */
export interface RepositoryFacts {
  stars?: number                       /* Number of stars */
  forks?: number                       /* Number of forks */
  version?: string                     /* Latest version */
}

/**
 * Repository facts for organizations
 */
export interface OrganizationFacts {
  repositories?: number                /* Number of repositories */
}

/* ------------------------------------------------------------------------- */

/**
 * Repository facts
 */
export type SourceFacts =
  | RepositoryFacts
  | OrganizationFacts

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Fetch repository facts
 *
 * @param url - Repository URL
 *
 * @returns Repository facts observable
 */
export function fetchSourceFacts(
  url: string
): Observable<SourceFacts> {
  const [type] = url.match(/(git(?:hub|lab))/i) || []
  switch (type.toLowerCase()) {

    /* GitHub repository */
    case "github":
      const [, user, repo] = url.match(/^.+github\.com\/([^/]+)\/?([^/]+)?/i)!
      return fetchSourceFactsFromGitHub(user, repo)

    /* GitLab repository */
    case "gitlab":
      const [, base, slug] = url.match(/^.+?([^/]*gitlab[^/]+)\/(.+?)\/?$/i)!
      return fetchSourceFactsFromGitLab(base, slug)

    /* Everything else */
    default:
      return EMPTY
  }
}
