import { strict as assert } from "assert"

import { Sitemap } from "../sitemap"

import { selectedVersionCorrespondingURL } from "./correspondingPage"

describe("Version switcher tests", () => {
  // These examples are obtained by pausing the JS debugger in various situation and
  // observing the local variables.
  describe("Normal deployed to GitHub situation", () => {
    const sitemapURLsV1 = [
      "https://test.github.io/project/0.1/",
      "https://test.github.io/project/0.1/bar/",
      "https://test.github.io/project/0.1/foo/"
    ]

    it("returns a URL when the selected version has the current page", () => {
      assert.equal(
        selectedVersionCorrespondingURL({
          selectedVersionSitemap: sitemapFromURLList(sitemapURLsV1),
          selectedVersionBaseURL: new URL(
            "https://test.github.io/project/0.1/",
          ),
          currentLocation: new URL("https://test.github.io/project/0.2/bar/#heading?param=some"),
          currentBaseURL: "https://test.github.io/project/0.2/"
        })?.href,
        "https://test.github.io/project/0.1/bar/#heading?param=some",
      )
    })
    it("returns nothing when the selected version does not have the current page", () => {
      assert.equal(
        selectedVersionCorrespondingURL({
          selectedVersionSitemap: sitemapFromURLList(sitemapURLsV1),
          selectedVersionBaseURL: new URL(
            "https://test.github.io/project/0.1/",
          ),
          currentLocation: new URL(
            "https://test.github.io/project/0.2/notinv1/#heading?param=some",
          ),
          currentBaseURL: "https://test.github.io/project/0.2/"
        }),
        undefined,
      )
    })
  })

  describe("Deployed to GitHub with canonical_version='latest'", () => {
    // https://github.com/squidfunk/mkdocs-material/issues/7226 If the target
    // version has `canonical_version='latest'`, then the sitemap looks as though
    // it was for the "latest" version
    const sitemapURLsLatestVersion = [
      "https://test.github.io/project/latest/",
      "https://test.github.io/project/latest/bar/",
      "https://test.github.io/project/latest/foo/"
    ]

    it("does not (yet, TODO #7226) return a URL when the selected version has the current page", () => {
      assert.equal(
        selectedVersionCorrespondingURL({
          selectedVersionSitemap: sitemapFromURLList(sitemapURLsLatestVersion),
          selectedVersionBaseURL: new URL(
            "https://test.github.io/project/0.1/",
          ),
          currentLocation: new URL("https://test.github.io/project/0.2/bar/#heading?param=some"),
          currentBaseURL: "https://test.github.io/project/0.2/"
        })?.href,
        undefined,
      )
    })
    it("returns nothing when the selected version does not have the current page", () => {
      assert.equal(
        selectedVersionCorrespondingURL({
          selectedVersionSitemap: sitemapFromURLList(sitemapURLsLatestVersion),
          selectedVersionBaseURL: new URL(
            "https://test.github.io/project/0.1/",
          ),
          currentLocation: new URL(
            "https://test.github.io/project/0.2/notinv1/#heading?param=some",
          ),
          currentBaseURL: "https://test.github.io/project/0.2/"
        }),
        undefined,
      )
    })
  })

  describe("Served from localhost with `mike serve`", () => {
    // TODO: test how fetchSitemap converts the actual sitemap into this
    const sitemapURLsLocalhost = [
      "https://localhost/project/0.1/",
      "https://localhost/project/0.1/bar/",
      "https://localhost/project/0.1/foo/"
    ]

    it("does not (yet, TODO) return a URL when the selected version has the current page", () => {
      assert.equal(
        selectedVersionCorrespondingURL({
          selectedVersionSitemap: sitemapFromURLList(sitemapURLsLocalhost),
          selectedVersionBaseURL: new URL("https://localhost:8000/0.1/"),
          currentLocation: new URL("https://localhost:8000/0.2/bar/#heading?param=some"),
          currentBaseURL: "https://localhost:8000/0.2/"
        })?.href,
        undefined,
      )
    })
    it("returns nothing when the selected version does not have the current page", () => {
      assert.equal(
        selectedVersionCorrespondingURL({
          selectedVersionSitemap: sitemapFromURLList(sitemapURLsLocalhost),
          selectedVersionBaseURL: new URL("https://localhost:8000/0.1/"),
          currentLocation: new URL("https://localhost:8000/0.2/notinv1/#heading?param=some"),
          currentBaseURL: "https://localhost:8000/0.2/"
        }),
        undefined,
      )
    })
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
