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

import { Observable, OperatorFunction, pipe } from "rxjs"
import { map, shareReplay } from "rxjs/operators"

import { switchMapIf } from "extensions"
import { Agent, paintHidden } from "utilities"

import { HeaderState, watchViewportOffsetFromTopOf } from "../header"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Hero state
 */
export interface HeroState {
  hidden: boolean                      /* Whether the hero is hidden */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Options
 */
interface Options {
  header$: Observable<HeaderState>     /* Header state observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch hero
 *
 * @param el - Hero element
 * @param agent - Agent
 * @param options - Options
 *
 * @return Hero state
 */
export function watchHero(
  el: HTMLElement, agent: Agent, { header$ }: Options
): Observable<HeroState> {

  /* Watch and paint visibility */
  const hidden$ = watchViewportOffsetFromTopOf(el, agent, { header$ })
    .pipe(
      paintHidden(el, 20)
    )

  /* Combine into a single hot observable */
  return hidden$
    .pipe(
      map(hidden => ({ hidden }))
    )
}

/* ------------------------------------------------------------------------- */

/**
 * Mount hero from source observable
 *
 * @param agent - Agent
 * @param options - Options
 *
 * @return Operator function
 */
export function mountHero(
  agent: Agent, options: Options
): OperatorFunction<HTMLElement, HeroState> {
  const { media } = agent
  return pipe(
    switchMapIf(media.screen$, el => watchHero(el, agent, options)),
    shareReplay(1)
  )
}
