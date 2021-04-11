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

import { configuration } from "~/_"
import { h } from "~/utilities"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Version
 */
export interface Version {
  version: string                      /* Version identifier */
  title: string                        /* Version title */
  aliases: string[]                    /* Version aliases */
}

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Render a version
 *
 * @param version - Version
 *
 * @returns Element
 */
function renderVersion(version: Version): HTMLElement {
  const config = configuration()

  /* Ensure trailing slash, see https://bit.ly/3rL5u3f */
  const url = new URL(`${version.version}/`, config.base)
  return (
    <li class="md-version__item">
      <a href={url.toString()} class="md-version__link">
        {version.title}
      </a>
    </li>
  )
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Render a version selector
 *
 * @param versions - Versions
 *
 * @returns Element
 */
export function renderVersionSelector(versions: Version[]): HTMLElement {
  const config = configuration()

  /* Determine active version */
  const [, current] = config.base.match(/([^/]+)\/?$/)!
  const active =
    versions.find(({ version, aliases }) => (
      version === current || aliases.includes(current)
    )) || versions[0]

  /* Render version selector */
  return (
    <div class="md-version">
      <button class="md-version__current">
        {active.title}
      </button>
      <ul class="md-version__list">
        {versions.map(renderVersion)}
      </ul>
    </div>
  )
}
