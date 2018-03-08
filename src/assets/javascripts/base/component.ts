/*
 * Copyright (c) 2016-2018 Martin Donath <martin.donath@squidfunk.com>
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

import { Observable } from "rxjs/Observable"

import "rxjs/add/observable/empty"
import "rxjs/add/observable/of"
import "rxjs/add/operator/scan"
import "rxjs/add/operator/switchMap"

import { merge } from "lodash"

import { Toggle } from "./toggle"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Component state
 */
export interface ComponentState {
  active: boolean                      /* Whether the component is active */
}

/**
 * Component lifecycle hooks
 */
export interface Component<
  T extends ComponentState,            /* Component state */
  V                                    /* Component value */
> {
  initial: T                           /* Initial state */
  create: (state: T) => T              /* Creation hook */
  destroy: (state: T) => T             /* Destruction hook */
  update: (state: T) => Observable<
    Readonly<V>
  >                                    /* Update hook */
}

/* ----------------------------------------------------------------------------
 * Lifecycle hooks
 * ------------------------------------------------------------------------- */

/**
 * No-op creation lifecycle hook
 *
 * @param state - Component state
 *
 * @return Altered state
 */
export function create<T extends ComponentState>(state: T) {
  return state
}

/**
 * No-op destruction lifecycle hook
 *
 * @param state - Component state
 *
 * @return Altered state
 */
export function destroy<T extends ComponentState>(state: T) {
  return state
}

/**
 * No-op update lifecycle hook
 *
 * @param state - Component state
 *
 * @return Altered state
 */
export function update<T extends ComponentState, V>(state: T) {
  return Observable.empty<V>()
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Bind a component's lifecycle to a toggle
 *
 * @param component - Component
 * @param toggle$ - Toggle observable
 *
 * @return Component observable
 */
export function bind<T extends ComponentState, V>(
  component: Component<T, V>, toggle$?: Observable<Toggle>
) {
  const { initial, create: c, destroy: d, update: u } = component
  return (toggle$ || Observable.of({ active: true }))

    /* Initialize component and handle state change */
    .scan<Toggle, T>((state, { active }) => {
      return (active ? c : d)(merge(state, { active }))
    }, initial)

    /* Return update component lifecycle hook */
    .switchMap(state => {
      return state.active ? u(state) : Observable.empty<V>()
    })
}
