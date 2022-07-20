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
  Observable,
  Subject,
  defer,
  finalize,
  fromEvent,
  map,
  startWith,
  tap
} from "rxjs"

import { feature } from "~/_"
import { getElement } from "~/browser"

import { Component } from "../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Announcement bar
 */
export interface Announce {
  hash: number                        /* Content hash */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch announcement bar
 *
 * @param el - Announcement bar element
 *
 * @returns Announcement bar observable
 */
export function watchAnnounce(
  el: HTMLElement
): Observable<Announce> {
  const button = getElement(".md-typeset > :first-child", el)
  return fromEvent(button, "click", { once: true })
    .pipe(
      map(() => getElement(".md-typeset", el)),
      map(content => ({ hash: __md_hash(content.innerHTML) }))
    )
}

/**
 * Mount announcement bar
 *
 * @param el - Announcement bar element
 *
 * @returns Announcement bar component observable
 */
export function mountAnnounce(
  el: HTMLElement
): Observable<Component<Announce>> {
  if (!feature("announce.dismiss") || !el.childElementCount)
    return EMPTY

  /* Mount component on subscription */
  return defer(() => {
    const push$ = new Subject<Announce>()
    push$
      .pipe(
        startWith({ hash: __md_get<number>("__announce") })
      )
        .subscribe(({ hash }) => {
          if (hash && hash === (__md_get<number>("__announce") ?? hash)) {
            el.hidden = true

            /* Persist preference in local storage */
            __md_set<number>("__announce", hash)
          }
        })

    /* Create and return component */
    return watchAnnounce(el)
      .pipe(
        tap(state => push$.next(state)),
        finalize(() => push$.complete()),
        map(state => ({ ref: el, ...state }))
      )
  })
}
