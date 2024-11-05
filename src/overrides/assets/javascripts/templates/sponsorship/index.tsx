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

import { h } from "~/utilities"

import { SponsorUser } from "_/components"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Render public sponsor
 *
 * @param user - Sponsor user
 *
 * @returns Element
 */
export function renderPublicSponsor(
  user: SponsorUser
): HTMLElement {
  const title = `@${user.name}`
  return (
    <a href={user.url} title={title} class="mdx-sponsorship__item">
      <img src={user.image} />
    </a>
  )
}

/**
 * Render private sponsor
 *
 * @param count - Number of private sponsors
 *
 * @returns Element
 */
export function renderPrivateSponsor(
  count: number
): HTMLElement {
  return (
    <a
      href="https://github.com/sponsors/squidfunk?metadata_origin=docs"
      class="mdx-sponsorship__item mdx-sponsorship__item--private"
    >
      +{count}
    </a>
  )
}
