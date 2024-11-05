/*
 * Copyright (c) 2016-2024 Martin Donath <martin.donath@squidfunk.com>
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
  Subject,
  catchError,
  combineLatest,
  filter,
  fromEvent,
  map,
  of,
  switchMap,
  withLatestFrom
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

import { selectedVersionCorrespondingURL } from "./findurl"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Setup options
 */
interface SetupOptions {
  document$: Subject<Document>         /* Document subject */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Set up version selector
 *
 * @param options - Options
 */
export function setupVersionSelector(
  { document$ }: SetupOptions
): void {
  const config = configuration()
  const versions$ = requestJSON<Version[]>(
    new URL("../versions.json", config.base)
  )
    .pipe(
      catchError(() => EMPTY) // @todo refactor instant loading
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
  versions$
    .pipe(
      map(versions => new Map(versions.map(version => [
        `${new URL(`../${version.version}/`, config.base)}`,
        version
      ]))),
      switchMap(urls => fromEvent<MouseEvent>(document.body, "click")
        .pipe(
          filter(ev => !ev.metaKey && !ev.ctrlKey),
          withLatestFrom(current$),
          switchMap(([ev, current]) => {
            if (ev.target instanceof Element) {
              const el = ev.target.closest("a")
              if (el && !el.target && urls.has(el.href)) {
                const url = el.href
                // This is a temporary hack to detect if a version inside the
                // version selector or on another part of the site was clicked.
                // If we're inside the version selector, we definitely want to
                // find the same page, as we might have different deployments
                // due to aliases. However, if we're outside the version
                // selector, we must abort here, because we might otherwise
                // interfere with instant navigation. We need to refactor this
                // at some point together with instant navigation.
                //
                // See https://github.com/squidfunk/mkdocs-material/issues/4012
                if (!ev.target.closest(".md-version")) {
                  const version = urls.get(url)!
                  if (version === current)
                    return EMPTY
                }
                ev.preventDefault()
                return of(new URL(url))
              }
            }
            return EMPTY
          }),
          switchMap(selectedVersionBaseURL => {
            return fetchSitemap(selectedVersionBaseURL).pipe(
              map(
                sitemap =>
                  selectedVersionCorrespondingURL({
                    selectedVersionSitemap: sitemap,
                    selectedVersionBaseURL,
                    currentLocation: getLocation(),
                    currentBaseURL: config.base
                  }) ?? selectedVersionBaseURL,
              ),
            )
          })
        )
      )
    )
      .subscribe(url => setLocation(url, true))

  /* Render version selector and warning */
  combineLatest([versions$, current$])
    .subscribe(([versions, current]) => {
      const topic = getElement(".md-header__topic")
      topic.appendChild(renderVersionSelector(versions, current))
    })

  /* Integrate outdated version banner with instant navigation */
  document$.pipe(switchMap(() => current$))
    .subscribe(current => {

      /* Check if version state was already determined */
      let outdated = __md_get("__outdated", sessionStorage)
      if (outdated === null) {
        outdated = true

        /* Obtain and normalize default versions */
        let ignored = config.version?.default || "latest"
        if (!Array.isArray(ignored))
          ignored = [ignored]

        /* Check if version is considered a default */
        main: for (const ignore of ignored)
          for (const version of current.aliases.concat(current.version))
            if (new RegExp(ignore, "i").test(version)) {
              outdated = false
              break main
            }

        /* Persist version state in session storage */
        __md_set("__outdated", outdated, sessionStorage)
      }

      /* Unhide outdated version banner */
      if (outdated)
        for (const warning of getComponentElements("outdated"))
          warning.hidden = false
    })
}
