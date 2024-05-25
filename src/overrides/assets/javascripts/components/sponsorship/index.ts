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

import { Observable, from, map, switchMap, tap } from "rxjs"

import { getOptionalElement, requestJSON } from "~/browser"

import { renderPrivateSponsor, renderPublicSponsor } from "_/templates"

import { Component, getComponentElements } from "../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Sponsor type
 */
export type SponsorType =
  | "user"                             /* Sponsor is a user */
  | "organization"                     /* Sponsor is an organization */

/**
 * Sponsor visibility
 */
export type SponsorVisibility =
  | "public"                           /* Sponsor is a user */
  | "private"                          /* Sponsor is an organization */

/* ------------------------------------------------------------------------- */

/**
 * Sponsor user
 */
export interface SponsorUser {
  type: SponsorType                    /* Sponsor type */
  name: string                         /* Sponsor login name */
  image: string                        /* Sponsor image URL */
  url: string                          /* Sponsor URL */
}

/* ------------------------------------------------------------------------- */

/**
 * Public sponsor
 */
export interface PublicSponsor {
  type: "public"                       /* Sponsor visibility */
  user: SponsorUser                    /* Sponsor user */
}

/**
 * Private sponsor
 */
export interface PrivateSponsor {
  type: "private"                      /* Sponsor visibility */
}

/* ------------------------------------------------------------------------- */

/**
 * Sponsor
 */
export type Sponsor =
  | PublicSponsor
  | PrivateSponsor

/* ------------------------------------------------------------------------- */

/**
 * Sponsorship
 */
export interface Sponsorship {
  sponsors: Sponsor[]                  /* Sponsors */
  total: number                        /* Total amount */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount sponsorship
 *
 * @param el - Sponsorship element
 *
 * @returns Sponsorship component observable
 */
export function mountSponsorship(
  el: HTMLElement
): Observable<Component<Sponsorship>> {
  const sponsorship$ = requestJSON<Sponsorship>(
    "https://3if8u9o552.execute-api.us-east-1.amazonaws.com/_/"
  )

  /* Retrieve adjacent components */
  const count = getComponentElements("sponsorship-count")
  const total = getComponentElements("sponsorship-total")

  /* Render sponsorship count */
  sponsorship$.pipe(
    switchMap(sponsorship => from(count).pipe(
      tap(child => child.innerText = `${sponsorship.sponsors.length}`)
    ))
  )
    .subscribe(() => el.removeAttribute("hidden"))

  /* Render sponsorship total */
  sponsorship$.pipe(
    switchMap(sponsorship => from(total).pipe(
      tap(child => child.innerText = `$ ${sponsorship.total
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      } a month`)
    ))
  )
    .subscribe()

  // Render sponsorship list
  const list = getOptionalElement(":scope > .mdx-sponsorship__list", el)
  if (list && count.length) {
    sponsorship$.subscribe(sponsorship => {
      for (const sponsor of sponsorship.sponsors)
        if (sponsor.type === "public")
          list.appendChild(renderPublicSponsor(sponsor.user))

      /* Render combined private sponsors */
      list.appendChild(renderPrivateSponsor(
        sponsorship.sponsors.filter(({ type }) => (
          type === "private"
        )).length
      ))
    })
  }

  /* Create and return component */
  return sponsorship$
    .pipe(
      map(state => ({ ref: el, ...state }))
    )
}
