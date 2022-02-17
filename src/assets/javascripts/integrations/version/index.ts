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
  EMPTY,
  combineLatest,
  filter,
  fromEvent,
  map,
  of,
  switchMap
} from "rxjs"

import { configuration } from "~/_"
import {
  getElement,
  getLocation,
  requestJSON,
  setLocation
} from "~/browser"
import { getComponentElements } from "~/components"
import {
  Version,
  renderVersionSelector
} from "~/templates"

import { fetchSitemap } from "../sitemap"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Set up version selector
 */
export function setupVersionSelector(): void {
  const config = configuration()
  const versions$ = requestJSON<Version[]>(
    new URL("../versions.json", config.base)
  )

  /* Determine current version */
  const current$ = versions$
    .pipe(
      map(versions => {
        const [, current] = config.base.match(/([^/]+)\/?$/)!
        return versions.find(({ version, aliases }) => (
          version === current || aliases.includes(current)
        )) || versions[0]
      })
    )

  /* Intercept inter-version navigation */
  combineLatest([versions$, current$])
    .pipe(
      map(([versions, current]) => new Map(versions
        .filter(version => version !== current)
        .map(version => [
          `${new URL(`../${version.version}/`, config.base)}`,
          version
        ])
      )),
      switchMap(urls => fromEvent<MouseEvent>(document.body, "click")
        .pipe(
          filter(ev => !ev.metaKey && !ev.ctrlKey),
          switchMap(ev => {
            if (ev.target instanceof Element) {
              const el = ev.target.closest("a")
              if (el && !el.target && urls.has(el.href)) {
                ev.preventDefault()
                return of(el.href)
              }
            }
            return EMPTY
          }),
          switchMap(url => {
            const { version } = urls.get(url)!
            return fetchSitemap(new URL(url))
              .pipe(
                map(sitemap => {
                  const location = getLocation()
                  const path = location.href.replace(config.base, "")
                  return sitemap.includes(path)
                    ? new URL(`../${version}/${path}`, config.base)
                    : new URL(url)
                })
              )
          })
        )
      )
    )
      .subscribe(url => setLocation(url))

  /* Render version selector and warning */
  combineLatest([versions$, current$])
    .subscribe(([versions, current]) => {
      const topic = getElement(".md-header__topic")
      topic.appendChild(renderVersionSelector(versions, current))

      /* Check if version state was already determined */
      if (__md_get("__outdated", sessionStorage) === null) {
        const latest = config.version?.default || "latest"
        const outdated = !current.aliases.includes(latest)

        /* Persist version state in session storage */
        __md_set("__outdated", outdated, sessionStorage)
        if (outdated)
          for (const warning of getComponentElements("outdated"))
            warning.hidden = false
      }
    })
}
