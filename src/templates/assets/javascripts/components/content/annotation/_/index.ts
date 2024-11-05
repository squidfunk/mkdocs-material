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

import {
  Observable,
  Subject,
  animationFrameScheduler,
  auditTime,
  combineLatest,
  debounceTime,
  defer,
  delay,
  endWith,
  filter,
  finalize,
  fromEvent,
  ignoreElements,
  map,
  merge,
  switchMap,
  take,
  takeUntil,
  tap,
  throttleTime,
  withLatestFrom
} from "rxjs"

import {
  ElementOffset,
  getActiveElement,
  getElementSize,
  watchElementContentOffset,
  watchElementFocus,
  watchElementOffset,
  watchElementVisibility
} from "~/browser"

import { Component } from "../../../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Annotation
 */
export interface Annotation {
  active: boolean                      /* Annotation is active */
  offset: ElementOffset                /* Annotation offset */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Mount options
 */
interface MountOptions {
  target$: Observable<HTMLElement>     /* Location target observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch annotation
 *
 * @param el - Annotation element
 * @param container - Containing element
 *
 * @returns Annotation observable
 */
export function watchAnnotation(
  el: HTMLElement, container: HTMLElement
): Observable<Annotation> {
  const offset$ = defer(() => combineLatest([
    watchElementOffset(el),
    watchElementContentOffset(container)
  ]))
    .pipe(
      map(([{ x, y }, scroll]): ElementOffset => {
        const { width, height } = getElementSize(el)
        return ({
          x: x - scroll.x + width  / 2,
          y: y - scroll.y + height / 2
        })
      })
    )

  /* Actively watch annotation on focus */
  return watchElementFocus(el)
    .pipe(
      switchMap(active => offset$
        .pipe(
          map(offset => ({ active, offset })),
          take(+!active || Infinity)
        )
      )
    )
}

/**
 * Mount annotation
 *
 * @param el - Annotation element
 * @param container - Containing element
 * @param options - Options
 *
 * @returns Annotation component observable
 */
export function mountAnnotation(
  el: HTMLElement, container: HTMLElement, { target$ }: MountOptions
): Observable<Component<Annotation>> {
  const [tooltip, index] = Array.from(el.children)

  /* Mount component on subscription */
  return defer(() => {
    const push$ = new Subject<Annotation>()
    const done$ = push$.pipe(ignoreElements(), endWith(true))
    push$.subscribe({

      /* Handle emission */
      next({ offset }) {
        el.style.setProperty("--md-tooltip-x", `${offset.x}px`)
        el.style.setProperty("--md-tooltip-y", `${offset.y}px`)
      },

      /* Handle complete */
      complete() {
        el.style.removeProperty("--md-tooltip-x")
        el.style.removeProperty("--md-tooltip-y")
      }
    })

    /* Start animation only when annotation is visible */
    watchElementVisibility(el)
      .pipe(
        takeUntil(done$)
      )
        .subscribe(visible => {
          el.toggleAttribute("data-md-visible", visible)
        })

    /* Toggle tooltip presence to mitigate empty lines when copying */
    merge(
      push$.pipe(filter(({ active }) => active)),
      push$.pipe(debounceTime(250), filter(({ active }) => !active))
    )
      .subscribe({

        /* Handle emission */
        next({ active }) {
          if (active)
            el.prepend(tooltip)
          else
            tooltip.remove()
        },

        /* Handle complete */
        complete() {
          el.prepend(tooltip)
        }
      })

    /* Toggle tooltip visibility */
    push$
      .pipe(
        auditTime(16, animationFrameScheduler)
      )
        .subscribe(({ active }) => {
          tooltip.classList.toggle("md-tooltip--active", active)
        })

    /* Track relative origin of tooltip */
    push$
      .pipe(
        throttleTime(125, animationFrameScheduler),
        filter(() => !!el.offsetParent),
        map(() => el.offsetParent!.getBoundingClientRect()),
        map(({ x }) => x)
      )
        .subscribe({

          /* Handle emission */
          next(origin) {
            if (origin)
              el.style.setProperty("--md-tooltip-0", `${-origin}px`)
            else
              el.style.removeProperty("--md-tooltip-0")
          },

          /* Handle complete */
          complete() {
            el.style.removeProperty("--md-tooltip-0")
          }
        })

    /* Allow to copy link without scrolling to anchor */
    fromEvent<MouseEvent>(index, "click")
      .pipe(
        takeUntil(done$),
        filter(ev => !(ev.metaKey || ev.ctrlKey))
      )
        .subscribe(ev => {
          ev.stopPropagation()
          ev.preventDefault()
        })

    /* Allow to open link in new tab or blur on close */
    fromEvent<MouseEvent>(index, "mousedown")
      .pipe(
        takeUntil(done$),
        withLatestFrom(push$)
      )
        .subscribe(([ev, { active }]) => {

          /* Open in new tab */
          if (ev.button !== 0 || ev.metaKey || ev.ctrlKey) {
            ev.preventDefault()

          /* Close annotation */
          } else if (active) {
            ev.preventDefault()

            /* Focus parent annotation, if any */
            const parent = el.parentElement!.closest(".md-annotation")
            if (parent instanceof HTMLElement)
              parent.focus()
            else
              getActiveElement()?.blur()
          }
        })

    /* Open and focus annotation on location target */
    target$
      .pipe(
        takeUntil(done$),
        filter(target => target === tooltip),
        delay(125)
      )
        .subscribe(() => el.focus())

    /* Create and return component */
    return watchAnnotation(el, container)
      .pipe(
        tap(state => push$.next(state)),
        finalize(() => push$.complete()),
        map(state => ({ ref: el, ...state }))
      )
  })
}
