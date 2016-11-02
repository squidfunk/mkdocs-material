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
 * Imports
 * ------------------------------------------------------------------------- */

import FastClick from "fastclick"

// import Expander from "./components/expander"

import GithubSourceFacts from "./components/GithubSourceFacts"
import Material from "./components/Material"

// import Search from './components/search';

/* ----------------------------------------------------------------------------
 * Application
 * ------------------------------------------------------------------------- */

class Application {

  /**
   * Constructor.
   *
   * @constructor
   * @param  {object} config Configuration object
   * @return {void}
   */
  constructor(config) {
    this.config_ = config
  }

  /**
   * Initialize all components
   */
  initialize() {

    /* Initialize sticky sidebars */
    this.initializeSidebar("[data-md-sidebar=primary]", "(min-width: 1200px)")
    this.initializeSidebar("[data-md-sidebar=secondary]")

    /* Initialize navigation style modifiers */
    this.initializeNavBlur("[data-md-sidebar=secondary] .md-nav__link")
    this.initializeNavCollapse("[data-md-collapse]", "(min-width: 1200px)")

    // TODO
    if (this.hasGithubRepo()) {
      const githubSource = new GithubSourceFacts(
        this.config_.storage,
        this.config_.repo.url
      )
      githubSource.initialize()
    }

  }

  /**
   * Initialize sidebar within optional media query range
   *
   * @param {(string|HTMLElement)} el - Selector or HTML element
   * @param {string} [query] - Media query
   */
  initializeSidebar(el, query = null) {
    const sidebar = new Material.Sidebar(el)
    const listeners = [
      new Material.Listener.Viewport.Offset(() => sidebar.update()),
      new Material.Listener.Viewport.Resize(() => sidebar.update())
    ]

    /* Initialize depending on media query */
    if (typeof query === "string" && query.length) {
      new Material.Listener.Viewport.Media(query, media => {
        if (media.matches) {
          sidebar.update()
          for (const listener of listeners)
            listener.listen()
        } else {
          sidebar.reset()
          for (const listener of listeners)
            listener.unlisten()
        }
      }).listen()

    /* Initialize without media query */
    } else {
      sidebar.update()
      for (const listener of listeners)
        listener.listen()
    }
  }

  /**
   * Initialize blurring of anchors above page y-offset
   *
   * @param {(string|NodeList<HTMLElement>)} els - Selector or HTML elements
   */
  initializeNavBlur(els) {
    const blur = new Material.Nav.Blur(els)
    const listeners = [
      new Material.Listener.Viewport.Offset(() => blur.update())
    ]

    /* Initialize blur and listeners */
    blur.update()
    for (const listener of listeners)
      listener.listen()
  }

  /**
   * Initialize collapsible nested navigation elements
   *
   * @param {(string|NodeList<HTMLElement>)} els - Selector or HTML elements
   * @param {string} [query] - Media query
   */
  initializeNavCollapse(els, query = null) {
    const collapsibles = document.querySelectorAll(els)
    for (const collapsible of collapsibles) {
      const collapse = new Material.Nav.Collapse(collapsible)
      const listener = new Material.Listener.Toggle(
        collapsible.previousElementSibling, () => collapse.update())

      /* Initialize depending on media query */
      new Material.Listener.Viewport.Media(query, media => {
        if (media.matches) {
          listener.listen()
        } else {
          collapse.reset()
          listener.unlisten()
        }
      }).listen()
    }
  }

  /**
   * Is this application about a Github repository?
   *
   * @return {bool} - true if `repo.icon` or `repo.url` contains 'github'
   */
  hasGithubRepo() {
    return this.config_.repo.icon === "github"
      || this.config_.repo.url.includes("github")
  }
}

export default Application

// const consume = reader =>  {
//   let total = 0, body = ""
//   return new Promise((resolve, reject) => {
//     function pump() {
//       reader.read().then(({ done, value }) => {
//         if (done) {
//           console.log(body)
//           resolve()
//           return
//         }
//         total += value.byteLength
//         // value +=
//         body += value
//         console.log(`received ${value.byteLength}, total: ${total}`)
//         pump()
//       })
//       .catch(reject)
//     }
//     pump()
//   })
// }
//
// fetch("/mkdocs/search_index.json")
//   .then(res => consume(res.body.getReader()))
//   .then(() => console.log("consumed entire body"))
//   .catch(e => console.log(e))

// TODO: wrap in function call
// application module export

/* Initialize application upon DOM ready */
document.addEventListener("DOMContentLoaded", () => {

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

  // query.addEventListener("focus", () => {
  //   document.querySelector(".md-search").dataset.mdLocked = ""
  // })

  /* Intercept click on search mode toggle */

  // TODO: this needs to be abstracted...
  document.getElementById("query").addEventListener("focus", () => {
    document.getElementById("search").checked = true
  })

  // should be registered on body, but leads to problems
  document.querySelector(".md-container").addEventListener("click", () => {
    if (document.getElementById("search").checked)
      document.getElementById("search").checked = false
  })

  // stop propagation, if search is active...
  document.querySelector(".md-search").addEventListener("click", ev => {
    ev.stopPropagation()
  })
  // toggleSearchClose.addEventListener("click", ev => {
  //   ev.preventDefault()
  //   // ev.target
  //
  //   const search = document.getElementById("search")
  //   search.checked = false
  // })

// }, 1000);

  fetch(
      "https://api.github.com/repos/squidfunk/mkdocs-material/releases/latest")
    .then(response => {
      return response.json()
    })
    // .then(data => {
    //   // console.log(data)
    // })

})
