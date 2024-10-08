/*
 * Copyright (c) 2016-2023 Martin Donath <martin.donath@squidfunk.com>
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

import { minify as minhtml } from "html-minifier-terser"
import * as path from "path"
import {
  EMPTY,
  concat,
  defer,
  from,
  map,
  merge,
  mergeMap,
  of,
  reduce,
  scan,
  startWith,
  switchMap,
  toArray,
  zip
} from "rxjs"
import { optimize } from "svgo"

import { IconSearchIndex } from "_/components"

import { base, read, resolve, watch, write } from "./_"
import { copyAll } from "./copy"
import {
  transformScript,
  transformStyle
} from "./transform"
import glob from "tiny-glob"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Twemoji icon
 */
interface TwemojiIcon {
  unicode: string                      /* Unicode code point */
}

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Replace file extension
 *
 * @param file - File
 * @param extension - New extension
 *
 * @returns File with new extension
 */
function ext(file: string, extension: string): string {
  return file.replace(path.extname(file), extension)
}

/**
 * Optimize SVG data
 *
 * This function will just pass-through non-SVG data, which makes the pipeline
 * much simpler, as we can reuse it for the license texts.
 *
 * @param data - SVG data
 *
 * @returns Minified SVG data
 */
function minsvg(data: string): string {
  if (!data.startsWith("<"))
    return data

  /* Optimize SVG */
  const result = optimize(data, {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false
          }
        }
      },
      {
        name: "removeDimensions"
      }
    ]
  })

  /* Return minified SVG */
  return result.data
}

/* ----------------------------------------------------------------------------
 * Tasks
 * ------------------------------------------------------------------------- */

/* Copy all assets */
const assets$ = concat(

  /* Copy Material Design icons */
  ...["*.svg", "../LICENSE"]
    .map(pattern => copyAll(pattern, {
      from: "node_modules/@mdi/svg/svg",
      to: `${base}/templates/.icons/material`,
      transform: async data => minsvg(data)
    })),

  /* Copy GitHub octicons */
  ...["*.svg", "../../LICENSE"]
    .map(pattern => copyAll(pattern, {
      from: "node_modules/@primer/octicons/build/svg",
      to: `${base}/templates/.icons/octicons`,
      transform: async data => minsvg(data)
    })),

  /* Copy FontAwesome icons */
  ...["**/*.svg", "../LICENSE.txt"]
    .map(pattern => copyAll(pattern, {
      from: "node_modules/@fortawesome/fontawesome-free/svgs",
      to: `${base}/templates/.icons/fontawesome`,
      transform: async data => minsvg(data)
    })),

  /* Copy Simple icons */
  ...["**/*.svg", "../LICENSE.md"]
    .map(pattern => copyAll(pattern, {
      from: "node_modules/simple-icons/icons",
      to: `${base}/templates/.icons/simple`,
      transform: async data => minsvg(data)
    })),

  /* Copy Lunr.js search stemmers and segmenters */
  ...["min/*.js", "tinyseg.js", "wordcut.js"]
    .map(pattern => copyAll(pattern, {
      from: "node_modules/lunr-languages",
      to: `${base}/templates/assets/javascripts/lunr`
    })),

  /* Copy images and configurations */
  ...["**/*.{jpg,png,svg,yml}"]
    .map(pattern => copyAll(pattern, {
      from: "src",
      to: base
    }))
)

/* Copy plugins and extensions */
const sources$ = copyAll("**/*.py", {
  from: "src",
  to: base,
  watch: process.argv.includes("--watch"),
  transform: async (data, name) => {
    if (path.basename(name) === "__init__.py") {
      const metadata = require("../../package.json")
      return data.replace("$md-version$", metadata.version)
    } else {
      return data
    }
  }
})

/* ------------------------------------------------------------------------- */

