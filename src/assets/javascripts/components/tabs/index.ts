/*
 * Copyright (c) 2016-2019 Martin Donath <martin.donath@squidfunk.com>
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

import { Observable, OperatorFunction, pipe } from "rxjs"
import { map, shareReplay } from "rxjs/operators"

import { switchMapIf } from "extensions"
import { Agent, paintHidden } from "utilities"

import { Header, watchHeaderOffsetToTopOf } from "../header"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Tabs
 */
export interface Tabs {
  hidden: boolean                      /* Whether the tabs are hidden */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Options
 */
interface Options {
  header$: Observable<Header>          /* Header observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Setup tabs from source observable
 *
 * @param agent - Agent
 * @param options - Options
 *
 * @return Operator function
 */
export function setupTabs(
  agent: Agent, { header$ }: Options
): OperatorFunction<HTMLElement, Tabs> {
  const { media } = agent
  return pipe(
    switchMapIf(media.screen$, el => {

      /* Watch and paint visibility */
      const hidden$ = watchHeaderOffsetToTopOf(el, agent, { header$ })
        .pipe(
          paintHidden(el, 8)
        )

      /* Combine into a single hot observable */
      return hidden$
        .pipe(
          map(hidden => ({ hidden }))
        )
    }),
    shareReplay(1)
  )
}
