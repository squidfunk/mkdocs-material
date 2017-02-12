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

import spec from "~/tests/visual/helpers/spec"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Open the drawer
 */
const open = () => {
  const drawer = document.querySelector("[data-md-toggle=\"drawer\"]")
  drawer.checked = true
}

/**
 * Blur the first anchor link
 */
const blur = () => {
  const anchor = document.querySelector(
    ".md-sidebar--secondary .md-nav--secondary .md-nav__link")
  anchor.dataset.mdState = "blur"
}

/* ----------------------------------------------------------------------------
 * Tests
 * ------------------------------------------------------------------------- */

/*
 * Main navigation and table of contents
 */
spec.register(__dirname, {
  "md-nav--primary": {
    "url": "/",
    "capture": ".md-nav--primary",
    "break": "+@tablet-landscape",
    "states": [
      { "name": "", "exec": open }
    ],
    "suite": {

      /* Expanded nested navigation */
      "~nested": {
        "url": "/nested",
        "capture": ".md-nav--primary",
        "break": "@screen"
      },

      /* List title */
      "md-nav__title": {
        "capture": ".md-nav--primary .md-nav__title",
        "break": "+@tablet-landscape",
        "states": [
          { "name": "", "exec": open }
        ],
        "suite": {

          /* Long list title with ellipsis */
          "~overflow": {
            "dir": "_overflow",
            "capture": ".md-nav--primary .md-nav__title",
            "break": "+@tablet-landscape",
            "states": [
              { "name": "", "exec": open }
            ]
          }
        }
      },

      /* List item */
      "md-nav__item": {
        "capture": ".md-nav--primary .md-nav__item",
        "break": "+@tablet-landscape",
        "states": [
          { "name": "", "exec": open }
        ]
      },

      /* Item contains a nested list */
      "md-nav__item--nested": {
        "capture": ".md-nav--primary .md-nav__item--nested",
        "break": "+@tablet-landscape",
        "states": [
          { "name": "", "exec": open }
        ],
        "suite": {

          /* Link inside item that contains a nested list */
          "md-nav__link": {
            "capture":
              ".md-nav--primary .md-nav__item--nested " +
              ".md-nav__link",
            "break": "+@tablet-landscape",
            "states": [
              { "name": "",       "exec": open },
              { "name": ":focus", "exec": open },
              { "name": ":hover", "exec": open }
            ]
          },

          /* Second-level navigation */
          "md-nav": {
            "url": "/nested",
            "capture": ".md-nav--primary .md-nav",
            "break": "+@tablet-landscape",
            "states": [
              { "name": "", "exec": open }
            ],
            "suite": {

              /* List title */
              "md-nav__title": {
                "capture": ".md-nav--primary .md-nav .md-nav__title",
                "break": "@tablet-landscape",
                "states": [
                  { "name": "", "exec": open }
                ],
                "suite": {

                  /* Long list title with ellipsis */
                  "~overflow": {
                    "dir": "_overflow",
                    "url": "/nested",
                    "capture": ".md-nav--primary .md-nav .md-nav__title",
                    "break": "@tablet-landscape",
                    "states": [
                      { "name": "", "exec": open }
                    ]
                  }
                }
              }
            }
          }
        }
      },

      /* Link inside item */
      "md-nav__link": {
        "capture": ".md-nav--primary .md-nav__item:nth-child(2) .md-nav__link",
        "break": "+@tablet-landscape",
        "states": [
          { "name": "",       "exec": open },
          { "name": ":focus", "exec": open },
          { "name": ":hover", "exec": open }
        ]
      },

      /* Active link */
      "md-nav__link--active": {
        "capture": ".md-nav--primary .md-nav__item a.md-nav__link--active",
        "break": "+@tablet-landscape",
        "states": [
          { "name": "",       "exec": open },
          { "name": ":focus", "exec": open },
          { "name": ":hover", "exec": open }
        ],
        "suite": {

          /* Active link with link to table of contents */
          "~toc": {
            "capture":
              ".md-nav--primary .md-nav__item " +
              "label.md-nav__link--active",
            "break": "@tablet-portrait",
            "states": [
              { "name": "",       "exec": open },
              { "name": ":focus", "exec": open },
              { "name": ":hover", "exec": open }
            ]
          }
        }
      },

      /* Table of contents */
      "md-nav--secondary": {
        "url": "/secondary",
        "capture": ".md-nav--primary .md-nav--secondary",
        "break": "@tablet-portrait",
        "states": [
          { "name": "", "exec": open }
        ]
      }
    }
  },

  /* Table of contents */
  "md-nav--secondary": {
    "url": "/secondary",
    "capture": ".md-sidebar--secondary .md-nav--secondary",
    "break": "+@tablet-landscape",
    "suite": {

      /* List title */
      "md-nav__title": {
        "capture": ".md-sidebar--secondary .md-nav--secondary .md-nav__title",
        "break": "+@tablet-landscape"
      },

      /* List item */
      "md-nav__item": {
        "capture": ".md-sidebar--secondary .md-nav--secondary .md-nav__item",
        "break": "+@tablet-landscape"
      },

      /* Link inside item */
      "md-nav__link": {
        "capture": ".md-sidebar--secondary .md-nav--secondary .md-nav__link",
        "break": "+@tablet-landscape",
        "states": [
          { "name": "" },
          { "name": ":focus" },
          { "name": ":hover" }
        ],
        "suite": {

          /* Blurred link */
          "~blurred": {
            "capture":
              ".md-sidebar--secondary .md-nav--secondary " +
              ".md-nav__link",
            "break": "+@tablet-landscape",
            "states": [
              { "name": "",       "exec": blur },
              { "name": ":focus", "exec": blur },
              { "name": ":hover", "exec": blur }
            ]
          }
        }
      }
    }
  }
})
