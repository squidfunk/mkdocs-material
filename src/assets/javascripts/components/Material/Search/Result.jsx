/*
 * Copyright (c) 2016-2018 Martin Donath <martin.donath@squidfunk.com>
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
import lunr from "expose-loader?lunr!lunr"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

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
const truncate = (string, n) => {
  let i = n
  if (string.length > i) {
    while (string[i] !== " " && --i > 0);
    return `${string.substring(0, i)}...`
  }
  return string
}

/**
 * Return the meta tag value for the given key
 *
 * @param {string} key - Meta name
 *
 * @return {string} Meta content value
 */
const translate = key => {
  const meta = document.getElementsByName(`lang:${key}`)[0]
  if (!(meta instanceof HTMLMetaElement))
    throw new ReferenceError
  return meta.content
}

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
   * @property {Array<string>} lang_ - Search languages
   * @property {Object} message_ - Search result messages
   * @property {Object} index_ - Search index
   * @property {Array<Function>} stack_ - Search result stack
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
      none: translate("search.result.none"),
      one: translate("search.result.one"),
      other: translate("search.result.other")
    }

    /* Override tokenizer separator, if given */
    const tokenizer = translate("search.tokenizer")
    if (tokenizer.length)
      lunr.tokenizer.separator = tokenizer

    /* Load search languages */
    this.lang_ = translate("search.language").split(",")
      .filter(Boolean)
      .map(lang => lang.trim())
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
          if (!doc.parent || doc.parent.title !== doc.title)
            docs.set(doc.location, doc)
          return docs
        }, new Map)

        /* eslint-disable no-invalid-this */
        const docs = this.docs_,
              lang = this.lang_

        /* Create stack and index */
        this.stack_ = []
        this.index_ = lunr(function() {
          const filters = {
            "search.pipeline.trimmer": lunr.trimmer,
            "search.pipeline.stopwords": lunr.stopWordFilter
          }

          /* Disable stop words filter and trimmer, if desired */
          const pipeline = Object.keys(filters).reduce((result, name) => {
            if (!translate(name).match(/^false$/i))
              result.push(filters[name])
            return result
          }, [])

          /* Remove stemmer, as it cripples search experience */
          this.pipeline.reset()
          if (pipeline)
            this.pipeline.add(...pipeline)

          /* Set up alternate search languages */
          if (lang.length === 1 && lang[0] !== "en" && lunr[lang[0]]) {
            this.use(lunr[lang[0]])
          } else if (lang.length > 1) {
            this.use(lunr.multiLanguage(...lang))
          }

          /* Index fields */
          this.field("title", { boost: 10 })
          this.field("text")
          this.ref("location")

          /* Index documents */
          docs.forEach(doc => this.add(doc))
        })

        /* Register event handler for lazy rendering */
        const container = this.el_.parentNode
        if (!(container instanceof HTMLElement))
          throw new ReferenceError
        container.addEventListener("scroll", () => {
          while (this.stack_.length && container.scrollTop +
              container.offsetHeight >= container.scrollHeight - 16)
            this.stack_.splice(0, 10).forEach(render => render())
        })
      }
      /* eslint-enable no-invalid-this */

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

        /* Append trailing wildcard to all terms for prefix querying */
        .query(query => {
          this.value_.toLowerCase().split(" ")
            .filter(Boolean)
            .forEach(term => {
              query.term(term, { wildcard: lunr.Query.wildcard.TRAILING })
            })
        })

        /* Process query results */
        .reduce((items, item) => {
          const doc = this.docs_.get(item.ref)
          if (doc.parent) {
            const ref = doc.parent.location
            items.set(ref, (items.get(ref) || []).concat(item))
          } else {
            const ref = doc.location
            items.set(ref, (items.get(ref) || []))
          }
          return items
        }, new Map)

      /* Assemble regular expressions for matching */
      const query = escape(this.value_.trim()).replace(
        new RegExp(lunr.tokenizer.separator, "img"), "|")
      const match =
        new RegExp(`(^|${lunr.tokenizer.separator})(${query})`, "img")
      const highlight = (_, separator, token) =>
        `${separator}<em>${token}</em>`

      /* Reset stack and render results */
      this.stack_ = []
      result.forEach((items, ref) => {
        const doc = this.docs_.get(ref)

        /* Render article */
        const article = (
          <li class="md-search-result__item">
            <a href={doc.location} title={doc.title}
              class="md-search-result__link" tabindex="-1">
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
          </li>
        )

        /* Render sections for article */
        const sections = items.map(item => {
          return () => {
            const section = this.docs_.get(item.ref)
            article.appendChild(
              <a href={section.location} title={section.title}
                class="md-search-result__link" data-md-rel="anchor"
                tabindex="-1">
                <article class="md-search-result__article">
                  <h1 class="md-search-result__title">
                    {{ __html: section.title.replace(match, highlight) }}
                  </h1>
                  {section.text.length ?
                    <p class="md-search-result__teaser">
                      {{ __html: truncate(
                        section.text.replace(match, highlight), 400)
                      }}
                    </p> : {}}
                </article>
              </a>
            )
          }
        })

        /* Push articles and section renderers onto stack */
        this.stack_.push(() => this.list_.appendChild(article), ...sections)
      })

      /* Gradually add results as long as the height of the container grows */
      const container = this.el_.parentNode
      if (!(container instanceof HTMLElement))
        throw new ReferenceError
      while (this.stack_.length &&
          container.offsetHeight >= container.scrollHeight - 16)
        (this.stack_.shift())()

      /* Bind click handlers for anchors */
      const anchors = this.list_.querySelectorAll("[data-md-rel=anchor]")
      Array.prototype.forEach.call(anchors, anchor => {
        ["click", "keydown"].forEach(action => {
          anchor.addEventListener(action, ev2 => {
            if (action === "keydown" && ev2.keyCode !== 13)
              return

            /* Close search */
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
