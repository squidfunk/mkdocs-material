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

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Search configuration
 */
export interface SearchConfig {
  lang: string[]                       /* Search languages */
  separator: string                    /* Search separator */
  pipeline: SearchPipelineFn[]         /* Search pipeline */
}

/**
 * Search document
 */
export interface SearchDocument {
  location: string                     /* Document location */
  title: string                        /* Document title */
  text: string                         /* Document text */
  tags?: string[]                      /* Document tags */
  boost?: number                       /* Document boost */
  parent?: SearchDocument              /* Document parent */
}

/**
 * Search options
 */
export interface SearchOptions {
  suggest: boolean                     /* Search suggestions */
}

/* ------------------------------------------------------------------------- */

/**
 * Search index
 */
export interface SearchIndex {
  config: SearchConfig                 /* Search configuration */
  docs: SearchDocument[]               /* Search documents */
  options: SearchOptions               /* Search options */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Search pipeline function
 */
type SearchPipelineFn =
  | "trimmer"                          /* Trimmer */
  | "stopWordFilter"                   /* Stop word filter */
  | "stemmer"                          /* Stemmer */

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Create a search document map
 *
 * This function creates a mapping of URLs (including anchors) to the actual
 * articles and sections. It relies on the invariant that the search index is
 * ordered with the main article appearing before all sections with anchors.
 * If this is not the case, the logic music be changed.
 *
 * @param docs - Search documents
 *
 * @returns Search document map
 */
export function setupSearchDocumentMap(
  docs: SearchDocument[]
): Map<string, SearchDocument> {
  const map = new Map<string, SearchDocument>()
  for (const doc of docs) {
    const [path] = doc.location.split("#")

    /* Add document article */
    const article = map.get(path)
    if (typeof article === "undefined") {
      map.set(path, doc)

      /* Add document section */
    } else {
      map.set(doc.location, doc)
      doc.parent = article
    }
  }

  /* Return search document map */
  return map
}
