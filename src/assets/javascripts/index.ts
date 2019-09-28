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

import { equals, reduce } from "rambda"
import { BehaviorSubject, combineLatest, fromEvent, merge, of } from "rxjs"
import {
  distinctUntilChanged,
  filter,
  map,
  mapTo,
  pluck,
  startWith,
  switchMapTo
} from "rxjs/operators"

import {
  fromMediaQuery,
  watchViewportOffset,
  watchViewportSize
} from "./viewport"

// ----------------------------------------------------------------------------

const screen$ = fromMediaQuery("(min-width: 1220px)")
const offset$ = watchViewportOffset()
const size$ = watchViewportSize()

const hash$ = fromEvent<HashChangeEvent>(window, "hashchange").pipe(
  startWith(document.location.hash),
  map(() => document.location.hash),
  filter(hash => hash.length > 0)
)

// ----------------------------------------------------------------------------

const component$ = of({
  container:  document.querySelector("[data-md-component=container]") as HTMLElement,
  navigation: document.querySelector("[data-md-component=navigation]") as HTMLElement,
  header:     document.querySelector("[data-md-component=header]") as HTMLElement,
  title:      document.querySelector("[data-md-component=title]") as HTMLElement,
  toc:        document.querySelector("[data-md-component=toc]") as HTMLElement, // TODO: !?
  headline:   document.querySelector(".md-typeset h1") as HTMLElement
})

// ----------------------------------------------------------------------------

// helper function
function toArray(collection: HTMLCollection): HTMLElement[] {
  return Array.from(collection) as HTMLElement[]
}

document.documentElement.classList.remove("no-js")
document.documentElement.classList.add("js")

// we need TWO observables. first, if it's a resize, we need to set up stuff anew
// bind size and offset to animationFrame !!!
// TODO: combine latest with element!? navigation -> el

// ----------------------------------------------------------------------------
// sidebar lock + height
// ----------------------------------------------------------------------------

// Sidebar { offset, height, locked }

const sidebarOffset$ = size$.pipe(
  switchMapTo(component$),
  map(({ header, navigation }) => {
    return -1 * (header.offsetParent === null ? header.offsetHeight : 0) +
      reduce((offset, child) => {
        return Math.max(offset, child.offsetTop)
      }, 0, toArray(navigation.parentElement!.children))
  }),
  distinctUntilChanged<number>(equals)
)

const sidebarHeight$ = combineLatest(offset$, size$, component$, sidebarOffset$).pipe(
  map(([{ y }, { height }, { header, navigation }, offset]) => {
    const parent = navigation.parentElement as HTMLElement
    return height - (
      header.offsetParent === null ? header.offsetHeight : 0
    ) - Math.max(0, offset - y)
      - Math.max(0, y + height - parent.offsetTop - parent.offsetHeight)
  })
)

const sidebarActive$ = combineLatest(offset$, sidebarOffset$).pipe(
  map(([{ y }, threshold]) => y >= threshold),
  distinctUntilChanged<boolean>(equals)
)

// ----------------------------------------------------------------------------

combineLatest(component$, sidebarActive$)
  .subscribe(([{ navigation }, active]) => {
    navigation.dataset.mdState = active ? "lock" : ""
  })

combineLatest(component$, sidebarHeight$)
  .subscribe(([{ navigation }, height]) => {
    navigation.style.height = `${height}px`
  })

// ----------------------------------------------------------------------------

// re-use calculation for toc, if present!
combineLatest(component$, sidebarActive$).pipe(
  filter(([{ toc }]) => Boolean(toc))
)
  .subscribe(([{ toc }, active]) => {
    toc.dataset.mdState = active ? "lock" : ""
  })

combineLatest(component$, sidebarHeight$).pipe(
  filter(([{ toc }]) => Boolean(toc))
)
  .subscribe(([{ toc }, height]) => {
    toc.style.height = `${height}px`
  })

// ----------------------------------------------------------------------------
// header shadow
// ----------------------------------------------------------------------------

// Shadow { offset, locked }

const shadowOffset$ = size$.pipe(
  switchMapTo(component$),
  map(({ container }) => {
    let parent = container.parentElement as HTMLElement
    let height = 0
    do {
      parent  = parent.previousElementSibling as HTMLElement                     // toElement -> throw if not!
      height += parent.offsetHeight
    } while (parent.previousElementSibling)
    return height
  })
)

const shadowActive$ = combineLatest(offset$, shadowOffset$).pipe(
  map(([{ y }, threshold]) => y >= threshold),
  distinctUntilChanged<boolean>(equals)
)

// ----------------------------------------------------------------------------

combineLatest(component$, shadowActive$)
  .subscribe(([{ header }, active]) => {
    header.dataset.mdState = active ? "shadow" : ""
  })

// ----------------------------------------------------------------------------
// header title swap
// ----------------------------------------------------------------------------

const headlineOffset$ = size$.pipe(
  switchMapTo(component$),
  map(({ headline }) => headline.offsetTop),
  distinctUntilChanged<number>(equals)
)

const headlineWidth$ = size$.pipe(
  switchMapTo(component$),
  map(({ title }) => title.offsetWidth - 20),
  distinctUntilChanged<number>(equals)
)

const headlineActive$ = combineLatest(offset$, headlineOffset$).pipe(
  map(([{ y }, threshold]) => y >= threshold),
  distinctUntilChanged<boolean>(equals)
)

// ----------------------------------------------------------------------------

combineLatest(component$, headlineActive$)
  .subscribe(([{ title }, active]) => {
    title.dataset.mdState = active ? "active" : ""
  })

combineLatest(component$, headlineWidth$)
  .subscribe(([{ title }, width]) => {
    for (const child of toArray(title.children))
      child.style.width = `${width}px`
  })

// ----------------------------------------------------------------------------
// open details on hashchange
// ----------------------------------------------------------------------------

hash$.pipe(
  map(hash => document.querySelector(hash) as HTMLElement),                     // TODO: write a getElement function...
  filter<HTMLElement>(Boolean)
)
  .subscribe(el => {
    let parent = el.parentNode
    while (parent && !(parent instanceof HTMLDetailsElement))
      parent = parent.parentNode

    /* If there's a details tag, open it */
    if (parent && !parent.open) {
      parent.open = true

      /* Force reload, so the viewport repositions */
      const hash = location.hash
      location.hash = " "
      location.hash = hash // tslint:disable-line
    }
  })

// size$.pipe(
//   switchMapTo(component$),
//   map(({ title }) => {
//     title.children
//   }

// just combine all header observables into one!

// headerLock$.subscribe(console.log)
// headerHeight$.subscribe(console.log)
// TODO just tap both? toc and nav?

// // first, calculate top offset
// size$.subscribe(size => {
//   const children = Array.from(navigation.parentElement!.children) as HTMLElement[] // TODO

//   const top = children.reduce((offset, child) => Math.max(offset, child.offsetTop), 0)

//   const offset = top - (adjust ? header.offsetHeight : 0)

// })

// const top = Array.from(navigation.parentElement!.children)
//   .reduce()

// this.parent_.children, (offset, child) => {
//   return Math.max(offset, child.offsetTop)
// }, 0)

/* Set lock offset for element with largest top offset */
// this.offset_ = top - (this.pad_ ? this.header_.offsetHeight : 0)

// offset$.subscribe(offset => {
//   console.log(offset)
// })

export function app(_x: any) {

}
