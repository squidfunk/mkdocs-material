/*
 * Copyright (c) 2016-2021 Martin Donath <martin.donath@squidfunk.com>
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

import ClipboardJS from "clipboard"
import {
  NEVER,
  Observable,
  Subject,
  distinctUntilKeyChanged,
  finalize,
  fromEvent,
  map,
  merge,
  mergeWith,
  of,
  switchMap,
  tap,
  withLatestFrom,
  distinctUntilChanged,
  takeWhile,
  repeat,
  EMPTY,
  observeOn,
  debounceTime,
  mapTo,
  throttle,
  share,
  defer,
  switchMapTo,
  shareReplay,
  combineLatest,
  asapScheduler,
  animationFrameScheduler
} from "rxjs"

import { feature } from "~/_"
import {
  resetFocusable,
  setFocusable
} from "~/actions"
import {
  Viewport,
  getElement,
  getElementContentSize,
  getElementSize,
  getElements,
  getOptionalElement,
  watchMedia,
  watchElementContentOffset,
  watchElementVisibility,
  getElementOffset,
  watchElementOffset
} from "~/browser"
import {
  renderAnnotation,
  renderClipboardButton
} from "~/templates"

import { Component } from "../../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Code block
 */
export interface CodeBlock {
  scrollable: boolean                  /* Code block overflows */
  annotations?: HTMLElement[]          /* Code block annotations */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Watch options
 */
interface WatchOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
  print$: Observable<boolean>          /* Media print observable */
}

/**
 * Mount options
 */
interface MountOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
  hover$: Observable<boolean>          /* Media hover observable */
  print$: Observable<boolean>          /* Media print observable */
}

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Global index for Clipboard.js integration
 */
let index = 0

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Find the code annotations belonging to a code block
 *
 * @param el - Code block element
 *
 * @returns Code annotations or nothing
 */
