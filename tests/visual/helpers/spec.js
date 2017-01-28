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

import config from "../config.json"

/* ----------------------------------------------------------------------------
 * Helper
 * ------------------------------------------------------------------------- */

/**
 * Resolve relevant breakpoints matching expression
 *
 * The breakpoints are assumed to be specified by their names set in the
 * configuration file, prefixed with an "@" character.
 *
 * There are three selection modes:
 *
 * 1. -@bp: The specified breakpoint and all preceding
 * 2.  @bp: Only the specified breakpoint
 * 3. +@bp: The specified breakpoint and all following
 *
 * @param {Array.<object>} breakpoints - Breakpoints
 * @param {string} expr - Expression
 * @return {Array.<object>} Selected breakpoints
 */
const resolve = (breakpoints, expr) => {
  if (typeof expr === "undefined")
    return breakpoints

  /* Split expression and find the offset of the specified breakpoint */
  const [mode, name] = expr.split("@")
  const index = breakpoints.findIndex(
    breakpoint => breakpoint.name === name)

  /* Determine whether to go up or down */
  const from = mode !== "-" ? index : 0
  const to   = mode !== "+" ? index + 1 : breakpoints.length

  /* Return relevant breakpoints */
  return breakpoints.slice(from, to)
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/*
 * TODO
 */
const generate = components => {

  /* Generate a suite for every component */
  for (const name of Object.keys(components)) {
    const component = components[name]

    /* Create suite */
    gemini.suite(name, suite => {
      if (component.url)
        suite.setUrl(component.url)

      /* The capture selector is assumed to exist */
      suite.setCaptureElements(component.capture)

      /* Resolve and apply relevant breakpoints */
      const breakpoints = resolve(config.breakpoints, component.break)
      for (const breakpoint of breakpoints) {
        suite.capture(`@${breakpoint.name}`, actions => {
          actions.setWindowSize(breakpoint.size.width, breakpoint.size.height)
        })
      }

      /* Generate sub-suites */
      generate(component.suite || {})
    })

    /* Set component states to default, if none given */
    // const states = component.states
    //   ? component.states
    //   : [{ name: "", wait: 0 }]
    //
    // let done = 0
    // for (const state of states) {
    //   gemini.suite(`${name}${state.name}`, suite => {
    //
    //     /* Set URL of page to capture */
    //     if (component.url)
    //       suite.setUrl(component.url)
    //
    //     /* Set elements to capture */
    //     if (component.capture)
    //       suite.setCaptureElements(component.capture)
    //
    //     // TODO: otherwise throw error
    //     if (component.break) {
    //       const breakpoints = resolve(config.breakpoints, component.break)
    //
    //       // iterate breakpoints
    //       for (const breakpoint of breakpoints) {
    //         suite.capture(`@${breakpoint.name}`, actions => {
    //           actions.setWindowSize(
    //             breakpoint.size.width, breakpoint.size.height)
    //           if (state.wait)
    //             actions.wait(state.wait)
    //           if (state.name) {
    //             // eval, as its executed at the frontend
    //             if (typeof state.name === "string") {
    //               actions.executeJS(new Function(`
    //                 document.querySelector(
    //                   "${component.capture}"
    //                 ).classList.add("${state.name}")
    //                 `)
    //               )
    //             } else {
    //               actions.executeJS(state.name)
    //             }
    //           }
    //         })
    //       }
    //     }
    //
    //     // nested suites
    //     if (!done && component.suite) {
    //       done = 1
    //       generate(component.suite)
    //     }
    //   })
    // }
  }
}

export default {
  generate
}
