// This is a separate file so that `mocha` can load it without needing
// DOM shims.

import { Sitemap } from "../sitemap"

type CorrespondingURLParams = {
  selectedVersionSitemap: Sitemap
  selectedVersionBaseURL: URL
  currentLocation: URL
  currentBaseURL: string
}

/**
 * Choose a URL to navigate to when the user chooses a version in the version
 * selector.
 *
 * @param selectedVersionSitemap - as obtained by fetchSitemap from `${selectedVersionBaseURL}/sitemap.xml`
 * @param selectedVersionBaseURL - usually `${currentBaseURL}/../selectedVersion`
 * @param currentLocation - current web browser location
 * @param currentBaseURL - as obtained from `config.base`
 * @returns the URL to navigate to or null if we can't be sure that the
 * corresponding page to the current page exists in the selected version
 */
export function selectedVersionCorrespondingURL(
  {selectedVersionSitemap,
    selectedVersionBaseURL,
    currentLocation,
    currentBaseURL}: CorrespondingURLParams
): URL | undefined {
  const current_path = (new URL(currentBaseURL)).pathname
  const currentRelativePath = stripPrefix(currentLocation.pathname, current_path)
  if (currentRelativePath === undefined) {
    return
  }
  const sitemapCommonPrefix = shortestCommonPrefix(selectedVersionSitemap.keys())
  if (!selectedVersionSitemap.has(sitemapCommonPrefix)) {
    // We could also check that `commonSitemapPrefix` ends in the canonical version,
    // similarly to https://github.com/squidfunk/mkdocs-material/pull/7227. However,
    // I don't believe that Mike/MkDocs ever generate sitemaps where it would matter
    return
  }

  const potentialSitemapURL = new URL(currentRelativePath, sitemapCommonPrefix)
  if (!selectedVersionSitemap.has(potentialSitemapURL.href)) {
    return
  }

  const result = new URL(currentRelativePath, selectedVersionBaseURL)
  result.hash = currentLocation.hash
  result.search = currentLocation.search
  return result
}

// Basic string manipulation

/**
 *
 * @param s - string
 * @param prefix - prefix to strip
 *
 * @returns either the string with the prefix stripped or undefined if the
 * string did not begin with the prefix.
 */
export function stripPrefix(s: string, prefix: string): string | undefined {
  if (s.startsWith(prefix)) {
    return s.slice(prefix.length)
  }
  return undefined
}

/**
 *
 * @param s1 - first string
 * @param s2 - second string
 *
 * @returns - the length of the longest common prefix of the two strings.
 */
function commonPrefixLen(s1: string, s2: string): number {
  const max = Math.min(s1.length, s2.length)
  let result
  for (result = 0; result < max; ++result) {
    if (s1[result] !== s2[result]) {
      break
    }
  }
  return result
}

/**
 *
 * @param strs - an iterable of strings
 *
 * @returns the longest common prefix of all the strings
 */
export function shortestCommonPrefix(strs: Iterable<string>): string {
  let result  // Undefined if no iterations happened
  for (const s of strs) {
    if (result === undefined) {
      result = s
    } else {
      result = result.slice(0, commonPrefixLen(result, s))
    }
  }
  return result ?? ""
}
