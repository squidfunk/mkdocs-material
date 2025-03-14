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
  identity,
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

/**
 * Return a path with POSIX style separators
 *
 * The default function assumes UNIX system, so it just returns the path.
 *
 * @param p - string path
 * @returns String path
 */
let assurePosixSep = function (p: string): string {
  return p
};

/**
 * Return a path with POSIX style separators
 *
 * The Windows variant of this function replaces the separator with regex.
 *
 * @param p - string path
 * @returns String path
 */
function assurePosixSepWin(p: string): string {
  return p.replace(winSepRegex, path.posix.sep)
};

const winSepRegex = new RegExp(`\\${path.win32.sep}`, "g");

if (path.sep === path.win32.sep) {
  assurePosixSep = assurePosixSepWin;
}

/**
 * Compare two path strings to decide on the order
 *
 * On Windows the default order of paths containing `_` from the resolve function
 * is different than on macOS. This function restores the order to the usual.
 * Implementation adapted based on https://t.ly/VJp78
 *
 * Note: The paths should have no extension like .svg, just the name. Otherwise
 * it won't check the compare.startsWith(reference) properly.
 *
 * @param reference Left string to compare
 * @param compare Right string to compare against
 * @returns Number for the sort function to define the order
 */
function sortOrderForWindows(reference: string, compare: string): number {
  reference = reference.toLowerCase();
  compare = compare.toLowerCase();

  const length = Math.min(reference.length, compare.length);

  for (let i = 0; i < length; i++) {
    const leftChar = reference[i];
    const rightChar = compare[i];

    if (leftChar !== rightChar)
      return customAlphabet.indexOf(leftChar) - customAlphabet.indexOf(rightChar);
  }

  if (reference.length !== compare.length) {
    if (compare.startsWith(reference) && compare[reference.length] === "-")
      return 1;
    return reference.length - compare.length;
  }

  return 0;
}

const customAlphabet: string = "_,-./0123456789abcdefghijklmnopqrstuvwxyz";

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
      of(ext(file, ".css").replace(new RegExp(`(overrides|templates)\\${path.sep}`), "")),
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
      of(ext(file, ".js").replace(new RegExp(`(overrides|templates)\\${path.sep}`), "")),
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
        next.set(assurePosixSep(key), assurePosixSep(value.replace(
          new RegExp(`${base}\\/(overrides|templates)\\${path.sep}`),
          ""
        )))
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
      file.replace(/\.svg$/, "").replace(new RegExp(`\\${path.sep}`, "g"), "-"),
      assurePosixSep(file)
    ), new Map<string, string>()),
    // The icons are stored in the index file, and the output needs to be OS
    // agnostic. Some icons contain the `_` character, which has different order
    // in the glob output on Windows.
    (path.sep === path.win32.sep) ? map(icons => new Map(
      [...icons].sort((a, b) => sortOrderForWindows(a[0], b[0]))
    )) : identity
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
          base: `${cdn}/jdecked/twemoji/master/assets/svg/`,
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
        "enum": icons.map(icon => assurePosixSep(icon.replace(".svg", "")))
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
