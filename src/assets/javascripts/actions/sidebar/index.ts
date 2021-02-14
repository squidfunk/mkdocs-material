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

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Set sidebar offset
 *
 * @param el - Sidebar element
 * @param value - Sidebar offset
 */
export function setSidebarOffset(
  el: HTMLElement, value: number
): void {
  el.style.top = `${value}px`
}

/**
 * Reset sidebar offset
 *
 * @param el - Sidebar element
 */
export function resetSidebarOffset(
  el: HTMLElement
): void {
  el.style.top = ""
}

/* ------------------------------------------------------------------------- */

/**
 * Set sidebar height
 *
 * This function doesn't set the height of the actual sidebar, but of its first
 * child – the `.md-sidebar__scrollwrap` element in order to mitigiate jittery
 * sidebars when the footer is scrolled into view. At some point we switched
 * from `absolute` / `fixed` positioning to `sticky` positioning, significantly
 * reducing jitter in some browsers (respectively Firefox and Safari) when
 * scrolling from the top. However, top-aligned sticky positioning means that
 * the sidebar snaps to the bottom when the end of the container is reached.
 * This is what leads to the mentioned jitter, as the sidebar's height may be
 * updated too slowly.
 *
 * This behaviour can be mitigiated by setting the height of the sidebar to `0`
 * while preserving the padding, and the height on its first element.
 *
 * @param el - Sidebar element
 * @param value - Sidebar height
 */
export function setSidebarHeight(
  el: HTMLElement, value: number
): void {
  const scrollwrap = el.firstElementChild as HTMLElement
  scrollwrap.style.height = `${value - 2 * scrollwrap.offsetTop}px`
}

/**
 * Reset sidebar height
 *
 * @param el - Sidebar element
 */
export function resetSidebarHeight(
  el: HTMLElement
): void {
  const scrollwrap = el.firstElementChild as HTMLElement
  scrollwrap.style.height = ""
}
