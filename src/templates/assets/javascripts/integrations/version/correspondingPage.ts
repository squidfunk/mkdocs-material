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
  const result = currentLocation.href.replace(
    currentBaseURL,
    selectedVersionBaseURL.href,
  )
  return selectedVersionSitemap.has(result.split("#")[0])
    ? new URL(result)
    : undefined
}
