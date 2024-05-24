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

import { configuration, translation } from "~/_"
import { h } from "~/utilities"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Version properties
 */
export interface VersionProperties {
  hidden?: boolean                     /* Version is hidden */
}

/**
 * Version
 */
export interface Version {
  version: string                      /* Version identifier */
  title: string                        /* Version title */
  aliases: string[]                    /* Version aliases */
  properties?: VersionProperties       /* Version properties */
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

  /* Ensure trailing slash - see https://bit.ly/3rL5u3f */
  const url = new URL(`../${version.version}/`, config.base)
  return (
    <li class="md-version__item">
      <a href={`${url}`} class="md-version__link">
        {version.title}
        {config.version?.alias && version.aliases.length > 0 && (
          <span class="md-version__alias">
            {version.aliases[0]}
          </span>
        )}
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
 * @param active - Active version
 *
 * @returns Element
 */
export function renderVersionSelector(
  versions: Version[], active: Version
): HTMLElement {
  const config = configuration()
  versions = versions.filter(version => !version.properties?.hidden)
  return (
    <div class="md-version">
      <button
        class="md-version__current"
        aria-label={translation("select.version")}
      >
        {active.title}
        {config.version?.alias && active.aliases.length > 0 && (
          <span class="md-version__alias">
            {active.aliases[0]}
          </span>
        )}
      </button>
      <ul class="md-version__list">
        {versions.map(renderVersion)}
      </ul>
    </div>
  )
}
