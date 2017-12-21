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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
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
/* 3 */
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
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(JSX) {

exports.__esModule = true;
exports.app = undefined;

__webpack_require__(7);

__webpack_require__(8);

__webpack_require__(9);

__webpack_require__(10);

__webpack_require__(11);

__webpack_require__(12);

__webpack_require__(13);

var _promisePolyfill = __webpack_require__(14);

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
 *
 * @return {string} Meta content value
 */
var translate = function translate(key) {
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
  new _Material2.default.Event.Listener(window, ["scroll", "resize", "orientationchange"], new _Material2.default.Header.Shadow("[data-md-component=container]", "[data-md-component=header]")).listen();

  /* Component: header title toggle */
  new _Material2.default.Event.Listener(window, ["scroll", "resize", "orientationchange"], new _Material2.default.Header.Title("[data-md-component=title]", ".md-typeset h1")).listen();

  /* Component: hero visibility toggle */
  if (document.querySelector("[data-md-component=hero]")) new _Material2.default.Event.Listener(window, ["scroll", "resize", "orientationchange"], new _Material2.default.Tabs.Toggle("[data-md-component=hero]")).listen();

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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/icons/bitbucket.svg";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/icons/github.svg";

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/icons/gitlab.svg";

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 12 */
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

if (!window.fetch) window.fetch = __webpack_require__(1).default || __webpack_require__(1);


/***/ }),
/* 14 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15).setImmediate))

/***/ }),
/* 15 */
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
__webpack_require__(16);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 16 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(17)))

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

var _Sidebar = __webpack_require__(43);

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _Source = __webpack_require__(45);

var _Source2 = _interopRequireDefault(_Source);

var _Tabs = __webpack_require__(51);

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

var _Listener = __webpack_require__(3);

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

var _Listener = __webpack_require__(3);

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
   *
   * @param {Event} ev - Event
   */


  Shadow.prototype.update = function update(ev) {
    if (ev && (ev.type === "resize" || ev.type === "orientationchange")) {
      this.height_ = 0;
      this.setup();
    } else {
      var active = window.pageYOffset >= this.height_;
      if (active !== this.active_) this.header_.dataset.mdState = (this.active_ = active) ? "shadow" : "";
    }
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
    if (ev.type === "resize" || ev.type === "orientationchange") {
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

var _exposeLoaderLunrLunr = __webpack_require__(41);

var _exposeLoaderLunrLunr2 = _interopRequireDefault(_exposeLoaderLunrLunr);

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
 *
 * @return {string} Meta content value
 */
var translate = function translate(key) {
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
    if (tokenizer.length) _exposeLoaderLunrLunr2.default.tokenizer.separator = tokenizer;

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
        _this.index_ = (0, _exposeLoaderLunrLunr2.default)(function () {
          var _this2 = this;

          /* Remove stemmer, as it cripples search experience */
          this.pipeline.reset();
          this.pipeline.add(_exposeLoaderLunrLunr2.default.trimmer, _exposeLoaderLunrLunr2.default.stopWordFilter);

          /* Set up alternate search languages */
          if (lang.length === 1 && lang[0] !== "en") {
            this.use(_exposeLoaderLunrLunr2.default[lang[0]]);
          } else if (lang.length > 1) {
            this.use(_exposeLoaderLunrLunr2.default.multiLanguage.apply(_exposeLoaderLunrLunr2.default, lang));
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
          query.term(term, { wildcard: _exposeLoaderLunrLunr2.default.Query.wildcard.TRAILING });
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
      var query = (0, _escapeStringRegexp2.default)(this.value_.trim()).replace(new RegExp(_exposeLoaderLunrLunr2.default.tokenizer.separator, "img"), "|");
      var match = new RegExp("(^|" + _exposeLoaderLunrLunr2.default.tokenizer.separator + ")(" + query + ")", "img");
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

/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["lunr"] = __webpack_require__(42);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 42 */
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _Position = __webpack_require__(44);

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
/* 44 */
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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _Adapter = __webpack_require__(46);

var _Adapter2 = _interopRequireDefault(_Adapter);

var _Repository = __webpack_require__(50);

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
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _GitHub = __webpack_require__(47);

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
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _Abstract2 = __webpack_require__(48);

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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _jsCookie = __webpack_require__(49);

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
/* 49 */
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
/* 50 */
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
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _Toggle = __webpack_require__(52);

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
/* 52 */
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
    this.active_ = false;
  }

  /**
   * Update visibility
   */


  Toggle.prototype.update = function update() {
    var active = window.pageYOffset >= this.el_.children[0].offsetTop + (5 - 48); // TODO: quick hack to enable same handling for hero
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2FjNGY0MGYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9wcm92aWRlcnMvanN4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91bmZldGNoL2Rpc3QvdW5mZXRjaC5lcy5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9NYXRlcmlhbC9FdmVudC9MaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2FwcGxpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2ljb25zL2JpdGJ1Y2tldC5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvaWNvbnMvZ2l0aHViLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltYWdlcy9pY29ucy9naXRsYWIuc3ZnIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvc3R5bGVzaGVldHMvYXBwbGljYXRpb24uc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL3N0eWxlc2hlZXRzL2FwcGxpY2F0aW9uLXBhbGV0dGUuc2NzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3VzdG9tLWV2ZW50LXBvbHlmaWxsL2N1c3RvbS1ldmVudC1wb2x5ZmlsbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdW5mZXRjaC9wb2x5ZmlsbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvbWlzZS1wb2x5ZmlsbC9wcm9taXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW1lcnMtYnJvd3NlcmlmeS9tYWluLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zZXRpbW1lZGlhdGUvc2V0SW1tZWRpYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NsaXBib2FyZC9saWIvY2xpcGJvYXJkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jbGlwYm9hcmQvbGliL2NsaXBib2FyZC1hY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NlbGVjdC9zcmMvc2VsZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55LWVtaXR0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dvb2QtbGlzdGVuZXIvc3JjL2xpc3Rlbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ29vZC1saXN0ZW5lci9zcmMvaXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RlbGVnYXRlL3NyYy9kZWxlZ2F0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGVsZWdhdGUvc3JjL2Nsb3Nlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Zhc3RjbGljay9saWIvZmFzdGNsaWNrLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9NYXRlcmlhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvTWF0ZXJpYWwvRXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01hdGVyaWFsL0V2ZW50L01hdGNoTWVkaWEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01hdGVyaWFsL0hlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvTWF0ZXJpYWwvSGVhZGVyL1NoYWRvdy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvTWF0ZXJpYWwvSGVhZGVyL1RpdGxlLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9NYXRlcmlhbC9OYXYuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01hdGVyaWFsL05hdi9CbHVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9NYXRlcmlhbC9OYXYvQ29sbGFwc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01hdGVyaWFsL05hdi9TY3JvbGxpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01hdGVyaWFsL1NlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvTWF0ZXJpYWwvU2VhcmNoL0xvY2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01hdGVyaWFsL1NlYXJjaC9SZXN1bHQuanN4Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lc2NhcGUtc3RyaW5nLXJlZ2V4cC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbHVuci9sdW5yLmpzLWV4cG9zZWQiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2x1bnIvbHVuci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvTWF0ZXJpYWwvU2lkZWJhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvTWF0ZXJpYWwvU2lkZWJhci9Qb3NpdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvTWF0ZXJpYWwvU291cmNlLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9NYXRlcmlhbC9Tb3VyY2UvQWRhcHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvTWF0ZXJpYWwvU291cmNlL0FkYXB0ZXIvR2l0SHViLmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9NYXRlcmlhbC9Tb3VyY2UvQWRhcHRlci9BYnN0cmFjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvanMtY29va2llL3NyYy9qcy5jb29raWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01hdGVyaWFsL1NvdXJjZS9SZXBvc2l0b3J5LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvTWF0ZXJpYWwvVGFicy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvTWF0ZXJpYWwvVGFicy9Ub2dnbGUuanMiXSwibmFtZXMiOlsiY3JlYXRlRWxlbWVudCIsInRhZyIsInByb3BlcnRpZXMiLCJlbCIsImRvY3VtZW50IiwiQXJyYXkiLCJwcm90b3R5cGUiLCJmb3JFYWNoIiwiY2FsbCIsIk9iamVjdCIsImtleXMiLCJzZXRBdHRyaWJ1dGUiLCJhdHRyIiwiaXRlcmF0ZUNoaWxkTm9kZXMiLCJub2RlcyIsIm5vZGUiLCJ0ZXh0Q29udGVudCIsImlzQXJyYXkiLCJfX2h0bWwiLCJpbm5lckhUTUwiLCJOb2RlIiwiYXBwZW5kQ2hpbGQiLCJjaGlsZHJlbiIsIkxpc3RlbmVyIiwiZWxzIiwiZXZlbnRzIiwiaGFuZGxlciIsImVsc18iLCJzbGljZSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjb25jYXQiLCJoYW5kbGVyXyIsInVwZGF0ZSIsImV2ZW50c18iLCJ1cGRhdGVfIiwiZXYiLCJsaXN0ZW4iLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJzZXR1cCIsInVubGlzdGVuIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlc2V0Iiwid2luZG93IiwiUHJvbWlzZSIsInRyYW5zbGF0ZSIsIm1ldGEiLCJnZXRFbGVtZW50c0J5TmFtZSIsImtleSIsIkhUTUxNZXRhRWxlbWVudCIsIlJlZmVyZW5jZUVycm9yIiwiY29udGVudCIsImluaXRpYWxpemUiLCJjb25maWciLCJFdmVudCIsImJvZHkiLCJIVE1MRWxlbWVudCIsImF0dGFjaCIsIk1vZGVybml6ciIsImFkZFRlc3QiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJtYXRjaCIsInRhYmxlcyIsIndyYXAiLCJ0YWJsZSIsIm5leHRTaWJsaW5nIiwicGFyZW50Tm9kZSIsImluc2VydEJlZm9yZSIsImlzU3VwcG9ydGVkIiwiYmxvY2tzIiwiYmxvY2siLCJpbmRleCIsImlkIiwiYnV0dG9uIiwicGFyZW50IiwiY29weSIsIm9uIiwibWVzc2FnZSIsImFjdGlvbiIsInRyaWdnZXIiLCJxdWVyeVNlbGVjdG9yIiwiY2xlYXJTZWxlY3Rpb24iLCJkYXRhc2V0IiwibWRUaW1lciIsImNsZWFyVGltZW91dCIsInBhcnNlSW50IiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0VGltZW91dCIsInJlbW92ZSIsInRvU3RyaW5nIiwiZGV0YWlscyIsInN1bW1hcnkiLCJ0YXJnZXQiLCJoYXNBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJsb2NhdGlvbiIsImhhc2giLCJnZXRFbGVtZW50QnlJZCIsInN1YnN0cmluZyIsIkhUTUxEZXRhaWxzRWxlbWVudCIsIm9wZW4iLCJsb2MiLCJpb3MiLCJzY3JvbGxhYmxlIiwiaXRlbSIsInRvcCIsInNjcm9sbFRvcCIsIm9mZnNldEhlaWdodCIsInNjcm9sbEhlaWdodCIsIkhlYWRlciIsIlNoYWRvdyIsIlRpdGxlIiwiVGFicyIsIlRvZ2dsZSIsIk1hdGNoTWVkaWEiLCJTaWRlYmFyIiwiUG9zaXRpb24iLCJOYXYiLCJCbHVyIiwiY29sbGFwc2libGVzIiwiY29sbGFwc2UiLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwiQ29sbGFwc2UiLCJTY3JvbGxpbmciLCJTZWFyY2giLCJMb2NrIiwiUmVzdWx0IiwiZmV0Y2giLCJ1cmwiLCJiYXNlIiwidmVyc2lvbiIsImNyZWRlbnRpYWxzIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImRhdGEiLCJkb2NzIiwibWFwIiwiZG9jIiwidG9nZ2xlIiwiSFRNTElucHV0RWxlbWVudCIsImNoZWNrZWQiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJxdWVyeSIsImZvY3VzIiwibWV0YUtleSIsImN0cmxLZXkiLCJrZXlDb2RlIiwiYWN0aXZlRWxlbWVudCIsInByZXZlbnREZWZhdWx0IiwiSFRNTExpbmtFbGVtZW50IiwiZ2V0QXR0cmlidXRlIiwiYmx1ciIsImluZGV4T2YiLCJzaGlmdEtleSIsImxpbmtzIiwiZmluZCIsImxpbmsiLCJtZFN0YXRlIiwiTWF0aCIsIm1heCIsImxlbmd0aCIsInN0b3BQcm9wYWdhdGlvbiIsImZvcm0iLCJyZXNvbHZlIiwiSFRNTEFuY2hvckVsZW1lbnQiLCJtZFNvdXJjZSIsIlNvdXJjZSIsIkFkYXB0ZXIiLCJHaXRIdWIiLCJzb3VyY2VzIiwiUmVwb3NpdG9yeSIsInNvdXJjZSIsImZhY3RzIiwiYXBwIiwibGlzdGVuZXIiLCJtcSIsIm1hdGNoZXMiLCJtZWRpYSIsIm1hdGNoTWVkaWEiLCJhZGRMaXN0ZW5lciIsImhlYWRlciIsInJlZiIsImVsXyIsImhlYWRlcl8iLCJoZWlnaHRfIiwiYWN0aXZlXyIsImN1cnJlbnQiLCJ0eXBlIiwiYWN0aXZlIiwicGFnZVlPZmZzZXQiLCJIVE1MSGVhZGluZ0VsZW1lbnQiLCJzdHlsZSIsIndpZHRoIiwib2Zmc2V0V2lkdGgiLCJvZmZzZXRUb3AiLCJpbmRleF8iLCJvZmZzZXRfIiwiZGlyXyIsImFuY2hvcnNfIiwicmVkdWNlIiwiYW5jaG9ycyIsIm9mZnNldCIsImRpciIsImkiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJoZWlnaHQiLCJtYXhIZWlnaHQiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJlbmQiLCJtYWluIiwid2Via2l0T3ZlcmZsb3dTY3JvbGxpbmciLCJ0b2dnbGVzIiwicGFuZSIsIm5leHRFbGVtZW50U2libGluZyIsInRhZ05hbWUiLCJsb2NrXyIsInNjcm9sbFRvIiwidHJ1bmNhdGUiLCJzdHJpbmciLCJuIiwibGlzdCIsImRhdGFfIiwibWV0YV8iLCJsaXN0XyIsIm1lc3NhZ2VfIiwicGxhY2Vob2xkZXIiLCJub25lIiwib25lIiwib3RoZXIiLCJ0b2tlbml6ZXIiLCJzZXBhcmF0b3IiLCJsYW5nXyIsInNwbGl0IiwiZmlsdGVyIiwiQm9vbGVhbiIsImxhbmciLCJ0cmltIiwiaW5pdCIsImRvY3NfIiwicGF0aCIsImdldCIsImRvbmUiLCJ0aXRsZSIsInRleHQiLCJyZXBsYWNlIiwiXyIsImNoYXIiLCJzZXQiLCJNYXAiLCJzdGFja18iLCJwaXBlbGluZSIsInRyaW1tZXIiLCJzdG9wV29yZEZpbHRlciIsInVzZSIsIm11bHRpTGFuZ3VhZ2UiLCJmaWVsZCIsImJvb3N0IiwiY29udGFpbmVyIiwic3BsaWNlIiwicmVuZGVyIiwidmFsdWUiLCJ2YWx1ZV8iLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJyZXN1bHQiLCJ0b0xvd2VyQ2FzZSIsInRlcm0iLCJ3aWxkY2FyZCIsIlF1ZXJ5IiwiVFJBSUxJTkciLCJpdGVtcyIsIlJlZ0V4cCIsImhpZ2hsaWdodCIsInRva2VuIiwiYXJ0aWNsZSIsInNlY3Rpb25zIiwic2VjdGlvbiIsInB1c2giLCJzaGlmdCIsImFuY2hvciIsImV2MiIsImhyZWYiLCJzaXplIiwicGFyZW50XyIsInBhZF8iLCJnZXRDb21wdXRlZFN0eWxlIiwicG9zaXRpb24iLCJjaGlsZCIsInZpc2libGUiLCJpbm5lckhlaWdodCIsImJvdW5kcyIsImJvdHRvbSIsImV4ZWMiLCJiYXNlXyIsInVzZXIiLCJuYW1lIiwibmFtZV8iLCJmZXRjaF8iLCJwYWdpbmF0ZSIsInBhZ2UiLCJUeXBlRXJyb3IiLCJyZXBvIiwiZm9ybWF0XyIsInN0YXJnYXplcnNfY291bnQiLCJmb3Jrc19jb3VudCIsIkFic3RyYWN0Iiwic2FsdF8iLCJoYXNoXyIsImNhY2hlZCIsImdldEpTT04iLCJleHBpcmVzIiwiRXJyb3IiLCJudW1iZXIiLCJ0b0ZpeGVkIiwic3RyIiwibGVuIiwiY2hhckNvZGVBdCIsImZhY3QiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUM3REE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkE7Ozs7QUFJQTtrQkFDZSxTQUFVOztBQUV2Qjs7Ozs7Ozs7O0FBU0FBLGVBWHVCLHlCQVdUQyxHQVhTLEVBV0pDLFVBWEksRUFXcUI7QUFDMUMsUUFBTUMsS0FBS0MsU0FBU0osYUFBVCxDQUF1QkMsR0FBdkIsQ0FBWDs7QUFFQTtBQUNBLFFBQUlDLFVBQUosRUFDRUcsTUFBTUMsU0FBTixDQUFnQkMsT0FBaEIsQ0FBd0JDLElBQXhCLENBQTZCQyxPQUFPQyxJQUFQLENBQVlSLFVBQVosQ0FBN0IsRUFBc0QsZ0JBQVE7QUFDNURDLFNBQUdRLFlBQUgsQ0FBZ0JDLElBQWhCLEVBQXNCVixXQUFXVSxJQUFYLENBQXRCO0FBQ0QsS0FGRDs7QUFJRjtBQUNBLFFBQU1DLG9C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QUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQ0FBbUM7QUFDbkM7Ozs7Ozs7QUMzQ0E7Ozs7Ozs7QUNBQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBLGlEQUFpRCxTQUFTO0FBQzFEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7OztBQ3ZMdEM7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkIsa0JBQWtCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLDJDQUEyQztBQUM5RCxtQkFBbUIsT0FBTztBQUMxQjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE9BQU87QUFDMUI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLENBQUMsRTs7Ozs7O0FDOU1EO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkJBQTJCLGtCQUFrQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsbUJBQW1CLE9BQU87QUFDMUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLE9BQU87QUFDMUI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtB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QUNBO0FBQ0E7QUFDQSxZQUFZLE1BQU07QUFDbEIsY0FBYztBQUNkO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksTUFBTTtBQUNsQixjQUFjO0FBQ2Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNw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QkFBOEI7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUNWQSx3Rzs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sSUFBSTtBQUNKO0FBQ0EsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVCxlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLElBQUk7QUFDZixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU8s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Q1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLFdBQVcsV0FBVztBQUN0QixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0VBQWtFLHVCQUF1QjtBQUN6Rjs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7Ozs7Ozs7Ozs7OztBQzE0RkQ7Ozs7OztBQUVBOzs7O2tCQUllO0FBQ2JWO0FBRGEsQyxFQTVCZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkE7Ozs7SUFJcUJBLFE7O0FBRW5COzs7Ozs7Ozs7Ozs7Ozs7QUFlQSxvQkFBWW5ILEVBQVosRUFBZ0Jx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IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDYpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDNhYzRmNDBmIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE3IE1hcnRpbiBEb25hdGggPG1hcnRpbi5kb25hdGhAc3F1aWRmdW5rLmNvbT5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0b1xuICogZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGVcbiAqIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vclxuICogc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTi1JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkdcbiAqIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1NcbiAqIElOIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBNb2R1bGVcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cbmV4cG9ydCBkZWZhdWx0IC8qIEpTWCAqLyB7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5hdGl2ZSBET00gbm9kZSBmcm9tIEpTWCdzIGludGVybWVkaWF0ZSByZXByZXNlbnRhdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGFnIC0gVGFnIG5hbWVcbiAgICogQHBhcmFtIHs/T2JqZWN0fSBwcm9wZXJ0aWVzIC0gUHJvcGVydGllc1xuICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZyB8IG51bWJlciB8IHsgX19odG1sOiBzdHJpbmcgfSB8IEFycmF5PEhUTUxFbGVtZW50Pj59XG4gICAqICAgY2hpbGRyZW4gLSBDaGlsZCBub2Rlc1xuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH0gTmF0aXZlIERPTSBub2RlXG4gICAqL1xuICBjcmVhdGVFbGVtZW50KHRhZywgcHJvcGVydGllcywgLi4uY2hpbGRyZW4pIHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKVxuXG4gICAgLyogU2V0IGFsbCBwcm9wZXJ0aWVzICovXG4gICAgaWYgKHByb3BlcnRpZXMpXG4gICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLCBhdHRyID0+IHtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKGF0dHIsIHByb3BlcnRpZXNbYXR0cl0pXG4gICAgICB9KVxuXG4gICAgLyogSXRlcmF0ZSBjaGlsZCBub2RlcyAqL1xuICAgIGNvbnN0IGl0ZXJhdGVDaGlsZE5vZGVzID0gbm9kZXMgPT4ge1xuICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChub2Rlcywgbm9kZSA9PiB7XG5cbiAgICAgICAgLyogRGlyZWN0bHkgYXBwZW5kIHRleHQgY29udGVudCAqL1xuICAgICAgICBpZiAodHlwZW9mIG5vZGUgPT09IFwic3RyaW5nXCIgfHxcbiAgICAgICAgICAgIHR5cGVvZiBub2RlID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgZWwudGV4dENvbnRlbnQgKz0gbm9kZVxuXG4gICAgICAgIC8qIFJlY3Vyc2UsIGlmIHdlIGdvdCBhbiBhcnJheSAqL1xuICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHtcbiAgICAgICAgICBpdGVyYXRlQ2hpbGROb2Rlcyhub2RlKVxuXG4gICAgICAgIC8qIEFwcGVuZCByYXcgSFRNTCAqL1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBub2RlLl9faHRtbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGVsLmlubmVySFRNTCArPSBub2RlLl9faHRtbFxuXG4gICAgICAgIC8qIEFwcGVuZCByZWd1bGFyIG5vZGVzICovXG4gICAgICAgIH0gZWxzZSBpZiAobm9kZSBpbnN0YW5jZW9mIE5vZGUpIHtcbiAgICAgICAgICBlbC5hcHBlbmRDaGlsZChub2RlKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIC8qIEl0ZXJhdGUgY2hpbGQgbm9kZXMgYW5kIHJldHVybiBlbGVtZW50ICovXG4gICAgaXRlcmF0ZUNoaWxkTm9kZXMoY2hpbGRyZW4pXG4gICAgcmV0dXJuIGVsXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvcHJvdmlkZXJzL2pzeC5qcyIsInZhciBpbmRleCA9IHR5cGVvZiBmZXRjaD09J2Z1bmN0aW9uJyA/IGZldGNoLmJpbmQoKSA6IGZ1bmN0aW9uKHVybCwgb3B0aW9ucykge1xuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblx0cmV0dXJuIG5ldyBQcm9taXNlKCBmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuXHRcdHJlcXVlc3Qub3BlbihvcHRpb25zLm1ldGhvZCB8fCAnZ2V0JywgdXJsKTtcblxuXHRcdGZvciAodmFyIGkgaW4gb3B0aW9ucy5oZWFkZXJzKSB7XG5cdFx0XHRyZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoaSwgb3B0aW9ucy5oZWFkZXJzW2ldKTtcblx0XHR9XG5cblx0XHRyZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9IG9wdGlvbnMuY3JlZGVudGlhbHM9PSdpbmNsdWRlJztcblxuXHRcdHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVzb2x2ZShyZXNwb25zZSgpKTtcblx0XHR9O1xuXG5cdFx0cmVxdWVzdC5vbmVycm9yID0gcmVqZWN0O1xuXG5cdFx0cmVxdWVzdC5zZW5kKG9wdGlvbnMuYm9keSk7XG5cblx0XHRmdW5jdGlvbiByZXNwb25zZSgpIHtcblx0XHRcdHZhciBrZXlzID0gW10sXG5cdFx0XHRcdGFsbCA9IFtdLFxuXHRcdFx0XHRoZWFkZXJzID0ge30sXG5cdFx0XHRcdGhlYWRlcjtcblxuXHRcdFx0cmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKS5yZXBsYWNlKC9eKC4qPyk6XFxzKihbXFxzXFxTXSo/KSQvZ20sIGZ1bmN0aW9uIChtLCBrZXksIHZhbHVlKSB7XG5cdFx0XHRcdGtleXMucHVzaChrZXkgPSBrZXkudG9Mb3dlckNhc2UoKSk7XG5cdFx0XHRcdGFsbC5wdXNoKFtrZXksIHZhbHVlXSk7XG5cdFx0XHRcdGhlYWRlciA9IGhlYWRlcnNba2V5XTtcblx0XHRcdFx0aGVhZGVyc1trZXldID0gaGVhZGVyID8gKGhlYWRlciArIFwiLFwiICsgdmFsdWUpIDogdmFsdWU7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0b2s6IChyZXF1ZXN0LnN0YXR1cy8yMDB8MCkgPT0gMSxcdFx0Ly8gMjAwLTI5OVxuXHRcdFx0XHRzdGF0dXM6IHJlcXVlc3Quc3RhdHVzLFxuXHRcdFx0XHRzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1c1RleHQsXG5cdFx0XHRcdHVybDogcmVxdWVzdC5yZXNwb25zZVVSTCxcblx0XHRcdFx0Y2xvbmU6IHJlc3BvbnNlLFxuXHRcdFx0XHR0ZXh0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUocmVxdWVzdC5yZXNwb25zZVRleHQpOyB9LFxuXHRcdFx0XHRqc29uOiBmdW5jdGlvbiAoKSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUocmVxdWVzdC5yZXNwb25zZVRleHQpLnRoZW4oSlNPTi5wYXJzZSk7IH0sXG5cdFx0XHRcdGJsb2I6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbcmVxdWVzdC5yZXNwb25zZV0pKTsgfSxcblx0XHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcdGtleXM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGtleXM7IH0sXG5cdFx0XHRcdFx0ZW50cmllczogZnVuY3Rpb24gKCkgeyByZXR1cm4gYWxsOyB9LFxuXHRcdFx0XHRcdGdldDogZnVuY3Rpb24gKG4pIHsgcmV0dXJuIGhlYWRlcnNbbi50b0xvd2VyQ2FzZSgpXTsgfSxcblx0XHRcdFx0XHRoYXM6IGZ1bmN0aW9uIChuKSB7IHJldHVybiBuLnRvTG93ZXJDYXNlKCkgaW4gaGVhZGVyczsgfVxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH1cblx0fSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBpbmRleDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVuZmV0Y2guZXMuanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy91bmZldGNoL2Rpc3QvdW5mZXRjaC5lcy5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XG59IGNhdGNoKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcblx0XHRnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE3IE1hcnRpbiBEb25hdGggPG1hcnRpbi5kb25hdGhAc3F1aWRmdW5rLmNvbT5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0b1xuICogZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGVcbiAqIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vclxuICogc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTi1JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkdcbiAqIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1NcbiAqIElOIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDbGFzc1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0ZW5lciB7XG5cbiAgLyoqXG4gICAqIEdlbmVyaWMgZXZlbnQgbGlzdGVuZXJcbiAgICpcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7KEFycmF5PEV2ZW50VGFyZ2V0Pil9IGVsc18gLSBFdmVudCB0YXJnZXRzXG4gICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBoYW5kbGVyXy0gRXZlbnQgaGFuZGxlcnNcbiAgICogQHByb3BlcnR5IHtBcnJheTxzdHJpbmc+fSBldmVudHNfIC0gRXZlbnQgbmFtZXNcbiAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gdXBkYXRlXyAtIFVwZGF0ZSBoYW5kbGVyXG4gICAqXG4gICAqIEBwYXJhbSB7PyhzdHJpbmd8RXZlbnRUYXJnZXR8Tm9kZUxpc3Q8RXZlbnRUYXJnZXQ+KX0gZWxzIC1cbiAgICogICBTZWxlY3RvciBvciBFdmVudCB0YXJnZXRzXG4gICAqIEBwYXJhbSB7KHN0cmluZ3xBcnJheTxzdHJpbmc+KX0gZXZlbnRzIC0gRXZlbnQgbmFtZXNcbiAgICogQHBhcmFtIHsoT2JqZWN0fEZ1bmN0aW9uKX0gaGFuZGxlciAtIEhhbmRsZXIgdG8gYmUgaW52b2tlZFxuICAgKi9cbiAgY29uc3RydWN0b3IoZWxzLCBldmVudHMsIGhhbmRsZXIpIHtcbiAgICB0aGlzLmVsc18gPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChcbiAgICAgICh0eXBlb2YgZWxzID09PSBcInN0cmluZ1wiKVxuICAgICAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxzKVxuICAgICAgICA6IFtdLmNvbmNhdChlbHMpKVxuXG4gICAgLyogU2V0IGhhbmRsZXIgYXMgZnVuY3Rpb24gb3IgZGlyZWN0bHkgYXMgb2JqZWN0ICovXG4gICAgdGhpcy5oYW5kbGVyXyA9IHR5cGVvZiBoYW5kbGVyID09PSBcImZ1bmN0aW9uXCJcbiAgICAgID8geyB1cGRhdGU6IGhhbmRsZXIgfVxuICAgICAgOiBoYW5kbGVyXG5cbiAgICAvKiBJbml0aWFsaXplIGV2ZW50IG5hbWVzIGFuZCB1cGRhdGUgaGFuZGxlciAqL1xuICAgIHRoaXMuZXZlbnRzXyA9IFtdLmNvbmNhdChldmVudHMpXG4gICAgdGhpcy51cGRhdGVfID0gZXYgPT4gdGhpcy5oYW5kbGVyXy51cGRhdGUoZXYpXG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgbGlzdGVuZXIgZm9yIGFsbCByZWxldmFudCBldmVudHNcbiAgICovXG4gIGxpc3RlbigpIHtcbiAgICB0aGlzLmVsc18uZm9yRWFjaChlbCA9PiB7XG4gICAgICB0aGlzLmV2ZW50c18uZm9yRWFjaChldmVudCA9PiB7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHRoaXMudXBkYXRlXywgZmFsc2UpXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICAvKiBFeGVjdXRlIHNldHVwIGhhbmRsZXIsIGlmIGltcGxlbWVudGVkICovXG4gICAgaWYgKHR5cGVvZiB0aGlzLmhhbmRsZXJfLnNldHVwID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICB0aGlzLmhhbmRsZXJfLnNldHVwKClcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnJlZ2lzdGVyIGxpc3RlbmVyIGZvciBhbGwgcmVsZXZhbnQgZXZlbnRzXG4gICAqL1xuICB1bmxpc3RlbigpIHtcbiAgICB0aGlzLmVsc18uZm9yRWFjaChlbCA9PiB7XG4gICAgICB0aGlzLmV2ZW50c18uZm9yRWFjaChldmVudCA9PiB7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIHRoaXMudXBkYXRlXylcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIC8qIEV4ZWN1dGUgcmVzZXQgaGFuZGxlciwgaWYgaW1wbGVtZW50ZWQgKi9cbiAgICBpZiAodHlwZW9mIHRoaXMuaGFuZGxlcl8ucmVzZXQgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgIHRoaXMuaGFuZGxlcl8ucmVzZXQoKVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvTWF0ZXJpYWwvRXZlbnQvTGlzdGVuZXIuanMiLCIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTcgTWFydGluIERvbmF0aCA8bWFydGluLmRvbmF0aEBzcXVpZGZ1bmsuY29tPlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvXG4gKiBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZVxuICogcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yXG4gKiBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OLUlORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuICogRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HU1xuICogSU4gVEhFIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCBcIi4uL2ltYWdlcy9pY29ucy9iaXRidWNrZXQuc3ZnXCJcbmltcG9ydCBcIi4uL2ltYWdlcy9pY29ucy9naXRodWIuc3ZnXCJcbmltcG9ydCBcIi4uL2ltYWdlcy9pY29ucy9naXRsYWIuc3ZnXCJcblxuaW1wb3J0IFwiLi4vc3R5bGVzaGVldHMvYXBwbGljYXRpb24uc2Nzc1wiXG5pbXBvcnQgXCIuLi9zdHlsZXNoZWV0cy9hcHBsaWNhdGlvbi1wYWxldHRlLnNjc3NcIlxuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBQb2x5ZmlsbHNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuaW1wb3J0IFwiY3VzdG9tLWV2ZW50LXBvbHlmaWxsXCJcbmltcG9ydCBcInVuZmV0Y2gvcG9seWZpbGxcIlxuXG5pbXBvcnQgUHJvbWlzZSBmcm9tIFwicHJvbWlzZS1wb2x5ZmlsbFwiXG53aW5kb3cuUHJvbWlzZSA9IHdpbmRvdy5Qcm9taXNlIHx8IFByb21pc2VcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogRGVwZW5kZW5jaWVzXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmltcG9ydCBDbGlwYm9hcmQgZnJvbSBcImNsaXBib2FyZFwiXG5pbXBvcnQgRmFzdENsaWNrIGZyb20gXCJmYXN0Y2xpY2tcIlxuXG5pbXBvcnQgTWF0ZXJpYWwgZnJvbSBcIi4vY29tcG9uZW50cy9NYXRlcmlhbFwiXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEZ1bmN0aW9uc1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4vKipcbiAqIFJldHVybiB0aGUgbWV0YSB0YWcgdmFsdWUgZm9yIHRoZSBnaXZlbiBrZXlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gTWV0YSBuYW1lXG4gKlxuICogQHJldHVybiB7c3RyaW5nfSBNZXRhIGNvbnRlbnQgdmFsdWVcbiAqL1xuY29uc3QgdHJhbnNsYXRlID0ga2V5ID0+IHtcbiAgY29uc3QgbWV0YSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKGBsYW5nOiR7a2V5fWApWzBdXG4gIGlmICghKG1ldGEgaW5zdGFuY2VvZiBIVE1MTWV0YUVsZW1lbnQpKVxuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuICByZXR1cm4gbWV0YS5jb250ZW50XG59XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEFwcGxpY2F0aW9uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbi8qKlxuICogSW5pdGlhbGl6ZSBNYXRlcmlhbCBmb3IgTWtEb2NzXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIENvbmZpZ3VyYXRpb25cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZShjb25maWcpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLXN0eWxlXG5cbiAgLyogSW5pdGlhbGl6ZSBNb2Rlcm5penIgYW5kIEZhc3RDbGljayAqL1xuICBuZXcgTWF0ZXJpYWwuRXZlbnQuTGlzdGVuZXIoZG9jdW1lbnQsIFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgaWYgKCEoZG9jdW1lbnQuYm9keSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSlcbiAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuXG4gICAgLyogQXR0YWNoIEZhc3RDbGljayB0byBtaXRpZ2F0ZSAzMDBtcyBkZWxheSBvbiB0b3VjaCBkZXZpY2VzICovXG4gICAgRmFzdENsaWNrLmF0dGFjaChkb2N1bWVudC5ib2R5KVxuXG4gICAgLyogVGVzdCBmb3IgaU9TICovXG4gICAgTW9kZXJuaXpyLmFkZFRlc3QoXCJpb3NcIiwgKCkgPT4ge1xuICAgICAgcmV0dXJuICEhbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvKGlQYWR8aVBob25lfGlQb2QpL2cpXG4gICAgfSlcblxuICAgIC8qIFdyYXAgYWxsIGRhdGEgdGFibGVzIGZvciBiZXR0ZXIgb3ZlcmZsb3cgc2Nyb2xsaW5nICovXG4gICAgY29uc3QgdGFibGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInRhYmxlOm5vdChbY2xhc3NdKVwiKSAgICAgICAgICAgICAgLy8gVE9ETzogdGhpcyBpcyBKU1gsIHdlIHNob3VsZCByZW5hbWUgdGhlIGZpbGVcbiAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHRhYmxlcywgdGFibGUgPT4ge1xuICAgICAgY29uc3Qgd3JhcCA9IChcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1kLXR5cGVzZXRfX3Njcm9sbHdyYXBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibWQtdHlwZXNldF9fdGFibGVcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApXG4gICAgICBpZiAodGFibGUubmV4dFNpYmxpbmcpIHtcbiAgICAgICAgdGFibGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUod3JhcCwgdGFibGUubmV4dFNpYmxpbmcpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YWJsZS5wYXJlbnROb2RlLmFwcGVuZENoaWxkKHdyYXApXG4gICAgICB9XG4gICAgICB3cmFwLmNoaWxkcmVuWzBdLmFwcGVuZENoaWxkKHRhYmxlKVxuICAgIH0pXG5cbiAgICAvKiBDbGlwYm9hcmQgaW50ZWdyYXRpb24gKi9cbiAgICBpZiAoQ2xpcGJvYXJkLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgIGNvbnN0IGJsb2NrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY29kZWhpbGl0ZSA+IHByZSwgcHJlID4gY29kZVwiKVxuICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChibG9ja3MsIChibG9jaywgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgaWQgPSBgX19jb2RlXyR7aW5kZXh9YFxuXG4gICAgICAgIC8qIENyZWF0ZSBidXR0b24gd2l0aCBtZXNzYWdlIGNvbnRhaW5lciAqL1xuICAgICAgICBjb25zdCBidXR0b24gPSAoXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm1kLWNsaXBib2FyZFwiIHRpdGxlPXt0cmFuc2xhdGUoXCJjbGlwYm9hcmQuY29weVwiKX1cbiAgICAgICAgICAgIGRhdGEtY2xpcGJvYXJkLXRhcmdldD17YCMke2lkfSBwcmUsICMke2lkfSBjb2RlYH0+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1kLWNsaXBib2FyZF9fbWVzc2FnZVwiPjwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgKVxuXG4gICAgICAgIC8qIExpbmsgdG8gYmxvY2sgYW5kIGluc2VydCBidXR0b24gKi9cbiAgICAgICAgY29uc3QgcGFyZW50ID0gYmxvY2sucGFyZW50Tm9kZVxuICAgICAgICBwYXJlbnQuaWQgPSBpZFxuICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKGJ1dHRvbiwgYmxvY2spXG4gICAgICB9KVxuXG4gICAgICAvKiBJbml0aWFsaXplIENsaXBib2FyZCBsaXN0ZW5lciAqL1xuICAgICAgY29uc3QgY29weSA9IG5ldyBDbGlwYm9hcmQoXCIubWQtY2xpcGJvYXJkXCIpXG5cbiAgICAgIC8qIFN1Y2Nlc3MgaGFuZGxlciAqL1xuICAgICAgY29weS5vbihcInN1Y2Nlc3NcIiwgYWN0aW9uID0+IHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGFjdGlvbi50cmlnZ2VyLnF1ZXJ5U2VsZWN0b3IoXCIubWQtY2xpcGJvYXJkX19tZXNzYWdlXCIpXG4gICAgICAgIGlmICghKG1lc3NhZ2UgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpXG4gICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yXG5cbiAgICAgICAgLyogQ2xlYXIgc2VsZWN0aW9uIGFuZCByZXNldCBkZWJvdW5jZSBsb2dpYyAqL1xuICAgICAgICBhY3Rpb24uY2xlYXJTZWxlY3Rpb24oKVxuICAgICAgICBpZiAobWVzc2FnZS5kYXRhc2V0Lm1kVGltZXIpXG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHBhcnNlSW50KG1lc3NhZ2UuZGF0YXNldC5tZFRpbWVyLCAxMCkpXG5cbiAgICAgICAgLyogU2V0IG1lc3NhZ2UgaW5kaWNhdGluZyBzdWNjZXNzIGFuZCBzaG93IGl0ICovXG4gICAgICAgIG1lc3NhZ2UuY2xhc3NMaXN0LmFkZChcIm1kLWNsaXBib2FyZF9fbWVzc2FnZS0tYWN0aXZlXCIpXG4gICAgICAgIG1lc3NhZ2UuaW5uZXJIVE1MID0gdHJhbnNsYXRlKFwiY2xpcGJvYXJkLmNvcGllZFwiKVxuXG4gICAgICAgIC8qIEhpZGUgbWVzc2FnZSBhZnRlciB0d28gc2Vjb25kcyAqL1xuICAgICAgICBtZXNzYWdlLmRhdGFzZXQubWRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIG1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZShcIm1kLWNsaXBib2FyZF9fbWVzc2FnZS0tYWN0aXZlXCIpXG4gICAgICAgICAgbWVzc2FnZS5kYXRhc2V0Lm1kVGltZXIgPSBcIlwiXG4gICAgICAgIH0sIDIwMDApLnRvU3RyaW5nKClcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLyogUG9seWZpbGwgZGV0YWlscy9zdW1tYXJ5IGZ1bmN0aW9uYWxpdHkgKi9cbiAgICBpZiAoIU1vZGVybml6ci5kZXRhaWxzKSB7XG4gICAgICBjb25zdCBibG9ja3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiZGV0YWlscyA+IHN1bW1hcnlcIilcbiAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoYmxvY2tzLCBzdW1tYXJ5ID0+IHtcbiAgICAgICAgc3VtbWFyeS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXYgPT4ge1xuICAgICAgICAgIGNvbnN0IGRldGFpbHMgPSBldi50YXJnZXQucGFyZW50Tm9kZVxuICAgICAgICAgIGlmIChkZXRhaWxzLmhhc0F0dHJpYnV0ZShcIm9wZW5cIikpIHtcbiAgICAgICAgICAgIGRldGFpbHMucmVtb3ZlQXR0cmlidXRlKFwib3BlblwiKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZXRhaWxzLnNldEF0dHJpYnV0ZShcIm9wZW5cIiwgXCJcIilcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIC8qIE9wZW4gZGV0YWlscyBhZnRlciBhbmNob3IganVtcCAqL1xuICAgIGNvbnN0IGRldGFpbHMgPSAoKSA9PiB7XG4gICAgICBpZiAoZG9jdW1lbnQubG9jYXRpb24uaGFzaCkge1xuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRvY3VtZW50LmxvY2F0aW9uLmhhc2guc3Vic3RyaW5nKDEpKVxuICAgICAgICBpZiAoIWVsKVxuICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIC8qIFdhbGsgdXAgYXMgbG9uZyBhcyB3ZSdyZSBub3QgaW4gYSBkZXRhaWxzIHRhZyAqL1xuICAgICAgICBsZXQgcGFyZW50ID0gZWwucGFyZW50Tm9kZVxuICAgICAgICB3aGlsZSAocGFyZW50ICYmICEocGFyZW50IGluc3RhbmNlb2YgSFRNTERldGFpbHNFbGVtZW50KSlcbiAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZVxuXG4gICAgICAgIC8qIElmIHRoZXJlJ3MgYSBkZXRhaWxzIHRhZywgb3BlbiBpdCAqL1xuICAgICAgICBpZiAocGFyZW50ICYmICFwYXJlbnQub3Blbikge1xuICAgICAgICAgIHBhcmVudC5vcGVuID0gdHJ1ZVxuXG4gICAgICAgICAgLyogRm9yY2UgcmVsb2FkLCBzbyB0aGUgdmlld3BvcnQgcmVwb3NpdGlvbnMgKi9cbiAgICAgICAgICBjb25zdCBsb2MgPSBsb2NhdGlvbi5oYXNoXG4gICAgICAgICAgbG9jYXRpb24uaGFzaCA9IFwiIFwiXG4gICAgICAgICAgbG9jYXRpb24uaGFzaCA9IGxvY1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCBkZXRhaWxzKVxuICAgIGRldGFpbHMoKVxuXG4gICAgLyogRm9yY2UgMXB4IHNjcm9sbCBvZmZzZXQgdG8gdHJpZ2dlciBvdmVyZmxvdyBzY3JvbGxpbmcgKi9cbiAgICBpZiAoTW9kZXJuaXpyLmlvcykge1xuICAgICAgY29uc3Qgc2Nyb2xsYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1tZC1zY3JvbGxmaXhdXCIpXG4gICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHNjcm9sbGFibGUsIGl0ZW0gPT4ge1xuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsICgpID0+IHtcbiAgICAgICAgICBjb25zdCB0b3AgPSBpdGVtLnNjcm9sbFRvcFxuXG4gICAgICAgICAgLyogV2UncmUgYXQgdGhlIHRvcCBvZiB0aGUgY29udGFpbmVyICovXG4gICAgICAgICAgaWYgKHRvcCA9PT0gMCkge1xuICAgICAgICAgICAgaXRlbS5zY3JvbGxUb3AgPSAxXG5cbiAgICAgICAgICAgIC8qIFdlJ3JlIGF0IHRoZSBib3R0b20gb2YgdGhlIGNvbnRhaW5lciAqL1xuICAgICAgICAgIH0gZWxzZSBpZiAodG9wICsgaXRlbS5vZmZzZXRIZWlnaHQgPT09IGl0ZW0uc2Nyb2xsSGVpZ2h0KSB7XG4gICAgICAgICAgICBpdGVtLnNjcm9sbFRvcCA9IHRvcCAtIDFcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cbiAgfSkubGlzdGVuKClcblxuICAvKiBDb21wb25lbnQ6IGhlYWRlciBzaGFkb3cgdG9nZ2xlICovXG4gIG5ldyBNYXRlcmlhbC5FdmVudC5MaXN0ZW5lcih3aW5kb3csIFtcbiAgICBcInNjcm9sbFwiLCBcInJlc2l6ZVwiLCBcIm9yaWVudGF0aW9uY2hhbmdlXCJcbiAgXSwgbmV3IE1hdGVyaWFsLkhlYWRlci5TaGFkb3coXG4gICAgXCJbZGF0YS1tZC1jb21wb25lbnQ9Y29udGFpbmVyXVwiLFxuICAgIFwiW2RhdGEtbWQtY29tcG9uZW50PWhlYWRlcl1cIilcbiAgKS5saXN0ZW4oKVxuXG4gIC8qIENvbXBvbmVudDogaGVhZGVyIHRpdGxlIHRvZ2dsZSAqL1xuICBuZXcgTWF0ZXJpYWwuRXZlbnQuTGlzdGVuZXIod2luZG93LCBbXG4gICAgXCJzY3JvbGxcIiwgXCJyZXNpemVcIiwgXCJvcmllbnRhdGlvbmNoYW5nZVwiXG4gIF0sIG5ldyBNYXRlcmlhbC5IZWFkZXIuVGl0bGUoXG4gICAgXCJbZGF0YS1tZC1jb21wb25lbnQ9dGl0bGVdXCIsXG4gICAgXCIubWQtdHlwZXNldCBoMVwiKVxuICApLmxpc3RlbigpXG5cbiAgLyogQ29tcG9uZW50OiBoZXJvIHZpc2liaWxpdHkgdG9nZ2xlICovXG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtbWQtY29tcG9uZW50PWhlcm9dXCIpKVxuICAgIG5ldyBNYXRlcmlhbC5FdmVudC5MaXN0ZW5lcih3aW5kb3csIFtcbiAgICAgIFwic2Nyb2xsXCIsIFwicmVzaXplXCIsIFwib3JpZW50YXRpb25jaGFuZ2VcIlxuICAgIF0sIG5ldyBNYXRlcmlhbC5UYWJzLlRvZ2dsZShcIltkYXRhLW1kLWNvbXBvbmVudD1oZXJvXVwiKSkubGlzdGVuKClcblxuICAvKiBDb21wb25lbnQ6IHRhYnMgdmlzaWJpbGl0eSB0b2dnbGUgKi9cbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1tZC1jb21wb25lbnQ9dGFic11cIikpXG4gICAgbmV3IE1hdGVyaWFsLkV2ZW50Lkxpc3RlbmVyKHdpbmRvdywgW1xuICAgICAgXCJzY3JvbGxcIiwgXCJyZXNpemVcIiwgXCJvcmllbnRhdGlvbmNoYW5nZVwiXG4gICAgXSwgbmV3IE1hdGVyaWFsLlRhYnMuVG9nZ2xlKFwiW2RhdGEtbWQtY29tcG9uZW50PXRhYnNdXCIpKS5saXN0ZW4oKVxuXG4gIC8qIENvbXBvbmVudDogc2lkZWJhciB3aXRoIG5hdmlnYXRpb24gKi9cbiAgbmV3IE1hdGVyaWFsLkV2ZW50Lk1hdGNoTWVkaWEoXCIobWluLXdpZHRoOiAxMjIwcHgpXCIsXG4gICAgbmV3IE1hdGVyaWFsLkV2ZW50Lkxpc3RlbmVyKHdpbmRvdywgW1xuICAgICAgXCJzY3JvbGxcIiwgXCJyZXNpemVcIiwgXCJvcmllbnRhdGlvbmNoYW5nZVwiXG4gICAgXSwgbmV3IE1hdGVyaWFsLlNpZGViYXIuUG9zaXRpb24oXG4gICAgICBcIltkYXRhLW1kLWNvbXBvbmVudD1uYXZpZ2F0aW9uXVwiLFxuICAgICAgXCJbZGF0YS1tZC1jb21wb25lbnQ9aGVhZGVyXVwiKSkpXG5cbiAgLyogQ29tcG9uZW50OiBzaWRlYmFyIHdpdGggdGFibGUgb2YgY29udGVudHMgKG1pc3Npbmcgb24gNDA0IHBhZ2UpICovXG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtbWQtY29tcG9uZW50PXRvY11cIikpXG4gICAgbmV3IE1hdGVyaWFsLkV2ZW50Lk1hdGNoTWVkaWEoXCIobWluLXdpZHRoOiA5NjBweClcIixcbiAgICAgIG5ldyBNYXRlcmlhbC5FdmVudC5MaXN0ZW5lcih3aW5kb3csIFtcbiAgICAgICAgXCJzY3JvbGxcIiwgXCJyZXNpemVcIiwgXCJvcmllbnRhdGlvbmNoYW5nZVwiXG4gICAgICBdLCBuZXcgTWF0ZXJpYWwuU2lkZWJhci5Qb3NpdGlvbihcbiAgICAgICAgXCJbZGF0YS1tZC1jb21wb25lbnQ9dG9jXVwiLFxuICAgICAgICBcIltkYXRhLW1kLWNvbXBvbmVudD1oZWFkZXJdXCIpKSlcblxuICAvKiBDb21wb25lbnQ6IGxpbmsgYmx1cnJpbmcgZm9yIHRhYmxlIG9mIGNvbnRlbnRzICovXG4gIG5ldyBNYXRlcmlhbC5FdmVudC5NYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogOTYwcHgpXCIsXG4gICAgbmV3IE1hdGVyaWFsLkV2ZW50Lkxpc3RlbmVyKHdpbmRvdywgXCJzY3JvbGxcIixcbiAgICAgIG5ldyBNYXRlcmlhbC5OYXYuQmx1cihcIltkYXRhLW1kLWNvbXBvbmVudD10b2NdIFtocmVmXVwiKSkpXG5cbiAgLyogQ29tcG9uZW50OiBjb2xsYXBzaWJsZSBlbGVtZW50cyBmb3IgbmF2aWdhdGlvbiAqL1xuICBjb25zdCBjb2xsYXBzaWJsZXMgPVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1tZC1jb21wb25lbnQ9Y29sbGFwc2libGVdXCIpXG4gIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoY29sbGFwc2libGVzLCBjb2xsYXBzZSA9PiB7XG4gICAgbmV3IE1hdGVyaWFsLkV2ZW50Lk1hdGNoTWVkaWEoXCIobWluLXdpZHRoOiAxMjIwcHgpXCIsXG4gICAgICBuZXcgTWF0ZXJpYWwuRXZlbnQuTGlzdGVuZXIoY29sbGFwc2UucHJldmlvdXNFbGVtZW50U2libGluZywgXCJjbGlja1wiLFxuICAgICAgICBuZXcgTWF0ZXJpYWwuTmF2LkNvbGxhcHNlKGNvbGxhcHNlKSkpXG4gIH0pXG5cbiAgLyogQ29tcG9uZW50OiBhY3RpdmUgcGFuZSBtb25pdG9yIGZvciBpT1Mgc2Nyb2xsaW5nIGZpeGVzICovXG4gIG5ldyBNYXRlcmlhbC5FdmVudC5NYXRjaE1lZGlhKFwiKG1heC13aWR0aDogMTIxOXB4KVwiLFxuICAgIG5ldyBNYXRlcmlhbC5FdmVudC5MaXN0ZW5lcihcbiAgICAgIFwiW2RhdGEtbWQtY29tcG9uZW50PW5hdmlnYXRpb25dIFtkYXRhLW1kLXRvZ2dsZV1cIiwgXCJjaGFuZ2VcIixcbiAgICAgIG5ldyBNYXRlcmlhbC5OYXYuU2Nyb2xsaW5nKFwiW2RhdGEtbWQtY29tcG9uZW50PW5hdmlnYXRpb25dIG5hdlwiKSkpXG5cbiAgLyogQ29tcG9uZW50OiBzZWFyY2ggYm9keSBsb2NrIGZvciBtb2JpbGUgKi9cbiAgbmV3IE1hdGVyaWFsLkV2ZW50Lk1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA5NTlweClcIixcbiAgICBuZXcgTWF0ZXJpYWwuRXZlbnQuTGlzdGVuZXIoXCJbZGF0YS1tZC10b2dnbGU9c2VhcmNoXVwiLCBcImNoYW5nZVwiLFxuICAgICAgbmV3IE1hdGVyaWFsLlNlYXJjaC5Mb2NrKFwiW2RhdGEtbWQtdG9nZ2xlPXNlYXJjaF1cIikpKVxuXG4gIC8qIENvbXBvbmVudDogc2VhcmNoIHJlc3VsdHMgKi9cbiAgbmV3IE1hdGVyaWFsLkV2ZW50Lkxpc3RlbmVyKFwiW2RhdGEtbWQtY29tcG9uZW50PXF1ZXJ5XVwiLCBbXG4gICAgXCJmb2N1c1wiLCBcImtleXVwXCIsIFwiY2hhbmdlXCJcbiAgXSwgbmV3IE1hdGVyaWFsLlNlYXJjaC5SZXN1bHQoXCJbZGF0YS1tZC1jb21wb25lbnQ9cmVzdWx0XVwiLCAoKSA9PiB7XG4gICAgcmV0dXJuIGZldGNoKGAke2NvbmZpZy51cmwuYmFzZX0vJHtcbiAgICAgIGNvbmZpZy52ZXJzaW9uIDwgXCIwLjE3XCIgPyBcIm1rZG9jc1wiIDogXCJzZWFyY2hcIlxuICAgIH0vc2VhcmNoX2luZGV4Lmpzb25gLCB7XG4gICAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiXG4gICAgfSkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGEuZG9jcy5tYXAoZG9jID0+IHtcbiAgICAgICAgICBkb2MubG9jYXRpb24gPSBjb25maWcudXJsLmJhc2UgKyBkb2MubG9jYXRpb25cbiAgICAgICAgICByZXR1cm4gZG9jXG4gICAgICAgIH0pXG4gICAgICB9KVxuICB9KSkubGlzdGVuKClcblxuICAvKiBMaXN0ZW5lcjogY2xvc2UgZHJhd2VyIHdoZW4gYW5jaG9yIGxpbmtzIGFyZSBjbGlja2VkICovXG4gIG5ldyBNYXRlcmlhbC5FdmVudC5NYXRjaE1lZGlhKFwiKG1heC13aWR0aDogOTU5cHgpXCIsXG4gICAgbmV3IE1hdGVyaWFsLkV2ZW50Lkxpc3RlbmVyKFwiW2RhdGEtbWQtY29tcG9uZW50PW5hdmlnYXRpb25dIFtocmVmXj0nIyddXCIsXG4gICAgICBcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgY29uc3QgdG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLW1kLXRvZ2dsZT1kcmF3ZXJdXCIpXG4gICAgICAgIGlmICghKHRvZ2dsZSBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpKVxuICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuICAgICAgICBpZiAodG9nZ2xlLmNoZWNrZWQpIHtcbiAgICAgICAgICB0b2dnbGUuY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgdG9nZ2xlLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwiY2hhbmdlXCIpKVxuICAgICAgICB9XG4gICAgICB9KSlcblxuICAvKiBMaXN0ZW5lcjogZm9jdXMgaW5wdXQgYWZ0ZXIgZm9ybSByZXNldCAqL1xuICBuZXcgTWF0ZXJpYWwuRXZlbnQuTGlzdGVuZXIoXCJbZGF0YS1tZC1jb21wb25lbnQ9cmVzZXRdXCIsIFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgcXVlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtbWQtY29tcG9uZW50PXF1ZXJ5XVwiKVxuICAgICAgaWYgKCEocXVlcnkgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSlcbiAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yXG4gICAgICBxdWVyeS5mb2N1cygpXG4gICAgfSwgMTApXG4gIH0pLmxpc3RlbigpXG5cbiAgLyogTGlzdGVuZXI6IGZvY3VzIGlucHV0IGFmdGVyIG9wZW5pbmcgc2VhcmNoICovXG4gIG5ldyBNYXRlcmlhbC5FdmVudC5MaXN0ZW5lcihcIltkYXRhLW1kLXRvZ2dsZT1zZWFyY2hdXCIsIFwiY2hhbmdlXCIsIGV2ID0+IHtcbiAgICBzZXRUaW1lb3V0KHRvZ2dsZSA9PiB7XG4gICAgICBpZiAoISh0b2dnbGUgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSlcbiAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yXG4gICAgICBpZiAodG9nZ2xlLmNoZWNrZWQpIHtcbiAgICAgICAgY29uc3QgcXVlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtbWQtY29tcG9uZW50PXF1ZXJ5XVwiKVxuICAgICAgICBpZiAoIShxdWVyeSBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpKVxuICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuICAgICAgICBxdWVyeS5mb2N1cygpXG4gICAgICB9XG4gICAgfSwgNDAwLCBldi50YXJnZXQpXG4gIH0pLmxpc3RlbigpXG5cbiAgLyogTGlzdGVuZXI6IG9wZW4gc2VhcmNoIG9uIGZvY3VzICovXG4gIG5ldyBNYXRlcmlhbC5FdmVudC5NYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogOTYwcHgpXCIsXG4gICAgbmV3IE1hdGVyaWFsLkV2ZW50Lkxpc3RlbmVyKFwiW2RhdGEtbWQtY29tcG9uZW50PXF1ZXJ5XVwiLCBcImZvY3VzXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IHRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1tZC10b2dnbGU9c2VhcmNoXVwiKVxuICAgICAgaWYgKCEodG9nZ2xlIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkpXG4gICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuICAgICAgaWYgKCF0b2dnbGUuY2hlY2tlZCkge1xuICAgICAgICB0b2dnbGUuY2hlY2tlZCA9IHRydWVcbiAgICAgICAgdG9nZ2xlLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwiY2hhbmdlXCIpKVxuICAgICAgfVxuICAgIH0pKVxuXG4gIC8qIExpc3RlbmVyOiBrZXlib2FyZCBoYW5kbGVycyAqLyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuICBuZXcgTWF0ZXJpYWwuRXZlbnQuTGlzdGVuZXIod2luZG93LCBcImtleWRvd25cIiwgZXYgPT4geyAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHNwbGl0IHVwIGludG8gY29tcG9uZW50IHRvIHJlZHVjZSBjb21wbGV4aXR5XG4gICAgY29uc3QgdG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLW1kLXRvZ2dsZT1zZWFyY2hdXCIpXG4gICAgaWYgKCEodG9nZ2xlIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkpXG4gICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3JcbiAgICBjb25zdCBxdWVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1tZC1jb21wb25lbnQ9cXVlcnldXCIpXG4gICAgaWYgKCEocXVlcnkgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSlcbiAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuXG4gICAgLyogQWJvcnQgaWYgbWV0YSBrZXkgKG1hY09TKSBvciBjdHJsIGtleSAoV2luZG93cykgaXMgcHJlc3NlZCAqL1xuICAgIGlmIChldi5tZXRhS2V5IHx8IGV2LmN0cmxLZXkpXG4gICAgICByZXR1cm5cblxuICAgIC8qIFNlYXJjaCBpcyBvcGVuICovXG4gICAgaWYgKHRvZ2dsZS5jaGVja2VkKSB7XG5cbiAgICAgIC8qIEVudGVyOiBwcmV2ZW50IGZvcm0gc3VibWlzc2lvbiAqL1xuICAgICAgaWYgKGV2LmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgIGlmIChxdWVyeSA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkge1xuICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICAgIC8qIEdvIHRvIGN1cnJlbnQgYWN0aXZlL2ZvY3VzZWQgbGluayAqL1xuICAgICAgICAgIGNvbnN0IGZvY3VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIFwiW2RhdGEtbWQtY29tcG9uZW50PXNlYXJjaF0gW2hyZWZdW2RhdGEtbWQtc3RhdGU9YWN0aXZlXVwiKVxuICAgICAgICAgIGlmIChmb2N1cyBpbnN0YW5jZW9mIEhUTUxMaW5rRWxlbWVudCkge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gZm9jdXMuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKVxuXG4gICAgICAgICAgICAvKiBDbG9zZSBzZWFyY2ggKi9cbiAgICAgICAgICAgIHRvZ2dsZS5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIHRvZ2dsZS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcImNoYW5nZVwiKSlcbiAgICAgICAgICAgIHF1ZXJ5LmJsdXIoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAvKiBFc2NhcGU6IGNsb3NlIHNlYXJjaCAqL1xuICAgICAgfSBlbHNlIGlmIChldi5rZXlDb2RlID09PSAyNykge1xuICAgICAgICB0b2dnbGUuY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIHRvZ2dsZS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcImNoYW5nZVwiKSlcbiAgICAgICAgcXVlcnkuYmx1cigpXG5cbiAgICAgIC8qIEhvcml6b250YWwgYXJyb3dzIGFuZCBiYWNrc3BhY2U6IGZvY3VzIGlucHV0ICovXG4gICAgICB9IGVsc2UgaWYgKFs4LCAzNywgMzldLmluZGV4T2YoZXYua2V5Q29kZSkgIT09IC0xKSB7XG4gICAgICAgIGlmIChxdWVyeSAhPT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudClcbiAgICAgICAgICBxdWVyeS5mb2N1cygpXG5cbiAgICAgIC8qIFZlcnRpY2FsIGFycm93cyBhbmQgdGFiOiBzZWxlY3QgcHJldmlvdXMgb3IgbmV4dCBzZWFyY2ggcmVzdWx0ICovXG4gICAgICB9IGVsc2UgaWYgKFs5LCAzOCwgNDBdLmluZGV4T2YoZXYua2V5Q29kZSkgIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IGV2LnNoaWZ0S2V5ID8gMzggOiA0MFxuICAgICAgICBjb25zdCBrZXkgPSBldi5rZXlDb2RlID09PSA5ID8gbWFwIDogZXYua2V5Q29kZVxuXG4gICAgICAgIC8qIFJldHJpZXZlIGFsbCByZXN1bHRzICovXG4gICAgICAgIGNvbnN0IGxpbmtzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoXG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICAgIFwiW2RhdGEtbWQtY29tcG9uZW50PXF1ZXJ5XSwgW2RhdGEtbWQtY29tcG9uZW50PXNlYXJjaF0gW2hyZWZdXCIpKVxuXG4gICAgICAgIC8qIFJldHJpZXZlIGN1cnJlbnQgYWN0aXZlL2ZvY3VzZWQgcmVzdWx0ICovXG4gICAgICAgIGNvbnN0IGZvY3VzID0gbGlua3MuZmluZChsaW5rID0+IHtcbiAgICAgICAgICBpZiAoIShsaW5rIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yXG4gICAgICAgICAgcmV0dXJuIGxpbmsuZGF0YXNldC5tZFN0YXRlID09PSBcImFjdGl2ZVwiXG4gICAgICAgIH0pXG4gICAgICAgIGlmIChmb2N1cylcbiAgICAgICAgICBmb2N1cy5kYXRhc2V0Lm1kU3RhdGUgPSBcIlwiXG5cbiAgICAgICAgLyogQ2FsY3VsYXRlIGluZGV4IGRlcGVuZGluZyBvbiBkaXJlY3Rpb24sIGFkZCBsZW5ndGggdG8gZm9ybSByaW5nICovXG4gICAgICAgIGNvbnN0IGluZGV4ID0gTWF0aC5tYXgoMCwgKFxuICAgICAgICAgIGxpbmtzLmluZGV4T2YoZm9jdXMpICsgbGlua3MubGVuZ3RoICsgKGtleSA9PT0gMzggPyAtMSA6ICsxKVxuICAgICAgICApICUgbGlua3MubGVuZ3RoKVxuXG4gICAgICAgIC8qIFNldCBhY3RpdmUgc3RhdGUgYW5kIGZvY3VzICovXG4gICAgICAgIGlmIChsaW5rc1tpbmRleF0pIHtcbiAgICAgICAgICBsaW5rc1tpbmRleF0uZGF0YXNldC5tZFN0YXRlID0gXCJhY3RpdmVcIlxuICAgICAgICAgIGxpbmtzW2luZGV4XS5mb2N1cygpXG4gICAgICAgIH1cblxuICAgICAgICAvKiBQcmV2ZW50IHNjcm9sbGluZyBvZiBwYWdlICovXG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgICAgICAvKiBSZXR1cm4gZmFsc2UgcHJldmVudHMgdGhlIGN1cnNvciBwb3NpdGlvbiBmcm9tIGNoYW5naW5nICovXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuXG4gICAgLyogU2VhcmNoIGlzIGNsb3NlZCBhbmQgd2UncmUgbm90IGluc2lkZSBhIGZvcm0gKi9cbiAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgIWRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuZm9ybSkge1xuXG4gICAgICAvKiBGL1M6IE9wZW4gc2VhcmNoIGlmIG5vdCBpbiBpbnB1dCBmaWVsZCAqL1xuICAgICAgaWYgKGV2LmtleUNvZGUgPT09IDcwIHx8IGV2LmtleUNvZGUgPT09IDgzKSB7XG4gICAgICAgIHF1ZXJ5LmZvY3VzKClcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKVxuICAgICAgfVxuICAgIH1cbiAgfSkubGlzdGVuKClcblxuICAvKiBMaXN0ZW5lcjogZm9jdXMgcXVlcnkgaWYgaW4gc2VhcmNoIGlzIG9wZW4gYW5kIGNoYXJhY3RlciBpcyB0eXBlZCAqL1xuICBuZXcgTWF0ZXJpYWwuRXZlbnQuTGlzdGVuZXIod2luZG93LCBcImtleXByZXNzXCIsICgpID0+IHtcbiAgICBjb25zdCB0b2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtbWQtdG9nZ2xlPXNlYXJjaF1cIilcbiAgICBpZiAoISh0b2dnbGUgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSlcbiAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuICAgIGlmICh0b2dnbGUuY2hlY2tlZCkge1xuICAgICAgY29uc3QgcXVlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtbWQtY29tcG9uZW50PXF1ZXJ5XVwiKVxuICAgICAgaWYgKCEocXVlcnkgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSlcbiAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yXG4gICAgICBpZiAocXVlcnkgIT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpXG4gICAgICAgIHF1ZXJ5LmZvY3VzKClcbiAgICB9XG4gIH0pLmxpc3RlbigpXG5cbiAgLyogUmV0cmlldmUgZmFjdHMgZm9yIHRoZSBnaXZlbiByZXBvc2l0b3J5IHR5cGUgKi9cbiAgOygoKSA9PiB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtbWQtc291cmNlXVwiKVxuICAgIGlmICghZWwpXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFtdKVxuICAgIGVsc2UgaWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MQW5jaG9yRWxlbWVudCkpXG4gICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3JcbiAgICBzd2l0Y2ggKGVsLmRhdGFzZXQubWRTb3VyY2UpIHtcbiAgICAgIGNhc2UgXCJnaXRodWJcIjogcmV0dXJuIG5ldyBNYXRlcmlhbC5Tb3VyY2UuQWRhcHRlci5HaXRIdWIoZWwpLmZldGNoKClcbiAgICAgIGRlZmF1bHQ6IHJldHVybiBQcm9taXNlLnJlc29sdmUoW10pXG4gICAgfVxuXG4gIC8qIFJlbmRlciByZXBvc2l0b3J5IGluZm9ybWF0aW9uICovXG4gIH0pKCkudGhlbihmYWN0cyA9PiB7XG4gICAgY29uc3Qgc291cmNlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1tZC1zb3VyY2VdXCIpXG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChzb3VyY2VzLCBzb3VyY2UgPT4ge1xuICAgICAgbmV3IE1hdGVyaWFsLlNvdXJjZS5SZXBvc2l0b3J5KHNvdXJjZSlcbiAgICAgICAgLmluaXRpYWxpemUoZmFjdHMpXG4gICAgfSlcbiAgfSlcbn1cblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogRXhwb3J0c1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4vKiBQcm92aWRlIHRoaXMgZm9yIGRvd253YXJkIGNvbXBhdGliaWxpdHkgZm9yIG5vdyAqL1xuY29uc3QgYXBwID0ge1xuICBpbml0aWFsaXplXG59XG5cbmV4cG9ydCB7XG4gIGFwcFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9hcHBsaWNhdGlvbi5qcyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImFzc2V0cy9pbWFnZXMvaWNvbnMvYml0YnVja2V0LnN2Z1wiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2Fzc2V0cy9pbWFnZXMvaWNvbnMvYml0YnVja2V0LnN2Z1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJhc3NldHMvaW1hZ2VzL2ljb25zL2dpdGh1Yi5zdmdcIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9hc3NldHMvaW1hZ2VzL2ljb25zL2dpdGh1Yi5zdmdcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiYXNzZXRzL2ltYWdlcy9pY29ucy9naXRsYWIuc3ZnXCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYXNzZXRzL2ltYWdlcy9pY29ucy9naXRsYWIuc3ZnXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYXNzZXRzL3N0eWxlc2hlZXRzL2FwcGxpY2F0aW9uLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYXNzZXRzL3N0eWxlc2hlZXRzL2FwcGxpY2F0aW9uLXBhbGV0dGUuc2Nzc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gUG9seWZpbGwgZm9yIGNyZWF0aW5nIEN1c3RvbUV2ZW50cyBvbiBJRTkvMTAvMTFcblxuLy8gY29kZSBwdWxsZWQgZnJvbTpcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9kNHRvY2NoaW5pL2N1c3RvbWV2ZW50LXBvbHlmaWxsXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQ3VzdG9tRXZlbnQjUG9seWZpbGxcblxudHJ5IHtcbiAgICB2YXIgY2UgPSBuZXcgd2luZG93LkN1c3RvbUV2ZW50KCd0ZXN0Jyk7XG4gICAgY2UucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoY2UuZGVmYXVsdFByZXZlbnRlZCAhPT0gdHJ1ZSkge1xuICAgICAgICAvLyBJRSBoYXMgcHJvYmxlbXMgd2l0aCAucHJldmVudERlZmF1bHQoKSBvbiBjdXN0b20gZXZlbnRzXG4gICAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjMzNDkxOTFcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgcHJldmVudCBkZWZhdWx0Jyk7XG4gICAgfVxufSBjYXRjaChlKSB7XG4gIHZhciBDdXN0b21FdmVudCA9IGZ1bmN0aW9uKGV2ZW50LCBwYXJhbXMpIHtcbiAgICB2YXIgZXZ0LCBvcmlnUHJldmVudDtcbiAgICBwYXJhbXMgPSBwYXJhbXMgfHwge1xuICAgICAgYnViYmxlczogZmFsc2UsXG4gICAgICBjYW5jZWxhYmxlOiBmYWxzZSxcbiAgICAgIGRldGFpbDogdW5kZWZpbmVkXG4gICAgfTtcblxuICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiQ3VzdG9tRXZlbnRcIik7XG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldmVudCwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKTtcbiAgICBvcmlnUHJldmVudCA9IGV2dC5wcmV2ZW50RGVmYXVsdDtcbiAgICBldnQucHJldmVudERlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBvcmlnUHJldmVudC5jYWxsKHRoaXMpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdkZWZhdWx0UHJldmVudGVkJywge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICB0aGlzLmRlZmF1bHRQcmV2ZW50ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIGV2dDtcbiAgfTtcblxuICBDdXN0b21FdmVudC5wcm90b3R5cGUgPSB3aW5kb3cuRXZlbnQucHJvdG90eXBlO1xuICB3aW5kb3cuQ3VzdG9tRXZlbnQgPSBDdXN0b21FdmVudDsgLy8gZXhwb3NlIGRlZmluaXRpb24gdG8gd2luZG93XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jdXN0b20tZXZlbnQtcG9seWZpbGwvY3VzdG9tLWV2ZW50LXBvbHlmaWxsLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpZiAoIXdpbmRvdy5mZXRjaCkgd2luZG93LmZldGNoID0gcmVxdWlyZSgnLicpLmRlZmF1bHQgfHwgcmVxdWlyZSgnLicpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdW5mZXRjaC9wb2x5ZmlsbC5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiKGZ1bmN0aW9uIChyb290KSB7XG5cbiAgLy8gU3RvcmUgc2V0VGltZW91dCByZWZlcmVuY2Ugc28gcHJvbWlzZS1wb2x5ZmlsbCB3aWxsIGJlIHVuYWZmZWN0ZWQgYnlcbiAgLy8gb3RoZXIgY29kZSBtb2RpZnlpbmcgc2V0VGltZW91dCAobGlrZSBzaW5vbi51c2VGYWtlVGltZXJzKCkpXG4gIHZhciBzZXRUaW1lb3V0RnVuYyA9IHNldFRpbWVvdXQ7XG5cbiAgZnVuY3Rpb24gbm9vcCgpIHt9XG4gIFxuICAvLyBQb2x5ZmlsbCBmb3IgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmRcbiAgZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBmbi5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBQcm9taXNlKGZuKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzICE9PSAnb2JqZWN0JykgdGhyb3cgbmV3IFR5cGVFcnJvcignUHJvbWlzZXMgbXVzdCBiZSBjb25zdHJ1Y3RlZCB2aWEgbmV3Jyk7XG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykgdGhyb3cgbmV3IFR5cGVFcnJvcignbm90IGEgZnVuY3Rpb24nKTtcbiAgICB0aGlzLl9zdGF0ZSA9IDA7XG4gICAgdGhpcy5faGFuZGxlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3ZhbHVlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2RlZmVycmVkcyA9IFtdO1xuXG4gICAgZG9SZXNvbHZlKGZuLCB0aGlzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZShzZWxmLCBkZWZlcnJlZCkge1xuICAgIHdoaWxlIChzZWxmLl9zdGF0ZSA9PT0gMykge1xuICAgICAgc2VsZiA9IHNlbGYuX3ZhbHVlO1xuICAgIH1cbiAgICBpZiAoc2VsZi5fc3RhdGUgPT09IDApIHtcbiAgICAgIHNlbGYuX2RlZmVycmVkcy5wdXNoKGRlZmVycmVkKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2VsZi5faGFuZGxlZCA9IHRydWU7XG4gICAgUHJvbWlzZS5faW1tZWRpYXRlRm4oZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGNiID0gc2VsZi5fc3RhdGUgPT09IDEgPyBkZWZlcnJlZC5vbkZ1bGZpbGxlZCA6IGRlZmVycmVkLm9uUmVqZWN0ZWQ7XG4gICAgICBpZiAoY2IgPT09IG51bGwpIHtcbiAgICAgICAgKHNlbGYuX3N0YXRlID09PSAxID8gcmVzb2x2ZSA6IHJlamVjdCkoZGVmZXJyZWQucHJvbWlzZSwgc2VsZi5fdmFsdWUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgcmV0O1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0ID0gY2Ioc2VsZi5fdmFsdWUpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZWplY3QoZGVmZXJyZWQucHJvbWlzZSwgZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoZGVmZXJyZWQucHJvbWlzZSwgcmV0KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc29sdmUoc2VsZiwgbmV3VmFsdWUpIHtcbiAgICB0cnkge1xuICAgICAgLy8gUHJvbWlzZSBSZXNvbHV0aW9uIFByb2NlZHVyZTogaHR0cHM6Ly9naXRodWIuY29tL3Byb21pc2VzLWFwbHVzL3Byb21pc2VzLXNwZWMjdGhlLXByb21pc2UtcmVzb2x1dGlvbi1wcm9jZWR1cmVcbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gc2VsZikgdGhyb3cgbmV3IFR5cGVFcnJvcignQSBwcm9taXNlIGNhbm5vdCBiZSByZXNvbHZlZCB3aXRoIGl0c2VsZi4nKTtcbiAgICAgIGlmIChuZXdWYWx1ZSAmJiAodHlwZW9mIG5ld1ZhbHVlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgbmV3VmFsdWUgPT09ICdmdW5jdGlvbicpKSB7XG4gICAgICAgIHZhciB0aGVuID0gbmV3VmFsdWUudGhlbjtcbiAgICAgICAgaWYgKG5ld1ZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgIHNlbGYuX3N0YXRlID0gMztcbiAgICAgICAgICBzZWxmLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgIGZpbmFsZShzZWxmKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBkb1Jlc29sdmUoYmluZCh0aGVuLCBuZXdWYWx1ZSksIHNlbGYpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc2VsZi5fc3RhdGUgPSAxO1xuICAgICAgc2VsZi5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgIGZpbmFsZShzZWxmKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZWplY3Qoc2VsZiwgZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVqZWN0KHNlbGYsIG5ld1ZhbHVlKSB7XG4gICAgc2VsZi5fc3RhdGUgPSAyO1xuICAgIHNlbGYuX3ZhbHVlID0gbmV3VmFsdWU7XG4gICAgZmluYWxlKHNlbGYpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmluYWxlKHNlbGYpIHtcbiAgICBpZiAoc2VsZi5fc3RhdGUgPT09IDIgJiYgc2VsZi5fZGVmZXJyZWRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgUHJvbWlzZS5faW1tZWRpYXRlRm4oZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghc2VsZi5faGFuZGxlZCkge1xuICAgICAgICAgIFByb21pc2UuX3VuaGFuZGxlZFJlamVjdGlvbkZuKHNlbGYuX3ZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHNlbGYuX2RlZmVycmVkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgaGFuZGxlKHNlbGYsIHNlbGYuX2RlZmVycmVkc1tpXSk7XG4gICAgfVxuICAgIHNlbGYuX2RlZmVycmVkcyA9IG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiBIYW5kbGVyKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkLCBwcm9taXNlKSB7XG4gICAgdGhpcy5vbkZ1bGZpbGxlZCA9IHR5cGVvZiBvbkZ1bGZpbGxlZCA9PT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogbnVsbDtcbiAgICB0aGlzLm9uUmVqZWN0ZWQgPSB0eXBlb2Ygb25SZWplY3RlZCA9PT0gJ2Z1bmN0aW9uJyA/IG9uUmVqZWN0ZWQgOiBudWxsO1xuICAgIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG4gIH1cblxuICAvKipcbiAgICogVGFrZSBhIHBvdGVudGlhbGx5IG1pc2JlaGF2aW5nIHJlc29sdmVyIGZ1bmN0aW9uIGFuZCBtYWtlIHN1cmVcbiAgICogb25GdWxmaWxsZWQgYW5kIG9uUmVqZWN0ZWQgYXJlIG9ubHkgY2FsbGVkIG9uY2UuXG4gICAqXG4gICAqIE1ha2VzIG5vIGd1YXJhbnRlZXMgYWJvdXQgYXN5bmNocm9ueS5cbiAgICovXG4gIGZ1bmN0aW9uIGRvUmVzb2x2ZShmbiwgc2VsZikge1xuICAgIHZhciBkb25lID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgIGZuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoZG9uZSkgcmV0dXJuO1xuICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgcmVzb2x2ZShzZWxmLCB2YWx1ZSk7XG4gICAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAgIGlmIChkb25lKSByZXR1cm47XG4gICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICByZWplY3Qoc2VsZiwgcmVhc29uKTtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICBpZiAoZG9uZSkgcmV0dXJuO1xuICAgICAgZG9uZSA9IHRydWU7XG4gICAgICByZWplY3Qoc2VsZiwgZXgpO1xuICAgIH1cbiAgfVxuXG4gIFByb21pc2UucHJvdG90eXBlWydjYXRjaCddID0gZnVuY3Rpb24gKG9uUmVqZWN0ZWQpIHtcbiAgICByZXR1cm4gdGhpcy50aGVuKG51bGwsIG9uUmVqZWN0ZWQpO1xuICB9O1xuXG4gIFByb21pc2UucHJvdG90eXBlLnRoZW4gPSBmdW5jdGlvbiAob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICB2YXIgcHJvbSA9IG5ldyAodGhpcy5jb25zdHJ1Y3Rvcikobm9vcCk7XG5cbiAgICBoYW5kbGUodGhpcywgbmV3IEhhbmRsZXIob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQsIHByb20pKTtcbiAgICByZXR1cm4gcHJvbTtcbiAgfTtcblxuICBQcm9taXNlLmFsbCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycik7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgaWYgKGFyZ3MubGVuZ3RoID09PSAwKSByZXR1cm4gcmVzb2x2ZShbXSk7XG4gICAgICB2YXIgcmVtYWluaW5nID0gYXJncy5sZW5ndGg7XG5cbiAgICAgIGZ1bmN0aW9uIHJlcyhpLCB2YWwpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAodmFsICYmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSkge1xuICAgICAgICAgICAgdmFyIHRoZW4gPSB2YWwudGhlbjtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICB0aGVuLmNhbGwodmFsLCBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICAgICAgcmVzKGksIHZhbCk7XG4gICAgICAgICAgICAgIH0sIHJlamVjdCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYXJnc1tpXSA9IHZhbDtcbiAgICAgICAgICBpZiAoLS1yZW1haW5pbmcgPT09IDApIHtcbiAgICAgICAgICAgIHJlc29sdmUoYXJncyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgIHJlamVjdChleCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlcyhpLCBhcmdzW2ldKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBQcm9taXNlLnJlc29sdmUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gUHJvbWlzZSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgUHJvbWlzZS5yZWplY3QgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgcmVqZWN0KHZhbHVlKTtcbiAgICB9KTtcbiAgfTtcblxuICBQcm9taXNlLnJhY2UgPSBmdW5jdGlvbiAodmFsdWVzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB2YWx1ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFsdWVzW2ldLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICAvLyBVc2UgcG9seWZpbGwgZm9yIHNldEltbWVkaWF0ZSBmb3IgcGVyZm9ybWFuY2UgZ2FpbnNcbiAgUHJvbWlzZS5faW1tZWRpYXRlRm4gPSAodHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gJ2Z1bmN0aW9uJyAmJiBmdW5jdGlvbiAoZm4pIHsgc2V0SW1tZWRpYXRlKGZuKTsgfSkgfHxcbiAgICBmdW5jdGlvbiAoZm4pIHtcbiAgICAgIHNldFRpbWVvdXRGdW5jKGZuLCAwKTtcbiAgICB9O1xuXG4gIFByb21pc2UuX3VuaGFuZGxlZFJlamVjdGlvbkZuID0gZnVuY3Rpb24gX3VuaGFuZGxlZFJlamVjdGlvbkZuKGVycikge1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgY29uc29sZSkge1xuICAgICAgY29uc29sZS53YXJuKCdQb3NzaWJsZSBVbmhhbmRsZWQgUHJvbWlzZSBSZWplY3Rpb246JywgZXJyKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGltbWVkaWF0ZSBmdW5jdGlvbiB0byBleGVjdXRlIGNhbGxiYWNrc1xuICAgKiBAcGFyYW0gZm4ge2Z1bmN0aW9ufSBGdW5jdGlvbiB0byBleGVjdXRlXG4gICAqIEBkZXByZWNhdGVkXG4gICAqL1xuICBQcm9taXNlLl9zZXRJbW1lZGlhdGVGbiA9IGZ1bmN0aW9uIF9zZXRJbW1lZGlhdGVGbihmbikge1xuICAgIFByb21pc2UuX2ltbWVkaWF0ZUZuID0gZm47XG4gIH07XG5cbiAgLyoqXG4gICAqIENoYW5nZSB0aGUgZnVuY3Rpb24gdG8gZXhlY3V0ZSBvbiB1bmhhbmRsZWQgcmVqZWN0aW9uXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGV4ZWN1dGUgb24gdW5oYW5kbGVkIHJlamVjdGlvblxuICAgKiBAZGVwcmVjYXRlZFxuICAgKi9cbiAgUHJvbWlzZS5fc2V0VW5oYW5kbGVkUmVqZWN0aW9uRm4gPSBmdW5jdGlvbiBfc2V0VW5oYW5kbGVkUmVqZWN0aW9uRm4oZm4pIHtcbiAgICBQcm9taXNlLl91bmhhbmRsZWRSZWplY3Rpb25GbiA9IGZuO1xuICB9O1xuICBcbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBQcm9taXNlO1xuICB9IGVsc2UgaWYgKCFyb290LlByb21pc2UpIHtcbiAgICByb290LlByb21pc2UgPSBQcm9taXNlO1xuICB9XG5cbn0pKHRoaXMpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvbWlzZS1wb2x5ZmlsbC9wcm9taXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYXBwbHkgPSBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHk7XG5cbi8vIERPTSBBUElzLCBmb3IgY29tcGxldGVuZXNzXG5cbmV4cG9ydHMuc2V0VGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRUaW1lb3V0LCB3aW5kb3csIGFyZ3VtZW50cyksIGNsZWFyVGltZW91dCk7XG59O1xuZXhwb3J0cy5zZXRJbnRlcnZhbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRJbnRlcnZhbCwgd2luZG93LCBhcmd1bWVudHMpLCBjbGVhckludGVydmFsKTtcbn07XG5leHBvcnRzLmNsZWFyVGltZW91dCA9XG5leHBvcnRzLmNsZWFySW50ZXJ2YWwgPSBmdW5jdGlvbih0aW1lb3V0KSB7XG4gIGlmICh0aW1lb3V0KSB7XG4gICAgdGltZW91dC5jbG9zZSgpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBUaW1lb3V0KGlkLCBjbGVhckZuKSB7XG4gIHRoaXMuX2lkID0gaWQ7XG4gIHRoaXMuX2NsZWFyRm4gPSBjbGVhckZuO1xufVxuVGltZW91dC5wcm90b3R5cGUudW5yZWYgPSBUaW1lb3V0LnByb3RvdHlwZS5yZWYgPSBmdW5jdGlvbigpIHt9O1xuVGltZW91dC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fY2xlYXJGbi5jYWxsKHdpbmRvdywgdGhpcy5faWQpO1xufTtcblxuLy8gRG9lcyBub3Qgc3RhcnQgdGhlIHRpbWUsIGp1c3Qgc2V0cyB1cCB0aGUgbWVtYmVycyBuZWVkZWQuXG5leHBvcnRzLmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0sIG1zZWNzKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSBtc2Vjcztcbn07XG5cbmV4cG9ydHMudW5lbnJvbGwgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSAtMTtcbn07XG5cbmV4cG9ydHMuX3VucmVmQWN0aXZlID0gZXhwb3J0cy5hY3RpdmUgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcblxuICB2YXIgbXNlY3MgPSBpdGVtLl9pZGxlVGltZW91dDtcbiAgaWYgKG1zZWNzID49IDApIHtcbiAgICBpdGVtLl9pZGxlVGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiBvblRpbWVvdXQoKSB7XG4gICAgICBpZiAoaXRlbS5fb25UaW1lb3V0KVxuICAgICAgICBpdGVtLl9vblRpbWVvdXQoKTtcbiAgICB9LCBtc2Vjcyk7XG4gIH1cbn07XG5cbi8vIHNldGltbWVkaWF0ZSBhdHRhY2hlcyBpdHNlbGYgdG8gdGhlIGdsb2JhbCBvYmplY3RcbnJlcXVpcmUoXCJzZXRpbW1lZGlhdGVcIik7XG5leHBvcnRzLnNldEltbWVkaWF0ZSA9IHNldEltbWVkaWF0ZTtcbmV4cG9ydHMuY2xlYXJJbW1lZGlhdGUgPSBjbGVhckltbWVkaWF0ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3RpbWVycy1icm93c2VyaWZ5L21haW4uanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbiAoZ2xvYmFsLCB1bmRlZmluZWQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGlmIChnbG9iYWwuc2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbmV4dEhhbmRsZSA9IDE7IC8vIFNwZWMgc2F5cyBncmVhdGVyIHRoYW4gemVyb1xuICAgIHZhciB0YXNrc0J5SGFuZGxlID0ge307XG4gICAgdmFyIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgIHZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG4gICAgdmFyIHJlZ2lzdGVySW1tZWRpYXRlO1xuXG4gICAgZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGNhbGxiYWNrKSB7XG4gICAgICAvLyBDYWxsYmFjayBjYW4gZWl0aGVyIGJlIGEgZnVuY3Rpb24gb3IgYSBzdHJpbmdcbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjYWxsYmFjayA9IG5ldyBGdW5jdGlvbihcIlwiICsgY2FsbGJhY2spO1xuICAgICAgfVxuICAgICAgLy8gQ29weSBmdW5jdGlvbiBhcmd1bWVudHNcbiAgICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaSArIDFdO1xuICAgICAgfVxuICAgICAgLy8gU3RvcmUgYW5kIHJlZ2lzdGVyIHRoZSB0YXNrXG4gICAgICB2YXIgdGFzayA9IHsgY2FsbGJhY2s6IGNhbGxiYWNrLCBhcmdzOiBhcmdzIH07XG4gICAgICB0YXNrc0J5SGFuZGxlW25leHRIYW5kbGVdID0gdGFzaztcbiAgICAgIHJlZ2lzdGVySW1tZWRpYXRlKG5leHRIYW5kbGUpO1xuICAgICAgcmV0dXJuIG5leHRIYW5kbGUrKztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShoYW5kbGUpIHtcbiAgICAgICAgZGVsZXRlIHRhc2tzQnlIYW5kbGVbaGFuZGxlXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW4odGFzaykge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0YXNrLmNhbGxiYWNrO1xuICAgICAgICB2YXIgYXJncyA9IHRhc2suYXJncztcbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjYWxsYmFjay5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW5JZlByZXNlbnQoaGFuZGxlKSB7XG4gICAgICAgIC8vIEZyb20gdGhlIHNwZWM6IFwiV2FpdCB1bnRpbCBhbnkgaW52b2NhdGlvbnMgb2YgdGhpcyBhbGdvcml0aG0gc3RhcnRlZCBiZWZvcmUgdGhpcyBvbmUgaGF2ZSBjb21wbGV0ZWQuXCJcbiAgICAgICAgLy8gU28gaWYgd2UncmUgY3VycmVudGx5IHJ1bm5pbmcgYSB0YXNrLCB3ZSdsbCBuZWVkIHRvIGRlbGF5IHRoaXMgaW52b2NhdGlvbi5cbiAgICAgICAgaWYgKGN1cnJlbnRseVJ1bm5pbmdBVGFzaykge1xuICAgICAgICAgICAgLy8gRGVsYXkgYnkgZG9pbmcgYSBzZXRUaW1lb3V0LiBzZXRJbW1lZGlhdGUgd2FzIHRyaWVkIGluc3RlYWQsIGJ1dCBpbiBGaXJlZm94IDcgaXQgZ2VuZXJhdGVkIGFcbiAgICAgICAgICAgIC8vIFwidG9vIG11Y2ggcmVjdXJzaW9uXCIgZXJyb3IuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJ1bklmUHJlc2VudCwgMCwgaGFuZGxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciB0YXNrID0gdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgICAgICAgICAgaWYgKHRhc2spIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJ1bih0YXNrKTtcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckltbWVkaWF0ZShoYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gKCkgeyBydW5JZlByZXNlbnQoaGFuZGxlKTsgfSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FuVXNlUG9zdE1lc3NhZ2UoKSB7XG4gICAgICAgIC8vIFRoZSB0ZXN0IGFnYWluc3QgYGltcG9ydFNjcmlwdHNgIHByZXZlbnRzIHRoaXMgaW1wbGVtZW50YXRpb24gZnJvbSBiZWluZyBpbnN0YWxsZWQgaW5zaWRlIGEgd2ViIHdvcmtlcixcbiAgICAgICAgLy8gd2hlcmUgYGdsb2JhbC5wb3N0TWVzc2FnZWAgbWVhbnMgc29tZXRoaW5nIGNvbXBsZXRlbHkgZGlmZmVyZW50IGFuZCBjYW4ndCBiZSB1c2VkIGZvciB0aGlzIHB1cnBvc2UuXG4gICAgICAgIGlmIChnbG9iYWwucG9zdE1lc3NhZ2UgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKSB7XG4gICAgICAgICAgICB2YXIgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IHRydWU7XG4gICAgICAgICAgICB2YXIgb2xkT25NZXNzYWdlID0gZ2xvYmFsLm9ubWVzc2FnZTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKFwiXCIsIFwiKlwiKTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBvbGRPbk1lc3NhZ2U7XG4gICAgICAgICAgICByZXR1cm4gcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICAvLyBJbnN0YWxscyBhbiBldmVudCBoYW5kbGVyIG9uIGBnbG9iYWxgIGZvciB0aGUgYG1lc3NhZ2VgIGV2ZW50OiBzZWVcbiAgICAgICAgLy8gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9ET00vd2luZG93LnBvc3RNZXNzYWdlXG4gICAgICAgIC8vICogaHR0cDovL3d3dy53aGF0d2cub3JnL3NwZWNzL3dlYi1hcHBzL2N1cnJlbnQtd29yay9tdWx0aXBhZ2UvY29tbXMuaHRtbCNjcm9zc0RvY3VtZW50TWVzc2FnZXNcblxuICAgICAgICB2YXIgbWVzc2FnZVByZWZpeCA9IFwic2V0SW1tZWRpYXRlJFwiICsgTWF0aC5yYW5kb20oKSArIFwiJFwiO1xuICAgICAgICB2YXIgb25HbG9iYWxNZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5zb3VyY2UgPT09IGdsb2JhbCAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBldmVudC5kYXRhID09PSBcInN0cmluZ1wiICYmXG4gICAgICAgICAgICAgICAgZXZlbnQuZGF0YS5pbmRleE9mKG1lc3NhZ2VQcmVmaXgpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcnVuSWZQcmVzZW50KCtldmVudC5kYXRhLnNsaWNlKG1lc3NhZ2VQcmVmaXgubGVuZ3RoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnbG9iYWwuYXR0YWNoRXZlbnQoXCJvbm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UobWVzc2FnZVByZWZpeCArIGhhbmRsZSwgXCIqXCIpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgaGFuZGxlID0gZXZlbnQuZGF0YTtcbiAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKGhhbmRsZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgdmFyIGh0bWwgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgPHNjcmlwdD4gZWxlbWVudDsgaXRzIHJlYWR5c3RhdGVjaGFuZ2UgZXZlbnQgd2lsbCBiZSBmaXJlZCBhc3luY2hyb25vdXNseSBvbmNlIGl0IGlzIGluc2VydGVkXG4gICAgICAgICAgICAvLyBpbnRvIHRoZSBkb2N1bWVudC4gRG8gc28sIHRodXMgcXVldWluZyB1cCB0aGUgdGFzay4gUmVtZW1iZXIgdG8gY2xlYW4gdXAgb25jZSBpdCdzIGJlZW4gY2FsbGVkLlxuICAgICAgICAgICAgdmFyIHNjcmlwdCA9IGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICAgICAgICAgICAgc2NyaXB0ID0gbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBodG1sLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQocnVuSWZQcmVzZW50LCAwLCBoYW5kbGUpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIElmIHN1cHBvcnRlZCwgd2Ugc2hvdWxkIGF0dGFjaCB0byB0aGUgcHJvdG90eXBlIG9mIGdsb2JhbCwgc2luY2UgdGhhdCBpcyB3aGVyZSBzZXRUaW1lb3V0IGV0IGFsLiBsaXZlLlxuICAgIHZhciBhdHRhY2hUbyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZ2xvYmFsKTtcbiAgICBhdHRhY2hUbyA9IGF0dGFjaFRvICYmIGF0dGFjaFRvLnNldFRpbWVvdXQgPyBhdHRhY2hUbyA6IGdsb2JhbDtcblxuICAgIC8vIERvbid0IGdldCBmb29sZWQgYnkgZS5nLiBicm93c2VyaWZ5IGVudmlyb25tZW50cy5cbiAgICBpZiAoe30udG9TdHJpbmcuY2FsbChnbG9iYWwucHJvY2VzcykgPT09IFwiW29iamVjdCBwcm9jZXNzXVwiKSB7XG4gICAgICAgIC8vIEZvciBOb2RlLmpzIGJlZm9yZSAwLjlcbiAgICAgICAgaW5zdGFsbE5leHRUaWNrSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoY2FuVXNlUG9zdE1lc3NhZ2UoKSkge1xuICAgICAgICAvLyBGb3Igbm9uLUlFMTAgbW9kZXJuIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGdsb2JhbC5NZXNzYWdlQ2hhbm5lbCkge1xuICAgICAgICAvLyBGb3Igd2ViIHdvcmtlcnMsIHdoZXJlIHN1cHBvcnRlZFxuICAgICAgICBpbnN0YWxsTWVzc2FnZUNoYW5uZWxJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChkb2MgJiYgXCJvbnJlYWR5c3RhdGVjaGFuZ2VcIiBpbiBkb2MuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKSkge1xuICAgICAgICAvLyBGb3IgSUUgNuKAkzhcbiAgICAgICAgaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRm9yIG9sZGVyIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxTZXRUaW1lb3V0SW1wbGVtZW50YXRpb24oKTtcbiAgICB9XG5cbiAgICBhdHRhY2hUby5zZXRJbW1lZGlhdGUgPSBzZXRJbW1lZGlhdGU7XG4gICAgYXR0YWNoVG8uY2xlYXJJbW1lZGlhdGUgPSBjbGVhckltbWVkaWF0ZTtcbn0odHlwZW9mIHNlbGYgPT09IFwidW5kZWZpbmVkXCIgPyB0eXBlb2YgZ2xvYmFsID09PSBcInVuZGVmaW5lZFwiID8gdGhpcyA6IGdsb2JhbCA6IHNlbGYpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NldGltbWVkaWF0ZS9zZXRJbW1lZGlhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbJ21vZHVsZScsICcuL2NsaXBib2FyZC1hY3Rpb24nLCAndGlueS1lbWl0dGVyJywgJ2dvb2QtbGlzdGVuZXInXSwgZmFjdG9yeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBmYWN0b3J5KG1vZHVsZSwgcmVxdWlyZSgnLi9jbGlwYm9hcmQtYWN0aW9uJyksIHJlcXVpcmUoJ3RpbnktZW1pdHRlcicpLCByZXF1aXJlKCdnb29kLWxpc3RlbmVyJykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBtb2QgPSB7XG4gICAgICAgICAgICBleHBvcnRzOiB7fVxuICAgICAgICB9O1xuICAgICAgICBmYWN0b3J5KG1vZCwgZ2xvYmFsLmNsaXBib2FyZEFjdGlvbiwgZ2xvYmFsLnRpbnlFbWl0dGVyLCBnbG9iYWwuZ29vZExpc3RlbmVyKTtcbiAgICAgICAgZ2xvYmFsLmNsaXBib2FyZCA9IG1vZC5leHBvcnRzO1xuICAgIH1cbn0pKHRoaXMsIGZ1bmN0aW9uIChtb2R1bGUsIF9jbGlwYm9hcmRBY3Rpb24sIF90aW55RW1pdHRlciwgX2dvb2RMaXN0ZW5lcikge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBfY2xpcGJvYXJkQWN0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsaXBib2FyZEFjdGlvbik7XG5cbiAgICB2YXIgX3RpbnlFbWl0dGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RpbnlFbWl0dGVyKTtcblxuICAgIHZhciBfZ29vZExpc3RlbmVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dvb2RMaXN0ZW5lcik7XG5cbiAgICBmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICAgICAgICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgICAgICAgICAgZGVmYXVsdDogb2JqXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gICAgfSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgICAgICAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgICAgICAgICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICAgICAgICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgICAgICAgICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICAgICAgICB9O1xuICAgIH0oKTtcblxuICAgIGZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHtcbiAgICAgICAgaWYgKCFzZWxmKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xuICAgIH1cblxuICAgIHZhciBDbGlwYm9hcmQgPSBmdW5jdGlvbiAoX0VtaXR0ZXIpIHtcbiAgICAgICAgX2luaGVyaXRzKENsaXBib2FyZCwgX0VtaXR0ZXIpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ3xIVE1MRWxlbWVudHxIVE1MQ29sbGVjdGlvbnxOb2RlTGlzdH0gdHJpZ2dlclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gQ2xpcGJvYXJkKHRyaWdnZXIsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDbGlwYm9hcmQpO1xuXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoQ2xpcGJvYXJkLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ2xpcGJvYXJkKSkuY2FsbCh0aGlzKSk7XG5cbiAgICAgICAgICAgIF90aGlzLnJlc29sdmVPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICAgICAgX3RoaXMubGlzdGVuQ2xpY2sodHJpZ2dlcik7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogRGVmaW5lcyBpZiBhdHRyaWJ1dGVzIHdvdWxkIGJlIHJlc29sdmVkIHVzaW5nIGludGVybmFsIHNldHRlciBmdW5jdGlvbnNcbiAgICAgICAgICogb3IgY3VzdG9tIGZ1bmN0aW9ucyB0aGF0IHdlcmUgcGFzc2VkIGluIHRoZSBjb25zdHJ1Y3Rvci5cbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAgICovXG5cblxuICAgICAgICBfY3JlYXRlQ2xhc3MoQ2xpcGJvYXJkLCBbe1xuICAgICAgICAgICAga2V5OiAncmVzb2x2ZU9wdGlvbnMnLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlc29sdmVPcHRpb25zKCkge1xuICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcblxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uID0gdHlwZW9mIG9wdGlvbnMuYWN0aW9uID09PSAnZnVuY3Rpb24nID8gb3B0aW9ucy5hY3Rpb24gOiB0aGlzLmRlZmF1bHRBY3Rpb247XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0eXBlb2Ygb3B0aW9ucy50YXJnZXQgPT09ICdmdW5jdGlvbicgPyBvcHRpb25zLnRhcmdldCA6IHRoaXMuZGVmYXVsdFRhcmdldDtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHQgPSB0eXBlb2Ygb3B0aW9ucy50ZXh0ID09PSAnZnVuY3Rpb24nID8gb3B0aW9ucy50ZXh0IDogdGhpcy5kZWZhdWx0VGV4dDtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9IF90eXBlb2Yob3B0aW9ucy5jb250YWluZXIpID09PSAnb2JqZWN0JyA/IG9wdGlvbnMuY29udGFpbmVyIDogZG9jdW1lbnQuYm9keTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnbGlzdGVuQ2xpY2snLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGxpc3RlbkNsaWNrKHRyaWdnZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXIgPSAoMCwgX2dvb2RMaXN0ZW5lcjIuZGVmYXVsdCkodHJpZ2dlciwgJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzMi5vbkNsaWNrKGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdvbkNsaWNrJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBvbkNsaWNrKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHJpZ2dlciA9IGUuZGVsZWdhdGVUYXJnZXQgfHwgZS5jdXJyZW50VGFyZ2V0O1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2xpcGJvYXJkQWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xpcGJvYXJkQWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNsaXBib2FyZEFjdGlvbiA9IG5ldyBfY2xpcGJvYXJkQWN0aW9uMi5kZWZhdWx0KHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbih0cmlnZ2VyKSxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLnRhcmdldCh0cmlnZ2VyKSxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogdGhpcy50ZXh0KHRyaWdnZXIpLFxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXI6IHRoaXMuY29udGFpbmVyLFxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyOiB0cmlnZ2VyLFxuICAgICAgICAgICAgICAgICAgICBlbWl0dGVyOiB0aGlzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ2RlZmF1bHRBY3Rpb24nLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRlZmF1bHRBY3Rpb24odHJpZ2dlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXRBdHRyaWJ1dGVWYWx1ZSgnYWN0aW9uJywgdHJpZ2dlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ2RlZmF1bHRUYXJnZXQnLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRlZmF1bHRUYXJnZXQodHJpZ2dlcikge1xuICAgICAgICAgICAgICAgIHZhciBzZWxlY3RvciA9IGdldEF0dHJpYnV0ZVZhbHVlKCd0YXJnZXQnLCB0cmlnZ2VyKTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdkZWZhdWx0VGV4dCcsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZGVmYXVsdFRleHQodHJpZ2dlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXRBdHRyaWJ1dGVWYWx1ZSgndGV4dCcsIHRyaWdnZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdkZXN0cm95JyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXIuZGVzdHJveSgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2xpcGJvYXJkQWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xpcGJvYXJkQWN0aW9uLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGlwYm9hcmRBY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfV0sIFt7XG4gICAgICAgICAgICBrZXk6ICdpc1N1cHBvcnRlZCcsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaXNTdXBwb3J0ZWQoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogWydjb3B5JywgJ2N1dCddO1xuXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSB0eXBlb2YgYWN0aW9uID09PSAnc3RyaW5nJyA/IFthY3Rpb25dIDogYWN0aW9uO1xuICAgICAgICAgICAgICAgIHZhciBzdXBwb3J0ID0gISFkb2N1bWVudC5xdWVyeUNvbW1hbmRTdXBwb3J0ZWQ7XG5cbiAgICAgICAgICAgICAgICBhY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBzdXBwb3J0ID0gc3VwcG9ydCAmJiAhIWRvY3VtZW50LnF1ZXJ5Q29tbWFuZFN1cHBvcnRlZChhY3Rpb24pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1dKTtcblxuICAgICAgICByZXR1cm4gQ2xpcGJvYXJkO1xuICAgIH0oX3RpbnlFbWl0dGVyMi5kZWZhdWx0KTtcblxuICAgIC8qKlxuICAgICAqIEhlbHBlciBmdW5jdGlvbiB0byByZXRyaWV2ZSBhdHRyaWJ1dGUgdmFsdWUuXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN1ZmZpeFxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldEF0dHJpYnV0ZVZhbHVlKHN1ZmZpeCwgZWxlbWVudCkge1xuICAgICAgICB2YXIgYXR0cmlidXRlID0gJ2RhdGEtY2xpcGJvYXJkLScgKyBzdWZmaXg7XG5cbiAgICAgICAgaWYgKCFlbGVtZW50Lmhhc0F0dHJpYnV0ZShhdHRyaWJ1dGUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IENsaXBib2FyZDtcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NsaXBib2FyZC9saWIvY2xpcGJvYXJkLmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoWydtb2R1bGUnLCAnc2VsZWN0J10sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgZmFjdG9yeShtb2R1bGUsIHJlcXVpcmUoJ3NlbGVjdCcpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbW9kID0ge1xuICAgICAgICAgICAgZXhwb3J0czoge31cbiAgICAgICAgfTtcbiAgICAgICAgZmFjdG9yeShtb2QsIGdsb2JhbC5zZWxlY3QpO1xuICAgICAgICBnbG9iYWwuY2xpcGJvYXJkQWN0aW9uID0gbW9kLmV4cG9ydHM7XG4gICAgfVxufSkodGhpcywgZnVuY3Rpb24gKG1vZHVsZSwgX3NlbGVjdCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBfc2VsZWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NlbGVjdCk7XG5cbiAgICBmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICAgICAgICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgICAgICAgICAgZGVmYXVsdDogb2JqXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gICAgfSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgICAgICAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgICAgICAgICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICAgICAgICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgICAgICAgICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICAgICAgICB9O1xuICAgIH0oKTtcblxuICAgIHZhciBDbGlwYm9hcmRBY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gQ2xpcGJvYXJkQWN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDbGlwYm9hcmRBY3Rpb24pO1xuXG4gICAgICAgICAgICB0aGlzLnJlc29sdmVPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy5pbml0U2VsZWN0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogRGVmaW5lcyBiYXNlIHByb3BlcnRpZXMgcGFzc2VkIGZyb20gY29uc3RydWN0b3IuXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICAgICAqL1xuXG5cbiAgICAgICAgX2NyZWF0ZUNsYXNzKENsaXBib2FyZEFjdGlvbiwgW3tcbiAgICAgICAgICAgIGtleTogJ3Jlc29sdmVPcHRpb25zJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZXNvbHZlT3B0aW9ucygpIHtcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG5cbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbiA9IG9wdGlvbnMuYWN0aW9uO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXI7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0dGVyID0gb3B0aW9ucy5lbWl0dGVyO1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gb3B0aW9ucy50YXJnZXQ7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0ID0gb3B0aW9ucy50ZXh0O1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlciA9IG9wdGlvbnMudHJpZ2dlcjtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUZXh0ID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ2luaXRTZWxlY3Rpb24nLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGluaXRTZWxlY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGV4dCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEZha2UoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFyZ2V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdzZWxlY3RGYWtlJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZWxlY3RGYWtlKCkge1xuICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICB2YXIgaXNSVEwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkaXInKSA9PSAncnRsJztcblxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRmFrZSgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5mYWtlSGFuZGxlckNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMucmVtb3ZlRmFrZSgpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5mYWtlSGFuZGxlciA9IHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5mYWtlSGFuZGxlckNhbGxiYWNrKSB8fCB0cnVlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5mYWtlRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gICAgICAgICAgICAgICAgLy8gUHJldmVudCB6b29taW5nIG9uIGlPU1xuICAgICAgICAgICAgICAgIHRoaXMuZmFrZUVsZW0uc3R5bGUuZm9udFNpemUgPSAnMTJwdCc7XG4gICAgICAgICAgICAgICAgLy8gUmVzZXQgYm94IG1vZGVsXG4gICAgICAgICAgICAgICAgdGhpcy5mYWtlRWxlbS5zdHlsZS5ib3JkZXIgPSAnMCc7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWtlRWxlbS5zdHlsZS5wYWRkaW5nID0gJzAnO1xuICAgICAgICAgICAgICAgIHRoaXMuZmFrZUVsZW0uc3R5bGUubWFyZ2luID0gJzAnO1xuICAgICAgICAgICAgICAgIC8vIE1vdmUgZWxlbWVudCBvdXQgb2Ygc2NyZWVuIGhvcml6b250YWxseVxuICAgICAgICAgICAgICAgIHRoaXMuZmFrZUVsZW0uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICAgICAgICAgIHRoaXMuZmFrZUVsZW0uc3R5bGVbaXNSVEwgPyAncmlnaHQnIDogJ2xlZnQnXSA9ICctOTk5OXB4JztcbiAgICAgICAgICAgICAgICAvLyBNb3ZlIGVsZW1lbnQgdG8gdGhlIHNhbWUgcG9zaXRpb24gdmVydGljYWxseVxuICAgICAgICAgICAgICAgIHZhciB5UG9zaXRpb24gPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgICAgICAgICAgICB0aGlzLmZha2VFbGVtLnN0eWxlLnRvcCA9IHlQb3NpdGlvbiArICdweCc7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmZha2VFbGVtLnNldEF0dHJpYnV0ZSgncmVhZG9ubHknLCAnJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWtlRWxlbS52YWx1ZSA9IHRoaXMudGV4dDtcblxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuZmFrZUVsZW0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFRleHQgPSAoMCwgX3NlbGVjdDIuZGVmYXVsdCkodGhpcy5mYWtlRWxlbSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3B5VGV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdyZW1vdmVGYWtlJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW1vdmVGYWtlKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZha2VIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5mYWtlSGFuZGxlckNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWtlSGFuZGxlciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmFrZUhhbmRsZXJDYWxsYmFjayA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmFrZUVsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIucmVtb3ZlQ2hpbGQodGhpcy5mYWtlRWxlbSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmFrZUVsZW0gPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnc2VsZWN0VGFyZ2V0JyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZWxlY3RUYXJnZXQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFRleHQgPSAoMCwgX3NlbGVjdDIuZGVmYXVsdCkodGhpcy50YXJnZXQpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29weVRleHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnY29weVRleHQnLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvcHlUZXh0KCkge1xuICAgICAgICAgICAgICAgIHZhciBzdWNjZWVkZWQgPSB2b2lkIDA7XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBzdWNjZWVkZWQgPSBkb2N1bWVudC5leGVjQ29tbWFuZCh0aGlzLmFjdGlvbik7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2NlZWRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlUmVzdWx0KHN1Y2NlZWRlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ2hhbmRsZVJlc3VsdCcsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlUmVzdWx0KHN1Y2NlZWRlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KHN1Y2NlZWRlZCA/ICdzdWNjZXNzJyA6ICdlcnJvcicsIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogdGhpcy5zZWxlY3RlZFRleHQsXG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXI6IHRoaXMudHJpZ2dlcixcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJTZWxlY3Rpb246IHRoaXMuY2xlYXJTZWxlY3Rpb24uYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdjbGVhclNlbGVjdGlvbicsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY2xlYXJTZWxlY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpZ2dlcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ2Rlc3Ryb3knLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVGYWtlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ2FjdGlvbicsXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIHNldCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAnY29weSc7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9hY3Rpb24gPSBhY3Rpb247XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYWN0aW9uICE9PSAnY29weScgJiYgdGhpcy5fYWN0aW9uICE9PSAnY3V0Jykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgXCJhY3Rpb25cIiB2YWx1ZSwgdXNlIGVpdGhlciBcImNvcHlcIiBvciBcImN1dFwiJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9hY3Rpb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ3RhcmdldCcsXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIHNldCh0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldCAmJiAodHlwZW9mIHRhcmdldCA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodGFyZ2V0KSkgPT09ICdvYmplY3QnICYmIHRhcmdldC5ub2RlVHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWN0aW9uID09PSAnY29weScgJiYgdGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBcInRhcmdldFwiIGF0dHJpYnV0ZS4gUGxlYXNlIHVzZSBcInJlYWRvbmx5XCIgaW5zdGVhZCBvZiBcImRpc2FibGVkXCIgYXR0cmlidXRlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFjdGlvbiA9PT0gJ2N1dCcgJiYgKHRhcmdldC5oYXNBdHRyaWJ1dGUoJ3JlYWRvbmx5JykgfHwgdGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgXCJ0YXJnZXRcIiBhdHRyaWJ1dGUuIFlvdSBjYW5cXCd0IGN1dCB0ZXh0IGZyb20gZWxlbWVudHMgd2l0aCBcInJlYWRvbmx5XCIgb3IgXCJkaXNhYmxlZFwiIGF0dHJpYnV0ZXMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIFwidGFyZ2V0XCIgdmFsdWUsIHVzZSBhIHZhbGlkIEVsZW1lbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdGFyZ2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XSk7XG5cbiAgICAgICAgcmV0dXJuIENsaXBib2FyZEFjdGlvbjtcbiAgICB9KCk7XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IENsaXBib2FyZEFjdGlvbjtcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NsaXBib2FyZC9saWIvY2xpcGJvYXJkLWFjdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gc2VsZWN0KGVsZW1lbnQpIHtcbiAgICB2YXIgc2VsZWN0ZWRUZXh0O1xuXG4gICAgaWYgKGVsZW1lbnQubm9kZU5hbWUgPT09ICdTRUxFQ1QnKSB7XG4gICAgICAgIGVsZW1lbnQuZm9jdXMoKTtcblxuICAgICAgICBzZWxlY3RlZFRleHQgPSBlbGVtZW50LnZhbHVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChlbGVtZW50Lm5vZGVOYW1lID09PSAnSU5QVVQnIHx8IGVsZW1lbnQubm9kZU5hbWUgPT09ICdURVhUQVJFQScpIHtcbiAgICAgICAgdmFyIGlzUmVhZE9ubHkgPSBlbGVtZW50Lmhhc0F0dHJpYnV0ZSgncmVhZG9ubHknKTtcblxuICAgICAgICBpZiAoIWlzUmVhZE9ubHkpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdyZWFkb25seScsICcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnQuc2VsZWN0KCk7XG4gICAgICAgIGVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgZWxlbWVudC52YWx1ZS5sZW5ndGgpO1xuXG4gICAgICAgIGlmICghaXNSZWFkT25seSkge1xuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3JlYWRvbmx5Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxlY3RlZFRleHQgPSBlbGVtZW50LnZhbHVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnKSkge1xuICAgICAgICAgICAgZWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgdmFyIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcblxuICAgICAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHMoZWxlbWVudCk7XG4gICAgICAgIHNlbGVjdGlvbi5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgICAgc2VsZWN0aW9uLmFkZFJhbmdlKHJhbmdlKTtcblxuICAgICAgICBzZWxlY3RlZFRleHQgPSBzZWxlY3Rpb24udG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZWN0ZWRUZXh0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNlbGVjdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NlbGVjdC9zcmMvc2VsZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBFICgpIHtcbiAgLy8gS2VlcCB0aGlzIGVtcHR5IHNvIGl0J3MgZWFzaWVyIHRvIGluaGVyaXQgZnJvbVxuICAvLyAodmlhIGh0dHBzOi8vZ2l0aHViLmNvbS9saXBzbWFjayBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9zY290dGNvcmdhbi90aW55LWVtaXR0ZXIvaXNzdWVzLzMpXG59XG5cbkUucHJvdG90eXBlID0ge1xuICBvbjogZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrLCBjdHgpIHtcbiAgICB2YXIgZSA9IHRoaXMuZSB8fCAodGhpcy5lID0ge30pO1xuXG4gICAgKGVbbmFtZV0gfHwgKGVbbmFtZV0gPSBbXSkpLnB1c2goe1xuICAgICAgZm46IGNhbGxiYWNrLFxuICAgICAgY3R4OiBjdHhcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIG9uY2U6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaywgY3R4KSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGZ1bmN0aW9uIGxpc3RlbmVyICgpIHtcbiAgICAgIHNlbGYub2ZmKG5hbWUsIGxpc3RlbmVyKTtcbiAgICAgIGNhbGxiYWNrLmFwcGx5KGN0eCwgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgbGlzdGVuZXIuXyA9IGNhbGxiYWNrXG4gICAgcmV0dXJuIHRoaXMub24obmFtZSwgbGlzdGVuZXIsIGN0eCk7XG4gIH0sXG5cbiAgZW1pdDogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgZGF0YSA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICB2YXIgZXZ0QXJyID0gKCh0aGlzLmUgfHwgKHRoaXMuZSA9IHt9KSlbbmFtZV0gfHwgW10pLnNsaWNlKCk7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBsZW4gPSBldnRBcnIubGVuZ3RoO1xuXG4gICAgZm9yIChpOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGV2dEFycltpXS5mbi5hcHBseShldnRBcnJbaV0uY3R4LCBkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBvZmY6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuICAgIHZhciBlID0gdGhpcy5lIHx8ICh0aGlzLmUgPSB7fSk7XG4gICAgdmFyIGV2dHMgPSBlW25hbWVdO1xuICAgIHZhciBsaXZlRXZlbnRzID0gW107XG5cbiAgICBpZiAoZXZ0cyAmJiBjYWxsYmFjaykge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGV2dHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKGV2dHNbaV0uZm4gIT09IGNhbGxiYWNrICYmIGV2dHNbaV0uZm4uXyAhPT0gY2FsbGJhY2spXG4gICAgICAgICAgbGl2ZUV2ZW50cy5wdXNoKGV2dHNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbW92ZSBldmVudCBmcm9tIHF1ZXVlIHRvIHByZXZlbnQgbWVtb3J5IGxlYWtcbiAgICAvLyBTdWdnZXN0ZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL2xhemRcbiAgICAvLyBSZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS9zY290dGNvcmdhbi90aW55LWVtaXR0ZXIvY29tbWl0L2M2ZWJmYWE5YmM5NzNiMzNkMTEwYTg0YTMwNzc0MmI3Y2Y5NGM5NTMjY29tbWl0Y29tbWVudC01MDI0OTEwXG5cbiAgICAobGl2ZUV2ZW50cy5sZW5ndGgpXG4gICAgICA/IGVbbmFtZV0gPSBsaXZlRXZlbnRzXG4gICAgICA6IGRlbGV0ZSBlW25hbWVdO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3RpbnktZW1pdHRlci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzID0gcmVxdWlyZSgnLi9pcycpO1xudmFyIGRlbGVnYXRlID0gcmVxdWlyZSgnZGVsZWdhdGUnKTtcblxuLyoqXG4gKiBWYWxpZGF0ZXMgYWxsIHBhcmFtcyBhbmQgY2FsbHMgdGhlIHJpZ2h0XG4gKiBsaXN0ZW5lciBmdW5jdGlvbiBiYXNlZCBvbiBpdHMgdGFyZ2V0IHR5cGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8SFRNTEVsZW1lbnR8SFRNTENvbGxlY3Rpb258Tm9kZUxpc3R9IHRhcmdldFxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIGxpc3Rlbih0YXJnZXQsIHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCF0YXJnZXQgJiYgIXR5cGUgJiYgIWNhbGxiYWNrKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyByZXF1aXJlZCBhcmd1bWVudHMnKTtcbiAgICB9XG5cbiAgICBpZiAoIWlzLnN0cmluZyh0eXBlKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdTZWNvbmQgYXJndW1lbnQgbXVzdCBiZSBhIFN0cmluZycpO1xuICAgIH1cblxuICAgIGlmICghaXMuZm4oY2FsbGJhY2spKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoaXJkIGFyZ3VtZW50IG11c3QgYmUgYSBGdW5jdGlvbicpO1xuICAgIH1cblxuICAgIGlmIChpcy5ub2RlKHRhcmdldCkpIHtcbiAgICAgICAgcmV0dXJuIGxpc3Rlbk5vZGUodGFyZ2V0LCB0eXBlLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzLm5vZGVMaXN0KHRhcmdldCkpIHtcbiAgICAgICAgcmV0dXJuIGxpc3Rlbk5vZGVMaXN0KHRhcmdldCwgdHlwZSwgY2FsbGJhY2spO1xuICAgIH1cbiAgICBlbHNlIGlmIChpcy5zdHJpbmcodGFyZ2V0KSkge1xuICAgICAgICByZXR1cm4gbGlzdGVuU2VsZWN0b3IodGFyZ2V0LCB0eXBlLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgU3RyaW5nLCBIVE1MRWxlbWVudCwgSFRNTENvbGxlY3Rpb24sIG9yIE5vZGVMaXN0Jyk7XG4gICAgfVxufVxuXG4vKipcbiAqIEFkZHMgYW4gZXZlbnQgbGlzdGVuZXIgdG8gYSBIVE1MIGVsZW1lbnRcbiAqIGFuZCByZXR1cm5zIGEgcmVtb3ZlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBsaXN0ZW5Ob2RlKG5vZGUsIHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBBZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gYSBsaXN0IG9mIEhUTUwgZWxlbWVudHNcbiAqIGFuZCByZXR1cm5zIGEgcmVtb3ZlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7Tm9kZUxpc3R8SFRNTENvbGxlY3Rpb259IG5vZGVMaXN0XG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gbGlzdGVuTm9kZUxpc3Qobm9kZUxpc3QsIHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChub2RlTGlzdCwgZnVuY3Rpb24obm9kZSkge1xuICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgY2FsbGJhY2spO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKG5vZGVMaXN0LCBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIEFkZCBhbiBldmVudCBsaXN0ZW5lciB0byBhIHNlbGVjdG9yXG4gKiBhbmQgcmV0dXJucyBhIHJlbW92ZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3JcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBsaXN0ZW5TZWxlY3RvcihzZWxlY3RvciwgdHlwZSwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gZGVsZWdhdGUoZG9jdW1lbnQuYm9keSwgc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0ZW47XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nb29kLWxpc3RlbmVyL3NyYy9saXN0ZW4uanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ2hlY2sgaWYgYXJndW1lbnQgaXMgYSBIVE1MIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5leHBvcnRzLm5vZGUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICYmIHZhbHVlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnRcbiAgICAgICAgJiYgdmFsdWUubm9kZVR5cGUgPT09IDE7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGFyZ3VtZW50IGlzIGEgbGlzdCBvZiBIVE1MIGVsZW1lbnRzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZXhwb3J0cy5ub2RlTGlzdCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdmFyIHR5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpO1xuXG4gICAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgICAgJiYgKHR5cGUgPT09ICdbb2JqZWN0IE5vZGVMaXN0XScgfHwgdHlwZSA9PT0gJ1tvYmplY3QgSFRNTENvbGxlY3Rpb25dJylcbiAgICAgICAgJiYgKCdsZW5ndGgnIGluIHZhbHVlKVxuICAgICAgICAmJiAodmFsdWUubGVuZ3RoID09PSAwIHx8IGV4cG9ydHMubm9kZSh2YWx1ZVswXSkpO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBhcmd1bWVudCBpcyBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmV4cG9ydHMuc3RyaW5nID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJ1xuICAgICAgICB8fCB2YWx1ZSBpbnN0YW5jZW9mIFN0cmluZztcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgYXJndW1lbnQgaXMgYSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmV4cG9ydHMuZm4gPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciB0eXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKTtcblxuICAgIHJldHVybiB0eXBlID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dvb2QtbGlzdGVuZXIvc3JjL2lzLmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgY2xvc2VzdCA9IHJlcXVpcmUoJy4vY2xvc2VzdCcpO1xuXG4vKipcbiAqIERlbGVnYXRlcyBldmVudCB0byBhIHNlbGVjdG9yLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdXNlQ2FwdHVyZVxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBkZWxlZ2F0ZShlbGVtZW50LCBzZWxlY3RvciwgdHlwZSwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpIHtcbiAgICB2YXIgbGlzdGVuZXJGbiA9IGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXJGbiwgdXNlQ2FwdHVyZSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lckZuLCB1c2VDYXB0dXJlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBGaW5kcyBjbG9zZXN0IG1hdGNoIGFuZCBpbnZva2VzIGNhbGxiYWNrLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBsaXN0ZW5lcihlbGVtZW50LCBzZWxlY3RvciwgdHlwZSwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZSkge1xuICAgICAgICBlLmRlbGVnYXRlVGFyZ2V0ID0gY2xvc2VzdChlLnRhcmdldCwgc2VsZWN0b3IpO1xuXG4gICAgICAgIGlmIChlLmRlbGVnYXRlVGFyZ2V0KSB7XG4gICAgICAgICAgICBjYWxsYmFjay5jYWxsKGVsZW1lbnQsIGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlbGVnYXRlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZGVsZWdhdGUvc3JjL2RlbGVnYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgRE9DVU1FTlRfTk9ERV9UWVBFID0gOTtcblxuLyoqXG4gKiBBIHBvbHlmaWxsIGZvciBFbGVtZW50Lm1hdGNoZXMoKVxuICovXG5pZiAodHlwZW9mIEVsZW1lbnQgIT09ICd1bmRlZmluZWQnICYmICFFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzKSB7XG4gICAgdmFyIHByb3RvID0gRWxlbWVudC5wcm90b3R5cGU7XG5cbiAgICBwcm90by5tYXRjaGVzID0gcHJvdG8ubWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgICAgICAgICAgICAgIHByb3RvLm1vek1hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgICAgICAgICAgICAgICBwcm90by5tc01hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgICAgICAgICAgICAgICBwcm90by5vTWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgICAgICAgICAgICAgIHByb3RvLndlYmtpdE1hdGNoZXNTZWxlY3Rvcjtcbn1cblxuLyoqXG4gKiBGaW5kcyB0aGUgY2xvc2VzdCBwYXJlbnQgdGhhdCBtYXRjaGVzIGEgc2VsZWN0b3IuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3JcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBjbG9zZXN0IChlbGVtZW50LCBzZWxlY3Rvcikge1xuICAgIHdoaWxlIChlbGVtZW50ICYmIGVsZW1lbnQubm9kZVR5cGUgIT09IERPQ1VNRU5UX05PREVfVFlQRSkge1xuICAgICAgICBpZiAodHlwZW9mIGVsZW1lbnQubWF0Y2hlcyA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgICAgICAgZWxlbWVudC5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsb3Nlc3Q7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9kZWxlZ2F0ZS9zcmMvY2xvc2VzdC5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiOyhmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvKipcblx0ICogQHByZXNlcnZlIEZhc3RDbGljazogcG9seWZpbGwgdG8gcmVtb3ZlIGNsaWNrIGRlbGF5cyBvbiBicm93c2VycyB3aXRoIHRvdWNoIFVJcy5cblx0ICpcblx0ICogQGNvZGluZ3N0YW5kYXJkIGZ0bGFicy1qc3YyXG5cdCAqIEBjb3B5cmlnaHQgVGhlIEZpbmFuY2lhbCBUaW1lcyBMaW1pdGVkIFtBbGwgUmlnaHRzIFJlc2VydmVkXVxuXHQgKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoc2VlIExJQ0VOU0UudHh0KVxuXHQgKi9cblxuXHQvKmpzbGludCBicm93c2VyOnRydWUsIG5vZGU6dHJ1ZSovXG5cdC8qZ2xvYmFsIGRlZmluZSwgRXZlbnQsIE5vZGUqL1xuXG5cblx0LyoqXG5cdCAqIEluc3RhbnRpYXRlIGZhc3QtY2xpY2tpbmcgbGlzdGVuZXJzIG9uIHRoZSBzcGVjaWZpZWQgbGF5ZXIuXG5cdCAqXG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGxheWVyIFRoZSBsYXllciB0byBsaXN0ZW4gb25cblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBUaGUgb3B0aW9ucyB0byBvdmVycmlkZSB0aGUgZGVmYXVsdHNcblx0ICovXG5cdGZ1bmN0aW9uIEZhc3RDbGljayhsYXllciwgb3B0aW9ucykge1xuXHRcdHZhciBvbGRPbkNsaWNrO1xuXG5cdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0XHQvKipcblx0XHQgKiBXaGV0aGVyIGEgY2xpY2sgaXMgY3VycmVudGx5IGJlaW5nIHRyYWNrZWQuXG5cdFx0ICpcblx0XHQgKiBAdHlwZSBib29sZWFuXG5cdFx0ICovXG5cdFx0dGhpcy50cmFja2luZ0NsaWNrID0gZmFsc2U7XG5cblxuXHRcdC8qKlxuXHRcdCAqIFRpbWVzdGFtcCBmb3Igd2hlbiBjbGljayB0cmFja2luZyBzdGFydGVkLlxuXHRcdCAqXG5cdFx0ICogQHR5cGUgbnVtYmVyXG5cdFx0ICovXG5cdFx0dGhpcy50cmFja2luZ0NsaWNrU3RhcnQgPSAwO1xuXG5cblx0XHQvKipcblx0XHQgKiBUaGUgZWxlbWVudCBiZWluZyB0cmFja2VkIGZvciBhIGNsaWNrLlxuXHRcdCAqXG5cdFx0ICogQHR5cGUgRXZlbnRUYXJnZXRcblx0XHQgKi9cblx0XHR0aGlzLnRhcmdldEVsZW1lbnQgPSBudWxsO1xuXG5cblx0XHQvKipcblx0XHQgKiBYLWNvb3JkaW5hdGUgb2YgdG91Y2ggc3RhcnQgZXZlbnQuXG5cdFx0ICpcblx0XHQgKiBAdHlwZSBudW1iZXJcblx0XHQgKi9cblx0XHR0aGlzLnRvdWNoU3RhcnRYID0gMDtcblxuXG5cdFx0LyoqXG5cdFx0ICogWS1jb29yZGluYXRlIG9mIHRvdWNoIHN0YXJ0IGV2ZW50LlxuXHRcdCAqXG5cdFx0ICogQHR5cGUgbnVtYmVyXG5cdFx0ICovXG5cdFx0dGhpcy50b3VjaFN0YXJ0WSA9IDA7XG5cblxuXHRcdC8qKlxuXHRcdCAqIElEIG9mIHRoZSBsYXN0IHRvdWNoLCByZXRyaWV2ZWQgZnJvbSBUb3VjaC5pZGVudGlmaWVyLlxuXHRcdCAqXG5cdFx0ICogQHR5cGUgbnVtYmVyXG5cdFx0ICovXG5cdFx0dGhpcy5sYXN0VG91Y2hJZGVudGlmaWVyID0gMDtcblxuXG5cdFx0LyoqXG5cdFx0ICogVG91Y2htb3ZlIGJvdW5kYXJ5LCBiZXlvbmQgd2hpY2ggYSBjbGljayB3aWxsIGJlIGNhbmNlbGxlZC5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIG51bWJlclxuXHRcdCAqL1xuXHRcdHRoaXMudG91Y2hCb3VuZGFyeSA9IG9wdGlvbnMudG91Y2hCb3VuZGFyeSB8fCAxMDtcblxuXG5cdFx0LyoqXG5cdFx0ICogVGhlIEZhc3RDbGljayBsYXllci5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIEVsZW1lbnRcblx0XHQgKi9cblx0XHR0aGlzLmxheWVyID0gbGF5ZXI7XG5cblx0XHQvKipcblx0XHQgKiBUaGUgbWluaW11bSB0aW1lIGJldHdlZW4gdGFwKHRvdWNoc3RhcnQgYW5kIHRvdWNoZW5kKSBldmVudHNcblx0XHQgKlxuXHRcdCAqIEB0eXBlIG51bWJlclxuXHRcdCAqL1xuXHRcdHRoaXMudGFwRGVsYXkgPSBvcHRpb25zLnRhcERlbGF5IHx8IDIwMDtcblxuXHRcdC8qKlxuXHRcdCAqIFRoZSBtYXhpbXVtIHRpbWUgZm9yIGEgdGFwXG5cdFx0ICpcblx0XHQgKiBAdHlwZSBudW1iZXJcblx0XHQgKi9cblx0XHR0aGlzLnRhcFRpbWVvdXQgPSBvcHRpb25zLnRhcFRpbWVvdXQgfHwgNzAwO1xuXG5cdFx0aWYgKEZhc3RDbGljay5ub3ROZWVkZWQobGF5ZXIpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gU29tZSBvbGQgdmVyc2lvbnMgb2YgQW5kcm9pZCBkb24ndCBoYXZlIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kXG5cdFx0ZnVuY3Rpb24gYmluZChtZXRob2QsIGNvbnRleHQpIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ldGhvZC5hcHBseShjb250ZXh0LCBhcmd1bWVudHMpOyB9O1xuXHRcdH1cblxuXG5cdFx0dmFyIG1ldGhvZHMgPSBbJ29uTW91c2UnLCAnb25DbGljaycsICdvblRvdWNoU3RhcnQnLCAnb25Ub3VjaE1vdmUnLCAnb25Ub3VjaEVuZCcsICdvblRvdWNoQ2FuY2VsJ107XG5cdFx0dmFyIGNvbnRleHQgPSB0aGlzO1xuXHRcdGZvciAodmFyIGkgPSAwLCBsID0gbWV0aG9kcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0XHRcdGNvbnRleHRbbWV0aG9kc1tpXV0gPSBiaW5kKGNvbnRleHRbbWV0aG9kc1tpXV0sIGNvbnRleHQpO1xuXHRcdH1cblxuXHRcdC8vIFNldCB1cCBldmVudCBoYW5kbGVycyBhcyByZXF1aXJlZFxuXHRcdGlmIChkZXZpY2VJc0FuZHJvaWQpIHtcblx0XHRcdGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIHRoaXMub25Nb3VzZSwgdHJ1ZSk7XG5cdFx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2UsIHRydWUpO1xuXHRcdFx0bGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25Nb3VzZSwgdHJ1ZSk7XG5cdFx0fVxuXG5cdFx0bGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ2xpY2ssIHRydWUpO1xuXHRcdGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uVG91Y2hTdGFydCwgZmFsc2UpO1xuXHRcdGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMub25Ub3VjaE1vdmUsIGZhbHNlKTtcblx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMub25Ub3VjaEVuZCwgZmFsc2UpO1xuXHRcdGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpcy5vblRvdWNoQ2FuY2VsLCBmYWxzZSk7XG5cblx0XHQvLyBIYWNrIGlzIHJlcXVpcmVkIGZvciBicm93c2VycyB0aGF0IGRvbid0IHN1cHBvcnQgRXZlbnQjc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIChlLmcuIEFuZHJvaWQgMilcblx0XHQvLyB3aGljaCBpcyBob3cgRmFzdENsaWNrIG5vcm1hbGx5IHN0b3BzIGNsaWNrIGV2ZW50cyBidWJibGluZyB0byBjYWxsYmFja3MgcmVnaXN0ZXJlZCBvbiB0aGUgRmFzdENsaWNrXG5cdFx0Ly8gbGF5ZXIgd2hlbiB0aGV5IGFyZSBjYW5jZWxsZWQuXG5cdFx0aWYgKCFFdmVudC5wcm90b3R5cGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKSB7XG5cdFx0XHRsYXllci5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgY2FsbGJhY2ssIGNhcHR1cmUpIHtcblx0XHRcdFx0dmFyIHJtdiA9IE5vZGUucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXI7XG5cdFx0XHRcdGlmICh0eXBlID09PSAnY2xpY2snKSB7XG5cdFx0XHRcdFx0cm12LmNhbGwobGF5ZXIsIHR5cGUsIGNhbGxiYWNrLmhpamFja2VkIHx8IGNhbGxiYWNrLCBjYXB0dXJlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRybXYuY2FsbChsYXllciwgdHlwZSwgY2FsbGJhY2ssIGNhcHR1cmUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgY2FsbGJhY2ssIGNhcHR1cmUpIHtcblx0XHRcdFx0dmFyIGFkdiA9IE5vZGUucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXI7XG5cdFx0XHRcdGlmICh0eXBlID09PSAnY2xpY2snKSB7XG5cdFx0XHRcdFx0YWR2LmNhbGwobGF5ZXIsIHR5cGUsIGNhbGxiYWNrLmhpamFja2VkIHx8IChjYWxsYmFjay5oaWphY2tlZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRpZiAoIWV2ZW50LnByb3BhZ2F0aW9uU3RvcHBlZCkge1xuXHRcdFx0XHRcdFx0XHRjYWxsYmFjayhldmVudCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSksIGNhcHR1cmUpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGFkdi5jYWxsKGxheWVyLCB0eXBlLCBjYWxsYmFjaywgY2FwdHVyZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0Ly8gSWYgYSBoYW5kbGVyIGlzIGFscmVhZHkgZGVjbGFyZWQgaW4gdGhlIGVsZW1lbnQncyBvbmNsaWNrIGF0dHJpYnV0ZSwgaXQgd2lsbCBiZSBmaXJlZCBiZWZvcmVcblx0XHQvLyBGYXN0Q2xpY2sncyBvbkNsaWNrIGhhbmRsZXIuIEZpeCB0aGlzIGJ5IHB1bGxpbmcgb3V0IHRoZSB1c2VyLWRlZmluZWQgaGFuZGxlciBmdW5jdGlvbiBhbmRcblx0XHQvLyBhZGRpbmcgaXQgYXMgbGlzdGVuZXIuXG5cdFx0aWYgKHR5cGVvZiBsYXllci5vbmNsaWNrID09PSAnZnVuY3Rpb24nKSB7XG5cblx0XHRcdC8vIEFuZHJvaWQgYnJvd3NlciBvbiBhdCBsZWFzdCAzLjIgcmVxdWlyZXMgYSBuZXcgcmVmZXJlbmNlIHRvIHRoZSBmdW5jdGlvbiBpbiBsYXllci5vbmNsaWNrXG5cdFx0XHQvLyAtIHRoZSBvbGQgb25lIHdvbid0IHdvcmsgaWYgcGFzc2VkIHRvIGFkZEV2ZW50TGlzdGVuZXIgZGlyZWN0bHkuXG5cdFx0XHRvbGRPbkNsaWNrID0gbGF5ZXIub25jbGljaztcblx0XHRcdGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0b2xkT25DbGljayhldmVudCk7XG5cdFx0XHR9LCBmYWxzZSk7XG5cdFx0XHRsYXllci5vbmNsaWNrID0gbnVsbDtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0KiBXaW5kb3dzIFBob25lIDguMSBmYWtlcyB1c2VyIGFnZW50IHN0cmluZyB0byBsb29rIGxpa2UgQW5kcm9pZCBhbmQgaVBob25lLlxuXHQqXG5cdCogQHR5cGUgYm9vbGVhblxuXHQqL1xuXHR2YXIgZGV2aWNlSXNXaW5kb3dzUGhvbmUgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJXaW5kb3dzIFBob25lXCIpID49IDA7XG5cblx0LyoqXG5cdCAqIEFuZHJvaWQgcmVxdWlyZXMgZXhjZXB0aW9ucy5cblx0ICpcblx0ICogQHR5cGUgYm9vbGVhblxuXHQgKi9cblx0dmFyIGRldmljZUlzQW5kcm9pZCA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignQW5kcm9pZCcpID4gMCAmJiAhZGV2aWNlSXNXaW5kb3dzUGhvbmU7XG5cblxuXHQvKipcblx0ICogaU9TIHJlcXVpcmVzIGV4Y2VwdGlvbnMuXG5cdCAqXG5cdCAqIEB0eXBlIGJvb2xlYW5cblx0ICovXG5cdHZhciBkZXZpY2VJc0lPUyA9IC9pUChhZHxob25lfG9kKS8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSAmJiAhZGV2aWNlSXNXaW5kb3dzUGhvbmU7XG5cblxuXHQvKipcblx0ICogaU9TIDQgcmVxdWlyZXMgYW4gZXhjZXB0aW9uIGZvciBzZWxlY3QgZWxlbWVudHMuXG5cdCAqXG5cdCAqIEB0eXBlIGJvb2xlYW5cblx0ICovXG5cdHZhciBkZXZpY2VJc0lPUzQgPSBkZXZpY2VJc0lPUyAmJiAoL09TIDRfXFxkKF9cXGQpPy8pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cblxuXHQvKipcblx0ICogaU9TIDYuMC03LiogcmVxdWlyZXMgdGhlIHRhcmdldCBlbGVtZW50IHRvIGJlIG1hbnVhbGx5IGRlcml2ZWRcblx0ICpcblx0ICogQHR5cGUgYm9vbGVhblxuXHQgKi9cblx0dmFyIGRldmljZUlzSU9TV2l0aEJhZFRhcmdldCA9IGRldmljZUlzSU9TICYmICgvT1MgWzYtN11fXFxkLykudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuXHQvKipcblx0ICogQmxhY2tCZXJyeSByZXF1aXJlcyBleGNlcHRpb25zLlxuXHQgKlxuXHQgKiBAdHlwZSBib29sZWFuXG5cdCAqL1xuXHR2YXIgZGV2aWNlSXNCbGFja0JlcnJ5MTAgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0JCMTAnKSA+IDA7XG5cblx0LyoqXG5cdCAqIERldGVybWluZSB3aGV0aGVyIGEgZ2l2ZW4gZWxlbWVudCByZXF1aXJlcyBhIG5hdGl2ZSBjbGljay5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudFRhcmdldHxFbGVtZW50fSB0YXJnZXQgVGFyZ2V0IERPTSBlbGVtZW50XG5cdCAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnQgbmVlZHMgYSBuYXRpdmUgY2xpY2tcblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUubmVlZHNDbGljayA9IGZ1bmN0aW9uKHRhcmdldCkge1xuXHRcdHN3aXRjaCAodGFyZ2V0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkpIHtcblxuXHRcdC8vIERvbid0IHNlbmQgYSBzeW50aGV0aWMgY2xpY2sgdG8gZGlzYWJsZWQgaW5wdXRzIChpc3N1ZSAjNjIpXG5cdFx0Y2FzZSAnYnV0dG9uJzpcblx0XHRjYXNlICdzZWxlY3QnOlxuXHRcdGNhc2UgJ3RleHRhcmVhJzpcblx0XHRcdGlmICh0YXJnZXQuZGlzYWJsZWQpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgJ2lucHV0JzpcblxuXHRcdFx0Ly8gRmlsZSBpbnB1dHMgbmVlZCByZWFsIGNsaWNrcyBvbiBpT1MgNiBkdWUgdG8gYSBicm93c2VyIGJ1ZyAoaXNzdWUgIzY4KVxuXHRcdFx0aWYgKChkZXZpY2VJc0lPUyAmJiB0YXJnZXQudHlwZSA9PT0gJ2ZpbGUnKSB8fCB0YXJnZXQuZGlzYWJsZWQpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgJ2xhYmVsJzpcblx0XHRjYXNlICdpZnJhbWUnOiAvLyBpT1M4IGhvbWVzY3JlZW4gYXBwcyBjYW4gcHJldmVudCBldmVudHMgYnViYmxpbmcgaW50byBmcmFtZXNcblx0XHRjYXNlICd2aWRlbyc6XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gKC9cXGJuZWVkc2NsaWNrXFxiLykudGVzdCh0YXJnZXQuY2xhc3NOYW1lKTtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmUgd2hldGhlciBhIGdpdmVuIGVsZW1lbnQgcmVxdWlyZXMgYSBjYWxsIHRvIGZvY3VzIHRvIHNpbXVsYXRlIGNsaWNrIGludG8gZWxlbWVudC5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudFRhcmdldHxFbGVtZW50fSB0YXJnZXQgVGFyZ2V0IERPTSBlbGVtZW50XG5cdCAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnQgcmVxdWlyZXMgYSBjYWxsIHRvIGZvY3VzIHRvIHNpbXVsYXRlIG5hdGl2ZSBjbGljay5cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUubmVlZHNGb2N1cyA9IGZ1bmN0aW9uKHRhcmdldCkge1xuXHRcdHN3aXRjaCAodGFyZ2V0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkpIHtcblx0XHRjYXNlICd0ZXh0YXJlYSc6XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRjYXNlICdzZWxlY3QnOlxuXHRcdFx0cmV0dXJuICFkZXZpY2VJc0FuZHJvaWQ7XG5cdFx0Y2FzZSAnaW5wdXQnOlxuXHRcdFx0c3dpdGNoICh0YXJnZXQudHlwZSkge1xuXHRcdFx0Y2FzZSAnYnV0dG9uJzpcblx0XHRcdGNhc2UgJ2NoZWNrYm94Jzpcblx0XHRcdGNhc2UgJ2ZpbGUnOlxuXHRcdFx0Y2FzZSAnaW1hZ2UnOlxuXHRcdFx0Y2FzZSAncmFkaW8nOlxuXHRcdFx0Y2FzZSAnc3VibWl0Jzpcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBObyBwb2ludCBpbiBhdHRlbXB0aW5nIHRvIGZvY3VzIGRpc2FibGVkIGlucHV0c1xuXHRcdFx0cmV0dXJuICF0YXJnZXQuZGlzYWJsZWQgJiYgIXRhcmdldC5yZWFkT25seTtcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuICgvXFxibmVlZHNmb2N1c1xcYi8pLnRlc3QodGFyZ2V0LmNsYXNzTmFtZSk7XG5cdFx0fVxuXHR9O1xuXG5cblx0LyoqXG5cdCAqIFNlbmQgYSBjbGljayBldmVudCB0byB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnRUYXJnZXR8RWxlbWVudH0gdGFyZ2V0RWxlbWVudFxuXHQgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5zZW5kQ2xpY2sgPSBmdW5jdGlvbih0YXJnZXRFbGVtZW50LCBldmVudCkge1xuXHRcdHZhciBjbGlja0V2ZW50LCB0b3VjaDtcblxuXHRcdC8vIE9uIHNvbWUgQW5kcm9pZCBkZXZpY2VzIGFjdGl2ZUVsZW1lbnQgbmVlZHMgdG8gYmUgYmx1cnJlZCBvdGhlcndpc2UgdGhlIHN5bnRoZXRpYyBjbGljayB3aWxsIGhhdmUgbm8gZWZmZWN0ICgjMjQpXG5cdFx0aWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gdGFyZ2V0RWxlbWVudCkge1xuXHRcdFx0ZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCk7XG5cdFx0fVxuXG5cdFx0dG91Y2ggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcblxuXHRcdC8vIFN5bnRoZXNpc2UgYSBjbGljayBldmVudCwgd2l0aCBhbiBleHRyYSBhdHRyaWJ1dGUgc28gaXQgY2FuIGJlIHRyYWNrZWRcblx0XHRjbGlja0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ01vdXNlRXZlbnRzJyk7XG5cdFx0Y2xpY2tFdmVudC5pbml0TW91c2VFdmVudCh0aGlzLmRldGVybWluZUV2ZW50VHlwZSh0YXJnZXRFbGVtZW50KSwgdHJ1ZSwgdHJ1ZSwgd2luZG93LCAxLCB0b3VjaC5zY3JlZW5YLCB0b3VjaC5zY3JlZW5ZLCB0b3VjaC5jbGllbnRYLCB0b3VjaC5jbGllbnRZLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgMCwgbnVsbCk7XG5cdFx0Y2xpY2tFdmVudC5mb3J3YXJkZWRUb3VjaEV2ZW50ID0gdHJ1ZTtcblx0XHR0YXJnZXRFbGVtZW50LmRpc3BhdGNoRXZlbnQoY2xpY2tFdmVudCk7XG5cdH07XG5cblx0RmFzdENsaWNrLnByb3RvdHlwZS5kZXRlcm1pbmVFdmVudFR5cGUgPSBmdW5jdGlvbih0YXJnZXRFbGVtZW50KSB7XG5cblx0XHQvL0lzc3VlICMxNTk6IEFuZHJvaWQgQ2hyb21lIFNlbGVjdCBCb3ggZG9lcyBub3Qgb3BlbiB3aXRoIGEgc3ludGhldGljIGNsaWNrIGV2ZW50XG5cdFx0aWYgKGRldmljZUlzQW5kcm9pZCAmJiB0YXJnZXRFbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3NlbGVjdCcpIHtcblx0XHRcdHJldHVybiAnbW91c2Vkb3duJztcblx0XHR9XG5cblx0XHRyZXR1cm4gJ2NsaWNrJztcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fEVsZW1lbnR9IHRhcmdldEVsZW1lbnRcblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUuZm9jdXMgPSBmdW5jdGlvbih0YXJnZXRFbGVtZW50KSB7XG5cdFx0dmFyIGxlbmd0aDtcblxuXHRcdC8vIElzc3VlICMxNjA6IG9uIGlPUyA3LCBzb21lIGlucHV0IGVsZW1lbnRzIChlLmcuIGRhdGUgZGF0ZXRpbWUgbW9udGgpIHRocm93IGEgdmFndWUgVHlwZUVycm9yIG9uIHNldFNlbGVjdGlvblJhbmdlLiBUaGVzZSBlbGVtZW50cyBkb24ndCBoYXZlIGFuIGludGVnZXIgdmFsdWUgZm9yIHRoZSBzZWxlY3Rpb25TdGFydCBhbmQgc2VsZWN0aW9uRW5kIHByb3BlcnRpZXMsIGJ1dCB1bmZvcnR1bmF0ZWx5IHRoYXQgY2FuJ3QgYmUgdXNlZCBmb3IgZGV0ZWN0aW9uIGJlY2F1c2UgYWNjZXNzaW5nIHRoZSBwcm9wZXJ0aWVzIGFsc28gdGhyb3dzIGEgVHlwZUVycm9yLiBKdXN0IGNoZWNrIHRoZSB0eXBlIGluc3RlYWQuIEZpbGVkIGFzIEFwcGxlIGJ1ZyAjMTUxMjI3MjQuXG5cdFx0aWYgKGRldmljZUlzSU9TICYmIHRhcmdldEVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UgJiYgdGFyZ2V0RWxlbWVudC50eXBlLmluZGV4T2YoJ2RhdGUnKSAhPT0gMCAmJiB0YXJnZXRFbGVtZW50LnR5cGUgIT09ICd0aW1lJyAmJiB0YXJnZXRFbGVtZW50LnR5cGUgIT09ICdtb250aCcpIHtcblx0XHRcdGxlbmd0aCA9IHRhcmdldEVsZW1lbnQudmFsdWUubGVuZ3RoO1xuXHRcdFx0dGFyZ2V0RWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShsZW5ndGgsIGxlbmd0aCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldEVsZW1lbnQuZm9jdXMoKTtcblx0XHR9XG5cdH07XG5cblxuXHQvKipcblx0ICogQ2hlY2sgd2hldGhlciB0aGUgZ2l2ZW4gdGFyZ2V0IGVsZW1lbnQgaXMgYSBjaGlsZCBvZiBhIHNjcm9sbGFibGUgbGF5ZXIgYW5kIGlmIHNvLCBzZXQgYSBmbGFnIG9uIGl0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fEVsZW1lbnR9IHRhcmdldEVsZW1lbnRcblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUudXBkYXRlU2Nyb2xsUGFyZW50ID0gZnVuY3Rpb24odGFyZ2V0RWxlbWVudCkge1xuXHRcdHZhciBzY3JvbGxQYXJlbnQsIHBhcmVudEVsZW1lbnQ7XG5cblx0XHRzY3JvbGxQYXJlbnQgPSB0YXJnZXRFbGVtZW50LmZhc3RDbGlja1Njcm9sbFBhcmVudDtcblxuXHRcdC8vIEF0dGVtcHQgdG8gZGlzY292ZXIgd2hldGhlciB0aGUgdGFyZ2V0IGVsZW1lbnQgaXMgY29udGFpbmVkIHdpdGhpbiBhIHNjcm9sbGFibGUgbGF5ZXIuIFJlLWNoZWNrIGlmIHRoZVxuXHRcdC8vIHRhcmdldCBlbGVtZW50IHdhcyBtb3ZlZCB0byBhbm90aGVyIHBhcmVudC5cblx0XHRpZiAoIXNjcm9sbFBhcmVudCB8fCAhc2Nyb2xsUGFyZW50LmNvbnRhaW5zKHRhcmdldEVsZW1lbnQpKSB7XG5cdFx0XHRwYXJlbnRFbGVtZW50ID0gdGFyZ2V0RWxlbWVudDtcblx0XHRcdGRvIHtcblx0XHRcdFx0aWYgKHBhcmVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0ID4gcGFyZW50RWxlbWVudC5vZmZzZXRIZWlnaHQpIHtcblx0XHRcdFx0XHRzY3JvbGxQYXJlbnQgPSBwYXJlbnRFbGVtZW50O1xuXHRcdFx0XHRcdHRhcmdldEVsZW1lbnQuZmFzdENsaWNrU2Nyb2xsUGFyZW50ID0gcGFyZW50RWxlbWVudDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHBhcmVudEVsZW1lbnQgPSBwYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0XHR9IHdoaWxlIChwYXJlbnRFbGVtZW50KTtcblx0XHR9XG5cblx0XHQvLyBBbHdheXMgdXBkYXRlIHRoZSBzY3JvbGwgdG9wIHRyYWNrZXIgaWYgcG9zc2libGUuXG5cdFx0aWYgKHNjcm9sbFBhcmVudCkge1xuXHRcdFx0c2Nyb2xsUGFyZW50LmZhc3RDbGlja0xhc3RTY3JvbGxUb3AgPSBzY3JvbGxQYXJlbnQuc2Nyb2xsVG9wO1xuXHRcdH1cblx0fTtcblxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fSB0YXJnZXRFbGVtZW50XG5cdCAqIEByZXR1cm5zIHtFbGVtZW50fEV2ZW50VGFyZ2V0fVxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5nZXRUYXJnZXRFbGVtZW50RnJvbUV2ZW50VGFyZ2V0ID0gZnVuY3Rpb24oZXZlbnRUYXJnZXQpIHtcblxuXHRcdC8vIE9uIHNvbWUgb2xkZXIgYnJvd3NlcnMgKG5vdGFibHkgU2FmYXJpIG9uIGlPUyA0LjEgLSBzZWUgaXNzdWUgIzU2KSB0aGUgZXZlbnQgdGFyZ2V0IG1heSBiZSBhIHRleHQgbm9kZS5cblx0XHRpZiAoZXZlbnRUYXJnZXQubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XG5cdFx0XHRyZXR1cm4gZXZlbnRUYXJnZXQucGFyZW50Tm9kZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZXZlbnRUYXJnZXQ7XG5cdH07XG5cblxuXHQvKipcblx0ICogT24gdG91Y2ggc3RhcnQsIHJlY29yZCB0aGUgcG9zaXRpb24gYW5kIHNjcm9sbCBvZmZzZXQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5vblRvdWNoU3RhcnQgPSBmdW5jdGlvbihldmVudCkge1xuXHRcdHZhciB0YXJnZXRFbGVtZW50LCB0b3VjaCwgc2VsZWN0aW9uO1xuXG5cdFx0Ly8gSWdub3JlIG11bHRpcGxlIHRvdWNoZXMsIG90aGVyd2lzZSBwaW5jaC10by16b29tIGlzIHByZXZlbnRlZCBpZiBib3RoIGZpbmdlcnMgYXJlIG9uIHRoZSBGYXN0Q2xpY2sgZWxlbWVudCAoaXNzdWUgIzExMSkuXG5cdFx0aWYgKGV2ZW50LnRhcmdldFRvdWNoZXMubGVuZ3RoID4gMSkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0dGFyZ2V0RWxlbWVudCA9IHRoaXMuZ2V0VGFyZ2V0RWxlbWVudEZyb21FdmVudFRhcmdldChldmVudC50YXJnZXQpO1xuXHRcdHRvdWNoID0gZXZlbnQudGFyZ2V0VG91Y2hlc1swXTtcblxuXHRcdGlmIChkZXZpY2VJc0lPUykge1xuXG5cdFx0XHQvLyBPbmx5IHRydXN0ZWQgZXZlbnRzIHdpbGwgZGVzZWxlY3QgdGV4dCBvbiBpT1MgKGlzc3VlICM0OSlcblx0XHRcdHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblx0XHRcdGlmIChzZWxlY3Rpb24ucmFuZ2VDb3VudCAmJiAhc2VsZWN0aW9uLmlzQ29sbGFwc2VkKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIWRldmljZUlzSU9TNCkge1xuXG5cdFx0XHRcdC8vIFdlaXJkIHRoaW5ncyBoYXBwZW4gb24gaU9TIHdoZW4gYW4gYWxlcnQgb3IgY29uZmlybSBkaWFsb2cgaXMgb3BlbmVkIGZyb20gYSBjbGljayBldmVudCBjYWxsYmFjayAoaXNzdWUgIzIzKTpcblx0XHRcdFx0Ly8gd2hlbiB0aGUgdXNlciBuZXh0IHRhcHMgYW55d2hlcmUgZWxzZSBvbiB0aGUgcGFnZSwgbmV3IHRvdWNoc3RhcnQgYW5kIHRvdWNoZW5kIGV2ZW50cyBhcmUgZGlzcGF0Y2hlZFxuXHRcdFx0XHQvLyB3aXRoIHRoZSBzYW1lIGlkZW50aWZpZXIgYXMgdGhlIHRvdWNoIGV2ZW50IHRoYXQgcHJldmlvdXNseSB0cmlnZ2VyZWQgdGhlIGNsaWNrIHRoYXQgdHJpZ2dlcmVkIHRoZSBhbGVydC5cblx0XHRcdFx0Ly8gU2FkbHksIHRoZXJlIGlzIGFuIGlzc3VlIG9uIGlPUyA0IHRoYXQgY2F1c2VzIHNvbWUgbm9ybWFsIHRvdWNoIGV2ZW50cyB0byBoYXZlIHRoZSBzYW1lIGlkZW50aWZpZXIgYXMgYW5cblx0XHRcdFx0Ly8gaW1tZWRpYXRlbHkgcHJlY2VlZGluZyB0b3VjaCBldmVudCAoaXNzdWUgIzUyKSwgc28gdGhpcyBmaXggaXMgdW5hdmFpbGFibGUgb24gdGhhdCBwbGF0Zm9ybS5cblx0XHRcdFx0Ly8gSXNzdWUgMTIwOiB0b3VjaC5pZGVudGlmaWVyIGlzIDAgd2hlbiBDaHJvbWUgZGV2IHRvb2xzICdFbXVsYXRlIHRvdWNoIGV2ZW50cycgaXMgc2V0IHdpdGggYW4gaU9TIGRldmljZSBVQSBzdHJpbmcsXG5cdFx0XHRcdC8vIHdoaWNoIGNhdXNlcyBhbGwgdG91Y2ggZXZlbnRzIHRvIGJlIGlnbm9yZWQuIEFzIHRoaXMgYmxvY2sgb25seSBhcHBsaWVzIHRvIGlPUywgYW5kIGlPUyBpZGVudGlmaWVycyBhcmUgYWx3YXlzIGxvbmcsXG5cdFx0XHRcdC8vIHJhbmRvbSBpbnRlZ2VycywgaXQncyBzYWZlIHRvIHRvIGNvbnRpbnVlIGlmIHRoZSBpZGVudGlmaWVyIGlzIDAgaGVyZS5cblx0XHRcdFx0aWYgKHRvdWNoLmlkZW50aWZpZXIgJiYgdG91Y2guaWRlbnRpZmllciA9PT0gdGhpcy5sYXN0VG91Y2hJZGVudGlmaWVyKSB7XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLmxhc3RUb3VjaElkZW50aWZpZXIgPSB0b3VjaC5pZGVudGlmaWVyO1xuXG5cdFx0XHRcdC8vIElmIHRoZSB0YXJnZXQgZWxlbWVudCBpcyBhIGNoaWxkIG9mIGEgc2Nyb2xsYWJsZSBsYXllciAodXNpbmcgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoKSBhbmQ6XG5cdFx0XHRcdC8vIDEpIHRoZSB1c2VyIGRvZXMgYSBmbGluZyBzY3JvbGwgb24gdGhlIHNjcm9sbGFibGUgbGF5ZXJcblx0XHRcdFx0Ly8gMikgdGhlIHVzZXIgc3RvcHMgdGhlIGZsaW5nIHNjcm9sbCB3aXRoIGFub3RoZXIgdGFwXG5cdFx0XHRcdC8vIHRoZW4gdGhlIGV2ZW50LnRhcmdldCBvZiB0aGUgbGFzdCAndG91Y2hlbmQnIGV2ZW50IHdpbGwgYmUgdGhlIGVsZW1lbnQgdGhhdCB3YXMgdW5kZXIgdGhlIHVzZXIncyBmaW5nZXJcblx0XHRcdFx0Ly8gd2hlbiB0aGUgZmxpbmcgc2Nyb2xsIHdhcyBzdGFydGVkLCBjYXVzaW5nIEZhc3RDbGljayB0byBzZW5kIGEgY2xpY2sgZXZlbnQgdG8gdGhhdCBsYXllciAtIHVubGVzcyBhIGNoZWNrXG5cdFx0XHRcdC8vIGlzIG1hZGUgdG8gZW5zdXJlIHRoYXQgYSBwYXJlbnQgbGF5ZXIgd2FzIG5vdCBzY3JvbGxlZCBiZWZvcmUgc2VuZGluZyBhIHN5bnRoZXRpYyBjbGljayAoaXNzdWUgIzQyKS5cblx0XHRcdFx0dGhpcy51cGRhdGVTY3JvbGxQYXJlbnQodGFyZ2V0RWxlbWVudCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy50cmFja2luZ0NsaWNrID0gdHJ1ZTtcblx0XHR0aGlzLnRyYWNraW5nQ2xpY2tTdGFydCA9IGV2ZW50LnRpbWVTdGFtcDtcblx0XHR0aGlzLnRhcmdldEVsZW1lbnQgPSB0YXJnZXRFbGVtZW50O1xuXG5cdFx0dGhpcy50b3VjaFN0YXJ0WCA9IHRvdWNoLnBhZ2VYO1xuXHRcdHRoaXMudG91Y2hTdGFydFkgPSB0b3VjaC5wYWdlWTtcblxuXHRcdC8vIFByZXZlbnQgcGhhbnRvbSBjbGlja3Mgb24gZmFzdCBkb3VibGUtdGFwIChpc3N1ZSAjMzYpXG5cdFx0aWYgKChldmVudC50aW1lU3RhbXAgLSB0aGlzLmxhc3RDbGlja1RpbWUpIDwgdGhpcy50YXBEZWxheSkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBCYXNlZCBvbiBhIHRvdWNobW92ZSBldmVudCBvYmplY3QsIGNoZWNrIHdoZXRoZXIgdGhlIHRvdWNoIGhhcyBtb3ZlZCBwYXN0IGEgYm91bmRhcnkgc2luY2UgaXQgc3RhcnRlZC5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnRcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLnRvdWNoSGFzTW92ZWQgPSBmdW5jdGlvbihldmVudCkge1xuXHRcdHZhciB0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLCBib3VuZGFyeSA9IHRoaXMudG91Y2hCb3VuZGFyeTtcblxuXHRcdGlmIChNYXRoLmFicyh0b3VjaC5wYWdlWCAtIHRoaXMudG91Y2hTdGFydFgpID4gYm91bmRhcnkgfHwgTWF0aC5hYnModG91Y2gucGFnZVkgLSB0aGlzLnRvdWNoU3RhcnRZKSA+IGJvdW5kYXJ5KSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG5cblxuXHQvKipcblx0ICogVXBkYXRlIHRoZSBsYXN0IHBvc2l0aW9uLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUub25Ub3VjaE1vdmUgPSBmdW5jdGlvbihldmVudCkge1xuXHRcdGlmICghdGhpcy50cmFja2luZ0NsaWNrKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvLyBJZiB0aGUgdG91Y2ggaGFzIG1vdmVkLCBjYW5jZWwgdGhlIGNsaWNrIHRyYWNraW5nXG5cdFx0aWYgKHRoaXMudGFyZ2V0RWxlbWVudCAhPT0gdGhpcy5nZXRUYXJnZXRFbGVtZW50RnJvbUV2ZW50VGFyZ2V0KGV2ZW50LnRhcmdldCkgfHwgdGhpcy50b3VjaEhhc01vdmVkKGV2ZW50KSkge1xuXHRcdFx0dGhpcy50cmFja2luZ0NsaWNrID0gZmFsc2U7XG5cdFx0XHR0aGlzLnRhcmdldEVsZW1lbnQgPSBudWxsO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIEF0dGVtcHQgdG8gZmluZCB0aGUgbGFiZWxsZWQgY29udHJvbCBmb3IgdGhlIGdpdmVuIGxhYmVsIGVsZW1lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnRUYXJnZXR8SFRNTExhYmVsRWxlbWVudH0gbGFiZWxFbGVtZW50XG5cdCAqIEByZXR1cm5zIHtFbGVtZW50fG51bGx9XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLmZpbmRDb250cm9sID0gZnVuY3Rpb24obGFiZWxFbGVtZW50KSB7XG5cblx0XHQvLyBGYXN0IHBhdGggZm9yIG5ld2VyIGJyb3dzZXJzIHN1cHBvcnRpbmcgdGhlIEhUTUw1IGNvbnRyb2wgYXR0cmlidXRlXG5cdFx0aWYgKGxhYmVsRWxlbWVudC5jb250cm9sICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiBsYWJlbEVsZW1lbnQuY29udHJvbDtcblx0XHR9XG5cblx0XHQvLyBBbGwgYnJvd3NlcnMgdW5kZXIgdGVzdCB0aGF0IHN1cHBvcnQgdG91Y2ggZXZlbnRzIGFsc28gc3VwcG9ydCB0aGUgSFRNTDUgaHRtbEZvciBhdHRyaWJ1dGVcblx0XHRpZiAobGFiZWxFbGVtZW50Lmh0bWxGb3IpIHtcblx0XHRcdHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChsYWJlbEVsZW1lbnQuaHRtbEZvcik7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgbm8gZm9yIGF0dHJpYnV0ZSBleGlzdHMsIGF0dGVtcHQgdG8gcmV0cmlldmUgdGhlIGZpcnN0IGxhYmVsbGFibGUgZGVzY2VuZGFudCBlbGVtZW50XG5cdFx0Ly8gdGhlIGxpc3Qgb2Ygd2hpY2ggaXMgZGVmaW5lZCBoZXJlOiBodHRwOi8vd3d3LnczLm9yZy9UUi9odG1sNS9mb3Jtcy5odG1sI2NhdGVnb3J5LWxhYmVsXG5cdFx0cmV0dXJuIGxhYmVsRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24sIGlucHV0Om5vdChbdHlwZT1oaWRkZW5dKSwga2V5Z2VuLCBtZXRlciwgb3V0cHV0LCBwcm9ncmVzcywgc2VsZWN0LCB0ZXh0YXJlYScpO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIE9uIHRvdWNoIGVuZCwgZGV0ZXJtaW5lIHdoZXRoZXIgdG8gc2VuZCBhIGNsaWNrIGV2ZW50IGF0IG9uY2UuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5vblRvdWNoRW5kID0gZnVuY3Rpb24oZXZlbnQpIHtcblx0XHR2YXIgZm9yRWxlbWVudCwgdHJhY2tpbmdDbGlja1N0YXJ0LCB0YXJnZXRUYWdOYW1lLCBzY3JvbGxQYXJlbnQsIHRvdWNoLCB0YXJnZXRFbGVtZW50ID0gdGhpcy50YXJnZXRFbGVtZW50O1xuXG5cdFx0aWYgKCF0aGlzLnRyYWNraW5nQ2xpY2spIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIFByZXZlbnQgcGhhbnRvbSBjbGlja3Mgb24gZmFzdCBkb3VibGUtdGFwIChpc3N1ZSAjMzYpXG5cdFx0aWYgKChldmVudC50aW1lU3RhbXAgLSB0aGlzLmxhc3RDbGlja1RpbWUpIDwgdGhpcy50YXBEZWxheSkge1xuXHRcdFx0dGhpcy5jYW5jZWxOZXh0Q2xpY2sgPSB0cnVlO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKChldmVudC50aW1lU3RhbXAgLSB0aGlzLnRyYWNraW5nQ2xpY2tTdGFydCkgPiB0aGlzLnRhcFRpbWVvdXQpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIFJlc2V0IHRvIHByZXZlbnQgd3JvbmcgY2xpY2sgY2FuY2VsIG9uIGlucHV0IChpc3N1ZSAjMTU2KS5cblx0XHR0aGlzLmNhbmNlbE5leHRDbGljayA9IGZhbHNlO1xuXG5cdFx0dGhpcy5sYXN0Q2xpY2tUaW1lID0gZXZlbnQudGltZVN0YW1wO1xuXG5cdFx0dHJhY2tpbmdDbGlja1N0YXJ0ID0gdGhpcy50cmFja2luZ0NsaWNrU3RhcnQ7XG5cdFx0dGhpcy50cmFja2luZ0NsaWNrID0gZmFsc2U7XG5cdFx0dGhpcy50cmFja2luZ0NsaWNrU3RhcnQgPSAwO1xuXG5cdFx0Ly8gT24gc29tZSBpT1MgZGV2aWNlcywgdGhlIHRhcmdldEVsZW1lbnQgc3VwcGxpZWQgd2l0aCB0aGUgZXZlbnQgaXMgaW52YWxpZCBpZiB0aGUgbGF5ZXJcblx0XHQvLyBpcyBwZXJmb3JtaW5nIGEgdHJhbnNpdGlvbiBvciBzY3JvbGwsIGFuZCBoYXMgdG8gYmUgcmUtZGV0ZWN0ZWQgbWFudWFsbHkuIE5vdGUgdGhhdFxuXHRcdC8vIGZvciB0aGlzIHRvIGZ1bmN0aW9uIGNvcnJlY3RseSwgaXQgbXVzdCBiZSBjYWxsZWQgKmFmdGVyKiB0aGUgZXZlbnQgdGFyZ2V0IGlzIGNoZWNrZWQhXG5cdFx0Ly8gU2VlIGlzc3VlICM1NzsgYWxzbyBmaWxlZCBhcyByZGFyOi8vMTMwNDg1ODkgLlxuXHRcdGlmIChkZXZpY2VJc0lPU1dpdGhCYWRUYXJnZXQpIHtcblx0XHRcdHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG5cblx0XHRcdC8vIEluIGNlcnRhaW4gY2FzZXMgYXJndW1lbnRzIG9mIGVsZW1lbnRGcm9tUG9pbnQgY2FuIGJlIG5lZ2F0aXZlLCBzbyBwcmV2ZW50IHNldHRpbmcgdGFyZ2V0RWxlbWVudCB0byBudWxsXG5cdFx0XHR0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludCh0b3VjaC5wYWdlWCAtIHdpbmRvdy5wYWdlWE9mZnNldCwgdG91Y2gucGFnZVkgLSB3aW5kb3cucGFnZVlPZmZzZXQpIHx8IHRhcmdldEVsZW1lbnQ7XG5cdFx0XHR0YXJnZXRFbGVtZW50LmZhc3RDbGlja1Njcm9sbFBhcmVudCA9IHRoaXMudGFyZ2V0RWxlbWVudC5mYXN0Q2xpY2tTY3JvbGxQYXJlbnQ7XG5cdFx0fVxuXG5cdFx0dGFyZ2V0VGFnTmFtZSA9IHRhcmdldEVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdGlmICh0YXJnZXRUYWdOYW1lID09PSAnbGFiZWwnKSB7XG5cdFx0XHRmb3JFbGVtZW50ID0gdGhpcy5maW5kQ29udHJvbCh0YXJnZXRFbGVtZW50KTtcblx0XHRcdGlmIChmb3JFbGVtZW50KSB7XG5cdFx0XHRcdHRoaXMuZm9jdXModGFyZ2V0RWxlbWVudCk7XG5cdFx0XHRcdGlmIChkZXZpY2VJc0FuZHJvaWQpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0YXJnZXRFbGVtZW50ID0gZm9yRWxlbWVudDtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKHRoaXMubmVlZHNGb2N1cyh0YXJnZXRFbGVtZW50KSkge1xuXG5cdFx0XHQvLyBDYXNlIDE6IElmIHRoZSB0b3VjaCBzdGFydGVkIGEgd2hpbGUgYWdvIChiZXN0IGd1ZXNzIGlzIDEwMG1zIGJhc2VkIG9uIHRlc3RzIGZvciBpc3N1ZSAjMzYpIHRoZW4gZm9jdXMgd2lsbCBiZSB0cmlnZ2VyZWQgYW55d2F5LiBSZXR1cm4gZWFybHkgYW5kIHVuc2V0IHRoZSB0YXJnZXQgZWxlbWVudCByZWZlcmVuY2Ugc28gdGhhdCB0aGUgc3Vic2VxdWVudCBjbGljayB3aWxsIGJlIGFsbG93ZWQgdGhyb3VnaC5cblx0XHRcdC8vIENhc2UgMjogV2l0aG91dCB0aGlzIGV4Y2VwdGlvbiBmb3IgaW5wdXQgZWxlbWVudHMgdGFwcGVkIHdoZW4gdGhlIGRvY3VtZW50IGlzIGNvbnRhaW5lZCBpbiBhbiBpZnJhbWUsIHRoZW4gYW55IGlucHV0dGVkIHRleHQgd29uJ3QgYmUgdmlzaWJsZSBldmVuIHRob3VnaCB0aGUgdmFsdWUgYXR0cmlidXRlIGlzIHVwZGF0ZWQgYXMgdGhlIHVzZXIgdHlwZXMgKGlzc3VlICMzNykuXG5cdFx0XHRpZiAoKGV2ZW50LnRpbWVTdGFtcCAtIHRyYWNraW5nQ2xpY2tTdGFydCkgPiAxMDAgfHwgKGRldmljZUlzSU9TICYmIHdpbmRvdy50b3AgIT09IHdpbmRvdyAmJiB0YXJnZXRUYWdOYW1lID09PSAnaW5wdXQnKSkge1xuXHRcdFx0XHR0aGlzLnRhcmdldEVsZW1lbnQgPSBudWxsO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuZm9jdXModGFyZ2V0RWxlbWVudCk7XG5cdFx0XHR0aGlzLnNlbmRDbGljayh0YXJnZXRFbGVtZW50LCBldmVudCk7XG5cblx0XHRcdC8vIFNlbGVjdCBlbGVtZW50cyBuZWVkIHRoZSBldmVudCB0byBnbyB0aHJvdWdoIG9uIGlPUyA0LCBvdGhlcndpc2UgdGhlIHNlbGVjdG9yIG1lbnUgd29uJ3Qgb3Blbi5cblx0XHRcdC8vIEFsc28gdGhpcyBicmVha3Mgb3BlbmluZyBzZWxlY3RzIHdoZW4gVm9pY2VPdmVyIGlzIGFjdGl2ZSBvbiBpT1M2LCBpT1M3IChhbmQgcG9zc2libHkgb3RoZXJzKVxuXHRcdFx0aWYgKCFkZXZpY2VJc0lPUyB8fCB0YXJnZXRUYWdOYW1lICE9PSAnc2VsZWN0Jykge1xuXHRcdFx0XHR0aGlzLnRhcmdldEVsZW1lbnQgPSBudWxsO1xuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYgKGRldmljZUlzSU9TICYmICFkZXZpY2VJc0lPUzQpIHtcblxuXHRcdFx0Ly8gRG9uJ3Qgc2VuZCBhIHN5bnRoZXRpYyBjbGljayBldmVudCBpZiB0aGUgdGFyZ2V0IGVsZW1lbnQgaXMgY29udGFpbmVkIHdpdGhpbiBhIHBhcmVudCBsYXllciB0aGF0IHdhcyBzY3JvbGxlZFxuXHRcdFx0Ly8gYW5kIHRoaXMgdGFwIGlzIGJlaW5nIHVzZWQgdG8gc3RvcCB0aGUgc2Nyb2xsaW5nICh1c3VhbGx5IGluaXRpYXRlZCBieSBhIGZsaW5nIC0gaXNzdWUgIzQyKS5cblx0XHRcdHNjcm9sbFBhcmVudCA9IHRhcmdldEVsZW1lbnQuZmFzdENsaWNrU2Nyb2xsUGFyZW50O1xuXHRcdFx0aWYgKHNjcm9sbFBhcmVudCAmJiBzY3JvbGxQYXJlbnQuZmFzdENsaWNrTGFzdFNjcm9sbFRvcCAhPT0gc2Nyb2xsUGFyZW50LnNjcm9sbFRvcCkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBQcmV2ZW50IHRoZSBhY3R1YWwgY2xpY2sgZnJvbSBnb2luZyB0aG91Z2ggLSB1bmxlc3MgdGhlIHRhcmdldCBub2RlIGlzIG1hcmtlZCBhcyByZXF1aXJpbmdcblx0XHQvLyByZWFsIGNsaWNrcyBvciBpZiBpdCBpcyBpbiB0aGUgd2hpdGVsaXN0IGluIHdoaWNoIGNhc2Ugb25seSBub24tcHJvZ3JhbW1hdGljIGNsaWNrcyBhcmUgcGVybWl0dGVkLlxuXHRcdGlmICghdGhpcy5uZWVkc0NsaWNrKHRhcmdldEVsZW1lbnQpKSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy5zZW5kQ2xpY2sodGFyZ2V0RWxlbWVudCwgZXZlbnQpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBPbiB0b3VjaCBjYW5jZWwsIHN0b3AgdHJhY2tpbmcgdGhlIGNsaWNrLlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUub25Ub3VjaENhbmNlbCA9IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMudHJhY2tpbmdDbGljayA9IGZhbHNlO1xuXHRcdHRoaXMudGFyZ2V0RWxlbWVudCA9IG51bGw7XG5cdH07XG5cblxuXHQvKipcblx0ICogRGV0ZXJtaW5lIG1vdXNlIGV2ZW50cyB3aGljaCBzaG91bGQgYmUgcGVybWl0dGVkLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUub25Nb3VzZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cblx0XHQvLyBJZiBhIHRhcmdldCBlbGVtZW50IHdhcyBuZXZlciBzZXQgKGJlY2F1c2UgYSB0b3VjaCBldmVudCB3YXMgbmV2ZXIgZmlyZWQpIGFsbG93IHRoZSBldmVudFxuXHRcdGlmICghdGhpcy50YXJnZXRFbGVtZW50KSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAoZXZlbnQuZm9yd2FyZGVkVG91Y2hFdmVudCkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Ly8gUHJvZ3JhbW1hdGljYWxseSBnZW5lcmF0ZWQgZXZlbnRzIHRhcmdldGluZyBhIHNwZWNpZmljIGVsZW1lbnQgc2hvdWxkIGJlIHBlcm1pdHRlZFxuXHRcdGlmICghZXZlbnQuY2FuY2VsYWJsZSkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Ly8gRGVyaXZlIGFuZCBjaGVjayB0aGUgdGFyZ2V0IGVsZW1lbnQgdG8gc2VlIHdoZXRoZXIgdGhlIG1vdXNlIGV2ZW50IG5lZWRzIHRvIGJlIHBlcm1pdHRlZDtcblx0XHQvLyB1bmxlc3MgZXhwbGljaXRseSBlbmFibGVkLCBwcmV2ZW50IG5vbi10b3VjaCBjbGljayBldmVudHMgZnJvbSB0cmlnZ2VyaW5nIGFjdGlvbnMsXG5cdFx0Ly8gdG8gcHJldmVudCBnaG9zdC9kb3VibGVjbGlja3MuXG5cdFx0aWYgKCF0aGlzLm5lZWRzQ2xpY2sodGhpcy50YXJnZXRFbGVtZW50KSB8fCB0aGlzLmNhbmNlbE5leHRDbGljaykge1xuXG5cdFx0XHQvLyBQcmV2ZW50IGFueSB1c2VyLWFkZGVkIGxpc3RlbmVycyBkZWNsYXJlZCBvbiBGYXN0Q2xpY2sgZWxlbWVudCBmcm9tIGJlaW5nIGZpcmVkLlxuXHRcdFx0aWYgKGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbikge1xuXHRcdFx0XHRldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0Ly8gUGFydCBvZiB0aGUgaGFjayBmb3IgYnJvd3NlcnMgdGhhdCBkb24ndCBzdXBwb3J0IEV2ZW50I3N0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiAoZS5nLiBBbmRyb2lkIDIpXG5cdFx0XHRcdGV2ZW50LnByb3BhZ2F0aW9uU3RvcHBlZCA9IHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENhbmNlbCB0aGUgZXZlbnRcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIElmIHRoZSBtb3VzZSBldmVudCBpcyBwZXJtaXR0ZWQsIHJldHVybiB0cnVlIGZvciB0aGUgYWN0aW9uIHRvIGdvIHRocm91Z2guXG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG5cblxuXHQvKipcblx0ICogT24gYWN0dWFsIGNsaWNrcywgZGV0ZXJtaW5lIHdoZXRoZXIgdGhpcyBpcyBhIHRvdWNoLWdlbmVyYXRlZCBjbGljaywgYSBjbGljayBhY3Rpb24gb2NjdXJyaW5nXG5cdCAqIG5hdHVyYWxseSBhZnRlciBhIGRlbGF5IGFmdGVyIGEgdG91Y2ggKHdoaWNoIG5lZWRzIHRvIGJlIGNhbmNlbGxlZCB0byBhdm9pZCBkdXBsaWNhdGlvbiksIG9yXG5cdCAqIGFuIGFjdHVhbCBjbGljayB3aGljaCBzaG91bGQgYmUgcGVybWl0dGVkLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUub25DbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0dmFyIHBlcm1pdHRlZDtcblxuXHRcdC8vIEl0J3MgcG9zc2libGUgZm9yIGFub3RoZXIgRmFzdENsaWNrLWxpa2UgbGlicmFyeSBkZWxpdmVyZWQgd2l0aCB0aGlyZC1wYXJ0eSBjb2RlIHRvIGZpcmUgYSBjbGljayBldmVudCBiZWZvcmUgRmFzdENsaWNrIGRvZXMgKGlzc3VlICM0NCkuIEluIHRoYXQgY2FzZSwgc2V0IHRoZSBjbGljay10cmFja2luZyBmbGFnIGJhY2sgdG8gZmFsc2UgYW5kIHJldHVybiBlYXJseS4gVGhpcyB3aWxsIGNhdXNlIG9uVG91Y2hFbmQgdG8gcmV0dXJuIGVhcmx5LlxuXHRcdGlmICh0aGlzLnRyYWNraW5nQ2xpY2spIHtcblx0XHRcdHRoaXMudGFyZ2V0RWxlbWVudCA9IG51bGw7XG5cdFx0XHR0aGlzLnRyYWNraW5nQ2xpY2sgPSBmYWxzZTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIFZlcnkgb2RkIGJlaGF2aW91ciBvbiBpT1MgKGlzc3VlICMxOCk6IGlmIGEgc3VibWl0IGVsZW1lbnQgaXMgcHJlc2VudCBpbnNpZGUgYSBmb3JtIGFuZCB0aGUgdXNlciBoaXRzIGVudGVyIGluIHRoZSBpT1Mgc2ltdWxhdG9yIG9yIGNsaWNrcyB0aGUgR28gYnV0dG9uIG9uIHRoZSBwb3AtdXAgT1Mga2V5Ym9hcmQgdGhlIGEga2luZCBvZiAnZmFrZScgY2xpY2sgZXZlbnQgd2lsbCBiZSB0cmlnZ2VyZWQgd2l0aCB0aGUgc3VibWl0LXR5cGUgaW5wdXQgZWxlbWVudCBhcyB0aGUgdGFyZ2V0LlxuXHRcdGlmIChldmVudC50YXJnZXQudHlwZSA9PT0gJ3N1Ym1pdCcgJiYgZXZlbnQuZGV0YWlsID09PSAwKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRwZXJtaXR0ZWQgPSB0aGlzLm9uTW91c2UoZXZlbnQpO1xuXG5cdFx0Ly8gT25seSB1bnNldCB0YXJnZXRFbGVtZW50IGlmIHRoZSBjbGljayBpcyBub3QgcGVybWl0dGVkLiBUaGlzIHdpbGwgZW5zdXJlIHRoYXQgdGhlIGNoZWNrIGZvciAhdGFyZ2V0RWxlbWVudCBpbiBvbk1vdXNlIGZhaWxzIGFuZCB0aGUgYnJvd3NlcidzIGNsaWNrIGRvZXNuJ3QgZ28gdGhyb3VnaC5cblx0XHRpZiAoIXBlcm1pdHRlZCkge1xuXHRcdFx0dGhpcy50YXJnZXRFbGVtZW50ID0gbnVsbDtcblx0XHR9XG5cblx0XHQvLyBJZiBjbGlja3MgYXJlIHBlcm1pdHRlZCwgcmV0dXJuIHRydWUgZm9yIHRoZSBhY3Rpb24gdG8gZ28gdGhyb3VnaC5cblx0XHRyZXR1cm4gcGVybWl0dGVkO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIFJlbW92ZSBhbGwgRmFzdENsaWNrJ3MgZXZlbnQgbGlzdGVuZXJzLlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBsYXllciA9IHRoaXMubGF5ZXI7XG5cblx0XHRpZiAoZGV2aWNlSXNBbmRyb2lkKSB7XG5cdFx0XHRsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCB0aGlzLm9uTW91c2UsIHRydWUpO1xuXHRcdFx0bGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlLCB0cnVlKTtcblx0XHRcdGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uTW91c2UsIHRydWUpO1xuXHRcdH1cblxuXHRcdGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNsaWNrLCB0cnVlKTtcblx0XHRsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5vblRvdWNoU3RhcnQsIGZhbHNlKTtcblx0XHRsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm9uVG91Y2hNb3ZlLCBmYWxzZSk7XG5cdFx0bGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLm9uVG91Y2hFbmQsIGZhbHNlKTtcblx0XHRsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXMub25Ub3VjaENhbmNlbCwgZmFsc2UpO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIENoZWNrIHdoZXRoZXIgRmFzdENsaWNrIGlzIG5lZWRlZC5cblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBsYXllciBUaGUgbGF5ZXIgdG8gbGlzdGVuIG9uXG5cdCAqL1xuXHRGYXN0Q2xpY2subm90TmVlZGVkID0gZnVuY3Rpb24obGF5ZXIpIHtcblx0XHR2YXIgbWV0YVZpZXdwb3J0O1xuXHRcdHZhciBjaHJvbWVWZXJzaW9uO1xuXHRcdHZhciBibGFja2JlcnJ5VmVyc2lvbjtcblx0XHR2YXIgZmlyZWZveFZlcnNpb247XG5cblx0XHQvLyBEZXZpY2VzIHRoYXQgZG9uJ3Qgc3VwcG9ydCB0b3VjaCBkb24ndCBuZWVkIEZhc3RDbGlja1xuXHRcdGlmICh0eXBlb2Ygd2luZG93Lm9udG91Y2hzdGFydCA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIENocm9tZSB2ZXJzaW9uIC0gemVybyBmb3Igb3RoZXIgYnJvd3NlcnNcblx0XHRjaHJvbWVWZXJzaW9uID0gKygvQ2hyb21lXFwvKFswLTldKykvLmV4ZWMobmF2aWdhdG9yLnVzZXJBZ2VudCkgfHwgWywwXSlbMV07XG5cblx0XHRpZiAoY2hyb21lVmVyc2lvbikge1xuXG5cdFx0XHRpZiAoZGV2aWNlSXNBbmRyb2lkKSB7XG5cdFx0XHRcdG1ldGFWaWV3cG9ydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT12aWV3cG9ydF0nKTtcblxuXHRcdFx0XHRpZiAobWV0YVZpZXdwb3J0KSB7XG5cdFx0XHRcdFx0Ly8gQ2hyb21lIG9uIEFuZHJvaWQgd2l0aCB1c2VyLXNjYWxhYmxlPVwibm9cIiBkb2Vzbid0IG5lZWQgRmFzdENsaWNrIChpc3N1ZSAjODkpXG5cdFx0XHRcdFx0aWYgKG1ldGFWaWV3cG9ydC5jb250ZW50LmluZGV4T2YoJ3VzZXItc2NhbGFibGU9bm8nKSAhPT0gLTEpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBDaHJvbWUgMzIgYW5kIGFib3ZlIHdpdGggd2lkdGg9ZGV2aWNlLXdpZHRoIG9yIGxlc3MgZG9uJ3QgbmVlZCBGYXN0Q2xpY2tcblx0XHRcdFx0XHRpZiAoY2hyb21lVmVyc2lvbiA+IDMxICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxXaWR0aCA8PSB3aW5kb3cub3V0ZXJXaWR0aCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdC8vIENocm9tZSBkZXNrdG9wIGRvZXNuJ3QgbmVlZCBGYXN0Q2xpY2sgKGlzc3VlICMxNSlcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChkZXZpY2VJc0JsYWNrQmVycnkxMCkge1xuXHRcdFx0YmxhY2tiZXJyeVZlcnNpb24gPSBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9WZXJzaW9uXFwvKFswLTldKilcXC4oWzAtOV0qKS8pO1xuXG5cdFx0XHQvLyBCbGFja0JlcnJ5IDEwLjMrIGRvZXMgbm90IHJlcXVpcmUgRmFzdGNsaWNrIGxpYnJhcnkuXG5cdFx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vZnRsYWJzL2Zhc3RjbGljay9pc3N1ZXMvMjUxXG5cdFx0XHRpZiAoYmxhY2tiZXJyeVZlcnNpb25bMV0gPj0gMTAgJiYgYmxhY2tiZXJyeVZlcnNpb25bMl0gPj0gMykge1xuXHRcdFx0XHRtZXRhVmlld3BvcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9dmlld3BvcnRdJyk7XG5cblx0XHRcdFx0aWYgKG1ldGFWaWV3cG9ydCkge1xuXHRcdFx0XHRcdC8vIHVzZXItc2NhbGFibGU9bm8gZWxpbWluYXRlcyBjbGljayBkZWxheS5cblx0XHRcdFx0XHRpZiAobWV0YVZpZXdwb3J0LmNvbnRlbnQuaW5kZXhPZigndXNlci1zY2FsYWJsZT1ubycpICE9PSAtMSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIHdpZHRoPWRldmljZS13aWR0aCAob3IgbGVzcyB0aGFuIGRldmljZS13aWR0aCkgZWxpbWluYXRlcyBjbGljayBkZWxheS5cblx0XHRcdFx0XHRpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFdpZHRoIDw9IHdpbmRvdy5vdXRlcldpZHRoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBJRTEwIHdpdGggLW1zLXRvdWNoLWFjdGlvbjogbm9uZSBvciBtYW5pcHVsYXRpb24sIHdoaWNoIGRpc2FibGVzIGRvdWJsZS10YXAtdG8tem9vbSAoaXNzdWUgIzk3KVxuXHRcdGlmIChsYXllci5zdHlsZS5tc1RvdWNoQWN0aW9uID09PSAnbm9uZScgfHwgbGF5ZXIuc3R5bGUudG91Y2hBY3Rpb24gPT09ICdtYW5pcHVsYXRpb24nKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvLyBGaXJlZm94IHZlcnNpb24gLSB6ZXJvIGZvciBvdGhlciBicm93c2Vyc1xuXHRcdGZpcmVmb3hWZXJzaW9uID0gKygvRmlyZWZveFxcLyhbMC05XSspLy5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQpIHx8IFssMF0pWzFdO1xuXG5cdFx0aWYgKGZpcmVmb3hWZXJzaW9uID49IDI3KSB7XG5cdFx0XHQvLyBGaXJlZm94IDI3KyBkb2VzIG5vdCBoYXZlIHRhcCBkZWxheSBpZiB0aGUgY29udGVudCBpcyBub3Qgem9vbWFibGUgLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD05MjI4OTZcblxuXHRcdFx0bWV0YVZpZXdwb3J0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPXZpZXdwb3J0XScpO1xuXHRcdFx0aWYgKG1ldGFWaWV3cG9ydCAmJiAobWV0YVZpZXdwb3J0LmNvbnRlbnQuaW5kZXhPZigndXNlci1zY2FsYWJsZT1ubycpICE9PSAtMSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsV2lkdGggPD0gd2luZG93Lm91dGVyV2lkdGgpKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIElFMTE6IHByZWZpeGVkIC1tcy10b3VjaC1hY3Rpb24gaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCBhbmQgaXQncyByZWNvbWVuZGVkIHRvIHVzZSBub24tcHJlZml4ZWQgdmVyc2lvblxuXHRcdC8vIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS93aW5kb3dzL2FwcHMvSGg3NjczMTMuYXNweFxuXHRcdGlmIChsYXllci5zdHlsZS50b3VjaEFjdGlvbiA9PT0gJ25vbmUnIHx8IGxheWVyLnN0eWxlLnRvdWNoQWN0aW9uID09PSAnbWFuaXB1bGF0aW9uJykge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIEZhY3RvcnkgbWV0aG9kIGZvciBjcmVhdGluZyBhIEZhc3RDbGljayBvYmplY3Rcblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBsYXllciBUaGUgbGF5ZXIgdG8gbGlzdGVuIG9uXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHRzXG5cdCAqL1xuXHRGYXN0Q2xpY2suYXR0YWNoID0gZnVuY3Rpb24obGF5ZXIsIG9wdGlvbnMpIHtcblx0XHRyZXR1cm4gbmV3IEZhc3RDbGljayhsYXllciwgb3B0aW9ucyk7XG5cdH07XG5cblxuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuXG5cdFx0Ly8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuXHRcdGRlZmluZShmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBGYXN0Q2xpY2s7XG5cdFx0fSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IEZhc3RDbGljay5hdHRhY2g7XG5cdFx0bW9kdWxlLmV4cG9ydHMuRmFzdENsaWNrID0gRmFzdENsaWNrO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5GYXN0Q2xpY2sgPSBGYXN0Q2xpY2s7XG5cdH1cbn0oKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9mYXN0Y2xpY2svbGliL2Zhc3RjbGljay5qc1xuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE3IE1hcnRpbiBEb25hdGggPG1hcnRpbi5kb25hdGhAc3F1aWRmdW5rLmNvbT5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0b1xuICogZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGVcbiAqIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vclxuICogc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTi1JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkdcbiAqIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1NcbiAqIElOIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgRXZlbnQgZnJvbSBcIi4vTWF0ZXJpYWwvRXZlbnRcIlxuaW1wb3J0IEhlYWRlciBmcm9tIFwiLi9NYXRlcmlhbC9IZWFkZXJcIlxuaW1wb3J0IE5hdiBmcm9tIFwiLi9NYXRlcmlhbC9OYXZcIlxuaW1wb3J0IFNlYXJjaCBmcm9tIFwiLi9NYXRlcmlhbC9TZWFyY2hcIlxuaW1wb3J0IFNpZGViYXIgZnJvbSBcIi4vTWF0ZXJpYWwvU2lkZWJhclwiXG5pbXBvcnQgU291cmNlIGZyb20gXCIuL01hdGVyaWFsL1NvdXJjZVwiXG5pbXBvcnQgVGFicyBmcm9tIFwiLi9NYXRlcmlhbC9UYWJzXCJcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogTW9kdWxlXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgRXZlbnQsXG4gIEhlYWRlcixcbiAgTmF2LFxuICBTZWFyY2gsXG4gIFNpZGViYXIsXG4gIFNvdXJjZSxcbiAgVGFic1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01hdGVyaWFsLmpzIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE3IE1hcnRpbiBEb25hdGggPG1hcnRpbi5kb25hdGhAc3F1aWRmdW5rLmNvbT5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0b1xuICogZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGVcbiAqIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vclxuICogc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTi1JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkdcbiAqIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1NcbiAqIElOIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgTGlzdGVuZXIgZnJvbSBcIi4vRXZlbnQvTGlzdGVuZXJcIlxuaW1wb3J0IE1hdGNoTWVkaWEgZnJvbSBcIi4vRXZlbnQvTWF0Y2hNZWRpYVwiXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIE1vZHVsZVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIExpc3RlbmVyLFxuICBNYXRjaE1lZGlhXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvTWF0ZXJpYWwvRXZlbnQuanMiLCIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTcgTWFydGluIERvbmF0aCA8bWFydGluLmRvbmF0aEBzcXVpZGZ1bmsuY29tPlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvXG4gKiBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZVxuICogcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yXG4gKiBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OLUlORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuICogRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HU1xuICogSU4gVEhFIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCBMaXN0ZW5lciBmcm9tIFwiLi9MaXN0ZW5lclwiIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ2xhc3NcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWF0Y2hNZWRpYSB7XG5cbiAgLyoqXG4gICAqIE1lZGlhIHF1ZXJ5IGxpc3RlbmVyXG4gICAqXG4gICAqIFRoaXMgY2xhc3MgbGlzdGVucyBmb3Igc3RhdGUgY2hhbmdlcyBvZiBtZWRpYSBxdWVyaWVzIGFuZCBhdXRvbWF0aWNhbGx5XG4gICAqIHN3aXRjaGVzIHRoZSBnaXZlbiBsaXN0ZW5lcnMgb24gb3Igb2ZmLlxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICpcbiAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gaGFuZGxlcl8gLSBNZWRpYSBxdWVyeSBldmVudCBoYW5kbGVyXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeSAtIE1lZGlhIHF1ZXJ5IHRvIHRlc3QgZm9yXG4gICAqIEBwYXJhbSB7TGlzdGVuZXJ9IGxpc3RlbmVyIC0gRXZlbnQgbGlzdGVuZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKHF1ZXJ5LCBsaXN0ZW5lcikge1xuICAgIHRoaXMuaGFuZGxlcl8gPSBtcSA9PiB7XG4gICAgICBpZiAobXEubWF0Y2hlcylcbiAgICAgICAgbGlzdGVuZXIubGlzdGVuKClcbiAgICAgIGVsc2VcbiAgICAgICAgbGlzdGVuZXIudW5saXN0ZW4oKVxuICAgIH1cblxuICAgIC8qIEluaXRpYWxpemUgbWVkaWEgcXVlcnkgbGlzdGVuZXIgKi9cbiAgICBjb25zdCBtZWRpYSA9IHdpbmRvdy5tYXRjaE1lZGlhKHF1ZXJ5KVxuICAgIG1lZGlhLmFkZExpc3RlbmVyKHRoaXMuaGFuZGxlcl8pXG5cbiAgICAvKiBBbHdheXMgY2hlY2sgYXQgaW5pdGlhbGl6YXRpb24gKi9cbiAgICB0aGlzLmhhbmRsZXJfKG1lZGlhKVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvTWF0ZXJpYWwvRXZlbnQvTWF0Y2hNZWRpYS5qcyIsIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxNyBNYXJ0aW4gRG9uYXRoIDxtYXJ0aW4uZG9uYXRoQHNxdWlkZnVuay5jb20+XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG9cbiAqIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlXG4gKiByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3JcbiAqIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04tSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HXG4gKiBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTXG4gKiBJTiBUSEUgU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IFNoYWRvdyBmcm9tIFwiLi9IZWFkZXIvU2hhZG93XCJcbmltcG9ydCBUaXRsZSBmcm9tIFwiLi9IZWFkZXIvVGl0bGVcIlxuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBNb2R1bGVcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuZXhwb3J0IGRlZmF1bHQge1xuICBTaGFkb3csXG4gIFRpdGxlXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvTWF0ZXJpYWwvSGVhZGVyLmpzIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE3IE1hcnRpbiBEb25hdGggPG1hcnRpbi5kb25hdGhAc3F1aWRmdW5rLmNvbT5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0b1xuICogZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGVcbiAqIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vclxuICogc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTi1JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkdcbiAqIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1NcbiAqIElOIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDbGFzc1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFkb3cge1xuXG4gIC8qKlxuICAgKiBTaG93IG9yIGhpZGUgaGVhZGVyIHNoYWRvdyBkZXBlbmRpbmcgb24gcGFnZSB5LW9mZnNldFxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICpcbiAgICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gZWxfIC0gQ29udGVudCBjb250YWluZXJcbiAgICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gaGVhZGVyXyAtIEhlYWRlclxuICAgKiBAcHJvcGVydHkge251bWJlcn0gaGVpZ2h0XyAtIE9mZnNldCBoZWlnaHQgb2YgcHJldmlvdXMgbm9kZXNcbiAgICogQHByb3BlcnR5IHtib29sZWFufSBhY3RpdmVfIC0gSGVhZGVyIHNoYWRvdyBzdGF0ZVxuICAgKlxuICAgKiBAcGFyYW0geyhzdHJpbmd8SFRNTEVsZW1lbnQpfSBlbCAtIFNlbGVjdG9yIG9yIEhUTUwgZWxlbWVudFxuICAgKiBAcGFyYW0geyhzdHJpbmd8SFRNTEVsZW1lbnQpfSBoZWFkZXIgLSBTZWxlY3RvciBvciBIVE1MIGVsZW1lbnRcbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsLCBoZWFkZXIpIHtcbiAgICBsZXQgcmVmID0gKHR5cGVvZiBlbCA9PT0gXCJzdHJpbmdcIilcbiAgICAgID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbClcbiAgICAgIDogZWxcbiAgICBpZiAoIShyZWYgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkgfHxcbiAgICAgICAgIShyZWYucGFyZW50Tm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSlcbiAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuICAgIHRoaXMuZWxfID0gcmVmLnBhcmVudE5vZGVcblxuICAgIC8qIFJldHJpZXZlIGhlYWRlciAqL1xuICAgIHJlZiA9ICh0eXBlb2YgaGVhZGVyID09PSBcInN0cmluZ1wiKVxuICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGhlYWRlcilcbiAgICAgIDogaGVhZGVyXG4gICAgaWYgKCEocmVmIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKVxuICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yXG4gICAgdGhpcy5oZWFkZXJfID0gcmVmXG5cbiAgICAvKiBJbml0aWFsaXplIGhlaWdodCBhbmQgc3RhdGUgKi9cbiAgICB0aGlzLmhlaWdodF8gPSAwXG4gICAgdGhpcy5hY3RpdmVfID0gZmFsc2VcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdG90YWwgaGVpZ2h0IG9mIHByZXZpb3VzIG5vZGVzXG4gICAqL1xuICBzZXR1cCgpIHtcbiAgICBsZXQgY3VycmVudCA9IHRoaXMuZWxfXG4gICAgd2hpbGUgKChjdXJyZW50ID0gY3VycmVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSkge1xuICAgICAgaWYgKCEoY3VycmVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSlcbiAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yXG4gICAgICB0aGlzLmhlaWdodF8gKz0gY3VycmVudC5vZmZzZXRIZWlnaHRcbiAgICB9XG4gICAgdGhpcy51cGRhdGUoKVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBzaGFkb3cgc3RhdGVcbiAgICpcbiAgICogQHBhcmFtIHtFdmVudH0gZXYgLSBFdmVudFxuICAgKi9cbiAgdXBkYXRlKGV2KSB7XG4gICAgaWYgKGV2ICYmIChldi50eXBlID09PSBcInJlc2l6ZVwiIHx8IGV2LnR5cGUgPT09IFwib3JpZW50YXRpb25jaGFuZ2VcIikpIHtcbiAgICAgIHRoaXMuaGVpZ2h0XyA9IDBcbiAgICAgIHRoaXMuc2V0dXAoKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBhY3RpdmUgPSB3aW5kb3cucGFnZVlPZmZzZXQgPj0gdGhpcy5oZWlnaHRfXG4gICAgICBpZiAoYWN0aXZlICE9PSB0aGlzLmFjdGl2ZV8pXG4gICAgICAgIHRoaXMuaGVhZGVyXy5kYXRhc2V0Lm1kU3RhdGUgPSAodGhpcy5hY3RpdmVfID0gYWN0aXZlKSA/IFwic2hhZG93XCIgOiBcIlwiXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHNoYWRvdyBzdGF0ZVxuICAgKi9cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5oZWFkZXJfLmRhdGFzZXQubWRTdGF0ZSA9IFwiXCJcbiAgICB0aGlzLmhlaWdodF8gPSAwXG4gICAgdGhpcy5hY3RpdmVfID0gZmFsc2VcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01hdGVyaWFsL0hlYWRlci9TaGFkb3cuanMiLCIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTcgTWFydGluIERvbmF0aCA8bWFydGluLmRvbmF0aEBzcXVpZGZ1bmsuY29tPlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvXG4gKiBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZVxuICogcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yXG4gKiBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OLUlORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuICogRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HU1xuICogSU4gVEhFIFNPRlRXQVJFLlxuICovXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENsYXNzXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpdGxlIHtcblxuICAvKipcbiAgICogU3dhcCBoZWFkZXIgdGl0bGUgdG9waWNzIHdoZW4gaGVhZGVyIGlzIHNjcm9sbGVkIHBhc3RcbiAgICpcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IGVsXyAtIEVsZW1lbnRcbiAgICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gaGVhZGVyXyAtIEhlYWRlclxuICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IGFjdGl2ZV8gLSBUaXRsZSBzdGF0ZVxuICAgKlxuICAgKiBAcGFyYW0geyhzdHJpbmd8SFRNTEVsZW1lbnQpfSBlbCAtIFNlbGVjdG9yIG9yIEhUTUwgZWxlbWVudFxuICAgKiBAcGFyYW0geyhzdHJpbmd8SFRNTEhlYWRpbmdFbGVtZW50KX0gaGVhZGVyIC0gU2VsZWN0b3Igb3IgSFRNTCBlbGVtZW50XG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbCwgaGVhZGVyKSB7XG4gICAgbGV0IHJlZiA9ICh0eXBlb2YgZWwgPT09IFwic3RyaW5nXCIpXG4gICAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpXG4gICAgICA6IGVsXG4gICAgaWYgKCEocmVmIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKVxuICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yXG4gICAgdGhpcy5lbF8gPSByZWZcblxuICAgIC8qIFJldHJpZXZlIGhlYWRlciAqL1xuICAgIHJlZiA9ICh0eXBlb2YgaGVhZGVyID09PSBcInN0cmluZ1wiKVxuICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGhlYWRlcilcbiAgICAgIDogaGVhZGVyXG4gICAgaWYgKCEocmVmIGluc3RhbmNlb2YgSFRNTEhlYWRpbmdFbGVtZW50KSlcbiAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuICAgIHRoaXMuaGVhZGVyXyA9IHJlZlxuXG4gICAgLyogSW5pdGlhbGl6ZSBzdGF0ZSAqL1xuICAgIHRoaXMuYWN0aXZlXyA9IGZhbHNlXG4gIH1cblxuICAvKipcbiAgICogU2V0dXAgdGl0bGUgc3RhdGVcbiAgICovXG4gIHNldHVwKCkge1xuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwodGhpcy5lbF8uY2hpbGRyZW4sIG5vZGUgPT4geyAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiB1c2UgY2hpbGROb2RlcyBoZXJlIGZvciBJRT9cbiAgICAgIG5vZGUuc3R5bGUud2lkdGggPSBgJHt0aGlzLmVsXy5vZmZzZXRXaWR0aCAtIDIwfXB4YFxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRpdGxlIHN0YXRlXG4gICAqXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2IC0gRXZlbnRcbiAgICovXG4gIHVwZGF0ZShldikge1xuICAgIGNvbnN0IGFjdGl2ZSA9IHdpbmRvdy5wYWdlWU9mZnNldCA+PSB0aGlzLmhlYWRlcl8ub2Zmc2V0VG9wXG4gICAgaWYgKGFjdGl2ZSAhPT0gdGhpcy5hY3RpdmVfKVxuICAgICAgdGhpcy5lbF8uZGF0YXNldC5tZFN0YXRlID0gKHRoaXMuYWN0aXZlXyA9IGFjdGl2ZSkgPyBcImFjdGl2ZVwiIDogXCJcIlxuXG4gICAgLyogSGFjazogaW5kdWNlIGVsbGlwc2lzIG9uIHRvcGljcyAqL1xuICAgIGlmIChldi50eXBlID09PSBcInJlc2l6ZVwiIHx8IGV2LnR5cGUgPT09IFwib3JpZW50YXRpb25jaGFuZ2VcIikge1xuICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbCh0aGlzLmVsXy5jaGlsZHJlbiwgbm9kZSA9PiB7XG4gICAgICAgIG5vZGUuc3R5bGUud2lkdGggPSBgJHt0aGlzLmVsXy5vZmZzZXRXaWR0aCAtIDIwfXB4YFxuICAgICAgfSlcbiAgICB9XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aXRsZSBzdGF0ZVxuICAgKi9cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5lbF8uZGF0YXNldC5tZFN0YXRlID0gXCJcIlxuICAgIHRoaXMuZWxfLnN0eWxlLndpZHRoID0gXCJcIlxuICAgIHRoaXMuYWN0aXZlXyA9IGZhbHNlXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9NYXRlcmlhbC9IZWFkZXIvVGl0bGUuanMiLCIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTcgTWFydGluIERvbmF0aCA8bWFydGluLmRvbmF0aEBzcXVpZGZ1bmsuY29tPlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvXG4gKiBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZVxuICogcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yXG4gKiBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OLUlORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuICogRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HU1xuICogSU4gVEhFIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCBCbHVyIGZyb20gXCIuL05hdi9CbHVyXCJcbmltcG9ydCBDb2xsYXBzZSBmcm9tIFwiLi9OYXYvQ29sbGFwc2VcIlxuaW1wb3J0IFNjcm9sbGluZyBmcm9tIFwiLi9OYXYvU2Nyb2xsaW5nXCJcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogTW9kdWxlXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgQmx1cixcbiAgQ29sbGFwc2UsXG4gIFNjcm9sbGluZ1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01hdGVyaWFsL05hdi5qcyIsIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxNyBNYXJ0aW4gRG9uYXRoIDxtYXJ0aW4uZG9uYXRoQHNxdWlkZnVuay5jb20+XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG9cbiAqIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlXG4gKiByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3JcbiAqIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04tSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HXG4gKiBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTXG4gKiBJTiBUSEUgU09GVFdBUkUuXG4gKi9cblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ2xhc3NcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmx1ciB7XG5cbiAgLyoqXG4gICAqIEJsdXIgbGlua3Mgd2l0aGluIHRoZSB0YWJsZSBvZiBjb250ZW50cyBhYm92ZSBjdXJyZW50IHBhZ2UgeS1vZmZzZXRcbiAgICpcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7Tm9kZUxpc3Q8SFRNTEVsZW1lbnQ+fSBlbHNfIC0gVGFibGUgb2YgY29udGVudHMgbGlua3NcbiAgICogQHByb3BlcnR5IHtBcnJheTxIVE1MRWxlbWVudD59IGFuY2hvcnNfIC0gUmVmZXJlbmNlZCBhbmNob3Igbm9kZXNcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGluZGV4XyAtIEN1cnJlbnQgbGluayBpbmRleFxuICAgKiBAcHJvcGVydHkge251bWJlcn0gb2Zmc2V0XyAtIEN1cnJlbnQgcGFnZSB5LW9mZnNldFxuICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IGRpcl8gLSBTY3JvbGwgZGlyZWN0aW9uIGNoYW5nZVxuICAgKlxuICAgKiBAcGFyYW0geyhzdHJpbmd8Tm9kZUxpc3Q8SFRNTEVsZW1lbnQ+KX0gZWxzIC0gU2VsZWN0b3Igb3IgSFRNTCBlbGVtZW50c1xuICAgKi9cbiAgY29uc3RydWN0b3IoZWxzKSB7XG4gICAgdGhpcy5lbHNfID0gKHR5cGVvZiBlbHMgPT09IFwic3RyaW5nXCIpXG4gICAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxzKVxuICAgICAgOiBlbHNcblxuICAgIC8qIEluaXRpYWxpemUgaW5kZXggYW5kIHBhZ2UgeS1vZmZzZXQgKi9cbiAgICB0aGlzLmluZGV4XyA9IDBcbiAgICB0aGlzLm9mZnNldF8gPSB3aW5kb3cucGFnZVlPZmZzZXRcblxuICAgIC8qIE5lY2Vzc2FyeSBzdGF0ZSB0byBjb3JyZWN0bHkgcmVzZXQgdGhlIGluZGV4ICovXG4gICAgdGhpcy5kaXJfID0gZmFsc2VcblxuICAgIC8qIEluZGV4IGFuY2hvciBub2RlIG9mZnNldHMgZm9yIGZhc3QgbG9va3VwICovXG4gICAgdGhpcy5hbmNob3JzXyA9IFtdLnJlZHVjZS5jYWxsKHRoaXMuZWxzXywgKGFuY2hvcnMsIGVsKSA9PiB7XG4gICAgICByZXR1cm4gYW5jaG9ycy5jb25jYXQoXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsLmhhc2guc3Vic3RyaW5nKDEpKSB8fCBbXSlcbiAgICB9LCBbXSlcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIGJsdXIgc3RhdGVzXG4gICAqL1xuICBzZXR1cCgpIHtcbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGJsdXIgc3RhdGVzXG4gICAqXG4gICAqIERlZHVjdCB0aGUgc3RhdGljIG9mZnNldCBvZiB0aGUgaGVhZGVyICg1NnB4KSBhbmQgc2lkZWJhciBvZmZzZXQgKDI0cHgpLFxuICAgKiBzZWUgX3Blcm1hbGlua3Muc2NzcyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICovXG4gIHVwZGF0ZSgpIHtcbiAgICBjb25zdCBvZmZzZXQgPSB3aW5kb3cucGFnZVlPZmZzZXRcbiAgICBjb25zdCBkaXIgPSB0aGlzLm9mZnNldF8gLSBvZmZzZXQgPCAwXG5cbiAgICAvKiBIYWNrOiByZXNldCBpbmRleCBpZiBkaXJlY3Rpb24gY2hhbmdlZCB0byBjYXRjaCB2ZXJ5IGZhc3Qgc2Nyb2xsaW5nLFxuICAgICAgIGJlY2F1c2Ugb3RoZXJ3aXNlIHdlIHdvdWxkIGhhdmUgdG8gcmVnaXN0ZXIgYSB0aW1lciBhbmQgdGhhdCBzdWNrcyAqL1xuICAgIGlmICh0aGlzLmRpcl8gIT09IGRpcilcbiAgICAgIHRoaXMuaW5kZXhfID0gZGlyXG4gICAgICAgID8gdGhpcy5pbmRleF8gPSAwXG4gICAgICAgIDogdGhpcy5pbmRleF8gPSB0aGlzLmVsc18ubGVuZ3RoIC0gMVxuXG4gICAgLyogRXhpdCB3aGVuIHRoZXJlIGFyZSBubyBhbmNob3JzICovXG4gICAgaWYgKHRoaXMuYW5jaG9yc18ubGVuZ3RoID09PSAwKVxuICAgICAgcmV0dXJuXG5cbiAgICAvKiBTY3JvbGwgZGlyZWN0aW9uIGlzIGRvd24gKi9cbiAgICBpZiAodGhpcy5vZmZzZXRfIDw9IG9mZnNldCkge1xuICAgICAgZm9yIChsZXQgaSA9IHRoaXMuaW5kZXhfICsgMTsgaSA8IHRoaXMuZWxzXy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5hbmNob3JzX1tpXS5vZmZzZXRUb3AgLSAoNTYgKyAyNCkgPD0gb2Zmc2V0KSB7XG4gICAgICAgICAgaWYgKGkgPiAwKVxuICAgICAgICAgICAgdGhpcy5lbHNfW2kgLSAxXS5kYXRhc2V0Lm1kU3RhdGUgPSBcImJsdXJcIlxuICAgICAgICAgIHRoaXMuaW5kZXhfID0gaVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIC8qIFNjcm9sbCBkaXJlY3Rpb24gaXMgdXAgKi9cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IHRoaXMuaW5kZXhfOyBpID49IDA7IGktLSkge1xuICAgICAgICBpZiAodGhpcy5hbmNob3JzX1tpXS5vZmZzZXRUb3AgLSAoNTYgKyAyNCkgPiBvZmZzZXQpIHtcbiAgICAgICAgICBpZiAoaSA+IDApXG4gICAgICAgICAgICB0aGlzLmVsc19baSAtIDFdLmRhdGFzZXQubWRTdGF0ZSA9IFwiXCJcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmluZGV4XyA9IGlcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyogUmVtZW1iZXIgY3VycmVudCBvZmZzZXQgYW5kIGRpcmVjdGlvbiBmb3IgbmV4dCBpdGVyYXRpb24gKi9cbiAgICB0aGlzLm9mZnNldF8gPSBvZmZzZXRcbiAgICB0aGlzLmRpcl8gPSBkaXJcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCBibHVyIHN0YXRlc1xuICAgKi9cbiAgcmVzZXQoKSB7XG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbCh0aGlzLmVsc18sIGVsID0+IHtcbiAgICAgIGVsLmRhdGFzZXQubWRTdGF0ZSA9IFwiXCJcbiAgICB9KVxuXG4gICAgLyogUmVzZXQgaW5kZXggYW5kIHBhZ2UgeS1vZmZzZXQgKi9cbiAgICB0aGlzLmluZGV4XyAgPSAwXG4gICAgdGhpcy5vZmZzZXRfID0gd2luZG93LnBhZ2VZT2Zmc2V0XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9NYXRlcmlhbC9OYXYvQmx1ci5qcyIsIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxNyBNYXJ0aW4gRG9uYXRoIDxtYXJ0aW4uZG9uYXRoQHNxdWlkZnVuay5jb20+XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG9cbiAqIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlXG4gKiByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3JcbiAqIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04tSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HXG4gKiBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTXG4gKiBJTiBUSEUgU09GVFdBUkUuXG4gKi9cblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ2xhc3NcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGFwc2Uge1xuXG4gIC8qKlxuICAgKiBFeHBhbmQgb3IgY29sbGFwc2UgbmF2aWdhdGlvbiBvbiB0b2dnbGVcbiAgICpcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IGVsXyAtIE5hdmlnYXRpb24gbGlzdFxuICAgKlxuICAgKiBAcGFyYW0geyhzdHJpbmd8SFRNTEVsZW1lbnQpfSBlbCAtIFNlbGVjdG9yIG9yIEhUTUwgZWxlbWVudFxuICAgKi9cbiAgY29uc3RydWN0b3IoZWwpIHtcbiAgICBjb25zdCByZWYgPSAodHlwZW9mIGVsID09PSBcInN0cmluZ1wiKVxuICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKVxuICAgICAgOiBlbFxuICAgIGlmICghKHJlZiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSlcbiAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuICAgIHRoaXMuZWxfID0gcmVmXG4gIH1cblxuICAvKipcbiAgICogQW5pbWF0ZSBleHBhbmQgYW5kIGNvbGxhcHNlIHNtb290aGx5XG4gICAqXG4gICAqIEludGVybmV0IEV4cGxvcmVyIDExIGlzIHZlcnkgc2xvdyBhdCByZWNvZ25pemluZyBjaGFuZ2VzIG9uIHRoZSBkYXRhc2V0XG4gICAqIHdoaWNoIHJlc3VsdHMgaW4gdGhlIG1lbnUgbm90IGV4cGFuZGluZyBvciBjb2xsYXBzaW5nIHByb3Blcmx5LiBUSGVyZWZvcmUsXG4gICAqIGZvciByZWFzb25zIG9mIGNvbXBhdGliaWxpdHksIHRoZSBhdHRyaWJ1dGUgYWNjZXNzb3JzIGFyZSB1c2VkLlxuICAgKi9cbiAgdXBkYXRlKCkge1xuICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLmVsXy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHRcblxuICAgIC8qIEV4cGFuZGVkLCBzbyBjb2xsYXBzZSAqL1xuICAgIGlmIChjdXJyZW50KSB7XG4gICAgICB0aGlzLmVsXy5zdHlsZS5tYXhIZWlnaHQgPSBgJHtjdXJyZW50fXB4YFxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgdGhpcy5lbF8uc2V0QXR0cmlidXRlKFwiZGF0YS1tZC1zdGF0ZVwiLCBcImFuaW1hdGVcIilcbiAgICAgICAgdGhpcy5lbF8uc3R5bGUubWF4SGVpZ2h0ID0gXCIwcHhcIlxuICAgICAgfSlcblxuICAgIC8qIENvbGxhcHNlZCwgc28gZXhwYW5kICovXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWxfLnNldEF0dHJpYnV0ZShcImRhdGEtbWQtc3RhdGVcIiwgXCJleHBhbmRcIilcbiAgICAgIHRoaXMuZWxfLnN0eWxlLm1heEhlaWdodCA9IFwiXCJcblxuICAgICAgLyogUmVhZCBoZWlnaHQgYW5kIHVuc2V0IHBzZXVkby10b2dnbGVkIHN0YXRlICovXG4gICAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmVsXy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHRcbiAgICAgIHRoaXMuZWxfLnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtbWQtc3RhdGVcIilcblxuICAgICAgLyogU2V0IGluaXRpYWwgc3RhdGUgYW5kIGFuaW1hdGUgKi9cbiAgICAgIHRoaXMuZWxfLnN0eWxlLm1heEhlaWdodCA9IFwiMHB4XCJcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuZWxfLnNldEF0dHJpYnV0ZShcImRhdGEtbWQtc3RhdGVcIiwgXCJhbmltYXRlXCIpXG4gICAgICAgIHRoaXMuZWxfLnN0eWxlLm1heEhlaWdodCA9IGAke2hlaWdodH1weGBcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLyogUmVtb3ZlIHN0YXRlIG9uIGVuZCBvZiB0cmFuc2l0aW9uICovXG4gICAgY29uc3QgZW5kID0gZXYgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZXYudGFyZ2V0XG4gICAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpXG4gICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuXG4gICAgICAvKiBSZXNldCBoZWlnaHQgYW5kIHN0YXRlICovXG4gICAgICB0YXJnZXQucmVtb3ZlQXR0cmlidXRlKFwiZGF0YS1tZC1zdGF0ZVwiKVxuICAgICAgdGFyZ2V0LnN0eWxlLm1heEhlaWdodCA9IFwiXCJcblxuICAgICAgLyogT25seSBmaXJlIG9uY2UsIHNvIGRpcmVjdGx5IHJlbW92ZSBldmVudCBsaXN0ZW5lciAqL1xuICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0cmFuc2l0aW9uZW5kXCIsIGVuZClcbiAgICB9XG4gICAgdGhpcy5lbF8uYWRkRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIiwgZW5kLCBmYWxzZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCBoZWlnaHQgYW5kIHBzZXVkby10b2dnbGVkIHN0YXRlXG4gICAqL1xuICByZXNldCgpIHtcbiAgICB0aGlzLmVsXy5kYXRhc2V0Lm1kU3RhdGUgPSBcIlwiXG4gICAgdGhpcy5lbF8uc3R5bGUubWF4SGVpZ2h0ID0gXCJcIlxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvTWF0ZXJpYWwvTmF2L0NvbGxhcHNlLmpzIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE3IE1hcnRpbiBEb25hdGggPG1hcnRpbi5kb25hdGhAc3F1aWRmdW5rLmNvbT5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0b1xuICogZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGVcbiAqIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vclxuICogc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTi1JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkdcbiAqIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1NcbiAqIElOIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDbGFzc1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY3JvbGxpbmcge1xuXG4gIC8qKlxuICAgKiBTZXQgb3ZlcmZsb3cgc2Nyb2xsaW5nIG9uIHRoZSBjdXJyZW50IGFjdGl2ZSBwYW5lIChmb3IgaU9TKVxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICpcbiAgICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gZWxfIC0gUHJpbWFyeSBuYXZpZ2F0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7KHN0cmluZ3xIVE1MRWxlbWVudCl9IGVsIC0gU2VsZWN0b3Igb3IgSFRNTCBlbGVtZW50XG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbCkge1xuICAgIGNvbnN0IHJlZiA9ICh0eXBlb2YgZWwgPT09IFwic3RyaW5nXCIpXG4gICAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpXG4gICAgICA6IGVsXG4gICAgaWYgKCEocmVmIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKVxuICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yXG4gICAgdGhpcy5lbF8gPSByZWZcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXR1cCBwYW5lc1xuICAgKi9cbiAgc2V0dXAoKSB7XG5cbiAgICAvKiBJbml0aWFsbHkgc2V0IG92ZXJmbG93IHNjcm9sbGluZyBvbiBtYWluIHBhbmUgKi9cbiAgICBjb25zdCBtYWluID0gdGhpcy5lbF8uY2hpbGRyZW5bdGhpcy5lbF8uY2hpbGRyZW4ubGVuZ3RoIC0gMV1cbiAgICBtYWluLnN0eWxlLndlYmtpdE92ZXJmbG93U2Nyb2xsaW5nID0gXCJ0b3VjaFwiXG5cbiAgICAvKiBGaW5kIGFsbCB0b2dnbGVzIGFuZCBjaGVjayB3aGljaCBvbmUgaXMgYWN0aXZlICovXG4gICAgY29uc3QgdG9nZ2xlcyA9IHRoaXMuZWxfLnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1tZC10b2dnbGVdXCIpXG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbCh0b2dnbGVzLCB0b2dnbGUgPT4ge1xuICAgICAgaWYgKCEodG9nZ2xlIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkpXG4gICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuICAgICAgaWYgKHRvZ2dsZS5jaGVja2VkKSB7XG5cbiAgICAgICAgLyogRmluZCBjb3JyZXNwb25kaW5nIG5hdmlnYXRpb25hbCBwYW5lICovXG4gICAgICAgIGxldCBwYW5lID0gdG9nZ2xlLm5leHRFbGVtZW50U2libGluZ1xuICAgICAgICBpZiAoIShwYW5lIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKVxuICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuICAgICAgICB3aGlsZSAocGFuZS50YWdOYW1lICE9PSBcIk5BVlwiICYmIHBhbmUubmV4dEVsZW1lbnRTaWJsaW5nKVxuICAgICAgICAgIHBhbmUgPSBwYW5lLm5leHRFbGVtZW50U2libGluZ1xuXG4gICAgICAgIC8qIENoZWNrIHJlZmVyZW5jZXMgKi9cbiAgICAgICAgaWYgKCEodG9nZ2xlLnBhcmVudE5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkgfHxcbiAgICAgICAgICAgICEodG9nZ2xlLnBhcmVudE5vZGUucGFyZW50Tm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSlcbiAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3JcblxuICAgICAgICAvKiBGaW5kIGN1cnJlbnQgYW5kIHBhcmVudCBsaXN0IGVsZW1lbnRzICovXG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRvZ2dsZS5wYXJlbnROb2RlLnBhcmVudE5vZGVcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gcGFuZS5jaGlsZHJlbltwYW5lLmNoaWxkcmVuLmxlbmd0aCAtIDFdXG5cbiAgICAgICAgLyogQWx3YXlzIHJlc2V0IGFsbCBsaXN0cyB3aGVuIHRyYW5zaXRpb25pbmcgKi9cbiAgICAgICAgcGFyZW50LnN0eWxlLndlYmtpdE92ZXJmbG93U2Nyb2xsaW5nID0gXCJcIlxuICAgICAgICB0YXJnZXQuc3R5bGUud2Via2l0T3ZlcmZsb3dTY3JvbGxpbmcgPSBcInRvdWNoXCJcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhY3RpdmUgcGFuZXNcbiAgICpcbiAgICogQHBhcmFtIHtFdmVudH0gZXYgLSBDaGFuZ2UgZXZlbnRcbiAgICovXG4gIHVwZGF0ZShldikge1xuICAgIGNvbnN0IHRhcmdldCA9IGV2LnRhcmdldFxuICAgIGlmICghKHRhcmdldCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSlcbiAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuXG4gICAgLyogRmluZCBjb3JyZXNwb25kaW5nIG5hdmlnYXRpb25hbCBwYW5lICovXG4gICAgbGV0IHBhbmUgPSB0YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nXG4gICAgaWYgKCEocGFuZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSlcbiAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuICAgIHdoaWxlIChwYW5lLnRhZ05hbWUgIT09IFwiTkFWXCIgJiYgcGFuZS5uZXh0RWxlbWVudFNpYmxpbmcpXG4gICAgICBwYW5lID0gcGFuZS5uZXh0RWxlbWVudFNpYmxpbmdcblxuICAgIC8qIENoZWNrIHJlZmVyZW5jZXMgKi9cbiAgICBpZiAoISh0YXJnZXQucGFyZW50Tm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB8fFxuICAgICAgICAhKHRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpXG4gICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3JcblxuICAgIC8qIEZpbmQgcGFyZW50IGFuZCBhY3RpdmUgcGFuZXMgKi9cbiAgICBjb25zdCBwYXJlbnQgPSB0YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlXG4gICAgY29uc3QgYWN0aXZlID0gcGFuZS5jaGlsZHJlbltwYW5lLmNoaWxkcmVuLmxlbmd0aCAtIDFdXG5cbiAgICAvKiBBbHdheXMgcmVzZXQgYWxsIGxpc3RzIHdoZW4gdHJhbnNpdGlvbmluZyAqL1xuICAgIHBhcmVudC5zdHlsZS53ZWJraXRPdmVyZmxvd1Njcm9sbGluZyA9IFwiXCJcbiAgICBhY3RpdmUuc3R5bGUud2Via2l0T3ZlcmZsb3dTY3JvbGxpbmcgPSBcIlwiXG5cbiAgICAvKiBTZXQgb3ZlcmZsb3cgc2Nyb2xsaW5nIG9uIHBhcmVudCBwYW5lICovXG4gICAgaWYgKCF0YXJnZXQuY2hlY2tlZCkge1xuICAgICAgY29uc3QgZW5kID0gKCkgPT4ge1xuICAgICAgICBpZiAocGFuZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgcGFyZW50LnN0eWxlLndlYmtpdE92ZXJmbG93U2Nyb2xsaW5nID0gXCJ0b3VjaFwiXG4gICAgICAgICAgcGFuZS5yZW1vdmVFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLCBlbmQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHBhbmUuYWRkRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIiwgZW5kLCBmYWxzZSlcbiAgICB9XG5cbiAgICAvKiBTZXQgb3ZlcmZsb3cgc2Nyb2xsaW5nIG9uIGFjdGl2ZSBwYW5lICovXG4gICAgaWYgKHRhcmdldC5jaGVja2VkKSB7XG4gICAgICBjb25zdCBlbmQgPSAoKSA9PiB7XG4gICAgICAgIGlmIChwYW5lIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICBhY3RpdmUuc3R5bGUud2Via2l0T3ZlcmZsb3dTY3JvbGxpbmcgPSBcInRvdWNoXCJcbiAgICAgICAgICBwYW5lLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0cmFuc2l0aW9uZW5kXCIsIGVuZClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcGFuZS5hZGRFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLCBlbmQsIGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCBwYW5lc1xuICAgKi9cbiAgcmVzZXQoKSB7XG5cbiAgICAvKiBSZXNldCBvdmVyZmxvdyBzY3JvbGxpbmcgb24gbWFpbiBwYW5lICovXG4gICAgdGhpcy5lbF8uY2hpbGRyZW5bMV0uc3R5bGUud2Via2l0T3ZlcmZsb3dTY3JvbGxpbmcgPSBcIlwiXG5cbiAgICAvKiBGaW5kIGFsbCB0b2dnbGVzIGFuZCBjaGVjayB3aGljaCBvbmUgaXMgYWN0aXZlICovXG4gICAgY29uc3QgdG9nZ2xlcyA9IHRoaXMuZWxfLnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1tZC10b2dnbGVdXCIpXG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbCh0b2dnbGVzLCB0b2dnbGUgPT4ge1xuICAgICAgaWYgKCEodG9nZ2xlIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkpXG4gICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuICAgICAgaWYgKHRvZ2dsZS5jaGVja2VkKSB7XG5cbiAgICAgICAgLyogRmluZCBjb3JyZXNwb25kaW5nIG5hdmlnYXRpb25hbCBwYW5lICovXG4gICAgICAgIGxldCBwYW5lID0gdG9nZ2xlLm5leHRFbGVtZW50U2libGluZ1xuICAgICAgICBpZiAoIShwYW5lIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKVxuICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuICAgICAgICB3aGlsZSAocGFuZS50YWdOYW1lICE9PSBcIk5BVlwiICYmIHBhbmUubmV4dEVsZW1lbnRTaWJsaW5nKVxuICAgICAgICAgIHBhbmUgPSBwYW5lLm5leHRFbGVtZW50U2libGluZ1xuXG4gICAgICAgIC8qIENoZWNrIHJlZmVyZW5jZXMgKi9cbiAgICAgICAgaWYgKCEodG9nZ2xlLnBhcmVudE5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkgfHxcbiAgICAgICAgICAgICEodG9nZ2xlLnBhcmVudE5vZGUucGFyZW50Tm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSlcbiAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3JcblxuICAgICAgICAvKiBGaW5kIHBhcmVudCBhbmQgYWN0aXZlIHBhbmVzICovXG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRvZ2dsZS5wYXJlbnROb2RlLnBhcmVudE5vZGVcbiAgICAgICAgY29uc3QgYWN0aXZlID0gcGFuZS5jaGlsZHJlbltwYW5lLmNoaWxkcmVuLmxlbmd0aCAtIDFdXG5cbiAgICAgICAgLyogQWx3YXlzIHJlc2V0IGFsbCBsaXN0cyB3aGVuIHRyYW5zaXRpb25pbmcgKi9cbiAgICAgICAgcGFyZW50LnN0eWxlLndlYmtpdE92ZXJmbG93U2Nyb2xsaW5nID0gXCJcIlxuICAgICAgICBhY3RpdmUuc3R5bGUud2Via2l0T3ZlcmZsb3dTY3JvbGxpbmcgPSBcIlwiXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01hdGVyaWFsL05hdi9TY3JvbGxpbmcuanMiLCIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTcgTWFydGluIERvbmF0aCA8bWFydGluLmRvbmF0aEBzcXVpZGZ1bmsuY29tPlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvXG4gKiBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZVxuICogcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yXG4gKiBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OLUlORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuICogRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HU1xuICogSU4gVEhFIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCBMb2NrIGZyb20gXCIuL1NlYXJjaC9Mb2NrXCJcbmltcG9ydCBSZXN1bHQgZnJvbSBcIi4vU2VhcmNoL1Jlc3VsdFwiXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIE1vZHVsZVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIExvY2ssXG4gIFJlc3VsdFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01hdGVyaWFsL1NlYXJjaC5qcyIsIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxNyBNYXJ0aW4gRG9uYXRoIDxtYXJ0aW4uZG9uYXRoQHNxdWlkZnVuay5jb20+XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG9cbiAqIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlXG4gKiByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3JcbiAqIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04tSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HXG4gKiBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTXG4gKiBJTiBUSEUgU09GVFdBUkUuXG4gKi9cblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ2xhc3NcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9jayB7XG5cbiAgLyoqXG4gICAqIExvY2sgYm9keSBmb3IgZnVsbC1zY3JlZW4gc2VhcmNoIG1vZGFsXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKlxuICAgKiBAcHJvcGVydHkge0hUTUxJbnB1dEVsZW1lbnR9IGVsXyAtIExvY2sgdG9nZ2xlXG4gICAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IGxvY2tfIC0gRWxlbWVudCB0byBsb2NrIChkb2N1bWVudCBib2R5KVxuICAgKiBAcHJvcGVydHkge251bWJlcn0gb2Zmc2V0XyAtIEN1cnJlbnQgcGFnZSB5LW9mZnNldFxuICAgKlxuICAgKiBAcGFyYW0geyhzdHJpbmd8SFRNTEVsZW1lbnQpfSBlbCAtIFNlbGVjdG9yIG9yIEhUTUwgZWxlbWVudFxuICAgKi9cbiAgY29uc3RydWN0b3IoZWwpIHtcbiAgICBjb25zdCByZWYgPSAodHlwZW9mIGVsID09PSBcInN0cmluZ1wiKVxuICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKVxuICAgICAgOiBlbFxuICAgIGlmICghKHJlZiBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpKVxuICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yXG4gICAgdGhpcy5lbF8gPSByZWZcblxuICAgIC8qIFJldHJpZXZlIGVsZW1lbnQgdG8gbG9jayAoPSBib2R5KSAqL1xuICAgIGlmICghZG9jdW1lbnQuYm9keSlcbiAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuICAgIHRoaXMubG9ja18gPSBkb2N1bWVudC5ib2R5XG4gIH1cblxuICAvKipcbiAgICogU2V0dXAgbG9ja2VkIHN0YXRlXG4gICAqL1xuICBzZXR1cCgpIHtcbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGxvY2tlZCBzdGF0ZVxuICAgKi9cbiAgdXBkYXRlKCkge1xuXG4gICAgLyogRW50ZXJpbmcgc2VhcmNoIG1vZGUgKi9cbiAgICBpZiAodGhpcy5lbF8uY2hlY2tlZCkge1xuICAgICAgdGhpcy5vZmZzZXRfID0gd2luZG93LnBhZ2VZT2Zmc2V0XG5cbiAgICAgIC8qIFNjcm9sbCB0byB0b3AgYWZ0ZXIgdHJhbnNpdGlvbiwgdG8gb21pdCBmbGlja2VyaW5nICovXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApXG5cbiAgICAgICAgLyogTG9jayBib2R5IGFmdGVyIGZpbmlzaGluZyB0cmFuc2l0aW9uICovXG4gICAgICAgIGlmICh0aGlzLmVsXy5jaGVja2VkKSB7XG4gICAgICAgICAgdGhpcy5sb2NrXy5kYXRhc2V0Lm1kU3RhdGUgPSBcImxvY2tcIlxuICAgICAgICB9XG4gICAgICB9LCA0MDApXG5cbiAgICAvKiBFeGl0aW5nIHNlYXJjaCBtb2RlICovXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubG9ja18uZGF0YXNldC5tZFN0YXRlID0gXCJcIlxuXG4gICAgICAvKiBTY3JvbGwgdG8gZm9ybWVyIHBvc2l0aW9uLCBidXQgd2FpdCBmb3IgMTAwbXMgdG8gcHJldmVudCBmbGFzaGVzIG9uXG4gICAgICAgICBpT1MuIEEgc2hvcnQgdGltZW91dCBzZWVtcyB0byBkbyB0aGUgdHJpY2sgKi9cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMub2Zmc2V0XyAhPT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgdGhpcy5vZmZzZXRfKVxuICAgICAgfSwgMTAwKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCBsb2NrZWQgc3RhdGUgYW5kIHBhZ2UgeS1vZmZzZXRcbiAgICovXG4gIHJlc2V0KCkge1xuICAgIGlmICh0aGlzLmxvY2tfLmRhdGFzZXQubWRTdGF0ZSA9PT0gXCJsb2NrXCIpXG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgdGhpcy5vZmZzZXRfKVxuICAgIHRoaXMubG9ja18uZGF0YXNldC5tZFN0YXRlID0gXCJcIlxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvTWF0ZXJpYWwvU2VhcmNoL0xvY2suanMiLCIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTcgTWFydGluIERvbmF0aCA8bWFydGluLmRvbmF0aEBzcXVpZGZ1bmsuY29tPlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvXG4gKiBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZVxuICogcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yXG4gKiBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OLUlORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuICogRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HU1xuICogSU4gVEhFIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCBlc2NhcGUgZnJvbSBcImVzY2FwZS1zdHJpbmctcmVnZXhwXCJcbmltcG9ydCBsdW5yIGZyb20gXCJleHBvc2UtbG9hZGVyP2x1bnIhbHVuclwiXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEZ1bmN0aW9uc1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4vKipcbiAqIFRydW5jYXRlIGEgc3RyaW5nIGFmdGVyIHRoZSBnaXZlbiBudW1iZXIgb2YgY2hhcmFjdGVyXG4gKlxuICogVGhpcyBpcyBub3QgYSByZWFzb25hYmxlIGFwcHJvYWNoLCBzaW5jZSB0aGUgc3VtbWFyaWVzIGtpbmQgb2Ygc3Vjay4gSXRcbiAqIHdvdWxkIGJlIGJldHRlciB0byBjcmVhdGUgc29tZXRoaW5nIG1vcmUgaW50ZWxsaWdlbnQsIGhpZ2hsaWdodGluZyB0aGVcbiAqIHNlYXJjaCBvY2N1cnJlbmNlcyBhbmQgbWFraW5nIGEgYmV0dGVyIHN1bW1hcnkgb3V0IG9mIGl0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgLSBTdHJpbmcgdG8gYmUgdHJ1bmNhdGVkXG4gKiBAcGFyYW0ge251bWJlcn0gbiAtIE51bWJlciBvZiBjaGFyYWN0ZXJzXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRydW5jYXRlZCBzdHJpbmdcbiAqL1xuY29uc3QgdHJ1bmNhdGUgPSAoc3RyaW5nLCBuKSA9PiB7XG4gIGxldCBpID0gblxuICBpZiAoc3RyaW5nLmxlbmd0aCA+IGkpIHtcbiAgICB3aGlsZSAoc3RyaW5nW2ldICE9PSBcIiBcIiAmJiAtLWkgPiAwKTtcbiAgICByZXR1cm4gYCR7c3RyaW5nLnN1YnN0cmluZygwLCBpKX0uLi5gXG4gIH1cbiAgcmV0dXJuIHN0cmluZ1xufVxuXG4vKipcbiAqIFJldHVybiB0aGUgbWV0YSB0YWcgdmFsdWUgZm9yIHRoZSBnaXZlbiBrZXlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gTWV0YSBuYW1lXG4gKlxuICogQHJldHVybiB7c3RyaW5nfSBNZXRhIGNvbnRlbnQgdmFsdWVcbiAqL1xuY29uc3QgdHJhbnNsYXRlID0ga2V5ID0+IHtcbiAgY29uc3QgbWV0YSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKGBsYW5nOiR7a2V5fWApWzBdXG4gIGlmICghKG1ldGEgaW5zdGFuY2VvZiBIVE1MTWV0YUVsZW1lbnQpKVxuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuICByZXR1cm4gbWV0YS5jb250ZW50XG59XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENsYXNzXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3VsdCB7XG5cbiAgLyoqXG4gICAqIFBlcmZvcm0gc2VhcmNoIGFuZCB1cGRhdGUgcmVzdWx0cyBvbiBrZXlib2FyZCBldmVudHNcbiAgICpcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IGVsXyAtIFNlYXJjaCByZXN1bHQgY29udGFpbmVyXG4gICAqIEBwcm9wZXJ0eSB7KEFycmF5PE9iamVjdD58RnVuY3Rpb24pfSBkYXRhXyAtIFJhdyBkb2N1bWVudCBkYXRhXG4gICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBkb2NzXyAtIEluZGV4ZWQgZG9jdW1lbnRzXG4gICAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IG1ldGFfIC0gU2VhcmNoIG1ldGEgaW5mb3JtYXRpb25cbiAgICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gbGlzdF8gLSBTZWFyY2ggcmVzdWx0IGxpc3RcbiAgICogQHByb3BlcnR5IHtBcnJheTxzdHJpbmc+fSBsYW5nXyAtIFNlYXJjaCBsYW5ndWFnZXNcbiAgICogQHByb3BlcnR5IHtPYmplY3R9IG1lc3NhZ2VfIC0gU2VhcmNoIHJlc3VsdCBtZXNzYWdlc1xuICAgKiBAcHJvcGVydHkge09iamVjdH0gaW5kZXhfIC0gU2VhcmNoIGluZGV4XG4gICAqIEBwcm9wZXJ0eSB7QXJyYXk8RnVuY3Rpb24+fSBzdGFja18gLSBTZWFyY2ggcmVzdWx0IHN0YWNrXG4gICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB2YWx1ZV8gLSBMYXN0IGlucHV0IHZhbHVlXG4gICAqXG4gICAqIEBwYXJhbSB7KHN0cmluZ3xIVE1MRWxlbWVudCl9IGVsIC0gU2VsZWN0b3Igb3IgSFRNTCBlbGVtZW50XG4gICAqIEBwYXJhbSB7KEFycmF5PE9iamVjdD58RnVuY3Rpb24pfSBkYXRhIC0gRnVuY3Rpb24gcHJvdmlkaW5nIGRhdGEgb3IgYXJyYXlcbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsLCBkYXRhKSB7XG4gICAgY29uc3QgcmVmID0gKHR5cGVvZiBlbCA9PT0gXCJzdHJpbmdcIilcbiAgICAgID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbClcbiAgICAgIDogZWxcbiAgICBpZiAoIShyZWYgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpXG4gICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3JcbiAgICB0aGlzLmVsXyA9IHJlZlxuXG4gICAgLyogUmV0cmlldmUgbWV0YWRhdGEgYW5kIGxpc3QgZWxlbWVudCAqL1xuICAgIGNvbnN0IFttZXRhLCBsaXN0XSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuZWxfLmNoaWxkcmVuKVxuXG4gICAgLyogU2V0IGRhdGEsIG1ldGFkYXRhIGFuZCBsaXN0IGVsZW1lbnRzICovXG4gICAgdGhpcy5kYXRhXyA9IGRhdGFcbiAgICB0aGlzLm1ldGFfID0gbWV0YVxuICAgIHRoaXMubGlzdF8gPSBsaXN0XG5cbiAgICAvKiBMb2FkIG1lc3NhZ2VzIGZvciBtZXRhZGF0YSBkaXNwbGF5ICovXG4gICAgdGhpcy5tZXNzYWdlXyA9IHtcbiAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLm1ldGFfLnRleHRDb250ZW50LFxuICAgICAgbm9uZTogdHJhbnNsYXRlKFwic2VhcmNoLnJlc3VsdC5ub25lXCIpLFxuICAgICAgb25lOiB0cmFuc2xhdGUoXCJzZWFyY2gucmVzdWx0Lm9uZVwiKSxcbiAgICAgIG90aGVyOiB0cmFuc2xhdGUoXCJzZWFyY2gucmVzdWx0Lm90aGVyXCIpXG4gICAgfVxuXG4gICAgLyogT3ZlcnJpZGUgdG9rZW5pemVyIHNlcGFyYXRvciwgaWYgZ2l2ZW4gKi9cbiAgICBjb25zdCB0b2tlbml6ZXIgPSB0cmFuc2xhdGUoXCJzZWFyY2gudG9rZW5pemVyXCIpXG4gICAgaWYgKHRva2VuaXplci5sZW5ndGgpXG4gICAgICBsdW5yLnRva2VuaXplci5zZXBhcmF0b3IgPSB0b2tlbml6ZXJcblxuICAgIC8qIExvYWQgc2VhcmNoIGxhbmd1YWdlcyAqL1xuICAgIHRoaXMubGFuZ18gPSB0cmFuc2xhdGUoXCJzZWFyY2gubGFuZ3VhZ2VcIikuc3BsaXQoXCIsXCIpXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAubWFwKGxhbmcgPT4gbGFuZy50cmltKCkpXG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHNlYXJjaCByZXN1bHRzXG4gICAqXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2IC0gSW5wdXQgb3IgZm9jdXMgZXZlbnRcbiAgICovXG4gIHVwZGF0ZShldikge1xuXG4gICAgLyogSW5pdGlhbGl6ZSBpbmRleCwgaWYgdGhpcyBoYXMgbm90IGJlIGRvbmUgeWV0ICovXG4gICAgaWYgKGV2LnR5cGUgPT09IFwiZm9jdXNcIiAmJiAhdGhpcy5pbmRleF8pIHtcblxuICAgICAgLyogSW5pdGlhbGl6ZSBpbmRleCAqL1xuICAgICAgY29uc3QgaW5pdCA9IGRhdGEgPT4ge1xuXG4gICAgICAgIC8qIFByZXByb2Nlc3MgYW5kIGluZGV4IHNlY3Rpb25zIGFuZCBkb2N1bWVudHMgKi9cbiAgICAgICAgdGhpcy5kb2NzXyA9IGRhdGEucmVkdWNlKChkb2NzLCBkb2MpID0+IHtcbiAgICAgICAgICBjb25zdCBbcGF0aCwgaGFzaF0gPSBkb2MubG9jYXRpb24uc3BsaXQoXCIjXCIpXG5cbiAgICAgICAgICAvKiBBc3NvY2lhdGUgc2VjdGlvbiB3aXRoIHBhcmVudCBkb2N1bWVudCAqL1xuICAgICAgICAgIGlmIChoYXNoKSB7XG4gICAgICAgICAgICBkb2MucGFyZW50ID0gZG9jcy5nZXQocGF0aClcblxuICAgICAgICAgICAgLyogT3ZlcnJpZGUgcGFnZSB0aXRsZSB3aXRoIGRvY3VtZW50IHRpdGxlIGlmIGZpcnN0IHNlY3Rpb24gKi9cbiAgICAgICAgICAgIGlmIChkb2MucGFyZW50ICYmICFkb2MucGFyZW50LmRvbmUpIHtcbiAgICAgICAgICAgICAgZG9jLnBhcmVudC50aXRsZSA9IGRvYy50aXRsZVxuICAgICAgICAgICAgICBkb2MucGFyZW50LnRleHQgID0gZG9jLnRleHRcbiAgICAgICAgICAgICAgZG9jLnBhcmVudC5kb25lICA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvKiBTb21lIGNsZWFudXAgb24gdGhlIHRleHQgKi9cbiAgICAgICAgICBkb2MudGV4dCA9IGRvYy50ZXh0XG4gICAgICAgICAgICAucmVwbGFjZSgvXFxuL2csIFwiIFwiKSAgICAgICAgICAgICAgIC8qIFJlbW92ZSBuZXdsaW5lcyAqL1xuICAgICAgICAgICAgLnJlcGxhY2UoL1xccysvZywgXCIgXCIpICAgICAgICAgICAgICAvKiBDb21wYWN0IHdoaXRlc3BhY2UgKi9cbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXHMrKFssLjo7IT9dKS9nLCAgICAgICAgIC8qIENvcnJlY3QgcHVuY3R1YXRpb24gKi9cbiAgICAgICAgICAgICAgKF8sIGNoYXIpID0+IGNoYXIpXG5cbiAgICAgICAgICAvKiBJbmRleCBzZWN0aW9ucyBhbmQgZG9jdW1lbnRzLCBidXQgc2tpcCB0b3AtbGV2ZWwgaGVhZGxpbmUgKi9cbiAgICAgICAgICBpZiAoIWRvYy5wYXJlbnQgfHwgZG9jLnBhcmVudC50aXRsZSAhPT0gZG9jLnRpdGxlKVxuICAgICAgICAgICAgZG9jcy5zZXQoZG9jLmxvY2F0aW9uLCBkb2MpXG4gICAgICAgICAgcmV0dXJuIGRvY3NcbiAgICAgICAgfSwgbmV3IE1hcClcblxuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1pbnZhbGlkLXRoaXMgKi9cbiAgICAgICAgY29uc3QgZG9jcyA9IHRoaXMuZG9jc18sXG4gICAgICAgICAgICAgIGxhbmcgPSB0aGlzLmxhbmdfXG5cbiAgICAgICAgLyogQ3JlYXRlIHN0YWNrIGFuZCBpbmRleCAqL1xuICAgICAgICB0aGlzLnN0YWNrXyA9IFtdXG4gICAgICAgIHRoaXMuaW5kZXhfID0gbHVucihmdW5jdGlvbigpIHtcblxuICAgICAgICAgIC8qIFJlbW92ZSBzdGVtbWVyLCBhcyBpdCBjcmlwcGxlcyBzZWFyY2ggZXhwZXJpZW5jZSAqL1xuICAgICAgICAgIHRoaXMucGlwZWxpbmUucmVzZXQoKVxuICAgICAgICAgIHRoaXMucGlwZWxpbmUuYWRkKFxuICAgICAgICAgICAgbHVuci50cmltbWVyLFxuICAgICAgICAgICAgbHVuci5zdG9wV29yZEZpbHRlclxuICAgICAgICAgIClcblxuICAgICAgICAgIC8qIFNldCB1cCBhbHRlcm5hdGUgc2VhcmNoIGxhbmd1YWdlcyAqL1xuICAgICAgICAgIGlmIChsYW5nLmxlbmd0aCA9PT0gMSAmJiBsYW5nWzBdICE9PSBcImVuXCIpIHtcbiAgICAgICAgICAgIHRoaXMudXNlKGx1bnJbbGFuZ1swXV0pXG4gICAgICAgICAgfSBlbHNlIGlmIChsYW5nLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMudXNlKGx1bnIubXVsdGlMYW5ndWFnZSguLi5sYW5nKSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvKiBJbmRleCBmaWVsZHMgKi9cbiAgICAgICAgICB0aGlzLmZpZWxkKFwidGl0bGVcIiwgeyBib29zdDogMTAgfSlcbiAgICAgICAgICB0aGlzLmZpZWxkKFwidGV4dFwiKVxuICAgICAgICAgIHRoaXMucmVmKFwibG9jYXRpb25cIilcblxuICAgICAgICAgIC8qIEluZGV4IGRvY3VtZW50cyAqL1xuICAgICAgICAgIGRvY3MuZm9yRWFjaChkb2MgPT4gdGhpcy5hZGQoZG9jKSlcbiAgICAgICAgfSlcblxuICAgICAgICAvKiBSZWdpc3RlciBldmVudCBoYW5kbGVyIGZvciBsYXp5IHJlbmRlcmluZyAqL1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmVsXy5wYXJlbnROb2RlXG4gICAgICAgIGlmICghKGNvbnRhaW5lciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSlcbiAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3JcbiAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xuICAgICAgICAgIHdoaWxlICh0aGlzLnN0YWNrXy5sZW5ndGggJiYgY29udGFpbmVyLnNjcm9sbFRvcCArXG4gICAgICAgICAgICAgIGNvbnRhaW5lci5vZmZzZXRIZWlnaHQgPj0gY29udGFpbmVyLnNjcm9sbEhlaWdodCAtIDE2KVxuICAgICAgICAgICAgdGhpcy5zdGFja18uc3BsaWNlKDAsIDEwKS5mb3JFYWNoKHJlbmRlciA9PiByZW5kZXIoKSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIC8qIGVzbGludC1lbmFibGUgbm8taW52YWxpZC10aGlzICovXG5cbiAgICAgIC8qIEluaXRpYWxpemUgaW5kZXggYWZ0ZXIgc2hvcnQgdGltZW91dCB0byBhY2NvdW50IGZvciB0cmFuc2l0aW9uICovXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLmRhdGFfID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICA/IHRoaXMuZGF0YV8oKS50aGVuKGluaXQpXG4gICAgICAgICAgOiBpbml0KHRoaXMuZGF0YV8pXG4gICAgICB9LCAyNTApXG5cbiAgICAvKiBFeGVjdXRlIHNlYXJjaCBvbiBuZXcgaW5wdXQgZXZlbnQgKi9cbiAgICB9IGVsc2UgaWYgKGV2LnR5cGUgPT09IFwiZm9jdXNcIiB8fCBldi50eXBlID09PSBcImtleXVwXCIpIHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2LnRhcmdldFxuICAgICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkpXG4gICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuXG4gICAgICAvKiBBYm9ydCBlYXJseSwgaWYgaW5kZXggaXMgbm90IGJ1aWxkIG9yIGlucHV0IGhhc24ndCBjaGFuZ2VkICovXG4gICAgICBpZiAoIXRoaXMuaW5kZXhfIHx8IHRhcmdldC52YWx1ZSA9PT0gdGhpcy52YWx1ZV8pXG4gICAgICAgIHJldHVyblxuXG4gICAgICAvKiBDbGVhciBjdXJyZW50IGxpc3QgKi9cbiAgICAgIHdoaWxlICh0aGlzLmxpc3RfLmZpcnN0Q2hpbGQpXG4gICAgICAgIHRoaXMubGlzdF8ucmVtb3ZlQ2hpbGQodGhpcy5saXN0Xy5maXJzdENoaWxkKVxuXG4gICAgICAvKiBBYm9ydCBlYXJseSwgaWYgc2VhcmNoIGlucHV0IGlzIGVtcHR5ICovXG4gICAgICB0aGlzLnZhbHVlXyA9IHRhcmdldC52YWx1ZVxuICAgICAgaWYgKHRoaXMudmFsdWVfLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLm1ldGFfLnRleHRDb250ZW50ID0gdGhpcy5tZXNzYWdlXy5wbGFjZWhvbGRlclxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgLyogUGVyZm9ybSBzZWFyY2ggb24gaW5kZXggYW5kIGdyb3VwIHNlY3Rpb25zIGJ5IGRvY3VtZW50ICovXG4gICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmluZGV4X1xuXG4gICAgICAgIC8qIEFwcGVuZCB0cmFpbGluZyB3aWxkY2FyZCB0byBhbGwgdGVybXMgZm9yIHByZWZpeCBxdWVyeWluZyAqL1xuICAgICAgICAucXVlcnkocXVlcnkgPT4ge1xuICAgICAgICAgIHRoaXMudmFsdWVfLnRvTG93ZXJDYXNlKCkuc3BsaXQoXCIgXCIpXG4gICAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgICAgICAuZm9yRWFjaCh0ZXJtID0+IHtcbiAgICAgICAgICAgICAgcXVlcnkudGVybSh0ZXJtLCB7IHdpbGRjYXJkOiBsdW5yLlF1ZXJ5LndpbGRjYXJkLlRSQUlMSU5HIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgICAgIC8qIFByb2Nlc3MgcXVlcnkgcmVzdWx0cyAqL1xuICAgICAgICAucmVkdWNlKChpdGVtcywgaXRlbSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGRvYyA9IHRoaXMuZG9jc18uZ2V0KGl0ZW0ucmVmKVxuICAgICAgICAgIGlmIChkb2MucGFyZW50KSB7XG4gICAgICAgICAgICBjb25zdCByZWYgPSBkb2MucGFyZW50LmxvY2F0aW9uXG4gICAgICAgICAgICBpdGVtcy5zZXQocmVmLCAoaXRlbXMuZ2V0KHJlZikgfHwgW10pLmNvbmNhdChpdGVtKSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgcmVmID0gZG9jLmxvY2F0aW9uXG4gICAgICAgICAgICBpdGVtcy5zZXQocmVmLCAoaXRlbXMuZ2V0KHJlZikgfHwgW10pKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gaXRlbXNcbiAgICAgICAgfSwgbmV3IE1hcClcblxuICAgICAgLyogQXNzZW1ibGUgcmVndWxhciBleHByZXNzaW9ucyBmb3IgbWF0Y2hpbmcgKi9cbiAgICAgIGNvbnN0IHF1ZXJ5ID0gZXNjYXBlKHRoaXMudmFsdWVfLnRyaW0oKSkucmVwbGFjZShcbiAgICAgICAgbmV3IFJlZ0V4cChsdW5yLnRva2VuaXplci5zZXBhcmF0b3IsIFwiaW1nXCIpLCBcInxcIilcbiAgICAgIGNvbnN0IG1hdGNoID1cbiAgICAgICAgbmV3IFJlZ0V4cChgKF58JHtsdW5yLnRva2VuaXplci5zZXBhcmF0b3J9KSgke3F1ZXJ5fSlgLCBcImltZ1wiKVxuICAgICAgY29uc3QgaGlnaGxpZ2h0ID0gKF8sIHNlcGFyYXRvciwgdG9rZW4pID0+XG4gICAgICAgIGAke3NlcGFyYXRvcn08ZW0+JHt0b2tlbn08L2VtPmBcblxuICAgICAgLyogUmVzZXQgc3RhY2sgYW5kIHJlbmRlciByZXN1bHRzICovXG4gICAgICB0aGlzLnN0YWNrXyA9IFtdXG4gICAgICByZXN1bHQuZm9yRWFjaCgoaXRlbXMsIHJlZikgPT4ge1xuICAgICAgICBjb25zdCBkb2MgPSB0aGlzLmRvY3NfLmdldChyZWYpXG5cbiAgICAgICAgLyogUmVuZGVyIGFydGljbGUgKi9cbiAgICAgICAgY29uc3QgYXJ0aWNsZSA9IChcbiAgICAgICAgICA8bGkgY2xhc3M9XCJtZC1zZWFyY2gtcmVzdWx0X19pdGVtXCI+XG4gICAgICAgICAgICA8YSBocmVmPXtkb2MubG9jYXRpb259IHRpdGxlPXtkb2MudGl0bGV9XG4gICAgICAgICAgICAgIGNsYXNzPVwibWQtc2VhcmNoLXJlc3VsdF9fbGlua1wiPlxuICAgICAgICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cIm1kLXNlYXJjaC1yZXN1bHRfX2FydGljbGVcbiAgICAgICAgICAgICAgICAgICAgbWQtc2VhcmNoLXJlc3VsdF9fYXJ0aWNsZS0tZG9jdW1lbnRcIj5cbiAgICAgICAgICAgICAgICA8aDEgY2xhc3M9XCJtZC1zZWFyY2gtcmVzdWx0X190aXRsZVwiPlxuICAgICAgICAgICAgICAgICAge3sgX19odG1sOiBkb2MudGl0bGUucmVwbGFjZShtYXRjaCwgaGlnaGxpZ2h0KSB9fVxuICAgICAgICAgICAgICAgIDwvaDE+XG4gICAgICAgICAgICAgICAge2RvYy50ZXh0Lmxlbmd0aCA/XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIm1kLXNlYXJjaC1yZXN1bHRfX3RlYXNlclwiPlxuICAgICAgICAgICAgICAgICAgICB7eyBfX2h0bWw6IGRvYy50ZXh0LnJlcGxhY2UobWF0Y2gsIGhpZ2hsaWdodCkgfX1cbiAgICAgICAgICAgICAgICAgIDwvcD4gOiB7fX1cbiAgICAgICAgICAgICAgPC9hcnRpY2xlPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIClcblxuICAgICAgICAvKiBSZW5kZXIgc2VjdGlvbnMgZm9yIGFydGljbGUgKi9cbiAgICAgICAgY29uc3Qgc2VjdGlvbnMgPSBpdGVtcy5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNlY3Rpb24gPSB0aGlzLmRvY3NfLmdldChpdGVtLnJlZilcbiAgICAgICAgICAgIGFydGljbGUuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICAgIDxhIGhyZWY9e3NlY3Rpb24ubG9jYXRpb259IHRpdGxlPXtzZWN0aW9uLnRpdGxlfVxuICAgICAgICAgICAgICAgIGNsYXNzPVwibWQtc2VhcmNoLXJlc3VsdF9fbGlua1wiIGRhdGEtbWQtcmVsPVwiYW5jaG9yXCI+XG4gICAgICAgICAgICAgICAgPGFydGljbGUgY2xhc3M9XCJtZC1zZWFyY2gtcmVzdWx0X19hcnRpY2xlXCI+XG4gICAgICAgICAgICAgICAgICA8aDEgY2xhc3M9XCJtZC1zZWFyY2gtcmVzdWx0X190aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICB7eyBfX2h0bWw6IHNlY3Rpb24udGl0bGUucmVwbGFjZShtYXRjaCwgaGlnaGxpZ2h0KSB9fVxuICAgICAgICAgICAgICAgICAgPC9oMT5cbiAgICAgICAgICAgICAgICAgIHtzZWN0aW9uLnRleHQubGVuZ3RoID9cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJtZC1zZWFyY2gtcmVzdWx0X190ZWFzZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7eyBfX2h0bWw6IHRydW5jYXRlKFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VjdGlvbi50ZXh0LnJlcGxhY2UobWF0Y2gsIGhpZ2hsaWdodCksIDQwMClcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICA8L3A+IDoge319XG4gICAgICAgICAgICAgICAgPC9hcnRpY2xlPlxuICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIC8qIFB1c2ggYXJ0aWNsZXMgYW5kIHNlY3Rpb24gcmVuZGVyZXJzIG9udG8gc3RhY2sgKi9cbiAgICAgICAgdGhpcy5zdGFja18ucHVzaCgoKSA9PiB0aGlzLmxpc3RfLmFwcGVuZENoaWxkKGFydGljbGUpLCAuLi5zZWN0aW9ucylcbiAgICAgIH0pXG5cbiAgICAgIC8qIEdyYWR1YWxseSBhZGQgcmVzdWx0cyBhcyBsb25nIGFzIHRoZSBoZWlnaHQgb2YgdGhlIGNvbnRhaW5lciBncm93cyAqL1xuICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5lbF8ucGFyZW50Tm9kZVxuICAgICAgaWYgKCEoY29udGFpbmVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKVxuICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3JcbiAgICAgIHdoaWxlICh0aGlzLnN0YWNrXy5sZW5ndGggJiZcbiAgICAgICAgICBjb250YWluZXIub2Zmc2V0SGVpZ2h0ID49IGNvbnRhaW5lci5zY3JvbGxIZWlnaHQgLSAxNilcbiAgICAgICAgKHRoaXMuc3RhY2tfLnNoaWZ0KCkpKClcblxuICAgICAgLyogQmluZCBjbGljayBoYW5kbGVycyBmb3IgYW5jaG9ycyAqL1xuICAgICAgY29uc3QgYW5jaG9ycyA9IHRoaXMubGlzdF8ucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLW1kLXJlbD1hbmNob3JdXCIpXG4gICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGFuY2hvcnMsIGFuY2hvciA9PiB7XG4gICAgICAgIGFuY2hvci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXYyID0+IHtcbiAgICAgICAgICBjb25zdCB0b2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtbWQtdG9nZ2xlPXNlYXJjaF1cIilcbiAgICAgICAgICBpZiAoISh0b2dnbGUgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSlcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuICAgICAgICAgIGlmICh0b2dnbGUuY2hlY2tlZCkge1xuICAgICAgICAgICAgdG9nZ2xlLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgICAgdG9nZ2xlLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwiY2hhbmdlXCIpKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8qIEhhY2s6IHByZXZlbnQgZGVmYXVsdCwgYXMgdGhlIG5hdmlnYXRpb24gbmVlZHMgdG8gYmUgZGVsYXllZCBkdWVcbiAgICAgICAgICAgICB0byB0aGUgc2VhcmNoIGJvZHkgbG9jayBvbiBtb2JpbGUgKi9cbiAgICAgICAgICBldjIucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IGFuY2hvci5ocmVmXG4gICAgICAgICAgfSwgMTAwKVxuICAgICAgICB9KVxuICAgICAgfSlcblxuICAgICAgLyogVXBkYXRlIHNlYXJjaCBtZXRhZGF0YSAqL1xuICAgICAgc3dpdGNoIChyZXN1bHQuc2l6ZSkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgdGhpcy5tZXRhXy50ZXh0Q29udGVudCA9IHRoaXMubWVzc2FnZV8ubm9uZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICB0aGlzLm1ldGFfLnRleHRDb250ZW50ID0gdGhpcy5tZXNzYWdlXy5vbmVcbiAgICAgICAgICBicmVha1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRoaXMubWV0YV8udGV4dENvbnRlbnQgPVxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlXy5vdGhlci5yZXBsYWNlKFwiI1wiLCByZXN1bHQuc2l6ZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9NYXRlcmlhbC9TZWFyY2gvUmVzdWx0LmpzeCIsIid1c2Ugc3RyaWN0JztcblxudmFyIG1hdGNoT3BlcmF0b3JzUmUgPSAvW3xcXFxce30oKVtcXF1eJCsqPy5dL2c7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0cikge1xuXHRpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhIHN0cmluZycpO1xuXHR9XG5cblx0cmV0dXJuIHN0ci5yZXBsYWNlKG1hdGNoT3BlcmF0b3JzUmUsICdcXFxcJCYnKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9lc2NhcGUtc3RyaW5nLXJlZ2V4cC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxbXCJsdW5yXCJdID0gcmVxdWlyZShcIi0hLi9sdW5yLmpzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2V4cG9zZS1sb2FkZXI/bHVuciEuL25vZGVfbW9kdWxlcy9sdW5yL2x1bnIuanMtZXhwb3NlZFxuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBsdW5yIC0gaHR0cDovL2x1bnJqcy5jb20gLSBBIGJpdCBsaWtlIFNvbHIsIGJ1dCBtdWNoIHNtYWxsZXIgYW5kIG5vdCBhcyBicmlnaHQgLSAyLjEuNFxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICogQGxpY2Vuc2UgTUlUXG4gKi9cblxuOyhmdW5jdGlvbigpe1xuXG4vKipcbiAqIEEgY29udmVuaWVuY2UgZnVuY3Rpb24gZm9yIGNvbmZpZ3VyaW5nIGFuZCBjb25zdHJ1Y3RpbmdcbiAqIGEgbmV3IGx1bnIgSW5kZXguXG4gKlxuICogQSBsdW5yLkJ1aWxkZXIgaW5zdGFuY2UgaXMgY3JlYXRlZCBhbmQgdGhlIHBpcGVsaW5lIHNldHVwXG4gKiB3aXRoIGEgdHJpbW1lciwgc3RvcCB3b3JkIGZpbHRlciBhbmQgc3RlbW1lci5cbiAqXG4gKiBUaGlzIGJ1aWxkZXIgb2JqZWN0IGlzIHlpZWxkZWQgdG8gdGhlIGNvbmZpZ3VyYXRpb24gZnVuY3Rpb25cbiAqIHRoYXQgaXMgcGFzc2VkIGFzIGEgcGFyYW1ldGVyLCBhbGxvd2luZyB0aGUgbGlzdCBvZiBmaWVsZHNcbiAqIGFuZCBvdGhlciBidWlsZGVyIHBhcmFtZXRlcnMgdG8gYmUgY3VzdG9taXNlZC5cbiAqXG4gKiBBbGwgZG9jdW1lbnRzIF9tdXN0XyBiZSBhZGRlZCB3aXRoaW4gdGhlIHBhc3NlZCBjb25maWcgZnVuY3Rpb24uXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBpZHggPSBsdW5yKGZ1bmN0aW9uICgpIHtcbiAqICAgdGhpcy5maWVsZCgndGl0bGUnKVxuICogICB0aGlzLmZpZWxkKCdib2R5JylcbiAqICAgdGhpcy5yZWYoJ2lkJylcbiAqXG4gKiAgIGRvY3VtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChkb2MpIHtcbiAqICAgICB0aGlzLmFkZChkb2MpXG4gKiAgIH0sIHRoaXMpXG4gKiB9KVxuICpcbiAqIEBzZWUge0BsaW5rIGx1bnIuQnVpbGRlcn1cbiAqIEBzZWUge0BsaW5rIGx1bnIuUGlwZWxpbmV9XG4gKiBAc2VlIHtAbGluayBsdW5yLnRyaW1tZXJ9XG4gKiBAc2VlIHtAbGluayBsdW5yLnN0b3BXb3JkRmlsdGVyfVxuICogQHNlZSB7QGxpbmsgbHVuci5zdGVtbWVyfVxuICogQG5hbWVzcGFjZSB7ZnVuY3Rpb259IGx1bnJcbiAqL1xudmFyIGx1bnIgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gIHZhciBidWlsZGVyID0gbmV3IGx1bnIuQnVpbGRlclxuXG4gIGJ1aWxkZXIucGlwZWxpbmUuYWRkKFxuICAgIGx1bnIudHJpbW1lcixcbiAgICBsdW5yLnN0b3BXb3JkRmlsdGVyLFxuICAgIGx1bnIuc3RlbW1lclxuICApXG5cbiAgYnVpbGRlci5zZWFyY2hQaXBlbGluZS5hZGQoXG4gICAgbHVuci5zdGVtbWVyXG4gIClcblxuICBjb25maWcuY2FsbChidWlsZGVyLCBidWlsZGVyKVxuICByZXR1cm4gYnVpbGRlci5idWlsZCgpXG59XG5cbmx1bnIudmVyc2lvbiA9IFwiMi4xLjRcIlxuLyohXG4gKiBsdW5yLnV0aWxzXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBBIG5hbWVzcGFjZSBjb250YWluaW5nIHV0aWxzIGZvciB0aGUgcmVzdCBvZiB0aGUgbHVuciBsaWJyYXJ5XG4gKi9cbmx1bnIudXRpbHMgPSB7fVxuXG4vKipcbiAqIFByaW50IGEgd2FybmluZyBtZXNzYWdlIHRvIHRoZSBjb25zb2xlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGJlIHByaW50ZWQuXG4gKiBAbWVtYmVyT2YgVXRpbHNcbiAqL1xubHVuci51dGlscy53YXJuID0gKGZ1bmN0aW9uIChnbG9iYWwpIHtcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuICByZXR1cm4gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICBpZiAoZ2xvYmFsLmNvbnNvbGUgJiYgY29uc29sZS53YXJuKSB7XG4gICAgICBjb25zb2xlLndhcm4obWVzc2FnZSlcbiAgICB9XG4gIH1cbiAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG59KSh0aGlzKVxuXG4vKipcbiAqIENvbnZlcnQgYW4gb2JqZWN0IHRvIGEgc3RyaW5nLlxuICpcbiAqIEluIHRoZSBjYXNlIG9mIGBudWxsYCBhbmQgYHVuZGVmaW5lZGAgdGhlIGZ1bmN0aW9uIHJldHVybnNcbiAqIHRoZSBlbXB0eSBzdHJpbmcsIGluIGFsbCBvdGhlciBjYXNlcyB0aGUgcmVzdWx0IG9mIGNhbGxpbmdcbiAqIGB0b1N0cmluZ2Agb24gdGhlIHBhc3NlZCBvYmplY3QgaXMgcmV0dXJuZWQuXG4gKlxuICogQHBhcmFtIHtBbnl9IG9iaiBUaGUgb2JqZWN0IHRvIGNvbnZlcnQgdG8gYSBzdHJpbmcuXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgcGFzc2VkIG9iamVjdC5cbiAqIEBtZW1iZXJPZiBVdGlsc1xuICovXG5sdW5yLnV0aWxzLmFzU3RyaW5nID0gZnVuY3Rpb24gKG9iaikge1xuICBpZiAob2JqID09PSB2b2lkIDAgfHwgb2JqID09PSBudWxsKSB7XG4gICAgcmV0dXJuIFwiXCJcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb2JqLnRvU3RyaW5nKClcbiAgfVxufVxubHVuci5GaWVsZFJlZiA9IGZ1bmN0aW9uIChkb2NSZWYsIGZpZWxkTmFtZSwgc3RyaW5nVmFsdWUpIHtcbiAgdGhpcy5kb2NSZWYgPSBkb2NSZWZcbiAgdGhpcy5maWVsZE5hbWUgPSBmaWVsZE5hbWVcbiAgdGhpcy5fc3RyaW5nVmFsdWUgPSBzdHJpbmdWYWx1ZVxufVxuXG5sdW5yLkZpZWxkUmVmLmpvaW5lciA9IFwiL1wiXG5cbmx1bnIuRmllbGRSZWYuZnJvbVN0cmluZyA9IGZ1bmN0aW9uIChzKSB7XG4gIHZhciBuID0gcy5pbmRleE9mKGx1bnIuRmllbGRSZWYuam9pbmVyKVxuXG4gIGlmIChuID09PSAtMSkge1xuICAgIHRocm93IFwibWFsZm9ybWVkIGZpZWxkIHJlZiBzdHJpbmdcIlxuICB9XG5cbiAgdmFyIGZpZWxkUmVmID0gcy5zbGljZSgwLCBuKSxcbiAgICAgIGRvY1JlZiA9IHMuc2xpY2UobiArIDEpXG5cbiAgcmV0dXJuIG5ldyBsdW5yLkZpZWxkUmVmIChkb2NSZWYsIGZpZWxkUmVmLCBzKVxufVxuXG5sdW5yLkZpZWxkUmVmLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuX3N0cmluZ1ZhbHVlID09IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuX3N0cmluZ1ZhbHVlID0gdGhpcy5maWVsZE5hbWUgKyBsdW5yLkZpZWxkUmVmLmpvaW5lciArIHRoaXMuZG9jUmVmXG4gIH1cblxuICByZXR1cm4gdGhpcy5fc3RyaW5nVmFsdWVcbn1cbi8qKlxuICogQSBmdW5jdGlvbiB0byBjYWxjdWxhdGUgdGhlIGludmVyc2UgZG9jdW1lbnQgZnJlcXVlbmN5IGZvclxuICogYSBwb3N0aW5nLiBUaGlzIGlzIHNoYXJlZCBiZXR3ZWVuIHRoZSBidWlsZGVyIGFuZCB0aGUgaW5kZXhcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtvYmplY3R9IHBvc3RpbmcgLSBUaGUgcG9zdGluZyBmb3IgYSBnaXZlbiB0ZXJtXG4gKiBAcGFyYW0ge251bWJlcn0gZG9jdW1lbnRDb3VudCAtIFRoZSB0b3RhbCBudW1iZXIgb2YgZG9jdW1lbnRzLlxuICovXG5sdW5yLmlkZiA9IGZ1bmN0aW9uIChwb3N0aW5nLCBkb2N1bWVudENvdW50KSB7XG4gIHZhciBkb2N1bWVudHNXaXRoVGVybSA9IDBcblxuICBmb3IgKHZhciBmaWVsZE5hbWUgaW4gcG9zdGluZykge1xuICAgIGlmIChmaWVsZE5hbWUgPT0gJ19pbmRleCcpIGNvbnRpbnVlIC8vIElnbm9yZSB0aGUgdGVybSBpbmRleCwgaXRzIG5vdCBhIGZpZWxkXG4gICAgZG9jdW1lbnRzV2l0aFRlcm0gKz0gT2JqZWN0LmtleXMocG9zdGluZ1tmaWVsZE5hbWVdKS5sZW5ndGhcbiAgfVxuXG4gIHZhciB4ID0gKGRvY3VtZW50Q291bnQgLSBkb2N1bWVudHNXaXRoVGVybSArIDAuNSkgLyAoZG9jdW1lbnRzV2l0aFRlcm0gKyAwLjUpXG5cbiAgcmV0dXJuIE1hdGgubG9nKDEgKyBNYXRoLmFicyh4KSlcbn1cblxuLyoqXG4gKiBBIHRva2VuIHdyYXBzIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgdG9rZW5cbiAqIGFzIGl0IGlzIHBhc3NlZCB0aHJvdWdoIHRoZSB0ZXh0IHByb2Nlc3NpbmcgcGlwZWxpbmUuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cj0nJ10gLSBUaGUgc3RyaW5nIHRva2VuIGJlaW5nIHdyYXBwZWQuXG4gKiBAcGFyYW0ge29iamVjdH0gW21ldGFkYXRhPXt9XSAtIE1ldGFkYXRhIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHRva2VuLlxuICovXG5sdW5yLlRva2VuID0gZnVuY3Rpb24gKHN0ciwgbWV0YWRhdGEpIHtcbiAgdGhpcy5zdHIgPSBzdHIgfHwgXCJcIlxuICB0aGlzLm1ldGFkYXRhID0gbWV0YWRhdGEgfHwge31cbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSB0b2tlbiBzdHJpbmcgdGhhdCBpcyBiZWluZyB3cmFwcGVkIGJ5IHRoaXMgb2JqZWN0LlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmx1bnIuVG9rZW4ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5zdHJcbn1cblxuLyoqXG4gKiBBIHRva2VuIHVwZGF0ZSBmdW5jdGlvbiBpcyB1c2VkIHdoZW4gdXBkYXRpbmcgb3Igb3B0aW9uYWxseVxuICogd2hlbiBjbG9uaW5nIGEgdG9rZW4uXG4gKlxuICogQGNhbGxiYWNrIGx1bnIuVG9rZW5+dXBkYXRlRnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB0b2tlbi5cbiAqIEBwYXJhbSB7T2JqZWN0fSBtZXRhZGF0YSAtIEFsbCBtZXRhZGF0YSBhc3NvY2lhdGVkIHdpdGggdGhpcyB0b2tlbi5cbiAqL1xuXG4vKipcbiAqIEFwcGxpZXMgdGhlIGdpdmVuIGZ1bmN0aW9uIHRvIHRoZSB3cmFwcGVkIHN0cmluZyB0b2tlbi5cbiAqXG4gKiBAZXhhbXBsZVxuICogdG9rZW4udXBkYXRlKGZ1bmN0aW9uIChzdHIsIG1ldGFkYXRhKSB7XG4gKiAgIHJldHVybiBzdHIudG9VcHBlckNhc2UoKVxuICogfSlcbiAqXG4gKiBAcGFyYW0ge2x1bnIuVG9rZW5+dXBkYXRlRnVuY3Rpb259IGZuIC0gQSBmdW5jdGlvbiB0byBhcHBseSB0byB0aGUgdG9rZW4gc3RyaW5nLlxuICogQHJldHVybnMge2x1bnIuVG9rZW59XG4gKi9cbmx1bnIuVG9rZW4ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChmbikge1xuICB0aGlzLnN0ciA9IGZuKHRoaXMuc3RyLCB0aGlzLm1ldGFkYXRhKVxuICByZXR1cm4gdGhpc1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiB0aGlzIHRva2VuLiBPcHRpb25hbGx5IGEgZnVuY3Rpb24gY2FuIGJlXG4gKiBhcHBsaWVkIHRvIHRoZSBjbG9uZWQgdG9rZW4uXG4gKlxuICogQHBhcmFtIHtsdW5yLlRva2VufnVwZGF0ZUZ1bmN0aW9ufSBbZm5dIC0gQW4gb3B0aW9uYWwgZnVuY3Rpb24gdG8gYXBwbHkgdG8gdGhlIGNsb25lZCB0b2tlbi5cbiAqIEByZXR1cm5zIHtsdW5yLlRva2VufVxuICovXG5sdW5yLlRva2VuLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uIChmbikge1xuICBmbiA9IGZuIHx8IGZ1bmN0aW9uIChzKSB7IHJldHVybiBzIH1cbiAgcmV0dXJuIG5ldyBsdW5yLlRva2VuIChmbih0aGlzLnN0ciwgdGhpcy5tZXRhZGF0YSksIHRoaXMubWV0YWRhdGEpXG59XG4vKiFcbiAqIGx1bnIudG9rZW5pemVyXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBBIGZ1bmN0aW9uIGZvciBzcGxpdHRpbmcgYSBzdHJpbmcgaW50byB0b2tlbnMgcmVhZHkgdG8gYmUgaW5zZXJ0ZWQgaW50b1xuICogdGhlIHNlYXJjaCBpbmRleC4gVXNlcyBgbHVuci50b2tlbml6ZXIuc2VwYXJhdG9yYCB0byBzcGxpdCBzdHJpbmdzLCBjaGFuZ2VcbiAqIHRoZSB2YWx1ZSBvZiB0aGlzIHByb3BlcnR5IHRvIGNoYW5nZSBob3cgc3RyaW5ncyBhcmUgc3BsaXQgaW50byB0b2tlbnMuXG4gKlxuICogVGhpcyB0b2tlbml6ZXIgd2lsbCBjb252ZXJ0IGl0cyBwYXJhbWV0ZXIgdG8gYSBzdHJpbmcgYnkgY2FsbGluZyBgdG9TdHJpbmdgIGFuZFxuICogdGhlbiB3aWxsIHNwbGl0IHRoaXMgc3RyaW5nIG9uIHRoZSBjaGFyYWN0ZXIgaW4gYGx1bnIudG9rZW5pemVyLnNlcGFyYXRvcmAuXG4gKiBBcnJheXMgd2lsbCBoYXZlIHRoZWlyIGVsZW1lbnRzIGNvbnZlcnRlZCB0byBzdHJpbmdzIGFuZCB3cmFwcGVkIGluIGEgbHVuci5Ub2tlbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAcGFyYW0gez8oc3RyaW5nfG9iamVjdHxvYmplY3RbXSl9IG9iaiAtIFRoZSBvYmplY3QgdG8gY29udmVydCBpbnRvIHRva2Vuc1xuICogQHJldHVybnMge2x1bnIuVG9rZW5bXX1cbiAqL1xubHVuci50b2tlbml6ZXIgPSBmdW5jdGlvbiAob2JqKSB7XG4gIGlmIChvYmogPT0gbnVsbCB8fCBvYmogPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIG9iai5tYXAoZnVuY3Rpb24gKHQpIHtcbiAgICAgIHJldHVybiBuZXcgbHVuci5Ub2tlbihsdW5yLnV0aWxzLmFzU3RyaW5nKHQpLnRvTG93ZXJDYXNlKCkpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBzdHIgPSBvYmoudG9TdHJpbmcoKS50cmltKCkudG9Mb3dlckNhc2UoKSxcbiAgICAgIGxlbiA9IHN0ci5sZW5ndGgsXG4gICAgICB0b2tlbnMgPSBbXVxuXG4gIGZvciAodmFyIHNsaWNlRW5kID0gMCwgc2xpY2VTdGFydCA9IDA7IHNsaWNlRW5kIDw9IGxlbjsgc2xpY2VFbmQrKykge1xuICAgIHZhciBjaGFyID0gc3RyLmNoYXJBdChzbGljZUVuZCksXG4gICAgICAgIHNsaWNlTGVuZ3RoID0gc2xpY2VFbmQgLSBzbGljZVN0YXJ0XG5cbiAgICBpZiAoKGNoYXIubWF0Y2gobHVuci50b2tlbml6ZXIuc2VwYXJhdG9yKSB8fCBzbGljZUVuZCA9PSBsZW4pKSB7XG5cbiAgICAgIGlmIChzbGljZUxlbmd0aCA+IDApIHtcbiAgICAgICAgdG9rZW5zLnB1c2goXG4gICAgICAgICAgbmV3IGx1bnIuVG9rZW4gKHN0ci5zbGljZShzbGljZVN0YXJ0LCBzbGljZUVuZCksIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBbc2xpY2VTdGFydCwgc2xpY2VMZW5ndGhdLFxuICAgICAgICAgICAgaW5kZXg6IHRva2Vucy5sZW5ndGhcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHNsaWNlU3RhcnQgPSBzbGljZUVuZCArIDFcbiAgICB9XG5cbiAgfVxuXG4gIHJldHVybiB0b2tlbnNcbn1cblxuLyoqXG4gKiBUaGUgc2VwYXJhdG9yIHVzZWQgdG8gc3BsaXQgYSBzdHJpbmcgaW50byB0b2tlbnMuIE92ZXJyaWRlIHRoaXMgcHJvcGVydHkgdG8gY2hhbmdlIHRoZSBiZWhhdmlvdXIgb2ZcbiAqIGBsdW5yLnRva2VuaXplcmAgYmVoYXZpb3VyIHdoZW4gdG9rZW5pemluZyBzdHJpbmdzLiBCeSBkZWZhdWx0IHRoaXMgc3BsaXRzIG9uIHdoaXRlc3BhY2UgYW5kIGh5cGhlbnMuXG4gKlxuICogQHN0YXRpY1xuICogQHNlZSBsdW5yLnRva2VuaXplclxuICovXG5sdW5yLnRva2VuaXplci5zZXBhcmF0b3IgPSAvW1xcc1xcLV0rL1xuLyohXG4gKiBsdW5yLlBpcGVsaW5lXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBsdW5yLlBpcGVsaW5lcyBtYWludGFpbiBhbiBvcmRlcmVkIGxpc3Qgb2YgZnVuY3Rpb25zIHRvIGJlIGFwcGxpZWQgdG8gYWxsXG4gKiB0b2tlbnMgaW4gZG9jdW1lbnRzIGVudGVyaW5nIHRoZSBzZWFyY2ggaW5kZXggYW5kIHF1ZXJpZXMgYmVpbmcgcmFuIGFnYWluc3RcbiAqIHRoZSBpbmRleC5cbiAqXG4gKiBBbiBpbnN0YW5jZSBvZiBsdW5yLkluZGV4IGNyZWF0ZWQgd2l0aCB0aGUgbHVuciBzaG9ydGN1dCB3aWxsIGNvbnRhaW4gYVxuICogcGlwZWxpbmUgd2l0aCBhIHN0b3Agd29yZCBmaWx0ZXIgYW5kIGFuIEVuZ2xpc2ggbGFuZ3VhZ2Ugc3RlbW1lci4gRXh0cmFcbiAqIGZ1bmN0aW9ucyBjYW4gYmUgYWRkZWQgYmVmb3JlIG9yIGFmdGVyIGVpdGhlciBvZiB0aGVzZSBmdW5jdGlvbnMgb3IgdGhlc2VcbiAqIGRlZmF1bHQgZnVuY3Rpb25zIGNhbiBiZSByZW1vdmVkLlxuICpcbiAqIFdoZW4gcnVuIHRoZSBwaXBlbGluZSB3aWxsIGNhbGwgZWFjaCBmdW5jdGlvbiBpbiB0dXJuLCBwYXNzaW5nIGEgdG9rZW4sIHRoZVxuICogaW5kZXggb2YgdGhhdCB0b2tlbiBpbiB0aGUgb3JpZ2luYWwgbGlzdCBvZiBhbGwgdG9rZW5zIGFuZCBmaW5hbGx5IGEgbGlzdCBvZlxuICogYWxsIHRoZSBvcmlnaW5hbCB0b2tlbnMuXG4gKlxuICogVGhlIG91dHB1dCBvZiBmdW5jdGlvbnMgaW4gdGhlIHBpcGVsaW5lIHdpbGwgYmUgcGFzc2VkIHRvIHRoZSBuZXh0IGZ1bmN0aW9uXG4gKiBpbiB0aGUgcGlwZWxpbmUuIFRvIGV4Y2x1ZGUgYSB0b2tlbiBmcm9tIGVudGVyaW5nIHRoZSBpbmRleCB0aGUgZnVuY3Rpb25cbiAqIHNob3VsZCByZXR1cm4gdW5kZWZpbmVkLCB0aGUgcmVzdCBvZiB0aGUgcGlwZWxpbmUgd2lsbCBub3QgYmUgY2FsbGVkIHdpdGhcbiAqIHRoaXMgdG9rZW4uXG4gKlxuICogRm9yIHNlcmlhbGlzYXRpb24gb2YgcGlwZWxpbmVzIHRvIHdvcmssIGFsbCBmdW5jdGlvbnMgdXNlZCBpbiBhbiBpbnN0YW5jZSBvZlxuICogYSBwaXBlbGluZSBzaG91bGQgYmUgcmVnaXN0ZXJlZCB3aXRoIGx1bnIuUGlwZWxpbmUuIFJlZ2lzdGVyZWQgZnVuY3Rpb25zIGNhblxuICogdGhlbiBiZSBsb2FkZWQuIElmIHRyeWluZyB0byBsb2FkIGEgc2VyaWFsaXNlZCBwaXBlbGluZSB0aGF0IHVzZXMgZnVuY3Rpb25zXG4gKiB0aGF0IGFyZSBub3QgcmVnaXN0ZXJlZCBhbiBlcnJvciB3aWxsIGJlIHRocm93bi5cbiAqXG4gKiBJZiBub3QgcGxhbm5pbmcgb24gc2VyaWFsaXNpbmcgdGhlIHBpcGVsaW5lIHRoZW4gcmVnaXN0ZXJpbmcgcGlwZWxpbmUgZnVuY3Rpb25zXG4gKiBpcyBub3QgbmVjZXNzYXJ5LlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5sdW5yLlBpcGVsaW5lID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLl9zdGFjayA9IFtdXG59XG5cbmx1bnIuUGlwZWxpbmUucmVnaXN0ZXJlZEZ1bmN0aW9ucyA9IE9iamVjdC5jcmVhdGUobnVsbClcblxuLyoqXG4gKiBBIHBpcGVsaW5lIGZ1bmN0aW9uIG1hcHMgbHVuci5Ub2tlbiB0byBsdW5yLlRva2VuLiBBIGx1bnIuVG9rZW4gY29udGFpbnMgdGhlIHRva2VuXG4gKiBzdHJpbmcgYXMgd2VsbCBhcyBhbGwga25vd24gbWV0YWRhdGEuIEEgcGlwZWxpbmUgZnVuY3Rpb24gY2FuIG11dGF0ZSB0aGUgdG9rZW4gc3RyaW5nXG4gKiBvciBtdXRhdGUgKG9yIGFkZCkgbWV0YWRhdGEgZm9yIGEgZ2l2ZW4gdG9rZW4uXG4gKlxuICogQSBwaXBlbGluZSBmdW5jdGlvbiBjYW4gaW5kaWNhdGUgdGhhdCB0aGUgcGFzc2VkIHRva2VuIHNob3VsZCBiZSBkaXNjYXJkZWQgYnkgcmV0dXJuaW5nXG4gKiBudWxsLiBUaGlzIHRva2VuIHdpbGwgbm90IGJlIHBhc3NlZCB0byBhbnkgZG93bnN0cmVhbSBwaXBlbGluZSBmdW5jdGlvbnMgYW5kIHdpbGwgbm90IGJlXG4gKiBhZGRlZCB0byB0aGUgaW5kZXguXG4gKlxuICogTXVsdGlwbGUgdG9rZW5zIGNhbiBiZSByZXR1cm5lZCBieSByZXR1cm5pbmcgYW4gYXJyYXkgb2YgdG9rZW5zLiBFYWNoIHRva2VuIHdpbGwgYmUgcGFzc2VkXG4gKiB0byBhbnkgZG93bnN0cmVhbSBwaXBlbGluZSBmdW5jdGlvbnMgYW5kIGFsbCB3aWxsIHJldHVybmVkIHRva2VucyB3aWxsIGJlIGFkZGVkIHRvIHRoZSBpbmRleC5cbiAqXG4gKiBBbnkgbnVtYmVyIG9mIHBpcGVsaW5lIGZ1bmN0aW9ucyBtYXkgYmUgY2hhaW5lZCB0b2dldGhlciB1c2luZyBhIGx1bnIuUGlwZWxpbmUuXG4gKlxuICogQGludGVyZmFjZSBsdW5yLlBpcGVsaW5lRnVuY3Rpb25cbiAqIEBwYXJhbSB7bHVuci5Ub2tlbn0gdG9rZW4gLSBBIHRva2VuIGZyb20gdGhlIGRvY3VtZW50IGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBpIC0gVGhlIGluZGV4IG9mIHRoaXMgdG9rZW4gaW4gdGhlIGNvbXBsZXRlIGxpc3Qgb2YgdG9rZW5zIGZvciB0aGlzIGRvY3VtZW50L2ZpZWxkLlxuICogQHBhcmFtIHtsdW5yLlRva2VuW119IHRva2VucyAtIEFsbCB0b2tlbnMgZm9yIHRoaXMgZG9jdW1lbnQvZmllbGQuXG4gKiBAcmV0dXJucyB7KD9sdW5yLlRva2VufGx1bnIuVG9rZW5bXSl9XG4gKi9cblxuLyoqXG4gKiBSZWdpc3RlciBhIGZ1bmN0aW9uIHdpdGggdGhlIHBpcGVsaW5lLlxuICpcbiAqIEZ1bmN0aW9ucyB0aGF0IGFyZSB1c2VkIGluIHRoZSBwaXBlbGluZSBzaG91bGQgYmUgcmVnaXN0ZXJlZCBpZiB0aGUgcGlwZWxpbmVcbiAqIG5lZWRzIHRvIGJlIHNlcmlhbGlzZWQsIG9yIGEgc2VyaWFsaXNlZCBwaXBlbGluZSBuZWVkcyB0byBiZSBsb2FkZWQuXG4gKlxuICogUmVnaXN0ZXJpbmcgYSBmdW5jdGlvbiBkb2VzIG5vdCBhZGQgaXQgdG8gYSBwaXBlbGluZSwgZnVuY3Rpb25zIG11c3Qgc3RpbGwgYmVcbiAqIGFkZGVkIHRvIGluc3RhbmNlcyBvZiB0aGUgcGlwZWxpbmUgZm9yIHRoZW0gdG8gYmUgdXNlZCB3aGVuIHJ1bm5pbmcgYSBwaXBlbGluZS5cbiAqXG4gKiBAcGFyYW0ge2x1bnIuUGlwZWxpbmVGdW5jdGlvbn0gZm4gLSBUaGUgZnVuY3Rpb24gdG8gY2hlY2sgZm9yLlxuICogQHBhcmFtIHtTdHJpbmd9IGxhYmVsIC0gVGhlIGxhYmVsIHRvIHJlZ2lzdGVyIHRoaXMgZnVuY3Rpb24gd2l0aFxuICovXG5sdW5yLlBpcGVsaW5lLnJlZ2lzdGVyRnVuY3Rpb24gPSBmdW5jdGlvbiAoZm4sIGxhYmVsKSB7XG4gIGlmIChsYWJlbCBpbiB0aGlzLnJlZ2lzdGVyZWRGdW5jdGlvbnMpIHtcbiAgICBsdW5yLnV0aWxzLndhcm4oJ092ZXJ3cml0aW5nIGV4aXN0aW5nIHJlZ2lzdGVyZWQgZnVuY3Rpb246ICcgKyBsYWJlbClcbiAgfVxuXG4gIGZuLmxhYmVsID0gbGFiZWxcbiAgbHVuci5QaXBlbGluZS5yZWdpc3RlcmVkRnVuY3Rpb25zW2ZuLmxhYmVsXSA9IGZuXG59XG5cbi8qKlxuICogV2FybnMgaWYgdGhlIGZ1bmN0aW9uIGlzIG5vdCByZWdpc3RlcmVkIGFzIGEgUGlwZWxpbmUgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtsdW5yLlBpcGVsaW5lRnVuY3Rpb259IGZuIC0gVGhlIGZ1bmN0aW9uIHRvIGNoZWNrIGZvci5cbiAqIEBwcml2YXRlXG4gKi9cbmx1bnIuUGlwZWxpbmUud2FybklmRnVuY3Rpb25Ob3RSZWdpc3RlcmVkID0gZnVuY3Rpb24gKGZuKSB7XG4gIHZhciBpc1JlZ2lzdGVyZWQgPSBmbi5sYWJlbCAmJiAoZm4ubGFiZWwgaW4gdGhpcy5yZWdpc3RlcmVkRnVuY3Rpb25zKVxuXG4gIGlmICghaXNSZWdpc3RlcmVkKSB7XG4gICAgbHVuci51dGlscy53YXJuKCdGdW5jdGlvbiBpcyBub3QgcmVnaXN0ZXJlZCB3aXRoIHBpcGVsaW5lLiBUaGlzIG1heSBjYXVzZSBwcm9ibGVtcyB3aGVuIHNlcmlhbGlzaW5nIHRoZSBpbmRleC5cXG4nLCBmbilcbiAgfVxufVxuXG4vKipcbiAqIExvYWRzIGEgcHJldmlvdXNseSBzZXJpYWxpc2VkIHBpcGVsaW5lLlxuICpcbiAqIEFsbCBmdW5jdGlvbnMgdG8gYmUgbG9hZGVkIG11c3QgYWxyZWFkeSBiZSByZWdpc3RlcmVkIHdpdGggbHVuci5QaXBlbGluZS5cbiAqIElmIGFueSBmdW5jdGlvbiBmcm9tIHRoZSBzZXJpYWxpc2VkIGRhdGEgaGFzIG5vdCBiZWVuIHJlZ2lzdGVyZWQgdGhlbiBhblxuICogZXJyb3Igd2lsbCBiZSB0aHJvd24uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHNlcmlhbGlzZWQgLSBUaGUgc2VyaWFsaXNlZCBwaXBlbGluZSB0byBsb2FkLlxuICogQHJldHVybnMge2x1bnIuUGlwZWxpbmV9XG4gKi9cbmx1bnIuUGlwZWxpbmUubG9hZCA9IGZ1bmN0aW9uIChzZXJpYWxpc2VkKSB7XG4gIHZhciBwaXBlbGluZSA9IG5ldyBsdW5yLlBpcGVsaW5lXG5cbiAgc2VyaWFsaXNlZC5mb3JFYWNoKGZ1bmN0aW9uIChmbk5hbWUpIHtcbiAgICB2YXIgZm4gPSBsdW5yLlBpcGVsaW5lLnJlZ2lzdGVyZWRGdW5jdGlvbnNbZm5OYW1lXVxuXG4gICAgaWYgKGZuKSB7XG4gICAgICBwaXBlbGluZS5hZGQoZm4pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGxvYWQgdW5yZWdpc3RlcmVkIGZ1bmN0aW9uOiAnICsgZm5OYW1lKVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gcGlwZWxpbmVcbn1cblxuLyoqXG4gKiBBZGRzIG5ldyBmdW5jdGlvbnMgdG8gdGhlIGVuZCBvZiB0aGUgcGlwZWxpbmUuXG4gKlxuICogTG9ncyBhIHdhcm5pbmcgaWYgdGhlIGZ1bmN0aW9uIGhhcyBub3QgYmVlbiByZWdpc3RlcmVkLlxuICpcbiAqIEBwYXJhbSB7bHVuci5QaXBlbGluZUZ1bmN0aW9uW119IGZ1bmN0aW9ucyAtIEFueSBudW1iZXIgb2YgZnVuY3Rpb25zIHRvIGFkZCB0byB0aGUgcGlwZWxpbmUuXG4gKi9cbmx1bnIuUGlwZWxpbmUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGZucyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cylcblxuICBmbnMuZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICBsdW5yLlBpcGVsaW5lLndhcm5JZkZ1bmN0aW9uTm90UmVnaXN0ZXJlZChmbilcbiAgICB0aGlzLl9zdGFjay5wdXNoKGZuKVxuICB9LCB0aGlzKVxufVxuXG4vKipcbiAqIEFkZHMgYSBzaW5nbGUgZnVuY3Rpb24gYWZ0ZXIgYSBmdW5jdGlvbiB0aGF0IGFscmVhZHkgZXhpc3RzIGluIHRoZVxuICogcGlwZWxpbmUuXG4gKlxuICogTG9ncyBhIHdhcm5pbmcgaWYgdGhlIGZ1bmN0aW9uIGhhcyBub3QgYmVlbiByZWdpc3RlcmVkLlxuICpcbiAqIEBwYXJhbSB7bHVuci5QaXBlbGluZUZ1bmN0aW9ufSBleGlzdGluZ0ZuIC0gQSBmdW5jdGlvbiB0aGF0IGFscmVhZHkgZXhpc3RzIGluIHRoZSBwaXBlbGluZS5cbiAqIEBwYXJhbSB7bHVuci5QaXBlbGluZUZ1bmN0aW9ufSBuZXdGbiAtIFRoZSBuZXcgZnVuY3Rpb24gdG8gYWRkIHRvIHRoZSBwaXBlbGluZS5cbiAqL1xubHVuci5QaXBlbGluZS5wcm90b3R5cGUuYWZ0ZXIgPSBmdW5jdGlvbiAoZXhpc3RpbmdGbiwgbmV3Rm4pIHtcbiAgbHVuci5QaXBlbGluZS53YXJuSWZGdW5jdGlvbk5vdFJlZ2lzdGVyZWQobmV3Rm4pXG5cbiAgdmFyIHBvcyA9IHRoaXMuX3N0YWNrLmluZGV4T2YoZXhpc3RpbmdGbilcbiAgaWYgKHBvcyA9PSAtMSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGZpbmQgZXhpc3RpbmdGbicpXG4gIH1cblxuICBwb3MgPSBwb3MgKyAxXG4gIHRoaXMuX3N0YWNrLnNwbGljZShwb3MsIDAsIG5ld0ZuKVxufVxuXG4vKipcbiAqIEFkZHMgYSBzaW5nbGUgZnVuY3Rpb24gYmVmb3JlIGEgZnVuY3Rpb24gdGhhdCBhbHJlYWR5IGV4aXN0cyBpbiB0aGVcbiAqIHBpcGVsaW5lLlxuICpcbiAqIExvZ3MgYSB3YXJuaW5nIGlmIHRoZSBmdW5jdGlvbiBoYXMgbm90IGJlZW4gcmVnaXN0ZXJlZC5cbiAqXG4gKiBAcGFyYW0ge2x1bnIuUGlwZWxpbmVGdW5jdGlvbn0gZXhpc3RpbmdGbiAtIEEgZnVuY3Rpb24gdGhhdCBhbHJlYWR5IGV4aXN0cyBpbiB0aGUgcGlwZWxpbmUuXG4gKiBAcGFyYW0ge2x1bnIuUGlwZWxpbmVGdW5jdGlvbn0gbmV3Rm4gLSBUaGUgbmV3IGZ1bmN0aW9uIHRvIGFkZCB0byB0aGUgcGlwZWxpbmUuXG4gKi9cbmx1bnIuUGlwZWxpbmUucHJvdG90eXBlLmJlZm9yZSA9IGZ1bmN0aW9uIChleGlzdGluZ0ZuLCBuZXdGbikge1xuICBsdW5yLlBpcGVsaW5lLndhcm5JZkZ1bmN0aW9uTm90UmVnaXN0ZXJlZChuZXdGbilcblxuICB2YXIgcG9zID0gdGhpcy5fc3RhY2suaW5kZXhPZihleGlzdGluZ0ZuKVxuICBpZiAocG9zID09IC0xKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZmluZCBleGlzdGluZ0ZuJylcbiAgfVxuXG4gIHRoaXMuX3N0YWNrLnNwbGljZShwb3MsIDAsIG5ld0ZuKVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYSBmdW5jdGlvbiBmcm9tIHRoZSBwaXBlbGluZS5cbiAqXG4gKiBAcGFyYW0ge2x1bnIuUGlwZWxpbmVGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHJlbW92ZSBmcm9tIHRoZSBwaXBlbGluZS5cbiAqL1xubHVuci5QaXBlbGluZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGZuKSB7XG4gIHZhciBwb3MgPSB0aGlzLl9zdGFjay5pbmRleE9mKGZuKVxuICBpZiAocG9zID09IC0xKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB0aGlzLl9zdGFjay5zcGxpY2UocG9zLCAxKVxufVxuXG4vKipcbiAqIFJ1bnMgdGhlIGN1cnJlbnQgbGlzdCBvZiBmdW5jdGlvbnMgdGhhdCBtYWtlIHVwIHRoZSBwaXBlbGluZSBhZ2FpbnN0IHRoZVxuICogcGFzc2VkIHRva2Vucy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSB0b2tlbnMgVGhlIHRva2VucyB0byBydW4gdGhyb3VnaCB0aGUgcGlwZWxpbmUuXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbmx1bnIuUGlwZWxpbmUucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICh0b2tlbnMpIHtcbiAgdmFyIHN0YWNrTGVuZ3RoID0gdGhpcy5fc3RhY2subGVuZ3RoXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGFja0xlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGZuID0gdGhpcy5fc3RhY2tbaV1cblxuICAgIHRva2VucyA9IHRva2Vucy5yZWR1Y2UoZnVuY3Rpb24gKG1lbW8sIHRva2VuLCBqKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gZm4odG9rZW4sIGosIHRva2VucylcblxuICAgICAgaWYgKHJlc3VsdCA9PT0gdm9pZCAwIHx8IHJlc3VsdCA9PT0gJycpIHJldHVybiBtZW1vXG5cbiAgICAgIHJldHVybiBtZW1vLmNvbmNhdChyZXN1bHQpXG4gICAgfSwgW10pXG4gIH1cblxuICByZXR1cm4gdG9rZW5zXG59XG5cbi8qKlxuICogQ29udmVuaWVuY2UgbWV0aG9kIGZvciBwYXNzaW5nIGEgc3RyaW5nIHRocm91Z2ggYSBwaXBlbGluZSBhbmQgZ2V0dGluZ1xuICogc3RyaW5ncyBvdXQuIFRoaXMgbWV0aG9kIHRha2VzIGNhcmUgb2Ygd3JhcHBpbmcgdGhlIHBhc3NlZCBzdHJpbmcgaW4gYVxuICogdG9rZW4gYW5kIG1hcHBpbmcgdGhlIHJlc3VsdGluZyB0b2tlbnMgYmFjayB0byBzdHJpbmdzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBUaGUgc3RyaW5nIHRvIHBhc3MgdGhyb3VnaCB0aGUgcGlwZWxpbmUuXG4gKiBAcmV0dXJucyB7c3RyaW5nW119XG4gKi9cbmx1bnIuUGlwZWxpbmUucHJvdG90eXBlLnJ1blN0cmluZyA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgdmFyIHRva2VuID0gbmV3IGx1bnIuVG9rZW4gKHN0cilcblxuICByZXR1cm4gdGhpcy5ydW4oW3Rva2VuXSkubWFwKGZ1bmN0aW9uICh0KSB7XG4gICAgcmV0dXJuIHQudG9TdHJpbmcoKVxuICB9KVxufVxuXG4vKipcbiAqIFJlc2V0cyB0aGUgcGlwZWxpbmUgYnkgcmVtb3ZpbmcgYW55IGV4aXN0aW5nIHByb2Nlc3NvcnMuXG4gKlxuICovXG5sdW5yLlBpcGVsaW5lLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5fc3RhY2sgPSBbXVxufVxuXG4vKipcbiAqIFJldHVybnMgYSByZXByZXNlbnRhdGlvbiBvZiB0aGUgcGlwZWxpbmUgcmVhZHkgZm9yIHNlcmlhbGlzYXRpb24uXG4gKlxuICogTG9ncyBhIHdhcm5pbmcgaWYgdGhlIGZ1bmN0aW9uIGhhcyBub3QgYmVlbiByZWdpc3RlcmVkLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xubHVuci5QaXBlbGluZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5fc3RhY2subWFwKGZ1bmN0aW9uIChmbikge1xuICAgIGx1bnIuUGlwZWxpbmUud2FybklmRnVuY3Rpb25Ob3RSZWdpc3RlcmVkKGZuKVxuXG4gICAgcmV0dXJuIGZuLmxhYmVsXG4gIH0pXG59XG4vKiFcbiAqIGx1bnIuVmVjdG9yXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBBIHZlY3RvciBpcyB1c2VkIHRvIGNvbnN0cnVjdCB0aGUgdmVjdG9yIHNwYWNlIG9mIGRvY3VtZW50cyBhbmQgcXVlcmllcy4gVGhlc2VcbiAqIHZlY3RvcnMgc3VwcG9ydCBvcGVyYXRpb25zIHRvIGRldGVybWluZSB0aGUgc2ltaWxhcml0eSBiZXR3ZWVuIHR3byBkb2N1bWVudHMgb3JcbiAqIGEgZG9jdW1lbnQgYW5kIGEgcXVlcnkuXG4gKlxuICogTm9ybWFsbHkgbm8gcGFyYW1ldGVycyBhcmUgcmVxdWlyZWQgZm9yIGluaXRpYWxpemluZyBhIHZlY3RvciwgYnV0IGluIHRoZSBjYXNlIG9mXG4gKiBsb2FkaW5nIGEgcHJldmlvdXNseSBkdW1wZWQgdmVjdG9yIHRoZSByYXcgZWxlbWVudHMgY2FuIGJlIHByb3ZpZGVkIHRvIHRoZSBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBGb3IgcGVyZm9ybWFuY2UgcmVhc29ucyB2ZWN0b3JzIGFyZSBpbXBsZW1lbnRlZCB3aXRoIGEgZmxhdCBhcnJheSwgd2hlcmUgYW4gZWxlbWVudHNcbiAqIGluZGV4IGlzIGltbWVkaWF0ZWx5IGZvbGxvd2VkIGJ5IGl0cyB2YWx1ZS4gRS5nLiBbaW5kZXgsIHZhbHVlLCBpbmRleCwgdmFsdWVdLiBUaGlzXG4gKiBhbGxvd3MgdGhlIHVuZGVybHlpbmcgYXJyYXkgdG8gYmUgYXMgc3BhcnNlIGFzIHBvc3NpYmxlIGFuZCBzdGlsbCBvZmZlciBkZWNlbnRcbiAqIHBlcmZvcm1hbmNlIHdoZW4gYmVpbmcgdXNlZCBmb3IgdmVjdG9yIGNhbGN1bGF0aW9ucy5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyW119IFtlbGVtZW50c10gLSBUaGUgZmxhdCBsaXN0IG9mIGVsZW1lbnQgaW5kZXggYW5kIGVsZW1lbnQgdmFsdWUgcGFpcnMuXG4gKi9cbmx1bnIuVmVjdG9yID0gZnVuY3Rpb24gKGVsZW1lbnRzKSB7XG4gIHRoaXMuX21hZ25pdHVkZSA9IDBcbiAgdGhpcy5lbGVtZW50cyA9IGVsZW1lbnRzIHx8IFtdXG59XG5cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBwb3NpdGlvbiB3aXRoaW4gdGhlIHZlY3RvciB0byBpbnNlcnQgYSBnaXZlbiBpbmRleC5cbiAqXG4gKiBUaGlzIGlzIHVzZWQgaW50ZXJuYWxseSBieSBpbnNlcnQgYW5kIHVwc2VydC4gSWYgdGhlcmUgYXJlIGR1cGxpY2F0ZSBpbmRleGVzIHRoZW5cbiAqIHRoZSBwb3NpdGlvbiBpcyByZXR1cm5lZCBhcyBpZiB0aGUgdmFsdWUgZm9yIHRoYXQgaW5kZXggd2VyZSB0byBiZSB1cGRhdGVkLCBidXQgaXRcbiAqIGlzIHRoZSBjYWxsZXJzIHJlc3BvbnNpYmlsaXR5IHRvIGNoZWNrIHdoZXRoZXIgdGhlcmUgaXMgYSBkdXBsaWNhdGUgYXQgdGhhdCBpbmRleFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpbnNlcnRJZHggLSBUaGUgaW5kZXggYXQgd2hpY2ggdGhlIGVsZW1lbnQgc2hvdWxkIGJlIGluc2VydGVkLlxuICogQHJldHVybnMge051bWJlcn1cbiAqL1xubHVuci5WZWN0b3IucHJvdG90eXBlLnBvc2l0aW9uRm9ySW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgLy8gRm9yIGFuIGVtcHR5IHZlY3RvciB0aGUgdHVwbGUgY2FuIGJlIGluc2VydGVkIGF0IHRoZSBiZWdpbm5pbmdcbiAgaWYgKHRoaXMuZWxlbWVudHMubGVuZ3RoID09IDApIHtcbiAgICByZXR1cm4gMFxuICB9XG5cbiAgdmFyIHN0YXJ0ID0gMCxcbiAgICAgIGVuZCA9IHRoaXMuZWxlbWVudHMubGVuZ3RoIC8gMixcbiAgICAgIHNsaWNlTGVuZ3RoID0gZW5kIC0gc3RhcnQsXG4gICAgICBwaXZvdFBvaW50ID0gTWF0aC5mbG9vcihzbGljZUxlbmd0aCAvIDIpLFxuICAgICAgcGl2b3RJbmRleCA9IHRoaXMuZWxlbWVudHNbcGl2b3RQb2ludCAqIDJdXG5cbiAgd2hpbGUgKHNsaWNlTGVuZ3RoID4gMSkge1xuICAgIGlmIChwaXZvdEluZGV4IDwgaW5kZXgpIHtcbiAgICAgIHN0YXJ0ID0gcGl2b3RQb2ludFxuICAgIH1cblxuICAgIGlmIChwaXZvdEluZGV4ID4gaW5kZXgpIHtcbiAgICAgIGVuZCA9IHBpdm90UG9pbnRcbiAgICB9XG5cbiAgICBpZiAocGl2b3RJbmRleCA9PSBpbmRleCkge1xuICAgICAgYnJlYWtcbiAgICB9XG5cbiAgICBzbGljZUxlbmd0aCA9IGVuZCAtIHN0YXJ0XG4gICAgcGl2b3RQb2ludCA9IHN0YXJ0ICsgTWF0aC5mbG9vcihzbGljZUxlbmd0aCAvIDIpXG4gICAgcGl2b3RJbmRleCA9IHRoaXMuZWxlbWVudHNbcGl2b3RQb2ludCAqIDJdXG4gIH1cblxuICBpZiAocGl2b3RJbmRleCA9PSBpbmRleCkge1xuICAgIHJldHVybiBwaXZvdFBvaW50ICogMlxuICB9XG5cbiAgaWYgKHBpdm90SW5kZXggPiBpbmRleCkge1xuICAgIHJldHVybiBwaXZvdFBvaW50ICogMlxuICB9XG5cbiAgaWYgKHBpdm90SW5kZXggPCBpbmRleCkge1xuICAgIHJldHVybiAocGl2b3RQb2ludCArIDEpICogMlxuICB9XG59XG5cbi8qKlxuICogSW5zZXJ0cyBhbiBlbGVtZW50IGF0IGFuIGluZGV4IHdpdGhpbiB0aGUgdmVjdG9yLlxuICpcbiAqIERvZXMgbm90IGFsbG93IGR1cGxpY2F0ZXMsIHdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlcmUgaXMgYWxyZWFkeSBhbiBlbnRyeVxuICogZm9yIHRoaXMgaW5kZXguXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGluc2VydElkeCAtIFRoZSBpbmRleCBhdCB3aGljaCB0aGUgZWxlbWVudCBzaG91bGQgYmUgaW5zZXJ0ZWQuXG4gKiBAcGFyYW0ge051bWJlcn0gdmFsIC0gVGhlIHZhbHVlIHRvIGJlIGluc2VydGVkIGludG8gdGhlIHZlY3Rvci5cbiAqL1xubHVuci5WZWN0b3IucHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uIChpbnNlcnRJZHgsIHZhbCkge1xuICB0aGlzLnVwc2VydChpbnNlcnRJZHgsIHZhbCwgZnVuY3Rpb24gKCkge1xuICAgIHRocm93IFwiZHVwbGljYXRlIGluZGV4XCJcbiAgfSlcbn1cblxuLyoqXG4gKiBJbnNlcnRzIG9yIHVwZGF0ZXMgYW4gZXhpc3RpbmcgaW5kZXggd2l0aGluIHRoZSB2ZWN0b3IuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGluc2VydElkeCAtIFRoZSBpbmRleCBhdCB3aGljaCB0aGUgZWxlbWVudCBzaG91bGQgYmUgaW5zZXJ0ZWQuXG4gKiBAcGFyYW0ge051bWJlcn0gdmFsIC0gVGhlIHZhbHVlIHRvIGJlIGluc2VydGVkIGludG8gdGhlIHZlY3Rvci5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuIC0gQSBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCBmb3IgdXBkYXRlcywgdGhlIGV4aXN0aW5nIHZhbHVlIGFuZCB0aGVcbiAqIHJlcXVlc3RlZCB2YWx1ZSBhcmUgcGFzc2VkIGFzIGFyZ3VtZW50c1xuICovXG5sdW5yLlZlY3Rvci5wcm90b3R5cGUudXBzZXJ0ID0gZnVuY3Rpb24gKGluc2VydElkeCwgdmFsLCBmbikge1xuICB0aGlzLl9tYWduaXR1ZGUgPSAwXG4gIHZhciBwb3NpdGlvbiA9IHRoaXMucG9zaXRpb25Gb3JJbmRleChpbnNlcnRJZHgpXG5cbiAgaWYgKHRoaXMuZWxlbWVudHNbcG9zaXRpb25dID09IGluc2VydElkeCkge1xuICAgIHRoaXMuZWxlbWVudHNbcG9zaXRpb24gKyAxXSA9IGZuKHRoaXMuZWxlbWVudHNbcG9zaXRpb24gKyAxXSwgdmFsKVxuICB9IGVsc2Uge1xuICAgIHRoaXMuZWxlbWVudHMuc3BsaWNlKHBvc2l0aW9uLCAwLCBpbnNlcnRJZHgsIHZhbClcbiAgfVxufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIG1hZ25pdHVkZSBvZiB0aGlzIHZlY3Rvci5cbiAqXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxuICovXG5sdW5yLlZlY3Rvci5wcm90b3R5cGUubWFnbml0dWRlID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5fbWFnbml0dWRlKSByZXR1cm4gdGhpcy5fbWFnbml0dWRlXG5cbiAgdmFyIHN1bU9mU3F1YXJlcyA9IDAsXG4gICAgICBlbGVtZW50c0xlbmd0aCA9IHRoaXMuZWxlbWVudHMubGVuZ3RoXG5cbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBlbGVtZW50c0xlbmd0aDsgaSArPSAyKSB7XG4gICAgdmFyIHZhbCA9IHRoaXMuZWxlbWVudHNbaV1cbiAgICBzdW1PZlNxdWFyZXMgKz0gdmFsICogdmFsXG4gIH1cblxuICByZXR1cm4gdGhpcy5fbWFnbml0dWRlID0gTWF0aC5zcXJ0KHN1bU9mU3F1YXJlcylcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0aGlzIHZlY3RvciBhbmQgYW5vdGhlciB2ZWN0b3IuXG4gKlxuICogQHBhcmFtIHtsdW5yLlZlY3Rvcn0gb3RoZXJWZWN0b3IgLSBUaGUgdmVjdG9yIHRvIGNvbXB1dGUgdGhlIGRvdCBwcm9kdWN0IHdpdGguXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxuICovXG5sdW5yLlZlY3Rvci5wcm90b3R5cGUuZG90ID0gZnVuY3Rpb24gKG90aGVyVmVjdG9yKSB7XG4gIHZhciBkb3RQcm9kdWN0ID0gMCxcbiAgICAgIGEgPSB0aGlzLmVsZW1lbnRzLCBiID0gb3RoZXJWZWN0b3IuZWxlbWVudHMsXG4gICAgICBhTGVuID0gYS5sZW5ndGgsIGJMZW4gPSBiLmxlbmd0aCxcbiAgICAgIGFWYWwgPSAwLCBiVmFsID0gMCxcbiAgICAgIGkgPSAwLCBqID0gMFxuXG4gIHdoaWxlIChpIDwgYUxlbiAmJiBqIDwgYkxlbikge1xuICAgIGFWYWwgPSBhW2ldLCBiVmFsID0gYltqXVxuICAgIGlmIChhVmFsIDwgYlZhbCkge1xuICAgICAgaSArPSAyXG4gICAgfSBlbHNlIGlmIChhVmFsID4gYlZhbCkge1xuICAgICAgaiArPSAyXG4gICAgfSBlbHNlIGlmIChhVmFsID09IGJWYWwpIHtcbiAgICAgIGRvdFByb2R1Y3QgKz0gYVtpICsgMV0gKiBiW2ogKyAxXVxuICAgICAgaSArPSAyXG4gICAgICBqICs9IDJcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZG90UHJvZHVjdFxufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGNvc2luZSBzaW1pbGFyaXR5IGJldHdlZW4gdGhpcyB2ZWN0b3IgYW5kIGFub3RoZXJcbiAqIHZlY3Rvci5cbiAqXG4gKiBAcGFyYW0ge2x1bnIuVmVjdG9yfSBvdGhlclZlY3RvciAtIFRoZSBvdGhlciB2ZWN0b3IgdG8gY2FsY3VsYXRlIHRoZVxuICogc2ltaWxhcml0eSB3aXRoLlxuICogQHJldHVybnMge051bWJlcn1cbiAqL1xubHVuci5WZWN0b3IucHJvdG90eXBlLnNpbWlsYXJpdHkgPSBmdW5jdGlvbiAob3RoZXJWZWN0b3IpIHtcbiAgcmV0dXJuIHRoaXMuZG90KG90aGVyVmVjdG9yKSAvICh0aGlzLm1hZ25pdHVkZSgpICogb3RoZXJWZWN0b3IubWFnbml0dWRlKCkpXG59XG5cbi8qKlxuICogQ29udmVydHMgdGhlIHZlY3RvciB0byBhbiBhcnJheSBvZiB0aGUgZWxlbWVudHMgd2l0aGluIHRoZSB2ZWN0b3IuXG4gKlxuICogQHJldHVybnMge051bWJlcltdfVxuICovXG5sdW5yLlZlY3Rvci5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIG91dHB1dCA9IG5ldyBBcnJheSAodGhpcy5lbGVtZW50cy5sZW5ndGggLyAyKVxuXG4gIGZvciAodmFyIGkgPSAxLCBqID0gMDsgaSA8IHRoaXMuZWxlbWVudHMubGVuZ3RoOyBpICs9IDIsIGorKykge1xuICAgIG91dHB1dFtqXSA9IHRoaXMuZWxlbWVudHNbaV1cbiAgfVxuXG4gIHJldHVybiBvdXRwdXRcbn1cblxuLyoqXG4gKiBBIEpTT04gc2VyaWFsaXphYmxlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2ZWN0b3IuXG4gKlxuICogQHJldHVybnMge051bWJlcltdfVxuICovXG5sdW5yLlZlY3Rvci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5lbGVtZW50c1xufVxuLyogZXNsaW50LWRpc2FibGUgKi9cbi8qIVxuICogbHVuci5zdGVtbWVyXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKiBJbmNsdWRlcyBjb2RlIGZyb20gLSBodHRwOi8vdGFydGFydXMub3JnL35tYXJ0aW4vUG9ydGVyU3RlbW1lci9qcy50eHRcbiAqL1xuXG4vKipcbiAqIGx1bnIuc3RlbW1lciBpcyBhbiBlbmdsaXNoIGxhbmd1YWdlIHN0ZW1tZXIsIHRoaXMgaXMgYSBKYXZhU2NyaXB0XG4gKiBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgUG9ydGVyU3RlbW1lciB0YWtlbiBmcm9tIGh0dHA6Ly90YXJ0YXJ1cy5vcmcvfm1hcnRpblxuICpcbiAqIEBzdGF0aWNcbiAqIEBpbXBsZW1lbnRzIHtsdW5yLlBpcGVsaW5lRnVuY3Rpb259XG4gKiBAcGFyYW0ge2x1bnIuVG9rZW59IHRva2VuIC0gVGhlIHN0cmluZyB0byBzdGVtXG4gKiBAcmV0dXJucyB7bHVuci5Ub2tlbn1cbiAqIEBzZWUge0BsaW5rIGx1bnIuUGlwZWxpbmV9XG4gKi9cbmx1bnIuc3RlbW1lciA9IChmdW5jdGlvbigpe1xuICB2YXIgc3RlcDJsaXN0ID0ge1xuICAgICAgXCJhdGlvbmFsXCIgOiBcImF0ZVwiLFxuICAgICAgXCJ0aW9uYWxcIiA6IFwidGlvblwiLFxuICAgICAgXCJlbmNpXCIgOiBcImVuY2VcIixcbiAgICAgIFwiYW5jaVwiIDogXCJhbmNlXCIsXG4gICAgICBcIml6ZXJcIiA6IFwiaXplXCIsXG4gICAgICBcImJsaVwiIDogXCJibGVcIixcbiAgICAgIFwiYWxsaVwiIDogXCJhbFwiLFxuICAgICAgXCJlbnRsaVwiIDogXCJlbnRcIixcbiAgICAgIFwiZWxpXCIgOiBcImVcIixcbiAgICAgIFwib3VzbGlcIiA6IFwib3VzXCIsXG4gICAgICBcIml6YXRpb25cIiA6IFwiaXplXCIsXG4gICAgICBcImF0aW9uXCIgOiBcImF0ZVwiLFxuICAgICAgXCJhdG9yXCIgOiBcImF0ZVwiLFxuICAgICAgXCJhbGlzbVwiIDogXCJhbFwiLFxuICAgICAgXCJpdmVuZXNzXCIgOiBcIml2ZVwiLFxuICAgICAgXCJmdWxuZXNzXCIgOiBcImZ1bFwiLFxuICAgICAgXCJvdXNuZXNzXCIgOiBcIm91c1wiLFxuICAgICAgXCJhbGl0aVwiIDogXCJhbFwiLFxuICAgICAgXCJpdml0aVwiIDogXCJpdmVcIixcbiAgICAgIFwiYmlsaXRpXCIgOiBcImJsZVwiLFxuICAgICAgXCJsb2dpXCIgOiBcImxvZ1wiXG4gICAgfSxcblxuICAgIHN0ZXAzbGlzdCA9IHtcbiAgICAgIFwiaWNhdGVcIiA6IFwiaWNcIixcbiAgICAgIFwiYXRpdmVcIiA6IFwiXCIsXG4gICAgICBcImFsaXplXCIgOiBcImFsXCIsXG4gICAgICBcImljaXRpXCIgOiBcImljXCIsXG4gICAgICBcImljYWxcIiA6IFwiaWNcIixcbiAgICAgIFwiZnVsXCIgOiBcIlwiLFxuICAgICAgXCJuZXNzXCIgOiBcIlwiXG4gICAgfSxcblxuICAgIGMgPSBcIlteYWVpb3VdXCIsICAgICAgICAgIC8vIGNvbnNvbmFudFxuICAgIHYgPSBcIlthZWlvdXldXCIsICAgICAgICAgIC8vIHZvd2VsXG4gICAgQyA9IGMgKyBcIlteYWVpb3V5XSpcIiwgICAgLy8gY29uc29uYW50IHNlcXVlbmNlXG4gICAgViA9IHYgKyBcIlthZWlvdV0qXCIsICAgICAgLy8gdm93ZWwgc2VxdWVuY2VcblxuICAgIG1ncjAgPSBcIl4oXCIgKyBDICsgXCIpP1wiICsgViArIEMsICAgICAgICAgICAgICAgLy8gW0NdVkMuLi4gaXMgbT4wXG4gICAgbWVxMSA9IFwiXihcIiArIEMgKyBcIik/XCIgKyBWICsgQyArIFwiKFwiICsgViArIFwiKT8kXCIsICAvLyBbQ11WQ1tWXSBpcyBtPTFcbiAgICBtZ3IxID0gXCJeKFwiICsgQyArIFwiKT9cIiArIFYgKyBDICsgViArIEMsICAgICAgIC8vIFtDXVZDVkMuLi4gaXMgbT4xXG4gICAgc192ID0gXCJeKFwiICsgQyArIFwiKT9cIiArIHY7ICAgICAgICAgICAgICAgICAgIC8vIHZvd2VsIGluIHN0ZW1cblxuICB2YXIgcmVfbWdyMCA9IG5ldyBSZWdFeHAobWdyMCk7XG4gIHZhciByZV9tZ3IxID0gbmV3IFJlZ0V4cChtZ3IxKTtcbiAgdmFyIHJlX21lcTEgPSBuZXcgUmVnRXhwKG1lcTEpO1xuICB2YXIgcmVfc192ID0gbmV3IFJlZ0V4cChzX3YpO1xuXG4gIHZhciByZV8xYSA9IC9eKC4rPykoc3N8aSllcyQvO1xuICB2YXIgcmUyXzFhID0gL14oLis/KShbXnNdKXMkLztcbiAgdmFyIHJlXzFiID0gL14oLis/KWVlZCQvO1xuICB2YXIgcmUyXzFiID0gL14oLis/KShlZHxpbmcpJC87XG4gIHZhciByZV8xYl8yID0gLy4kLztcbiAgdmFyIHJlMl8xYl8yID0gLyhhdHxibHxpeikkLztcbiAgdmFyIHJlM18xYl8yID0gbmV3IFJlZ0V4cChcIihbXmFlaW91eWxzel0pXFxcXDEkXCIpO1xuICB2YXIgcmU0XzFiXzIgPSBuZXcgUmVnRXhwKFwiXlwiICsgQyArIHYgKyBcIlteYWVpb3V3eHldJFwiKTtcblxuICB2YXIgcmVfMWMgPSAvXiguKz9bXmFlaW91XSl5JC87XG4gIHZhciByZV8yID0gL14oLis/KShhdGlvbmFsfHRpb25hbHxlbmNpfGFuY2l8aXplcnxibGl8YWxsaXxlbnRsaXxlbGl8b3VzbGl8aXphdGlvbnxhdGlvbnxhdG9yfGFsaXNtfGl2ZW5lc3N8ZnVsbmVzc3xvdXNuZXNzfGFsaXRpfGl2aXRpfGJpbGl0aXxsb2dpKSQvO1xuXG4gIHZhciByZV8zID0gL14oLis/KShpY2F0ZXxhdGl2ZXxhbGl6ZXxpY2l0aXxpY2FsfGZ1bHxuZXNzKSQvO1xuXG4gIHZhciByZV80ID0gL14oLis/KShhbHxhbmNlfGVuY2V8ZXJ8aWN8YWJsZXxpYmxlfGFudHxlbWVudHxtZW50fGVudHxvdXxpc218YXRlfGl0aXxvdXN8aXZlfGl6ZSkkLztcbiAgdmFyIHJlMl80ID0gL14oLis/KShzfHQpKGlvbikkLztcblxuICB2YXIgcmVfNSA9IC9eKC4rPyllJC87XG4gIHZhciByZV81XzEgPSAvbGwkLztcbiAgdmFyIHJlM181ID0gbmV3IFJlZ0V4cChcIl5cIiArIEMgKyB2ICsgXCJbXmFlaW91d3h5XSRcIik7XG5cbiAgdmFyIHBvcnRlclN0ZW1tZXIgPSBmdW5jdGlvbiBwb3J0ZXJTdGVtbWVyKHcpIHtcbiAgICB2YXIgc3RlbSxcbiAgICAgIHN1ZmZpeCxcbiAgICAgIGZpcnN0Y2gsXG4gICAgICByZSxcbiAgICAgIHJlMixcbiAgICAgIHJlMyxcbiAgICAgIHJlNDtcblxuICAgIGlmICh3Lmxlbmd0aCA8IDMpIHsgcmV0dXJuIHc7IH1cblxuICAgIGZpcnN0Y2ggPSB3LnN1YnN0cigwLDEpO1xuICAgIGlmIChmaXJzdGNoID09IFwieVwiKSB7XG4gICAgICB3ID0gZmlyc3RjaC50b1VwcGVyQ2FzZSgpICsgdy5zdWJzdHIoMSk7XG4gICAgfVxuXG4gICAgLy8gU3RlcCAxYVxuICAgIHJlID0gcmVfMWFcbiAgICByZTIgPSByZTJfMWE7XG5cbiAgICBpZiAocmUudGVzdCh3KSkgeyB3ID0gdy5yZXBsYWNlKHJlLFwiJDEkMlwiKTsgfVxuICAgIGVsc2UgaWYgKHJlMi50ZXN0KHcpKSB7IHcgPSB3LnJlcGxhY2UocmUyLFwiJDEkMlwiKTsgfVxuXG4gICAgLy8gU3RlcCAxYlxuICAgIHJlID0gcmVfMWI7XG4gICAgcmUyID0gcmUyXzFiO1xuICAgIGlmIChyZS50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZS5leGVjKHcpO1xuICAgICAgcmUgPSByZV9tZ3IwO1xuICAgICAgaWYgKHJlLnRlc3QoZnBbMV0pKSB7XG4gICAgICAgIHJlID0gcmVfMWJfMjtcbiAgICAgICAgdyA9IHcucmVwbGFjZShyZSxcIlwiKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJlMi50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZTIuZXhlYyh3KTtcbiAgICAgIHN0ZW0gPSBmcFsxXTtcbiAgICAgIHJlMiA9IHJlX3NfdjtcbiAgICAgIGlmIChyZTIudGVzdChzdGVtKSkge1xuICAgICAgICB3ID0gc3RlbTtcbiAgICAgICAgcmUyID0gcmUyXzFiXzI7XG4gICAgICAgIHJlMyA9IHJlM18xYl8yO1xuICAgICAgICByZTQgPSByZTRfMWJfMjtcbiAgICAgICAgaWYgKHJlMi50ZXN0KHcpKSB7IHcgPSB3ICsgXCJlXCI7IH1cbiAgICAgICAgZWxzZSBpZiAocmUzLnRlc3QodykpIHsgcmUgPSByZV8xYl8yOyB3ID0gdy5yZXBsYWNlKHJlLFwiXCIpOyB9XG4gICAgICAgIGVsc2UgaWYgKHJlNC50ZXN0KHcpKSB7IHcgPSB3ICsgXCJlXCI7IH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTdGVwIDFjIC0gcmVwbGFjZSBzdWZmaXggeSBvciBZIGJ5IGkgaWYgcHJlY2VkZWQgYnkgYSBub24tdm93ZWwgd2hpY2ggaXMgbm90IHRoZSBmaXJzdCBsZXR0ZXIgb2YgdGhlIHdvcmQgKHNvIGNyeSAtPiBjcmksIGJ5IC0+IGJ5LCBzYXkgLT4gc2F5KVxuICAgIHJlID0gcmVfMWM7XG4gICAgaWYgKHJlLnRlc3QodykpIHtcbiAgICAgIHZhciBmcCA9IHJlLmV4ZWModyk7XG4gICAgICBzdGVtID0gZnBbMV07XG4gICAgICB3ID0gc3RlbSArIFwiaVwiO1xuICAgIH1cblxuICAgIC8vIFN0ZXAgMlxuICAgIHJlID0gcmVfMjtcbiAgICBpZiAocmUudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUuZXhlYyh3KTtcbiAgICAgIHN0ZW0gPSBmcFsxXTtcbiAgICAgIHN1ZmZpeCA9IGZwWzJdO1xuICAgICAgcmUgPSByZV9tZ3IwO1xuICAgICAgaWYgKHJlLnRlc3Qoc3RlbSkpIHtcbiAgICAgICAgdyA9IHN0ZW0gKyBzdGVwMmxpc3Rbc3VmZml4XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTdGVwIDNcbiAgICByZSA9IHJlXzM7XG4gICAgaWYgKHJlLnRlc3QodykpIHtcbiAgICAgIHZhciBmcCA9IHJlLmV4ZWModyk7XG4gICAgICBzdGVtID0gZnBbMV07XG4gICAgICBzdWZmaXggPSBmcFsyXTtcbiAgICAgIHJlID0gcmVfbWdyMDtcbiAgICAgIGlmIChyZS50ZXN0KHN0ZW0pKSB7XG4gICAgICAgIHcgPSBzdGVtICsgc3RlcDNsaXN0W3N1ZmZpeF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3RlcCA0XG4gICAgcmUgPSByZV80O1xuICAgIHJlMiA9IHJlMl80O1xuICAgIGlmIChyZS50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZS5leGVjKHcpO1xuICAgICAgc3RlbSA9IGZwWzFdO1xuICAgICAgcmUgPSByZV9tZ3IxO1xuICAgICAgaWYgKHJlLnRlc3Qoc3RlbSkpIHtcbiAgICAgICAgdyA9IHN0ZW07XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChyZTIudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUyLmV4ZWModyk7XG4gICAgICBzdGVtID0gZnBbMV0gKyBmcFsyXTtcbiAgICAgIHJlMiA9IHJlX21ncjE7XG4gICAgICBpZiAocmUyLnRlc3Qoc3RlbSkpIHtcbiAgICAgICAgdyA9IHN0ZW07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3RlcCA1XG4gICAgcmUgPSByZV81O1xuICAgIGlmIChyZS50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZS5leGVjKHcpO1xuICAgICAgc3RlbSA9IGZwWzFdO1xuICAgICAgcmUgPSByZV9tZ3IxO1xuICAgICAgcmUyID0gcmVfbWVxMTtcbiAgICAgIHJlMyA9IHJlM181O1xuICAgICAgaWYgKHJlLnRlc3Qoc3RlbSkgfHwgKHJlMi50ZXN0KHN0ZW0pICYmICEocmUzLnRlc3Qoc3RlbSkpKSkge1xuICAgICAgICB3ID0gc3RlbTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZSA9IHJlXzVfMTtcbiAgICByZTIgPSByZV9tZ3IxO1xuICAgIGlmIChyZS50ZXN0KHcpICYmIHJlMi50ZXN0KHcpKSB7XG4gICAgICByZSA9IHJlXzFiXzI7XG4gICAgICB3ID0gdy5yZXBsYWNlKHJlLFwiXCIpO1xuICAgIH1cblxuICAgIC8vIGFuZCB0dXJuIGluaXRpYWwgWSBiYWNrIHRvIHlcblxuICAgIGlmIChmaXJzdGNoID09IFwieVwiKSB7XG4gICAgICB3ID0gZmlyc3RjaC50b0xvd2VyQ2FzZSgpICsgdy5zdWJzdHIoMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHc7XG4gIH07XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHJldHVybiB0b2tlbi51cGRhdGUocG9ydGVyU3RlbW1lcik7XG4gIH1cbn0pKCk7XG5cbmx1bnIuUGlwZWxpbmUucmVnaXN0ZXJGdW5jdGlvbihsdW5yLnN0ZW1tZXIsICdzdGVtbWVyJylcbi8qIVxuICogbHVuci5zdG9wV29yZEZpbHRlclxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogbHVuci5nZW5lcmF0ZVN0b3BXb3JkRmlsdGVyIGJ1aWxkcyBhIHN0b3BXb3JkRmlsdGVyIGZ1bmN0aW9uIGZyb20gdGhlIHByb3ZpZGVkXG4gKiBsaXN0IG9mIHN0b3Agd29yZHMuXG4gKlxuICogVGhlIGJ1aWx0IGluIGx1bnIuc3RvcFdvcmRGaWx0ZXIgaXMgYnVpbHQgdXNpbmcgdGhpcyBnZW5lcmF0b3IgYW5kIGNhbiBiZSB1c2VkXG4gKiB0byBnZW5lcmF0ZSBjdXN0b20gc3RvcFdvcmRGaWx0ZXJzIGZvciBhcHBsaWNhdGlvbnMgb3Igbm9uIEVuZ2xpc2ggbGFuZ3VhZ2VzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHRva2VuIFRoZSB0b2tlbiB0byBwYXNzIHRocm91Z2ggdGhlIGZpbHRlclxuICogQHJldHVybnMge2x1bnIuUGlwZWxpbmVGdW5jdGlvbn1cbiAqIEBzZWUgbHVuci5QaXBlbGluZVxuICogQHNlZSBsdW5yLnN0b3BXb3JkRmlsdGVyXG4gKi9cbmx1bnIuZ2VuZXJhdGVTdG9wV29yZEZpbHRlciA9IGZ1bmN0aW9uIChzdG9wV29yZHMpIHtcbiAgdmFyIHdvcmRzID0gc3RvcFdvcmRzLnJlZHVjZShmdW5jdGlvbiAobWVtbywgc3RvcFdvcmQpIHtcbiAgICBtZW1vW3N0b3BXb3JkXSA9IHN0b3BXb3JkXG4gICAgcmV0dXJuIG1lbW9cbiAgfSwge30pXG5cbiAgcmV0dXJuIGZ1bmN0aW9uICh0b2tlbikge1xuICAgIGlmICh0b2tlbiAmJiB3b3Jkc1t0b2tlbi50b1N0cmluZygpXSAhPT0gdG9rZW4udG9TdHJpbmcoKSkgcmV0dXJuIHRva2VuXG4gIH1cbn1cblxuLyoqXG4gKiBsdW5yLnN0b3BXb3JkRmlsdGVyIGlzIGFuIEVuZ2xpc2ggbGFuZ3VhZ2Ugc3RvcCB3b3JkIGxpc3QgZmlsdGVyLCBhbnkgd29yZHNcbiAqIGNvbnRhaW5lZCBpbiB0aGUgbGlzdCB3aWxsIG5vdCBiZSBwYXNzZWQgdGhyb3VnaCB0aGUgZmlsdGVyLlxuICpcbiAqIFRoaXMgaXMgaW50ZW5kZWQgdG8gYmUgdXNlZCBpbiB0aGUgUGlwZWxpbmUuIElmIHRoZSB0b2tlbiBkb2VzIG5vdCBwYXNzIHRoZVxuICogZmlsdGVyIHRoZW4gdW5kZWZpbmVkIHdpbGwgYmUgcmV0dXJuZWQuXG4gKlxuICogQGltcGxlbWVudHMge2x1bnIuUGlwZWxpbmVGdW5jdGlvbn1cbiAqIEBwYXJhbXMge2x1bnIuVG9rZW59IHRva2VuIC0gQSB0b2tlbiB0byBjaGVjayBmb3IgYmVpbmcgYSBzdG9wIHdvcmQuXG4gKiBAcmV0dXJucyB7bHVuci5Ub2tlbn1cbiAqIEBzZWUge0BsaW5rIGx1bnIuUGlwZWxpbmV9XG4gKi9cbmx1bnIuc3RvcFdvcmRGaWx0ZXIgPSBsdW5yLmdlbmVyYXRlU3RvcFdvcmRGaWx0ZXIoW1xuICAnYScsXG4gICdhYmxlJyxcbiAgJ2Fib3V0JyxcbiAgJ2Fjcm9zcycsXG4gICdhZnRlcicsXG4gICdhbGwnLFxuICAnYWxtb3N0JyxcbiAgJ2Fsc28nLFxuICAnYW0nLFxuICAnYW1vbmcnLFxuICAnYW4nLFxuICAnYW5kJyxcbiAgJ2FueScsXG4gICdhcmUnLFxuICAnYXMnLFxuICAnYXQnLFxuICAnYmUnLFxuICAnYmVjYXVzZScsXG4gICdiZWVuJyxcbiAgJ2J1dCcsXG4gICdieScsXG4gICdjYW4nLFxuICAnY2Fubm90JyxcbiAgJ2NvdWxkJyxcbiAgJ2RlYXInLFxuICAnZGlkJyxcbiAgJ2RvJyxcbiAgJ2RvZXMnLFxuICAnZWl0aGVyJyxcbiAgJ2Vsc2UnLFxuICAnZXZlcicsXG4gICdldmVyeScsXG4gICdmb3InLFxuICAnZnJvbScsXG4gICdnZXQnLFxuICAnZ290JyxcbiAgJ2hhZCcsXG4gICdoYXMnLFxuICAnaGF2ZScsXG4gICdoZScsXG4gICdoZXInLFxuICAnaGVycycsXG4gICdoaW0nLFxuICAnaGlzJyxcbiAgJ2hvdycsXG4gICdob3dldmVyJyxcbiAgJ2knLFxuICAnaWYnLFxuICAnaW4nLFxuICAnaW50bycsXG4gICdpcycsXG4gICdpdCcsXG4gICdpdHMnLFxuICAnanVzdCcsXG4gICdsZWFzdCcsXG4gICdsZXQnLFxuICAnbGlrZScsXG4gICdsaWtlbHknLFxuICAnbWF5JyxcbiAgJ21lJyxcbiAgJ21pZ2h0JyxcbiAgJ21vc3QnLFxuICAnbXVzdCcsXG4gICdteScsXG4gICduZWl0aGVyJyxcbiAgJ25vJyxcbiAgJ25vcicsXG4gICdub3QnLFxuICAnb2YnLFxuICAnb2ZmJyxcbiAgJ29mdGVuJyxcbiAgJ29uJyxcbiAgJ29ubHknLFxuICAnb3InLFxuICAnb3RoZXInLFxuICAnb3VyJyxcbiAgJ293bicsXG4gICdyYXRoZXInLFxuICAnc2FpZCcsXG4gICdzYXknLFxuICAnc2F5cycsXG4gICdzaGUnLFxuICAnc2hvdWxkJyxcbiAgJ3NpbmNlJyxcbiAgJ3NvJyxcbiAgJ3NvbWUnLFxuICAndGhhbicsXG4gICd0aGF0JyxcbiAgJ3RoZScsXG4gICd0aGVpcicsXG4gICd0aGVtJyxcbiAgJ3RoZW4nLFxuICAndGhlcmUnLFxuICAndGhlc2UnLFxuICAndGhleScsXG4gICd0aGlzJyxcbiAgJ3RpcycsXG4gICd0bycsXG4gICd0b28nLFxuICAndHdhcycsXG4gICd1cycsXG4gICd3YW50cycsXG4gICd3YXMnLFxuICAnd2UnLFxuICAnd2VyZScsXG4gICd3aGF0JyxcbiAgJ3doZW4nLFxuICAnd2hlcmUnLFxuICAnd2hpY2gnLFxuICAnd2hpbGUnLFxuICAnd2hvJyxcbiAgJ3dob20nLFxuICAnd2h5JyxcbiAgJ3dpbGwnLFxuICAnd2l0aCcsXG4gICd3b3VsZCcsXG4gICd5ZXQnLFxuICAneW91JyxcbiAgJ3lvdXInXG5dKVxuXG5sdW5yLlBpcGVsaW5lLnJlZ2lzdGVyRnVuY3Rpb24obHVuci5zdG9wV29yZEZpbHRlciwgJ3N0b3BXb3JkRmlsdGVyJylcbi8qIVxuICogbHVuci50cmltbWVyXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBsdW5yLnRyaW1tZXIgaXMgYSBwaXBlbGluZSBmdW5jdGlvbiBmb3IgdHJpbW1pbmcgbm9uIHdvcmRcbiAqIGNoYXJhY3RlcnMgZnJvbSB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgdG9rZW5zIGJlZm9yZSB0aGV5XG4gKiBlbnRlciB0aGUgaW5kZXguXG4gKlxuICogVGhpcyBpbXBsZW1lbnRhdGlvbiBtYXkgbm90IHdvcmsgY29ycmVjdGx5IGZvciBub24gbGF0aW5cbiAqIGNoYXJhY3RlcnMgYW5kIHNob3VsZCBlaXRoZXIgYmUgcmVtb3ZlZCBvciBhZGFwdGVkIGZvciB1c2VcbiAqIHdpdGggbGFuZ3VhZ2VzIHdpdGggbm9uLWxhdGluIGNoYXJhY3RlcnMuXG4gKlxuICogQHN0YXRpY1xuICogQGltcGxlbWVudHMge2x1bnIuUGlwZWxpbmVGdW5jdGlvbn1cbiAqIEBwYXJhbSB7bHVuci5Ub2tlbn0gdG9rZW4gVGhlIHRva2VuIHRvIHBhc3MgdGhyb3VnaCB0aGUgZmlsdGVyXG4gKiBAcmV0dXJucyB7bHVuci5Ub2tlbn1cbiAqIEBzZWUgbHVuci5QaXBlbGluZVxuICovXG5sdW5yLnRyaW1tZXIgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgcmV0dXJuIHRva2VuLnVwZGF0ZShmdW5jdGlvbiAocykge1xuICAgIHJldHVybiBzLnJlcGxhY2UoL15cXFcrLywgJycpLnJlcGxhY2UoL1xcVyskLywgJycpXG4gIH0pXG59XG5cbmx1bnIuUGlwZWxpbmUucmVnaXN0ZXJGdW5jdGlvbihsdW5yLnRyaW1tZXIsICd0cmltbWVyJylcbi8qIVxuICogbHVuci5Ub2tlblNldFxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogQSB0b2tlbiBzZXQgaXMgdXNlZCB0byBzdG9yZSB0aGUgdW5pcXVlIGxpc3Qgb2YgYWxsIHRva2Vuc1xuICogd2l0aGluIGFuIGluZGV4LiBUb2tlbiBzZXRzIGFyZSBhbHNvIHVzZWQgdG8gcmVwcmVzZW50IGFuXG4gKiBpbmNvbWluZyBxdWVyeSB0byB0aGUgaW5kZXgsIHRoaXMgcXVlcnkgdG9rZW4gc2V0IGFuZCBpbmRleFxuICogdG9rZW4gc2V0IGFyZSB0aGVuIGludGVyc2VjdGVkIHRvIGZpbmQgd2hpY2ggdG9rZW5zIHRvIGxvb2tcbiAqIHVwIGluIHRoZSBpbnZlcnRlZCBpbmRleC5cbiAqXG4gKiBBIHRva2VuIHNldCBjYW4gaG9sZCBtdWx0aXBsZSB0b2tlbnMsIGFzIGluIHRoZSBjYXNlIG9mIHRoZVxuICogaW5kZXggdG9rZW4gc2V0LCBvciBpdCBjYW4gaG9sZCBhIHNpbmdsZSB0b2tlbiBhcyBpbiB0aGVcbiAqIGNhc2Ugb2YgYSBzaW1wbGUgcXVlcnkgdG9rZW4gc2V0LlxuICpcbiAqIEFkZGl0aW9uYWxseSB0b2tlbiBzZXRzIGFyZSB1c2VkIHRvIHBlcmZvcm0gd2lsZGNhcmQgbWF0Y2hpbmcuXG4gKiBMZWFkaW5nLCBjb250YWluZWQgYW5kIHRyYWlsaW5nIHdpbGRjYXJkcyBhcmUgc3VwcG9ydGVkLCBhbmRcbiAqIGZyb20gdGhpcyBlZGl0IGRpc3RhbmNlIG1hdGNoaW5nIGNhbiBhbHNvIGJlIHByb3ZpZGVkLlxuICpcbiAqIFRva2VuIHNldHMgYXJlIGltcGxlbWVudGVkIGFzIGEgbWluaW1hbCBmaW5pdGUgc3RhdGUgYXV0b21hdGEsXG4gKiB3aGVyZSBib3RoIGNvbW1vbiBwcmVmaXhlcyBhbmQgc3VmZml4ZXMgYXJlIHNoYXJlZCBiZXR3ZWVuIHRva2Vucy5cbiAqIFRoaXMgaGVscHMgdG8gcmVkdWNlIHRoZSBzcGFjZSB1c2VkIGZvciBzdG9yaW5nIHRoZSB0b2tlbiBzZXQuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmx1bnIuVG9rZW5TZXQgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZmluYWwgPSBmYWxzZVxuICB0aGlzLmVkZ2VzID0ge31cbiAgdGhpcy5pZCA9IGx1bnIuVG9rZW5TZXQuX25leHRJZFxuICBsdW5yLlRva2VuU2V0Ll9uZXh0SWQgKz0gMVxufVxuXG4vKipcbiAqIEtlZXBzIHRyYWNrIG9mIHRoZSBuZXh0LCBhdXRvIGluY3JlbWVudCwgaWRlbnRpZmllciB0byBhc3NpZ25cbiAqIHRvIGEgbmV3IHRva2VuU2V0LlxuICpcbiAqIFRva2VuU2V0cyByZXF1aXJlIGEgdW5pcXVlIGlkZW50aWZpZXIgdG8gYmUgY29ycmVjdGx5IG1pbmltaXNlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5sdW5yLlRva2VuU2V0Ll9uZXh0SWQgPSAxXG5cbi8qKlxuICogQ3JlYXRlcyBhIFRva2VuU2V0IGluc3RhbmNlIGZyb20gdGhlIGdpdmVuIHNvcnRlZCBhcnJheSBvZiB3b3Jkcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ1tdfSBhcnIgLSBBIHNvcnRlZCBhcnJheSBvZiBzdHJpbmdzIHRvIGNyZWF0ZSB0aGUgc2V0IGZyb20uXG4gKiBAcmV0dXJucyB7bHVuci5Ub2tlblNldH1cbiAqIEB0aHJvd3MgV2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGUgaW5wdXQgYXJyYXkgaXMgbm90IHNvcnRlZC5cbiAqL1xubHVuci5Ub2tlblNldC5mcm9tQXJyYXkgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIHZhciBidWlsZGVyID0gbmV3IGx1bnIuVG9rZW5TZXQuQnVpbGRlclxuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhcnIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBidWlsZGVyLmluc2VydChhcnJbaV0pXG4gIH1cblxuICBidWlsZGVyLmZpbmlzaCgpXG4gIHJldHVybiBidWlsZGVyLnJvb3Rcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgdG9rZW4gc2V0IGZyb20gYSBxdWVyeSBjbGF1c2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBjbGF1c2UgLSBBIHNpbmdsZSBjbGF1c2UgZnJvbSBsdW5yLlF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGNsYXVzZS50ZXJtIC0gVGhlIHF1ZXJ5IGNsYXVzZSB0ZXJtLlxuICogQHBhcmFtIHtudW1iZXJ9IFtjbGF1c2UuZWRpdERpc3RhbmNlXSAtIFRoZSBvcHRpb25hbCBlZGl0IGRpc3RhbmNlIGZvciB0aGUgdGVybS5cbiAqIEByZXR1cm5zIHtsdW5yLlRva2VuU2V0fVxuICovXG5sdW5yLlRva2VuU2V0LmZyb21DbGF1c2UgPSBmdW5jdGlvbiAoY2xhdXNlKSB7XG4gIGlmICgnZWRpdERpc3RhbmNlJyBpbiBjbGF1c2UpIHtcbiAgICByZXR1cm4gbHVuci5Ub2tlblNldC5mcm9tRnV6enlTdHJpbmcoY2xhdXNlLnRlcm0sIGNsYXVzZS5lZGl0RGlzdGFuY2UpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGx1bnIuVG9rZW5TZXQuZnJvbVN0cmluZyhjbGF1c2UudGVybSlcbiAgfVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSB0b2tlbiBzZXQgcmVwcmVzZW50aW5nIGEgc2luZ2xlIHN0cmluZyB3aXRoIGEgc3BlY2lmaWVkXG4gKiBlZGl0IGRpc3RhbmNlLlxuICpcbiAqIEluc2VydGlvbnMsIGRlbGV0aW9ucywgc3Vic3RpdHV0aW9ucyBhbmQgdHJhbnNwb3NpdGlvbnMgYXJlIGVhY2hcbiAqIHRyZWF0ZWQgYXMgYW4gZWRpdCBkaXN0YW5jZSBvZiAxLlxuICpcbiAqIEluY3JlYXNpbmcgdGhlIGFsbG93ZWQgZWRpdCBkaXN0YW5jZSB3aWxsIGhhdmUgYSBkcmFtYXRpYyBpbXBhY3RcbiAqIG9uIHRoZSBwZXJmb3JtYW5jZSBvZiBib3RoIGNyZWF0aW5nIGFuZCBpbnRlcnNlY3RpbmcgdGhlc2UgVG9rZW5TZXRzLlxuICogSXQgaXMgYWR2aXNlZCB0byBrZWVwIHRoZSBlZGl0IGRpc3RhbmNlIGxlc3MgdGhhbiAzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBUaGUgc3RyaW5nIHRvIGNyZWF0ZSB0aGUgdG9rZW4gc2V0IGZyb20uXG4gKiBAcGFyYW0ge251bWJlcn0gZWRpdERpc3RhbmNlIC0gVGhlIGFsbG93ZWQgZWRpdCBkaXN0YW5jZSB0byBtYXRjaC5cbiAqIEByZXR1cm5zIHtsdW5yLlZlY3Rvcn1cbiAqL1xubHVuci5Ub2tlblNldC5mcm9tRnV6enlTdHJpbmcgPSBmdW5jdGlvbiAoc3RyLCBlZGl0RGlzdGFuY2UpIHtcbiAgdmFyIHJvb3QgPSBuZXcgbHVuci5Ub2tlblNldFxuXG4gIHZhciBzdGFjayA9IFt7XG4gICAgbm9kZTogcm9vdCxcbiAgICBlZGl0c1JlbWFpbmluZzogZWRpdERpc3RhbmNlLFxuICAgIHN0cjogc3RyXG4gIH1dXG5cbiAgd2hpbGUgKHN0YWNrLmxlbmd0aCkge1xuICAgIHZhciBmcmFtZSA9IHN0YWNrLnBvcCgpXG5cbiAgICAvLyBubyBlZGl0XG4gICAgaWYgKGZyYW1lLnN0ci5sZW5ndGggPiAwKSB7XG4gICAgICB2YXIgY2hhciA9IGZyYW1lLnN0ci5jaGFyQXQoMCksXG4gICAgICAgICAgbm9FZGl0Tm9kZVxuXG4gICAgICBpZiAoY2hhciBpbiBmcmFtZS5ub2RlLmVkZ2VzKSB7XG4gICAgICAgIG5vRWRpdE5vZGUgPSBmcmFtZS5ub2RlLmVkZ2VzW2NoYXJdXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub0VkaXROb2RlID0gbmV3IGx1bnIuVG9rZW5TZXRcbiAgICAgICAgZnJhbWUubm9kZS5lZGdlc1tjaGFyXSA9IG5vRWRpdE5vZGVcbiAgICAgIH1cblxuICAgICAgaWYgKGZyYW1lLnN0ci5sZW5ndGggPT0gMSkge1xuICAgICAgICBub0VkaXROb2RlLmZpbmFsID0gdHJ1ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhY2sucHVzaCh7XG4gICAgICAgICAgbm9kZTogbm9FZGl0Tm9kZSxcbiAgICAgICAgICBlZGl0c1JlbWFpbmluZzogZnJhbWUuZWRpdHNSZW1haW5pbmcsXG4gICAgICAgICAgc3RyOiBmcmFtZS5zdHIuc2xpY2UoMSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBkZWxldGlvblxuICAgIC8vIGNhbiBvbmx5IGRvIGEgZGVsZXRpb24gaWYgd2UgaGF2ZSBlbm91Z2ggZWRpdHMgcmVtYWluaW5nXG4gICAgLy8gYW5kIGlmIHRoZXJlIGFyZSBjaGFyYWN0ZXJzIGxlZnQgdG8gZGVsZXRlIGluIHRoZSBzdHJpbmdcbiAgICBpZiAoZnJhbWUuZWRpdHNSZW1haW5pbmcgPiAwICYmIGZyYW1lLnN0ci5sZW5ndGggPiAxKSB7XG4gICAgICB2YXIgY2hhciA9IGZyYW1lLnN0ci5jaGFyQXQoMSksXG4gICAgICAgICAgZGVsZXRpb25Ob2RlXG5cbiAgICAgIGlmIChjaGFyIGluIGZyYW1lLm5vZGUuZWRnZXMpIHtcbiAgICAgICAgZGVsZXRpb25Ob2RlID0gZnJhbWUubm9kZS5lZGdlc1tjaGFyXVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRpb25Ob2RlID0gbmV3IGx1bnIuVG9rZW5TZXRcbiAgICAgICAgZnJhbWUubm9kZS5lZGdlc1tjaGFyXSA9IGRlbGV0aW9uTm9kZVxuICAgICAgfVxuXG4gICAgICBpZiAoZnJhbWUuc3RyLmxlbmd0aCA8PSAyKSB7XG4gICAgICAgIGRlbGV0aW9uTm9kZS5maW5hbCA9IHRydWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YWNrLnB1c2goe1xuICAgICAgICAgIG5vZGU6IGRlbGV0aW9uTm9kZSxcbiAgICAgICAgICBlZGl0c1JlbWFpbmluZzogZnJhbWUuZWRpdHNSZW1haW5pbmcgLSAxLFxuICAgICAgICAgIHN0cjogZnJhbWUuc3RyLnNsaWNlKDIpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZGVsZXRpb25cbiAgICAvLyBqdXN0IHJlbW92aW5nIHRoZSBsYXN0IGNoYXJhY3RlciBmcm9tIHRoZSBzdHJcbiAgICBpZiAoZnJhbWUuZWRpdHNSZW1haW5pbmcgPiAwICYmIGZyYW1lLnN0ci5sZW5ndGggPT0gMSkge1xuICAgICAgZnJhbWUubm9kZS5maW5hbCA9IHRydWVcbiAgICB9XG5cbiAgICAvLyBzdWJzdGl0dXRpb25cbiAgICAvLyBjYW4gb25seSBkbyBhIHN1YnN0aXR1dGlvbiBpZiB3ZSBoYXZlIGVub3VnaCBlZGl0cyByZW1haW5pbmdcbiAgICAvLyBhbmQgaWYgdGhlcmUgYXJlIGNoYXJhY3RlcnMgbGVmdCB0byBzdWJzdGl0dXRlXG4gICAgaWYgKGZyYW1lLmVkaXRzUmVtYWluaW5nID4gMCAmJiBmcmFtZS5zdHIubGVuZ3RoID49IDEpIHtcbiAgICAgIGlmIChcIipcIiBpbiBmcmFtZS5ub2RlLmVkZ2VzKSB7XG4gICAgICAgIHZhciBzdWJzdGl0dXRpb25Ob2RlID0gZnJhbWUubm9kZS5lZGdlc1tcIipcIl1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBzdWJzdGl0dXRpb25Ob2RlID0gbmV3IGx1bnIuVG9rZW5TZXRcbiAgICAgICAgZnJhbWUubm9kZS5lZGdlc1tcIipcIl0gPSBzdWJzdGl0dXRpb25Ob2RlXG4gICAgICB9XG5cbiAgICAgIGlmIChmcmFtZS5zdHIubGVuZ3RoID09IDEpIHtcbiAgICAgICAgc3Vic3RpdHV0aW9uTm9kZS5maW5hbCA9IHRydWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YWNrLnB1c2goe1xuICAgICAgICAgIG5vZGU6IHN1YnN0aXR1dGlvbk5vZGUsXG4gICAgICAgICAgZWRpdHNSZW1haW5pbmc6IGZyYW1lLmVkaXRzUmVtYWluaW5nIC0gMSxcbiAgICAgICAgICBzdHI6IGZyYW1lLnN0ci5zbGljZSgxKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGluc2VydGlvblxuICAgIC8vIGNhbiBvbmx5IGRvIGluc2VydGlvbiBpZiB0aGVyZSBhcmUgZWRpdHMgcmVtYWluaW5nXG4gICAgaWYgKGZyYW1lLmVkaXRzUmVtYWluaW5nID4gMCkge1xuICAgICAgaWYgKFwiKlwiIGluIGZyYW1lLm5vZGUuZWRnZXMpIHtcbiAgICAgICAgdmFyIGluc2VydGlvbk5vZGUgPSBmcmFtZS5ub2RlLmVkZ2VzW1wiKlwiXVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGluc2VydGlvbk5vZGUgPSBuZXcgbHVuci5Ub2tlblNldFxuICAgICAgICBmcmFtZS5ub2RlLmVkZ2VzW1wiKlwiXSA9IGluc2VydGlvbk5vZGVcbiAgICAgIH1cblxuICAgICAgaWYgKGZyYW1lLnN0ci5sZW5ndGggPT0gMCkge1xuICAgICAgICBpbnNlcnRpb25Ob2RlLmZpbmFsID0gdHJ1ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhY2sucHVzaCh7XG4gICAgICAgICAgbm9kZTogaW5zZXJ0aW9uTm9kZSxcbiAgICAgICAgICBlZGl0c1JlbWFpbmluZzogZnJhbWUuZWRpdHNSZW1haW5pbmcgLSAxLFxuICAgICAgICAgIHN0cjogZnJhbWUuc3RyXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gdHJhbnNwb3NpdGlvblxuICAgIC8vIGNhbiBvbmx5IGRvIGEgdHJhbnNwb3NpdGlvbiBpZiB0aGVyZSBhcmUgZWRpdHMgcmVtYWluaW5nXG4gICAgLy8gYW5kIHRoZXJlIGFyZSBlbm91Z2ggY2hhcmFjdGVycyB0byB0cmFuc3Bvc2VcbiAgICBpZiAoZnJhbWUuZWRpdHNSZW1haW5pbmcgPiAwICYmIGZyYW1lLnN0ci5sZW5ndGggPiAxKSB7XG4gICAgICB2YXIgY2hhckEgPSBmcmFtZS5zdHIuY2hhckF0KDApLFxuICAgICAgICAgIGNoYXJCID0gZnJhbWUuc3RyLmNoYXJBdCgxKSxcbiAgICAgICAgICB0cmFuc3Bvc2VOb2RlXG5cbiAgICAgIGlmIChjaGFyQiBpbiBmcmFtZS5ub2RlLmVkZ2VzKSB7XG4gICAgICAgIHRyYW5zcG9zZU5vZGUgPSBmcmFtZS5ub2RlLmVkZ2VzW2NoYXJCXVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJhbnNwb3NlTm9kZSA9IG5ldyBsdW5yLlRva2VuU2V0XG4gICAgICAgIGZyYW1lLm5vZGUuZWRnZXNbY2hhckJdID0gdHJhbnNwb3NlTm9kZVxuICAgICAgfVxuXG4gICAgICBpZiAoZnJhbWUuc3RyLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIHRyYW5zcG9zZU5vZGUuZmluYWwgPSB0cnVlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGFjay5wdXNoKHtcbiAgICAgICAgICBub2RlOiB0cmFuc3Bvc2VOb2RlLFxuICAgICAgICAgIGVkaXRzUmVtYWluaW5nOiBmcmFtZS5lZGl0c1JlbWFpbmluZyAtIDEsXG4gICAgICAgICAgc3RyOiBjaGFyQSArIGZyYW1lLnN0ci5zbGljZSgyKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByb290XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIFRva2VuU2V0IGZyb20gYSBzdHJpbmcuXG4gKlxuICogVGhlIHN0cmluZyBtYXkgY29udGFpbiBvbmUgb3IgbW9yZSB3aWxkY2FyZCBjaGFyYWN0ZXJzICgqKVxuICogdGhhdCB3aWxsIGFsbG93IHdpbGRjYXJkIG1hdGNoaW5nIHdoZW4gaW50ZXJzZWN0aW5nIHdpdGhcbiAqIGFub3RoZXIgVG9rZW5TZXQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gY3JlYXRlIGEgVG9rZW5TZXQgZnJvbS5cbiAqIEByZXR1cm5zIHtsdW5yLlRva2VuU2V0fVxuICovXG5sdW5yLlRva2VuU2V0LmZyb21TdHJpbmcgPSBmdW5jdGlvbiAoc3RyKSB7XG4gIHZhciBub2RlID0gbmV3IGx1bnIuVG9rZW5TZXQsXG4gICAgICByb290ID0gbm9kZSxcbiAgICAgIHdpbGRjYXJkRm91bmQgPSBmYWxzZVxuXG4gIC8qXG4gICAqIEl0ZXJhdGVzIHRocm91Z2ggYWxsIGNoYXJhY3RlcnMgd2l0aGluIHRoZSBwYXNzZWQgc3RyaW5nXG4gICAqIGFwcGVuZGluZyBhIG5vZGUgZm9yIGVhY2ggY2hhcmFjdGVyLlxuICAgKlxuICAgKiBBcyBzb29uIGFzIGEgd2lsZGNhcmQgY2hhcmFjdGVyIGlzIGZvdW5kIHRoZW4gYSBzZWxmXG4gICAqIHJlZmVyZW5jaW5nIGVkZ2UgaXMgaW50cm9kdWNlZCB0byBjb250aW51YWxseSBtYXRjaFxuICAgKiBhbnkgbnVtYmVyIG9mIGFueSBjaGFyYWN0ZXJzLlxuICAgKi9cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHN0ci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIHZhciBjaGFyID0gc3RyW2ldLFxuICAgICAgICBmaW5hbCA9IChpID09IGxlbiAtIDEpXG5cbiAgICBpZiAoY2hhciA9PSBcIipcIikge1xuICAgICAgd2lsZGNhcmRGb3VuZCA9IHRydWVcbiAgICAgIG5vZGUuZWRnZXNbY2hhcl0gPSBub2RlXG4gICAgICBub2RlLmZpbmFsID0gZmluYWxcblxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbmV4dCA9IG5ldyBsdW5yLlRva2VuU2V0XG4gICAgICBuZXh0LmZpbmFsID0gZmluYWxcblxuICAgICAgbm9kZS5lZGdlc1tjaGFyXSA9IG5leHRcbiAgICAgIG5vZGUgPSBuZXh0XG5cbiAgICAgIC8vIFRPRE86IGlzIHRoaXMgbmVlZGVkIGFueW1vcmU/XG4gICAgICBpZiAod2lsZGNhcmRGb3VuZCkge1xuICAgICAgICBub2RlLmVkZ2VzW1wiKlwiXSA9IHJvb3RcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcm9vdFxufVxuXG4vKipcbiAqIENvbnZlcnRzIHRoaXMgVG9rZW5TZXQgaW50byBhbiBhcnJheSBvZiBzdHJpbmdzXG4gKiBjb250YWluZWQgd2l0aGluIHRoZSBUb2tlblNldC5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nW119XG4gKi9cbmx1bnIuVG9rZW5TZXQucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB3b3JkcyA9IFtdXG5cbiAgdmFyIHN0YWNrID0gW3tcbiAgICBwcmVmaXg6IFwiXCIsXG4gICAgbm9kZTogdGhpc1xuICB9XVxuXG4gIHdoaWxlIChzdGFjay5sZW5ndGgpIHtcbiAgICB2YXIgZnJhbWUgPSBzdGFjay5wb3AoKSxcbiAgICAgICAgZWRnZXMgPSBPYmplY3Qua2V5cyhmcmFtZS5ub2RlLmVkZ2VzKSxcbiAgICAgICAgbGVuID0gZWRnZXMubGVuZ3RoXG5cbiAgICBpZiAoZnJhbWUubm9kZS5maW5hbCkge1xuICAgICAgd29yZHMucHVzaChmcmFtZS5wcmVmaXgpXG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgdmFyIGVkZ2UgPSBlZGdlc1tpXVxuXG4gICAgICBzdGFjay5wdXNoKHtcbiAgICAgICAgcHJlZml4OiBmcmFtZS5wcmVmaXguY29uY2F0KGVkZ2UpLFxuICAgICAgICBub2RlOiBmcmFtZS5ub2RlLmVkZ2VzW2VkZ2VdXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB3b3Jkc1xufVxuXG4vKipcbiAqIEdlbmVyYXRlcyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIFRva2VuU2V0LlxuICpcbiAqIFRoaXMgaXMgaW50ZW5kZWQgdG8gYWxsb3cgVG9rZW5TZXRzIHRvIGJlIHVzZWQgYXMga2V5c1xuICogaW4gb2JqZWN0cywgbGFyZ2VseSB0byBhaWQgdGhlIGNvbnN0cnVjdGlvbiBhbmQgbWluaW1pc2F0aW9uXG4gKiBvZiBhIFRva2VuU2V0LiBBcyBzdWNoIGl0IGlzIG5vdCBkZXNpZ25lZCB0byBiZSBhIGh1bWFuXG4gKiBmcmllbmRseSByZXByZXNlbnRhdGlvbiBvZiB0aGUgVG9rZW5TZXQuXG4gKlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xubHVuci5Ub2tlblNldC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIE5PVEU6IFVzaW5nIE9iamVjdC5rZXlzIGhlcmUgYXMgdGhpcy5lZGdlcyBpcyB2ZXJ5IGxpa2VseVxuICAvLyB0byBlbnRlciAnaGFzaC1tb2RlJyB3aXRoIG1hbnkga2V5cyBiZWluZyBhZGRlZFxuICAvL1xuICAvLyBhdm9pZGluZyBhIGZvci1pbiBsb29wIGhlcmUgYXMgaXQgbGVhZHMgdG8gdGhlIGZ1bmN0aW9uXG4gIC8vIGJlaW5nIGRlLW9wdGltaXNlZCAoYXQgbGVhc3QgaW4gVjgpLiBGcm9tIHNvbWUgc2ltcGxlXG4gIC8vIGJlbmNobWFya3MgdGhlIHBlcmZvcm1hbmNlIGlzIGNvbXBhcmFibGUsIGJ1dCBhbGxvd2luZ1xuICAvLyBWOCB0byBvcHRpbWl6ZSBtYXkgbWVhbiBlYXN5IHBlcmZvcm1hbmNlIHdpbnMgaW4gdGhlIGZ1dHVyZS5cblxuICBpZiAodGhpcy5fc3RyKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0clxuICB9XG5cbiAgdmFyIHN0ciA9IHRoaXMuZmluYWwgPyAnMScgOiAnMCcsXG4gICAgICBsYWJlbHMgPSBPYmplY3Qua2V5cyh0aGlzLmVkZ2VzKS5zb3J0KCksXG4gICAgICBsZW4gPSBsYWJlbHMubGVuZ3RoXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIHZhciBsYWJlbCA9IGxhYmVsc1tpXSxcbiAgICAgICAgbm9kZSA9IHRoaXMuZWRnZXNbbGFiZWxdXG5cbiAgICBzdHIgPSBzdHIgKyBsYWJlbCArIG5vZGUuaWRcbiAgfVxuXG4gIHJldHVybiBzdHJcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IFRva2VuU2V0IHRoYXQgaXMgdGhlIGludGVyc2VjdGlvbiBvZlxuICogdGhpcyBUb2tlblNldCBhbmQgdGhlIHBhc3NlZCBUb2tlblNldC5cbiAqXG4gKiBUaGlzIGludGVyc2VjdGlvbiB3aWxsIHRha2UgaW50byBhY2NvdW50IGFueSB3aWxkY2FyZHNcbiAqIGNvbnRhaW5lZCB3aXRoaW4gdGhlIFRva2VuU2V0LlxuICpcbiAqIEBwYXJhbSB7bHVuci5Ub2tlblNldH0gYiAtIEFuIG90aGVyIFRva2VuU2V0IHRvIGludGVyc2VjdCB3aXRoLlxuICogQHJldHVybnMge2x1bnIuVG9rZW5TZXR9XG4gKi9cbmx1bnIuVG9rZW5TZXQucHJvdG90eXBlLmludGVyc2VjdCA9IGZ1bmN0aW9uIChiKSB7XG4gIHZhciBvdXRwdXQgPSBuZXcgbHVuci5Ub2tlblNldCxcbiAgICAgIGZyYW1lID0gdW5kZWZpbmVkXG5cbiAgdmFyIHN0YWNrID0gW3tcbiAgICBxTm9kZTogYixcbiAgICBvdXRwdXQ6IG91dHB1dCxcbiAgICBub2RlOiB0aGlzXG4gIH1dXG5cbiAgd2hpbGUgKHN0YWNrLmxlbmd0aCkge1xuICAgIGZyYW1lID0gc3RhY2sucG9wKClcblxuICAgIC8vIE5PVEU6IEFzIHdpdGggdGhlICN0b1N0cmluZyBtZXRob2QsIHdlIGFyZSB1c2luZ1xuICAgIC8vIE9iamVjdC5rZXlzIGFuZCBhIGZvciBsb29wIGluc3RlYWQgb2YgYSBmb3ItaW4gbG9vcFxuICAgIC8vIGFzIGJvdGggb2YgdGhlc2Ugb2JqZWN0cyBlbnRlciAnaGFzaCcgbW9kZSwgY2F1c2luZ1xuICAgIC8vIHRoZSBmdW5jdGlvbiB0byBiZSBkZS1vcHRpbWlzZWQgaW4gVjhcbiAgICB2YXIgcUVkZ2VzID0gT2JqZWN0LmtleXMoZnJhbWUucU5vZGUuZWRnZXMpLFxuICAgICAgICBxTGVuID0gcUVkZ2VzLmxlbmd0aCxcbiAgICAgICAgbkVkZ2VzID0gT2JqZWN0LmtleXMoZnJhbWUubm9kZS5lZGdlcyksXG4gICAgICAgIG5MZW4gPSBuRWRnZXMubGVuZ3RoXG5cbiAgICBmb3IgKHZhciBxID0gMDsgcSA8IHFMZW47IHErKykge1xuICAgICAgdmFyIHFFZGdlID0gcUVkZ2VzW3FdXG5cbiAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgbkxlbjsgbisrKSB7XG4gICAgICAgIHZhciBuRWRnZSA9IG5FZGdlc1tuXVxuXG4gICAgICAgIGlmIChuRWRnZSA9PSBxRWRnZSB8fCBxRWRnZSA9PSAnKicpIHtcbiAgICAgICAgICB2YXIgbm9kZSA9IGZyYW1lLm5vZGUuZWRnZXNbbkVkZ2VdLFxuICAgICAgICAgICAgICBxTm9kZSA9IGZyYW1lLnFOb2RlLmVkZ2VzW3FFZGdlXSxcbiAgICAgICAgICAgICAgZmluYWwgPSBub2RlLmZpbmFsICYmIHFOb2RlLmZpbmFsLFxuICAgICAgICAgICAgICBuZXh0ID0gdW5kZWZpbmVkXG5cbiAgICAgICAgICBpZiAobkVkZ2UgaW4gZnJhbWUub3V0cHV0LmVkZ2VzKSB7XG4gICAgICAgICAgICAvLyBhbiBlZGdlIGFscmVhZHkgZXhpc3RzIGZvciB0aGlzIGNoYXJhY3RlclxuICAgICAgICAgICAgLy8gbm8gbmVlZCB0byBjcmVhdGUgYSBuZXcgbm9kZSwganVzdCBzZXQgdGhlIGZpbmFsaXR5XG4gICAgICAgICAgICAvLyBiaXQgdW5sZXNzIHRoaXMgbm9kZSBpcyBhbHJlYWR5IGZpbmFsXG4gICAgICAgICAgICBuZXh0ID0gZnJhbWUub3V0cHV0LmVkZ2VzW25FZGdlXVxuICAgICAgICAgICAgbmV4dC5maW5hbCA9IG5leHQuZmluYWwgfHwgZmluYWxcblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBubyBlZGdlIGV4aXN0cyB5ZXQsIG11c3QgY3JlYXRlIG9uZVxuICAgICAgICAgICAgLy8gc2V0IHRoZSBmaW5hbGl0eSBiaXQgYW5kIGluc2VydCBpdFxuICAgICAgICAgICAgLy8gaW50byB0aGUgb3V0cHV0XG4gICAgICAgICAgICBuZXh0ID0gbmV3IGx1bnIuVG9rZW5TZXRcbiAgICAgICAgICAgIG5leHQuZmluYWwgPSBmaW5hbFxuICAgICAgICAgICAgZnJhbWUub3V0cHV0LmVkZ2VzW25FZGdlXSA9IG5leHRcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzdGFjay5wdXNoKHtcbiAgICAgICAgICAgIHFOb2RlOiBxTm9kZSxcbiAgICAgICAgICAgIG91dHB1dDogbmV4dCxcbiAgICAgICAgICAgIG5vZGU6IG5vZGVcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG91dHB1dFxufVxubHVuci5Ub2tlblNldC5CdWlsZGVyID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnByZXZpb3VzV29yZCA9IFwiXCJcbiAgdGhpcy5yb290ID0gbmV3IGx1bnIuVG9rZW5TZXRcbiAgdGhpcy51bmNoZWNrZWROb2RlcyA9IFtdXG4gIHRoaXMubWluaW1pemVkTm9kZXMgPSB7fVxufVxuXG5sdW5yLlRva2VuU2V0LkJ1aWxkZXIucHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uICh3b3JkKSB7XG4gIHZhciBub2RlLFxuICAgICAgY29tbW9uUHJlZml4ID0gMFxuXG4gIGlmICh3b3JkIDwgdGhpcy5wcmV2aW91c1dvcmQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IgKFwiT3V0IG9mIG9yZGVyIHdvcmQgaW5zZXJ0aW9uXCIpXG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHdvcmQubGVuZ3RoICYmIGkgPCB0aGlzLnByZXZpb3VzV29yZC5sZW5ndGg7IGkrKykge1xuICAgIGlmICh3b3JkW2ldICE9IHRoaXMucHJldmlvdXNXb3JkW2ldKSBicmVha1xuICAgIGNvbW1vblByZWZpeCsrXG4gIH1cblxuICB0aGlzLm1pbmltaXplKGNvbW1vblByZWZpeClcblxuICBpZiAodGhpcy51bmNoZWNrZWROb2Rlcy5sZW5ndGggPT0gMCkge1xuICAgIG5vZGUgPSB0aGlzLnJvb3RcbiAgfSBlbHNlIHtcbiAgICBub2RlID0gdGhpcy51bmNoZWNrZWROb2Rlc1t0aGlzLnVuY2hlY2tlZE5vZGVzLmxlbmd0aCAtIDFdLmNoaWxkXG4gIH1cblxuICBmb3IgKHZhciBpID0gY29tbW9uUHJlZml4OyBpIDwgd29yZC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBuZXh0Tm9kZSA9IG5ldyBsdW5yLlRva2VuU2V0LFxuICAgICAgICBjaGFyID0gd29yZFtpXVxuXG4gICAgbm9kZS5lZGdlc1tjaGFyXSA9IG5leHROb2RlXG5cbiAgICB0aGlzLnVuY2hlY2tlZE5vZGVzLnB1c2goe1xuICAgICAgcGFyZW50OiBub2RlLFxuICAgICAgY2hhcjogY2hhcixcbiAgICAgIGNoaWxkOiBuZXh0Tm9kZVxuICAgIH0pXG5cbiAgICBub2RlID0gbmV4dE5vZGVcbiAgfVxuXG4gIG5vZGUuZmluYWwgPSB0cnVlXG4gIHRoaXMucHJldmlvdXNXb3JkID0gd29yZFxufVxuXG5sdW5yLlRva2VuU2V0LkJ1aWxkZXIucHJvdG90eXBlLmZpbmlzaCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5taW5pbWl6ZSgwKVxufVxuXG5sdW5yLlRva2VuU2V0LkJ1aWxkZXIucHJvdG90eXBlLm1pbmltaXplID0gZnVuY3Rpb24gKGRvd25Ubykge1xuICBmb3IgKHZhciBpID0gdGhpcy51bmNoZWNrZWROb2Rlcy5sZW5ndGggLSAxOyBpID49IGRvd25UbzsgaS0tKSB7XG4gICAgdmFyIG5vZGUgPSB0aGlzLnVuY2hlY2tlZE5vZGVzW2ldLFxuICAgICAgICBjaGlsZEtleSA9IG5vZGUuY2hpbGQudG9TdHJpbmcoKVxuXG4gICAgaWYgKGNoaWxkS2V5IGluIHRoaXMubWluaW1pemVkTm9kZXMpIHtcbiAgICAgIG5vZGUucGFyZW50LmVkZ2VzW25vZGUuY2hhcl0gPSB0aGlzLm1pbmltaXplZE5vZGVzW2NoaWxkS2V5XVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBDYWNoZSB0aGUga2V5IGZvciB0aGlzIG5vZGUgc2luY2VcbiAgICAgIC8vIHdlIGtub3cgaXQgY2FuJ3QgY2hhbmdlIGFueW1vcmVcbiAgICAgIG5vZGUuY2hpbGQuX3N0ciA9IGNoaWxkS2V5XG5cbiAgICAgIHRoaXMubWluaW1pemVkTm9kZXNbY2hpbGRLZXldID0gbm9kZS5jaGlsZFxuICAgIH1cblxuICAgIHRoaXMudW5jaGVja2VkTm9kZXMucG9wKClcbiAgfVxufVxuLyohXG4gKiBsdW5yLkluZGV4XG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBBbiBpbmRleCBjb250YWlucyB0aGUgYnVpbHQgaW5kZXggb2YgYWxsIGRvY3VtZW50cyBhbmQgcHJvdmlkZXMgYSBxdWVyeSBpbnRlcmZhY2VcbiAqIHRvIHRoZSBpbmRleC5cbiAqXG4gKiBVc3VhbGx5IGluc3RhbmNlcyBvZiBsdW5yLkluZGV4IHdpbGwgbm90IGJlIGNyZWF0ZWQgdXNpbmcgdGhpcyBjb25zdHJ1Y3RvciwgaW5zdGVhZFxuICogbHVuci5CdWlsZGVyIHNob3VsZCBiZSB1c2VkIHRvIGNvbnN0cnVjdCBuZXcgaW5kZXhlcywgb3IgbHVuci5JbmRleC5sb2FkIHNob3VsZCBiZVxuICogdXNlZCB0byBsb2FkIHByZXZpb3VzbHkgYnVpbHQgYW5kIHNlcmlhbGl6ZWQgaW5kZXhlcy5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7T2JqZWN0fSBhdHRycyAtIFRoZSBhdHRyaWJ1dGVzIG9mIHRoZSBidWlsdCBzZWFyY2ggaW5kZXguXG4gKiBAcGFyYW0ge09iamVjdH0gYXR0cnMuaW52ZXJ0ZWRJbmRleCAtIEFuIGluZGV4IG9mIHRlcm0vZmllbGQgdG8gZG9jdW1lbnQgcmVmZXJlbmNlLlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBsdW5yLlZlY3Rvcj59IGF0dHJzLmRvY3VtZW50VmVjdG9ycyAtIERvY3VtZW50IHZlY3RvcnMga2V5ZWQgYnkgZG9jdW1lbnQgcmVmZXJlbmNlLlxuICogQHBhcmFtIHtsdW5yLlRva2VuU2V0fSBhdHRycy50b2tlblNldCAtIEFuIHNldCBvZiBhbGwgY29ycHVzIHRva2Vucy5cbiAqIEBwYXJhbSB7c3RyaW5nW119IGF0dHJzLmZpZWxkcyAtIFRoZSBuYW1lcyBvZiBpbmRleGVkIGRvY3VtZW50IGZpZWxkcy5cbiAqIEBwYXJhbSB7bHVuci5QaXBlbGluZX0gYXR0cnMucGlwZWxpbmUgLSBUaGUgcGlwZWxpbmUgdG8gdXNlIGZvciBzZWFyY2ggdGVybXMuXG4gKi9cbmx1bnIuSW5kZXggPSBmdW5jdGlvbiAoYXR0cnMpIHtcbiAgdGhpcy5pbnZlcnRlZEluZGV4ID0gYXR0cnMuaW52ZXJ0ZWRJbmRleFxuICB0aGlzLmZpZWxkVmVjdG9ycyA9IGF0dHJzLmZpZWxkVmVjdG9yc1xuICB0aGlzLnRva2VuU2V0ID0gYXR0cnMudG9rZW5TZXRcbiAgdGhpcy5maWVsZHMgPSBhdHRycy5maWVsZHNcbiAgdGhpcy5waXBlbGluZSA9IGF0dHJzLnBpcGVsaW5lXG59XG5cbi8qKlxuICogQSByZXN1bHQgY29udGFpbnMgZGV0YWlscyBvZiBhIGRvY3VtZW50IG1hdGNoaW5nIGEgc2VhcmNoIHF1ZXJ5LlxuICogQHR5cGVkZWYge09iamVjdH0gbHVuci5JbmRleH5SZXN1bHRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSByZWYgLSBUaGUgcmVmZXJlbmNlIG9mIHRoZSBkb2N1bWVudCB0aGlzIHJlc3VsdCByZXByZXNlbnRzLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IHNjb3JlIC0gQSBudW1iZXIgYmV0d2VlbiAwIGFuZCAxIHJlcHJlc2VudGluZyBob3cgc2ltaWxhciB0aGlzIGRvY3VtZW50IGlzIHRvIHRoZSBxdWVyeS5cbiAqIEBwcm9wZXJ0eSB7bHVuci5NYXRjaERhdGF9IG1hdGNoRGF0YSAtIENvbnRhaW5zIG1ldGFkYXRhIGFib3V0IHRoaXMgbWF0Y2ggaW5jbHVkaW5nIHdoaWNoIHRlcm0ocykgY2F1c2VkIHRoZSBtYXRjaC5cbiAqL1xuXG4vKipcbiAqIEFsdGhvdWdoIGx1bnIgcHJvdmlkZXMgdGhlIGFiaWxpdHkgdG8gY3JlYXRlIHF1ZXJpZXMgdXNpbmcgbHVuci5RdWVyeSwgaXQgYWxzbyBwcm92aWRlcyBhIHNpbXBsZVxuICogcXVlcnkgbGFuZ3VhZ2Ugd2hpY2ggaXRzZWxmIGlzIHBhcnNlZCBpbnRvIGFuIGluc3RhbmNlIG9mIGx1bnIuUXVlcnkuXG4gKlxuICogRm9yIHByb2dyYW1tYXRpY2FsbHkgYnVpbGRpbmcgcXVlcmllcyBpdCBpcyBhZHZpc2VkIHRvIGRpcmVjdGx5IHVzZSBsdW5yLlF1ZXJ5LCB0aGUgcXVlcnkgbGFuZ3VhZ2VcbiAqIGlzIGJlc3QgdXNlZCBmb3IgaHVtYW4gZW50ZXJlZCB0ZXh0IHJhdGhlciB0aGFuIHByb2dyYW0gZ2VuZXJhdGVkIHRleHQuXG4gKlxuICogQXQgaXRzIHNpbXBsZXN0IHF1ZXJpZXMgY2FuIGp1c3QgYmUgYSBzaW5nbGUgdGVybSwgZS5nLiBgaGVsbG9gLCBtdWx0aXBsZSB0ZXJtcyBhcmUgYWxzbyBzdXBwb3J0ZWRcbiAqIGFuZCB3aWxsIGJlIGNvbWJpbmVkIHdpdGggT1IsIGUuZyBgaGVsbG8gd29ybGRgIHdpbGwgbWF0Y2ggZG9jdW1lbnRzIHRoYXQgY29udGFpbiBlaXRoZXIgJ2hlbGxvJ1xuICogb3IgJ3dvcmxkJywgdGhvdWdoIHRob3NlIHRoYXQgY29udGFpbiBib3RoIHdpbGwgcmFuayBoaWdoZXIgaW4gdGhlIHJlc3VsdHMuXG4gKlxuICogV2lsZGNhcmRzIGNhbiBiZSBpbmNsdWRlZCBpbiB0ZXJtcyB0byBtYXRjaCBvbmUgb3IgbW9yZSB1bnNwZWNpZmllZCBjaGFyYWN0ZXJzLCB0aGVzZSB3aWxkY2FyZHMgY2FuXG4gKiBiZSBpbnNlcnRlZCBhbnl3aGVyZSB3aXRoaW4gdGhlIHRlcm0sIGFuZCBtb3JlIHRoYW4gb25lIHdpbGRjYXJkIGNhbiBleGlzdCBpbiBhIHNpbmdsZSB0ZXJtLiBBZGRpbmdcbiAqIHdpbGRjYXJkcyB3aWxsIGluY3JlYXNlIHRoZSBudW1iZXIgb2YgZG9jdW1lbnRzIHRoYXQgd2lsbCBiZSBmb3VuZCBidXQgY2FuIGFsc28gaGF2ZSBhIG5lZ2F0aXZlXG4gKiBpbXBhY3Qgb24gcXVlcnkgcGVyZm9ybWFuY2UsIGVzcGVjaWFsbHkgd2l0aCB3aWxkY2FyZHMgYXQgdGhlIGJlZ2lubmluZyBvZiBhIHRlcm0uXG4gKlxuICogVGVybXMgY2FuIGJlIHJlc3RyaWN0ZWQgdG8gc3BlY2lmaWMgZmllbGRzLCBlLmcuIGB0aXRsZTpoZWxsb2AsIG9ubHkgZG9jdW1lbnRzIHdpdGggdGhlIHRlcm1cbiAqIGhlbGxvIGluIHRoZSB0aXRsZSBmaWVsZCB3aWxsIG1hdGNoIHRoaXMgcXVlcnkuIFVzaW5nIGEgZmllbGQgbm90IHByZXNlbnQgaW4gdGhlIGluZGV4IHdpbGwgbGVhZFxuICogdG8gYW4gZXJyb3IgYmVpbmcgdGhyb3duLlxuICpcbiAqIE1vZGlmaWVycyBjYW4gYWxzbyBiZSBhZGRlZCB0byB0ZXJtcywgbHVuciBzdXBwb3J0cyBlZGl0IGRpc3RhbmNlIGFuZCBib29zdCBtb2RpZmllcnMgb24gdGVybXMuIEEgdGVybVxuICogYm9vc3Qgd2lsbCBtYWtlIGRvY3VtZW50cyBtYXRjaGluZyB0aGF0IHRlcm0gc2NvcmUgaGlnaGVyLCBlLmcuIGBmb29eNWAuIEVkaXQgZGlzdGFuY2UgaXMgYWxzbyBzdXBwb3J0ZWRcbiAqIHRvIHByb3ZpZGUgZnV6enkgbWF0Y2hpbmcsIGUuZy4gJ2hlbGxvfjInIHdpbGwgbWF0Y2ggZG9jdW1lbnRzIHdpdGggaGVsbG8gd2l0aCBhbiBlZGl0IGRpc3RhbmNlIG9mIDIuXG4gKiBBdm9pZCBsYXJnZSB2YWx1ZXMgZm9yIGVkaXQgZGlzdGFuY2UgdG8gaW1wcm92ZSBxdWVyeSBwZXJmb3JtYW5jZS5cbiAqXG4gKiBUbyBlc2NhcGUgc3BlY2lhbCBjaGFyYWN0ZXJzIHRoZSBiYWNrc2xhc2ggY2hhcmFjdGVyICdcXCcgY2FuIGJlIHVzZWQsIHRoaXMgYWxsb3dzIHNlYXJjaGVzIHRvIGluY2x1ZGVcbiAqIGNoYXJhY3RlcnMgdGhhdCB3b3VsZCBub3JtYWxseSBiZSBjb25zaWRlcmVkIG1vZGlmaWVycywgZS5nLiBgZm9vXFx+MmAgd2lsbCBzZWFyY2ggZm9yIGEgdGVybSBcImZvb34yXCIgaW5zdGVhZFxuICogb2YgYXR0ZW1wdGluZyB0byBhcHBseSBhIGJvb3N0IG9mIDIgdG8gdGhlIHNlYXJjaCB0ZXJtIFwiZm9vXCIuXG4gKlxuICogQHR5cGVkZWYge3N0cmluZ30gbHVuci5JbmRleH5RdWVyeVN0cmluZ1xuICogQGV4YW1wbGUgPGNhcHRpb24+U2ltcGxlIHNpbmdsZSB0ZXJtIHF1ZXJ5PC9jYXB0aW9uPlxuICogaGVsbG9cbiAqIEBleGFtcGxlIDxjYXB0aW9uPk11bHRpcGxlIHRlcm0gcXVlcnk8L2NhcHRpb24+XG4gKiBoZWxsbyB3b3JsZFxuICogQGV4YW1wbGUgPGNhcHRpb24+dGVybSBzY29wZWQgdG8gYSBmaWVsZDwvY2FwdGlvbj5cbiAqIHRpdGxlOmhlbGxvXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj50ZXJtIHdpdGggYSBib29zdCBvZiAxMDwvY2FwdGlvbj5cbiAqIGhlbGxvXjEwXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj50ZXJtIHdpdGggYW4gZWRpdCBkaXN0YW5jZSBvZiAyPC9jYXB0aW9uPlxuICogaGVsbG9+MlxuICovXG5cbi8qKlxuICogUGVyZm9ybXMgYSBzZWFyY2ggYWdhaW5zdCB0aGUgaW5kZXggdXNpbmcgbHVuciBxdWVyeSBzeW50YXguXG4gKlxuICogUmVzdWx0cyB3aWxsIGJlIHJldHVybmVkIHNvcnRlZCBieSB0aGVpciBzY29yZSwgdGhlIG1vc3QgcmVsZXZhbnQgcmVzdWx0c1xuICogd2lsbCBiZSByZXR1cm5lZCBmaXJzdC5cbiAqXG4gKiBGb3IgbW9yZSBwcm9ncmFtbWF0aWMgcXVlcnlpbmcgdXNlIGx1bnIuSW5kZXgjcXVlcnkuXG4gKlxuICogQHBhcmFtIHtsdW5yLkluZGV4flF1ZXJ5U3RyaW5nfSBxdWVyeVN0cmluZyAtIEEgc3RyaW5nIGNvbnRhaW5pbmcgYSBsdW5yIHF1ZXJ5LlxuICogQHRocm93cyB7bHVuci5RdWVyeVBhcnNlRXJyb3J9IElmIHRoZSBwYXNzZWQgcXVlcnkgc3RyaW5nIGNhbm5vdCBiZSBwYXJzZWQuXG4gKiBAcmV0dXJucyB7bHVuci5JbmRleH5SZXN1bHRbXX1cbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUuc2VhcmNoID0gZnVuY3Rpb24gKHF1ZXJ5U3RyaW5nKSB7XG4gIHJldHVybiB0aGlzLnF1ZXJ5KGZ1bmN0aW9uIChxdWVyeSkge1xuICAgIHZhciBwYXJzZXIgPSBuZXcgbHVuci5RdWVyeVBhcnNlcihxdWVyeVN0cmluZywgcXVlcnkpXG4gICAgcGFyc2VyLnBhcnNlKClcbiAgfSlcbn1cblxuLyoqXG4gKiBBIHF1ZXJ5IGJ1aWxkZXIgY2FsbGJhY2sgcHJvdmlkZXMgYSBxdWVyeSBvYmplY3QgdG8gYmUgdXNlZCB0byBleHByZXNzXG4gKiB0aGUgcXVlcnkgdG8gcGVyZm9ybSBvbiB0aGUgaW5kZXguXG4gKlxuICogQGNhbGxiYWNrIGx1bnIuSW5kZXh+cXVlcnlCdWlsZGVyXG4gKiBAcGFyYW0ge2x1bnIuUXVlcnl9IHF1ZXJ5IC0gVGhlIHF1ZXJ5IG9iamVjdCB0byBidWlsZCB1cC5cbiAqIEB0aGlzIGx1bnIuUXVlcnlcbiAqL1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgcXVlcnkgYWdhaW5zdCB0aGUgaW5kZXggdXNpbmcgdGhlIHlpZWxkZWQgbHVuci5RdWVyeSBvYmplY3QuXG4gKlxuICogSWYgcGVyZm9ybWluZyBwcm9ncmFtbWF0aWMgcXVlcmllcyBhZ2FpbnN0IHRoZSBpbmRleCwgdGhpcyBtZXRob2QgaXMgcHJlZmVycmVkXG4gKiBvdmVyIGx1bnIuSW5kZXgjc2VhcmNoIHNvIGFzIHRvIGF2b2lkIHRoZSBhZGRpdGlvbmFsIHF1ZXJ5IHBhcnNpbmcgb3ZlcmhlYWQuXG4gKlxuICogQSBxdWVyeSBvYmplY3QgaXMgeWllbGRlZCB0byB0aGUgc3VwcGxpZWQgZnVuY3Rpb24gd2hpY2ggc2hvdWxkIGJlIHVzZWQgdG9cbiAqIGV4cHJlc3MgdGhlIHF1ZXJ5IHRvIGJlIHJ1biBhZ2FpbnN0IHRoZSBpbmRleC5cbiAqXG4gKiBOb3RlIHRoYXQgYWx0aG91Z2ggdGhpcyBmdW5jdGlvbiB0YWtlcyBhIGNhbGxiYWNrIHBhcmFtZXRlciBpdCBpcyBfbm90XyBhblxuICogYXN5bmNocm9ub3VzIG9wZXJhdGlvbiwgdGhlIGNhbGxiYWNrIGlzIGp1c3QgeWllbGRlZCBhIHF1ZXJ5IG9iamVjdCB0byBiZVxuICogY3VzdG9taXplZC5cbiAqXG4gKiBAcGFyYW0ge2x1bnIuSW5kZXh+cXVlcnlCdWlsZGVyfSBmbiAtIEEgZnVuY3Rpb24gdGhhdCBpcyB1c2VkIHRvIGJ1aWxkIHRoZSBxdWVyeS5cbiAqIEByZXR1cm5zIHtsdW5yLkluZGV4flJlc3VsdFtdfVxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS5xdWVyeSA9IGZ1bmN0aW9uIChmbikge1xuICAvLyBmb3IgZWFjaCBxdWVyeSBjbGF1c2VcbiAgLy8gKiBwcm9jZXNzIHRlcm1zXG4gIC8vICogZXhwYW5kIHRlcm1zIGZyb20gdG9rZW4gc2V0XG4gIC8vICogZmluZCBtYXRjaGluZyBkb2N1bWVudHMgYW5kIG1ldGFkYXRhXG4gIC8vICogZ2V0IGRvY3VtZW50IHZlY3RvcnNcbiAgLy8gKiBzY29yZSBkb2N1bWVudHNcblxuICB2YXIgcXVlcnkgPSBuZXcgbHVuci5RdWVyeSh0aGlzLmZpZWxkcyksXG4gICAgICBtYXRjaGluZ0ZpZWxkcyA9IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICBxdWVyeVZlY3RvcnMgPSBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgdGVybUZpZWxkQ2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpXG5cbiAgZm4uY2FsbChxdWVyeSwgcXVlcnkpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWVyeS5jbGF1c2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgLypcbiAgICAgKiBVbmxlc3MgdGhlIHBpcGVsaW5lIGhhcyBiZWVuIGRpc2FibGVkIGZvciB0aGlzIHRlcm0sIHdoaWNoIGlzXG4gICAgICogdGhlIGNhc2UgZm9yIHRlcm1zIHdpdGggd2lsZGNhcmRzLCB3ZSBuZWVkIHRvIHBhc3MgdGhlIGNsYXVzZVxuICAgICAqIHRlcm0gdGhyb3VnaCB0aGUgc2VhcmNoIHBpcGVsaW5lLiBBIHBpcGVsaW5lIHJldHVybnMgYW4gYXJyYXlcbiAgICAgKiBvZiBwcm9jZXNzZWQgdGVybXMuIFBpcGVsaW5lIGZ1bmN0aW9ucyBtYXkgZXhwYW5kIHRoZSBwYXNzZWRcbiAgICAgKiB0ZXJtLCB3aGljaCBtZWFucyB3ZSBtYXkgZW5kIHVwIHBlcmZvcm1pbmcgbXVsdGlwbGUgaW5kZXggbG9va3Vwc1xuICAgICAqIGZvciBhIHNpbmdsZSBxdWVyeSB0ZXJtLlxuICAgICAqL1xuICAgIHZhciBjbGF1c2UgPSBxdWVyeS5jbGF1c2VzW2ldLFxuICAgICAgICB0ZXJtcyA9IG51bGxcblxuICAgIGlmIChjbGF1c2UudXNlUGlwZWxpbmUpIHtcbiAgICAgIHRlcm1zID0gdGhpcy5waXBlbGluZS5ydW5TdHJpbmcoY2xhdXNlLnRlcm0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRlcm1zID0gW2NsYXVzZS50ZXJtXVxuICAgIH1cblxuICAgIGZvciAodmFyIG0gPSAwOyBtIDwgdGVybXMubGVuZ3RoOyBtKyspIHtcbiAgICAgIHZhciB0ZXJtID0gdGVybXNbbV1cblxuICAgICAgLypcbiAgICAgICAqIEVhY2ggdGVybSByZXR1cm5lZCBmcm9tIHRoZSBwaXBlbGluZSBuZWVkcyB0byB1c2UgdGhlIHNhbWUgcXVlcnlcbiAgICAgICAqIGNsYXVzZSBvYmplY3QsIGUuZy4gdGhlIHNhbWUgYm9vc3QgYW5kIG9yIGVkaXQgZGlzdGFuY2UuIFRoZVxuICAgICAgICogc2ltcGxlc3Qgd2F5IHRvIGRvIHRoaXMgaXMgdG8gcmUtdXNlIHRoZSBjbGF1c2Ugb2JqZWN0IGJ1dCBtdXRhdGVcbiAgICAgICAqIGl0cyB0ZXJtIHByb3BlcnR5LlxuICAgICAgICovXG4gICAgICBjbGF1c2UudGVybSA9IHRlcm1cblxuICAgICAgLypcbiAgICAgICAqIEZyb20gdGhlIHRlcm0gaW4gdGhlIGNsYXVzZSB3ZSBjcmVhdGUgYSB0b2tlbiBzZXQgd2hpY2ggd2lsbCB0aGVuXG4gICAgICAgKiBiZSB1c2VkIHRvIGludGVyc2VjdCB0aGUgaW5kZXhlcyB0b2tlbiBzZXQgdG8gZ2V0IGEgbGlzdCBvZiB0ZXJtc1xuICAgICAgICogdG8gbG9va3VwIGluIHRoZSBpbnZlcnRlZCBpbmRleFxuICAgICAgICovXG4gICAgICB2YXIgdGVybVRva2VuU2V0ID0gbHVuci5Ub2tlblNldC5mcm9tQ2xhdXNlKGNsYXVzZSksXG4gICAgICAgICAgZXhwYW5kZWRUZXJtcyA9IHRoaXMudG9rZW5TZXQuaW50ZXJzZWN0KHRlcm1Ub2tlblNldCkudG9BcnJheSgpXG5cbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZXhwYW5kZWRUZXJtcy5sZW5ndGg7IGorKykge1xuICAgICAgICAvKlxuICAgICAgICAgKiBGb3IgZWFjaCB0ZXJtIGdldCB0aGUgcG9zdGluZyBhbmQgdGVybUluZGV4LCB0aGlzIGlzIHJlcXVpcmVkIGZvclxuICAgICAgICAgKiBidWlsZGluZyB0aGUgcXVlcnkgdmVjdG9yLlxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGV4cGFuZGVkVGVybSA9IGV4cGFuZGVkVGVybXNbal0sXG4gICAgICAgICAgICBwb3N0aW5nID0gdGhpcy5pbnZlcnRlZEluZGV4W2V4cGFuZGVkVGVybV0sXG4gICAgICAgICAgICB0ZXJtSW5kZXggPSBwb3N0aW5nLl9pbmRleFxuXG4gICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgY2xhdXNlLmZpZWxkcy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgIC8qXG4gICAgICAgICAgICogRm9yIGVhY2ggZmllbGQgdGhhdCB0aGlzIHF1ZXJ5IHRlcm0gaXMgc2NvcGVkIGJ5IChieSBkZWZhdWx0XG4gICAgICAgICAgICogYWxsIGZpZWxkcyBhcmUgaW4gc2NvcGUpIHdlIG5lZWQgdG8gZ2V0IGFsbCB0aGUgZG9jdW1lbnQgcmVmc1xuICAgICAgICAgICAqIHRoYXQgaGF2ZSB0aGlzIHRlcm0gaW4gdGhhdCBmaWVsZC5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIFRoZSBwb3N0aW5nIGlzIHRoZSBlbnRyeSBpbiB0aGUgaW52ZXJ0ZWRJbmRleCBmb3IgdGhlIG1hdGNoaW5nXG4gICAgICAgICAgICogdGVybSBmcm9tIGFib3ZlLlxuICAgICAgICAgICAqL1xuICAgICAgICAgIHZhciBmaWVsZCA9IGNsYXVzZS5maWVsZHNba10sXG4gICAgICAgICAgICAgIGZpZWxkUG9zdGluZyA9IHBvc3RpbmdbZmllbGRdLFxuICAgICAgICAgICAgICBtYXRjaGluZ0RvY3VtZW50UmVmcyA9IE9iamVjdC5rZXlzKGZpZWxkUG9zdGluZyksXG4gICAgICAgICAgICAgIHRlcm1GaWVsZCA9IGV4cGFuZGVkVGVybSArIFwiL1wiICsgZmllbGRcblxuICAgICAgICAgIC8qXG4gICAgICAgICAgICogVG8gc3VwcG9ydCBmaWVsZCBsZXZlbCBib29zdHMgYSBxdWVyeSB2ZWN0b3IgaXMgY3JlYXRlZCBwZXJcbiAgICAgICAgICAgKiBmaWVsZC4gVGhpcyB2ZWN0b3IgaXMgcG9wdWxhdGVkIHVzaW5nIHRoZSB0ZXJtSW5kZXggZm91bmQgZm9yXG4gICAgICAgICAgICogdGhlIHRlcm0gYW5kIGEgdW5pdCB2YWx1ZSB3aXRoIHRoZSBhcHByb3ByaWF0ZSBib29zdCBhcHBsaWVkLlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogSWYgdGhlIHF1ZXJ5IHZlY3RvciBmb3IgdGhpcyBmaWVsZCBkb2VzIG5vdCBleGlzdCB5ZXQgaXQgbmVlZHNcbiAgICAgICAgICAgKiB0byBiZSBjcmVhdGVkLlxuICAgICAgICAgICAqL1xuICAgICAgICAgIGlmIChxdWVyeVZlY3RvcnNbZmllbGRdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHF1ZXJ5VmVjdG9yc1tmaWVsZF0gPSBuZXcgbHVuci5WZWN0b3JcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvKlxuICAgICAgICAgICAqIFVzaW5nIHVwc2VydCBiZWNhdXNlIHRoZXJlIGNvdWxkIGFscmVhZHkgYmUgYW4gZW50cnkgaW4gdGhlIHZlY3RvclxuICAgICAgICAgICAqIGZvciB0aGUgdGVybSB3ZSBhcmUgd29ya2luZyB3aXRoLiBJbiB0aGF0IGNhc2Ugd2UganVzdCBhZGQgdGhlIHNjb3Jlc1xuICAgICAgICAgICAqIHRvZ2V0aGVyLlxuICAgICAgICAgICAqL1xuICAgICAgICAgIHF1ZXJ5VmVjdG9yc1tmaWVsZF0udXBzZXJ0KHRlcm1JbmRleCwgMSAqIGNsYXVzZS5ib29zdCwgZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEgKyBiIH0pXG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBJZiB3ZSd2ZSBhbHJlYWR5IHNlZW4gdGhpcyB0ZXJtLCBmaWVsZCBjb21ibyB0aGVuIHdlJ3ZlIGFscmVhZHkgY29sbGVjdGVkXG4gICAgICAgICAgICogdGhlIG1hdGNoaW5nIGRvY3VtZW50cyBhbmQgbWV0YWRhdGEsIG5vIG5lZWQgdG8gZ28gdGhyb3VnaCBhbGwgdGhhdCBhZ2FpblxuICAgICAgICAgICAqL1xuICAgICAgICAgIGlmICh0ZXJtRmllbGRDYWNoZVt0ZXJtRmllbGRdKSB7XG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZvciAodmFyIGwgPSAwOyBsIDwgbWF0Y2hpbmdEb2N1bWVudFJlZnMubGVuZ3RoOyBsKyspIHtcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiBBbGwgbWV0YWRhdGEgZm9yIHRoaXMgdGVybS9maWVsZC9kb2N1bWVudCB0cmlwbGVcbiAgICAgICAgICAgICAqIGFyZSB0aGVuIGV4dHJhY3RlZCBhbmQgY29sbGVjdGVkIGludG8gYW4gaW5zdGFuY2VcbiAgICAgICAgICAgICAqIG9mIGx1bnIuTWF0Y2hEYXRhIHJlYWR5IHRvIGJlIHJldHVybmVkIGluIHRoZSBxdWVyeVxuICAgICAgICAgICAgICogcmVzdWx0c1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB2YXIgbWF0Y2hpbmdEb2N1bWVudFJlZiA9IG1hdGNoaW5nRG9jdW1lbnRSZWZzW2xdLFxuICAgICAgICAgICAgICAgIG1hdGNoaW5nRmllbGRSZWYgPSBuZXcgbHVuci5GaWVsZFJlZiAobWF0Y2hpbmdEb2N1bWVudFJlZiwgZmllbGQpLFxuICAgICAgICAgICAgICAgIG1ldGFkYXRhID0gZmllbGRQb3N0aW5nW21hdGNoaW5nRG9jdW1lbnRSZWZdLFxuICAgICAgICAgICAgICAgIGZpZWxkTWF0Y2hcblxuICAgICAgICAgICAgaWYgKChmaWVsZE1hdGNoID0gbWF0Y2hpbmdGaWVsZHNbbWF0Y2hpbmdGaWVsZFJlZl0pID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgbWF0Y2hpbmdGaWVsZHNbbWF0Y2hpbmdGaWVsZFJlZl0gPSBuZXcgbHVuci5NYXRjaERhdGEgKGV4cGFuZGVkVGVybSwgZmllbGQsIG1ldGFkYXRhKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZmllbGRNYXRjaC5hZGQoZXhwYW5kZWRUZXJtLCB0ZXJtLCBtZXRhZGF0YSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRlcm1GaWVsZENhY2hlW3Rlcm1GaWVsZF0gPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgbWF0Y2hpbmdGaWVsZFJlZnMgPSBPYmplY3Qua2V5cyhtYXRjaGluZ0ZpZWxkcyksXG4gICAgICByZXN1bHRzID0gW10sXG4gICAgICBtYXRjaGVzID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbWF0Y2hpbmdGaWVsZFJlZnMubGVuZ3RoOyBpKyspIHtcbiAgICAvKlxuICAgICAqIEN1cnJlbnRseSB3ZSBoYXZlIGRvY3VtZW50IGZpZWxkcyB0aGF0IG1hdGNoIHRoZSBxdWVyeSwgYnV0IHdlXG4gICAgICogbmVlZCB0byByZXR1cm4gZG9jdW1lbnRzLiBUaGUgbWF0Y2hEYXRhIGFuZCBzY29yZXMgYXJlIGNvbWJpbmVkXG4gICAgICogZnJvbSBtdWx0aXBsZSBmaWVsZHMgYmVsb25naW5nIHRvIHRoZSBzYW1lIGRvY3VtZW50LlxuICAgICAqXG4gICAgICogU2NvcmVzIGFyZSBjYWxjdWxhdGVkIGJ5IGZpZWxkLCB1c2luZyB0aGUgcXVlcnkgdmVjdG9ycyBjcmVhdGVkXG4gICAgICogYWJvdmUsIGFuZCBjb21iaW5lZCBpbnRvIGEgZmluYWwgZG9jdW1lbnQgc2NvcmUgdXNpbmcgYWRkaXRpb24uXG4gICAgICovXG4gICAgdmFyIGZpZWxkUmVmID0gbHVuci5GaWVsZFJlZi5mcm9tU3RyaW5nKG1hdGNoaW5nRmllbGRSZWZzW2ldKSxcbiAgICAgICAgZG9jUmVmID0gZmllbGRSZWYuZG9jUmVmLFxuICAgICAgICBmaWVsZFZlY3RvciA9IHRoaXMuZmllbGRWZWN0b3JzW2ZpZWxkUmVmXSxcbiAgICAgICAgc2NvcmUgPSBxdWVyeVZlY3RvcnNbZmllbGRSZWYuZmllbGROYW1lXS5zaW1pbGFyaXR5KGZpZWxkVmVjdG9yKSxcbiAgICAgICAgZG9jTWF0Y2hcblxuICAgIGlmICgoZG9jTWF0Y2ggPSBtYXRjaGVzW2RvY1JlZl0pICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGRvY01hdGNoLnNjb3JlICs9IHNjb3JlXG4gICAgICBkb2NNYXRjaC5tYXRjaERhdGEuY29tYmluZShtYXRjaGluZ0ZpZWxkc1tmaWVsZFJlZl0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBtYXRjaCA9IHtcbiAgICAgICAgcmVmOiBkb2NSZWYsXG4gICAgICAgIHNjb3JlOiBzY29yZSxcbiAgICAgICAgbWF0Y2hEYXRhOiBtYXRjaGluZ0ZpZWxkc1tmaWVsZFJlZl1cbiAgICAgIH1cbiAgICAgIG1hdGNoZXNbZG9jUmVmXSA9IG1hdGNoXG4gICAgICByZXN1bHRzLnB1c2gobWF0Y2gpXG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogU29ydCB0aGUgcmVzdWx0cyBvYmplY3RzIGJ5IHNjb3JlLCBoaWdoZXN0IGZpcnN0LlxuICAgKi9cbiAgcmV0dXJuIHJlc3VsdHMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBiLnNjb3JlIC0gYS5zY29yZVxuICB9KVxufVxuXG4vKipcbiAqIFByZXBhcmVzIHRoZSBpbmRleCBmb3IgSlNPTiBzZXJpYWxpemF0aW9uLlxuICpcbiAqIFRoZSBzY2hlbWEgZm9yIHRoaXMgSlNPTiBibG9iIHdpbGwgYmUgZGVzY3JpYmVkIGluIGFcbiAqIHNlcGFyYXRlIEpTT04gc2NoZW1hIGZpbGUuXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaW52ZXJ0ZWRJbmRleCA9IE9iamVjdC5rZXlzKHRoaXMuaW52ZXJ0ZWRJbmRleClcbiAgICAuc29ydCgpXG4gICAgLm1hcChmdW5jdGlvbiAodGVybSkge1xuICAgICAgcmV0dXJuIFt0ZXJtLCB0aGlzLmludmVydGVkSW5kZXhbdGVybV1dXG4gICAgfSwgdGhpcylcblxuICB2YXIgZmllbGRWZWN0b3JzID0gT2JqZWN0LmtleXModGhpcy5maWVsZFZlY3RvcnMpXG4gICAgLm1hcChmdW5jdGlvbiAocmVmKSB7XG4gICAgICByZXR1cm4gW3JlZiwgdGhpcy5maWVsZFZlY3RvcnNbcmVmXS50b0pTT04oKV1cbiAgICB9LCB0aGlzKVxuXG4gIHJldHVybiB7XG4gICAgdmVyc2lvbjogbHVuci52ZXJzaW9uLFxuICAgIGZpZWxkczogdGhpcy5maWVsZHMsXG4gICAgZmllbGRWZWN0b3JzOiBmaWVsZFZlY3RvcnMsXG4gICAgaW52ZXJ0ZWRJbmRleDogaW52ZXJ0ZWRJbmRleCxcbiAgICBwaXBlbGluZTogdGhpcy5waXBlbGluZS50b0pTT04oKVxuICB9XG59XG5cbi8qKlxuICogTG9hZHMgYSBwcmV2aW91c2x5IHNlcmlhbGl6ZWQgbHVuci5JbmRleFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXJpYWxpemVkSW5kZXggLSBBIHByZXZpb3VzbHkgc2VyaWFsaXplZCBsdW5yLkluZGV4XG4gKiBAcmV0dXJucyB7bHVuci5JbmRleH1cbiAqL1xubHVuci5JbmRleC5sb2FkID0gZnVuY3Rpb24gKHNlcmlhbGl6ZWRJbmRleCkge1xuICB2YXIgYXR0cnMgPSB7fSxcbiAgICAgIGZpZWxkVmVjdG9ycyA9IHt9LFxuICAgICAgc2VyaWFsaXplZFZlY3RvcnMgPSBzZXJpYWxpemVkSW5kZXguZmllbGRWZWN0b3JzLFxuICAgICAgaW52ZXJ0ZWRJbmRleCA9IHt9LFxuICAgICAgc2VyaWFsaXplZEludmVydGVkSW5kZXggPSBzZXJpYWxpemVkSW5kZXguaW52ZXJ0ZWRJbmRleCxcbiAgICAgIHRva2VuU2V0QnVpbGRlciA9IG5ldyBsdW5yLlRva2VuU2V0LkJ1aWxkZXIsXG4gICAgICBwaXBlbGluZSA9IGx1bnIuUGlwZWxpbmUubG9hZChzZXJpYWxpemVkSW5kZXgucGlwZWxpbmUpXG5cbiAgaWYgKHNlcmlhbGl6ZWRJbmRleC52ZXJzaW9uICE9IGx1bnIudmVyc2lvbikge1xuICAgIGx1bnIudXRpbHMud2FybihcIlZlcnNpb24gbWlzbWF0Y2ggd2hlbiBsb2FkaW5nIHNlcmlhbGlzZWQgaW5kZXguIEN1cnJlbnQgdmVyc2lvbiBvZiBsdW5yICdcIiArIGx1bnIudmVyc2lvbiArIFwiJyBkb2VzIG5vdCBtYXRjaCBzZXJpYWxpemVkIGluZGV4ICdcIiArIHNlcmlhbGl6ZWRJbmRleC52ZXJzaW9uICsgXCInXCIpXG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNlcmlhbGl6ZWRWZWN0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHR1cGxlID0gc2VyaWFsaXplZFZlY3RvcnNbaV0sXG4gICAgICAgIHJlZiA9IHR1cGxlWzBdLFxuICAgICAgICBlbGVtZW50cyA9IHR1cGxlWzFdXG5cbiAgICBmaWVsZFZlY3RvcnNbcmVmXSA9IG5ldyBsdW5yLlZlY3RvcihlbGVtZW50cylcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2VyaWFsaXplZEludmVydGVkSW5kZXgubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdHVwbGUgPSBzZXJpYWxpemVkSW52ZXJ0ZWRJbmRleFtpXSxcbiAgICAgICAgdGVybSA9IHR1cGxlWzBdLFxuICAgICAgICBwb3N0aW5nID0gdHVwbGVbMV1cblxuICAgIHRva2VuU2V0QnVpbGRlci5pbnNlcnQodGVybSlcbiAgICBpbnZlcnRlZEluZGV4W3Rlcm1dID0gcG9zdGluZ1xuICB9XG5cbiAgdG9rZW5TZXRCdWlsZGVyLmZpbmlzaCgpXG5cbiAgYXR0cnMuZmllbGRzID0gc2VyaWFsaXplZEluZGV4LmZpZWxkc1xuXG4gIGF0dHJzLmZpZWxkVmVjdG9ycyA9IGZpZWxkVmVjdG9yc1xuICBhdHRycy5pbnZlcnRlZEluZGV4ID0gaW52ZXJ0ZWRJbmRleFxuICBhdHRycy50b2tlblNldCA9IHRva2VuU2V0QnVpbGRlci5yb290XG4gIGF0dHJzLnBpcGVsaW5lID0gcGlwZWxpbmVcblxuICByZXR1cm4gbmV3IGx1bnIuSW5kZXgoYXR0cnMpXG59XG4vKiFcbiAqIGx1bnIuQnVpbGRlclxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogbHVuci5CdWlsZGVyIHBlcmZvcm1zIGluZGV4aW5nIG9uIGEgc2V0IG9mIGRvY3VtZW50cyBhbmRcbiAqIHJldHVybnMgaW5zdGFuY2VzIG9mIGx1bnIuSW5kZXggcmVhZHkgZm9yIHF1ZXJ5aW5nLlxuICpcbiAqIEFsbCBjb25maWd1cmF0aW9uIG9mIHRoZSBpbmRleCBpcyBkb25lIHZpYSB0aGUgYnVpbGRlciwgdGhlXG4gKiBmaWVsZHMgdG8gaW5kZXgsIHRoZSBkb2N1bWVudCByZWZlcmVuY2UsIHRoZSB0ZXh0IHByb2Nlc3NpbmdcbiAqIHBpcGVsaW5lIGFuZCBkb2N1bWVudCBzY29yaW5nIHBhcmFtZXRlcnMgYXJlIGFsbCBzZXQgb24gdGhlXG4gKiBidWlsZGVyIGJlZm9yZSBpbmRleGluZy5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBfcmVmIC0gSW50ZXJuYWwgcmVmZXJlbmNlIHRvIHRoZSBkb2N1bWVudCByZWZlcmVuY2UgZmllbGQuXG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSBfZmllbGRzIC0gSW50ZXJuYWwgcmVmZXJlbmNlIHRvIHRoZSBkb2N1bWVudCBmaWVsZHMgdG8gaW5kZXguXG4gKiBAcHJvcGVydHkge29iamVjdH0gaW52ZXJ0ZWRJbmRleCAtIFRoZSBpbnZlcnRlZCBpbmRleCBtYXBzIHRlcm1zIHRvIGRvY3VtZW50IGZpZWxkcy5cbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBkb2N1bWVudFRlcm1GcmVxdWVuY2llcyAtIEtlZXBzIHRyYWNrIG9mIGRvY3VtZW50IHRlcm0gZnJlcXVlbmNpZXMuXG4gKiBAcHJvcGVydHkge29iamVjdH0gZG9jdW1lbnRMZW5ndGhzIC0gS2VlcHMgdHJhY2sgb2YgdGhlIGxlbmd0aCBvZiBkb2N1bWVudHMgYWRkZWQgdG8gdGhlIGluZGV4LlxuICogQHByb3BlcnR5IHtsdW5yLnRva2VuaXplcn0gdG9rZW5pemVyIC0gRnVuY3Rpb24gZm9yIHNwbGl0dGluZyBzdHJpbmdzIGludG8gdG9rZW5zIGZvciBpbmRleGluZy5cbiAqIEBwcm9wZXJ0eSB7bHVuci5QaXBlbGluZX0gcGlwZWxpbmUgLSBUaGUgcGlwZWxpbmUgcGVyZm9ybXMgdGV4dCBwcm9jZXNzaW5nIG9uIHRva2VucyBiZWZvcmUgaW5kZXhpbmcuXG4gKiBAcHJvcGVydHkge2x1bnIuUGlwZWxpbmV9IHNlYXJjaFBpcGVsaW5lIC0gQSBwaXBlbGluZSBmb3IgcHJvY2Vzc2luZyBzZWFyY2ggdGVybXMgYmVmb3JlIHF1ZXJ5aW5nIHRoZSBpbmRleC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBkb2N1bWVudENvdW50IC0gS2VlcHMgdHJhY2sgb2YgdGhlIHRvdGFsIG51bWJlciBvZiBkb2N1bWVudHMgaW5kZXhlZC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBfYiAtIEEgcGFyYW1ldGVyIHRvIGNvbnRyb2wgZmllbGQgbGVuZ3RoIG5vcm1hbGl6YXRpb24sIHNldHRpbmcgdGhpcyB0byAwIGRpc2FibGVkIG5vcm1hbGl6YXRpb24sIDEgZnVsbHkgbm9ybWFsaXplcyBmaWVsZCBsZW5ndGhzLCB0aGUgZGVmYXVsdCB2YWx1ZSBpcyAwLjc1LlxuICogQHByb3BlcnR5IHtudW1iZXJ9IF9rMSAtIEEgcGFyYW1ldGVyIHRvIGNvbnRyb2wgaG93IHF1aWNrbHkgYW4gaW5jcmVhc2UgaW4gdGVybSBmcmVxdWVuY3kgcmVzdWx0cyBpbiB0ZXJtIGZyZXF1ZW5jeSBzYXR1cmF0aW9uLCB0aGUgZGVmYXVsdCB2YWx1ZSBpcyAxLjIuXG4gKiBAcHJvcGVydHkge251bWJlcn0gdGVybUluZGV4IC0gQSBjb3VudGVyIGluY3JlbWVudGVkIGZvciBlYWNoIHVuaXF1ZSB0ZXJtLCB1c2VkIHRvIGlkZW50aWZ5IGEgdGVybXMgcG9zaXRpb24gaW4gdGhlIHZlY3RvciBzcGFjZS5cbiAqIEBwcm9wZXJ0eSB7YXJyYXl9IG1ldGFkYXRhV2hpdGVsaXN0IC0gQSBsaXN0IG9mIG1ldGFkYXRhIGtleXMgdGhhdCBoYXZlIGJlZW4gd2hpdGVsaXN0ZWQgZm9yIGVudHJ5IGluIHRoZSBpbmRleC5cbiAqL1xubHVuci5CdWlsZGVyID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLl9yZWYgPSBcImlkXCJcbiAgdGhpcy5fZmllbGRzID0gW11cbiAgdGhpcy5pbnZlcnRlZEluZGV4ID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICB0aGlzLmZpZWxkVGVybUZyZXF1ZW5jaWVzID0ge31cbiAgdGhpcy5maWVsZExlbmd0aHMgPSB7fVxuICB0aGlzLnRva2VuaXplciA9IGx1bnIudG9rZW5pemVyXG4gIHRoaXMucGlwZWxpbmUgPSBuZXcgbHVuci5QaXBlbGluZVxuICB0aGlzLnNlYXJjaFBpcGVsaW5lID0gbmV3IGx1bnIuUGlwZWxpbmVcbiAgdGhpcy5kb2N1bWVudENvdW50ID0gMFxuICB0aGlzLl9iID0gMC43NVxuICB0aGlzLl9rMSA9IDEuMlxuICB0aGlzLnRlcm1JbmRleCA9IDBcbiAgdGhpcy5tZXRhZGF0YVdoaXRlbGlzdCA9IFtdXG59XG5cbi8qKlxuICogU2V0cyB0aGUgZG9jdW1lbnQgZmllbGQgdXNlZCBhcyB0aGUgZG9jdW1lbnQgcmVmZXJlbmNlLiBFdmVyeSBkb2N1bWVudCBtdXN0IGhhdmUgdGhpcyBmaWVsZC5cbiAqIFRoZSB0eXBlIG9mIHRoaXMgZmllbGQgaW4gdGhlIGRvY3VtZW50IHNob3VsZCBiZSBhIHN0cmluZywgaWYgaXQgaXMgbm90IGEgc3RyaW5nIGl0IHdpbGwgYmVcbiAqIGNvZXJjZWQgaW50byBhIHN0cmluZyBieSBjYWxsaW5nIHRvU3RyaW5nLlxuICpcbiAqIFRoZSBkZWZhdWx0IHJlZiBpcyAnaWQnLlxuICpcbiAqIFRoZSByZWYgc2hvdWxkIF9ub3RfIGJlIGNoYW5nZWQgZHVyaW5nIGluZGV4aW5nLCBpdCBzaG91bGQgYmUgc2V0IGJlZm9yZSBhbnkgZG9jdW1lbnRzIGFyZVxuICogYWRkZWQgdG8gdGhlIGluZGV4LiBDaGFuZ2luZyBpdCBkdXJpbmcgaW5kZXhpbmcgY2FuIGxlYWQgdG8gaW5jb25zaXN0ZW50IHJlc3VsdHMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHJlZiAtIFRoZSBuYW1lIG9mIHRoZSByZWZlcmVuY2UgZmllbGQgaW4gdGhlIGRvY3VtZW50LlxuICovXG5sdW5yLkJ1aWxkZXIucHJvdG90eXBlLnJlZiA9IGZ1bmN0aW9uIChyZWYpIHtcbiAgdGhpcy5fcmVmID0gcmVmXG59XG5cbi8qKlxuICogQWRkcyBhIGZpZWxkIHRvIHRoZSBsaXN0IG9mIGRvY3VtZW50IGZpZWxkcyB0aGF0IHdpbGwgYmUgaW5kZXhlZC4gRXZlcnkgZG9jdW1lbnQgYmVpbmdcbiAqIGluZGV4ZWQgc2hvdWxkIGhhdmUgdGhpcyBmaWVsZC4gTnVsbCB2YWx1ZXMgZm9yIHRoaXMgZmllbGQgaW4gaW5kZXhlZCBkb2N1bWVudHMgd2lsbFxuICogbm90IGNhdXNlIGVycm9ycyBidXQgd2lsbCBsaW1pdCB0aGUgY2hhbmNlIG9mIHRoYXQgZG9jdW1lbnQgYmVpbmcgcmV0cmlldmVkIGJ5IHNlYXJjaGVzLlxuICpcbiAqIEFsbCBmaWVsZHMgc2hvdWxkIGJlIGFkZGVkIGJlZm9yZSBhZGRpbmcgZG9jdW1lbnRzIHRvIHRoZSBpbmRleC4gQWRkaW5nIGZpZWxkcyBhZnRlclxuICogYSBkb2N1bWVudCBoYXMgYmVlbiBpbmRleGVkIHdpbGwgaGF2ZSBubyBlZmZlY3Qgb24gYWxyZWFkeSBpbmRleGVkIGRvY3VtZW50cy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGQgLSBUaGUgbmFtZSBvZiBhIGZpZWxkIHRvIGluZGV4IGluIGFsbCBkb2N1bWVudHMuXG4gKi9cbmx1bnIuQnVpbGRlci5wcm90b3R5cGUuZmllbGQgPSBmdW5jdGlvbiAoZmllbGQpIHtcbiAgdGhpcy5fZmllbGRzLnB1c2goZmllbGQpXG59XG5cbi8qKlxuICogQSBwYXJhbWV0ZXIgdG8gdHVuZSB0aGUgYW1vdW50IG9mIGZpZWxkIGxlbmd0aCBub3JtYWxpc2F0aW9uIHRoYXQgaXMgYXBwbGllZCB3aGVuXG4gKiBjYWxjdWxhdGluZyByZWxldmFuY2Ugc2NvcmVzLiBBIHZhbHVlIG9mIDAgd2lsbCBjb21wbGV0ZWx5IGRpc2FibGUgYW55IG5vcm1hbGlzYXRpb25cbiAqIGFuZCBhIHZhbHVlIG9mIDEgd2lsbCBmdWxseSBub3JtYWxpc2UgZmllbGQgbGVuZ3Rocy4gVGhlIGRlZmF1bHQgaXMgMC43NS4gVmFsdWVzIG9mIGJcbiAqIHdpbGwgYmUgY2xhbXBlZCB0byB0aGUgcmFuZ2UgMCAtIDEuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IG51bWJlciAtIFRoZSB2YWx1ZSB0byBzZXQgZm9yIHRoaXMgdHVuaW5nIHBhcmFtZXRlci5cbiAqL1xubHVuci5CdWlsZGVyLnByb3RvdHlwZS5iID0gZnVuY3Rpb24gKG51bWJlcikge1xuICBpZiAobnVtYmVyIDwgMCkge1xuICAgIHRoaXMuX2IgPSAwXG4gIH0gZWxzZSBpZiAobnVtYmVyID4gMSkge1xuICAgIHRoaXMuX2IgPSAxXG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fYiA9IG51bWJlclxuICB9XG59XG5cbi8qKlxuICogQSBwYXJhbWV0ZXIgdGhhdCBjb250cm9scyB0aGUgc3BlZWQgYXQgd2hpY2ggYSByaXNlIGluIHRlcm0gZnJlcXVlbmN5IHJlc3VsdHMgaW4gdGVybVxuICogZnJlcXVlbmN5IHNhdHVyYXRpb24uIFRoZSBkZWZhdWx0IHZhbHVlIGlzIDEuMi4gU2V0dGluZyB0aGlzIHRvIGEgaGlnaGVyIHZhbHVlIHdpbGwgZ2l2ZVxuICogc2xvd2VyIHNhdHVyYXRpb24gbGV2ZWxzLCBhIGxvd2VyIHZhbHVlIHdpbGwgcmVzdWx0IGluIHF1aWNrZXIgc2F0dXJhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyIC0gVGhlIHZhbHVlIHRvIHNldCBmb3IgdGhpcyB0dW5pbmcgcGFyYW1ldGVyLlxuICovXG5sdW5yLkJ1aWxkZXIucHJvdG90eXBlLmsxID0gZnVuY3Rpb24gKG51bWJlcikge1xuICB0aGlzLl9rMSA9IG51bWJlclxufVxuXG4vKipcbiAqIEFkZHMgYSBkb2N1bWVudCB0byB0aGUgaW5kZXguXG4gKlxuICogQmVmb3JlIGFkZGluZyBmaWVsZHMgdG8gdGhlIGluZGV4IHRoZSBpbmRleCBzaG91bGQgaGF2ZSBiZWVuIGZ1bGx5IHNldHVwLCB3aXRoIHRoZSBkb2N1bWVudFxuICogcmVmIGFuZCBhbGwgZmllbGRzIHRvIGluZGV4IGFscmVhZHkgaGF2aW5nIGJlZW4gc3BlY2lmaWVkLlxuICpcbiAqIFRoZSBkb2N1bWVudCBtdXN0IGhhdmUgYSBmaWVsZCBuYW1lIGFzIHNwZWNpZmllZCBieSB0aGUgcmVmIChieSBkZWZhdWx0IHRoaXMgaXMgJ2lkJykgYW5kXG4gKiBpdCBzaG91bGQgaGF2ZSBhbGwgZmllbGRzIGRlZmluZWQgZm9yIGluZGV4aW5nLCB0aG91Z2ggbnVsbCBvciB1bmRlZmluZWQgdmFsdWVzIHdpbGwgbm90XG4gKiBjYXVzZSBlcnJvcnMuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGRvYyAtIFRoZSBkb2N1bWVudCB0byBhZGQgdG8gdGhlIGluZGV4LlxuICovXG5sdW5yLkJ1aWxkZXIucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChkb2MpIHtcbiAgdmFyIGRvY1JlZiA9IGRvY1t0aGlzLl9yZWZdXG5cbiAgdGhpcy5kb2N1bWVudENvdW50ICs9IDFcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2ZpZWxkcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBmaWVsZE5hbWUgPSB0aGlzLl9maWVsZHNbaV0sXG4gICAgICAgIGZpZWxkID0gZG9jW2ZpZWxkTmFtZV0sXG4gICAgICAgIHRva2VucyA9IHRoaXMudG9rZW5pemVyKGZpZWxkKSxcbiAgICAgICAgdGVybXMgPSB0aGlzLnBpcGVsaW5lLnJ1bih0b2tlbnMpLFxuICAgICAgICBmaWVsZFJlZiA9IG5ldyBsdW5yLkZpZWxkUmVmIChkb2NSZWYsIGZpZWxkTmFtZSksXG4gICAgICAgIGZpZWxkVGVybXMgPSBPYmplY3QuY3JlYXRlKG51bGwpXG5cbiAgICB0aGlzLmZpZWxkVGVybUZyZXF1ZW5jaWVzW2ZpZWxkUmVmXSA9IGZpZWxkVGVybXNcbiAgICB0aGlzLmZpZWxkTGVuZ3Roc1tmaWVsZFJlZl0gPSAwXG5cbiAgICAvLyBzdG9yZSB0aGUgbGVuZ3RoIG9mIHRoaXMgZmllbGQgZm9yIHRoaXMgZG9jdW1lbnRcbiAgICB0aGlzLmZpZWxkTGVuZ3Roc1tmaWVsZFJlZl0gKz0gdGVybXMubGVuZ3RoXG5cbiAgICAvLyBjYWxjdWxhdGUgdGVybSBmcmVxdWVuY2llcyBmb3IgdGhpcyBmaWVsZFxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGVybXMubGVuZ3RoOyBqKyspIHtcbiAgICAgIHZhciB0ZXJtID0gdGVybXNbal1cblxuICAgICAgaWYgKGZpZWxkVGVybXNbdGVybV0gPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZpZWxkVGVybXNbdGVybV0gPSAwXG4gICAgICB9XG5cbiAgICAgIGZpZWxkVGVybXNbdGVybV0gKz0gMVxuXG4gICAgICAvLyBhZGQgdG8gaW52ZXJ0ZWQgaW5kZXhcbiAgICAgIC8vIGNyZWF0ZSBhbiBpbml0aWFsIHBvc3RpbmcgaWYgb25lIGRvZXNuJ3QgZXhpc3RcbiAgICAgIGlmICh0aGlzLmludmVydGVkSW5kZXhbdGVybV0gPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBwb3N0aW5nID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICAgICAgICBwb3N0aW5nW1wiX2luZGV4XCJdID0gdGhpcy50ZXJtSW5kZXhcbiAgICAgICAgdGhpcy50ZXJtSW5kZXggKz0gMVxuXG4gICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5fZmllbGRzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgcG9zdGluZ1t0aGlzLl9maWVsZHNba11dID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbnZlcnRlZEluZGV4W3Rlcm1dID0gcG9zdGluZ1xuICAgICAgfVxuXG4gICAgICAvLyBhZGQgYW4gZW50cnkgZm9yIHRoaXMgdGVybS9maWVsZE5hbWUvZG9jUmVmIHRvIHRoZSBpbnZlcnRlZEluZGV4XG4gICAgICBpZiAodGhpcy5pbnZlcnRlZEluZGV4W3Rlcm1dW2ZpZWxkTmFtZV1bZG9jUmVmXSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5pbnZlcnRlZEluZGV4W3Rlcm1dW2ZpZWxkTmFtZV1bZG9jUmVmXSA9IE9iamVjdC5jcmVhdGUobnVsbClcbiAgICAgIH1cblxuICAgICAgLy8gc3RvcmUgYWxsIHdoaXRlbGlzdGVkIG1ldGFkYXRhIGFib3V0IHRoaXMgdG9rZW4gaW4gdGhlXG4gICAgICAvLyBpbnZlcnRlZCBpbmRleFxuICAgICAgZm9yICh2YXIgbCA9IDA7IGwgPCB0aGlzLm1ldGFkYXRhV2hpdGVsaXN0Lmxlbmd0aDsgbCsrKSB7XG4gICAgICAgIHZhciBtZXRhZGF0YUtleSA9IHRoaXMubWV0YWRhdGFXaGl0ZWxpc3RbbF0sXG4gICAgICAgICAgICBtZXRhZGF0YSA9IHRlcm0ubWV0YWRhdGFbbWV0YWRhdGFLZXldXG5cbiAgICAgICAgaWYgKHRoaXMuaW52ZXJ0ZWRJbmRleFt0ZXJtXVtmaWVsZE5hbWVdW2RvY1JlZl1bbWV0YWRhdGFLZXldID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMuaW52ZXJ0ZWRJbmRleFt0ZXJtXVtmaWVsZE5hbWVdW2RvY1JlZl1bbWV0YWRhdGFLZXldID0gW11cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW52ZXJ0ZWRJbmRleFt0ZXJtXVtmaWVsZE5hbWVdW2RvY1JlZl1bbWV0YWRhdGFLZXldLnB1c2gobWV0YWRhdGEpXG4gICAgICB9XG4gICAgfVxuXG4gIH1cbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBhdmVyYWdlIGRvY3VtZW50IGxlbmd0aCBmb3IgdGhpcyBpbmRleFxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmx1bnIuQnVpbGRlci5wcm90b3R5cGUuY2FsY3VsYXRlQXZlcmFnZUZpZWxkTGVuZ3RocyA9IGZ1bmN0aW9uICgpIHtcblxuICB2YXIgZmllbGRSZWZzID0gT2JqZWN0LmtleXModGhpcy5maWVsZExlbmd0aHMpLFxuICAgICAgbnVtYmVyT2ZGaWVsZHMgPSBmaWVsZFJlZnMubGVuZ3RoLFxuICAgICAgYWNjdW11bGF0b3IgPSB7fSxcbiAgICAgIGRvY3VtZW50c1dpdGhGaWVsZCA9IHt9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJPZkZpZWxkczsgaSsrKSB7XG4gICAgdmFyIGZpZWxkUmVmID0gbHVuci5GaWVsZFJlZi5mcm9tU3RyaW5nKGZpZWxkUmVmc1tpXSksXG4gICAgICAgIGZpZWxkID0gZmllbGRSZWYuZmllbGROYW1lXG5cbiAgICBkb2N1bWVudHNXaXRoRmllbGRbZmllbGRdIHx8IChkb2N1bWVudHNXaXRoRmllbGRbZmllbGRdID0gMClcbiAgICBkb2N1bWVudHNXaXRoRmllbGRbZmllbGRdICs9IDFcblxuICAgIGFjY3VtdWxhdG9yW2ZpZWxkXSB8fCAoYWNjdW11bGF0b3JbZmllbGRdID0gMClcbiAgICBhY2N1bXVsYXRvcltmaWVsZF0gKz0gdGhpcy5maWVsZExlbmd0aHNbZmllbGRSZWZdXG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2ZpZWxkcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBmaWVsZCA9IHRoaXMuX2ZpZWxkc1tpXVxuICAgIGFjY3VtdWxhdG9yW2ZpZWxkXSA9IGFjY3VtdWxhdG9yW2ZpZWxkXSAvIGRvY3VtZW50c1dpdGhGaWVsZFtmaWVsZF1cbiAgfVxuXG4gIHRoaXMuYXZlcmFnZUZpZWxkTGVuZ3RoID0gYWNjdW11bGF0b3Jcbn1cblxuLyoqXG4gKiBCdWlsZHMgYSB2ZWN0b3Igc3BhY2UgbW9kZWwgb2YgZXZlcnkgZG9jdW1lbnQgdXNpbmcgbHVuci5WZWN0b3JcbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5sdW5yLkJ1aWxkZXIucHJvdG90eXBlLmNyZWF0ZUZpZWxkVmVjdG9ycyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGZpZWxkVmVjdG9ycyA9IHt9LFxuICAgICAgZmllbGRSZWZzID0gT2JqZWN0LmtleXModGhpcy5maWVsZFRlcm1GcmVxdWVuY2llcyksXG4gICAgICBmaWVsZFJlZnNMZW5ndGggPSBmaWVsZFJlZnMubGVuZ3RoLFxuICAgICAgdGVybUlkZkNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZmllbGRSZWZzTGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZmllbGRSZWYgPSBsdW5yLkZpZWxkUmVmLmZyb21TdHJpbmcoZmllbGRSZWZzW2ldKSxcbiAgICAgICAgZmllbGQgPSBmaWVsZFJlZi5maWVsZE5hbWUsXG4gICAgICAgIGZpZWxkTGVuZ3RoID0gdGhpcy5maWVsZExlbmd0aHNbZmllbGRSZWZdLFxuICAgICAgICBmaWVsZFZlY3RvciA9IG5ldyBsdW5yLlZlY3RvcixcbiAgICAgICAgdGVybUZyZXF1ZW5jaWVzID0gdGhpcy5maWVsZFRlcm1GcmVxdWVuY2llc1tmaWVsZFJlZl0sXG4gICAgICAgIHRlcm1zID0gT2JqZWN0LmtleXModGVybUZyZXF1ZW5jaWVzKSxcbiAgICAgICAgdGVybXNMZW5ndGggPSB0ZXJtcy5sZW5ndGhcblxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGVybXNMZW5ndGg7IGorKykge1xuICAgICAgdmFyIHRlcm0gPSB0ZXJtc1tqXSxcbiAgICAgICAgICB0ZiA9IHRlcm1GcmVxdWVuY2llc1t0ZXJtXSxcbiAgICAgICAgICB0ZXJtSW5kZXggPSB0aGlzLmludmVydGVkSW5kZXhbdGVybV0uX2luZGV4LFxuICAgICAgICAgIGlkZiwgc2NvcmUsIHNjb3JlV2l0aFByZWNpc2lvblxuXG4gICAgICBpZiAodGVybUlkZkNhY2hlW3Rlcm1dID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWRmID0gbHVuci5pZGYodGhpcy5pbnZlcnRlZEluZGV4W3Rlcm1dLCB0aGlzLmRvY3VtZW50Q291bnQpXG4gICAgICAgIHRlcm1JZGZDYWNoZVt0ZXJtXSA9IGlkZlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWRmID0gdGVybUlkZkNhY2hlW3Rlcm1dXG4gICAgICB9XG5cbiAgICAgIHNjb3JlID0gaWRmICogKCh0aGlzLl9rMSArIDEpICogdGYpIC8gKHRoaXMuX2sxICogKDEgLSB0aGlzLl9iICsgdGhpcy5fYiAqIChmaWVsZExlbmd0aCAvIHRoaXMuYXZlcmFnZUZpZWxkTGVuZ3RoW2ZpZWxkXSkpICsgdGYpXG4gICAgICBzY29yZVdpdGhQcmVjaXNpb24gPSBNYXRoLnJvdW5kKHNjb3JlICogMTAwMCkgLyAxMDAwXG4gICAgICAvLyBDb252ZXJ0cyAxLjIzNDU2Nzg5IHRvIDEuMjM0LlxuICAgICAgLy8gUmVkdWNpbmcgdGhlIHByZWNpc2lvbiBzbyB0aGF0IHRoZSB2ZWN0b3JzIHRha2UgdXAgbGVzc1xuICAgICAgLy8gc3BhY2Ugd2hlbiBzZXJpYWxpc2VkLiBEb2luZyBpdCBub3cgc28gdGhhdCB0aGV5IGJlaGF2ZVxuICAgICAgLy8gdGhlIHNhbWUgYmVmb3JlIGFuZCBhZnRlciBzZXJpYWxpc2F0aW9uLiBBbHNvLCB0aGlzIGlzXG4gICAgICAvLyB0aGUgZmFzdGVzdCBhcHByb2FjaCB0byByZWR1Y2luZyBhIG51bWJlcidzIHByZWNpc2lvbiBpblxuICAgICAgLy8gSmF2YVNjcmlwdC5cblxuICAgICAgZmllbGRWZWN0b3IuaW5zZXJ0KHRlcm1JbmRleCwgc2NvcmVXaXRoUHJlY2lzaW9uKVxuICAgIH1cblxuICAgIGZpZWxkVmVjdG9yc1tmaWVsZFJlZl0gPSBmaWVsZFZlY3RvclxuICB9XG5cbiAgdGhpcy5maWVsZFZlY3RvcnMgPSBmaWVsZFZlY3RvcnNcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgdG9rZW4gc2V0IG9mIGFsbCB0b2tlbnMgaW4gdGhlIGluZGV4IHVzaW5nIGx1bnIuVG9rZW5TZXRcbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5sdW5yLkJ1aWxkZXIucHJvdG90eXBlLmNyZWF0ZVRva2VuU2V0ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnRva2VuU2V0ID0gbHVuci5Ub2tlblNldC5mcm9tQXJyYXkoXG4gICAgT2JqZWN0LmtleXModGhpcy5pbnZlcnRlZEluZGV4KS5zb3J0KClcbiAgKVxufVxuXG4vKipcbiAqIEJ1aWxkcyB0aGUgaW5kZXgsIGNyZWF0aW5nIGFuIGluc3RhbmNlIG9mIGx1bnIuSW5kZXguXG4gKlxuICogVGhpcyBjb21wbGV0ZXMgdGhlIGluZGV4aW5nIHByb2Nlc3MgYW5kIHNob3VsZCBvbmx5IGJlIGNhbGxlZFxuICogb25jZSBhbGwgZG9jdW1lbnRzIGhhdmUgYmVlbiBhZGRlZCB0byB0aGUgaW5kZXguXG4gKlxuICogQHJldHVybnMge2x1bnIuSW5kZXh9XG4gKi9cbmx1bnIuQnVpbGRlci5wcm90b3R5cGUuYnVpbGQgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuY2FsY3VsYXRlQXZlcmFnZUZpZWxkTGVuZ3RocygpXG4gIHRoaXMuY3JlYXRlRmllbGRWZWN0b3JzKClcbiAgdGhpcy5jcmVhdGVUb2tlblNldCgpXG5cbiAgcmV0dXJuIG5ldyBsdW5yLkluZGV4KHtcbiAgICBpbnZlcnRlZEluZGV4OiB0aGlzLmludmVydGVkSW5kZXgsXG4gICAgZmllbGRWZWN0b3JzOiB0aGlzLmZpZWxkVmVjdG9ycyxcbiAgICB0b2tlblNldDogdGhpcy50b2tlblNldCxcbiAgICBmaWVsZHM6IHRoaXMuX2ZpZWxkcyxcbiAgICBwaXBlbGluZTogdGhpcy5zZWFyY2hQaXBlbGluZVxuICB9KVxufVxuXG4vKipcbiAqIEFwcGxpZXMgYSBwbHVnaW4gdG8gdGhlIGluZGV4IGJ1aWxkZXIuXG4gKlxuICogQSBwbHVnaW4gaXMgYSBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCB3aXRoIHRoZSBpbmRleCBidWlsZGVyIGFzIGl0cyBjb250ZXh0LlxuICogUGx1Z2lucyBjYW4gYmUgdXNlZCB0byBjdXN0b21pc2Ugb3IgZXh0ZW5kIHRoZSBiZWhhdmlvdXIgb2YgdGhlIGluZGV4XG4gKiBpbiBzb21lIHdheS4gQSBwbHVnaW4gaXMganVzdCBhIGZ1bmN0aW9uLCB0aGF0IGVuY2Fwc3VsYXRlZCB0aGUgY3VzdG9tXG4gKiBiZWhhdmlvdXIgdGhhdCBzaG91bGQgYmUgYXBwbGllZCB3aGVuIGJ1aWxkaW5nIHRoZSBpbmRleC5cbiAqXG4gKiBUaGUgcGx1Z2luIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIGluZGV4IGJ1aWxkZXIgYXMgaXRzIGFyZ3VtZW50LCBhZGRpdGlvbmFsXG4gKiBhcmd1bWVudHMgY2FuIGFsc28gYmUgcGFzc2VkIHdoZW4gY2FsbGluZyB1c2UuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZFxuICogd2l0aCB0aGUgaW5kZXggYnVpbGRlciBhcyBpdHMgY29udGV4dC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwbHVnaW4gVGhlIHBsdWdpbiB0byBhcHBseS5cbiAqL1xubHVuci5CdWlsZGVyLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiAoZm4pIHtcbiAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gIGFyZ3MudW5zaGlmdCh0aGlzKVxuICBmbi5hcHBseSh0aGlzLCBhcmdzKVxufVxuLyoqXG4gKiBDb250YWlucyBhbmQgY29sbGVjdHMgbWV0YWRhdGEgYWJvdXQgYSBtYXRjaGluZyBkb2N1bWVudC5cbiAqIEEgc2luZ2xlIGluc3RhbmNlIG9mIGx1bnIuTWF0Y2hEYXRhIGlzIHJldHVybmVkIGFzIHBhcnQgb2YgZXZlcnlcbiAqIGx1bnIuSW5kZXh+UmVzdWx0LlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtzdHJpbmd9IHRlcm0gLSBUaGUgdGVybSB0aGlzIG1hdGNoIGRhdGEgaXMgYXNzb2NpYXRlZCB3aXRoXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGQgLSBUaGUgZmllbGQgaW4gd2hpY2ggdGhlIHRlcm0gd2FzIGZvdW5kXG4gKiBAcGFyYW0ge29iamVjdH0gbWV0YWRhdGEgLSBUaGUgbWV0YWRhdGEgcmVjb3JkZWQgYWJvdXQgdGhpcyB0ZXJtIGluIHRoaXMgZmllbGRcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBtZXRhZGF0YSAtIEEgY2xvbmVkIGNvbGxlY3Rpb24gb2YgbWV0YWRhdGEgYXNzb2NpYXRlZCB3aXRoIHRoaXMgZG9jdW1lbnQuXG4gKiBAc2VlIHtAbGluayBsdW5yLkluZGV4flJlc3VsdH1cbiAqL1xubHVuci5NYXRjaERhdGEgPSBmdW5jdGlvbiAodGVybSwgZmllbGQsIG1ldGFkYXRhKSB7XG4gIHZhciBjbG9uZWRNZXRhZGF0YSA9IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICBtZXRhZGF0YUtleXMgPSBPYmplY3Qua2V5cyhtZXRhZGF0YSlcblxuICAvLyBDbG9uaW5nIHRoZSBtZXRhZGF0YSB0byBwcmV2ZW50IHRoZSBvcmlnaW5hbFxuICAvLyBiZWluZyBtdXRhdGVkIGR1cmluZyBtYXRjaCBkYXRhIGNvbWJpbmF0aW9uLlxuICAvLyBNZXRhZGF0YSBpcyBrZXB0IGluIGFuIGFycmF5IHdpdGhpbiB0aGUgaW52ZXJ0ZWRcbiAgLy8gaW5kZXggc28gY2xvbmluZyB0aGUgZGF0YSBjYW4gYmUgZG9uZSB3aXRoXG4gIC8vIEFycmF5I3NsaWNlXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbWV0YWRhdGFLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IG1ldGFkYXRhS2V5c1tpXVxuICAgIGNsb25lZE1ldGFkYXRhW2tleV0gPSBtZXRhZGF0YVtrZXldLnNsaWNlKClcbiAgfVxuXG4gIHRoaXMubWV0YWRhdGEgPSBPYmplY3QuY3JlYXRlKG51bGwpXG4gIHRoaXMubWV0YWRhdGFbdGVybV0gPSBPYmplY3QuY3JlYXRlKG51bGwpXG4gIHRoaXMubWV0YWRhdGFbdGVybV1bZmllbGRdID0gY2xvbmVkTWV0YWRhdGFcbn1cblxuLyoqXG4gKiBBbiBpbnN0YW5jZSBvZiBsdW5yLk1hdGNoRGF0YSB3aWxsIGJlIGNyZWF0ZWQgZm9yIGV2ZXJ5IHRlcm0gdGhhdCBtYXRjaGVzIGFcbiAqIGRvY3VtZW50LiBIb3dldmVyIG9ubHkgb25lIGluc3RhbmNlIGlzIHJlcXVpcmVkIGluIGEgbHVuci5JbmRleH5SZXN1bHQuIFRoaXNcbiAqIG1ldGhvZCBjb21iaW5lcyBtZXRhZGF0YSBmcm9tIGFub3RoZXIgaW5zdGFuY2Ugb2YgbHVuci5NYXRjaERhdGEgd2l0aCB0aGlzXG4gKiBvYmplY3RzIG1ldGFkYXRhLlxuICpcbiAqIEBwYXJhbSB7bHVuci5NYXRjaERhdGF9IG90aGVyTWF0Y2hEYXRhIC0gQW5vdGhlciBpbnN0YW5jZSBvZiBtYXRjaCBkYXRhIHRvIG1lcmdlIHdpdGggdGhpcyBvbmUuXG4gKiBAc2VlIHtAbGluayBsdW5yLkluZGV4flJlc3VsdH1cbiAqL1xubHVuci5NYXRjaERhdGEucHJvdG90eXBlLmNvbWJpbmUgPSBmdW5jdGlvbiAob3RoZXJNYXRjaERhdGEpIHtcbiAgdmFyIHRlcm1zID0gT2JqZWN0LmtleXMob3RoZXJNYXRjaERhdGEubWV0YWRhdGEpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXJtcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciB0ZXJtID0gdGVybXNbaV0sXG4gICAgICAgIGZpZWxkcyA9IE9iamVjdC5rZXlzKG90aGVyTWF0Y2hEYXRhLm1ldGFkYXRhW3Rlcm1dKVxuXG4gICAgaWYgKHRoaXMubWV0YWRhdGFbdGVybV0gPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm1ldGFkYXRhW3Rlcm1dID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICAgIH1cblxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgZmllbGRzLmxlbmd0aDsgaisrKSB7XG4gICAgICB2YXIgZmllbGQgPSBmaWVsZHNbal0sXG4gICAgICAgICAga2V5cyA9IE9iamVjdC5rZXlzKG90aGVyTWF0Y2hEYXRhLm1ldGFkYXRhW3Rlcm1dW2ZpZWxkXSlcblxuICAgICAgaWYgKHRoaXMubWV0YWRhdGFbdGVybV1bZmllbGRdID09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLm1ldGFkYXRhW3Rlcm1dW2ZpZWxkXSA9IE9iamVjdC5jcmVhdGUobnVsbClcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBrZXlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzW2tdXG5cbiAgICAgICAgaWYgKHRoaXMubWV0YWRhdGFbdGVybV1bZmllbGRdW2tleV0gPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpcy5tZXRhZGF0YVt0ZXJtXVtmaWVsZF1ba2V5XSA9IG90aGVyTWF0Y2hEYXRhLm1ldGFkYXRhW3Rlcm1dW2ZpZWxkXVtrZXldXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5tZXRhZGF0YVt0ZXJtXVtmaWVsZF1ba2V5XSA9IHRoaXMubWV0YWRhdGFbdGVybV1bZmllbGRdW2tleV0uY29uY2F0KG90aGVyTWF0Y2hEYXRhLm1ldGFkYXRhW3Rlcm1dW2ZpZWxkXVtrZXldKVxuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBZGQgbWV0YWRhdGEgZm9yIGEgdGVybS9maWVsZCBwYWlyIHRvIHRoaXMgaW5zdGFuY2Ugb2YgbWF0Y2ggZGF0YS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGVybSAtIFRoZSB0ZXJtIHRoaXMgbWF0Y2ggZGF0YSBpcyBhc3NvY2lhdGVkIHdpdGhcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZCAtIFRoZSBmaWVsZCBpbiB3aGljaCB0aGUgdGVybSB3YXMgZm91bmRcbiAqIEBwYXJhbSB7b2JqZWN0fSBtZXRhZGF0YSAtIFRoZSBtZXRhZGF0YSByZWNvcmRlZCBhYm91dCB0aGlzIHRlcm0gaW4gdGhpcyBmaWVsZFxuICovXG5sdW5yLk1hdGNoRGF0YS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKHRlcm0sIGZpZWxkLCBtZXRhZGF0YSkge1xuICBpZiAoISh0ZXJtIGluIHRoaXMubWV0YWRhdGEpKSB7XG4gICAgdGhpcy5tZXRhZGF0YVt0ZXJtXSA9IE9iamVjdC5jcmVhdGUobnVsbClcbiAgICB0aGlzLm1ldGFkYXRhW3Rlcm1dW2ZpZWxkXSA9IG1ldGFkYXRhXG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAoIShmaWVsZCBpbiB0aGlzLm1ldGFkYXRhW3Rlcm1dKSkge1xuICAgIHRoaXMubWV0YWRhdGFbdGVybV1bZmllbGRdID0gbWV0YWRhdGFcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBtZXRhZGF0YUtleXMgPSBPYmplY3Qua2V5cyhtZXRhZGF0YSlcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IG1ldGFkYXRhS2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBtZXRhZGF0YUtleXNbaV1cblxuICAgIGlmIChrZXkgaW4gdGhpcy5tZXRhZGF0YVt0ZXJtXVtmaWVsZF0pIHtcbiAgICAgIHRoaXMubWV0YWRhdGFbdGVybV1bZmllbGRdW2tleV0gPSB0aGlzLm1ldGFkYXRhW3Rlcm1dW2ZpZWxkXVtrZXldLmNvbmNhdChtZXRhZGF0YVtrZXldKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1ldGFkYXRhW3Rlcm1dW2ZpZWxkXVtrZXldID0gbWV0YWRhdGFba2V5XVxuICAgIH1cbiAgfVxufVxuLyoqXG4gKiBBIGx1bnIuUXVlcnkgcHJvdmlkZXMgYSBwcm9ncmFtbWF0aWMgd2F5IG9mIGRlZmluaW5nIHF1ZXJpZXMgdG8gYmUgcGVyZm9ybWVkXG4gKiBhZ2FpbnN0IGEge0BsaW5rIGx1bnIuSW5kZXh9LlxuICpcbiAqIFByZWZlciBjb25zdHJ1Y3RpbmcgYSBsdW5yLlF1ZXJ5IHVzaW5nIHRoZSB7QGxpbmsgbHVuci5JbmRleCNxdWVyeX0gbWV0aG9kXG4gKiBzbyB0aGUgcXVlcnkgb2JqZWN0IGlzIHByZS1pbml0aWFsaXplZCB3aXRoIHRoZSByaWdodCBpbmRleCBmaWVsZHMuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHJvcGVydHkge2x1bnIuUXVlcnl+Q2xhdXNlW119IGNsYXVzZXMgLSBBbiBhcnJheSBvZiBxdWVyeSBjbGF1c2VzLlxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0gYWxsRmllbGRzIC0gQW4gYXJyYXkgb2YgYWxsIGF2YWlsYWJsZSBmaWVsZHMgaW4gYSBsdW5yLkluZGV4LlxuICovXG5sdW5yLlF1ZXJ5ID0gZnVuY3Rpb24gKGFsbEZpZWxkcykge1xuICB0aGlzLmNsYXVzZXMgPSBbXVxuICB0aGlzLmFsbEZpZWxkcyA9IGFsbEZpZWxkc1xufVxuXG4vKipcbiAqIENvbnN0YW50cyBmb3IgaW5kaWNhdGluZyB3aGF0IGtpbmQgb2YgYXV0b21hdGljIHdpbGRjYXJkIGluc2VydGlvbiB3aWxsIGJlIHVzZWQgd2hlbiBjb25zdHJ1Y3RpbmcgYSBxdWVyeSBjbGF1c2UuXG4gKlxuICogVGhpcyBhbGxvd3Mgd2lsZGNhcmRzIHRvIGJlIGFkZGVkIHRvIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHRlcm0gd2l0aG91dCBoYXZpbmcgdG8gbWFudWFsbHkgZG8gYW55IHN0cmluZ1xuICogY29uY2F0ZW5hdGlvbi5cbiAqXG4gKiBUaGUgd2lsZGNhcmQgY29uc3RhbnRzIGNhbiBiZSBiaXR3aXNlIGNvbWJpbmVkIHRvIHNlbGVjdCBib3RoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdpbGRjYXJkcy5cbiAqXG4gKiBAY29uc3RhbnRcbiAqIEBkZWZhdWx0XG4gKiBAcHJvcGVydHkge251bWJlcn0gd2lsZGNhcmQuTk9ORSAtIFRoZSB0ZXJtIHdpbGwgaGF2ZSBubyB3aWxkY2FyZHMgaW5zZXJ0ZWQsIHRoaXMgaXMgdGhlIGRlZmF1bHQgYmVoYXZpb3VyXG4gKiBAcHJvcGVydHkge251bWJlcn0gd2lsZGNhcmQuTEVBRElORyAtIFByZXBlbmQgdGhlIHRlcm0gd2l0aCBhIHdpbGRjYXJkLCB1bmxlc3MgYSBsZWFkaW5nIHdpbGRjYXJkIGFscmVhZHkgZXhpc3RzXG4gKiBAcHJvcGVydHkge251bWJlcn0gd2lsZGNhcmQuVFJBSUxJTkcgLSBBcHBlbmQgYSB3aWxkY2FyZCB0byB0aGUgdGVybSwgdW5sZXNzIGEgdHJhaWxpbmcgd2lsZGNhcmQgYWxyZWFkeSBleGlzdHNcbiAqIEBzZWUgbHVuci5RdWVyeX5DbGF1c2VcbiAqIEBzZWUgbHVuci5RdWVyeSNjbGF1c2VcbiAqIEBzZWUgbHVuci5RdWVyeSN0ZXJtXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5xdWVyeSB0ZXJtIHdpdGggdHJhaWxpbmcgd2lsZGNhcmQ8L2NhcHRpb24+XG4gKiBxdWVyeS50ZXJtKCdmb28nLCB7IHdpbGRjYXJkOiBsdW5yLlF1ZXJ5LndpbGRjYXJkLlRSQUlMSU5HIH0pXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5xdWVyeSB0ZXJtIHdpdGggbGVhZGluZyBhbmQgdHJhaWxpbmcgd2lsZGNhcmQ8L2NhcHRpb24+XG4gKiBxdWVyeS50ZXJtKCdmb28nLCB7XG4gKiAgIHdpbGRjYXJkOiBsdW5yLlF1ZXJ5LndpbGRjYXJkLkxFQURJTkcgfCBsdW5yLlF1ZXJ5LndpbGRjYXJkLlRSQUlMSU5HXG4gKiB9KVxuICovXG5sdW5yLlF1ZXJ5LndpbGRjYXJkID0gbmV3IFN0cmluZyAoXCIqXCIpXG5sdW5yLlF1ZXJ5LndpbGRjYXJkLk5PTkUgPSAwXG5sdW5yLlF1ZXJ5LndpbGRjYXJkLkxFQURJTkcgPSAxXG5sdW5yLlF1ZXJ5LndpbGRjYXJkLlRSQUlMSU5HID0gMlxuXG4vKipcbiAqIEEgc2luZ2xlIGNsYXVzZSBpbiBhIHtAbGluayBsdW5yLlF1ZXJ5fSBjb250YWlucyBhIHRlcm0gYW5kIGRldGFpbHMgb24gaG93IHRvXG4gKiBtYXRjaCB0aGF0IHRlcm0gYWdhaW5zdCBhIHtAbGluayBsdW5yLkluZGV4fS5cbiAqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBsdW5yLlF1ZXJ5fkNsYXVzZVxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0gZmllbGRzIC0gVGhlIGZpZWxkcyBpbiBhbiBpbmRleCB0aGlzIGNsYXVzZSBzaG91bGQgYmUgbWF0Y2hlZCBhZ2FpbnN0LlxuICogQHByb3BlcnR5IHtudW1iZXJ9IFtib29zdD0xXSAtIEFueSBib29zdCB0aGF0IHNob3VsZCBiZSBhcHBsaWVkIHdoZW4gbWF0Y2hpbmcgdGhpcyBjbGF1c2UuXG4gKiBAcHJvcGVydHkge251bWJlcn0gW2VkaXREaXN0YW5jZV0gLSBXaGV0aGVyIHRoZSB0ZXJtIHNob3VsZCBoYXZlIGZ1enp5IG1hdGNoaW5nIGFwcGxpZWQsIGFuZCBob3cgZnV6enkgdGhlIG1hdGNoIHNob3VsZCBiZS5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW3VzZVBpcGVsaW5lXSAtIFdoZXRoZXIgdGhlIHRlcm0gc2hvdWxkIGJlIHBhc3NlZCB0aHJvdWdoIHRoZSBzZWFyY2ggcGlwZWxpbmUuXG4gKiBAcHJvcGVydHkge251bWJlcn0gW3dpbGRjYXJkPTBdIC0gV2hldGhlciB0aGUgdGVybSBzaG91bGQgaGF2ZSB3aWxkY2FyZHMgYXBwZW5kZWQgb3IgcHJlcGVuZGVkLlxuICovXG5cbi8qKlxuICogQWRkcyBhIHtAbGluayBsdW5yLlF1ZXJ5fkNsYXVzZX0gdG8gdGhpcyBxdWVyeS5cbiAqXG4gKiBVbmxlc3MgdGhlIGNsYXVzZSBjb250YWlucyB0aGUgZmllbGRzIHRvIGJlIG1hdGNoZWQgYWxsIGZpZWxkcyB3aWxsIGJlIG1hdGNoZWQuIEluIGFkZGl0aW9uXG4gKiBhIGRlZmF1bHQgYm9vc3Qgb2YgMSBpcyBhcHBsaWVkIHRvIHRoZSBjbGF1c2UuXG4gKlxuICogQHBhcmFtIHtsdW5yLlF1ZXJ5fkNsYXVzZX0gY2xhdXNlIC0gVGhlIGNsYXVzZSB0byBhZGQgdG8gdGhpcyBxdWVyeS5cbiAqIEBzZWUgbHVuci5RdWVyeX5DbGF1c2VcbiAqIEByZXR1cm5zIHtsdW5yLlF1ZXJ5fVxuICovXG5sdW5yLlF1ZXJ5LnByb3RvdHlwZS5jbGF1c2UgPSBmdW5jdGlvbiAoY2xhdXNlKSB7XG4gIGlmICghKCdmaWVsZHMnIGluIGNsYXVzZSkpIHtcbiAgICBjbGF1c2UuZmllbGRzID0gdGhpcy5hbGxGaWVsZHNcbiAgfVxuXG4gIGlmICghKCdib29zdCcgaW4gY2xhdXNlKSkge1xuICAgIGNsYXVzZS5ib29zdCA9IDFcbiAgfVxuXG4gIGlmICghKCd1c2VQaXBlbGluZScgaW4gY2xhdXNlKSkge1xuICAgIGNsYXVzZS51c2VQaXBlbGluZSA9IHRydWVcbiAgfVxuXG4gIGlmICghKCd3aWxkY2FyZCcgaW4gY2xhdXNlKSkge1xuICAgIGNsYXVzZS53aWxkY2FyZCA9IGx1bnIuUXVlcnkud2lsZGNhcmQuTk9ORVxuICB9XG5cbiAgaWYgKChjbGF1c2Uud2lsZGNhcmQgJiBsdW5yLlF1ZXJ5LndpbGRjYXJkLkxFQURJTkcpICYmIChjbGF1c2UudGVybS5jaGFyQXQoMCkgIT0gbHVuci5RdWVyeS53aWxkY2FyZCkpIHtcbiAgICBjbGF1c2UudGVybSA9IFwiKlwiICsgY2xhdXNlLnRlcm1cbiAgfVxuXG4gIGlmICgoY2xhdXNlLndpbGRjYXJkICYgbHVuci5RdWVyeS53aWxkY2FyZC5UUkFJTElORykgJiYgKGNsYXVzZS50ZXJtLnNsaWNlKC0xKSAhPSBsdW5yLlF1ZXJ5LndpbGRjYXJkKSkge1xuICAgIGNsYXVzZS50ZXJtID0gXCJcIiArIGNsYXVzZS50ZXJtICsgXCIqXCJcbiAgfVxuXG4gIHRoaXMuY2xhdXNlcy5wdXNoKGNsYXVzZSlcblxuICByZXR1cm4gdGhpc1xufVxuXG4vKipcbiAqIEFkZHMgYSB0ZXJtIHRvIHRoZSBjdXJyZW50IHF1ZXJ5LCB1bmRlciB0aGUgY292ZXJzIHRoaXMgd2lsbCBjcmVhdGUgYSB7QGxpbmsgbHVuci5RdWVyeX5DbGF1c2V9XG4gKiB0byB0aGUgbGlzdCBvZiBjbGF1c2VzIHRoYXQgbWFrZSB1cCB0aGlzIHF1ZXJ5LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXJtIC0gVGhlIHRlcm0gdG8gYWRkIHRvIHRoZSBxdWVyeS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBBbnkgYWRkaXRpb25hbCBwcm9wZXJ0aWVzIHRvIGFkZCB0byB0aGUgcXVlcnkgY2xhdXNlLlxuICogQHJldHVybnMge2x1bnIuUXVlcnl9XG4gKiBAc2VlIGx1bnIuUXVlcnkjY2xhdXNlXG4gKiBAc2VlIGx1bnIuUXVlcnl+Q2xhdXNlXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5hZGRpbmcgYSBzaW5nbGUgdGVybSB0byBhIHF1ZXJ5PC9jYXB0aW9uPlxuICogcXVlcnkudGVybShcImZvb1wiKVxuICogQGV4YW1wbGUgPGNhcHRpb24+YWRkaW5nIGEgc2luZ2xlIHRlcm0gdG8gYSBxdWVyeSBhbmQgc3BlY2lmeWluZyBzZWFyY2ggZmllbGRzLCB0ZXJtIGJvb3N0IGFuZCBhdXRvbWF0aWMgdHJhaWxpbmcgd2lsZGNhcmQ8L2NhcHRpb24+XG4gKiBxdWVyeS50ZXJtKFwiZm9vXCIsIHtcbiAqICAgZmllbGRzOiBbXCJ0aXRsZVwiXSxcbiAqICAgYm9vc3Q6IDEwLFxuICogICB3aWxkY2FyZDogbHVuci5RdWVyeS53aWxkY2FyZC5UUkFJTElOR1xuICogfSlcbiAqL1xubHVuci5RdWVyeS5wcm90b3R5cGUudGVybSA9IGZ1bmN0aW9uICh0ZXJtLCBvcHRpb25zKSB7XG4gIHZhciBjbGF1c2UgPSBvcHRpb25zIHx8IHt9XG4gIGNsYXVzZS50ZXJtID0gdGVybVxuXG4gIHRoaXMuY2xhdXNlKGNsYXVzZSlcblxuICByZXR1cm4gdGhpc1xufVxubHVuci5RdWVyeVBhcnNlRXJyb3IgPSBmdW5jdGlvbiAobWVzc2FnZSwgc3RhcnQsIGVuZCkge1xuICB0aGlzLm5hbWUgPSBcIlF1ZXJ5UGFyc2VFcnJvclwiXG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2VcbiAgdGhpcy5zdGFydCA9IHN0YXJ0XG4gIHRoaXMuZW5kID0gZW5kXG59XG5cbmx1bnIuUXVlcnlQYXJzZUVycm9yLnByb3RvdHlwZSA9IG5ldyBFcnJvclxubHVuci5RdWVyeUxleGVyID0gZnVuY3Rpb24gKHN0cikge1xuICB0aGlzLmxleGVtZXMgPSBbXVxuICB0aGlzLnN0ciA9IHN0clxuICB0aGlzLmxlbmd0aCA9IHN0ci5sZW5ndGhcbiAgdGhpcy5wb3MgPSAwXG4gIHRoaXMuc3RhcnQgPSAwXG4gIHRoaXMuZXNjYXBlQ2hhclBvc2l0aW9ucyA9IFtdXG59XG5cbmx1bnIuUXVlcnlMZXhlci5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc3RhdGUgPSBsdW5yLlF1ZXJ5TGV4ZXIubGV4VGV4dFxuXG4gIHdoaWxlIChzdGF0ZSkge1xuICAgIHN0YXRlID0gc3RhdGUodGhpcylcbiAgfVxufVxuXG5sdW5yLlF1ZXJ5TGV4ZXIucHJvdG90eXBlLnNsaWNlU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc3ViU2xpY2VzID0gW10sXG4gICAgICBzbGljZVN0YXJ0ID0gdGhpcy5zdGFydCxcbiAgICAgIHNsaWNlRW5kID0gdGhpcy5wb3NcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZXNjYXBlQ2hhclBvc2l0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgIHNsaWNlRW5kID0gdGhpcy5lc2NhcGVDaGFyUG9zaXRpb25zW2ldXG4gICAgc3ViU2xpY2VzLnB1c2godGhpcy5zdHIuc2xpY2Uoc2xpY2VTdGFydCwgc2xpY2VFbmQpKVxuICAgIHNsaWNlU3RhcnQgPSBzbGljZUVuZCArIDFcbiAgfVxuXG4gIHN1YlNsaWNlcy5wdXNoKHRoaXMuc3RyLnNsaWNlKHNsaWNlU3RhcnQsIHRoaXMucG9zKSlcbiAgdGhpcy5lc2NhcGVDaGFyUG9zaXRpb25zLmxlbmd0aCA9IDBcblxuICByZXR1cm4gc3ViU2xpY2VzLmpvaW4oJycpXG59XG5cbmx1bnIuUXVlcnlMZXhlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gIHRoaXMubGV4ZW1lcy5wdXNoKHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIHN0cjogdGhpcy5zbGljZVN0cmluZygpLFxuICAgIHN0YXJ0OiB0aGlzLnN0YXJ0LFxuICAgIGVuZDogdGhpcy5wb3NcbiAgfSlcblxuICB0aGlzLnN0YXJ0ID0gdGhpcy5wb3Ncbn1cblxubHVuci5RdWVyeUxleGVyLnByb3RvdHlwZS5lc2NhcGVDaGFyYWN0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZXNjYXBlQ2hhclBvc2l0aW9ucy5wdXNoKHRoaXMucG9zIC0gMSlcbiAgdGhpcy5wb3MgKz0gMVxufVxuXG5sdW5yLlF1ZXJ5TGV4ZXIucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLnBvcyA+PSB0aGlzLmxlbmd0aCkge1xuICAgIHJldHVybiBsdW5yLlF1ZXJ5TGV4ZXIuRU9TXG4gIH1cblxuICB2YXIgY2hhciA9IHRoaXMuc3RyLmNoYXJBdCh0aGlzLnBvcylcbiAgdGhpcy5wb3MgKz0gMVxuICByZXR1cm4gY2hhclxufVxuXG5sdW5yLlF1ZXJ5TGV4ZXIucHJvdG90eXBlLndpZHRoID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5wb3MgLSB0aGlzLnN0YXJ0XG59XG5cbmx1bnIuUXVlcnlMZXhlci5wcm90b3R5cGUuaWdub3JlID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5zdGFydCA9PSB0aGlzLnBvcykge1xuICAgIHRoaXMucG9zICs9IDFcbiAgfVxuXG4gIHRoaXMuc3RhcnQgPSB0aGlzLnBvc1xufVxuXG5sdW5yLlF1ZXJ5TGV4ZXIucHJvdG90eXBlLmJhY2t1cCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5wb3MgLT0gMVxufVxuXG5sdW5yLlF1ZXJ5TGV4ZXIucHJvdG90eXBlLmFjY2VwdERpZ2l0UnVuID0gZnVuY3Rpb24gKCkge1xuICB2YXIgY2hhciwgY2hhckNvZGVcblxuICBkbyB7XG4gICAgY2hhciA9IHRoaXMubmV4dCgpXG4gICAgY2hhckNvZGUgPSBjaGFyLmNoYXJDb2RlQXQoMClcbiAgfSB3aGlsZSAoY2hhckNvZGUgPiA0NyAmJiBjaGFyQ29kZSA8IDU4KVxuXG4gIGlmIChjaGFyICE9IGx1bnIuUXVlcnlMZXhlci5FT1MpIHtcbiAgICB0aGlzLmJhY2t1cCgpXG4gIH1cbn1cblxubHVuci5RdWVyeUxleGVyLnByb3RvdHlwZS5tb3JlID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5wb3MgPCB0aGlzLmxlbmd0aFxufVxuXG5sdW5yLlF1ZXJ5TGV4ZXIuRU9TID0gJ0VPUydcbmx1bnIuUXVlcnlMZXhlci5GSUVMRCA9ICdGSUVMRCdcbmx1bnIuUXVlcnlMZXhlci5URVJNID0gJ1RFUk0nXG5sdW5yLlF1ZXJ5TGV4ZXIuRURJVF9ESVNUQU5DRSA9ICdFRElUX0RJU1RBTkNFJ1xubHVuci5RdWVyeUxleGVyLkJPT1NUID0gJ0JPT1NUJ1xuXG5sdW5yLlF1ZXJ5TGV4ZXIubGV4RmllbGQgPSBmdW5jdGlvbiAobGV4ZXIpIHtcbiAgbGV4ZXIuYmFja3VwKClcbiAgbGV4ZXIuZW1pdChsdW5yLlF1ZXJ5TGV4ZXIuRklFTEQpXG4gIGxleGVyLmlnbm9yZSgpXG4gIHJldHVybiBsdW5yLlF1ZXJ5TGV4ZXIubGV4VGV4dFxufVxuXG5sdW5yLlF1ZXJ5TGV4ZXIubGV4VGVybSA9IGZ1bmN0aW9uIChsZXhlcikge1xuICBpZiAobGV4ZXIud2lkdGgoKSA+IDEpIHtcbiAgICBsZXhlci5iYWNrdXAoKVxuICAgIGxleGVyLmVtaXQobHVuci5RdWVyeUxleGVyLlRFUk0pXG4gIH1cblxuICBsZXhlci5pZ25vcmUoKVxuXG4gIGlmIChsZXhlci5tb3JlKCkpIHtcbiAgICByZXR1cm4gbHVuci5RdWVyeUxleGVyLmxleFRleHRcbiAgfVxufVxuXG5sdW5yLlF1ZXJ5TGV4ZXIubGV4RWRpdERpc3RhbmNlID0gZnVuY3Rpb24gKGxleGVyKSB7XG4gIGxleGVyLmlnbm9yZSgpXG4gIGxleGVyLmFjY2VwdERpZ2l0UnVuKClcbiAgbGV4ZXIuZW1pdChsdW5yLlF1ZXJ5TGV4ZXIuRURJVF9ESVNUQU5DRSlcbiAgcmV0dXJuIGx1bnIuUXVlcnlMZXhlci5sZXhUZXh0XG59XG5cbmx1bnIuUXVlcnlMZXhlci5sZXhCb29zdCA9IGZ1bmN0aW9uIChsZXhlcikge1xuICBsZXhlci5pZ25vcmUoKVxuICBsZXhlci5hY2NlcHREaWdpdFJ1bigpXG4gIGxleGVyLmVtaXQobHVuci5RdWVyeUxleGVyLkJPT1NUKVxuICByZXR1cm4gbHVuci5RdWVyeUxleGVyLmxleFRleHRcbn1cblxubHVuci5RdWVyeUxleGVyLmxleEVPUyA9IGZ1bmN0aW9uIChsZXhlcikge1xuICBpZiAobGV4ZXIud2lkdGgoKSA+IDApIHtcbiAgICBsZXhlci5lbWl0KGx1bnIuUXVlcnlMZXhlci5URVJNKVxuICB9XG59XG5cbi8vIFRoaXMgbWF0Y2hlcyB0aGUgc2VwYXJhdG9yIHVzZWQgd2hlbiB0b2tlbmlzaW5nIGZpZWxkc1xuLy8gd2l0aGluIGEgZG9jdW1lbnQuIFRoZXNlIHNob3VsZCBtYXRjaCBvdGhlcndpc2UgaXQgaXNcbi8vIG5vdCBwb3NzaWJsZSB0byBzZWFyY2ggZm9yIHNvbWUgdG9rZW5zIHdpdGhpbiBhIGRvY3VtZW50LlxuLy9cbi8vIEl0IGlzIHBvc3NpYmxlIGZvciB0aGUgdXNlciB0byBjaGFuZ2UgdGhlIHNlcGFyYXRvciBvbiB0aGVcbi8vIHRva2VuaXplciBzbyBpdCBfbWlnaHRfIGNsYXNoIHdpdGggYW55IG90aGVyIG9mIHRoZSBzcGVjaWFsXG4vLyBjaGFyYWN0ZXJzIGFscmVhZHkgdXNlZCB3aXRoaW4gdGhlIHNlYXJjaCBzdHJpbmcsIGUuZy4gOi5cbi8vXG4vLyBUaGlzIG1lYW5zIHRoYXQgaXQgaXMgcG9zc2libGUgdG8gY2hhbmdlIHRoZSBzZXBhcmF0b3IgaW5cbi8vIHN1Y2ggYSB3YXkgdGhhdCBtYWtlcyBzb21lIHdvcmRzIHVuc2VhcmNoYWJsZSB1c2luZyBhIHNlYXJjaFxuLy8gc3RyaW5nLlxubHVuci5RdWVyeUxleGVyLnRlcm1TZXBhcmF0b3IgPSBsdW5yLnRva2VuaXplci5zZXBhcmF0b3JcblxubHVuci5RdWVyeUxleGVyLmxleFRleHQgPSBmdW5jdGlvbiAobGV4ZXIpIHtcbiAgd2hpbGUgKHRydWUpIHtcbiAgICB2YXIgY2hhciA9IGxleGVyLm5leHQoKVxuXG4gICAgaWYgKGNoYXIgPT0gbHVuci5RdWVyeUxleGVyLkVPUykge1xuICAgICAgcmV0dXJuIGx1bnIuUXVlcnlMZXhlci5sZXhFT1NcbiAgICB9XG5cbiAgICAvLyBFc2NhcGUgY2hhcmFjdGVyIGlzICdcXCdcbiAgICBpZiAoY2hhci5jaGFyQ29kZUF0KDApID09IDkyKSB7XG4gICAgICBsZXhlci5lc2NhcGVDaGFyYWN0ZXIoKVxuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBpZiAoY2hhciA9PSBcIjpcIikge1xuICAgICAgcmV0dXJuIGx1bnIuUXVlcnlMZXhlci5sZXhGaWVsZFxuICAgIH1cblxuICAgIGlmIChjaGFyID09IFwiflwiKSB7XG4gICAgICBsZXhlci5iYWNrdXAoKVxuICAgICAgaWYgKGxleGVyLndpZHRoKCkgPiAwKSB7XG4gICAgICAgIGxleGVyLmVtaXQobHVuci5RdWVyeUxleGVyLlRFUk0pXG4gICAgICB9XG4gICAgICByZXR1cm4gbHVuci5RdWVyeUxleGVyLmxleEVkaXREaXN0YW5jZVxuICAgIH1cblxuICAgIGlmIChjaGFyID09IFwiXlwiKSB7XG4gICAgICBsZXhlci5iYWNrdXAoKVxuICAgICAgaWYgKGxleGVyLndpZHRoKCkgPiAwKSB7XG4gICAgICAgIGxleGVyLmVtaXQobHVuci5RdWVyeUxleGVyLlRFUk0pXG4gICAgICB9XG4gICAgICByZXR1cm4gbHVuci5RdWVyeUxleGVyLmxleEJvb3N0XG4gICAgfVxuXG4gICAgaWYgKGNoYXIubWF0Y2gobHVuci5RdWVyeUxleGVyLnRlcm1TZXBhcmF0b3IpKSB7XG4gICAgICByZXR1cm4gbHVuci5RdWVyeUxleGVyLmxleFRlcm1cbiAgICB9XG4gIH1cbn1cblxubHVuci5RdWVyeVBhcnNlciA9IGZ1bmN0aW9uIChzdHIsIHF1ZXJ5KSB7XG4gIHRoaXMubGV4ZXIgPSBuZXcgbHVuci5RdWVyeUxleGVyIChzdHIpXG4gIHRoaXMucXVlcnkgPSBxdWVyeVxuICB0aGlzLmN1cnJlbnRDbGF1c2UgPSB7fVxuICB0aGlzLmxleGVtZUlkeCA9IDBcbn1cblxubHVuci5RdWVyeVBhcnNlci5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMubGV4ZXIucnVuKClcbiAgdGhpcy5sZXhlbWVzID0gdGhpcy5sZXhlci5sZXhlbWVzXG5cbiAgdmFyIHN0YXRlID0gbHVuci5RdWVyeVBhcnNlci5wYXJzZUZpZWxkT3JUZXJtXG5cbiAgd2hpbGUgKHN0YXRlKSB7XG4gICAgc3RhdGUgPSBzdGF0ZSh0aGlzKVxuICB9XG5cbiAgcmV0dXJuIHRoaXMucXVlcnlcbn1cblxubHVuci5RdWVyeVBhcnNlci5wcm90b3R5cGUucGVla0xleGVtZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMubGV4ZW1lc1t0aGlzLmxleGVtZUlkeF1cbn1cblxubHVuci5RdWVyeVBhcnNlci5wcm90b3R5cGUuY29uc3VtZUxleGVtZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGxleGVtZSA9IHRoaXMucGVla0xleGVtZSgpXG4gIHRoaXMubGV4ZW1lSWR4ICs9IDFcbiAgcmV0dXJuIGxleGVtZVxufVxuXG5sdW5yLlF1ZXJ5UGFyc2VyLnByb3RvdHlwZS5uZXh0Q2xhdXNlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgY29tcGxldGVkQ2xhdXNlID0gdGhpcy5jdXJyZW50Q2xhdXNlXG4gIHRoaXMucXVlcnkuY2xhdXNlKGNvbXBsZXRlZENsYXVzZSlcbiAgdGhpcy5jdXJyZW50Q2xhdXNlID0ge31cbn1cblxubHVuci5RdWVyeVBhcnNlci5wYXJzZUZpZWxkT3JUZXJtID0gZnVuY3Rpb24gKHBhcnNlcikge1xuICB2YXIgbGV4ZW1lID0gcGFyc2VyLnBlZWtMZXhlbWUoKVxuXG4gIGlmIChsZXhlbWUgPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBzd2l0Y2ggKGxleGVtZS50eXBlKSB7XG4gICAgY2FzZSBsdW5yLlF1ZXJ5TGV4ZXIuRklFTEQ6XG4gICAgICByZXR1cm4gbHVuci5RdWVyeVBhcnNlci5wYXJzZUZpZWxkXG4gICAgY2FzZSBsdW5yLlF1ZXJ5TGV4ZXIuVEVSTTpcbiAgICAgIHJldHVybiBsdW5yLlF1ZXJ5UGFyc2VyLnBhcnNlVGVybVxuICAgIGRlZmF1bHQ6XG4gICAgICB2YXIgZXJyb3JNZXNzYWdlID0gXCJleHBlY3RlZCBlaXRoZXIgYSBmaWVsZCBvciBhIHRlcm0sIGZvdW5kIFwiICsgbGV4ZW1lLnR5cGVcblxuICAgICAgaWYgKGxleGVtZS5zdHIubGVuZ3RoID49IDEpIHtcbiAgICAgICAgZXJyb3JNZXNzYWdlICs9IFwiIHdpdGggdmFsdWUgJ1wiICsgbGV4ZW1lLnN0ciArIFwiJ1wiXG4gICAgICB9XG5cbiAgICAgIHRocm93IG5ldyBsdW5yLlF1ZXJ5UGFyc2VFcnJvciAoZXJyb3JNZXNzYWdlLCBsZXhlbWUuc3RhcnQsIGxleGVtZS5lbmQpXG4gIH1cbn1cblxubHVuci5RdWVyeVBhcnNlci5wYXJzZUZpZWxkID0gZnVuY3Rpb24gKHBhcnNlcikge1xuICB2YXIgbGV4ZW1lID0gcGFyc2VyLmNvbnN1bWVMZXhlbWUoKVxuXG4gIGlmIChsZXhlbWUgPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAocGFyc2VyLnF1ZXJ5LmFsbEZpZWxkcy5pbmRleE9mKGxleGVtZS5zdHIpID09IC0xKSB7XG4gICAgdmFyIHBvc3NpYmxlRmllbGRzID0gcGFyc2VyLnF1ZXJ5LmFsbEZpZWxkcy5tYXAoZnVuY3Rpb24gKGYpIHsgcmV0dXJuIFwiJ1wiICsgZiArIFwiJ1wiIH0pLmpvaW4oJywgJyksXG4gICAgICAgIGVycm9yTWVzc2FnZSA9IFwidW5yZWNvZ25pc2VkIGZpZWxkICdcIiArIGxleGVtZS5zdHIgKyBcIicsIHBvc3NpYmxlIGZpZWxkczogXCIgKyBwb3NzaWJsZUZpZWxkc1xuXG4gICAgdGhyb3cgbmV3IGx1bnIuUXVlcnlQYXJzZUVycm9yIChlcnJvck1lc3NhZ2UsIGxleGVtZS5zdGFydCwgbGV4ZW1lLmVuZClcbiAgfVxuXG4gIHBhcnNlci5jdXJyZW50Q2xhdXNlLmZpZWxkcyA9IFtsZXhlbWUuc3RyXVxuXG4gIHZhciBuZXh0TGV4ZW1lID0gcGFyc2VyLnBlZWtMZXhlbWUoKVxuXG4gIGlmIChuZXh0TGV4ZW1lID09IHVuZGVmaW5lZCkge1xuICAgIHZhciBlcnJvck1lc3NhZ2UgPSBcImV4cGVjdGluZyB0ZXJtLCBmb3VuZCBub3RoaW5nXCJcbiAgICB0aHJvdyBuZXcgbHVuci5RdWVyeVBhcnNlRXJyb3IgKGVycm9yTWVzc2FnZSwgbGV4ZW1lLnN0YXJ0LCBsZXhlbWUuZW5kKVxuICB9XG5cbiAgc3dpdGNoIChuZXh0TGV4ZW1lLnR5cGUpIHtcbiAgICBjYXNlIGx1bnIuUXVlcnlMZXhlci5URVJNOlxuICAgICAgcmV0dXJuIGx1bnIuUXVlcnlQYXJzZXIucGFyc2VUZXJtXG4gICAgZGVmYXVsdDpcbiAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBcImV4cGVjdGluZyB0ZXJtLCBmb3VuZCAnXCIgKyBuZXh0TGV4ZW1lLnR5cGUgKyBcIidcIlxuICAgICAgdGhyb3cgbmV3IGx1bnIuUXVlcnlQYXJzZUVycm9yIChlcnJvck1lc3NhZ2UsIG5leHRMZXhlbWUuc3RhcnQsIG5leHRMZXhlbWUuZW5kKVxuICB9XG59XG5cbmx1bnIuUXVlcnlQYXJzZXIucGFyc2VUZXJtID0gZnVuY3Rpb24gKHBhcnNlcikge1xuICB2YXIgbGV4ZW1lID0gcGFyc2VyLmNvbnN1bWVMZXhlbWUoKVxuXG4gIGlmIChsZXhlbWUgPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBwYXJzZXIuY3VycmVudENsYXVzZS50ZXJtID0gbGV4ZW1lLnN0ci50b0xvd2VyQ2FzZSgpXG5cbiAgaWYgKGxleGVtZS5zdHIuaW5kZXhPZihcIipcIikgIT0gLTEpIHtcbiAgICBwYXJzZXIuY3VycmVudENsYXVzZS51c2VQaXBlbGluZSA9IGZhbHNlXG4gIH1cblxuICB2YXIgbmV4dExleGVtZSA9IHBhcnNlci5wZWVrTGV4ZW1lKClcblxuICBpZiAobmV4dExleGVtZSA9PSB1bmRlZmluZWQpIHtcbiAgICBwYXJzZXIubmV4dENsYXVzZSgpXG4gICAgcmV0dXJuXG4gIH1cblxuICBzd2l0Y2ggKG5leHRMZXhlbWUudHlwZSkge1xuICAgIGNhc2UgbHVuci5RdWVyeUxleGVyLlRFUk06XG4gICAgICBwYXJzZXIubmV4dENsYXVzZSgpXG4gICAgICByZXR1cm4gbHVuci5RdWVyeVBhcnNlci5wYXJzZVRlcm1cbiAgICBjYXNlIGx1bnIuUXVlcnlMZXhlci5GSUVMRDpcbiAgICAgIHBhcnNlci5uZXh0Q2xhdXNlKClcbiAgICAgIHJldHVybiBsdW5yLlF1ZXJ5UGFyc2VyLnBhcnNlRmllbGRcbiAgICBjYXNlIGx1bnIuUXVlcnlMZXhlci5FRElUX0RJU1RBTkNFOlxuICAgICAgcmV0dXJuIGx1bnIuUXVlcnlQYXJzZXIucGFyc2VFZGl0RGlzdGFuY2VcbiAgICBjYXNlIGx1bnIuUXVlcnlMZXhlci5CT09TVDpcbiAgICAgIHJldHVybiBsdW5yLlF1ZXJ5UGFyc2VyLnBhcnNlQm9vc3RcbiAgICBkZWZhdWx0OlxuICAgICAgdmFyIGVycm9yTWVzc2FnZSA9IFwiVW5leHBlY3RlZCBsZXhlbWUgdHlwZSAnXCIgKyBuZXh0TGV4ZW1lLnR5cGUgKyBcIidcIlxuICAgICAgdGhyb3cgbmV3IGx1bnIuUXVlcnlQYXJzZUVycm9yIChlcnJvck1lc3NhZ2UsIG5leHRMZXhlbWUuc3RhcnQsIG5leHRMZXhlbWUuZW5kKVxuICB9XG59XG5cbmx1bnIuUXVlcnlQYXJzZXIucGFyc2VFZGl0RGlzdGFuY2UgPSBmdW5jdGlvbiAocGFyc2VyKSB7XG4gIHZhciBsZXhlbWUgPSBwYXJzZXIuY29uc3VtZUxleGVtZSgpXG5cbiAgaWYgKGxleGVtZSA9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBlZGl0RGlzdGFuY2UgPSBwYXJzZUludChsZXhlbWUuc3RyLCAxMClcblxuICBpZiAoaXNOYU4oZWRpdERpc3RhbmNlKSkge1xuICAgIHZhciBlcnJvck1lc3NhZ2UgPSBcImVkaXQgZGlzdGFuY2UgbXVzdCBiZSBudW1lcmljXCJcbiAgICB0aHJvdyBuZXcgbHVuci5RdWVyeVBhcnNlRXJyb3IgKGVycm9yTWVzc2FnZSwgbGV4ZW1lLnN0YXJ0LCBsZXhlbWUuZW5kKVxuICB9XG5cbiAgcGFyc2VyLmN1cnJlbnRDbGF1c2UuZWRpdERpc3RhbmNlID0gZWRpdERpc3RhbmNlXG5cbiAgdmFyIG5leHRMZXhlbWUgPSBwYXJzZXIucGVla0xleGVtZSgpXG5cbiAgaWYgKG5leHRMZXhlbWUgPT0gdW5kZWZpbmVkKSB7XG4gICAgcGFyc2VyLm5leHRDbGF1c2UoKVxuICAgIHJldHVyblxuICB9XG5cbiAgc3dpdGNoIChuZXh0TGV4ZW1lLnR5cGUpIHtcbiAgICBjYXNlIGx1bnIuUXVlcnlMZXhlci5URVJNOlxuICAgICAgcGFyc2VyLm5leHRDbGF1c2UoKVxuICAgICAgcmV0dXJuIGx1bnIuUXVlcnlQYXJzZXIucGFyc2VUZXJtXG4gICAgY2FzZSBsdW5yLlF1ZXJ5TGV4ZXIuRklFTEQ6XG4gICAgICBwYXJzZXIubmV4dENsYXVzZSgpXG4gICAgICByZXR1cm4gbHVuci5RdWVyeVBhcnNlci5wYXJzZUZpZWxkXG4gICAgY2FzZSBsdW5yLlF1ZXJ5TGV4ZXIuRURJVF9ESVNUQU5DRTpcbiAgICAgIHJldHVybiBsdW5yLlF1ZXJ5UGFyc2VyLnBhcnNlRWRpdERpc3RhbmNlXG4gICAgY2FzZSBsdW5yLlF1ZXJ5TGV4ZXIuQk9PU1Q6XG4gICAgICByZXR1cm4gbHVuci5RdWVyeVBhcnNlci5wYXJzZUJvb3N0XG4gICAgZGVmYXVsdDpcbiAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBcIlVuZXhwZWN0ZWQgbGV4ZW1lIHR5cGUgJ1wiICsgbmV4dExleGVtZS50eXBlICsgXCInXCJcbiAgICAgIHRocm93IG5ldyBsdW5yLlF1ZXJ5UGFyc2VFcnJvciAoZXJyb3JNZXNzYWdlLCBuZXh0TGV4ZW1lLnN0YXJ0LCBuZXh0TGV4ZW1lLmVuZClcbiAgfVxufVxuXG5sdW5yLlF1ZXJ5UGFyc2VyLnBhcnNlQm9vc3QgPSBmdW5jdGlvbiAocGFyc2VyKSB7XG4gIHZhciBsZXhlbWUgPSBwYXJzZXIuY29uc3VtZUxleGVtZSgpXG5cbiAgaWYgKGxleGVtZSA9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBib29zdCA9IHBhcnNlSW50KGxleGVtZS5zdHIsIDEwKVxuXG4gIGlmIChpc05hTihib29zdCkpIHtcbiAgICB2YXIgZXJyb3JNZXNzYWdlID0gXCJib29zdCBtdXN0IGJlIG51bWVyaWNcIlxuICAgIHRocm93IG5ldyBsdW5yLlF1ZXJ5UGFyc2VFcnJvciAoZXJyb3JNZXNzYWdlLCBsZXhlbWUuc3RhcnQsIGxleGVtZS5lbmQpXG4gIH1cblxuICBwYXJzZXIuY3VycmVudENsYXVzZS5ib29zdCA9IGJvb3N0XG5cbiAgdmFyIG5leHRMZXhlbWUgPSBwYXJzZXIucGVla0xleGVtZSgpXG5cbiAgaWYgKG5leHRMZXhlbWUgPT0gdW5kZWZpbmVkKSB7XG4gICAgcGFyc2VyLm5leHRDbGF1c2UoKVxuICAgIHJldHVyblxuICB9XG5cbiAgc3dpdGNoIChuZXh0TGV4ZW1lLnR5cGUpIHtcbiAgICBjYXNlIGx1bnIuUXVlcnlMZXhlci5URVJNOlxuICAgICAgcGFyc2VyLm5leHRDbGF1c2UoKVxuICAgICAgcmV0dXJuIGx1bnIuUXVlcnlQYXJzZXIucGFyc2VUZXJtXG4gICAgY2FzZSBsdW5yLlF1ZXJ5TGV4ZXIuRklFTEQ6XG4gICAgICBwYXJzZXIubmV4dENsYXVzZSgpXG4gICAgICByZXR1cm4gbHVuci5RdWVyeVBhcnNlci5wYXJzZUZpZWxkXG4gICAgY2FzZSBsdW5yLlF1ZXJ5TGV4ZXIuRURJVF9ESVNUQU5DRTpcbiAgICAgIHJldHVybiBsdW5yLlF1ZXJ5UGFyc2VyLnBhcnNlRWRpdERpc3RhbmNlXG4gICAgY2FzZSBsdW5yLlF1ZXJ5TGV4ZXIuQk9PU1Q6XG4gICAgICByZXR1cm4gbHVuci5RdWVyeVBhcnNlci5wYXJzZUJvb3N0XG4gICAgZGVmYXVsdDpcbiAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBcIlVuZXhwZWN0ZWQgbGV4ZW1lIHR5cGUgJ1wiICsgbmV4dExleGVtZS50eXBlICsgXCInXCJcbiAgICAgIHRocm93IG5ldyBsdW5yLlF1ZXJ5UGFyc2VFcnJvciAoZXJyb3JNZXNzYWdlLCBuZXh0TGV4ZW1lLnN0YXJ0LCBuZXh0TGV4ZW1lLmVuZClcbiAgfVxufVxuXG4gIC8qKlxuICAgKiBleHBvcnQgdGhlIG1vZHVsZSB2aWEgQU1ELCBDb21tb25KUyBvciBhcyBhIGJyb3dzZXIgZ2xvYmFsXG4gICAqIEV4cG9ydCBjb2RlIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL3VtZGpzL3VtZC9ibG9iL21hc3Rlci9yZXR1cm5FeHBvcnRzLmpzXG4gICAqL1xuICA7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgICAgZGVmaW5lKGZhY3RvcnkpXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIC8qKlxuICAgICAgICogTm9kZS4gRG9lcyBub3Qgd29yayB3aXRoIHN0cmljdCBDb21tb25KUywgYnV0XG4gICAgICAgKiBvbmx5IENvbW1vbkpTLWxpa2UgZW52aXJvbWVudHMgdGhhdCBzdXBwb3J0IG1vZHVsZS5leHBvcnRzLFxuICAgICAgICogbGlrZSBOb2RlLlxuICAgICAgICovXG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBCcm93c2VyIGdsb2JhbHMgKHJvb3QgaXMgd2luZG93KVxuICAgICAgcm9vdC5sdW5yID0gZmFjdG9yeSgpXG4gICAgfVxuICB9KHRoaXMsIGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBKdXN0IHJldHVybiBhIHZhbHVlIHRvIGRlZmluZSB0aGUgbW9kdWxlIGV4cG9ydC5cbiAgICAgKiBUaGlzIGV4YW1wbGUgcmV0dXJucyBhbiBvYmplY3QsIGJ1dCB0aGUgbW9kdWxlXG4gICAgICogY2FuIHJldHVybiBhIGZ1bmN0aW9uIGFzIHRoZSBleHBvcnRlZCB2YWx1ZS5cbiAgICAgKi9cbiAgICByZXR1cm4gbHVuclxuICB9KSlcbn0pKCk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sdW5yL2x1bnIuanNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxNyBNYXJ0aW4gRG9uYXRoIDxtYXJ0aW4uZG9uYXRoQHNxdWlkZnVuay5jb20+XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG9cbiAqIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlXG4gKiByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3JcbiAqIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04tSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HXG4gKiBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTXG4gKiBJTiBUSEUgU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IFBvc2l0aW9uIGZyb20gXCIuL1NpZGViYXIvUG9zaXRpb25cIlxuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBNb2R1bGVcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuZXhwb3J0IGRlZmF1bHQge1xuICBQb3NpdGlvblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01hdGVyaWFsL1NpZGViYXIuanMiLCIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTcgTWFydGluIERvbmF0aCA8bWFydGluLmRvbmF0aEBzcXVpZGZ1bmsuY29tPlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvXG4gKiBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZVxuICogcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yXG4gKiBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OLUlORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuICogRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HU1xuICogSU4gVEhFIFNPRlRXQVJFLlxuICovXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENsYXNzXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvc2l0aW9uIHtcblxuICAvKipcbiAgICogU2V0IHNpZGViYXJzIHRvIGxvY2tlZCBzdGF0ZSBhbmQgbGltaXQgaGVpZ2h0IHRvIHBhcmVudCBub2RlXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKlxuICAgKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSBlbF8gLSBTaWRlYmFyXG4gICAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IHBhcmVudF8gLSBTaWRlYmFyIGNvbnRhaW5lclxuICAgKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSBoZWFkZXJfIC0gSGVhZGVyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBoZWlnaHRfIC0gQ3VycmVudCBzaWRlYmFyIGhlaWdodFxuICAgKiBAcHJvcGVydHkge251bWJlcn0gb2Zmc2V0XyAtIEN1cnJlbnQgcGFnZSB5LW9mZnNldFxuICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IHBhZF8gLSBQYWQgd2hlbiBoZWFkZXIgaXMgZml4ZWRcbiAgICpcbiAgICogQHBhcmFtIHsoc3RyaW5nfEhUTUxFbGVtZW50KX0gZWwgLSBTZWxlY3RvciBvciBIVE1MIGVsZW1lbnRcbiAgICogQHBhcmFtIHsoc3RyaW5nfEhUTUxFbGVtZW50KX0gaGVhZGVyIC0gU2VsZWN0b3Igb3IgSFRNTCBlbGVtZW50XG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbCwgaGVhZGVyKSB7XG4gICAgbGV0IHJlZiA9ICh0eXBlb2YgZWwgPT09IFwic3RyaW5nXCIpXG4gICAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpXG4gICAgICA6IGVsXG4gICAgaWYgKCEocmVmIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHx8XG4gICAgICAgICEocmVmLnBhcmVudE5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpXG4gICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3JcbiAgICB0aGlzLmVsXyA9IHJlZlxuICAgIHRoaXMucGFyZW50XyA9IHJlZi5wYXJlbnROb2RlXG5cbiAgICAvKiBSZXRyaWV2ZSBoZWFkZXIgKi9cbiAgICByZWYgPSAodHlwZW9mIGhlYWRlciA9PT0gXCJzdHJpbmdcIilcbiAgICAgID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihoZWFkZXIpXG4gICAgICA6IGhlYWRlclxuICAgIGlmICghKHJlZiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSlcbiAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvclxuICAgIHRoaXMuaGVhZGVyXyA9IHJlZlxuXG4gICAgLyogSW5pdGlhbGl6ZSBjdXJyZW50IGhlaWdodCBhbmQgdGVzdCB3aGV0aGVyIGhlYWRlciBpcyBmaXhlZCAqL1xuICAgIHRoaXMuaGVpZ2h0XyA9IDBcbiAgICB0aGlzLnBhZF8gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmhlYWRlcl8pLnBvc2l0aW9uID09PSBcImZpeGVkXCJcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHNpZGViYXIgc3RhdGVcbiAgICovXG4gIHNldHVwKCkge1xuICAgIGNvbnN0IHRvcCA9IEFycmF5LnByb3RvdHlwZS5yZWR1Y2UuY2FsbChcbiAgICAgIHRoaXMucGFyZW50Xy5jaGlsZHJlbiwgKG9mZnNldCwgY2hpbGQpID0+IHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KG9mZnNldCwgY2hpbGQub2Zmc2V0VG9wKVxuICAgICAgfSwgMClcblxuICAgIC8qIFNldCBsb2NrIG9mZnNldCBmb3IgZWxlbWVudCB3aXRoIGxhcmdlc3QgdG9wIG9mZnNldCAqL1xuICAgIHRoaXMub2Zmc2V0XyA9IHRvcCAtICh0aGlzLnBhZF8gPyB0aGlzLmhlYWRlcl8ub2Zmc2V0SGVpZ2h0IDogMClcbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGxvY2tlZCBzdGF0ZSBhbmQgaGVpZ2h0XG4gICAqXG4gICAqIFRoZSBpbm5lciBoZWlnaHQgb2YgdGhlIHdpbmRvdyAoPSB0aGUgdmlzaWJsZSBhcmVhKSBpcyB0aGUgbWF4aW11bVxuICAgKiBwb3NzaWJsZSBoZWlnaHQgZm9yIHRoZSBzdHJldGNoaW5nIHNpZGViYXIuIFRoaXMgaGVpZ2h0IG11c3QgYmUgZGVkdWN0ZWRcbiAgICogYnkgdGhlIGhlaWdodCBvZiB0aGUgZml4ZWQgaGVhZGVyICg1NnB4KS4gRGVwZW5kaW5nIG9uIHRoZSBwYWdlIHktb2Zmc2V0LFxuICAgKiB0aGUgdG9wIG9mZnNldCBvZiB0aGUgc2lkZWJhciBtdXN0IGJlIHRha2VuIGludG8gYWNjb3VudCwgYXMgd2VsbCBhcyB0aGVcbiAgICogY2FzZSB3aGVyZSB0aGUgd2luZG93IGlzIHNjcm9sbGVkIGJleW9uZCB0aGUgc2lkZWJhciBjb250YWluZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7RXZlbnQ/fSBldiAtIEV2ZW50XG4gICAqL1xuICB1cGRhdGUoZXYpIHtcbiAgICBjb25zdCBvZmZzZXQgID0gd2luZG93LnBhZ2VZT2Zmc2V0XG4gICAgY29uc3QgdmlzaWJsZSA9IHdpbmRvdy5pbm5lckhlaWdodFxuXG4gICAgLyogVXBkYXRlIG9mZnNldCwgaW4gY2FzZSB3aW5kb3cgaXMgcmVzaXplZCAqL1xuICAgIGlmIChldiAmJiBldi50eXBlID09PSBcInJlc2l6ZVwiKVxuICAgICAgdGhpcy5zZXR1cCgpXG5cbiAgICAvKiBTZXQgYm91bmRzIG9mIHNpZGViYXIgY29udGFpbmVyIC0gbXVzdCBiZSBjYWxjdWxhdGVkIG9uIGV2ZXJ5IHJ1biwgYXNcbiAgICAgICB0aGUgaGVpZ2h0IG9mIHRoZSBjb250ZW50IG1pZ2h0IGNoYW5nZSBkdWUgdG8gbG9hZGluZyBpbWFnZXMgZXRjLiAqL1xuICAgIGNvbnN0IGJvdW5kcyA9IHtcbiAgICAgIHRvcDogdGhpcy5wYWRfID8gdGhpcy5oZWFkZXJfLm9mZnNldEhlaWdodCA6IDAsXG4gICAgICBib3R0b206IHRoaXMucGFyZW50Xy5vZmZzZXRUb3AgKyB0aGlzLnBhcmVudF8ub2Zmc2V0SGVpZ2h0XG4gICAgfVxuXG4gICAgLyogQ2FsY3VsYXRlIG5ldyBvZmZzZXQgYW5kIGhlaWdodCAqL1xuICAgIGNvbnN0IGhlaWdodCA9IHZpc2libGUgLSBib3VuZHMudG9wXG4gICAgICAgICAgICAgICAgIC0gTWF0aC5tYXgoMCwgdGhpcy5vZmZzZXRfIC0gb2Zmc2V0KVxuICAgICAgICAgICAgICAgICAtIE1hdGgubWF4KDAsIG9mZnNldCArIHZpc2libGUgLSBib3VuZHMuYm90dG9tKVxuXG4gICAgLyogSWYgaGVpZ2h0IGNoYW5nZWQsIHVwZGF0ZSBlbGVtZW50ICovXG4gICAgaWYgKGhlaWdodCAhPT0gdGhpcy5oZWlnaHRfKVxuICAgICAgdGhpcy5lbF8uc3R5bGUuaGVpZ2h0ID0gYCR7dGhpcy5oZWlnaHRfID0gaGVpZ2h0fXB4YFxuXG4gICAgLyogU2lkZWJhciBzaG91bGQgYmUgbG9ja2VkLCBhcyB3ZSdyZSBiZWxvdyBwYXJlbnQgb2Zmc2V0ICovXG4gICAgaWYgKG9mZnNldCA+PSB0aGlzLm9mZnNldF8pIHtcbiAgICAgIGlmICh0aGlzLmVsXy5kYXRhc2V0Lm1kU3RhdGUgIT09IFwibG9ja1wiKVxuICAgICAgICB0aGlzLmVsXy5kYXRhc2V0Lm1kU3RhdGUgPSBcImxvY2tcIlxuXG4gICAgLyogU2lkZWJhciBzaG91bGQgYmUgdW5sb2NrZWQsIGlmIGxvY2tlZCAqL1xuICAgIH0gZWxzZSBpZiAodGhpcy5lbF8uZGF0YXNldC5tZFN0YXRlID09PSBcImxvY2tcIikge1xuICAgICAgdGhpcy5lbF8uZGF0YXNldC5tZFN0YXRlID0gXCJcIlxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCBsb2NrZWQgc3RhdGUgYW5kIGhlaWdodFxuICAgKi9cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5lbF8uZGF0YXNldC5tZFN0YXRlID0gXCJcIlxuICAgIHRoaXMuZWxfLnN0eWxlLmhlaWdodCA9IFwiXCJcbiAgICB0aGlzLmhlaWdodF8gPSAwXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9NYXRlcmlhbC9TaWRlYmFyL1Bvc2l0aW9uLmpzIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE3IE1hcnRpbiBEb25hdGggPG1hcnRpbi5kb25hdGhAc3F1aWRmdW5rLmNvbT5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0b1xuICogZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGVcbiAqIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vclxuICogc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTi1JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkdcbiAqIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1NcbiAqIElOIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgQWRhcHRlciBmcm9tIFwiLi9Tb3VyY2UvQWRhcHRlclwiXG5pbXBvcnQgUmVwb3NpdG9yeSBmcm9tIFwiLi9Tb3VyY2UvUmVwb3NpdG9yeVwiXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIE1vZHVsZVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIEFkYXB0ZXIsXG4gIFJlcG9zaXRvcnlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9NYXRlcmlhbC9Tb3VyY2UuanMiLCIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTcgTWFydGluIERvbmF0aCA8bWFydGluLmRvbmF0aEBzcXVpZGZ1bmsuY29tPlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvXG4gKiBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZVxuICogcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yXG4gKiBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OLUlORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuICogRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HU1xuICogSU4gVEhFIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCBHaXRIdWIgZnJvbSBcIi4vQWRhcHRlci9HaXRIdWJcIlxuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBNb2R1bGVcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuZXhwb3J0IGRlZmF1bHQge1xuICBHaXRIdWJcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9NYXRlcmlhbC9Tb3VyY2UvQWRhcHRlci5qcyIsIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxNyBNYXJ0aW4gRG9uYXRoIDxtYXJ0aW4uZG9uYXRoQHNxdWlkZnVuay5jb20+XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG9cbiAqIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlXG4gKiByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3JcbiAqIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04tSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HXG4gKiBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTXG4gKiBJTiBUSEUgU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IEFic3RyYWN0IGZyb20gXCIuL0Fic3RyYWN0XCJcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ2xhc3NcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2l0SHViIGV4dGVuZHMgQWJzdHJhY3Qge1xuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSByZXBvc2l0b3J5IGluZm9ybWF0aW9uIGZyb20gR2l0SHViXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKlxuICAgKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZV8gLSBOYW1lIG9mIHRoZSByZXBvc2l0b3J5XG4gICAqXG4gICAqIEBwYXJhbSB7KHN0cmluZ3xIVE1MQW5jaG9yRWxlbWVudCl9IGVsIC0gU2VsZWN0b3Igb3IgSFRNTCBlbGVtZW50XG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbCkge1xuICAgIHN1cGVyKGVsKVxuXG4gICAgLyogRXh0cmFjdCB1c2VyIChhbmQgcmVwb3NpdG9yeSBuYW1lKSBmcm9tIFVSTCwgYXMgd2UgaGF2ZSB0byBxdWVyeSBmb3IgYWxsXG4gICAgICAgcmVwb3NpdG9yaWVzLCB0byBvbWl0IDQwNCBlcnJvcnMgZm9yIHByaXZhdGUgcmVwb3NpdG9yaWVzICovXG4gICAgY29uc3QgbWF0Y2hlcyA9IC9eLitnaXRodWJcXC5jb21cXC8oW14vXSspXFwvPyhbXi9dKyk/LiokL1xuICAgICAgLmV4ZWModGhpcy5iYXNlXylcbiAgICBpZiAobWF0Y2hlcyAmJiBtYXRjaGVzLmxlbmd0aCA9PT0gMykge1xuICAgICAgY29uc3QgWywgdXNlciwgbmFtZV0gPSBtYXRjaGVzXG5cbiAgICAgIC8qIEluaXRpYWxpemUgYmFzZSBVUkwgYW5kIHJlcG9zaXRvcnkgbmFtZSAqL1xuICAgICAgdGhpcy5iYXNlXyA9IGBodHRwczovL2FwaS5naXRodWIuY29tL3VzZXJzLyR7dXNlcn0vcmVwb3NgXG4gICAgICB0aGlzLm5hbWVfID0gbmFtZVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaCByZWxldmFudCByZXBvc2l0b3J5IGluZm9ybWF0aW9uIGZyb20gR2l0SHViXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2U8QXJyYXk8c3RyaW5nPj59IFByb21pc2UgcmV0dXJuaW5nIGFuIGFycmF5IG9mIGZhY3RzXG4gICAqL1xuICBmZXRjaF8oKSB7XG4gICAgY29uc3QgcGFnaW5hdGUgPSAocGFnZSA9IDApID0+IHtcbiAgICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmJhc2VffT9wZXJfcGFnZT0zMCZwYWdlPSR7cGFnZX1gKVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgIGlmICghKGRhdGEgaW5zdGFuY2VvZiBBcnJheSkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yXG5cbiAgICAgICAgICAvKiBEaXNwbGF5IG51bWJlciBvZiBzdGFycyBhbmQgZm9ya3MsIGlmIHJlcG9zaXRvcnkgaXMgZ2l2ZW4gKi9cbiAgICAgICAgICBpZiAodGhpcy5uYW1lXykge1xuICAgICAgICAgICAgY29uc3QgcmVwbyA9IGRhdGEuZmluZChpdGVtID0+IGl0ZW0ubmFtZSA9PT0gdGhpcy5uYW1lXylcbiAgICAgICAgICAgIGlmICghcmVwbyAmJiBkYXRhLmxlbmd0aCA9PT0gMzApXG4gICAgICAgICAgICAgIHJldHVybiBwYWdpbmF0ZShwYWdlICsgMSlcblxuICAgICAgICAgICAgLyogSWYgd2UgZm91bmQgYSByZXBvLCBleHRyYWN0IHRoZSBmYWN0cyAqL1xuICAgICAgICAgICAgcmV0dXJuIHJlcG9cbiAgICAgICAgICAgICAgPyBbXG4gICAgICAgICAgICAgICAgYCR7dGhpcy5mb3JtYXRfKHJlcG8uc3RhcmdhemVyc19jb3VudCl9IFN0YXJzYCxcbiAgICAgICAgICAgICAgICBgJHt0aGlzLmZvcm1hdF8ocmVwby5mb3Jrc19jb3VudCl9IEZvcmtzYFxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIDogW11cblxuICAgICAgICAgIC8qIERpc3BsYXkgbnVtYmVyIG9mIHJlcG9zaXRvcmllcywgb3RoZXJ3aXNlICovXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgIGAke2RhdGEubGVuZ3RofSBSZXBvc2l0b3JpZXNgXG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qIFBhZ2luYXRlIHRocm91Z2ggcmVwb3MgKi9cbiAgICByZXR1cm4gcGFnaW5hdGUoKVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvTWF0ZXJpYWwvU291cmNlL0FkYXB0ZXIvR2l0SHViLmpzIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE3IE1hcnRpbiBEb25hdGggPG1hcnRpbi5kb25hdGhAc3F1aWRmdW5rLmNvbT5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0b1xuICogZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGVcbiAqIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vclxuICogc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTi1JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkdcbiAqIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1NcbiAqIElOIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgQ29va2llcyBmcm9tIFwianMtY29va2llXCJcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ2xhc3NcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWJzdHJhY3Qge1xuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSByZXBvc2l0b3J5IGluZm9ybWF0aW9uXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKlxuICAgKiBAcHJvcGVydHkge0hUTUxBbmNob3JFbGVtZW50fSBlbF8gLSBMaW5rIHRvIHJlcG9zaXRvcnlcbiAgICogQHByb3BlcnR5IHtzdHJpbmd9IGJhc2VfIC0gQVBJIGJhc2UgVVJMXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzYWx0XyAtIFVuaXF1ZSBpZGVudGlmaWVyXG4gICAqXG4gICAqIEBwYXJhbSB7KHN0cmluZ3xIVE1MQW5jaG9yRWxlbWVudCl9IGVsIC0gU2VsZWN0b3Igb3IgSFRNTCBlbGVtZW50XG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbCkge1xuICAgIGNvbnN0IHJlZiA9ICh0eXBlb2YgZWwgPT09IFwic3RyaW5nXCIpXG4gICAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpXG4gICAgICA6IGVsXG4gICAgaWYgKCEocmVmIGluc3RhbmNlb2YgSFRNTEFuY2hvckVsZW1lbnQpKVxuICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yXG4gICAgdGhpcy5lbF8gPSByZWZcblxuICAgIC8qIFJldHJpZXZlIGJhc2UgVVJMICovXG4gICAgdGhpcy5iYXNlXyA9IHRoaXMuZWxfLmhyZWZcbiAgICB0aGlzLnNhbHRfID0gdGhpcy5oYXNoXyh0aGlzLmJhc2VfKVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlIGRhdGEgZnJvbSBDb29raWUgb3IgZmV0Y2ggZnJvbSByZXNwZWN0aXZlIEFQSVxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPEFycmF5PHN0cmluZz4+fSBQcm9taXNlIHRoYXQgcmV0dXJucyBhbiBhcnJheSBvZiBmYWN0c1xuICAgKi9cbiAgZmV0Y2goKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgY29uc3QgY2FjaGVkID0gQ29va2llcy5nZXRKU09OKGAke3RoaXMuc2FsdF99LmNhY2hlLXNvdXJjZWApXG4gICAgICBpZiAodHlwZW9mIGNhY2hlZCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXNvbHZlKGNhY2hlZClcblxuICAgICAgLyogSWYgdGhlIGRhdGEgaXMgbm90IGNhY2hlZCBpbiBhIGNvb2tpZSwgaW52b2tlIGZldGNoIGFuZCBzZXRcbiAgICAgICAgIGEgY29va2llIHRoYXQgYXV0b21hdGljYWxseSBleHBpcmVzIGluIDE1IG1pbnV0ZXMgKi9cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZmV0Y2hfKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICBDb29raWVzLnNldChgJHt0aGlzLnNhbHRffS5jYWNoZS1zb3VyY2VgLCBkYXRhLCB7IGV4cGlyZXM6IDEgLyA5NiB9KVxuICAgICAgICAgIHJlc29sdmUoZGF0YSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEFic3RyYWN0IHByaXZhdGUgZnVuY3Rpb24gdGhhdCBmZXRjaGVzIHJlbGV2YW50IHJlcG9zaXRvcnkgaW5mb3JtYXRpb25cbiAgICpcbiAgICogQGFic3RyYWN0XG4gICAqL1xuICBmZXRjaF8oKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZmV0Y2hfKCk6IE5vdCBpbXBsZW1lbnRlZFwiKVxuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1hdCBhIG51bWJlciB3aXRoIHN1ZmZpeFxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyIC0gTnVtYmVyIHRvIGZvcm1hdFxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IEZvcm1hdHRlZCBudW1iZXJcbiAgICovXG4gIGZvcm1hdF8obnVtYmVyKSB7XG4gICAgaWYgKG51bWJlciA+IDEwMDAwKVxuICAgICAgcmV0dXJuIGAkeyhudW1iZXIgLyAxMDAwKS50b0ZpeGVkKDApfWtgXG4gICAgZWxzZSBpZiAobnVtYmVyID4gMTAwMClcbiAgICAgIHJldHVybiBgJHsobnVtYmVyIC8gMTAwMCkudG9GaXhlZCgxKX1rYFxuICAgIHJldHVybiBgJHtudW1iZXJ9YFxuICB9XG5cbiAgLyoqXG4gICAqIFNpbXBsZSBoYXNoIGZ1bmN0aW9uXG4gICAqXG4gICAqIFRha2VuIGZyb20gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNzYxNjQ4NC8xMDY1NTg0XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBJbnB1dCBzdHJpbmdcbiAgICogQHJldHVybiB7bnVtYmVyfSBIYXNoZWQgc3RyaW5nXG4gICAqL1xuICBoYXNoXyhzdHIpIHtcbiAgICBsZXQgaGFzaCA9IDBcbiAgICBpZiAoc3RyLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGhhc2hcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc3RyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBoYXNoICA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgc3RyLmNoYXJDb2RlQXQoaSlcbiAgICAgIGhhc2ggfD0gMCAvLyBDb252ZXJ0IHRvIDMyYml0IGludGVnZXJcbiAgICB9XG4gICAgcmV0dXJuIGhhc2hcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01hdGVyaWFsL1NvdXJjZS9BZGFwdGVyL0Fic3RyYWN0LmpzIiwiLyohXG4gKiBKYXZhU2NyaXB0IENvb2tpZSB2Mi4yLjBcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9qcy1jb29raWUvanMtY29va2llXG4gKlxuICogQ29weXJpZ2h0IDIwMDYsIDIwMTUgS2xhdXMgSGFydGwgJiBGYWduZXIgQnJhY2tcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG47KGZ1bmN0aW9uIChmYWN0b3J5KSB7XG5cdHZhciByZWdpc3RlcmVkSW5Nb2R1bGVMb2FkZXIgPSBmYWxzZTtcblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXHRcdGRlZmluZShmYWN0b3J5KTtcblx0XHRyZWdpc3RlcmVkSW5Nb2R1bGVMb2FkZXIgPSB0cnVlO1xuXHR9XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0XHRyZWdpc3RlcmVkSW5Nb2R1bGVMb2FkZXIgPSB0cnVlO1xuXHR9XG5cdGlmICghcmVnaXN0ZXJlZEluTW9kdWxlTG9hZGVyKSB7XG5cdFx0dmFyIE9sZENvb2tpZXMgPSB3aW5kb3cuQ29va2llcztcblx0XHR2YXIgYXBpID0gd2luZG93LkNvb2tpZXMgPSBmYWN0b3J5KCk7XG5cdFx0YXBpLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR3aW5kb3cuQ29va2llcyA9IE9sZENvb2tpZXM7XG5cdFx0XHRyZXR1cm4gYXBpO1xuXHRcdH07XG5cdH1cbn0oZnVuY3Rpb24gKCkge1xuXHRmdW5jdGlvbiBleHRlbmQgKCkge1xuXHRcdHZhciBpID0gMDtcblx0XHR2YXIgcmVzdWx0ID0ge307XG5cdFx0Zm9yICg7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhdHRyaWJ1dGVzID0gYXJndW1lbnRzWyBpIF07XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gYXR0cmlidXRlcykge1xuXHRcdFx0XHRyZXN1bHRba2V5XSA9IGF0dHJpYnV0ZXNba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGZ1bmN0aW9uIGluaXQgKGNvbnZlcnRlcikge1xuXHRcdGZ1bmN0aW9uIGFwaSAoa2V5LCB2YWx1ZSwgYXR0cmlidXRlcykge1xuXHRcdFx0dmFyIHJlc3VsdDtcblx0XHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gV3JpdGVcblxuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdGF0dHJpYnV0ZXMgPSBleHRlbmQoe1xuXHRcdFx0XHRcdHBhdGg6ICcvJ1xuXHRcdFx0XHR9LCBhcGkuZGVmYXVsdHMsIGF0dHJpYnV0ZXMpO1xuXG5cdFx0XHRcdGlmICh0eXBlb2YgYXR0cmlidXRlcy5leHBpcmVzID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRcdHZhciBleHBpcmVzID0gbmV3IERhdGUoKTtcblx0XHRcdFx0XHRleHBpcmVzLnNldE1pbGxpc2Vjb25kcyhleHBpcmVzLmdldE1pbGxpc2Vjb25kcygpICsgYXR0cmlidXRlcy5leHBpcmVzICogODY0ZSs1KTtcblx0XHRcdFx0XHRhdHRyaWJ1dGVzLmV4cGlyZXMgPSBleHBpcmVzO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gV2UncmUgdXNpbmcgXCJleHBpcmVzXCIgYmVjYXVzZSBcIm1heC1hZ2VcIiBpcyBub3Qgc3VwcG9ydGVkIGJ5IElFXG5cdFx0XHRcdGF0dHJpYnV0ZXMuZXhwaXJlcyA9IGF0dHJpYnV0ZXMuZXhwaXJlcyA/IGF0dHJpYnV0ZXMuZXhwaXJlcy50b1VUQ1N0cmluZygpIDogJyc7XG5cblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRyZXN1bHQgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG5cdFx0XHRcdFx0aWYgKC9eW1xce1xcW10vLnRlc3QocmVzdWx0KSkge1xuXHRcdFx0XHRcdFx0dmFsdWUgPSByZXN1bHQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGNhdGNoIChlKSB7fVxuXG5cdFx0XHRcdGlmICghY29udmVydGVyLndyaXRlKSB7XG5cdFx0XHRcdFx0dmFsdWUgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKHZhbHVlKSlcblx0XHRcdFx0XHRcdC5yZXBsYWNlKC8lKDIzfDI0fDI2fDJCfDNBfDNDfDNFfDNEfDJGfDNGfDQwfDVCfDVEfDVFfDYwfDdCfDdEfDdDKS9nLCBkZWNvZGVVUklDb21wb25lbnQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhbHVlID0gY29udmVydGVyLndyaXRlKHZhbHVlLCBrZXkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0a2V5ID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhrZXkpKTtcblx0XHRcdFx0a2V5ID0ga2V5LnJlcGxhY2UoLyUoMjN8MjR8MjZ8MkJ8NUV8NjB8N0MpL2csIGRlY29kZVVSSUNvbXBvbmVudCk7XG5cdFx0XHRcdGtleSA9IGtleS5yZXBsYWNlKC9bXFwoXFwpXS9nLCBlc2NhcGUpO1xuXG5cdFx0XHRcdHZhciBzdHJpbmdpZmllZEF0dHJpYnV0ZXMgPSAnJztcblxuXHRcdFx0XHRmb3IgKHZhciBhdHRyaWJ1dGVOYW1lIGluIGF0dHJpYnV0ZXMpIHtcblx0XHRcdFx0XHRpZiAoIWF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV0pIHtcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRzdHJpbmdpZmllZEF0dHJpYnV0ZXMgKz0gJzsgJyArIGF0dHJpYnV0ZU5hbWU7XG5cdFx0XHRcdFx0aWYgKGF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV0gPT09IHRydWUpIHtcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRzdHJpbmdpZmllZEF0dHJpYnV0ZXMgKz0gJz0nICsgYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gKGRvY3VtZW50LmNvb2tpZSA9IGtleSArICc9JyArIHZhbHVlICsgc3RyaW5naWZpZWRBdHRyaWJ1dGVzKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmVhZFxuXG5cdFx0XHRpZiAoIWtleSkge1xuXHRcdFx0XHRyZXN1bHQgPSB7fTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gVG8gcHJldmVudCB0aGUgZm9yIGxvb3AgaW4gdGhlIGZpcnN0IHBsYWNlIGFzc2lnbiBhbiBlbXB0eSBhcnJheVxuXHRcdFx0Ly8gaW4gY2FzZSB0aGVyZSBhcmUgbm8gY29va2llcyBhdCBhbGwuIEFsc28gcHJldmVudHMgb2RkIHJlc3VsdCB3aGVuXG5cdFx0XHQvLyBjYWxsaW5nIFwiZ2V0KClcIlxuXHRcdFx0dmFyIGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUgPyBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsgJykgOiBbXTtcblx0XHRcdHZhciByZGVjb2RlID0gLyglWzAtOUEtWl17Mn0pKy9nO1xuXHRcdFx0dmFyIGkgPSAwO1xuXG5cdFx0XHRmb3IgKDsgaSA8IGNvb2tpZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIHBhcnRzID0gY29va2llc1tpXS5zcGxpdCgnPScpO1xuXHRcdFx0XHR2YXIgY29va2llID0gcGFydHMuc2xpY2UoMSkuam9pbignPScpO1xuXG5cdFx0XHRcdGlmICghdGhpcy5qc29uICYmIGNvb2tpZS5jaGFyQXQoMCkgPT09ICdcIicpIHtcblx0XHRcdFx0XHRjb29raWUgPSBjb29raWUuc2xpY2UoMSwgLTEpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHR2YXIgbmFtZSA9IHBhcnRzWzBdLnJlcGxhY2UocmRlY29kZSwgZGVjb2RlVVJJQ29tcG9uZW50KTtcblx0XHRcdFx0XHRjb29raWUgPSBjb252ZXJ0ZXIucmVhZCA/XG5cdFx0XHRcdFx0XHRjb252ZXJ0ZXIucmVhZChjb29raWUsIG5hbWUpIDogY29udmVydGVyKGNvb2tpZSwgbmFtZSkgfHxcblx0XHRcdFx0XHRcdGNvb2tpZS5yZXBsYWNlKHJkZWNvZGUsIGRlY29kZVVSSUNvbXBvbmVudCk7XG5cblx0XHRcdFx0XHRpZiAodGhpcy5qc29uKSB7XG5cdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRjb29raWUgPSBKU09OLnBhcnNlKGNvb2tpZSk7XG5cdFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChrZXkgPT09IG5hbWUpIHtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IGNvb2tpZTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICgha2V5KSB7XG5cdFx0XHRcdFx0XHRyZXN1bHRbbmFtZV0gPSBjb29raWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGNhdGNoIChlKSB7fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXHRcdGFwaS5zZXQgPSBhcGk7XG5cdFx0YXBpLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdHJldHVybiBhcGkuY2FsbChhcGksIGtleSk7XG5cdFx0fTtcblx0XHRhcGkuZ2V0SlNPTiA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBhcGkuYXBwbHkoe1xuXHRcdFx0XHRqc29uOiB0cnVlXG5cdFx0XHR9LCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuXHRcdH07XG5cdFx0YXBpLmRlZmF1bHRzID0ge307XG5cblx0XHRhcGkucmVtb3ZlID0gZnVuY3Rpb24gKGtleSwgYXR0cmlidXRlcykge1xuXHRcdFx0YXBpKGtleSwgJycsIGV4dGVuZChhdHRyaWJ1dGVzLCB7XG5cdFx0XHRcdGV4cGlyZXM6IC0xXG5cdFx0XHR9KSk7XG5cdFx0fTtcblxuXHRcdGFwaS53aXRoQ29udmVydGVyID0gaW5pdDtcblxuXHRcdHJldHVybiBhcGk7XG5cdH1cblxuXHRyZXR1cm4gaW5pdChmdW5jdGlvbiAoKSB7fSk7XG59KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9qcy1jb29raWUvc3JjL2pzLmNvb2tpZS5qc1xuLy8gbW9kdWxlIGlkID0gNDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE3IE1hcnRpbiBEb25hdGggPG1hcnRpbi5kb25hdGhAc3F1aWRmdW5rLmNvbT5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0b1xuICogZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGVcbiAqIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vclxuICogc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTi1JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkdcbiAqIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1NcbiAqIElOIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDbGFzc1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXBvc2l0b3J5IHtcblxuICAvKipcbiAgICogUmVuZGVyIHJlcG9zaXRvcnkgaW5mb3JtYXRpb25cbiAgICpcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IGVsXyAtIFJlcG9zaXRvcnkgaW5mb3JtYXRpb25cbiAgICpcbiAgICogQHBhcmFtIHsoc3RyaW5nfEhUTUxFbGVtZW50KX0gZWwgLSBTZWxlY3RvciBvciBIVE1MIGVsZW1lbnRcbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsKSB7XG4gICAgY29uc3QgcmVmID0gKHR5cGVvZiBlbCA9PT0gXCJzdHJpbmdcIilcbiAgICAgID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbClcbiAgICAgIDogZWxcbiAgICBpZiAoIShyZWYgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpXG4gICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3JcbiAgICB0aGlzLmVsXyA9IHJlZlxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIHJlcG9zaXRvcnlcbiAgICpcbiAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBmYWN0cyAtIEZhY3RzIHRvIGJlIHJlbmRlcmVkXG4gICAqL1xuICBpbml0aWFsaXplKGZhY3RzKSB7XG4gICAgaWYgKGZhY3RzLmxlbmd0aCAmJiB0aGlzLmVsXy5jaGlsZHJlbi5sZW5ndGgpXG4gICAgICB0aGlzLmVsXy5jaGlsZHJlblt0aGlzLmVsXy5jaGlsZHJlbi5sZW5ndGggLSAxXS5hcHBlbmRDaGlsZChcbiAgICAgICAgPHVsIGNsYXNzPVwibWQtc291cmNlX19mYWN0c1wiPlxuICAgICAgICAgIHtmYWN0cy5tYXAoZmFjdCA9PiA8bGkgY2xhc3M9XCJtZC1zb3VyY2VfX2ZhY3RcIj57ZmFjdH08L2xpPil9XG4gICAgICAgIDwvdWw+XG4gICAgICApXG5cbiAgICAvKiBGaW5pc2ggcmVuZGVyaW5nIHdpdGggYW5pbWF0aW9uICovXG4gICAgdGhpcy5lbF8uZGF0YXNldC5tZFN0YXRlID0gXCJkb25lXCJcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01hdGVyaWFsL1NvdXJjZS9SZXBvc2l0b3J5LmpzeCIsIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxNyBNYXJ0aW4gRG9uYXRoIDxtYXJ0aW4uZG9uYXRoQHNxdWlkZnVuay5jb20+XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG9cbiAqIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlXG4gKiByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3JcbiAqIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT04tSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HXG4gKiBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTXG4gKiBJTiBUSEUgU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IFRvZ2dsZSBmcm9tIFwiLi9UYWJzL1RvZ2dsZVwiXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIE1vZHVsZVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIFRvZ2dsZVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL01hdGVyaWFsL1RhYnMuanMiLCIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTcgTWFydGluIERvbmF0aCA8bWFydGluLmRvbmF0aEBzcXVpZGZ1bmsuY29tPlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvXG4gKiBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZVxuICogcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yXG4gKiBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OLUlORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuICogRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HU1xuICogSU4gVEhFIFNPRlRXQVJFLlxuICovXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENsYXNzXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZ2dsZSB7XG5cbiAgLyoqXG4gICAqIFRvZ2dsZSB0YWJzIHZpc2liaWxpdHkgZGVwZW5kaW5nIG9uIHBhZ2UgeS1vZmZzZXRcbiAgICpcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IGVsXyAtIENvbnRlbnQgY29udGFpbmVyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBvZmZzZXRfIC0gVG9nZ2xlIHBhZ2UteSBvZmZzZXRcbiAgICogQHByb3BlcnR5IHtib29sZWFufSBhY3RpdmVfIC0gVGFicyB2aXNpYmlsaXR5XG4gICAqXG4gICAqIEBwYXJhbSB7KHN0cmluZ3xIVE1MRWxlbWVudCl9IGVsIC0gU2VsZWN0b3Igb3IgSFRNTCBlbGVtZW50XG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbCkge1xuICAgIGNvbnN0IHJlZiA9ICh0eXBlb2YgZWwgPT09IFwic3RyaW5nXCIpXG4gICAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpXG4gICAgICA6IGVsXG4gICAgaWYgKCEocmVmIGluc3RhbmNlb2YgTm9kZSkpXG4gICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3JcbiAgICB0aGlzLmVsXyA9IHJlZlxuXG4gICAgLyogSW5pdGlhbGl6ZSBvZmZzZXQgYW5kIHN0YXRlICovXG4gICAgdGhpcy5hY3RpdmVfID0gZmFsc2VcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdmlzaWJpbGl0eVxuICAgKi9cbiAgdXBkYXRlKCkge1xuICAgIGNvbnN0IGFjdGl2ZSA9IHdpbmRvdy5wYWdlWU9mZnNldCA+PVxuICAgICAgdGhpcy5lbF8uY2hpbGRyZW5bMF0ub2Zmc2V0VG9wICsgKDUgLSA0OCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBxdWljayBoYWNrIHRvIGVuYWJsZSBzYW1lIGhhbmRsaW5nIGZvciBoZXJvXG4gICAgaWYgKGFjdGl2ZSAhPT0gdGhpcy5hY3RpdmVfKVxuICAgICAgdGhpcy5lbF8uZGF0YXNldC5tZFN0YXRlID0gKHRoaXMuYWN0aXZlXyA9IGFjdGl2ZSkgPyBcImhpZGRlblwiIDogXCJcIlxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHZpc2liaWxpdHlcbiAgICovXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuZWxfLmRhdGFzZXQubWRTdGF0ZSA9IFwiXCJcbiAgICB0aGlzLmFjdGl2ZV8gPSBmYWxzZVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvTWF0ZXJpYWwvVGFicy9Ub2dnbGUuanMiXSwic291cmNlUm9vdCI6IiJ9