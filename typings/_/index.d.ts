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

import { Observable, Subject } from "rxjs"

import { Keyboard, Viewport } from "~/browser"
import { Component } from "~/components"
import {
  SearchIndex,
  SearchTransformFn
} from "~/integrations"

/* ----------------------------------------------------------------------------
 * Global types
 * ------------------------------------------------------------------------- */

/**
 * Global search configuration
 */
export interface GlobalSearchConfig {
  transform?: SearchTransformFn        /* Transformation function */
  index?: Promise<SearchIndex>         /* Alternate index */
}

/* ------------------------------------------------------------------------- */

declare global {

  /**
   * Global search configuration
   */
  const __search: GlobalSearchConfig | undefined

  /**
   * Global function to prefix storage items
   */
   function __prefix(key: string): string

  /**
   * Google Analytics
   */
  function ga(...args: string[]): void
}

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

declare global {
  var document$: Observable<Document>  /* Document observable */
  var location$: Subject<URL>          /* Location subject */
  var target$: Observable<HTMLElement> /* Location target observable */
  var keyboard$: Observable<Keyboard>  /* Keyboard observable */
  var viewport$: Observable<Viewport>  /* Viewport obsevable */
  var tablet$: Observable<boolean>     /* Tablet breakpoint observable */
  var screen$: Observable<boolean>     /* Screen breakpoint observable */
  var print$: Observable<void>         /* Print mode observable */
  var alert$: Subject<string>          /* Alert subject */
  var component$: Observable<Component>/* Component observable */
}
