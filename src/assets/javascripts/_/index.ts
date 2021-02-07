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

import { getElementOrThrow, getLocation } from "~/browser"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Feature flag
 */
export type Feature =
  | "header.autohide"                  /* Hide header */
  | "navigation.tabs"                  /* Tabs navigation */
  | "navigation.instant"               /* Instant loading */

/* ------------------------------------------------------------------------- */

/**
 * Translation
 */
export type Translation =
  | "clipboard.copy"                   /* Copy to clipboard */
  | "clipboard.copied"                 /* Copied to clipboard */
  | "search.config.lang"               /* Search language */
  | "search.config.pipeline"           /* Search pipeline */
  | "search.config.separator"          /* Search separator */
  | "search.placeholder"               /* Search */
  | "search.result.placeholder"        /* Type to start searching */
  | "search.result.none"               /* No matching documents */
  | "search.result.one"                /* 1 matching document */
  | "search.result.other"              /* # matching documents */
  | "search.result.more.one"           /* 1 more on this page */
  | "search.result.more.other"         /* # more on this page */
  | "search.result.term.missing"       /* Missing */

/**
 * Translations
 */
export type Translations = Record<Translation, string>

/* ------------------------------------------------------------------------- */

/**
 * Configuration
 */
export interface Config {
  base: string                         /* Base URL */
  features: Feature[]                  /* Feature flags */
  translations: Translations           /* Translations */
  search: string                       /* Search worker URL */
}

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Retrieve global configuration and make base URL absolute
 */
let config: Config = JSON.parse(getElementOrThrow("#__config").textContent!)
config.base = new URL(config.base, getLocation())
  .toString()
  .replace(/\/$/, "")

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Retrieve global configuration
 *
 * @return Global configuration
 */
export function configuration(): Config {
  return config
}

/**
 * Check whether a feature is enabled
 *
 * @param feature - Feature
 *
 * @returns Test result
 */
export function flag(feature: Feature): boolean {
  return config.features.includes(feature)
}

/**
 * Retrieve the translation for the given key
 *
 * @param key - Key to be translated
 * @param value - Value to be replaced
 *
 * @return Translation
 */
export function translation(
  key: Translation, value?: string | number
): string {
  if (typeof config.translations[key] === "undefined") {
    throw new ReferenceError(`Invalid translation: ${key}`)
  }
  return typeof value !== "undefined"
    ? config.translations[key].replace("#", value.toString())
    : config.translations[key]
}
