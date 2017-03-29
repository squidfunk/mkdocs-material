/*
 * Copyright (c) 2016-2017 Martin Donath <martin.donath@squidfunk.com>
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

import escape from "escape-string-regexp"
import lunr from "lunr"

/* ----------------------------------------------------------------------------
 * Class
 * ------------------------------------------------------------------------- */

export default class Result {

  /**
   * Perform search and update results on keyboard events
   *
   * @constructor
   *
   * @property {HTMLElement} el_ - Search result container
   * @property {(Array<Object>|Function)} data_ - Raw document data
   * @property {Object} docs_ - Indexed documents
   * @property {HTMLElement} meta_ - Search meta information
   * @property {HTMLElement} list_ - Search result list
   * @property {Object} message_ - Search result messages
   * @property {Object} index_ - Search index
   * @property {string} value_ - Last input value
   *
   * @param {(string|HTMLElement)} el - Selector or HTML element
   * @param {(Array<Object>|Function)} data - Function providing data or array
   */
  constructor(el, data) {
    const ref = (typeof el === "string")
      ? document.querySelector(el)
      : el
    if (!(ref instanceof HTMLElement))
      throw new ReferenceError
    this.el_ = ref

    /* Retrieve metadata and list element */
    const [meta, list] = Array.prototype.slice.call(this.el_.children)

    /* Set data, metadata and list elements */
    this.data_ = data
    this.meta_ = meta
    this.list_ = list

    /* Load messages for metadata display */
    this.message_ = {
      placeholder: this.meta_.textContent,
      none: this.meta_.dataset.mdLangResultNone,
      one: this.meta_.dataset.mdLangResultOne,
      other: this.meta_.dataset.mdLangResultOther
    }
  }

  /**
   * Truncate a string after the given number of character
   *
   * This is not a reasonable approach, since the summaries kind of suck. It
   * would be better to create something more intelligent, highlighting the
   * search occurrences and making a better summary out of it.
   *
   * @param {string} string - String to be truncated
   * @param {number} n - Number of characters
   * @return {string} Truncated string
   */
  truncate_(string, n) {
    let i = n
    if (string.length > i) {
      while (string[i] !== " " && --i > 0);
      return `${string.substring(0, i)}...`
    }
    return string
  }

  /**
   * Update search results
   *
   * @param {Event} ev - Input or focus event
   */
  update(ev) {

    /* Initialize index, if this has not be done yet */
    if (ev.type === "focus" && !this.index_) {

      /* Initialize index */
      const init = data => {
        this.index_ = lunr(function() {
          /* eslint-disable no-invalid-this, lines-around-comment */
          this.field("title", { boost: 10 })
          this.field("text")
          this.ref("location")
          /* eslint-enable no-invalid-this, lines-around-comment */
        })

        /* Preprocess and index sections and documents */
        this.docs_ = data.reduce((docs, doc) => {
          const [path, hash] = doc.location.split("#")

          /* Associate section with parent document */
          if (hash) {
            doc.parent = docs.get(path)

            /* Override page title with document title if first section */
            if (doc.parent && !doc.parent.done) {
              doc.parent.title = doc.title
              doc.parent.text  = doc.text
              doc.parent.done  = true
            }
          }

          /* Some cleanup on the text */
          doc.text = doc.text
            .replace(/\n/g, " ")               /* Remove newlines */
            .replace(/\s+/g, " ")              /* Compact whitespace */
            .replace(/\s+([,.:;!?])/g,         /* Correct punctuation */
              (_, char) => char)

          /* Index sections and documents, but skip top-level headline */
          if (!doc.parent || doc.parent.title !== doc.title) {
            this.index_.add(doc)
            docs.set(doc.location, doc)
          }
          return docs
        }, new Map)
      }

      /* Initialize index after short timeout to account for transition */
      setTimeout(() => {
        return typeof this.data_ === "function"
          ? this.data_().then(init)
          : init(this.data_)
      }, 250)

    /* Execute search on new input event */
    } else if (ev.type === "focus" || ev.type === "keyup") {
      const target = ev.target
      if (!(target instanceof HTMLInputElement))
        throw new ReferenceError

      /* Abort early, if index is not build or input hasn't changed */
      if (!this.index_ || target.value === this.value_)
        return

      /* Clear current list */
      while (this.list_.firstChild)
        this.list_.removeChild(this.list_.firstChild)

      /* Abort early, if search input is empty */
      this.value_ = target.value
      if (this.value_.length === 0) {
        this.meta_.textContent = this.message_.placeholder
        return
      }

      /* Perform search on index and group sections by document */
      const result = this.index_
        .search(this.value_)
        .reduce((items, item) => {
          const doc = this.docs_.get(item.ref)
          if (doc.parent) {
            const ref = doc.parent.location
            items.set(ref, (items.get(ref) || []).concat(item))
          }
          return items
        }, new Map)

      /* Assemble highlight regex from query string */
      const match = new RegExp(
        `\\b(${escape(this.value_.trim().replace(" ", "|"))})`, "img")
      const highlight = string => `<em>${string}</em>`

      /* Render results */
      result.forEach((items, ref) => {
        const doc = this.docs_.get(ref)

        /* Append search result */
        this.list_.appendChild(
          <li class="md-search-result__item">
            <a href={doc.location} title={doc.title}
                class="md-search-result__link">
              <article class="md-search-result__article
                    md-search-result__article--document">
                <h1 class="md-search-result__title">
                  {{ __html: doc.title.replace(match, highlight) }}
                </h1>
                {doc.text.length ?
                  <p class="md-search-result__teaser">
                    {{ __html: doc.text.replace(match, highlight) }}
                  </p> : {}}
              </article>
            </a>
            {items.map(item => {
              const section = this.docs_.get(item.ref)
              return (
                <a href={section.location} title={section.title}
                    class="md-search-result__link" data-md-rel="anchor">
                  <article class="md-search-result__article">
                    <h1 class="md-search-result__title">
                      {{ __html: section.title.replace(match, highlight) }}
                    </h1>
                    {section.text.length ?
                      <p class="md-search-result__teaser">
                        {{ __html: this.truncate_(
                            section.text.replace(match, highlight), 400)
                        }}
                      </p> : {}}
                  </article>
                </a>
              )
            })}
          </li>
        )
      })

      /* Bind click handlers for anchors */
      const anchors = this.list_.querySelectorAll("[data-md-rel=anchor]")
      Array.prototype.forEach.call(anchors, anchor => {
        anchor.addEventListener("click", ev2 => {
          const toggle = document.querySelector("[data-md-toggle=search]")
          if (!(toggle instanceof HTMLInputElement))
            throw new ReferenceError
          if (toggle.checked) {
            toggle.checked = false
            toggle.dispatchEvent(new CustomEvent("change"))
          }

          /* Hack: prevent default, as the navigation needs to be delayed due
             to the search body lock on mobile */
          ev2.preventDefault()
          setTimeout(() => {
            document.location.href = anchor.href
          }, 100)
        })
      })

      /* Update search metadata */
      switch (result.size) {
        case 0:
          this.meta_.textContent = this.message_.none
          break
        case 1:
          this.meta_.textContent = this.message_.one
          break
        default:
          this.meta_.textContent =
            this.message_.other.replace("#", result.size)
      }
    }
  }
}
