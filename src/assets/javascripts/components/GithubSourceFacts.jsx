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

/* ----------------------------------------------------------------------------
 * Github Source
 * ------------------------------------------------------------------------- */

export default
class GithubSourceFacts {

  /**
   * Constructor.
   *
   * @constructor
   * @param  {object} storage - Accessor to storage, eg. `window.sessionStorage`
   * @param  {string} repoUrl - URL to Github repository
   */
  constructor(storage, repoUrl) {
    this.storage = storage
    this.storageKey = "github-source-facts"
    this.apiRepoUrl = repoUrl.replace("github.com/", "api.github.com/repos/")
  }

  /**
   * Retrieve stars and fork counts for the repository before invoking
   * `GithubSourceFacts.paint`.
   *
   * @return {void}
   */
  initialize() {
    const facts = this.storage.getItem(this.storageKey)

    // Retrieve the facts, then invoke paint
    if (!facts) {
      fetch(this.apiRepoUrl)
        .then(response => {
          return response.json()
        })
        .then(data => {
          const repoFacts = {
            stars: data.stargazers_count,
            forks: data.forks_count
          }

          this.storage.setItem(this.storageKey, JSON.stringify(repoFacts))

          GithubSourceFacts.paint(repoFacts)
        })
        .catch(() => {
          // console.log("parsing failed", ex)
        })
    // Use the cached facts
    } else {
      GithubSourceFacts.paint(JSON.parse(facts))
    }
  }

  /**
   * Populates `.md-source__facts` with star and fork counts.
   *
   * @param  {integer} options.stars - Stars count for the repo
   * @param  {integer} options.forks - Fork count for the repo
   * @return {void}
   */
  static paint({ stars, forks }) {
    const lists = document.querySelectorAll(".md-source__facts"); // TODO 2x list in drawer and header

    // TODO: use ... of ...
    [].forEach.call(lists, list => {
      let li = (
        <li class="md-source__fact md-source__fact--hidden">
          {stars} Stars
        </li>
      )
      setTimeout(fact => {
        fact.classList.remove("md-source__fact--hidden")
      }, 100, li)
      list.appendChild(li)

      li = (
        <li class="md-source__fact md-source__fact--hidden">
          {forks} Forks
        </li>
      )
      setTimeout(fact => {
        fact.classList.remove("md-source__fact--hidden")
      }, 500, li)
      list.appendChild(li)
    })
  }
}