function findAnnotationsList(el: HTMLElement): HTMLElement | undefined {
  if (el.nextElementSibling) {
    const sibling = el.nextElementSibling as HTMLElement
    if (sibling.tagName === "OL")
      return sibling

    /* Paragraph, may be empty, see https://bit.ly/3r4ZJ2O */
    else if (sibling.tagName === "P" && !sibling.children.length)
      return findAnnotationsList(sibling)
  }

  /* Everything else */
  return undefined
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch code block
 *
 * This function monitors size changes of the viewport, as well as switches of
 * content tabs with embedded code blocks, as both may trigger overflow.
 *
 * @param el - Code block element
 * @param options - Options
 *
 * @returns Code block observable
 */
export function watchCodeBlock(
  el: HTMLElement, { viewport$, print$ }: WatchOptions
): Observable<CodeBlock> {

  /* Watch content tabs as they can reveal code blocks */
  const reveal$ = defer(() => {
    const container = el.closest("[data-tabs]")
    if (container instanceof HTMLElement) {
      return merge(
        ...getElements(":scope > input", container)
          .map(input => fromEvent(input, "change"))
      )
    }
    return NEVER
  })

  /* Compute overflow state on resize and content tab change */
  const scroll$ = viewport$
    .pipe(
      distinctUntilKeyChanged("size"),
      mergeWith(reveal$),
      map(() => {
        const visible = getElementSize(el)
        const content = getElementContentSize(el)
        return content.width > visible.width
      }),
      distinctUntilChanged()
    )

  /* Compute content offset of code block */
  const offset$ = watchElementContentOffset(el)
  // scroll$
  //   .pipe(
  //     switchMap(scrollable => scrollable
  //       ? watchElementContentOffset(el)
  //       : EMPTY
  //     ),
  //     shareReplay(1) // TBD
  //   )

  // TODO: from here, annotations #############################################

  /* Compute whether code annotations must be temporarily hidden */
  const finish$ = offset$.pipe(debounceTime(125), mapTo(false))
  const hidden$ = merge(
    finish$,
    offset$.pipe(throttle(() => finish$), mapTo(true))
  )

  /* Hide tooltip while scrolling */
  hidden$.subscribe(hidden => {
    if (hidden) {
      console.log("scrolling...")
      // el.setAttribute("data-md-state", "scroll")
    } else {
      console.log("scrolling done")
      el.removeAttribute("data-md-state")
    }
  })

  const annotations$ = defer(() => {
    const annotations: HTMLElement[] = []

    /* */
    const container = el.closest(".highlighttable") || el.closest(".highlight")
    if (!(container instanceof HTMLElement))
      return NEVER

    /* */
    if (container instanceof HTMLElement) {
      const list = findAnnotationsList(container)
      if (typeof list !== "undefined" && (
        container.classList.contains("annotate") ||
        feature("content.code.annotate")
      )) {

        /* Replace comments with annotations */
        const items = getElements(":scope > li", list)
        for (const comment of getElements(".c, .c1, .cm", el)) {

          /* Split comment at annotations */ // TODO: refactor when revisiting annotations
          let match: RegExpExecArray | null
          let text = comment.firstChild as Text
          do {
            match = /\((\d+)\)/.exec(text.textContent!)
            if (match && match.index) {
              const bubble = text.splitText(match.index)
              text = bubble.splitText(match[0].length) // complete match length

              const [, j = -1] = match
              const content = items[+j - 1]
              if (typeof content !== "undefined") {
                const annotation = renderAnnotation(+j, content.childNodes)
                bubble.replaceWith(annotation) // bubble is and will stay replaced...
                annotations.push(annotation)
              }
            }
          } while (match)
        }
      }
    }

    // // offset, compute tooltip position...
    // offset$.subscribe(({ x }) => {
    //   el.style.setProperty("--md-tooltip-x", `${x}px`)
    // })

    // wrong, we must always recompute the position..
    for (const annotation of annotations) {
      const size = getElementSize(annotation)
      offset$
        .pipe(
          // observeOn(animationFrameScheduler), // TODO: ?
          withLatestFrom(watchElementOffset(annotation)),
          map(([scroll, offset]) => {

            // if left is clamped, we must add to top!
            // TODO: this must also be placed here!
            annotation.style.setProperty(
              "--md-tooltip-x", `${offset.x - scroll.x}px`
            )
            annotation.style.setProperty(
              "--md-tooltip-y", `${offset.y - scroll.y}px`
            )
          })
        )
          .subscribe()


    }

    return of(annotations)
  })

  //     // /* Move elements back on print */ // TODO: refactor memleak (instant loading)
  //     // print$.subscribe(active => {
  //     //   if (active) {
  //     //     container.insertAdjacentElement("afterend", list)
  //     //     for (const annotation of annotations) {
  //     //       const id = parseInt(annotation.getAttribute("data-index")!, 10)
  //     //       const typeset = getOptionalElement(":scope .md-typeset", annotation)!
  //     //       items[id - 1].append(...Array.from(typeset.childNodes))
  //     //     }
  //     //   } else {
  //     //     list.remove()
  //     //     for (const annotation of annotations) {
  //     //       const id = parseInt(annotation.getAttribute("data-index")!, 10)
  //     //       const nodes = items[id - 1].childNodes
  //     //       getElement(":scope .md-typeset", annotation)
  //     //         .append(...Array.from(nodes))
  //     //     }
  //     //   }
  //     // })
  //   }
  // }



  /* Check overflow on resize and tab change */
  return viewport$
    .pipe(
      distinctUntilKeyChanged("size"),
      mergeWith(reveal$),
      switchMapTo(annotations$),
      map(annotations => {
        const visible = getElementSize(el)
        const content = getElementContentSize(el)
        return {
          scroll: content.width > visible.width,
          ...annotations.length && { annotations }
        }
      }),
      distinctUntilKeyChanged("scroll")
    )
}

/**
 * Mount code block
 *
 * This function ensures that an overflowing code block is focusable through
 * keyboard, so it can be scrolled without a mouse to improve on accessibility.
 *
 * @param el - Code block element
 * @param options - Options
 *
 * @returns Code block component observable
 */
export function mountCodeBlock(
  el: HTMLElement, { hover$, ...options }: MountOptions
): Observable<Component<CodeBlock>> {
  const internal$ = new Subject<CodeBlock>()
  internal$
    .pipe(
      withLatestFrom(hover$)
    )
      .subscribe(([{ scrollable: scroll }, hover]) => {
        if (scroll && hover)
          setFocusable(el)
        else
          resetFocusable(el)
      })

  // /* Compute annotation position */
  // internal$
  //   .pipe(
  //     take(1),
  //     takeWhile(({ annotations }) => !!annotations?.length),
  //     combineLatestWith(viewport$
  //       .pipe(
  //         distinctUntilKeyChanged("size")
  //       )
  //     )
  //   )
  //     .subscribe(([{ annotations }, { size }]) => {
  //       if (typeof annotations === "undefined")
  //         return

  //       /* Compute annotation positions */
  //       for (const annotation of annotations) {
  //         const annotationIndex = getElement(".md-annotation__index", annotation)
  //         const tooltip = getElement(".md-tooltip", annotation)
  //         console.log(annotationIndex, tooltip)

  //         const { x } = getElementOffset(annotationIndex)

  //         console.log(x)

  //       }
  //       // console.log(tooltips, size)
  //       // for (const tooltip of tooltips) {
  //       //   const { x, width } = tooltip.getBoundingClientRect()
  //       //   if (x + width > size.width)
  //       //     tooltip.classList.add("md-tooltip--end")
  //       //   else
  //       //     tooltip.classList.remove("md-tooltip--end")
  //       // }
  //     })

  /* Render button for Clipboard.js integration */
  if (ClipboardJS.isSupported()) {
    const parent = el.closest("pre")!
    parent.id = `__code_${++index}`
    parent.insertBefore(
      renderClipboardButton(parent.id),
      el
    )
  }

  /* Create and return component */
  return watchCodeBlock(el, options)
    .pipe(
      tap(state => internal$.next(state)),
      finalize(() => internal$.complete()),
      map(state => ({ ref: el, ...state }))
    )
}
