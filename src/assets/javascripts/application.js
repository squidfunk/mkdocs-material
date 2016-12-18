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

import FastClick from "fastclick"
import Material from "./components/Material"

/* ----------------------------------------------------------------------------
 * Application
 * ------------------------------------------------------------------------- */

export default class Application {

  /**
   * Create the application
   *
   * @constructor
   * @param  {object} config Configuration object
   */
  constructor(config) {
    this.config_ = config
  }

  /**
   * Initialize all components and listeners
   */
  initialize() {

    /* Initialize Modernizr and Fastclick */
    new Material.Event.Listener(document, "DOMContentLoaded", () => {

      /* Test for iOS */
      Modernizr.addTest("ios", () => {
        return !!navigator.userAgent.match(/(iPad|iPhone|iPod)/g)
      })

      /* Test for web application context */
      Modernizr.addTest("standalone", () => {
        return !!navigator.standalone
      })

      /* Attack FastClick to mitigate 300ms delay on touch devices */
      FastClick.attach(document.body)

      /* Wrap all data tables */
      const tables = document.querySelectorAll("table:not([class])")
      for (const table of tables) {
        const wrap = document.createElement("div")
        wrap.classList.add("md-typeset__table")
        if (table.nextSibling) {
          table.parentNode.insertBefore(wrap, table.nextSibling)
        } else {
          table.parentNode.appendChild(wrap)
        }
        wrap.appendChild(table)
      }
    }).listen()

    /* Cross-browser helper to dispatch/fire an event */
    const dispatch = (el, event) => {
      return document.createEvent
        ? el.dispatchEvent(new Event(event))
        : el.fireEvent(`on${event}`, document.createEventObject())
    }

    /* Truncate a string after the given number of characters - this is not
       a reasonable approach, since the summaries kind of suck. It would be
       better to create something more intelligent, highlighting the search
       occurrences and making a better summary out of it */
    const truncate = function(string, n) {
      let i = n
      if (string.length > i) {
        while (string[i] !== " " && --i > 0);
        return `${string.substring(0, i)}...`
      }
      return string
    }

    /* Component: sidebar with navigation */
    new Material.Event.MatchMedia("(min-width: 1200px)",
      new Material.Event.Listener(window, [
        "scroll", "resize", "orientationchange"
      ], new Material.Sidebar("[data-md-sidebar=primary]")))

    /* Component: sidebar with table of contents */
    new Material.Event.MatchMedia("(min-width: 960px)",
      new Material.Event.Listener(window, [
        "scroll", "resize", "orientationchange"
      ], new Material.Sidebar("[data-md-sidebar=secondary]")))

    /* Component: link blurring for table of contents */
    new Material.Event.MatchMedia("(min-width: 960px)",
      new Material.Event.Listener(window, "scroll",
        new Material.Nav.Blur("[data-md-sidebar=secondary] .md-nav__link")))

    /* Component: collapsible elements for navigation */
    const collapsibles = document.querySelectorAll("[data-md-collapse]")
    for (const collapse of collapsibles)
      new Material.Event.MatchMedia("(min-width: 1200px)",
        new Material.Event.Listener(collapse.previousElementSibling, "click",
          new Material.Nav.Collapse(collapse)))

    /* Component: search body lock for mobile */
    new Material.Event.MatchMedia("(max-width: 959px)",
      new Material.Event.Listener("[data-md-toggle=search]", "change",
        new Material.Search.Lock("[data-md-toggle=search]")))

    /* Component: search results */
    new Material.Event.Listener(document.forms.search.query, [
      "focus", "keyup"
    ], new Material.Search.Result("[data-md-search-result]", () => {
      return fetch(`${this.config_.url.base}/mkdocs/search_index.json`)
        .then(response => response.json())
        .then(data => {
          return data.docs.map(doc => {
            doc.location = this.config_.url.base + doc.location
            doc.text = truncate(doc.text, 140)
            return doc
          })
        })
    })).listen()

    /* Listener: prevent touches on overlay if navigation is active */
    new Material.Event.MatchMedia("(max-width: 1199px)",
      new Material.Event.Listener("[data-md-overlay]", "touchstart",
        ev => ev.preventDefault()))

    /* Listener: close drawer when anchor links are clicked */
    new Material.Event.MatchMedia("(max-width: 959px)",
      new Material.Event.Listener("[data-md-sidebar=primary] [href^='#']",
        "click", () => {
          const toggle = document.querySelector("[data-md-toggle=drawer]")
          if (toggle.checked) {
            toggle.checked = false
            dispatch(toggle, "change")
          }
        }))

    /* Listener: focus input after activating search */
    new Material.Event.Listener("[data-md-toggle=search]", "change", ev => {
      setTimeout(toggle => {
        const query = document.forms.search.query
        if (toggle.checked)
          query.focus()
      }, 400, ev.target)
    }).listen()

    /* Listener: activate search on focus */
    new Material.Event.MatchMedia("(min-width: 960px)",
      new Material.Event.Listener(document.forms.search.query, "focus", () => {
        const toggle = document.querySelector("[data-md-toggle=search]")
        if (!toggle.checked) {
          toggle.checked = true
          dispatch(toggle, "change")
        }
      }))

    /* Listener: disable search when clicking outside */
    new Material.Event.MatchMedia("(min-width: 960px)",
      new Material.Event.Listener(document.body, "click", () => {
        const toggle = document.querySelector("[data-md-toggle=search]")
        if (toggle.checked) {
          toggle.checked = false
          dispatch(toggle, "change")
        }
      }))

    /* Listener: fix unclickable toggle due to blur handler */
    new Material.Event.MatchMedia("(min-width: 960px)",
      new Material.Event.Listener("[data-md-toggle=search]", "click",
        ev => ev.stopPropagation()))

    /* Listener: prevent search from closing when clicking */
    new Material.Event.MatchMedia("(min-width: 960px)",
      new Material.Event.Listener("[data-md-search]", "click",
        ev => ev.stopPropagation()))

    /* Retrieve the facts for the given repository type */
    ;(() => {
      const el = document.querySelector("[data-md-source]")
      switch (el.dataset.mdSource) {
        case "github": return new Material.Source.Adapter.GitHub(el).fetch()
        default: return Promise.resolve([])
      }

    /* Render repository source information */
    })().then(facts => {
      const sources = document.querySelectorAll("[data-md-source]")
      for (const source of sources)
        new Material.Source.Repository(source)
          .initialize(facts)
    })
  }
}
