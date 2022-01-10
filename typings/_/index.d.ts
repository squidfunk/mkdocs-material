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
  worker?: string                      /* Alternate worker URL */
}

/* ------------------------------------------------------------------------- */

declare global {

  /**
   * Global search configuration
   */
  const __search: GlobalSearchConfig | undefined

  /**
   * Fetch the value for a key from the given storage
   *
   * This function is defined in `partials/javascripts/base.html`, so it can be
   * used from the templates, as well as from the application bundle.
   *
   * @template T - Data type
   *
   * @param key - Key
   * @param storage - Storage (default: local storage)
   * @param base - Base URL (default: current base)
   *
   * @return Value or nothing
   */
  function __md_get<T>(
    key: string, storage?: Storage, base?: URL
  ): T | null

  /**
   * Persist a key-value pair in the given storage
   *
   * This function is defined in `partials/javascripts/base.html`, so it can be
   * used from the templates, as well as from the application bundle.
   *
   * @template T - Data type
   *
   * @param key - Key
   * @param value - Value
   * @param storage - Storage (default: local storage)
   * @param base - Base URL (default: current base)
   */
  function __md_set<T>(
    key: string, value: T, storage?: Storage, base?: URL
  ): void
}

/* ------------------------------------------------------------------------- */

/**
 * Google Analytics
 */
declare global {
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
  var tablet$: Observable<boolean>     /* Media tablet observable */
  var screen$: Observable<boolean>     /* Media screen observable */
  var print$: Observable<boolean>      /* Media print observable */
  var alert$: Subject<string>          /* Alert subject */
  var component$: Observable<Component>/* Component observable */
}
