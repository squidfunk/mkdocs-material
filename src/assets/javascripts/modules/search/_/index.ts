/*
 * Copyright (c) 2016-2019 Martin Donath <martin.donath@squidfunk.com>
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

import * as lunr from "lunr"
import { compress, decompress } from "lz-string"

import {
  SearchArticle,
  SearchDocumentMap,
  SearchSection,
  setupSearchDocumentMap
} from "../document"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Search index configuration
 */
export interface SearchIndexConfig {
  lang: string[]                       /* Search languages */
  separator: string                    /* Search separator */
}

/**
 * Search index document
 */
export interface SearchIndexDocument {
  location: string                     /* Document location */
  title: string                        /* Document title */
  text: string                         /* Document text */
}

/**
 * Search index
 *
 * This interfaces describes the format of the `search_index.json` file which
 * is automatically built by the MkDocs search plugin.
 */
export interface SearchIndex {
  config: SearchIndexConfig            /* Search index configuration */
  docs: SearchIndexDocument[]          /* Search index documents */
  index?: object | string              /* Pre-built or serialized index */
}

/* ------------------------------------------------------------------------- */

/**
 * Search result
 */
export interface SearchResult {
  article: SearchArticle               /* Relevant article */
  sections: SearchSection[]            /* Relevant sections */
}

/* ----------------------------------------------------------------------------
 * Function types
 * ------------------------------------------------------------------------- */

/**
 * Options
 */
interface Options {
  pipeline: {
    trimmer: boolean                   /* Add trimmer to pipeline */
    stopwords: boolean                 /* Add stopword filter to pipeline */
  }
}

/* ----------------------------------------------------------------------------
 * Class
 * ------------------------------------------------------------------------- */

export class Search {

  /**
   * Search document mapping
   *
   * A mapping of URLs (including hash fragments) to the actual articles and
   * sections of the documentation. The search document mapping must be created
   * regardless of whether the index was prebuilt or not, as lunr itself will
   * only store the actual index.
   */
  protected documents: SearchDocumentMap

  /**
   * The lunr search index
   */
  protected index: lunr.Index

  /**
   * Create a search index
   *
   * @param index - Search index
   * @param options - Options
   */
  public constructor({ docs, index }: SearchIndex, options: Options) {
    this.documents = setupSearchDocumentMap(docs)

    /* If no index was given, create it */
    if (typeof index === "undefined") {
      this.index = lunr(function() {

        /* Remove stemmer, as it cripples search experience */
        this.pipeline.reset()
        if (options.pipeline.trimmer)
          this.pipeline.add(lunr.trimmer)
        if (options.pipeline.stopwords)
          this.pipeline.add(lunr.stopWordFilter)

        /* Setup fields and reference */
        this.field("title", { boost: 10 })
        this.field("text")
        this.ref("location")

        /* Index documents */
        for (const doc of docs)
          this.add(doc)
      })

    /* Serialized and compressed index */
    } else if (typeof index === "string") {
      this.index = lunr.Index.load(JSON.parse(decompress(index)))

    /* Prebuilt index */
    } else {
      this.index = lunr.Index.load(index)
    }
  }

  /**
   * Search for matching documents
   *
   * The search index which MkDocs provides is divided up into articles, which
   * contain the whole content of the individual pages, and sections, which only
   * contain the contents of the subsections obtained by breaking the individual
   * pages up at `h1` ... `h6`. As there may be many sections on different pages
   * with indentical titles (for example within this very project, e.g. "Usage"
   * or "Installation"), they need to be put into the context of the containing
   * page. For this reason, section results are grouped within their respective
   * articles which are the top-level results that are returned.
   *
   * @param query - Query string
   *
   * @return Search results
   */
  public search(query: string): SearchResult[] {
    const groups = this.index.search(query)

      /* Group sections results by article */
      .reduce((results, result) => {
        const document = this.documents.get(result.ref)
        if (typeof document !== "undefined") {
          if ("article" in document) {
            const ref = document.article.location
            results.set(ref, [...results.get(ref) || [], result])
          } else {
            const ref = document.location
            results.set(ref, results.get(ref) || [])
          }
        }
        return results
      }, new Map<string, lunr.Index.Result[]>())

    /* Map groups to search documents */
    return [...groups].map(([ref, sections]) => ({
      article: this.documents.get(ref) as SearchArticle,
      sections: sections.map(section => {
        return this.documents.get(section.ref) as SearchSection
      })
    }))
  }

  /**
   * Serialize and compress the index
   *
   * @return Serialized and compressed index
   */
  public toString(): string {
    return compress(JSON.stringify(this.index))
  }
}
