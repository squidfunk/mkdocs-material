/*
 * Copyright (c) 2016-2021 Martin Donath <martin.donath@squidfunk.com>
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
import { Observable, zip } from "rxjs"
import { defaultIfEmpty, map } from "rxjs/operators"

import { requestJSON } from "~/browser"

import { SourceFacts } from "../_"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * GitHub release (partial)
 */
interface Release {
  tag_name: string                     /* Tag name */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Fetch GitHub repository facts
 *
 * @param user - GitHub user
 * @param repo - GitHub repository
 *
 * @returns Repository facts observable
 */
export function fetchSourceFactsFromGitHub(
  user: string, repo?: string
): Observable<SourceFacts> {
  if (typeof repo !== "undefined") {
    const url = `https://api.github.com/repos/${user}/${repo}`
    return zip(

      /* Fetch version */
      requestJSON<Release>(`${url}/releases/latest`)
        .pipe(
          map(release => ({
            version: release.tag_name
          })),
          defaultIfEmpty({})
        ),

      /* Fetch stars and forks */
      requestJSON<Repo>(url)
        .pipe(
          map(info => ({
            stars: info.stargazers_count,
            forks: info.forks_count
          })),
          defaultIfEmpty({})
        )
    )
      .pipe(
        map(([release, info]) => ({ ...release, ...info }))
      )

  /* User or organization */
  } else {
    const url = `https://api.github.com/repos/${user}`
    return requestJSON<User>(url)
      .pipe(
        map(info => ({
          repositories: info.public_repos
        })),
        defaultIfEmpty({})
      )
  }
}
