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

import Clipboard from "clipboard"
import FastClick from "fastclick"

import Material from "./components/Material"

/* ----------------------------------------------------------------------------
 * Application
 * ------------------------------------------------------------------------- */

/**
 * Initialize Material for MkDocs
 *
 * @param {Object} config - Configuration
 */
function initialize(config) { // eslint-disable-line func-style

  /* Initialize Modernizr and FastClick */
  new Material.Event.Listener(document, "DOMContentLoaded", () => {
    if (!(document.body instanceof HTMLElement))
      throw new ReferenceError

    /* Attach FastClick to mitigate 300ms delay on touch devices */
    FastClick.attach(document.body)

    /* Test for iOS */
    Modernizr.addTest("ios", () => {
      return !!navigator.userAgent.match(/(iPad|iPhone|iPod)/g)
    })

    /* Wrap all data tables for better overflow scrolling */
    const tables = document.querySelectorAll("table:not([class])")              // TODO: this is JSX, we should rename the file
    Array.prototype.forEach.call(tables, table => {
      const wrap = (
        <div class="md-typeset__scrollwrap">
          <div class="md-typeset__table"></div>
        </div>
      )
      if (table.nextSibling) {
        table.parentNode.insertBefore(wrap, table.nextSibling)
      } else {
        table.parentNode.appendChild(wrap)
      }
      wrap.children[0].appendChild(table)
    })

    /* Clipboard integration */
    if (Clipboard.isSupported()) {
      const blocks = document.querySelectorAll("div > pre, pre > code")
      Array.prototype.forEach.call(blocks, (block, index) => {
        const id = `__code_${index}`

        /* Create button with message container */
        const button = (
          <button class="md-clipboard" title="Copy to clipboard"
            data-clipboard-target={`#${id} pre, #${id} code`}>
            <span class="md-clipboard__message"></span>
          </button>
        )

        /* Link to block and insert button */
        const parent = block.parentNode
        parent.id = id
        parent.insertBefore(button, block)
      })

      /* Initialize Clipboard listener */
      const copy = new Clipboard(".md-clipboard")

      /* Success handler */
      copy.on("success", action => {
        const message = action.trigger.querySelector(".md-clipboard__message")
        if (!(message instanceof HTMLElement))
          throw new ReferenceError

        /* Clear selection and reset debounce logic */
        action.clearSelection()
        if (message.dataset.mdTimer)
          clearTimeout(parseInt(message.dataset.mdTimer, 10))

        /* Set message indicating success and show it */
        message.classList.add("md-clipboard__message--active")
        message.innerHTML = "Copied to clipboard"

        /* Hide message after two seconds */
        message.dataset.mdTimer = setTimeout(() => {
          message.classList.remove("md-clipboard__message--active")
          message.dataset.mdTimer = ""
        }, 2000).toString()
      })
    }

    /* Force 1px scroll offset to trigger overflow scrolling */
    if (Modernizr.ios) {
      const scrollable = document.querySelectorAll("[data-md-scrollfix]")
      Array.prototype.forEach.call(scrollable, item => {
        item.addEventListener("touchstart", () => {
          const top = item.scrollTop

          /* We're at the top of the container */
          if (top === 0) {
            item.scrollTop = 1

            /* We're at the bottom of the container */
          } else if (top + item.offsetHeight === item.scrollHeight) {
            item.scrollTop = top - 1
          }
        })
      })
    }
  }).listen()

  /* Component: header shadow toggle */
  new Material.Event.MatchMedia("(min-width: 1220px)",
    new Material.Event.Listener(window, [
      "scroll", "resize", "orientationchange"
    ], new Material.Header.Shadow(
        "[data-md-component=container]",
        "[data-md-component=header]")))

  /* Component: tabs visibility toggle */
  if (document.querySelector("[data-md-component=tabs]"))
    new Material.Event.Listener(window, [
      "scroll", "resize", "orientationchange"
    ], new Material.Tabs.Toggle("[data-md-component=tabs]")).listen()

  /* Component: sidebar with navigation */
  new Material.Event.MatchMedia("(min-width: 1220px)",
    new Material.Event.Listener(window, [
      "scroll", "resize", "orientationchange"
    ], new Material.Sidebar.Position(
        "[data-md-component=navigation]",
        "[data-md-component=header]")))

  /* Component: sidebar with table of contents (missing on 404 page) */
  if (document.querySelector("[data-md-component=toc]"))
    new Material.Event.MatchMedia("(min-width: 960px)",
      new Material.Event.Listener(window, [
        "scroll", "resize", "orientationchange"
      ], new Material.Sidebar.Position(
          "[data-md-component=toc]",
          "[data-md-component=header]")))

  /* Component: link blurring for table of contents */
  new Material.Event.MatchMedia("(min-width: 960px)",
    new Material.Event.Listener(window, "scroll",
      new Material.Nav.Blur("[data-md-component=toc] [href]")))

  /* Component: collapsible elements for navigation */
  const collapsibles =
    document.querySelectorAll("[data-md-component=collapsible]")
  Array.prototype.forEach.call(collapsibles, collapse => {
    new Material.Event.MatchMedia("(min-width: 1220px)",
      new Material.Event.Listener(collapse.previousElementSibling, "click",
        new Material.Nav.Collapse(collapse)))
  })

  /* Component: active pane monitor for iOS scrolling fixes */
  new Material.Event.MatchMedia("(max-width: 1219px)",
    new Material.Event.Listener(
      "[data-md-component=navigation] [data-md-toggle]", "change",
      new Material.Nav.Scrolling("[data-md-component=navigation] nav")))

  /* Component: search body lock for mobile */
  new Material.Event.MatchMedia("(max-width: 959px)",
    new Material.Event.Listener("[data-md-toggle=search]", "change",
      new Material.Search.Lock("[data-md-toggle=search]")))

  /* Component: search results */
  new Material.Event.Listener("[data-md-component=query]", [
    "focus", "keyup", "change"
  ], new Material.Search.Result("[data-md-component=result]", () => {
      return fetch(`${config.url.base}/mkdocs/search_index.json`, {
        credentials: "same-origin"
      }).then(response => response.json())
        .then(data => {
          return data.docs.map(doc => {
            doc.location = config.url.base + doc.location
            return doc
          })
        })
    })).listen()

  /* Listener: close drawer when anchor links are clicked */
  new Material.Event.MatchMedia("(max-width: 959px)",
    new Material.Event.Listener("[data-md-component=navigation] [href^='#']",
      "click", () => {
        const toggle = document.querySelector("[data-md-toggle=drawer]")
        if (!(toggle instanceof HTMLInputElement))
          throw new ReferenceError
        if (toggle.checked) {
          toggle.checked = false
          toggle.dispatchEvent(new CustomEvent("change"))
        }
      }))

  /* Listener: focus input after form reset */
  new Material.Event.Listener("[data-md-component=reset]", "click", () => {
    setTimeout(() => {
      const query = document.querySelector("[data-md-component=query]")
      if (!(query instanceof HTMLInputElement))
        throw new ReferenceError
      query.focus()
    }, 10)
  }).listen()

  /* Listener: focus input after opening search */
  new Material.Event.Listener("[data-md-toggle=search]", "change", ev => {
    setTimeout(toggle => {
      if (!(toggle instanceof HTMLInputElement))
        throw new ReferenceError
      if (toggle.checked) {
        const query = document.querySelector("[data-md-component=query]")
        if (!(query instanceof HTMLInputElement))
          throw new ReferenceError
        query.focus()
      }
    }, 400, ev.target)
  }).listen()

  /* Listener: open search on focus */
  new Material.Event.MatchMedia("(min-width: 960px)",
    new Material.Event.Listener("[data-md-component=query]", "focus", () => {
      const toggle = document.querySelector("[data-md-toggle=search]")
      if (!(toggle instanceof HTMLInputElement))
        throw new ReferenceError
      if (!toggle.checked) {
        toggle.checked = true
        toggle.dispatchEvent(new CustomEvent("change"))
      }
    }))

  /* Listener: keyboard handlers */ // eslint-disable-next-line complexity
  new Material.Event.Listener(window, "keydown", ev => {                        // TODO: split up into component to reduce complexity
    const toggle = document.querySelector("[data-md-toggle=search]")
    if (!(toggle instanceof HTMLInputElement))
      throw new ReferenceError
    const query = document.querySelector("[data-md-component=query]")
    if (!(query instanceof HTMLInputElement))
      throw new ReferenceError

    /* Abort if meta key (macOS) or ctrl key (Windows) is pressed */
    if (ev.metaKey || ev.ctrlKey)
      return

    /* Search is open */
    if (toggle.checked) {

      /* Enter: prevent form submission */
      if (ev.keyCode === 13) {
        if (query === document.activeElement) {
          ev.preventDefault()

          /* Go to current active/focused link */
          const focus = document.querySelector(
            "[data-md-component=search] [href][data-md-state=active]")
          if (focus instanceof HTMLLinkElement)
            window.location = focus.getAttribute("href")

          /* Close search */
          toggle.checked = false
          toggle.dispatchEvent(new CustomEvent("change"))
          query.blur()
        }

      /* Escape: close search */
      } else if (ev.keyCode === 27) {
        toggle.checked = false
        toggle.dispatchEvent(new CustomEvent("change"))
        query.blur()

      /* Horizontal arrows and backspace: focus input */
      } else if ([8, 37, 39].indexOf(ev.keyCode) !== -1) {
        if (query !== document.activeElement)
          query.focus()

      /* Vertical arrows and tab: select previous or next search result */
      } else if ([9, 38, 40].indexOf(ev.keyCode) !== -1) {
        const map = ev.shiftKey ? 38 : 40
        const key = ev.keyCode === 9 ? map : ev.keyCode

        /* Retrieve all results */
        const links = Array.prototype.slice.call(
          document.querySelectorAll(
            "[data-md-component=query], [data-md-component=search] [href]"))

        /* Retrieve current active/focused result */
        const focus = links.find(link => {
          if (!(link instanceof HTMLElement))
            throw new ReferenceError
          return link.dataset.mdState === "active"
        })
        if (focus)
          focus.dataset.mdState = ""

        /* Calculate index depending on direction, add length to form ring */
        const index = Math.max(0, (
          links.indexOf(focus) + links.length + (key === 38 ? -1 : +1)
        ) % links.length)

        /* Set active state and focus */
        if (links[index]) {
          links[index].dataset.mdState = "active"
          links[index].focus()
        }

        /* Prevent scrolling of page */
        ev.preventDefault()
        ev.stopPropagation()

        /* Return false prevents the cursor position from changing */
        return false
      }

    /* Search is closed and we're not inside a form */
    } else if (document.activeElement && !document.activeElement.form) {

      /* F/S: Open search if not in input field */
      if (ev.keyCode === 70 || ev.keyCode === 83) {
        query.focus()
        ev.preventDefault()
      }
    }
  }).listen()

  /* Listener: focus query if in search is open and character is typed */
  new Material.Event.Listener(window, "keypress", () => {
    const toggle = document.querySelector("[data-md-toggle=search]")
    if (!(toggle instanceof HTMLInputElement))
      throw new ReferenceError
    if (toggle.checked) {
      const query = document.querySelector("[data-md-component=query]")
      if (!(query instanceof HTMLInputElement))
        throw new ReferenceError
      if (query !== document.activeElement)
        query.focus()
    }
  }).listen()

  /* Retrieve facts for the given repository type */
  ;(() => {
    const el = document.querySelector("[data-md-source]")
    if (!el)
      return Promise.resolve([])
    else if (!(el instanceof HTMLAnchorElement))
      throw new ReferenceError
    switch (el.dataset.mdSource) {
      case "github": return new Material.Source.Adapter.GitHub(el).fetch()
      default: return Promise.resolve([])
    }

  /* Render repository information */
  })().then(facts => {
    const sources = document.querySelectorAll("[data-md-source]")
    Array.prototype.forEach.call(sources, source => {
      new Material.Source.Repository(source)
        .initialize(facts)
    })
  })
}

/* ----------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------- */

export {
  initialize
}
