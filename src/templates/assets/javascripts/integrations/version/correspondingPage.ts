import { Sitemap } from "../sitemap"

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
  const result = currentLocation.href.replace(
    currentBaseURL,
    selectedVersionBaseURL.href,
  )
  return selectedVersionSitemap.has(result.split("#")[0])
    ? new URL(result)
    : undefined
}
