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

import { Repo, User } from "github-types"
import { Observable, from } from "rxjs"
import {
  defaultIfEmpty,
  filter,
  map,
  share,
  switchMap
} from "rxjs/operators"

import { round } from "utilities"

import { SourceFacts } from ".."

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Fetch GitHub source facts
 *
 * @param user - GitHub user
 * @param repo - GitHub repository
 *
 * @return Source facts observable
 */
export function fetchSourceFactsFromGitHub(
  user: string, repo?: string
): Observable<SourceFacts> {
  const url = typeof repo !== "undefined"
    ? `https://api.github.com/repos/${user}/${repo}`
    : `https://api.github.com/users/${user}`
  return from(fetch(url))
    .pipe(
      filter(res => res.status === 200),
      switchMap(res => res.json()),
      map(data => {

        /* GitHub repository */
        if (typeof repo !== "undefined") {
          const { stargazers_count, forks_count }: Repo = data
          return [
            `${round(stargazers_count!)} Stars`,
            `${round(forks_count!)} Forks`
          ]

        /* GitHub user/organization */
        } else {
          const { public_repos }: User = data
          return [
            `${round(public_repos!)} Repositories`
          ]
        }
      }),
      defaultIfEmpty([]),
      share()
    )
}
