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

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Search query clause
 */
export interface SearchQueryClause {
  presence: lunr.Query.presence        /* Clause presence */
  term: string                         /* Clause term */
}

/* ------------------------------------------------------------------------- */

/**
 * Search query terms
 */
export type SearchQueryTerms = Record<string, boolean>

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Parse a search query for analysis
 *
 * @param value - Query value
 *
 * @returns Search query clauses
 */
export function parseSearchQuery(
  value: string
): SearchQueryClause[] {
  const query  = new (lunr as any).Query(["title", "text"])
  const parser = new (lunr as any).QueryParser(value, query)

  /* Parse and return query clauses */
  parser.parse()
  return query.clauses
}

/**
 * Analyze the search query clauses in regard to the search terms found
 *
 * @param query - Search query clauses
 * @param terms - Search terms
 *
 * @returns Search query terms
 */
export function getSearchQueryTerms(
  query: SearchQueryClause[], terms: string[]
): SearchQueryTerms {
  const clauses = new Set<SearchQueryClause>(query)

  /* Match query clauses against terms */
  const result: SearchQueryTerms = {}
  for (let t = 0; t < terms.length; t++)
    for (const clause of clauses)
      if (terms[t].startsWith(clause.term)) {
        result[clause.term] = true
        clauses.delete(clause)
      }

  /* Annotate unmatched non-stopword query clauses */
  for (const clause of clauses)
    if (lunr.stopWordFilter?.(clause.term as any))
      result[clause.term] = false

  /* Return query terms */
  return result
}
