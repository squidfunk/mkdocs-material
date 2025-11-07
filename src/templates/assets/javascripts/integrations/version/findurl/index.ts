import { Sitemap } from "../../sitemap"

/** See docstring for `selectedVersionCorrespondingURL` for the meaning of these fields. */
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
 * The parameters in `params` are named as follows, in order to make it clearer
 * which parameter means what when invoking the function:
 *
 *  - selectedVersionSitemap: Sitemap - as obtained by fetchSitemap from `${selectedVersionBaseURL}/sitemap.xml`
 *
 *  - selectedVersionBaseURL: URL - usually `${currentBaseURL}/../selectedVersion`
 *
 *  - currentLocation: URL - current web browser location
 *
 *  - currentBaseURL: string - as obtained from `config.base`
 *
 * @param params - arguments with the meanings explained above.
 * @returns the URL to navigate to or null if we can't be sure that the
 * corresponding page to the current page exists in the selected version
 */
export function selectedVersionCorrespondingURL(
  params: CorrespondingURLParams
): URL | undefined {
  const {selectedVersionSitemap,
    selectedVersionBaseURL,
    currentLocation,
    currentBaseURL} = params
  const current_path = safeURLParse(currentBaseURL)?.pathname
  if (current_path === undefined) {
    return
  }
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

  const potentialSitemapURL = safeURLParse(currentRelativePath, sitemapCommonPrefix)
  if (!potentialSitemapURL || !selectedVersionSitemap.has(potentialSitemapURL.href)) {
    return
  }

  const result = safeURLParse(currentRelativePath, selectedVersionBaseURL)
  if (!result) {
    return
  }
  result.hash = currentLocation.hash
  result.search = currentLocation.search
  return result
}

/**
 * A version of `new URL` that never throws. A polyfill for URL.parse() which is
 * not yet ubuquitous.
 *
 * @param url - passed to `new URL` constructor
 * @param base - passed to `new URL` constructor
 *
 * @returns `new URL(url, base)` or undefined if the URL is invalid.
 */
function safeURLParse(url: string|URL, base?: string|URL): URL | undefined {
  try {
    return new URL(url, base)
  } catch {
    return
  }
}

// Basic string manipulation

/** Strip a given prefix from a function
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

/** Find the length of the longest common prefix of two strings
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

/** Find the longest common prefix of any number of strings
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
