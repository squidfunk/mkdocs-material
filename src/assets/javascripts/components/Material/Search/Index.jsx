/*
 * Copyright (c) 2016 Martin Donath <martin.donath@squidfunk.com>
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

import lunr from "lunr"

/* ----------------------------------------------------------------------------
 * Definition
 * ------------------------------------------------------------------------- */

export default class Index {

  /**
   *                          // TODO: just copy+pasted
   *
   * @constructor
   */
  constructor() {
    const query = document.getElementById("query")
    // TODO: put this in search index class...
    // setTimeout(function() {

    // indexed percentage!

    fetch("/mkdocs/search_index.json") // TODO: prepend BASE URL!!!
      .then(response => {
        return response.json()
      })
      .then(data => {

        /* Create index */
        const index = lunr(function() {
          /* eslint-disable no-invalid-this, lines-around-comment */
          this.field("title", { boost: 10 })
          this.field("text")
          this.ref("location")
          /* eslint-enable no-invalid-this, lines-around-comment */
        })

        /* Index articles */
        const articles = {}
        data.docs.forEach((article, i) => {
          // console.log(`indexing...${i}`)
          const meta = document.querySelector(".md-search-result__meta")
          meta.innerHTML = `Indexing: ${(i + 1) / data.docs.length}%`

          // TODO: match for two whitespaces, then replace unnecessary whitespace after string
          article.text = article.text.replace(/\s(\.,\:)\s/gi, (string, g1) => {
            return `${g1} `
          })
          // TODO: window.baseUrl sucks...
          article.location = window.baseUrl + article.location
          articles[article.location] = article
          index.add(article)
        })

        /* Truncate a string after the given number of characters */
        const truncate = function(string, n) {
          let i = n
          if (string.length > i) {
            while (string[i] !== " " && --i > 0);
            return `${string.substring(0, i)}&hellip;`
          }
          return string
        }

        /* Register keyhandler to execute search on key up */
        const queryx = document.getElementById("query")
        queryx.addEventListener("keyup", () => {
          const container = document.querySelector(".md-search-result__list")
          while (container.firstChild)
            container.removeChild(container.firstChild)

          // /* Abort, if the query is empty */
          // var bar = document.querySelector('.bar.search');
          // if (!query.value.length) {
          //   while (meta.firstChild)
          //     meta.removeChild(meta.firstChild);
          //
          //   /* Restore state */
          //   bar.classList.remove('non-empty');
          //   return;
          // }

          /* Show reset button */
          // bar.classList.add('non-empty');

          /* Execute search */
          const results = index.search(query.value)
          results.forEach(result => {
            const article = articles[result.ref]

            container.appendChild(
              <li class="md-search-result__item">
                <a href={article.location} title={article.title}
                  class="md-search-result__link">
                  <article class="md-search-result__article">
                    <h1 class="md-search-result__title">
                      {article.title}
                    </h1>
                    <p class="md-search-result__teaser">
                      {truncate(article.text, 140)}
                    </p>
                  </article>
                </a>
              </li>
            )
          })

                /* Show number of search results */
                // var number = document.createElement('strong');

          const meta = document.querySelector(".md-search-result__meta")
          meta.innerHTML = `${results.length} search result${
              results.length !== 1
                ? "s"
                : ""}`

                /* Update number */
                // while (meta.firstChild)
                //   meta.removeChild(meta.firstChild);
                // meta.appendChild(number);
        })

              // setTimeout(function() {
              //   li.classList.remove('md-source__fact--hidden');
              // }, 100);

      })
      .catch(() => {
          // console.log("parsing failed", ex)
      })
  }
}
