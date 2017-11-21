(function(e, a) { for(var i in a) e[i] = a[i]; }(window, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
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

/* ----------------------------------------------------------------------------
 * Module
 * ------------------------------------------------------------------------- */

/* eslint-disable no-underscore-dangle */
exports.default = /* JSX */{

  /**
   * Create a native DOM node from JSX's intermediate representation
   *
   * @param {string} tag - Tag name
   * @param {?Object} properties - Properties
   * @param {Array<string | number | { __html: string } | Array<HTMLElement>>}
   *   children - Child nodes
   * @return {HTMLElement} Native DOM node
   */
  createElement: function createElement(tag, properties) {
    var el = document.createElement(tag);

    /* Set all properties */
    if (properties) Array.prototype.forEach.call(Object.keys(properties), function (attr) {
      el.setAttribute(attr, properties[attr]);
    });

    /* Iterate child nodes */
    var iterateChildNodes = function iterateChildNodes(nodes) {
      Array.prototype.forEach.call(nodes, function (node) {

        /* Directly append text content */
        if (typeof node === "string" || typeof node === "number") {
          el.textContent += node;

          /* Recurse, if we got an array */
        } else if (Array.isArray(node)) {
          iterateChildNodes(node);

          /* Append raw HTML */
        } else if (typeof node.__html !== "undefined") {
          el.innerHTML += node.__html;

          /* Append regular nodes */
        } else if (node instanceof Node) {
          el.appendChild(node);
        }
      });
    };

    /* Iterate child nodes and return element */

    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    iterateChildNodes(children);
    return el;
  }
};
module.exports = exports["default"];

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var index = typeof fetch=='function' ? fetch.bind() : function(url, options) {
	options = options || {};
	return new Promise( function (resolve, reject) {
		var request = new XMLHttpRequest();

		request.open(options.method || 'get', url);

		for (var i in options.headers) {
			request.setRequestHeader(i, options.headers[i]);
		}

		request.withCredentials = options.credentials=='include';

		request.onload = function () {
			resolve(response());
		};

		request.onerror = reject;

		request.send(options.body);

		function response() {
			var keys = [],
				all = [],
				headers = {},
				header;

			request.getAllResponseHeaders().replace(/^(.*?):\s*([\s\S]*?)$/gm, function (m, key, value) {
				keys.push(key = key.toLowerCase());
				all.push([key, value]);
				header = headers[key];
				headers[key] = header ? (header + "," + value) : value;
			});

			return {
				ok: (request.status/200|0) == 1,		// 200-299
				status: request.status,
				statusText: request.statusText,
				url: request.responseURL,
				clone: response,
				text: function () { return Promise.resolve(request.responseText); },
				json: function () { return Promise.resolve(request.responseText).then(JSON.parse); },
				blob: function () { return Promise.resolve(new Blob([request.response])); },
				headers: {
					keys: function () { return keys; },
					entries: function () { return all; },
					get: function (n) { return headers[n.toLowerCase()]; },
					has: function (n) { return n.toLowerCase() in headers; }
				}
			};
		}
	});
};

/* harmony default export */ __webpack_exports__["default"] = (index);
//# sourceMappingURL=unfetch.es.js.map


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

/* ----------------------------------------------------------------------------
 * Class
 * ------------------------------------------------------------------------- */

var Listener = function () {

  /**
   * Generic event listener
   *
   * @constructor
   *
   * @property {(Array<EventTarget>)} els_ - Event targets
   * @property {Object} handler_- Event handlers
   * @property {Array<string>} events_ - Event names
   * @property {Function} update_ - Update handler
   *
   * @param {?(string|EventTarget|NodeList<EventTarget>)} els -
   *   Selector or Event targets
   * @param {(string|Array<string>)} events - Event names
   * @param {(Object|Function)} handler - Handler to be invoked
   */
  function Listener(els, events, handler) {
    var _this = this;

    _classCallCheck(this, Listener);

    this.els_ = Array.prototype.slice.call(typeof els === "string" ? document.querySelectorAll(els) : [].concat(els));

    /* Set handler as function or directly as object */
    this.handler_ = typeof handler === "function" ? { update: handler } : handler;

    /* Initialize event names and update handler */
    this.events_ = [].concat(events);
    this.update_ = function (ev) {
      return _this.handler_.update(ev);
    };
  }

  /**
   * Register listener for all relevant events
   */


  Listener.prototype.listen = function listen() {
    var _this2 = this;

    this.els_.forEach(function (el) {
      _this2.events_.forEach(function (event) {
        el.addEventListener(event, _this2.update_, false);
      });
    });

    /* Execute setup handler, if implemented */
    if (typeof this.handler_.setup === "function") this.handler_.setup();
  };

  /**
   * Unregister listener for all relevant events
   */


  Listener.prototype.unlisten = function unlisten() {
    var _this3 = this;

    this.els_.forEach(function (el) {
      _this3.events_.forEach(function (event) {
        el.removeEventListener(event, _this3.update_);
      });
    });

    /* Execute reset handler, if implemented */
    if (typeof this.handler_.reset === "function") this.handler_.reset();
  };

  return Listener;
}();

exports.default = Listener;

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(JSX) {

exports.__esModule = true;
exports.app = undefined;

__webpack_require__(6);

__webpack_require__(7);

__webpack_require__(8);

__webpack_require__(9);

__webpack_require__(10);

__webpack_require__(11);

__webpack_require__(12);

var _promisePolyfill = __webpack_require__(13);

var _promisePolyfill2 = _interopRequireDefault(_promisePolyfill);

var _clipboard = __webpack_require__(18);

var _clipboard2 = _interopRequireDefault(_clipboard);

var _fastclick = __webpack_require__(26);

var _fastclick2 = _interopRequireDefault(_fastclick);

var _Material = __webpack_require__(27);

var _Material2 = _interopRequireDefault(_Material);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

window.Promise = window.Promise || _promisePolyfill2.default;

/* ----------------------------------------------------------------------------
 * Dependencies
 * ------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------
 * Polyfills
 * ------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Return the meta tag value for the given key
 *
 * @param {string} key - Meta name
 * @param {string} [_] - Stop Flow complaining (TODO)
 *
 * @return {string} Meta content value
 */
var translate = function translate(key, _) {
  // eslint-disable-line no-unused-vars
  var meta = document.getElementsByName("lang:" + key)[0];
  if (!(meta instanceof HTMLMetaElement)) throw new ReferenceError();
  return meta.content;
};

/* ----------------------------------------------------------------------------
 * Application
 * ------------------------------------------------------------------------- */

/**
 * Initialize Material for MkDocs
 *
 * @param {Object} config - Configuration
 */
function initialize(config) {
  // eslint-disable-line func-style

  /* Initialize Modernizr and FastClick */
  new _Material2.default.Event.Listener(document, "DOMContentLoaded", function () {
    if (!(document.body instanceof HTMLElement)) throw new ReferenceError();

    /* Attach FastClick to mitigate 300ms delay on touch devices */
    _fastclick2.default.attach(document.body);

    /* Test for iOS */
    Modernizr.addTest("ios", function () {
      return !!navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
    });

    /* Wrap all data tables for better overflow scrolling */
    var tables = document.querySelectorAll("table:not([class])"); // TODO: this is JSX, we should rename the file
    Array.prototype.forEach.call(tables, function (table) {
      var wrap = JSX.createElement(
        "div",
        { "class": "md-typeset__scrollwrap" },
        JSX.createElement("div", { "class": "md-typeset__table" })
      );
      if (table.nextSibling) {
        table.parentNode.insertBefore(wrap, table.nextSibling);
      } else {
        table.parentNode.appendChild(wrap);
      }
      wrap.children[0].appendChild(table);
    });

    /* Clipboard integration */
    if (_clipboard2.default.isSupported()) {
      var blocks = document.querySelectorAll(".codehilite > pre, pre > code");
      Array.prototype.forEach.call(blocks, function (block, index) {
        var id = "__code_" + index;

        /* Create button with message container */
        var button = JSX.createElement(
          "button",
          { "class": "md-clipboard", title: translate("clipboard.copy"),
            "data-clipboard-target": "#" + id + " pre, #" + id + " code" },
          JSX.createElement("span", { "class": "md-clipboard__message" })
        );

        /* Link to block and insert button */
        var parent = block.parentNode;
        parent.id = id;
        parent.insertBefore(button, block);
      });

      /* Initialize Clipboard listener */
      var copy = new _clipboard2.default(".md-clipboard");

      /* Success handler */
      copy.on("success", function (action) {
        var message = action.trigger.querySelector(".md-clipboard__message");
        if (!(message instanceof HTMLElement)) throw new ReferenceError();

        /* Clear selection and reset debounce logic */
        action.clearSelection();
        if (message.dataset.mdTimer) clearTimeout(parseInt(message.dataset.mdTimer, 10));

        /* Set message indicating success and show it */
        message.classList.add("md-clipboard__message--active");
        message.innerHTML = translate("clipboard.copied");

        /* Hide message after two seconds */
        message.dataset.mdTimer = setTimeout(function () {
          message.classList.remove("md-clipboard__message--active");
          message.dataset.mdTimer = "";
        }, 2000).toString();
      });
    }

    /* Polyfill details/summary functionality */
    if (!Modernizr.details) {
      var _blocks = document.querySelectorAll("details > summary");
      Array.prototype.forEach.call(_blocks, function (summary) {
        summary.addEventListener("click", function (ev) {
          var details = ev.target.parentNode;
          if (details.hasAttribute("open")) {
            details.removeAttribute("open");
          } else {
            details.setAttribute("open", "");
          }
        });
      });
    }

    /* Open details after anchor jump */
    var details = function details() {
      if (document.location.hash) {
        var el = document.getElementById(document.location.hash.substring(1));
        if (!el) return;

        /* Walk up as long as we're not in a details tag */
        var parent = el.parentNode;
        while (parent && !(parent instanceof HTMLDetailsElement)) {
          parent = parent.parentNode;
        } /* If there's a details tag, open it */
        if (parent && !parent.open) {
          parent.open = true;

          /* Force reload, so the viewport repositions */
          var loc = location.hash;
          location.hash = " ";
          location.hash = loc;
        }
      }
    };
    window.addEventListener("hashchange", details);
    details();

    /* Force 1px scroll offset to trigger overflow scrolling */
    if (Modernizr.ios) {
      var scrollable = document.querySelectorAll("[data-md-scrollfix]");
      Array.prototype.forEach.call(scrollable, function (item) {
        item.addEventListener("touchstart", function () {
          var top = item.scrollTop;

          /* We're at the top of the container */
          if (top === 0) {
            item.scrollTop = 1;

            /* We're at the bottom of the container */
          } else if (top + item.offsetHeight === item.scrollHeight) {
            item.scrollTop = top - 1;
          }
        });
      });
    }
  }).listen();

  /* Component: header shadow toggle */
  new _Material2.default.Event.MatchMedia("(min-width: 1220px)", new _Material2.default.Event.Listener(window, ["scroll", "resize", "orientationchange"], new _Material2.default.Header.Shadow("[data-md-component=container]", "[data-md-component=header]")));

  /* Component: header title toggle */
  new _Material2.default.Event.Listener(window, ["scroll", "resize", "orientationchange"], new _Material2.default.Header.Title("[data-md-component=title]", ".md-typeset h1")).listen();

  /* Component: tabs visibility toggle */
  if (document.querySelector("[data-md-component=tabs]")) new _Material2.default.Event.Listener(window, ["scroll", "resize", "orientationchange"], new _Material2.default.Tabs.Toggle("[data-md-component=tabs]")).listen();

  /* Component: sidebar with navigation */
  new _Material2.default.Event.MatchMedia("(min-width: 1220px)", new _Material2.default.Event.Listener(window, ["scroll", "resize", "orientationchange"], new _Material2.default.Sidebar.Position("[data-md-component=navigation]", "[data-md-component=header]")));

  /* Component: sidebar with table of contents (missing on 404 page) */
  if (document.querySelector("[data-md-component=toc]")) new _Material2.default.Event.MatchMedia("(min-width: 960px)", new _Material2.default.Event.Listener(window, ["scroll", "resize", "orientationchange"], new _Material2.default.Sidebar.Position("[data-md-component=toc]", "[data-md-component=header]")));

  /* Component: link blurring for table of contents */
  new _Material2.default.Event.MatchMedia("(min-width: 960px)", new _Material2.default.Event.Listener(window, "scroll", new _Material2.default.Nav.Blur("[data-md-component=toc] [href]")));

  /* Component: collapsible elements for navigation */
  var collapsibles = document.querySelectorAll("[data-md-component=collapsible]");
  Array.prototype.forEach.call(collapsibles, function (collapse) {
    new _Material2.default.Event.MatchMedia("(min-width: 1220px)", new _Material2.default.Event.Listener(collapse.previousElementSibling, "click", new _Material2.default.Nav.Collapse(collapse)));
  });

  /* Component: active pane monitor for iOS scrolling fixes */
  new _Material2.default.Event.MatchMedia("(max-width: 1219px)", new _Material2.default.Event.Listener("[data-md-component=navigation] [data-md-toggle]", "change", new _Material2.default.Nav.Scrolling("[data-md-component=navigation] nav")));

  /* Component: search body lock for mobile */
  new _Material2.default.Event.MatchMedia("(max-width: 959px)", new _Material2.default.Event.Listener("[data-md-toggle=search]", "change", new _Material2.default.Search.Lock("[data-md-toggle=search]")));

  /* Component: search results */
  new _Material2.default.Event.Listener("[data-md-component=query]", ["focus", "keyup", "change"], new _Material2.default.Search.Result("[data-md-component=result]", function () {
    return fetch(config.url.base + "/" + (config.version < "0.17" ? "mkdocs" : "search") + "/search_index.json", {
      credentials: "same-origin"
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      return data.docs.map(function (doc) {
        doc.location = config.url.base + doc.location;
        return doc;
      });
    });
  })).listen();

  /* Listener: close drawer when anchor links are clicked */
  new _Material2.default.Event.MatchMedia("(max-width: 959px)", new _Material2.default.Event.Listener("[data-md-component=navigation] [href^='#']", "click", function () {
    var toggle = document.querySelector("[data-md-toggle=drawer]");
    if (!(toggle instanceof HTMLInputElement)) throw new ReferenceError();
    if (toggle.checked) {
      toggle.checked = false;
      toggle.dispatchEvent(new CustomEvent("change"));
    }
  }));

  /* Listener: focus input after form reset */
  new _Material2.default.Event.Listener("[data-md-component=reset]", "click", function () {
    setTimeout(function () {
      var query = document.querySelector("[data-md-component=query]");
      if (!(query instanceof HTMLInputElement)) throw new ReferenceError();
      query.focus();
    }, 10);
  }).listen();

  /* Listener: focus input after opening search */
  new _Material2.default.Event.Listener("[data-md-toggle=search]", "change", function (ev) {
    setTimeout(function (toggle) {
      if (!(toggle instanceof HTMLInputElement)) throw new ReferenceError();
      if (toggle.checked) {
        var query = document.querySelector("[data-md-component=query]");
        if (!(query instanceof HTMLInputElement)) throw new ReferenceError();
        query.focus();
      }
    }, 400, ev.target);
  }).listen();

  /* Listener: open search on focus */
  new _Material2.default.Event.MatchMedia("(min-width: 960px)", new _Material2.default.Event.Listener("[data-md-component=query]", "focus", function () {
    var toggle = document.querySelector("[data-md-toggle=search]");
    if (!(toggle instanceof HTMLInputElement)) throw new ReferenceError();
    if (!toggle.checked) {
      toggle.checked = true;
      toggle.dispatchEvent(new CustomEvent("change"));
    }
  }));

  /* Listener: keyboard handlers */ // eslint-disable-next-line complexity
  new _Material2.default.Event.Listener(window, "keydown", function (ev) {
    // TODO: split up into component to reduce complexity
    var toggle = document.querySelector("[data-md-toggle=search]");
    if (!(toggle instanceof HTMLInputElement)) throw new ReferenceError();
    var query = document.querySelector("[data-md-component=query]");
    if (!(query instanceof HTMLInputElement)) throw new ReferenceError();

    /* Abort if meta key (macOS) or ctrl key (Windows) is pressed */
    if (ev.metaKey || ev.ctrlKey) return;

    /* Search is open */
    if (toggle.checked) {

      /* Enter: prevent form submission */
      if (ev.keyCode === 13) {
        if (query === document.activeElement) {
          ev.preventDefault();

          /* Go to current active/focused link */
          var focus = document.querySelector("[data-md-component=search] [href][data-md-state=active]");
          if (focus instanceof HTMLLinkElement) {
            window.location = focus.getAttribute("href");

            /* Close search */
            toggle.checked = false;
            toggle.dispatchEvent(new CustomEvent("change"));
            query.blur();
          }
        }

        /* Escape: close search */
      } else if (ev.keyCode === 27) {
        toggle.checked = false;
        toggle.dispatchEvent(new CustomEvent("change"));
        query.blur();

        /* Horizontal arrows and backspace: focus input */
      } else if ([8, 37, 39].indexOf(ev.keyCode) !== -1) {
        if (query !== document.activeElement) query.focus();

        /* Vertical arrows and tab: select previous or next search result */
      } else if ([9, 38, 40].indexOf(ev.keyCode) !== -1) {
        var map = ev.shiftKey ? 38 : 40;
        var key = ev.keyCode === 9 ? map : ev.keyCode;

        /* Retrieve all results */
        var links = Array.prototype.slice.call(document.querySelectorAll("[data-md-component=query], [data-md-component=search] [href]"));

        /* Retrieve current active/focused result */
        var _focus = links.find(function (link) {
          if (!(link instanceof HTMLElement)) throw new ReferenceError();
          return link.dataset.mdState === "active";
        });
        if (_focus) _focus.dataset.mdState = "";

        /* Calculate index depending on direction, add length to form ring */
        var index = Math.max(0, (links.indexOf(_focus) + links.length + (key === 38 ? -1 : +1)) % links.length);

        /* Set active state and focus */
        if (links[index]) {
          links[index].dataset.mdState = "active";
          links[index].focus();
        }

        /* Prevent scrolling of page */
        ev.preventDefault();
        ev.stopPropagation();

        /* Return false prevents the cursor position from changing */
        return false;
      }

      /* Search is closed and we're not inside a form */
    } else if (document.activeElement && !document.activeElement.form) {

      /* F/S: Open search if not in input field */
      if (ev.keyCode === 70 || ev.keyCode === 83) {
        query.focus();
        ev.preventDefault();
      }
    }
  }).listen();

  /* Listener: focus query if in search is open and character is typed */
  new _Material2.default.Event.Listener(window, "keypress", function () {
    var toggle = document.querySelector("[data-md-toggle=search]");
    if (!(toggle instanceof HTMLInputElement)) throw new ReferenceError();
    if (toggle.checked) {
      var query = document.querySelector("[data-md-component=query]");
      if (!(query instanceof HTMLInputElement)) throw new ReferenceError();
      if (query !== document.activeElement) query.focus();
    }
  }).listen()

  /* Retrieve facts for the given repository type */
  ;(function () {
    var el = document.querySelector("[data-md-source]");
    if (!el) return _promisePolyfill2.default.resolve([]);else if (!(el instanceof HTMLAnchorElement)) throw new ReferenceError();
    switch (el.dataset.mdSource) {
      case "github":
        return new _Material2.default.Source.Adapter.GitHub(el).fetch();
      default:
        return _promisePolyfill2.default.resolve([]);
    }

    /* Render repository information */
  })().then(function (facts) {
    var sources = document.querySelectorAll("[data-md-source]");
    Array.prototype.forEach.call(sources, function (source) {
      new _Material2.default.Source.Repository(source).initialize(facts);
    });
  });
}

/* ----------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------- */

/* Provide this for downward compatibility for now */
var app = {
  initialize: initialize
};

exports.app = app;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/icons/bitbucket.svg";

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/icons/github.svg";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/icons/gitlab.svg";

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// Polyfill for creating CustomEvents on IE9/10/11

// code pulled from:
// https://github.com/d4tocchini/customevent-polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill

try {
    var ce = new window.CustomEvent('test');
    ce.preventDefault();
    if (ce.defaultPrevented !== true) {
        // IE has problems with .preventDefault() on custom events
        // http://stackoverflow.com/questions/23349191
        throw new Error('Could not prevent default');
    }
} catch(e) {
  var CustomEvent = function(event, params) {
    var evt, origPrevent;
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined
    };

    evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    origPrevent = evt.preventDefault;
    evt.preventDefault = function () {
      origPrevent.call(this);
      try {
        Object.defineProperty(this, 'defaultPrevented', {
          get: function () {
            return true;
          }
        });
      } catch(e) {
        this.defaultPrevented = true;
      }
    };
    return evt;
  };

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent; // expose definition to window
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

if (!window.fetch) window.fetch = __webpack_require__(1).default || __webpack_require__(1);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate) {(function (root) {

  // Store setTimeout reference so promise-polyfill will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var setTimeoutFunc = setTimeout;

  function noop() {}
  
  // Polyfill for Function.prototype.bind
  function bind(fn, thisArg) {
    return function () {
      fn.apply(thisArg, arguments);
    };
  }

  function Promise(fn) {
    if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
    if (typeof fn !== 'function') throw new TypeError('not a function');
    this._state = 0;
    this._handled = false;
    this._value = undefined;
    this._deferreds = [];

    doResolve(fn, this);
  }

  function handle(self, deferred) {
    while (self._state === 3) {
      self = self._value;
    }
    if (self._state === 0) {
      self._deferreds.push(deferred);
      return;
    }
    self._handled = true;
    Promise._immediateFn(function () {
      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
      if (cb === null) {
        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
        return;
      }
      var ret;
      try {
        ret = cb(self._value);
      } catch (e) {
        reject(deferred.promise, e);
        return;
      }
      resolve(deferred.promise, ret);
    });
  }

  function resolve(self, newValue) {
    try {
      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        var then = newValue.then;
        if (newValue instanceof Promise) {
          self._state = 3;
          self._value = newValue;
          finale(self);
          return;
        } else if (typeof then === 'function') {
          doResolve(bind(then, newValue), self);
          return;
        }
      }
      self._state = 1;
      self._value = newValue;
      finale(self);
    } catch (e) {
      reject(self, e);
    }
  }

  function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
  }

  function finale(self) {
    if (self._state === 2 && self._deferreds.length === 0) {
      Promise._immediateFn(function() {
        if (!self._handled) {
          Promise._unhandledRejectionFn(self._value);
        }
      });
    }

    for (var i = 0, len = self._deferreds.length; i < len; i++) {
      handle(self, self._deferreds[i]);
    }
    self._deferreds = null;
  }

  function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
  }

  /**
   * Take a potentially misbehaving resolver function and make sure
   * onFulfilled and onRejected are only called once.
   *
   * Makes no guarantees about asynchrony.
   */
  function doResolve(fn, self) {
    var done = false;
    try {
      fn(function (value) {
        if (done) return;
        done = true;
        resolve(self, value);
      }, function (reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      });
    } catch (ex) {
      if (done) return;
      done = true;
      reject(self, ex);
    }
  }

  Promise.prototype['catch'] = function (onRejected) {
    return this.then(null, onRejected);
  };

  Promise.prototype.then = function (onFulfilled, onRejected) {
    var prom = new (this.constructor)(noop);

    handle(this, new Handler(onFulfilled, onRejected, prom));
    return prom;
  };

  Promise.all = function (arr) {
    var args = Array.prototype.slice.call(arr);

    return new Promise(function (resolve, reject) {
      if (args.length === 0) return resolve([]);
      var remaining = args.length;

      function res(i, val) {
        try {
          if (val && (typeof val === 'object' || typeof val === 'function')) {
            var then = val.then;
            if (typeof then === 'function') {
              then.call(val, function (val) {
                res(i, val);
              }, reject);
              return;
            }
          }
          args[i] = val;
          if (--remaining === 0) {
            resolve(args);
          }
        } catch (ex) {
          reject(ex);
        }
      }

      for (var i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  };

  Promise.resolve = function (value) {
    if (value && typeof value === 'object' && value.constructor === Promise) {
      return value;
    }

    return new Promise(function (resolve) {
      resolve(value);
    });
  };

  Promise.reject = function (value) {
    return new Promise(function (resolve, reject) {
      reject(value);
    });
  };

  Promise.race = function (values) {
    return new Promise(function (resolve, reject) {
      for (var i = 0, len = values.length; i < len; i++) {
        values[i].then(resolve, reject);
      }
    });
  };

  // Use polyfill for setImmediate for performance gains
  Promise._immediateFn = (typeof setImmediate === 'function' && function (fn) { setImmediate(fn); }) ||
    function (fn) {
      setTimeoutFunc(fn, 0);
    };

  Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
  };

  /**
   * Set the immediate function to execute callbacks
   * @param fn {function} Function to execute
   * @deprecated
   */
  Promise._setImmediateFn = function _setImmediateFn(fn) {
    Promise._immediateFn = fn;
  };

  /**
   * Change the function to execute on unhandled rejection
   * @param {function} fn Function to execute on unhandled rejection
   * @deprecated
   */
  Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
    Promise._unhandledRejectionFn = fn;
  };
  
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Promise;
  } else if (!root.Promise) {
    root.Promise = Promise;
  }

})(this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14).setImmediate))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(15);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16), __webpack_require__(17)))

/***/ }),
/* 16 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(19), __webpack_require__(21), __webpack_require__(22)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(module, require('./clipboard-action'), require('tiny-emitter'), require('good-listener'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, global.clipboardAction, global.tinyEmitter, global.goodListener);
        global.clipboard = mod.exports;
    }
})(this, function (module, _clipboardAction, _tinyEmitter, _goodListener) {
    'use strict';

    var _clipboardAction2 = _interopRequireDefault(_clipboardAction);

    var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

    var _goodListener2 = _interopRequireDefault(_goodListener);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Clipboard = function (_Emitter) {
        _inherits(Clipboard, _Emitter);

        /**
         * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
         * @param {Object} options
         */
        function Clipboard(trigger, options) {
            _classCallCheck(this, Clipboard);

            var _this = _possibleConstructorReturn(this, (Clipboard.__proto__ || Object.getPrototypeOf(Clipboard)).call(this));

            _this.resolveOptions(options);
            _this.listenClick(trigger);
            return _this;
        }

        /**
         * Defines if attributes would be resolved using internal setter functions
         * or custom functions that were passed in the constructor.
         * @param {Object} options
         */


        _createClass(Clipboard, [{
            key: 'resolveOptions',
            value: function resolveOptions() {
                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
                this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
                this.text = typeof options.text === 'function' ? options.text : this.defaultText;
                this.container = _typeof(options.container) === 'object' ? options.container : document.body;
            }
        }, {
            key: 'listenClick',
            value: function listenClick(trigger) {
                var _this2 = this;

                this.listener = (0, _goodListener2.default)(trigger, 'click', function (e) {
                    return _this2.onClick(e);
                });
            }
        }, {
            key: 'onClick',
            value: function onClick(e) {
                var trigger = e.delegateTarget || e.currentTarget;

                if (this.clipboardAction) {
                    this.clipboardAction = null;
                }

                this.clipboardAction = new _clipboardAction2.default({
                    action: this.action(trigger),
                    target: this.target(trigger),
                    text: this.text(trigger),
                    container: this.container,
                    trigger: trigger,
                    emitter: this
                });
            }
        }, {
            key: 'defaultAction',
            value: function defaultAction(trigger) {
                return getAttributeValue('action', trigger);
            }
        }, {
            key: 'defaultTarget',
            value: function defaultTarget(trigger) {
                var selector = getAttributeValue('target', trigger);

                if (selector) {
                    return document.querySelector(selector);
                }
            }
        }, {
            key: 'defaultText',
            value: function defaultText(trigger) {
                return getAttributeValue('text', trigger);
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                this.listener.destroy();

                if (this.clipboardAction) {
                    this.clipboardAction.destroy();
                    this.clipboardAction = null;
                }
            }
        }], [{
            key: 'isSupported',
            value: function isSupported() {
                var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['copy', 'cut'];

                var actions = typeof action === 'string' ? [action] : action;
                var support = !!document.queryCommandSupported;

                actions.forEach(function (action) {
                    support = support && !!document.queryCommandSupported(action);
                });

                return support;
            }
        }]);

        return Clipboard;
    }(_tinyEmitter2.default);

    /**
     * Helper function to retrieve attribute value.
     * @param {String} suffix
     * @param {Element} element
     */
    function getAttributeValue(suffix, element) {
        var attribute = 'data-clipboard-' + suffix;

        if (!element.hasAttribute(attribute)) {
            return;
        }

        return element.getAttribute(attribute);
    }

    module.exports = Clipboard;
});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(20)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(module, require('select'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, global.select);
        global.clipboardAction = mod.exports;
    }
})(this, function (module, _select) {
    'use strict';

    var _select2 = _interopRequireDefault(_select);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var ClipboardAction = function () {
        /**
         * @param {Object} options
         */
        function ClipboardAction(options) {
            _classCallCheck(this, ClipboardAction);

            this.resolveOptions(options);
            this.initSelection();
        }

        /**
         * Defines base properties passed from constructor.
         * @param {Object} options
         */


        _createClass(ClipboardAction, [{
            key: 'resolveOptions',
            value: function resolveOptions() {
                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                this.action = options.action;
                this.container = options.container;
                this.emitter = options.emitter;
                this.target = options.target;
                this.text = options.text;
                this.trigger = options.trigger;

                this.selectedText = '';
            }
        }, {
            key: 'initSelection',
            value: function initSelection() {
                if (this.text) {
                    this.selectFake();
                } else if (this.target) {
                    this.selectTarget();
                }
            }
        }, {
            key: 'selectFake',
            value: function selectFake() {
                var _this = this;

                var isRTL = document.documentElement.getAttribute('dir') == 'rtl';

                this.removeFake();

                this.fakeHandlerCallback = function () {
                    return _this.removeFake();
                };
                this.fakeHandler = this.container.addEventListener('click', this.fakeHandlerCallback) || true;

                this.fakeElem = document.createElement('textarea');
                // Prevent zooming on iOS
                this.fakeElem.style.fontSize = '12pt';
                // Reset box model
                this.fakeElem.style.border = '0';
                this.fakeElem.style.padding = '0';
                this.fakeElem.style.margin = '0';
                // Move element out of screen horizontally
                this.fakeElem.style.position = 'absolute';
                this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
                // Move element to the same position vertically
                var yPosition = window.pageYOffset || document.documentElement.scrollTop;
                this.fakeElem.style.top = yPosition + 'px';

                this.fakeElem.setAttribute('readonly', '');
                this.fakeElem.value = this.text;

                this.container.appendChild(this.fakeElem);

                this.selectedText = (0, _select2.default)(this.fakeElem);
                this.copyText();
            }
        }, {
            key: 'removeFake',
            value: function removeFake() {
                if (this.fakeHandler) {
                    this.container.removeEventListener('click', this.fakeHandlerCallback);
                    this.fakeHandler = null;
                    this.fakeHandlerCallback = null;
                }

                if (this.fakeElem) {
                    this.container.removeChild(this.fakeElem);
                    this.fakeElem = null;
                }
            }
        }, {
            key: 'selectTarget',
            value: function selectTarget() {
                this.selectedText = (0, _select2.default)(this.target);
                this.copyText();
            }
        }, {
            key: 'copyText',
            value: function copyText() {
                var succeeded = void 0;

                try {
                    succeeded = document.execCommand(this.action);
                } catch (err) {
                    succeeded = false;
                }

                this.handleResult(succeeded);
            }
        }, {
            key: 'handleResult',
            value: function handleResult(succeeded) {
                this.emitter.emit(succeeded ? 'success' : 'error', {
                    action: this.action,
                    text: this.selectedText,
                    trigger: this.trigger,
                    clearSelection: this.clearSelection.bind(this)
                });
            }
        }, {
            key: 'clearSelection',
            value: function clearSelection() {
                if (this.trigger) {
                    this.trigger.focus();
                }

                window.getSelection().removeAllRanges();
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                this.removeFake();
            }
        }, {
            key: 'action',
            set: function set() {
                var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'copy';

                this._action = action;

                if (this._action !== 'copy' && this._action !== 'cut') {
                    throw new Error('Invalid "action" value, use either "copy" or "cut"');
                }
            },
            get: function get() {
                return this._action;
            }
        }, {
            key: 'target',
            set: function set(target) {
                if (target !== undefined) {
                    if (target && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target.nodeType === 1) {
                        if (this.action === 'copy' && target.hasAttribute('disabled')) {
                            throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                        }

                        if (this.action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
                            throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                        }

                        this._target = target;
                    } else {
                        throw new Error('Invalid "target" value, use a valid Element');
                    }
                }
            },
            get: function get() {
                return this._target;
            }
        }]);

        return ClipboardAction;
    }();

    module.exports = ClipboardAction;
});

/***/ }),
/* 20 */
/***/ (function(module, exports) {

function select(element) {
    var selectedText;

    if (element.nodeName === 'SELECT') {
        element.focus();

        selectedText = element.value;
    }
    else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
        var isReadOnly = element.hasAttribute('readonly');

        if (!isReadOnly) {
            element.setAttribute('readonly', '');
        }

        element.select();
        element.setSelectionRange(0, element.value.length);

        if (!isReadOnly) {
            element.removeAttribute('readonly');
        }

        selectedText = element.value;
    }
    else {
        if (element.hasAttribute('contenteditable')) {
            element.focus();
        }

        var selection = window.getSelection();
        var range = document.createRange();

        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);

        selectedText = selection.toString();
    }

    return selectedText;
}

module.exports = select;


/***/ }),
/* 21 */
/***/ (function(module, exports) {

function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

module.exports = E;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var is = __webpack_require__(23);
var delegate = __webpack_require__(24);

/**
 * Validates all params and calls the right
 * listener function based on its target type.
 *
 * @param {String|HTMLElement|HTMLCollection|NodeList} target
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listen(target, type, callback) {
    if (!target && !type && !callback) {
        throw new Error('Missing required arguments');
    }

    if (!is.string(type)) {
        throw new TypeError('Second argument must be a String');
    }

    if (!is.fn(callback)) {
        throw new TypeError('Third argument must be a Function');
    }

    if (is.node(target)) {
        return listenNode(target, type, callback);
    }
    else if (is.nodeList(target)) {
        return listenNodeList(target, type, callback);
    }
    else if (is.string(target)) {
        return listenSelector(target, type, callback);
    }
    else {
        throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
    }
}

/**
 * Adds an event listener to a HTML element
 * and returns a remove listener function.
 *
 * @param {HTMLElement} node
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNode(node, type, callback) {
    node.addEventListener(type, callback);

    return {
        destroy: function() {
            node.removeEventListener(type, callback);
        }
    }
}

/**
 * Add an event listener to a list of HTML elements
 * and returns a remove listener function.
 *
 * @param {NodeList|HTMLCollection} nodeList
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNodeList(nodeList, type, callback) {
    Array.prototype.forEach.call(nodeList, function(node) {
        node.addEventListener(type, callback);
    });

    return {
        destroy: function() {
            Array.prototype.forEach.call(nodeList, function(node) {
                node.removeEventListener(type, callback);
            });
        }
    }
}

/**
 * Add an event listener to a selector
 * and returns a remove listener function.
 *
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenSelector(selector, type, callback) {
    return delegate(document.body, selector, type, callback);
}

module.exports = listen;


/***/ }),
/* 23 */
/***/ (function(module, exports) {

/**
 * Check if argument is a HTML element.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.node = function(value) {
    return value !== undefined
        && value instanceof HTMLElement
        && value.nodeType === 1;
};

/**
 * Check if argument is a list of HTML elements.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.nodeList = function(value) {
    var type = Object.prototype.toString.call(value);

    return value !== undefined
        && (type === '[object NodeList]' || type === '[object HTMLCollection]')
        && ('length' in value)
        && (value.length === 0 || exports.node(value[0]));
};

/**
 * Check if argument is a string.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.string = function(value) {
    return typeof value === 'string'
        || value instanceof String;
};

/**
 * Check if argument is a function.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.fn = function(value) {
    var type = Object.prototype.toString.call(value);

    return type === '[object Function]';
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var closest = __webpack_require__(25);

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function() {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    }
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function(e) {
        e.delegateTarget = closest(e.target, selector);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    }
}

module.exports = delegate;


/***/ }),
/* 25 */
/***/ (function(module, exports) {

var DOCUMENT_NODE_TYPE = 9;

/**
 * A polyfill for Element.matches()
 */
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
    var proto = Element.prototype;

    proto.matches = proto.matchesSelector ||
                    proto.mozMatchesSelector ||
                    proto.msMatchesSelector ||
                    proto.oMatchesSelector ||
                    proto.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
function closest (element, selector) {
    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
        if (typeof element.matches === 'function' &&
            element.matches(selector)) {
          return element;
        }
        element = element.parentNode;
    }
}

module.exports = closest;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;;(function () {
	'use strict';

	/**
	 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
	 *
	 * @codingstandard ftlabs-jsv2
	 * @copyright The Financial Times Limited [All Rights Reserved]
	 * @license MIT License (see LICENSE.txt)
	 */

	/*jslint browser:true, node:true*/
	/*global define, Event, Node*/


	/**
	 * Instantiate fast-clicking listeners on the specified layer.
	 *
	 * @constructor
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	function FastClick(layer, options) {
		var oldOnClick;

		options = options || {};

		/**
		 * Whether a click is currently being tracked.
		 *
		 * @type boolean
		 */
		this.trackingClick = false;


		/**
		 * Timestamp for when click tracking started.
		 *
		 * @type number
		 */
		this.trackingClickStart = 0;


		/**
		 * The element being tracked for a click.
		 *
		 * @type EventTarget
		 */
		this.targetElement = null;


		/**
		 * X-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartX = 0;


		/**
		 * Y-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartY = 0;


		/**
		 * ID of the last touch, retrieved from Touch.identifier.
		 *
		 * @type number
		 */
		this.lastTouchIdentifier = 0;


		/**
		 * Touchmove boundary, beyond which a click will be cancelled.
		 *
		 * @type number
		 */
		this.touchBoundary = options.touchBoundary || 10;


		/**
		 * The FastClick layer.
		 *
		 * @type Element
		 */
		this.layer = layer;

		/**
		 * The minimum time between tap(touchstart and touchend) events
		 *
		 * @type number
		 */
		this.tapDelay = options.tapDelay || 200;

		/**
		 * The maximum time for a tap
		 *
		 * @type number
		 */
		this.tapTimeout = options.tapTimeout || 700;

		if (FastClick.notNeeded(layer)) {
			return;
		}

		// Some old versions of Android don't have Function.prototype.bind
		function bind(method, context) {
			return function() { return method.apply(context, arguments); };
		}


		var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
		var context = this;
		for (var i = 0, l = methods.length; i < l; i++) {
			context[methods[i]] = bind(context[methods[i]], context);
		}

		// Set up event handlers as required
		if (deviceIsAndroid) {
			layer.addEventListener('mouseover', this.onMouse, true);
			layer.addEventListener('mousedown', this.onMouse, true);
			layer.addEventListener('mouseup', this.onMouse, true);
		}

		layer.addEventListener('click', this.onClick, true);
		layer.addEventListener('touchstart', this.onTouchStart, false);
		layer.addEventListener('touchmove', this.onTouchMove, false);
		layer.addEventListener('touchend', this.onTouchEnd, false);
		layer.addEventListener('touchcancel', this.onTouchCancel, false);

		// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
		// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
		// layer when they are cancelled.
		if (!Event.prototype.stopImmediatePropagation) {
			layer.removeEventListener = function(type, callback, capture) {
				var rmv = Node.prototype.removeEventListener;
				if (type === 'click') {
					rmv.call(layer, type, callback.hijacked || callback, capture);
				} else {
					rmv.call(layer, type, callback, capture);
				}
			};

			layer.addEventListener = function(type, callback, capture) {
				var adv = Node.prototype.addEventListener;
				if (type === 'click') {
					adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
						if (!event.propagationStopped) {
							callback(event);
						}
					}), capture);
				} else {
					adv.call(layer, type, callback, capture);
				}
			};
		}

		// If a handler is already declared in the element's onclick attribute, it will be fired before
		// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
		// adding it as listener.
		if (typeof layer.onclick === 'function') {

			// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
			// - the old one won't work if passed to addEventListener directly.
			oldOnClick = layer.onclick;
			layer.addEventListener('click', function(event) {
				oldOnClick(event);
			}, false);
			layer.onclick = null;
		}
	}

	/**
	* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
	*
	* @type boolean
	*/
	var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

	/**
	 * Android requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


	/**
	 * iOS requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


	/**
	 * iOS 4 requires an exception for select elements.
	 *
	 * @type boolean
	 */
	var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


	/**
	 * iOS 6.0-7.* requires the target element to be manually derived
	 *
	 * @type boolean
	 */
	var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

	/**
	 * BlackBerry requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

	/**
	 * Determine whether a given element requires a native click.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element needs a native click
	 */
	FastClick.prototype.needsClick = function(target) {
		switch (target.nodeName.toLowerCase()) {

		// Don't send a synthetic click to disabled inputs (issue #62)
		case 'button':
		case 'select':
		case 'textarea':
			if (target.disabled) {
				return true;
			}

			break;
		case 'input':

			// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
			if ((deviceIsIOS && target.type === 'file') || target.disabled) {
				return true;
			}

			break;
		case 'label':
		case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
		case 'video':
			return true;
		}

		return (/\bneedsclick\b/).test(target.className);
	};


	/**
	 * Determine whether a given element requires a call to focus to simulate click into element.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
	 */
	FastClick.prototype.needsFocus = function(target) {
		switch (target.nodeName.toLowerCase()) {
		case 'textarea':
			return true;
		case 'select':
			return !deviceIsAndroid;
		case 'input':
			switch (target.type) {
			case 'button':
			case 'checkbox':
			case 'file':
			case 'image':
			case 'radio':
			case 'submit':
				return false;
			}

			// No point in attempting to focus disabled inputs
			return !target.disabled && !target.readOnly;
		default:
			return (/\bneedsfocus\b/).test(target.className);
		}
	};


	/**
	 * Send a click event to the specified element.
	 *
	 * @param {EventTarget|Element} targetElement
	 * @param {Event} event
	 */
	FastClick.prototype.sendClick = function(targetElement, event) {
		var clickEvent, touch;

		// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
		if (document.activeElement && document.activeElement !== targetElement) {
			document.activeElement.blur();
		}

		touch = event.changedTouches[0];

		// Synthesise a click event, with an extra attribute so it can be tracked
		clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		clickEvent.forwardedTouchEvent = true;
		targetElement.dispatchEvent(clickEvent);
	};

	FastClick.prototype.determineEventType = function(targetElement) {

		//Issue #159: Android Chrome Select Box does not open with a synthetic click event
		if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
			return 'mousedown';
		}

		return 'click';
	};


	/**
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.focus = function(targetElement) {
		var length;

		// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
		if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
			length = targetElement.value.length;
			targetElement.setSelectionRange(length, length);
		} else {
			targetElement.focus();
		}
	};


	/**
	 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
	 *
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.updateScrollParent = function(targetElement) {
		var scrollParent, parentElement;

		scrollParent = targetElement.fastClickScrollParent;

		// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
		// target element was moved to another parent.
		if (!scrollParent || !scrollParent.contains(targetElement)) {
			parentElement = targetElement;
			do {
				if (parentElement.scrollHeight > parentElement.offsetHeight) {
					scrollParent = parentElement;
					targetElement.fastClickScrollParent = parentElement;
					break;
				}

				parentElement = parentElement.parentElement;
			} while (parentElement);
		}

		// Always update the scroll top tracker if possible.
		if (scrollParent) {
			scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
		}
	};


	/**
	 * @param {EventTarget} targetElement
	 * @returns {Element|EventTarget}
	 */
	FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

		// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
		if (eventTarget.nodeType === Node.TEXT_NODE) {
			return eventTarget.parentNode;
		}

		return eventTarget;
	};


	/**
	 * On touch start, record the position and scroll offset.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchStart = function(event) {
		var targetElement, touch, selection;

		// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
		if (event.targetTouches.length > 1) {
			return true;
		}

		targetElement = this.getTargetElementFromEventTarget(event.target);
		touch = event.targetTouches[0];

		if (deviceIsIOS) {

			// Only trusted events will deselect text on iOS (issue #49)
			selection = window.getSelection();
			if (selection.rangeCount && !selection.isCollapsed) {
				return true;
			}

			if (!deviceIsIOS4) {

				// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
				// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
				// with the same identifier as the touch event that previously triggered the click that triggered the alert.
				// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
				// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
				// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
				// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
				// random integers, it's safe to to continue if the identifier is 0 here.
				if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
					event.preventDefault();
					return false;
				}

				this.lastTouchIdentifier = touch.identifier;

				// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
				// 1) the user does a fling scroll on the scrollable layer
				// 2) the user stops the fling scroll with another tap
				// then the event.target of the last 'touchend' event will be the element that was under the user's finger
				// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
				// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
				this.updateScrollParent(targetElement);
			}
		}

		this.trackingClick = true;
		this.trackingClickStart = event.timeStamp;
		this.targetElement = targetElement;

		this.touchStartX = touch.pageX;
		this.touchStartY = touch.pageY;

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			event.preventDefault();
		}

		return true;
	};


	/**
	 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.touchHasMoved = function(event) {
		var touch = event.changedTouches[0], boundary = this.touchBoundary;

		if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
			return true;
		}

		return false;
	};


	/**
	 * Update the last position.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchMove = function(event) {
		if (!this.trackingClick) {
			return true;
		}

		// If the touch has moved, cancel the click tracking
		if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
			this.trackingClick = false;
			this.targetElement = null;
		}

		return true;
	};


	/**
	 * Attempt to find the labelled control for the given label element.
	 *
	 * @param {EventTarget|HTMLLabelElement} labelElement
	 * @returns {Element|null}
	 */
	FastClick.prototype.findControl = function(labelElement) {

		// Fast path for newer browsers supporting the HTML5 control attribute
		if (labelElement.control !== undefined) {
			return labelElement.control;
		}

		// All browsers under test that support touch events also support the HTML5 htmlFor attribute
		if (labelElement.htmlFor) {
			return document.getElementById(labelElement.htmlFor);
		}

		// If no for attribute exists, attempt to retrieve the first labellable descendant element
		// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
		return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	};


	/**
	 * On touch end, determine whether to send a click event at once.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchEnd = function(event) {
		var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

		if (!this.trackingClick) {
			return true;
		}

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			this.cancelNextClick = true;
			return true;
		}

		if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
			return true;
		}

		// Reset to prevent wrong click cancel on input (issue #156).
		this.cancelNextClick = false;

		this.lastClickTime = event.timeStamp;

		trackingClickStart = this.trackingClickStart;
		this.trackingClick = false;
		this.trackingClickStart = 0;

		// On some iOS devices, the targetElement supplied with the event is invalid if the layer
		// is performing a transition or scroll, and has to be re-detected manually. Note that
		// for this to function correctly, it must be called *after* the event target is checked!
		// See issue #57; also filed as rdar://13048589 .
		if (deviceIsIOSWithBadTarget) {
			touch = event.changedTouches[0];

			// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
			targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
			targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
		}

		targetTagName = targetElement.tagName.toLowerCase();
		if (targetTagName === 'label') {
			forElement = this.findControl(targetElement);
			if (forElement) {
				this.focus(targetElement);
				if (deviceIsAndroid) {
					return false;
				}

				targetElement = forElement;
			}
		} else if (this.needsFocus(targetElement)) {

			// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
			// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
			if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
				this.targetElement = null;
				return false;
			}

			this.focus(targetElement);
			this.sendClick(targetElement, event);

			// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
			// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
			if (!deviceIsIOS || targetTagName !== 'select') {
				this.targetElement = null;
				event.preventDefault();
			}

			return false;
		}

		if (deviceIsIOS && !deviceIsIOS4) {

			// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
			// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
			scrollParent = targetElement.fastClickScrollParent;
			if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
				return true;
			}
		}

		// Prevent the actual click from going though - unless the target node is marked as requiring
		// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
		if (!this.needsClick(targetElement)) {
			event.preventDefault();
			this.sendClick(targetElement, event);
		}

		return false;
	};


	/**
	 * On touch cancel, stop tracking the click.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.onTouchCancel = function() {
		this.trackingClick = false;
		this.targetElement = null;
	};


	/**
	 * Determine mouse events which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onMouse = function(event) {

		// If a target element was never set (because a touch event was never fired) allow the event
		if (!this.targetElement) {
			return true;
		}

		if (event.forwardedTouchEvent) {
			return true;
		}

		// Programmatically generated events targeting a specific element should be permitted
		if (!event.cancelable) {
			return true;
		}

		// Derive and check the target element to see whether the mouse event needs to be permitted;
		// unless explicitly enabled, prevent non-touch click events from triggering actions,
		// to prevent ghost/doubleclicks.
		if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

			// Prevent any user-added listeners declared on FastClick element from being fired.
			if (event.stopImmediatePropagation) {
				event.stopImmediatePropagation();
			} else {

				// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
				event.propagationStopped = true;
			}

			// Cancel the event
			event.stopPropagation();
			event.preventDefault();

			return false;
		}

		// If the mouse event is permitted, return true for the action to go through.
		return true;
	};


	/**
	 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
	 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
	 * an actual click which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onClick = function(event) {
		var permitted;

		// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
		if (this.trackingClick) {
			this.targetElement = null;
			this.trackingClick = false;
			return true;
		}

		// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
		if (event.target.type === 'submit' && event.detail === 0) {
			return true;
		}

		permitted = this.onMouse(event);

		// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
		if (!permitted) {
			this.targetElement = null;
		}

		// If clicks are permitted, return true for the action to go through.
		return permitted;
	};


	/**
	 * Remove all FastClick's event listeners.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.destroy = function() {
		var layer = this.layer;

		if (deviceIsAndroid) {
			layer.removeEventListener('mouseover', this.onMouse, true);
			layer.removeEventListener('mousedown', this.onMouse, true);
			layer.removeEventListener('mouseup', this.onMouse, true);
		}

		layer.removeEventListener('click', this.onClick, true);
		layer.removeEventListener('touchstart', this.onTouchStart, false);
		layer.removeEventListener('touchmove', this.onTouchMove, false);
		layer.removeEventListener('touchend', this.onTouchEnd, false);
		layer.removeEventListener('touchcancel', this.onTouchCancel, false);
	};


	/**
	 * Check whether FastClick is needed.
	 *
	 * @param {Element} layer The layer to listen on
	 */
	FastClick.notNeeded = function(layer) {
		var metaViewport;
		var chromeVersion;
		var blackberryVersion;
		var firefoxVersion;

		// Devices that don't support touch don't need FastClick
		if (typeof window.ontouchstart === 'undefined') {
			return true;
		}

		// Chrome version - zero for other browsers
		chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (chromeVersion) {

			if (deviceIsAndroid) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// Chrome 32 and above with width=device-width or less don't need FastClick
					if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}

			// Chrome desktop doesn't need FastClick (issue #15)
			} else {
				return true;
			}
		}

		if (deviceIsBlackBerry10) {
			blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

			// BlackBerry 10.3+ does not require Fastclick library.
			// https://github.com/ftlabs/fastclick/issues/251
			if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// user-scalable=no eliminates click delay.
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// width=device-width (or less than device-width) eliminates click delay.
					if (document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}
			}
		}

		// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
		if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		// Firefox version - zero for other browsers
		firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (firefoxVersion >= 27) {
			// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
				return true;
			}
		}

		// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
		// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
		if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		return false;
	};


	/**
	 * Factory method for creating a FastClick object
	 *
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	FastClick.attach = function(layer, options) {
		return new FastClick(layer, options);
	};


	if (true) {

		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return FastClick;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = FastClick.attach;
		module.exports.FastClick = FastClick;
	} else {
		window.FastClick = FastClick;
	}
}());


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _Event = __webpack_require__(28);

var _Event2 = _interopRequireDefault(_Event);

var _Header = __webpack_require__(30);

var _Header2 = _interopRequireDefault(_Header);

var _Nav = __webpack_require__(33);

var _Nav2 = _interopRequireDefault(_Nav);

var _Search = __webpack_require__(37);

var _Search2 = _interopRequireDefault(_Search);

var _Sidebar = __webpack_require__(42);

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _Source = __webpack_require__(44);

var _Source2 = _interopRequireDefault(_Source);

var _Tabs = __webpack_require__(50);

var _Tabs2 = _interopRequireDefault(_Tabs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* ----------------------------------------------------------------------------
 * Module
 * ------------------------------------------------------------------------- */

exports.default = {
  Event: _Event2.default,
  Header: _Header2.default,
  Nav: _Nav2.default,
  Search: _Search2.default,
  Sidebar: _Sidebar2.default,
  Source: _Source2.default,
  Tabs: _Tabs2.default
}; /*
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

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _Listener = __webpack_require__(2);

var _Listener2 = _interopRequireDefault(_Listener);

var _MatchMedia = __webpack_require__(29);

var _MatchMedia2 = _interopRequireDefault(_MatchMedia);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* ----------------------------------------------------------------------------
 * Module
 * ------------------------------------------------------------------------- */

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

exports.default = {
  Listener: _Listener2.default,
  MatchMedia: _MatchMedia2.default
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _Listener = __webpack_require__(2);

var _Listener2 = _interopRequireDefault(_Listener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
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

// eslint-disable-line no-unused-vars

/* ----------------------------------------------------------------------------
 * Class
 * ------------------------------------------------------------------------- */

var MatchMedia =

/**
 * Media query listener
 *
 * This class listens for state changes of media queries and automatically
 * switches the given listeners on or off.
 *
 * @constructor
 *
 * @property {Function} handler_ - Media query event handler
 *
 * @param {string} query - Media query to test for
 * @param {Listener} listener - Event listener
 */
function MatchMedia(query, listener) {
  _classCallCheck(this, MatchMedia);

  this.handler_ = function (mq) {
    if (mq.matches) listener.listen();else listener.unlisten();
  };

  /* Initialize media query listener */
  var media = window.matchMedia(query);
  media.addListener(this.handler_);

  /* Always check at initialization */
  this.handler_(media);
};

exports.default = MatchMedia;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _Shadow = __webpack_require__(31);

var _Shadow2 = _interopRequireDefault(_Shadow);

var _Title = __webpack_require__(32);

var _Title2 = _interopRequireDefault(_Title);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* ----------------------------------------------------------------------------
 * Module
 * ------------------------------------------------------------------------- */

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

exports.default = {
  Shadow: _Shadow2.default,
  Title: _Title2.default
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

/* ----------------------------------------------------------------------------
 * Class
 * ------------------------------------------------------------------------- */

var Shadow = function () {

  /**
   * Show or hide header shadow depending on page y-offset
   *
   * @constructor
   *
   * @property {HTMLElement} el_ - Content container
   * @property {HTMLElement} header_ - Header
   * @property {number} height_ - Offset height of previous nodes
   * @property {boolean} active_ - Header shadow state
   *
   * @param {(string|HTMLElement)} el - Selector or HTML element
   * @param {(string|HTMLElement)} header - Selector or HTML element
   */
  function Shadow(el, header) {
    _classCallCheck(this, Shadow);

    var ref = typeof el === "string" ? document.querySelector(el) : el;
    if (!(ref instanceof HTMLElement) || !(ref.parentNode instanceof HTMLElement)) throw new ReferenceError();
    this.el_ = ref.parentNode;

    /* Retrieve header */
    ref = typeof header === "string" ? document.querySelector(header) : header;
    if (!(ref instanceof HTMLElement)) throw new ReferenceError();
    this.header_ = ref;

    /* Initialize height and state */
    this.height_ = 0;
    this.active_ = false;
  }

  /**
   * Calculate total height of previous nodes
   */


  Shadow.prototype.setup = function setup() {
    var current = this.el_;
    while (current = current.previousElementSibling) {
      if (!(current instanceof HTMLElement)) throw new ReferenceError();
      this.height_ += current.offsetHeight;
    }
    this.update();
  };

  /**
   * Update shadow state
   */


  Shadow.prototype.update = function update() {
    var active = window.pageYOffset >= this.height_;
    if (active !== this.active_) this.header_.dataset.mdState = (this.active_ = active) ? "shadow" : "";
  };

  /**
   * Reset shadow state
   */


  Shadow.prototype.reset = function reset() {
    this.header_.dataset.mdState = "";
    this.height_ = 0;
    this.active_ = false;
  };

  return Shadow;
}();

exports.default = Shadow;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

/* ----------------------------------------------------------------------------
 * Class
 * ------------------------------------------------------------------------- */

var Title = function () {

  /**
   * Swap header title topics when header is scrolled past
   *
   * @constructor
   *
   * @property {HTMLElement} el_ - Element
   * @property {HTMLElement} header_ - Header
   * @property {boolean} active_ - Title state
   *
   * @param {(string|HTMLElement)} el - Selector or HTML element
   * @param {(string|HTMLHeadingElement)} header - Selector or HTML element
   */
  function Title(el, header) {
    _classCallCheck(this, Title);

    var ref = typeof el === "string" ? document.querySelector(el) : el;
    if (!(ref instanceof HTMLElement)) throw new ReferenceError();
    this.el_ = ref;

    /* Retrieve header */
    ref = typeof header === "string" ? document.querySelector(header) : header;
    if (!(ref instanceof HTMLHeadingElement)) throw new ReferenceError();
    this.header_ = ref;

    /* Initialize state */
    this.active_ = false;
  }

  /**
   * Setup title state
   */


  Title.prototype.setup = function setup() {
    var _this = this;

    Array.prototype.forEach.call(this.el_.children, function (node) {
      // TODO: use childNodes here for IE?
      node.style.width = _this.el_.offsetWidth - 20 + "px";
    });
  };

  /**
   * Update title state
   *
   * @param {Event} ev - Event
   */


  Title.prototype.update = function update(ev) {
    var _this2 = this;

    var active = window.pageYOffset >= this.header_.offsetTop;
    if (active !== this.active_) this.el_.dataset.mdState = (this.active_ = active) ? "active" : "";

    /* Hack: induce ellipsis on topics */
    if (ev.type === "resize") {
      Array.prototype.forEach.call(this.el_.children, function (node) {
        node.style.width = _this2.el_.offsetWidth - 20 + "px";
      });
    }
  };

  /**
   * Reset title state
   */


  Title.prototype.reset = function reset() {
    this.el_.dataset.mdState = "";
    this.el_.style.width = "";
    this.active_ = false;
  };

  return Title;
}();

exports.default = Title;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _Blur = __webpack_require__(34);

var _Blur2 = _interopRequireDefault(_Blur);

var _Collapse = __webpack_require__(35);

var _Collapse2 = _interopRequireDefault(_Collapse);

var _Scrolling = __webpack_require__(36);

var _Scrolling2 = _interopRequireDefault(_Scrolling);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* ----------------------------------------------------------------------------
 * Module
 * ------------------------------------------------------------------------- */

exports.default = {
  Blur: _Blur2.default,
  Collapse: _Collapse2.default,
  Scrolling: _Scrolling2.default
}; /*
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

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

/* ----------------------------------------------------------------------------
 * Class
 * ------------------------------------------------------------------------- */

var Blur = function () {

  /**
   * Blur links within the table of contents above current page y-offset
   *
   * @constructor
   *
   * @property {NodeList<HTMLElement>} els_ - Table of contents links
   * @property {Array<HTMLElement>} anchors_ - Referenced anchor nodes
   * @property {number} index_ - Current link index
   * @property {number} offset_ - Current page y-offset
   * @property {boolean} dir_ - Scroll direction change
   *
   * @param {(string|NodeList<HTMLElement>)} els - Selector or HTML elements
   */
  function Blur(els) {
    _classCallCheck(this, Blur);

    this.els_ = typeof els === "string" ? document.querySelectorAll(els) : els;

    /* Initialize index and page y-offset */
    this.index_ = 0;
    this.offset_ = window.pageYOffset;

    /* Necessary state to correctly reset the index */
    this.dir_ = false;

    /* Index anchor node offsets for fast lookup */
    this.anchors_ = [].reduce.call(this.els_, function (anchors, el) {
      return anchors.concat(document.getElementById(el.hash.substring(1)) || []);
    }, []);
  }

  /**
   * Initialize blur states
   */


  Blur.prototype.setup = function setup() {
    this.update();
  };

  /**
   * Update blur states
   *
   * Deduct the static offset of the header (56px) and sidebar offset (24px),
   * see _permalinks.scss for more information.
   */


  Blur.prototype.update = function update() {
    var offset = window.pageYOffset;
    var dir = this.offset_ - offset < 0;

    /* Hack: reset index if direction changed to catch very fast scrolling,
       because otherwise we would have to register a timer and that sucks */
    if (this.dir_ !== dir) this.index_ = dir ? this.index_ = 0 : this.index_ = this.els_.length - 1;

    /* Exit when there are no anchors */
    if (this.anchors_.length === 0) return;

    /* Scroll direction is down */
    if (this.offset_ <= offset) {
      for (var i = this.index_ + 1; i < this.els_.length; i++) {
        if (this.anchors_[i].offsetTop - (56 + 24) <= offset) {
          if (i > 0) this.els_[i - 1].dataset.mdState = "blur";
          this.index_ = i;
        } else {
          break;
        }
      }

      /* Scroll direction is up */
    } else {
      for (var _i = this.index_; _i >= 0; _i--) {
        if (this.anchors_[_i].offsetTop - (56 + 24) > offset) {
          if (_i > 0) this.els_[_i - 1].dataset.mdState = "";
        } else {
          this.index_ = _i;
          break;
        }
      }
    }

    /* Remember current offset and direction for next iteration */
    this.offset_ = offset;
    this.dir_ = dir;
  };

  /**
   * Reset blur states
   */


  Blur.prototype.reset = function reset() {
    Array.prototype.forEach.call(this.els_, function (el) {
      el.dataset.mdState = "";
    });

    /* Reset index and page y-offset */
    this.index_ = 0;
    this.offset_ = window.pageYOffset;
  };

  return Blur;
}();

exports.default = Blur;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

/* ----------------------------------------------------------------------------
 * Class
 * ------------------------------------------------------------------------- */

var Collapse = function () {

  /**
   * Expand or collapse navigation on toggle
   *
   * @constructor
   *
   * @property {HTMLElement} el_ - Navigation list
   *
   * @param {(string|HTMLElement)} el - Selector or HTML element
   */
  function Collapse(el) {
    _classCallCheck(this, Collapse);

    var ref = typeof el === "string" ? document.querySelector(el) : el;
    if (!(ref instanceof HTMLElement)) throw new ReferenceError();
    this.el_ = ref;
  }

  /**
   * Animate expand and collapse smoothly
   *
   * Internet Explorer 11 is very slow at recognizing changes on the dataset
   * which results in the menu not expanding or collapsing properly. THerefore,
   * for reasons of compatibility, the attribute accessors are used.
   */


  Collapse.prototype.update = function update() {
    var _this = this;

    var current = this.el_.getBoundingClientRect().height;

    /* Expanded, so collapse */
    if (current) {
      this.el_.style.maxHeight = current + "px";
      requestAnimationFrame(function () {
        _this.el_.setAttribute("data-md-state", "animate");
        _this.el_.style.maxHeight = "0px";
      });

      /* Collapsed, so expand */
    } else {
      this.el_.setAttribute("data-md-state", "expand");
      this.el_.style.maxHeight = "";

      /* Read height and unset pseudo-toggled state */
      var height = this.el_.getBoundingClientRect().height;
      this.el_.removeAttribute("data-md-state");

      /* Set initial state and animate */
      this.el_.style.maxHeight = "0px";
      requestAnimationFrame(function () {
        _this.el_.setAttribute("data-md-state", "animate");
        _this.el_.style.maxHeight = height + "px";
      });
    }

    /* Remove state on end of transition */
    var end = function end(ev) {
      var target = ev.target;
      if (!(target instanceof HTMLElement)) throw new ReferenceError();

      /* Reset height and state */
      target.removeAttribute("data-md-state");
      target.style.maxHeight = "";

      /* Only fire once, so directly remove event listener */
      target.removeEventListener("transitionend", end);
    };
    this.el_.addEventListener("transitionend", end, false);
  };

  /**
   * Reset height and pseudo-toggled state
   */


  Collapse.prototype.reset = function reset() {
    this.el_.dataset.mdState = "";
    this.el_.style.maxHeight = "";
  };

  return Collapse;
}();

exports.default = Collapse;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

/* ----------------------------------------------------------------------------
 * Class
 * ------------------------------------------------------------------------- */

var Scrolling = function () {

  /**
   * Set overflow scrolling on the current active pane (for iOS)
   *
   * @constructor
   *
   * @property {HTMLElement} el_ - Primary navigation
   *
   * @param {(string|HTMLElement)} el - Selector or HTML element
   */
  function Scrolling(el) {
    _classCallCheck(this, Scrolling);

    var ref = typeof el === "string" ? document.querySelector(el) : el;
    if (!(ref instanceof HTMLElement)) throw new ReferenceError();
    this.el_ = ref;
  }

  /**
   * Setup panes
   */


  Scrolling.prototype.setup = function setup() {

    /* Initially set overflow scrolling on main pane */
    var main = this.el_.children[this.el_.children.length - 1];
    main.style.webkitOverflowScrolling = "touch";

    /* Find all toggles and check which one is active */
    var toggles = this.el_.querySelectorAll("[data-md-toggle]");
    Array.prototype.forEach.call(toggles, function (toggle) {
      if (!(toggle instanceof HTMLInputElement)) throw new ReferenceError();
      if (toggle.checked) {

        /* Find corresponding navigational pane */
        var pane = toggle.nextElementSibling;
        if (!(pane instanceof HTMLElement)) throw new ReferenceError();
        while (pane.tagName !== "NAV" && pane.nextElementSibling) {
          pane = pane.nextElementSibling;
        } /* Check references */
        if (!(toggle.parentNode instanceof HTMLElement) || !(toggle.parentNode.parentNode instanceof HTMLElement)) throw new ReferenceError();

        /* Find current and parent list elements */
        var parent = toggle.parentNode.parentNode;
        var target = pane.children[pane.children.length - 1];

        /* Always reset all lists when transitioning */
        parent.style.webkitOverflowScrolling = "";
        target.style.webkitOverflowScrolling = "touch";
      }
    });
  };

  /**
   * Update active panes
   *
   * @param {Event} ev - Change event
   */


  Scrolling.prototype.update = function update(ev) {
    var target = ev.target;
    if (!(target instanceof HTMLElement)) throw new ReferenceError();

    /* Find corresponding navigational pane */
    var pane = target.nextElementSibling;
    if (!(pane instanceof HTMLElement)) throw new ReferenceError();
    while (pane.tagName !== "NAV" && pane.nextElementSibling) {
      pane = pane.nextElementSibling;
    } /* Check references */
    if (!(target.parentNode instanceof HTMLElement) || !(target.parentNode.parentNode instanceof HTMLElement)) throw new ReferenceError();

    /* Find parent and active panes */
    var parent = target.parentNode.parentNode;
    var active = pane.children[pane.children.length - 1];

    /* Always reset all lists when transitioning */
    parent.style.webkitOverflowScrolling = "";
    active.style.webkitOverflowScrolling = "";

    /* Set overflow scrolling on parent pane */
    if (!target.checked) {
      var end = function end() {
        if (pane instanceof HTMLElement) {
          parent.style.webkitOverflowScrolling = "touch";
          pane.removeEventListener("transitionend", end);
        }
      };
      pane.addEventListener("transitionend", end, false);
    }

    /* Set overflow scrolling on active pane */
    if (target.checked) {
      var _end = function _end() {
        if (pane instanceof HTMLElement) {
          active.style.webkitOverflowScrolling = "touch";
          pane.removeEventListener("transitionend", _end);
        }
      };
      pane.addEventListener("transitionend", _end, false);
    }
  };

  /**
   * Reset panes
   */


  Scrolling.prototype.reset = function reset() {

    /* Reset overflow scrolling on main pane */
    this.el_.children[1].style.webkitOverflowScrolling = "";

    /* Find all toggles and check which one is active */
    var toggles = this.el_.querySelectorAll("[data-md-toggle]");
    Array.prototype.forEach.call(toggles, function (toggle) {
      if (!(toggle instanceof HTMLInputElement)) throw new ReferenceError();
      if (toggle.checked) {

        /* Find corresponding navigational pane */
        var pane = toggle.nextElementSibling;
        if (!(pane instanceof HTMLElement)) throw new ReferenceError();
        while (pane.tagName !== "NAV" && pane.nextElementSibling) {
          pane = pane.nextElementSibling;
        } /* Check references */
        if (!(toggle.parentNode instanceof HTMLElement) || !(toggle.parentNode.parentNode instanceof HTMLElement)) throw new ReferenceError();

        /* Find parent and active panes */
        var parent = toggle.parentNode.parentNode;
        var active = pane.children[pane.children.length - 1];

        /* Always reset all lists when transitioning */
        parent.style.webkitOverflowScrolling = "";
        active.style.webkitOverflowScrolling = "";
      }
    });
  };

  return Scrolling;
}();

exports.default = Scrolling;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _Lock = __webpack_require__(38);

var _Lock2 = _interopRequireDefault(_Lock);

var _Result = __webpack_require__(39);

var _Result2 = _interopRequireDefault(_Result);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* ----------------------------------------------------------------------------
 * Module
 * ------------------------------------------------------------------------- */

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

exports.default = {
  Lock: _Lock2.default,
  Result: _Result2.default
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

/* ----------------------------------------------------------------------------
 * Class
 * ------------------------------------------------------------------------- */

var Lock = function () {

  /**
   * Lock body for full-screen search modal
   *
   * @constructor
   *
   * @property {HTMLInputElement} el_ - Lock toggle
   * @property {HTMLElement} lock_ - Element to lock (document body)
   * @property {number} offset_ - Current page y-offset
   *
   * @param {(string|HTMLElement)} el - Selector or HTML element
   */
  function Lock(el) {
    _classCallCheck(this, Lock);

    var ref = typeof el === "string" ? document.querySelector(el) : el;
    if (!(ref instanceof HTMLInputElement)) throw new ReferenceError();
    this.el_ = ref;

    /* Retrieve element to lock (= body) */
    if (!document.body) throw new ReferenceError();
    this.lock_ = document.body;
  }

  /**
   * Setup locked state
   */


  Lock.prototype.setup = function setup() {
    this.update();
  };

  /**
   * Update locked state
   */


  Lock.prototype.update = function update() {
    var _this = this;

    /* Entering search mode */
    if (this.el_.checked) {
      this.offset_ = window.pageYOffset;

      /* Scroll to top after transition, to omit flickering */
      setTimeout(function () {
        window.scrollTo(0, 0);

        /* Lock body after finishing transition */
        if (_this.el_.checked) {
          _this.lock_.dataset.mdState = "lock";
        }
      }, 400);

      /* Exiting search mode */
    } else {
      this.lock_.dataset.mdState = "";

      /* Scroll to former position, but wait for 100ms to prevent flashes on
         iOS. A short timeout seems to do the trick */
      setTimeout(function () {
        if (typeof _this.offset_ !== "undefined") window.scrollTo(0, _this.offset_);
      }, 100);
    }
  };

  /**
   * Reset locked state and page y-offset
   */


  Lock.prototype.reset = function reset() {
    if (this.lock_.dataset.mdState === "lock") window.scrollTo(0, this.offset_);
    this.lock_.dataset.mdState = "";
  };

  return Lock;
}();

exports.default = Lock;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(JSX) {

exports.__esModule = true;

var _escapeStringRegexp = __webpack_require__(40);

var _escapeStringRegexp2 = _interopRequireDefault(_escapeStringRegexp);

var _lunr = __webpack_require__(41);

var _lunr2 = _interopRequireDefault(_lunr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
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

// expose-loader?lunr!lunr"

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
var truncate = function truncate(string, n) {
  var i = n;
  if (string.length > i) {
    while (string[i] !== " " && --i > 0) {}
    return string.substring(0, i) + "...";
  }
  return string;
};

/**
 * Return the meta tag value for the given key
 *
 * @param {string} key - Meta name
 * @param {string} [_] - Stop Flow complaining (TODO)
 *
 * @return {string} Meta content value
 */
var translate = function translate(key, _) {
  // eslint-disable-line no-unused-vars
  var meta = document.getElementsByName("lang:" + key)[0];
  if (!(meta instanceof HTMLMetaElement)) throw new ReferenceError();
  return meta.content;
};

/* ----------------------------------------------------------------------------
 * Class
 * ------------------------------------------------------------------------- */

var Result = function () {

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
  function Result(el, data) {
    _classCallCheck(this, Result);

    var ref = typeof el === "string" ? document.querySelector(el) : el;
    if (!(ref instanceof HTMLElement)) throw new ReferenceError();
    this.el_ = ref;

    /* Retrieve metadata and list element */

    var _Array$prototype$slic = Array.prototype.slice.call(this.el_.children),
        meta = _Array$prototype$slic[0],
        list = _Array$prototype$slic[1];

    /* Set data, metadata and list elements */


    this.data_ = data;
    this.meta_ = meta;
    this.list_ = list;

    /* Load messages for metadata display */
    this.message_ = {
      placeholder: this.meta_.textContent,
      none: translate("search.result.none"),
      one: translate("search.result.one"),
      other: translate("search.result.other")

      /* Override tokenizer separator, if given */
    };var tokenizer = translate("search.tokenizer");
    if (tokenizer.length) _lunr2.default.tokenizer.separator = tokenizer;

    /* Load search languages */
    this.lang_ = translate("search.language").split(",").filter(Boolean).map(function (lang) {
      return lang.trim();
    });
  }

  /**
   * Update search results
   *
   * @param {Event} ev - Input or focus event
   */


  Result.prototype.update = function update(ev) {
    var _this = this;

    /* Initialize index, if this has not be done yet */
    if (ev.type === "focus" && !this.index_) {

      /* Initialize index */
      var init = function init(data) {

        /* Preprocess and index sections and documents */
        _this.docs_ = data.reduce(function (docs, doc) {
          var _doc$location$split = doc.location.split("#"),
              path = _doc$location$split[0],
              hash = _doc$location$split[1];

          /* Associate section with parent document */


          if (hash) {
            doc.parent = docs.get(path);

            /* Override page title with document title if first section */
            if (doc.parent && !doc.parent.done) {
              doc.parent.title = doc.title;
              doc.parent.text = doc.text;
              doc.parent.done = true;
            }
          }

          /* Some cleanup on the text */
          doc.text = doc.text.replace(/\n/g, " ") /* Remove newlines */
          .replace(/\s+/g, " ") /* Compact whitespace */
          .replace(/\s+([,.:;!?])/g, /* Correct punctuation */
          function (_, char) {
            return char;
          });

          /* Index sections and documents, but skip top-level headline */
          if (!doc.parent || doc.parent.title !== doc.title) docs.set(doc.location, doc);
          return docs;
        }, new Map());

        /* eslint-disable no-invalid-this */
        var docs = _this.docs_,
            lang = _this.lang_;

        /* Create stack and index */
        _this.stack_ = [];
        _this.index_ = (0, _lunr2.default)(function () {
          var _this2 = this;

          /* Remove stemmer, as it cripples search experience */
          this.pipeline.reset();
          this.pipeline.add(_lunr2.default.trimmer, _lunr2.default.stopWordFilter);

          /* Set up alternate search languages */
          if (lang.length === 1 && lang[0] !== "en") {
            this.use(_lunr2.default[lang[0]]);
          } else if (lang.length > 1) {
            this.use(_lunr2.default.multiLanguage.apply(_lunr2.default, lang));
          }

          /* Index fields */
          this.field("title", { boost: 10 });
          this.field("text");
          this.ref("location");

          /* Index documents */
          docs.forEach(function (doc) {
            return _this2.add(doc);
          });
        });

        /* Register event handler for lazy rendering */
        var container = _this.el_.parentNode;
        if (!(container instanceof HTMLElement)) throw new ReferenceError();
        container.addEventListener("scroll", function () {
          while (_this.stack_.length && container.scrollTop + container.offsetHeight >= container.scrollHeight - 16) {
            _this.stack_.splice(0, 10).forEach(function (render) {
              return render();
            });
          }
        });
      };
      /* eslint-enable no-invalid-this */

      /* Initialize index after short timeout to account for transition */
      setTimeout(function () {
        return typeof _this.data_ === "function" ? _this.data_().then(init) : init(_this.data_);
      }, 250);

      /* Execute search on new input event */
    } else if (ev.type === "focus" || ev.type === "keyup") {
      var target = ev.target;
      if (!(target instanceof HTMLInputElement)) throw new ReferenceError();

      /* Abort early, if index is not build or input hasn't changed */
      if (!this.index_ || target.value === this.value_) return;

      /* Clear current list */
      while (this.list_.firstChild) {
        this.list_.removeChild(this.list_.firstChild);
      } /* Abort early, if search input is empty */
      this.value_ = target.value;
      if (this.value_.length === 0) {
        this.meta_.textContent = this.message_.placeholder;
        return;
      }

      /* Perform search on index and group sections by document */
      var result = this.index_

      /* Append trailing wildcard to all terms for prefix querying */
      .query(function (query) {
        _this.value_.toLowerCase().split(" ").filter(Boolean).forEach(function (term) {
          query.term(term, { wildcard: _lunr2.default.Query.wildcard.TRAILING });
        });
      })

      /* Process query results */
      .reduce(function (items, item) {
        var doc = _this.docs_.get(item.ref);
        if (doc.parent) {
          var ref = doc.parent.location;
          items.set(ref, (items.get(ref) || []).concat(item));
        } else {
          var _ref = doc.location;
          items.set(_ref, items.get(_ref) || []);
        }
        return items;
      }, new Map());

      /* Assemble regular expressions for matching */
      var query = (0, _escapeStringRegexp2.default)(this.value_.trim()).replace(new RegExp(_lunr2.default.tokenizer.separator, "img"), "|");
      var match = new RegExp("(^|" + _lunr2.default.tokenizer.separator + ")(" + query + ")", "img");
      var highlight = function highlight(_, separator, token) {
        return separator + "<em>" + token + "</em>";
      };

      /* Reset stack and render results */
      this.stack_ = [];
      result.forEach(function (items, ref) {
        var _stack_;

        var doc = _this.docs_.get(ref);

        /* Render article */
        var article = JSX.createElement(
          "li",
          { "class": "md-search-result__item" },
          JSX.createElement(
            "a",
            { href: doc.location, title: doc.title,
              "class": "md-search-result__link" },
            JSX.createElement(
              "article",
              { "class": "md-search-result__article md-search-result__article--document" },
              JSX.createElement(
                "h1",
                { "class": "md-search-result__title" },
                { __html: doc.title.replace(match, highlight) }
              ),
              doc.text.length ? JSX.createElement(
                "p",
                { "class": "md-search-result__teaser" },
                { __html: doc.text.replace(match, highlight) }
              ) : {}
            )
          )
        );

        /* Render sections for article */
        var sections = items.map(function (item) {
          return function () {
            var section = _this.docs_.get(item.ref);
            article.appendChild(JSX.createElement(
              "a",
              { href: section.location, title: section.title,
                "class": "md-search-result__link", "data-md-rel": "anchor" },
              JSX.createElement(
                "article",
                { "class": "md-search-result__article" },
                JSX.createElement(
                  "h1",
                  { "class": "md-search-result__title" },
                  { __html: section.title.replace(match, highlight) }
                ),
                section.text.length ? JSX.createElement(
                  "p",
                  { "class": "md-search-result__teaser" },
                  { __html: truncate(section.text.replace(match, highlight), 400)
                  }
                ) : {}
              )
            ));
          };
        });

        /* Push articles and section renderers onto stack */
        (_stack_ = _this.stack_).push.apply(_stack_, [function () {
          return _this.list_.appendChild(article);
        }].concat(sections));
      });

      /* Gradually add results as long as the height of the container grows */
      var container = this.el_.parentNode;
      if (!(container instanceof HTMLElement)) throw new ReferenceError();
      while (this.stack_.length && container.offsetHeight >= container.scrollHeight - 16) {
        this.stack_.shift()();
      } /* Bind click handlers for anchors */
      var anchors = this.list_.querySelectorAll("[data-md-rel=anchor]");
      Array.prototype.forEach.call(anchors, function (anchor) {
        anchor.addEventListener("click", function (ev2) {
          var toggle = document.querySelector("[data-md-toggle=search]");
          if (!(toggle instanceof HTMLInputElement)) throw new ReferenceError();
          if (toggle.checked) {
            toggle.checked = false;
            toggle.dispatchEvent(new CustomEvent("change"));
          }

          /* Hack: prevent default, as the navigation needs to be delayed due
             to the search body lock on mobile */
          ev2.preventDefault();
          setTimeout(function () {
            document.location.href = anchor.href;
          }, 100);
        });
      });

      /* Update search metadata */
      switch (result.size) {
        case 0:
          this.meta_.textContent = this.message_.none;
          break;
        case 1:
          this.meta_.textContent = this.message_.one;
          break;
        default:
          this.meta_.textContent = this.message_.other.replace("#", result.size);
      }
    }
  };

  return Result;
}();

exports.default = Result;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe, '\\$&');
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 2.1.4
 * Copyright (C) 2017 Oliver Nightingale
 * @license MIT
 */

;(function(){

/**
 * A convenience function for configuring and constructing
 * a new lunr Index.
 *
 * A lunr.Builder instance is created and the pipeline setup
 * with a trimmer, stop word filter and stemmer.
 *
 * This builder object is yielded to the configuration function
 * that is passed as a parameter, allowing the list of fields
 * and other builder parameters to be customised.
 *
 * All documents _must_ be added within the passed config function.
 *
 * @example
 * var idx = lunr(function () {
 *   this.field('title')
 *   this.field('body')
 *   this.ref('id')
 *
 *   documents.forEach(function (doc) {
 *     this.add(doc)
 *   }, this)
 * })
 *
 * @see {@link lunr.Builder}
 * @see {@link lunr.Pipeline}
 * @see {@link lunr.trimmer}
 * @see {@link lunr.stopWordFilter}
 * @see {@link lunr.stemmer}
 * @namespace {function} lunr
 */
var lunr = function (config) {
  var builder = new lunr.Builder

  builder.pipeline.add(
    lunr.trimmer,
    lunr.stopWordFilter,
    lunr.stemmer
  )

  builder.searchPipeline.add(
    lunr.stemmer
  )

  config.call(builder, builder)
  return builder.build()
}

lunr.version = "2.1.4"
/*!
 * lunr.utils
 * Copyright (C) 2017 Oliver Nightingale
 */

/**
 * A namespace containing utils for the rest of the lunr library
 */
lunr.utils = {}

/**
 * Print a warning message to the console.
 *
 * @param {String} message The message to be printed.
 * @memberOf Utils
 */
lunr.utils.warn = (function (global) {
  /* eslint-disable no-console */
  return function (message) {
    if (global.console && console.warn) {
      console.warn(message)
    }
  }
  /* eslint-enable no-console */
})(this)

/**
 * Convert an object to a string.
 *
 * In the case of `null` and `undefined` the function returns
 * the empty string, in all other cases the result of calling
 * `toString` on the passed object is returned.
 *
 * @param {Any} obj The object to convert to a string.
 * @return {String} string representation of the passed object.
 * @memberOf Utils
 */
lunr.utils.asString = function (obj) {
  if (obj === void 0 || obj === null) {
    return ""
  } else {
    return obj.toString()
  }
}
lunr.FieldRef = function (docRef, fieldName, stringValue) {
  this.docRef = docRef
  this.fieldName = fieldName
  this._stringValue = stringValue
}

lunr.FieldRef.joiner = "/"

lunr.FieldRef.fromString = function (s) {
  var n = s.indexOf(lunr.FieldRef.joiner)

  if (n === -1) {
    throw "malformed field ref string"
  }

  var fieldRef = s.slice(0, n),
      docRef = s.slice(n + 1)

  return new lunr.FieldRef (docRef, fieldRef, s)
}

lunr.FieldRef.prototype.toString = function () {
  if (this._stringValue == undefined) {
    this._stringValue = this.fieldName + lunr.FieldRef.joiner + this.docRef
  }

  return this._stringValue
}
/**
 * A function to calculate the inverse document frequency for
 * a posting. This is shared between the builder and the index
 *
 * @private
 * @param {object} posting - The posting for a given term
 * @param {number} documentCount - The total number of documents.
 */
lunr.idf = function (posting, documentCount) {
  var documentsWithTerm = 0

  for (var fieldName in posting) {
    if (fieldName == '_index') continue // Ignore the term index, its not a field
    documentsWithTerm += Object.keys(posting[fieldName]).length
  }

  var x = (documentCount - documentsWithTerm + 0.5) / (documentsWithTerm + 0.5)

  return Math.log(1 + Math.abs(x))
}

/**
 * A token wraps a string representation of a token
 * as it is passed through the text processing pipeline.
 *
 * @constructor
 * @param {string} [str=''] - The string token being wrapped.
 * @param {object} [metadata={}] - Metadata associated with this token.
 */
lunr.Token = function (str, metadata) {
  this.str = str || ""
  this.metadata = metadata || {}
}

/**
 * Returns the token string that is being wrapped by this object.
 *
 * @returns {string}
 */
lunr.Token.prototype.toString = function () {
  return this.str
}

/**
 * A token update function is used when updating or optionally
 * when cloning a token.
 *
 * @callback lunr.Token~updateFunction
 * @param {string} str - The string representation of the token.
 * @param {Object} metadata - All metadata associated with this token.
 */

/**
 * Applies the given function to the wrapped string token.
 *
 * @example
 * token.update(function (str, metadata) {
 *   return str.toUpperCase()
 * })
 *
 * @param {lunr.Token~updateFunction} fn - A function to apply to the token string.
 * @returns {lunr.Token}
 */
lunr.Token.prototype.update = function (fn) {
  this.str = fn(this.str, this.metadata)
  return this
}

/**
 * Creates a clone of this token. Optionally a function can be
 * applied to the cloned token.
 *
 * @param {lunr.Token~updateFunction} [fn] - An optional function to apply to the cloned token.
 * @returns {lunr.Token}
 */
lunr.Token.prototype.clone = function (fn) {
  fn = fn || function (s) { return s }
  return new lunr.Token (fn(this.str, this.metadata), this.metadata)
}
/*!
 * lunr.tokenizer
 * Copyright (C) 2017 Oliver Nightingale
 */

/**
 * A function for splitting a string into tokens ready to be inserted into
 * the search index. Uses `lunr.tokenizer.separator` to split strings, change
 * the value of this property to change how strings are split into tokens.
 *
 * This tokenizer will convert its parameter to a string by calling `toString` and
 * then will split this string on the character in `lunr.tokenizer.separator`.
 * Arrays will have their elements converted to strings and wrapped in a lunr.Token.
 *
 * @static
 * @param {?(string|object|object[])} obj - The object to convert into tokens
 * @returns {lunr.Token[]}
 */
lunr.tokenizer = function (obj) {
  if (obj == null || obj == undefined) {
    return []
  }

  if (Array.isArray(obj)) {
    return obj.map(function (t) {
      return new lunr.Token(lunr.utils.asString(t).toLowerCase())
    })
  }

  var str = obj.toString().trim().toLowerCase(),
      len = str.length,
      tokens = []

  for (var sliceEnd = 0, sliceStart = 0; sliceEnd <= len; sliceEnd++) {
    var char = str.charAt(sliceEnd),
        sliceLength = sliceEnd - sliceStart

    if ((char.match(lunr.tokenizer.separator) || sliceEnd == len)) {

      if (sliceLength > 0) {
        tokens.push(
          new lunr.Token (str.slice(sliceStart, sliceEnd), {
            position: [sliceStart, sliceLength],
            index: tokens.length
          })
        )
      }

      sliceStart = sliceEnd + 1
    }

  }

  return tokens
}

/**
 * The separator used to split a string into tokens. Override this property to change the behaviour of
 * `lunr.tokenizer` behaviour when tokenizing strings. By default this splits on whitespace and hyphens.
 *
 * @static
 * @see lunr.tokenizer
 */
lunr.tokenizer.separator = /[\s\-]+/
/*!
 * lunr.Pipeline
 * Copyright (C) 2017 Oliver Nightingale
 */

/**
 * lunr.Pipelines maintain an ordered list of functions to be applied to all
 * tokens in documents entering the search index and queries being ran against
 * the index.
 *
 * An instance of lunr.Index created with the lunr shortcut will contain a
 * pipeline with a stop word filter and an English language stemmer. Extra
 * functions can be added before or after either of these functions or these
 * default functions can be removed.
 *
 * When run the pipeline will call each function in turn, passing a token, the
 * index of that token in the original list of all tokens and finally a list of
 * all the original tokens.
 *
 * The output of functions in the pipeline will be passed to the next function
 * in the pipeline. To exclude a token from entering the index the function
 * should return undefined, the rest of the pipeline will not be called with
 * this token.
 *
 * For serialisation of pipelines to work, all functions used in an instance of
 * a pipeline should be registered with lunr.Pipeline. Registered functions can
 * then be loaded. If trying to load a serialised pipeline that uses functions
 * that are not registered an error will be thrown.
 *
 * If not planning on serialising the pipeline then registering pipeline functions
 * is not necessary.
 *
 * @constructor
 */
lunr.Pipeline = function () {
  this._stack = []
}

lunr.Pipeline.registeredFunctions = Object.create(null)

/**
 * A pipeline function maps lunr.Token to lunr.Token. A lunr.Token contains the token
 * string as well as all known metadata. A pipeline function can mutate the token string
 * or mutate (or add) metadata for a given token.
 *
 * A pipeline function can indicate that the passed token should be discarded by returning
 * null. This token will not be passed to any downstream pipeline functions and will not be
 * added to the index.
 *
 * Multiple tokens can be returned by returning an array of tokens. Each token will be passed
 * to any downstream pipeline functions and all will returned tokens will be added to the index.
 *
 * Any number of pipeline functions may be chained together using a lunr.Pipeline.
 *
 * @interface lunr.PipelineFunction
 * @param {lunr.Token} token - A token from the document being processed.
 * @param {number} i - The index of this token in the complete list of tokens for this document/field.
 * @param {lunr.Token[]} tokens - All tokens for this document/field.
 * @returns {(?lunr.Token|lunr.Token[])}
 */

/**
 * Register a function with the pipeline.
 *
 * Functions that are used in the pipeline should be registered if the pipeline
 * needs to be serialised, or a serialised pipeline needs to be loaded.
 *
 * Registering a function does not add it to a pipeline, functions must still be
 * added to instances of the pipeline for them to be used when running a pipeline.
 *
 * @param {lunr.PipelineFunction} fn - The function to check for.
 * @param {String} label - The label to register this function with
 */
lunr.Pipeline.registerFunction = function (fn, label) {
  if (label in this.registeredFunctions) {
    lunr.utils.warn('Overwriting existing registered function: ' + label)
  }

  fn.label = label
  lunr.Pipeline.registeredFunctions[fn.label] = fn
}

/**
 * Warns if the function is not registered as a Pipeline function.
 *
 * @param {lunr.PipelineFunction} fn - The function to check for.
 * @private
 */
lunr.Pipeline.warnIfFunctionNotRegistered = function (fn) {
  var isRegistered = fn.label && (fn.label in this.registeredFunctions)

  if (!isRegistered) {
    lunr.utils.warn('Function is not registered with pipeline. This may cause problems when serialising the index.\n', fn)
  }
}

/**
 * Loads a previously serialised pipeline.
 *
 * All functions to be loaded must already be registered with lunr.Pipeline.
 * If any function from the serialised data has not been registered then an
 * error will be thrown.
 *
 * @param {Object} serialised - The serialised pipeline to load.
 * @returns {lunr.Pipeline}
 */
lunr.Pipeline.load = function (serialised) {
  var pipeline = new lunr.Pipeline

  serialised.forEach(function (fnName) {
    var fn = lunr.Pipeline.registeredFunctions[fnName]

    if (fn) {
      pipeline.add(fn)
    } else {
      throw new Error('Cannot load unregistered function: ' + fnName)
    }
  })

  return pipeline
}

/**
 * Adds new functions to the end of the pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {lunr.PipelineFunction[]} functions - Any number of functions to add to the pipeline.
 */
lunr.Pipeline.prototype.add = function () {
  var fns = Array.prototype.slice.call(arguments)

  fns.forEach(function (fn) {
    lunr.Pipeline.warnIfFunctionNotRegistered(fn)
    this._stack.push(fn)
  }, this)
}

/**
 * Adds a single function after a function that already exists in the
 * pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {lunr.PipelineFunction} existingFn - A function that already exists in the pipeline.
 * @param {lunr.PipelineFunction} newFn - The new function to add to the pipeline.
 */
lunr.Pipeline.prototype.after = function (existingFn, newFn) {
  lunr.Pipeline.warnIfFunctionNotRegistered(newFn)

  var pos = this._stack.indexOf(existingFn)
  if (pos == -1) {
    throw new Error('Cannot find existingFn')
  }

  pos = pos + 1
  this._stack.splice(pos, 0, newFn)
}

/**
 * Adds a single function before a function that already exists in the
 * pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {lunr.PipelineFunction} existingFn - A function that already exists in the pipeline.
 * @param {lunr.PipelineFunction} newFn - The new function to add to the pipeline.
 */
lunr.Pipeline.prototype.before = function (existingFn, newFn) {
  lunr.Pipeline.warnIfFunctionNotRegistered(newFn)

  var pos = this._stack.indexOf(existingFn)
  if (pos == -1) {
    throw new Error('Cannot find existingFn')
  }

  this._stack.splice(pos, 0, newFn)
}

/**
 * Removes a function from the pipeline.
 *
 * @param {lunr.PipelineFunction} fn The function to remove from the pipeline.
 */
lunr.Pipeline.prototype.remove = function (fn) {
  var pos = this._stack.indexOf(fn)
  if (pos == -1) {
    return
  }

  this._stack.splice(pos, 1)
}

/**
 * Runs the current list of functions that make up the pipeline against the
 * passed tokens.
 *
 * @param {Array} tokens The tokens to run through the pipeline.
 * @returns {Array}
 */
lunr.Pipeline.prototype.run = function (tokens) {
  var stackLength = this._stack.length

  for (var i = 0; i < stackLength; i++) {
    var fn = this._stack[i]

    tokens = tokens.reduce(function (memo, token, j) {
      var result = fn(token, j, tokens)

      if (result === void 0 || result === '') return memo

      return memo.concat(result)
    }, [])
  }

  return tokens
}

/**
 * Convenience method for passing a string through a pipeline and getting
 * strings out. This method takes care of wrapping the passed string in a
 * token and mapping the resulting tokens back to strings.
 *
 * @param {string} str - The string to pass through the pipeline.
 * @returns {string[]}
 */
lunr.Pipeline.prototype.runString = function (str) {
  var token = new lunr.Token (str)

  return this.run([token]).map(function (t) {
    return t.toString()
  })
}

/**
 * Resets the pipeline by removing any existing processors.
 *
 */
lunr.Pipeline.prototype.reset = function () {
  this._stack = []
}

/**
 * Returns a representation of the pipeline ready for serialisation.
 *
 * Logs a warning if the function has not been registered.
 *
 * @returns {Array}
 */
lunr.Pipeline.prototype.toJSON = function () {
  return this._stack.map(function (fn) {
    lunr.Pipeline.warnIfFunctionNotRegistered(fn)

    return fn.label
  })
}
/*!
 * lunr.Vector
 * Copyright (C) 2017 Oliver Nightingale
 */

/**
 * A vector is used to construct the vector space of documents and queries. These
 * vectors support operations to determine the similarity between two documents or
 * a document and a query.
 *
 * Normally no parameters are required for initializing a vector, but in the case of
 * loading a previously dumped vector the raw elements can be provided to the constructor.
 *
 * For performance reasons vectors are implemented with a flat array, where an elements
 * index is immediately followed by its value. E.g. [index, value, index, value]. This
 * allows the underlying array to be as sparse as possible and still offer decent
 * performance when being used for vector calculations.
 *
 * @constructor
 * @param {Number[]} [elements] - The flat list of element index and element value pairs.
 */
lunr.Vector = function (elements) {
  this._magnitude = 0
  this.elements = elements || []
}


/**
 * Calculates the position within the vector to insert a given index.
 *
 * This is used internally by insert and upsert. If there are duplicate indexes then
 * the position is returned as if the value for that index were to be updated, but it
 * is the callers responsibility to check whether there is a duplicate at that index
 *
 * @param {Number} insertIdx - The index at which the element should be inserted.
 * @returns {Number}
 */
lunr.Vector.prototype.positionForIndex = function (index) {
  // For an empty vector the tuple can be inserted at the beginning
  if (this.elements.length == 0) {
    return 0
  }

  var start = 0,
      end = this.elements.length / 2,
      sliceLength = end - start,
      pivotPoint = Math.floor(sliceLength / 2),
      pivotIndex = this.elements[pivotPoint * 2]

  while (sliceLength > 1) {
    if (pivotIndex < index) {
      start = pivotPoint
    }

    if (pivotIndex > index) {
      end = pivotPoint
    }

    if (pivotIndex == index) {
      break
    }

    sliceLength = end - start
    pivotPoint = start + Math.floor(sliceLength / 2)
    pivotIndex = this.elements[pivotPoint * 2]
  }

  if (pivotIndex == index) {
    return pivotPoint * 2
  }

  if (pivotIndex > index) {
    return pivotPoint * 2
  }

  if (pivotIndex < index) {
    return (pivotPoint + 1) * 2
  }
}

/**
 * Inserts an element at an index within the vector.
 *
 * Does not allow duplicates, will throw an error if there is already an entry
 * for this index.
 *
 * @param {Number} insertIdx - The index at which the element should be inserted.
 * @param {Number} val - The value to be inserted into the vector.
 */
lunr.Vector.prototype.insert = function (insertIdx, val) {
  this.upsert(insertIdx, val, function () {
    throw "duplicate index"
  })
}

/**
 * Inserts or updates an existing index within the vector.
 *
 * @param {Number} insertIdx - The index at which the element should be inserted.
 * @param {Number} val - The value to be inserted into the vector.
 * @param {function} fn - A function that is called for updates, the existing value and the
 * requested value are passed as arguments
 */
lunr.Vector.prototype.upsert = function (insertIdx, val, fn) {
  this._magnitude = 0
  var position = this.positionForIndex(insertIdx)

  if (this.elements[position] == insertIdx) {
    this.elements[position + 1] = fn(this.elements[position + 1], val)
  } else {
    this.elements.splice(position, 0, insertIdx, val)
  }
}

/**
 * Calculates the magnitude of this vector.
 *
 * @returns {Number}
 */
lunr.Vector.prototype.magnitude = function () {
  if (this._magnitude) return this._magnitude

  var sumOfSquares = 0,
      elementsLength = this.elements.length

  for (var i = 1; i < elementsLength; i += 2) {
    var val = this.elements[i]
    sumOfSquares += val * val
  }

  return this._magnitude = Math.sqrt(sumOfSquares)
}

/**
 * Calculates the dot product of this vector and another vector.
 *
 * @param {lunr.Vector} otherVector - The vector to compute the dot product with.
 * @returns {Number}
 */
lunr.Vector.prototype.dot = function (otherVector) {
  var dotProduct = 0,
      a = this.elements, b = otherVector.elements,
      aLen = a.length, bLen = b.length,
      aVal = 0, bVal = 0,
      i = 0, j = 0

  while (i < aLen && j < bLen) {
    aVal = a[i], bVal = b[j]
    if (aVal < bVal) {
      i += 2
    } else if (aVal > bVal) {
      j += 2
    } else if (aVal == bVal) {
      dotProduct += a[i + 1] * b[j + 1]
      i += 2
      j += 2
    }
  }

  return dotProduct
}

/**
 * Calculates the cosine similarity between this vector and another
 * vector.
 *
 * @param {lunr.Vector} otherVector - The other vector to calculate the
 * similarity with.
 * @returns {Number}
 */
lunr.Vector.prototype.similarity = function (otherVector) {
  return this.dot(otherVector) / (this.magnitude() * otherVector.magnitude())
}

/**
 * Converts the vector to an array of the elements within the vector.
 *
 * @returns {Number[]}
 */
lunr.Vector.prototype.toArray = function () {
  var output = new Array (this.elements.length / 2)

  for (var i = 1, j = 0; i < this.elements.length; i += 2, j++) {
    output[j] = this.elements[i]
  }

  return output
}

/**
 * A JSON serializable representation of the vector.
 *
 * @returns {Number[]}
 */
lunr.Vector.prototype.toJSON = function () {
  return this.elements
}
/* eslint-disable */
/*!
 * lunr.stemmer
 * Copyright (C) 2017 Oliver Nightingale
 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
 */

/**
 * lunr.stemmer is an english language stemmer, this is a JavaScript
 * implementation of the PorterStemmer taken from http://tartarus.org/~martin
 *
 * @static
 * @implements {lunr.PipelineFunction}
 * @param {lunr.Token} token - The string to stem
 * @returns {lunr.Token}
 * @see {@link lunr.Pipeline}
 */
lunr.stemmer = (function(){
  var step2list = {
      "ational" : "ate",
      "tional" : "tion",
      "enci" : "ence",
      "anci" : "ance",
      "izer" : "ize",
      "bli" : "ble",
      "alli" : "al",
      "entli" : "ent",
      "eli" : "e",
      "ousli" : "ous",
      "ization" : "ize",
      "ation" : "ate",
      "ator" : "ate",
      "alism" : "al",
      "iveness" : "ive",
      "fulness" : "ful",
      "ousness" : "ous",
      "aliti" : "al",
      "iviti" : "ive",
      "biliti" : "ble",
      "logi" : "log"
    },

    step3list = {
      "icate" : "ic",
      "ative" : "",
      "alize" : "al",
      "iciti" : "ic",
      "ical" : "ic",
      "ful" : "",
      "ness" : ""
    },

    c = "[^aeiou]",          // consonant
    v = "[aeiouy]",          // vowel
    C = c + "[^aeiouy]*",    // consonant sequence
    V = v + "[aeiou]*",      // vowel sequence

    mgr0 = "^(" + C + ")?" + V + C,               // [C]VC... is m>0
    meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$",  // [C]VC[V] is m=1
    mgr1 = "^(" + C + ")?" + V + C + V + C,       // [C]VCVC... is m>1
    s_v = "^(" + C + ")?" + v;                   // vowel in stem

  var re_mgr0 = new RegExp(mgr0);
  var re_mgr1 = new RegExp(mgr1);
  var re_meq1 = new RegExp(meq1);
  var re_s_v = new RegExp(s_v);

  var re_1a = /^(.+?)(ss|i)es$/;
  var re2_1a = /^(.+?)([^s])s$/;
  var re_1b = /^(.+?)eed$/;
  var re2_1b = /^(.+?)(ed|ing)$/;
  var re_1b_2 = /.$/;
  var re2_1b_2 = /(at|bl|iz)$/;
  var re3_1b_2 = new RegExp("([^aeiouylsz])\\1$");
  var re4_1b_2 = new RegExp("^" + C + v + "[^aeiouwxy]$");

  var re_1c = /^(.+?[^aeiou])y$/;
  var re_2 = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;

  var re_3 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;

  var re_4 = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
  var re2_4 = /^(.+?)(s|t)(ion)$/;

  var re_5 = /^(.+?)e$/;
  var re_5_1 = /ll$/;
  var re3_5 = new RegExp("^" + C + v + "[^aeiouwxy]$");

  var porterStemmer = function porterStemmer(w) {
    var stem,
      suffix,
      firstch,
      re,
      re2,
      re3,
      re4;

    if (w.length < 3) { return w; }

    firstch = w.substr(0,1);
    if (firstch == "y") {
      w = firstch.toUpperCase() + w.substr(1);
    }

    // Step 1a
    re = re_1a
    re2 = re2_1a;

    if (re.test(w)) { w = w.replace(re,"$1$2"); }
    else if (re2.test(w)) { w = w.replace(re2,"$1$2"); }

    // Step 1b
    re = re_1b;
    re2 = re2_1b;
    if (re.test(w)) {
      var fp = re.exec(w);
      re = re_mgr0;
      if (re.test(fp[1])) {
        re = re_1b_2;
        w = w.replace(re,"");
      }
    } else if (re2.test(w)) {
      var fp = re2.exec(w);
      stem = fp[1];
      re2 = re_s_v;
      if (re2.test(stem)) {
        w = stem;
        re2 = re2_1b_2;
        re3 = re3_1b_2;
        re4 = re4_1b_2;
        if (re2.test(w)) { w = w + "e"; }
        else if (re3.test(w)) { re = re_1b_2; w = w.replace(re,""); }
        else if (re4.test(w)) { w = w + "e"; }
      }
    }

    // Step 1c - replace suffix y or Y by i if preceded by a non-vowel which is not the first letter of the word (so cry -> cri, by -> by, say -> say)
    re = re_1c;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      w = stem + "i";
    }

    // Step 2
    re = re_2;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = re_mgr0;
      if (re.test(stem)) {
        w = stem + step2list[suffix];
      }
    }

    // Step 3
    re = re_3;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = re_mgr0;
      if (re.test(stem)) {
        w = stem + step3list[suffix];
      }
    }

    // Step 4
    re = re_4;
    re2 = re2_4;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      re = re_mgr1;
      if (re.test(stem)) {
        w = stem;
      }
    } else if (re2.test(w)) {
      var fp = re2.exec(w);
      stem = fp[1] + fp[2];
      re2 = re_mgr1;
      if (re2.test(stem)) {
        w = stem;
      }
    }

    // Step 5
    re = re_5;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      re = re_mgr1;
      re2 = re_meq1;
      re3 = re3_5;
      if (re.test(stem) || (re2.test(stem) && !(re3.test(stem)))) {
        w = stem;
      }
    }

    re = re_5_1;
    re2 = re_mgr1;
    if (re.test(w) && re2.test(w)) {
      re = re_1b_2;
      w = w.replace(re,"");
    }

    // and turn initial Y back to y

    if (firstch == "y") {
      w = firstch.toLowerCase() + w.substr(1);
    }

    return w;
  };

  return function (token) {
    return token.update(porterStemmer);
  }
})();

lunr.Pipeline.registerFunction(lunr.stemmer, 'stemmer')
/*!
 * lunr.stopWordFilter
 * Copyright (C) 2017 Oliver Nightingale
 */

/**
 * lunr.generateStopWordFilter builds a stopWordFilter function from the provided
 * list of stop words.
 *
 * The built in lunr.stopWordFilter is built using this generator and can be used
 * to generate custom stopWordFilters for applications or non English languages.
 *
 * @param {Array} token The token to pass through the filter
 * @returns {lunr.PipelineFunction}
 * @see lunr.Pipeline
 * @see lunr.stopWordFilter
 */
lunr.generateStopWordFilter = function (stopWords) {
  var words = stopWords.reduce(function (memo, stopWord) {
    memo[stopWord] = stopWord
    return memo
  }, {})

  return function (token) {
    if (token && words[token.toString()] !== token.toString()) return token
  }
}

/**
 * lunr.stopWordFilter is an English language stop word list filter, any words
 * contained in the list will not be passed through the filter.
 *
 * This is intended to be used in the Pipeline. If the token does not pass the
 * filter then undefined will be returned.
 *
 * @implements {lunr.PipelineFunction}
 * @params {lunr.Token} token - A token to check for being a stop word.
 * @returns {lunr.Token}
 * @see {@link lunr.Pipeline}
 */
lunr.stopWordFilter = lunr.generateStopWordFilter([
  'a',
  'able',
  'about',
  'across',
  'after',
  'all',
  'almost',
  'also',
  'am',
  'among',
  'an',
  'and',
  'any',
  'are',
  'as',
  'at',
  'be',
  'because',
  'been',
  'but',
  'by',
  'can',
  'cannot',
  'could',
  'dear',
  'did',
  'do',
  'does',
  'either',
  'else',
  'ever',
  'every',
  'for',
  'from',
  'get',
  'got',
  'had',
  'has',
  'have',
  'he',
  'her',
  'hers',
  'him',
  'his',
  'how',
  'however',
  'i',
  'if',
  'in',
  'into',
  'is',
  'it',
  'its',
  'just',
  'least',
  'let',
  'like',
  'likely',
  'may',
  'me',
  'might',
  'most',
  'must',
  'my',
  'neither',
  'no',
  'nor',
  'not',
  'of',
  'off',
  'often',
  'on',
  'only',
  'or',
  'other',
  'our',
  'own',
  'rather',
  'said',
  'say',
  'says',
  'she',
  'should',
  'since',
  'so',
  'some',
  'than',
  'that',
  'the',
  'their',
  'them',
  'then',
  'there',
  'these',
  'they',
  'this',
  'tis',
  'to',
  'too',
  'twas',
  'us',
  'wants',
  'was',
  'we',
  'were',
  'what',
  'when',
  'where',
  'which',
  'while',
  'who',
  'whom',
  'why',
  'will',
  'with',
  'would',
  'yet',
  'you',
  'your'
])

lunr.Pipeline.registerFunction(lunr.stopWordFilter, 'stopWordFilter')
/*!
 * lunr.trimmer
 * Copyright (C) 2017 Oliver Nightingale
 */

/**
 * lunr.trimmer is a pipeline function for trimming non word
 * characters from the beginning and end of tokens before they
 * enter the index.
 *
 * This implementation may not work correctly for non latin
 * characters and should either be removed or adapted for use
 * with languages with non-latin characters.
 *
 * @static
 * @implements {lunr.PipelineFunction}
 * @param {lunr.Token} token The token to pass through the filter
 * @returns {lunr.Token}
 * @see lunr.Pipeline
 */
lunr.trimmer = function (token) {
  return token.update(function (s) {
    return s.replace(/^\W+/, '').replace(/\W+$/, '')
  })
}

lunr.Pipeline.registerFunction(lunr.trimmer, 'trimmer')
/*!
 * lunr.TokenSet
 * Copyright (C) 2017 Oliver Nightingale
 */

/**
 * A token set is used to store the unique list of all tokens
 * within an index. Token sets are also used to represent an
 * incoming query to the index, this query token set and index
 * token set are then intersected to find which tokens to look
 * up in the inverted index.
 *
 * A token set can hold multiple tokens, as in the case of the
 * index token set, or it can hold a single token as in the
 * case of a simple query token set.
 *
 * Additionally token sets are used to perform wildcard matching.
 * Leading, contained and trailing wildcards are supported, and
 * from this edit distance matching can also be provided.
 *
 * Token sets are implemented as a minimal finite state automata,
 * where both common prefixes and suffixes are shared between tokens.
 * This helps to reduce the space used for storing the token set.
 *
 * @constructor
 */
lunr.TokenSet = function () {
  this.final = false
  this.edges = {}
  this.id = lunr.TokenSet._nextId
  lunr.TokenSet._nextId += 1
}

/**
 * Keeps track of the next, auto increment, identifier to assign
 * to a new tokenSet.
 *
 * TokenSets require a unique identifier to be correctly minimised.
 *
 * @private
 */
lunr.TokenSet._nextId = 1

/**
 * Creates a TokenSet instance from the given sorted array of words.
 *
 * @param {String[]} arr - A sorted array of strings to create the set from.
 * @returns {lunr.TokenSet}
 * @throws Will throw an error if the input array is not sorted.
 */
lunr.TokenSet.fromArray = function (arr) {
  var builder = new lunr.TokenSet.Builder

  for (var i = 0, len = arr.length; i < len; i++) {
    builder.insert(arr[i])
  }

  builder.finish()
  return builder.root
}

/**
 * Creates a token set from a query clause.
 *
 * @private
 * @param {Object} clause - A single clause from lunr.Query.
 * @param {string} clause.term - The query clause term.
 * @param {number} [clause.editDistance] - The optional edit distance for the term.
 * @returns {lunr.TokenSet}
 */
lunr.TokenSet.fromClause = function (clause) {
  if ('editDistance' in clause) {
    return lunr.TokenSet.fromFuzzyString(clause.term, clause.editDistance)
  } else {
    return lunr.TokenSet.fromString(clause.term)
  }
}

/**
 * Creates a token set representing a single string with a specified
 * edit distance.
 *
 * Insertions, deletions, substitutions and transpositions are each
 * treated as an edit distance of 1.
 *
 * Increasing the allowed edit distance will have a dramatic impact
 * on the performance of both creating and intersecting these TokenSets.
 * It is advised to keep the edit distance less than 3.
 *
 * @param {string} str - The string to create the token set from.
 * @param {number} editDistance - The allowed edit distance to match.
 * @returns {lunr.Vector}
 */
lunr.TokenSet.fromFuzzyString = function (str, editDistance) {
  var root = new lunr.TokenSet

  var stack = [{
    node: root,
    editsRemaining: editDistance,
    str: str
  }]

  while (stack.length) {
    var frame = stack.pop()

    // no edit
    if (frame.str.length > 0) {
      var char = frame.str.charAt(0),
          noEditNode

      if (char in frame.node.edges) {
        noEditNode = frame.node.edges[char]
      } else {
        noEditNode = new lunr.TokenSet
        frame.node.edges[char] = noEditNode
      }

      if (frame.str.length == 1) {
        noEditNode.final = true
      } else {
        stack.push({
          node: noEditNode,
          editsRemaining: frame.editsRemaining,
          str: frame.str.slice(1)
        })
      }
    }

    // deletion
    // can only do a deletion if we have enough edits remaining
    // and if there are characters left to delete in the string
    if (frame.editsRemaining > 0 && frame.str.length > 1) {
      var char = frame.str.charAt(1),
          deletionNode

      if (char in frame.node.edges) {
        deletionNode = frame.node.edges[char]
      } else {
        deletionNode = new lunr.TokenSet
        frame.node.edges[char] = deletionNode
      }

      if (frame.str.length <= 2) {
        deletionNode.final = true
      } else {
        stack.push({
          node: deletionNode,
          editsRemaining: frame.editsRemaining - 1,
          str: frame.str.slice(2)
        })
      }
    }

    // deletion
    // just removing the last character from the str
    if (frame.editsRemaining > 0 && frame.str.length == 1) {
      frame.node.final = true
    }

    // substitution
    // can only do a substitution if we have enough edits remaining
    // and if there are characters left to substitute
    if (frame.editsRemaining > 0 && frame.str.length >= 1) {
      if ("*" in frame.node.edges) {
        var substitutionNode = frame.node.edges["*"]
      } else {
        var substitutionNode = new lunr.TokenSet
        frame.node.edges["*"] = substitutionNode
      }

      if (frame.str.length == 1) {
        substitutionNode.final = true
      } else {
        stack.push({
          node: substitutionNode,
          editsRemaining: frame.editsRemaining - 1,
          str: frame.str.slice(1)
        })
      }
    }

    // insertion
    // can only do insertion if there are edits remaining
    if (frame.editsRemaining > 0) {
      if ("*" in frame.node.edges) {
        var insertionNode = frame.node.edges["*"]
      } else {
        var insertionNode = new lunr.TokenSet
        frame.node.edges["*"] = insertionNode
      }

      if (frame.str.length == 0) {
        insertionNode.final = true
      } else {
        stack.push({
          node: insertionNode,
          editsRemaining: frame.editsRemaining - 1,
          str: frame.str
        })
      }
    }

    // transposition
    // can only do a transposition if there are edits remaining
    // and there are enough characters to transpose
    if (frame.editsRemaining > 0 && frame.str.length > 1) {
      var charA = frame.str.charAt(0),
          charB = frame.str.charAt(1),
          transposeNode

      if (charB in frame.node.edges) {
        transposeNode = frame.node.edges[charB]
      } else {
        transposeNode = new lunr.TokenSet
        frame.node.edges[charB] = transposeNode
      }

      if (frame.str.length == 1) {
        transposeNode.final = true
      } else {
        stack.push({
          node: transposeNode,
          editsRemaining: frame.editsRemaining - 1,
          str: charA + frame.str.slice(2)
        })
      }
    }
  }

  return root
}

/**
 * Creates a TokenSet from a string.
 *
 * The string may contain one or more wildcard characters (*)
 * that will allow wildcard matching when intersecting with
 * another TokenSet.
 *
 * @param {string} str - The string to create a TokenSet from.
 * @returns {lunr.TokenSet}
 */
lunr.TokenSet.fromString = function (str) {
  var node = new lunr.TokenSet,
      root = node,
      wildcardFound = false

  /*
   * Iterates through all characters within the passed string
   * appending a node for each character.
   *
   * As soon as a wildcard character is found then a self
   * referencing edge is introduced to continually match
   * any number of any characters.
   */
  for (var i = 0, len = str.length; i < len; i++) {
    var char = str[i],
        final = (i == len - 1)

    if (char == "*") {
      wildcardFound = true
      node.edges[char] = node
      node.final = final

    } else {
      var next = new lunr.TokenSet
      next.final = final

      node.edges[char] = next
      node = next

      // TODO: is this needed anymore?
      if (wildcardFound) {
        node.edges["*"] = root
      }
    }
  }

  return root
}

/**
 * Converts this TokenSet into an array of strings
 * contained within the TokenSet.
 *
 * @returns {string[]}
 */
lunr.TokenSet.prototype.toArray = function () {
  var words = []

  var stack = [{
    prefix: "",
    node: this
  }]

  while (stack.length) {
    var frame = stack.pop(),
        edges = Object.keys(frame.node.edges),
        len = edges.length

    if (frame.node.final) {
      words.push(frame.prefix)
    }

    for (var i = 0; i < len; i++) {
      var edge = edges[i]

      stack.push({
        prefix: frame.prefix.concat(edge),
        node: frame.node.edges[edge]
      })
    }
  }

  return words
}

/**
 * Generates a string representation of a TokenSet.
 *
 * This is intended to allow TokenSets to be used as keys
 * in objects, largely to aid the construction and minimisation
 * of a TokenSet. As such it is not designed to be a human
 * friendly representation of the TokenSet.
 *
 * @returns {string}
 */
lunr.TokenSet.prototype.toString = function () {
  // NOTE: Using Object.keys here as this.edges is very likely
  // to enter 'hash-mode' with many keys being added
  //
  // avoiding a for-in loop here as it leads to the function
  // being de-optimised (at least in V8). From some simple
  // benchmarks the performance is comparable, but allowing
  // V8 to optimize may mean easy performance wins in the future.

  if (this._str) {
    return this._str
  }

  var str = this.final ? '1' : '0',
      labels = Object.keys(this.edges).sort(),
      len = labels.length

  for (var i = 0; i < len; i++) {
    var label = labels[i],
        node = this.edges[label]

    str = str + label + node.id
  }

  return str
}

/**
 * Returns a new TokenSet that is the intersection of
 * this TokenSet and the passed TokenSet.
 *
 * This intersection will take into account any wildcards
 * contained within the TokenSet.
 *
 * @param {lunr.TokenSet} b - An other TokenSet to intersect with.
 * @returns {lunr.TokenSet}
 */
lunr.TokenSet.prototype.intersect = function (b) {
  var output = new lunr.TokenSet,
      frame = undefined

  var stack = [{
    qNode: b,
    output: output,
    node: this
  }]

  while (stack.length) {
    frame = stack.pop()

    // NOTE: As with the #toString method, we are using
    // Object.keys and a for loop instead of a for-in loop
    // as both of these objects enter 'hash' mode, causing
    // the function to be de-optimised in V8
    var qEdges = Object.keys(frame.qNode.edges),
        qLen = qEdges.length,
        nEdges = Object.keys(frame.node.edges),
        nLen = nEdges.length

    for (var q = 0; q < qLen; q++) {
      var qEdge = qEdges[q]

      for (var n = 0; n < nLen; n++) {
        var nEdge = nEdges[n]

        if (nEdge == qEdge || qEdge == '*') {
          var node = frame.node.edges[nEdge],
              qNode = frame.qNode.edges[qEdge],
              final = node.final && qNode.final,
              next = undefined

          if (nEdge in frame.output.edges) {
            // an edge already exists for this character
            // no need to create a new node, just set the finality
            // bit unless this node is already final
            next = frame.output.edges[nEdge]
            next.final = next.final || final

          } else {
            // no edge exists yet, must create one
            // set the finality bit and insert it
            // into the output
            next = new lunr.TokenSet
            next.final = final
            frame.output.edges[nEdge] = next
          }

          stack.push({
            qNode: qNode,
            output: next,
            node: node
          })
        }
      }
    }
  }

  return output
}
lunr.TokenSet.Builder = function () {
  this.previousWord = ""
  this.root = new lunr.TokenSet
  this.uncheckedNodes = []
  this.minimizedNodes = {}
}

lunr.TokenSet.Builder.prototype.insert = function (word) {
  var node,
      commonPrefix = 0

  if (word < this.previousWord) {
    throw new Error ("Out of order word insertion")
  }

  for (var i = 0; i < word.length && i < this.previousWord.length; i++) {
    if (word[i] != this.previousWord[i]) break
    commonPrefix++
  }

  this.minimize(commonPrefix)

  if (this.uncheckedNodes.length == 0) {
    node = this.root
  } else {
    node = this.uncheckedNodes[this.uncheckedNodes.length - 1].child
  }

  for (var i = commonPrefix; i < word.length; i++) {
    var nextNode = new lunr.TokenSet,
        char = word[i]

    node.edges[char] = nextNode

    this.uncheckedNodes.push({
      parent: node,
      char: char,
      child: nextNode
    })

    node = nextNode
  }

  node.final = true
  this.previousWord = word
}

lunr.TokenSet.Builder.prototype.finish = function () {
  this.minimize(0)
}

lunr.TokenSet.Builder.prototype.minimize = function (downTo) {
  for (var i = this.uncheckedNodes.length - 1; i >= downTo; i--) {
    var node = this.uncheckedNodes[i],
        childKey = node.child.toString()

    if (childKey in this.minimizedNodes) {
      node.parent.edges[node.char] = this.minimizedNodes[childKey]
    } else {
      // Cache the key for this node since
      // we know it can't change anymore
      node.child._str = childKey

      this.minimizedNodes[childKey] = node.child
    }

    this.uncheckedNodes.pop()
  }
}
/*!
 * lunr.Index
 * Copyright (C) 2017 Oliver Nightingale
 */

/**
 * An index contains the built index of all documents and provides a query interface
 * to the index.
 *
 * Usually instances of lunr.Index will not be created using this constructor, instead
 * lunr.Builder should be used to construct new indexes, or lunr.Index.load should be
 * used to load previously built and serialized indexes.
 *
 * @constructor
 * @param {Object} attrs - The attributes of the built search index.
 * @param {Object} attrs.invertedIndex - An index of term/field to document reference.
 * @param {Object<string, lunr.Vector>} attrs.documentVectors - Document vectors keyed by document reference.
 * @param {lunr.TokenSet} attrs.tokenSet - An set of all corpus tokens.
 * @param {string[]} attrs.fields - The names of indexed document fields.
 * @param {lunr.Pipeline} attrs.pipeline - The pipeline to use for search terms.
 */
lunr.Index = function (attrs) {
  this.invertedIndex = attrs.invertedIndex
  this.fieldVectors = attrs.fieldVectors
  this.tokenSet = attrs.tokenSet
  this.fields = attrs.fields
  this.pipeline = attrs.pipeline
}

/**
 * A result contains details of a document matching a search query.
 * @typedef {Object} lunr.Index~Result
 * @property {string} ref - The reference of the document this result represents.
 * @property {number} score - A number between 0 and 1 representing how similar this document is to the query.
 * @property {lunr.MatchData} matchData - Contains metadata about this match including which term(s) caused the match.
 */

/**
 * Although lunr provides the ability to create queries using lunr.Query, it also provides a simple
 * query language which itself is parsed into an instance of lunr.Query.
 *
 * For programmatically building queries it is advised to directly use lunr.Query, the query language
 * is best used for human entered text rather than program generated text.
 *
 * At its simplest queries can just be a single term, e.g. `hello`, multiple terms are also supported
 * and will be combined with OR, e.g `hello world` will match documents that contain either 'hello'
 * or 'world', though those that contain both will rank higher in the results.
 *
 * Wildcards can be included in terms to match one or more unspecified characters, these wildcards can
 * be inserted anywhere within the term, and more than one wildcard can exist in a single term. Adding
 * wildcards will increase the number of documents that will be found but can also have a negative
 * impact on query performance, especially with wildcards at the beginning of a term.
 *
 * Terms can be restricted to specific fields, e.g. `title:hello`, only documents with the term
 * hello in the title field will match this query. Using a field not present in the index will lead
 * to an error being thrown.
 *
 * Modifiers can also be added to terms, lunr supports edit distance and boost modifiers on terms. A term
 * boost will make documents matching that term score higher, e.g. `foo^5`. Edit distance is also supported
 * to provide fuzzy matching, e.g. 'hello~2' will match documents with hello with an edit distance of 2.
 * Avoid large values for edit distance to improve query performance.
 *
 * To escape special characters the backslash character '\' can be used, this allows searches to include
 * characters that would normally be considered modifiers, e.g. `foo\~2` will search for a term "foo~2" instead
 * of attempting to apply a boost of 2 to the search term "foo".
 *
 * @typedef {string} lunr.Index~QueryString
 * @example <caption>Simple single term query</caption>
 * hello
 * @example <caption>Multiple term query</caption>
 * hello world
 * @example <caption>term scoped to a field</caption>
 * title:hello
 * @example <caption>term with a boost of 10</caption>
 * hello^10
 * @example <caption>term with an edit distance of 2</caption>
 * hello~2
 */

/**
 * Performs a search against the index using lunr query syntax.
 *
 * Results will be returned sorted by their score, the most relevant results
 * will be returned first.
 *
 * For more programmatic querying use lunr.Index#query.
 *
 * @param {lunr.Index~QueryString} queryString - A string containing a lunr query.
 * @throws {lunr.QueryParseError} If the passed query string cannot be parsed.
 * @returns {lunr.Index~Result[]}
 */
lunr.Index.prototype.search = function (queryString) {
  return this.query(function (query) {
    var parser = new lunr.QueryParser(queryString, query)
    parser.parse()
  })
}

/**
 * A query builder callback provides a query object to be used to express
 * the query to perform on the index.
 *
 * @callback lunr.Index~queryBuilder
 * @param {lunr.Query} query - The query object to build up.
 * @this lunr.Query
 */

/**
 * Performs a query against the index using the yielded lunr.Query object.
 *
 * If performing programmatic queries against the index, this method is preferred
 * over lunr.Index#search so as to avoid the additional query parsing overhead.
 *
 * A query object is yielded to the supplied function which should be used to
 * express the query to be run against the index.
 *
 * Note that although this function takes a callback parameter it is _not_ an
 * asynchronous operation, the callback is just yielded a query object to be
 * customized.
 *
 * @param {lunr.Index~queryBuilder} fn - A function that is used to build the query.
 * @returns {lunr.Index~Result[]}
 */
lunr.Index.prototype.query = function (fn) {
  // for each query clause
  // * process terms
  // * expand terms from token set
  // * find matching documents and metadata
  // * get document vectors
  // * score documents

  var query = new lunr.Query(this.fields),
      matchingFields = Object.create(null),
      queryVectors = Object.create(null),
      termFieldCache = Object.create(null)

  fn.call(query, query)

  for (var i = 0; i < query.clauses.length; i++) {
    /*
     * Unless the pipeline has been disabled for this term, which is
     * the case for terms with wildcards, we need to pass the clause
     * term through the search pipeline. A pipeline returns an array
     * of processed terms. Pipeline functions may expand the passed
     * term, which means we may end up performing multiple index lookups
     * for a single query term.
     */
    var clause = query.clauses[i],
        terms = null

    if (clause.usePipeline) {
      terms = this.pipeline.runString(clause.term)
    } else {
      terms = [clause.term]
    }

    for (var m = 0; m < terms.length; m++) {
      var term = terms[m]

      /*
       * Each term returned from the pipeline needs to use the same query
       * clause object, e.g. the same boost and or edit distance. The
       * simplest way to do this is to re-use the clause object but mutate
       * its term property.
       */
      clause.term = term

      /*
       * From the term in the clause we create a token set which will then
       * be used to intersect the indexes token set to get a list of terms
       * to lookup in the inverted index
       */
      var termTokenSet = lunr.TokenSet.fromClause(clause),
          expandedTerms = this.tokenSet.intersect(termTokenSet).toArray()

      for (var j = 0; j < expandedTerms.length; j++) {
        /*
         * For each term get the posting and termIndex, this is required for
         * building the query vector.
         */
        var expandedTerm = expandedTerms[j],
            posting = this.invertedIndex[expandedTerm],
            termIndex = posting._index

        for (var k = 0; k < clause.fields.length; k++) {
          /*
           * For each field that this query term is scoped by (by default
           * all fields are in scope) we need to get all the document refs
           * that have this term in that field.
           *
           * The posting is the entry in the invertedIndex for the matching
           * term from above.
           */
          var field = clause.fields[k],
              fieldPosting = posting[field],
              matchingDocumentRefs = Object.keys(fieldPosting),
              termField = expandedTerm + "/" + field

          /*
           * To support field level boosts a query vector is created per
           * field. This vector is populated using the termIndex found for
           * the term and a unit value with the appropriate boost applied.
           *
           * If the query vector for this field does not exist yet it needs
           * to be created.
           */
          if (queryVectors[field] === undefined) {
            queryVectors[field] = new lunr.Vector
          }

          /*
           * Using upsert because there could already be an entry in the vector
           * for the term we are working with. In that case we just add the scores
           * together.
           */
          queryVectors[field].upsert(termIndex, 1 * clause.boost, function (a, b) { return a + b })

          /**
           * If we've already seen this term, field combo then we've already collected
           * the matching documents and metadata, no need to go through all that again
           */
          if (termFieldCache[termField]) {
            continue
          }

          for (var l = 0; l < matchingDocumentRefs.length; l++) {
            /*
             * All metadata for this term/field/document triple
             * are then extracted and collected into an instance
             * of lunr.MatchData ready to be returned in the query
             * results
             */
            var matchingDocumentRef = matchingDocumentRefs[l],
                matchingFieldRef = new lunr.FieldRef (matchingDocumentRef, field),
                metadata = fieldPosting[matchingDocumentRef],
                fieldMatch

            if ((fieldMatch = matchingFields[matchingFieldRef]) === undefined) {
              matchingFields[matchingFieldRef] = new lunr.MatchData (expandedTerm, field, metadata)
            } else {
              fieldMatch.add(expandedTerm, term, metadata)
            }

          }

          termFieldCache[termField] = true
        }
      }
    }
  }

  var matchingFieldRefs = Object.keys(matchingFields),
      results = [],
      matches = Object.create(null)

  for (var i = 0; i < matchingFieldRefs.length; i++) {
    /*
     * Currently we have document fields that match the query, but we
     * need to return documents. The matchData and scores are combined
     * from multiple fields belonging to the same document.
     *
     * Scores are calculated by field, using the query vectors created
     * above, and combined into a final document score using addition.
     */
    var fieldRef = lunr.FieldRef.fromString(matchingFieldRefs[i]),
        docRef = fieldRef.docRef,
        fieldVector = this.fieldVectors[fieldRef],
        score = queryVectors[fieldRef.fieldName].similarity(fieldVector),
        docMatch

    if ((docMatch = matches[docRef]) !== undefined) {
      docMatch.score += score
      docMatch.matchData.combine(matchingFields[fieldRef])
    } else {
      var match = {
        ref: docRef,
        score: score,
        matchData: matchingFields[fieldRef]
      }
      matches[docRef] = match
      results.push(match)
    }
  }

  /*
   * Sort the results objects by score, highest first.
   */
  return results.sort(function (a, b) {
    return b.score - a.score
  })
}

/**
 * Prepares the index for JSON serialization.
 *
 * The schema for this JSON blob will be described in a
 * separate JSON schema file.
 *
 * @returns {Object}
 */
lunr.Index.prototype.toJSON = function () {
  var invertedIndex = Object.keys(this.invertedIndex)
    .sort()
    .map(function (term) {
      return [term, this.invertedIndex[term]]
    }, this)

  var fieldVectors = Object.keys(this.fieldVectors)
    .map(function (ref) {
      return [ref, this.fieldVectors[ref].toJSON()]
    }, this)

  return {
    version: lunr.version,
    fields: this.fields,
    fieldVectors: fieldVectors,
    invertedIndex: invertedIndex,
    pipeline: this.pipeline.toJSON()
  }
}

/**
 * Loads a previously serialized lunr.Index
 *
 * @param {Object} serializedIndex - A previously serialized lunr.Index
 * @returns {lunr.Index}
 */
lunr.Index.load = function (serializedIndex) {
  var attrs = {},
      fieldVectors = {},
      serializedVectors = serializedIndex.fieldVectors,
      invertedIndex = {},
      serializedInvertedIndex = serializedIndex.invertedIndex,
      tokenSetBuilder = new lunr.TokenSet.Builder,
      pipeline = lunr.Pipeline.load(serializedIndex.pipeline)

  if (serializedIndex.version != lunr.version) {
    lunr.utils.warn("Version mismatch when loading serialised index. Current version of lunr '" + lunr.version + "' does not match serialized index '" + serializedIndex.version + "'")
  }

  for (var i = 0; i < serializedVectors.length; i++) {
    var tuple = serializedVectors[i],
        ref = tuple[0],
        elements = tuple[1]

    fieldVectors[ref] = new lunr.Vector(elements)
  }

  for (var i = 0; i < serializedInvertedIndex.length; i++) {
    var tuple = serializedInvertedIndex[i],
        term = tuple[0],
        posting = tuple[1]

    tokenSetBuilder.insert(term)
    invertedIndex[term] = posting
  }

  tokenSetBuilder.finish()

  attrs.fields = serializedIndex.fields

  attrs.fieldVectors = fieldVectors
  attrs.invertedIndex = invertedIndex
  attrs.tokenSet = tokenSetBuilder.root
  attrs.pipeline = pipeline

  return new lunr.Index(attrs)
}
/*!
 * lunr.Builder
 * Copyright (C) 2017 Oliver Nightingale
 */

/**
 * lunr.Builder performs indexing on a set of documents and
 * returns instances of lunr.Index ready for querying.
 *
 * All configuration of the index is done via the builder, the
 * fields to index, the document reference, the text processing
 * pipeline and document scoring parameters are all set on the
 * builder before indexing.
 *
 * @constructor
 * @property {string} _ref - Internal reference to the document reference field.
 * @property {string[]} _fields - Internal reference to the document fields to index.
 * @property {object} invertedIndex - The inverted index maps terms to document fields.
 * @property {object} documentTermFrequencies - Keeps track of document term frequencies.
 * @property {object} documentLengths - Keeps track of the length of documents added to the index.
 * @property {lunr.tokenizer} tokenizer - Function for splitting strings into tokens for indexing.
 * @property {lunr.Pipeline} pipeline - The pipeline performs text processing on tokens before indexing.
 * @property {lunr.Pipeline} searchPipeline - A pipeline for processing search terms before querying the index.
 * @property {number} documentCount - Keeps track of the total number of documents indexed.
 * @property {number} _b - A parameter to control field length normalization, setting this to 0 disabled normalization, 1 fully normalizes field lengths, the default value is 0.75.
 * @property {number} _k1 - A parameter to control how quickly an increase in term frequency results in term frequency saturation, the default value is 1.2.
 * @property {number} termIndex - A counter incremented for each unique term, used to identify a terms position in the vector space.
 * @property {array} metadataWhitelist - A list of metadata keys that have been whitelisted for entry in the index.
 */
lunr.Builder = function () {
  this._ref = "id"
  this._fields = []
  this.invertedIndex = Object.create(null)
  this.fieldTermFrequencies = {}
  this.fieldLengths = {}
  this.tokenizer = lunr.tokenizer
  this.pipeline = new lunr.Pipeline
  this.searchPipeline = new lunr.Pipeline
  this.documentCount = 0
  this._b = 0.75
  this._k1 = 1.2
  this.termIndex = 0
  this.metadataWhitelist = []
}

/**
 * Sets the document field used as the document reference. Every document must have this field.
 * The type of this field in the document should be a string, if it is not a string it will be
 * coerced into a string by calling toString.
 *
 * The default ref is 'id'.
 *
 * The ref should _not_ be changed during indexing, it should be set before any documents are
 * added to the index. Changing it during indexing can lead to inconsistent results.
 *
 * @param {string} ref - The name of the reference field in the document.
 */
lunr.Builder.prototype.ref = function (ref) {
  this._ref = ref
}

/**
 * Adds a field to the list of document fields that will be indexed. Every document being
 * indexed should have this field. Null values for this field in indexed documents will
 * not cause errors but will limit the chance of that document being retrieved by searches.
 *
 * All fields should be added before adding documents to the index. Adding fields after
 * a document has been indexed will have no effect on already indexed documents.
 *
 * @param {string} field - The name of a field to index in all documents.
 */
lunr.Builder.prototype.field = function (field) {
  this._fields.push(field)
}

/**
 * A parameter to tune the amount of field length normalisation that is applied when
 * calculating relevance scores. A value of 0 will completely disable any normalisation
 * and a value of 1 will fully normalise field lengths. The default is 0.75. Values of b
 * will be clamped to the range 0 - 1.
 *
 * @param {number} number - The value to set for this tuning parameter.
 */
lunr.Builder.prototype.b = function (number) {
  if (number < 0) {
    this._b = 0
  } else if (number > 1) {
    this._b = 1
  } else {
    this._b = number
  }
}

/**
 * A parameter that controls the speed at which a rise in term frequency results in term
 * frequency saturation. The default value is 1.2. Setting this to a higher value will give
 * slower saturation levels, a lower value will result in quicker saturation.
 *
 * @param {number} number - The value to set for this tuning parameter.
 */
lunr.Builder.prototype.k1 = function (number) {
  this._k1 = number
}

/**
 * Adds a document to the index.
 *
 * Before adding fields to the index the index should have been fully setup, with the document
 * ref and all fields to index already having been specified.
 *
 * The document must have a field name as specified by the ref (by default this is 'id') and
 * it should have all fields defined for indexing, though null or undefined values will not
 * cause errors.
 *
 * @param {object} doc - The document to add to the index.
 */
lunr.Builder.prototype.add = function (doc) {
  var docRef = doc[this._ref]

  this.documentCount += 1

  for (var i = 0; i < this._fields.length; i++) {
    var fieldName = this._fields[i],
        field = doc[fieldName],
        tokens = this.tokenizer(field),
        terms = this.pipeline.run(tokens),
        fieldRef = new lunr.FieldRef (docRef, fieldName),
        fieldTerms = Object.create(null)

    this.fieldTermFrequencies[fieldRef] = fieldTerms
    this.fieldLengths[fieldRef] = 0

    // store the length of this field for this document
    this.fieldLengths[fieldRef] += terms.length

    // calculate term frequencies for this field
    for (var j = 0; j < terms.length; j++) {
      var term = terms[j]

      if (fieldTerms[term] == undefined) {
        fieldTerms[term] = 0
      }

      fieldTerms[term] += 1

      // add to inverted index
      // create an initial posting if one doesn't exist
      if (this.invertedIndex[term] == undefined) {
        var posting = Object.create(null)
        posting["_index"] = this.termIndex
        this.termIndex += 1

        for (var k = 0; k < this._fields.length; k++) {
          posting[this._fields[k]] = Object.create(null)
        }

        this.invertedIndex[term] = posting
      }

      // add an entry for this term/fieldName/docRef to the invertedIndex
      if (this.invertedIndex[term][fieldName][docRef] == undefined) {
        this.invertedIndex[term][fieldName][docRef] = Object.create(null)
      }

      // store all whitelisted metadata about this token in the
      // inverted index
      for (var l = 0; l < this.metadataWhitelist.length; l++) {
        var metadataKey = this.metadataWhitelist[l],
            metadata = term.metadata[metadataKey]

        if (this.invertedIndex[term][fieldName][docRef][metadataKey] == undefined) {
          this.invertedIndex[term][fieldName][docRef][metadataKey] = []
        }

        this.invertedIndex[term][fieldName][docRef][metadataKey].push(metadata)
      }
    }

  }
}

/**
 * Calculates the average document length for this index
 *
 * @private
 */
lunr.Builder.prototype.calculateAverageFieldLengths = function () {

  var fieldRefs = Object.keys(this.fieldLengths),
      numberOfFields = fieldRefs.length,
      accumulator = {},
      documentsWithField = {}

  for (var i = 0; i < numberOfFields; i++) {
    var fieldRef = lunr.FieldRef.fromString(fieldRefs[i]),
        field = fieldRef.fieldName

    documentsWithField[field] || (documentsWithField[field] = 0)
    documentsWithField[field] += 1

    accumulator[field] || (accumulator[field] = 0)
    accumulator[field] += this.fieldLengths[fieldRef]
  }

  for (var i = 0; i < this._fields.length; i++) {
    var field = this._fields[i]
    accumulator[field] = accumulator[field] / documentsWithField[field]
  }

  this.averageFieldLength = accumulator
}

/**
 * Builds a vector space model of every document using lunr.Vector
 *
 * @private
 */
lunr.Builder.prototype.createFieldVectors = function () {
  var fieldVectors = {},
      fieldRefs = Object.keys(this.fieldTermFrequencies),
      fieldRefsLength = fieldRefs.length,
      termIdfCache = Object.create(null)

  for (var i = 0; i < fieldRefsLength; i++) {
    var fieldRef = lunr.FieldRef.fromString(fieldRefs[i]),
        field = fieldRef.fieldName,
        fieldLength = this.fieldLengths[fieldRef],
        fieldVector = new lunr.Vector,
        termFrequencies = this.fieldTermFrequencies[fieldRef],
        terms = Object.keys(termFrequencies),
        termsLength = terms.length

    for (var j = 0; j < termsLength; j++) {
      var term = terms[j],
          tf = termFrequencies[term],
          termIndex = this.invertedIndex[term]._index,
          idf, score, scoreWithPrecision

      if (termIdfCache[term] === undefined) {
        idf = lunr.idf(this.invertedIndex[term], this.documentCount)
        termIdfCache[term] = idf
      } else {
        idf = termIdfCache[term]
      }

      score = idf * ((this._k1 + 1) * tf) / (this._k1 * (1 - this._b + this._b * (fieldLength / this.averageFieldLength[field])) + tf)
      scoreWithPrecision = Math.round(score * 1000) / 1000
      // Converts 1.23456789 to 1.234.
      // Reducing the precision so that the vectors take up less
      // space when serialised. Doing it now so that they behave
      // the same before and after serialisation. Also, this is
      // the fastest approach to reducing a number's precision in
      // JavaScript.

      fieldVector.insert(termIndex, scoreWithPrecision)
    }

    fieldVectors[fieldRef] = fieldVector
  }

  this.fieldVectors = fieldVectors
}

/**
 * Creates a token set of all tokens in the index using lunr.TokenSet
 *
 * @private
 */
lunr.Builder.prototype.createTokenSet = function () {
  this.tokenSet = lunr.TokenSet.fromArray(
    Object.keys(this.invertedIndex).sort()
  )
}

/**
 * Builds the index, creating an instance of lunr.Index.
 *
 * This completes the indexing process and should only be called
 * once all documents have been added to the index.
 *
 * @returns {lunr.Index}
 */
lunr.Builder.prototype.build = function () {
  this.calculateAverageFieldLengths()
  this.createFieldVectors()
  this.createTokenSet()

  return new lunr.Index({
    invertedIndex: this.invertedIndex,
    fieldVectors: this.fieldVectors,
    tokenSet: this.tokenSet,
    fields: this._fields,
    pipeline: this.searchPipeline
  })
}

/**
 * Applies a plugin to the index builder.
 *
 * A plugin is a function that is called with the index builder as its context.
 * Plugins can be used to customise or extend the behaviour of the index
 * in some way. A plugin is just a function, that encapsulated the custom
 * behaviour that should be applied when building the index.
 *
 * The plugin function will be called with the index builder as its argument, additional
 * arguments can also be passed when calling use. The function will be called
 * with the index builder as its context.
 *
 * @param {Function} plugin The plugin to apply.
 */
lunr.Builder.prototype.use = function (fn) {
  var args = Array.prototype.slice.call(arguments, 1)
  args.unshift(this)
  fn.apply(this, args)
}
/**
 * Contains and collects metadata about a matching document.
 * A single instance of lunr.MatchData is returned as part of every
 * lunr.Index~Result.
 *
 * @constructor
 * @param {string} term - The term this match data is associated with
 * @param {string} field - The field in which the term was found
 * @param {object} metadata - The metadata recorded about this term in this field
 * @property {object} metadata - A cloned collection of metadata associated with this document.
 * @see {@link lunr.Index~Result}
 */
lunr.MatchData = function (term, field, metadata) {
  var clonedMetadata = Object.create(null),
      metadataKeys = Object.keys(metadata)

  // Cloning the metadata to prevent the original
  // being mutated during match data combination.
  // Metadata is kept in an array within the inverted
  // index so cloning the data can be done with
  // Array#slice
  for (var i = 0; i < metadataKeys.length; i++) {
    var key = metadataKeys[i]
    clonedMetadata[key] = metadata[key].slice()
  }

  this.metadata = Object.create(null)
  this.metadata[term] = Object.create(null)
  this.metadata[term][field] = clonedMetadata
}

/**
 * An instance of lunr.MatchData will be created for every term that matches a
 * document. However only one instance is required in a lunr.Index~Result. This
 * method combines metadata from another instance of lunr.MatchData with this
 * objects metadata.
 *
 * @param {lunr.MatchData} otherMatchData - Another instance of match data to merge with this one.
 * @see {@link lunr.Index~Result}
 */
lunr.MatchData.prototype.combine = function (otherMatchData) {
  var terms = Object.keys(otherMatchData.metadata)

  for (var i = 0; i < terms.length; i++) {
    var term = terms[i],
        fields = Object.keys(otherMatchData.metadata[term])

    if (this.metadata[term] == undefined) {
      this.metadata[term] = Object.create(null)
    }

    for (var j = 0; j < fields.length; j++) {
      var field = fields[j],
          keys = Object.keys(otherMatchData.metadata[term][field])

      if (this.metadata[term][field] == undefined) {
        this.metadata[term][field] = Object.create(null)
      }

      for (var k = 0; k < keys.length; k++) {
        var key = keys[k]

        if (this.metadata[term][field][key] == undefined) {
          this.metadata[term][field][key] = otherMatchData.metadata[term][field][key]
        } else {
          this.metadata[term][field][key] = this.metadata[term][field][key].concat(otherMatchData.metadata[term][field][key])
        }

      }
    }
  }
}

/**
 * Add metadata for a term/field pair to this instance of match data.
 *
 * @param {string} term - The term this match data is associated with
 * @param {string} field - The field in which the term was found
 * @param {object} metadata - The metadata recorded about this term in this field
 */
lunr.MatchData.prototype.add = function (term, field, metadata) {
  if (!(term in this.metadata)) {
    this.metadata[term] = Object.create(null)
    this.metadata[term][field] = metadata
    return
  }

  if (!(field in this.metadata[term])) {
    this.metadata[term][field] = metadata
    return
  }

  var metadataKeys = Object.keys(metadata)

  for (var i = 0; i < metadataKeys.length; i++) {
    var key = metadataKeys[i]

    if (key in this.metadata[term][field]) {
      this.metadata[term][field][key] = this.metadata[term][field][key].concat(metadata[key])
    } else {
      this.metadata[term][field][key] = metadata[key]
    }
  }
}
/**
 * A lunr.Query provides a programmatic way of defining queries to be performed
 * against a {@link lunr.Index}.
 *
 * Prefer constructing a lunr.Query using the {@link lunr.Index#query} method
 * so the query object is pre-initialized with the right index fields.
 *
 * @constructor
 * @property {lunr.Query~Clause[]} clauses - An array of query clauses.
 * @property {string[]} allFields - An array of all available fields in a lunr.Index.
 */
lunr.Query = function (allFields) {
  this.clauses = []
  this.allFields = allFields
}

/**
 * Constants for indicating what kind of automatic wildcard insertion will be used when constructing a query clause.
 *
 * This allows wildcards to be added to the beginning and end of a term without having to manually do any string
 * concatenation.
 *
 * The wildcard constants can be bitwise combined to select both leading and trailing wildcards.
 *
 * @constant
 * @default
 * @property {number} wildcard.NONE - The term will have no wildcards inserted, this is the default behaviour
 * @property {number} wildcard.LEADING - Prepend the term with a wildcard, unless a leading wildcard already exists
 * @property {number} wildcard.TRAILING - Append a wildcard to the term, unless a trailing wildcard already exists
 * @see lunr.Query~Clause
 * @see lunr.Query#clause
 * @see lunr.Query#term
 * @example <caption>query term with trailing wildcard</caption>
 * query.term('foo', { wildcard: lunr.Query.wildcard.TRAILING })
 * @example <caption>query term with leading and trailing wildcard</caption>
 * query.term('foo', {
 *   wildcard: lunr.Query.wildcard.LEADING | lunr.Query.wildcard.TRAILING
 * })
 */
lunr.Query.wildcard = new String ("*")
lunr.Query.wildcard.NONE = 0
lunr.Query.wildcard.LEADING = 1
lunr.Query.wildcard.TRAILING = 2

/**
 * A single clause in a {@link lunr.Query} contains a term and details on how to
 * match that term against a {@link lunr.Index}.
 *
 * @typedef {Object} lunr.Query~Clause
 * @property {string[]} fields - The fields in an index this clause should be matched against.
 * @property {number} [boost=1] - Any boost that should be applied when matching this clause.
 * @property {number} [editDistance] - Whether the term should have fuzzy matching applied, and how fuzzy the match should be.
 * @property {boolean} [usePipeline] - Whether the term should be passed through the search pipeline.
 * @property {number} [wildcard=0] - Whether the term should have wildcards appended or prepended.
 */

/**
 * Adds a {@link lunr.Query~Clause} to this query.
 *
 * Unless the clause contains the fields to be matched all fields will be matched. In addition
 * a default boost of 1 is applied to the clause.
 *
 * @param {lunr.Query~Clause} clause - The clause to add to this query.
 * @see lunr.Query~Clause
 * @returns {lunr.Query}
 */
lunr.Query.prototype.clause = function (clause) {
  if (!('fields' in clause)) {
    clause.fields = this.allFields
  }

  if (!('boost' in clause)) {
    clause.boost = 1
  }

  if (!('usePipeline' in clause)) {
    clause.usePipeline = true
  }

  if (!('wildcard' in clause)) {
    clause.wildcard = lunr.Query.wildcard.NONE
  }

  if ((clause.wildcard & lunr.Query.wildcard.LEADING) && (clause.term.charAt(0) != lunr.Query.wildcard)) {
    clause.term = "*" + clause.term
  }

  if ((clause.wildcard & lunr.Query.wildcard.TRAILING) && (clause.term.slice(-1) != lunr.Query.wildcard)) {
    clause.term = "" + clause.term + "*"
  }

  this.clauses.push(clause)

  return this
}

/**
 * Adds a term to the current query, under the covers this will create a {@link lunr.Query~Clause}
 * to the list of clauses that make up this query.
 *
 * @param {string} term - The term to add to the query.
 * @param {Object} [options] - Any additional properties to add to the query clause.
 * @returns {lunr.Query}
 * @see lunr.Query#clause
 * @see lunr.Query~Clause
 * @example <caption>adding a single term to a query</caption>
 * query.term("foo")
 * @example <caption>adding a single term to a query and specifying search fields, term boost and automatic trailing wildcard</caption>
 * query.term("foo", {
 *   fields: ["title"],
 *   boost: 10,
 *   wildcard: lunr.Query.wildcard.TRAILING
 * })
 */
lunr.Query.prototype.term = function (term, options) {
  var clause = options || {}
  clause.term = term

  this.clause(clause)

  return this
}
lunr.QueryParseError = function (message, start, end) {
  this.name = "QueryParseError"
  this.message = message
  this.start = start
  this.end = end
}

lunr.QueryParseError.prototype = new Error
lunr.QueryLexer = function (str) {
  this.lexemes = []
  this.str = str
  this.length = str.length
  this.pos = 0
  this.start = 0
  this.escapeCharPositions = []
}

lunr.QueryLexer.prototype.run = function () {
  var state = lunr.QueryLexer.lexText

  while (state) {
    state = state(this)
  }
}

lunr.QueryLexer.prototype.sliceString = function () {
  var subSlices = [],
      sliceStart = this.start,
      sliceEnd = this.pos

  for (var i = 0; i < this.escapeCharPositions.length; i++) {
    sliceEnd = this.escapeCharPositions[i]
    subSlices.push(this.str.slice(sliceStart, sliceEnd))
    sliceStart = sliceEnd + 1
  }

  subSlices.push(this.str.slice(sliceStart, this.pos))
  this.escapeCharPositions.length = 0

  return subSlices.join('')
}

lunr.QueryLexer.prototype.emit = function (type) {
  this.lexemes.push({
    type: type,
    str: this.sliceString(),
    start: this.start,
    end: this.pos
  })

  this.start = this.pos
}

lunr.QueryLexer.prototype.escapeCharacter = function () {
  this.escapeCharPositions.push(this.pos - 1)
  this.pos += 1
}

lunr.QueryLexer.prototype.next = function () {
  if (this.pos >= this.length) {
    return lunr.QueryLexer.EOS
  }

  var char = this.str.charAt(this.pos)
  this.pos += 1
  return char
}

lunr.QueryLexer.prototype.width = function () {
  return this.pos - this.start
}

lunr.QueryLexer.prototype.ignore = function () {
  if (this.start == this.pos) {
    this.pos += 1
  }

  this.start = this.pos
}

lunr.QueryLexer.prototype.backup = function () {
  this.pos -= 1
}

lunr.QueryLexer.prototype.acceptDigitRun = function () {
  var char, charCode

  do {
    char = this.next()
    charCode = char.charCodeAt(0)
  } while (charCode > 47 && charCode < 58)

  if (char != lunr.QueryLexer.EOS) {
    this.backup()
  }
}

lunr.QueryLexer.prototype.more = function () {
  return this.pos < this.length
}

lunr.QueryLexer.EOS = 'EOS'
lunr.QueryLexer.FIELD = 'FIELD'
lunr.QueryLexer.TERM = 'TERM'
lunr.QueryLexer.EDIT_DISTANCE = 'EDIT_DISTANCE'
lunr.QueryLexer.BOOST = 'BOOST'

lunr.QueryLexer.lexField = function (lexer) {
  lexer.backup()
  lexer.emit(lunr.QueryLexer.FIELD)
  lexer.ignore()
  return lunr.QueryLexer.lexText
}

lunr.QueryLexer.lexTerm = function (lexer) {
  if (lexer.width() > 1) {
    lexer.backup()
    lexer.emit(lunr.QueryLexer.TERM)
  }

  lexer.ignore()

  if (lexer.more()) {
    return lunr.QueryLexer.lexText
  }
}

lunr.QueryLexer.lexEditDistance = function (lexer) {
  lexer.ignore()
  lexer.acceptDigitRun()
  lexer.emit(lunr.QueryLexer.EDIT_DISTANCE)
  return lunr.QueryLexer.lexText
}

lunr.QueryLexer.lexBoost = function (lexer) {
  lexer.ignore()
  lexer.acceptDigitRun()
  lexer.emit(lunr.QueryLexer.BOOST)
  return lunr.QueryLexer.lexText
}

lunr.QueryLexer.lexEOS = function (lexer) {
  if (lexer.width() > 0) {
    lexer.emit(lunr.QueryLexer.TERM)
  }
}

// This matches the separator used when tokenising fields
// within a document. These should match otherwise it is
// not possible to search for some tokens within a document.
//
// It is possible for the user to change the separator on the
// tokenizer so it _might_ clash with any other of the special
// characters already used within the search string, e.g. :.
//
// This means that it is possible to change the separator in
// such a way that makes some words unsearchable using a search
// string.
lunr.QueryLexer.termSeparator = lunr.tokenizer.separator

lunr.QueryLexer.lexText = function (lexer) {
  while (true) {
    var char = lexer.next()

    if (char == lunr.QueryLexer.EOS) {
      return lunr.QueryLexer.lexEOS
    }

    // Escape character is '\'
    if (char.charCodeAt(0) == 92) {
      lexer.escapeCharacter()
      continue
    }

    if (char == ":") {
      return lunr.QueryLexer.lexField
    }

    if (char == "~") {
      lexer.backup()
      if (lexer.width() > 0) {
        lexer.emit(lunr.QueryLexer.TERM)
      }
      return lunr.QueryLexer.lexEditDistance
    }

    if (char == "^") {
      lexer.backup()
      if (lexer.width() > 0) {
        lexer.emit(lunr.QueryLexer.TERM)
      }
      return lunr.QueryLexer.lexBoost
    }

    if (char.match(lunr.QueryLexer.termSeparator)) {
      return lunr.QueryLexer.lexTerm
    }
  }
}

lunr.QueryParser = function (str, query) {
  this.lexer = new lunr.QueryLexer (str)
  this.query = query
  this.currentClause = {}
  this.lexemeIdx = 0
}

lunr.QueryParser.prototype.parse = function () {
  this.lexer.run()
  this.lexemes = this.lexer.lexemes

  var state = lunr.QueryParser.parseFieldOrTerm

  while (state) {
    state = state(this)
  }

  return this.query
}

lunr.QueryParser.prototype.peekLexeme = function () {
  return this.lexemes[this.lexemeIdx]
}

lunr.QueryParser.prototype.consumeLexeme = function () {
  var lexeme = this.peekLexeme()
  this.lexemeIdx += 1
  return lexeme
}

lunr.QueryParser.prototype.nextClause = function () {
  var completedClause = this.currentClause
  this.query.clause(completedClause)
  this.currentClause = {}
}

lunr.QueryParser.parseFieldOrTerm = function (parser) {
  var lexeme = parser.peekLexeme()

  if (lexeme == undefined) {
    return
  }

  switch (lexeme.type) {
    case lunr.QueryLexer.FIELD:
      return lunr.QueryParser.parseField
    case lunr.QueryLexer.TERM:
      return lunr.QueryParser.parseTerm
    default:
      var errorMessage = "expected either a field or a term, found " + lexeme.type

      if (lexeme.str.length >= 1) {
        errorMessage += " with value '" + lexeme.str + "'"
      }

      throw new lunr.QueryParseError (errorMessage, lexeme.start, lexeme.end)
  }
}

lunr.QueryParser.parseField = function (parser) {
  var lexeme = parser.consumeLexeme()

  if (lexeme == undefined) {
    return
  }

  if (parser.query.allFields.indexOf(lexeme.str) == -1) {
    var possibleFields = parser.query.allFields.map(function (f) { return "'" + f + "'" }).join(', '),
        errorMessage = "unrecognised field '" + lexeme.str + "', possible fields: " + possibleFields

    throw new lunr.QueryParseError (errorMessage, lexeme.start, lexeme.end)
  }

  parser.currentClause.fields = [lexeme.str]

  var nextLexeme = parser.peekLexeme()

  if (nextLexeme == undefined) {
    var errorMessage = "expecting term, found nothing"
    throw new lunr.QueryParseError (errorMessage, lexeme.start, lexeme.end)
  }

  switch (nextLexeme.type) {
    case lunr.QueryLexer.TERM:
      return lunr.QueryParser.parseTerm
    default:
      var errorMessage = "expecting term, found '" + nextLexeme.type + "'"
      throw new lunr.QueryParseError (errorMessage, nextLexeme.start, nextLexeme.end)
  }
}

lunr.QueryParser.parseTerm = function (parser) {
  var lexeme = parser.consumeLexeme()

  if (lexeme == undefined) {
    return
  }

  parser.currentClause.term = lexeme.str.toLowerCase()

  if (lexeme.str.indexOf("*") != -1) {
    parser.currentClause.usePipeline = false
  }

  var nextLexeme = parser.peekLexeme()

  if (nextLexeme == undefined) {
    parser.nextClause()
    return
  }

  switch (nextLexeme.type) {
    case lunr.QueryLexer.TERM:
      parser.nextClause()
      return lunr.QueryParser.parseTerm
    case lunr.QueryLexer.FIELD:
      parser.nextClause()
      return lunr.QueryParser.parseField
    case lunr.QueryLexer.EDIT_DISTANCE:
      return lunr.QueryParser.parseEditDistance
    case lunr.QueryLexer.BOOST:
      return lunr.QueryParser.parseBoost
    default:
      var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'"
      throw new lunr.QueryParseError (errorMessage, nextLexeme.start, nextLexeme.end)
  }
}

lunr.QueryParser.parseEditDistance = function (parser) {
  var lexeme = parser.consumeLexeme()

  if (lexeme == undefined) {
    return
  }

  var editDistance = parseInt(lexeme.str, 10)

  if (isNaN(editDistance)) {
    var errorMessage = "edit distance must be numeric"
    throw new lunr.QueryParseError (errorMessage, lexeme.start, lexeme.end)
  }

  parser.currentClause.editDistance = editDistance

  var nextLexeme = parser.peekLexeme()

  if (nextLexeme == undefined) {
    parser.nextClause()
    return
  }

  switch (nextLexeme.type) {
    case lunr.QueryLexer.TERM:
      parser.nextClause()
      return lunr.QueryParser.parseTerm
    case lunr.QueryLexer.FIELD:
      parser.nextClause()
      return lunr.QueryParser.parseField
    case lunr.QueryLexer.EDIT_DISTANCE:
      return lunr.QueryParser.parseEditDistance
    case lunr.QueryLexer.BOOST:
      return lunr.QueryParser.parseBoost
    default:
      var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'"
      throw new lunr.QueryParseError (errorMessage, nextLexeme.start, nextLexeme.end)
  }
}

lunr.QueryParser.parseBoost = function (parser) {
  var lexeme = parser.consumeLexeme()

  if (lexeme == undefined) {
    return
  }

  var boost = parseInt(lexeme.str, 10)

  if (isNaN(boost)) {
    var errorMessage = "boost must be numeric"
    throw new lunr.QueryParseError (errorMessage, lexeme.start, lexeme.end)
  }

  parser.currentClause.boost = boost

  var nextLexeme = parser.peekLexeme()

  if (nextLexeme == undefined) {
    parser.nextClause()
    return
  }

  switch (nextLexeme.type) {
    case lunr.QueryLexer.TERM:
      parser.nextClause()
      return lunr.QueryParser.parseTerm
    case lunr.QueryLexer.FIELD:
      parser.nextClause()
      return lunr.QueryParser.parseField
    case lunr.QueryLexer.EDIT_DISTANCE:
      return lunr.QueryParser.parseEditDistance
    case lunr.QueryLexer.BOOST:
      return lunr.QueryParser.parseBoost
    default:
      var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'"
      throw new lunr.QueryParseError (errorMessage, nextLexeme.start, nextLexeme.end)
  }
}

  /**
   * export the module via AMD, CommonJS or as a browser global
   * Export code from https://github.com/umdjs/umd/blob/master/returnExports.js
   */
  ;(function (root, factory) {
    if (true) {
      // AMD. Register as an anonymous module.
      !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
    } else if (typeof exports === 'object') {
      /**
       * Node. Does not work with strict CommonJS, but
       * only CommonJS-like enviroments that support module.exports,
       * like Node.
       */
      module.exports = factory()
    } else {
      // Browser globals (root is window)
      root.lunr = factory()
    }
  }(this, function () {
    /**
     * Just return a value to define the module export.
     * This example returns an object, but the module
     * can return a function as the exported value.
     */
    return lunr
  }))
})();


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _Position = __webpack_require__(43);

var _Position2 = _interopRequireDefault(_Position);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* ----------------------------------------------------------------------------
 * Module
 * ------------------------------------------------------------------------- */

exports.default = {
  Position: _Position2.default
}; /*
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

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

/* ----------------------------------------------------------------------------
 * Class
 * ------------------------------------------------------------------------- */

var Position = function () {

  /**
   * Set sidebars to locked state and limit height to parent node
   *
   * @constructor
   *
   * @property {HTMLElement} el_ - Sidebar
   * @property {HTMLElement} parent_ - Sidebar container
   * @property {HTMLElement} header_ - Header
   * @property {number} height_ - Current sidebar height
   * @property {number} offset_ - Current page y-offset
   * @property {boolean} pad_ - Pad when header is fixed
   *
   * @param {(string|HTMLElement)} el - Selector or HTML element
   * @param {(string|HTMLElement)} header - Selector or HTML element
   */
  function Position(el, header) {
    _classCallCheck(this, Position);

    var ref = typeof el === "string" ? document.querySelector(el) : el;
    if (!(ref instanceof HTMLElement) || !(ref.parentNode instanceof HTMLElement)) throw new ReferenceError();
    this.el_ = ref;
    this.parent_ = ref.parentNode;

    /* Retrieve header */
    ref = typeof header === "string" ? document.querySelector(header) : header;
    if (!(ref instanceof HTMLElement)) throw new ReferenceError();
    this.header_ = ref;

    /* Initialize current height and test whether header is fixed */
    this.height_ = 0;
    this.pad_ = window.getComputedStyle(this.header_).position === "fixed";
  }

  /**
   * Initialize sidebar state
   */


  Position.prototype.setup = function setup() {
    var top = Array.prototype.reduce.call(this.parent_.children, function (offset, child) {
      return Math.max(offset, child.offsetTop);
    }, 0);

    /* Set lock offset for element with largest top offset */
    this.offset_ = top - (this.pad_ ? this.header_.offsetHeight : 0);
    this.update();
  };

  /**
   * Update locked state and height
   *
   * The inner height of the window (= the visible area) is the maximum
   * possible height for the stretching sidebar. This height must be deducted
   * by the height of the fixed header (56px). Depending on the page y-offset,
   * the top offset of the sidebar must be taken into account, as well as the
   * case where the window is scrolled beyond the sidebar container.
   *
   * @param {Event?} ev - Event
   */


  Position.prototype.update = function update(ev) {
    var offset = window.pageYOffset;
    var visible = window.innerHeight;

    /* Update offset, in case window is resized */
    if (ev && ev.type === "resize") this.setup();

    /* Set bounds of sidebar container - must be calculated on every run, as
       the height of the content might change due to loading images etc. */
    var bounds = {
      top: this.pad_ ? this.header_.offsetHeight : 0,
      bottom: this.parent_.offsetTop + this.parent_.offsetHeight

      /* Calculate new offset and height */
    };var height = visible - bounds.top - Math.max(0, this.offset_ - offset) - Math.max(0, offset + visible - bounds.bottom);

    /* If height changed, update element */
    if (height !== this.height_) this.el_.style.height = (this.height_ = height) + "px";

    /* Sidebar should be locked, as we're below parent offset */
    if (offset >= this.offset_) {
      if (this.el_.dataset.mdState !== "lock") this.el_.dataset.mdState = "lock";

      /* Sidebar should be unlocked, if locked */
    } else if (this.el_.dataset.mdState === "lock") {
      this.el_.dataset.mdState = "";
    }
  };

  /**
   * Reset locked state and height
   */


  Position.prototype.reset = function reset() {
    this.el_.dataset.mdState = "";
    this.el_.style.height = "";
    this.height_ = 0;
  };

  return Position;
}();

exports.default = Position;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _Adapter = __webpack_require__(45);

var _Adapter2 = _interopRequireDefault(_Adapter);

var _Repository = __webpack_require__(49);

var _Repository2 = _interopRequireDefault(_Repository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* ----------------------------------------------------------------------------
 * Module
 * ------------------------------------------------------------------------- */

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

exports.default = {
  Adapter: _Adapter2.default,
  Repository: _Repository2.default
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _GitHub = __webpack_require__(46);

var _GitHub2 = _interopRequireDefault(_GitHub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* ----------------------------------------------------------------------------
 * Module
 * ------------------------------------------------------------------------- */

exports.default = {
  GitHub: _GitHub2.default
}; /*
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

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _Abstract2 = __webpack_require__(47);

var _Abstract3 = _interopRequireDefault(_Abstract2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
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

/* ----------------------------------------------------------------------------
 * Class
 * ------------------------------------------------------------------------- */

var GitHub = function (_Abstract) {
  _inherits(GitHub, _Abstract);

  /**
   * Retrieve repository information from GitHub
   *
   * @constructor
   *
   * @property {string} name_ - Name of the repository
   *
   * @param {(string|HTMLAnchorElement)} el - Selector or HTML element
   */
  function GitHub(el) {
    _classCallCheck(this, GitHub);

    /* Extract user (and repository name) from URL, as we have to query for all
       repositories, to omit 404 errors for private repositories */
    var _this = _possibleConstructorReturn(this, _Abstract.call(this, el));

    var matches = /^.+github\.com\/([^/]+)\/?([^/]+)?.*$/.exec(_this.base_);
    if (matches && matches.length === 3) {
      var user = matches[1],
          name = matches[2];

      /* Initialize base URL and repository name */

      _this.base_ = "https://api.github.com/users/" + user + "/repos";
      _this.name_ = name;
    }
    return _this;
  }

  /**
   * Fetch relevant repository information from GitHub
   *
   * @return {Promise<Array<string>>} Promise returning an array of facts
   */


  GitHub.prototype.fetch_ = function fetch_() {
    var _this2 = this;

    var paginate = function paginate() {
      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      return fetch(_this2.base_ + "?per_page=30&page=" + page).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (!(data instanceof Array)) throw new TypeError();

        /* Display number of stars and forks, if repository is given */
        if (_this2.name_) {
          var repo = data.find(function (item) {
            return item.name === _this2.name_;
          });
          if (!repo && data.length === 30) return paginate(page + 1);

          /* If we found a repo, extract the facts */
          return repo ? [_this2.format_(repo.stargazers_count) + " Stars", _this2.format_(repo.forks_count) + " Forks"] : [];

          /* Display number of repositories, otherwise */
        } else {
          return [data.length + " Repositories"];
        }
      });
    };

    /* Paginate through repos */
    return paginate();
  };

  return GitHub;
}(_Abstract3.default);

exports.default = GitHub;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _jsCookie = __webpack_require__(48);

var _jsCookie2 = _interopRequireDefault(_jsCookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
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

/* ----------------------------------------------------------------------------
 * Class
 * ------------------------------------------------------------------------- */

var Abstract = function () {

  /**
   * Retrieve repository information
   *
   * @constructor
   *
   * @property {HTMLAnchorElement} el_ - Link to repository
   * @property {string} base_ - API base URL
   * @property {number} salt_ - Unique identifier
   *
   * @param {(string|HTMLAnchorElement)} el - Selector or HTML element
   */
  function Abstract(el) {
    _classCallCheck(this, Abstract);

    var ref = typeof el === "string" ? document.querySelector(el) : el;
    if (!(ref instanceof HTMLAnchorElement)) throw new ReferenceError();
    this.el_ = ref;

    /* Retrieve base URL */
    this.base_ = this.el_.href;
    this.salt_ = this.hash_(this.base_);
  }

  /**
   * Retrieve data from Cookie or fetch from respective API
   *
   * @return {Promise<Array<string>>} Promise that returns an array of facts
   */


  Abstract.prototype.fetch = function fetch() {
    var _this = this;

    return new Promise(function (resolve) {
      var cached = _jsCookie2.default.getJSON(_this.salt_ + ".cache-source");
      if (typeof cached !== "undefined") {
        resolve(cached);

        /* If the data is not cached in a cookie, invoke fetch and set
           a cookie that automatically expires in 15 minutes */
      } else {
        _this.fetch_().then(function (data) {
          _jsCookie2.default.set(_this.salt_ + ".cache-source", data, { expires: 1 / 96 });
          resolve(data);
        });
      }
    });
  };

  /**
   * Abstract private function that fetches relevant repository information
   *
   * @abstract
   */


  Abstract.prototype.fetch_ = function fetch_() {
    throw new Error("fetch_(): Not implemented");
  };

  /**
   * Format a number with suffix
   *
   * @param {number} number - Number to format
   * @return {string} Formatted number
   */


  Abstract.prototype.format_ = function format_(number) {
    if (number > 10000) return (number / 1000).toFixed(0) + "k";else if (number > 1000) return (number / 1000).toFixed(1) + "k";
    return "" + number;
  };

  /**
   * Simple hash function
   *
   * Taken from http://stackoverflow.com/a/7616484/1065584
   *
   * @param {string} str - Input string
   * @return {number} Hashed string
   */


  Abstract.prototype.hash_ = function hash_(str) {
    var hash = 0;
    if (str.length === 0) return hash;
    for (var i = 0, len = str.length; i < len; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };

  return Abstract;
}();

exports.default = Abstract;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		registeredInModuleLoader = true;
	}
	if (true) {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return (document.cookie = key + '=' + value + stringifiedAttributes);
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!this.json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(JSX) {

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

/* ----------------------------------------------------------------------------
 * Class
 * ------------------------------------------------------------------------- */

var Repository = function () {

  /**
   * Render repository information
   *
   * @constructor
   *
   * @property {HTMLElement} el_ - Repository information
   *
   * @param {(string|HTMLElement)} el - Selector or HTML element
   */
  function Repository(el) {
    _classCallCheck(this, Repository);

    var ref = typeof el === "string" ? document.querySelector(el) : el;
    if (!(ref instanceof HTMLElement)) throw new ReferenceError();
    this.el_ = ref;
  }

  /**
   * Initialize the repository
   *
   * @param {Array<string>} facts - Facts to be rendered
   */


  Repository.prototype.initialize = function initialize(facts) {
    if (facts.length && this.el_.children.length) this.el_.children[this.el_.children.length - 1].appendChild(JSX.createElement(
      "ul",
      { "class": "md-source__facts" },
      facts.map(function (fact) {
        return JSX.createElement(
          "li",
          { "class": "md-source__fact" },
          fact
        );
      })
    ));

    /* Finish rendering with animation */
    this.el_.dataset.mdState = "done";
  };

  return Repository;
}();

exports.default = Repository;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _Toggle = __webpack_require__(51);

var _Toggle2 = _interopRequireDefault(_Toggle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* ----------------------------------------------------------------------------
 * Module
 * ------------------------------------------------------------------------- */

exports.default = {
  Toggle: _Toggle2.default
}; /*
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

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

/* ----------------------------------------------------------------------------
 * Class
 * ------------------------------------------------------------------------- */

var Toggle = function () {

  /**
   * Toggle tabs visibility depending on page y-offset
   *
   * @constructor
   *
   * @property {HTMLElement} el_ - Content container
   * @property {number} offset_ - Toggle page-y offset
   * @property {boolean} active_ - Tabs visibility
   *
   * @param {(string|HTMLElement)} el - Selector or HTML element
   */
  function Toggle(el) {
    _classCallCheck(this, Toggle);

    var ref = typeof el === "string" ? document.querySelector(el) : el;
    if (!(ref instanceof Node)) throw new ReferenceError();
    this.el_ = ref;

    /* Initialize offset and state */
    this.offset_ = 5;
    this.active_ = false;
  }

  /**
   * Update visibility
   */


  Toggle.prototype.update = function update() {
    var active = window.pageYOffset >= this.offset_;
    if (active !== this.active_) this.el_.dataset.mdState = (this.active_ = active) ? "hidden" : "";
  };

  /**
   * Reset visibility
   */


  Toggle.prototype.reset = function reset() {
    this.el_.dataset.mdState = "";
    this.active_ = false;
  };

  return Toggle;
}();

exports.default = Toggle;

/***/ })
/******/ ])));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2YyMjhmMDEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9wcm92aWRlcnMvanN4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91bmZldGNoL2Rpc3QvdW5mZXRjaC5lcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvTWF0ZXJpYWwvRXZlbnQvTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9hcHBsaWNhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltYWdlcy9pY29ucy9iaXRidWNrZXQuc3ZnIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2ljb25zL2dpdGh1Yi5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvaWNvbnMvZ2l0bGFiLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlc2hlZXRzL2FwcGxpY2F0aW9uLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9zdHlsZXNoZWV0cy9hcHBsaWNhdGlvbi1wYWxldHRlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2N1c3RvbS1ldmVudC1wb2x5ZmlsbC9jdXN0b20tZXZlbnQtcG9seWZpbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3VuZmV0Y2gvcG9seWZpbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb21pc2UtcG9seWZpbGwvcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2V0aW1tZWRpYXRlL3NldEltbWVkaWF0ZS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NsaXBib2FyZC9saWIvY2xpcGJvYXJkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jbGlwYm9hcmQvbGliL2NsaXBib2FyZC1hY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NlbGVjdC9zcmMvc2VsZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55LWVtaXR0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dvb2QtbGlzdGVuZXIvc3JjL2xpc3Rlbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ29vZC1saXN0ZW5lci9zcmMvaXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RlbGVnYXRlL3NyYy9kZWxlZ2F0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGVsZWdhdGUvc3JjL2Nsb3Nlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Zhc3RjbGljay9saWIvZmFzdGNsaWNrLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9NYXRlcmlhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvTWF0ZXJpYWwvRXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01hdGVyaWFsL0V2ZW50L01hdGNoTWVkaWEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01hdGVyaWFsL0hlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvTWF0ZXJpYWwvSGVhZGVyL1NoYWRvdy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvTWF0ZXJpYWwvSGVhZGVyL1RpdGxlLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9NYXRlcmlhbC9OYXYuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01hdGVyaWFsL05hdi9CbHVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9NYXRlcmlhbC9OYXYvQ29sbGFwc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01hdGVyaWFsL05hdi9TY3JvbGxpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01hdGVyaWFsL1NlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvTWF0ZXJpYWwvU2VhcmNoL0xvY2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01hdGVyaWFsL1NlYXJjaC9SZXN1bHQuanN4Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lc2NhcGUtc3RyaW5nLXJlZ2V4cC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbHVuci9sdW5yLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9NYXRlcmlhbC9TaWRlYmFyLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9NYXRlcmlhbC9TaWRlYmFyL1Bvc2l0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9NYXRlcmlhbC9Tb3VyY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01hdGVyaWFsL1NvdXJjZS9BZGFwdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9NYXRlcmlhbC9Tb3VyY2UvQWRhcHRlci9HaXRIdWIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01hdGVyaWFsL1NvdXJjZS9BZGFwdGVyL0Fic3RyYWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9qcy1jb29raWUvc3JjL2pzLmNvb2tpZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvTWF0ZXJpYWwvU291cmNlL1JlcG9zaXRvcnkuanN4Iiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9NYXRlcmlhbC9UYWJzLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9NYXRlcmlhbC9UYWJzL1RvZ2dsZS5qcyJdLCJuYW1lcyI6WyJjcmVhdGVFbGVtZW50IiwidGFnIiwicHJvcGVydGllcyIsImVsIiwiZG9jdW1lbnQiLCJBcnJheSIsInByb3RvdHlwZSIsImZvckVhY2giLCJjYWxsIiwiT2JqZWN0Iiwia2V5cyIsInNldEF0dHJpYnV0ZSIsImF0dHIiLCJpdGVyYXRlQ2hpbGROb2RlcyIsIm5vZGVzIiwibm9kZSIsInRleHRDb250ZW50IiwiaXNBcnJheSIsIl9faHRtbCIsImlubmVySFRNTCIsIk5vZGUiLCJhcHBlbmRDaGlsZCIsImNoaWxkcmVuIiwiTGlzdGVuZXIiLCJlbHMiLCJldmVudHMiLCJoYW5kbGVyIiwiZWxzXyIsInNsaWNlIiwicXVlcnlTZWxlY3RvckFsbCIsImNvbmNhdCIsImhhbmRsZXJfIiwidXBkYXRlIiwiZXZlbnRzXyIsInVwZGF0ZV8iLCJldiIsImxpc3RlbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInNldHVwIiwidW5saXN0ZW4iLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVzZXQiLCJ3aW5kb3ciLCJQcm9taXNlIiwidHJhbnNsYXRlIiwia2V5IiwiXyIsIm1ldGEiLCJnZXRFbGVtZW50c0J5TmFtZSIsIkhUTUxNZXRhRWxlbWVudCIsIlJlZmVyZW5jZUVycm9yIiwiY29udGVudCIsImluaXRpYWxpemUiLCJjb25maWciLCJFdmVudCIsImJvZHkiLCJIVE1MRWxlbWVudCIsImF0dGFjaCIsIk1vZGVybml6ciIsImFkZFRlc3QiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJtYXRjaCIsInRhYmxlcyIsIndyYXAiLCJ0YWJsZSIsIm5leHRTaWJsaW5nIiwicGFyZW50Tm9kZSIsImluc2VydEJlZm9yZSIsImlzU3VwcG9ydGVkIiwiYmxvY2tzIiwiYmxvY2siLCJpbmRleCIsImlkIiwiYnV0dG9uIiwicGFyZW50IiwiY29weSIsIm9uIiwibWVzc2FnZSIsImFjdGlvbiIsInRyaWdnZXIiLCJxdWVyeVNlbGVjdG9yIiwiY2xlYXJTZWxlY3Rpb24iLCJkYXRhc2V0IiwibWRUaW1lciIsImNsZWFyVGltZW91dCIsInBhcnNlSW50IiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0VGltZW91dCIsInJlbW92ZSIsInRvU3RyaW5nIiwiZGV0YWlscyIsInN1bW1hcnkiLCJ0YXJnZXQiLCJoYXNBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJsb2NhdGlvbiIsImhhc2giLCJnZXRFbGVtZW50QnlJZCIsInN1YnN0cmluZyIsIkhUTUxEZXRhaWxzRWxlbWVudCIsIm9wZW4iLCJsb2MiLCJpb3MiLCJzY3JvbGxhYmxlIiwiaXRlbSIsInRvcCIsInNjcm9sbFRvcCIsIm9mZnNldEhlaWdodCIsInNjcm9sbEhlaWdodCIsIk1hdGNoTWVkaWEiLCJIZWFkZXIiLCJTaGFkb3ciLCJUaXRsZSIsIlRhYnMiLCJUb2dnbGUiLCJTaWRlYmFyIiwiUG9zaXRpb24iLCJOYXYiLCJCbHVyIiwiY29sbGFwc2libGVzIiwiY29sbGFwc2UiLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwiQ29sbGFwc2UiLCJTY3JvbGxpbmciLCJTZWFyY2giLCJMb2NrIiwiUmVzdWx0IiwiZmV0Y2giLCJ1cmwiLCJiYXNlIiwidmVyc2lvbiIsImNyZWRlbnRpYWxzIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImRhdGEiLCJkb2NzIiwibWFwIiwiZG9jIiwidG9nZ2xlIiwiSFRNTElucHV0RWxlbWVudCIsImNoZWNrZWQiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJxdWVyeSIsImZvY3VzIiwibWV0YUtleSIsImN0cmxLZXkiLCJrZXlDb2RlIiwiYWN0aXZlRWxlbWVudCIsInByZXZlbnREZWZhdWx0IiwiSFRNTExpbmtFbGVtZW50IiwiZ2V0QXR0cmlidXRlIiwiYmx1ciIsImluZGV4T2YiLCJzaGlmdEtleSIsImxpbmtzIiwiZmluZCIsImxpbmsiLCJtZFN0YXRlIiwiTWF0aCIsIm1heCIsImxlbmd0aCIsInN0b3BQcm9wYWdhdGlvbiIsImZvcm0iLCJyZXNvbHZlIiwiSFRNTEFuY2hvckVsZW1lbnQiLCJtZFNvdXJjZSIsIlNvdXJjZSIsIkFkYXB0ZXIiLCJHaXRIdWIiLCJzb3VyY2VzIiwiUmVwb3NpdG9yeSIsInNvdXJjZSIsImZhY3RzIiwiYXBwIiwibGlzdGVuZXIiLCJtcSIsIm1hdGNoZXMiLCJtZWRpYSIsIm1hdGNoTWVkaWEiLCJhZGRMaXN0ZW5lciIsImhlYWRlciIsInJlZiIsImVsXyIsImhlYWRlcl8iLCJoZWlnaHRfIiwiYWN0aXZlXyIsImN1cnJlbnQiLCJhY3RpdmUiLCJwYWdlWU9mZnNldCIsIkhUTUxIZWFkaW5nRWxlbWVudCIsInN0eWxlIiwid2lkdGgiLCJvZmZzZXRXaWR0aCIsIm9mZnNldFRvcCIsInR5cGUiLCJpbmRleF8iLCJvZmZzZXRfIiwiZGlyXyIsImFuY2hvcnNfIiwicmVkdWNlIiwiYW5jaG9ycyIsIm9mZnNldCIsImRpciIsImkiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJoZWlnaHQiLCJtYXhIZWlnaHQiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJlbmQiLCJtYWluIiwid2Via2l0T3ZlcmZsb3dTY3JvbGxpbmciLCJ0b2dnbGVzIiwicGFuZSIsIm5leHRFbGVtZW50U2libGluZyIsInRhZ05hbWUiLCJsb2NrXyIsInNjcm9sbFRvIiwidHJ1bmNhdGUiLCJzdHJpbmciLCJuIiwibGlzdCIsImRhdGFfIiwibWV0YV8iLCJsaXN0XyIsIm1lc3NhZ2VfIiwicGxhY2Vob2xkZXIiLCJub25lIiwib25lIiwib3RoZXIiLCJ0b2tlbml6ZXIiLCJzZXBhcmF0b3IiLCJsYW5nXyIsInNwbGl0IiwiZmlsdGVyIiwiQm9vbGVhbiIsImxhbmciLCJ0cmltIiwiaW5pdCIsImRvY3NfIiwicGF0aCIsImdldCIsImRvbmUiLCJ0aXRsZSIsInRleHQiLCJyZXBsYWNlIiwiY2hhciIsInNldCIsIk1hcCIsInN0YWNrXyIsInBpcGVsaW5lIiwidHJpbW1lciIsInN0b3BXb3JkRmlsdGVyIiwidXNlIiwibXVsdGlMYW5ndWFnZSIsImZpZWxkIiwiYm9vc3QiLCJjb250YWluZXIiLCJzcGxpY2UiLCJyZW5kZXIiLCJ2YWx1ZSIsInZhbHVlXyIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsInJlc3VsdCIsInRvTG93ZXJDYXNlIiwidGVybSIsIndpbGRjYXJkIiwiUXVlcnkiLCJUUkFJTElORyIsIml0ZW1zIiwiUmVnRXhwIiwiaGlnaGxpZ2h0IiwidG9rZW4iLCJhcnRpY2xlIiwic2VjdGlvbnMiLCJzZWN0aW9uIiwicHVzaCIsInNoaWZ0IiwiYW5jaG9yIiwiZXYyIiwiaHJlZiIsInNpemUiLCJwYXJlbnRfIiwicGFkXyIsImdldENvbXB1dGVkU3R5bGUiLCJwb3NpdGlvbiIsImNoaWxkIiwidmlzaWJsZSIsImlubmVySGVpZ2h0IiwiYm91bmRzIiwiYm90dG9tIiwiZXhlYyIsImJhc2VfIiwidXNlciIsIm5hbWUiLCJuYW1lXyIsImZldGNoXyIsInBhZ2luYXRlIiwicGFnZSIsIlR5cGVFcnJvciIsInJlcG8iLCJmb3JtYXRfIiwic3RhcmdhemVyc19jb3VudCIsImZvcmtzX2NvdW50IiwiQWJzdHJhY3QiLCJzYWx0XyIsImhhc2hfIiwiY2FjaGVkIiwiZ2V0SlNPTiIsImV4cGlyZXMiLCJFcnJvciIsIm51bWJlciIsInRvRml4ZWQiLCJzdHIiLCJsZW4iLCJjaGFyQ29kZUF0IiwiZmFjdCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQzdEQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQTs7OztBQUlBO2tCQUNlLFNBQVU7O0FBRXZCOzs7Ozs7Ozs7QUFTQUEsZUFYdUIseUJBV1RDLEdBWFMsRUFXSkMsVUFYSSxFQVdxQjtBQUMxQyxRQUFNQyxLQUFLQyxTQUFTSixhQUFULENBQXVCQyxHQUF2QixDQUFYOztBQUVBO0FBQ0EsUUFBSUMsVUFBSixFQUNFRyxNQUFNQyxTQUFOLENBQWdCQyxPQUFoQixDQUF3QkMsSUFBeEIsQ0FBNkJDLE9BQU9DLElBQVAsQ0FBWVIsVUFBWixDQUE3QixFQUFzRCxnQkFBUTtBQUM1REMsU0FBR1EsWUFBSCxDQUFnQkMsSUFBaEIsRUFBc0JWLFdBQVdVLElBQVgsQ0FBdEI7QUFDRCxLQUZEOztBQUlGO0FBQ0EsUUFBTUMsb0JBQW9CLFNBQXBCQSxpQkFBb0IsUUFBUztBQUNqQ1IsWUFBTUMsU0FBTixDQUFnQkMs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QUNBO0FBQ0EsMENBQTBDLHNCQUFzQixFQUFFO0FBQ2xFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7OztBQ3pMRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1Qzs7Ozs7OztBQ3BCQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVOzs7Ozs7O0FDdkx0QztBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDJCQUEyQixrQkFBa0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsMkNBQTJDO0FBQzlELG1CQUFtQixPQUFPO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsT0FBTztBQUMxQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQyxFOzs7Ozs7QUM5TUQ7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkIsa0JBQWtCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxtQkFBbUIsT0FBTztBQUMxQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsT0FBTztBQUMxQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDQTtBQUNBLFlBQVksTUFBTTtBQUNsQixjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLFlBQVksNkJBQTZCO0FBQ3pDLGNBQWM7QUFDZDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE1BQU07QUFDbEIsY0FBYztBQUNkO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLFlBQVksTUFBTTtBQUNsQixjQUFjO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxNQUFNO0FBQ2xCLGNBQWM7QUFDZDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCLFlBQVksT0FBTyxZQUFZO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQUE7QUFDSCxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDbHpCRDs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFD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QUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxJQUFJOztBQUVQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLFlBQVksV0FBVztBQUN2QixhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtFQUFrRSx1QkFBdUI7QUFDekY7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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LGNBQUosRUFBTjtBQUNGLFNBQUt3SSxHQUFMLEdBQVdELEdBQVg7O0FBRUE7QUFDQSxTQUFLZSxPQUFMLEdBQWUsQ0FBZjtBQUNBLFNBQUtYLE9BQUwsR0FBZSxLQUFmO0FBQ0Q7O0FBRUQ7Ozs7O21CQUdBOUosTSxxQkFBUztBQUNQLFFBQU1nSyxTQUFTckosT0FBT3NKLFdBQVAsSUFBc0IsS0FBS1EsT0FBMUM7QUFDQSxRQUFJVCxXQUFXLEtBQUtGLE9BQXBCLEVBQ0UsS0FBS0gsR0FBTCxDQUFTdkcsT0FBVCxDQUFpQjhFLE9BQWpCLEdBQTJCLENBQUMsS0FBSzRCLE9BQUwsR0FBZUUsTUFBaEIsSUFBMEIsUUFBMUIsR0FBcUMsRUFBaEU7QUFDSCxHOztBQUVEOzs7OzttQkFHQXRKLEssb0JBQVE7QUFDTixTQUFLaUosR0FBTCxDQUFTdkcsT0FBVCxDQUFpQjhFLE9BQWpCLEdBQTJCLEVBQTNCO0FBQ0EsU0FBSzRCLE9BQUwsR0FBZSxLQUFmO0FBQ0QsRzs7Ozs7a0JBekNrQnpFLE0iLCJmaWxlIjoiYXNzZXRzL2phdmFzY3JpcHRzL2FwcGxpY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgY2YyMjhmMDEiLCIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTcgTWFydGluIERvbmF0aCA8bWFydGluLmRvbmF0aEBzcXVpZGZ1bmsuY29tPlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvXG4gKiBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZVxuICogcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yXG4gKiBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OLUlORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuICogRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HU1xuICogSU4gVEhFIFNPRlRXQVJFLlxuICovXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIE1vZHVsZVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlcnNjb3JlLWRhbmdsZSAqL1xuZXhwb3J0IGRlZmF1bHQgLyogSlNYICovIHtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmF0aXZlIERPTSBub2RlIGZyb20gSlNYJ3MgaW50ZXJtZWRpYXRlIHJlcHJlc2VudGF0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgLSBUYWcgbmFtZVxuICAgKiBAcGFyYW0gez9PYmplY3R9IHByb3BlcnRpZXMgLSBQcm9wZXJ0aWVzXG4gICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nIHwgbnVtYmVyIHwgeyBfX2h0bWw6IHN0cmluZyB9IHwgQXJyYXk8SFRNTEVsZW1lbnQ+Pn1cbiAgICogICBjaGlsZHJlbiAtIENoaWxkIG5vZGVzXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fSBOYXRpdmUgRE9NIG5vZGVcbiAgICovXG4gIGNyZWF0ZUVsZW1lbnQodGFnLCBwcm9wZXJ0aWVzLCAuLi5jaGlsZHJlbikge1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpXG5cbiAgICAvKiBTZXQgYWxsIHByb3BlcnRpZXMgKi9cbiAgICBpZiAocHJvcGVydGllcylcbiAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoT2JqZWN0LmtleXMocHJvcGVydGllcyksIGF0dHIgPT4ge1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoYXR0ciwgcHJvcGVydGllc1thdHRyXSlcbiAgICAgIH0pXG5cbiAgICAvKiBJdGVyYXRlIGNoaWxkIG5vZGVzICovXG4gICAgY29uc3QgaXRlcmF0ZUNoaWxkTm9kZXMgPSBub2RlcyA9PiB7XG4gICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKG5vZGVzLCBub2RlID0+IHtcblxuICAgICAgICAvKiBEaXJlY3RseSBhcHBlbmQgdGV4dCBjb250ZW50ICovXG4gICAgICAgIGlmICh0eXBlb2Ygbm9kZSA9PT0gXCJzdHJpbmdcIiB8fFxuICAgICAgICAgICAgdHlwZW9mIG5vZGUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICBlbC50ZXh0Q29udGVudCArPSBub2RlXG5cbiAgICAgICAgLyogUmVjdXJzZSwgaWYgd2UgZ290IGFuIGFycmF5ICovXG4gICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShub2RlKSkge1xuICAgICAgICAgIGl0ZXJhdGVDaGlsZE5vZGVzKG5vZGUpXG5cbiAgICAgICAgLyogQXBwZW5kIHJhdyBIVE1MICovXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG5vZGUuX19odG1sICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgZWwuaW5uZXJIVE1MICs9IG5vZGUuX19odG1sXG5cbiAgICAgICAgLyogQXBwZW5kIHJlZ3VsYXIgbm9kZXMgKi9cbiAgICAgICAgfSBlbHNlIGlmIChub2RlIGluc3RhbmNlb2YgTm9kZSkge1xuICAgICAgICAgIGVsLmFwcGVuZENoaWxkKG5vZGUpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLyogSXRlcmF0ZSBjaGlsZCBub2RlcyBhbmQgcmV0dXJuIGVsZW1lbnQgKi9cbiAgICBpdGVyYXRlQ2hpbGROb2RlcyhjaGlsZHJlbilcbiAgICByZXR1cm4gZWxcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9wcm92aWRlcnMvanN4LmpzIiwidmFyIGluZGV4ID0gdHlwZW9mIGZldGNoPT0nZnVuY3Rpb24nID8gZmV0Y2guYmluZCgpIDogZnVuY3Rpb24odXJsLCBvcHRpb25zKSB7XG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHRyZXR1cm4gbmV3IFByb21pc2UoIGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG5cdFx0cmVxdWVzdC5vcGVuKG9wdGlvbnMubWV0aG9kIHx8ICdnZXQnLCB1cmwpO1xuXG5cdFx0Zm9yICh2YXIgaSBpbiBvcHRpb25zLmhlYWRlcnMpIHtcblx0XHRcdHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihpLCBvcHRpb25zLmhlYWRlcnNbaV0pO1xuXHRcdH1cblxuXHRcdHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gb3B0aW9ucy5jcmVkZW50aWFscz09J2luY2x1ZGUnO1xuXG5cdFx0cmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXNvbHZlKHJlc3BvbnNlKCkpO1xuXHRcdH07XG5cblx0XHRyZXF1ZXN0Lm9uZXJyb3IgPSByZWplY3Q7XG5cblx0XHRyZXF1ZXN0LnNlbmQob3B0aW9ucy5ib2R5KTtcblxuXHRcdGZ1bmN0aW9uIHJlc3BvbnNlKCkge1xuXHRcdFx0dmFyIGtleXMgPSBbXSxcblx0XHRcdFx0YWxsID0gW10sXG5cdFx0XHRcdGhlYWRlcnMgPSB7fSxcblx0XHRcdFx0aGVhZGVyO1xuXG5cdFx0XHRyZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpLnJlcGxhY2UoL14oLio/KTpcXHMqKFtcXHNcXFNdKj8pJC9nbSwgZnVuY3Rpb24gKG0sIGtleSwgdmFsdWUpIHtcblx0XHRcdFx0a2V5cy5wdXNoKGtleSA9IGtleS50b0xvd2VyQ2FzZSgpKTtcblx0XHRcdFx0YWxsLnB1c2goW2tleSwgdmFsdWVdKTtcblx0XHRcdFx0aGVhZGVyID0gaGVhZGVyc1trZXldO1xuXHRcdFx0XHRoZWFkZXJzW2tleV0gPSBoZWFkZXIgPyAoaGVhZGVyICsgXCIsXCIgKyB2YWx1ZSkgOiB2YWx1ZTtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRvazogKHJlcXVlc3Quc3RhdHVzLzIwMHwwKSA9PSAxLFx0XHQvLyAyMDAtMjk5XG5cdFx0XHRcdHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG5cdFx0XHRcdHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcblx0XHRcdFx0dXJsOiByZXF1ZXN0LnJlc3BvbnNlVVJMLFxuXHRcdFx0XHRjbG9uZTogcmVzcG9uc2UsXG5cdFx0XHRcdHRleHQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7IH0sXG5cdFx0XHRcdGpzb246IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCkudGhlbihKU09OLnBhcnNlKTsgfSxcblx0XHRcdFx0YmxvYjogZnVuY3Rpb24gKCkgeyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFtyZXF1ZXN0LnJlc3BvbnNlXSkpOyB9LFxuXHRcdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFx0a2V5czogZnVuY3Rpb24gKCkgeyByZXR1cm4ga2V5czsgfSxcblx0XHRcdFx0XHRlbnRyaWVzOiBmdW5jdGlvbiAoKSB7IHJldHVybiBhbGw7IH0sXG5cdFx0XHRcdFx0Z2V0OiBmdW5jdGlvbiAobikgeyByZXR1cm4gaGVhZGVyc1tuLnRvTG93ZXJDYXNlKCldOyB9LFxuXHRcdFx0XHRcdGhhczogZnVuY3Rpb24gKG4pIHsgcmV0dXJuIG4udG9Mb3dlckNhc2UoKSBpbiBoZWFkZXJzOyB9XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fVxuXHR9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGluZGV4O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dW5mZXRjaC5lcy5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3VuZmV0Y2gvZGlzdC91bmZldGNoLmVzLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxNyBNYXJ0aW4gRG9uYXRoIDxtYXJ0aW4uZG9uYXRoQHNxdWlkZnVuay5jb20+XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG9cbiAqIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlXG4gKiByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3JcbiAqIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04tSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HXG4gKiBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTXG4gKiBJTiBUSEUgU09GVFdBUkUuXG4gKi9cblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ2xhc3NcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdGVuZXIge1xuXG4gIC8qKlxuICAgKiBHZW5lcmljIGV2ZW50IGxpc3RlbmVyXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKlxuICAgKiBAcHJvcGVydHkgeyhBcnJheTxFdmVudFRhcmdldD4pfSBlbHNfIC0gRXZlbnQgdGFyZ2V0c1xuICAgKiBAcHJvcGVydHkge09iamVjdH0gaGFuZGxlcl8tIEV2ZW50IGhhbmRsZXJzXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXk8c3RyaW5nPn0gZXZlbnRzXyAtIEV2ZW50IG5hbWVzXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZV8gLSBVcGRhdGUgaGFuZGxlclxuICAgKlxuICAgKiBAcGFyYW0gez8oc3RyaW5nfEV2ZW50VGFyZ2V0fE5vZGVMaXN0PEV2ZW50VGFyZ2V0Pil9IGVscyAtXG4gICAqICAgU2VsZWN0b3Igb3IgRXZlbnQgdGFyZ2V0c1xuICAgKiBAcGFyYW0geyhzdHJpbmd8QXJyYXk8c3RyaW5nPil9IGV2ZW50cyAtIEV2ZW50IG5hbWVzXG4gICAqIEBwYXJhbSB7KE9iamVjdHxGdW5jdGlvbil9IGhhbmRsZXIgLSBIYW5kbGVyIHRvIGJlIGludm9rZWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKGVscywgZXZlbnRzLCBoYW5kbGVyKSB7XG4gICAgdGhpcy5lbHNfID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoXG4gICAgICAodHlwZW9mIGVscyA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVscylcbiAgICAgICAgOiBbXS5jb25jYXQoZWxzKSlcblxuICAgIC8qIFNldCBoYW5kbGVyIGFzIGZ1bmN0aW9uIG9yIGRpcmVjdGx5IGFzIG9iamVjdCAqL1xuICAgIHRoaXMuaGFuZGxlcl8gPSB0eXBlb2YgaGFuZGxlciA9PT0gXCJmdW5jdGlvblwiXG4gICAgICA/IHsgdXBkYXRlOiBoYW5kbGVyIH1cbiAgICAgIDogaGFuZGxlclxuXG4gICAgLyogSW5pdGlhbGl6ZSBldmVudCBuYW1lcyBhbmQgdXBkYXRlIGhhbmRsZXIgKi9cbiAgICB0aGlzLmV2ZW50c18gPSBbXS5jb25jYXQoZXZlbnRzKVxuICAgIHRoaXMudXBkYXRlXyA9IGV2ID0+IHRoaXMuaGFuZGxlcl8udXBkYXRlKGV2KVxuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGxpc3RlbmVyIGZvciBhbGwgcmVsZXZhbnQgZXZlbnRzXG4gICAqL1xuICBsaXN0ZW4oKSB7XG4gICAgdGhpcy5lbHNfLmZvckVhY2goZWwgPT4ge1xuICAgICAgdGhpcy5ldmVudHNfLmZvckVhY2goZXZlbnQgPT4ge1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLnVwZGF0ZV8sIGZhbHNlKVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgLyogRXhlY3V0ZSBzZXR1cCBoYW5kbGVyLCBpZiBpbXBsZW1lbnRlZCAqL1xuICAgIGlmICh0eXBlb2YgdGhpcy5oYW5kbGVyXy5zZXR1cCA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgdGhpcy5oYW5kbGVyXy5zZXR1cCgpXG4gIH1cblxuICAvKipcbiAgICogVW5yZWdpc3RlciBsaXN0ZW5lciBmb3IgYWxsIHJlbGV2YW50IGV2ZW50c1xuICAgKi9cbiAgdW5saXN0ZW4oKSB7XG4gICAgdGhpcy5lbHNfLmZvckVhY2goZWwgPT4ge1xuICAgICAgdGhpcy5ldmVudHNfLmZvckVhY2goZXZlbnQgPT4ge1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLnVwZGF0ZV8pXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICAvKiBFeGVjdXRlIHJlc2V0IGhhbmRsZXIsIGlmIGltcGxlbWVudGVkICovXG4gICAgaWYgKHR5cGVvZiB0aGlzLmhhbmRsZXJfLnJlc2V0ID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICB0aGlzLmhhbmRsZXJfLnJlc2V0KClcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01hdGVyaWFsL0V2ZW50L0xpc3RlbmVyLmpzIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE3IE1hcnRpbiBEb25hdGggPG1hcnRpbi5kb25hdGhAc3F1aWRmdW5rLmNvbT5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0b1xuICogZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGVcbiAqIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vclxuICogc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTi1JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkdcbiAqIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1NcbiAqIElOIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgXCIuLi9pbWFnZXMvaWNvbnMvYml0YnVja2V0LnN2Z1wiXG5pbXBvcnQgXCIuLi9pbWFnZXMvaWNvbnMvZ2l0aHViLnN2Z1wiXG5pbXBvcnQgXCIuLi9pbWFnZXMvaWNvbnMvZ2l0bGFiLnN2Z1wiXG5cbmltcG9ydCBcIi4uL3N0eWxlc2hlZXRzL2FwcGxpY2F0aW9uLnNjc3NcIlxuaW1wb3J0IFwiLi4vc3R5bGVzaGVldHMvYXBwbGljYXRpb24tcGFsZXR0ZS5zY3NzXCJcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogUG9seWZpbGxzXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmltcG9ydCBcImN1c3RvbS1ldmVudC1wb2x5ZmlsbFwiXG5pbXBvcnQgXCJ1bmZldGNoL3BvbHlmaWxsXCJcblxuaW1wb3J0IFByb21pc2UgZnJvbSBcInByb21pc2UtcG9seWZpbGxcIlxud2luZG93LlByb21pc2UgPSB3aW5kb3cuUHJvbWlzZSB8fCBQcm9taXNlXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIERlcGVuZGVuY2llc1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5pbXBvcnQgQ2xpcGJvYXJkIGZyb20gXCJjbGlwYm9hcmRcIlxuaW1wb3J0IEZhc3RDbGljayBmcm9tIFwiZmFzdGNsaWNrXCJcblxuaW1wb3J0IE1hdGVyaWFsIGZyb20gXCIuL2NvbXBvbmVudHMvTWF0ZXJpYWxcIlxuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBGdW5jdGlvbnNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuLyoqXG4gKiBSZXR1cm4gdGhlIG1ldGEgdGFnIHZhbHVlIGZvciB0aGUgZ2l2ZW4ga2V5XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIE1ldGEgbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IFtfXSAtIFN0b3AgRmxvdyBjb21wbGFpbmluZyAoVE9ETylcbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd9IE1ldGEgY29udGVudCB2YWx1ZVxuICovXG5jb25zdCB0cmFuc2xhdGUgPSAoa2V5LCBfKSA9PiB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgY29uc3QgbWV0YSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKGBsYW5nOiR7a2V5fWApWzBdXG4gIGlmICghKG1ldGEgaW5zdGFuY2VvZiBIVE1MTWV0YUVsZW1lbnQpKVxuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuICByZXR1cm4gbWV0YS5jb250ZW50XG59XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEFwcGxpY2F0aW9uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbi8qKlxuICogSW5pdGlhbGl6ZSBNYXRlcmlhbCBmb3IgTWtEb2NzXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIENvbmZpZ3VyYXRpb25cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZShjb25maWcpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLXN0eWxlXG5cbiAgLyogSW5pdGlhbGl6ZSBNb2Rlcm5penIgYW5kIEZhc3RDbGljayAqL1xuICBuZXcgTWF0ZXJpYWwuRXZlbnQuTGlzdGVuZXIoZG9jdW1lbnQsIFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgaWYgKCEoZG9jdW1lbnQuYm9keSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSlcbiAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuXG4gICAgLyogQXR0YWNoIEZhc3RDbGljayB0byBtaXRpZ2F0ZSAzMDBtcyBkZWxheSBvbiB0b3VjaCBkZXZpY2VzICovXG4gICAgRmFzdENsaWNrLmF0dGFjaChkb2N1bWVudC5ib2R5KVxuXG4gICAgLyogVGVzdCBmb3IgaU9TICovXG4gICAgTW9kZXJuaXpyLmFkZFRlc3QoXCJpb3NcIiwgKCkgPT4ge1xuICAgICAgcmV0dXJuICEhbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvKGlQYWR8aVBob25lfGlQb2QpL2cpXG4gICAgfSlcblxuICAgIC8qIFdyYXAgYWxsIGRhdGEgdGFibGVzIGZvciBiZXR0ZXIgb3ZlcmZsb3cgc2Nyb2xsaW5nICovXG4gICAgY29uc3QgdGFibGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInRhYmxlOm5vdChbY2xhc3NdKVwiKSAgICAgICAgICAgICAgLy8gVE9ETzogdGhpcyBpcyBKU1gsIHdlIHNob3VsZCByZW5hbWUgdGhlIGZpbGVcbiAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHRhYmxlcywgdGFibGUgPT4ge1xuICAgICAgY29uc3Qgd3JhcCA9IChcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1kLXR5cGVzZXRfX3Njcm9sbHdyYXBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibWQtdHlwZXNldF9fdGFibGVcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApXG4gICAgICBpZiAodGFibGUubmV4dFNpYmxpbmcpIHtcbiAgICAgICAgdGFibGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUod3JhcCwgdGFibGUubmV4dFNpYmxpbmcpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YWJsZS5wYXJlbnROb2RlLmFwcGVuZENoaWxkKHdyYXApXG4gICAgICB9XG4gICAgICB3cmFwLmNoaWxkcmVuWzBdLmFwcGVuZENoaWxkKHRhYmxlKVxuICAgIH0pXG5cbiAgICAvKiBDbGlwYm9hcmQgaW50ZWdyYXRpb24gKi9cbiAgICBpZiAoQ2xpcGJvYXJkLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgIGNvbnN0IGJsb2NrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY29kZWhpbGl0ZSA+IHByZSwgcHJlID4gY29kZVwiKVxuICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChibG9ja3MsIChibG9jaywgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgaWQgPSBgX19jb2RlXyR7aW5kZXh9YFxuXG4gICAgICAgIC8qIENyZWF0ZSBidXR0b24gd2l0aCBtZXNzYWdlIGNvbnRhaW5lciAqL1xuICAgICAgICBjb25zdCBidXR0b24gPSAoXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm1kLWNsaXBib2FyZFwiIHRpdGxlPXt0cmFuc2xhdGUoXCJjbGlwYm9hcmQuY29weVwiKX1cbiAgICAgICAgICAgIGRhdGEtY2xpcGJvYXJkLXRhcmdldD17YCMke2lkfSBwcmUsICMke2lkfSBjb2RlYH0+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1kLWNsaXBib2FyZF9fbWVzc2FnZVwiPjwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgKVxuXG4gICAgICAgIC8qIExpbmsgdG8gYmxvY2sgYW5kIGluc2VydCBidXR0b24gKi9cbiAgICAgICAgY29uc3QgcGFyZW50ID0gYmxvY2sucGFyZW50Tm9kZVxuICAgICAgICBwYXJlbnQuaWQgPSBpZFxuICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKGJ1dHRvbiwgYmxvY2spXG4gICAgICB9KVxuXG4gICAgICAvKiBJbml0aWFsaXplIENsaXBib2FyZCBsaXN0ZW5lciAqL1xuICAgICAgY29uc3QgY29weSA9IG5ldyBDbGlwYm9hcmQoXCIubWQtY2xpcGJvYXJkXCIpXG5cbiAgICAgIC8qIFN1Y2Nlc3MgaGFuZGxlciAqL1xuICAgICAgY29weS5vbihcInN1Y2Nlc3NcIiwgYWN0aW9uID0+IHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGFjdGlvbi50cmlnZ2VyLnF1ZXJ5U2VsZWN0b3IoXCIubWQtY2xpcGJvYXJkX19tZXNzYWdlXCIpXG4gICAgICAgIGlmICghKG1lc3NhZ2UgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpXG4gICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yXG5cbiAgICAgICAgLyogQ2xlYXIgc2VsZWN0aW9uIGFuZCByZXNldCBkZWJvdW5jZSBsb2dpYyAqL1xuICAgICAgICBhY3Rpb24uY2xlYXJTZWxlY3Rpb24oKVxuICAgICAgICBpZiAobWVzc2FnZS5kYXRhc2V0Lm1kVGltZXIpXG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHBhcnNlSW50KG1lc3NhZ2UuZGF0YXNldC5tZFRpbWVyLCAxMCkpXG5cbiAgICAgICAgLyogU2V0IG1lc3NhZ2UgaW5kaWNhdGluZyBzdWNjZXNzIGFuZCBzaG93IGl0ICovXG4gICAgICAgIG1lc3NhZ2UuY2xhc3NMaXN0LmFkZChcIm1kLWNsaXBib2FyZF9fbWVzc2FnZS0tYWN0aXZlXCIpXG4gICAgICAgIG1lc3NhZ2UuaW5uZXJIVE1MID0gdHJhbnNsYXRlKFwiY2xpcGJvYXJkLmNvcGllZFwiKVxuXG4gICAgICAgIC8qIEhpZGUgbWVzc2FnZSBhZnRlciB0d28gc2Vjb25kcyAqL1xuICAgICAgICBtZXNzYWdlLmRhdGFzZXQubWRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIG1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZShcIm1kLWNsaXBib2FyZF9fbWVzc2FnZS0tYWN0aXZlXCIpXG4gICAgICAgICAgbWVzc2FnZS5kYXRhc2V0Lm1kVGltZXIgPSBcIlwiXG4gICAgICAgIH0sIDIwMDApLnRvU3RyaW5nKClcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLyogUG9seWZpbGwgZGV0YWlscy9zdW1tYXJ5IGZ1bmN0aW9uYWxpdHkgKi9cbiAgICBpZiAoIU1vZGVybml6ci5kZXRhaWxzKSB7XG4gICAgICBjb25zdCBibG9ja3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiZGV0YWlscyA+IHN1bW1hcnlcIilcbiAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoYmxvY2tzLCBzdW1tYXJ5ID0+IHtcbiAgICAgICAgc3VtbWFyeS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXYgPT4ge1xuICAgICAgICAgIGNvbnN0IGRldGFpbHMgPSBldi50YXJnZXQucGFyZW50Tm9kZVxuICAgICAgICAgIGlmIChkZXRhaWxzLmhhc0F0dHJpYnV0ZShcIm9wZW5cIikpIHtcbiAgICAgICAgICAgIGRldGFpbHMucmVtb3ZlQXR0cmlidXRlKFwib3BlblwiKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZXRhaWxzLnNldEF0dHJpYnV0ZShcIm9wZW5cIiwgXCJcIilcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIC8qIE9wZW4gZGV0YWlscyBhZnRlciBhbmNob3IganVtcCAqL1xuICAgIGNvbnN0IGRldGFpbHMgPSAoKSA9PiB7XG4gICAgICBpZiAoZG9jdW1lbnQubG9jYXRpb24uaGFzaCkge1xuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRvY3VtZW50LmxvY2F0aW9uLmhhc2guc3Vic3RyaW5nKDEpKVxuICAgICAgICBpZiAoIWVsKVxuICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIC8qIFdhbGsgdXAgYXMgbG9uZyBhcyB3ZSdyZSBub3QgaW4gYSBkZXRhaWxzIHRhZyAqL1xuICAgICAgICBsZXQgcGFyZW50ID0gZWwucGFyZW50Tm9kZVxuICAgICAgICB3aGlsZSAocGFyZW50ICYmICEocGFyZW50IGluc3RhbmNlb2YgSFRNTERldGFpbHNFbGVtZW50KSlcbiAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZVxuXG4gICAgICAgIC8qIElmIHRoZXJlJ3MgYSBkZXRhaWxzIHRhZywgb3BlbiBpdCAqL1xuICAgICAgICBpZiAocGFyZW50ICYmICFwYXJlbnQub3Blbikge1xuICAgICAgICAgIHBhcmVudC5vcGVuID0gdHJ1ZVxuXG4gICAgICAgICAgLyogRm9yY2UgcmVsb2FkLCBzbyB0aGUgdmlld3BvcnQgcmVwb3NpdGlvbnMgKi9cbiAgICAgICAgICBjb25zdCBsb2MgPSBsb2NhdGlvbi5oYXNoXG4gICAgICAgICAgbG9jYXRpb24uaGFzaCA9IFwiIFwiXG4gICAgICAgICAgbG9jYXRpb24uaGFzaCA9IGxvY1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCBkZXRhaWxzKVxuICAgIGRldGFpbHMoKVxuXG4gICAgLyogRm9yY2UgMXB4IHNjcm9sbCBvZmZzZXQgdG8gdHJpZ2dlciBvdmVyZmxvdyBzY3JvbGxpbmcgKi9cbiAgICBpZiAoTW9kZXJuaXpyLmlvcykge1xuICAgICAgY29uc3Qgc2Nyb2xsYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1tZC1zY3JvbGxmaXhdXCIpXG4gICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHNjcm9sbGFibGUsIGl0ZW0gPT4ge1xuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsICgpID0+IHtcbiAgICAgICAgICBjb25zdCB0b3AgPSBpdGVtLnNjcm9sbFRvcFxuXG4gICAgICAgICAgLyogV2UncmUgYXQgdGhlIHRvcCBvZiB0aGUgY29udGFpbmVyICovXG4gICAgICAgICAgaWYgKHRvcCA9PT0gMCkge1xuICAgICAgICAgICAgaXRlbS5zY3JvbGxUb3AgPSAxXG5cbiAgICAgICAgICAgIC8qIFdlJ3JlIGF0IHRoZSBib3R0b20gb2YgdGhlIGNvbnRhaW5lciAqL1xuICAgICAgICAgIH0gZWxzZSBpZiAodG9wICsgaXRlbS5vZmZzZXRIZWlnaHQgPT09IGl0ZW0uc2Nyb2xsSGVpZ2h0KSB7XG4gICAgICAgICAgICBpdGVtLnNjcm9sbFRvcCA9IHRvcCAtIDFcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cbiAgfSkubGlzdGVuKClcblxuICAvKiBDb21wb25lbnQ6IGhlYWRlciBzaGFkb3cgdG9nZ2xlICovXG4gIG5ldyBNYXRlcmlhbC5FdmVudC5NYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogMTIyMHB4KVwiLFxuICAgIG5ldyBNYXRlcmlhbC5FdmVudC5MaXN0ZW5lcih3aW5kb3csIFtcbiAgICAgIFwic2Nyb2xsXCIsIFwicmVzaXplXCIsIFwib3JpZW50YXRpb25jaGFuZ2VcIlxuICAgIF0sIG5ldyBNYXRlcmlhbC5IZWFkZXIuU2hhZG93KFxuICAgICAgXCJbZGF0YS1tZC1jb21wb25lbnQ9Y29udGFpbmVyXVwiLFxuICAgICAgXCJbZGF0YS1tZC1jb21wb25lbnQ9aGVhZGVyXVwiKSkpXG5cbiAgLyogQ29tcG9uZW50OiBoZWFkZXIgdGl0bGUgdG9nZ2xlICovXG4gIG5ldyBNYXRlcmlhbC5FdmVudC5MaXN0ZW5lcih3aW5kb3csIFtcbiAgICBcInNjcm9sbFwiLCBcInJlc2l6ZVwiLCBcIm9yaWVudGF0aW9uY2hhbmdlXCJcbiAgXSwgbmV3IE1hdGVyaWFsLkhlYWRlci5UaXRsZShcbiAgICBcIltkYXRhLW1kLWNvbXBvbmVudD10aXRsZV1cIixcbiAgICBcIi5tZC10eXBlc2V0IGgxXCIpXG4gICkubGlzdGVuKClcblxuICAvKiBDb21wb25lbnQ6IHRhYnMgdmlzaWJpbGl0eSB0b2dnbGUgKi9cbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1tZC1jb21wb25lbnQ9dGFic11cIikpXG4gICAgbmV3IE1hdGVyaWFsLkV2ZW50Lkxpc3RlbmVyKHdpbmRvdywgW1xuICAgICAgXCJzY3JvbGxcIiwgXCJyZXNpemVcIiwgXCJvcmllbnRhdGlvbmNoYW5nZVwiXG4gICAgXSwgbmV3IE1hdGVyaWFsLlRhYnMuVG9nZ2xlKFwiW2RhdGEtbWQtY29tcG9uZW50PXRhYnNdXCIpKS5saXN0ZW4oKVxuXG4gIC8qIENvbXBvbmVudDogc2lkZWJhciB3aXRoIG5hdmlnYXRpb24gKi9cbiAgbmV3IE1hdGVyaWFsLkV2ZW50Lk1hdGNoTWVkaWEoXCIobWluLXdpZHRoOiAxMjIwcHgpXCIsXG4gICAgbmV3IE1hdGVyaWFsLkV2ZW50Lkxpc3RlbmVyKHdpbmRvdywgW1xuICAgICAgXCJzY3JvbGxcIiwgXCJyZXNpemVcIiwgXCJvcmllbnRhdGlvbmNoYW5nZVwiXG4gICAgXSwgbmV3IE1hdGVyaWFsLlNpZGViYXIuUG9zaXRpb24oXG4gICAgICBcIltkYXRhLW1kLWNvbXBvbmVudD1uYXZpZ2F0aW9uXVwiLFxuICAgICAgXCJbZGF0YS1tZC1jb21wb25lbnQ9aGVhZGVyXVwiKSkpXG5cbiAgLyogQ29tcG9uZW50OiBzaWRlYmFyIHdpdGggdGFibGUgb2YgY29udGVudHMgKG1pc3Npbmcgb24gNDA0IHBhZ2UpICovXG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtbWQtY29tcG9uZW50PXRvY11cIikpXG4gICAgbmV3IE1hdGVyaWFsLkV2ZW50Lk1hdGNoTWVkaWEoXCIobWluLXdpZHRoOiA5NjBweClcIixcbiAgICAgIG5ldyBNYXRlcmlhbC5FdmVudC5MaXN0ZW5lcih3aW5kb3csIFtcbiAgICAgICAgXCJzY3JvbGxcIiwgXCJyZXNpemVcIiwgXCJvcmllbnRhdGlvbmNoYW5nZVwiXG4gICAgICBdLCBuZXcgTWF0ZXJpYWwuU2lkZWJhci5Qb3NpdGlvbihcbiAgICAgICAgXCJbZGF0YS1tZC1jb21wb25lbnQ9dG9jXVwiLFxuICAgICAgICBcIltkYXRhLW1kLWNvbXBvbmVudD1oZWFkZXJdXCIpKSlcblxuICAvKiBDb21wb25lbnQ6IGxpbmsgYmx1cnJpbmcgZm9yIHRhYmxlIG9mIGNvbnRlbnRzICovXG4gIG5ldyBNYXRlcmlhbC5FdmVudC5NYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogOTYwcHgpXCIsXG4gICAgbmV3IE1hdGVyaWFsLkV2ZW50Lkxpc3RlbmVyKHdpbmRvdywgXCJzY3JvbGxcIixcbiAgICAgIG5ldyBNYXRlcmlhbC5OYXYuQmx1cihcIltkYXRhLW1kLWNvbXBvbmVudD10b2NdIFtocmVmXVwiKSkpXG5cbiAgLyogQ29tcG9uZW50OiBjb2xsYXBzaWJsZSBlbGVtZW50cyBmb3IgbmF2aWdhdGlvbiAqL1xuICBjb25zdCBjb2xsYXBzaWJsZXMgPVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1tZC1jb21wb25lbnQ9Y29sbGFwc2libGVdXCIpXG4gIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoY29sbGFwc2libGVzLCBjb2xsYXBzZSA9PiB7XG4gICAgbmV3IE1hdGVyaWFsLkV2ZW50Lk1hdGNoTWVkaWEoXCIobWluLXdpZHRoOiAxMjIwcHgpXCIsXG4gICAgICBuZXcgTWF0ZXJpYWwuRXZlbnQuTGlzdGVuZXIoY29sbGFwc2UucHJldmlvdXNFbGVtZW50U2libGluZywgXCJjbGlja1wiLFxuICAgICAgICBuZXcgTWF0ZXJpYWwuTmF2LkNvbGxhcHNlKGNvbGxhcHNlKSkpXG4gIH0pXG5cbiAgLyogQ29tcG9uZW50OiBhY3RpdmUgcGFuZSBtb25pdG9yIGZvciBpT1Mgc2Nyb2xsaW5nIGZpeGVzICovXG4gIG5ldyBNYXRlcmlhbC5FdmVudC5NYXRjaE1lZGlhKFwiKG1heC13aWR0aDogMTIxOXB4KVwiLFxuICAgIG5ldyBNYXRlcmlhbC5FdmVudC5MaXN0ZW5lcihcbiAgICAgIFwiW2RhdGEtbWQtY29tcG9uZW50PW5hdmlnYXRpb25dIFtkYXRhLW1kLXRvZ2dsZV1cIiwgXCJjaGFuZ2VcIixcbiAgICAgIG5ldyBNYXRlcmlhbC5OYXYuU2Nyb2xsaW5nKFwiW2RhdGEtbWQtY29tcG9uZW50PW5hdmlnYXRpb25dIG5hdlwiKSkpXG5cbiAgLyogQ29tcG9uZW50OiBzZWFyY2ggYm9keSBsb2NrIGZvciBtb2JpbGUgKi9cbiAgbmV3IE1hdGVyaWFsLkV2ZW50Lk1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA5NTlweClcIixcbiAgICBuZXcgTWF0ZXJpYWwuRXZlbnQuTGlzdGVuZXIoXCJbZGF0YS1tZC10b2dnbGU9c2VhcmNoXVwiLCBcImNoYW5nZVwiLFxuICAgICAgbmV3IE1hdGVyaWFsLlNlYXJjaC5Mb2NrKFwiW2RhdGEtbWQtdG9nZ2xlPXNlYXJjaF1cIikpKVxuXG4gIC8qIENvbXBvbmVudDogc2VhcmNoIHJlc3VsdHMgKi9cbiAgbmV3IE1hdGVyaWFsLkV2ZW50Lkxpc3RlbmVyKFwiW2RhdGEtbWQtY29tcG9uZW50PXF1ZXJ5XVwiLCBbXG4gICAgXCJmb2N1c1wiLCBcImtleXVwXCIsIFwiY2hhbmdlXCJcbiAgXSwgbmV3IE1hdGVyaWFsLlNlYXJjaC5SZXN1bHQoXCJbZGF0YS1tZC1jb21wb25lbnQ9cmVzdWx0XVwiLCAoKSA9PiB7XG4gICAgcmV0dXJuIGZldGNoKGAke2NvbmZpZy51cmwuYmFzZX0vJHtcbiAgICAgIGNvbmZpZy52ZXJzaW9uIDwgXCIwLjE3XCIgPyBcIm1rZG9jc1wiIDogXCJzZWFyY2hcIlxuICAgIH0vc2VhcmNoX2luZGV4Lmpzb25gLCB7XG4gICAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiXG4gICAgfSkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZG9jcy5tYXAoZG9jID0+IHtcbiAgICAgICAgICBkb2MubG9jYXRpb24gPSBjb25maWcudXJsLmJhc2UgKyBkb2MubG9jYXRpb25cbiAgICAgICAgICByZXR1cm4gZG9jXG4gICAgICAgIH0pXG4gICAgICB9KVxuICB9KSkubGlzdGVuKClcblxuICAvKiBMaXN0ZW5lcjogY2xvc2UgZHJhd2VyIHdoZW4gYW5jaG9yIGxpbmtzIGFyZSBjbGlja2VkICovXG4gIG5ldyBNYXRlcmlhbC5FdmVudC5NYXRjaE1lZGlhKFwiKG1heC13aWR0aDogOTU5cHgpXCIsXG4gICAgbmV3IE1hdGVyaWFsLkV2ZW50Lkxpc3RlbmVyKFwiW2RhdGEtbWQtY29tcG9uZW50PW5hdmlnYXRpb25dIFtocmVmXj0nIyddXCIsXG4gICAgICBcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgY29uc3QgdG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLW1kLXRvZ2dsZT1kcmF3ZXJdXCIpXG4gICAgICAgIGlmICghKHRvZ2dsZSBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpKVxuICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuICAgICAgICBpZiAodG9nZ2xlLmNoZWNrZWQpIHtcbiAgICAgICAgICB0b2dnbGUuY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgdG9nZ2xlLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwiY2hhbmdlXCIpKVxuICAgICAgICB9XG4gICAgICB9KSlcblxuICAvKiBMaXN0ZW5lcjogZm9jdXMgaW5wdXQgYWZ0ZXIgZm9ybSByZXNldCAqL1xuICBuZXcgTWF0ZXJpYWwuRXZlbnQuTGlzdGVuZXIoXCJbZGF0YS1tZC1jb21wb25lbnQ9cmVzZXRdXCIsIFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgcXVlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtbWQtY29tcG9uZW50PXF1ZXJ5XVwiKVxuICAgICAgaWYgKCEocXVlcnkgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSlcbiAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yXG4gICAgICBxdWVyeS5mb2N1cygpXG4gICAgfSwgMTApXG4gIH0pLmxpc3RlbigpXG5cbiAgLyogTGlzdGVuZXI6IGZvY3VzIGlucHV0IGFmdGVyIG9wZW5pbmcgc2VhcmNoICovXG4gIG5ldyBNYXRlcmlhbC5FdmVudC5MaXN0ZW5lcihcIltkYXRhLW1kLXRvZ2dsZT1zZWFyY2hdXCIsIFwiY2hhbmdlXCIsIGV2ID0+IHtcbiAgICBzZXRUaW1lb3V0KHRvZ2dsZSA9PiB7XG4gICAgICBpZiAoISh0b2dnbGUgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSlcbiAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yXG4gICAgICBpZiAodG9nZ2xlLmNoZWNrZWQpIHtcbiAgICAgICAgY29uc3QgcXVlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtbWQtY29tcG9uZW50PXF1ZXJ5XVwiKVxuICAgICAgICBpZiAoIShxdWVyeSBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpKVxuICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuICAgICAgICBxdWVyeS5mb2N1cygpXG4gICAgICB9XG4gICAgfSwgNDAwLCBldi50YXJnZXQpXG4gIH0pLmxpc3RlbigpXG5cbiAgLyogTGlzdGVuZXI6IG9wZW4gc2VhcmNoIG9uIGZvY3VzICovXG4gIG5ldyBNYXRlcmlhbC5FdmVudC5NYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogOTYwcHgpXCIsXG4gICAgbmV3IE1hdGVyaWFsLkV2ZW50Lkxpc3RlbmVyKFwiW2RhdGEtbWQtY29tcG9uZW50PXF1ZXJ5XVwiLCBcImZvY3VzXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IHRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1tZC10b2dnbGU9c2VhcmNoXVwiKVxuICAgICAgaWYgKCEodG9nZ2xlIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkpXG4gICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuICAgICAgaWYgKCF0b2dnbGUuY2hlY2tlZCkge1xuICAgICAgICB0b2dnbGUuY2hlY2tlZCA9IHRydWVcbiAgICAgICAgdG9nZ2xlLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwiY2hhbmdlXCIpKVxuICAgICAgfVxuICAgIH0pKVxuXG4gIC8qIExpc3RlbmVyOiBrZXlib2FyZCBoYW5kbGVycyAqLyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuICBuZXcgTWF0ZXJpYWwuRXZlbnQuTGlzdGVuZXIod2luZG93LCBcImtleWRvd25cIiwgZXYgPT4geyAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHNwbGl0IHVwIGludG8gY29tcG9uZW50IHRvIHJlZHVjZSBjb21wbGV4aXR5XG4gICAgY29uc3QgdG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLW1kLXRvZ2dsZT1zZWFyY2hdXCIpXG4gICAgaWYgKCEodG9nZ2xlIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkpXG4gICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3JcbiAgICBjb25zdCBxdWVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1tZC1jb21wb25lbnQ9cXVlcnldXCIpXG4gICAgaWYgKCEocXVlcnkgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSlcbiAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuXG4gICAgLyogQWJvcnQgaWYgbWV0YSBrZXkgKG1hY09TKSBvciBjdHJsIGtleSAoV2luZG93cykgaXMgcHJlc3NlZCAqL1xuICAgIGlmIChldi5tZXRhS2V5IHx8IGV2LmN0cmxLZXkpXG4gICAgICByZXR1cm5cblxuICAgIC8qIFNlYXJjaCBpcyBvcGVuICovXG4gICAgaWYgKHRvZ2dsZS5jaGVja2VkKSB7XG5cbiAgICAgIC8qIEVudGVyOiBwcmV2ZW50IGZvcm0gc3VibWlzc2lvbiAqL1xuICAgICAgaWYgKGV2LmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgIGlmIChxdWVyeSA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkge1xuICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICAgIC8qIEdvIHRvIGN1cnJlbnQgYWN0aXZlL2ZvY3VzZWQgbGluayAqL1xuICAgICAgICAgIGNvbnN0IGZvY3VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIFwiW2RhdGEtbWQtY29tcG9uZW50PXNlYXJjaF0gW2hyZWZdW2RhdGEtbWQtc3RhdGU9YWN0aXZlXVwiKVxuICAgICAgICAgIGlmIChmb2N1cyBpbnN0YW5jZW9mIEhUTUxMaW5rRWxlbWVudCkge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gZm9jdXMuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKVxuXG4gICAgICAgICAgICAvKiBDbG9zZSBzZWFyY2ggKi9cbiAgICAgICAgICAgIHRvZ2dsZS5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIHRvZ2dsZS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcImNoYW5nZVwiKSlcbiAgICAgICAgICAgIHF1ZXJ5LmJsdXIoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAvKiBFc2NhcGU6IGNsb3NlIHNlYXJjaCAqL1xuICAgICAgfSBlbHNlIGlmIChldi5rZXlDb2RlID09PSAyNykge1xuICAgICAgICB0b2dnbGUuY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIHRvZ2dsZS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcImNoYW5nZVwiKSlcbiAgICAgICAgcXVlcnkuYmx1cigpXG5cbiAgICAgIC8qIEhvcml6b250YWwgYXJyb3dzIGFuZCBiYWNrc3BhY2U6IGZvY3VzIGlucHV0ICovXG4gICAgICB9IGVsc2UgaWYgKFs4LCAzNywgMzldLmluZGV4T2YoZXYua2V5Q29kZSkgIT09IC0xKSB7XG4gICAgICAgIGlmIChxdWVyeSAhPT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudClcbiAgICAgICAgICBxdWVyeS5mb2N1cygpXG5cbiAgICAgIC8qIFZlcnRpY2FsIGFycm93cyBhbmQgdGFiOiBzZWxlY3QgcHJldmlvdXMgb3IgbmV4dCBzZWFyY2ggcmVzdWx0ICovXG4gICAgICB9IGVsc2UgaWYgKFs5LCAzOCwgNDBdLmluZGV4T2YoZXYua2V5Q29kZSkgIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IGV2LnNoaWZ0S2V5ID8gMzggOiA0MFxuICAgICAgICBjb25zdCBrZXkgPSBldi5rZXlDb2RlID09PSA5ID8gbWFwIDogZXYua2V5Q29kZVxuXG4gICAgICAgIC8qIFJldHJpZXZlIGFsbCByZXN1bHRzICovXG4gICAgICAgIGNvbnN0IGxpbmtzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoXG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICAgIFwiW2RhdGEtbWQtY29tcG9uZW50PXF1ZXJ5XSwgW2RhdGEtbWQtY29tcG9uZW50PXNlYXJjaF0gW2hyZWZdXCIpKVxuXG4gICAgICAgIC8qIFJldHJpZXZlIGN1cnJlbnQgYWN0aXZlL2ZvY3VzZWQgcmVzdWx0ICovXG4gICAgICAgIGNvbnN0IGZvY3VzID0gbGlua3MuZmluZChsaW5rID0+IHtcbiAgICAgICAgICBpZiAoIShsaW5rIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yXG4gICAgICAgICAgcmV0dXJuIGxpbmsuZGF0YXNldC5tZFN0YXRlID09PSBcImFjdGl2ZVwiXG4gICAgICAgIH0pXG4gICAgICAgIGlmIChmb2N1cylcbiAgICAgICAgICBmb2N1cy5kYXRhc2V0Lm1kU3RhdGUgPSBcIlwiXG5cbiAgICAgICAgLyogQ2FsY3VsYXRlIGluZGV4IGRlcGVuZGluZyBvbiBkaXJlY3Rpb24sIGFkZCBsZW5ndGggdG8gZm9ybSByaW5nICovXG4gICAgICAgIGNvbnN0IGluZGV4ID0gTWF0aC5tYXgoMCwgKFxuICAgICAgICAgIGxpbmtzLmluZGV4T2YoZm9jdXMpICsgbGlua3MubGVuZ3RoICsgKGtleSA9PT0gMzggPyAtMSA6ICsxKVxuICAgICAgICApICUgbGlua3MubGVuZ3RoKVxuXG4gICAgICAgIC8qIFNldCBhY3RpdmUgc3RhdGUgYW5kIGZvY3VzICovXG4gICAgICAgIGlmIChsaW5rc1tpbmRleF0pIHtcbiAgICAgICAgICBsaW5rc1tpbmRleF0uZGF0YXNldC5tZFN0YXRlID0gXCJhY3RpdmVcIlxuICAgICAgICAgIGxpbmtzW2luZGV4XS5mb2N1cygpXG4gICAgICAgIH1cblxuICAgICAgICAvKiBQcmV2ZW50IHNjcm9sbGluZyBvZiBwYWdlICovXG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgICAgICAvKiBSZXR1cm4gZmFsc2UgcHJldmVudHMgdGhlIGN1cnNvciBwb3NpdGlvbiBmcm9tIGNoYW5naW5nICovXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuXG4gICAgLyogU2VhcmNoIGlzIGNsb3NlZCBhbmQgd2UncmUgbm90IGluc2lkZSBhIGZvcm0gKi9cbiAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgIWRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuZm9ybSkge1xuXG4gICAgICAvKiBGL1M6IE9wZW4gc2VhcmNoIGlmIG5vdCBpbiBpbnB1dCBmaWVsZCAqL1xuICAgICAgaWYgKGV2LmtleUNvZGUgPT09IDcwIHx8IGV2LmtleUNvZGUgPT09IDgzKSB7XG4gICAgICAgIHF1ZXJ5LmZvY3VzKClcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKVxuICAgICAgfVxuICAgIH1cbiAgfSkubGlzdGVuKClcblxuICAvKiBMaXN0ZW5lcjogZm9jdXMgcXVlcnkgaWYgaW4gc2VhcmNoIGlzIG9wZW4gYW5kIGNoYXJhY3RlciBpcyB0eXBlZCAqL1xuICBuZXcgTWF0ZXJpYWwuRXZlbnQuTGlzdGVuZXIod2luZG93LCBcImtleXByZXNzXCIsICgpID0+IHtcbiAgICBjb25zdCB0b2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtbWQtdG9nZ2xlPXNlYXJjaF1cIilcbiAgICBpZiAoISh0b2dnbGUgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSlcbiAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuICAgIGlmICh0b2dnbGUuY2hlY2tlZCkge1xuICAgICAgY29uc3QgcXVlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtbWQtY29tcG9uZW50PXF1ZXJ5XVwiKVxuICAgICAgaWYgKCEocXVlcnkgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSlcbiAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yXG4gICAgICBpZiAocXVlcnkgIT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpXG4gICAgICAgIHF1ZXJ5LmZvY3VzKClcbiAgICB9XG4gIH0pLmxpc3RlbigpXG5cbiAgLyogUmV0cmlldmUgZmFjdHMgZm9yIHRoZSBnaXZlbiByZXBvc2l0b3J5IHR5cGUgKi9cbiAgOygoKSA9PiB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtbWQtc291cmNlXVwiKVxuICAgIGlmICghZWwpXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFtdKVxuICAgIGVsc2UgaWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MQW5jaG9yRWxlbWVudCkpXG4gICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3JcbiAgICBzd2l0Y2ggKGVsLmRhdGFzZXQubWRTb3VyY2UpIHtcbiAgICAgIGNhc2UgXCJnaXRodWJcIjogcmV0dXJuIG5ldyBNYXRlcmlhbC5Tb3VyY2UuQWRhcHRlci5HaXRIdWIoZWwpLmZldGNoKClcbiAgICAgIGRlZmF1bHQ6IHJldHVybiBQcm9taXNlLnJlc29sdmUoW10pXG4gICAgfVxuXG4gIC8qIFJlbmRlciByZXBvc2l0b3J5IGluZm9ybWF0aW9uICovXG4gIH0pKCkudGhlbihmYWN0cyA9PiB7XG4gICAgY29uc3Qgc291cmNlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1tZC1zb3VyY2VdXCIpXG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChzb3VyY2VzLCBzb3VyY2UgPT4ge1xuICAgICAgbmV3IE1hdGVyaWFsLlNvdXJjZS5SZXBvc2l0b3J5KHNvdXJjZSlcbiAgICAgICAgLmluaXRpYWxpemUoZmFjdHMpXG4gICAgfSlcbiAgfSlcbn1cblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogRXhwb3J0c1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4vKiBQcm92aWRlIHRoaXMgZm9yIGRvd253YXJkIGNvbXBhdGliaWxpdHkgZm9yIG5vdyAqL1xuY29uc3QgYXBwID0ge1xuICBpbml0aWFsaXplXG59XG5cbmV4cG9ydCB7XG4gIGFwcFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9hcHBsaWNhdGlvbi5qcyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImFzc2V0cy9pbWFnZXMvaWNvbnMvYml0YnVja2V0LnN2Z1wiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2Fzc2V0cy9pbWFnZXMvaWNvbnMvYml0YnVja2V0LnN2Z1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJhc3NldHMvaW1hZ2VzL2ljb25zL2dpdGh1Yi5zdmdcIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9hc3NldHMvaW1hZ2VzL2ljb25zL2dpdGh1Yi5zdmdcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiYXNzZXRzL2ltYWdlcy9pY29ucy9naXRsYWIuc3ZnXCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYXNzZXRzL2ltYWdlcy9pY29ucy9naXRsYWIuc3ZnXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYXNzZXRzL3N0eWxlc2hlZXRzL2FwcGxpY2F0aW9uLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9hc3NldHMvc3R5bGVzaGVldHMvYXBwbGljYXRpb24tcGFsZXR0ZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBQb2x5ZmlsbCBmb3IgY3JlYXRpbmcgQ3VzdG9tRXZlbnRzIG9uIElFOS8xMC8xMVxuXG4vLyBjb2RlIHB1bGxlZCBmcm9tOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Q0dG9jY2hpbmkvY3VzdG9tZXZlbnQtcG9seWZpbGxcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DdXN0b21FdmVudCNQb2x5ZmlsbFxuXG50cnkge1xuICAgIHZhciBjZSA9IG5ldyB3aW5kb3cuQ3VzdG9tRXZlbnQoJ3Rlc3QnKTtcbiAgICBjZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmIChjZS5kZWZhdWx0UHJldmVudGVkICE9PSB0cnVlKSB7XG4gICAgICAgIC8vIElFIGhhcyBwcm9ibGVtcyB3aXRoIC5wcmV2ZW50RGVmYXVsdCgpIG9uIGN1c3RvbSBldmVudHNcbiAgICAgICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yMzM0OTE5MVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBwcmV2ZW50IGRlZmF1bHQnKTtcbiAgICB9XG59IGNhdGNoKGUpIHtcbiAgdmFyIEN1c3RvbUV2ZW50ID0gZnVuY3Rpb24oZXZlbnQsIHBhcmFtcykge1xuICAgIHZhciBldnQsIG9yaWdQcmV2ZW50O1xuICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7XG4gICAgICBidWJibGVzOiBmYWxzZSxcbiAgICAgIGNhbmNlbGFibGU6IGZhbHNlLFxuICAgICAgZGV0YWlsOiB1bmRlZmluZWRcbiAgICB9O1xuXG4gICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJDdXN0b21FdmVudFwiKTtcbiAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwpO1xuICAgIG9yaWdQcmV2ZW50ID0gZXZ0LnByZXZlbnREZWZhdWx0O1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIG9yaWdQcmV2ZW50LmNhbGwodGhpcyk7XG4gICAgICB0cnkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2RlZmF1bHRQcmV2ZW50ZWQnLCB7XG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIHRoaXMuZGVmYXVsdFByZXZlbnRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gZXZ0O1xuICB9O1xuXG4gIEN1c3RvbUV2ZW50LnByb3RvdHlwZSA9IHdpbmRvdy5FdmVudC5wcm90b3R5cGU7XG4gIHdpbmRvdy5DdXN0b21FdmVudCA9IEN1c3RvbUV2ZW50OyAvLyBleHBvc2UgZGVmaW5pdGlvbiB0byB3aW5kb3dcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2N1c3RvbS1ldmVudC1wb2x5ZmlsbC9jdXN0b20tZXZlbnQtcG9seWZpbGwuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImlmICghd2luZG93LmZldGNoKSB3aW5kb3cuZmV0Y2ggPSByZXF1aXJlKCcuJykuZGVmYXVsdCB8fCByZXF1aXJlKCcuJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy91bmZldGNoL3BvbHlmaWxsLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24gKHJvb3QpIHtcblxuICAvLyBTdG9yZSBzZXRUaW1lb3V0IHJlZmVyZW5jZSBzbyBwcm9taXNlLXBvbHlmaWxsIHdpbGwgYmUgdW5hZmZlY3RlZCBieVxuICAvLyBvdGhlciBjb2RlIG1vZGlmeWluZyBzZXRUaW1lb3V0IChsaWtlIHNpbm9uLnVzZUZha2VUaW1lcnMoKSlcbiAgdmFyIHNldFRpbWVvdXRGdW5jID0gc2V0VGltZW91dDtcblxuICBmdW5jdGlvbiBub29wKCkge31cbiAgXG4gIC8vIFBvbHlmaWxsIGZvciBGdW5jdGlvbi5wcm90b3R5cGUuYmluZFxuICBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIFByb21pc2UoZm4pIHtcbiAgICBpZiAodHlwZW9mIHRoaXMgIT09ICdvYmplY3QnKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdQcm9taXNlcyBtdXN0IGJlIGNvbnN0cnVjdGVkIHZpYSBuZXcnKTtcbiAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdub3QgYSBmdW5jdGlvbicpO1xuICAgIHRoaXMuX3N0YXRlID0gMDtcbiAgICB0aGlzLl9oYW5kbGVkID0gZmFsc2U7XG4gICAgdGhpcy5fdmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fZGVmZXJyZWRzID0gW107XG5cbiAgICBkb1Jlc29sdmUoZm4sIHRoaXMpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlKHNlbGYsIGRlZmVycmVkKSB7XG4gICAgd2hpbGUgKHNlbGYuX3N0YXRlID09PSAzKSB7XG4gICAgICBzZWxmID0gc2VsZi5fdmFsdWU7XG4gICAgfVxuICAgIGlmIChzZWxmLl9zdGF0ZSA9PT0gMCkge1xuICAgICAgc2VsZi5fZGVmZXJyZWRzLnB1c2goZGVmZXJyZWQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZWxmLl9oYW5kbGVkID0gdHJ1ZTtcbiAgICBQcm9taXNlLl9pbW1lZGlhdGVGbihmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY2IgPSBzZWxmLl9zdGF0ZSA9PT0gMSA/IGRlZmVycmVkLm9uRnVsZmlsbGVkIDogZGVmZXJyZWQub25SZWplY3RlZDtcbiAgICAgIGlmIChjYiA9PT0gbnVsbCkge1xuICAgICAgICAoc2VsZi5fc3RhdGUgPT09IDEgPyByZXNvbHZlIDogcmVqZWN0KShkZWZlcnJlZC5wcm9taXNlLCBzZWxmLl92YWx1ZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciByZXQ7XG4gICAgICB0cnkge1xuICAgICAgICByZXQgPSBjYihzZWxmLl92YWx1ZSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJlamVjdChkZWZlcnJlZC5wcm9taXNlLCBlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcmVzb2x2ZShkZWZlcnJlZC5wcm9taXNlLCByZXQpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzb2x2ZShzZWxmLCBuZXdWYWx1ZSkge1xuICAgIHRyeSB7XG4gICAgICAvLyBQcm9taXNlIFJlc29sdXRpb24gUHJvY2VkdXJlOiBodHRwczovL2dpdGh1Yi5jb20vcHJvbWlzZXMtYXBsdXMvcHJvbWlzZXMtc3BlYyN0aGUtcHJvbWlzZS1yZXNvbHV0aW9uLXByb2NlZHVyZVxuICAgICAgaWYgKG5ld1ZhbHVlID09PSBzZWxmKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdBIHByb21pc2UgY2Fubm90IGJlIHJlc29sdmVkIHdpdGggaXRzZWxmLicpO1xuICAgICAgaWYgKG5ld1ZhbHVlICYmICh0eXBlb2YgbmV3VmFsdWUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBuZXdWYWx1ZSA9PT0gJ2Z1bmN0aW9uJykpIHtcbiAgICAgICAgdmFyIHRoZW4gPSBuZXdWYWx1ZS50aGVuO1xuICAgICAgICBpZiAobmV3VmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgc2VsZi5fc3RhdGUgPSAzO1xuICAgICAgICAgIHNlbGYuX3ZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgICAgZmluYWxlKHNlbGYpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGRvUmVzb2x2ZShiaW5kKHRoZW4sIG5ld1ZhbHVlKSwgc2VsZik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzZWxmLl9zdGF0ZSA9IDE7XG4gICAgICBzZWxmLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgZmluYWxlKHNlbGYpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJlamVjdChzZWxmLCBlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWplY3Qoc2VsZiwgbmV3VmFsdWUpIHtcbiAgICBzZWxmLl9zdGF0ZSA9IDI7XG4gICAgc2VsZi5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICBmaW5hbGUoc2VsZik7XG4gIH1cblxuICBmdW5jdGlvbiBmaW5hbGUoc2VsZikge1xuICAgIGlmIChzZWxmLl9zdGF0ZSA9PT0gMiAmJiBzZWxmLl9kZWZlcnJlZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICBQcm9taXNlLl9pbW1lZGlhdGVGbihmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCFzZWxmLl9oYW5kbGVkKSB7XG4gICAgICAgICAgUHJvbWlzZS5fdW5oYW5kbGVkUmVqZWN0aW9uRm4oc2VsZi5fdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gc2VsZi5fZGVmZXJyZWRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBoYW5kbGUoc2VsZiwgc2VsZi5fZGVmZXJyZWRzW2ldKTtcbiAgICB9XG4gICAgc2VsZi5fZGVmZXJyZWRzID0gbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIEhhbmRsZXIob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQsIHByb21pc2UpIHtcbiAgICB0aGlzLm9uRnVsZmlsbGVkID0gdHlwZW9mIG9uRnVsZmlsbGVkID09PSAnZnVuY3Rpb24nID8gb25GdWxmaWxsZWQgOiBudWxsO1xuICAgIHRoaXMub25SZWplY3RlZCA9IHR5cGVvZiBvblJlamVjdGVkID09PSAnZnVuY3Rpb24nID8gb25SZWplY3RlZCA6IG51bGw7XG4gICAgdGhpcy5wcm9taXNlID0gcHJvbWlzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUYWtlIGEgcG90ZW50aWFsbHkgbWlzYmVoYXZpbmcgcmVzb2x2ZXIgZnVuY3Rpb24gYW5kIG1ha2Ugc3VyZVxuICAgKiBvbkZ1bGZpbGxlZCBhbmQgb25SZWplY3RlZCBhcmUgb25seSBjYWxsZWQgb25jZS5cbiAgICpcbiAgICogTWFrZXMgbm8gZ3VhcmFudGVlcyBhYm91dCBhc3luY2hyb255LlxuICAgKi9cbiAgZnVuY3Rpb24gZG9SZXNvbHZlKGZuLCBzZWxmKSB7XG4gICAgdmFyIGRvbmUgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgZm4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmIChkb25lKSByZXR1cm47XG4gICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICByZXNvbHZlKHNlbGYsIHZhbHVlKTtcbiAgICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgaWYgKGRvbmUpIHJldHVybjtcbiAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgIHJlamVjdChzZWxmLCByZWFzb24pO1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgIGlmIChkb25lKSByZXR1cm47XG4gICAgICBkb25lID0gdHJ1ZTtcbiAgICAgIHJlamVjdChzZWxmLCBleCk7XG4gICAgfVxuICB9XG5cbiAgUHJvbWlzZS5wcm90b3R5cGVbJ2NhdGNoJ10gPSBmdW5jdGlvbiAob25SZWplY3RlZCkge1xuICAgIHJldHVybiB0aGlzLnRoZW4obnVsbCwgb25SZWplY3RlZCk7XG4gIH07XG5cbiAgUHJvbWlzZS5wcm90b3R5cGUudGhlbiA9IGZ1bmN0aW9uIChvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICAgIHZhciBwcm9tID0gbmV3ICh0aGlzLmNvbnN0cnVjdG9yKShub29wKTtcblxuICAgIGhhbmRsZSh0aGlzLCBuZXcgSGFuZGxlcihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCwgcHJvbSkpO1xuICAgIHJldHVybiBwcm9tO1xuICB9O1xuXG4gIFByb21pc2UuYWxsID0gZnVuY3Rpb24gKGFycikge1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJyKTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBpZiAoYXJncy5sZW5ndGggPT09IDApIHJldHVybiByZXNvbHZlKFtdKTtcbiAgICAgIHZhciByZW1haW5pbmcgPSBhcmdzLmxlbmd0aDtcblxuICAgICAgZnVuY3Rpb24gcmVzKGksIHZhbCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICh2YWwgJiYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpKSB7XG4gICAgICAgICAgICB2YXIgdGhlbiA9IHZhbC50aGVuO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgIHRoZW4uY2FsbCh2YWwsIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgICAgICByZXMoaSwgdmFsKTtcbiAgICAgICAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBhcmdzW2ldID0gdmFsO1xuICAgICAgICAgIGlmICgtLXJlbWFpbmluZyA9PT0gMCkge1xuICAgICAgICAgICAgcmVzb2x2ZShhcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgcmVqZWN0KGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzKGksIGFyZ3NbaV0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIFByb21pc2UucmVzb2x2ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBQcm9taXNlKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICB9KTtcbiAgfTtcblxuICBQcm9taXNlLnJlamVjdCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICByZWplY3QodmFsdWUpO1xuICAgIH0pO1xuICB9O1xuXG4gIFByb21pc2UucmFjZSA9IGZ1bmN0aW9uICh2YWx1ZXMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHZhbHVlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YWx1ZXNbaV0udGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIC8vIFVzZSBwb2x5ZmlsbCBmb3Igc2V0SW1tZWRpYXRlIGZvciBwZXJmb3JtYW5jZSBnYWluc1xuICBQcm9taXNlLl9pbW1lZGlhdGVGbiA9ICh0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSAnZnVuY3Rpb24nICYmIGZ1bmN0aW9uIChmbikgeyBzZXRJbW1lZGlhdGUoZm4pOyB9KSB8fFxuICAgIGZ1bmN0aW9uIChmbikge1xuICAgICAgc2V0VGltZW91dEZ1bmMoZm4sIDApO1xuICAgIH07XG5cbiAgUHJvbWlzZS5fdW5oYW5kbGVkUmVqZWN0aW9uRm4gPSBmdW5jdGlvbiBfdW5oYW5kbGVkUmVqZWN0aW9uRm4oZXJyKSB7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiBjb25zb2xlKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1Bvc3NpYmxlIFVuaGFuZGxlZCBQcm9taXNlIFJlamVjdGlvbjonLCBlcnIpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgaW1tZWRpYXRlIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgY2FsbGJhY2tzXG4gICAqIEBwYXJhbSBmbiB7ZnVuY3Rpb259IEZ1bmN0aW9uIHRvIGV4ZWN1dGVcbiAgICogQGRlcHJlY2F0ZWRcbiAgICovXG4gIFByb21pc2UuX3NldEltbWVkaWF0ZUZuID0gZnVuY3Rpb24gX3NldEltbWVkaWF0ZUZuKGZuKSB7XG4gICAgUHJvbWlzZS5faW1tZWRpYXRlRm4gPSBmbjtcbiAgfTtcblxuICAvKipcbiAgICogQ2hhbmdlIHRoZSBmdW5jdGlvbiB0byBleGVjdXRlIG9uIHVuaGFuZGxlZCByZWplY3Rpb25cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZm4gRnVuY3Rpb24gdG8gZXhlY3V0ZSBvbiB1bmhhbmRsZWQgcmVqZWN0aW9uXG4gICAqIEBkZXByZWNhdGVkXG4gICAqL1xuICBQcm9taXNlLl9zZXRVbmhhbmRsZWRSZWplY3Rpb25GbiA9IGZ1bmN0aW9uIF9zZXRVbmhhbmRsZWRSZWplY3Rpb25Gbihmbikge1xuICAgIFByb21pc2UuX3VuaGFuZGxlZFJlamVjdGlvbkZuID0gZm47XG4gIH07XG4gIFxuICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IFByb21pc2U7XG4gIH0gZWxzZSBpZiAoIXJvb3QuUHJvbWlzZSkge1xuICAgIHJvb3QuUHJvbWlzZSA9IFByb21pc2U7XG4gIH1cblxufSkodGhpcyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9taXNlLXBvbHlmaWxsL3Byb21pc2UuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBhcHBseSA9IEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseTtcblxuLy8gRE9NIEFQSXMsIGZvciBjb21wbGV0ZW5lc3NcblxuZXhwb3J0cy5zZXRUaW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldFRpbWVvdXQsIHdpbmRvdywgYXJndW1lbnRzKSwgY2xlYXJUaW1lb3V0KTtcbn07XG5leHBvcnRzLnNldEludGVydmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldEludGVydmFsLCB3aW5kb3csIGFyZ3VtZW50cyksIGNsZWFySW50ZXJ2YWwpO1xufTtcbmV4cG9ydHMuY2xlYXJUaW1lb3V0ID1cbmV4cG9ydHMuY2xlYXJJbnRlcnZhbCA9IGZ1bmN0aW9uKHRpbWVvdXQpIHtcbiAgaWYgKHRpbWVvdXQpIHtcbiAgICB0aW1lb3V0LmNsb3NlKCk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIFRpbWVvdXQoaWQsIGNsZWFyRm4pIHtcbiAgdGhpcy5faWQgPSBpZDtcbiAgdGhpcy5fY2xlYXJGbiA9IGNsZWFyRm47XG59XG5UaW1lb3V0LnByb3RvdHlwZS51bnJlZiA9IFRpbWVvdXQucHJvdG90eXBlLnJlZiA9IGZ1bmN0aW9uKCkge307XG5UaW1lb3V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9jbGVhckZuLmNhbGwod2luZG93LCB0aGlzLl9pZCk7XG59O1xuXG4vLyBEb2VzIG5vdCBzdGFydCB0aGUgdGltZSwganVzdCBzZXRzIHVwIHRoZSBtZW1iZXJzIG5lZWRlZC5cbmV4cG9ydHMuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSwgbXNlY3MpIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IG1zZWNzO1xufTtcblxuZXhwb3J0cy51bmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IC0xO1xufTtcblxuZXhwb3J0cy5fdW5yZWZBY3RpdmUgPSBleHBvcnRzLmFjdGl2ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuXG4gIHZhciBtc2VjcyA9IGl0ZW0uX2lkbGVUaW1lb3V0O1xuICBpZiAobXNlY3MgPj0gMCkge1xuICAgIGl0ZW0uX2lkbGVUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIG9uVGltZW91dCgpIHtcbiAgICAgIGlmIChpdGVtLl9vblRpbWVvdXQpXG4gICAgICAgIGl0ZW0uX29uVGltZW91dCgpO1xuICAgIH0sIG1zZWNzKTtcbiAgfVxufTtcblxuLy8gc2V0aW1tZWRpYXRlIGF0dGFjaGVzIGl0c2VsZiB0byB0aGUgZ2xvYmFsIG9iamVjdFxucmVxdWlyZShcInNldGltbWVkaWF0ZVwiKTtcbmV4cG9ydHMuc2V0SW1tZWRpYXRlID0gc2V0SW1tZWRpYXRlO1xuZXhwb3J0cy5jbGVhckltbWVkaWF0ZSA9IGNsZWFySW1tZWRpYXRlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiKGZ1bmN0aW9uIChnbG9iYWwsIHVuZGVmaW5lZCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgaWYgKGdsb2JhbC5zZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBuZXh0SGFuZGxlID0gMTsgLy8gU3BlYyBzYXlzIGdyZWF0ZXIgdGhhbiB6ZXJvXG4gICAgdmFyIHRhc2tzQnlIYW5kbGUgPSB7fTtcbiAgICB2YXIgY3VycmVudGx5UnVubmluZ0FUYXNrID0gZmFsc2U7XG4gICAgdmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbiAgICB2YXIgcmVnaXN0ZXJJbW1lZGlhdGU7XG5cbiAgICBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoY2FsbGJhY2spIHtcbiAgICAgIC8vIENhbGxiYWNrIGNhbiBlaXRoZXIgYmUgYSBmdW5jdGlvbiBvciBhIHN0cmluZ1xuICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNhbGxiYWNrID0gbmV3IEZ1bmN0aW9uKFwiXCIgKyBjYWxsYmFjayk7XG4gICAgICB9XG4gICAgICAvLyBDb3B5IGZ1bmN0aW9uIGFyZ3VtZW50c1xuICAgICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpICsgMV07XG4gICAgICB9XG4gICAgICAvLyBTdG9yZSBhbmQgcmVnaXN0ZXIgdGhlIHRhc2tcbiAgICAgIHZhciB0YXNrID0geyBjYWxsYmFjazogY2FsbGJhY2ssIGFyZ3M6IGFyZ3MgfTtcbiAgICAgIHRhc2tzQnlIYW5kbGVbbmV4dEhhbmRsZV0gPSB0YXNrO1xuICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUobmV4dEhhbmRsZSk7XG4gICAgICByZXR1cm4gbmV4dEhhbmRsZSsrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGhhbmRsZSkge1xuICAgICAgICBkZWxldGUgdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bih0YXNrKSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IHRhc2suY2FsbGJhY2s7XG4gICAgICAgIHZhciBhcmdzID0gdGFzay5hcmdzO1xuICAgICAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bklmUHJlc2VudChoYW5kbGUpIHtcbiAgICAgICAgLy8gRnJvbSB0aGUgc3BlYzogXCJXYWl0IHVudGlsIGFueSBpbnZvY2F0aW9ucyBvZiB0aGlzIGFsZ29yaXRobSBzdGFydGVkIGJlZm9yZSB0aGlzIG9uZSBoYXZlIGNvbXBsZXRlZC5cIlxuICAgICAgICAvLyBTbyBpZiB3ZSdyZSBjdXJyZW50bHkgcnVubmluZyBhIHRhc2ssIHdlJ2xsIG5lZWQgdG8gZGVsYXkgdGhpcyBpbnZvY2F0aW9uLlxuICAgICAgICBpZiAoY3VycmVudGx5UnVubmluZ0FUYXNrKSB7XG4gICAgICAgICAgICAvLyBEZWxheSBieSBkb2luZyBhIHNldFRpbWVvdXQuIHNldEltbWVkaWF0ZSB3YXMgdHJpZWQgaW5zdGVhZCwgYnV0IGluIEZpcmVmb3ggNyBpdCBnZW5lcmF0ZWQgYVxuICAgICAgICAgICAgLy8gXCJ0b28gbXVjaCByZWN1cnNpb25cIiBlcnJvci5cbiAgICAgICAgICAgIHNldFRpbWVvdXQocnVuSWZQcmVzZW50LCAwLCBoYW5kbGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHRhc2sgPSB0YXNrc0J5SGFuZGxlW2hhbmRsZV07XG4gICAgICAgICAgICBpZiAodGFzaykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IHRydWU7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcnVuKHRhc2spO1xuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW1tZWRpYXRlKGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxOZXh0VGlja0ltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbiAoKSB7IHJ1bklmUHJlc2VudChoYW5kbGUpOyB9KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYW5Vc2VQb3N0TWVzc2FnZSgpIHtcbiAgICAgICAgLy8gVGhlIHRlc3QgYWdhaW5zdCBgaW1wb3J0U2NyaXB0c2AgcHJldmVudHMgdGhpcyBpbXBsZW1lbnRhdGlvbiBmcm9tIGJlaW5nIGluc3RhbGxlZCBpbnNpZGUgYSB3ZWIgd29ya2VyLFxuICAgICAgICAvLyB3aGVyZSBgZ2xvYmFsLnBvc3RNZXNzYWdlYCBtZWFucyBzb21ldGhpbmcgY29tcGxldGVseSBkaWZmZXJlbnQgYW5kIGNhbid0IGJlIHVzZWQgZm9yIHRoaXMgcHVycG9zZS5cbiAgICAgICAgaWYgKGdsb2JhbC5wb3N0TWVzc2FnZSAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdHMpIHtcbiAgICAgICAgICAgIHZhciBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBvbGRPbk1lc3NhZ2UgPSBnbG9iYWwub25tZXNzYWdlO1xuICAgICAgICAgICAgZ2xvYmFsLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXMgPSBmYWxzZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoXCJcIiwgXCIqXCIpO1xuICAgICAgICAgICAgZ2xvYmFsLm9ubWVzc2FnZSA9IG9sZE9uTWVzc2FnZTtcbiAgICAgICAgICAgIHJldHVybiBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFBvc3RNZXNzYWdlSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIC8vIEluc3RhbGxzIGFuIGV2ZW50IGhhbmRsZXIgb24gYGdsb2JhbGAgZm9yIHRoZSBgbWVzc2FnZWAgZXZlbnQ6IHNlZVxuICAgICAgICAvLyAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0RPTS93aW5kb3cucG9zdE1lc3NhZ2VcbiAgICAgICAgLy8gKiBodHRwOi8vd3d3LndoYXR3Zy5vcmcvc3BlY3Mvd2ViLWFwcHMvY3VycmVudC13b3JrL211bHRpcGFnZS9jb21tcy5odG1sI2Nyb3NzRG9jdW1lbnRNZXNzYWdlc1xuXG4gICAgICAgIHZhciBtZXNzYWdlUHJlZml4ID0gXCJzZXRJbW1lZGlhdGUkXCIgKyBNYXRoLnJhbmRvbSgpICsgXCIkXCI7XG4gICAgICAgIHZhciBvbkdsb2JhbE1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnNvdXJjZSA9PT0gZ2xvYmFsICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIGV2ZW50LmRhdGEgPT09IFwic3RyaW5nXCIgJiZcbiAgICAgICAgICAgICAgICBldmVudC5kYXRhLmluZGV4T2YobWVzc2FnZVByZWZpeCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoK2V2ZW50LmRhdGEuc2xpY2UobWVzc2FnZVByZWZpeC5sZW5ndGgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBvbkdsb2JhbE1lc3NhZ2UsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdsb2JhbC5hdHRhY2hFdmVudChcIm9ubWVzc2FnZVwiLCBvbkdsb2JhbE1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShtZXNzYWdlUHJlZml4ICsgaGFuZGxlLCBcIipcIik7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbE1lc3NhZ2VDaGFubmVsSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBoYW5kbGUgPSBldmVudC5kYXRhO1xuICAgICAgICAgICAgcnVuSWZQcmVzZW50KGhhbmRsZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoaGFuZGxlKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsUmVhZHlTdGF0ZUNoYW5nZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgaHRtbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgYSA8c2NyaXB0PiBlbGVtZW50OyBpdHMgcmVhZHlzdGF0ZWNoYW5nZSBldmVudCB3aWxsIGJlIGZpcmVkIGFzeW5jaHJvbm91c2x5IG9uY2UgaXQgaXMgaW5zZXJ0ZWRcbiAgICAgICAgICAgIC8vIGludG8gdGhlIGRvY3VtZW50LiBEbyBzbywgdGh1cyBxdWV1aW5nIHVwIHRoZSB0YXNrLiBSZW1lbWJlciB0byBjbGVhbiB1cCBvbmNlIGl0J3MgYmVlbiBjYWxsZWQuXG4gICAgICAgICAgICB2YXIgc2NyaXB0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgICAgICAgICBzY3JpcHQgPSBudWxsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsU2V0VGltZW91dEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChydW5JZlByZXNlbnQsIDAsIGhhbmRsZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gSWYgc3VwcG9ydGVkLCB3ZSBzaG91bGQgYXR0YWNoIHRvIHRoZSBwcm90b3R5cGUgb2YgZ2xvYmFsLCBzaW5jZSB0aGF0IGlzIHdoZXJlIHNldFRpbWVvdXQgZXQgYWwuIGxpdmUuXG4gICAgdmFyIGF0dGFjaFRvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihnbG9iYWwpO1xuICAgIGF0dGFjaFRvID0gYXR0YWNoVG8gJiYgYXR0YWNoVG8uc2V0VGltZW91dCA/IGF0dGFjaFRvIDogZ2xvYmFsO1xuXG4gICAgLy8gRG9uJ3QgZ2V0IGZvb2xlZCBieSBlLmcuIGJyb3dzZXJpZnkgZW52aXJvbm1lbnRzLlxuICAgIGlmICh7fS50b1N0cmluZy5jYWxsKGdsb2JhbC5wcm9jZXNzKSA9PT0gXCJbb2JqZWN0IHByb2Nlc3NdXCIpIHtcbiAgICAgICAgLy8gRm9yIE5vZGUuanMgYmVmb3JlIDAuOVxuICAgICAgICBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChjYW5Vc2VQb3N0TWVzc2FnZSgpKSB7XG4gICAgICAgIC8vIEZvciBub24tSUUxMCBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgaW5zdGFsbFBvc3RNZXNzYWdlSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoZ2xvYmFsLk1lc3NhZ2VDaGFubmVsKSB7XG4gICAgICAgIC8vIEZvciB3ZWIgd29ya2Vycywgd2hlcmUgc3VwcG9ydGVkXG4gICAgICAgIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGRvYyAmJiBcIm9ucmVhZHlzdGF0ZWNoYW5nZVwiIGluIGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpKSB7XG4gICAgICAgIC8vIEZvciBJRSA24oCTOFxuICAgICAgICBpbnN0YWxsUmVhZHlTdGF0ZUNoYW5nZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGb3Igb2xkZXIgYnJvd3NlcnNcbiAgICAgICAgaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpO1xuICAgIH1cblxuICAgIGF0dGFjaFRvLnNldEltbWVkaWF0ZSA9IHNldEltbWVkaWF0ZTtcbiAgICBhdHRhY2hUby5jbGVhckltbWVkaWF0ZSA9IGNsZWFySW1tZWRpYXRlO1xufSh0eXBlb2Ygc2VsZiA9PT0gXCJ1bmRlZmluZWRcIiA/IHR5cGVvZiBnbG9iYWwgPT09IFwidW5kZWZpbmVkXCIgPyB0aGlzIDogZ2xvYmFsIDogc2VsZikpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2V0aW1tZWRpYXRlL3NldEltbWVkaWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xufSBjYXRjaChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXG5cdFx0ZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoWydtb2R1bGUnLCAnLi9jbGlwYm9hcmQtYWN0aW9uJywgJ3RpbnktZW1pdHRlcicsICdnb29kLWxpc3RlbmVyJ10sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgZmFjdG9yeShtb2R1bGUsIHJlcXVpcmUoJy4vY2xpcGJvYXJkLWFjdGlvbicpLCByZXF1aXJlKCd0aW55LWVtaXR0ZXInKSwgcmVxdWlyZSgnZ29vZC1saXN0ZW5lcicpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbW9kID0ge1xuICAgICAgICAgICAgZXhwb3J0czoge31cbiAgICAgICAgfTtcbiAgICAgICAgZmFjdG9yeShtb2QsIGdsb2JhbC5jbGlwYm9hcmRBY3Rpb24sIGdsb2JhbC50aW55RW1pdHRlciwgZ2xvYmFsLmdvb2RMaXN0ZW5lcik7XG4gICAgICAgIGdsb2JhbC5jbGlwYm9hcmQgPSBtb2QuZXhwb3J0cztcbiAgICB9XG59KSh0aGlzLCBmdW5jdGlvbiAobW9kdWxlLCBfY2xpcGJvYXJkQWN0aW9uLCBfdGlueUVtaXR0ZXIsIF9nb29kTGlzdGVuZXIpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgX2NsaXBib2FyZEFjdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGlwYm9hcmRBY3Rpb24pO1xuXG4gICAgdmFyIF90aW55RW1pdHRlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90aW55RW1pdHRlcik7XG5cbiAgICB2YXIgX2dvb2RMaXN0ZW5lcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nb29kTGlzdGVuZXIpO1xuXG4gICAgZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG9ialxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICAgIH0gOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gICAgICAgIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgICAgICAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICAgICAgICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgICAgICAgfTtcbiAgICB9KCk7XG5cbiAgICBmdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7XG4gICAgICAgIGlmICghc2VsZikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbiAgICB9XG5cbiAgICB2YXIgQ2xpcGJvYXJkID0gZnVuY3Rpb24gKF9FbWl0dGVyKSB7XG4gICAgICAgIF9pbmhlcml0cyhDbGlwYm9hcmQsIF9FbWl0dGVyKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd8SFRNTEVsZW1lbnR8SFRNTENvbGxlY3Rpb258Tm9kZUxpc3R9IHRyaWdnZXJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIENsaXBib2FyZCh0cmlnZ2VyLCBvcHRpb25zKSB7XG4gICAgICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ2xpcGJvYXJkKTtcblxuICAgICAgICAgICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKENsaXBib2FyZC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKENsaXBib2FyZCkpLmNhbGwodGhpcykpO1xuXG4gICAgICAgICAgICBfdGhpcy5yZXNvbHZlT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgICAgIF90aGlzLmxpc3RlbkNsaWNrKHRyaWdnZXIpO1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlZmluZXMgaWYgYXR0cmlidXRlcyB3b3VsZCBiZSByZXNvbHZlZCB1c2luZyBpbnRlcm5hbCBzZXR0ZXIgZnVuY3Rpb25zXG4gICAgICAgICAqIG9yIGN1c3RvbSBmdW5jdGlvbnMgdGhhdCB3ZXJlIHBhc3NlZCBpbiB0aGUgY29uc3RydWN0b3IuXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICAgICAqL1xuXG5cbiAgICAgICAgX2NyZWF0ZUNsYXNzKENsaXBib2FyZCwgW3tcbiAgICAgICAgICAgIGtleTogJ3Jlc29sdmVPcHRpb25zJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZXNvbHZlT3B0aW9ucygpIHtcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG5cbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbiA9IHR5cGVvZiBvcHRpb25zLmFjdGlvbiA9PT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMuYWN0aW9uIDogdGhpcy5kZWZhdWx0QWN0aW9uO1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdHlwZW9mIG9wdGlvbnMudGFyZ2V0ID09PSAnZnVuY3Rpb24nID8gb3B0aW9ucy50YXJnZXQgOiB0aGlzLmRlZmF1bHRUYXJnZXQ7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0ID0gdHlwZW9mIG9wdGlvbnMudGV4dCA9PT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMudGV4dCA6IHRoaXMuZGVmYXVsdFRleHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPSBfdHlwZW9mKG9wdGlvbnMuY29udGFpbmVyKSA9PT0gJ29iamVjdCcgPyBvcHRpb25zLmNvbnRhaW5lciA6IGRvY3VtZW50LmJvZHk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ2xpc3RlbkNsaWNrJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBsaXN0ZW5DbGljayh0cmlnZ2VyKSB7XG4gICAgICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbmVyID0gKDAsIF9nb29kTGlzdGVuZXIyLmRlZmF1bHQpKHRyaWdnZXIsICdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpczIub25DbGljayhlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnb25DbGljaycsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gb25DbGljayhlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRyaWdnZXIgPSBlLmRlbGVnYXRlVGFyZ2V0IHx8IGUuY3VycmVudFRhcmdldDtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNsaXBib2FyZEFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsaXBib2FyZEFjdGlvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5jbGlwYm9hcmRBY3Rpb24gPSBuZXcgX2NsaXBib2FyZEFjdGlvbjIuZGVmYXVsdCh7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb24odHJpZ2dlciksXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcy50YXJnZXQodHJpZ2dlciksXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHRoaXMudGV4dCh0cmlnZ2VyKSxcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyOiB0aGlzLmNvbnRhaW5lcixcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcjogdHJpZ2dlcixcbiAgICAgICAgICAgICAgICAgICAgZW1pdHRlcjogdGhpc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdkZWZhdWx0QWN0aW9uJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkZWZhdWx0QWN0aW9uKHRyaWdnZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0QXR0cmlidXRlVmFsdWUoJ2FjdGlvbicsIHRyaWdnZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdkZWZhdWx0VGFyZ2V0JyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkZWZhdWx0VGFyZ2V0KHRyaWdnZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0b3IgPSBnZXRBdHRyaWJ1dGVWYWx1ZSgndGFyZ2V0JywgdHJpZ2dlcik7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnZGVmYXVsdFRleHQnLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRlZmF1bHRUZXh0KHRyaWdnZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0QXR0cmlidXRlVmFsdWUoJ3RleHQnLCB0cmlnZ2VyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnZGVzdHJveScsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbmVyLmRlc3Ryb3koKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNsaXBib2FyZEFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsaXBib2FyZEFjdGlvbi5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xpcGJvYXJkQWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1dLCBbe1xuICAgICAgICAgICAga2V5OiAnaXNTdXBwb3J0ZWQnLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGlzU3VwcG9ydGVkKCkge1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFsnY29weScsICdjdXQnXTtcblxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gdHlwZW9mIGFjdGlvbiA9PT0gJ3N0cmluZycgPyBbYWN0aW9uXSA6IGFjdGlvbjtcbiAgICAgICAgICAgICAgICB2YXIgc3VwcG9ydCA9ICEhZG9jdW1lbnQucXVlcnlDb21tYW5kU3VwcG9ydGVkO1xuXG4gICAgICAgICAgICAgICAgYWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgc3VwcG9ydCA9IHN1cHBvcnQgJiYgISFkb2N1bWVudC5xdWVyeUNvbW1hbmRTdXBwb3J0ZWQoYWN0aW9uKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBzdXBwb3J0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XSk7XG5cbiAgICAgICAgcmV0dXJuIENsaXBib2FyZDtcbiAgICB9KF90aW55RW1pdHRlcjIuZGVmYXVsdCk7XG5cbiAgICAvKipcbiAgICAgKiBIZWxwZXIgZnVuY3Rpb24gdG8gcmV0cmlldmUgYXR0cmlidXRlIHZhbHVlLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdWZmaXhcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRBdHRyaWJ1dGVWYWx1ZShzdWZmaXgsIGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGF0dHJpYnV0ZSA9ICdkYXRhLWNsaXBib2FyZC0nICsgc3VmZml4O1xuXG4gICAgICAgIGlmICghZWxlbWVudC5oYXNBdHRyaWJ1dGUoYXR0cmlidXRlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBDbGlwYm9hcmQ7XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jbGlwYm9hcmQvbGliL2NsaXBib2FyZC5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFsnbW9kdWxlJywgJ3NlbGVjdCddLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGZhY3RvcnkobW9kdWxlLCByZXF1aXJlKCdzZWxlY3QnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIG1vZCA9IHtcbiAgICAgICAgICAgIGV4cG9ydHM6IHt9XG4gICAgICAgIH07XG4gICAgICAgIGZhY3RvcnkobW9kLCBnbG9iYWwuc2VsZWN0KTtcbiAgICAgICAgZ2xvYmFsLmNsaXBib2FyZEFjdGlvbiA9IG1vZC5leHBvcnRzO1xuICAgIH1cbn0pKHRoaXMsIGZ1bmN0aW9uIChtb2R1bGUsIF9zZWxlY3QpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgX3NlbGVjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zZWxlY3QpO1xuXG4gICAgZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG9ialxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICAgIH0gOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gICAgICAgIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgICAgICAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICAgICAgICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgICAgICAgfTtcbiAgICB9KCk7XG5cbiAgICB2YXIgQ2xpcGJvYXJkQWN0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIENsaXBib2FyZEFjdGlvbihvcHRpb25zKSB7XG4gICAgICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ2xpcGJvYXJkQWN0aW9uKTtcblxuICAgICAgICAgICAgdGhpcy5yZXNvbHZlT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdFNlbGVjdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlZmluZXMgYmFzZSBwcm9wZXJ0aWVzIHBhc3NlZCBmcm9tIGNvbnN0cnVjdG9yLlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICAgKi9cblxuXG4gICAgICAgIF9jcmVhdGVDbGFzcyhDbGlwYm9hcmRBY3Rpb24sIFt7XG4gICAgICAgICAgICBrZXk6ICdyZXNvbHZlT3B0aW9ucycsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVzb2x2ZU9wdGlvbnMoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb24gPSBvcHRpb25zLmFjdGlvbjtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdHRlciA9IG9wdGlvbnMuZW1pdHRlcjtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IG9wdGlvbnMudGFyZ2V0O1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dCA9IG9wdGlvbnMudGV4dDtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIgPSBvcHRpb25zLnRyaWdnZXI7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkVGV4dCA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdpbml0U2VsZWN0aW9uJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0U2VsZWN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RGYWtlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFRhcmdldCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnc2VsZWN0RmFrZScsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2VsZWN0RmFrZSgpIHtcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgdmFyIGlzUlRMID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGlyJykgPT0gJ3J0bCc7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZha2UoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZmFrZUhhbmRsZXJDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLnJlbW92ZUZha2UoKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMuZmFrZUhhbmRsZXIgPSB0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZmFrZUhhbmRsZXJDYWxsYmFjaykgfHwgdHJ1ZTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZmFrZUVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgICAgICAgICAgICAgIC8vIFByZXZlbnQgem9vbWluZyBvbiBpT1NcbiAgICAgICAgICAgICAgICB0aGlzLmZha2VFbGVtLnN0eWxlLmZvbnRTaXplID0gJzEycHQnO1xuICAgICAgICAgICAgICAgIC8vIFJlc2V0IGJveCBtb2RlbFxuICAgICAgICAgICAgICAgIHRoaXMuZmFrZUVsZW0uc3R5bGUuYm9yZGVyID0gJzAnO1xuICAgICAgICAgICAgICAgIHRoaXMuZmFrZUVsZW0uc3R5bGUucGFkZGluZyA9ICcwJztcbiAgICAgICAgICAgICAgICB0aGlzLmZha2VFbGVtLnN0eWxlLm1hcmdpbiA9ICcwJztcbiAgICAgICAgICAgICAgICAvLyBNb3ZlIGVsZW1lbnQgb3V0IG9mIHNjcmVlbiBob3Jpem9udGFsbHlcbiAgICAgICAgICAgICAgICB0aGlzLmZha2VFbGVtLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgICAgICAgICB0aGlzLmZha2VFbGVtLnN0eWxlW2lzUlRMID8gJ3JpZ2h0JyA6ICdsZWZ0J10gPSAnLTk5OTlweCc7XG4gICAgICAgICAgICAgICAgLy8gTW92ZSBlbGVtZW50IHRvIHRoZSBzYW1lIHBvc2l0aW9uIHZlcnRpY2FsbHlcbiAgICAgICAgICAgICAgICB2YXIgeVBvc2l0aW9uID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWtlRWxlbS5zdHlsZS50b3AgPSB5UG9zaXRpb24gKyAncHgnO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5mYWtlRWxlbS5zZXRBdHRyaWJ1dGUoJ3JlYWRvbmx5JywgJycpO1xuICAgICAgICAgICAgICAgIHRoaXMuZmFrZUVsZW0udmFsdWUgPSB0aGlzLnRleHQ7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmZha2VFbGVtKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUZXh0ID0gKDAsIF9zZWxlY3QyLmRlZmF1bHQpKHRoaXMuZmFrZUVsZW0pO1xuICAgICAgICAgICAgICAgIHRoaXMuY29weVRleHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAncmVtb3ZlRmFrZScsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlRmFrZSgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mYWtlSGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZmFrZUhhbmRsZXJDYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmFrZUhhbmRsZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZha2VIYW5kbGVyQ2FsbGJhY2sgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZha2VFbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUNoaWxkKHRoaXMuZmFrZUVsZW0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZha2VFbGVtID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ3NlbGVjdFRhcmdldCcsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2VsZWN0VGFyZ2V0KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUZXh0ID0gKDAsIF9zZWxlY3QyLmRlZmF1bHQpKHRoaXMudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvcHlUZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ2NvcHlUZXh0JyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb3B5VGV4dCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3VjY2VlZGVkID0gdm9pZCAwO1xuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VlZGVkID0gZG9jdW1lbnQuZXhlY0NvbW1hbmQodGhpcy5hY3Rpb24pO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBzdWNjZWVkZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVJlc3VsdChzdWNjZWVkZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdoYW5kbGVSZXN1bHQnLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVJlc3VsdChzdWNjZWVkZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdChzdWNjZWVkZWQgPyAnc3VjY2VzcycgOiAnZXJyb3InLCB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHRoaXMuc2VsZWN0ZWRUZXh0LFxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyOiB0aGlzLnRyaWdnZXIsXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyU2VsZWN0aW9uOiB0aGlzLmNsZWFyU2VsZWN0aW9uLmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnY2xlYXJTZWxlY3Rpb24nLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNsZWFyU2VsZWN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWdnZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgd2luZG93LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdkZXN0cm95JyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRmFrZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdhY3Rpb24nLFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogJ2NvcHknO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fYWN0aW9uID0gYWN0aW9uO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2FjdGlvbiAhPT0gJ2NvcHknICYmIHRoaXMuX2FjdGlvbiAhPT0gJ2N1dCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIFwiYWN0aW9uXCIgdmFsdWUsIHVzZSBlaXRoZXIgXCJjb3B5XCIgb3IgXCJjdXRcIicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYWN0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICd0YXJnZXQnLFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQodGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgJiYgKHR5cGVvZiB0YXJnZXQgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHRhcmdldCkpID09PSAnb2JqZWN0JyAmJiB0YXJnZXQubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFjdGlvbiA9PT0gJ2NvcHknICYmIHRhcmdldC5oYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgXCJ0YXJnZXRcIiBhdHRyaWJ1dGUuIFBsZWFzZSB1c2UgXCJyZWFkb25seVwiIGluc3RlYWQgb2YgXCJkaXNhYmxlZFwiIGF0dHJpYnV0ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hY3Rpb24gPT09ICdjdXQnICYmICh0YXJnZXQuaGFzQXR0cmlidXRlKCdyZWFkb25seScpIHx8IHRhcmdldC5oYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJykpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIFwidGFyZ2V0XCIgYXR0cmlidXRlLiBZb3UgY2FuXFwndCBjdXQgdGV4dCBmcm9tIGVsZW1lbnRzIHdpdGggXCJyZWFkb25seVwiIG9yIFwiZGlzYWJsZWRcIiBhdHRyaWJ1dGVzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3RhcmdldCA9IHRhcmdldDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBcInRhcmdldFwiIHZhbHVlLCB1c2UgYSB2YWxpZCBFbGVtZW50Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RhcmdldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfV0pO1xuXG4gICAgICAgIHJldHVybiBDbGlwYm9hcmRBY3Rpb247XG4gICAgfSgpO1xuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBDbGlwYm9hcmRBY3Rpb247XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jbGlwYm9hcmQvbGliL2NsaXBib2FyZC1hY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIHNlbGVjdChlbGVtZW50KSB7XG4gICAgdmFyIHNlbGVjdGVkVGV4dDtcblxuICAgIGlmIChlbGVtZW50Lm5vZGVOYW1lID09PSAnU0VMRUNUJykge1xuICAgICAgICBlbGVtZW50LmZvY3VzKCk7XG5cbiAgICAgICAgc2VsZWN0ZWRUZXh0ID0gZWxlbWVudC52YWx1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZWxlbWVudC5ub2RlTmFtZSA9PT0gJ0lOUFVUJyB8fCBlbGVtZW50Lm5vZGVOYW1lID09PSAnVEVYVEFSRUEnKSB7XG4gICAgICAgIHZhciBpc1JlYWRPbmx5ID0gZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ3JlYWRvbmx5Jyk7XG5cbiAgICAgICAgaWYgKCFpc1JlYWRPbmx5KSB7XG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgncmVhZG9ubHknLCAnJyk7XG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50LnNlbGVjdCgpO1xuICAgICAgICBlbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKDAsIGVsZW1lbnQudmFsdWUubGVuZ3RoKTtcblxuICAgICAgICBpZiAoIWlzUmVhZE9ubHkpIHtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdyZWFkb25seScpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZWN0ZWRUZXh0ID0gZWxlbWVudC52YWx1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJykpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIHZhciByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG5cbiAgICAgICAgcmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKGVsZW1lbnQpO1xuICAgICAgICBzZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgIHNlbGVjdGlvbi5hZGRSYW5nZShyYW5nZSk7XG5cbiAgICAgICAgc2VsZWN0ZWRUZXh0ID0gc2VsZWN0aW9uLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGVjdGVkVGV4dDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZWxlY3Q7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zZWxlY3Qvc3JjL3NlbGVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gRSAoKSB7XG4gIC8vIEtlZXAgdGhpcyBlbXB0eSBzbyBpdCdzIGVhc2llciB0byBpbmhlcml0IGZyb21cbiAgLy8gKHZpYSBodHRwczovL2dpdGh1Yi5jb20vbGlwc21hY2sgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vc2NvdHRjb3JnYW4vdGlueS1lbWl0dGVyL2lzc3Vlcy8zKVxufVxuXG5FLnByb3RvdHlwZSA9IHtcbiAgb246IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaywgY3R4KSB7XG4gICAgdmFyIGUgPSB0aGlzLmUgfHwgKHRoaXMuZSA9IHt9KTtcblxuICAgIChlW25hbWVdIHx8IChlW25hbWVdID0gW10pKS5wdXNoKHtcbiAgICAgIGZuOiBjYWxsYmFjayxcbiAgICAgIGN0eDogY3R4XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBvbmNlOiBmdW5jdGlvbiAobmFtZSwgY2FsbGJhY2ssIGN0eCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBmdW5jdGlvbiBsaXN0ZW5lciAoKSB7XG4gICAgICBzZWxmLm9mZihuYW1lLCBsaXN0ZW5lcik7XG4gICAgICBjYWxsYmFjay5hcHBseShjdHgsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIGxpc3RlbmVyLl8gPSBjYWxsYmFja1xuICAgIHJldHVybiB0aGlzLm9uKG5hbWUsIGxpc3RlbmVyLCBjdHgpO1xuICB9LFxuXG4gIGVtaXQ6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdmFyIGRhdGEgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgdmFyIGV2dEFyciA9ICgodGhpcy5lIHx8ICh0aGlzLmUgPSB7fSkpW25hbWVdIHx8IFtdKS5zbGljZSgpO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgbGVuID0gZXZ0QXJyLmxlbmd0aDtcblxuICAgIGZvciAoaTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBldnRBcnJbaV0uZm4uYXBwbHkoZXZ0QXJyW2ldLmN0eCwgZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgb2ZmOiBmdW5jdGlvbiAobmFtZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgZSA9IHRoaXMuZSB8fCAodGhpcy5lID0ge30pO1xuICAgIHZhciBldnRzID0gZVtuYW1lXTtcbiAgICB2YXIgbGl2ZUV2ZW50cyA9IFtdO1xuXG4gICAgaWYgKGV2dHMgJiYgY2FsbGJhY2spIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBldnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChldnRzW2ldLmZuICE9PSBjYWxsYmFjayAmJiBldnRzW2ldLmZuLl8gIT09IGNhbGxiYWNrKVxuICAgICAgICAgIGxpdmVFdmVudHMucHVzaChldnRzW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgZXZlbnQgZnJvbSBxdWV1ZSB0byBwcmV2ZW50IG1lbW9yeSBsZWFrXG4gICAgLy8gU3VnZ2VzdGVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9sYXpkXG4gICAgLy8gUmVmOiBodHRwczovL2dpdGh1Yi5jb20vc2NvdHRjb3JnYW4vdGlueS1lbWl0dGVyL2NvbW1pdC9jNmViZmFhOWJjOTczYjMzZDExMGE4NGEzMDc3NDJiN2NmOTRjOTUzI2NvbW1pdGNvbW1lbnQtNTAyNDkxMFxuXG4gICAgKGxpdmVFdmVudHMubGVuZ3RoKVxuICAgICAgPyBlW25hbWVdID0gbGl2ZUV2ZW50c1xuICAgICAgOiBkZWxldGUgZVtuYW1lXTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90aW55LWVtaXR0ZXIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpcyA9IHJlcXVpcmUoJy4vaXMnKTtcbnZhciBkZWxlZ2F0ZSA9IHJlcXVpcmUoJ2RlbGVnYXRlJyk7XG5cbi8qKlxuICogVmFsaWRhdGVzIGFsbCBwYXJhbXMgYW5kIGNhbGxzIHRoZSByaWdodFxuICogbGlzdGVuZXIgZnVuY3Rpb24gYmFzZWQgb24gaXRzIHRhcmdldCB0eXBlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfEhUTUxFbGVtZW50fEhUTUxDb2xsZWN0aW9ufE5vZGVMaXN0fSB0YXJnZXRcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBsaXN0ZW4odGFyZ2V0LCB0eXBlLCBjYWxsYmFjaykge1xuICAgIGlmICghdGFyZ2V0ICYmICF0eXBlICYmICFjYWxsYmFjaykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgcmVxdWlyZWQgYXJndW1lbnRzJyk7XG4gICAgfVxuXG4gICAgaWYgKCFpcy5zdHJpbmcodHlwZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignU2Vjb25kIGFyZ3VtZW50IG11c3QgYmUgYSBTdHJpbmcnKTtcbiAgICB9XG5cbiAgICBpZiAoIWlzLmZuKGNhbGxiYWNrKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGlyZCBhcmd1bWVudCBtdXN0IGJlIGEgRnVuY3Rpb24nKTtcbiAgICB9XG5cbiAgICBpZiAoaXMubm9kZSh0YXJnZXQpKSB7XG4gICAgICAgIHJldHVybiBsaXN0ZW5Ob2RlKHRhcmdldCwgdHlwZSwgY2FsbGJhY2spO1xuICAgIH1cbiAgICBlbHNlIGlmIChpcy5ub2RlTGlzdCh0YXJnZXQpKSB7XG4gICAgICAgIHJldHVybiBsaXN0ZW5Ob2RlTGlzdCh0YXJnZXQsIHR5cGUsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXMuc3RyaW5nKHRhcmdldCkpIHtcbiAgICAgICAgcmV0dXJuIGxpc3RlblNlbGVjdG9yKHRhcmdldCwgdHlwZSwgY2FsbGJhY2spO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIFN0cmluZywgSFRNTEVsZW1lbnQsIEhUTUxDb2xsZWN0aW9uLCBvciBOb2RlTGlzdCcpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBBZGRzIGFuIGV2ZW50IGxpc3RlbmVyIHRvIGEgSFRNTCBlbGVtZW50XG4gKiBhbmQgcmV0dXJucyBhIHJlbW92ZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gbGlzdGVuTm9kZShub2RlLCB0eXBlLCBjYWxsYmFjaykge1xuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjayk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIGEgbGlzdCBvZiBIVE1MIGVsZW1lbnRzXG4gKiBhbmQgcmV0dXJucyBhIHJlbW92ZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge05vZGVMaXN0fEhUTUxDb2xsZWN0aW9ufSBub2RlTGlzdFxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIGxpc3Rlbk5vZGVMaXN0KG5vZGVMaXN0LCB0eXBlLCBjYWxsYmFjaykge1xuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwobm9kZUxpc3QsIGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChub2RlTGlzdCwgZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBBZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gYSBzZWxlY3RvclxuICogYW5kIHJldHVybnMgYSByZW1vdmUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gbGlzdGVuU2VsZWN0b3Ioc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIGRlbGVnYXRlKGRvY3VtZW50LmJvZHksIHNlbGVjdG9yLCB0eXBlLCBjYWxsYmFjayk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGlzdGVuO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ29vZC1saXN0ZW5lci9zcmMvbGlzdGVuLmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENoZWNrIGlmIGFyZ3VtZW50IGlzIGEgSFRNTCBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZXhwb3J0cy5ub2RlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZFxuICAgICAgICAmJiB2YWx1ZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50XG4gICAgICAgICYmIHZhbHVlLm5vZGVUeXBlID09PSAxO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBhcmd1bWVudCBpcyBhIGxpc3Qgb2YgSFRNTCBlbGVtZW50cy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmV4cG9ydHMubm9kZUxpc3QgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciB0eXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKTtcblxuICAgIHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICYmICh0eXBlID09PSAnW29iamVjdCBOb2RlTGlzdF0nIHx8IHR5cGUgPT09ICdbb2JqZWN0IEhUTUxDb2xsZWN0aW9uXScpXG4gICAgICAgICYmICgnbGVuZ3RoJyBpbiB2YWx1ZSlcbiAgICAgICAgJiYgKHZhbHVlLmxlbmd0aCA9PT0gMCB8fCBleHBvcnRzLm5vZGUodmFsdWVbMF0pKTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgYXJndW1lbnQgaXMgYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5leHBvcnRzLnN0cmluZyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZydcbiAgICAgICAgfHwgdmFsdWUgaW5zdGFuY2VvZiBTdHJpbmc7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGFyZ3VtZW50IGlzIGEgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5leHBvcnRzLmZuID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YXIgdHlwZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG5cbiAgICByZXR1cm4gdHlwZSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nb29kLWxpc3RlbmVyL3NyYy9pcy5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGNsb3Nlc3QgPSByZXF1aXJlKCcuL2Nsb3Nlc3QnKTtcblxuLyoqXG4gKiBEZWxlZ2F0ZXMgZXZlbnQgdG8gYSBzZWxlY3Rvci5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHVzZUNhcHR1cmVcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gZGVsZWdhdGUoZWxlbWVudCwgc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKSB7XG4gICAgdmFyIGxpc3RlbmVyRm4gPSBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyRm4sIHVzZUNhcHR1cmUpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXJGbiwgdXNlQ2FwdHVyZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogRmluZHMgY2xvc2VzdCBtYXRjaCBhbmQgaW52b2tlcyBjYWxsYmFjay5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gbGlzdGVuZXIoZWxlbWVudCwgc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5kZWxlZ2F0ZVRhcmdldCA9IGNsb3Nlc3QoZS50YXJnZXQsIHNlbGVjdG9yKTtcblxuICAgICAgICBpZiAoZS5kZWxlZ2F0ZVRhcmdldCkge1xuICAgICAgICAgICAgY2FsbGJhY2suY2FsbChlbGVtZW50LCBlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkZWxlZ2F0ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2RlbGVnYXRlL3NyYy9kZWxlZ2F0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIERPQ1VNRU5UX05PREVfVFlQRSA9IDk7XG5cbi8qKlxuICogQSBwb2x5ZmlsbCBmb3IgRWxlbWVudC5tYXRjaGVzKClcbiAqL1xuaWYgKHR5cGVvZiBFbGVtZW50ICE9PSAndW5kZWZpbmVkJyAmJiAhRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcykge1xuICAgIHZhciBwcm90byA9IEVsZW1lbnQucHJvdG90eXBlO1xuXG4gICAgcHJvdG8ubWF0Y2hlcyA9IHByb3RvLm1hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgICAgICAgICAgICAgICBwcm90by5tb3pNYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgICAgICAgICAgICAgcHJvdG8ubXNNYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgICAgICAgICAgICAgcHJvdG8ub01hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgICAgICAgICAgICAgICBwcm90by53ZWJraXRNYXRjaGVzU2VsZWN0b3I7XG59XG5cbi8qKlxuICogRmluZHMgdGhlIGNsb3Nlc3QgcGFyZW50IHRoYXQgbWF0Y2hlcyBhIHNlbGVjdG9yLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gY2xvc2VzdCAoZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgICB3aGlsZSAoZWxlbWVudCAmJiBlbGVtZW50Lm5vZGVUeXBlICE9PSBET0NVTUVOVF9OT0RFX1RZUEUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBlbGVtZW50Lm1hdGNoZXMgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgICAgICAgIGVsZW1lbnQubWF0Y2hlcyhzZWxlY3RvcikpIHtcbiAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbG9zZXN0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZGVsZWdhdGUvc3JjL2Nsb3Nlc3QuanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIjsoZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0LyoqXG5cdCAqIEBwcmVzZXJ2ZSBGYXN0Q2xpY2s6IHBvbHlmaWxsIHRvIHJlbW92ZSBjbGljayBkZWxheXMgb24gYnJvd3NlcnMgd2l0aCB0b3VjaCBVSXMuXG5cdCAqXG5cdCAqIEBjb2RpbmdzdGFuZGFyZCBmdGxhYnMtanN2MlxuXHQgKiBAY29weXJpZ2h0IFRoZSBGaW5hbmNpYWwgVGltZXMgTGltaXRlZCBbQWxsIFJpZ2h0cyBSZXNlcnZlZF1cblx0ICogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKHNlZSBMSUNFTlNFLnR4dClcblx0ICovXG5cblx0Lypqc2xpbnQgYnJvd3Nlcjp0cnVlLCBub2RlOnRydWUqL1xuXHQvKmdsb2JhbCBkZWZpbmUsIEV2ZW50LCBOb2RlKi9cblxuXG5cdC8qKlxuXHQgKiBJbnN0YW50aWF0ZSBmYXN0LWNsaWNraW5nIGxpc3RlbmVycyBvbiB0aGUgc3BlY2lmaWVkIGxheWVyLlxuXHQgKlxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHtFbGVtZW50fSBsYXllciBUaGUgbGF5ZXIgdG8gbGlzdGVuIG9uXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHRzXG5cdCAqL1xuXHRmdW5jdGlvbiBGYXN0Q2xpY2sobGF5ZXIsIG9wdGlvbnMpIHtcblx0XHR2YXIgb2xkT25DbGljaztcblxuXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdFx0LyoqXG5cdFx0ICogV2hldGhlciBhIGNsaWNrIGlzIGN1cnJlbnRseSBiZWluZyB0cmFja2VkLlxuXHRcdCAqXG5cdFx0ICogQHR5cGUgYm9vbGVhblxuXHRcdCAqL1xuXHRcdHRoaXMudHJhY2tpbmdDbGljayA9IGZhbHNlO1xuXG5cblx0XHQvKipcblx0XHQgKiBUaW1lc3RhbXAgZm9yIHdoZW4gY2xpY2sgdHJhY2tpbmcgc3RhcnRlZC5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIG51bWJlclxuXHRcdCAqL1xuXHRcdHRoaXMudHJhY2tpbmdDbGlja1N0YXJ0ID0gMDtcblxuXG5cdFx0LyoqXG5cdFx0ICogVGhlIGVsZW1lbnQgYmVpbmcgdHJhY2tlZCBmb3IgYSBjbGljay5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIEV2ZW50VGFyZ2V0XG5cdFx0ICovXG5cdFx0dGhpcy50YXJnZXRFbGVtZW50ID0gbnVsbDtcblxuXG5cdFx0LyoqXG5cdFx0ICogWC1jb29yZGluYXRlIG9mIHRvdWNoIHN0YXJ0IGV2ZW50LlxuXHRcdCAqXG5cdFx0ICogQHR5cGUgbnVtYmVyXG5cdFx0ICovXG5cdFx0dGhpcy50b3VjaFN0YXJ0WCA9IDA7XG5cblxuXHRcdC8qKlxuXHRcdCAqIFktY29vcmRpbmF0ZSBvZiB0b3VjaCBzdGFydCBldmVudC5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIG51bWJlclxuXHRcdCAqL1xuXHRcdHRoaXMudG91Y2hTdGFydFkgPSAwO1xuXG5cblx0XHQvKipcblx0XHQgKiBJRCBvZiB0aGUgbGFzdCB0b3VjaCwgcmV0cmlldmVkIGZyb20gVG91Y2guaWRlbnRpZmllci5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIG51bWJlclxuXHRcdCAqL1xuXHRcdHRoaXMubGFzdFRvdWNoSWRlbnRpZmllciA9IDA7XG5cblxuXHRcdC8qKlxuXHRcdCAqIFRvdWNobW92ZSBib3VuZGFyeSwgYmV5b25kIHdoaWNoIGEgY2xpY2sgd2lsbCBiZSBjYW5jZWxsZWQuXG5cdFx0ICpcblx0XHQgKiBAdHlwZSBudW1iZXJcblx0XHQgKi9cblx0XHR0aGlzLnRvdWNoQm91bmRhcnkgPSBvcHRpb25zLnRvdWNoQm91bmRhcnkgfHwgMTA7XG5cblxuXHRcdC8qKlxuXHRcdCAqIFRoZSBGYXN0Q2xpY2sgbGF5ZXIuXG5cdFx0ICpcblx0XHQgKiBAdHlwZSBFbGVtZW50XG5cdFx0ICovXG5cdFx0dGhpcy5sYXllciA9IGxheWVyO1xuXG5cdFx0LyoqXG5cdFx0ICogVGhlIG1pbmltdW0gdGltZSBiZXR3ZWVuIHRhcCh0b3VjaHN0YXJ0IGFuZCB0b3VjaGVuZCkgZXZlbnRzXG5cdFx0ICpcblx0XHQgKiBAdHlwZSBudW1iZXJcblx0XHQgKi9cblx0XHR0aGlzLnRhcERlbGF5ID0gb3B0aW9ucy50YXBEZWxheSB8fCAyMDA7XG5cblx0XHQvKipcblx0XHQgKiBUaGUgbWF4aW11bSB0aW1lIGZvciBhIHRhcFxuXHRcdCAqXG5cdFx0ICogQHR5cGUgbnVtYmVyXG5cdFx0ICovXG5cdFx0dGhpcy50YXBUaW1lb3V0ID0gb3B0aW9ucy50YXBUaW1lb3V0IHx8IDcwMDtcblxuXHRcdGlmIChGYXN0Q2xpY2subm90TmVlZGVkKGxheWVyKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIFNvbWUgb2xkIHZlcnNpb25zIG9mIEFuZHJvaWQgZG9uJ3QgaGF2ZSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZFxuXHRcdGZ1bmN0aW9uIGJpbmQobWV0aG9kLCBjb250ZXh0KSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiBtZXRob2QuYXBwbHkoY29udGV4dCwgYXJndW1lbnRzKTsgfTtcblx0XHR9XG5cblxuXHRcdHZhciBtZXRob2RzID0gWydvbk1vdXNlJywgJ29uQ2xpY2snLCAnb25Ub3VjaFN0YXJ0JywgJ29uVG91Y2hNb3ZlJywgJ29uVG91Y2hFbmQnLCAnb25Ub3VjaENhbmNlbCddO1xuXHRcdHZhciBjb250ZXh0ID0gdGhpcztcblx0XHRmb3IgKHZhciBpID0gMCwgbCA9IG1ldGhvZHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdFx0XHRjb250ZXh0W21ldGhvZHNbaV1dID0gYmluZChjb250ZXh0W21ldGhvZHNbaV1dLCBjb250ZXh0KTtcblx0XHR9XG5cblx0XHQvLyBTZXQgdXAgZXZlbnQgaGFuZGxlcnMgYXMgcmVxdWlyZWRcblx0XHRpZiAoZGV2aWNlSXNBbmRyb2lkKSB7XG5cdFx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCB0aGlzLm9uTW91c2UsIHRydWUpO1xuXHRcdFx0bGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlLCB0cnVlKTtcblx0XHRcdGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uTW91c2UsIHRydWUpO1xuXHRcdH1cblxuXHRcdGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNsaWNrLCB0cnVlKTtcblx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5vblRvdWNoU3RhcnQsIGZhbHNlKTtcblx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm9uVG91Y2hNb3ZlLCBmYWxzZSk7XG5cdFx0bGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLm9uVG91Y2hFbmQsIGZhbHNlKTtcblx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXMub25Ub3VjaENhbmNlbCwgZmFsc2UpO1xuXG5cdFx0Ly8gSGFjayBpcyByZXF1aXJlZCBmb3IgYnJvd3NlcnMgdGhhdCBkb24ndCBzdXBwb3J0IEV2ZW50I3N0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiAoZS5nLiBBbmRyb2lkIDIpXG5cdFx0Ly8gd2hpY2ggaXMgaG93IEZhc3RDbGljayBub3JtYWxseSBzdG9wcyBjbGljayBldmVudHMgYnViYmxpbmcgdG8gY2FsbGJhY2tzIHJlZ2lzdGVyZWQgb24gdGhlIEZhc3RDbGlja1xuXHRcdC8vIGxheWVyIHdoZW4gdGhleSBhcmUgY2FuY2VsbGVkLlxuXHRcdGlmICghRXZlbnQucHJvdG90eXBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbikge1xuXHRcdFx0bGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGNhbGxiYWNrLCBjYXB0dXJlKSB7XG5cdFx0XHRcdHZhciBybXYgPSBOb2RlLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyO1xuXHRcdFx0XHRpZiAodHlwZSA9PT0gJ2NsaWNrJykge1xuXHRcdFx0XHRcdHJtdi5jYWxsKGxheWVyLCB0eXBlLCBjYWxsYmFjay5oaWphY2tlZCB8fCBjYWxsYmFjaywgY2FwdHVyZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cm12LmNhbGwobGF5ZXIsIHR5cGUsIGNhbGxiYWNrLCBjYXB0dXJlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0bGF5ZXIuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGNhbGxiYWNrLCBjYXB0dXJlKSB7XG5cdFx0XHRcdHZhciBhZHYgPSBOb2RlLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyO1xuXHRcdFx0XHRpZiAodHlwZSA9PT0gJ2NsaWNrJykge1xuXHRcdFx0XHRcdGFkdi5jYWxsKGxheWVyLCB0eXBlLCBjYWxsYmFjay5oaWphY2tlZCB8fCAoY2FsbGJhY2suaGlqYWNrZWQgPSBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRcdFx0aWYgKCFldmVudC5wcm9wYWdhdGlvblN0b3BwZWQpIHtcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2soZXZlbnQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pLCBjYXB0dXJlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRhZHYuY2FsbChsYXllciwgdHlwZSwgY2FsbGJhY2ssIGNhcHR1cmUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdC8vIElmIGEgaGFuZGxlciBpcyBhbHJlYWR5IGRlY2xhcmVkIGluIHRoZSBlbGVtZW50J3Mgb25jbGljayBhdHRyaWJ1dGUsIGl0IHdpbGwgYmUgZmlyZWQgYmVmb3JlXG5cdFx0Ly8gRmFzdENsaWNrJ3Mgb25DbGljayBoYW5kbGVyLiBGaXggdGhpcyBieSBwdWxsaW5nIG91dCB0aGUgdXNlci1kZWZpbmVkIGhhbmRsZXIgZnVuY3Rpb24gYW5kXG5cdFx0Ly8gYWRkaW5nIGl0IGFzIGxpc3RlbmVyLlxuXHRcdGlmICh0eXBlb2YgbGF5ZXIub25jbGljayA9PT0gJ2Z1bmN0aW9uJykge1xuXG5cdFx0XHQvLyBBbmRyb2lkIGJyb3dzZXIgb24gYXQgbGVhc3QgMy4yIHJlcXVpcmVzIGEgbmV3IHJlZmVyZW5jZSB0byB0aGUgZnVuY3Rpb24gaW4gbGF5ZXIub25jbGlja1xuXHRcdFx0Ly8gLSB0aGUgb2xkIG9uZSB3b24ndCB3b3JrIGlmIHBhc3NlZCB0byBhZGRFdmVudExpc3RlbmVyIGRpcmVjdGx5LlxuXHRcdFx0b2xkT25DbGljayA9IGxheWVyLm9uY2xpY2s7XG5cdFx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdG9sZE9uQ2xpY2soZXZlbnQpO1xuXHRcdFx0fSwgZmFsc2UpO1xuXHRcdFx0bGF5ZXIub25jbGljayA9IG51bGw7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCogV2luZG93cyBQaG9uZSA4LjEgZmFrZXMgdXNlciBhZ2VudCBzdHJpbmcgdG8gbG9vayBsaWtlIEFuZHJvaWQgYW5kIGlQaG9uZS5cblx0KlxuXHQqIEB0eXBlIGJvb2xlYW5cblx0Ki9cblx0dmFyIGRldmljZUlzV2luZG93c1Bob25lID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiV2luZG93cyBQaG9uZVwiKSA+PSAwO1xuXG5cdC8qKlxuXHQgKiBBbmRyb2lkIHJlcXVpcmVzIGV4Y2VwdGlvbnMuXG5cdCAqXG5cdCAqIEB0eXBlIGJvb2xlYW5cblx0ICovXG5cdHZhciBkZXZpY2VJc0FuZHJvaWQgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0FuZHJvaWQnKSA+IDAgJiYgIWRldmljZUlzV2luZG93c1Bob25lO1xuXG5cblx0LyoqXG5cdCAqIGlPUyByZXF1aXJlcyBleGNlcHRpb25zLlxuXHQgKlxuXHQgKiBAdHlwZSBib29sZWFuXG5cdCAqL1xuXHR2YXIgZGV2aWNlSXNJT1MgPSAvaVAoYWR8aG9uZXxvZCkvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgIWRldmljZUlzV2luZG93c1Bob25lO1xuXG5cblx0LyoqXG5cdCAqIGlPUyA0IHJlcXVpcmVzIGFuIGV4Y2VwdGlvbiBmb3Igc2VsZWN0IGVsZW1lbnRzLlxuXHQgKlxuXHQgKiBAdHlwZSBib29sZWFuXG5cdCAqL1xuXHR2YXIgZGV2aWNlSXNJT1M0ID0gZGV2aWNlSXNJT1MgJiYgKC9PUyA0X1xcZChfXFxkKT8vKS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG5cblx0LyoqXG5cdCAqIGlPUyA2LjAtNy4qIHJlcXVpcmVzIHRoZSB0YXJnZXQgZWxlbWVudCB0byBiZSBtYW51YWxseSBkZXJpdmVkXG5cdCAqXG5cdCAqIEB0eXBlIGJvb2xlYW5cblx0ICovXG5cdHZhciBkZXZpY2VJc0lPU1dpdGhCYWRUYXJnZXQgPSBkZXZpY2VJc0lPUyAmJiAoL09TIFs2LTddX1xcZC8pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cblx0LyoqXG5cdCAqIEJsYWNrQmVycnkgcmVxdWlyZXMgZXhjZXB0aW9ucy5cblx0ICpcblx0ICogQHR5cGUgYm9vbGVhblxuXHQgKi9cblx0dmFyIGRldmljZUlzQmxhY2tCZXJyeTEwID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdCQjEwJykgPiAwO1xuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmUgd2hldGhlciBhIGdpdmVuIGVsZW1lbnQgcmVxdWlyZXMgYSBuYXRpdmUgY2xpY2suXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnRUYXJnZXR8RWxlbWVudH0gdGFyZ2V0IFRhcmdldCBET00gZWxlbWVudFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW50IG5lZWRzIGEgbmF0aXZlIGNsaWNrXG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLm5lZWRzQ2xpY2sgPSBmdW5jdGlvbih0YXJnZXQpIHtcblx0XHRzd2l0Y2ggKHRhcmdldC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKSB7XG5cblx0XHQvLyBEb24ndCBzZW5kIGEgc3ludGhldGljIGNsaWNrIHRvIGRpc2FibGVkIGlucHV0cyAoaXNzdWUgIzYyKVxuXHRcdGNhc2UgJ2J1dHRvbic6XG5cdFx0Y2FzZSAnc2VsZWN0Jzpcblx0XHRjYXNlICd0ZXh0YXJlYSc6XG5cdFx0XHRpZiAodGFyZ2V0LmRpc2FibGVkKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRicmVhaztcblx0XHRjYXNlICdpbnB1dCc6XG5cblx0XHRcdC8vIEZpbGUgaW5wdXRzIG5lZWQgcmVhbCBjbGlja3Mgb24gaU9TIDYgZHVlIHRvIGEgYnJvd3NlciBidWcgKGlzc3VlICM2OClcblx0XHRcdGlmICgoZGV2aWNlSXNJT1MgJiYgdGFyZ2V0LnR5cGUgPT09ICdmaWxlJykgfHwgdGFyZ2V0LmRpc2FibGVkKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRicmVhaztcblx0XHRjYXNlICdsYWJlbCc6XG5cdFx0Y2FzZSAnaWZyYW1lJzogLy8gaU9TOCBob21lc2NyZWVuIGFwcHMgY2FuIHByZXZlbnQgZXZlbnRzIGJ1YmJsaW5nIGludG8gZnJhbWVzXG5cdFx0Y2FzZSAndmlkZW8nOlxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICgvXFxibmVlZHNjbGlja1xcYi8pLnRlc3QodGFyZ2V0LmNsYXNzTmFtZSk7XG5cdH07XG5cblxuXHQvKipcblx0ICogRGV0ZXJtaW5lIHdoZXRoZXIgYSBnaXZlbiBlbGVtZW50IHJlcXVpcmVzIGEgY2FsbCB0byBmb2N1cyB0byBzaW11bGF0ZSBjbGljayBpbnRvIGVsZW1lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnRUYXJnZXR8RWxlbWVudH0gdGFyZ2V0IFRhcmdldCBET00gZWxlbWVudFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW50IHJlcXVpcmVzIGEgY2FsbCB0byBmb2N1cyB0byBzaW11bGF0ZSBuYXRpdmUgY2xpY2suXG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLm5lZWRzRm9jdXMgPSBmdW5jdGlvbih0YXJnZXQpIHtcblx0XHRzd2l0Y2ggKHRhcmdldC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKSB7XG5cdFx0Y2FzZSAndGV4dGFyZWEnOlxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0Y2FzZSAnc2VsZWN0Jzpcblx0XHRcdHJldHVybiAhZGV2aWNlSXNBbmRyb2lkO1xuXHRcdGNhc2UgJ2lucHV0Jzpcblx0XHRcdHN3aXRjaCAodGFyZ2V0LnR5cGUpIHtcblx0XHRcdGNhc2UgJ2J1dHRvbic6XG5cdFx0XHRjYXNlICdjaGVja2JveCc6XG5cdFx0XHRjYXNlICdmaWxlJzpcblx0XHRcdGNhc2UgJ2ltYWdlJzpcblx0XHRcdGNhc2UgJ3JhZGlvJzpcblx0XHRcdGNhc2UgJ3N1Ym1pdCc6XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTm8gcG9pbnQgaW4gYXR0ZW1wdGluZyB0byBmb2N1cyBkaXNhYmxlZCBpbnB1dHNcblx0XHRcdHJldHVybiAhdGFyZ2V0LmRpc2FibGVkICYmICF0YXJnZXQucmVhZE9ubHk7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiAoL1xcYm5lZWRzZm9jdXNcXGIvKS50ZXN0KHRhcmdldC5jbGFzc05hbWUpO1xuXHRcdH1cblx0fTtcblxuXG5cdC8qKlxuXHQgKiBTZW5kIGEgY2xpY2sgZXZlbnQgdG8gdGhlIHNwZWNpZmllZCBlbGVtZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fEVsZW1lbnR9IHRhcmdldEVsZW1lbnRcblx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnRcblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUuc2VuZENsaWNrID0gZnVuY3Rpb24odGFyZ2V0RWxlbWVudCwgZXZlbnQpIHtcblx0XHR2YXIgY2xpY2tFdmVudCwgdG91Y2g7XG5cblx0XHQvLyBPbiBzb21lIEFuZHJvaWQgZGV2aWNlcyBhY3RpdmVFbGVtZW50IG5lZWRzIHRvIGJlIGJsdXJyZWQgb3RoZXJ3aXNlIHRoZSBzeW50aGV0aWMgY2xpY2sgd2lsbCBoYXZlIG5vIGVmZmVjdCAoIzI0KVxuXHRcdGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IHRhcmdldEVsZW1lbnQpIHtcblx0XHRcdGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpO1xuXHRcdH1cblxuXHRcdHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG5cblx0XHQvLyBTeW50aGVzaXNlIGEgY2xpY2sgZXZlbnQsIHdpdGggYW4gZXh0cmEgYXR0cmlidXRlIHNvIGl0IGNhbiBiZSB0cmFja2VkXG5cdFx0Y2xpY2tFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50cycpO1xuXHRcdGNsaWNrRXZlbnQuaW5pdE1vdXNlRXZlbnQodGhpcy5kZXRlcm1pbmVFdmVudFR5cGUodGFyZ2V0RWxlbWVudCksIHRydWUsIHRydWUsIHdpbmRvdywgMSwgdG91Y2guc2NyZWVuWCwgdG91Y2guc2NyZWVuWSwgdG91Y2guY2xpZW50WCwgdG91Y2guY2xpZW50WSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIDAsIG51bGwpO1xuXHRcdGNsaWNrRXZlbnQuZm9yd2FyZGVkVG91Y2hFdmVudCA9IHRydWU7XG5cdFx0dGFyZ2V0RWxlbWVudC5kaXNwYXRjaEV2ZW50KGNsaWNrRXZlbnQpO1xuXHR9O1xuXG5cdEZhc3RDbGljay5wcm90b3R5cGUuZGV0ZXJtaW5lRXZlbnRUeXBlID0gZnVuY3Rpb24odGFyZ2V0RWxlbWVudCkge1xuXG5cdFx0Ly9Jc3N1ZSAjMTU5OiBBbmRyb2lkIENocm9tZSBTZWxlY3QgQm94IGRvZXMgbm90IG9wZW4gd2l0aCBhIHN5bnRoZXRpYyBjbGljayBldmVudFxuXHRcdGlmIChkZXZpY2VJc0FuZHJvaWQgJiYgdGFyZ2V0RWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzZWxlY3QnKSB7XG5cdFx0XHRyZXR1cm4gJ21vdXNlZG93bic7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICdjbGljayc7XG5cdH07XG5cblxuXHQvKipcblx0ICogQHBhcmFtIHtFdmVudFRhcmdldHxFbGVtZW50fSB0YXJnZXRFbGVtZW50XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLmZvY3VzID0gZnVuY3Rpb24odGFyZ2V0RWxlbWVudCkge1xuXHRcdHZhciBsZW5ndGg7XG5cblx0XHQvLyBJc3N1ZSAjMTYwOiBvbiBpT1MgNywgc29tZSBpbnB1dCBlbGVtZW50cyAoZS5nLiBkYXRlIGRhdGV0aW1lIG1vbnRoKSB0aHJvdyBhIHZhZ3VlIFR5cGVFcnJvciBvbiBzZXRTZWxlY3Rpb25SYW5nZS4gVGhlc2UgZWxlbWVudHMgZG9uJ3QgaGF2ZSBhbiBpbnRlZ2VyIHZhbHVlIGZvciB0aGUgc2VsZWN0aW9uU3RhcnQgYW5kIHNlbGVjdGlvbkVuZCBwcm9wZXJ0aWVzLCBidXQgdW5mb3J0dW5hdGVseSB0aGF0IGNhbid0IGJlIHVzZWQgZm9yIGRldGVjdGlvbiBiZWNhdXNlIGFjY2Vzc2luZyB0aGUgcHJvcGVydGllcyBhbHNvIHRocm93cyBhIFR5cGVFcnJvci4gSnVzdCBjaGVjayB0aGUgdHlwZSBpbnN0ZWFkLiBGaWxlZCBhcyBBcHBsZSBidWcgIzE1MTIyNzI0LlxuXHRcdGlmIChkZXZpY2VJc0lPUyAmJiB0YXJnZXRFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlICYmIHRhcmdldEVsZW1lbnQudHlwZS5pbmRleE9mKCdkYXRlJykgIT09IDAgJiYgdGFyZ2V0RWxlbWVudC50eXBlICE9PSAndGltZScgJiYgdGFyZ2V0RWxlbWVudC50eXBlICE9PSAnbW9udGgnKSB7XG5cdFx0XHRsZW5ndGggPSB0YXJnZXRFbGVtZW50LnZhbHVlLmxlbmd0aDtcblx0XHRcdHRhcmdldEVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UobGVuZ3RoLCBsZW5ndGgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXRFbGVtZW50LmZvY3VzKCk7XG5cdFx0fVxuXHR9O1xuXG5cblx0LyoqXG5cdCAqIENoZWNrIHdoZXRoZXIgdGhlIGdpdmVuIHRhcmdldCBlbGVtZW50IGlzIGEgY2hpbGQgb2YgYSBzY3JvbGxhYmxlIGxheWVyIGFuZCBpZiBzbywgc2V0IGEgZmxhZyBvbiBpdC5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudFRhcmdldHxFbGVtZW50fSB0YXJnZXRFbGVtZW50XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLnVwZGF0ZVNjcm9sbFBhcmVudCA9IGZ1bmN0aW9uKHRhcmdldEVsZW1lbnQpIHtcblx0XHR2YXIgc2Nyb2xsUGFyZW50LCBwYXJlbnRFbGVtZW50O1xuXG5cdFx0c2Nyb2xsUGFyZW50ID0gdGFyZ2V0RWxlbWVudC5mYXN0Q2xpY2tTY3JvbGxQYXJlbnQ7XG5cblx0XHQvLyBBdHRlbXB0IHRvIGRpc2NvdmVyIHdoZXRoZXIgdGhlIHRhcmdldCBlbGVtZW50IGlzIGNvbnRhaW5lZCB3aXRoaW4gYSBzY3JvbGxhYmxlIGxheWVyLiBSZS1jaGVjayBpZiB0aGVcblx0XHQvLyB0YXJnZXQgZWxlbWVudCB3YXMgbW92ZWQgdG8gYW5vdGhlciBwYXJlbnQuXG5cdFx0aWYgKCFzY3JvbGxQYXJlbnQgfHwgIXNjcm9sbFBhcmVudC5jb250YWlucyh0YXJnZXRFbGVtZW50KSkge1xuXHRcdFx0cGFyZW50RWxlbWVudCA9IHRhcmdldEVsZW1lbnQ7XG5cdFx0XHRkbyB7XG5cdFx0XHRcdGlmIChwYXJlbnRFbGVtZW50LnNjcm9sbEhlaWdodCA+IHBhcmVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0KSB7XG5cdFx0XHRcdFx0c2Nyb2xsUGFyZW50ID0gcGFyZW50RWxlbWVudDtcblx0XHRcdFx0XHR0YXJnZXRFbGVtZW50LmZhc3RDbGlja1Njcm9sbFBhcmVudCA9IHBhcmVudEVsZW1lbnQ7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRwYXJlbnRFbGVtZW50ID0gcGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0fSB3aGlsZSAocGFyZW50RWxlbWVudCk7XG5cdFx0fVxuXG5cdFx0Ly8gQWx3YXlzIHVwZGF0ZSB0aGUgc2Nyb2xsIHRvcCB0cmFja2VyIGlmIHBvc3NpYmxlLlxuXHRcdGlmIChzY3JvbGxQYXJlbnQpIHtcblx0XHRcdHNjcm9sbFBhcmVudC5mYXN0Q2xpY2tMYXN0U2Nyb2xsVG9wID0gc2Nyb2xsUGFyZW50LnNjcm9sbFRvcDtcblx0XHR9XG5cdH07XG5cblxuXHQvKipcblx0ICogQHBhcmFtIHtFdmVudFRhcmdldH0gdGFyZ2V0RWxlbWVudFxuXHQgKiBAcmV0dXJucyB7RWxlbWVudHxFdmVudFRhcmdldH1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUuZ2V0VGFyZ2V0RWxlbWVudEZyb21FdmVudFRhcmdldCA9IGZ1bmN0aW9uKGV2ZW50VGFyZ2V0KSB7XG5cblx0XHQvLyBPbiBzb21lIG9sZGVyIGJyb3dzZXJzIChub3RhYmx5IFNhZmFyaSBvbiBpT1MgNC4xIC0gc2VlIGlzc3VlICM1NikgdGhlIGV2ZW50IHRhcmdldCBtYXkgYmUgYSB0ZXh0IG5vZGUuXG5cdFx0aWYgKGV2ZW50VGFyZ2V0Lm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkge1xuXHRcdFx0cmV0dXJuIGV2ZW50VGFyZ2V0LnBhcmVudE5vZGU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGV2ZW50VGFyZ2V0O1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIE9uIHRvdWNoIHN0YXJ0LCByZWNvcmQgdGhlIHBvc2l0aW9uIGFuZCBzY3JvbGwgb2Zmc2V0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUub25Ub3VjaFN0YXJ0ID0gZnVuY3Rpb24oZXZlbnQpIHtcblx0XHR2YXIgdGFyZ2V0RWxlbWVudCwgdG91Y2gsIHNlbGVjdGlvbjtcblxuXHRcdC8vIElnbm9yZSBtdWx0aXBsZSB0b3VjaGVzLCBvdGhlcndpc2UgcGluY2gtdG8tem9vbSBpcyBwcmV2ZW50ZWQgaWYgYm90aCBmaW5nZXJzIGFyZSBvbiB0aGUgRmFzdENsaWNrIGVsZW1lbnQgKGlzc3VlICMxMTEpLlxuXHRcdGlmIChldmVudC50YXJnZXRUb3VjaGVzLmxlbmd0aCA+IDEpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHRhcmdldEVsZW1lbnQgPSB0aGlzLmdldFRhcmdldEVsZW1lbnRGcm9tRXZlbnRUYXJnZXQoZXZlbnQudGFyZ2V0KTtcblx0XHR0b3VjaCA9IGV2ZW50LnRhcmdldFRvdWNoZXNbMF07XG5cblx0XHRpZiAoZGV2aWNlSXNJT1MpIHtcblxuXHRcdFx0Ly8gT25seSB0cnVzdGVkIGV2ZW50cyB3aWxsIGRlc2VsZWN0IHRleHQgb24gaU9TIChpc3N1ZSAjNDkpXG5cdFx0XHRzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cdFx0XHRpZiAoc2VsZWN0aW9uLnJhbmdlQ291bnQgJiYgIXNlbGVjdGlvbi5pc0NvbGxhcHNlZCkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFkZXZpY2VJc0lPUzQpIHtcblxuXHRcdFx0XHQvLyBXZWlyZCB0aGluZ3MgaGFwcGVuIG9uIGlPUyB3aGVuIGFuIGFsZXJ0IG9yIGNvbmZpcm0gZGlhbG9nIGlzIG9wZW5lZCBmcm9tIGEgY2xpY2sgZXZlbnQgY2FsbGJhY2sgKGlzc3VlICMyMyk6XG5cdFx0XHRcdC8vIHdoZW4gdGhlIHVzZXIgbmV4dCB0YXBzIGFueXdoZXJlIGVsc2Ugb24gdGhlIHBhZ2UsIG5ldyB0b3VjaHN0YXJ0IGFuZCB0b3VjaGVuZCBldmVudHMgYXJlIGRpc3BhdGNoZWRcblx0XHRcdFx0Ly8gd2l0aCB0aGUgc2FtZSBpZGVudGlmaWVyIGFzIHRoZSB0b3VjaCBldmVudCB0aGF0IHByZXZpb3VzbHkgdHJpZ2dlcmVkIHRoZSBjbGljayB0aGF0IHRyaWdnZXJlZCB0aGUgYWxlcnQuXG5cdFx0XHRcdC8vIFNhZGx5LCB0aGVyZSBpcyBhbiBpc3N1ZSBvbiBpT1MgNCB0aGF0IGNhdXNlcyBzb21lIG5vcm1hbCB0b3VjaCBldmVudHMgdG8gaGF2ZSB0aGUgc2FtZSBpZGVudGlmaWVyIGFzIGFuXG5cdFx0XHRcdC8vIGltbWVkaWF0ZWx5IHByZWNlZWRpbmcgdG91Y2ggZXZlbnQgKGlzc3VlICM1MiksIHNvIHRoaXMgZml4IGlzIHVuYXZhaWxhYmxlIG9uIHRoYXQgcGxhdGZvcm0uXG5cdFx0XHRcdC8vIElzc3VlIDEyMDogdG91Y2guaWRlbnRpZmllciBpcyAwIHdoZW4gQ2hyb21lIGRldiB0b29scyAnRW11bGF0ZSB0b3VjaCBldmVudHMnIGlzIHNldCB3aXRoIGFuIGlPUyBkZXZpY2UgVUEgc3RyaW5nLFxuXHRcdFx0XHQvLyB3aGljaCBjYXVzZXMgYWxsIHRvdWNoIGV2ZW50cyB0byBiZSBpZ25vcmVkLiBBcyB0aGlzIGJsb2NrIG9ubHkgYXBwbGllcyB0byBpT1MsIGFuZCBpT1MgaWRlbnRpZmllcnMgYXJlIGFsd2F5cyBsb25nLFxuXHRcdFx0XHQvLyByYW5kb20gaW50ZWdlcnMsIGl0J3Mgc2FmZSB0byB0byBjb250aW51ZSBpZiB0aGUgaWRlbnRpZmllciBpcyAwIGhlcmUuXG5cdFx0XHRcdGlmICh0b3VjaC5pZGVudGlmaWVyICYmIHRvdWNoLmlkZW50aWZpZXIgPT09IHRoaXMubGFzdFRvdWNoSWRlbnRpZmllcikge1xuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5sYXN0VG91Y2hJZGVudGlmaWVyID0gdG91Y2guaWRlbnRpZmllcjtcblxuXHRcdFx0XHQvLyBJZiB0aGUgdGFyZ2V0IGVsZW1lbnQgaXMgYSBjaGlsZCBvZiBhIHNjcm9sbGFibGUgbGF5ZXIgKHVzaW5nIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiB0b3VjaCkgYW5kOlxuXHRcdFx0XHQvLyAxKSB0aGUgdXNlciBkb2VzIGEgZmxpbmcgc2Nyb2xsIG9uIHRoZSBzY3JvbGxhYmxlIGxheWVyXG5cdFx0XHRcdC8vIDIpIHRoZSB1c2VyIHN0b3BzIHRoZSBmbGluZyBzY3JvbGwgd2l0aCBhbm90aGVyIHRhcFxuXHRcdFx0XHQvLyB0aGVuIHRoZSBldmVudC50YXJnZXQgb2YgdGhlIGxhc3QgJ3RvdWNoZW5kJyBldmVudCB3aWxsIGJlIHRoZSBlbGVtZW50IHRoYXQgd2FzIHVuZGVyIHRoZSB1c2VyJ3MgZmluZ2VyXG5cdFx0XHRcdC8vIHdoZW4gdGhlIGZsaW5nIHNjcm9sbCB3YXMgc3RhcnRlZCwgY2F1c2luZyBGYXN0Q2xpY2sgdG8gc2VuZCBhIGNsaWNrIGV2ZW50IHRvIHRoYXQgbGF5ZXIgLSB1bmxlc3MgYSBjaGVja1xuXHRcdFx0XHQvLyBpcyBtYWRlIHRvIGVuc3VyZSB0aGF0IGEgcGFyZW50IGxheWVyIHdhcyBub3Qgc2Nyb2xsZWQgYmVmb3JlIHNlbmRpbmcgYSBzeW50aGV0aWMgY2xpY2sgKGlzc3VlICM0MikuXG5cdFx0XHRcdHRoaXMudXBkYXRlU2Nyb2xsUGFyZW50KHRhcmdldEVsZW1lbnQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMudHJhY2tpbmdDbGljayA9IHRydWU7XG5cdFx0dGhpcy50cmFja2luZ0NsaWNrU3RhcnQgPSBldmVudC50aW1lU3RhbXA7XG5cdFx0dGhpcy50YXJnZXRFbGVtZW50ID0gdGFyZ2V0RWxlbWVudDtcblxuXHRcdHRoaXMudG91Y2hTdGFydFggPSB0b3VjaC5wYWdlWDtcblx0XHR0aGlzLnRvdWNoU3RhcnRZID0gdG91Y2gucGFnZVk7XG5cblx0XHQvLyBQcmV2ZW50IHBoYW50b20gY2xpY2tzIG9uIGZhc3QgZG91YmxlLXRhcCAoaXNzdWUgIzM2KVxuXHRcdGlmICgoZXZlbnQudGltZVN0YW1wIC0gdGhpcy5sYXN0Q2xpY2tUaW1lKSA8IHRoaXMudGFwRGVsYXkpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG5cblxuXHQvKipcblx0ICogQmFzZWQgb24gYSB0b3VjaG1vdmUgZXZlbnQgb2JqZWN0LCBjaGVjayB3aGV0aGVyIHRoZSB0b3VjaCBoYXMgbW92ZWQgcGFzdCBhIGJvdW5kYXJ5IHNpbmNlIGl0IHN0YXJ0ZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS50b3VjaEhhc01vdmVkID0gZnVuY3Rpb24oZXZlbnQpIHtcblx0XHR2YXIgdG91Y2ggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXSwgYm91bmRhcnkgPSB0aGlzLnRvdWNoQm91bmRhcnk7XG5cblx0XHRpZiAoTWF0aC5hYnModG91Y2gucGFnZVggLSB0aGlzLnRvdWNoU3RhcnRYKSA+IGJvdW5kYXJ5IHx8IE1hdGguYWJzKHRvdWNoLnBhZ2VZIC0gdGhpcy50b3VjaFN0YXJ0WSkgPiBib3VuZGFyeSkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIFVwZGF0ZSB0aGUgbGFzdCBwb3NpdGlvbi5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnRcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLm9uVG91Y2hNb3ZlID0gZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRpZiAoIXRoaXMudHJhY2tpbmdDbGljaykge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgdGhlIHRvdWNoIGhhcyBtb3ZlZCwgY2FuY2VsIHRoZSBjbGljayB0cmFja2luZ1xuXHRcdGlmICh0aGlzLnRhcmdldEVsZW1lbnQgIT09IHRoaXMuZ2V0VGFyZ2V0RWxlbWVudEZyb21FdmVudFRhcmdldChldmVudC50YXJnZXQpIHx8IHRoaXMudG91Y2hIYXNNb3ZlZChldmVudCkpIHtcblx0XHRcdHRoaXMudHJhY2tpbmdDbGljayA9IGZhbHNlO1xuXHRcdFx0dGhpcy50YXJnZXRFbGVtZW50ID0gbnVsbDtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBBdHRlbXB0IHRvIGZpbmQgdGhlIGxhYmVsbGVkIGNvbnRyb2wgZm9yIHRoZSBnaXZlbiBsYWJlbCBlbGVtZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fEhUTUxMYWJlbEVsZW1lbnR9IGxhYmVsRWxlbWVudFxuXHQgKiBAcmV0dXJucyB7RWxlbWVudHxudWxsfVxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5maW5kQ29udHJvbCA9IGZ1bmN0aW9uKGxhYmVsRWxlbWVudCkge1xuXG5cdFx0Ly8gRmFzdCBwYXRoIGZvciBuZXdlciBicm93c2VycyBzdXBwb3J0aW5nIHRoZSBIVE1MNSBjb250cm9sIGF0dHJpYnV0ZVxuXHRcdGlmIChsYWJlbEVsZW1lbnQuY29udHJvbCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gbGFiZWxFbGVtZW50LmNvbnRyb2w7XG5cdFx0fVxuXG5cdFx0Ly8gQWxsIGJyb3dzZXJzIHVuZGVyIHRlc3QgdGhhdCBzdXBwb3J0IHRvdWNoIGV2ZW50cyBhbHNvIHN1cHBvcnQgdGhlIEhUTUw1IGh0bWxGb3IgYXR0cmlidXRlXG5cdFx0aWYgKGxhYmVsRWxlbWVudC5odG1sRm9yKSB7XG5cdFx0XHRyZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobGFiZWxFbGVtZW50Lmh0bWxGb3IpO1xuXHRcdH1cblxuXHRcdC8vIElmIG5vIGZvciBhdHRyaWJ1dGUgZXhpc3RzLCBhdHRlbXB0IHRvIHJldHJpZXZlIHRoZSBmaXJzdCBsYWJlbGxhYmxlIGRlc2NlbmRhbnQgZWxlbWVudFxuXHRcdC8vIHRoZSBsaXN0IG9mIHdoaWNoIGlzIGRlZmluZWQgaGVyZTogaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDUvZm9ybXMuaHRtbCNjYXRlZ29yeS1sYWJlbFxuXHRcdHJldHVybiBsYWJlbEVsZW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLCBpbnB1dDpub3QoW3R5cGU9aGlkZGVuXSksIGtleWdlbiwgbWV0ZXIsIG91dHB1dCwgcHJvZ3Jlc3MsIHNlbGVjdCwgdGV4dGFyZWEnKTtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBPbiB0b3VjaCBlbmQsIGRldGVybWluZSB3aGV0aGVyIHRvIHNlbmQgYSBjbGljayBldmVudCBhdCBvbmNlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUub25Ub3VjaEVuZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0dmFyIGZvckVsZW1lbnQsIHRyYWNraW5nQ2xpY2tTdGFydCwgdGFyZ2V0VGFnTmFtZSwgc2Nyb2xsUGFyZW50LCB0b3VjaCwgdGFyZ2V0RWxlbWVudCA9IHRoaXMudGFyZ2V0RWxlbWVudDtcblxuXHRcdGlmICghdGhpcy50cmFja2luZ0NsaWNrKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvLyBQcmV2ZW50IHBoYW50b20gY2xpY2tzIG9uIGZhc3QgZG91YmxlLXRhcCAoaXNzdWUgIzM2KVxuXHRcdGlmICgoZXZlbnQudGltZVN0YW1wIC0gdGhpcy5sYXN0Q2xpY2tUaW1lKSA8IHRoaXMudGFwRGVsYXkpIHtcblx0XHRcdHRoaXMuY2FuY2VsTmV4dENsaWNrID0gdHJ1ZTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGlmICgoZXZlbnQudGltZVN0YW1wIC0gdGhpcy50cmFja2luZ0NsaWNrU3RhcnQpID4gdGhpcy50YXBUaW1lb3V0KSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvLyBSZXNldCB0byBwcmV2ZW50IHdyb25nIGNsaWNrIGNhbmNlbCBvbiBpbnB1dCAoaXNzdWUgIzE1NikuXG5cdFx0dGhpcy5jYW5jZWxOZXh0Q2xpY2sgPSBmYWxzZTtcblxuXHRcdHRoaXMubGFzdENsaWNrVGltZSA9IGV2ZW50LnRpbWVTdGFtcDtcblxuXHRcdHRyYWNraW5nQ2xpY2tTdGFydCA9IHRoaXMudHJhY2tpbmdDbGlja1N0YXJ0O1xuXHRcdHRoaXMudHJhY2tpbmdDbGljayA9IGZhbHNlO1xuXHRcdHRoaXMudHJhY2tpbmdDbGlja1N0YXJ0ID0gMDtcblxuXHRcdC8vIE9uIHNvbWUgaU9TIGRldmljZXMsIHRoZSB0YXJnZXRFbGVtZW50IHN1cHBsaWVkIHdpdGggdGhlIGV2ZW50IGlzIGludmFsaWQgaWYgdGhlIGxheWVyXG5cdFx0Ly8gaXMgcGVyZm9ybWluZyBhIHRyYW5zaXRpb24gb3Igc2Nyb2xsLCBhbmQgaGFzIHRvIGJlIHJlLWRldGVjdGVkIG1hbnVhbGx5LiBOb3RlIHRoYXRcblx0XHQvLyBmb3IgdGhpcyB0byBmdW5jdGlvbiBjb3JyZWN0bHksIGl0IG11c3QgYmUgY2FsbGVkICphZnRlciogdGhlIGV2ZW50IHRhcmdldCBpcyBjaGVja2VkIVxuXHRcdC8vIFNlZSBpc3N1ZSAjNTc7IGFsc28gZmlsZWQgYXMgcmRhcjovLzEzMDQ4NTg5IC5cblx0XHRpZiAoZGV2aWNlSXNJT1NXaXRoQmFkVGFyZ2V0KSB7XG5cdFx0XHR0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuXG5cdFx0XHQvLyBJbiBjZXJ0YWluIGNhc2VzIGFyZ3VtZW50cyBvZiBlbGVtZW50RnJvbVBvaW50IGNhbiBiZSBuZWdhdGl2ZSwgc28gcHJldmVudCBzZXR0aW5nIHRhcmdldEVsZW1lbnQgdG8gbnVsbFxuXHRcdFx0dGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQodG91Y2gucGFnZVggLSB3aW5kb3cucGFnZVhPZmZzZXQsIHRvdWNoLnBhZ2VZIC0gd2luZG93LnBhZ2VZT2Zmc2V0KSB8fCB0YXJnZXRFbGVtZW50O1xuXHRcdFx0dGFyZ2V0RWxlbWVudC5mYXN0Q2xpY2tTY3JvbGxQYXJlbnQgPSB0aGlzLnRhcmdldEVsZW1lbnQuZmFzdENsaWNrU2Nyb2xsUGFyZW50O1xuXHRcdH1cblxuXHRcdHRhcmdldFRhZ05hbWUgPSB0YXJnZXRFbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRpZiAodGFyZ2V0VGFnTmFtZSA9PT0gJ2xhYmVsJykge1xuXHRcdFx0Zm9yRWxlbWVudCA9IHRoaXMuZmluZENvbnRyb2wodGFyZ2V0RWxlbWVudCk7XG5cdFx0XHRpZiAoZm9yRWxlbWVudCkge1xuXHRcdFx0XHR0aGlzLmZvY3VzKHRhcmdldEVsZW1lbnQpO1xuXHRcdFx0XHRpZiAoZGV2aWNlSXNBbmRyb2lkKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGFyZ2V0RWxlbWVudCA9IGZvckVsZW1lbnQ7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICh0aGlzLm5lZWRzRm9jdXModGFyZ2V0RWxlbWVudCkpIHtcblxuXHRcdFx0Ly8gQ2FzZSAxOiBJZiB0aGUgdG91Y2ggc3RhcnRlZCBhIHdoaWxlIGFnbyAoYmVzdCBndWVzcyBpcyAxMDBtcyBiYXNlZCBvbiB0ZXN0cyBmb3IgaXNzdWUgIzM2KSB0aGVuIGZvY3VzIHdpbGwgYmUgdHJpZ2dlcmVkIGFueXdheS4gUmV0dXJuIGVhcmx5IGFuZCB1bnNldCB0aGUgdGFyZ2V0IGVsZW1lbnQgcmVmZXJlbmNlIHNvIHRoYXQgdGhlIHN1YnNlcXVlbnQgY2xpY2sgd2lsbCBiZSBhbGxvd2VkIHRocm91Z2guXG5cdFx0XHQvLyBDYXNlIDI6IFdpdGhvdXQgdGhpcyBleGNlcHRpb24gZm9yIGlucHV0IGVsZW1lbnRzIHRhcHBlZCB3aGVuIHRoZSBkb2N1bWVudCBpcyBjb250YWluZWQgaW4gYW4gaWZyYW1lLCB0aGVuIGFueSBpbnB1dHRlZCB0ZXh0IHdvbid0IGJlIHZpc2libGUgZXZlbiB0aG91Z2ggdGhlIHZhbHVlIGF0dHJpYnV0ZSBpcyB1cGRhdGVkIGFzIHRoZSB1c2VyIHR5cGVzIChpc3N1ZSAjMzcpLlxuXHRcdFx0aWYgKChldmVudC50aW1lU3RhbXAgLSB0cmFja2luZ0NsaWNrU3RhcnQpID4gMTAwIHx8IChkZXZpY2VJc0lPUyAmJiB3aW5kb3cudG9wICE9PSB3aW5kb3cgJiYgdGFyZ2V0VGFnTmFtZSA9PT0gJ2lucHV0JykpIHtcblx0XHRcdFx0dGhpcy50YXJnZXRFbGVtZW50ID0gbnVsbDtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmZvY3VzKHRhcmdldEVsZW1lbnQpO1xuXHRcdFx0dGhpcy5zZW5kQ2xpY2sodGFyZ2V0RWxlbWVudCwgZXZlbnQpO1xuXG5cdFx0XHQvLyBTZWxlY3QgZWxlbWVudHMgbmVlZCB0aGUgZXZlbnQgdG8gZ28gdGhyb3VnaCBvbiBpT1MgNCwgb3RoZXJ3aXNlIHRoZSBzZWxlY3RvciBtZW51IHdvbid0IG9wZW4uXG5cdFx0XHQvLyBBbHNvIHRoaXMgYnJlYWtzIG9wZW5pbmcgc2VsZWN0cyB3aGVuIFZvaWNlT3ZlciBpcyBhY3RpdmUgb24gaU9TNiwgaU9TNyAoYW5kIHBvc3NpYmx5IG90aGVycylcblx0XHRcdGlmICghZGV2aWNlSXNJT1MgfHwgdGFyZ2V0VGFnTmFtZSAhPT0gJ3NlbGVjdCcpIHtcblx0XHRcdFx0dGhpcy50YXJnZXRFbGVtZW50ID0gbnVsbDtcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdGlmIChkZXZpY2VJc0lPUyAmJiAhZGV2aWNlSXNJT1M0KSB7XG5cblx0XHRcdC8vIERvbid0IHNlbmQgYSBzeW50aGV0aWMgY2xpY2sgZXZlbnQgaWYgdGhlIHRhcmdldCBlbGVtZW50IGlzIGNvbnRhaW5lZCB3aXRoaW4gYSBwYXJlbnQgbGF5ZXIgdGhhdCB3YXMgc2Nyb2xsZWRcblx0XHRcdC8vIGFuZCB0aGlzIHRhcCBpcyBiZWluZyB1c2VkIHRvIHN0b3AgdGhlIHNjcm9sbGluZyAodXN1YWxseSBpbml0aWF0ZWQgYnkgYSBmbGluZyAtIGlzc3VlICM0MikuXG5cdFx0XHRzY3JvbGxQYXJlbnQgPSB0YXJnZXRFbGVtZW50LmZhc3RDbGlja1Njcm9sbFBhcmVudDtcblx0XHRcdGlmIChzY3JvbGxQYXJlbnQgJiYgc2Nyb2xsUGFyZW50LmZhc3RDbGlja0xhc3RTY3JvbGxUb3AgIT09IHNjcm9sbFBhcmVudC5zY3JvbGxUb3ApIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gUHJldmVudCB0aGUgYWN0dWFsIGNsaWNrIGZyb20gZ29pbmcgdGhvdWdoIC0gdW5sZXNzIHRoZSB0YXJnZXQgbm9kZSBpcyBtYXJrZWQgYXMgcmVxdWlyaW5nXG5cdFx0Ly8gcmVhbCBjbGlja3Mgb3IgaWYgaXQgaXMgaW4gdGhlIHdoaXRlbGlzdCBpbiB3aGljaCBjYXNlIG9ubHkgbm9uLXByb2dyYW1tYXRpYyBjbGlja3MgYXJlIHBlcm1pdHRlZC5cblx0XHRpZiAoIXRoaXMubmVlZHNDbGljayh0YXJnZXRFbGVtZW50KSkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRoaXMuc2VuZENsaWNrKHRhcmdldEVsZW1lbnQsIGV2ZW50KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG5cblxuXHQvKipcblx0ICogT24gdG91Y2ggY2FuY2VsLCBzdG9wIHRyYWNraW5nIHRoZSBjbGljay5cblx0ICpcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLm9uVG91Y2hDYW5jZWwgPSBmdW5jdGlvbigpIHtcblx0XHR0aGlzLnRyYWNraW5nQ2xpY2sgPSBmYWxzZTtcblx0XHR0aGlzLnRhcmdldEVsZW1lbnQgPSBudWxsO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIERldGVybWluZSBtb3VzZSBldmVudHMgd2hpY2ggc2hvdWxkIGJlIHBlcm1pdHRlZC5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnRcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLm9uTW91c2UgPSBmdW5jdGlvbihldmVudCkge1xuXG5cdFx0Ly8gSWYgYSB0YXJnZXQgZWxlbWVudCB3YXMgbmV2ZXIgc2V0IChiZWNhdXNlIGEgdG91Y2ggZXZlbnQgd2FzIG5ldmVyIGZpcmVkKSBhbGxvdyB0aGUgZXZlbnRcblx0XHRpZiAoIXRoaXMudGFyZ2V0RWxlbWVudCkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKGV2ZW50LmZvcndhcmRlZFRvdWNoRXZlbnQpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIFByb2dyYW1tYXRpY2FsbHkgZ2VuZXJhdGVkIGV2ZW50cyB0YXJnZXRpbmcgYSBzcGVjaWZpYyBlbGVtZW50IHNob3VsZCBiZSBwZXJtaXR0ZWRcblx0XHRpZiAoIWV2ZW50LmNhbmNlbGFibGUpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIERlcml2ZSBhbmQgY2hlY2sgdGhlIHRhcmdldCBlbGVtZW50IHRvIHNlZSB3aGV0aGVyIHRoZSBtb3VzZSBldmVudCBuZWVkcyB0byBiZSBwZXJtaXR0ZWQ7XG5cdFx0Ly8gdW5sZXNzIGV4cGxpY2l0bHkgZW5hYmxlZCwgcHJldmVudCBub24tdG91Y2ggY2xpY2sgZXZlbnRzIGZyb20gdHJpZ2dlcmluZyBhY3Rpb25zLFxuXHRcdC8vIHRvIHByZXZlbnQgZ2hvc3QvZG91YmxlY2xpY2tzLlxuXHRcdGlmICghdGhpcy5uZWVkc0NsaWNrKHRoaXMudGFyZ2V0RWxlbWVudCkgfHwgdGhpcy5jYW5jZWxOZXh0Q2xpY2spIHtcblxuXHRcdFx0Ly8gUHJldmVudCBhbnkgdXNlci1hZGRlZCBsaXN0ZW5lcnMgZGVjbGFyZWQgb24gRmFzdENsaWNrIGVsZW1lbnQgZnJvbSBiZWluZyBmaXJlZC5cblx0XHRcdGlmIChldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24pIHtcblx0XHRcdFx0ZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdC8vIFBhcnQgb2YgdGhlIGhhY2sgZm9yIGJyb3dzZXJzIHRoYXQgZG9uJ3Qgc3VwcG9ydCBFdmVudCNzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24gKGUuZy4gQW5kcm9pZCAyKVxuXHRcdFx0XHRldmVudC5wcm9wYWdhdGlvblN0b3BwZWQgPSB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDYW5jZWwgdGhlIGV2ZW50XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBJZiB0aGUgbW91c2UgZXZlbnQgaXMgcGVybWl0dGVkLCByZXR1cm4gdHJ1ZSBmb3IgdGhlIGFjdGlvbiB0byBnbyB0aHJvdWdoLlxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIE9uIGFjdHVhbCBjbGlja3MsIGRldGVybWluZSB3aGV0aGVyIHRoaXMgaXMgYSB0b3VjaC1nZW5lcmF0ZWQgY2xpY2ssIGEgY2xpY2sgYWN0aW9uIG9jY3VycmluZ1xuXHQgKiBuYXR1cmFsbHkgYWZ0ZXIgYSBkZWxheSBhZnRlciBhIHRvdWNoICh3aGljaCBuZWVkcyB0byBiZSBjYW5jZWxsZWQgdG8gYXZvaWQgZHVwbGljYXRpb24pLCBvclxuXHQgKiBhbiBhY3R1YWwgY2xpY2sgd2hpY2ggc2hvdWxkIGJlIHBlcm1pdHRlZC5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnRcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLm9uQ2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xuXHRcdHZhciBwZXJtaXR0ZWQ7XG5cblx0XHQvLyBJdCdzIHBvc3NpYmxlIGZvciBhbm90aGVyIEZhc3RDbGljay1saWtlIGxpYnJhcnkgZGVsaXZlcmVkIHdpdGggdGhpcmQtcGFydHkgY29kZSB0byBmaXJlIGEgY2xpY2sgZXZlbnQgYmVmb3JlIEZhc3RDbGljayBkb2VzIChpc3N1ZSAjNDQpLiBJbiB0aGF0IGNhc2UsIHNldCB0aGUgY2xpY2stdHJhY2tpbmcgZmxhZyBiYWNrIHRvIGZhbHNlIGFuZCByZXR1cm4gZWFybHkuIFRoaXMgd2lsbCBjYXVzZSBvblRvdWNoRW5kIHRvIHJldHVybiBlYXJseS5cblx0XHRpZiAodGhpcy50cmFja2luZ0NsaWNrKSB7XG5cdFx0XHR0aGlzLnRhcmdldEVsZW1lbnQgPSBudWxsO1xuXHRcdFx0dGhpcy50cmFja2luZ0NsaWNrID0gZmFsc2U7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvLyBWZXJ5IG9kZCBiZWhhdmlvdXIgb24gaU9TIChpc3N1ZSAjMTgpOiBpZiBhIHN1Ym1pdCBlbGVtZW50IGlzIHByZXNlbnQgaW5zaWRlIGEgZm9ybSBhbmQgdGhlIHVzZXIgaGl0cyBlbnRlciBpbiB0aGUgaU9TIHNpbXVsYXRvciBvciBjbGlja3MgdGhlIEdvIGJ1dHRvbiBvbiB0aGUgcG9wLXVwIE9TIGtleWJvYXJkIHRoZSBhIGtpbmQgb2YgJ2Zha2UnIGNsaWNrIGV2ZW50IHdpbGwgYmUgdHJpZ2dlcmVkIHdpdGggdGhlIHN1Ym1pdC10eXBlIGlucHV0IGVsZW1lbnQgYXMgdGhlIHRhcmdldC5cblx0XHRpZiAoZXZlbnQudGFyZ2V0LnR5cGUgPT09ICdzdWJtaXQnICYmIGV2ZW50LmRldGFpbCA9PT0gMCkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0cGVybWl0dGVkID0gdGhpcy5vbk1vdXNlKGV2ZW50KTtcblxuXHRcdC8vIE9ubHkgdW5zZXQgdGFyZ2V0RWxlbWVudCBpZiB0aGUgY2xpY2sgaXMgbm90IHBlcm1pdHRlZC4gVGhpcyB3aWxsIGVuc3VyZSB0aGF0IHRoZSBjaGVjayBmb3IgIXRhcmdldEVsZW1lbnQgaW4gb25Nb3VzZSBmYWlscyBhbmQgdGhlIGJyb3dzZXIncyBjbGljayBkb2Vzbid0IGdvIHRocm91Z2guXG5cdFx0aWYgKCFwZXJtaXR0ZWQpIHtcblx0XHRcdHRoaXMudGFyZ2V0RWxlbWVudCA9IG51bGw7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgY2xpY2tzIGFyZSBwZXJtaXR0ZWQsIHJldHVybiB0cnVlIGZvciB0aGUgYWN0aW9uIHRvIGdvIHRocm91Z2guXG5cdFx0cmV0dXJuIHBlcm1pdHRlZDtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBSZW1vdmUgYWxsIEZhc3RDbGljaydzIGV2ZW50IGxpc3RlbmVycy5cblx0ICpcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgbGF5ZXIgPSB0aGlzLmxheWVyO1xuXG5cdFx0aWYgKGRldmljZUlzQW5kcm9pZCkge1xuXHRcdFx0bGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgdGhpcy5vbk1vdXNlLCB0cnVlKTtcblx0XHRcdGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZSwgdHJ1ZSk7XG5cdFx0XHRsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5vbk1vdXNlLCB0cnVlKTtcblx0XHR9XG5cblx0XHRsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25DbGljaywgdHJ1ZSk7XG5cdFx0bGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMub25Ub3VjaFN0YXJ0LCBmYWxzZSk7XG5cdFx0bGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5vblRvdWNoTW92ZSwgZmFsc2UpO1xuXHRcdGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5vblRvdWNoRW5kLCBmYWxzZSk7XG5cdFx0bGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0aGlzLm9uVG91Y2hDYW5jZWwsIGZhbHNlKTtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBDaGVjayB3aGV0aGVyIEZhc3RDbGljayBpcyBuZWVkZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gbGF5ZXIgVGhlIGxheWVyIHRvIGxpc3RlbiBvblxuXHQgKi9cblx0RmFzdENsaWNrLm5vdE5lZWRlZCA9IGZ1bmN0aW9uKGxheWVyKSB7XG5cdFx0dmFyIG1ldGFWaWV3cG9ydDtcblx0XHR2YXIgY2hyb21lVmVyc2lvbjtcblx0XHR2YXIgYmxhY2tiZXJyeVZlcnNpb247XG5cdFx0dmFyIGZpcmVmb3hWZXJzaW9uO1xuXG5cdFx0Ly8gRGV2aWNlcyB0aGF0IGRvbid0IHN1cHBvcnQgdG91Y2ggZG9uJ3QgbmVlZCBGYXN0Q2xpY2tcblx0XHRpZiAodHlwZW9mIHdpbmRvdy5vbnRvdWNoc3RhcnQgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvLyBDaHJvbWUgdmVyc2lvbiAtIHplcm8gZm9yIG90aGVyIGJyb3dzZXJzXG5cdFx0Y2hyb21lVmVyc2lvbiA9ICsoL0Nocm9tZVxcLyhbMC05XSspLy5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQpIHx8IFssMF0pWzFdO1xuXG5cdFx0aWYgKGNocm9tZVZlcnNpb24pIHtcblxuXHRcdFx0aWYgKGRldmljZUlzQW5kcm9pZCkge1xuXHRcdFx0XHRtZXRhVmlld3BvcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9dmlld3BvcnRdJyk7XG5cblx0XHRcdFx0aWYgKG1ldGFWaWV3cG9ydCkge1xuXHRcdFx0XHRcdC8vIENocm9tZSBvbiBBbmRyb2lkIHdpdGggdXNlci1zY2FsYWJsZT1cIm5vXCIgZG9lc24ndCBuZWVkIEZhc3RDbGljayAoaXNzdWUgIzg5KVxuXHRcdFx0XHRcdGlmIChtZXRhVmlld3BvcnQuY29udGVudC5pbmRleE9mKCd1c2VyLXNjYWxhYmxlPW5vJykgIT09IC0xKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gQ2hyb21lIDMyIGFuZCBhYm92ZSB3aXRoIHdpZHRoPWRldmljZS13aWR0aCBvciBsZXNzIGRvbid0IG5lZWQgRmFzdENsaWNrXG5cdFx0XHRcdFx0aWYgKGNocm9tZVZlcnNpb24gPiAzMSAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsV2lkdGggPD0gd2luZG93Lm91dGVyV2lkdGgpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHQvLyBDaHJvbWUgZGVza3RvcCBkb2Vzbid0IG5lZWQgRmFzdENsaWNrIChpc3N1ZSAjMTUpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZGV2aWNlSXNCbGFja0JlcnJ5MTApIHtcblx0XHRcdGJsYWNrYmVycnlWZXJzaW9uID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvVmVyc2lvblxcLyhbMC05XSopXFwuKFswLTldKikvKTtcblxuXHRcdFx0Ly8gQmxhY2tCZXJyeSAxMC4zKyBkb2VzIG5vdCByZXF1aXJlIEZhc3RjbGljayBsaWJyYXJ5LlxuXHRcdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2Z0bGFicy9mYXN0Y2xpY2svaXNzdWVzLzI1MVxuXHRcdFx0aWYgKGJsYWNrYmVycnlWZXJzaW9uWzFdID49IDEwICYmIGJsYWNrYmVycnlWZXJzaW9uWzJdID49IDMpIHtcblx0XHRcdFx0bWV0YVZpZXdwb3J0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPXZpZXdwb3J0XScpO1xuXG5cdFx0XHRcdGlmIChtZXRhVmlld3BvcnQpIHtcblx0XHRcdFx0XHQvLyB1c2VyLXNjYWxhYmxlPW5vIGVsaW1pbmF0ZXMgY2xpY2sgZGVsYXkuXG5cdFx0XHRcdFx0aWYgKG1ldGFWaWV3cG9ydC5jb250ZW50LmluZGV4T2YoJ3VzZXItc2NhbGFibGU9bm8nKSAhPT0gLTEpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyB3aWR0aD1kZXZpY2Utd2lkdGggKG9yIGxlc3MgdGhhbiBkZXZpY2Utd2lkdGgpIGVsaW1pbmF0ZXMgY2xpY2sgZGVsYXkuXG5cdFx0XHRcdFx0aWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxXaWR0aCA8PSB3aW5kb3cub3V0ZXJXaWR0aCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gSUUxMCB3aXRoIC1tcy10b3VjaC1hY3Rpb246IG5vbmUgb3IgbWFuaXB1bGF0aW9uLCB3aGljaCBkaXNhYmxlcyBkb3VibGUtdGFwLXRvLXpvb20gKGlzc3VlICM5Nylcblx0XHRpZiAobGF5ZXIuc3R5bGUubXNUb3VjaEFjdGlvbiA9PT0gJ25vbmUnIHx8IGxheWVyLnN0eWxlLnRvdWNoQWN0aW9uID09PSAnbWFuaXB1bGF0aW9uJykge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Ly8gRmlyZWZveCB2ZXJzaW9uIC0gemVybyBmb3Igb3RoZXIgYnJvd3NlcnNcblx0XHRmaXJlZm94VmVyc2lvbiA9ICsoL0ZpcmVmb3hcXC8oWzAtOV0rKS8uZXhlYyhuYXZpZ2F0b3IudXNlckFnZW50KSB8fCBbLDBdKVsxXTtcblxuXHRcdGlmIChmaXJlZm94VmVyc2lvbiA+PSAyNykge1xuXHRcdFx0Ly8gRmlyZWZveCAyNysgZG9lcyBub3QgaGF2ZSB0YXAgZGVsYXkgaWYgdGhlIGNvbnRlbnQgaXMgbm90IHpvb21hYmxlIC0gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9OTIyODk2XG5cblx0XHRcdG1ldGFWaWV3cG9ydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT12aWV3cG9ydF0nKTtcblx0XHRcdGlmIChtZXRhVmlld3BvcnQgJiYgKG1ldGFWaWV3cG9ydC5jb250ZW50LmluZGV4T2YoJ3VzZXItc2NhbGFibGU9bm8nKSAhPT0gLTEgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFdpZHRoIDw9IHdpbmRvdy5vdXRlcldpZHRoKSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBJRTExOiBwcmVmaXhlZCAtbXMtdG91Y2gtYWN0aW9uIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQgYW5kIGl0J3MgcmVjb21lbmRlZCB0byB1c2Ugbm9uLXByZWZpeGVkIHZlcnNpb25cblx0XHQvLyBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvd2luZG93cy9hcHBzL0hoNzY3MzEzLmFzcHhcblx0XHRpZiAobGF5ZXIuc3R5bGUudG91Y2hBY3Rpb24gPT09ICdub25lJyB8fCBsYXllci5zdHlsZS50b3VjaEFjdGlvbiA9PT0gJ21hbmlwdWxhdGlvbicpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBGYWN0b3J5IG1ldGhvZCBmb3IgY3JlYXRpbmcgYSBGYXN0Q2xpY2sgb2JqZWN0XG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gbGF5ZXIgVGhlIGxheWVyIHRvIGxpc3RlbiBvblxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0c1xuXHQgKi9cblx0RmFzdENsaWNrLmF0dGFjaCA9IGZ1bmN0aW9uKGxheWVyLCBvcHRpb25zKSB7XG5cdFx0cmV0dXJuIG5ldyBGYXN0Q2xpY2sobGF5ZXIsIG9wdGlvbnMpO1xuXHR9O1xuXG5cblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblxuXHRcdC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cblx0XHRkZWZpbmUoZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gRmFzdENsaWNrO1xuXHRcdH0pO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBGYXN0Q2xpY2suYXR0YWNoO1xuXHRcdG1vZHVsZS5leHBvcnRzLkZhc3RDbGljayA9IEZhc3RDbGljaztcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuRmFzdENsaWNrID0gRmFzdENsaWNrO1xuXHR9XG59KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZmFzdGNsaWNrL2xpYi9mYXN0Y2xpY2suanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxNyBNYXJ0aW4gRG9uYXRoIDxtYXJ0aW4uZG9uYXRoQHNxdWlkZnVuay5jb20+XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG9cbiAqIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlXG4gKiByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3JcbiAqIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04tSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HXG4gKiBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTXG4gKiBJTiBUSEUgU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IEV2ZW50IGZyb20gXCIuL01hdGVyaWFsL0V2ZW50XCJcbmltcG9ydCBIZWFkZXIgZnJvbSBcIi4vTWF0ZXJpYWwvSGVhZGVyXCJcbmltcG9ydCBOYXYgZnJvbSBcIi4vTWF0ZXJpYWwvTmF2XCJcbmltcG9ydCBTZWFyY2ggZnJvbSBcIi4vTWF0ZXJpYWwvU2VhcmNoXCJcbmltcG9ydCBTaWRlYmFyIGZyb20gXCIuL01hdGVyaWFsL1NpZGViYXJcIlxuaW1wb3J0IFNvdXJjZSBmcm9tIFwiLi9NYXRlcmlhbC9Tb3VyY2VcIlxuaW1wb3J0IFRhYnMgZnJvbSBcIi4vTWF0ZXJpYWwvVGFic1wiXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIE1vZHVsZVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIEV2ZW50LFxuICBIZWFkZXIsXG4gIE5hdixcbiAgU2VhcmNoLFxuICBTaWRlYmFyLFxuICBTb3VyY2UsXG4gIFRhYnNcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9NYXRlcmlhbC5qcyIsIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxNyBNYXJ0aW4gRG9uYXRoIDxtYXJ0aW4uZG9uYXRoQHNxdWlkZnVuay5jb20+XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG9cbiAqIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlXG4gKiByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3JcbiAqIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04tSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HXG4gKiBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTXG4gKiBJTiBUSEUgU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IExpc3RlbmVyIGZyb20gXCIuL0V2ZW50L0xpc3RlbmVyXCJcbmltcG9ydCBNYXRjaE1lZGlhIGZyb20gXCIuL0V2ZW50L01hdGNoTWVkaWFcIlxuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBNb2R1bGVcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuZXhwb3J0IGRlZmF1bHQge1xuICBMaXN0ZW5lcixcbiAgTWF0Y2hNZWRpYVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01hdGVyaWFsL0V2ZW50LmpzIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE3IE1hcnRpbiBEb25hdGggPG1hcnRpbi5kb25hdGhAc3F1aWRmdW5rLmNvbT5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0b1xuICogZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGVcbiAqIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vclxuICogc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTi1JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkdcbiAqIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1NcbiAqIElOIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgTGlzdGVuZXIgZnJvbSBcIi4vTGlzdGVuZXJcIiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENsYXNzXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hdGNoTWVkaWEge1xuXG4gIC8qKlxuICAgKiBNZWRpYSBxdWVyeSBsaXN0ZW5lclxuICAgKlxuICAgKiBUaGlzIGNsYXNzIGxpc3RlbnMgZm9yIHN0YXRlIGNoYW5nZXMgb2YgbWVkaWEgcXVlcmllcyBhbmQgYXV0b21hdGljYWxseVxuICAgKiBzd2l0Y2hlcyB0aGUgZ2l2ZW4gbGlzdGVuZXJzIG9uIG9yIG9mZi5cbiAgICpcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IGhhbmRsZXJfIC0gTWVkaWEgcXVlcnkgZXZlbnQgaGFuZGxlclxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcXVlcnkgLSBNZWRpYSBxdWVyeSB0byB0ZXN0IGZvclxuICAgKiBAcGFyYW0ge0xpc3RlbmVyfSBsaXN0ZW5lciAtIEV2ZW50IGxpc3RlbmVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihxdWVyeSwgbGlzdGVuZXIpIHtcbiAgICB0aGlzLmhhbmRsZXJfID0gbXEgPT4ge1xuICAgICAgaWYgKG1xLm1hdGNoZXMpXG4gICAgICAgIGxpc3RlbmVyLmxpc3RlbigpXG4gICAgICBlbHNlXG4gICAgICAgIGxpc3RlbmVyLnVubGlzdGVuKClcbiAgICB9XG5cbiAgICAvKiBJbml0aWFsaXplIG1lZGlhIHF1ZXJ5IGxpc3RlbmVyICovXG4gICAgY29uc3QgbWVkaWEgPSB3aW5kb3cubWF0Y2hNZWRpYShxdWVyeSlcbiAgICBtZWRpYS5hZGRMaXN0ZW5lcih0aGlzLmhhbmRsZXJfKVxuXG4gICAgLyogQWx3YXlzIGNoZWNrIGF0IGluaXRpYWxpemF0aW9uICovXG4gICAgdGhpcy5oYW5kbGVyXyhtZWRpYSlcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01hdGVyaWFsL0V2ZW50L01hdGNoTWVkaWEuanMiLCIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTcgTWFydGluIERvbmF0aCA8bWFydGluLmRvbmF0aEBzcXVpZGZ1bmsuY29tPlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvXG4gKiBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZVxuICogcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yXG4gKiBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OLUlORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuICogRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HU1xuICogSU4gVEhFIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCBTaGFkb3cgZnJvbSBcIi4vSGVhZGVyL1NoYWRvd1wiXG5pbXBvcnQgVGl0bGUgZnJvbSBcIi4vSGVhZGVyL1RpdGxlXCJcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogTW9kdWxlXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgU2hhZG93LFxuICBUaXRsZVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01hdGVyaWFsL0hlYWRlci5qcyIsIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxNyBNYXJ0aW4gRG9uYXRoIDxtYXJ0aW4uZG9uYXRoQHNxdWlkZnVuay5jb20+XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG9cbiAqIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlXG4gKiByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3JcbiAqIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04tSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HXG4gKiBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTXG4gKiBJTiBUSEUgU09GVFdBUkUuXG4gKi9cblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ2xhc3NcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhZG93IHtcblxuICAvKipcbiAgICogU2hvdyBvciBoaWRlIGhlYWRlciBzaGFkb3cgZGVwZW5kaW5nIG9uIHBhZ2UgeS1vZmZzZXRcbiAgICpcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IGVsXyAtIENvbnRlbnQgY29udGFpbmVyXG4gICAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IGhlYWRlcl8gLSBIZWFkZXJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGhlaWdodF8gLSBPZmZzZXQgaGVpZ2h0IG9mIHByZXZpb3VzIG5vZGVzXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gYWN0aXZlXyAtIEhlYWRlciBzaGFkb3cgc3RhdGVcbiAgICpcbiAgICogQHBhcmFtIHsoc3RyaW5nfEhUTUxFbGVtZW50KX0gZWwgLSBTZWxlY3RvciBvciBIVE1MIGVsZW1lbnRcbiAgICogQHBhcmFtIHsoc3RyaW5nfEhUTUxFbGVtZW50KX0gaGVhZGVyIC0gU2VsZWN0b3Igb3IgSFRNTCBlbGVtZW50XG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbCwgaGVhZGVyKSB7XG4gICAgbGV0IHJlZiA9ICh0eXBlb2YgZWwgPT09IFwic3RyaW5nXCIpXG4gICAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpXG4gICAgICA6IGVsXG4gICAgaWYgKCEocmVmIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHx8XG4gICAgICAgICEocmVmLnBhcmVudE5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpXG4gICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3JcbiAgICB0aGlzLmVsXyA9IHJlZi5wYXJlbnROb2RlXG5cbiAgICAvKiBSZXRyaWV2ZSBoZWFkZXIgKi9cbiAgICByZWYgPSAodHlwZW9mIGhlYWRlciA9PT0gXCJzdHJpbmdcIilcbiAgICAgID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihoZWFkZXIpXG4gICAgICA6IGhlYWRlclxuICAgIGlmICghKHJlZiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSlcbiAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuICAgIHRoaXMuaGVhZGVyXyA9IHJlZlxuXG4gICAgLyogSW5pdGlhbGl6ZSBoZWlnaHQgYW5kIHN0YXRlICovXG4gICAgdGhpcy5oZWlnaHRfID0gMFxuICAgIHRoaXMuYWN0aXZlXyA9IGZhbHNlXG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHRvdGFsIGhlaWdodCBvZiBwcmV2aW91cyBub2Rlc1xuICAgKi9cbiAgc2V0dXAoKSB7XG4gICAgbGV0IGN1cnJlbnQgPSB0aGlzLmVsX1xuICAgIHdoaWxlICgoY3VycmVudCA9IGN1cnJlbnQucHJldmlvdXNFbGVtZW50U2libGluZykpIHtcbiAgICAgIGlmICghKGN1cnJlbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpXG4gICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuICAgICAgdGhpcy5oZWlnaHRfICs9IGN1cnJlbnQub2Zmc2V0SGVpZ2h0XG4gICAgfVxuICAgIHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgc2hhZG93IHN0YXRlXG4gICAqL1xuICB1cGRhdGUoKSB7XG4gICAgY29uc3QgYWN0aXZlID0gd2luZG93LnBhZ2VZT2Zmc2V0ID49IHRoaXMuaGVpZ2h0X1xuICAgIGlmIChhY3RpdmUgIT09IHRoaXMuYWN0aXZlXylcbiAgICAgIHRoaXMuaGVhZGVyXy5kYXRhc2V0Lm1kU3RhdGUgPSAodGhpcy5hY3RpdmVfID0gYWN0aXZlKSA/IFwic2hhZG93XCIgOiBcIlwiXG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgc2hhZG93IHN0YXRlXG4gICAqL1xuICByZXNldCgpIHtcbiAgICB0aGlzLmhlYWRlcl8uZGF0YXNldC5tZFN0YXRlID0gXCJcIlxuICAgIHRoaXMuaGVpZ2h0XyA9IDBcbiAgICB0aGlzLmFjdGl2ZV8gPSBmYWxzZVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvTWF0ZXJpYWwvSGVhZGVyL1NoYWRvdy5qcyIsIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxNyBNYXJ0aW4gRG9uYXRoIDxtYXJ0aW4uZG9uYXRoQHNxdWlkZnVuay5jb20+XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG9cbiAqIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlXG4gKiByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3JcbiAqIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04tSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HXG4gKiBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTXG4gKiBJTiBUSEUgU09GVFdBUkUuXG4gKi9cblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ2xhc3NcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGl0bGUge1xuXG4gIC8qKlxuICAgKiBTd2FwIGhlYWRlciB0aXRsZSB0b3BpY3Mgd2hlbiBoZWFkZXIgaXMgc2Nyb2xsZWQgcGFzdFxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICpcbiAgICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gZWxfIC0gRWxlbWVudFxuICAgKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSBoZWFkZXJfIC0gSGVhZGVyXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gYWN0aXZlXyAtIFRpdGxlIHN0YXRlXG4gICAqXG4gICAqIEBwYXJhbSB7KHN0cmluZ3xIVE1MRWxlbWVudCl9IGVsIC0gU2VsZWN0b3Igb3IgSFRNTCBlbGVtZW50XG4gICAqIEBwYXJhbSB7KHN0cmluZ3xIVE1MSGVhZGluZ0VsZW1lbnQpfSBoZWFkZXIgLSBTZWxlY3RvciBvciBIVE1MIGVsZW1lbnRcbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsLCBoZWFkZXIpIHtcbiAgICBsZXQgcmVmID0gKHR5cGVvZiBlbCA9PT0gXCJzdHJpbmdcIilcbiAgICAgID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbClcbiAgICAgIDogZWxcbiAgICBpZiAoIShyZWYgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpXG4gICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3JcbiAgICB0aGlzLmVsXyA9IHJlZlxuXG4gICAgLyogUmV0cmlldmUgaGVhZGVyICovXG4gICAgcmVmID0gKHR5cGVvZiBoZWFkZXIgPT09IFwic3RyaW5nXCIpXG4gICAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaGVhZGVyKVxuICAgICAgOiBoZWFkZXJcbiAgICBpZiAoIShyZWYgaW5zdGFuY2VvZiBIVE1MSGVhZGluZ0VsZW1lbnQpKVxuICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yXG4gICAgdGhpcy5oZWFkZXJfID0gcmVmXG5cbiAgICAvKiBJbml0aWFsaXplIHN0YXRlICovXG4gICAgdGhpcy5hY3RpdmVfID0gZmFsc2VcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXR1cCB0aXRsZSBzdGF0ZVxuICAgKi9cbiAgc2V0dXAoKSB7XG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbCh0aGlzLmVsXy5jaGlsZHJlbiwgbm9kZSA9PiB7ICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHVzZSBjaGlsZE5vZGVzIGhlcmUgZm9yIElFP1xuICAgICAgbm9kZS5zdHlsZS53aWR0aCA9IGAke3RoaXMuZWxfLm9mZnNldFdpZHRoIC0gMjB9cHhgXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGl0bGUgc3RhdGVcbiAgICpcbiAgICogQHBhcmFtIHtFdmVudH0gZXYgLSBFdmVudFxuICAgKi9cbiAgdXBkYXRlKGV2KSB7XG4gICAgY29uc3QgYWN0aXZlID0gd2luZG93LnBhZ2VZT2Zmc2V0ID49IHRoaXMuaGVhZGVyXy5vZmZzZXRUb3BcbiAgICBpZiAoYWN0aXZlICE9PSB0aGlzLmFjdGl2ZV8pXG4gICAgICB0aGlzLmVsXy5kYXRhc2V0Lm1kU3RhdGUgPSAodGhpcy5hY3RpdmVfID0gYWN0aXZlKSA/IFwiYWN0aXZlXCIgOiBcIlwiXG5cbiAgICAvKiBIYWNrOiBpbmR1Y2UgZWxsaXBzaXMgb24gdG9waWNzICovXG4gICAgaWYgKGV2LnR5cGUgPT09IFwicmVzaXplXCIpIHtcbiAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwodGhpcy5lbF8uY2hpbGRyZW4sIG5vZGUgPT4ge1xuICAgICAgICBub2RlLnN0eWxlLndpZHRoID0gYCR7dGhpcy5lbF8ub2Zmc2V0V2lkdGggLSAyMH1weGBcbiAgICAgIH0pXG4gICAgfVxuXG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGl0bGUgc3RhdGVcbiAgICovXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuZWxfLmRhdGFzZXQubWRTdGF0ZSA9IFwiXCJcbiAgICB0aGlzLmVsXy5zdHlsZS53aWR0aCA9IFwiXCJcbiAgICB0aGlzLmFjdGl2ZV8gPSBmYWxzZVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvTWF0ZXJpYWwvSGVhZGVyL1RpdGxlLmpzIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE3IE1hcnRpbiBEb25hdGggPG1hcnRpbi5kb25hdGhAc3F1aWRmdW5rLmNvbT5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0b1xuICogZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGVcbiAqIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vclxuICogc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTi1JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkdcbiAqIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1NcbiAqIElOIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgQmx1ciBmcm9tIFwiLi9OYXYvQmx1clwiXG5pbXBvcnQgQ29sbGFwc2UgZnJvbSBcIi4vTmF2L0NvbGxhcHNlXCJcbmltcG9ydCBTY3JvbGxpbmcgZnJvbSBcIi4vTmF2L1Njcm9sbGluZ1wiXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIE1vZHVsZVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIEJsdXIsXG4gIENvbGxhcHNlLFxuICBTY3JvbGxpbmdcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9NYXRlcmlhbC9OYXYuanMiLCIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTcgTWFydGluIERvbmF0aCA8bWFydGluLmRvbmF0aEBzcXVpZGZ1bmsuY29tPlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvXG4gKiBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZVxuICogcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yXG4gKiBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OLUlORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuICogRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HU1xuICogSU4gVEhFIFNPRlRXQVJFLlxuICovXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENsYXNzXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJsdXIge1xuXG4gIC8qKlxuICAgKiBCbHVyIGxpbmtzIHdpdGhpbiB0aGUgdGFibGUgb2YgY29udGVudHMgYWJvdmUgY3VycmVudCBwYWdlIHktb2Zmc2V0XG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKlxuICAgKiBAcHJvcGVydHkge05vZGVMaXN0PEhUTUxFbGVtZW50Pn0gZWxzXyAtIFRhYmxlIG9mIGNvbnRlbnRzIGxpbmtzXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXk8SFRNTEVsZW1lbnQ+fSBhbmNob3JzXyAtIFJlZmVyZW5jZWQgYW5jaG9yIG5vZGVzXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBpbmRleF8gLSBDdXJyZW50IGxpbmsgaW5kZXhcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IG9mZnNldF8gLSBDdXJyZW50IHBhZ2UgeS1vZmZzZXRcbiAgICogQHByb3BlcnR5IHtib29sZWFufSBkaXJfIC0gU2Nyb2xsIGRpcmVjdGlvbiBjaGFuZ2VcbiAgICpcbiAgICogQHBhcmFtIHsoc3RyaW5nfE5vZGVMaXN0PEhUTUxFbGVtZW50Pil9IGVscyAtIFNlbGVjdG9yIG9yIEhUTUwgZWxlbWVudHNcbiAgICovXG4gIGNvbnN0cnVjdG9yKGVscykge1xuICAgIHRoaXMuZWxzXyA9ICh0eXBlb2YgZWxzID09PSBcInN0cmluZ1wiKVxuICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVscylcbiAgICAgIDogZWxzXG5cbiAgICAvKiBJbml0aWFsaXplIGluZGV4IGFuZCBwYWdlIHktb2Zmc2V0ICovXG4gICAgdGhpcy5pbmRleF8gPSAwXG4gICAgdGhpcy5vZmZzZXRfID0gd2luZG93LnBhZ2VZT2Zmc2V0XG5cbiAgICAvKiBOZWNlc3Nhcnkgc3RhdGUgdG8gY29ycmVjdGx5IHJlc2V0IHRoZSBpbmRleCAqL1xuICAgIHRoaXMuZGlyXyA9IGZhbHNlXG5cbiAgICAvKiBJbmRleCBhbmNob3Igbm9kZSBvZmZzZXRzIGZvciBmYXN0IGxvb2t1cCAqL1xuICAgIHRoaXMuYW5jaG9yc18gPSBbXS5yZWR1Y2UuY2FsbCh0aGlzLmVsc18sIChhbmNob3JzLCBlbCkgPT4ge1xuICAgICAgcmV0dXJuIGFuY2hvcnMuY29uY2F0KFxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbC5oYXNoLnN1YnN0cmluZygxKSkgfHwgW10pXG4gICAgfSwgW10pXG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBibHVyIHN0YXRlc1xuICAgKi9cbiAgc2V0dXAoKSB7XG4gICAgdGhpcy51cGRhdGUoKVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBibHVyIHN0YXRlc1xuICAgKlxuICAgKiBEZWR1Y3QgdGhlIHN0YXRpYyBvZmZzZXQgb2YgdGhlIGhlYWRlciAoNTZweCkgYW5kIHNpZGViYXIgb2Zmc2V0ICgyNHB4KSxcbiAgICogc2VlIF9wZXJtYWxpbmtzLnNjc3MgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAqL1xuICB1cGRhdGUoKSB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gd2luZG93LnBhZ2VZT2Zmc2V0XG4gICAgY29uc3QgZGlyID0gdGhpcy5vZmZzZXRfIC0gb2Zmc2V0IDwgMFxuXG4gICAgLyogSGFjazogcmVzZXQgaW5kZXggaWYgZGlyZWN0aW9uIGNoYW5nZWQgdG8gY2F0Y2ggdmVyeSBmYXN0IHNjcm9sbGluZyxcbiAgICAgICBiZWNhdXNlIG90aGVyd2lzZSB3ZSB3b3VsZCBoYXZlIHRvIHJlZ2lzdGVyIGEgdGltZXIgYW5kIHRoYXQgc3Vja3MgKi9cbiAgICBpZiAodGhpcy5kaXJfICE9PSBkaXIpXG4gICAgICB0aGlzLmluZGV4XyA9IGRpclxuICAgICAgICA/IHRoaXMuaW5kZXhfID0gMFxuICAgICAgICA6IHRoaXMuaW5kZXhfID0gdGhpcy5lbHNfLmxlbmd0aCAtIDFcblxuICAgIC8qIEV4aXQgd2hlbiB0aGVyZSBhcmUgbm8gYW5jaG9ycyAqL1xuICAgIGlmICh0aGlzLmFuY2hvcnNfLmxlbmd0aCA9PT0gMClcbiAgICAgIHJldHVyblxuXG4gICAgLyogU2Nyb2xsIGRpcmVjdGlvbiBpcyBkb3duICovXG4gICAgaWYgKHRoaXMub2Zmc2V0XyA8PSBvZmZzZXQpIHtcbiAgICAgIGZvciAobGV0IGkgPSB0aGlzLmluZGV4XyArIDE7IGkgPCB0aGlzLmVsc18ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuYW5jaG9yc19baV0ub2Zmc2V0VG9wIC0gKDU2ICsgMjQpIDw9IG9mZnNldCkge1xuICAgICAgICAgIGlmIChpID4gMClcbiAgICAgICAgICAgIHRoaXMuZWxzX1tpIC0gMV0uZGF0YXNldC5tZFN0YXRlID0gXCJibHVyXCJcbiAgICAgICAgICB0aGlzLmluZGV4XyA9IGlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAvKiBTY3JvbGwgZGlyZWN0aW9uIGlzIHVwICovXG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSB0aGlzLmluZGV4XzsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgaWYgKHRoaXMuYW5jaG9yc19baV0ub2Zmc2V0VG9wIC0gKDU2ICsgMjQpID4gb2Zmc2V0KSB7XG4gICAgICAgICAgaWYgKGkgPiAwKVxuICAgICAgICAgICAgdGhpcy5lbHNfW2kgLSAxXS5kYXRhc2V0Lm1kU3RhdGUgPSBcIlwiXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5pbmRleF8gPSBpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8qIFJlbWVtYmVyIGN1cnJlbnQgb2Zmc2V0IGFuZCBkaXJlY3Rpb24gZm9yIG5leHQgaXRlcmF0aW9uICovXG4gICAgdGhpcy5vZmZzZXRfID0gb2Zmc2V0XG4gICAgdGhpcy5kaXJfID0gZGlyXG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgYmx1ciBzdGF0ZXNcbiAgICovXG4gIHJlc2V0KCkge1xuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwodGhpcy5lbHNfLCBlbCA9PiB7XG4gICAgICBlbC5kYXRhc2V0Lm1kU3RhdGUgPSBcIlwiXG4gICAgfSlcblxuICAgIC8qIFJlc2V0IGluZGV4IGFuZCBwYWdlIHktb2Zmc2V0ICovXG4gICAgdGhpcy5pbmRleF8gID0gMFxuICAgIHRoaXMub2Zmc2V0XyA9IHdpbmRvdy5wYWdlWU9mZnNldFxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvTWF0ZXJpYWwvTmF2L0JsdXIuanMiLCIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTcgTWFydGluIERvbmF0aCA8bWFydGluLmRvbmF0aEBzcXVpZGZ1bmsuY29tPlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvXG4gKiBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZVxuICogcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yXG4gKiBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OLUlORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuICogRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HU1xuICogSU4gVEhFIFNPRlRXQVJFLlxuICovXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENsYXNzXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGxhcHNlIHtcblxuICAvKipcbiAgICogRXhwYW5kIG9yIGNvbGxhcHNlIG5hdmlnYXRpb24gb24gdG9nZ2xlXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKlxuICAgKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSBlbF8gLSBOYXZpZ2F0aW9uIGxpc3RcbiAgICpcbiAgICogQHBhcmFtIHsoc3RyaW5nfEhUTUxFbGVtZW50KX0gZWwgLSBTZWxlY3RvciBvciBIVE1MIGVsZW1lbnRcbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsKSB7XG4gICAgY29uc3QgcmVmID0gKHR5cGVvZiBlbCA9PT0gXCJzdHJpbmdcIilcbiAgICAgID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbClcbiAgICAgIDogZWxcbiAgICBpZiAoIShyZWYgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpXG4gICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3JcbiAgICB0aGlzLmVsXyA9IHJlZlxuICB9XG5cbiAgLyoqXG4gICAqIEFuaW1hdGUgZXhwYW5kIGFuZCBjb2xsYXBzZSBzbW9vdGhseVxuICAgKlxuICAgKiBJbnRlcm5ldCBFeHBsb3JlciAxMSBpcyB2ZXJ5IHNsb3cgYXQgcmVjb2duaXppbmcgY2hhbmdlcyBvbiB0aGUgZGF0YXNldFxuICAgKiB3aGljaCByZXN1bHRzIGluIHRoZSBtZW51IG5vdCBleHBhbmRpbmcgb3IgY29sbGFwc2luZyBwcm9wZXJseS4gVEhlcmVmb3JlLFxuICAgKiBmb3IgcmVhc29ucyBvZiBjb21wYXRpYmlsaXR5LCB0aGUgYXR0cmlidXRlIGFjY2Vzc29ycyBhcmUgdXNlZC5cbiAgICovXG4gIHVwZGF0ZSgpIHtcbiAgICBjb25zdCBjdXJyZW50ID0gdGhpcy5lbF8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0XG5cbiAgICAvKiBFeHBhbmRlZCwgc28gY29sbGFwc2UgKi9cbiAgICBpZiAoY3VycmVudCkge1xuICAgICAgdGhpcy5lbF8uc3R5bGUubWF4SGVpZ2h0ID0gYCR7Y3VycmVudH1weGBcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuZWxfLnNldEF0dHJpYnV0ZShcImRhdGEtbWQtc3RhdGVcIiwgXCJhbmltYXRlXCIpXG4gICAgICAgIHRoaXMuZWxfLnN0eWxlLm1heEhlaWdodCA9IFwiMHB4XCJcbiAgICAgIH0pXG5cbiAgICAvKiBDb2xsYXBzZWQsIHNvIGV4cGFuZCAqL1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVsXy5zZXRBdHRyaWJ1dGUoXCJkYXRhLW1kLXN0YXRlXCIsIFwiZXhwYW5kXCIpXG4gICAgICB0aGlzLmVsXy5zdHlsZS5tYXhIZWlnaHQgPSBcIlwiXG5cbiAgICAgIC8qIFJlYWQgaGVpZ2h0IGFuZCB1bnNldCBwc2V1ZG8tdG9nZ2xlZCBzdGF0ZSAqL1xuICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5lbF8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0XG4gICAgICB0aGlzLmVsXy5yZW1vdmVBdHRyaWJ1dGUoXCJkYXRhLW1kLXN0YXRlXCIpXG5cbiAgICAgIC8qIFNldCBpbml0aWFsIHN0YXRlIGFuZCBhbmltYXRlICovXG4gICAgICB0aGlzLmVsXy5zdHlsZS5tYXhIZWlnaHQgPSBcIjBweFwiXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICB0aGlzLmVsXy5zZXRBdHRyaWJ1dGUoXCJkYXRhLW1kLXN0YXRlXCIsIFwiYW5pbWF0ZVwiKVxuICAgICAgICB0aGlzLmVsXy5zdHlsZS5tYXhIZWlnaHQgPSBgJHtoZWlnaHR9cHhgXG4gICAgICB9KVxuICAgIH1cblxuICAgIC8qIFJlbW92ZSBzdGF0ZSBvbiBlbmQgb2YgdHJhbnNpdGlvbiAqL1xuICAgIGNvbnN0IGVuZCA9IGV2ID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2LnRhcmdldFxuICAgICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKVxuICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3JcblxuICAgICAgLyogUmVzZXQgaGVpZ2h0IGFuZCBzdGF0ZSAqL1xuICAgICAgdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtbWQtc3RhdGVcIilcbiAgICAgIHRhcmdldC5zdHlsZS5tYXhIZWlnaHQgPSBcIlwiXG5cbiAgICAgIC8qIE9ubHkgZmlyZSBvbmNlLCBzbyBkaXJlY3RseSByZW1vdmUgZXZlbnQgbGlzdGVuZXIgKi9cbiAgICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLCBlbmQpXG4gICAgfVxuICAgIHRoaXMuZWxfLmFkZEV2ZW50TGlzdGVuZXIoXCJ0cmFuc2l0aW9uZW5kXCIsIGVuZCwgZmFsc2UpXG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgaGVpZ2h0IGFuZCBwc2V1ZG8tdG9nZ2xlZCBzdGF0ZVxuICAgKi9cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5lbF8uZGF0YXNldC5tZFN0YXRlID0gXCJcIlxuICAgIHRoaXMuZWxfLnN0eWxlLm1heEhlaWdodCA9IFwiXCJcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01hdGVyaWFsL05hdi9Db2xsYXBzZS5qcyIsIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxNyBNYXJ0aW4gRG9uYXRoIDxtYXJ0aW4uZG9uYXRoQHNxdWlkZnVuay5jb20+XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG9cbiAqIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlXG4gKiByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3JcbiAqIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04tSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HXG4gKiBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTXG4gKiBJTiBUSEUgU09GVFdBUkUuXG4gKi9cblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ2xhc3NcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Nyb2xsaW5nIHtcblxuICAvKipcbiAgICogU2V0IG92ZXJmbG93IHNjcm9sbGluZyBvbiB0aGUgY3VycmVudCBhY3RpdmUgcGFuZSAoZm9yIGlPUylcbiAgICpcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IGVsXyAtIFByaW1hcnkgbmF2aWdhdGlvblxuICAgKlxuICAgKiBAcGFyYW0geyhzdHJpbmd8SFRNTEVsZW1lbnQpfSBlbCAtIFNlbGVjdG9yIG9yIEhUTUwgZWxlbWVudFxuICAgKi9cbiAgY29uc3RydWN0b3IoZWwpIHtcbiAgICBjb25zdCByZWYgPSAodHlwZW9mIGVsID09PSBcInN0cmluZ1wiKVxuICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKVxuICAgICAgOiBlbFxuICAgIGlmICghKHJlZiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSlcbiAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuICAgIHRoaXMuZWxfID0gcmVmXG4gIH1cblxuICAvKipcbiAgICogU2V0dXAgcGFuZXNcbiAgICovXG4gIHNldHVwKCkge1xuXG4gICAgLyogSW5pdGlhbGx5IHNldCBvdmVyZmxvdyBzY3JvbGxpbmcgb24gbWFpbiBwYW5lICovXG4gICAgY29uc3QgbWFpbiA9IHRoaXMuZWxfLmNoaWxkcmVuW3RoaXMuZWxfLmNoaWxkcmVuLmxlbmd0aCAtIDFdXG4gICAgbWFpbi5zdHlsZS53ZWJraXRPdmVyZmxvd1Njcm9sbGluZyA9IFwidG91Y2hcIlxuXG4gICAgLyogRmluZCBhbGwgdG9nZ2xlcyBhbmQgY2hlY2sgd2hpY2ggb25lIGlzIGFjdGl2ZSAqL1xuICAgIGNvbnN0IHRvZ2dsZXMgPSB0aGlzLmVsXy5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtbWQtdG9nZ2xlXVwiKVxuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwodG9nZ2xlcywgdG9nZ2xlID0+IHtcbiAgICAgIGlmICghKHRvZ2dsZSBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpKVxuICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3JcbiAgICAgIGlmICh0b2dnbGUuY2hlY2tlZCkge1xuXG4gICAgICAgIC8qIEZpbmQgY29ycmVzcG9uZGluZyBuYXZpZ2F0aW9uYWwgcGFuZSAqL1xuICAgICAgICBsZXQgcGFuZSA9IHRvZ2dsZS5uZXh0RWxlbWVudFNpYmxpbmdcbiAgICAgICAgaWYgKCEocGFuZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSlcbiAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3JcbiAgICAgICAgd2hpbGUgKHBhbmUudGFnTmFtZSAhPT0gXCJOQVZcIiAmJiBwYW5lLm5leHRFbGVtZW50U2libGluZylcbiAgICAgICAgICBwYW5lID0gcGFuZS5uZXh0RWxlbWVudFNpYmxpbmdcblxuICAgICAgICAvKiBDaGVjayByZWZlcmVuY2VzICovXG4gICAgICAgIGlmICghKHRvZ2dsZS5wYXJlbnROb2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHx8XG4gICAgICAgICAgICAhKHRvZ2dsZS5wYXJlbnROb2RlLnBhcmVudE5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpXG4gICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yXG5cbiAgICAgICAgLyogRmluZCBjdXJyZW50IGFuZCBwYXJlbnQgbGlzdCBlbGVtZW50cyAqL1xuICAgICAgICBjb25zdCBwYXJlbnQgPSB0b2dnbGUucGFyZW50Tm9kZS5wYXJlbnROb2RlXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHBhbmUuY2hpbGRyZW5bcGFuZS5jaGlsZHJlbi5sZW5ndGggLSAxXVxuXG4gICAgICAgIC8qIEFsd2F5cyByZXNldCBhbGwgbGlzdHMgd2hlbiB0cmFuc2l0aW9uaW5nICovXG4gICAgICAgIHBhcmVudC5zdHlsZS53ZWJraXRPdmVyZmxvd1Njcm9sbGluZyA9IFwiXCJcbiAgICAgICAgdGFyZ2V0LnN0eWxlLndlYmtpdE92ZXJmbG93U2Nyb2xsaW5nID0gXCJ0b3VjaFwiXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYWN0aXZlIHBhbmVzXG4gICAqXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2IC0gQ2hhbmdlIGV2ZW50XG4gICAqL1xuICB1cGRhdGUoZXYpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBldi50YXJnZXRcbiAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpXG4gICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3JcblxuICAgIC8qIEZpbmQgY29ycmVzcG9uZGluZyBuYXZpZ2F0aW9uYWwgcGFuZSAqL1xuICAgIGxldCBwYW5lID0gdGFyZ2V0Lm5leHRFbGVtZW50U2libGluZ1xuICAgIGlmICghKHBhbmUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpXG4gICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3JcbiAgICB3aGlsZSAocGFuZS50YWdOYW1lICE9PSBcIk5BVlwiICYmIHBhbmUubmV4dEVsZW1lbnRTaWJsaW5nKVxuICAgICAgcGFuZSA9IHBhbmUubmV4dEVsZW1lbnRTaWJsaW5nXG5cbiAgICAvKiBDaGVjayByZWZlcmVuY2VzICovXG4gICAgaWYgKCEodGFyZ2V0LnBhcmVudE5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkgfHxcbiAgICAgICAgISh0YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKVxuICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yXG5cbiAgICAvKiBGaW5kIHBhcmVudCBhbmQgYWN0aXZlIHBhbmVzICovXG4gICAgY29uc3QgcGFyZW50ID0gdGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZVxuICAgIGNvbnN0IGFjdGl2ZSA9IHBhbmUuY2hpbGRyZW5bcGFuZS5jaGlsZHJlbi5sZW5ndGggLSAxXVxuXG4gICAgLyogQWx3YXlzIHJlc2V0IGFsbCBsaXN0cyB3aGVuIHRyYW5zaXRpb25pbmcgKi9cbiAgICBwYXJlbnQuc3R5bGUud2Via2l0T3ZlcmZsb3dTY3JvbGxpbmcgPSBcIlwiXG4gICAgYWN0aXZlLnN0eWxlLndlYmtpdE92ZXJmbG93U2Nyb2xsaW5nID0gXCJcIlxuXG4gICAgLyogU2V0IG92ZXJmbG93IHNjcm9sbGluZyBvbiBwYXJlbnQgcGFuZSAqL1xuICAgIGlmICghdGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgIGNvbnN0IGVuZCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHBhbmUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgIHBhcmVudC5zdHlsZS53ZWJraXRPdmVyZmxvd1Njcm9sbGluZyA9IFwidG91Y2hcIlxuICAgICAgICAgIHBhbmUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIiwgZW5kKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBwYW5lLmFkZEV2ZW50TGlzdGVuZXIoXCJ0cmFuc2l0aW9uZW5kXCIsIGVuZCwgZmFsc2UpXG4gICAgfVxuXG4gICAgLyogU2V0IG92ZXJmbG93IHNjcm9sbGluZyBvbiBhY3RpdmUgcGFuZSAqL1xuICAgIGlmICh0YXJnZXQuY2hlY2tlZCkge1xuICAgICAgY29uc3QgZW5kID0gKCkgPT4ge1xuICAgICAgICBpZiAocGFuZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgYWN0aXZlLnN0eWxlLndlYmtpdE92ZXJmbG93U2Nyb2xsaW5nID0gXCJ0b3VjaFwiXG4gICAgICAgICAgcGFuZS5yZW1vdmVFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLCBlbmQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHBhbmUuYWRkRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIiwgZW5kLCBmYWxzZSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgcGFuZXNcbiAgICovXG4gIHJlc2V0KCkge1xuXG4gICAgLyogUmVzZXQgb3ZlcmZsb3cgc2Nyb2xsaW5nIG9uIG1haW4gcGFuZSAqL1xuICAgIHRoaXMuZWxfLmNoaWxkcmVuWzFdLnN0eWxlLndlYmtpdE92ZXJmbG93U2Nyb2xsaW5nID0gXCJcIlxuXG4gICAgLyogRmluZCBhbGwgdG9nZ2xlcyBhbmQgY2hlY2sgd2hpY2ggb25lIGlzIGFjdGl2ZSAqL1xuICAgIGNvbnN0IHRvZ2dsZXMgPSB0aGlzLmVsXy5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtbWQtdG9nZ2xlXVwiKVxuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwodG9nZ2xlcywgdG9nZ2xlID0+IHtcbiAgICAgIGlmICghKHRvZ2dsZSBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpKVxuICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3JcbiAgICAgIGlmICh0b2dnbGUuY2hlY2tlZCkge1xuXG4gICAgICAgIC8qIEZpbmQgY29ycmVzcG9uZGluZyBuYXZpZ2F0aW9uYWwgcGFuZSAqL1xuICAgICAgICBsZXQgcGFuZSA9IHRvZ2dsZS5uZXh0RWxlbWVudFNpYmxpbmdcbiAgICAgICAgaWYgKCEocGFuZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSlcbiAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3JcbiAgICAgICAgd2hpbGUgKHBhbmUudGFnTmFtZSAhPT0gXCJOQVZcIiAmJiBwYW5lLm5leHRFbGVtZW50U2libGluZylcbiAgICAgICAgICBwYW5lID0gcGFuZS5uZXh0RWxlbWVudFNpYmxpbmdcblxuICAgICAgICAvKiBDaGVjayByZWZlcmVuY2VzICovXG4gICAgICAgIGlmICghKHRvZ2dsZS5wYXJlbnROb2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHx8XG4gICAgICAgICAgICAhKHRvZ2dsZS5wYXJlbnROb2RlLnBhcmVudE5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpXG4gICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yXG5cbiAgICAgICAgLyogRmluZCBwYXJlbnQgYW5kIGFjdGl2ZSBwYW5lcyAqL1xuICAgICAgICBjb25zdCBwYXJlbnQgPSB0b2dnbGUucGFyZW50Tm9kZS5wYXJlbnROb2RlXG4gICAgICAgIGNvbnN0IGFjdGl2ZSA9IHBhbmUuY2hpbGRyZW5bcGFuZS5jaGlsZHJlbi5sZW5ndGggLSAxXVxuXG4gICAgICAgIC8qIEFsd2F5cyByZXNldCBhbGwgbGlzdHMgd2hlbiB0cmFuc2l0aW9uaW5nICovXG4gICAgICAgIHBhcmVudC5zdHlsZS53ZWJraXRPdmVyZmxvd1Njcm9sbGluZyA9IFwiXCJcbiAgICAgICAgYWN0aXZlLnN0eWxlLndlYmtpdE92ZXJmbG93U2Nyb2xsaW5nID0gXCJcIlxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9NYXRlcmlhbC9OYXYvU2Nyb2xsaW5nLmpzIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE3IE1hcnRpbiBEb25hdGggPG1hcnRpbi5kb25hdGhAc3F1aWRmdW5rLmNvbT5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0b1xuICogZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGVcbiAqIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vclxuICogc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTi1JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkdcbiAqIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1NcbiAqIElOIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgTG9jayBmcm9tIFwiLi9TZWFyY2gvTG9ja1wiXG5pbXBvcnQgUmVzdWx0IGZyb20gXCIuL1NlYXJjaC9SZXN1bHRcIlxuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBNb2R1bGVcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuZXhwb3J0IGRlZmF1bHQge1xuICBMb2NrLFxuICBSZXN1bHRcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9NYXRlcmlhbC9TZWFyY2guanMiLCIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTcgTWFydGluIERvbmF0aCA8bWFydGluLmRvbmF0aEBzcXVpZGZ1bmsuY29tPlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvXG4gKiBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZVxuICogcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yXG4gKiBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OLUlORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuICogRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HU1xuICogSU4gVEhFIFNPRlRXQVJFLlxuICovXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENsYXNzXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvY2sge1xuXG4gIC8qKlxuICAgKiBMb2NrIGJvZHkgZm9yIGZ1bGwtc2NyZWVuIHNlYXJjaCBtb2RhbFxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICpcbiAgICogQHByb3BlcnR5IHtIVE1MSW5wdXRFbGVtZW50fSBlbF8gLSBMb2NrIHRvZ2dsZVxuICAgKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSBsb2NrXyAtIEVsZW1lbnQgdG8gbG9jayAoZG9jdW1lbnQgYm9keSlcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IG9mZnNldF8gLSBDdXJyZW50IHBhZ2UgeS1vZmZzZXRcbiAgICpcbiAgICogQHBhcmFtIHsoc3RyaW5nfEhUTUxFbGVtZW50KX0gZWwgLSBTZWxlY3RvciBvciBIVE1MIGVsZW1lbnRcbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsKSB7XG4gICAgY29uc3QgcmVmID0gKHR5cGVvZiBlbCA9PT0gXCJzdHJpbmdcIilcbiAgICAgID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbClcbiAgICAgIDogZWxcbiAgICBpZiAoIShyZWYgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSlcbiAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuICAgIHRoaXMuZWxfID0gcmVmXG5cbiAgICAvKiBSZXRyaWV2ZSBlbGVtZW50IHRvIGxvY2sgKD0gYm9keSkgKi9cbiAgICBpZiAoIWRvY3VtZW50LmJvZHkpXG4gICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3JcbiAgICB0aGlzLmxvY2tfID0gZG9jdW1lbnQuYm9keVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHVwIGxvY2tlZCBzdGF0ZVxuICAgKi9cbiAgc2V0dXAoKSB7XG4gICAgdGhpcy51cGRhdGUoKVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBsb2NrZWQgc3RhdGVcbiAgICovXG4gIHVwZGF0ZSgpIHtcblxuICAgIC8qIEVudGVyaW5nIHNlYXJjaCBtb2RlICovXG4gICAgaWYgKHRoaXMuZWxfLmNoZWNrZWQpIHtcbiAgICAgIHRoaXMub2Zmc2V0XyA9IHdpbmRvdy5wYWdlWU9mZnNldFxuXG4gICAgICAvKiBTY3JvbGwgdG8gdG9wIGFmdGVyIHRyYW5zaXRpb24sIHRvIG9taXQgZmxpY2tlcmluZyAqL1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKVxuXG4gICAgICAgIC8qIExvY2sgYm9keSBhZnRlciBmaW5pc2hpbmcgdHJhbnNpdGlvbiAqL1xuICAgICAgICBpZiAodGhpcy5lbF8uY2hlY2tlZCkge1xuICAgICAgICAgIHRoaXMubG9ja18uZGF0YXNldC5tZFN0YXRlID0gXCJsb2NrXCJcbiAgICAgICAgfVxuICAgICAgfSwgNDAwKVxuXG4gICAgLyogRXhpdGluZyBzZWFyY2ggbW9kZSAqL1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxvY2tfLmRhdGFzZXQubWRTdGF0ZSA9IFwiXCJcblxuICAgICAgLyogU2Nyb2xsIHRvIGZvcm1lciBwb3NpdGlvbiwgYnV0IHdhaXQgZm9yIDEwMG1zIHRvIHByZXZlbnQgZmxhc2hlcyBvblxuICAgICAgICAgaU9TLiBBIHNob3J0IHRpbWVvdXQgc2VlbXMgdG8gZG8gdGhlIHRyaWNrICovXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9mZnNldF8gIT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHRoaXMub2Zmc2V0XylcbiAgICAgIH0sIDEwMClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgbG9ja2VkIHN0YXRlIGFuZCBwYWdlIHktb2Zmc2V0XG4gICAqL1xuICByZXNldCgpIHtcbiAgICBpZiAodGhpcy5sb2NrXy5kYXRhc2V0Lm1kU3RhdGUgPT09IFwibG9ja1wiKVxuICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHRoaXMub2Zmc2V0XylcbiAgICB0aGlzLmxvY2tfLmRhdGFzZXQubWRTdGF0ZSA9IFwiXCJcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01hdGVyaWFsL1NlYXJjaC9Mb2NrLmpzIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE3IE1hcnRpbiBEb25hdGggPG1hcnRpbi5kb25hdGhAc3F1aWRmdW5rLmNvbT5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0b1xuICogZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGVcbiAqIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vclxuICogc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTi1JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkdcbiAqIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1NcbiAqIElOIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgZXNjYXBlIGZyb20gXCJlc2NhcGUtc3RyaW5nLXJlZ2V4cFwiXG5pbXBvcnQgbHVuciBmcm9tIFwibHVuclwiIC8vIGV4cG9zZS1sb2FkZXI/bHVuciFsdW5yXCJcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogRnVuY3Rpb25zXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbi8qKlxuICogVHJ1bmNhdGUgYSBzdHJpbmcgYWZ0ZXIgdGhlIGdpdmVuIG51bWJlciBvZiBjaGFyYWN0ZXJcbiAqXG4gKiBUaGlzIGlzIG5vdCBhIHJlYXNvbmFibGUgYXBwcm9hY2gsIHNpbmNlIHRoZSBzdW1tYXJpZXMga2luZCBvZiBzdWNrLiBJdFxuICogd291bGQgYmUgYmV0dGVyIHRvIGNyZWF0ZSBzb21ldGhpbmcgbW9yZSBpbnRlbGxpZ2VudCwgaGlnaGxpZ2h0aW5nIHRoZVxuICogc2VhcmNoIG9jY3VycmVuY2VzIGFuZCBtYWtpbmcgYSBiZXR0ZXIgc3VtbWFyeSBvdXQgb2YgaXQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyAtIFN0cmluZyB0byBiZSB0cnVuY2F0ZWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIC0gTnVtYmVyIG9mIGNoYXJhY3RlcnNcbiAqIEByZXR1cm4ge3N0cmluZ30gVHJ1bmNhdGVkIHN0cmluZ1xuICovXG5jb25zdCB0cnVuY2F0ZSA9IChzdHJpbmcsIG4pID0+IHtcbiAgbGV0IGkgPSBuXG4gIGlmIChzdHJpbmcubGVuZ3RoID4gaSkge1xuICAgIHdoaWxlIChzdHJpbmdbaV0gIT09IFwiIFwiICYmIC0taSA+IDApO1xuICAgIHJldHVybiBgJHtzdHJpbmcuc3Vic3RyaW5nKDAsIGkpfS4uLmBcbiAgfVxuICByZXR1cm4gc3RyaW5nXG59XG5cbi8qKlxuICogUmV0dXJuIHRoZSBtZXRhIHRhZyB2YWx1ZSBmb3IgdGhlIGdpdmVuIGtleVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBNZXRhIG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBbX10gLSBTdG9wIEZsb3cgY29tcGxhaW5pbmcgKFRPRE8pXG4gKlxuICogQHJldHVybiB7c3RyaW5nfSBNZXRhIGNvbnRlbnQgdmFsdWVcbiAqL1xuY29uc3QgdHJhbnNsYXRlID0gKGtleSwgXykgPT4geyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIGNvbnN0IG1ldGEgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShgbGFuZzoke2tleX1gKVswXVxuICBpZiAoIShtZXRhIGluc3RhbmNlb2YgSFRNTE1ldGFFbGVtZW50KSlcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3JcbiAgcmV0dXJuIG1ldGEuY29udGVudFxufVxuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDbGFzc1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXN1bHQge1xuXG4gIC8qKlxuICAgKiBQZXJmb3JtIHNlYXJjaCBhbmQgdXBkYXRlIHJlc3VsdHMgb24ga2V5Ym9hcmQgZXZlbnRzXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKlxuICAgKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSBlbF8gLSBTZWFyY2ggcmVzdWx0IGNvbnRhaW5lclxuICAgKiBAcHJvcGVydHkgeyhBcnJheTxPYmplY3Q+fEZ1bmN0aW9uKX0gZGF0YV8gLSBSYXcgZG9jdW1lbnQgZGF0YVxuICAgKiBAcHJvcGVydHkge09iamVjdH0gZG9jc18gLSBJbmRleGVkIGRvY3VtZW50c1xuICAgKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSBtZXRhXyAtIFNlYXJjaCBtZXRhIGluZm9ybWF0aW9uXG4gICAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IGxpc3RfIC0gU2VhcmNoIHJlc3VsdCBsaXN0XG4gICAqIEBwcm9wZXJ0eSB7QXJyYXk8c3RyaW5nPn0gbGFuZ18gLSBTZWFyY2ggbGFuZ3VhZ2VzXG4gICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBtZXNzYWdlXyAtIFNlYXJjaCByZXN1bHQgbWVzc2FnZXNcbiAgICogQHByb3BlcnR5IHtPYmplY3R9IGluZGV4XyAtIFNlYXJjaCBpbmRleFxuICAgKiBAcHJvcGVydHkge0FycmF5PEZ1bmN0aW9uPn0gc3RhY2tfIC0gU2VhcmNoIHJlc3VsdCBzdGFja1xuICAgKiBAcHJvcGVydHkge3N0cmluZ30gdmFsdWVfIC0gTGFzdCBpbnB1dCB2YWx1ZVxuICAgKlxuICAgKiBAcGFyYW0geyhzdHJpbmd8SFRNTEVsZW1lbnQpfSBlbCAtIFNlbGVjdG9yIG9yIEhUTUwgZWxlbWVudFxuICAgKiBAcGFyYW0geyhBcnJheTxPYmplY3Q+fEZ1bmN0aW9uKX0gZGF0YSAtIEZ1bmN0aW9uIHByb3ZpZGluZyBkYXRhIG9yIGFycmF5XG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbCwgZGF0YSkge1xuICAgIGNvbnN0IHJlZiA9ICh0eXBlb2YgZWwgPT09IFwic3RyaW5nXCIpXG4gICAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpXG4gICAgICA6IGVsXG4gICAgaWYgKCEocmVmIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKVxuICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yXG4gICAgdGhpcy5lbF8gPSByZWZcblxuICAgIC8qIFJldHJpZXZlIG1ldGFkYXRhIGFuZCBsaXN0IGVsZW1lbnQgKi9cbiAgICBjb25zdCBbbWV0YSwgbGlzdF0gPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLmVsXy5jaGlsZHJlbilcblxuICAgIC8qIFNldCBkYXRhLCBtZXRhZGF0YSBhbmQgbGlzdCBlbGVtZW50cyAqL1xuICAgIHRoaXMuZGF0YV8gPSBkYXRhXG4gICAgdGhpcy5tZXRhXyA9IG1ldGFcbiAgICB0aGlzLmxpc3RfID0gbGlzdFxuXG4gICAgLyogTG9hZCBtZXNzYWdlcyBmb3IgbWV0YWRhdGEgZGlzcGxheSAqL1xuICAgIHRoaXMubWVzc2FnZV8gPSB7XG4gICAgICBwbGFjZWhvbGRlcjogdGhpcy5tZXRhXy50ZXh0Q29udGVudCxcbiAgICAgIG5vbmU6IHRyYW5zbGF0ZShcInNlYXJjaC5yZXN1bHQubm9uZVwiKSxcbiAgICAgIG9uZTogdHJhbnNsYXRlKFwic2VhcmNoLnJlc3VsdC5vbmVcIiksXG4gICAgICBvdGhlcjogdHJhbnNsYXRlKFwic2VhcmNoLnJlc3VsdC5vdGhlclwiKVxuICAgIH1cblxuICAgIC8qIE92ZXJyaWRlIHRva2VuaXplciBzZXBhcmF0b3IsIGlmIGdpdmVuICovXG4gICAgY29uc3QgdG9rZW5pemVyID0gdHJhbnNsYXRlKFwic2VhcmNoLnRva2VuaXplclwiKVxuICAgIGlmICh0b2tlbml6ZXIubGVuZ3RoKVxuICAgICAgbHVuci50b2tlbml6ZXIuc2VwYXJhdG9yID0gdG9rZW5pemVyXG5cbiAgICAvKiBMb2FkIHNlYXJjaCBsYW5ndWFnZXMgKi9cbiAgICB0aGlzLmxhbmdfID0gdHJhbnNsYXRlKFwic2VhcmNoLmxhbmd1YWdlXCIpLnNwbGl0KFwiLFwiKVxuICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgLm1hcChsYW5nID0+IGxhbmcudHJpbSgpKVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBzZWFyY2ggcmVzdWx0c1xuICAgKlxuICAgKiBAcGFyYW0ge0V2ZW50fSBldiAtIElucHV0IG9yIGZvY3VzIGV2ZW50XG4gICAqL1xuICB1cGRhdGUoZXYpIHtcblxuICAgIC8qIEluaXRpYWxpemUgaW5kZXgsIGlmIHRoaXMgaGFzIG5vdCBiZSBkb25lIHlldCAqL1xuICAgIGlmIChldi50eXBlID09PSBcImZvY3VzXCIgJiYgIXRoaXMuaW5kZXhfKSB7XG5cbiAgICAgIC8qIEluaXRpYWxpemUgaW5kZXggKi9cbiAgICAgIGNvbnN0IGluaXQgPSBkYXRhID0+IHtcblxuICAgICAgICAvKiBQcmVwcm9jZXNzIGFuZCBpbmRleCBzZWN0aW9ucyBhbmQgZG9jdW1lbnRzICovXG4gICAgICAgIHRoaXMuZG9jc18gPSBkYXRhLnJlZHVjZSgoZG9jcywgZG9jKSA9PiB7XG4gICAgICAgICAgY29uc3QgW3BhdGgsIGhhc2hdID0gZG9jLmxvY2F0aW9uLnNwbGl0KFwiI1wiKVxuXG4gICAgICAgICAgLyogQXNzb2NpYXRlIHNlY3Rpb24gd2l0aCBwYXJlbnQgZG9jdW1lbnQgKi9cbiAgICAgICAgICBpZiAoaGFzaCkge1xuICAgICAgICAgICAgZG9jLnBhcmVudCA9IGRvY3MuZ2V0KHBhdGgpXG5cbiAgICAgICAgICAgIC8qIE92ZXJyaWRlIHBhZ2UgdGl0bGUgd2l0aCBkb2N1bWVudCB0aXRsZSBpZiBmaXJzdCBzZWN0aW9uICovXG4gICAgICAgICAgICBpZiAoZG9jLnBhcmVudCAmJiAhZG9jLnBhcmVudC5kb25lKSB7XG4gICAgICAgICAgICAgIGRvYy5wYXJlbnQudGl0bGUgPSBkb2MudGl0bGVcbiAgICAgICAgICAgICAgZG9jLnBhcmVudC50ZXh0ICA9IGRvYy50ZXh0XG4gICAgICAgICAgICAgIGRvYy5wYXJlbnQuZG9uZSAgPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLyogU29tZSBjbGVhbnVwIG9uIHRoZSB0ZXh0ICovXG4gICAgICAgICAgZG9jLnRleHQgPSBkb2MudGV4dFxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcbi9nLCBcIiBcIikgICAgICAgICAgICAgICAvKiBSZW1vdmUgbmV3bGluZXMgKi9cbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXHMrL2csIFwiIFwiKSAgICAgICAgICAgICAgLyogQ29tcGFjdCB3aGl0ZXNwYWNlICovXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxzKyhbLC46OyE/XSkvZywgICAgICAgICAvKiBDb3JyZWN0IHB1bmN0dWF0aW9uICovXG4gICAgICAgICAgICAgIChfLCBjaGFyKSA9PiBjaGFyKVxuXG4gICAgICAgICAgLyogSW5kZXggc2VjdGlvbnMgYW5kIGRvY3VtZW50cywgYnV0IHNraXAgdG9wLWxldmVsIGhlYWRsaW5lICovXG4gICAgICAgICAgaWYgKCFkb2MucGFyZW50IHx8IGRvYy5wYXJlbnQudGl0bGUgIT09IGRvYy50aXRsZSlcbiAgICAgICAgICAgIGRvY3Muc2V0KGRvYy5sb2NhdGlvbiwgZG9jKVxuICAgICAgICAgIHJldHVybiBkb2NzXG4gICAgICAgIH0sIG5ldyBNYXApXG5cbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8taW52YWxpZC10aGlzICovXG4gICAgICAgIGNvbnN0IGRvY3MgPSB0aGlzLmRvY3NfLFxuICAgICAgICAgICAgICBsYW5nID0gdGhpcy5sYW5nX1xuXG4gICAgICAgIC8qIENyZWF0ZSBzdGFjayBhbmQgaW5kZXggKi9cbiAgICAgICAgdGhpcy5zdGFja18gPSBbXVxuICAgICAgICB0aGlzLmluZGV4XyA9IGx1bnIoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAvKiBSZW1vdmUgc3RlbW1lciwgYXMgaXQgY3JpcHBsZXMgc2VhcmNoIGV4cGVyaWVuY2UgKi9cbiAgICAgICAgICB0aGlzLnBpcGVsaW5lLnJlc2V0KClcbiAgICAgICAgICB0aGlzLnBpcGVsaW5lLmFkZChcbiAgICAgICAgICAgIGx1bnIudHJpbW1lcixcbiAgICAgICAgICAgIGx1bnIuc3RvcFdvcmRGaWx0ZXJcbiAgICAgICAgICApXG5cbiAgICAgICAgICAvKiBTZXQgdXAgYWx0ZXJuYXRlIHNlYXJjaCBsYW5ndWFnZXMgKi9cbiAgICAgICAgICBpZiAobGFuZy5sZW5ndGggPT09IDEgJiYgbGFuZ1swXSAhPT0gXCJlblwiKSB7XG4gICAgICAgICAgICB0aGlzLnVzZShsdW5yW2xhbmdbMF1dKVxuICAgICAgICAgIH0gZWxzZSBpZiAobGFuZy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB0aGlzLnVzZShsdW5yLm11bHRpTGFuZ3VhZ2UoLi4ubGFuZykpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLyogSW5kZXggZmllbGRzICovXG4gICAgICAgICAgdGhpcy5maWVsZChcInRpdGxlXCIsIHsgYm9vc3Q6IDEwIH0pXG4gICAgICAgICAgdGhpcy5maWVsZChcInRleHRcIilcbiAgICAgICAgICB0aGlzLnJlZihcImxvY2F0aW9uXCIpXG5cbiAgICAgICAgICAvKiBJbmRleCBkb2N1bWVudHMgKi9cbiAgICAgICAgICBkb2NzLmZvckVhY2goZG9jID0+IHRoaXMuYWRkKGRvYykpXG4gICAgICAgIH0pXG5cbiAgICAgICAgLyogUmVnaXN0ZXIgZXZlbnQgaGFuZGxlciBmb3IgbGF6eSByZW5kZXJpbmcgKi9cbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5lbF8ucGFyZW50Tm9kZVxuICAgICAgICBpZiAoIShjb250YWluZXIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpXG4gICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yXG4gICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpID0+IHtcbiAgICAgICAgICB3aGlsZSAodGhpcy5zdGFja18ubGVuZ3RoICYmIGNvbnRhaW5lci5zY3JvbGxUb3AgK1xuICAgICAgICAgICAgICBjb250YWluZXIub2Zmc2V0SGVpZ2h0ID49IGNvbnRhaW5lci5zY3JvbGxIZWlnaHQgLSAxNilcbiAgICAgICAgICAgIHRoaXMuc3RhY2tfLnNwbGljZSgwLCAxMCkuZm9yRWFjaChyZW5kZXIgPT4gcmVuZGVyKCkpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWludmFsaWQtdGhpcyAqL1xuXG4gICAgICAvKiBJbml0aWFsaXplIGluZGV4IGFmdGVyIHNob3J0IHRpbWVvdXQgdG8gYWNjb3VudCBmb3IgdHJhbnNpdGlvbiAqL1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5kYXRhXyA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgPyB0aGlzLmRhdGFfKCkudGhlbihpbml0KVxuICAgICAgICAgIDogaW5pdCh0aGlzLmRhdGFfKVxuICAgICAgfSwgMjUwKVxuXG4gICAgLyogRXhlY3V0ZSBzZWFyY2ggb24gbmV3IGlucHV0IGV2ZW50ICovXG4gICAgfSBlbHNlIGlmIChldi50eXBlID09PSBcImZvY3VzXCIgfHwgZXYudHlwZSA9PT0gXCJrZXl1cFwiKSB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBldi50YXJnZXRcbiAgICAgIGlmICghKHRhcmdldCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpKVxuICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3JcblxuICAgICAgLyogQWJvcnQgZWFybHksIGlmIGluZGV4IGlzIG5vdCBidWlsZCBvciBpbnB1dCBoYXNuJ3QgY2hhbmdlZCAqL1xuICAgICAgaWYgKCF0aGlzLmluZGV4XyB8fCB0YXJnZXQudmFsdWUgPT09IHRoaXMudmFsdWVfKVxuICAgICAgICByZXR1cm5cblxuICAgICAgLyogQ2xlYXIgY3VycmVudCBsaXN0ICovXG4gICAgICB3aGlsZSAodGhpcy5saXN0Xy5maXJzdENoaWxkKVxuICAgICAgICB0aGlzLmxpc3RfLnJlbW92ZUNoaWxkKHRoaXMubGlzdF8uZmlyc3RDaGlsZClcblxuICAgICAgLyogQWJvcnQgZWFybHksIGlmIHNlYXJjaCBpbnB1dCBpcyBlbXB0eSAqL1xuICAgICAgdGhpcy52YWx1ZV8gPSB0YXJnZXQudmFsdWVcbiAgICAgIGlmICh0aGlzLnZhbHVlXy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5tZXRhXy50ZXh0Q29udGVudCA9IHRoaXMubWVzc2FnZV8ucGxhY2Vob2xkZXJcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8qIFBlcmZvcm0gc2VhcmNoIG9uIGluZGV4IGFuZCBncm91cCBzZWN0aW9ucyBieSBkb2N1bWVudCAqL1xuICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5pbmRleF9cblxuICAgICAgICAvKiBBcHBlbmQgdHJhaWxpbmcgd2lsZGNhcmQgdG8gYWxsIHRlcm1zIGZvciBwcmVmaXggcXVlcnlpbmcgKi9cbiAgICAgICAgLnF1ZXJ5KHF1ZXJ5ID0+IHtcbiAgICAgICAgICB0aGlzLnZhbHVlXy50b0xvd2VyQ2FzZSgpLnNwbGl0KFwiIFwiKVxuICAgICAgICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgICAgICAgLmZvckVhY2godGVybSA9PiB7XG4gICAgICAgICAgICAgIHF1ZXJ5LnRlcm0odGVybSwgeyB3aWxkY2FyZDogbHVuci5RdWVyeS53aWxkY2FyZC5UUkFJTElORyB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgICAgICAvKiBQcm9jZXNzIHF1ZXJ5IHJlc3VsdHMgKi9cbiAgICAgICAgLnJlZHVjZSgoaXRlbXMsIGl0ZW0pID0+IHtcbiAgICAgICAgICBjb25zdCBkb2MgPSB0aGlzLmRvY3NfLmdldChpdGVtLnJlZilcbiAgICAgICAgICBpZiAoZG9jLnBhcmVudCkge1xuICAgICAgICAgICAgY29uc3QgcmVmID0gZG9jLnBhcmVudC5sb2NhdGlvblxuICAgICAgICAgICAgaXRlbXMuc2V0KHJlZiwgKGl0ZW1zLmdldChyZWYpIHx8IFtdKS5jb25jYXQoaXRlbSkpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHJlZiA9IGRvYy5sb2NhdGlvblxuICAgICAgICAgICAgaXRlbXMuc2V0KHJlZiwgKGl0ZW1zLmdldChyZWYpIHx8IFtdKSlcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGl0ZW1zXG4gICAgICAgIH0sIG5ldyBNYXApXG5cbiAgICAgIC8qIEFzc2VtYmxlIHJlZ3VsYXIgZXhwcmVzc2lvbnMgZm9yIG1hdGNoaW5nICovXG4gICAgICBjb25zdCBxdWVyeSA9IGVzY2FwZSh0aGlzLnZhbHVlXy50cmltKCkpLnJlcGxhY2UoXG4gICAgICAgIG5ldyBSZWdFeHAobHVuci50b2tlbml6ZXIuc2VwYXJhdG9yLCBcImltZ1wiKSwgXCJ8XCIpXG4gICAgICBjb25zdCBtYXRjaCA9XG4gICAgICAgIG5ldyBSZWdFeHAoYChefCR7bHVuci50b2tlbml6ZXIuc2VwYXJhdG9yfSkoJHtxdWVyeX0pYCwgXCJpbWdcIilcbiAgICAgIGNvbnN0IGhpZ2hsaWdodCA9IChfLCBzZXBhcmF0b3IsIHRva2VuKSA9PlxuICAgICAgICBgJHtzZXBhcmF0b3J9PGVtPiR7dG9rZW59PC9lbT5gXG5cbiAgICAgIC8qIFJlc2V0IHN0YWNrIGFuZCByZW5kZXIgcmVzdWx0cyAqL1xuICAgICAgdGhpcy5zdGFja18gPSBbXVxuICAgICAgcmVzdWx0LmZvckVhY2goKGl0ZW1zLCByZWYpID0+IHtcbiAgICAgICAgY29uc3QgZG9jID0gdGhpcy5kb2NzXy5nZXQocmVmKVxuXG4gICAgICAgIC8qIFJlbmRlciBhcnRpY2xlICovXG4gICAgICAgIGNvbnN0IGFydGljbGUgPSAoXG4gICAgICAgICAgPGxpIGNsYXNzPVwibWQtc2VhcmNoLXJlc3VsdF9faXRlbVwiPlxuICAgICAgICAgICAgPGEgaHJlZj17ZG9jLmxvY2F0aW9ufSB0aXRsZT17ZG9jLnRpdGxlfVxuICAgICAgICAgICAgICBjbGFzcz1cIm1kLXNlYXJjaC1yZXN1bHRfX2xpbmtcIj5cbiAgICAgICAgICAgICAgPGFydGljbGUgY2xhc3M9XCJtZC1zZWFyY2gtcmVzdWx0X19hcnRpY2xlXG4gICAgICAgICAgICAgICAgICAgIG1kLXNlYXJjaC1yZXN1bHRfX2FydGljbGUtLWRvY3VtZW50XCI+XG4gICAgICAgICAgICAgICAgPGgxIGNsYXNzPVwibWQtc2VhcmNoLXJlc3VsdF9fdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgIHt7IF9faHRtbDogZG9jLnRpdGxlLnJlcGxhY2UobWF0Y2gsIGhpZ2hsaWdodCkgfX1cbiAgICAgICAgICAgICAgICA8L2gxPlxuICAgICAgICAgICAgICAgIHtkb2MudGV4dC5sZW5ndGggP1xuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJtZC1zZWFyY2gtcmVzdWx0X190ZWFzZXJcIj5cbiAgICAgICAgICAgICAgICAgICAge3sgX19odG1sOiBkb2MudGV4dC5yZXBsYWNlKG1hdGNoLCBoaWdobGlnaHQpIH19XG4gICAgICAgICAgICAgICAgICA8L3A+IDoge319XG4gICAgICAgICAgICAgIDwvYXJ0aWNsZT5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICApXG5cbiAgICAgICAgLyogUmVuZGVyIHNlY3Rpb25zIGZvciBhcnRpY2xlICovXG4gICAgICAgIGNvbnN0IHNlY3Rpb25zID0gaXRlbXMubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uID0gdGhpcy5kb2NzXy5nZXQoaXRlbS5yZWYpXG4gICAgICAgICAgICBhcnRpY2xlLmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgICA8YSBocmVmPXtzZWN0aW9uLmxvY2F0aW9ufSB0aXRsZT17c2VjdGlvbi50aXRsZX1cbiAgICAgICAgICAgICAgICBjbGFzcz1cIm1kLXNlYXJjaC1yZXN1bHRfX2xpbmtcIiBkYXRhLW1kLXJlbD1cImFuY2hvclwiPlxuICAgICAgICAgICAgICAgIDxhcnRpY2xlIGNsYXNzPVwibWQtc2VhcmNoLXJlc3VsdF9fYXJ0aWNsZVwiPlxuICAgICAgICAgICAgICAgICAgPGgxIGNsYXNzPVwibWQtc2VhcmNoLXJlc3VsdF9fdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAge3sgX19odG1sOiBzZWN0aW9uLnRpdGxlLnJlcGxhY2UobWF0Y2gsIGhpZ2hsaWdodCkgfX1cbiAgICAgICAgICAgICAgICAgIDwvaDE+XG4gICAgICAgICAgICAgICAgICB7c2VjdGlvbi50ZXh0Lmxlbmd0aCA/XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwibWQtc2VhcmNoLXJlc3VsdF9fdGVhc2VyXCI+XG4gICAgICAgICAgICAgICAgICAgICAge3sgX19odG1sOiB0cnVuY2F0ZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY3Rpb24udGV4dC5yZXBsYWNlKG1hdGNoLCBoaWdobGlnaHQpLCA0MDApXG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgPC9wPiA6IHt9fVxuICAgICAgICAgICAgICAgIDwvYXJ0aWNsZT5cbiAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICAvKiBQdXNoIGFydGljbGVzIGFuZCBzZWN0aW9uIHJlbmRlcmVycyBvbnRvIHN0YWNrICovXG4gICAgICAgIHRoaXMuc3RhY2tfLnB1c2goKCkgPT4gdGhpcy5saXN0Xy5hcHBlbmRDaGlsZChhcnRpY2xlKSwgLi4uc2VjdGlvbnMpXG4gICAgICB9KVxuXG4gICAgICAvKiBHcmFkdWFsbHkgYWRkIHJlc3VsdHMgYXMgbG9uZyBhcyB0aGUgaGVpZ2h0IG9mIHRoZSBjb250YWluZXIgZ3Jvd3MgKi9cbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuZWxfLnBhcmVudE5vZGVcbiAgICAgIGlmICghKGNvbnRhaW5lciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSlcbiAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yXG4gICAgICB3aGlsZSAodGhpcy5zdGFja18ubGVuZ3RoICYmXG4gICAgICAgICAgY29udGFpbmVyLm9mZnNldEhlaWdodCA+PSBjb250YWluZXIuc2Nyb2xsSGVpZ2h0IC0gMTYpXG4gICAgICAgICh0aGlzLnN0YWNrXy5zaGlmdCgpKSgpXG5cbiAgICAgIC8qIEJpbmQgY2xpY2sgaGFuZGxlcnMgZm9yIGFuY2hvcnMgKi9cbiAgICAgIGNvbnN0IGFuY2hvcnMgPSB0aGlzLmxpc3RfLnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1tZC1yZWw9YW5jaG9yXVwiKVxuICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChhbmNob3JzLCBhbmNob3IgPT4ge1xuICAgICAgICBhbmNob3IuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2MiA9PiB7XG4gICAgICAgICAgY29uc3QgdG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLW1kLXRvZ2dsZT1zZWFyY2hdXCIpXG4gICAgICAgICAgaWYgKCEodG9nZ2xlIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3JcbiAgICAgICAgICBpZiAodG9nZ2xlLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHRvZ2dsZS5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIHRvZ2dsZS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcImNoYW5nZVwiKSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvKiBIYWNrOiBwcmV2ZW50IGRlZmF1bHQsIGFzIHRoZSBuYXZpZ2F0aW9uIG5lZWRzIHRvIGJlIGRlbGF5ZWQgZHVlXG4gICAgICAgICAgICAgdG8gdGhlIHNlYXJjaCBib2R5IGxvY2sgb24gbW9iaWxlICovXG4gICAgICAgICAgZXYyLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBhbmNob3IuaHJlZlxuICAgICAgICAgIH0sIDEwMClcbiAgICAgICAgfSlcbiAgICAgIH0pXG5cbiAgICAgIC8qIFVwZGF0ZSBzZWFyY2ggbWV0YWRhdGEgKi9cbiAgICAgIHN3aXRjaCAocmVzdWx0LnNpemUpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIHRoaXMubWV0YV8udGV4dENvbnRlbnQgPSB0aGlzLm1lc3NhZ2VfLm5vbmVcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgdGhpcy5tZXRhXy50ZXh0Q29udGVudCA9IHRoaXMubWVzc2FnZV8ub25lXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aGlzLm1ldGFfLnRleHRDb250ZW50ID1cbiAgICAgICAgICAgIHRoaXMubWVzc2FnZV8ub3RoZXIucmVwbGFjZShcIiNcIiwgcmVzdWx0LnNpemUpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvTWF0ZXJpYWwvU2VhcmNoL1Jlc3VsdC5qc3giLCIndXNlIHN0cmljdCc7XG5cbnZhciBtYXRjaE9wZXJhdG9yc1JlID0gL1t8XFxcXHt9KClbXFxdXiQrKj8uXS9nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHIpIHtcblx0aWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBzdHJpbmcnKTtcblx0fVxuXG5cdHJldHVybiBzdHIucmVwbGFjZShtYXRjaE9wZXJhdG9yc1JlLCAnXFxcXCQmJyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZXNjYXBlLXN0cmluZy1yZWdleHAvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogbHVuciAtIGh0dHA6Ly9sdW5yanMuY29tIC0gQSBiaXQgbGlrZSBTb2xyLCBidXQgbXVjaCBzbWFsbGVyIGFuZCBub3QgYXMgYnJpZ2h0IC0gMi4xLjRcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqIEBsaWNlbnNlIE1JVFxuICovXG5cbjsoZnVuY3Rpb24oKXtcblxuLyoqXG4gKiBBIGNvbnZlbmllbmNlIGZ1bmN0aW9uIGZvciBjb25maWd1cmluZyBhbmQgY29uc3RydWN0aW5nXG4gKiBhIG5ldyBsdW5yIEluZGV4LlxuICpcbiAqIEEgbHVuci5CdWlsZGVyIGluc3RhbmNlIGlzIGNyZWF0ZWQgYW5kIHRoZSBwaXBlbGluZSBzZXR1cFxuICogd2l0aCBhIHRyaW1tZXIsIHN0b3Agd29yZCBmaWx0ZXIgYW5kIHN0ZW1tZXIuXG4gKlxuICogVGhpcyBidWlsZGVyIG9iamVjdCBpcyB5aWVsZGVkIHRvIHRoZSBjb25maWd1cmF0aW9uIGZ1bmN0aW9uXG4gKiB0aGF0IGlzIHBhc3NlZCBhcyBhIHBhcmFtZXRlciwgYWxsb3dpbmcgdGhlIGxpc3Qgb2YgZmllbGRzXG4gKiBhbmQgb3RoZXIgYnVpbGRlciBwYXJhbWV0ZXJzIHRvIGJlIGN1c3RvbWlzZWQuXG4gKlxuICogQWxsIGRvY3VtZW50cyBfbXVzdF8gYmUgYWRkZWQgd2l0aGluIHRoZSBwYXNzZWQgY29uZmlnIGZ1bmN0aW9uLlxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgaWR4ID0gbHVucihmdW5jdGlvbiAoKSB7XG4gKiAgIHRoaXMuZmllbGQoJ3RpdGxlJylcbiAqICAgdGhpcy5maWVsZCgnYm9keScpXG4gKiAgIHRoaXMucmVmKCdpZCcpXG4gKlxuICogICBkb2N1bWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZG9jKSB7XG4gKiAgICAgdGhpcy5hZGQoZG9jKVxuICogICB9LCB0aGlzKVxuICogfSlcbiAqXG4gKiBAc2VlIHtAbGluayBsdW5yLkJ1aWxkZXJ9XG4gKiBAc2VlIHtAbGluayBsdW5yLlBpcGVsaW5lfVxuICogQHNlZSB7QGxpbmsgbHVuci50cmltbWVyfVxuICogQHNlZSB7QGxpbmsgbHVuci5zdG9wV29yZEZpbHRlcn1cbiAqIEBzZWUge0BsaW5rIGx1bnIuc3RlbW1lcn1cbiAqIEBuYW1lc3BhY2Uge2Z1bmN0aW9ufSBsdW5yXG4gKi9cbnZhciBsdW5yID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICB2YXIgYnVpbGRlciA9IG5ldyBsdW5yLkJ1aWxkZXJcblxuICBidWlsZGVyLnBpcGVsaW5lLmFkZChcbiAgICBsdW5yLnRyaW1tZXIsXG4gICAgbHVuci5zdG9wV29yZEZpbHRlcixcbiAgICBsdW5yLnN0ZW1tZXJcbiAgKVxuXG4gIGJ1aWxkZXIuc2VhcmNoUGlwZWxpbmUuYWRkKFxuICAgIGx1bnIuc3RlbW1lclxuICApXG5cbiAgY29uZmlnLmNhbGwoYnVpbGRlciwgYnVpbGRlcilcbiAgcmV0dXJuIGJ1aWxkZXIuYnVpbGQoKVxufVxuXG5sdW5yLnZlcnNpb24gPSBcIjIuMS40XCJcbi8qIVxuICogbHVuci51dGlsc1xuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogQSBuYW1lc3BhY2UgY29udGFpbmluZyB1dGlscyBmb3IgdGhlIHJlc3Qgb2YgdGhlIGx1bnIgbGlicmFyeVxuICovXG5sdW5yLnV0aWxzID0ge31cblxuLyoqXG4gKiBQcmludCBhIHdhcm5pbmcgbWVzc2FnZSB0byB0aGUgY29uc29sZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBiZSBwcmludGVkLlxuICogQG1lbWJlck9mIFV0aWxzXG4gKi9cbmx1bnIudXRpbHMud2FybiA9IChmdW5jdGlvbiAoZ2xvYmFsKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbiAgcmV0dXJuIGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgaWYgKGdsb2JhbC5jb25zb2xlICYmIGNvbnNvbGUud2Fybikge1xuICAgICAgY29uc29sZS53YXJuKG1lc3NhZ2UpXG4gICAgfVxuICB9XG4gIC8qIGVzbGludC1lbmFibGUgbm8tY29uc29sZSAqL1xufSkodGhpcylcblxuLyoqXG4gKiBDb252ZXJ0IGFuIG9iamVjdCB0byBhIHN0cmluZy5cbiAqXG4gKiBJbiB0aGUgY2FzZSBvZiBgbnVsbGAgYW5kIGB1bmRlZmluZWRgIHRoZSBmdW5jdGlvbiByZXR1cm5zXG4gKiB0aGUgZW1wdHkgc3RyaW5nLCBpbiBhbGwgb3RoZXIgY2FzZXMgdGhlIHJlc3VsdCBvZiBjYWxsaW5nXG4gKiBgdG9TdHJpbmdgIG9uIHRoZSBwYXNzZWQgb2JqZWN0IGlzIHJldHVybmVkLlxuICpcbiAqIEBwYXJhbSB7QW55fSBvYmogVGhlIG9iamVjdCB0byBjb252ZXJ0IHRvIGEgc3RyaW5nLlxuICogQHJldHVybiB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHBhc3NlZCBvYmplY3QuXG4gKiBAbWVtYmVyT2YgVXRpbHNcbiAqL1xubHVuci51dGlscy5hc1N0cmluZyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgaWYgKG9iaiA9PT0gdm9pZCAwIHx8IG9iaiA9PT0gbnVsbCkge1xuICAgIHJldHVybiBcIlwiXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9iai50b1N0cmluZygpXG4gIH1cbn1cbmx1bnIuRmllbGRSZWYgPSBmdW5jdGlvbiAoZG9jUmVmLCBmaWVsZE5hbWUsIHN0cmluZ1ZhbHVlKSB7XG4gIHRoaXMuZG9jUmVmID0gZG9jUmVmXG4gIHRoaXMuZmllbGROYW1lID0gZmllbGROYW1lXG4gIHRoaXMuX3N0cmluZ1ZhbHVlID0gc3RyaW5nVmFsdWVcbn1cblxubHVuci5GaWVsZFJlZi5qb2luZXIgPSBcIi9cIlxuXG5sdW5yLkZpZWxkUmVmLmZyb21TdHJpbmcgPSBmdW5jdGlvbiAocykge1xuICB2YXIgbiA9IHMuaW5kZXhPZihsdW5yLkZpZWxkUmVmLmpvaW5lcilcblxuICBpZiAobiA9PT0gLTEpIHtcbiAgICB0aHJvdyBcIm1hbGZvcm1lZCBmaWVsZCByZWYgc3RyaW5nXCJcbiAgfVxuXG4gIHZhciBmaWVsZFJlZiA9IHMuc2xpY2UoMCwgbiksXG4gICAgICBkb2NSZWYgPSBzLnNsaWNlKG4gKyAxKVxuXG4gIHJldHVybiBuZXcgbHVuci5GaWVsZFJlZiAoZG9jUmVmLCBmaWVsZFJlZiwgcylcbn1cblxubHVuci5GaWVsZFJlZi5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLl9zdHJpbmdWYWx1ZSA9PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzLl9zdHJpbmdWYWx1ZSA9IHRoaXMuZmllbGROYW1lICsgbHVuci5GaWVsZFJlZi5qb2luZXIgKyB0aGlzLmRvY1JlZlxuICB9XG5cbiAgcmV0dXJuIHRoaXMuX3N0cmluZ1ZhbHVlXG59XG4vKipcbiAqIEEgZnVuY3Rpb24gdG8gY2FsY3VsYXRlIHRoZSBpbnZlcnNlIGRvY3VtZW50IGZyZXF1ZW5jeSBmb3JcbiAqIGEgcG9zdGluZy4gVGhpcyBpcyBzaGFyZWQgYmV0d2VlbiB0aGUgYnVpbGRlciBhbmQgdGhlIGluZGV4XG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBwb3N0aW5nIC0gVGhlIHBvc3RpbmcgZm9yIGEgZ2l2ZW4gdGVybVxuICogQHBhcmFtIHtudW1iZXJ9IGRvY3VtZW50Q291bnQgLSBUaGUgdG90YWwgbnVtYmVyIG9mIGRvY3VtZW50cy5cbiAqL1xubHVuci5pZGYgPSBmdW5jdGlvbiAocG9zdGluZywgZG9jdW1lbnRDb3VudCkge1xuICB2YXIgZG9jdW1lbnRzV2l0aFRlcm0gPSAwXG5cbiAgZm9yICh2YXIgZmllbGROYW1lIGluIHBvc3RpbmcpIHtcbiAgICBpZiAoZmllbGROYW1lID09ICdfaW5kZXgnKSBjb250aW51ZSAvLyBJZ25vcmUgdGhlIHRlcm0gaW5kZXgsIGl0cyBub3QgYSBmaWVsZFxuICAgIGRvY3VtZW50c1dpdGhUZXJtICs9IE9iamVjdC5rZXlzKHBvc3RpbmdbZmllbGROYW1lXSkubGVuZ3RoXG4gIH1cblxuICB2YXIgeCA9IChkb2N1bWVudENvdW50IC0gZG9jdW1lbnRzV2l0aFRlcm0gKyAwLjUpIC8gKGRvY3VtZW50c1dpdGhUZXJtICsgMC41KVxuXG4gIHJldHVybiBNYXRoLmxvZygxICsgTWF0aC5hYnMoeCkpXG59XG5cbi8qKlxuICogQSB0b2tlbiB3cmFwcyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIHRva2VuXG4gKiBhcyBpdCBpcyBwYXNzZWQgdGhyb3VnaCB0aGUgdGV4dCBwcm9jZXNzaW5nIHBpcGVsaW5lLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtzdHJpbmd9IFtzdHI9JyddIC0gVGhlIHN0cmluZyB0b2tlbiBiZWluZyB3cmFwcGVkLlxuICogQHBhcmFtIHtvYmplY3R9IFttZXRhZGF0YT17fV0gLSBNZXRhZGF0YSBhc3NvY2lhdGVkIHdpdGggdGhpcyB0b2tlbi5cbiAqL1xubHVuci5Ub2tlbiA9IGZ1bmN0aW9uIChzdHIsIG1ldGFkYXRhKSB7XG4gIHRoaXMuc3RyID0gc3RyIHx8IFwiXCJcbiAgdGhpcy5tZXRhZGF0YSA9IG1ldGFkYXRhIHx8IHt9XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgdG9rZW4gc3RyaW5nIHRoYXQgaXMgYmVpbmcgd3JhcHBlZCBieSB0aGlzIG9iamVjdC5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5sdW5yLlRva2VuLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuc3RyXG59XG5cbi8qKlxuICogQSB0b2tlbiB1cGRhdGUgZnVuY3Rpb24gaXMgdXNlZCB3aGVuIHVwZGF0aW5nIG9yIG9wdGlvbmFsbHlcbiAqIHdoZW4gY2xvbmluZyBhIHRva2VuLlxuICpcbiAqIEBjYWxsYmFjayBsdW5yLlRva2VufnVwZGF0ZUZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gVGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgdG9rZW4uXG4gKiBAcGFyYW0ge09iamVjdH0gbWV0YWRhdGEgLSBBbGwgbWV0YWRhdGEgYXNzb2NpYXRlZCB3aXRoIHRoaXMgdG9rZW4uXG4gKi9cblxuLyoqXG4gKiBBcHBsaWVzIHRoZSBnaXZlbiBmdW5jdGlvbiB0byB0aGUgd3JhcHBlZCBzdHJpbmcgdG9rZW4uXG4gKlxuICogQGV4YW1wbGVcbiAqIHRva2VuLnVwZGF0ZShmdW5jdGlvbiAoc3RyLCBtZXRhZGF0YSkge1xuICogICByZXR1cm4gc3RyLnRvVXBwZXJDYXNlKClcbiAqIH0pXG4gKlxuICogQHBhcmFtIHtsdW5yLlRva2VufnVwZGF0ZUZ1bmN0aW9ufSBmbiAtIEEgZnVuY3Rpb24gdG8gYXBwbHkgdG8gdGhlIHRva2VuIHN0cmluZy5cbiAqIEByZXR1cm5zIHtsdW5yLlRva2VufVxuICovXG5sdW5yLlRva2VuLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZm4pIHtcbiAgdGhpcy5zdHIgPSBmbih0aGlzLnN0ciwgdGhpcy5tZXRhZGF0YSlcbiAgcmV0dXJuIHRoaXNcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgdGhpcyB0b2tlbi4gT3B0aW9uYWxseSBhIGZ1bmN0aW9uIGNhbiBiZVxuICogYXBwbGllZCB0byB0aGUgY2xvbmVkIHRva2VuLlxuICpcbiAqIEBwYXJhbSB7bHVuci5Ub2tlbn51cGRhdGVGdW5jdGlvbn0gW2ZuXSAtIEFuIG9wdGlvbmFsIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIHRoZSBjbG9uZWQgdG9rZW4uXG4gKiBAcmV0dXJucyB7bHVuci5Ub2tlbn1cbiAqL1xubHVuci5Ub2tlbi5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoZm4pIHtcbiAgZm4gPSBmbiB8fCBmdW5jdGlvbiAocykgeyByZXR1cm4gcyB9XG4gIHJldHVybiBuZXcgbHVuci5Ub2tlbiAoZm4odGhpcy5zdHIsIHRoaXMubWV0YWRhdGEpLCB0aGlzLm1ldGFkYXRhKVxufVxuLyohXG4gKiBsdW5yLnRva2VuaXplclxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogQSBmdW5jdGlvbiBmb3Igc3BsaXR0aW5nIGEgc3RyaW5nIGludG8gdG9rZW5zIHJlYWR5IHRvIGJlIGluc2VydGVkIGludG9cbiAqIHRoZSBzZWFyY2ggaW5kZXguIFVzZXMgYGx1bnIudG9rZW5pemVyLnNlcGFyYXRvcmAgdG8gc3BsaXQgc3RyaW5ncywgY2hhbmdlXG4gKiB0aGUgdmFsdWUgb2YgdGhpcyBwcm9wZXJ0eSB0byBjaGFuZ2UgaG93IHN0cmluZ3MgYXJlIHNwbGl0IGludG8gdG9rZW5zLlxuICpcbiAqIFRoaXMgdG9rZW5pemVyIHdpbGwgY29udmVydCBpdHMgcGFyYW1ldGVyIHRvIGEgc3RyaW5nIGJ5IGNhbGxpbmcgYHRvU3RyaW5nYCBhbmRcbiAqIHRoZW4gd2lsbCBzcGxpdCB0aGlzIHN0cmluZyBvbiB0aGUgY2hhcmFjdGVyIGluIGBsdW5yLnRva2VuaXplci5zZXBhcmF0b3JgLlxuICogQXJyYXlzIHdpbGwgaGF2ZSB0aGVpciBlbGVtZW50cyBjb252ZXJ0ZWQgdG8gc3RyaW5ncyBhbmQgd3JhcHBlZCBpbiBhIGx1bnIuVG9rZW4uXG4gKlxuICogQHN0YXRpY1xuICogQHBhcmFtIHs/KHN0cmluZ3xvYmplY3R8b2JqZWN0W10pfSBvYmogLSBUaGUgb2JqZWN0IHRvIGNvbnZlcnQgaW50byB0b2tlbnNcbiAqIEByZXR1cm5zIHtsdW5yLlRva2VuW119XG4gKi9cbmx1bnIudG9rZW5pemVyID0gZnVuY3Rpb24gKG9iaikge1xuICBpZiAob2JqID09IG51bGwgfHwgb2JqID09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBbXVxuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIHJldHVybiBvYmoubWFwKGZ1bmN0aW9uICh0KSB7XG4gICAgICByZXR1cm4gbmV3IGx1bnIuVG9rZW4obHVuci51dGlscy5hc1N0cmluZyh0KS50b0xvd2VyQ2FzZSgpKVxuICAgIH0pXG4gIH1cblxuICB2YXIgc3RyID0gb2JqLnRvU3RyaW5nKCkudHJpbSgpLnRvTG93ZXJDYXNlKCksXG4gICAgICBsZW4gPSBzdHIubGVuZ3RoLFxuICAgICAgdG9rZW5zID0gW11cblxuICBmb3IgKHZhciBzbGljZUVuZCA9IDAsIHNsaWNlU3RhcnQgPSAwOyBzbGljZUVuZCA8PSBsZW47IHNsaWNlRW5kKyspIHtcbiAgICB2YXIgY2hhciA9IHN0ci5jaGFyQXQoc2xpY2VFbmQpLFxuICAgICAgICBzbGljZUxlbmd0aCA9IHNsaWNlRW5kIC0gc2xpY2VTdGFydFxuXG4gICAgaWYgKChjaGFyLm1hdGNoKGx1bnIudG9rZW5pemVyLnNlcGFyYXRvcikgfHwgc2xpY2VFbmQgPT0gbGVuKSkge1xuXG4gICAgICBpZiAoc2xpY2VMZW5ndGggPiAwKSB7XG4gICAgICAgIHRva2Vucy5wdXNoKFxuICAgICAgICAgIG5ldyBsdW5yLlRva2VuIChzdHIuc2xpY2Uoc2xpY2VTdGFydCwgc2xpY2VFbmQpLCB7XG4gICAgICAgICAgICBwb3NpdGlvbjogW3NsaWNlU3RhcnQsIHNsaWNlTGVuZ3RoXSxcbiAgICAgICAgICAgIGluZGV4OiB0b2tlbnMubGVuZ3RoXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBzbGljZVN0YXJ0ID0gc2xpY2VFbmQgKyAxXG4gICAgfVxuXG4gIH1cblxuICByZXR1cm4gdG9rZW5zXG59XG5cbi8qKlxuICogVGhlIHNlcGFyYXRvciB1c2VkIHRvIHNwbGl0IGEgc3RyaW5nIGludG8gdG9rZW5zLiBPdmVycmlkZSB0aGlzIHByb3BlcnR5IHRvIGNoYW5nZSB0aGUgYmVoYXZpb3VyIG9mXG4gKiBgbHVuci50b2tlbml6ZXJgIGJlaGF2aW91ciB3aGVuIHRva2VuaXppbmcgc3RyaW5ncy4gQnkgZGVmYXVsdCB0aGlzIHNwbGl0cyBvbiB3aGl0ZXNwYWNlIGFuZCBoeXBoZW5zLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzZWUgbHVuci50b2tlbml6ZXJcbiAqL1xubHVuci50b2tlbml6ZXIuc2VwYXJhdG9yID0gL1tcXHNcXC1dKy9cbi8qIVxuICogbHVuci5QaXBlbGluZVxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogbHVuci5QaXBlbGluZXMgbWFpbnRhaW4gYW4gb3JkZXJlZCBsaXN0IG9mIGZ1bmN0aW9ucyB0byBiZSBhcHBsaWVkIHRvIGFsbFxuICogdG9rZW5zIGluIGRvY3VtZW50cyBlbnRlcmluZyB0aGUgc2VhcmNoIGluZGV4IGFuZCBxdWVyaWVzIGJlaW5nIHJhbiBhZ2FpbnN0XG4gKiB0aGUgaW5kZXguXG4gKlxuICogQW4gaW5zdGFuY2Ugb2YgbHVuci5JbmRleCBjcmVhdGVkIHdpdGggdGhlIGx1bnIgc2hvcnRjdXQgd2lsbCBjb250YWluIGFcbiAqIHBpcGVsaW5lIHdpdGggYSBzdG9wIHdvcmQgZmlsdGVyIGFuZCBhbiBFbmdsaXNoIGxhbmd1YWdlIHN0ZW1tZXIuIEV4dHJhXG4gKiBmdW5jdGlvbnMgY2FuIGJlIGFkZGVkIGJlZm9yZSBvciBhZnRlciBlaXRoZXIgb2YgdGhlc2UgZnVuY3Rpb25zIG9yIHRoZXNlXG4gKiBkZWZhdWx0IGZ1bmN0aW9ucyBjYW4gYmUgcmVtb3ZlZC5cbiAqXG4gKiBXaGVuIHJ1biB0aGUgcGlwZWxpbmUgd2lsbCBjYWxsIGVhY2ggZnVuY3Rpb24gaW4gdHVybiwgcGFzc2luZyBhIHRva2VuLCB0aGVcbiAqIGluZGV4IG9mIHRoYXQgdG9rZW4gaW4gdGhlIG9yaWdpbmFsIGxpc3Qgb2YgYWxsIHRva2VucyBhbmQgZmluYWxseSBhIGxpc3Qgb2ZcbiAqIGFsbCB0aGUgb3JpZ2luYWwgdG9rZW5zLlxuICpcbiAqIFRoZSBvdXRwdXQgb2YgZnVuY3Rpb25zIGluIHRoZSBwaXBlbGluZSB3aWxsIGJlIHBhc3NlZCB0byB0aGUgbmV4dCBmdW5jdGlvblxuICogaW4gdGhlIHBpcGVsaW5lLiBUbyBleGNsdWRlIGEgdG9rZW4gZnJvbSBlbnRlcmluZyB0aGUgaW5kZXggdGhlIGZ1bmN0aW9uXG4gKiBzaG91bGQgcmV0dXJuIHVuZGVmaW5lZCwgdGhlIHJlc3Qgb2YgdGhlIHBpcGVsaW5lIHdpbGwgbm90IGJlIGNhbGxlZCB3aXRoXG4gKiB0aGlzIHRva2VuLlxuICpcbiAqIEZvciBzZXJpYWxpc2F0aW9uIG9mIHBpcGVsaW5lcyB0byB3b3JrLCBhbGwgZnVuY3Rpb25zIHVzZWQgaW4gYW4gaW5zdGFuY2Ugb2ZcbiAqIGEgcGlwZWxpbmUgc2hvdWxkIGJlIHJlZ2lzdGVyZWQgd2l0aCBsdW5yLlBpcGVsaW5lLiBSZWdpc3RlcmVkIGZ1bmN0aW9ucyBjYW5cbiAqIHRoZW4gYmUgbG9hZGVkLiBJZiB0cnlpbmcgdG8gbG9hZCBhIHNlcmlhbGlzZWQgcGlwZWxpbmUgdGhhdCB1c2VzIGZ1bmN0aW9uc1xuICogdGhhdCBhcmUgbm90IHJlZ2lzdGVyZWQgYW4gZXJyb3Igd2lsbCBiZSB0aHJvd24uXG4gKlxuICogSWYgbm90IHBsYW5uaW5nIG9uIHNlcmlhbGlzaW5nIHRoZSBwaXBlbGluZSB0aGVuIHJlZ2lzdGVyaW5nIHBpcGVsaW5lIGZ1bmN0aW9uc1xuICogaXMgbm90IG5lY2Vzc2FyeS5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xubHVuci5QaXBlbGluZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5fc3RhY2sgPSBbXVxufVxuXG5sdW5yLlBpcGVsaW5lLnJlZ2lzdGVyZWRGdW5jdGlvbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpXG5cbi8qKlxuICogQSBwaXBlbGluZSBmdW5jdGlvbiBtYXBzIGx1bnIuVG9rZW4gdG8gbHVuci5Ub2tlbi4gQSBsdW5yLlRva2VuIGNvbnRhaW5zIHRoZSB0b2tlblxuICogc3RyaW5nIGFzIHdlbGwgYXMgYWxsIGtub3duIG1ldGFkYXRhLiBBIHBpcGVsaW5lIGZ1bmN0aW9uIGNhbiBtdXRhdGUgdGhlIHRva2VuIHN0cmluZ1xuICogb3IgbXV0YXRlIChvciBhZGQpIG1ldGFkYXRhIGZvciBhIGdpdmVuIHRva2VuLlxuICpcbiAqIEEgcGlwZWxpbmUgZnVuY3Rpb24gY2FuIGluZGljYXRlIHRoYXQgdGhlIHBhc3NlZCB0b2tlbiBzaG91bGQgYmUgZGlzY2FyZGVkIGJ5IHJldHVybmluZ1xuICogbnVsbC4gVGhpcyB0b2tlbiB3aWxsIG5vdCBiZSBwYXNzZWQgdG8gYW55IGRvd25zdHJlYW0gcGlwZWxpbmUgZnVuY3Rpb25zIGFuZCB3aWxsIG5vdCBiZVxuICogYWRkZWQgdG8gdGhlIGluZGV4LlxuICpcbiAqIE11bHRpcGxlIHRva2VucyBjYW4gYmUgcmV0dXJuZWQgYnkgcmV0dXJuaW5nIGFuIGFycmF5IG9mIHRva2Vucy4gRWFjaCB0b2tlbiB3aWxsIGJlIHBhc3NlZFxuICogdG8gYW55IGRvd25zdHJlYW0gcGlwZWxpbmUgZnVuY3Rpb25zIGFuZCBhbGwgd2lsbCByZXR1cm5lZCB0b2tlbnMgd2lsbCBiZSBhZGRlZCB0byB0aGUgaW5kZXguXG4gKlxuICogQW55IG51bWJlciBvZiBwaXBlbGluZSBmdW5jdGlvbnMgbWF5IGJlIGNoYWluZWQgdG9nZXRoZXIgdXNpbmcgYSBsdW5yLlBpcGVsaW5lLlxuICpcbiAqIEBpbnRlcmZhY2UgbHVuci5QaXBlbGluZUZ1bmN0aW9uXG4gKiBAcGFyYW0ge2x1bnIuVG9rZW59IHRva2VuIC0gQSB0b2tlbiBmcm9tIHRoZSBkb2N1bWVudCBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gaSAtIFRoZSBpbmRleCBvZiB0aGlzIHRva2VuIGluIHRoZSBjb21wbGV0ZSBsaXN0IG9mIHRva2VucyBmb3IgdGhpcyBkb2N1bWVudC9maWVsZC5cbiAqIEBwYXJhbSB7bHVuci5Ub2tlbltdfSB0b2tlbnMgLSBBbGwgdG9rZW5zIGZvciB0aGlzIGRvY3VtZW50L2ZpZWxkLlxuICogQHJldHVybnMgeyg/bHVuci5Ub2tlbnxsdW5yLlRva2VuW10pfVxuICovXG5cbi8qKlxuICogUmVnaXN0ZXIgYSBmdW5jdGlvbiB3aXRoIHRoZSBwaXBlbGluZS5cbiAqXG4gKiBGdW5jdGlvbnMgdGhhdCBhcmUgdXNlZCBpbiB0aGUgcGlwZWxpbmUgc2hvdWxkIGJlIHJlZ2lzdGVyZWQgaWYgdGhlIHBpcGVsaW5lXG4gKiBuZWVkcyB0byBiZSBzZXJpYWxpc2VkLCBvciBhIHNlcmlhbGlzZWQgcGlwZWxpbmUgbmVlZHMgdG8gYmUgbG9hZGVkLlxuICpcbiAqIFJlZ2lzdGVyaW5nIGEgZnVuY3Rpb24gZG9lcyBub3QgYWRkIGl0IHRvIGEgcGlwZWxpbmUsIGZ1bmN0aW9ucyBtdXN0IHN0aWxsIGJlXG4gKiBhZGRlZCB0byBpbnN0YW5jZXMgb2YgdGhlIHBpcGVsaW5lIGZvciB0aGVtIHRvIGJlIHVzZWQgd2hlbiBydW5uaW5nIGEgcGlwZWxpbmUuXG4gKlxuICogQHBhcmFtIHtsdW5yLlBpcGVsaW5lRnVuY3Rpb259IGZuIC0gVGhlIGZ1bmN0aW9uIHRvIGNoZWNrIGZvci5cbiAqIEBwYXJhbSB7U3RyaW5nfSBsYWJlbCAtIFRoZSBsYWJlbCB0byByZWdpc3RlciB0aGlzIGZ1bmN0aW9uIHdpdGhcbiAqL1xubHVuci5QaXBlbGluZS5yZWdpc3RlckZ1bmN0aW9uID0gZnVuY3Rpb24gKGZuLCBsYWJlbCkge1xuICBpZiAobGFiZWwgaW4gdGhpcy5yZWdpc3RlcmVkRnVuY3Rpb25zKSB7XG4gICAgbHVuci51dGlscy53YXJuKCdPdmVyd3JpdGluZyBleGlzdGluZyByZWdpc3RlcmVkIGZ1bmN0aW9uOiAnICsgbGFiZWwpXG4gIH1cblxuICBmbi5sYWJlbCA9IGxhYmVsXG4gIGx1bnIuUGlwZWxpbmUucmVnaXN0ZXJlZEZ1bmN0aW9uc1tmbi5sYWJlbF0gPSBmblxufVxuXG4vKipcbiAqIFdhcm5zIGlmIHRoZSBmdW5jdGlvbiBpcyBub3QgcmVnaXN0ZXJlZCBhcyBhIFBpcGVsaW5lIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7bHVuci5QaXBlbGluZUZ1bmN0aW9ufSBmbiAtIFRoZSBmdW5jdGlvbiB0byBjaGVjayBmb3IuXG4gKiBAcHJpdmF0ZVxuICovXG5sdW5yLlBpcGVsaW5lLndhcm5JZkZ1bmN0aW9uTm90UmVnaXN0ZXJlZCA9IGZ1bmN0aW9uIChmbikge1xuICB2YXIgaXNSZWdpc3RlcmVkID0gZm4ubGFiZWwgJiYgKGZuLmxhYmVsIGluIHRoaXMucmVnaXN0ZXJlZEZ1bmN0aW9ucylcblxuICBpZiAoIWlzUmVnaXN0ZXJlZCkge1xuICAgIGx1bnIudXRpbHMud2FybignRnVuY3Rpb24gaXMgbm90IHJlZ2lzdGVyZWQgd2l0aCBwaXBlbGluZS4gVGhpcyBtYXkgY2F1c2UgcHJvYmxlbXMgd2hlbiBzZXJpYWxpc2luZyB0aGUgaW5kZXguXFxuJywgZm4pXG4gIH1cbn1cblxuLyoqXG4gKiBMb2FkcyBhIHByZXZpb3VzbHkgc2VyaWFsaXNlZCBwaXBlbGluZS5cbiAqXG4gKiBBbGwgZnVuY3Rpb25zIHRvIGJlIGxvYWRlZCBtdXN0IGFscmVhZHkgYmUgcmVnaXN0ZXJlZCB3aXRoIGx1bnIuUGlwZWxpbmUuXG4gKiBJZiBhbnkgZnVuY3Rpb24gZnJvbSB0aGUgc2VyaWFsaXNlZCBkYXRhIGhhcyBub3QgYmVlbiByZWdpc3RlcmVkIHRoZW4gYW5cbiAqIGVycm9yIHdpbGwgYmUgdGhyb3duLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXJpYWxpc2VkIC0gVGhlIHNlcmlhbGlzZWQgcGlwZWxpbmUgdG8gbG9hZC5cbiAqIEByZXR1cm5zIHtsdW5yLlBpcGVsaW5lfVxuICovXG5sdW5yLlBpcGVsaW5lLmxvYWQgPSBmdW5jdGlvbiAoc2VyaWFsaXNlZCkge1xuICB2YXIgcGlwZWxpbmUgPSBuZXcgbHVuci5QaXBlbGluZVxuXG4gIHNlcmlhbGlzZWQuZm9yRWFjaChmdW5jdGlvbiAoZm5OYW1lKSB7XG4gICAgdmFyIGZuID0gbHVuci5QaXBlbGluZS5yZWdpc3RlcmVkRnVuY3Rpb25zW2ZuTmFtZV1cblxuICAgIGlmIChmbikge1xuICAgICAgcGlwZWxpbmUuYWRkKGZuKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBsb2FkIHVucmVnaXN0ZXJlZCBmdW5jdGlvbjogJyArIGZuTmFtZSlcbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIHBpcGVsaW5lXG59XG5cbi8qKlxuICogQWRkcyBuZXcgZnVuY3Rpb25zIHRvIHRoZSBlbmQgb2YgdGhlIHBpcGVsaW5lLlxuICpcbiAqIExvZ3MgYSB3YXJuaW5nIGlmIHRoZSBmdW5jdGlvbiBoYXMgbm90IGJlZW4gcmVnaXN0ZXJlZC5cbiAqXG4gKiBAcGFyYW0ge2x1bnIuUGlwZWxpbmVGdW5jdGlvbltdfSBmdW5jdGlvbnMgLSBBbnkgbnVtYmVyIG9mIGZ1bmN0aW9ucyB0byBhZGQgdG8gdGhlIHBpcGVsaW5lLlxuICovXG5sdW5yLlBpcGVsaW5lLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBmbnMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpXG5cbiAgZm5zLmZvckVhY2goZnVuY3Rpb24gKGZuKSB7XG4gICAgbHVuci5QaXBlbGluZS53YXJuSWZGdW5jdGlvbk5vdFJlZ2lzdGVyZWQoZm4pXG4gICAgdGhpcy5fc3RhY2sucHVzaChmbilcbiAgfSwgdGhpcylcbn1cblxuLyoqXG4gKiBBZGRzIGEgc2luZ2xlIGZ1bmN0aW9uIGFmdGVyIGEgZnVuY3Rpb24gdGhhdCBhbHJlYWR5IGV4aXN0cyBpbiB0aGVcbiAqIHBpcGVsaW5lLlxuICpcbiAqIExvZ3MgYSB3YXJuaW5nIGlmIHRoZSBmdW5jdGlvbiBoYXMgbm90IGJlZW4gcmVnaXN0ZXJlZC5cbiAqXG4gKiBAcGFyYW0ge2x1bnIuUGlwZWxpbmVGdW5jdGlvbn0gZXhpc3RpbmdGbiAtIEEgZnVuY3Rpb24gdGhhdCBhbHJlYWR5IGV4aXN0cyBpbiB0aGUgcGlwZWxpbmUuXG4gKiBAcGFyYW0ge2x1bnIuUGlwZWxpbmVGdW5jdGlvbn0gbmV3Rm4gLSBUaGUgbmV3IGZ1bmN0aW9uIHRvIGFkZCB0byB0aGUgcGlwZWxpbmUuXG4gKi9cbmx1bnIuUGlwZWxpbmUucHJvdG90eXBlLmFmdGVyID0gZnVuY3Rpb24gKGV4aXN0aW5nRm4sIG5ld0ZuKSB7XG4gIGx1bnIuUGlwZWxpbmUud2FybklmRnVuY3Rpb25Ob3RSZWdpc3RlcmVkKG5ld0ZuKVxuXG4gIHZhciBwb3MgPSB0aGlzLl9zdGFjay5pbmRleE9mKGV4aXN0aW5nRm4pXG4gIGlmIChwb3MgPT0gLTEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBmaW5kIGV4aXN0aW5nRm4nKVxuICB9XG5cbiAgcG9zID0gcG9zICsgMVxuICB0aGlzLl9zdGFjay5zcGxpY2UocG9zLCAwLCBuZXdGbilcbn1cblxuLyoqXG4gKiBBZGRzIGEgc2luZ2xlIGZ1bmN0aW9uIGJlZm9yZSBhIGZ1bmN0aW9uIHRoYXQgYWxyZWFkeSBleGlzdHMgaW4gdGhlXG4gKiBwaXBlbGluZS5cbiAqXG4gKiBMb2dzIGEgd2FybmluZyBpZiB0aGUgZnVuY3Rpb24gaGFzIG5vdCBiZWVuIHJlZ2lzdGVyZWQuXG4gKlxuICogQHBhcmFtIHtsdW5yLlBpcGVsaW5lRnVuY3Rpb259IGV4aXN0aW5nRm4gLSBBIGZ1bmN0aW9uIHRoYXQgYWxyZWFkeSBleGlzdHMgaW4gdGhlIHBpcGVsaW5lLlxuICogQHBhcmFtIHtsdW5yLlBpcGVsaW5lRnVuY3Rpb259IG5ld0ZuIC0gVGhlIG5ldyBmdW5jdGlvbiB0byBhZGQgdG8gdGhlIHBpcGVsaW5lLlxuICovXG5sdW5yLlBpcGVsaW5lLnByb3RvdHlwZS5iZWZvcmUgPSBmdW5jdGlvbiAoZXhpc3RpbmdGbiwgbmV3Rm4pIHtcbiAgbHVuci5QaXBlbGluZS53YXJuSWZGdW5jdGlvbk5vdFJlZ2lzdGVyZWQobmV3Rm4pXG5cbiAgdmFyIHBvcyA9IHRoaXMuX3N0YWNrLmluZGV4T2YoZXhpc3RpbmdGbilcbiAgaWYgKHBvcyA9PSAtMSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGZpbmQgZXhpc3RpbmdGbicpXG4gIH1cblxuICB0aGlzLl9zdGFjay5zcGxpY2UocG9zLCAwLCBuZXdGbilcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGEgZnVuY3Rpb24gZnJvbSB0aGUgcGlwZWxpbmUuXG4gKlxuICogQHBhcmFtIHtsdW5yLlBpcGVsaW5lRnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byByZW1vdmUgZnJvbSB0aGUgcGlwZWxpbmUuXG4gKi9cbmx1bnIuUGlwZWxpbmUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChmbikge1xuICB2YXIgcG9zID0gdGhpcy5fc3RhY2suaW5kZXhPZihmbilcbiAgaWYgKHBvcyA9PSAtMSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdGhpcy5fc3RhY2suc3BsaWNlKHBvcywgMSlcbn1cblxuLyoqXG4gKiBSdW5zIHRoZSBjdXJyZW50IGxpc3Qgb2YgZnVuY3Rpb25zIHRoYXQgbWFrZSB1cCB0aGUgcGlwZWxpbmUgYWdhaW5zdCB0aGVcbiAqIHBhc3NlZCB0b2tlbnMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gdG9rZW5zIFRoZSB0b2tlbnMgdG8gcnVuIHRocm91Z2ggdGhlIHBpcGVsaW5lLlxuICogQHJldHVybnMge0FycmF5fVxuICovXG5sdW5yLlBpcGVsaW5lLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAodG9rZW5zKSB7XG4gIHZhciBzdGFja0xlbmd0aCA9IHRoaXMuX3N0YWNrLmxlbmd0aFxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RhY2tMZW5ndGg7IGkrKykge1xuICAgIHZhciBmbiA9IHRoaXMuX3N0YWNrW2ldXG5cbiAgICB0b2tlbnMgPSB0b2tlbnMucmVkdWNlKGZ1bmN0aW9uIChtZW1vLCB0b2tlbiwgaikge1xuICAgICAgdmFyIHJlc3VsdCA9IGZuKHRva2VuLCBqLCB0b2tlbnMpXG5cbiAgICAgIGlmIChyZXN1bHQgPT09IHZvaWQgMCB8fCByZXN1bHQgPT09ICcnKSByZXR1cm4gbWVtb1xuXG4gICAgICByZXR1cm4gbWVtby5jb25jYXQocmVzdWx0KVxuICAgIH0sIFtdKVxuICB9XG5cbiAgcmV0dXJuIHRva2Vuc1xufVxuXG4vKipcbiAqIENvbnZlbmllbmNlIG1ldGhvZCBmb3IgcGFzc2luZyBhIHN0cmluZyB0aHJvdWdoIGEgcGlwZWxpbmUgYW5kIGdldHRpbmdcbiAqIHN0cmluZ3Mgb3V0LiBUaGlzIG1ldGhvZCB0YWtlcyBjYXJlIG9mIHdyYXBwaW5nIHRoZSBwYXNzZWQgc3RyaW5nIGluIGFcbiAqIHRva2VuIGFuZCBtYXBwaW5nIHRoZSByZXN1bHRpbmcgdG9rZW5zIGJhY2sgdG8gc3RyaW5ncy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gVGhlIHN0cmluZyB0byBwYXNzIHRocm91Z2ggdGhlIHBpcGVsaW5lLlxuICogQHJldHVybnMge3N0cmluZ1tdfVxuICovXG5sdW5yLlBpcGVsaW5lLnByb3RvdHlwZS5ydW5TdHJpbmcgPSBmdW5jdGlvbiAoc3RyKSB7XG4gIHZhciB0b2tlbiA9IG5ldyBsdW5yLlRva2VuIChzdHIpXG5cbiAgcmV0dXJuIHRoaXMucnVuKFt0b2tlbl0pLm1hcChmdW5jdGlvbiAodCkge1xuICAgIHJldHVybiB0LnRvU3RyaW5nKClcbiAgfSlcbn1cblxuLyoqXG4gKiBSZXNldHMgdGhlIHBpcGVsaW5lIGJ5IHJlbW92aW5nIGFueSBleGlzdGluZyBwcm9jZXNzb3JzLlxuICpcbiAqL1xubHVuci5QaXBlbGluZS5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX3N0YWNrID0gW11cbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgcmVwcmVzZW50YXRpb24gb2YgdGhlIHBpcGVsaW5lIHJlYWR5IGZvciBzZXJpYWxpc2F0aW9uLlxuICpcbiAqIExvZ3MgYSB3YXJuaW5nIGlmIHRoZSBmdW5jdGlvbiBoYXMgbm90IGJlZW4gcmVnaXN0ZXJlZC5cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbmx1bnIuUGlwZWxpbmUucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuX3N0YWNrLm1hcChmdW5jdGlvbiAoZm4pIHtcbiAgICBsdW5yLlBpcGVsaW5lLndhcm5JZkZ1bmN0aW9uTm90UmVnaXN0ZXJlZChmbilcblxuICAgIHJldHVybiBmbi5sYWJlbFxuICB9KVxufVxuLyohXG4gKiBsdW5yLlZlY3RvclxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogQSB2ZWN0b3IgaXMgdXNlZCB0byBjb25zdHJ1Y3QgdGhlIHZlY3RvciBzcGFjZSBvZiBkb2N1bWVudHMgYW5kIHF1ZXJpZXMuIFRoZXNlXG4gKiB2ZWN0b3JzIHN1cHBvcnQgb3BlcmF0aW9ucyB0byBkZXRlcm1pbmUgdGhlIHNpbWlsYXJpdHkgYmV0d2VlbiB0d28gZG9jdW1lbnRzIG9yXG4gKiBhIGRvY3VtZW50IGFuZCBhIHF1ZXJ5LlxuICpcbiAqIE5vcm1hbGx5IG5vIHBhcmFtZXRlcnMgYXJlIHJlcXVpcmVkIGZvciBpbml0aWFsaXppbmcgYSB2ZWN0b3IsIGJ1dCBpbiB0aGUgY2FzZSBvZlxuICogbG9hZGluZyBhIHByZXZpb3VzbHkgZHVtcGVkIHZlY3RvciB0aGUgcmF3IGVsZW1lbnRzIGNhbiBiZSBwcm92aWRlZCB0byB0aGUgY29uc3RydWN0b3IuXG4gKlxuICogRm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMgdmVjdG9ycyBhcmUgaW1wbGVtZW50ZWQgd2l0aCBhIGZsYXQgYXJyYXksIHdoZXJlIGFuIGVsZW1lbnRzXG4gKiBpbmRleCBpcyBpbW1lZGlhdGVseSBmb2xsb3dlZCBieSBpdHMgdmFsdWUuIEUuZy4gW2luZGV4LCB2YWx1ZSwgaW5kZXgsIHZhbHVlXS4gVGhpc1xuICogYWxsb3dzIHRoZSB1bmRlcmx5aW5nIGFycmF5IHRvIGJlIGFzIHNwYXJzZSBhcyBwb3NzaWJsZSBhbmQgc3RpbGwgb2ZmZXIgZGVjZW50XG4gKiBwZXJmb3JtYW5jZSB3aGVuIGJlaW5nIHVzZWQgZm9yIHZlY3RvciBjYWxjdWxhdGlvbnMuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge051bWJlcltdfSBbZWxlbWVudHNdIC0gVGhlIGZsYXQgbGlzdCBvZiBlbGVtZW50IGluZGV4IGFuZCBlbGVtZW50IHZhbHVlIHBhaXJzLlxuICovXG5sdW5yLlZlY3RvciA9IGZ1bmN0aW9uIChlbGVtZW50cykge1xuICB0aGlzLl9tYWduaXR1ZGUgPSAwXG4gIHRoaXMuZWxlbWVudHMgPSBlbGVtZW50cyB8fCBbXVxufVxuXG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgcG9zaXRpb24gd2l0aGluIHRoZSB2ZWN0b3IgdG8gaW5zZXJ0IGEgZ2l2ZW4gaW5kZXguXG4gKlxuICogVGhpcyBpcyB1c2VkIGludGVybmFsbHkgYnkgaW5zZXJ0IGFuZCB1cHNlcnQuIElmIHRoZXJlIGFyZSBkdXBsaWNhdGUgaW5kZXhlcyB0aGVuXG4gKiB0aGUgcG9zaXRpb24gaXMgcmV0dXJuZWQgYXMgaWYgdGhlIHZhbHVlIGZvciB0aGF0IGluZGV4IHdlcmUgdG8gYmUgdXBkYXRlZCwgYnV0IGl0XG4gKiBpcyB0aGUgY2FsbGVycyByZXNwb25zaWJpbGl0eSB0byBjaGVjayB3aGV0aGVyIHRoZXJlIGlzIGEgZHVwbGljYXRlIGF0IHRoYXQgaW5kZXhcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaW5zZXJ0SWR4IC0gVGhlIGluZGV4IGF0IHdoaWNoIHRoZSBlbGVtZW50IHNob3VsZCBiZSBpbnNlcnRlZC5cbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKi9cbmx1bnIuVmVjdG9yLnByb3RvdHlwZS5wb3NpdGlvbkZvckluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gIC8vIEZvciBhbiBlbXB0eSB2ZWN0b3IgdGhlIHR1cGxlIGNhbiBiZSBpbnNlcnRlZCBhdCB0aGUgYmVnaW5uaW5nXG4gIGlmICh0aGlzLmVsZW1lbnRzLmxlbmd0aCA9PSAwKSB7XG4gICAgcmV0dXJuIDBcbiAgfVxuXG4gIHZhciBzdGFydCA9IDAsXG4gICAgICBlbmQgPSB0aGlzLmVsZW1lbnRzLmxlbmd0aCAvIDIsXG4gICAgICBzbGljZUxlbmd0aCA9IGVuZCAtIHN0YXJ0LFxuICAgICAgcGl2b3RQb2ludCA9IE1hdGguZmxvb3Ioc2xpY2VMZW5ndGggLyAyKSxcbiAgICAgIHBpdm90SW5kZXggPSB0aGlzLmVsZW1lbnRzW3Bpdm90UG9pbnQgKiAyXVxuXG4gIHdoaWxlIChzbGljZUxlbmd0aCA+IDEpIHtcbiAgICBpZiAocGl2b3RJbmRleCA8IGluZGV4KSB7XG4gICAgICBzdGFydCA9IHBpdm90UG9pbnRcbiAgICB9XG5cbiAgICBpZiAocGl2b3RJbmRleCA+IGluZGV4KSB7XG4gICAgICBlbmQgPSBwaXZvdFBvaW50XG4gICAgfVxuXG4gICAgaWYgKHBpdm90SW5kZXggPT0gaW5kZXgpIHtcbiAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgc2xpY2VMZW5ndGggPSBlbmQgLSBzdGFydFxuICAgIHBpdm90UG9pbnQgPSBzdGFydCArIE1hdGguZmxvb3Ioc2xpY2VMZW5ndGggLyAyKVxuICAgIHBpdm90SW5kZXggPSB0aGlzLmVsZW1lbnRzW3Bpdm90UG9pbnQgKiAyXVxuICB9XG5cbiAgaWYgKHBpdm90SW5kZXggPT0gaW5kZXgpIHtcbiAgICByZXR1cm4gcGl2b3RQb2ludCAqIDJcbiAgfVxuXG4gIGlmIChwaXZvdEluZGV4ID4gaW5kZXgpIHtcbiAgICByZXR1cm4gcGl2b3RQb2ludCAqIDJcbiAgfVxuXG4gIGlmIChwaXZvdEluZGV4IDwgaW5kZXgpIHtcbiAgICByZXR1cm4gKHBpdm90UG9pbnQgKyAxKSAqIDJcbiAgfVxufVxuXG4vKipcbiAqIEluc2VydHMgYW4gZWxlbWVudCBhdCBhbiBpbmRleCB3aXRoaW4gdGhlIHZlY3Rvci5cbiAqXG4gKiBEb2VzIG5vdCBhbGxvdyBkdXBsaWNhdGVzLCB3aWxsIHRocm93IGFuIGVycm9yIGlmIHRoZXJlIGlzIGFscmVhZHkgYW4gZW50cnlcbiAqIGZvciB0aGlzIGluZGV4LlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpbnNlcnRJZHggLSBUaGUgaW5kZXggYXQgd2hpY2ggdGhlIGVsZW1lbnQgc2hvdWxkIGJlIGluc2VydGVkLlxuICogQHBhcmFtIHtOdW1iZXJ9IHZhbCAtIFRoZSB2YWx1ZSB0byBiZSBpbnNlcnRlZCBpbnRvIHRoZSB2ZWN0b3IuXG4gKi9cbmx1bnIuVmVjdG9yLnByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbiAoaW5zZXJ0SWR4LCB2YWwpIHtcbiAgdGhpcy51cHNlcnQoaW5zZXJ0SWR4LCB2YWwsIGZ1bmN0aW9uICgpIHtcbiAgICB0aHJvdyBcImR1cGxpY2F0ZSBpbmRleFwiXG4gIH0pXG59XG5cbi8qKlxuICogSW5zZXJ0cyBvciB1cGRhdGVzIGFuIGV4aXN0aW5nIGluZGV4IHdpdGhpbiB0aGUgdmVjdG9yLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpbnNlcnRJZHggLSBUaGUgaW5kZXggYXQgd2hpY2ggdGhlIGVsZW1lbnQgc2hvdWxkIGJlIGluc2VydGVkLlxuICogQHBhcmFtIHtOdW1iZXJ9IHZhbCAtIFRoZSB2YWx1ZSB0byBiZSBpbnNlcnRlZCBpbnRvIHRoZSB2ZWN0b3IuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmbiAtIEEgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgZm9yIHVwZGF0ZXMsIHRoZSBleGlzdGluZyB2YWx1ZSBhbmQgdGhlXG4gKiByZXF1ZXN0ZWQgdmFsdWUgYXJlIHBhc3NlZCBhcyBhcmd1bWVudHNcbiAqL1xubHVuci5WZWN0b3IucHJvdG90eXBlLnVwc2VydCA9IGZ1bmN0aW9uIChpbnNlcnRJZHgsIHZhbCwgZm4pIHtcbiAgdGhpcy5fbWFnbml0dWRlID0gMFxuICB2YXIgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uRm9ySW5kZXgoaW5zZXJ0SWR4KVxuXG4gIGlmICh0aGlzLmVsZW1lbnRzW3Bvc2l0aW9uXSA9PSBpbnNlcnRJZHgpIHtcbiAgICB0aGlzLmVsZW1lbnRzW3Bvc2l0aW9uICsgMV0gPSBmbih0aGlzLmVsZW1lbnRzW3Bvc2l0aW9uICsgMV0sIHZhbClcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmVsZW1lbnRzLnNwbGljZShwb3NpdGlvbiwgMCwgaW5zZXJ0SWR4LCB2YWwpXG4gIH1cbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBtYWduaXR1ZGUgb2YgdGhpcyB2ZWN0b3IuXG4gKlxuICogQHJldHVybnMge051bWJlcn1cbiAqL1xubHVuci5WZWN0b3IucHJvdG90eXBlLm1hZ25pdHVkZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuX21hZ25pdHVkZSkgcmV0dXJuIHRoaXMuX21hZ25pdHVkZVxuXG4gIHZhciBzdW1PZlNxdWFyZXMgPSAwLFxuICAgICAgZWxlbWVudHNMZW5ndGggPSB0aGlzLmVsZW1lbnRzLmxlbmd0aFxuXG4gIGZvciAodmFyIGkgPSAxOyBpIDwgZWxlbWVudHNMZW5ndGg7IGkgKz0gMikge1xuICAgIHZhciB2YWwgPSB0aGlzLmVsZW1lbnRzW2ldXG4gICAgc3VtT2ZTcXVhcmVzICs9IHZhbCAqIHZhbFxuICB9XG5cbiAgcmV0dXJuIHRoaXMuX21hZ25pdHVkZSA9IE1hdGguc3FydChzdW1PZlNxdWFyZXMpXG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3Qgb2YgdGhpcyB2ZWN0b3IgYW5kIGFub3RoZXIgdmVjdG9yLlxuICpcbiAqIEBwYXJhbSB7bHVuci5WZWN0b3J9IG90aGVyVmVjdG9yIC0gVGhlIHZlY3RvciB0byBjb21wdXRlIHRoZSBkb3QgcHJvZHVjdCB3aXRoLlxuICogQHJldHVybnMge051bWJlcn1cbiAqL1xubHVuci5WZWN0b3IucHJvdG90eXBlLmRvdCA9IGZ1bmN0aW9uIChvdGhlclZlY3Rvcikge1xuICB2YXIgZG90UHJvZHVjdCA9IDAsXG4gICAgICBhID0gdGhpcy5lbGVtZW50cywgYiA9IG90aGVyVmVjdG9yLmVsZW1lbnRzLFxuICAgICAgYUxlbiA9IGEubGVuZ3RoLCBiTGVuID0gYi5sZW5ndGgsXG4gICAgICBhVmFsID0gMCwgYlZhbCA9IDAsXG4gICAgICBpID0gMCwgaiA9IDBcblxuICB3aGlsZSAoaSA8IGFMZW4gJiYgaiA8IGJMZW4pIHtcbiAgICBhVmFsID0gYVtpXSwgYlZhbCA9IGJbal1cbiAgICBpZiAoYVZhbCA8IGJWYWwpIHtcbiAgICAgIGkgKz0gMlxuICAgIH0gZWxzZSBpZiAoYVZhbCA+IGJWYWwpIHtcbiAgICAgIGogKz0gMlxuICAgIH0gZWxzZSBpZiAoYVZhbCA9PSBiVmFsKSB7XG4gICAgICBkb3RQcm9kdWN0ICs9IGFbaSArIDFdICogYltqICsgMV1cbiAgICAgIGkgKz0gMlxuICAgICAgaiArPSAyXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRvdFByb2R1Y3Rcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBjb3NpbmUgc2ltaWxhcml0eSBiZXR3ZWVuIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyXG4gKiB2ZWN0b3IuXG4gKlxuICogQHBhcmFtIHtsdW5yLlZlY3Rvcn0gb3RoZXJWZWN0b3IgLSBUaGUgb3RoZXIgdmVjdG9yIHRvIGNhbGN1bGF0ZSB0aGVcbiAqIHNpbWlsYXJpdHkgd2l0aC5cbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKi9cbmx1bnIuVmVjdG9yLnByb3RvdHlwZS5zaW1pbGFyaXR5ID0gZnVuY3Rpb24gKG90aGVyVmVjdG9yKSB7XG4gIHJldHVybiB0aGlzLmRvdChvdGhlclZlY3RvcikgLyAodGhpcy5tYWduaXR1ZGUoKSAqIG90aGVyVmVjdG9yLm1hZ25pdHVkZSgpKVxufVxuXG4vKipcbiAqIENvbnZlcnRzIHRoZSB2ZWN0b3IgdG8gYW4gYXJyYXkgb2YgdGhlIGVsZW1lbnRzIHdpdGhpbiB0aGUgdmVjdG9yLlxuICpcbiAqIEByZXR1cm5zIHtOdW1iZXJbXX1cbiAqL1xubHVuci5WZWN0b3IucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBvdXRwdXQgPSBuZXcgQXJyYXkgKHRoaXMuZWxlbWVudHMubGVuZ3RoIC8gMilcblxuICBmb3IgKHZhciBpID0gMSwgaiA9IDA7IGkgPCB0aGlzLmVsZW1lbnRzLmxlbmd0aDsgaSArPSAyLCBqKyspIHtcbiAgICBvdXRwdXRbal0gPSB0aGlzLmVsZW1lbnRzW2ldXG4gIH1cblxuICByZXR1cm4gb3V0cHV0XG59XG5cbi8qKlxuICogQSBKU09OIHNlcmlhbGl6YWJsZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmVjdG9yLlxuICpcbiAqIEByZXR1cm5zIHtOdW1iZXJbXX1cbiAqL1xubHVuci5WZWN0b3IucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuZWxlbWVudHNcbn1cbi8qIGVzbGludC1kaXNhYmxlICovXG4vKiFcbiAqIGx1bnIuc3RlbW1lclxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICogSW5jbHVkZXMgY29kZSBmcm9tIC0gaHR0cDovL3RhcnRhcnVzLm9yZy9+bWFydGluL1BvcnRlclN0ZW1tZXIvanMudHh0XG4gKi9cblxuLyoqXG4gKiBsdW5yLnN0ZW1tZXIgaXMgYW4gZW5nbGlzaCBsYW5ndWFnZSBzdGVtbWVyLCB0aGlzIGlzIGEgSmF2YVNjcmlwdFxuICogaW1wbGVtZW50YXRpb24gb2YgdGhlIFBvcnRlclN0ZW1tZXIgdGFrZW4gZnJvbSBodHRwOi8vdGFydGFydXMub3JnL35tYXJ0aW5cbiAqXG4gKiBAc3RhdGljXG4gKiBAaW1wbGVtZW50cyB7bHVuci5QaXBlbGluZUZ1bmN0aW9ufVxuICogQHBhcmFtIHtsdW5yLlRva2VufSB0b2tlbiAtIFRoZSBzdHJpbmcgdG8gc3RlbVxuICogQHJldHVybnMge2x1bnIuVG9rZW59XG4gKiBAc2VlIHtAbGluayBsdW5yLlBpcGVsaW5lfVxuICovXG5sdW5yLnN0ZW1tZXIgPSAoZnVuY3Rpb24oKXtcbiAgdmFyIHN0ZXAybGlzdCA9IHtcbiAgICAgIFwiYXRpb25hbFwiIDogXCJhdGVcIixcbiAgICAgIFwidGlvbmFsXCIgOiBcInRpb25cIixcbiAgICAgIFwiZW5jaVwiIDogXCJlbmNlXCIsXG4gICAgICBcImFuY2lcIiA6IFwiYW5jZVwiLFxuICAgICAgXCJpemVyXCIgOiBcIml6ZVwiLFxuICAgICAgXCJibGlcIiA6IFwiYmxlXCIsXG4gICAgICBcImFsbGlcIiA6IFwiYWxcIixcbiAgICAgIFwiZW50bGlcIiA6IFwiZW50XCIsXG4gICAgICBcImVsaVwiIDogXCJlXCIsXG4gICAgICBcIm91c2xpXCIgOiBcIm91c1wiLFxuICAgICAgXCJpemF0aW9uXCIgOiBcIml6ZVwiLFxuICAgICAgXCJhdGlvblwiIDogXCJhdGVcIixcbiAgICAgIFwiYXRvclwiIDogXCJhdGVcIixcbiAgICAgIFwiYWxpc21cIiA6IFwiYWxcIixcbiAgICAgIFwiaXZlbmVzc1wiIDogXCJpdmVcIixcbiAgICAgIFwiZnVsbmVzc1wiIDogXCJmdWxcIixcbiAgICAgIFwib3VzbmVzc1wiIDogXCJvdXNcIixcbiAgICAgIFwiYWxpdGlcIiA6IFwiYWxcIixcbiAgICAgIFwiaXZpdGlcIiA6IFwiaXZlXCIsXG4gICAgICBcImJpbGl0aVwiIDogXCJibGVcIixcbiAgICAgIFwibG9naVwiIDogXCJsb2dcIlxuICAgIH0sXG5cbiAgICBzdGVwM2xpc3QgPSB7XG4gICAgICBcImljYXRlXCIgOiBcImljXCIsXG4gICAgICBcImF0aXZlXCIgOiBcIlwiLFxuICAgICAgXCJhbGl6ZVwiIDogXCJhbFwiLFxuICAgICAgXCJpY2l0aVwiIDogXCJpY1wiLFxuICAgICAgXCJpY2FsXCIgOiBcImljXCIsXG4gICAgICBcImZ1bFwiIDogXCJcIixcbiAgICAgIFwibmVzc1wiIDogXCJcIlxuICAgIH0sXG5cbiAgICBjID0gXCJbXmFlaW91XVwiLCAgICAgICAgICAvLyBjb25zb25hbnRcbiAgICB2ID0gXCJbYWVpb3V5XVwiLCAgICAgICAgICAvLyB2b3dlbFxuICAgIEMgPSBjICsgXCJbXmFlaW91eV0qXCIsICAgIC8vIGNvbnNvbmFudCBzZXF1ZW5jZVxuICAgIFYgPSB2ICsgXCJbYWVpb3VdKlwiLCAgICAgIC8vIHZvd2VsIHNlcXVlbmNlXG5cbiAgICBtZ3IwID0gXCJeKFwiICsgQyArIFwiKT9cIiArIFYgKyBDLCAgICAgICAgICAgICAgIC8vIFtDXVZDLi4uIGlzIG0+MFxuICAgIG1lcTEgPSBcIl4oXCIgKyBDICsgXCIpP1wiICsgViArIEMgKyBcIihcIiArIFYgKyBcIik/JFwiLCAgLy8gW0NdVkNbVl0gaXMgbT0xXG4gICAgbWdyMSA9IFwiXihcIiArIEMgKyBcIik/XCIgKyBWICsgQyArIFYgKyBDLCAgICAgICAvLyBbQ11WQ1ZDLi4uIGlzIG0+MVxuICAgIHNfdiA9IFwiXihcIiArIEMgKyBcIik/XCIgKyB2OyAgICAgICAgICAgICAgICAgICAvLyB2b3dlbCBpbiBzdGVtXG5cbiAgdmFyIHJlX21ncjAgPSBuZXcgUmVnRXhwKG1ncjApO1xuICB2YXIgcmVfbWdyMSA9IG5ldyBSZWdFeHAobWdyMSk7XG4gIHZhciByZV9tZXExID0gbmV3IFJlZ0V4cChtZXExKTtcbiAgdmFyIHJlX3NfdiA9IG5ldyBSZWdFeHAoc192KTtcblxuICB2YXIgcmVfMWEgPSAvXiguKz8pKHNzfGkpZXMkLztcbiAgdmFyIHJlMl8xYSA9IC9eKC4rPykoW15zXSlzJC87XG4gIHZhciByZV8xYiA9IC9eKC4rPyllZWQkLztcbiAgdmFyIHJlMl8xYiA9IC9eKC4rPykoZWR8aW5nKSQvO1xuICB2YXIgcmVfMWJfMiA9IC8uJC87XG4gIHZhciByZTJfMWJfMiA9IC8oYXR8Ymx8aXopJC87XG4gIHZhciByZTNfMWJfMiA9IG5ldyBSZWdFeHAoXCIoW15hZWlvdXlsc3pdKVxcXFwxJFwiKTtcbiAgdmFyIHJlNF8xYl8yID0gbmV3IFJlZ0V4cChcIl5cIiArIEMgKyB2ICsgXCJbXmFlaW91d3h5XSRcIik7XG5cbiAgdmFyIHJlXzFjID0gL14oLis/W15hZWlvdV0peSQvO1xuICB2YXIgcmVfMiA9IC9eKC4rPykoYXRpb25hbHx0aW9uYWx8ZW5jaXxhbmNpfGl6ZXJ8YmxpfGFsbGl8ZW50bGl8ZWxpfG91c2xpfGl6YXRpb258YXRpb258YXRvcnxhbGlzbXxpdmVuZXNzfGZ1bG5lc3N8b3VzbmVzc3xhbGl0aXxpdml0aXxiaWxpdGl8bG9naSkkLztcblxuICB2YXIgcmVfMyA9IC9eKC4rPykoaWNhdGV8YXRpdmV8YWxpemV8aWNpdGl8aWNhbHxmdWx8bmVzcykkLztcblxuICB2YXIgcmVfNCA9IC9eKC4rPykoYWx8YW5jZXxlbmNlfGVyfGljfGFibGV8aWJsZXxhbnR8ZW1lbnR8bWVudHxlbnR8b3V8aXNtfGF0ZXxpdGl8b3VzfGl2ZXxpemUpJC87XG4gIHZhciByZTJfNCA9IC9eKC4rPykoc3x0KShpb24pJC87XG5cbiAgdmFyIHJlXzUgPSAvXiguKz8pZSQvO1xuICB2YXIgcmVfNV8xID0gL2xsJC87XG4gIHZhciByZTNfNSA9IG5ldyBSZWdFeHAoXCJeXCIgKyBDICsgdiArIFwiW15hZWlvdXd4eV0kXCIpO1xuXG4gIHZhciBwb3J0ZXJTdGVtbWVyID0gZnVuY3Rpb24gcG9ydGVyU3RlbW1lcih3KSB7XG4gICAgdmFyIHN0ZW0sXG4gICAgICBzdWZmaXgsXG4gICAgICBmaXJzdGNoLFxuICAgICAgcmUsXG4gICAgICByZTIsXG4gICAgICByZTMsXG4gICAgICByZTQ7XG5cbiAgICBpZiAody5sZW5ndGggPCAzKSB7IHJldHVybiB3OyB9XG5cbiAgICBmaXJzdGNoID0gdy5zdWJzdHIoMCwxKTtcbiAgICBpZiAoZmlyc3RjaCA9PSBcInlcIikge1xuICAgICAgdyA9IGZpcnN0Y2gudG9VcHBlckNhc2UoKSArIHcuc3Vic3RyKDEpO1xuICAgIH1cblxuICAgIC8vIFN0ZXAgMWFcbiAgICByZSA9IHJlXzFhXG4gICAgcmUyID0gcmUyXzFhO1xuXG4gICAgaWYgKHJlLnRlc3QodykpIHsgdyA9IHcucmVwbGFjZShyZSxcIiQxJDJcIik7IH1cbiAgICBlbHNlIGlmIChyZTIudGVzdCh3KSkgeyB3ID0gdy5yZXBsYWNlKHJlMixcIiQxJDJcIik7IH1cblxuICAgIC8vIFN0ZXAgMWJcbiAgICByZSA9IHJlXzFiO1xuICAgIHJlMiA9IHJlMl8xYjtcbiAgICBpZiAocmUudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUuZXhlYyh3KTtcbiAgICAgIHJlID0gcmVfbWdyMDtcbiAgICAgIGlmIChyZS50ZXN0KGZwWzFdKSkge1xuICAgICAgICByZSA9IHJlXzFiXzI7XG4gICAgICAgIHcgPSB3LnJlcGxhY2UocmUsXCJcIik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChyZTIudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUyLmV4ZWModyk7XG4gICAgICBzdGVtID0gZnBbMV07XG4gICAgICByZTIgPSByZV9zX3Y7XG4gICAgICBpZiAocmUyLnRlc3Qoc3RlbSkpIHtcbiAgICAgICAgdyA9IHN0ZW07XG4gICAgICAgIHJlMiA9IHJlMl8xYl8yO1xuICAgICAgICByZTMgPSByZTNfMWJfMjtcbiAgICAgICAgcmU0ID0gcmU0XzFiXzI7XG4gICAgICAgIGlmIChyZTIudGVzdCh3KSkgeyB3ID0gdyArIFwiZVwiOyB9XG4gICAgICAgIGVsc2UgaWYgKHJlMy50ZXN0KHcpKSB7IHJlID0gcmVfMWJfMjsgdyA9IHcucmVwbGFjZShyZSxcIlwiKTsgfVxuICAgICAgICBlbHNlIGlmIChyZTQudGVzdCh3KSkgeyB3ID0gdyArIFwiZVwiOyB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3RlcCAxYyAtIHJlcGxhY2Ugc3VmZml4IHkgb3IgWSBieSBpIGlmIHByZWNlZGVkIGJ5IGEgbm9uLXZvd2VsIHdoaWNoIGlzIG5vdCB0aGUgZmlyc3QgbGV0dGVyIG9mIHRoZSB3b3JkIChzbyBjcnkgLT4gY3JpLCBieSAtPiBieSwgc2F5IC0+IHNheSlcbiAgICByZSA9IHJlXzFjO1xuICAgIGlmIChyZS50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZS5leGVjKHcpO1xuICAgICAgc3RlbSA9IGZwWzFdO1xuICAgICAgdyA9IHN0ZW0gKyBcImlcIjtcbiAgICB9XG5cbiAgICAvLyBTdGVwIDJcbiAgICByZSA9IHJlXzI7XG4gICAgaWYgKHJlLnRlc3QodykpIHtcbiAgICAgIHZhciBmcCA9IHJlLmV4ZWModyk7XG4gICAgICBzdGVtID0gZnBbMV07XG4gICAgICBzdWZmaXggPSBmcFsyXTtcbiAgICAgIHJlID0gcmVfbWdyMDtcbiAgICAgIGlmIChyZS50ZXN0KHN0ZW0pKSB7XG4gICAgICAgIHcgPSBzdGVtICsgc3RlcDJsaXN0W3N1ZmZpeF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3RlcCAzXG4gICAgcmUgPSByZV8zO1xuICAgIGlmIChyZS50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZS5leGVjKHcpO1xuICAgICAgc3RlbSA9IGZwWzFdO1xuICAgICAgc3VmZml4ID0gZnBbMl07XG4gICAgICByZSA9IHJlX21ncjA7XG4gICAgICBpZiAocmUudGVzdChzdGVtKSkge1xuICAgICAgICB3ID0gc3RlbSArIHN0ZXAzbGlzdFtzdWZmaXhdO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFN0ZXAgNFxuICAgIHJlID0gcmVfNDtcbiAgICByZTIgPSByZTJfNDtcbiAgICBpZiAocmUudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUuZXhlYyh3KTtcbiAgICAgIHN0ZW0gPSBmcFsxXTtcbiAgICAgIHJlID0gcmVfbWdyMTtcbiAgICAgIGlmIChyZS50ZXN0KHN0ZW0pKSB7XG4gICAgICAgIHcgPSBzdGVtO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocmUyLnRlc3QodykpIHtcbiAgICAgIHZhciBmcCA9IHJlMi5leGVjKHcpO1xuICAgICAgc3RlbSA9IGZwWzFdICsgZnBbMl07XG4gICAgICByZTIgPSByZV9tZ3IxO1xuICAgICAgaWYgKHJlMi50ZXN0KHN0ZW0pKSB7XG4gICAgICAgIHcgPSBzdGVtO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFN0ZXAgNVxuICAgIHJlID0gcmVfNTtcbiAgICBpZiAocmUudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUuZXhlYyh3KTtcbiAgICAgIHN0ZW0gPSBmcFsxXTtcbiAgICAgIHJlID0gcmVfbWdyMTtcbiAgICAgIHJlMiA9IHJlX21lcTE7XG4gICAgICByZTMgPSByZTNfNTtcbiAgICAgIGlmIChyZS50ZXN0KHN0ZW0pIHx8IChyZTIudGVzdChzdGVtKSAmJiAhKHJlMy50ZXN0KHN0ZW0pKSkpIHtcbiAgICAgICAgdyA9IHN0ZW07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmUgPSByZV81XzE7XG4gICAgcmUyID0gcmVfbWdyMTtcbiAgICBpZiAocmUudGVzdCh3KSAmJiByZTIudGVzdCh3KSkge1xuICAgICAgcmUgPSByZV8xYl8yO1xuICAgICAgdyA9IHcucmVwbGFjZShyZSxcIlwiKTtcbiAgICB9XG5cbiAgICAvLyBhbmQgdHVybiBpbml0aWFsIFkgYmFjayB0byB5XG5cbiAgICBpZiAoZmlyc3RjaCA9PSBcInlcIikge1xuICAgICAgdyA9IGZpcnN0Y2gudG9Mb3dlckNhc2UoKSArIHcuc3Vic3RyKDEpO1xuICAgIH1cblxuICAgIHJldHVybiB3O1xuICB9O1xuXG4gIHJldHVybiBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICByZXR1cm4gdG9rZW4udXBkYXRlKHBvcnRlclN0ZW1tZXIpO1xuICB9XG59KSgpO1xuXG5sdW5yLlBpcGVsaW5lLnJlZ2lzdGVyRnVuY3Rpb24obHVuci5zdGVtbWVyLCAnc3RlbW1lcicpXG4vKiFcbiAqIGx1bnIuc3RvcFdvcmRGaWx0ZXJcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIGx1bnIuZ2VuZXJhdGVTdG9wV29yZEZpbHRlciBidWlsZHMgYSBzdG9wV29yZEZpbHRlciBmdW5jdGlvbiBmcm9tIHRoZSBwcm92aWRlZFxuICogbGlzdCBvZiBzdG9wIHdvcmRzLlxuICpcbiAqIFRoZSBidWlsdCBpbiBsdW5yLnN0b3BXb3JkRmlsdGVyIGlzIGJ1aWx0IHVzaW5nIHRoaXMgZ2VuZXJhdG9yIGFuZCBjYW4gYmUgdXNlZFxuICogdG8gZ2VuZXJhdGUgY3VzdG9tIHN0b3BXb3JkRmlsdGVycyBmb3IgYXBwbGljYXRpb25zIG9yIG5vbiBFbmdsaXNoIGxhbmd1YWdlcy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSB0b2tlbiBUaGUgdG9rZW4gdG8gcGFzcyB0aHJvdWdoIHRoZSBmaWx0ZXJcbiAqIEByZXR1cm5zIHtsdW5yLlBpcGVsaW5lRnVuY3Rpb259XG4gKiBAc2VlIGx1bnIuUGlwZWxpbmVcbiAqIEBzZWUgbHVuci5zdG9wV29yZEZpbHRlclxuICovXG5sdW5yLmdlbmVyYXRlU3RvcFdvcmRGaWx0ZXIgPSBmdW5jdGlvbiAoc3RvcFdvcmRzKSB7XG4gIHZhciB3b3JkcyA9IHN0b3BXb3Jkcy5yZWR1Y2UoZnVuY3Rpb24gKG1lbW8sIHN0b3BXb3JkKSB7XG4gICAgbWVtb1tzdG9wV29yZF0gPSBzdG9wV29yZFxuICAgIHJldHVybiBtZW1vXG4gIH0sIHt9KVxuXG4gIHJldHVybiBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICBpZiAodG9rZW4gJiYgd29yZHNbdG9rZW4udG9TdHJpbmcoKV0gIT09IHRva2VuLnRvU3RyaW5nKCkpIHJldHVybiB0b2tlblxuICB9XG59XG5cbi8qKlxuICogbHVuci5zdG9wV29yZEZpbHRlciBpcyBhbiBFbmdsaXNoIGxhbmd1YWdlIHN0b3Agd29yZCBsaXN0IGZpbHRlciwgYW55IHdvcmRzXG4gKiBjb250YWluZWQgaW4gdGhlIGxpc3Qgd2lsbCBub3QgYmUgcGFzc2VkIHRocm91Z2ggdGhlIGZpbHRlci5cbiAqXG4gKiBUaGlzIGlzIGludGVuZGVkIHRvIGJlIHVzZWQgaW4gdGhlIFBpcGVsaW5lLiBJZiB0aGUgdG9rZW4gZG9lcyBub3QgcGFzcyB0aGVcbiAqIGZpbHRlciB0aGVuIHVuZGVmaW5lZCB3aWxsIGJlIHJldHVybmVkLlxuICpcbiAqIEBpbXBsZW1lbnRzIHtsdW5yLlBpcGVsaW5lRnVuY3Rpb259XG4gKiBAcGFyYW1zIHtsdW5yLlRva2VufSB0b2tlbiAtIEEgdG9rZW4gdG8gY2hlY2sgZm9yIGJlaW5nIGEgc3RvcCB3b3JkLlxuICogQHJldHVybnMge2x1bnIuVG9rZW59XG4gKiBAc2VlIHtAbGluayBsdW5yLlBpcGVsaW5lfVxuICovXG5sdW5yLnN0b3BXb3JkRmlsdGVyID0gbHVuci5nZW5lcmF0ZVN0b3BXb3JkRmlsdGVyKFtcbiAgJ2EnLFxuICAnYWJsZScsXG4gICdhYm91dCcsXG4gICdhY3Jvc3MnLFxuICAnYWZ0ZXInLFxuICAnYWxsJyxcbiAgJ2FsbW9zdCcsXG4gICdhbHNvJyxcbiAgJ2FtJyxcbiAgJ2Ftb25nJyxcbiAgJ2FuJyxcbiAgJ2FuZCcsXG4gICdhbnknLFxuICAnYXJlJyxcbiAgJ2FzJyxcbiAgJ2F0JyxcbiAgJ2JlJyxcbiAgJ2JlY2F1c2UnLFxuICAnYmVlbicsXG4gICdidXQnLFxuICAnYnknLFxuICAnY2FuJyxcbiAgJ2Nhbm5vdCcsXG4gICdjb3VsZCcsXG4gICdkZWFyJyxcbiAgJ2RpZCcsXG4gICdkbycsXG4gICdkb2VzJyxcbiAgJ2VpdGhlcicsXG4gICdlbHNlJyxcbiAgJ2V2ZXInLFxuICAnZXZlcnknLFxuICAnZm9yJyxcbiAgJ2Zyb20nLFxuICAnZ2V0JyxcbiAgJ2dvdCcsXG4gICdoYWQnLFxuICAnaGFzJyxcbiAgJ2hhdmUnLFxuICAnaGUnLFxuICAnaGVyJyxcbiAgJ2hlcnMnLFxuICAnaGltJyxcbiAgJ2hpcycsXG4gICdob3cnLFxuICAnaG93ZXZlcicsXG4gICdpJyxcbiAgJ2lmJyxcbiAgJ2luJyxcbiAgJ2ludG8nLFxuICAnaXMnLFxuICAnaXQnLFxuICAnaXRzJyxcbiAgJ2p1c3QnLFxuICAnbGVhc3QnLFxuICAnbGV0JyxcbiAgJ2xpa2UnLFxuICAnbGlrZWx5JyxcbiAgJ21heScsXG4gICdtZScsXG4gICdtaWdodCcsXG4gICdtb3N0JyxcbiAgJ211c3QnLFxuICAnbXknLFxuICAnbmVpdGhlcicsXG4gICdubycsXG4gICdub3InLFxuICAnbm90JyxcbiAgJ29mJyxcbiAgJ29mZicsXG4gICdvZnRlbicsXG4gICdvbicsXG4gICdvbmx5JyxcbiAgJ29yJyxcbiAgJ290aGVyJyxcbiAgJ291cicsXG4gICdvd24nLFxuICAncmF0aGVyJyxcbiAgJ3NhaWQnLFxuICAnc2F5JyxcbiAgJ3NheXMnLFxuICAnc2hlJyxcbiAgJ3Nob3VsZCcsXG4gICdzaW5jZScsXG4gICdzbycsXG4gICdzb21lJyxcbiAgJ3RoYW4nLFxuICAndGhhdCcsXG4gICd0aGUnLFxuICAndGhlaXInLFxuICAndGhlbScsXG4gICd0aGVuJyxcbiAgJ3RoZXJlJyxcbiAgJ3RoZXNlJyxcbiAgJ3RoZXknLFxuICAndGhpcycsXG4gICd0aXMnLFxuICAndG8nLFxuICAndG9vJyxcbiAgJ3R3YXMnLFxuICAndXMnLFxuICAnd2FudHMnLFxuICAnd2FzJyxcbiAgJ3dlJyxcbiAgJ3dlcmUnLFxuICAnd2hhdCcsXG4gICd3aGVuJyxcbiAgJ3doZXJlJyxcbiAgJ3doaWNoJyxcbiAgJ3doaWxlJyxcbiAgJ3dobycsXG4gICd3aG9tJyxcbiAgJ3doeScsXG4gICd3aWxsJyxcbiAgJ3dpdGgnLFxuICAnd291bGQnLFxuICAneWV0JyxcbiAgJ3lvdScsXG4gICd5b3VyJ1xuXSlcblxubHVuci5QaXBlbGluZS5yZWdpc3RlckZ1bmN0aW9uKGx1bnIuc3RvcFdvcmRGaWx0ZXIsICdzdG9wV29yZEZpbHRlcicpXG4vKiFcbiAqIGx1bnIudHJpbW1lclxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogbHVuci50cmltbWVyIGlzIGEgcGlwZWxpbmUgZnVuY3Rpb24gZm9yIHRyaW1taW5nIG5vbiB3b3JkXG4gKiBjaGFyYWN0ZXJzIGZyb20gdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIHRva2VucyBiZWZvcmUgdGhleVxuICogZW50ZXIgdGhlIGluZGV4LlxuICpcbiAqIFRoaXMgaW1wbGVtZW50YXRpb24gbWF5IG5vdCB3b3JrIGNvcnJlY3RseSBmb3Igbm9uIGxhdGluXG4gKiBjaGFyYWN0ZXJzIGFuZCBzaG91bGQgZWl0aGVyIGJlIHJlbW92ZWQgb3IgYWRhcHRlZCBmb3IgdXNlXG4gKiB3aXRoIGxhbmd1YWdlcyB3aXRoIG5vbi1sYXRpbiBjaGFyYWN0ZXJzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBpbXBsZW1lbnRzIHtsdW5yLlBpcGVsaW5lRnVuY3Rpb259XG4gKiBAcGFyYW0ge2x1bnIuVG9rZW59IHRva2VuIFRoZSB0b2tlbiB0byBwYXNzIHRocm91Z2ggdGhlIGZpbHRlclxuICogQHJldHVybnMge2x1bnIuVG9rZW59XG4gKiBAc2VlIGx1bnIuUGlwZWxpbmVcbiAqL1xubHVuci50cmltbWVyID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gIHJldHVybiB0b2tlbi51cGRhdGUoZnVuY3Rpb24gKHMpIHtcbiAgICByZXR1cm4gcy5yZXBsYWNlKC9eXFxXKy8sICcnKS5yZXBsYWNlKC9cXFcrJC8sICcnKVxuICB9KVxufVxuXG5sdW5yLlBpcGVsaW5lLnJlZ2lzdGVyRnVuY3Rpb24obHVuci50cmltbWVyLCAndHJpbW1lcicpXG4vKiFcbiAqIGx1bnIuVG9rZW5TZXRcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIEEgdG9rZW4gc2V0IGlzIHVzZWQgdG8gc3RvcmUgdGhlIHVuaXF1ZSBsaXN0IG9mIGFsbCB0b2tlbnNcbiAqIHdpdGhpbiBhbiBpbmRleC4gVG9rZW4gc2V0cyBhcmUgYWxzbyB1c2VkIHRvIHJlcHJlc2VudCBhblxuICogaW5jb21pbmcgcXVlcnkgdG8gdGhlIGluZGV4LCB0aGlzIHF1ZXJ5IHRva2VuIHNldCBhbmQgaW5kZXhcbiAqIHRva2VuIHNldCBhcmUgdGhlbiBpbnRlcnNlY3RlZCB0byBmaW5kIHdoaWNoIHRva2VucyB0byBsb29rXG4gKiB1cCBpbiB0aGUgaW52ZXJ0ZWQgaW5kZXguXG4gKlxuICogQSB0b2tlbiBzZXQgY2FuIGhvbGQgbXVsdGlwbGUgdG9rZW5zLCBhcyBpbiB0aGUgY2FzZSBvZiB0aGVcbiAqIGluZGV4IHRva2VuIHNldCwgb3IgaXQgY2FuIGhvbGQgYSBzaW5nbGUgdG9rZW4gYXMgaW4gdGhlXG4gKiBjYXNlIG9mIGEgc2ltcGxlIHF1ZXJ5IHRva2VuIHNldC5cbiAqXG4gKiBBZGRpdGlvbmFsbHkgdG9rZW4gc2V0cyBhcmUgdXNlZCB0byBwZXJmb3JtIHdpbGRjYXJkIG1hdGNoaW5nLlxuICogTGVhZGluZywgY29udGFpbmVkIGFuZCB0cmFpbGluZyB3aWxkY2FyZHMgYXJlIHN1cHBvcnRlZCwgYW5kXG4gKiBmcm9tIHRoaXMgZWRpdCBkaXN0YW5jZSBtYXRjaGluZyBjYW4gYWxzbyBiZSBwcm92aWRlZC5cbiAqXG4gKiBUb2tlbiBzZXRzIGFyZSBpbXBsZW1lbnRlZCBhcyBhIG1pbmltYWwgZmluaXRlIHN0YXRlIGF1dG9tYXRhLFxuICogd2hlcmUgYm90aCBjb21tb24gcHJlZml4ZXMgYW5kIHN1ZmZpeGVzIGFyZSBzaGFyZWQgYmV0d2VlbiB0b2tlbnMuXG4gKiBUaGlzIGhlbHBzIHRvIHJlZHVjZSB0aGUgc3BhY2UgdXNlZCBmb3Igc3RvcmluZyB0aGUgdG9rZW4gc2V0LlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5sdW5yLlRva2VuU2V0ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmZpbmFsID0gZmFsc2VcbiAgdGhpcy5lZGdlcyA9IHt9XG4gIHRoaXMuaWQgPSBsdW5yLlRva2VuU2V0Ll9uZXh0SWRcbiAgbHVuci5Ub2tlblNldC5fbmV4dElkICs9IDFcbn1cblxuLyoqXG4gKiBLZWVwcyB0cmFjayBvZiB0aGUgbmV4dCwgYXV0byBpbmNyZW1lbnQsIGlkZW50aWZpZXIgdG8gYXNzaWduXG4gKiB0byBhIG5ldyB0b2tlblNldC5cbiAqXG4gKiBUb2tlblNldHMgcmVxdWlyZSBhIHVuaXF1ZSBpZGVudGlmaWVyIHRvIGJlIGNvcnJlY3RseSBtaW5pbWlzZWQuXG4gKlxuICogQHByaXZhdGVcbiAqL1xubHVuci5Ub2tlblNldC5fbmV4dElkID0gMVxuXG4vKipcbiAqIENyZWF0ZXMgYSBUb2tlblNldCBpbnN0YW5jZSBmcm9tIHRoZSBnaXZlbiBzb3J0ZWQgYXJyYXkgb2Ygd29yZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmdbXX0gYXJyIC0gQSBzb3J0ZWQgYXJyYXkgb2Ygc3RyaW5ncyB0byBjcmVhdGUgdGhlIHNldCBmcm9tLlxuICogQHJldHVybnMge2x1bnIuVG9rZW5TZXR9XG4gKiBAdGhyb3dzIFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlIGlucHV0IGFycmF5IGlzIG5vdCBzb3J0ZWQuXG4gKi9cbmx1bnIuVG9rZW5TZXQuZnJvbUFycmF5ID0gZnVuY3Rpb24gKGFycikge1xuICB2YXIgYnVpbGRlciA9IG5ldyBsdW5yLlRva2VuU2V0LkJ1aWxkZXJcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgYnVpbGRlci5pbnNlcnQoYXJyW2ldKVxuICB9XG5cbiAgYnVpbGRlci5maW5pc2goKVxuICByZXR1cm4gYnVpbGRlci5yb290XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHRva2VuIHNldCBmcm9tIGEgcXVlcnkgY2xhdXNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gY2xhdXNlIC0gQSBzaW5nbGUgY2xhdXNlIGZyb20gbHVuci5RdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjbGF1c2UudGVybSAtIFRoZSBxdWVyeSBjbGF1c2UgdGVybS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbY2xhdXNlLmVkaXREaXN0YW5jZV0gLSBUaGUgb3B0aW9uYWwgZWRpdCBkaXN0YW5jZSBmb3IgdGhlIHRlcm0uXG4gKiBAcmV0dXJucyB7bHVuci5Ub2tlblNldH1cbiAqL1xubHVuci5Ub2tlblNldC5mcm9tQ2xhdXNlID0gZnVuY3Rpb24gKGNsYXVzZSkge1xuICBpZiAoJ2VkaXREaXN0YW5jZScgaW4gY2xhdXNlKSB7XG4gICAgcmV0dXJuIGx1bnIuVG9rZW5TZXQuZnJvbUZ1enp5U3RyaW5nKGNsYXVzZS50ZXJtLCBjbGF1c2UuZWRpdERpc3RhbmNlKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBsdW5yLlRva2VuU2V0LmZyb21TdHJpbmcoY2xhdXNlLnRlcm0pXG4gIH1cbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgdG9rZW4gc2V0IHJlcHJlc2VudGluZyBhIHNpbmdsZSBzdHJpbmcgd2l0aCBhIHNwZWNpZmllZFxuICogZWRpdCBkaXN0YW5jZS5cbiAqXG4gKiBJbnNlcnRpb25zLCBkZWxldGlvbnMsIHN1YnN0aXR1dGlvbnMgYW5kIHRyYW5zcG9zaXRpb25zIGFyZSBlYWNoXG4gKiB0cmVhdGVkIGFzIGFuIGVkaXQgZGlzdGFuY2Ugb2YgMS5cbiAqXG4gKiBJbmNyZWFzaW5nIHRoZSBhbGxvd2VkIGVkaXQgZGlzdGFuY2Ugd2lsbCBoYXZlIGEgZHJhbWF0aWMgaW1wYWN0XG4gKiBvbiB0aGUgcGVyZm9ybWFuY2Ugb2YgYm90aCBjcmVhdGluZyBhbmQgaW50ZXJzZWN0aW5nIHRoZXNlIFRva2VuU2V0cy5cbiAqIEl0IGlzIGFkdmlzZWQgdG8ga2VlcCB0aGUgZWRpdCBkaXN0YW5jZSBsZXNzIHRoYW4gMy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gVGhlIHN0cmluZyB0byBjcmVhdGUgdGhlIHRva2VuIHNldCBmcm9tLlxuICogQHBhcmFtIHtudW1iZXJ9IGVkaXREaXN0YW5jZSAtIFRoZSBhbGxvd2VkIGVkaXQgZGlzdGFuY2UgdG8gbWF0Y2guXG4gKiBAcmV0dXJucyB7bHVuci5WZWN0b3J9XG4gKi9cbmx1bnIuVG9rZW5TZXQuZnJvbUZ1enp5U3RyaW5nID0gZnVuY3Rpb24gKHN0ciwgZWRpdERpc3RhbmNlKSB7XG4gIHZhciByb290ID0gbmV3IGx1bnIuVG9rZW5TZXRcblxuICB2YXIgc3RhY2sgPSBbe1xuICAgIG5vZGU6IHJvb3QsXG4gICAgZWRpdHNSZW1haW5pbmc6IGVkaXREaXN0YW5jZSxcbiAgICBzdHI6IHN0clxuICB9XVxuXG4gIHdoaWxlIChzdGFjay5sZW5ndGgpIHtcbiAgICB2YXIgZnJhbWUgPSBzdGFjay5wb3AoKVxuXG4gICAgLy8gbm8gZWRpdFxuICAgIGlmIChmcmFtZS5zdHIubGVuZ3RoID4gMCkge1xuICAgICAgdmFyIGNoYXIgPSBmcmFtZS5zdHIuY2hhckF0KDApLFxuICAgICAgICAgIG5vRWRpdE5vZGVcblxuICAgICAgaWYgKGNoYXIgaW4gZnJhbWUubm9kZS5lZGdlcykge1xuICAgICAgICBub0VkaXROb2RlID0gZnJhbWUubm9kZS5lZGdlc1tjaGFyXVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9FZGl0Tm9kZSA9IG5ldyBsdW5yLlRva2VuU2V0XG4gICAgICAgIGZyYW1lLm5vZGUuZWRnZXNbY2hhcl0gPSBub0VkaXROb2RlXG4gICAgICB9XG5cbiAgICAgIGlmIChmcmFtZS5zdHIubGVuZ3RoID09IDEpIHtcbiAgICAgICAgbm9FZGl0Tm9kZS5maW5hbCA9IHRydWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YWNrLnB1c2goe1xuICAgICAgICAgIG5vZGU6IG5vRWRpdE5vZGUsXG4gICAgICAgICAgZWRpdHNSZW1haW5pbmc6IGZyYW1lLmVkaXRzUmVtYWluaW5nLFxuICAgICAgICAgIHN0cjogZnJhbWUuc3RyLnNsaWNlKDEpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZGVsZXRpb25cbiAgICAvLyBjYW4gb25seSBkbyBhIGRlbGV0aW9uIGlmIHdlIGhhdmUgZW5vdWdoIGVkaXRzIHJlbWFpbmluZ1xuICAgIC8vIGFuZCBpZiB0aGVyZSBhcmUgY2hhcmFjdGVycyBsZWZ0IHRvIGRlbGV0ZSBpbiB0aGUgc3RyaW5nXG4gICAgaWYgKGZyYW1lLmVkaXRzUmVtYWluaW5nID4gMCAmJiBmcmFtZS5zdHIubGVuZ3RoID4gMSkge1xuICAgICAgdmFyIGNoYXIgPSBmcmFtZS5zdHIuY2hhckF0KDEpLFxuICAgICAgICAgIGRlbGV0aW9uTm9kZVxuXG4gICAgICBpZiAoY2hhciBpbiBmcmFtZS5ub2RlLmVkZ2VzKSB7XG4gICAgICAgIGRlbGV0aW9uTm9kZSA9IGZyYW1lLm5vZGUuZWRnZXNbY2hhcl1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbGV0aW9uTm9kZSA9IG5ldyBsdW5yLlRva2VuU2V0XG4gICAgICAgIGZyYW1lLm5vZGUuZWRnZXNbY2hhcl0gPSBkZWxldGlvbk5vZGVcbiAgICAgIH1cblxuICAgICAgaWYgKGZyYW1lLnN0ci5sZW5ndGggPD0gMikge1xuICAgICAgICBkZWxldGlvbk5vZGUuZmluYWwgPSB0cnVlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGFjay5wdXNoKHtcbiAgICAgICAgICBub2RlOiBkZWxldGlvbk5vZGUsXG4gICAgICAgICAgZWRpdHNSZW1haW5pbmc6IGZyYW1lLmVkaXRzUmVtYWluaW5nIC0gMSxcbiAgICAgICAgICBzdHI6IGZyYW1lLnN0ci5zbGljZSgyKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGRlbGV0aW9uXG4gICAgLy8ganVzdCByZW1vdmluZyB0aGUgbGFzdCBjaGFyYWN0ZXIgZnJvbSB0aGUgc3RyXG4gICAgaWYgKGZyYW1lLmVkaXRzUmVtYWluaW5nID4gMCAmJiBmcmFtZS5zdHIubGVuZ3RoID09IDEpIHtcbiAgICAgIGZyYW1lLm5vZGUuZmluYWwgPSB0cnVlXG4gICAgfVxuXG4gICAgLy8gc3Vic3RpdHV0aW9uXG4gICAgLy8gY2FuIG9ubHkgZG8gYSBzdWJzdGl0dXRpb24gaWYgd2UgaGF2ZSBlbm91Z2ggZWRpdHMgcmVtYWluaW5nXG4gICAgLy8gYW5kIGlmIHRoZXJlIGFyZSBjaGFyYWN0ZXJzIGxlZnQgdG8gc3Vic3RpdHV0ZVxuICAgIGlmIChmcmFtZS5lZGl0c1JlbWFpbmluZyA+IDAgJiYgZnJhbWUuc3RyLmxlbmd0aCA+PSAxKSB7XG4gICAgICBpZiAoXCIqXCIgaW4gZnJhbWUubm9kZS5lZGdlcykge1xuICAgICAgICB2YXIgc3Vic3RpdHV0aW9uTm9kZSA9IGZyYW1lLm5vZGUuZWRnZXNbXCIqXCJdXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgc3Vic3RpdHV0aW9uTm9kZSA9IG5ldyBsdW5yLlRva2VuU2V0XG4gICAgICAgIGZyYW1lLm5vZGUuZWRnZXNbXCIqXCJdID0gc3Vic3RpdHV0aW9uTm9kZVxuICAgICAgfVxuXG4gICAgICBpZiAoZnJhbWUuc3RyLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIHN1YnN0aXR1dGlvbk5vZGUuZmluYWwgPSB0cnVlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGFjay5wdXNoKHtcbiAgICAgICAgICBub2RlOiBzdWJzdGl0dXRpb25Ob2RlLFxuICAgICAgICAgIGVkaXRzUmVtYWluaW5nOiBmcmFtZS5lZGl0c1JlbWFpbmluZyAtIDEsXG4gICAgICAgICAgc3RyOiBmcmFtZS5zdHIuc2xpY2UoMSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpbnNlcnRpb25cbiAgICAvLyBjYW4gb25seSBkbyBpbnNlcnRpb24gaWYgdGhlcmUgYXJlIGVkaXRzIHJlbWFpbmluZ1xuICAgIGlmIChmcmFtZS5lZGl0c1JlbWFpbmluZyA+IDApIHtcbiAgICAgIGlmIChcIipcIiBpbiBmcmFtZS5ub2RlLmVkZ2VzKSB7XG4gICAgICAgIHZhciBpbnNlcnRpb25Ob2RlID0gZnJhbWUubm9kZS5lZGdlc1tcIipcIl1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBpbnNlcnRpb25Ob2RlID0gbmV3IGx1bnIuVG9rZW5TZXRcbiAgICAgICAgZnJhbWUubm9kZS5lZGdlc1tcIipcIl0gPSBpbnNlcnRpb25Ob2RlXG4gICAgICB9XG5cbiAgICAgIGlmIChmcmFtZS5zdHIubGVuZ3RoID09IDApIHtcbiAgICAgICAgaW5zZXJ0aW9uTm9kZS5maW5hbCA9IHRydWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YWNrLnB1c2goe1xuICAgICAgICAgIG5vZGU6IGluc2VydGlvbk5vZGUsXG4gICAgICAgICAgZWRpdHNSZW1haW5pbmc6IGZyYW1lLmVkaXRzUmVtYWluaW5nIC0gMSxcbiAgICAgICAgICBzdHI6IGZyYW1lLnN0clxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRyYW5zcG9zaXRpb25cbiAgICAvLyBjYW4gb25seSBkbyBhIHRyYW5zcG9zaXRpb24gaWYgdGhlcmUgYXJlIGVkaXRzIHJlbWFpbmluZ1xuICAgIC8vIGFuZCB0aGVyZSBhcmUgZW5vdWdoIGNoYXJhY3RlcnMgdG8gdHJhbnNwb3NlXG4gICAgaWYgKGZyYW1lLmVkaXRzUmVtYWluaW5nID4gMCAmJiBmcmFtZS5zdHIubGVuZ3RoID4gMSkge1xuICAgICAgdmFyIGNoYXJBID0gZnJhbWUuc3RyLmNoYXJBdCgwKSxcbiAgICAgICAgICBjaGFyQiA9IGZyYW1lLnN0ci5jaGFyQXQoMSksXG4gICAgICAgICAgdHJhbnNwb3NlTm9kZVxuXG4gICAgICBpZiAoY2hhckIgaW4gZnJhbWUubm9kZS5lZGdlcykge1xuICAgICAgICB0cmFuc3Bvc2VOb2RlID0gZnJhbWUubm9kZS5lZGdlc1tjaGFyQl1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyYW5zcG9zZU5vZGUgPSBuZXcgbHVuci5Ub2tlblNldFxuICAgICAgICBmcmFtZS5ub2RlLmVkZ2VzW2NoYXJCXSA9IHRyYW5zcG9zZU5vZGVcbiAgICAgIH1cblxuICAgICAgaWYgKGZyYW1lLnN0ci5sZW5ndGggPT0gMSkge1xuICAgICAgICB0cmFuc3Bvc2VOb2RlLmZpbmFsID0gdHJ1ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhY2sucHVzaCh7XG4gICAgICAgICAgbm9kZTogdHJhbnNwb3NlTm9kZSxcbiAgICAgICAgICBlZGl0c1JlbWFpbmluZzogZnJhbWUuZWRpdHNSZW1haW5pbmcgLSAxLFxuICAgICAgICAgIHN0cjogY2hhckEgKyBmcmFtZS5zdHIuc2xpY2UoMilcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcm9vdFxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBUb2tlblNldCBmcm9tIGEgc3RyaW5nLlxuICpcbiAqIFRoZSBzdHJpbmcgbWF5IGNvbnRhaW4gb25lIG9yIG1vcmUgd2lsZGNhcmQgY2hhcmFjdGVycyAoKilcbiAqIHRoYXQgd2lsbCBhbGxvdyB3aWxkY2FyZCBtYXRjaGluZyB3aGVuIGludGVyc2VjdGluZyB3aXRoXG4gKiBhbm90aGVyIFRva2VuU2V0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBUaGUgc3RyaW5nIHRvIGNyZWF0ZSBhIFRva2VuU2V0IGZyb20uXG4gKiBAcmV0dXJucyB7bHVuci5Ub2tlblNldH1cbiAqL1xubHVuci5Ub2tlblNldC5mcm9tU3RyaW5nID0gZnVuY3Rpb24gKHN0cikge1xuICB2YXIgbm9kZSA9IG5ldyBsdW5yLlRva2VuU2V0LFxuICAgICAgcm9vdCA9IG5vZGUsXG4gICAgICB3aWxkY2FyZEZvdW5kID0gZmFsc2VcblxuICAvKlxuICAgKiBJdGVyYXRlcyB0aHJvdWdoIGFsbCBjaGFyYWN0ZXJzIHdpdGhpbiB0aGUgcGFzc2VkIHN0cmluZ1xuICAgKiBhcHBlbmRpbmcgYSBub2RlIGZvciBlYWNoIGNoYXJhY3Rlci5cbiAgICpcbiAgICogQXMgc29vbiBhcyBhIHdpbGRjYXJkIGNoYXJhY3RlciBpcyBmb3VuZCB0aGVuIGEgc2VsZlxuICAgKiByZWZlcmVuY2luZyBlZGdlIGlzIGludHJvZHVjZWQgdG8gY29udGludWFsbHkgbWF0Y2hcbiAgICogYW55IG51bWJlciBvZiBhbnkgY2hhcmFjdGVycy5cbiAgICovXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzdHIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICB2YXIgY2hhciA9IHN0cltpXSxcbiAgICAgICAgZmluYWwgPSAoaSA9PSBsZW4gLSAxKVxuXG4gICAgaWYgKGNoYXIgPT0gXCIqXCIpIHtcbiAgICAgIHdpbGRjYXJkRm91bmQgPSB0cnVlXG4gICAgICBub2RlLmVkZ2VzW2NoYXJdID0gbm9kZVxuICAgICAgbm9kZS5maW5hbCA9IGZpbmFsXG5cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG5leHQgPSBuZXcgbHVuci5Ub2tlblNldFxuICAgICAgbmV4dC5maW5hbCA9IGZpbmFsXG5cbiAgICAgIG5vZGUuZWRnZXNbY2hhcl0gPSBuZXh0XG4gICAgICBub2RlID0gbmV4dFxuXG4gICAgICAvLyBUT0RPOiBpcyB0aGlzIG5lZWRlZCBhbnltb3JlP1xuICAgICAgaWYgKHdpbGRjYXJkRm91bmQpIHtcbiAgICAgICAgbm9kZS5lZGdlc1tcIipcIl0gPSByb290XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJvb3Rcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyB0aGlzIFRva2VuU2V0IGludG8gYW4gYXJyYXkgb2Ygc3RyaW5nc1xuICogY29udGFpbmVkIHdpdGhpbiB0aGUgVG9rZW5TZXQuXG4gKlxuICogQHJldHVybnMge3N0cmluZ1tdfVxuICovXG5sdW5yLlRva2VuU2V0LnByb3RvdHlwZS50b0FycmF5ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgd29yZHMgPSBbXVxuXG4gIHZhciBzdGFjayA9IFt7XG4gICAgcHJlZml4OiBcIlwiLFxuICAgIG5vZGU6IHRoaXNcbiAgfV1cblxuICB3aGlsZSAoc3RhY2subGVuZ3RoKSB7XG4gICAgdmFyIGZyYW1lID0gc3RhY2sucG9wKCksXG4gICAgICAgIGVkZ2VzID0gT2JqZWN0LmtleXMoZnJhbWUubm9kZS5lZGdlcyksXG4gICAgICAgIGxlbiA9IGVkZ2VzLmxlbmd0aFxuXG4gICAgaWYgKGZyYW1lLm5vZGUuZmluYWwpIHtcbiAgICAgIHdvcmRzLnB1c2goZnJhbWUucHJlZml4KVxuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHZhciBlZGdlID0gZWRnZXNbaV1cblxuICAgICAgc3RhY2sucHVzaCh7XG4gICAgICAgIHByZWZpeDogZnJhbWUucHJlZml4LmNvbmNhdChlZGdlKSxcbiAgICAgICAgbm9kZTogZnJhbWUubm9kZS5lZGdlc1tlZGdlXVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gd29yZHNcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSBUb2tlblNldC5cbiAqXG4gKiBUaGlzIGlzIGludGVuZGVkIHRvIGFsbG93IFRva2VuU2V0cyB0byBiZSB1c2VkIGFzIGtleXNcbiAqIGluIG9iamVjdHMsIGxhcmdlbHkgdG8gYWlkIHRoZSBjb25zdHJ1Y3Rpb24gYW5kIG1pbmltaXNhdGlvblxuICogb2YgYSBUb2tlblNldC4gQXMgc3VjaCBpdCBpcyBub3QgZGVzaWduZWQgdG8gYmUgYSBodW1hblxuICogZnJpZW5kbHkgcmVwcmVzZW50YXRpb24gb2YgdGhlIFRva2VuU2V0LlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmx1bnIuVG9rZW5TZXQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAvLyBOT1RFOiBVc2luZyBPYmplY3Qua2V5cyBoZXJlIGFzIHRoaXMuZWRnZXMgaXMgdmVyeSBsaWtlbHlcbiAgLy8gdG8gZW50ZXIgJ2hhc2gtbW9kZScgd2l0aCBtYW55IGtleXMgYmVpbmcgYWRkZWRcbiAgLy9cbiAgLy8gYXZvaWRpbmcgYSBmb3ItaW4gbG9vcCBoZXJlIGFzIGl0IGxlYWRzIHRvIHRoZSBmdW5jdGlvblxuICAvLyBiZWluZyBkZS1vcHRpbWlzZWQgKGF0IGxlYXN0IGluIFY4KS4gRnJvbSBzb21lIHNpbXBsZVxuICAvLyBiZW5jaG1hcmtzIHRoZSBwZXJmb3JtYW5jZSBpcyBjb21wYXJhYmxlLCBidXQgYWxsb3dpbmdcbiAgLy8gVjggdG8gb3B0aW1pemUgbWF5IG1lYW4gZWFzeSBwZXJmb3JtYW5jZSB3aW5zIGluIHRoZSBmdXR1cmUuXG5cbiAgaWYgKHRoaXMuX3N0cikge1xuICAgIHJldHVybiB0aGlzLl9zdHJcbiAgfVxuXG4gIHZhciBzdHIgPSB0aGlzLmZpbmFsID8gJzEnIDogJzAnLFxuICAgICAgbGFiZWxzID0gT2JqZWN0LmtleXModGhpcy5lZGdlcykuc29ydCgpLFxuICAgICAgbGVuID0gbGFiZWxzLmxlbmd0aFxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICB2YXIgbGFiZWwgPSBsYWJlbHNbaV0sXG4gICAgICAgIG5vZGUgPSB0aGlzLmVkZ2VzW2xhYmVsXVxuXG4gICAgc3RyID0gc3RyICsgbGFiZWwgKyBub2RlLmlkXG4gIH1cblxuICByZXR1cm4gc3RyXG59XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBUb2tlblNldCB0aGF0IGlzIHRoZSBpbnRlcnNlY3Rpb24gb2ZcbiAqIHRoaXMgVG9rZW5TZXQgYW5kIHRoZSBwYXNzZWQgVG9rZW5TZXQuXG4gKlxuICogVGhpcyBpbnRlcnNlY3Rpb24gd2lsbCB0YWtlIGludG8gYWNjb3VudCBhbnkgd2lsZGNhcmRzXG4gKiBjb250YWluZWQgd2l0aGluIHRoZSBUb2tlblNldC5cbiAqXG4gKiBAcGFyYW0ge2x1bnIuVG9rZW5TZXR9IGIgLSBBbiBvdGhlciBUb2tlblNldCB0byBpbnRlcnNlY3Qgd2l0aC5cbiAqIEByZXR1cm5zIHtsdW5yLlRva2VuU2V0fVxuICovXG5sdW5yLlRva2VuU2V0LnByb3RvdHlwZS5pbnRlcnNlY3QgPSBmdW5jdGlvbiAoYikge1xuICB2YXIgb3V0cHV0ID0gbmV3IGx1bnIuVG9rZW5TZXQsXG4gICAgICBmcmFtZSA9IHVuZGVmaW5lZFxuXG4gIHZhciBzdGFjayA9IFt7XG4gICAgcU5vZGU6IGIsXG4gICAgb3V0cHV0OiBvdXRwdXQsXG4gICAgbm9kZTogdGhpc1xuICB9XVxuXG4gIHdoaWxlIChzdGFjay5sZW5ndGgpIHtcbiAgICBmcmFtZSA9IHN0YWNrLnBvcCgpXG5cbiAgICAvLyBOT1RFOiBBcyB3aXRoIHRoZSAjdG9TdHJpbmcgbWV0aG9kLCB3ZSBhcmUgdXNpbmdcbiAgICAvLyBPYmplY3Qua2V5cyBhbmQgYSBmb3IgbG9vcCBpbnN0ZWFkIG9mIGEgZm9yLWluIGxvb3BcbiAgICAvLyBhcyBib3RoIG9mIHRoZXNlIG9iamVjdHMgZW50ZXIgJ2hhc2gnIG1vZGUsIGNhdXNpbmdcbiAgICAvLyB0aGUgZnVuY3Rpb24gdG8gYmUgZGUtb3B0aW1pc2VkIGluIFY4XG4gICAgdmFyIHFFZGdlcyA9IE9iamVjdC5rZXlzKGZyYW1lLnFOb2RlLmVkZ2VzKSxcbiAgICAgICAgcUxlbiA9IHFFZGdlcy5sZW5ndGgsXG4gICAgICAgIG5FZGdlcyA9IE9iamVjdC5rZXlzKGZyYW1lLm5vZGUuZWRnZXMpLFxuICAgICAgICBuTGVuID0gbkVkZ2VzLmxlbmd0aFxuXG4gICAgZm9yICh2YXIgcSA9IDA7IHEgPCBxTGVuOyBxKyspIHtcbiAgICAgIHZhciBxRWRnZSA9IHFFZGdlc1txXVxuXG4gICAgICBmb3IgKHZhciBuID0gMDsgbiA8IG5MZW47IG4rKykge1xuICAgICAgICB2YXIgbkVkZ2UgPSBuRWRnZXNbbl1cblxuICAgICAgICBpZiAobkVkZ2UgPT0gcUVkZ2UgfHwgcUVkZ2UgPT0gJyonKSB7XG4gICAgICAgICAgdmFyIG5vZGUgPSBmcmFtZS5ub2RlLmVkZ2VzW25FZGdlXSxcbiAgICAgICAgICAgICAgcU5vZGUgPSBmcmFtZS5xTm9kZS5lZGdlc1txRWRnZV0sXG4gICAgICAgICAgICAgIGZpbmFsID0gbm9kZS5maW5hbCAmJiBxTm9kZS5maW5hbCxcbiAgICAgICAgICAgICAgbmV4dCA9IHVuZGVmaW5lZFxuXG4gICAgICAgICAgaWYgKG5FZGdlIGluIGZyYW1lLm91dHB1dC5lZGdlcykge1xuICAgICAgICAgICAgLy8gYW4gZWRnZSBhbHJlYWR5IGV4aXN0cyBmb3IgdGhpcyBjaGFyYWN0ZXJcbiAgICAgICAgICAgIC8vIG5vIG5lZWQgdG8gY3JlYXRlIGEgbmV3IG5vZGUsIGp1c3Qgc2V0IHRoZSBmaW5hbGl0eVxuICAgICAgICAgICAgLy8gYml0IHVubGVzcyB0aGlzIG5vZGUgaXMgYWxyZWFkeSBmaW5hbFxuICAgICAgICAgICAgbmV4dCA9IGZyYW1lLm91dHB1dC5lZGdlc1tuRWRnZV1cbiAgICAgICAgICAgIG5leHQuZmluYWwgPSBuZXh0LmZpbmFsIHx8IGZpbmFsXG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gbm8gZWRnZSBleGlzdHMgeWV0LCBtdXN0IGNyZWF0ZSBvbmVcbiAgICAgICAgICAgIC8vIHNldCB0aGUgZmluYWxpdHkgYml0IGFuZCBpbnNlcnQgaXRcbiAgICAgICAgICAgIC8vIGludG8gdGhlIG91dHB1dFxuICAgICAgICAgICAgbmV4dCA9IG5ldyBsdW5yLlRva2VuU2V0XG4gICAgICAgICAgICBuZXh0LmZpbmFsID0gZmluYWxcbiAgICAgICAgICAgIGZyYW1lLm91dHB1dC5lZGdlc1tuRWRnZV0gPSBuZXh0XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc3RhY2sucHVzaCh7XG4gICAgICAgICAgICBxTm9kZTogcU5vZGUsXG4gICAgICAgICAgICBvdXRwdXQ6IG5leHQsXG4gICAgICAgICAgICBub2RlOiBub2RlXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvdXRwdXRcbn1cbmx1bnIuVG9rZW5TZXQuQnVpbGRlciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5wcmV2aW91c1dvcmQgPSBcIlwiXG4gIHRoaXMucm9vdCA9IG5ldyBsdW5yLlRva2VuU2V0XG4gIHRoaXMudW5jaGVja2VkTm9kZXMgPSBbXVxuICB0aGlzLm1pbmltaXplZE5vZGVzID0ge31cbn1cblxubHVuci5Ub2tlblNldC5CdWlsZGVyLnByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbiAod29yZCkge1xuICB2YXIgbm9kZSxcbiAgICAgIGNvbW1vblByZWZpeCA9IDBcblxuICBpZiAod29yZCA8IHRoaXMucHJldmlvdXNXb3JkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yIChcIk91dCBvZiBvcmRlciB3b3JkIGluc2VydGlvblwiKVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB3b3JkLmxlbmd0aCAmJiBpIDwgdGhpcy5wcmV2aW91c1dvcmQubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAod29yZFtpXSAhPSB0aGlzLnByZXZpb3VzV29yZFtpXSkgYnJlYWtcbiAgICBjb21tb25QcmVmaXgrK1xuICB9XG5cbiAgdGhpcy5taW5pbWl6ZShjb21tb25QcmVmaXgpXG5cbiAgaWYgKHRoaXMudW5jaGVja2VkTm9kZXMubGVuZ3RoID09IDApIHtcbiAgICBub2RlID0gdGhpcy5yb290XG4gIH0gZWxzZSB7XG4gICAgbm9kZSA9IHRoaXMudW5jaGVja2VkTm9kZXNbdGhpcy51bmNoZWNrZWROb2Rlcy5sZW5ndGggLSAxXS5jaGlsZFxuICB9XG5cbiAgZm9yICh2YXIgaSA9IGNvbW1vblByZWZpeDsgaSA8IHdvcmQubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgbmV4dE5vZGUgPSBuZXcgbHVuci5Ub2tlblNldCxcbiAgICAgICAgY2hhciA9IHdvcmRbaV1cblxuICAgIG5vZGUuZWRnZXNbY2hhcl0gPSBuZXh0Tm9kZVxuXG4gICAgdGhpcy51bmNoZWNrZWROb2Rlcy5wdXNoKHtcbiAgICAgIHBhcmVudDogbm9kZSxcbiAgICAgIGNoYXI6IGNoYXIsXG4gICAgICBjaGlsZDogbmV4dE5vZGVcbiAgICB9KVxuXG4gICAgbm9kZSA9IG5leHROb2RlXG4gIH1cblxuICBub2RlLmZpbmFsID0gdHJ1ZVxuICB0aGlzLnByZXZpb3VzV29yZCA9IHdvcmRcbn1cblxubHVuci5Ub2tlblNldC5CdWlsZGVyLnByb3RvdHlwZS5maW5pc2ggPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMubWluaW1pemUoMClcbn1cblxubHVuci5Ub2tlblNldC5CdWlsZGVyLnByb3RvdHlwZS5taW5pbWl6ZSA9IGZ1bmN0aW9uIChkb3duVG8pIHtcbiAgZm9yICh2YXIgaSA9IHRoaXMudW5jaGVja2VkTm9kZXMubGVuZ3RoIC0gMTsgaSA+PSBkb3duVG87IGktLSkge1xuICAgIHZhciBub2RlID0gdGhpcy51bmNoZWNrZWROb2Rlc1tpXSxcbiAgICAgICAgY2hpbGRLZXkgPSBub2RlLmNoaWxkLnRvU3RyaW5nKClcblxuICAgIGlmIChjaGlsZEtleSBpbiB0aGlzLm1pbmltaXplZE5vZGVzKSB7XG4gICAgICBub2RlLnBhcmVudC5lZGdlc1tub2RlLmNoYXJdID0gdGhpcy5taW5pbWl6ZWROb2Rlc1tjaGlsZEtleV1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQ2FjaGUgdGhlIGtleSBmb3IgdGhpcyBub2RlIHNpbmNlXG4gICAgICAvLyB3ZSBrbm93IGl0IGNhbid0IGNoYW5nZSBhbnltb3JlXG4gICAgICBub2RlLmNoaWxkLl9zdHIgPSBjaGlsZEtleVxuXG4gICAgICB0aGlzLm1pbmltaXplZE5vZGVzW2NoaWxkS2V5XSA9IG5vZGUuY2hpbGRcbiAgICB9XG5cbiAgICB0aGlzLnVuY2hlY2tlZE5vZGVzLnBvcCgpXG4gIH1cbn1cbi8qIVxuICogbHVuci5JbmRleFxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogQW4gaW5kZXggY29udGFpbnMgdGhlIGJ1aWx0IGluZGV4IG9mIGFsbCBkb2N1bWVudHMgYW5kIHByb3ZpZGVzIGEgcXVlcnkgaW50ZXJmYWNlXG4gKiB0byB0aGUgaW5kZXguXG4gKlxuICogVXN1YWxseSBpbnN0YW5jZXMgb2YgbHVuci5JbmRleCB3aWxsIG5vdCBiZSBjcmVhdGVkIHVzaW5nIHRoaXMgY29uc3RydWN0b3IsIGluc3RlYWRcbiAqIGx1bnIuQnVpbGRlciBzaG91bGQgYmUgdXNlZCB0byBjb25zdHJ1Y3QgbmV3IGluZGV4ZXMsIG9yIGx1bnIuSW5kZXgubG9hZCBzaG91bGQgYmVcbiAqIHVzZWQgdG8gbG9hZCBwcmV2aW91c2x5IGJ1aWx0IGFuZCBzZXJpYWxpemVkIGluZGV4ZXMuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge09iamVjdH0gYXR0cnMgLSBUaGUgYXR0cmlidXRlcyBvZiB0aGUgYnVpbHQgc2VhcmNoIGluZGV4LlxuICogQHBhcmFtIHtPYmplY3R9IGF0dHJzLmludmVydGVkSW5kZXggLSBBbiBpbmRleCBvZiB0ZXJtL2ZpZWxkIHRvIGRvY3VtZW50IHJlZmVyZW5jZS5cbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgbHVuci5WZWN0b3I+fSBhdHRycy5kb2N1bWVudFZlY3RvcnMgLSBEb2N1bWVudCB2ZWN0b3JzIGtleWVkIGJ5IGRvY3VtZW50IHJlZmVyZW5jZS5cbiAqIEBwYXJhbSB7bHVuci5Ub2tlblNldH0gYXR0cnMudG9rZW5TZXQgLSBBbiBzZXQgb2YgYWxsIGNvcnB1cyB0b2tlbnMuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBhdHRycy5maWVsZHMgLSBUaGUgbmFtZXMgb2YgaW5kZXhlZCBkb2N1bWVudCBmaWVsZHMuXG4gKiBAcGFyYW0ge2x1bnIuUGlwZWxpbmV9IGF0dHJzLnBpcGVsaW5lIC0gVGhlIHBpcGVsaW5lIHRvIHVzZSBmb3Igc2VhcmNoIHRlcm1zLlxuICovXG5sdW5yLkluZGV4ID0gZnVuY3Rpb24gKGF0dHJzKSB7XG4gIHRoaXMuaW52ZXJ0ZWRJbmRleCA9IGF0dHJzLmludmVydGVkSW5kZXhcbiAgdGhpcy5maWVsZFZlY3RvcnMgPSBhdHRycy5maWVsZFZlY3RvcnNcbiAgdGhpcy50b2tlblNldCA9IGF0dHJzLnRva2VuU2V0XG4gIHRoaXMuZmllbGRzID0gYXR0cnMuZmllbGRzXG4gIHRoaXMucGlwZWxpbmUgPSBhdHRycy5waXBlbGluZVxufVxuXG4vKipcbiAqIEEgcmVzdWx0IGNvbnRhaW5zIGRldGFpbHMgb2YgYSBkb2N1bWVudCBtYXRjaGluZyBhIHNlYXJjaCBxdWVyeS5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IGx1bnIuSW5kZXh+UmVzdWx0XG4gKiBAcHJvcGVydHkge3N0cmluZ30gcmVmIC0gVGhlIHJlZmVyZW5jZSBvZiB0aGUgZG9jdW1lbnQgdGhpcyByZXN1bHQgcmVwcmVzZW50cy5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzY29yZSAtIEEgbnVtYmVyIGJldHdlZW4gMCBhbmQgMSByZXByZXNlbnRpbmcgaG93IHNpbWlsYXIgdGhpcyBkb2N1bWVudCBpcyB0byB0aGUgcXVlcnkuXG4gKiBAcHJvcGVydHkge2x1bnIuTWF0Y2hEYXRhfSBtYXRjaERhdGEgLSBDb250YWlucyBtZXRhZGF0YSBhYm91dCB0aGlzIG1hdGNoIGluY2x1ZGluZyB3aGljaCB0ZXJtKHMpIGNhdXNlZCB0aGUgbWF0Y2guXG4gKi9cblxuLyoqXG4gKiBBbHRob3VnaCBsdW5yIHByb3ZpZGVzIHRoZSBhYmlsaXR5IHRvIGNyZWF0ZSBxdWVyaWVzIHVzaW5nIGx1bnIuUXVlcnksIGl0IGFsc28gcHJvdmlkZXMgYSBzaW1wbGVcbiAqIHF1ZXJ5IGxhbmd1YWdlIHdoaWNoIGl0c2VsZiBpcyBwYXJzZWQgaW50byBhbiBpbnN0YW5jZSBvZiBsdW5yLlF1ZXJ5LlxuICpcbiAqIEZvciBwcm9ncmFtbWF0aWNhbGx5IGJ1aWxkaW5nIHF1ZXJpZXMgaXQgaXMgYWR2aXNlZCB0byBkaXJlY3RseSB1c2UgbHVuci5RdWVyeSwgdGhlIHF1ZXJ5IGxhbmd1YWdlXG4gKiBpcyBiZXN0IHVzZWQgZm9yIGh1bWFuIGVudGVyZWQgdGV4dCByYXRoZXIgdGhhbiBwcm9ncmFtIGdlbmVyYXRlZCB0ZXh0LlxuICpcbiAqIEF0IGl0cyBzaW1wbGVzdCBxdWVyaWVzIGNhbiBqdXN0IGJlIGEgc2luZ2xlIHRlcm0sIGUuZy4gYGhlbGxvYCwgbXVsdGlwbGUgdGVybXMgYXJlIGFsc28gc3VwcG9ydGVkXG4gKiBhbmQgd2lsbCBiZSBjb21iaW5lZCB3aXRoIE9SLCBlLmcgYGhlbGxvIHdvcmxkYCB3aWxsIG1hdGNoIGRvY3VtZW50cyB0aGF0IGNvbnRhaW4gZWl0aGVyICdoZWxsbydcbiAqIG9yICd3b3JsZCcsIHRob3VnaCB0aG9zZSB0aGF0IGNvbnRhaW4gYm90aCB3aWxsIHJhbmsgaGlnaGVyIGluIHRoZSByZXN1bHRzLlxuICpcbiAqIFdpbGRjYXJkcyBjYW4gYmUgaW5jbHVkZWQgaW4gdGVybXMgdG8gbWF0Y2ggb25lIG9yIG1vcmUgdW5zcGVjaWZpZWQgY2hhcmFjdGVycywgdGhlc2Ugd2lsZGNhcmRzIGNhblxuICogYmUgaW5zZXJ0ZWQgYW55d2hlcmUgd2l0aGluIHRoZSB0ZXJtLCBhbmQgbW9yZSB0aGFuIG9uZSB3aWxkY2FyZCBjYW4gZXhpc3QgaW4gYSBzaW5nbGUgdGVybS4gQWRkaW5nXG4gKiB3aWxkY2FyZHMgd2lsbCBpbmNyZWFzZSB0aGUgbnVtYmVyIG9mIGRvY3VtZW50cyB0aGF0IHdpbGwgYmUgZm91bmQgYnV0IGNhbiBhbHNvIGhhdmUgYSBuZWdhdGl2ZVxuICogaW1wYWN0IG9uIHF1ZXJ5IHBlcmZvcm1hbmNlLCBlc3BlY2lhbGx5IHdpdGggd2lsZGNhcmRzIGF0IHRoZSBiZWdpbm5pbmcgb2YgYSB0ZXJtLlxuICpcbiAqIFRlcm1zIGNhbiBiZSByZXN0cmljdGVkIHRvIHNwZWNpZmljIGZpZWxkcywgZS5nLiBgdGl0bGU6aGVsbG9gLCBvbmx5IGRvY3VtZW50cyB3aXRoIHRoZSB0ZXJtXG4gKiBoZWxsbyBpbiB0aGUgdGl0bGUgZmllbGQgd2lsbCBtYXRjaCB0aGlzIHF1ZXJ5LiBVc2luZyBhIGZpZWxkIG5vdCBwcmVzZW50IGluIHRoZSBpbmRleCB3aWxsIGxlYWRcbiAqIHRvIGFuIGVycm9yIGJlaW5nIHRocm93bi5cbiAqXG4gKiBNb2RpZmllcnMgY2FuIGFsc28gYmUgYWRkZWQgdG8gdGVybXMsIGx1bnIgc3VwcG9ydHMgZWRpdCBkaXN0YW5jZSBhbmQgYm9vc3QgbW9kaWZpZXJzIG9uIHRlcm1zLiBBIHRlcm1cbiAqIGJvb3N0IHdpbGwgbWFrZSBkb2N1bWVudHMgbWF0Y2hpbmcgdGhhdCB0ZXJtIHNjb3JlIGhpZ2hlciwgZS5nLiBgZm9vXjVgLiBFZGl0IGRpc3RhbmNlIGlzIGFsc28gc3VwcG9ydGVkXG4gKiB0byBwcm92aWRlIGZ1enp5IG1hdGNoaW5nLCBlLmcuICdoZWxsb34yJyB3aWxsIG1hdGNoIGRvY3VtZW50cyB3aXRoIGhlbGxvIHdpdGggYW4gZWRpdCBkaXN0YW5jZSBvZiAyLlxuICogQXZvaWQgbGFyZ2UgdmFsdWVzIGZvciBlZGl0IGRpc3RhbmNlIHRvIGltcHJvdmUgcXVlcnkgcGVyZm9ybWFuY2UuXG4gKlxuICogVG8gZXNjYXBlIHNwZWNpYWwgY2hhcmFjdGVycyB0aGUgYmFja3NsYXNoIGNoYXJhY3RlciAnXFwnIGNhbiBiZSB1c2VkLCB0aGlzIGFsbG93cyBzZWFyY2hlcyB0byBpbmNsdWRlXG4gKiBjaGFyYWN0ZXJzIHRoYXQgd291bGQgbm9ybWFsbHkgYmUgY29uc2lkZXJlZCBtb2RpZmllcnMsIGUuZy4gYGZvb1xcfjJgIHdpbGwgc2VhcmNoIGZvciBhIHRlcm0gXCJmb29+MlwiIGluc3RlYWRcbiAqIG9mIGF0dGVtcHRpbmcgdG8gYXBwbHkgYSBib29zdCBvZiAyIHRvIHRoZSBzZWFyY2ggdGVybSBcImZvb1wiLlxuICpcbiAqIEB0eXBlZGVmIHtzdHJpbmd9IGx1bnIuSW5kZXh+UXVlcnlTdHJpbmdcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlNpbXBsZSBzaW5nbGUgdGVybSBxdWVyeTwvY2FwdGlvbj5cbiAqIGhlbGxvXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5NdWx0aXBsZSB0ZXJtIHF1ZXJ5PC9jYXB0aW9uPlxuICogaGVsbG8gd29ybGRcbiAqIEBleGFtcGxlIDxjYXB0aW9uPnRlcm0gc2NvcGVkIHRvIGEgZmllbGQ8L2NhcHRpb24+XG4gKiB0aXRsZTpoZWxsb1xuICogQGV4YW1wbGUgPGNhcHRpb24+dGVybSB3aXRoIGEgYm9vc3Qgb2YgMTA8L2NhcHRpb24+XG4gKiBoZWxsb14xMFxuICogQGV4YW1wbGUgPGNhcHRpb24+dGVybSB3aXRoIGFuIGVkaXQgZGlzdGFuY2Ugb2YgMjwvY2FwdGlvbj5cbiAqIGhlbGxvfjJcbiAqL1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgc2VhcmNoIGFnYWluc3QgdGhlIGluZGV4IHVzaW5nIGx1bnIgcXVlcnkgc3ludGF4LlxuICpcbiAqIFJlc3VsdHMgd2lsbCBiZSByZXR1cm5lZCBzb3J0ZWQgYnkgdGhlaXIgc2NvcmUsIHRoZSBtb3N0IHJlbGV2YW50IHJlc3VsdHNcbiAqIHdpbGwgYmUgcmV0dXJuZWQgZmlyc3QuXG4gKlxuICogRm9yIG1vcmUgcHJvZ3JhbW1hdGljIHF1ZXJ5aW5nIHVzZSBsdW5yLkluZGV4I3F1ZXJ5LlxuICpcbiAqIEBwYXJhbSB7bHVuci5JbmRleH5RdWVyeVN0cmluZ30gcXVlcnlTdHJpbmcgLSBBIHN0cmluZyBjb250YWluaW5nIGEgbHVuciBxdWVyeS5cbiAqIEB0aHJvd3Mge2x1bnIuUXVlcnlQYXJzZUVycm9yfSBJZiB0aGUgcGFzc2VkIHF1ZXJ5IHN0cmluZyBjYW5ub3QgYmUgcGFyc2VkLlxuICogQHJldHVybnMge2x1bnIuSW5kZXh+UmVzdWx0W119XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLnNlYXJjaCA9IGZ1bmN0aW9uIChxdWVyeVN0cmluZykge1xuICByZXR1cm4gdGhpcy5xdWVyeShmdW5jdGlvbiAocXVlcnkpIHtcbiAgICB2YXIgcGFyc2VyID0gbmV3IGx1bnIuUXVlcnlQYXJzZXIocXVlcnlTdHJpbmcsIHF1ZXJ5KVxuICAgIHBhcnNlci5wYXJzZSgpXG4gIH0pXG59XG5cbi8qKlxuICogQSBxdWVyeSBidWlsZGVyIGNhbGxiYWNrIHByb3ZpZGVzIGEgcXVlcnkgb2JqZWN0IHRvIGJlIHVzZWQgdG8gZXhwcmVzc1xuICogdGhlIHF1ZXJ5IHRvIHBlcmZvcm0gb24gdGhlIGluZGV4LlxuICpcbiAqIEBjYWxsYmFjayBsdW5yLkluZGV4fnF1ZXJ5QnVpbGRlclxuICogQHBhcmFtIHtsdW5yLlF1ZXJ5fSBxdWVyeSAtIFRoZSBxdWVyeSBvYmplY3QgdG8gYnVpbGQgdXAuXG4gKiBAdGhpcyBsdW5yLlF1ZXJ5XG4gKi9cblxuLyoqXG4gKiBQZXJmb3JtcyBhIHF1ZXJ5IGFnYWluc3QgdGhlIGluZGV4IHVzaW5nIHRoZSB5aWVsZGVkIGx1bnIuUXVlcnkgb2JqZWN0LlxuICpcbiAqIElmIHBlcmZvcm1pbmcgcHJvZ3JhbW1hdGljIHF1ZXJpZXMgYWdhaW5zdCB0aGUgaW5kZXgsIHRoaXMgbWV0aG9kIGlzIHByZWZlcnJlZFxuICogb3ZlciBsdW5yLkluZGV4I3NlYXJjaCBzbyBhcyB0byBhdm9pZCB0aGUgYWRkaXRpb25hbCBxdWVyeSBwYXJzaW5nIG92ZXJoZWFkLlxuICpcbiAqIEEgcXVlcnkgb2JqZWN0IGlzIHlpZWxkZWQgdG8gdGhlIHN1cHBsaWVkIGZ1bmN0aW9uIHdoaWNoIHNob3VsZCBiZSB1c2VkIHRvXG4gKiBleHByZXNzIHRoZSBxdWVyeSB0byBiZSBydW4gYWdhaW5zdCB0aGUgaW5kZXguXG4gKlxuICogTm90ZSB0aGF0IGFsdGhvdWdoIHRoaXMgZnVuY3Rpb24gdGFrZXMgYSBjYWxsYmFjayBwYXJhbWV0ZXIgaXQgaXMgX25vdF8gYW5cbiAqIGFzeW5jaHJvbm91cyBvcGVyYXRpb24sIHRoZSBjYWxsYmFjayBpcyBqdXN0IHlpZWxkZWQgYSBxdWVyeSBvYmplY3QgdG8gYmVcbiAqIGN1c3RvbWl6ZWQuXG4gKlxuICogQHBhcmFtIHtsdW5yLkluZGV4fnF1ZXJ5QnVpbGRlcn0gZm4gLSBBIGZ1bmN0aW9uIHRoYXQgaXMgdXNlZCB0byBidWlsZCB0aGUgcXVlcnkuXG4gKiBAcmV0dXJucyB7bHVuci5JbmRleH5SZXN1bHRbXX1cbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUucXVlcnkgPSBmdW5jdGlvbiAoZm4pIHtcbiAgLy8gZm9yIGVhY2ggcXVlcnkgY2xhdXNlXG4gIC8vICogcHJvY2VzcyB0ZXJtc1xuICAvLyAqIGV4cGFuZCB0ZXJtcyBmcm9tIHRva2VuIHNldFxuICAvLyAqIGZpbmQgbWF0Y2hpbmcgZG9jdW1lbnRzIGFuZCBtZXRhZGF0YVxuICAvLyAqIGdldCBkb2N1bWVudCB2ZWN0b3JzXG4gIC8vICogc2NvcmUgZG9jdW1lbnRzXG5cbiAgdmFyIHF1ZXJ5ID0gbmV3IGx1bnIuUXVlcnkodGhpcy5maWVsZHMpLFxuICAgICAgbWF0Y2hpbmdGaWVsZHMgPSBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgcXVlcnlWZWN0b3JzID0gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgIHRlcm1GaWVsZENhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuXG4gIGZuLmNhbGwocXVlcnksIHF1ZXJ5KVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcXVlcnkuY2xhdXNlcy5sZW5ndGg7IGkrKykge1xuICAgIC8qXG4gICAgICogVW5sZXNzIHRoZSBwaXBlbGluZSBoYXMgYmVlbiBkaXNhYmxlZCBmb3IgdGhpcyB0ZXJtLCB3aGljaCBpc1xuICAgICAqIHRoZSBjYXNlIGZvciB0ZXJtcyB3aXRoIHdpbGRjYXJkcywgd2UgbmVlZCB0byBwYXNzIHRoZSBjbGF1c2VcbiAgICAgKiB0ZXJtIHRocm91Z2ggdGhlIHNlYXJjaCBwaXBlbGluZS4gQSBwaXBlbGluZSByZXR1cm5zIGFuIGFycmF5XG4gICAgICogb2YgcHJvY2Vzc2VkIHRlcm1zLiBQaXBlbGluZSBmdW5jdGlvbnMgbWF5IGV4cGFuZCB0aGUgcGFzc2VkXG4gICAgICogdGVybSwgd2hpY2ggbWVhbnMgd2UgbWF5IGVuZCB1cCBwZXJmb3JtaW5nIG11bHRpcGxlIGluZGV4IGxvb2t1cHNcbiAgICAgKiBmb3IgYSBzaW5nbGUgcXVlcnkgdGVybS5cbiAgICAgKi9cbiAgICB2YXIgY2xhdXNlID0gcXVlcnkuY2xhdXNlc1tpXSxcbiAgICAgICAgdGVybXMgPSBudWxsXG5cbiAgICBpZiAoY2xhdXNlLnVzZVBpcGVsaW5lKSB7XG4gICAgICB0ZXJtcyA9IHRoaXMucGlwZWxpbmUucnVuU3RyaW5nKGNsYXVzZS50ZXJtKVxuICAgIH0gZWxzZSB7XG4gICAgICB0ZXJtcyA9IFtjbGF1c2UudGVybV1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBtID0gMDsgbSA8IHRlcm1zLmxlbmd0aDsgbSsrKSB7XG4gICAgICB2YXIgdGVybSA9IHRlcm1zW21dXG5cbiAgICAgIC8qXG4gICAgICAgKiBFYWNoIHRlcm0gcmV0dXJuZWQgZnJvbSB0aGUgcGlwZWxpbmUgbmVlZHMgdG8gdXNlIHRoZSBzYW1lIHF1ZXJ5XG4gICAgICAgKiBjbGF1c2Ugb2JqZWN0LCBlLmcuIHRoZSBzYW1lIGJvb3N0IGFuZCBvciBlZGl0IGRpc3RhbmNlLiBUaGVcbiAgICAgICAqIHNpbXBsZXN0IHdheSB0byBkbyB0aGlzIGlzIHRvIHJlLXVzZSB0aGUgY2xhdXNlIG9iamVjdCBidXQgbXV0YXRlXG4gICAgICAgKiBpdHMgdGVybSBwcm9wZXJ0eS5cbiAgICAgICAqL1xuICAgICAgY2xhdXNlLnRlcm0gPSB0ZXJtXG5cbiAgICAgIC8qXG4gICAgICAgKiBGcm9tIHRoZSB0ZXJtIGluIHRoZSBjbGF1c2Ugd2UgY3JlYXRlIGEgdG9rZW4gc2V0IHdoaWNoIHdpbGwgdGhlblxuICAgICAgICogYmUgdXNlZCB0byBpbnRlcnNlY3QgdGhlIGluZGV4ZXMgdG9rZW4gc2V0IHRvIGdldCBhIGxpc3Qgb2YgdGVybXNcbiAgICAgICAqIHRvIGxvb2t1cCBpbiB0aGUgaW52ZXJ0ZWQgaW5kZXhcbiAgICAgICAqL1xuICAgICAgdmFyIHRlcm1Ub2tlblNldCA9IGx1bnIuVG9rZW5TZXQuZnJvbUNsYXVzZShjbGF1c2UpLFxuICAgICAgICAgIGV4cGFuZGVkVGVybXMgPSB0aGlzLnRva2VuU2V0LmludGVyc2VjdCh0ZXJtVG9rZW5TZXQpLnRvQXJyYXkoKVxuXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGV4cGFuZGVkVGVybXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgLypcbiAgICAgICAgICogRm9yIGVhY2ggdGVybSBnZXQgdGhlIHBvc3RpbmcgYW5kIHRlcm1JbmRleCwgdGhpcyBpcyByZXF1aXJlZCBmb3JcbiAgICAgICAgICogYnVpbGRpbmcgdGhlIHF1ZXJ5IHZlY3Rvci5cbiAgICAgICAgICovXG4gICAgICAgIHZhciBleHBhbmRlZFRlcm0gPSBleHBhbmRlZFRlcm1zW2pdLFxuICAgICAgICAgICAgcG9zdGluZyA9IHRoaXMuaW52ZXJ0ZWRJbmRleFtleHBhbmRlZFRlcm1dLFxuICAgICAgICAgICAgdGVybUluZGV4ID0gcG9zdGluZy5faW5kZXhcblxuICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGNsYXVzZS5maWVsZHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAvKlxuICAgICAgICAgICAqIEZvciBlYWNoIGZpZWxkIHRoYXQgdGhpcyBxdWVyeSB0ZXJtIGlzIHNjb3BlZCBieSAoYnkgZGVmYXVsdFxuICAgICAgICAgICAqIGFsbCBmaWVsZHMgYXJlIGluIHNjb3BlKSB3ZSBuZWVkIHRvIGdldCBhbGwgdGhlIGRvY3VtZW50IHJlZnNcbiAgICAgICAgICAgKiB0aGF0IGhhdmUgdGhpcyB0ZXJtIGluIHRoYXQgZmllbGQuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBUaGUgcG9zdGluZyBpcyB0aGUgZW50cnkgaW4gdGhlIGludmVydGVkSW5kZXggZm9yIHRoZSBtYXRjaGluZ1xuICAgICAgICAgICAqIHRlcm0gZnJvbSBhYm92ZS5cbiAgICAgICAgICAgKi9cbiAgICAgICAgICB2YXIgZmllbGQgPSBjbGF1c2UuZmllbGRzW2tdLFxuICAgICAgICAgICAgICBmaWVsZFBvc3RpbmcgPSBwb3N0aW5nW2ZpZWxkXSxcbiAgICAgICAgICAgICAgbWF0Y2hpbmdEb2N1bWVudFJlZnMgPSBPYmplY3Qua2V5cyhmaWVsZFBvc3RpbmcpLFxuICAgICAgICAgICAgICB0ZXJtRmllbGQgPSBleHBhbmRlZFRlcm0gKyBcIi9cIiArIGZpZWxkXG5cbiAgICAgICAgICAvKlxuICAgICAgICAgICAqIFRvIHN1cHBvcnQgZmllbGQgbGV2ZWwgYm9vc3RzIGEgcXVlcnkgdmVjdG9yIGlzIGNyZWF0ZWQgcGVyXG4gICAgICAgICAgICogZmllbGQuIFRoaXMgdmVjdG9yIGlzIHBvcHVsYXRlZCB1c2luZyB0aGUgdGVybUluZGV4IGZvdW5kIGZvclxuICAgICAgICAgICAqIHRoZSB0ZXJtIGFuZCBhIHVuaXQgdmFsdWUgd2l0aCB0aGUgYXBwcm9wcmlhdGUgYm9vc3QgYXBwbGllZC5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIElmIHRoZSBxdWVyeSB2ZWN0b3IgZm9yIHRoaXMgZmllbGQgZG9lcyBub3QgZXhpc3QgeWV0IGl0IG5lZWRzXG4gICAgICAgICAgICogdG8gYmUgY3JlYXRlZC5cbiAgICAgICAgICAgKi9cbiAgICAgICAgICBpZiAocXVlcnlWZWN0b3JzW2ZpZWxkXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBxdWVyeVZlY3RvcnNbZmllbGRdID0gbmV3IGx1bnIuVmVjdG9yXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLypcbiAgICAgICAgICAgKiBVc2luZyB1cHNlcnQgYmVjYXVzZSB0aGVyZSBjb3VsZCBhbHJlYWR5IGJlIGFuIGVudHJ5IGluIHRoZSB2ZWN0b3JcbiAgICAgICAgICAgKiBmb3IgdGhlIHRlcm0gd2UgYXJlIHdvcmtpbmcgd2l0aC4gSW4gdGhhdCBjYXNlIHdlIGp1c3QgYWRkIHRoZSBzY29yZXNcbiAgICAgICAgICAgKiB0b2dldGhlci5cbiAgICAgICAgICAgKi9cbiAgICAgICAgICBxdWVyeVZlY3RvcnNbZmllbGRdLnVwc2VydCh0ZXJtSW5kZXgsIDEgKiBjbGF1c2UuYm9vc3QsIGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhICsgYiB9KVxuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogSWYgd2UndmUgYWxyZWFkeSBzZWVuIHRoaXMgdGVybSwgZmllbGQgY29tYm8gdGhlbiB3ZSd2ZSBhbHJlYWR5IGNvbGxlY3RlZFxuICAgICAgICAgICAqIHRoZSBtYXRjaGluZyBkb2N1bWVudHMgYW5kIG1ldGFkYXRhLCBubyBuZWVkIHRvIGdvIHRocm91Z2ggYWxsIHRoYXQgYWdhaW5cbiAgICAgICAgICAgKi9cbiAgICAgICAgICBpZiAodGVybUZpZWxkQ2FjaGVbdGVybUZpZWxkXSkge1xuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmb3IgKHZhciBsID0gMDsgbCA8IG1hdGNoaW5nRG9jdW1lbnRSZWZzLmxlbmd0aDsgbCsrKSB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogQWxsIG1ldGFkYXRhIGZvciB0aGlzIHRlcm0vZmllbGQvZG9jdW1lbnQgdHJpcGxlXG4gICAgICAgICAgICAgKiBhcmUgdGhlbiBleHRyYWN0ZWQgYW5kIGNvbGxlY3RlZCBpbnRvIGFuIGluc3RhbmNlXG4gICAgICAgICAgICAgKiBvZiBsdW5yLk1hdGNoRGF0YSByZWFkeSB0byBiZSByZXR1cm5lZCBpbiB0aGUgcXVlcnlcbiAgICAgICAgICAgICAqIHJlc3VsdHNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdmFyIG1hdGNoaW5nRG9jdW1lbnRSZWYgPSBtYXRjaGluZ0RvY3VtZW50UmVmc1tsXSxcbiAgICAgICAgICAgICAgICBtYXRjaGluZ0ZpZWxkUmVmID0gbmV3IGx1bnIuRmllbGRSZWYgKG1hdGNoaW5nRG9jdW1lbnRSZWYsIGZpZWxkKSxcbiAgICAgICAgICAgICAgICBtZXRhZGF0YSA9IGZpZWxkUG9zdGluZ1ttYXRjaGluZ0RvY3VtZW50UmVmXSxcbiAgICAgICAgICAgICAgICBmaWVsZE1hdGNoXG5cbiAgICAgICAgICAgIGlmICgoZmllbGRNYXRjaCA9IG1hdGNoaW5nRmllbGRzW21hdGNoaW5nRmllbGRSZWZdKSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIG1hdGNoaW5nRmllbGRzW21hdGNoaW5nRmllbGRSZWZdID0gbmV3IGx1bnIuTWF0Y2hEYXRhIChleHBhbmRlZFRlcm0sIGZpZWxkLCBtZXRhZGF0YSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGZpZWxkTWF0Y2guYWRkKGV4cGFuZGVkVGVybSwgdGVybSwgbWV0YWRhdGEpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0ZXJtRmllbGRDYWNoZVt0ZXJtRmllbGRdID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFyIG1hdGNoaW5nRmllbGRSZWZzID0gT2JqZWN0LmtleXMobWF0Y2hpbmdGaWVsZHMpLFxuICAgICAgcmVzdWx0cyA9IFtdLFxuICAgICAgbWF0Y2hlcyA9IE9iamVjdC5jcmVhdGUobnVsbClcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IG1hdGNoaW5nRmllbGRSZWZzLmxlbmd0aDsgaSsrKSB7XG4gICAgLypcbiAgICAgKiBDdXJyZW50bHkgd2UgaGF2ZSBkb2N1bWVudCBmaWVsZHMgdGhhdCBtYXRjaCB0aGUgcXVlcnksIGJ1dCB3ZVxuICAgICAqIG5lZWQgdG8gcmV0dXJuIGRvY3VtZW50cy4gVGhlIG1hdGNoRGF0YSBhbmQgc2NvcmVzIGFyZSBjb21iaW5lZFxuICAgICAqIGZyb20gbXVsdGlwbGUgZmllbGRzIGJlbG9uZ2luZyB0byB0aGUgc2FtZSBkb2N1bWVudC5cbiAgICAgKlxuICAgICAqIFNjb3JlcyBhcmUgY2FsY3VsYXRlZCBieSBmaWVsZCwgdXNpbmcgdGhlIHF1ZXJ5IHZlY3RvcnMgY3JlYXRlZFxuICAgICAqIGFib3ZlLCBhbmQgY29tYmluZWQgaW50byBhIGZpbmFsIGRvY3VtZW50IHNjb3JlIHVzaW5nIGFkZGl0aW9uLlxuICAgICAqL1xuICAgIHZhciBmaWVsZFJlZiA9IGx1bnIuRmllbGRSZWYuZnJvbVN0cmluZyhtYXRjaGluZ0ZpZWxkUmVmc1tpXSksXG4gICAgICAgIGRvY1JlZiA9IGZpZWxkUmVmLmRvY1JlZixcbiAgICAgICAgZmllbGRWZWN0b3IgPSB0aGlzLmZpZWxkVmVjdG9yc1tmaWVsZFJlZl0sXG4gICAgICAgIHNjb3JlID0gcXVlcnlWZWN0b3JzW2ZpZWxkUmVmLmZpZWxkTmFtZV0uc2ltaWxhcml0eShmaWVsZFZlY3RvciksXG4gICAgICAgIGRvY01hdGNoXG5cbiAgICBpZiAoKGRvY01hdGNoID0gbWF0Y2hlc1tkb2NSZWZdKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBkb2NNYXRjaC5zY29yZSArPSBzY29yZVxuICAgICAgZG9jTWF0Y2gubWF0Y2hEYXRhLmNvbWJpbmUobWF0Y2hpbmdGaWVsZHNbZmllbGRSZWZdKVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbWF0Y2ggPSB7XG4gICAgICAgIHJlZjogZG9jUmVmLFxuICAgICAgICBzY29yZTogc2NvcmUsXG4gICAgICAgIG1hdGNoRGF0YTogbWF0Y2hpbmdGaWVsZHNbZmllbGRSZWZdXG4gICAgICB9XG4gICAgICBtYXRjaGVzW2RvY1JlZl0gPSBtYXRjaFxuICAgICAgcmVzdWx0cy5wdXNoKG1hdGNoKVxuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIFNvcnQgdGhlIHJlc3VsdHMgb2JqZWN0cyBieSBzY29yZSwgaGlnaGVzdCBmaXJzdC5cbiAgICovXG4gIHJldHVybiByZXN1bHRzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gYi5zY29yZSAtIGEuc2NvcmVcbiAgfSlcbn1cblxuLyoqXG4gKiBQcmVwYXJlcyB0aGUgaW5kZXggZm9yIEpTT04gc2VyaWFsaXphdGlvbi5cbiAqXG4gKiBUaGUgc2NoZW1hIGZvciB0aGlzIEpTT04gYmxvYiB3aWxsIGJlIGRlc2NyaWJlZCBpbiBhXG4gKiBzZXBhcmF0ZSBKU09OIHNjaGVtYSBmaWxlLlxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGludmVydGVkSW5kZXggPSBPYmplY3Qua2V5cyh0aGlzLmludmVydGVkSW5kZXgpXG4gICAgLnNvcnQoKVxuICAgIC5tYXAoZnVuY3Rpb24gKHRlcm0pIHtcbiAgICAgIHJldHVybiBbdGVybSwgdGhpcy5pbnZlcnRlZEluZGV4W3Rlcm1dXVxuICAgIH0sIHRoaXMpXG5cbiAgdmFyIGZpZWxkVmVjdG9ycyA9IE9iamVjdC5rZXlzKHRoaXMuZmllbGRWZWN0b3JzKVxuICAgIC5tYXAoZnVuY3Rpb24gKHJlZikge1xuICAgICAgcmV0dXJuIFtyZWYsIHRoaXMuZmllbGRWZWN0b3JzW3JlZl0udG9KU09OKCldXG4gICAgfSwgdGhpcylcblxuICByZXR1cm4ge1xuICAgIHZlcnNpb246IGx1bnIudmVyc2lvbixcbiAgICBmaWVsZHM6IHRoaXMuZmllbGRzLFxuICAgIGZpZWxkVmVjdG9yczogZmllbGRWZWN0b3JzLFxuICAgIGludmVydGVkSW5kZXg6IGludmVydGVkSW5kZXgsXG4gICAgcGlwZWxpbmU6IHRoaXMucGlwZWxpbmUudG9KU09OKClcbiAgfVxufVxuXG4vKipcbiAqIExvYWRzIGEgcHJldmlvdXNseSBzZXJpYWxpemVkIGx1bnIuSW5kZXhcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc2VyaWFsaXplZEluZGV4IC0gQSBwcmV2aW91c2x5IHNlcmlhbGl6ZWQgbHVuci5JbmRleFxuICogQHJldHVybnMge2x1bnIuSW5kZXh9XG4gKi9cbmx1bnIuSW5kZXgubG9hZCA9IGZ1bmN0aW9uIChzZXJpYWxpemVkSW5kZXgpIHtcbiAgdmFyIGF0dHJzID0ge30sXG4gICAgICBmaWVsZFZlY3RvcnMgPSB7fSxcbiAgICAgIHNlcmlhbGl6ZWRWZWN0b3JzID0gc2VyaWFsaXplZEluZGV4LmZpZWxkVmVjdG9ycyxcbiAgICAgIGludmVydGVkSW5kZXggPSB7fSxcbiAgICAgIHNlcmlhbGl6ZWRJbnZlcnRlZEluZGV4ID0gc2VyaWFsaXplZEluZGV4LmludmVydGVkSW5kZXgsXG4gICAgICB0b2tlblNldEJ1aWxkZXIgPSBuZXcgbHVuci5Ub2tlblNldC5CdWlsZGVyLFxuICAgICAgcGlwZWxpbmUgPSBsdW5yLlBpcGVsaW5lLmxvYWQoc2VyaWFsaXplZEluZGV4LnBpcGVsaW5lKVxuXG4gIGlmIChzZXJpYWxpemVkSW5kZXgudmVyc2lvbiAhPSBsdW5yLnZlcnNpb24pIHtcbiAgICBsdW5yLnV0aWxzLndhcm4oXCJWZXJzaW9uIG1pc21hdGNoIHdoZW4gbG9hZGluZyBzZXJpYWxpc2VkIGluZGV4LiBDdXJyZW50IHZlcnNpb24gb2YgbHVuciAnXCIgKyBsdW5yLnZlcnNpb24gKyBcIicgZG9lcyBub3QgbWF0Y2ggc2VyaWFsaXplZCBpbmRleCAnXCIgKyBzZXJpYWxpemVkSW5kZXgudmVyc2lvbiArIFwiJ1wiKVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXJpYWxpemVkVmVjdG9ycy5sZW5ndGg7IGkrKykge1xuICAgIHZhciB0dXBsZSA9IHNlcmlhbGl6ZWRWZWN0b3JzW2ldLFxuICAgICAgICByZWYgPSB0dXBsZVswXSxcbiAgICAgICAgZWxlbWVudHMgPSB0dXBsZVsxXVxuXG4gICAgZmllbGRWZWN0b3JzW3JlZl0gPSBuZXcgbHVuci5WZWN0b3IoZWxlbWVudHMpXG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNlcmlhbGl6ZWRJbnZlcnRlZEluZGV4Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHR1cGxlID0gc2VyaWFsaXplZEludmVydGVkSW5kZXhbaV0sXG4gICAgICAgIHRlcm0gPSB0dXBsZVswXSxcbiAgICAgICAgcG9zdGluZyA9IHR1cGxlWzFdXG5cbiAgICB0b2tlblNldEJ1aWxkZXIuaW5zZXJ0KHRlcm0pXG4gICAgaW52ZXJ0ZWRJbmRleFt0ZXJtXSA9IHBvc3RpbmdcbiAgfVxuXG4gIHRva2VuU2V0QnVpbGRlci5maW5pc2goKVxuXG4gIGF0dHJzLmZpZWxkcyA9IHNlcmlhbGl6ZWRJbmRleC5maWVsZHNcblxuICBhdHRycy5maWVsZFZlY3RvcnMgPSBmaWVsZFZlY3RvcnNcbiAgYXR0cnMuaW52ZXJ0ZWRJbmRleCA9IGludmVydGVkSW5kZXhcbiAgYXR0cnMudG9rZW5TZXQgPSB0b2tlblNldEJ1aWxkZXIucm9vdFxuICBhdHRycy5waXBlbGluZSA9IHBpcGVsaW5lXG5cbiAgcmV0dXJuIG5ldyBsdW5yLkluZGV4KGF0dHJzKVxufVxuLyohXG4gKiBsdW5yLkJ1aWxkZXJcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIGx1bnIuQnVpbGRlciBwZXJmb3JtcyBpbmRleGluZyBvbiBhIHNldCBvZiBkb2N1bWVudHMgYW5kXG4gKiByZXR1cm5zIGluc3RhbmNlcyBvZiBsdW5yLkluZGV4IHJlYWR5IGZvciBxdWVyeWluZy5cbiAqXG4gKiBBbGwgY29uZmlndXJhdGlvbiBvZiB0aGUgaW5kZXggaXMgZG9uZSB2aWEgdGhlIGJ1aWxkZXIsIHRoZVxuICogZmllbGRzIHRvIGluZGV4LCB0aGUgZG9jdW1lbnQgcmVmZXJlbmNlLCB0aGUgdGV4dCBwcm9jZXNzaW5nXG4gKiBwaXBlbGluZSBhbmQgZG9jdW1lbnQgc2NvcmluZyBwYXJhbWV0ZXJzIGFyZSBhbGwgc2V0IG9uIHRoZVxuICogYnVpbGRlciBiZWZvcmUgaW5kZXhpbmcuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHJvcGVydHkge3N0cmluZ30gX3JlZiAtIEludGVybmFsIHJlZmVyZW5jZSB0byB0aGUgZG9jdW1lbnQgcmVmZXJlbmNlIGZpZWxkLlxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0gX2ZpZWxkcyAtIEludGVybmFsIHJlZmVyZW5jZSB0byB0aGUgZG9jdW1lbnQgZmllbGRzIHRvIGluZGV4LlxuICogQHByb3BlcnR5IHtvYmplY3R9IGludmVydGVkSW5kZXggLSBUaGUgaW52ZXJ0ZWQgaW5kZXggbWFwcyB0ZXJtcyB0byBkb2N1bWVudCBmaWVsZHMuXG4gKiBAcHJvcGVydHkge29iamVjdH0gZG9jdW1lbnRUZXJtRnJlcXVlbmNpZXMgLSBLZWVwcyB0cmFjayBvZiBkb2N1bWVudCB0ZXJtIGZyZXF1ZW5jaWVzLlxuICogQHByb3BlcnR5IHtvYmplY3R9IGRvY3VtZW50TGVuZ3RocyAtIEtlZXBzIHRyYWNrIG9mIHRoZSBsZW5ndGggb2YgZG9jdW1lbnRzIGFkZGVkIHRvIHRoZSBpbmRleC5cbiAqIEBwcm9wZXJ0eSB7bHVuci50b2tlbml6ZXJ9IHRva2VuaXplciAtIEZ1bmN0aW9uIGZvciBzcGxpdHRpbmcgc3RyaW5ncyBpbnRvIHRva2VucyBmb3IgaW5kZXhpbmcuXG4gKiBAcHJvcGVydHkge2x1bnIuUGlwZWxpbmV9IHBpcGVsaW5lIC0gVGhlIHBpcGVsaW5lIHBlcmZvcm1zIHRleHQgcHJvY2Vzc2luZyBvbiB0b2tlbnMgYmVmb3JlIGluZGV4aW5nLlxuICogQHByb3BlcnR5IHtsdW5yLlBpcGVsaW5lfSBzZWFyY2hQaXBlbGluZSAtIEEgcGlwZWxpbmUgZm9yIHByb2Nlc3Npbmcgc2VhcmNoIHRlcm1zIGJlZm9yZSBxdWVyeWluZyB0aGUgaW5kZXguXG4gKiBAcHJvcGVydHkge251bWJlcn0gZG9jdW1lbnRDb3VudCAtIEtlZXBzIHRyYWNrIG9mIHRoZSB0b3RhbCBudW1iZXIgb2YgZG9jdW1lbnRzIGluZGV4ZWQuXG4gKiBAcHJvcGVydHkge251bWJlcn0gX2IgLSBBIHBhcmFtZXRlciB0byBjb250cm9sIGZpZWxkIGxlbmd0aCBub3JtYWxpemF0aW9uLCBzZXR0aW5nIHRoaXMgdG8gMCBkaXNhYmxlZCBub3JtYWxpemF0aW9uLCAxIGZ1bGx5IG5vcm1hbGl6ZXMgZmllbGQgbGVuZ3RocywgdGhlIGRlZmF1bHQgdmFsdWUgaXMgMC43NS5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBfazEgLSBBIHBhcmFtZXRlciB0byBjb250cm9sIGhvdyBxdWlja2x5IGFuIGluY3JlYXNlIGluIHRlcm0gZnJlcXVlbmN5IHJlc3VsdHMgaW4gdGVybSBmcmVxdWVuY3kgc2F0dXJhdGlvbiwgdGhlIGRlZmF1bHQgdmFsdWUgaXMgMS4yLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IHRlcm1JbmRleCAtIEEgY291bnRlciBpbmNyZW1lbnRlZCBmb3IgZWFjaCB1bmlxdWUgdGVybSwgdXNlZCB0byBpZGVudGlmeSBhIHRlcm1zIHBvc2l0aW9uIGluIHRoZSB2ZWN0b3Igc3BhY2UuXG4gKiBAcHJvcGVydHkge2FycmF5fSBtZXRhZGF0YVdoaXRlbGlzdCAtIEEgbGlzdCBvZiBtZXRhZGF0YSBrZXlzIHRoYXQgaGF2ZSBiZWVuIHdoaXRlbGlzdGVkIGZvciBlbnRyeSBpbiB0aGUgaW5kZXguXG4gKi9cbmx1bnIuQnVpbGRlciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5fcmVmID0gXCJpZFwiXG4gIHRoaXMuX2ZpZWxkcyA9IFtdXG4gIHRoaXMuaW52ZXJ0ZWRJbmRleCA9IE9iamVjdC5jcmVhdGUobnVsbClcbiAgdGhpcy5maWVsZFRlcm1GcmVxdWVuY2llcyA9IHt9XG4gIHRoaXMuZmllbGRMZW5ndGhzID0ge31cbiAgdGhpcy50b2tlbml6ZXIgPSBsdW5yLnRva2VuaXplclxuICB0aGlzLnBpcGVsaW5lID0gbmV3IGx1bnIuUGlwZWxpbmVcbiAgdGhpcy5zZWFyY2hQaXBlbGluZSA9IG5ldyBsdW5yLlBpcGVsaW5lXG4gIHRoaXMuZG9jdW1lbnRDb3VudCA9IDBcbiAgdGhpcy5fYiA9IDAuNzVcbiAgdGhpcy5fazEgPSAxLjJcbiAgdGhpcy50ZXJtSW5kZXggPSAwXG4gIHRoaXMubWV0YWRhdGFXaGl0ZWxpc3QgPSBbXVxufVxuXG4vKipcbiAqIFNldHMgdGhlIGRvY3VtZW50IGZpZWxkIHVzZWQgYXMgdGhlIGRvY3VtZW50IHJlZmVyZW5jZS4gRXZlcnkgZG9jdW1lbnQgbXVzdCBoYXZlIHRoaXMgZmllbGQuXG4gKiBUaGUgdHlwZSBvZiB0aGlzIGZpZWxkIGluIHRoZSBkb2N1bWVudCBzaG91bGQgYmUgYSBzdHJpbmcsIGlmIGl0IGlzIG5vdCBhIHN0cmluZyBpdCB3aWxsIGJlXG4gKiBjb2VyY2VkIGludG8gYSBzdHJpbmcgYnkgY2FsbGluZyB0b1N0cmluZy5cbiAqXG4gKiBUaGUgZGVmYXVsdCByZWYgaXMgJ2lkJy5cbiAqXG4gKiBUaGUgcmVmIHNob3VsZCBfbm90XyBiZSBjaGFuZ2VkIGR1cmluZyBpbmRleGluZywgaXQgc2hvdWxkIGJlIHNldCBiZWZvcmUgYW55IGRvY3VtZW50cyBhcmVcbiAqIGFkZGVkIHRvIHRoZSBpbmRleC4gQ2hhbmdpbmcgaXQgZHVyaW5nIGluZGV4aW5nIGNhbiBsZWFkIHRvIGluY29uc2lzdGVudCByZXN1bHRzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWYgLSBUaGUgbmFtZSBvZiB0aGUgcmVmZXJlbmNlIGZpZWxkIGluIHRoZSBkb2N1bWVudC5cbiAqL1xubHVuci5CdWlsZGVyLnByb3RvdHlwZS5yZWYgPSBmdW5jdGlvbiAocmVmKSB7XG4gIHRoaXMuX3JlZiA9IHJlZlxufVxuXG4vKipcbiAqIEFkZHMgYSBmaWVsZCB0byB0aGUgbGlzdCBvZiBkb2N1bWVudCBmaWVsZHMgdGhhdCB3aWxsIGJlIGluZGV4ZWQuIEV2ZXJ5IGRvY3VtZW50IGJlaW5nXG4gKiBpbmRleGVkIHNob3VsZCBoYXZlIHRoaXMgZmllbGQuIE51bGwgdmFsdWVzIGZvciB0aGlzIGZpZWxkIGluIGluZGV4ZWQgZG9jdW1lbnRzIHdpbGxcbiAqIG5vdCBjYXVzZSBlcnJvcnMgYnV0IHdpbGwgbGltaXQgdGhlIGNoYW5jZSBvZiB0aGF0IGRvY3VtZW50IGJlaW5nIHJldHJpZXZlZCBieSBzZWFyY2hlcy5cbiAqXG4gKiBBbGwgZmllbGRzIHNob3VsZCBiZSBhZGRlZCBiZWZvcmUgYWRkaW5nIGRvY3VtZW50cyB0byB0aGUgaW5kZXguIEFkZGluZyBmaWVsZHMgYWZ0ZXJcbiAqIGEgZG9jdW1lbnQgaGFzIGJlZW4gaW5kZXhlZCB3aWxsIGhhdmUgbm8gZWZmZWN0IG9uIGFscmVhZHkgaW5kZXhlZCBkb2N1bWVudHMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkIC0gVGhlIG5hbWUgb2YgYSBmaWVsZCB0byBpbmRleCBpbiBhbGwgZG9jdW1lbnRzLlxuICovXG5sdW5yLkJ1aWxkZXIucHJvdG90eXBlLmZpZWxkID0gZnVuY3Rpb24gKGZpZWxkKSB7XG4gIHRoaXMuX2ZpZWxkcy5wdXNoKGZpZWxkKVxufVxuXG4vKipcbiAqIEEgcGFyYW1ldGVyIHRvIHR1bmUgdGhlIGFtb3VudCBvZiBmaWVsZCBsZW5ndGggbm9ybWFsaXNhdGlvbiB0aGF0IGlzIGFwcGxpZWQgd2hlblxuICogY2FsY3VsYXRpbmcgcmVsZXZhbmNlIHNjb3Jlcy4gQSB2YWx1ZSBvZiAwIHdpbGwgY29tcGxldGVseSBkaXNhYmxlIGFueSBub3JtYWxpc2F0aW9uXG4gKiBhbmQgYSB2YWx1ZSBvZiAxIHdpbGwgZnVsbHkgbm9ybWFsaXNlIGZpZWxkIGxlbmd0aHMuIFRoZSBkZWZhdWx0IGlzIDAuNzUuIFZhbHVlcyBvZiBiXG4gKiB3aWxsIGJlIGNsYW1wZWQgdG8gdGhlIHJhbmdlIDAgLSAxLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXIgLSBUaGUgdmFsdWUgdG8gc2V0IGZvciB0aGlzIHR1bmluZyBwYXJhbWV0ZXIuXG4gKi9cbmx1bnIuQnVpbGRlci5wcm90b3R5cGUuYiA9IGZ1bmN0aW9uIChudW1iZXIpIHtcbiAgaWYgKG51bWJlciA8IDApIHtcbiAgICB0aGlzLl9iID0gMFxuICB9IGVsc2UgaWYgKG51bWJlciA+IDEpIHtcbiAgICB0aGlzLl9iID0gMVxuICB9IGVsc2Uge1xuICAgIHRoaXMuX2IgPSBudW1iZXJcbiAgfVxufVxuXG4vKipcbiAqIEEgcGFyYW1ldGVyIHRoYXQgY29udHJvbHMgdGhlIHNwZWVkIGF0IHdoaWNoIGEgcmlzZSBpbiB0ZXJtIGZyZXF1ZW5jeSByZXN1bHRzIGluIHRlcm1cbiAqIGZyZXF1ZW5jeSBzYXR1cmF0aW9uLiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyAxLjIuIFNldHRpbmcgdGhpcyB0byBhIGhpZ2hlciB2YWx1ZSB3aWxsIGdpdmVcbiAqIHNsb3dlciBzYXR1cmF0aW9uIGxldmVscywgYSBsb3dlciB2YWx1ZSB3aWxsIHJlc3VsdCBpbiBxdWlja2VyIHNhdHVyYXRpb24uXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IG51bWJlciAtIFRoZSB2YWx1ZSB0byBzZXQgZm9yIHRoaXMgdHVuaW5nIHBhcmFtZXRlci5cbiAqL1xubHVuci5CdWlsZGVyLnByb3RvdHlwZS5rMSA9IGZ1bmN0aW9uIChudW1iZXIpIHtcbiAgdGhpcy5fazEgPSBudW1iZXJcbn1cblxuLyoqXG4gKiBBZGRzIGEgZG9jdW1lbnQgdG8gdGhlIGluZGV4LlxuICpcbiAqIEJlZm9yZSBhZGRpbmcgZmllbGRzIHRvIHRoZSBpbmRleCB0aGUgaW5kZXggc2hvdWxkIGhhdmUgYmVlbiBmdWxseSBzZXR1cCwgd2l0aCB0aGUgZG9jdW1lbnRcbiAqIHJlZiBhbmQgYWxsIGZpZWxkcyB0byBpbmRleCBhbHJlYWR5IGhhdmluZyBiZWVuIHNwZWNpZmllZC5cbiAqXG4gKiBUaGUgZG9jdW1lbnQgbXVzdCBoYXZlIGEgZmllbGQgbmFtZSBhcyBzcGVjaWZpZWQgYnkgdGhlIHJlZiAoYnkgZGVmYXVsdCB0aGlzIGlzICdpZCcpIGFuZFxuICogaXQgc2hvdWxkIGhhdmUgYWxsIGZpZWxkcyBkZWZpbmVkIGZvciBpbmRleGluZywgdGhvdWdoIG51bGwgb3IgdW5kZWZpbmVkIHZhbHVlcyB3aWxsIG5vdFxuICogY2F1c2UgZXJyb3JzLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBkb2MgLSBUaGUgZG9jdW1lbnQgdG8gYWRkIHRvIHRoZSBpbmRleC5cbiAqL1xubHVuci5CdWlsZGVyLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoZG9jKSB7XG4gIHZhciBkb2NSZWYgPSBkb2NbdGhpcy5fcmVmXVxuXG4gIHRoaXMuZG9jdW1lbnRDb3VudCArPSAxXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9maWVsZHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZmllbGROYW1lID0gdGhpcy5fZmllbGRzW2ldLFxuICAgICAgICBmaWVsZCA9IGRvY1tmaWVsZE5hbWVdLFxuICAgICAgICB0b2tlbnMgPSB0aGlzLnRva2VuaXplcihmaWVsZCksXG4gICAgICAgIHRlcm1zID0gdGhpcy5waXBlbGluZS5ydW4odG9rZW5zKSxcbiAgICAgICAgZmllbGRSZWYgPSBuZXcgbHVuci5GaWVsZFJlZiAoZG9jUmVmLCBmaWVsZE5hbWUpLFxuICAgICAgICBmaWVsZFRlcm1zID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuXG4gICAgdGhpcy5maWVsZFRlcm1GcmVxdWVuY2llc1tmaWVsZFJlZl0gPSBmaWVsZFRlcm1zXG4gICAgdGhpcy5maWVsZExlbmd0aHNbZmllbGRSZWZdID0gMFxuXG4gICAgLy8gc3RvcmUgdGhlIGxlbmd0aCBvZiB0aGlzIGZpZWxkIGZvciB0aGlzIGRvY3VtZW50XG4gICAgdGhpcy5maWVsZExlbmd0aHNbZmllbGRSZWZdICs9IHRlcm1zLmxlbmd0aFxuXG4gICAgLy8gY2FsY3VsYXRlIHRlcm0gZnJlcXVlbmNpZXMgZm9yIHRoaXMgZmllbGRcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRlcm1zLmxlbmd0aDsgaisrKSB7XG4gICAgICB2YXIgdGVybSA9IHRlcm1zW2pdXG5cbiAgICAgIGlmIChmaWVsZFRlcm1zW3Rlcm1dID09IHVuZGVmaW5lZCkge1xuICAgICAgICBmaWVsZFRlcm1zW3Rlcm1dID0gMFxuICAgICAgfVxuXG4gICAgICBmaWVsZFRlcm1zW3Rlcm1dICs9IDFcblxuICAgICAgLy8gYWRkIHRvIGludmVydGVkIGluZGV4XG4gICAgICAvLyBjcmVhdGUgYW4gaW5pdGlhbCBwb3N0aW5nIGlmIG9uZSBkb2Vzbid0IGV4aXN0XG4gICAgICBpZiAodGhpcy5pbnZlcnRlZEluZGV4W3Rlcm1dID09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgcG9zdGluZyA9IE9iamVjdC5jcmVhdGUobnVsbClcbiAgICAgICAgcG9zdGluZ1tcIl9pbmRleFwiXSA9IHRoaXMudGVybUluZGV4XG4gICAgICAgIHRoaXMudGVybUluZGV4ICs9IDFcblxuICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMuX2ZpZWxkcy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgIHBvc3RpbmdbdGhpcy5fZmllbGRzW2tdXSA9IE9iamVjdC5jcmVhdGUobnVsbClcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW52ZXJ0ZWRJbmRleFt0ZXJtXSA9IHBvc3RpbmdcbiAgICAgIH1cblxuICAgICAgLy8gYWRkIGFuIGVudHJ5IGZvciB0aGlzIHRlcm0vZmllbGROYW1lL2RvY1JlZiB0byB0aGUgaW52ZXJ0ZWRJbmRleFxuICAgICAgaWYgKHRoaXMuaW52ZXJ0ZWRJbmRleFt0ZXJtXVtmaWVsZE5hbWVdW2RvY1JlZl0gPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuaW52ZXJ0ZWRJbmRleFt0ZXJtXVtmaWVsZE5hbWVdW2RvY1JlZl0gPSBPYmplY3QuY3JlYXRlKG51bGwpXG4gICAgICB9XG5cbiAgICAgIC8vIHN0b3JlIGFsbCB3aGl0ZWxpc3RlZCBtZXRhZGF0YSBhYm91dCB0aGlzIHRva2VuIGluIHRoZVxuICAgICAgLy8gaW52ZXJ0ZWQgaW5kZXhcbiAgICAgIGZvciAodmFyIGwgPSAwOyBsIDwgdGhpcy5tZXRhZGF0YVdoaXRlbGlzdC5sZW5ndGg7IGwrKykge1xuICAgICAgICB2YXIgbWV0YWRhdGFLZXkgPSB0aGlzLm1ldGFkYXRhV2hpdGVsaXN0W2xdLFxuICAgICAgICAgICAgbWV0YWRhdGEgPSB0ZXJtLm1ldGFkYXRhW21ldGFkYXRhS2V5XVxuXG4gICAgICAgIGlmICh0aGlzLmludmVydGVkSW5kZXhbdGVybV1bZmllbGROYW1lXVtkb2NSZWZdW21ldGFkYXRhS2V5XSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLmludmVydGVkSW5kZXhbdGVybV1bZmllbGROYW1lXVtkb2NSZWZdW21ldGFkYXRhS2V5XSA9IFtdXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmludmVydGVkSW5kZXhbdGVybV1bZmllbGROYW1lXVtkb2NSZWZdW21ldGFkYXRhS2V5XS5wdXNoKG1ldGFkYXRhKVxuICAgICAgfVxuICAgIH1cblxuICB9XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgYXZlcmFnZSBkb2N1bWVudCBsZW5ndGggZm9yIHRoaXMgaW5kZXhcbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5sdW5yLkJ1aWxkZXIucHJvdG90eXBlLmNhbGN1bGF0ZUF2ZXJhZ2VGaWVsZExlbmd0aHMgPSBmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIGZpZWxkUmVmcyA9IE9iamVjdC5rZXlzKHRoaXMuZmllbGRMZW5ndGhzKSxcbiAgICAgIG51bWJlck9mRmllbGRzID0gZmllbGRSZWZzLmxlbmd0aCxcbiAgICAgIGFjY3VtdWxhdG9yID0ge30sXG4gICAgICBkb2N1bWVudHNXaXRoRmllbGQgPSB7fVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtYmVyT2ZGaWVsZHM7IGkrKykge1xuICAgIHZhciBmaWVsZFJlZiA9IGx1bnIuRmllbGRSZWYuZnJvbVN0cmluZyhmaWVsZFJlZnNbaV0pLFxuICAgICAgICBmaWVsZCA9IGZpZWxkUmVmLmZpZWxkTmFtZVxuXG4gICAgZG9jdW1lbnRzV2l0aEZpZWxkW2ZpZWxkXSB8fCAoZG9jdW1lbnRzV2l0aEZpZWxkW2ZpZWxkXSA9IDApXG4gICAgZG9jdW1lbnRzV2l0aEZpZWxkW2ZpZWxkXSArPSAxXG5cbiAgICBhY2N1bXVsYXRvcltmaWVsZF0gfHwgKGFjY3VtdWxhdG9yW2ZpZWxkXSA9IDApXG4gICAgYWNjdW11bGF0b3JbZmllbGRdICs9IHRoaXMuZmllbGRMZW5ndGhzW2ZpZWxkUmVmXVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9maWVsZHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZmllbGQgPSB0aGlzLl9maWVsZHNbaV1cbiAgICBhY2N1bXVsYXRvcltmaWVsZF0gPSBhY2N1bXVsYXRvcltmaWVsZF0gLyBkb2N1bWVudHNXaXRoRmllbGRbZmllbGRdXG4gIH1cblxuICB0aGlzLmF2ZXJhZ2VGaWVsZExlbmd0aCA9IGFjY3VtdWxhdG9yXG59XG5cbi8qKlxuICogQnVpbGRzIGEgdmVjdG9yIHNwYWNlIG1vZGVsIG9mIGV2ZXJ5IGRvY3VtZW50IHVzaW5nIGx1bnIuVmVjdG9yXG4gKlxuICogQHByaXZhdGVcbiAqL1xubHVuci5CdWlsZGVyLnByb3RvdHlwZS5jcmVhdGVGaWVsZFZlY3RvcnMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBmaWVsZFZlY3RvcnMgPSB7fSxcbiAgICAgIGZpZWxkUmVmcyA9IE9iamVjdC5rZXlzKHRoaXMuZmllbGRUZXJtRnJlcXVlbmNpZXMpLFxuICAgICAgZmllbGRSZWZzTGVuZ3RoID0gZmllbGRSZWZzLmxlbmd0aCxcbiAgICAgIHRlcm1JZGZDYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbClcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGZpZWxkUmVmc0xlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGZpZWxkUmVmID0gbHVuci5GaWVsZFJlZi5mcm9tU3RyaW5nKGZpZWxkUmVmc1tpXSksXG4gICAgICAgIGZpZWxkID0gZmllbGRSZWYuZmllbGROYW1lLFxuICAgICAgICBmaWVsZExlbmd0aCA9IHRoaXMuZmllbGRMZW5ndGhzW2ZpZWxkUmVmXSxcbiAgICAgICAgZmllbGRWZWN0b3IgPSBuZXcgbHVuci5WZWN0b3IsXG4gICAgICAgIHRlcm1GcmVxdWVuY2llcyA9IHRoaXMuZmllbGRUZXJtRnJlcXVlbmNpZXNbZmllbGRSZWZdLFxuICAgICAgICB0ZXJtcyA9IE9iamVjdC5rZXlzKHRlcm1GcmVxdWVuY2llcyksXG4gICAgICAgIHRlcm1zTGVuZ3RoID0gdGVybXMubGVuZ3RoXG5cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRlcm1zTGVuZ3RoOyBqKyspIHtcbiAgICAgIHZhciB0ZXJtID0gdGVybXNbal0sXG4gICAgICAgICAgdGYgPSB0ZXJtRnJlcXVlbmNpZXNbdGVybV0sXG4gICAgICAgICAgdGVybUluZGV4ID0gdGhpcy5pbnZlcnRlZEluZGV4W3Rlcm1dLl9pbmRleCxcbiAgICAgICAgICBpZGYsIHNjb3JlLCBzY29yZVdpdGhQcmVjaXNpb25cblxuICAgICAgaWYgKHRlcm1JZGZDYWNoZVt0ZXJtXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlkZiA9IGx1bnIuaWRmKHRoaXMuaW52ZXJ0ZWRJbmRleFt0ZXJtXSwgdGhpcy5kb2N1bWVudENvdW50KVxuICAgICAgICB0ZXJtSWRmQ2FjaGVbdGVybV0gPSBpZGZcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlkZiA9IHRlcm1JZGZDYWNoZVt0ZXJtXVxuICAgICAgfVxuXG4gICAgICBzY29yZSA9IGlkZiAqICgodGhpcy5fazEgKyAxKSAqIHRmKSAvICh0aGlzLl9rMSAqICgxIC0gdGhpcy5fYiArIHRoaXMuX2IgKiAoZmllbGRMZW5ndGggLyB0aGlzLmF2ZXJhZ2VGaWVsZExlbmd0aFtmaWVsZF0pKSArIHRmKVxuICAgICAgc2NvcmVXaXRoUHJlY2lzaW9uID0gTWF0aC5yb3VuZChzY29yZSAqIDEwMDApIC8gMTAwMFxuICAgICAgLy8gQ29udmVydHMgMS4yMzQ1Njc4OSB0byAxLjIzNC5cbiAgICAgIC8vIFJlZHVjaW5nIHRoZSBwcmVjaXNpb24gc28gdGhhdCB0aGUgdmVjdG9ycyB0YWtlIHVwIGxlc3NcbiAgICAgIC8vIHNwYWNlIHdoZW4gc2VyaWFsaXNlZC4gRG9pbmcgaXQgbm93IHNvIHRoYXQgdGhleSBiZWhhdmVcbiAgICAgIC8vIHRoZSBzYW1lIGJlZm9yZSBhbmQgYWZ0ZXIgc2VyaWFsaXNhdGlvbi4gQWxzbywgdGhpcyBpc1xuICAgICAgLy8gdGhlIGZhc3Rlc3QgYXBwcm9hY2ggdG8gcmVkdWNpbmcgYSBudW1iZXIncyBwcmVjaXNpb24gaW5cbiAgICAgIC8vIEphdmFTY3JpcHQuXG5cbiAgICAgIGZpZWxkVmVjdG9yLmluc2VydCh0ZXJtSW5kZXgsIHNjb3JlV2l0aFByZWNpc2lvbilcbiAgICB9XG5cbiAgICBmaWVsZFZlY3RvcnNbZmllbGRSZWZdID0gZmllbGRWZWN0b3JcbiAgfVxuXG4gIHRoaXMuZmllbGRWZWN0b3JzID0gZmllbGRWZWN0b3JzXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHRva2VuIHNldCBvZiBhbGwgdG9rZW5zIGluIHRoZSBpbmRleCB1c2luZyBsdW5yLlRva2VuU2V0XG4gKlxuICogQHByaXZhdGVcbiAqL1xubHVuci5CdWlsZGVyLnByb3RvdHlwZS5jcmVhdGVUb2tlblNldCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy50b2tlblNldCA9IGx1bnIuVG9rZW5TZXQuZnJvbUFycmF5KFxuICAgIE9iamVjdC5rZXlzKHRoaXMuaW52ZXJ0ZWRJbmRleCkuc29ydCgpXG4gIClcbn1cblxuLyoqXG4gKiBCdWlsZHMgdGhlIGluZGV4LCBjcmVhdGluZyBhbiBpbnN0YW5jZSBvZiBsdW5yLkluZGV4LlxuICpcbiAqIFRoaXMgY29tcGxldGVzIHRoZSBpbmRleGluZyBwcm9jZXNzIGFuZCBzaG91bGQgb25seSBiZSBjYWxsZWRcbiAqIG9uY2UgYWxsIGRvY3VtZW50cyBoYXZlIGJlZW4gYWRkZWQgdG8gdGhlIGluZGV4LlxuICpcbiAqIEByZXR1cm5zIHtsdW5yLkluZGV4fVxuICovXG5sdW5yLkJ1aWxkZXIucHJvdG90eXBlLmJ1aWxkID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmNhbGN1bGF0ZUF2ZXJhZ2VGaWVsZExlbmd0aHMoKVxuICB0aGlzLmNyZWF0ZUZpZWxkVmVjdG9ycygpXG4gIHRoaXMuY3JlYXRlVG9rZW5TZXQoKVxuXG4gIHJldHVybiBuZXcgbHVuci5JbmRleCh7XG4gICAgaW52ZXJ0ZWRJbmRleDogdGhpcy5pbnZlcnRlZEluZGV4LFxuICAgIGZpZWxkVmVjdG9yczogdGhpcy5maWVsZFZlY3RvcnMsXG4gICAgdG9rZW5TZXQ6IHRoaXMudG9rZW5TZXQsXG4gICAgZmllbGRzOiB0aGlzLl9maWVsZHMsXG4gICAgcGlwZWxpbmU6IHRoaXMuc2VhcmNoUGlwZWxpbmVcbiAgfSlcbn1cblxuLyoqXG4gKiBBcHBsaWVzIGEgcGx1Z2luIHRvIHRoZSBpbmRleCBidWlsZGVyLlxuICpcbiAqIEEgcGx1Z2luIGlzIGEgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgd2l0aCB0aGUgaW5kZXggYnVpbGRlciBhcyBpdHMgY29udGV4dC5cbiAqIFBsdWdpbnMgY2FuIGJlIHVzZWQgdG8gY3VzdG9taXNlIG9yIGV4dGVuZCB0aGUgYmVoYXZpb3VyIG9mIHRoZSBpbmRleFxuICogaW4gc29tZSB3YXkuIEEgcGx1Z2luIGlzIGp1c3QgYSBmdW5jdGlvbiwgdGhhdCBlbmNhcHN1bGF0ZWQgdGhlIGN1c3RvbVxuICogYmVoYXZpb3VyIHRoYXQgc2hvdWxkIGJlIGFwcGxpZWQgd2hlbiBidWlsZGluZyB0aGUgaW5kZXguXG4gKlxuICogVGhlIHBsdWdpbiBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSBpbmRleCBidWlsZGVyIGFzIGl0cyBhcmd1bWVudCwgYWRkaXRpb25hbFxuICogYXJndW1lbnRzIGNhbiBhbHNvIGJlIHBhc3NlZCB3aGVuIGNhbGxpbmcgdXNlLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWRcbiAqIHdpdGggdGhlIGluZGV4IGJ1aWxkZXIgYXMgaXRzIGNvbnRleHQuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcGx1Z2luIFRoZSBwbHVnaW4gdG8gYXBwbHkuXG4gKi9cbmx1bnIuQnVpbGRlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gKGZuKSB7XG4gIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuICBhcmdzLnVuc2hpZnQodGhpcylcbiAgZm4uYXBwbHkodGhpcywgYXJncylcbn1cbi8qKlxuICogQ29udGFpbnMgYW5kIGNvbGxlY3RzIG1ldGFkYXRhIGFib3V0IGEgbWF0Y2hpbmcgZG9jdW1lbnQuXG4gKiBBIHNpbmdsZSBpbnN0YW5jZSBvZiBsdW5yLk1hdGNoRGF0YSBpcyByZXR1cm5lZCBhcyBwYXJ0IG9mIGV2ZXJ5XG4gKiBsdW5yLkluZGV4flJlc3VsdC5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXJtIC0gVGhlIHRlcm0gdGhpcyBtYXRjaCBkYXRhIGlzIGFzc29jaWF0ZWQgd2l0aFxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkIC0gVGhlIGZpZWxkIGluIHdoaWNoIHRoZSB0ZXJtIHdhcyBmb3VuZFxuICogQHBhcmFtIHtvYmplY3R9IG1ldGFkYXRhIC0gVGhlIG1ldGFkYXRhIHJlY29yZGVkIGFib3V0IHRoaXMgdGVybSBpbiB0aGlzIGZpZWxkXG4gKiBAcHJvcGVydHkge29iamVjdH0gbWV0YWRhdGEgLSBBIGNsb25lZCBjb2xsZWN0aW9uIG9mIG1ldGFkYXRhIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGRvY3VtZW50LlxuICogQHNlZSB7QGxpbmsgbHVuci5JbmRleH5SZXN1bHR9XG4gKi9cbmx1bnIuTWF0Y2hEYXRhID0gZnVuY3Rpb24gKHRlcm0sIGZpZWxkLCBtZXRhZGF0YSkge1xuICB2YXIgY2xvbmVkTWV0YWRhdGEgPSBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgbWV0YWRhdGFLZXlzID0gT2JqZWN0LmtleXMobWV0YWRhdGEpXG5cbiAgLy8gQ2xvbmluZyB0aGUgbWV0YWRhdGEgdG8gcHJldmVudCB0aGUgb3JpZ2luYWxcbiAgLy8gYmVpbmcgbXV0YXRlZCBkdXJpbmcgbWF0Y2ggZGF0YSBjb21iaW5hdGlvbi5cbiAgLy8gTWV0YWRhdGEgaXMga2VwdCBpbiBhbiBhcnJheSB3aXRoaW4gdGhlIGludmVydGVkXG4gIC8vIGluZGV4IHNvIGNsb25pbmcgdGhlIGRhdGEgY2FuIGJlIGRvbmUgd2l0aFxuICAvLyBBcnJheSNzbGljZVxuICBmb3IgKHZhciBpID0gMDsgaSA8IG1ldGFkYXRhS2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBtZXRhZGF0YUtleXNbaV1cbiAgICBjbG9uZWRNZXRhZGF0YVtrZXldID0gbWV0YWRhdGFba2V5XS5zbGljZSgpXG4gIH1cblxuICB0aGlzLm1ldGFkYXRhID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICB0aGlzLm1ldGFkYXRhW3Rlcm1dID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICB0aGlzLm1ldGFkYXRhW3Rlcm1dW2ZpZWxkXSA9IGNsb25lZE1ldGFkYXRhXG59XG5cbi8qKlxuICogQW4gaW5zdGFuY2Ugb2YgbHVuci5NYXRjaERhdGEgd2lsbCBiZSBjcmVhdGVkIGZvciBldmVyeSB0ZXJtIHRoYXQgbWF0Y2hlcyBhXG4gKiBkb2N1bWVudC4gSG93ZXZlciBvbmx5IG9uZSBpbnN0YW5jZSBpcyByZXF1aXJlZCBpbiBhIGx1bnIuSW5kZXh+UmVzdWx0LiBUaGlzXG4gKiBtZXRob2QgY29tYmluZXMgbWV0YWRhdGEgZnJvbSBhbm90aGVyIGluc3RhbmNlIG9mIGx1bnIuTWF0Y2hEYXRhIHdpdGggdGhpc1xuICogb2JqZWN0cyBtZXRhZGF0YS5cbiAqXG4gKiBAcGFyYW0ge2x1bnIuTWF0Y2hEYXRhfSBvdGhlck1hdGNoRGF0YSAtIEFub3RoZXIgaW5zdGFuY2Ugb2YgbWF0Y2ggZGF0YSB0byBtZXJnZSB3aXRoIHRoaXMgb25lLlxuICogQHNlZSB7QGxpbmsgbHVuci5JbmRleH5SZXN1bHR9XG4gKi9cbmx1bnIuTWF0Y2hEYXRhLnByb3RvdHlwZS5jb21iaW5lID0gZnVuY3Rpb24gKG90aGVyTWF0Y2hEYXRhKSB7XG4gIHZhciB0ZXJtcyA9IE9iamVjdC5rZXlzKG90aGVyTWF0Y2hEYXRhLm1ldGFkYXRhKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGVybXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdGVybSA9IHRlcm1zW2ldLFxuICAgICAgICBmaWVsZHMgPSBPYmplY3Qua2V5cyhvdGhlck1hdGNoRGF0YS5tZXRhZGF0YVt0ZXJtXSlcblxuICAgIGlmICh0aGlzLm1ldGFkYXRhW3Rlcm1dID09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5tZXRhZGF0YVt0ZXJtXSA9IE9iamVjdC5jcmVhdGUobnVsbClcbiAgICB9XG5cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGZpZWxkcy5sZW5ndGg7IGorKykge1xuICAgICAgdmFyIGZpZWxkID0gZmllbGRzW2pdLFxuICAgICAgICAgIGtleXMgPSBPYmplY3Qua2V5cyhvdGhlck1hdGNoRGF0YS5tZXRhZGF0YVt0ZXJtXVtmaWVsZF0pXG5cbiAgICAgIGlmICh0aGlzLm1ldGFkYXRhW3Rlcm1dW2ZpZWxkXSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5tZXRhZGF0YVt0ZXJtXVtmaWVsZF0gPSBPYmplY3QuY3JlYXRlKG51bGwpXG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwga2V5cy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIga2V5ID0ga2V5c1trXVxuXG4gICAgICAgIGlmICh0aGlzLm1ldGFkYXRhW3Rlcm1dW2ZpZWxkXVtrZXldID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMubWV0YWRhdGFbdGVybV1bZmllbGRdW2tleV0gPSBvdGhlck1hdGNoRGF0YS5tZXRhZGF0YVt0ZXJtXVtmaWVsZF1ba2V5XVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubWV0YWRhdGFbdGVybV1bZmllbGRdW2tleV0gPSB0aGlzLm1ldGFkYXRhW3Rlcm1dW2ZpZWxkXVtrZXldLmNvbmNhdChvdGhlck1hdGNoRGF0YS5tZXRhZGF0YVt0ZXJtXVtmaWVsZF1ba2V5XSlcbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQWRkIG1ldGFkYXRhIGZvciBhIHRlcm0vZmllbGQgcGFpciB0byB0aGlzIGluc3RhbmNlIG9mIG1hdGNoIGRhdGEuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRlcm0gLSBUaGUgdGVybSB0aGlzIG1hdGNoIGRhdGEgaXMgYXNzb2NpYXRlZCB3aXRoXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGQgLSBUaGUgZmllbGQgaW4gd2hpY2ggdGhlIHRlcm0gd2FzIGZvdW5kXG4gKiBAcGFyYW0ge29iamVjdH0gbWV0YWRhdGEgLSBUaGUgbWV0YWRhdGEgcmVjb3JkZWQgYWJvdXQgdGhpcyB0ZXJtIGluIHRoaXMgZmllbGRcbiAqL1xubHVuci5NYXRjaERhdGEucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uICh0ZXJtLCBmaWVsZCwgbWV0YWRhdGEpIHtcbiAgaWYgKCEodGVybSBpbiB0aGlzLm1ldGFkYXRhKSkge1xuICAgIHRoaXMubWV0YWRhdGFbdGVybV0gPSBPYmplY3QuY3JlYXRlKG51bGwpXG4gICAgdGhpcy5tZXRhZGF0YVt0ZXJtXVtmaWVsZF0gPSBtZXRhZGF0YVxuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKCEoZmllbGQgaW4gdGhpcy5tZXRhZGF0YVt0ZXJtXSkpIHtcbiAgICB0aGlzLm1ldGFkYXRhW3Rlcm1dW2ZpZWxkXSA9IG1ldGFkYXRhXG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgbWV0YWRhdGFLZXlzID0gT2JqZWN0LmtleXMobWV0YWRhdGEpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXRhZGF0YUtleXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2V5ID0gbWV0YWRhdGFLZXlzW2ldXG5cbiAgICBpZiAoa2V5IGluIHRoaXMubWV0YWRhdGFbdGVybV1bZmllbGRdKSB7XG4gICAgICB0aGlzLm1ldGFkYXRhW3Rlcm1dW2ZpZWxkXVtrZXldID0gdGhpcy5tZXRhZGF0YVt0ZXJtXVtmaWVsZF1ba2V5XS5jb25jYXQobWV0YWRhdGFba2V5XSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tZXRhZGF0YVt0ZXJtXVtmaWVsZF1ba2V5XSA9IG1ldGFkYXRhW2tleV1cbiAgICB9XG4gIH1cbn1cbi8qKlxuICogQSBsdW5yLlF1ZXJ5IHByb3ZpZGVzIGEgcHJvZ3JhbW1hdGljIHdheSBvZiBkZWZpbmluZyBxdWVyaWVzIHRvIGJlIHBlcmZvcm1lZFxuICogYWdhaW5zdCBhIHtAbGluayBsdW5yLkluZGV4fS5cbiAqXG4gKiBQcmVmZXIgY29uc3RydWN0aW5nIGEgbHVuci5RdWVyeSB1c2luZyB0aGUge0BsaW5rIGx1bnIuSW5kZXgjcXVlcnl9IG1ldGhvZFxuICogc28gdGhlIHF1ZXJ5IG9iamVjdCBpcyBwcmUtaW5pdGlhbGl6ZWQgd2l0aCB0aGUgcmlnaHQgaW5kZXggZmllbGRzLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHByb3BlcnR5IHtsdW5yLlF1ZXJ5fkNsYXVzZVtdfSBjbGF1c2VzIC0gQW4gYXJyYXkgb2YgcXVlcnkgY2xhdXNlcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IGFsbEZpZWxkcyAtIEFuIGFycmF5IG9mIGFsbCBhdmFpbGFibGUgZmllbGRzIGluIGEgbHVuci5JbmRleC5cbiAqL1xubHVuci5RdWVyeSA9IGZ1bmN0aW9uIChhbGxGaWVsZHMpIHtcbiAgdGhpcy5jbGF1c2VzID0gW11cbiAgdGhpcy5hbGxGaWVsZHMgPSBhbGxGaWVsZHNcbn1cblxuLyoqXG4gKiBDb25zdGFudHMgZm9yIGluZGljYXRpbmcgd2hhdCBraW5kIG9mIGF1dG9tYXRpYyB3aWxkY2FyZCBpbnNlcnRpb24gd2lsbCBiZSB1c2VkIHdoZW4gY29uc3RydWN0aW5nIGEgcXVlcnkgY2xhdXNlLlxuICpcbiAqIFRoaXMgYWxsb3dzIHdpbGRjYXJkcyB0byBiZSBhZGRlZCB0byB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSB0ZXJtIHdpdGhvdXQgaGF2aW5nIHRvIG1hbnVhbGx5IGRvIGFueSBzdHJpbmdcbiAqIGNvbmNhdGVuYXRpb24uXG4gKlxuICogVGhlIHdpbGRjYXJkIGNvbnN0YW50cyBjYW4gYmUgYml0d2lzZSBjb21iaW5lZCB0byBzZWxlY3QgYm90aCBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aWxkY2FyZHMuXG4gKlxuICogQGNvbnN0YW50XG4gKiBAZGVmYXVsdFxuICogQHByb3BlcnR5IHtudW1iZXJ9IHdpbGRjYXJkLk5PTkUgLSBUaGUgdGVybSB3aWxsIGhhdmUgbm8gd2lsZGNhcmRzIGluc2VydGVkLCB0aGlzIGlzIHRoZSBkZWZhdWx0IGJlaGF2aW91clxuICogQHByb3BlcnR5IHtudW1iZXJ9IHdpbGRjYXJkLkxFQURJTkcgLSBQcmVwZW5kIHRoZSB0ZXJtIHdpdGggYSB3aWxkY2FyZCwgdW5sZXNzIGEgbGVhZGluZyB3aWxkY2FyZCBhbHJlYWR5IGV4aXN0c1xuICogQHByb3BlcnR5IHtudW1iZXJ9IHdpbGRjYXJkLlRSQUlMSU5HIC0gQXBwZW5kIGEgd2lsZGNhcmQgdG8gdGhlIHRlcm0sIHVubGVzcyBhIHRyYWlsaW5nIHdpbGRjYXJkIGFscmVhZHkgZXhpc3RzXG4gKiBAc2VlIGx1bnIuUXVlcnl+Q2xhdXNlXG4gKiBAc2VlIGx1bnIuUXVlcnkjY2xhdXNlXG4gKiBAc2VlIGx1bnIuUXVlcnkjdGVybVxuICogQGV4YW1wbGUgPGNhcHRpb24+cXVlcnkgdGVybSB3aXRoIHRyYWlsaW5nIHdpbGRjYXJkPC9jYXB0aW9uPlxuICogcXVlcnkudGVybSgnZm9vJywgeyB3aWxkY2FyZDogbHVuci5RdWVyeS53aWxkY2FyZC5UUkFJTElORyB9KVxuICogQGV4YW1wbGUgPGNhcHRpb24+cXVlcnkgdGVybSB3aXRoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdpbGRjYXJkPC9jYXB0aW9uPlxuICogcXVlcnkudGVybSgnZm9vJywge1xuICogICB3aWxkY2FyZDogbHVuci5RdWVyeS53aWxkY2FyZC5MRUFESU5HIHwgbHVuci5RdWVyeS53aWxkY2FyZC5UUkFJTElOR1xuICogfSlcbiAqL1xubHVuci5RdWVyeS53aWxkY2FyZCA9IG5ldyBTdHJpbmcgKFwiKlwiKVxubHVuci5RdWVyeS53aWxkY2FyZC5OT05FID0gMFxubHVuci5RdWVyeS53aWxkY2FyZC5MRUFESU5HID0gMVxubHVuci5RdWVyeS53aWxkY2FyZC5UUkFJTElORyA9IDJcblxuLyoqXG4gKiBBIHNpbmdsZSBjbGF1c2UgaW4gYSB7QGxpbmsgbHVuci5RdWVyeX0gY29udGFpbnMgYSB0ZXJtIGFuZCBkZXRhaWxzIG9uIGhvdyB0b1xuICogbWF0Y2ggdGhhdCB0ZXJtIGFnYWluc3QgYSB7QGxpbmsgbHVuci5JbmRleH0uXG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gbHVuci5RdWVyeX5DbGF1c2VcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IGZpZWxkcyAtIFRoZSBmaWVsZHMgaW4gYW4gaW5kZXggdGhpcyBjbGF1c2Ugc2hvdWxkIGJlIG1hdGNoZWQgYWdhaW5zdC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbYm9vc3Q9MV0gLSBBbnkgYm9vc3QgdGhhdCBzaG91bGQgYmUgYXBwbGllZCB3aGVuIG1hdGNoaW5nIHRoaXMgY2xhdXNlLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IFtlZGl0RGlzdGFuY2VdIC0gV2hldGhlciB0aGUgdGVybSBzaG91bGQgaGF2ZSBmdXp6eSBtYXRjaGluZyBhcHBsaWVkLCBhbmQgaG93IGZ1enp5IHRoZSBtYXRjaCBzaG91bGQgYmUuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFt1c2VQaXBlbGluZV0gLSBXaGV0aGVyIHRoZSB0ZXJtIHNob3VsZCBiZSBwYXNzZWQgdGhyb3VnaCB0aGUgc2VhcmNoIHBpcGVsaW5lLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IFt3aWxkY2FyZD0wXSAtIFdoZXRoZXIgdGhlIHRlcm0gc2hvdWxkIGhhdmUgd2lsZGNhcmRzIGFwcGVuZGVkIG9yIHByZXBlbmRlZC5cbiAqL1xuXG4vKipcbiAqIEFkZHMgYSB7QGxpbmsgbHVuci5RdWVyeX5DbGF1c2V9IHRvIHRoaXMgcXVlcnkuXG4gKlxuICogVW5sZXNzIHRoZSBjbGF1c2UgY29udGFpbnMgdGhlIGZpZWxkcyB0byBiZSBtYXRjaGVkIGFsbCBmaWVsZHMgd2lsbCBiZSBtYXRjaGVkLiBJbiBhZGRpdGlvblxuICogYSBkZWZhdWx0IGJvb3N0IG9mIDEgaXMgYXBwbGllZCB0byB0aGUgY2xhdXNlLlxuICpcbiAqIEBwYXJhbSB7bHVuci5RdWVyeX5DbGF1c2V9IGNsYXVzZSAtIFRoZSBjbGF1c2UgdG8gYWRkIHRvIHRoaXMgcXVlcnkuXG4gKiBAc2VlIGx1bnIuUXVlcnl+Q2xhdXNlXG4gKiBAcmV0dXJucyB7bHVuci5RdWVyeX1cbiAqL1xubHVuci5RdWVyeS5wcm90b3R5cGUuY2xhdXNlID0gZnVuY3Rpb24gKGNsYXVzZSkge1xuICBpZiAoISgnZmllbGRzJyBpbiBjbGF1c2UpKSB7XG4gICAgY2xhdXNlLmZpZWxkcyA9IHRoaXMuYWxsRmllbGRzXG4gIH1cblxuICBpZiAoISgnYm9vc3QnIGluIGNsYXVzZSkpIHtcbiAgICBjbGF1c2UuYm9vc3QgPSAxXG4gIH1cblxuICBpZiAoISgndXNlUGlwZWxpbmUnIGluIGNsYXVzZSkpIHtcbiAgICBjbGF1c2UudXNlUGlwZWxpbmUgPSB0cnVlXG4gIH1cblxuICBpZiAoISgnd2lsZGNhcmQnIGluIGNsYXVzZSkpIHtcbiAgICBjbGF1c2Uud2lsZGNhcmQgPSBsdW5yLlF1ZXJ5LndpbGRjYXJkLk5PTkVcbiAgfVxuXG4gIGlmICgoY2xhdXNlLndpbGRjYXJkICYgbHVuci5RdWVyeS53aWxkY2FyZC5MRUFESU5HKSAmJiAoY2xhdXNlLnRlcm0uY2hhckF0KDApICE9IGx1bnIuUXVlcnkud2lsZGNhcmQpKSB7XG4gICAgY2xhdXNlLnRlcm0gPSBcIipcIiArIGNsYXVzZS50ZXJtXG4gIH1cblxuICBpZiAoKGNsYXVzZS53aWxkY2FyZCAmIGx1bnIuUXVlcnkud2lsZGNhcmQuVFJBSUxJTkcpICYmIChjbGF1c2UudGVybS5zbGljZSgtMSkgIT0gbHVuci5RdWVyeS53aWxkY2FyZCkpIHtcbiAgICBjbGF1c2UudGVybSA9IFwiXCIgKyBjbGF1c2UudGVybSArIFwiKlwiXG4gIH1cblxuICB0aGlzLmNsYXVzZXMucHVzaChjbGF1c2UpXG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLyoqXG4gKiBBZGRzIGEgdGVybSB0byB0aGUgY3VycmVudCBxdWVyeSwgdW5kZXIgdGhlIGNvdmVycyB0aGlzIHdpbGwgY3JlYXRlIGEge0BsaW5rIGx1bnIuUXVlcnl+Q2xhdXNlfVxuICogdG8gdGhlIGxpc3Qgb2YgY2xhdXNlcyB0aGF0IG1ha2UgdXAgdGhpcyBxdWVyeS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGVybSAtIFRoZSB0ZXJtIHRvIGFkZCB0byB0aGUgcXVlcnkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gQW55IGFkZGl0aW9uYWwgcHJvcGVydGllcyB0byBhZGQgdG8gdGhlIHF1ZXJ5IGNsYXVzZS5cbiAqIEByZXR1cm5zIHtsdW5yLlF1ZXJ5fVxuICogQHNlZSBsdW5yLlF1ZXJ5I2NsYXVzZVxuICogQHNlZSBsdW5yLlF1ZXJ5fkNsYXVzZVxuICogQGV4YW1wbGUgPGNhcHRpb24+YWRkaW5nIGEgc2luZ2xlIHRlcm0gdG8gYSBxdWVyeTwvY2FwdGlvbj5cbiAqIHF1ZXJ5LnRlcm0oXCJmb29cIilcbiAqIEBleGFtcGxlIDxjYXB0aW9uPmFkZGluZyBhIHNpbmdsZSB0ZXJtIHRvIGEgcXVlcnkgYW5kIHNwZWNpZnlpbmcgc2VhcmNoIGZpZWxkcywgdGVybSBib29zdCBhbmQgYXV0b21hdGljIHRyYWlsaW5nIHdpbGRjYXJkPC9jYXB0aW9uPlxuICogcXVlcnkudGVybShcImZvb1wiLCB7XG4gKiAgIGZpZWxkczogW1widGl0bGVcIl0sXG4gKiAgIGJvb3N0OiAxMCxcbiAqICAgd2lsZGNhcmQ6IGx1bnIuUXVlcnkud2lsZGNhcmQuVFJBSUxJTkdcbiAqIH0pXG4gKi9cbmx1bnIuUXVlcnkucHJvdG90eXBlLnRlcm0gPSBmdW5jdGlvbiAodGVybSwgb3B0aW9ucykge1xuICB2YXIgY2xhdXNlID0gb3B0aW9ucyB8fCB7fVxuICBjbGF1c2UudGVybSA9IHRlcm1cblxuICB0aGlzLmNsYXVzZShjbGF1c2UpXG5cbiAgcmV0dXJuIHRoaXNcbn1cbmx1bnIuUXVlcnlQYXJzZUVycm9yID0gZnVuY3Rpb24gKG1lc3NhZ2UsIHN0YXJ0LCBlbmQpIHtcbiAgdGhpcy5uYW1lID0gXCJRdWVyeVBhcnNlRXJyb3JcIlxuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlXG4gIHRoaXMuc3RhcnQgPSBzdGFydFxuICB0aGlzLmVuZCA9IGVuZFxufVxuXG5sdW5yLlF1ZXJ5UGFyc2VFcnJvci5wcm90b3R5cGUgPSBuZXcgRXJyb3Jcbmx1bnIuUXVlcnlMZXhlciA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgdGhpcy5sZXhlbWVzID0gW11cbiAgdGhpcy5zdHIgPSBzdHJcbiAgdGhpcy5sZW5ndGggPSBzdHIubGVuZ3RoXG4gIHRoaXMucG9zID0gMFxuICB0aGlzLnN0YXJ0ID0gMFxuICB0aGlzLmVzY2FwZUNoYXJQb3NpdGlvbnMgPSBbXVxufVxuXG5sdW5yLlF1ZXJ5TGV4ZXIucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXRlID0gbHVuci5RdWVyeUxleGVyLmxleFRleHRcblxuICB3aGlsZSAoc3RhdGUpIHtcbiAgICBzdGF0ZSA9IHN0YXRlKHRoaXMpXG4gIH1cbn1cblxubHVuci5RdWVyeUxleGVyLnByb3RvdHlwZS5zbGljZVN0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN1YlNsaWNlcyA9IFtdLFxuICAgICAgc2xpY2VTdGFydCA9IHRoaXMuc3RhcnQsXG4gICAgICBzbGljZUVuZCA9IHRoaXMucG9zXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmVzY2FwZUNoYXJQb3NpdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICBzbGljZUVuZCA9IHRoaXMuZXNjYXBlQ2hhclBvc2l0aW9uc1tpXVxuICAgIHN1YlNsaWNlcy5wdXNoKHRoaXMuc3RyLnNsaWNlKHNsaWNlU3RhcnQsIHNsaWNlRW5kKSlcbiAgICBzbGljZVN0YXJ0ID0gc2xpY2VFbmQgKyAxXG4gIH1cblxuICBzdWJTbGljZXMucHVzaCh0aGlzLnN0ci5zbGljZShzbGljZVN0YXJ0LCB0aGlzLnBvcykpXG4gIHRoaXMuZXNjYXBlQ2hhclBvc2l0aW9ucy5sZW5ndGggPSAwXG5cbiAgcmV0dXJuIHN1YlNsaWNlcy5qb2luKCcnKVxufVxuXG5sdW5yLlF1ZXJ5TGV4ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAodHlwZSkge1xuICB0aGlzLmxleGVtZXMucHVzaCh7XG4gICAgdHlwZTogdHlwZSxcbiAgICBzdHI6IHRoaXMuc2xpY2VTdHJpbmcoKSxcbiAgICBzdGFydDogdGhpcy5zdGFydCxcbiAgICBlbmQ6IHRoaXMucG9zXG4gIH0pXG5cbiAgdGhpcy5zdGFydCA9IHRoaXMucG9zXG59XG5cbmx1bnIuUXVlcnlMZXhlci5wcm90b3R5cGUuZXNjYXBlQ2hhcmFjdGVyID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmVzY2FwZUNoYXJQb3NpdGlvbnMucHVzaCh0aGlzLnBvcyAtIDEpXG4gIHRoaXMucG9zICs9IDFcbn1cblxubHVuci5RdWVyeUxleGVyLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5wb3MgPj0gdGhpcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gbHVuci5RdWVyeUxleGVyLkVPU1xuICB9XG5cbiAgdmFyIGNoYXIgPSB0aGlzLnN0ci5jaGFyQXQodGhpcy5wb3MpXG4gIHRoaXMucG9zICs9IDFcbiAgcmV0dXJuIGNoYXJcbn1cblxubHVuci5RdWVyeUxleGVyLnByb3RvdHlwZS53aWR0aCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMucG9zIC0gdGhpcy5zdGFydFxufVxuXG5sdW5yLlF1ZXJ5TGV4ZXIucHJvdG90eXBlLmlnbm9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuc3RhcnQgPT0gdGhpcy5wb3MpIHtcbiAgICB0aGlzLnBvcyArPSAxXG4gIH1cblxuICB0aGlzLnN0YXJ0ID0gdGhpcy5wb3Ncbn1cblxubHVuci5RdWVyeUxleGVyLnByb3RvdHlwZS5iYWNrdXAgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucG9zIC09IDFcbn1cblxubHVuci5RdWVyeUxleGVyLnByb3RvdHlwZS5hY2NlcHREaWdpdFJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGNoYXIsIGNoYXJDb2RlXG5cbiAgZG8ge1xuICAgIGNoYXIgPSB0aGlzLm5leHQoKVxuICAgIGNoYXJDb2RlID0gY2hhci5jaGFyQ29kZUF0KDApXG4gIH0gd2hpbGUgKGNoYXJDb2RlID4gNDcgJiYgY2hhckNvZGUgPCA1OClcblxuICBpZiAoY2hhciAhPSBsdW5yLlF1ZXJ5TGV4ZXIuRU9TKSB7XG4gICAgdGhpcy5iYWNrdXAoKVxuICB9XG59XG5cbmx1bnIuUXVlcnlMZXhlci5wcm90b3R5cGUubW9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMucG9zIDwgdGhpcy5sZW5ndGhcbn1cblxubHVuci5RdWVyeUxleGVyLkVPUyA9ICdFT1MnXG5sdW5yLlF1ZXJ5TGV4ZXIuRklFTEQgPSAnRklFTEQnXG5sdW5yLlF1ZXJ5TGV4ZXIuVEVSTSA9ICdURVJNJ1xubHVuci5RdWVyeUxleGVyLkVESVRfRElTVEFOQ0UgPSAnRURJVF9ESVNUQU5DRSdcbmx1bnIuUXVlcnlMZXhlci5CT09TVCA9ICdCT09TVCdcblxubHVuci5RdWVyeUxleGVyLmxleEZpZWxkID0gZnVuY3Rpb24gKGxleGVyKSB7XG4gIGxleGVyLmJhY2t1cCgpXG4gIGxleGVyLmVtaXQobHVuci5RdWVyeUxleGVyLkZJRUxEKVxuICBsZXhlci5pZ25vcmUoKVxuICByZXR1cm4gbHVuci5RdWVyeUxleGVyLmxleFRleHRcbn1cblxubHVuci5RdWVyeUxleGVyLmxleFRlcm0gPSBmdW5jdGlvbiAobGV4ZXIpIHtcbiAgaWYgKGxleGVyLndpZHRoKCkgPiAxKSB7XG4gICAgbGV4ZXIuYmFja3VwKClcbiAgICBsZXhlci5lbWl0KGx1bnIuUXVlcnlMZXhlci5URVJNKVxuICB9XG5cbiAgbGV4ZXIuaWdub3JlKClcblxuICBpZiAobGV4ZXIubW9yZSgpKSB7XG4gICAgcmV0dXJuIGx1bnIuUXVlcnlMZXhlci5sZXhUZXh0XG4gIH1cbn1cblxubHVuci5RdWVyeUxleGVyLmxleEVkaXREaXN0YW5jZSA9IGZ1bmN0aW9uIChsZXhlcikge1xuICBsZXhlci5pZ25vcmUoKVxuICBsZXhlci5hY2NlcHREaWdpdFJ1bigpXG4gIGxleGVyLmVtaXQobHVuci5RdWVyeUxleGVyLkVESVRfRElTVEFOQ0UpXG4gIHJldHVybiBsdW5yLlF1ZXJ5TGV4ZXIubGV4VGV4dFxufVxuXG5sdW5yLlF1ZXJ5TGV4ZXIubGV4Qm9vc3QgPSBmdW5jdGlvbiAobGV4ZXIpIHtcbiAgbGV4ZXIuaWdub3JlKClcbiAgbGV4ZXIuYWNjZXB0RGlnaXRSdW4oKVxuICBsZXhlci5lbWl0KGx1bnIuUXVlcnlMZXhlci5CT09TVClcbiAgcmV0dXJuIGx1bnIuUXVlcnlMZXhlci5sZXhUZXh0XG59XG5cbmx1bnIuUXVlcnlMZXhlci5sZXhFT1MgPSBmdW5jdGlvbiAobGV4ZXIpIHtcbiAgaWYgKGxleGVyLndpZHRoKCkgPiAwKSB7XG4gICAgbGV4ZXIuZW1pdChsdW5yLlF1ZXJ5TGV4ZXIuVEVSTSlcbiAgfVxufVxuXG4vLyBUaGlzIG1hdGNoZXMgdGhlIHNlcGFyYXRvciB1c2VkIHdoZW4gdG9rZW5pc2luZyBmaWVsZHNcbi8vIHdpdGhpbiBhIGRvY3VtZW50LiBUaGVzZSBzaG91bGQgbWF0Y2ggb3RoZXJ3aXNlIGl0IGlzXG4vLyBub3QgcG9zc2libGUgdG8gc2VhcmNoIGZvciBzb21lIHRva2VucyB3aXRoaW4gYSBkb2N1bWVudC5cbi8vXG4vLyBJdCBpcyBwb3NzaWJsZSBmb3IgdGhlIHVzZXIgdG8gY2hhbmdlIHRoZSBzZXBhcmF0b3Igb24gdGhlXG4vLyB0b2tlbml6ZXIgc28gaXQgX21pZ2h0XyBjbGFzaCB3aXRoIGFueSBvdGhlciBvZiB0aGUgc3BlY2lhbFxuLy8gY2hhcmFjdGVycyBhbHJlYWR5IHVzZWQgd2l0aGluIHRoZSBzZWFyY2ggc3RyaW5nLCBlLmcuIDouXG4vL1xuLy8gVGhpcyBtZWFucyB0aGF0IGl0IGlzIHBvc3NpYmxlIHRvIGNoYW5nZSB0aGUgc2VwYXJhdG9yIGluXG4vLyBzdWNoIGEgd2F5IHRoYXQgbWFrZXMgc29tZSB3b3JkcyB1bnNlYXJjaGFibGUgdXNpbmcgYSBzZWFyY2hcbi8vIHN0cmluZy5cbmx1bnIuUXVlcnlMZXhlci50ZXJtU2VwYXJhdG9yID0gbHVuci50b2tlbml6ZXIuc2VwYXJhdG9yXG5cbmx1bnIuUXVlcnlMZXhlci5sZXhUZXh0ID0gZnVuY3Rpb24gKGxleGVyKSB7XG4gIHdoaWxlICh0cnVlKSB7XG4gICAgdmFyIGNoYXIgPSBsZXhlci5uZXh0KClcblxuICAgIGlmIChjaGFyID09IGx1bnIuUXVlcnlMZXhlci5FT1MpIHtcbiAgICAgIHJldHVybiBsdW5yLlF1ZXJ5TGV4ZXIubGV4RU9TXG4gICAgfVxuXG4gICAgLy8gRXNjYXBlIGNoYXJhY3RlciBpcyAnXFwnXG4gICAgaWYgKGNoYXIuY2hhckNvZGVBdCgwKSA9PSA5Mikge1xuICAgICAgbGV4ZXIuZXNjYXBlQ2hhcmFjdGVyKClcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgaWYgKGNoYXIgPT0gXCI6XCIpIHtcbiAgICAgIHJldHVybiBsdW5yLlF1ZXJ5TGV4ZXIubGV4RmllbGRcbiAgICB9XG5cbiAgICBpZiAoY2hhciA9PSBcIn5cIikge1xuICAgICAgbGV4ZXIuYmFja3VwKClcbiAgICAgIGlmIChsZXhlci53aWR0aCgpID4gMCkge1xuICAgICAgICBsZXhlci5lbWl0KGx1bnIuUXVlcnlMZXhlci5URVJNKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGx1bnIuUXVlcnlMZXhlci5sZXhFZGl0RGlzdGFuY2VcbiAgICB9XG5cbiAgICBpZiAoY2hhciA9PSBcIl5cIikge1xuICAgICAgbGV4ZXIuYmFja3VwKClcbiAgICAgIGlmIChsZXhlci53aWR0aCgpID4gMCkge1xuICAgICAgICBsZXhlci5lbWl0KGx1bnIuUXVlcnlMZXhlci5URVJNKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGx1bnIuUXVlcnlMZXhlci5sZXhCb29zdFxuICAgIH1cblxuICAgIGlmIChjaGFyLm1hdGNoKGx1bnIuUXVlcnlMZXhlci50ZXJtU2VwYXJhdG9yKSkge1xuICAgICAgcmV0dXJuIGx1bnIuUXVlcnlMZXhlci5sZXhUZXJtXG4gICAgfVxuICB9XG59XG5cbmx1bnIuUXVlcnlQYXJzZXIgPSBmdW5jdGlvbiAoc3RyLCBxdWVyeSkge1xuICB0aGlzLmxleGVyID0gbmV3IGx1bnIuUXVlcnlMZXhlciAoc3RyKVxuICB0aGlzLnF1ZXJ5ID0gcXVlcnlcbiAgdGhpcy5jdXJyZW50Q2xhdXNlID0ge31cbiAgdGhpcy5sZXhlbWVJZHggPSAwXG59XG5cbmx1bnIuUXVlcnlQYXJzZXIucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmxleGVyLnJ1bigpXG4gIHRoaXMubGV4ZW1lcyA9IHRoaXMubGV4ZXIubGV4ZW1lc1xuXG4gIHZhciBzdGF0ZSA9IGx1bnIuUXVlcnlQYXJzZXIucGFyc2VGaWVsZE9yVGVybVxuXG4gIHdoaWxlIChzdGF0ZSkge1xuICAgIHN0YXRlID0gc3RhdGUodGhpcylcbiAgfVxuXG4gIHJldHVybiB0aGlzLnF1ZXJ5XG59XG5cbmx1bnIuUXVlcnlQYXJzZXIucHJvdG90eXBlLnBlZWtMZXhlbWUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmxleGVtZXNbdGhpcy5sZXhlbWVJZHhdXG59XG5cbmx1bnIuUXVlcnlQYXJzZXIucHJvdG90eXBlLmNvbnN1bWVMZXhlbWUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBsZXhlbWUgPSB0aGlzLnBlZWtMZXhlbWUoKVxuICB0aGlzLmxleGVtZUlkeCArPSAxXG4gIHJldHVybiBsZXhlbWVcbn1cblxubHVuci5RdWVyeVBhcnNlci5wcm90b3R5cGUubmV4dENsYXVzZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGNvbXBsZXRlZENsYXVzZSA9IHRoaXMuY3VycmVudENsYXVzZVxuICB0aGlzLnF1ZXJ5LmNsYXVzZShjb21wbGV0ZWRDbGF1c2UpXG4gIHRoaXMuY3VycmVudENsYXVzZSA9IHt9XG59XG5cbmx1bnIuUXVlcnlQYXJzZXIucGFyc2VGaWVsZE9yVGVybSA9IGZ1bmN0aW9uIChwYXJzZXIpIHtcbiAgdmFyIGxleGVtZSA9IHBhcnNlci5wZWVrTGV4ZW1lKClcblxuICBpZiAobGV4ZW1lID09IHVuZGVmaW5lZCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgc3dpdGNoIChsZXhlbWUudHlwZSkge1xuICAgIGNhc2UgbHVuci5RdWVyeUxleGVyLkZJRUxEOlxuICAgICAgcmV0dXJuIGx1bnIuUXVlcnlQYXJzZXIucGFyc2VGaWVsZFxuICAgIGNhc2UgbHVuci5RdWVyeUxleGVyLlRFUk06XG4gICAgICByZXR1cm4gbHVuci5RdWVyeVBhcnNlci5wYXJzZVRlcm1cbiAgICBkZWZhdWx0OlxuICAgICAgdmFyIGVycm9yTWVzc2FnZSA9IFwiZXhwZWN0ZWQgZWl0aGVyIGEgZmllbGQgb3IgYSB0ZXJtLCBmb3VuZCBcIiArIGxleGVtZS50eXBlXG5cbiAgICAgIGlmIChsZXhlbWUuc3RyLmxlbmd0aCA+PSAxKSB7XG4gICAgICAgIGVycm9yTWVzc2FnZSArPSBcIiB3aXRoIHZhbHVlICdcIiArIGxleGVtZS5zdHIgKyBcIidcIlxuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgbHVuci5RdWVyeVBhcnNlRXJyb3IgKGVycm9yTWVzc2FnZSwgbGV4ZW1lLnN0YXJ0LCBsZXhlbWUuZW5kKVxuICB9XG59XG5cbmx1bnIuUXVlcnlQYXJzZXIucGFyc2VGaWVsZCA9IGZ1bmN0aW9uIChwYXJzZXIpIHtcbiAgdmFyIGxleGVtZSA9IHBhcnNlci5jb25zdW1lTGV4ZW1lKClcblxuICBpZiAobGV4ZW1lID09IHVuZGVmaW5lZCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKHBhcnNlci5xdWVyeS5hbGxGaWVsZHMuaW5kZXhPZihsZXhlbWUuc3RyKSA9PSAtMSkge1xuICAgIHZhciBwb3NzaWJsZUZpZWxkcyA9IHBhcnNlci5xdWVyeS5hbGxGaWVsZHMubWFwKGZ1bmN0aW9uIChmKSB7IHJldHVybiBcIidcIiArIGYgKyBcIidcIiB9KS5qb2luKCcsICcpLFxuICAgICAgICBlcnJvck1lc3NhZ2UgPSBcInVucmVjb2duaXNlZCBmaWVsZCAnXCIgKyBsZXhlbWUuc3RyICsgXCInLCBwb3NzaWJsZSBmaWVsZHM6IFwiICsgcG9zc2libGVGaWVsZHNcblxuICAgIHRocm93IG5ldyBsdW5yLlF1ZXJ5UGFyc2VFcnJvciAoZXJyb3JNZXNzYWdlLCBsZXhlbWUuc3RhcnQsIGxleGVtZS5lbmQpXG4gIH1cblxuICBwYXJzZXIuY3VycmVudENsYXVzZS5maWVsZHMgPSBbbGV4ZW1lLnN0cl1cblxuICB2YXIgbmV4dExleGVtZSA9IHBhcnNlci5wZWVrTGV4ZW1lKClcblxuICBpZiAobmV4dExleGVtZSA9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZXJyb3JNZXNzYWdlID0gXCJleHBlY3RpbmcgdGVybSwgZm91bmQgbm90aGluZ1wiXG4gICAgdGhyb3cgbmV3IGx1bnIuUXVlcnlQYXJzZUVycm9yIChlcnJvck1lc3NhZ2UsIGxleGVtZS5zdGFydCwgbGV4ZW1lLmVuZClcbiAgfVxuXG4gIHN3aXRjaCAobmV4dExleGVtZS50eXBlKSB7XG4gICAgY2FzZSBsdW5yLlF1ZXJ5TGV4ZXIuVEVSTTpcbiAgICAgIHJldHVybiBsdW5yLlF1ZXJ5UGFyc2VyLnBhcnNlVGVybVxuICAgIGRlZmF1bHQ6XG4gICAgICB2YXIgZXJyb3JNZXNzYWdlID0gXCJleHBlY3RpbmcgdGVybSwgZm91bmQgJ1wiICsgbmV4dExleGVtZS50eXBlICsgXCInXCJcbiAgICAgIHRocm93IG5ldyBsdW5yLlF1ZXJ5UGFyc2VFcnJvciAoZXJyb3JNZXNzYWdlLCBuZXh0TGV4ZW1lLnN0YXJ0LCBuZXh0TGV4ZW1lLmVuZClcbiAgfVxufVxuXG5sdW5yLlF1ZXJ5UGFyc2VyLnBhcnNlVGVybSA9IGZ1bmN0aW9uIChwYXJzZXIpIHtcbiAgdmFyIGxleGVtZSA9IHBhcnNlci5jb25zdW1lTGV4ZW1lKClcblxuICBpZiAobGV4ZW1lID09IHVuZGVmaW5lZCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgcGFyc2VyLmN1cnJlbnRDbGF1c2UudGVybSA9IGxleGVtZS5zdHIudG9Mb3dlckNhc2UoKVxuXG4gIGlmIChsZXhlbWUuc3RyLmluZGV4T2YoXCIqXCIpICE9IC0xKSB7XG4gICAgcGFyc2VyLmN1cnJlbnRDbGF1c2UudXNlUGlwZWxpbmUgPSBmYWxzZVxuICB9XG5cbiAgdmFyIG5leHRMZXhlbWUgPSBwYXJzZXIucGVla0xleGVtZSgpXG5cbiAgaWYgKG5leHRMZXhlbWUgPT0gdW5kZWZpbmVkKSB7XG4gICAgcGFyc2VyLm5leHRDbGF1c2UoKVxuICAgIHJldHVyblxuICB9XG5cbiAgc3dpdGNoIChuZXh0TGV4ZW1lLnR5cGUpIHtcbiAgICBjYXNlIGx1bnIuUXVlcnlMZXhlci5URVJNOlxuICAgICAgcGFyc2VyLm5leHRDbGF1c2UoKVxuICAgICAgcmV0dXJuIGx1bnIuUXVlcnlQYXJzZXIucGFyc2VUZXJtXG4gICAgY2FzZSBsdW5yLlF1ZXJ5TGV4ZXIuRklFTEQ6XG4gICAgICBwYXJzZXIubmV4dENsYXVzZSgpXG4gICAgICByZXR1cm4gbHVuci5RdWVyeVBhcnNlci5wYXJzZUZpZWxkXG4gICAgY2FzZSBsdW5yLlF1ZXJ5TGV4ZXIuRURJVF9ESVNUQU5DRTpcbiAgICAgIHJldHVybiBsdW5yLlF1ZXJ5UGFyc2VyLnBhcnNlRWRpdERpc3RhbmNlXG4gICAgY2FzZSBsdW5yLlF1ZXJ5TGV4ZXIuQk9PU1Q6XG4gICAgICByZXR1cm4gbHVuci5RdWVyeVBhcnNlci5wYXJzZUJvb3N0XG4gICAgZGVmYXVsdDpcbiAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBcIlVuZXhwZWN0ZWQgbGV4ZW1lIHR5cGUgJ1wiICsgbmV4dExleGVtZS50eXBlICsgXCInXCJcbiAgICAgIHRocm93IG5ldyBsdW5yLlF1ZXJ5UGFyc2VFcnJvciAoZXJyb3JNZXNzYWdlLCBuZXh0TGV4ZW1lLnN0YXJ0LCBuZXh0TGV4ZW1lLmVuZClcbiAgfVxufVxuXG5sdW5yLlF1ZXJ5UGFyc2VyLnBhcnNlRWRpdERpc3RhbmNlID0gZnVuY3Rpb24gKHBhcnNlcikge1xuICB2YXIgbGV4ZW1lID0gcGFyc2VyLmNvbnN1bWVMZXhlbWUoKVxuXG4gIGlmIChsZXhlbWUgPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgZWRpdERpc3RhbmNlID0gcGFyc2VJbnQobGV4ZW1lLnN0ciwgMTApXG5cbiAgaWYgKGlzTmFOKGVkaXREaXN0YW5jZSkpIHtcbiAgICB2YXIgZXJyb3JNZXNzYWdlID0gXCJlZGl0IGRpc3RhbmNlIG11c3QgYmUgbnVtZXJpY1wiXG4gICAgdGhyb3cgbmV3IGx1bnIuUXVlcnlQYXJzZUVycm9yIChlcnJvck1lc3NhZ2UsIGxleGVtZS5zdGFydCwgbGV4ZW1lLmVuZClcbiAgfVxuXG4gIHBhcnNlci5jdXJyZW50Q2xhdXNlLmVkaXREaXN0YW5jZSA9IGVkaXREaXN0YW5jZVxuXG4gIHZhciBuZXh0TGV4ZW1lID0gcGFyc2VyLnBlZWtMZXhlbWUoKVxuXG4gIGlmIChuZXh0TGV4ZW1lID09IHVuZGVmaW5lZCkge1xuICAgIHBhcnNlci5uZXh0Q2xhdXNlKClcbiAgICByZXR1cm5cbiAgfVxuXG4gIHN3aXRjaCAobmV4dExleGVtZS50eXBlKSB7XG4gICAgY2FzZSBsdW5yLlF1ZXJ5TGV4ZXIuVEVSTTpcbiAgICAgIHBhcnNlci5uZXh0Q2xhdXNlKClcbiAgICAgIHJldHVybiBsdW5yLlF1ZXJ5UGFyc2VyLnBhcnNlVGVybVxuICAgIGNhc2UgbHVuci5RdWVyeUxleGVyLkZJRUxEOlxuICAgICAgcGFyc2VyLm5leHRDbGF1c2UoKVxuICAgICAgcmV0dXJuIGx1bnIuUXVlcnlQYXJzZXIucGFyc2VGaWVsZFxuICAgIGNhc2UgbHVuci5RdWVyeUxleGVyLkVESVRfRElTVEFOQ0U6XG4gICAgICByZXR1cm4gbHVuci5RdWVyeVBhcnNlci5wYXJzZUVkaXREaXN0YW5jZVxuICAgIGNhc2UgbHVuci5RdWVyeUxleGVyLkJPT1NUOlxuICAgICAgcmV0dXJuIGx1bnIuUXVlcnlQYXJzZXIucGFyc2VCb29zdFxuICAgIGRlZmF1bHQ6XG4gICAgICB2YXIgZXJyb3JNZXNzYWdlID0gXCJVbmV4cGVjdGVkIGxleGVtZSB0eXBlICdcIiArIG5leHRMZXhlbWUudHlwZSArIFwiJ1wiXG4gICAgICB0aHJvdyBuZXcgbHVuci5RdWVyeVBhcnNlRXJyb3IgKGVycm9yTWVzc2FnZSwgbmV4dExleGVtZS5zdGFydCwgbmV4dExleGVtZS5lbmQpXG4gIH1cbn1cblxubHVuci5RdWVyeVBhcnNlci5wYXJzZUJvb3N0ID0gZnVuY3Rpb24gKHBhcnNlcikge1xuICB2YXIgbGV4ZW1lID0gcGFyc2VyLmNvbnN1bWVMZXhlbWUoKVxuXG4gIGlmIChsZXhlbWUgPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgYm9vc3QgPSBwYXJzZUludChsZXhlbWUuc3RyLCAxMClcblxuICBpZiAoaXNOYU4oYm9vc3QpKSB7XG4gICAgdmFyIGVycm9yTWVzc2FnZSA9IFwiYm9vc3QgbXVzdCBiZSBudW1lcmljXCJcbiAgICB0aHJvdyBuZXcgbHVuci5RdWVyeVBhcnNlRXJyb3IgKGVycm9yTWVzc2FnZSwgbGV4ZW1lLnN0YXJ0LCBsZXhlbWUuZW5kKVxuICB9XG5cbiAgcGFyc2VyLmN1cnJlbnRDbGF1c2UuYm9vc3QgPSBib29zdFxuXG4gIHZhciBuZXh0TGV4ZW1lID0gcGFyc2VyLnBlZWtMZXhlbWUoKVxuXG4gIGlmIChuZXh0TGV4ZW1lID09IHVuZGVmaW5lZCkge1xuICAgIHBhcnNlci5uZXh0Q2xhdXNlKClcbiAgICByZXR1cm5cbiAgfVxuXG4gIHN3aXRjaCAobmV4dExleGVtZS50eXBlKSB7XG4gICAgY2FzZSBsdW5yLlF1ZXJ5TGV4ZXIuVEVSTTpcbiAgICAgIHBhcnNlci5uZXh0Q2xhdXNlKClcbiAgICAgIHJldHVybiBsdW5yLlF1ZXJ5UGFyc2VyLnBhcnNlVGVybVxuICAgIGNhc2UgbHVuci5RdWVyeUxleGVyLkZJRUxEOlxuICAgICAgcGFyc2VyLm5leHRDbGF1c2UoKVxuICAgICAgcmV0dXJuIGx1bnIuUXVlcnlQYXJzZXIucGFyc2VGaWVsZFxuICAgIGNhc2UgbHVuci5RdWVyeUxleGVyLkVESVRfRElTVEFOQ0U6XG4gICAgICByZXR1cm4gbHVuci5RdWVyeVBhcnNlci5wYXJzZUVkaXREaXN0YW5jZVxuICAgIGNhc2UgbHVuci5RdWVyeUxleGVyLkJPT1NUOlxuICAgICAgcmV0dXJuIGx1bnIuUXVlcnlQYXJzZXIucGFyc2VCb29zdFxuICAgIGRlZmF1bHQ6XG4gICAgICB2YXIgZXJyb3JNZXNzYWdlID0gXCJVbmV4cGVjdGVkIGxleGVtZSB0eXBlICdcIiArIG5leHRMZXhlbWUudHlwZSArIFwiJ1wiXG4gICAgICB0aHJvdyBuZXcgbHVuci5RdWVyeVBhcnNlRXJyb3IgKGVycm9yTWVzc2FnZSwgbmV4dExleGVtZS5zdGFydCwgbmV4dExleGVtZS5lbmQpXG4gIH1cbn1cblxuICAvKipcbiAgICogZXhwb3J0IHRoZSBtb2R1bGUgdmlhIEFNRCwgQ29tbW9uSlMgb3IgYXMgYSBicm93c2VyIGdsb2JhbFxuICAgKiBFeHBvcnQgY29kZSBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS91bWRqcy91bWQvYmxvYi9tYXN0ZXIvcmV0dXJuRXhwb3J0cy5qc1xuICAgKi9cbiAgOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICAgIGRlZmluZShmYWN0b3J5KVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAvKipcbiAgICAgICAqIE5vZGUuIERvZXMgbm90IHdvcmsgd2l0aCBzdHJpY3QgQ29tbW9uSlMsIGJ1dFxuICAgICAgICogb25seSBDb21tb25KUy1saWtlIGVudmlyb21lbnRzIHRoYXQgc3VwcG9ydCBtb2R1bGUuZXhwb3J0cyxcbiAgICAgICAqIGxpa2UgTm9kZS5cbiAgICAgICAqL1xuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KClcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQnJvd3NlciBnbG9iYWxzIChyb290IGlzIHdpbmRvdylcbiAgICAgIHJvb3QubHVuciA9IGZhY3RvcnkoKVxuICAgIH1cbiAgfSh0aGlzLCBmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogSnVzdCByZXR1cm4gYSB2YWx1ZSB0byBkZWZpbmUgdGhlIG1vZHVsZSBleHBvcnQuXG4gICAgICogVGhpcyBleGFtcGxlIHJldHVybnMgYW4gb2JqZWN0LCBidXQgdGhlIG1vZHVsZVxuICAgICAqIGNhbiByZXR1cm4gYSBmdW5jdGlvbiBhcyB0aGUgZXhwb3J0ZWQgdmFsdWUuXG4gICAgICovXG4gICAgcmV0dXJuIGx1bnJcbiAgfSkpXG59KSgpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbHVuci9sdW5yLmpzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTcgTWFydGluIERvbmF0aCA8bWFydGluLmRvbmF0aEBzcXVpZGZ1bmsuY29tPlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvXG4gKiBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZVxuICogcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yXG4gKiBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OLUlORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuICogRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HU1xuICogSU4gVEhFIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCBQb3NpdGlvbiBmcm9tIFwiLi9TaWRlYmFyL1Bvc2l0aW9uXCJcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogTW9kdWxlXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgUG9zaXRpb25cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9NYXRlcmlhbC9TaWRlYmFyLmpzIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE3IE1hcnRpbiBEb25hdGggPG1hcnRpbi5kb25hdGhAc3F1aWRmdW5rLmNvbT5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0b1xuICogZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGVcbiAqIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vclxuICogc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTi1JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkdcbiAqIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1NcbiAqIElOIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDbGFzc1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3NpdGlvbiB7XG5cbiAgLyoqXG4gICAqIFNldCBzaWRlYmFycyB0byBsb2NrZWQgc3RhdGUgYW5kIGxpbWl0IGhlaWdodCB0byBwYXJlbnQgbm9kZVxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICpcbiAgICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gZWxfIC0gU2lkZWJhclxuICAgKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSBwYXJlbnRfIC0gU2lkZWJhciBjb250YWluZXJcbiAgICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gaGVhZGVyXyAtIEhlYWRlclxuICAgKiBAcHJvcGVydHkge251bWJlcn0gaGVpZ2h0XyAtIEN1cnJlbnQgc2lkZWJhciBoZWlnaHRcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IG9mZnNldF8gLSBDdXJyZW50IHBhZ2UgeS1vZmZzZXRcbiAgICogQHByb3BlcnR5IHtib29sZWFufSBwYWRfIC0gUGFkIHdoZW4gaGVhZGVyIGlzIGZpeGVkXG4gICAqXG4gICAqIEBwYXJhbSB7KHN0cmluZ3xIVE1MRWxlbWVudCl9IGVsIC0gU2VsZWN0b3Igb3IgSFRNTCBlbGVtZW50XG4gICAqIEBwYXJhbSB7KHN0cmluZ3xIVE1MRWxlbWVudCl9IGhlYWRlciAtIFNlbGVjdG9yIG9yIEhUTUwgZWxlbWVudFxuICAgKi9cbiAgY29uc3RydWN0b3IoZWwsIGhlYWRlcikge1xuICAgIGxldCByZWYgPSAodHlwZW9mIGVsID09PSBcInN0cmluZ1wiKVxuICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKVxuICAgICAgOiBlbFxuICAgIGlmICghKHJlZiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB8fFxuICAgICAgICAhKHJlZi5wYXJlbnROb2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKVxuICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yXG4gICAgdGhpcy5lbF8gPSByZWZcbiAgICB0aGlzLnBhcmVudF8gPSByZWYucGFyZW50Tm9kZVxuXG4gICAgLyogUmV0cmlldmUgaGVhZGVyICovXG4gICAgcmVmID0gKHR5cGVvZiBoZWFkZXIgPT09IFwic3RyaW5nXCIpXG4gICAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaGVhZGVyKVxuICAgICAgOiBoZWFkZXJcbiAgICBpZiAoIShyZWYgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpXG4gICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3JcbiAgICB0aGlzLmhlYWRlcl8gPSByZWZcblxuICAgIC8qIEluaXRpYWxpemUgY3VycmVudCBoZWlnaHQgYW5kIHRlc3Qgd2hldGhlciBoZWFkZXIgaXMgZml4ZWQgKi9cbiAgICB0aGlzLmhlaWdodF8gPSAwXG4gICAgdGhpcy5wYWRfID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5oZWFkZXJfKS5wb3NpdGlvbiA9PT0gXCJmaXhlZFwiXG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBzaWRlYmFyIHN0YXRlXG4gICAqL1xuICBzZXR1cCgpIHtcbiAgICBjb25zdCB0b3AgPSBBcnJheS5wcm90b3R5cGUucmVkdWNlLmNhbGwoXG4gICAgICB0aGlzLnBhcmVudF8uY2hpbGRyZW4sIChvZmZzZXQsIGNoaWxkKSA9PiB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChvZmZzZXQsIGNoaWxkLm9mZnNldFRvcClcbiAgICAgIH0sIDApXG5cbiAgICAvKiBTZXQgbG9jayBvZmZzZXQgZm9yIGVsZW1lbnQgd2l0aCBsYXJnZXN0IHRvcCBvZmZzZXQgKi9cbiAgICB0aGlzLm9mZnNldF8gPSB0b3AgLSAodGhpcy5wYWRfID8gdGhpcy5oZWFkZXJfLm9mZnNldEhlaWdodCA6IDApXG4gICAgdGhpcy51cGRhdGUoKVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBsb2NrZWQgc3RhdGUgYW5kIGhlaWdodFxuICAgKlxuICAgKiBUaGUgaW5uZXIgaGVpZ2h0IG9mIHRoZSB3aW5kb3cgKD0gdGhlIHZpc2libGUgYXJlYSkgaXMgdGhlIG1heGltdW1cbiAgICogcG9zc2libGUgaGVpZ2h0IGZvciB0aGUgc3RyZXRjaGluZyBzaWRlYmFyLiBUaGlzIGhlaWdodCBtdXN0IGJlIGRlZHVjdGVkXG4gICAqIGJ5IHRoZSBoZWlnaHQgb2YgdGhlIGZpeGVkIGhlYWRlciAoNTZweCkuIERlcGVuZGluZyBvbiB0aGUgcGFnZSB5LW9mZnNldCxcbiAgICogdGhlIHRvcCBvZmZzZXQgb2YgdGhlIHNpZGViYXIgbXVzdCBiZSB0YWtlbiBpbnRvIGFjY291bnQsIGFzIHdlbGwgYXMgdGhlXG4gICAqIGNhc2Ugd2hlcmUgdGhlIHdpbmRvdyBpcyBzY3JvbGxlZCBiZXlvbmQgdGhlIHNpZGViYXIgY29udGFpbmVyLlxuICAgKlxuICAgKiBAcGFyYW0ge0V2ZW50P30gZXYgLSBFdmVudFxuICAgKi9cbiAgdXBkYXRlKGV2KSB7XG4gICAgY29uc3Qgb2Zmc2V0ICA9IHdpbmRvdy5wYWdlWU9mZnNldFxuICAgIGNvbnN0IHZpc2libGUgPSB3aW5kb3cuaW5uZXJIZWlnaHRcblxuICAgIC8qIFVwZGF0ZSBvZmZzZXQsIGluIGNhc2Ugd2luZG93IGlzIHJlc2l6ZWQgKi9cbiAgICBpZiAoZXYgJiYgZXYudHlwZSA9PT0gXCJyZXNpemVcIilcbiAgICAgIHRoaXMuc2V0dXAoKVxuXG4gICAgLyogU2V0IGJvdW5kcyBvZiBzaWRlYmFyIGNvbnRhaW5lciAtIG11c3QgYmUgY2FsY3VsYXRlZCBvbiBldmVyeSBydW4sIGFzXG4gICAgICAgdGhlIGhlaWdodCBvZiB0aGUgY29udGVudCBtaWdodCBjaGFuZ2UgZHVlIHRvIGxvYWRpbmcgaW1hZ2VzIGV0Yy4gKi9cbiAgICBjb25zdCBib3VuZHMgPSB7XG4gICAgICB0b3A6IHRoaXMucGFkXyA/IHRoaXMuaGVhZGVyXy5vZmZzZXRIZWlnaHQgOiAwLFxuICAgICAgYm90dG9tOiB0aGlzLnBhcmVudF8ub2Zmc2V0VG9wICsgdGhpcy5wYXJlbnRfLm9mZnNldEhlaWdodFxuICAgIH1cblxuICAgIC8qIENhbGN1bGF0ZSBuZXcgb2Zmc2V0IGFuZCBoZWlnaHQgKi9cbiAgICBjb25zdCBoZWlnaHQgPSB2aXNpYmxlIC0gYm91bmRzLnRvcFxuICAgICAgICAgICAgICAgICAtIE1hdGgubWF4KDAsIHRoaXMub2Zmc2V0XyAtIG9mZnNldClcbiAgICAgICAgICAgICAgICAgLSBNYXRoLm1heCgwLCBvZmZzZXQgKyB2aXNpYmxlIC0gYm91bmRzLmJvdHRvbSlcblxuICAgIC8qIElmIGhlaWdodCBjaGFuZ2VkLCB1cGRhdGUgZWxlbWVudCAqL1xuICAgIGlmIChoZWlnaHQgIT09IHRoaXMuaGVpZ2h0XylcbiAgICAgIHRoaXMuZWxfLnN0eWxlLmhlaWdodCA9IGAke3RoaXMuaGVpZ2h0XyA9IGhlaWdodH1weGBcblxuICAgIC8qIFNpZGViYXIgc2hvdWxkIGJlIGxvY2tlZCwgYXMgd2UncmUgYmVsb3cgcGFyZW50IG9mZnNldCAqL1xuICAgIGlmIChvZmZzZXQgPj0gdGhpcy5vZmZzZXRfKSB7XG4gICAgICBpZiAodGhpcy5lbF8uZGF0YXNldC5tZFN0YXRlICE9PSBcImxvY2tcIilcbiAgICAgICAgdGhpcy5lbF8uZGF0YXNldC5tZFN0YXRlID0gXCJsb2NrXCJcblxuICAgIC8qIFNpZGViYXIgc2hvdWxkIGJlIHVubG9ja2VkLCBpZiBsb2NrZWQgKi9cbiAgICB9IGVsc2UgaWYgKHRoaXMuZWxfLmRhdGFzZXQubWRTdGF0ZSA9PT0gXCJsb2NrXCIpIHtcbiAgICAgIHRoaXMuZWxfLmRhdGFzZXQubWRTdGF0ZSA9IFwiXCJcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgbG9ja2VkIHN0YXRlIGFuZCBoZWlnaHRcbiAgICovXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuZWxfLmRhdGFzZXQubWRTdGF0ZSA9IFwiXCJcbiAgICB0aGlzLmVsXy5zdHlsZS5oZWlnaHQgPSBcIlwiXG4gICAgdGhpcy5oZWlnaHRfID0gMFxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvTWF0ZXJpYWwvU2lkZWJhci9Qb3NpdGlvbi5qcyIsIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxNyBNYXJ0aW4gRG9uYXRoIDxtYXJ0aW4uZG9uYXRoQHNxdWlkZnVuay5jb20+XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG9cbiAqIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlXG4gKiByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3JcbiAqIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04tSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HXG4gKiBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTXG4gKiBJTiBUSEUgU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IEFkYXB0ZXIgZnJvbSBcIi4vU291cmNlL0FkYXB0ZXJcIlxuaW1wb3J0IFJlcG9zaXRvcnkgZnJvbSBcIi4vU291cmNlL1JlcG9zaXRvcnlcIlxuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBNb2R1bGVcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuZXhwb3J0IGRlZmF1bHQge1xuICBBZGFwdGVyLFxuICBSZXBvc2l0b3J5XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvTWF0ZXJpYWwvU291cmNlLmpzIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE3IE1hcnRpbiBEb25hdGggPG1hcnRpbi5kb25hdGhAc3F1aWRmdW5rLmNvbT5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0b1xuICogZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGVcbiAqIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vclxuICogc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTi1JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkdcbiAqIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1NcbiAqIElOIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgR2l0SHViIGZyb20gXCIuL0FkYXB0ZXIvR2l0SHViXCJcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogTW9kdWxlXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgR2l0SHViXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvTWF0ZXJpYWwvU291cmNlL0FkYXB0ZXIuanMiLCIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTcgTWFydGluIERvbmF0aCA8bWFydGluLmRvbmF0aEBzcXVpZGZ1bmsuY29tPlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvXG4gKiBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZVxuICogcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yXG4gKiBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OLUlORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuICogRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HU1xuICogSU4gVEhFIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCBBYnN0cmFjdCBmcm9tIFwiLi9BYnN0cmFjdFwiXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENsYXNzXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdpdEh1YiBleHRlbmRzIEFic3RyYWN0IHtcblxuICAvKipcbiAgICogUmV0cmlldmUgcmVwb3NpdG9yeSBpbmZvcm1hdGlvbiBmcm9tIEdpdEh1YlxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICpcbiAgICogQHByb3BlcnR5IHtzdHJpbmd9IG5hbWVfIC0gTmFtZSBvZiB0aGUgcmVwb3NpdG9yeVxuICAgKlxuICAgKiBAcGFyYW0geyhzdHJpbmd8SFRNTEFuY2hvckVsZW1lbnQpfSBlbCAtIFNlbGVjdG9yIG9yIEhUTUwgZWxlbWVudFxuICAgKi9cbiAgY29uc3RydWN0b3IoZWwpIHtcbiAgICBzdXBlcihlbClcblxuICAgIC8qIEV4dHJhY3QgdXNlciAoYW5kIHJlcG9zaXRvcnkgbmFtZSkgZnJvbSBVUkwsIGFzIHdlIGhhdmUgdG8gcXVlcnkgZm9yIGFsbFxuICAgICAgIHJlcG9zaXRvcmllcywgdG8gb21pdCA0MDQgZXJyb3JzIGZvciBwcml2YXRlIHJlcG9zaXRvcmllcyAqL1xuICAgIGNvbnN0IG1hdGNoZXMgPSAvXi4rZ2l0aHViXFwuY29tXFwvKFteL10rKVxcLz8oW14vXSspPy4qJC9cbiAgICAgIC5leGVjKHRoaXMuYmFzZV8pXG4gICAgaWYgKG1hdGNoZXMgJiYgbWF0Y2hlcy5sZW5ndGggPT09IDMpIHtcbiAgICAgIGNvbnN0IFssIHVzZXIsIG5hbWVdID0gbWF0Y2hlc1xuXG4gICAgICAvKiBJbml0aWFsaXplIGJhc2UgVVJMIGFuZCByZXBvc2l0b3J5IG5hbWUgKi9cbiAgICAgIHRoaXMuYmFzZV8gPSBgaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS91c2Vycy8ke3VzZXJ9L3JlcG9zYFxuICAgICAgdGhpcy5uYW1lXyA9IG5hbWVcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggcmVsZXZhbnQgcmVwb3NpdG9yeSBpbmZvcm1hdGlvbiBmcm9tIEdpdEh1YlxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPEFycmF5PHN0cmluZz4+fSBQcm9taXNlIHJldHVybmluZyBhbiBhcnJheSBvZiBmYWN0c1xuICAgKi9cbiAgZmV0Y2hfKCkge1xuICAgIGNvbnN0IHBhZ2luYXRlID0gKHBhZ2UgPSAwKSA9PiB7XG4gICAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5iYXNlX30/cGVyX3BhZ2U9MzAmcGFnZT0ke3BhZ2V9YClcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICBpZiAoIShkYXRhIGluc3RhbmNlb2YgQXJyYXkpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvclxuXG4gICAgICAgICAgLyogRGlzcGxheSBudW1iZXIgb2Ygc3RhcnMgYW5kIGZvcmtzLCBpZiByZXBvc2l0b3J5IGlzIGdpdmVuICovXG4gICAgICAgICAgaWYgKHRoaXMubmFtZV8pIHtcbiAgICAgICAgICAgIGNvbnN0IHJlcG8gPSBkYXRhLmZpbmQoaXRlbSA9PiBpdGVtLm5hbWUgPT09IHRoaXMubmFtZV8pXG4gICAgICAgICAgICBpZiAoIXJlcG8gJiYgZGF0YS5sZW5ndGggPT09IDMwKVxuICAgICAgICAgICAgICByZXR1cm4gcGFnaW5hdGUocGFnZSArIDEpXG5cbiAgICAgICAgICAgIC8qIElmIHdlIGZvdW5kIGEgcmVwbywgZXh0cmFjdCB0aGUgZmFjdHMgKi9cbiAgICAgICAgICAgIHJldHVybiByZXBvXG4gICAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgIGAke3RoaXMuZm9ybWF0XyhyZXBvLnN0YXJnYXplcnNfY291bnQpfSBTdGFyc2AsXG4gICAgICAgICAgICAgICAgYCR7dGhpcy5mb3JtYXRfKHJlcG8uZm9ya3NfY291bnQpfSBGb3Jrc2BcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICA6IFtdXG5cbiAgICAgICAgICAvKiBEaXNwbGF5IG51bWJlciBvZiByZXBvc2l0b3JpZXMsIG90aGVyd2lzZSAqL1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICBgJHtkYXRhLmxlbmd0aH0gUmVwb3NpdG9yaWVzYFxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvKiBQYWdpbmF0ZSB0aHJvdWdoIHJlcG9zICovXG4gICAgcmV0dXJuIHBhZ2luYXRlKClcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01hdGVyaWFsL1NvdXJjZS9BZGFwdGVyL0dpdEh1Yi5qcyIsIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxNyBNYXJ0aW4gRG9uYXRoIDxtYXJ0aW4uZG9uYXRoQHNxdWlkZnVuay5jb20+XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG9cbiAqIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlXG4gKiByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3JcbiAqIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04tSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HXG4gKiBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTXG4gKiBJTiBUSEUgU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IENvb2tpZXMgZnJvbSBcImpzLWNvb2tpZVwiXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENsYXNzXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFic3RyYWN0IHtcblxuICAvKipcbiAgICogUmV0cmlldmUgcmVwb3NpdG9yeSBpbmZvcm1hdGlvblxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICpcbiAgICogQHByb3BlcnR5IHtIVE1MQW5jaG9yRWxlbWVudH0gZWxfIC0gTGluayB0byByZXBvc2l0b3J5XG4gICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBiYXNlXyAtIEFQSSBiYXNlIFVSTFxuICAgKiBAcHJvcGVydHkge251bWJlcn0gc2FsdF8gLSBVbmlxdWUgaWRlbnRpZmllclxuICAgKlxuICAgKiBAcGFyYW0geyhzdHJpbmd8SFRNTEFuY2hvckVsZW1lbnQpfSBlbCAtIFNlbGVjdG9yIG9yIEhUTUwgZWxlbWVudFxuICAgKi9cbiAgY29uc3RydWN0b3IoZWwpIHtcbiAgICBjb25zdCByZWYgPSAodHlwZW9mIGVsID09PSBcInN0cmluZ1wiKVxuICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKVxuICAgICAgOiBlbFxuICAgIGlmICghKHJlZiBpbnN0YW5jZW9mIEhUTUxBbmNob3JFbGVtZW50KSlcbiAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuICAgIHRoaXMuZWxfID0gcmVmXG5cbiAgICAvKiBSZXRyaWV2ZSBiYXNlIFVSTCAqL1xuICAgIHRoaXMuYmFzZV8gPSB0aGlzLmVsXy5ocmVmXG4gICAgdGhpcy5zYWx0XyA9IHRoaXMuaGFzaF8odGhpcy5iYXNlXylcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSBkYXRhIGZyb20gQ29va2llIG9yIGZldGNoIGZyb20gcmVzcGVjdGl2ZSBBUElcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZTxBcnJheTxzdHJpbmc+Pn0gUHJvbWlzZSB0aGF0IHJldHVybnMgYW4gYXJyYXkgb2YgZmFjdHNcbiAgICovXG4gIGZldGNoKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGNvbnN0IGNhY2hlZCA9IENvb2tpZXMuZ2V0SlNPTihgJHt0aGlzLnNhbHRffS5jYWNoZS1zb3VyY2VgKVxuICAgICAgaWYgKHR5cGVvZiBjYWNoZWQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgcmVzb2x2ZShjYWNoZWQpXG5cbiAgICAgIC8qIElmIHRoZSBkYXRhIGlzIG5vdCBjYWNoZWQgaW4gYSBjb29raWUsIGludm9rZSBmZXRjaCBhbmQgc2V0XG4gICAgICAgICBhIGNvb2tpZSB0aGF0IGF1dG9tYXRpY2FsbHkgZXhwaXJlcyBpbiAxNSBtaW51dGVzICovXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZldGNoXygpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgQ29va2llcy5zZXQoYCR7dGhpcy5zYWx0X30uY2FjaGUtc291cmNlYCwgZGF0YSwgeyBleHBpcmVzOiAxIC8gOTYgfSlcbiAgICAgICAgICByZXNvbHZlKGRhdGEpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBBYnN0cmFjdCBwcml2YXRlIGZ1bmN0aW9uIHRoYXQgZmV0Y2hlcyByZWxldmFudCByZXBvc2l0b3J5IGluZm9ybWF0aW9uXG4gICAqXG4gICAqIEBhYnN0cmFjdFxuICAgKi9cbiAgZmV0Y2hfKCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZldGNoXygpOiBOb3QgaW1wbGVtZW50ZWRcIilcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtYXQgYSBudW1iZXIgd2l0aCBzdWZmaXhcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IG51bWJlciAtIE51bWJlciB0byBmb3JtYXRcbiAgICogQHJldHVybiB7c3RyaW5nfSBGb3JtYXR0ZWQgbnVtYmVyXG4gICAqL1xuICBmb3JtYXRfKG51bWJlcikge1xuICAgIGlmIChudW1iZXIgPiAxMDAwMClcbiAgICAgIHJldHVybiBgJHsobnVtYmVyIC8gMTAwMCkudG9GaXhlZCgwKX1rYFxuICAgIGVsc2UgaWYgKG51bWJlciA+IDEwMDApXG4gICAgICByZXR1cm4gYCR7KG51bWJlciAvIDEwMDApLnRvRml4ZWQoMSl9a2BcbiAgICByZXR1cm4gYCR7bnVtYmVyfWBcbiAgfVxuXG4gIC8qKlxuICAgKiBTaW1wbGUgaGFzaCBmdW5jdGlvblxuICAgKlxuICAgKiBUYWtlbiBmcm9tIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzc2MTY0ODQvMTA2NTU4NFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gSW5wdXQgc3RyaW5nXG4gICAqIEByZXR1cm4ge251bWJlcn0gSGFzaGVkIHN0cmluZ1xuICAgKi9cbiAgaGFzaF8oc3RyKSB7XG4gICAgbGV0IGhhc2ggPSAwXG4gICAgaWYgKHN0ci5sZW5ndGggPT09IDApIHJldHVybiBoYXNoXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHN0ci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgaGFzaCAgPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgICBoYXNoIHw9IDAgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG4gICAgfVxuICAgIHJldHVybiBoYXNoXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9NYXRlcmlhbC9Tb3VyY2UvQWRhcHRlci9BYnN0cmFjdC5qcyIsIi8qIVxuICogSmF2YVNjcmlwdCBDb29raWUgdjIuMi4wXG4gKiBodHRwczovL2dpdGh1Yi5jb20vanMtY29va2llL2pzLWNvb2tpZVxuICpcbiAqIENvcHlyaWdodCAyMDA2LCAyMDE1IEtsYXVzIEhhcnRsICYgRmFnbmVyIEJyYWNrXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuOyhmdW5jdGlvbiAoZmFjdG9yeSkge1xuXHR2YXIgcmVnaXN0ZXJlZEluTW9kdWxlTG9hZGVyID0gZmFsc2U7XG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0XHRkZWZpbmUoZmFjdG9yeSk7XG5cdFx0cmVnaXN0ZXJlZEluTW9kdWxlTG9hZGVyID0gdHJ1ZTtcblx0fVxuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdFx0cmVnaXN0ZXJlZEluTW9kdWxlTG9hZGVyID0gdHJ1ZTtcblx0fVxuXHRpZiAoIXJlZ2lzdGVyZWRJbk1vZHVsZUxvYWRlcikge1xuXHRcdHZhciBPbGRDb29raWVzID0gd2luZG93LkNvb2tpZXM7XG5cdFx0dmFyIGFwaSA9IHdpbmRvdy5Db29raWVzID0gZmFjdG9yeSgpO1xuXHRcdGFwaS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0d2luZG93LkNvb2tpZXMgPSBPbGRDb29raWVzO1xuXHRcdFx0cmV0dXJuIGFwaTtcblx0XHR9O1xuXHR9XG59KGZ1bmN0aW9uICgpIHtcblx0ZnVuY3Rpb24gZXh0ZW5kICgpIHtcblx0XHR2YXIgaSA9IDA7XG5cdFx0dmFyIHJlc3VsdCA9IHt9O1xuXHRcdGZvciAoOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXR0cmlidXRlcyA9IGFyZ3VtZW50c1sgaSBdO1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIGF0dHJpYnV0ZXMpIHtcblx0XHRcdFx0cmVzdWx0W2tleV0gPSBhdHRyaWJ1dGVzW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRmdW5jdGlvbiBpbml0IChjb252ZXJ0ZXIpIHtcblx0XHRmdW5jdGlvbiBhcGkgKGtleSwgdmFsdWUsIGF0dHJpYnV0ZXMpIHtcblx0XHRcdHZhciByZXN1bHQ7XG5cdFx0XHRpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIFdyaXRlXG5cblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRhdHRyaWJ1dGVzID0gZXh0ZW5kKHtcblx0XHRcdFx0XHRwYXRoOiAnLydcblx0XHRcdFx0fSwgYXBpLmRlZmF1bHRzLCBhdHRyaWJ1dGVzKTtcblxuXHRcdFx0XHRpZiAodHlwZW9mIGF0dHJpYnV0ZXMuZXhwaXJlcyA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0XHR2YXIgZXhwaXJlcyA9IG5ldyBEYXRlKCk7XG5cdFx0XHRcdFx0ZXhwaXJlcy5zZXRNaWxsaXNlY29uZHMoZXhwaXJlcy5nZXRNaWxsaXNlY29uZHMoKSArIGF0dHJpYnV0ZXMuZXhwaXJlcyAqIDg2NGUrNSk7XG5cdFx0XHRcdFx0YXR0cmlidXRlcy5leHBpcmVzID0gZXhwaXJlcztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFdlJ3JlIHVzaW5nIFwiZXhwaXJlc1wiIGJlY2F1c2UgXCJtYXgtYWdlXCIgaXMgbm90IHN1cHBvcnRlZCBieSBJRVxuXHRcdFx0XHRhdHRyaWJ1dGVzLmV4cGlyZXMgPSBhdHRyaWJ1dGVzLmV4cGlyZXMgPyBhdHRyaWJ1dGVzLmV4cGlyZXMudG9VVENTdHJpbmcoKSA6ICcnO1xuXG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0cmVzdWx0ID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuXHRcdFx0XHRcdGlmICgvXltcXHtcXFtdLy50ZXN0KHJlc3VsdCkpIHtcblx0XHRcdFx0XHRcdHZhbHVlID0gcmVzdWx0O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBjYXRjaCAoZSkge31cblxuXHRcdFx0XHRpZiAoIWNvbnZlcnRlci53cml0ZSkge1xuXHRcdFx0XHRcdHZhbHVlID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyh2YWx1ZSkpXG5cdFx0XHRcdFx0XHQucmVwbGFjZSgvJSgyM3wyNHwyNnwyQnwzQXwzQ3wzRXwzRHwyRnwzRnw0MHw1Qnw1RHw1RXw2MHw3Qnw3RHw3QykvZywgZGVjb2RlVVJJQ29tcG9uZW50KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YWx1ZSA9IGNvbnZlcnRlci53cml0ZSh2YWx1ZSwga2V5KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGtleSA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoa2V5KSk7XG5cdFx0XHRcdGtleSA9IGtleS5yZXBsYWNlKC8lKDIzfDI0fDI2fDJCfDVFfDYwfDdDKS9nLCBkZWNvZGVVUklDb21wb25lbnQpO1xuXHRcdFx0XHRrZXkgPSBrZXkucmVwbGFjZSgvW1xcKFxcKV0vZywgZXNjYXBlKTtcblxuXHRcdFx0XHR2YXIgc3RyaW5naWZpZWRBdHRyaWJ1dGVzID0gJyc7XG5cblx0XHRcdFx0Zm9yICh2YXIgYXR0cmlidXRlTmFtZSBpbiBhdHRyaWJ1dGVzKSB7XG5cdFx0XHRcdFx0aWYgKCFhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdKSB7XG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0c3RyaW5naWZpZWRBdHRyaWJ1dGVzICs9ICc7ICcgKyBhdHRyaWJ1dGVOYW1lO1xuXHRcdFx0XHRcdGlmIChhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0c3RyaW5naWZpZWRBdHRyaWJ1dGVzICs9ICc9JyArIGF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV07XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIChkb2N1bWVudC5jb29raWUgPSBrZXkgKyAnPScgKyB2YWx1ZSArIHN0cmluZ2lmaWVkQXR0cmlidXRlcyk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJlYWRcblxuXHRcdFx0aWYgKCFrZXkpIHtcblx0XHRcdFx0cmVzdWx0ID0ge307XG5cdFx0XHR9XG5cblx0XHRcdC8vIFRvIHByZXZlbnQgdGhlIGZvciBsb29wIGluIHRoZSBmaXJzdCBwbGFjZSBhc3NpZ24gYW4gZW1wdHkgYXJyYXlcblx0XHRcdC8vIGluIGNhc2UgdGhlcmUgYXJlIG5vIGNvb2tpZXMgYXQgYWxsLiBBbHNvIHByZXZlbnRzIG9kZCByZXN1bHQgd2hlblxuXHRcdFx0Ly8gY2FsbGluZyBcImdldCgpXCJcblx0XHRcdHZhciBjb29raWVzID0gZG9jdW1lbnQuY29va2llID8gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7ICcpIDogW107XG5cdFx0XHR2YXIgcmRlY29kZSA9IC8oJVswLTlBLVpdezJ9KSsvZztcblx0XHRcdHZhciBpID0gMDtcblxuXHRcdFx0Zm9yICg7IGkgPCBjb29raWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHZhciBwYXJ0cyA9IGNvb2tpZXNbaV0uc3BsaXQoJz0nKTtcblx0XHRcdFx0dmFyIGNvb2tpZSA9IHBhcnRzLnNsaWNlKDEpLmpvaW4oJz0nKTtcblxuXHRcdFx0XHRpZiAoIXRoaXMuanNvbiAmJiBjb29raWUuY2hhckF0KDApID09PSAnXCInKSB7XG5cdFx0XHRcdFx0Y29va2llID0gY29va2llLnNsaWNlKDEsIC0xKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0dmFyIG5hbWUgPSBwYXJ0c1swXS5yZXBsYWNlKHJkZWNvZGUsIGRlY29kZVVSSUNvbXBvbmVudCk7XG5cdFx0XHRcdFx0Y29va2llID0gY29udmVydGVyLnJlYWQgP1xuXHRcdFx0XHRcdFx0Y29udmVydGVyLnJlYWQoY29va2llLCBuYW1lKSA6IGNvbnZlcnRlcihjb29raWUsIG5hbWUpIHx8XG5cdFx0XHRcdFx0XHRjb29raWUucmVwbGFjZShyZGVjb2RlLCBkZWNvZGVVUklDb21wb25lbnQpO1xuXG5cdFx0XHRcdFx0aWYgKHRoaXMuanNvbikge1xuXHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0Y29va2llID0gSlNPTi5wYXJzZShjb29raWUpO1xuXHRcdFx0XHRcdFx0fSBjYXRjaCAoZSkge31cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoa2V5ID09PSBuYW1lKSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSBjb29raWU7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoIWtleSkge1xuXHRcdFx0XHRcdFx0cmVzdWx0W25hbWVdID0gY29va2llO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBjYXRjaCAoZSkge31cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblx0XHRhcGkuc2V0ID0gYXBpO1xuXHRcdGFwaS5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRyZXR1cm4gYXBpLmNhbGwoYXBpLCBrZXkpO1xuXHRcdH07XG5cdFx0YXBpLmdldEpTT04gPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gYXBpLmFwcGx5KHtcblx0XHRcdFx0anNvbjogdHJ1ZVxuXHRcdFx0fSwgW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcblx0XHR9O1xuXHRcdGFwaS5kZWZhdWx0cyA9IHt9O1xuXG5cdFx0YXBpLnJlbW92ZSA9IGZ1bmN0aW9uIChrZXksIGF0dHJpYnV0ZXMpIHtcblx0XHRcdGFwaShrZXksICcnLCBleHRlbmQoYXR0cmlidXRlcywge1xuXHRcdFx0XHRleHBpcmVzOiAtMVxuXHRcdFx0fSkpO1xuXHRcdH07XG5cblx0XHRhcGkud2l0aENvbnZlcnRlciA9IGluaXQ7XG5cblx0XHRyZXR1cm4gYXBpO1xuXHR9XG5cblx0cmV0dXJuIGluaXQoZnVuY3Rpb24gKCkge30pO1xufSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvanMtY29va2llL3NyYy9qcy5jb29raWUuanNcbi8vIG1vZHVsZSBpZCA9IDQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxNyBNYXJ0aW4gRG9uYXRoIDxtYXJ0aW4uZG9uYXRoQHNxdWlkZnVuay5jb20+XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG9cbiAqIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlXG4gKiByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3JcbiAqIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04tSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HXG4gKiBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTXG4gKiBJTiBUSEUgU09GVFdBUkUuXG4gKi9cblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ2xhc3NcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVwb3NpdG9yeSB7XG5cbiAgLyoqXG4gICAqIFJlbmRlciByZXBvc2l0b3J5IGluZm9ybWF0aW9uXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKlxuICAgKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSBlbF8gLSBSZXBvc2l0b3J5IGluZm9ybWF0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7KHN0cmluZ3xIVE1MRWxlbWVudCl9IGVsIC0gU2VsZWN0b3Igb3IgSFRNTCBlbGVtZW50XG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbCkge1xuICAgIGNvbnN0IHJlZiA9ICh0eXBlb2YgZWwgPT09IFwic3RyaW5nXCIpXG4gICAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpXG4gICAgICA6IGVsXG4gICAgaWYgKCEocmVmIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKVxuICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yXG4gICAgdGhpcy5lbF8gPSByZWZcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSByZXBvc2l0b3J5XG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gZmFjdHMgLSBGYWN0cyB0byBiZSByZW5kZXJlZFxuICAgKi9cbiAgaW5pdGlhbGl6ZShmYWN0cykge1xuICAgIGlmIChmYWN0cy5sZW5ndGggJiYgdGhpcy5lbF8uY2hpbGRyZW4ubGVuZ3RoKVxuICAgICAgdGhpcy5lbF8uY2hpbGRyZW5bdGhpcy5lbF8uY2hpbGRyZW4ubGVuZ3RoIC0gMV0uYXBwZW5kQ2hpbGQoXG4gICAgICAgIDx1bCBjbGFzcz1cIm1kLXNvdXJjZV9fZmFjdHNcIj5cbiAgICAgICAgICB7ZmFjdHMubWFwKGZhY3QgPT4gPGxpIGNsYXNzPVwibWQtc291cmNlX19mYWN0XCI+e2ZhY3R9PC9saT4pfVxuICAgICAgICA8L3VsPlxuICAgICAgKVxuXG4gICAgLyogRmluaXNoIHJlbmRlcmluZyB3aXRoIGFuaW1hdGlvbiAqL1xuICAgIHRoaXMuZWxfLmRhdGFzZXQubWRTdGF0ZSA9IFwiZG9uZVwiXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9NYXRlcmlhbC9Tb3VyY2UvUmVwb3NpdG9yeS5qc3giLCIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTcgTWFydGluIERvbmF0aCA8bWFydGluLmRvbmF0aEBzcXVpZGZ1bmsuY29tPlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvXG4gKiBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZVxuICogcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yXG4gKiBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OLUlORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuICogRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HU1xuICogSU4gVEhFIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCBUb2dnbGUgZnJvbSBcIi4vVGFicy9Ub2dnbGVcIlxuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBNb2R1bGVcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuZXhwb3J0IGRlZmF1bHQge1xuICBUb2dnbGVcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9NYXRlcmlhbC9UYWJzLmpzIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE3IE1hcnRpbiBEb25hdGggPG1hcnRpbi5kb25hdGhAc3F1aWRmdW5rLmNvbT5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0b1xuICogZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGVcbiAqIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vclxuICogc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTi1JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkdcbiAqIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1NcbiAqIElOIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDbGFzc1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2dnbGUge1xuXG4gIC8qKlxuICAgKiBUb2dnbGUgdGFicyB2aXNpYmlsaXR5IGRlcGVuZGluZyBvbiBwYWdlIHktb2Zmc2V0XG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKlxuICAgKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSBlbF8gLSBDb250ZW50IGNvbnRhaW5lclxuICAgKiBAcHJvcGVydHkge251bWJlcn0gb2Zmc2V0XyAtIFRvZ2dsZSBwYWdlLXkgb2Zmc2V0XG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gYWN0aXZlXyAtIFRhYnMgdmlzaWJpbGl0eVxuICAgKlxuICAgKiBAcGFyYW0geyhzdHJpbmd8SFRNTEVsZW1lbnQpfSBlbCAtIFNlbGVjdG9yIG9yIEhUTUwgZWxlbWVudFxuICAgKi9cbiAgY29uc3RydWN0b3IoZWwpIHtcbiAgICBjb25zdCByZWYgPSAodHlwZW9mIGVsID09PSBcInN0cmluZ1wiKVxuICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKVxuICAgICAgOiBlbFxuICAgIGlmICghKHJlZiBpbnN0YW5jZW9mIE5vZGUpKVxuICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yXG4gICAgdGhpcy5lbF8gPSByZWZcblxuICAgIC8qIEluaXRpYWxpemUgb2Zmc2V0IGFuZCBzdGF0ZSAqL1xuICAgIHRoaXMub2Zmc2V0XyA9IDVcbiAgICB0aGlzLmFjdGl2ZV8gPSBmYWxzZVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB2aXNpYmlsaXR5XG4gICAqL1xuICB1cGRhdGUoKSB7XG4gICAgY29uc3QgYWN0aXZlID0gd2luZG93LnBhZ2VZT2Zmc2V0ID49IHRoaXMub2Zmc2V0X1xuICAgIGlmIChhY3RpdmUgIT09IHRoaXMuYWN0aXZlXylcbiAgICAgIHRoaXMuZWxfLmRhdGFzZXQubWRTdGF0ZSA9ICh0aGlzLmFjdGl2ZV8gPSBhY3RpdmUpID8gXCJoaWRkZW5cIiA6IFwiXCJcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB2aXNpYmlsaXR5XG4gICAqL1xuICByZXNldCgpIHtcbiAgICB0aGlzLmVsXy5kYXRhc2V0Lm1kU3RhdGUgPSBcIlwiXG4gICAgdGhpcy5hY3RpdmVfID0gZmFsc2VcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01hdGVyaWFsL1RhYnMvVG9nZ2xlLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==