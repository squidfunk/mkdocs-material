
const config = require("./break.json")

// TODO: also pass breakpoints to function!

const generate = components => {
  for (const c of Object.keys(components)) {
    const component = components[c]

    // TODO: check states and generate a suite for each state!
    // TODO: check name variants!
    // TODO: build nested suites only once
    // TODO: handle waiting/js

    const states = component.states ? component.states :
      [{ name: "", wait: 0 }]

    let done = 0
    for (const state of states) {
      gemini.suite(`${c}${state.name}`, suite => {

        /* Set URL of page to capture */
        if (component.url)
          suite.setUrl(component.url)

        /* Set elements to capture */
        if (component.capture)
          suite.setCaptureElements(component.capture)

        // TODO: otherwise throw error
        if (component.break) {
          const [mode, name] = component.break.split("@")

          // get matching breakpoint. TODO: handle non-existent!!!
          const b = config.breakpoints.findIndex(bp => {
            return bp.name === name
          })

          // now split according to method
          let breakpoints = []
          switch (mode) {
            case "":
              breakpoints = config.breakpoints.slice(b, b + 1)
              break
            case "+":
              breakpoints = config.breakpoints.slice(
                b, config.breakpoints.length + 1)
              break
            case "-":
              breakpoints = config.breakpoints.slice(0, b + 1)
              break
          }

          // iterate breakpoints
          for (const breakpoint of breakpoints) {
            suite.capture(`@${breakpoint.name}`, actions => {
              actions.setWindowSize(
                breakpoint.size.width, breakpoint.size.height)
              if (state.wait)
                actions.wait(state.wait)
              if (state.name) {
                // eval, as its executed at the frontend
                if (typeof state.name === "string") {
                  actions.executeJS(new Function(`
                    document.querySelector(
                      "${component.capture}"
                    ).classList.add("${state.name}")
                    `)
                  )
                } else {
                  actions.executeJS(state.name)
                }
              }
            })
          }
        }

        // nested suites
        if (!done && component.suite) {
          done = 1
          generate(component.suite)
        }
      })
    }
  }
}
export default generate
