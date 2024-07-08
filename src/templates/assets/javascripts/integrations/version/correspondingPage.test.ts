import { strict as assert } from "assert"

import { Sitemap } from "../sitemap"

import { selectedVersionCorrespondingURL } from "./correspondingPage"

const sitemapURLsV1 = [
  "https://test.github.io/project/0.1/",
  "https://test.github.io/project/0.1/bar/",
  "https://test.github.io/project/0.1/foo/"
]

describe("Version switcher tests", () => {
  it("selectedVersionCorrespondingURL test", () => {
    assert.equal(
      selectedVersionCorrespondingURL({
        selectedVersionSitemap: sitemapFromURLList(sitemapURLsV1),
        selectedVersionBaseURL: new URL("https://test.github.io/project/0.1/"),
        currentLocation: new URL("https://test.github.io/project/latest/bar/#heading?param=some"),
        currentBaseURL: "https://test.github.io/project/latest/"
      })?.href,
      "https://test.github.io/project/0.1/bar/#heading?param=some",
    )
    assert.equal(
      selectedVersionCorrespondingURL({
        selectedVersionSitemap: sitemapFromURLList(sitemapURLsV1),
        selectedVersionBaseURL: new URL("https://test.github.io/project/0.1/"),
        currentLocation: new URL("https://test.github.io/project/latest/notinv1/"),
        currentBaseURL: "https://test.github.io/project/latest/"
      }),
      undefined,
    )
  })
})

/** Test helper to generate a Sitemap
 *
 * AFAICT, all sitemaps will have this form as they are generated from
 * https://github.com/mkdocs/mkdocs/blob/ddb588ac7ef26ea7da458acc9706af797eaf2e9d/mkdocs/templates/sitemap.xml
 *
 * @param urls - a list of URLs
 *
 * @returns the Sitemap that would be returned by `fetchSitemap` from the
 * Sitemap that MkDocs would generate for this list of URLs.
 */
function sitemapFromURLList(urls: string[]): Sitemap {
  return new Map(urls.map(url => [url, [new URL(url)]]))
}
