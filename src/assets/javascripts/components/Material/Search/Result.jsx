function delay(callback, ms) {
  var timer = 0;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      callback.apply(context, args);
    }, ms || 0);
  };
}

/*
 * Copyright (c) 2016-2019 Martin Donath <martin.donath@squidfunk.com>
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

import escape from "escape-string-regexp";
// import lunr from "expose-loader?lunr!lunr";

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Escape a regular expression string
 *
 * Taken from the package `escape-string-regexp`
 *
 * @param regex - Regular expresison string
 *
 * @return
 */
const escapeRegex = regex => {
	return regex.replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&');
};

/**
 * Escape HTML strings
 *
 * Documentation may contain code JavaScript code snippets which would get
 * executed when inserted into the DOM as plain HTML.
 *
 * See https://github.com/squidfunk/mkdocs-material/issues/906
 *
 * @param {string} html - HTML string
 *
 * @return {string} Escaped HTML string
 */
const escapeHTML = html => {
  var text = document.createTextNode(html);
  var p = document.createElement("p");
  p.appendChild(text);
  return p.innerHTML;
};

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
  let i = n;
  if (string.length > i) {
    while (string[i] !== " " && --i > 0);
    return `${string.substring(0, i)}...`;
  }
  return string;
};

let lis;

/**
 * Return the meta tag value for the given key
 *
 * @param {string} key - Meta name
 *
 * @return {string} Meta content value
 */
const translate = key => {
  const meta = document.getElementsByName(`lang:${key}`)[0];
  if (!(meta instanceof HTMLMetaElement)) throw new ReferenceError();
  return meta.content;
};

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
    const ref = typeof el === "string" ? document.querySelector(el) : el;
    if (!(ref instanceof HTMLElement)) throw new ReferenceError();
    this.el_ = ref;

    /* Retrieve metadata and list element */
    const [meta, list] = Array.prototype.slice.call(this.el_.children);

    /* Set data, metadata and list elements */
    this.data_ = null;
    this.meta_ = meta;
    lis = list;
    this.state = {
      ev: ""
    };
    /* Load messages for metadata display */
    this.message_ = {
      placeholder: this.meta_.textContent,
      none: translate("search.result.none"),
      one: translate("search.result.one"),
      other: translate("search.result.other")
    };
    this.update = this.update.bind(this);
    this.triggerChange = this.triggerChange.bind(this);
  }

  /**
   * Update search results
   *
   * @param {Event} ev - Input or focus event
   */
  update(ev) {
    /* Initialize index, if this has not be done yet */
    if (ev.type === "focus" || ev.type === "keyup") {
      clearTimeout(this.timer);
      // console.log(this);
      this.state = { ev: ev };
      this.timer = setTimeout(this.triggerChange, 500);
    }
  }
  triggerChange(w) {
    // delay(e => {
    const { ev } = this.state;
    // console.log(this.state, ev);
    const target = ev.target;
    if (!(target instanceof HTMLInputElement)) throw new ReferenceError();

    /* Abort early, if index is not build or input hasn't changed */
    if (!this.index_ || target.value === this.value_)
      return

    /* Clear current list */
    while (lis.firstChild) lis.removeChild(lis.firstChild);

    /* Abort early, if search input is empty */
    this.value_ = target.value;
    let Q = this.value_;
    if (this.value_.length === 0) {
      this.meta_.textContent = this.message_.placeholder;
      return;
    }
    /* Perform search on index and group sections by document */
    let sta = [],
      Rsize;
    const result = fetch(`https://search.oi-wiki.org:8443/?s=${Q}`, {
      credentials: "same-origin"
    })
      .then(response => response.json())
      .then(result => {
        Rsize = result.length;
        // console.log(Rsize);
        result.forEach(item => {
          /* Render article */
          const article = (
            <li class="md-search-result__item">
              <a
                href={item.url}
                title={item.title}
                class="md-search-result__link"
                tabindex="-1"
              >
                <article
                  class="md-search-result__article
                        md-search-result__article--document"
                >
                  <h1 class="md-search-result__title">
                    {{
                      __html: item.title.replace(Q, `<em>${Q}</em>`)
                    }}
                  </h1>
                  {item.highlight ? (
                    <p class="md-search-result__teaser">
                      {{
                        __html: item.highlight
                      }}
                    </p>
                  ) : (
                    {}
                  )}
                </article>
              </a>
            </li>
          );

          /* Push articles and section renderers onto stack */
          sta.push(() => lis.appendChild(article));
          // console.log(lis);
        });
        // console.log(result);
        /* Reset stack and render results */

        /* Gradually add results as long as the height of the container grows */
        const container = this.el_.parentNode;
        if (!(container instanceof HTMLElement)) throw new ReferenceError();
        while (
          sta.length
          // &&
          // container.offsetHeight >= container.scrollHeight - 16
        )
          sta.shift()();

        /* Bind click handlers for anchors */
        const anchors = lis.querySelectorAll("[data-md-rel=anchor]");
        Array.prototype.forEach.call(anchors, anchor => {
          ["click", "keydown"].forEach(action => {
            anchor.addEventListener(action, ev2 => {
              if (action === "keydown" && ev2.keyCode !== 13) return;

              /* Close search */
              const toggle = document.querySelector("[data-md-toggle=search]");
              if (!(toggle instanceof HTMLInputElement))
                throw new ReferenceError();
              if (toggle.checked) {
                toggle.checked = false;
                toggle.dispatchEvent(new CustomEvent("change"));
              }

              /* Hack: prevent default, as the navigation needs to be delayed due
                   to the search body lock on mobile */
              ev2.preventDefault();
              setTimeout(() => {
                document.location.href = anchor.href;
              }, 100);
            });
          });
        });
        // console.log(result.length);
        // console.log(result);
        /* Update search metadata */
        switch (result.length) {
          case 0:
            this.meta_.textContent = this.message_.none;
            break;
          case 1:
            this.meta_.textContent = this.message_.one;
            break;
          default:
            this.meta_.textContent = this.message_.other.replace(
              "#",
              result.length
            );
        }
        return result;
      });

    // }, 500);
  }
}
