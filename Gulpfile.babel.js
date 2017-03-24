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

import chalk from "chalk"
import gulp from "gulp"
import notifier from "node-notifier"
import plumber from "gulp-plumber"
import util from "gulp-util"
import yargs from "yargs"

/* ----------------------------------------------------------------------------
 * Configuration and arguments
 * ------------------------------------------------------------------------- */

/* General configuration */
const config = {
  assets: {
    src: "src/assets",                 /* Source directory for assets */
    build: "material/assets"           /* Target directory for assets */
  },
  lib: "lib",                          /* Libraries and tasks */
  tests: {
    visual: "tests/visual"             /* Base directory for visual tests */
  },
  views: {
    src: "src",                        /* Source directory for views */
    build: "material"                  /* Target directory for views */
  }
}

/* Commandline arguments */
let args = yargs
  .locale("en")
  .usage(`\n${chalk.yellow("Usage:")} yarn run <command> -- [options]`)
  .wrap(84)
  .updateStrings({
    "Commands:": chalk.yellow("Commands:"),
    "Examples:": chalk.yellow("Examples:")
  })

  /* Commands */
  .command("build", chalk.grey("build assets and views"))
  .command("clean", chalk.grey("clean build artifacts"))
  .command("flow", chalk.grey("type check with flow"))
  .command("help", chalk.grey("display this message"))
  .command("lint", chalk.grey("lint sources"))
  .command("start", chalk.grey("start development server"))
  .command("test:visual:run", chalk.grey("run visual tests"))
  .command("test:visual:session", chalk.grey("start test server"))
  .command("test:visual:update", chalk.grey("update reference images"))

  /* Options */
  .group([
    "help", "clean"
  ], chalk.yellow("Options:"))
  .help("help", chalk.grey("display this message"))
  .option("clean", {
    describe: chalk.grey("clean artifacts before command"),
    default: false,
    global: true
  })

  /* Build options */
  .group([
    "lint", "optimize", "revision", "sourcemaps", "mkdocs"
  ], chalk.yellow("Build Options:"))
  .option("lint", {
    describe: chalk.grey("lint sources before build"),
    default: true,
    global: true
  })
  .option("optimize", {
    describe: chalk.grey("optimize and minify assets"),
    default: false,
    global: true
  })
  .option("revision", {
    describe: chalk.grey("revision assets for cache busting"),
    default: false,
    global: true
  })
  .option("sourcemaps", {
    describe: chalk.grey("generate sourcemaps for assets"),
    default: false,
    global: true
  })
  .option("mkdocs", {
    describe: chalk.grey("build documentation or start watchdog"),
    default: true,
    global: true
  })

  /* Test options */
  .group([
    "grep", "browser"
  ], chalk.yellow("Test Options:"))
  .option("grep", {
    describe: chalk.grey("only execute tests matching a regex"),
    global: true
  })
  .option("browser", {
    describe: chalk.grey("only execute tests for the given browser"),
    global: true
  })

  /* Example commands */
  .example("yarn run build")
  .example("yarn run build -- --no-optimize")
  .example("yarn run clean")
  .example("yarn run flow")
  .example("yarn run lint")
  .example("yarn run start")
  .example("yarn run test:visual:run")
  .example("yarn run test:visual:run -- --no-clean")
  .example("yarn run test:visual:run -- --grep nav")
  .example("yarn run test:visual:run -- --browser ie11")
  .example("yarn run test:visual:session")
  .example("yarn run test:visual:update")

  /* Document Environment variables */
  .epilogue(
    `${chalk.yellow("Environment:")}\n` +
    `  SAUCE=${chalk.grey("<true|false)>")}\n` +
    `  SAUCE_USERNAME=${chalk.grey("<username>")}\n` +
    `  SAUCE_ACCESS_KEY=${chalk.grey("<key>")}`
  )

  /* Apply to process.argv */
  .argv

/* Only use the last seen value if boolean, so overrides are possible */
args = Object.keys(args).reduce((result, arg) => {
  result[arg] = Array.isArray(args[arg]) && typeof args[arg][0] === "boolean"
    ? [].concat(args[arg]).pop()
    : args[arg]
  return result
}, {})