/* Transform styles */
const stylesheets$ = resolve("**/[!_]*.scss", { cwd: "src" })
  .pipe(
    mergeMap(file => zip(
      of(ext(file, ".css").replace(/(overrides|templates)\//, "")),
      transformStyle({
        from: `src/${file}`,
        to: ext(`${base}/${file}`, ".css")
      }))
    )
  )

/* Transform scripts */
const javascripts$ = resolve("**/{custom,bundle,search}.ts", { cwd: "src" })
  .pipe(
    mergeMap(file => zip(
      of(ext(file, ".js").replace(/(overrides|templates)\//, "")),
      transformScript({
        from: `src/${file}`,
        to: ext(`${base}/${file}`, ".js")
      }))
    )
  )

/* Compute manifest */
const manifest$ = merge(
  ...Object.entries({
    "**/*.scss": stylesheets$,
    "**/*.ts*":  javascripts$
  })
    .map(([pattern, observable$]) => (
      defer(() => process.argv.includes("--watch")
        ? from(glob(pattern, { cwd: "src" })).pipe(
          switchMap(files => watch(files, { cwd: "src" }))
        )
        : EMPTY
      )
        .pipe(
          startWith("*"),
          switchMap(() => observable$.pipe(toArray()))
        )
    ))
)
  .pipe(
    scan((prev, mapping) => (
      mapping.reduce((next, [key, value]) => (
        next.set(key, value.replace(
          new RegExp(`${base}\\/(overrides|templates)\\/`),
          ""
        ))
      ), prev)
    ), new Map<string, string>()),
  )

/* Transform templates */
const templates$ = manifest$
  .pipe(
    switchMap(manifest => copyAll("**/*.html", {
      from: "src",
      to: base,
      watch: process.argv.includes("--watch"),
      transform: async data => {
        const metadata = require("../../package.json")
        const banner =
          "{#-\n" +
          "  This file was automatically generated - do not edit\n" +
          "-#}\n"

        /* If necessary, apply manifest */
        if (process.argv.includes("--optimize"))
          for (const [key, value] of manifest)
            data = data.replace(
              new RegExp(`('|")${key}\\1`, "g"),
              `$1${value}$1`
            )

        /* Normalize line feeds and minify HTML */
        const html = data.replace(/\r\n/gm, "\n")
        return banner + await minhtml(html, {
          collapseBooleanAttributes: true,
          includeAutoGeneratedTags: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        })
          .then(html => html

            /* Remove empty lines without collapsing everything */
            .replace(/^\s*[\r\n]/gm, "")

            /* Write theme version into template */
            .replace("$md-name$", metadata.name)
            .replace("$md-version$", metadata.version)
          )
      }
    }))
  )

/* ------------------------------------------------------------------------- */

/* Compute icon mappings */
const icons$ = defer(() => resolve("**/*.svg", {
  cwd: `${base}/templates/.icons`
}))
  .pipe(
    reduce((index, file) => index.set(
      file.replace(/\.svg$/, "").replace(/\//g, "-"),
      file
    ), new Map<string, string>())
  )

/* Compute emoji mappings (based on Twemoji) */
const emojis$ = defer(() => resolve("venv/**/twemoji_db.py"))
  .pipe(
    switchMap(file => read(file)),
    map(data => {
      const [, payload] = data.match(/^emoji = ({.*})$.alias/ms)!
      return Object.entries<TwemojiIcon>(JSON.parse(payload))
        .reduce((index, [name, { unicode }]) => index.set(
          name.replace(/(^:|:$)/g, ""),
          `${unicode}.svg`
        ), new Map<string, string>())
    })
  )

/* Build search index for icons and emojis */
const index$ = zip(icons$, emojis$)
  .pipe(
    map(([icons, emojis]) => {
      const cdn = "https://raw.githubusercontent.com"
      return {
        icons: {
          base: `${cdn}/squidfunk/mkdocs-material/master/material/templates/.icons/`,
          data: Object.fromEntries(icons)
        },
        emojis: {
          base: `${cdn}/twitter/twemoji/master/assets/svg/`,
          data: Object.fromEntries(emojis)
        }
      } as IconSearchIndex
    }),
    switchMap(data => write(
      `${base}/overrides/assets/javascripts/iconsearch_index.json`,
      JSON.stringify(data)
    ))
  )

/* ------------------------------------------------------------------------- */

/* Build schema */
const schema$ = merge(

  /* Compute fonts schema */
  defer(() => import("google-fonts-complete"))
    .pipe(
      map(({ default: fonts }) => Object.keys(fonts)),
      map(fonts => ({
        "$schema": "https://json-schema.org/draft-07/schema",
        "title": "Google Fonts",
        "markdownDescription": "https://fonts.google.com/",
        "type": "string",
        "oneOf": fonts.map(font => ({
          "title": font,
          "markdownDescription": `https://fonts.google.com/specimen/${
            font.replace(/\s+/g, "+")
          }`,
          "const": font,
        }))
      })),
      switchMap(data => write(
        "docs/schema/assets/fonts.json",
        JSON.stringify(data, undefined, 2)
      ))
    ),

  /* Compute icons schema */
  icons$
    .pipe(
      map(icons => [...icons.values()]),
      map(icons => ({
        "$schema": "https://json-schema.org/draft-07/schema",
        "title": "Icon",
        "markdownDescription": [
          "https://squidfunk.github.io/mkdocs-material",
          "reference/icons-emojis/#search"
        ].join("/"),
        "type": "string",
        "enum": icons.map(icon => icon.replace(".svg", ""))
      })),
      switchMap(data => write(
        "docs/schema/assets/icons.json",
        JSON.stringify(data, undefined, 2)
      ))
    )
)

/* Build overrides */
const overrides$ =
  process.argv.includes("--all")
    ? merge(index$, schema$)
    : EMPTY

/* ----------------------------------------------------------------------------
 * Program
 * ------------------------------------------------------------------------- */

/* Assemble pipeline */
const build$ =
  process.argv.includes("--dirty")
    ? merge(templates$, sources$)
    : concat(assets$, merge(templates$, sources$, overrides$))

/* Let's get rolling */
build$.subscribe()
