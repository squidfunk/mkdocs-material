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
import { NEVER, Observable } from "rxjs"
import { ajax } from "rxjs/ajax"
import { filter, map, pluck, shareReplay } from "rxjs/operators"

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Round a number
 *
 * TODO: document
 */
function round(value: number) {
  return value > 999
    ? `${(value / 1000).toFixed(1)}k`
    : `${(value)}`
}

/**
 * TODO: document
 */
export function fetchGitHubStats(
  user: string
): Observable<User>
export function fetchGitHubStats(
  user: string, repo: string
): Observable<Repo>
export function fetchGitHubStats(
  user: string, repo?: string
): Observable<User | Repo> {
  const endpoint = typeof repo !== "undefined"
    ? `repos/${user}/${repo}`
    : `users/${user}`
  return ajax({
    url: `https://api.github.com/${endpoint}`,
    responseType: "json"
  })
    .pipe(
      filter(({ status }) => status === 200),
      pluck("response"),
      shareReplay(1)
    )
}

// TODO: GitLab API:
// https://docs.gitlab.com/ee/api/projects.html#get-single-project
// curl "https://gitlab.com/api/v4/projects/johannes-z%2Fmkdocs-material"

/* ------------------------------------------------------------------------- */

/**
 * Get repository information
 *
 * TODO: document
 */
export function getRepository(user: string, repo: string): Observable<string[]> {
  return fetchGitHubStats(user, repo)
    .pipe(
      map(({ stargazers_count, forks_count }) => ([
        `${round(stargazers_count || 0)} Stars`,
        `${round(forks_count || 0)} Forks`
      ]))
    )
}

/**
 * Get user/organization information
 *
 * TODO: document
 */
export function getUser(user: string): Observable<string[]> {
  return fetchGitHubStats(user)
    .pipe(
      map(({ public_repos }) => ([
        `${round(public_repos || 0)} Repositories`
      ]))
    )
}
