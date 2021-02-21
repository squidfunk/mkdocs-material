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

import {
  SearchDocument,
  SearchDocumentMap,
  setupSearchDocumentMap
} from "../document"
import {
  SearchHighlightFactoryFn,
  setupSearchHighlighter
} from "../highlighter"
import {
  SearchQueryTerms,
  getSearchQueryTerms,
  parseSearchQuery
} from "../query"

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

/* ------------------------------------------------------------------------- */

/**
 * Search index pipeline function
 */
export type SearchIndexPipelineFn =
  | "trimmer"                          /* Trimmer */
  | "stopWordFilter"                   /* Stop word filter */
  | "stemmer"                          /* Stemmer */

/**
 * Search index pipeline
 */
export type SearchIndexPipeline = SearchIndexPipelineFn[]

/* ------------------------------------------------------------------------- */

/**
 * Search index
 *
 * This interfaces describes the format of the `search_index.json` file which
 * is automatically built by the MkDocs search plugin.
 */
export interface SearchIndex {
  config: SearchIndexConfig            /* Search index configuration */
  docs: SearchIndexDocument[]          /* Search index documents */
  index?: object                       /* Prebuilt index */
  pipeline?: SearchIndexPipeline       /* Search index pipeline */
}

/* ------------------------------------------------------------------------- */

/**
 * Search metadata
 */
export interface SearchMetadata {
  score: number                        /* Score (relevance) */
  terms: SearchQueryTerms              /* Search query terms */
}

/* ------------------------------------------------------------------------- */

/**
 * Search result
 */
export type SearchResult = Array<SearchDocument & SearchMetadata>

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Compute the difference of two lists of strings
 *
 * @param a - 1st list of strings
 * @param b - 2nd list of strings
 *
 * @returns Difference
 */
function difference(a: string[], b: string[]): string[] {
  const [x, y] = [new Set(a), new Set(b)]
  return [
    ...new Set([...x].filter(value => !y.has(value)))
  ]
}

/* ----------------------------------------------------------------------------
 * Class
 * ------------------------------------------------------------------------- */

/**
 * Search index
 */
export class Search {

  /**
   * Search document mapping
   *
   * A mapping of URLs (including hash fragments) to the actual articles and
   * sections of the documentation. The search document mapping must be created
   * regardless of whether the index was prebuilt or not, as Lunr.js itself
   * only stores the actual index.
   */
  protected documents: SearchDocumentMap

  /**
   * Search highlight factory function
   */
  protected highlight: SearchHighlightFactoryFn

  /**
   * The underlying Lunr.js search index
   */
  protected index: lunr.Index

  /**
   * Create the search integration
   *
   * @param data - Search index
   */
  public constructor({ config, docs, pipeline, index }: SearchIndex) {
    this.documents = setupSearchDocumentMap(docs)
    this.highlight = setupSearchHighlighter(config)

    /* Set separator for tokenizer */
    lunr.tokenizer.separator = new RegExp(config.separator)

    /* If no index was given, create it */
    if (typeof index === "undefined") {
      this.index = lunr(function () {

        /* Set up multi-language support */
        if (config.lang.length === 1 && config.lang[0] !== "en") {
          this.use((lunr as any)[config.lang[0]])
        } else if (config.lang.length > 1) {
          this.use((lunr as any).multiLanguage(...config.lang))
        }

        /* Compute functions to be removed from the pipeline */
        const fns = difference([
          "trimmer", "stopWordFilter", "stemmer"
        ], pipeline!)

        /* Remove functions from the pipeline for registered languages */
        for (const lang of config.lang.map(language => (
          language === "en" ? lunr : (lunr as any)[language]
        ))) {
          for (const fn of fns) {
            this.pipeline.remove(lang[fn])
            this.searchPipeline.remove(lang[fn])
          }
        }

        /* Set up fields and reference */
        this.field("title", { boost: 1000 })
        this.field("text")
        this.ref("location")

        /* Index documents */
        for (const doc of docs)
          this.add(doc)
      })

    /* Handle prebuilt index */
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
   * with identical titles (for example within this very project, e.g. "Usage"
   * or "Installation"), they need to be put into the context of the containing
   * page. For this reason, section results are grouped within their respective
   * articles which are the top-level results that are returned.
   *
   * @param query - Query value
   *
   * @returns Search results
   */
  public search(query: string): SearchResult[] {
    if (query) {
      try {
        const highlight = this.highlight(query)

        /* Parse query to extract clauses for analysis */
        const clauses = parseSearchQuery(query)
          .filter(clause => (
            clause.presence !== lunr.Query.presence.PROHIBITED
          ))

        /* Perform search and post-process results */
        const groups = this.index.search(`${query}*`)

          /* Apply post-query boosts based on title and search query terms */
          .reduce<SearchResult>((results, { ref, score, matchData }) => {
            const document = this.documents.get(ref)
            if (typeof document !== "undefined") {
              const { location, title, text, parent } = document

              /* Compute and analyze search query terms */
              const terms = getSearchQueryTerms(
                clauses,
                Object.keys(matchData.metadata)
              )

              /* Highlight title and text and apply post-query boosts */
              const boost = +!parent + +Object.values(terms).every(t => t)
              results.push({
                location,
                title: highlight(title),
                text: highlight(text),
                score: score * (1 + boost),
                terms
              })
            }
            return results
          }, [])

          /* Sort search results again after applying boosts */
          .sort((a, b) => b.score - a.score)

          /* Group search results by page */
          .reduce((results, result) => {
            const document = this.documents.get(result.location)
            if (typeof document !== "undefined") {
              const ref = "parent" in document
                ? document.parent!.location
                : document.location
              results.set(ref, [...results.get(ref) || [], result])
            }
            return results
          }, new Map<string, SearchResult>())

        /* Expand grouped search results */
        return [...groups.values()]

      /* Log errors to console (for now) */
      } catch {
        console.warn(`Invalid query: ${query} – see https://bit.ly/2s3ChXG`)
      }
    }

    /* Return nothing in case of error or empty query */
    return []
  }
}
