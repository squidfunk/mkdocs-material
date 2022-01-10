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

import escapeHTML from "escape-html"

import { SearchIndexDocument } from "../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Search document
 */
export interface SearchDocument extends SearchIndexDocument {
  parent?: SearchIndexDocument         /* Parent article */
}

/* ------------------------------------------------------------------------- */

/**
 * Search document mapping
 */
export type SearchDocumentMap = Map<string, SearchDocument>

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Create a search document mapping
 *
 * @param docs - Search index documents
 *
 * @returns Search document map
 */
export function setupSearchDocumentMap(
  docs: SearchIndexDocument[]
): SearchDocumentMap {
  const documents = new Map<string, SearchDocument>()
  const parents   = new Set<SearchDocument>()
  for (const doc of docs) {
    const [path, hash] = doc.location.split("#")

    /* Extract location and title */
    const location = doc.location
    const title    = doc.title

    /* Escape and cleanup text */
    const text = escapeHTML(doc.text)
      .replace(/\s+(?=[,.:;!?])/g, "")
      .replace(/\s+/g, " ")

    /* Handle section */
    if (hash) {
      const parent = documents.get(path)!

      /* Ignore first section, override article */
      if (!parents.has(parent)) {
        parent.title = doc.title
        parent.text  = text

        /* Remember that we processed the article */
        parents.add(parent)

      /* Add subsequent section */
      } else {
        documents.set(location, {
          location,
          title,
          text,
          parent
        })
      }

    /* Add article */
    } else {
      documents.set(location, {
        location,
        title,
        text
      })
    }
  }
  return documents
}
