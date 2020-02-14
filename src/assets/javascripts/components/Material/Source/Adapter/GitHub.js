/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

import Abstract from "./Abstract"

/* ----------------------------------------------------------------------------
 * Class
 * ------------------------------------------------------------------------- */

export default class GitHub extends Abstract {

  /**
   * Retrieve repository information from GitHub
   *
   * @constructor
   *
   * @property {string} name_ - Name of the repository
   *
   * @param {(string|HTMLAnchorElement)} el - Selector or HTML element
   */
  constructor(el) {
    super(el)

    /* Extract user (and repository name) from URL, as we have to query for all
       repositories, to omit 404 errors for private repositories */
    const matches = /^.+github\.com\/([^/]+)\/?([^/]+)?.*$/
      .exec(this.base_)
    if (matches && matches.length === 3) {
      const [, user, name] = matches

      /* Initialize base URL and repository name */
      this.base_ = `https://api.github.com/users/${user}/repos`
      this.name_ = name
    }
  }

  /**
   * Fetch relevant repository information from GitHub
   *
   * @return {Promise<Array<string>>} Promise returning an array of facts
   */
  fetch_() {
    const paginate = (page = 0) => (
      fetch(`${this.base_}?per_page=100&sort=updated&page=${page}`)
        .then(response => response.json())
        .then(data => {
          if (!(data instanceof Array))
            return []

          /* Display number of stars and forks, if repository is given */
          if (this.name_) {
            const repo = data.find(item => item.name === this.name_)
            if (!repo && data.length === 30)
              return paginate(page + 1)

            /* If we found a repo, extract the facts */
            return repo
              ? [
                `${this.format_(repo.stargazers_count)} Stars`,
                `${this.format_(repo.forks_count)} Forks`
              ]
              : []

          /* Display number of repositories, otherwise */
          } else {
            return [
              `${data.length} Repositories`
            ]
          }
        })
    )

    /* Paginate through repos */
    return paginate()
  }
}