/* ----------------------------------------------------------------------------
 * Overrides and helpers
 * ------------------------------------------------------------------------- */

/*
 * Override gulp.src() for nicer error handling.
 */
const src = gulp.src
gulp.src = (...glob) => {
  return src.apply(gulp, glob)
    .pipe(
      plumber(function(error) {
        util.log(util.colors.red(
          `Error (${error.plugin}): ${error.message}`
        ))

        /* Extract file where error happened, if existent */
        const file = error.relativePath
          ? error.relativePath.split("/").pop()
          : ""

        /* Dispatch system-level notification */
        notifier.notify({
          title: `Error (${error.plugin}): ${file}`,
          message: error.messageOriginal
        })

        // eslint-disable-next-line no-invalid-this
        this.emit("end")

        /* Throw error and abort, if not in watch mode */
        if (args._[0] !== "watch")
          throw error
      }))
}

/*
 * Helper function to load a task
 *
 * This function returns a callback that will require the task with the given
 * name and execute the function that is returned by this task. It omits the
 * need to load all tasks upfront, speeding up the build a gazillion times.
 */
const load = task => {
  return done => {
    return require(`./${config.lib}/tasks/${task}`)
      .call(gulp, gulp, config, args)(done)
  }
}

/* ----------------------------------------------------------------------------
 * Images
 * ------------------------------------------------------------------------- */

/*
 * Copy favicon
 */
gulp.task("assets:images:build:ico", [
  args.clean ? "assets:images:clean" : false
].filter(t => t),
  load("assets/images/build/ico"))

/*
 * Copy and minify vector graphics
 */
gulp.task("assets:images:build:svg", [
  args.clean ? "assets:images:clean" : false
].filter(t => t),
  load("assets/images/build/svg"))

/*
 * Copy images
 */
gulp.task("assets:images:build", [
  "assets:images:build:ico",
  "assets:images:build:svg"
])

/*
 * Clean images generated by build
 */
gulp.task("assets:images:clean",
  load("assets/images/clean"))

/* ----------------------------------------------------------------------------
 * JavaScript
 * ------------------------------------------------------------------------- */

/*
 * Build application logic
 *
 * When revisioning assets, the build must be serialized due to possible race
 * conditions when two tasks try to write manifest.json simultaneously
 */

gulp.task("assets:javascripts:build:application", [
  args.clean ? "assets:javascripts:clean" : false,
  args.lint ? "assets:javascripts:lint" : false,
  args.revision ? "assets:stylesheets:build" : false
].filter(t => t),
  load("assets/javascripts/build/application"))

/*
 * Build custom modernizr
 *
 * When revisioning assets, the build must be serialized due to possible race
 * conditions when two tasks try to write manifest.json simultaneously
 */
gulp.task("assets:javascripts:build:modernizr", [
  "assets:stylesheets:build",
  args.clean ? "assets:javascripts:clean" : false,
  args.lint ? "assets:javascripts:lint" : false,
  args.revision ? "assets:javascripts:build:application" : false
].filter(t => t),
  load("assets/javascripts/build/modernizr"))

/*
 * Build application logic and Modernizr
 */
gulp.task("assets:javascripts:build", [
  "assets:javascripts:build:application",
  "assets:javascripts:build:modernizr"
])

/*
 * Clean JavaScript generated by build
 */
gulp.task("assets:javascripts:clean",
  load("assets/javascripts/clean"))

/*
 * Annotate JavaScript
 */
gulp.task("assets:javascripts:annotate",
  load("assets/javascripts/annotate"))

/*
 * Lint JavaScript
 */
gulp.task("assets:javascripts:lint",
  load("assets/javascripts/lint"))

/* ----------------------------------------------------------------------------
 * Stylesheets
 * ------------------------------------------------------------------------- */

/*
 * Build stylesheets from SASS source
 */
gulp.task("assets:stylesheets:build", [
  args.clean ? "assets:stylesheets:clean" : false,
  args.lint ? "assets:stylesheets:lint" : false
].filter(t => t),
  load("assets/stylesheets/build"))

