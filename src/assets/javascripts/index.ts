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
import "rxjs/add/operator/map"
import "rxjs/add/operator/scan"
import "rxjs/add/operator/switchMap"

import * as breakpoint from "./device/breakpoint"
import * as viewport from "./device/viewport"

/* ----------------------------------------------------------------------------
 * TODO
 * ------------------------------------------------------------------------- */

// abstract state into component (active) and compose/extend interfaces
//
// state: T extends BaseState

interface State {
  active: boolean
  offset?: number
}

interface CustomState extends State {
  active: boolean
  offset?: number
  bar?: true
}

// TODO: abstract this behavior... generic typings! create, destroy, update

type Reducer = <S extends State>(state: S) => S

interface Lifecycle {
  create: Reducer
  destroy: Reducer
  update: Reducer
}

// function foo(lifecycle: Lifecycle) {
//   factory(lifecycle, viewport.offset()
//     .map(({ y }) => ({ ...state, offset: y })))
// }

// A Breakpoint observable factory... maybe move update into parameters?
function factory<T extends State>(lifecycle: Lifecycle, observable: Observable<T>) {
  const { create, destroy, update } = lifecycle
  return breakpoint.from(1200)

    /* Initialize component and handle state change */
    .scan<boolean, State>((state, active) => {
      return (active ? create : destroy)({ ...state, active })
    }, { active: false })

    /* Augment state */
    .switchMap(state => {
      if (state.active) {
        // return observable
        //   .map((newState: State) => update({ ...state, ...newState }))
        return viewport.offset()
          .map(({ y }) => update({ ...state, offset: y }))
      } else {
        return Observable.empty<State>()
      }
    })
}

const create2 = (state: CustomState) => {
  console.log("create")
  return state
}

const update2 = (state: CustomState) => {
  console.log("update")
  return state
}

const destroy2 = (state: CustomState) => {
  console.log("destroy")
  return state
}

factory({
  create: create2,
  update: update2,
  destroy: destroy2
}).subscribe(console.log)

// const break$ = breakpoint.from(1200)
//
//   /* Initialize component and handle state change */
//   .scan<boolean, State>((state, active) => {
//     // const reducer = active ? state.create : state.destroy
//     return { ...state, active }
//   }, { active: false })
//
//   /* Augment state */
//   .switchMap(state => {
//     if (state.active) {
//       return viewport.offset()
//         .map(({ y }) => ({ ...state, offset: y }))
//     } else {
//       return Observable.empty<State>()
//     }
//   })
//
//   /* Update state */
//   .map(state => {         // pass state + props (create, update, destroy)
//     console.log(state)
//
//     return state
//   })
//
// break$.subscribe(console.log)

console.log("it works!")
