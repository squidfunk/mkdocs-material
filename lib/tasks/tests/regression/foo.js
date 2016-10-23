
import * as selenium from "./selenium"
import path from "path"
import Gemini from "gemini"

export default (gulp, config) => {
  return done => {
    selenium.start(() => {
      // const file = require(
      //   path.resolve(process.cwd(),
      //     config.tests.regression.geminiConfigPath,
      //       ".gemini-local.json"
      //     ))

      const configx = {
        "rootUrl": "http://localhost:8000",
        "gridUrl": "http://localhost:4444/wd/hub",
        "screenshotsDir": "./tests/regression/baseline/local",
        "browsers": {
          "chrome": {
            "desiredCapabilities": {
              "browserName": "chrome"
            }
          }
        },
        "system": {
          "projectRoot": "../../../",
          "sourceRoot": "src/assets/stylesheets"
        }
      }

      // https://www.npmjs.com/package/gemini-sauce

      console.log("running gemini...")
      const gemini = new Gemini(configx)

      gemini.test("tests/regression/styleguide.js", {
        reporters: ["html"]
      })
        .then(() => {
          console.log("success")
          selenium.stop()
          done()
        }, err => {
          console.log("fail")
          selenium.stop()
          throw err
        })
    })
  // selenium.start(() => {
    //   const geminiConfig = require(
    //     path.resolve(
    //       process.cwd(),
    //       config.tests.regression.geminiConfigPath,
    //       ".gemini-local.json"
    //     ))
    //   geminiConfig.rootUrl = `http://127.0.0.1:${config.patternlabServer.port}`
    //
    //   const gemini = new Gemini(geminiConfig)
    //   gemini.test(config.tests.regression.patternlabToGeminiOutput, {
    //     reporters: ["html"]
    //   })
    //     .then(() => {
    //       selenium.stop()
    //       done()
    //     }, err => {
    //       selenium.stop()
    //       throw err
    //     })
    // })
  }
}