/*
 * Clean stylesheets generated by build
 */
gulp.task("assets:stylesheets:clean",
  load("assets/stylesheets/clean"))

/*
 * Lint SASS sources
 */
gulp.task("assets:stylesheets:lint",
  load("assets/stylesheets/lint"))

/* ----------------------------------------------------------------------------
 * Assets
 * ------------------------------------------------------------------------- */

/*
 * Build assets
 */
gulp.task("assets:build", [
  "assets:images:build",
  "assets:javascripts:build",
  "assets:stylesheets:build"
])

/*
 * Clean files generated by build
 */
gulp.task("assets:clean", [
  "assets:images:clean",
  "assets:javascripts:clean",
  "assets:stylesheets:clean"
])

/* ----------------------------------------------------------------------------
 * Views
 * ------------------------------------------------------------------------- */

/*
 * Minify views
 */

gulp.task("views:build", [
  args.clean ? "views:clean" : false,
  args.revision ? "assets:images:build" : false,
  args.revision ? "assets:stylesheets:build" : false,
  args.revision ? "assets:javascripts:build" : false
].filter(t => t),
  load("views/build"))

/*
 * Clean views
 */
gulp.task("views:clean",
  load("views/clean"))

/* ----------------------------------------------------------------------------
 * MkDocs
 * ------------------------------------------------------------------------- */

/*
 * Build documentation
 */
gulp.task("mkdocs:build", [
  "assets:build",
  "views:build",
  "mkdocs:clean"
], load("mkdocs/build"))

/*
 * Clean documentation build
 */
gulp.task("mkdocs:clean",
  load("mkdocs/clean"))

/*
 * Restart MkDocs server
 */
gulp.task("mkdocs:serve",
  load("mkdocs/serve"))

/* ----------------------------------------------------------------------------
 * Visual tests
 * ------------------------------------------------------------------------- */

/*
 * Generate visual tests
 */
gulp.task("tests:visual:generate", [
  args.clean ? "tests:visual:clean" : false,
  args.clean ? "assets:build" : false,
  args.clean ? "views:build" : false
].filter(t => t),
  load("tests/visual/generate"))

/*
 * Run visual tests
 */
gulp.task("tests:visual:run", [
  "tests:visual:generate"
], load("tests/visual/run"))

/*
 * Update reference images for visual tests
 */
gulp.task("tests:visual:update",
  load("tests/visual/update"))

/*
 * Clean files generated by visual tests
 */
gulp.task("tests:visual:clean",
  load("tests/visual/clean"))

/*
 * Open a SauceConnect session for manual testing
 */
gulp.task("tests:visual:session", [
  "tests:visual:generate"
], load("tests/visual/session"))

/* ----------------------------------------------------------------------------
 * Interface
 * ------------------------------------------------------------------------- */

/*
 * Build assets and documentation
 */
gulp.task("build", [
  "assets:build",
  "views:build",
  args.mkdocs ? "mkdocs:build" : false
].filter(f => f))

/*
 * Clean assets and documentation
 */
gulp.task("clean", [
  "assets:clean",
  "views:clean",
  "mkdocs:clean"
])

/*
 * Watch for changes and rebuild assets on the fly
 */
gulp.task("watch", [
  "assets:build",
  "views:build"
], () => {
  process.env.WATCH = true

  /* Start MkDocs server */
  if (args.mkdocs)
    gulp.start("mkdocs:serve")

  /* Rebuild stylesheets */
  gulp.watch([
    `${config.assets.src}/stylesheets/**/*.scss`
  ], ["assets:stylesheets:build"])

  /* Rebuild JavaScript */
  gulp.watch([
    `${config.assets.src}/javascripts/**/*.{js,jsx}`
  ], ["assets:javascripts:build:application"])

  /* Copy images */
  gulp.watch([
    `${config.assets.src}/images/**/*`
  ], ["assets:images:build"])

  /* Minify views */
  gulp.watch([
    `${config.views.src}/**/*.html`
  ], ["views:build"])
})

/*
 * Print help message
 */
gulp.task("help")

/*
 * Build assets by default
 */
gulp.task("default", ["build"])
