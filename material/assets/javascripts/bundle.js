"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __objRest = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from2, except, desc) => {
    if (from2 && typeof from2 === "object" || typeof from2 === "function") {
      for (let key of __getOwnPropNames(from2))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc(from2, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/focus-visible/dist/focus-visible.js
  var require_focus_visible = __commonJS({
    "node_modules/focus-visible/dist/focus-visible.js"(exports, module) {
      (function(global2, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? factory() : typeof define === "function" && define.amd ? define(factory) : factory();
      })(exports, function() {
        "use strict";
        function applyFocusVisiblePolyfill(scope) {
          var hadKeyboardEvent = true;
          var hadFocusVisibleRecently = false;
          var hadFocusVisibleRecentlyTimeout = null;
          var inputTypesAllowlist = {
            text: true,
            search: true,
            url: true,
            tel: true,
            email: true,
            password: true,
            number: true,
            date: true,
            month: true,
            week: true,
            time: true,
            datetime: true,
            "datetime-local": true
          };
          function isValidFocusTarget(el) {
            if (el && el !== document && el.nodeName !== "HTML" && el.nodeName !== "BODY" && "classList" in el && "contains" in el.classList) {
              return true;
            }
            return false;
          }
          function focusTriggersKeyboardModality(el) {
            var type = el.type;
            var tagName = el.tagName;
            if (tagName === "INPUT" && inputTypesAllowlist[type] && !el.readOnly) {
              return true;
            }
            if (tagName === "TEXTAREA" && !el.readOnly) {
              return true;
            }
            if (el.isContentEditable) {
              return true;
            }
            return false;
          }
          function addFocusVisibleClass(el) {
            if (el.classList.contains("focus-visible")) {
              return;
            }
            el.classList.add("focus-visible");
            el.setAttribute("data-focus-visible-added", "");
          }
          function removeFocusVisibleClass(el) {
            if (!el.hasAttribute("data-focus-visible-added")) {
              return;
            }
            el.classList.remove("focus-visible");
            el.removeAttribute("data-focus-visible-added");
          }
          function onKeyDown(e) {
            if (e.metaKey || e.altKey || e.ctrlKey) {
              return;
            }
            if (isValidFocusTarget(scope.activeElement)) {
              addFocusVisibleClass(scope.activeElement);
            }
            hadKeyboardEvent = true;
          }
          function onPointerDown(e) {
            hadKeyboardEvent = false;
          }
          function onFocus(e) {
            if (!isValidFocusTarget(e.target)) {
              return;
            }
            if (hadKeyboardEvent || focusTriggersKeyboardModality(e.target)) {
              addFocusVisibleClass(e.target);
            }
          }
          function onBlur(e) {
            if (!isValidFocusTarget(e.target)) {
              return;
            }
            if (e.target.classList.contains("focus-visible") || e.target.hasAttribute("data-focus-visible-added")) {
              hadFocusVisibleRecently = true;
              window.clearTimeout(hadFocusVisibleRecentlyTimeout);
              hadFocusVisibleRecentlyTimeout = window.setTimeout(function() {
                hadFocusVisibleRecently = false;
              }, 100);
              removeFocusVisibleClass(e.target);
            }
          }
          function onVisibilityChange(e) {
            if (document.visibilityState === "hidden") {
              if (hadFocusVisibleRecently) {
                hadKeyboardEvent = true;
              }
              addInitialPointerMoveListeners();
            }
          }
          function addInitialPointerMoveListeners() {
            document.addEventListener("mousemove", onInitialPointerMove);
            document.addEventListener("mousedown", onInitialPointerMove);
            document.addEventListener("mouseup", onInitialPointerMove);
            document.addEventListener("pointermove", onInitialPointerMove);
            document.addEventListener("pointerdown", onInitialPointerMove);
            document.addEventListener("pointerup", onInitialPointerMove);
            document.addEventListener("touchmove", onInitialPointerMove);
            document.addEventListener("touchstart", onInitialPointerMove);
            document.addEventListener("touchend", onInitialPointerMove);
          }
          function removeInitialPointerMoveListeners() {
            document.removeEventListener("mousemove", onInitialPointerMove);
            document.removeEventListener("mousedown", onInitialPointerMove);
            document.removeEventListener("mouseup", onInitialPointerMove);
            document.removeEventListener("pointermove", onInitialPointerMove);
            document.removeEventListener("pointerdown", onInitialPointerMove);
            document.removeEventListener("pointerup", onInitialPointerMove);
            document.removeEventListener("touchmove", onInitialPointerMove);
            document.removeEventListener("touchstart", onInitialPointerMove);
            document.removeEventListener("touchend", onInitialPointerMove);
          }
          function onInitialPointerMove(e) {
            if (e.target.nodeName && e.target.nodeName.toLowerCase() === "html") {
              return;
            }
            hadKeyboardEvent = false;
            removeInitialPointerMoveListeners();
          }
          document.addEventListener("keydown", onKeyDown, true);
          document.addEventListener("mousedown", onPointerDown, true);
          document.addEventListener("pointerdown", onPointerDown, true);
          document.addEventListener("touchstart", onPointerDown, true);
          document.addEventListener("visibilitychange", onVisibilityChange, true);
          addInitialPointerMoveListeners();
          scope.addEventListener("focus", onFocus, true);
          scope.addEventListener("blur", onBlur, true);
          if (scope.nodeType === Node.DOCUMENT_FRAGMENT_NODE && scope.host) {
            scope.host.setAttribute("data-js-focus-visible", "");
          } else if (scope.nodeType === Node.DOCUMENT_NODE) {
            document.documentElement.classList.add("js-focus-visible");
            document.documentElement.setAttribute("data-js-focus-visible", "");
          }
        }
        if (typeof window !== "undefined" && typeof document !== "undefined") {
          window.applyFocusVisiblePolyfill = applyFocusVisiblePolyfill;
          var event;
          try {
            event = new CustomEvent("focus-visible-polyfill-ready");
          } catch (error) {
            event = document.createEvent("CustomEvent");
            event.initCustomEvent("focus-visible-polyfill-ready", false, false, {});
          }
          window.dispatchEvent(event);
        }
        if (typeof document !== "undefined") {
          applyFocusVisiblePolyfill(document);
        }
      });
    }
  });

  // node_modules/url-polyfill/url-polyfill.js
  var require_url_polyfill = __commonJS({
    "node_modules/url-polyfill/url-polyfill.js"(exports) {
      (function(global2) {
        var checkIfIteratorIsSupported = function() {
          try {
            return !!Symbol.iterator;
          } catch (error) {
            return false;
          }
        };
        var iteratorSupported = checkIfIteratorIsSupported();
        var createIterator = function(items) {
          var iterator2 = {
            next: function() {
              var value = items.shift();
              return { done: value === void 0, value };
            }
          };
          if (iteratorSupported) {
            iterator2[Symbol.iterator] = function() {
              return iterator2;
            };
          }
          return iterator2;
        };
        var serializeParam = function(value) {
          return encodeURIComponent(value).replace(/%20/g, "+");
        };
        var deserializeParam = function(value) {
          return decodeURIComponent(String(value).replace(/\+/g, " "));
        };
        var polyfillURLSearchParams = function() {
          var URLSearchParams = function(searchString) {
            Object.defineProperty(this, "_entries", { writable: true, value: {} });
            var typeofSearchString = typeof searchString;
            if (typeofSearchString === "undefined") {
            } else if (typeofSearchString === "string") {
              if (searchString !== "") {
                this._fromString(searchString);
              }
            } else if (searchString instanceof URLSearchParams) {
              var _this = this;
              searchString.forEach(function(value, name) {
                _this.append(name, value);
              });
            } else if (searchString !== null && typeofSearchString === "object") {
              if (Object.prototype.toString.call(searchString) === "[object Array]") {
                for (var i = 0; i < searchString.length; i++) {
                  var entry = searchString[i];
                  if (Object.prototype.toString.call(entry) === "[object Array]" || entry.length !== 2) {
                    this.append(entry[0], entry[1]);
                  } else {
                    throw new TypeError("Expected [string, any] as entry at index " + i + " of URLSearchParams's input");
                  }
                }
              } else {
                for (var key in searchString) {
                  if (searchString.hasOwnProperty(key)) {
                    this.append(key, searchString[key]);
                  }
                }
              }
            } else {
              throw new TypeError("Unsupported input's type for URLSearchParams");
            }
          };
          var proto2 = URLSearchParams.prototype;
          proto2.append = function(name, value) {
            if (name in this._entries) {
              this._entries[name].push(String(value));
            } else {
              this._entries[name] = [String(value)];
            }
          };
          proto2.delete = function(name) {
            delete this._entries[name];
          };
          proto2.get = function(name) {
            return name in this._entries ? this._entries[name][0] : null;
          };
          proto2.getAll = function(name) {
            return name in this._entries ? this._entries[name].slice(0) : [];
          };
          proto2.has = function(name) {
            return name in this._entries;
          };
          proto2.set = function(name, value) {
            this._entries[name] = [String(value)];
          };
          proto2.forEach = function(callback, thisArg) {
            var entries;
            for (var name in this._entries) {
              if (this._entries.hasOwnProperty(name)) {
                entries = this._entries[name];
                for (var i = 0; i < entries.length; i++) {
                  callback.call(thisArg, entries[i], name, this);
                }
              }
            }
          };
          proto2.keys = function() {
            var items = [];
            this.forEach(function(value, name) {
              items.push(name);
            });
            return createIterator(items);
          };
          proto2.values = function() {
            var items = [];
            this.forEach(function(value) {
              items.push(value);
            });
            return createIterator(items);
          };
          proto2.entries = function() {
            var items = [];
            this.forEach(function(value, name) {
              items.push([name, value]);
            });
            return createIterator(items);
          };
          if (iteratorSupported) {
            proto2[Symbol.iterator] = proto2.entries;
          }
          proto2.toString = function() {
            var searchArray = [];
            this.forEach(function(value, name) {
              searchArray.push(serializeParam(name) + "=" + serializeParam(value));
            });
            return searchArray.join("&");
          };
          global2.URLSearchParams = URLSearchParams;
        };
        var checkIfURLSearchParamsSupported = function() {
          try {
            var URLSearchParams = global2.URLSearchParams;
            return new URLSearchParams("?a=1").toString() === "a=1" && typeof URLSearchParams.prototype.set === "function" && typeof URLSearchParams.prototype.entries === "function";
          } catch (e) {
            return false;
          }
        };
        if (!checkIfURLSearchParamsSupported()) {
          polyfillURLSearchParams();
        }
        var proto = global2.URLSearchParams.prototype;
        if (typeof proto.sort !== "function") {
          proto.sort = function() {
            var _this = this;
            var items = [];
            this.forEach(function(value, name) {
              items.push([name, value]);
              if (!_this._entries) {
                _this.delete(name);
              }
            });
            items.sort(function(a, b) {
              if (a[0] < b[0]) {
                return -1;
              } else if (a[0] > b[0]) {
                return 1;
              } else {
                return 0;
              }
            });
            if (_this._entries) {
              _this._entries = {};
            }
            for (var i = 0; i < items.length; i++) {
              this.append(items[i][0], items[i][1]);
            }
          };
        }
        if (typeof proto._fromString !== "function") {
          Object.defineProperty(proto, "_fromString", {
            enumerable: false,
            configurable: false,
            writable: false,
            value: function(searchString) {
              if (this._entries) {
                this._entries = {};
              } else {
                var keys = [];
                this.forEach(function(value, name) {
                  keys.push(name);
                });
                for (var i = 0; i < keys.length; i++) {
                  this.delete(keys[i]);
                }
              }
              searchString = searchString.replace(/^\?/, "");
              var attributes = searchString.split("&");
              var attribute;
              for (var i = 0; i < attributes.length; i++) {
                attribute = attributes[i].split("=");
                this.append(
                  deserializeParam(attribute[0]),
                  attribute.length > 1 ? deserializeParam(attribute[1]) : ""
                );
              }
            }
          });
        }
      })(
        typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : exports
      );
      (function(global2) {
        var checkIfURLIsSupported = function() {
          try {
            var u = new global2.URL("b", "http://a");
            u.pathname = "c d";
            return u.href === "http://a/c%20d" && u.searchParams;
          } catch (e) {
            return false;
          }
        };
        var polyfillURL = function() {
          var _URL = global2.URL;
          var URL2 = function(url, base) {
            if (typeof url !== "string")
              url = String(url);
            if (base && typeof base !== "string")
              base = String(base);
            var doc = document, baseElement;
            if (base && (global2.location === void 0 || base !== global2.location.href)) {
              base = base.toLowerCase();
              doc = document.implementation.createHTMLDocument("");
              baseElement = doc.createElement("base");
              baseElement.href = base;
              doc.head.appendChild(baseElement);
              try {
                if (baseElement.href.indexOf(base) !== 0)
                  throw new Error(baseElement.href);
              } catch (err) {
                throw new Error("URL unable to set base " + base + " due to " + err);
              }
            }
            var anchorElement = doc.createElement("a");
            anchorElement.href = url;
            if (baseElement) {
              doc.body.appendChild(anchorElement);
              anchorElement.href = anchorElement.href;
            }
            var inputElement = doc.createElement("input");
            inputElement.type = "url";
            inputElement.value = url;
            if (anchorElement.protocol === ":" || !/:/.test(anchorElement.href) || !inputElement.checkValidity() && !base) {
              throw new TypeError("Invalid URL");
            }
            Object.defineProperty(this, "_anchorElement", {
              value: anchorElement
            });
            var searchParams = new global2.URLSearchParams(this.search);
            var enableSearchUpdate = true;
            var enableSearchParamsUpdate = true;
            var _this = this;
            ["append", "delete", "set"].forEach(function(methodName) {
              var method = searchParams[methodName];
              searchParams[methodName] = function() {
                method.apply(searchParams, arguments);
                if (enableSearchUpdate) {
                  enableSearchParamsUpdate = false;
                  _this.search = searchParams.toString();
                  enableSearchParamsUpdate = true;
                }
              };
            });
            Object.defineProperty(this, "searchParams", {
              value: searchParams,
              enumerable: true
            });
            var search = void 0;
            Object.defineProperty(this, "_updateSearchParams", {
              enumerable: false,
              configurable: false,
              writable: false,
              value: function() {
                if (this.search !== search) {
                  search = this.search;
                  if (enableSearchParamsUpdate) {
                    enableSearchUpdate = false;
                    this.searchParams._fromString(this.search);
                    enableSearchUpdate = true;
                  }
                }
              }
            });
          };
          var proto = URL2.prototype;
          var linkURLWithAnchorAttribute = function(attributeName) {
            Object.defineProperty(proto, attributeName, {
              get: function() {
                return this._anchorElement[attributeName];
              },
              set: function(value) {
                this._anchorElement[attributeName] = value;
              },
              enumerable: true
            });
          };
          ["hash", "host", "hostname", "port", "protocol"].forEach(function(attributeName) {
            linkURLWithAnchorAttribute(attributeName);
          });
          Object.defineProperty(proto, "search", {
            get: function() {
              return this._anchorElement["search"];
            },
            set: function(value) {
              this._anchorElement["search"] = value;
              this._updateSearchParams();
            },
            enumerable: true
          });
          Object.defineProperties(proto, {
            "toString": {
              get: function() {
                var _this = this;
                return function() {
                  return _this.href;
                };
              }
            },
            "href": {
              get: function() {
                return this._anchorElement.href.replace(/\?$/, "");
              },
              set: function(value) {
                this._anchorElement.href = value;
                this._updateSearchParams();
              },
              enumerable: true
            },
            "pathname": {
              get: function() {
                return this._anchorElement.pathname.replace(/(^\/?)/, "/");
              },
              set: function(value) {
                this._anchorElement.pathname = value;
              },
              enumerable: true
            },
            "origin": {
              get: function() {
                var expectedPort = { "http:": 80, "https:": 443, "ftp:": 21 }[this._anchorElement.protocol];
                var addPortToOrigin = this._anchorElement.port != expectedPort && this._anchorElement.port !== "";
                return this._anchorElement.protocol + "//" + this._anchorElement.hostname + (addPortToOrigin ? ":" + this._anchorElement.port : "");
              },
              enumerable: true
            },
            "password": {
              get: function() {
                return "";
              },
              set: function(value) {
              },
              enumerable: true
            },
            "username": {
              get: function() {
                return "";
              },
              set: function(value) {
              },
              enumerable: true
            }
          });
          URL2.createObjectURL = function(blob) {
            return _URL.createObjectURL.apply(_URL, arguments);
          };
          URL2.revokeObjectURL = function(url) {
            return _URL.revokeObjectURL.apply(_URL, arguments);
          };
          global2.URL = URL2;
        };
        if (!checkIfURLIsSupported()) {
          polyfillURL();
        }
        if (global2.location !== void 0 && !("origin" in global2.location)) {
          var getOrigin = function() {
            return global2.location.protocol + "//" + global2.location.hostname + (global2.location.port ? ":" + global2.location.port : "");
          };
          try {
            Object.defineProperty(global2.location, "origin", {
              get: getOrigin,
              enumerable: true
            });
          } catch (e) {
            setInterval(function() {
              global2.location.origin = getOrigin();
            }, 100);
          }
        }
      })(
        typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : exports
      );
    }
  });

  // node_modules/rxjs/node_modules/tslib/tslib.js
  var require_tslib = __commonJS({
    "node_modules/rxjs/node_modules/tslib/tslib.js"(exports, module) {
      /*! *****************************************************************************
      Copyright (c) Microsoft Corporation.
      
      Permission to use, copy, modify, and/or distribute this software for any
      purpose with or without fee is hereby granted.
      
      THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
      REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
      AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
      INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
      LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
      OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
      PERFORMANCE OF THIS SOFTWARE.
      ***************************************************************************** */
      var __extends2;
      var __assign2;
      var __rest2;
      var __decorate2;
      var __param2;
      var __metadata2;
      var __awaiter2;
      var __generator2;
      var __exportStar2;
      var __values2;
      var __read2;
      var __spread2;
      var __spreadArrays2;
      var __spreadArray2;
      var __await2;
      var __asyncGenerator2;
      var __asyncDelegator2;
      var __asyncValues2;
      var __makeTemplateObject2;
      var __importStar2;
      var __importDefault2;
      var __classPrivateFieldGet2;
      var __classPrivateFieldSet2;
      var __createBinding2;
      (function(factory) {
        var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
        if (typeof define === "function" && define.amd) {
          define("tslib", ["exports"], function(exports2) {
            factory(createExporter(root, createExporter(exports2)));
          });
        } else if (typeof module === "object" && typeof module.exports === "object") {
          factory(createExporter(root, createExporter(module.exports)));
        } else {
          factory(createExporter(root));
        }
        function createExporter(exports2, previous) {
          if (exports2 !== root) {
            if (typeof Object.create === "function") {
              Object.defineProperty(exports2, "__esModule", { value: true });
            } else {
              exports2.__esModule = true;
            }
          }
          return function(id, v) {
            return exports2[id] = previous ? previous(id, v) : v;
          };
        }
      })(function(exporter) {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p))
              d[p] = b[p];
        };
        __extends2 = function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        __assign2 = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        __rest2 = function(s, e) {
          var t = {};
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
              t[p] = s[p];
          if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
              if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
            }
          return t;
        };
        __decorate2 = function(decorators, target, key, desc) {
          var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
          if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r2 = Reflect.decorate(decorators, target, key, desc);
          else
            for (var i = decorators.length - 1; i >= 0; i--)
              if (d = decorators[i])
                r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
          return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
        };
        __param2 = function(paramIndex, decorator) {
          return function(target, key) {
            decorator(target, key, paramIndex);
          };
        };
        __metadata2 = function(metadataKey, metadataValue) {
          if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
        };
        __awaiter2 = function(thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P ? value : new P(function(resolve) {
              resolve(value);
            });
          }
          return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator["throw"](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
          });
        };
        __generator2 = function(thisArg, body) {
          var _ = { label: 0, sent: function() {
            if (t[0] & 1)
              throw t[1];
            return t[1];
          }, trys: [], ops: [] }, f, y, t, g;
          return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
            return this;
          }), g;
          function verb(n) {
            return function(v) {
              return step([n, v]);
            };
          }
          function step(op) {
            if (f)
              throw new TypeError("Generator is already executing.");
            while (_)
              try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                  return t;
                if (y = 0, t)
                  op = [op[0] & 2, t.value];
                switch (op[0]) {
                  case 0:
                  case 1:
                    t = op;
                    break;
                  case 4:
                    _.label++;
                    return { value: op[1], done: false };
                  case 5:
                    _.label++;
                    y = op[1];
                    op = [0];
                    continue;
                  case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                  default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                      _ = 0;
                      continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                      _.label = op[1];
                      break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                      _.label = t[1];
                      t = op;
                      break;
                    }
                    if (t && _.label < t[2]) {
                      _.label = t[2];
                      _.ops.push(op);
                      break;
                    }
                    if (t[2])
                      _.ops.pop();
                    _.trys.pop();
                    continue;
                }
                op = body.call(thisArg, _);
              } catch (e) {
                op = [6, e];
                y = 0;
              } finally {
                f = t = 0;
              }
            if (op[0] & 5)
              throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
          }
        };
        __exportStar2 = function(m, o) {
          for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
              __createBinding2(o, m, p);
        };
        __createBinding2 = Object.create ? function(o, m, k, k2) {
          if (k2 === void 0)
            k2 = k;
          Object.defineProperty(o, k2, { enumerable: true, get: function() {
            return m[k];
          } });
        } : function(o, m, k, k2) {
          if (k2 === void 0)
            k2 = k;
          o[k2] = m[k];
        };
        __values2 = function(o) {
          var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
          if (m)
            return m.call(o);
          if (o && typeof o.length === "number")
            return {
              next: function() {
                if (o && i >= o.length)
                  o = void 0;
                return { value: o && o[i++], done: !o };
              }
            };
          throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };
        __read2 = function(o, n) {
          var m = typeof Symbol === "function" && o[Symbol.iterator];
          if (!m)
            return o;
          var i = m.call(o), r2, ar = [], e;
          try {
            while ((n === void 0 || n-- > 0) && !(r2 = i.next()).done)
              ar.push(r2.value);
          } catch (error) {
            e = { error };
          } finally {
            try {
              if (r2 && !r2.done && (m = i["return"]))
                m.call(i);
            } finally {
              if (e)
                throw e.error;
            }
          }
          return ar;
        };
        __spread2 = function() {
          for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read2(arguments[i]));
          return ar;
        };
        __spreadArrays2 = function() {
          for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
          for (var r2 = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r2[k] = a[j];
          return r2;
        };
        __spreadArray2 = function(to, from2, pack) {
          if (pack || arguments.length === 2)
            for (var i = 0, l = from2.length, ar; i < l; i++) {
              if (ar || !(i in from2)) {
                if (!ar)
                  ar = Array.prototype.slice.call(from2, 0, i);
                ar[i] = from2[i];
              }
            }
          return to.concat(ar || Array.prototype.slice.call(from2));
        };
        __await2 = function(v) {
          return this instanceof __await2 ? (this.v = v, this) : new __await2(v);
        };
        __asyncGenerator2 = function(thisArg, _arguments, generator) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var g = generator.apply(thisArg, _arguments || []), i, q = [];
          return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
            return this;
          }, i;
          function verb(n) {
            if (g[n])
              i[n] = function(v) {
                return new Promise(function(a, b) {
                  q.push([n, v, a, b]) > 1 || resume(n, v);
                });
              };
          }
          function resume(n, v) {
            try {
              step(g[n](v));
            } catch (e) {
              settle(q[0][3], e);
            }
          }
          function step(r2) {
            r2.value instanceof __await2 ? Promise.resolve(r2.value.v).then(fulfill, reject) : settle(q[0][2], r2);
          }
          function fulfill(value) {
            resume("next", value);
          }
          function reject(value) {
            resume("throw", value);
          }
          function settle(f, v) {
            if (f(v), q.shift(), q.length)
              resume(q[0][0], q[0][1]);
          }
        };
        __asyncDelegator2 = function(o) {
          var i, p;
          return i = {}, verb("next"), verb("throw", function(e) {
            throw e;
          }), verb("return"), i[Symbol.iterator] = function() {
            return this;
          }, i;
          function verb(n, f) {
            i[n] = o[n] ? function(v) {
              return (p = !p) ? { value: __await2(o[n](v)), done: n === "return" } : f ? f(v) : v;
            } : f;
          }
        };
        __asyncValues2 = function(o) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var m = o[Symbol.asyncIterator], i;
          return m ? m.call(o) : (o = typeof __values2 === "function" ? __values2(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
            return this;
          }, i);
          function verb(n) {
            i[n] = o[n] && function(v) {
              return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
              });
            };
          }
          function settle(resolve, reject, d, v) {
            Promise.resolve(v).then(function(v2) {
              resolve({ value: v2, done: d });
            }, reject);
          }
        };
        __makeTemplateObject2 = function(cooked, raw) {
          if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
          } else {
            cooked.raw = raw;
          }
          return cooked;
        };
        var __setModuleDefault = Object.create ? function(o, v) {
          Object.defineProperty(o, "default", { enumerable: true, value: v });
        } : function(o, v) {
          o["default"] = v;
        };
        __importStar2 = function(mod) {
          if (mod && mod.__esModule)
            return mod;
          var result = {};
          if (mod != null) {
            for (var k in mod)
              if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                __createBinding2(result, mod, k);
          }
          __setModuleDefault(result, mod);
          return result;
        };
        __importDefault2 = function(mod) {
          return mod && mod.__esModule ? mod : { "default": mod };
        };
        __classPrivateFieldGet2 = function(receiver, state, kind, f) {
          if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
          if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
          return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
        };
        __classPrivateFieldSet2 = function(receiver, state, value, kind, f) {
          if (kind === "m")
            throw new TypeError("Private method is not writable");
          if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
          if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
          return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
        };
        exporter("__extends", __extends2);
        exporter("__assign", __assign2);
        exporter("__rest", __rest2);
        exporter("__decorate", __decorate2);
        exporter("__param", __param2);
        exporter("__metadata", __metadata2);
        exporter("__awaiter", __awaiter2);
        exporter("__generator", __generator2);
        exporter("__exportStar", __exportStar2);
        exporter("__createBinding", __createBinding2);
        exporter("__values", __values2);
        exporter("__read", __read2);
        exporter("__spread", __spread2);
        exporter("__spreadArrays", __spreadArrays2);
        exporter("__spreadArray", __spreadArray2);
        exporter("__await", __await2);
        exporter("__asyncGenerator", __asyncGenerator2);
        exporter("__asyncDelegator", __asyncDelegator2);
        exporter("__asyncValues", __asyncValues2);
        exporter("__makeTemplateObject", __makeTemplateObject2);
        exporter("__importStar", __importStar2);
        exporter("__importDefault", __importDefault2);
        exporter("__classPrivateFieldGet", __classPrivateFieldGet2);
        exporter("__classPrivateFieldSet", __classPrivateFieldSet2);
      });
    }
  });

  // node_modules/clipboard/dist/clipboard.js
  var require_clipboard = __commonJS({
    "node_modules/clipboard/dist/clipboard.js"(exports, module) {
      /*!
       * clipboard.js v2.0.11
       * https://clipboardjs.com/
       *
       * Licensed MIT © Zeno Rocha
       */
      (function webpackUniversalModuleDefinition(root, factory) {
        if (typeof exports === "object" && typeof module === "object")
          module.exports = factory();
        else if (typeof define === "function" && define.amd)
          define([], factory);
        else if (typeof exports === "object")
          exports["ClipboardJS"] = factory();
        else
          root["ClipboardJS"] = factory();
      })(exports, function() {
        return function() {
          var __webpack_modules__ = {
            686: function(__unused_webpack_module, __webpack_exports__, __webpack_require__2) {
              "use strict";
              __webpack_require__2.d(__webpack_exports__, {
                "default": function() {
                  return clipboard;
                }
              });
              var tiny_emitter = __webpack_require__2(279);
              var tiny_emitter_default = /* @__PURE__ */ __webpack_require__2.n(tiny_emitter);
              var listen = __webpack_require__2(370);
              var listen_default = /* @__PURE__ */ __webpack_require__2.n(listen);
              var src_select = __webpack_require__2(817);
              var select_default = /* @__PURE__ */ __webpack_require__2.n(src_select);
              ;
              function command(type) {
                try {
                  return document.execCommand(type);
                } catch (err) {
                  return false;
                }
              }
              ;
              var ClipboardActionCut = function ClipboardActionCut2(target) {
                var selectedText = select_default()(target);
                command("cut");
                return selectedText;
              };
              var actions_cut = ClipboardActionCut;
              ;
              function createFakeElement(value) {
                var isRTL = document.documentElement.getAttribute("dir") === "rtl";
                var fakeElement = document.createElement("textarea");
                fakeElement.style.fontSize = "12pt";
                fakeElement.style.border = "0";
                fakeElement.style.padding = "0";
                fakeElement.style.margin = "0";
                fakeElement.style.position = "absolute";
                fakeElement.style[isRTL ? "right" : "left"] = "-9999px";
                var yPosition = window.pageYOffset || document.documentElement.scrollTop;
                fakeElement.style.top = "".concat(yPosition, "px");
                fakeElement.setAttribute("readonly", "");
                fakeElement.value = value;
                return fakeElement;
              }
              ;
              var fakeCopyAction = function fakeCopyAction2(value, options) {
                var fakeElement = createFakeElement(value);
                options.container.appendChild(fakeElement);
                var selectedText = select_default()(fakeElement);
                command("copy");
                fakeElement.remove();
                return selectedText;
              };
              var ClipboardActionCopy = function ClipboardActionCopy2(target) {
                var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                  container: document.body
                };
                var selectedText = "";
                if (typeof target === "string") {
                  selectedText = fakeCopyAction(target, options);
                } else if (target instanceof HTMLInputElement && !["text", "search", "url", "tel", "password"].includes(target === null || target === void 0 ? void 0 : target.type)) {
                  selectedText = fakeCopyAction(target.value, options);
                } else {
                  selectedText = select_default()(target);
                  command("copy");
                }
                return selectedText;
              };
              var actions_copy = ClipboardActionCopy;
              ;
              function _typeof(obj) {
                "@babel/helpers - typeof";
                if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                  _typeof = function _typeof2(obj2) {
                    return typeof obj2;
                  };
                } else {
                  _typeof = function _typeof2(obj2) {
                    return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
                  };
                }
                return _typeof(obj);
              }
              var ClipboardActionDefault = function ClipboardActionDefault2() {
                var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                var _options$action = options.action, action = _options$action === void 0 ? "copy" : _options$action, container = options.container, target = options.target, text = options.text;
                if (action !== "copy" && action !== "cut") {
                  throw new Error('Invalid "action" value, use either "copy" or "cut"');
                }
                if (target !== void 0) {
                  if (target && _typeof(target) === "object" && target.nodeType === 1) {
                    if (action === "copy" && target.hasAttribute("disabled")) {
                      throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                    }
                    if (action === "cut" && (target.hasAttribute("readonly") || target.hasAttribute("disabled"))) {
                      throw new Error(`Invalid "target" attribute. You can't cut text from elements with "readonly" or "disabled" attributes`);
                    }
                  } else {
                    throw new Error('Invalid "target" value, use a valid Element');
                  }
                }
                if (text) {
                  return actions_copy(text, {
                    container
                  });
                }
                if (target) {
                  return action === "cut" ? actions_cut(target) : actions_copy(target, {
                    container
                  });
                }
              };
              var actions_default = ClipboardActionDefault;
              ;
              function clipboard_typeof(obj) {
                "@babel/helpers - typeof";
                if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                  clipboard_typeof = function _typeof2(obj2) {
                    return typeof obj2;
                  };
                } else {
                  clipboard_typeof = function _typeof2(obj2) {
                    return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
                  };
                }
                return clipboard_typeof(obj);
              }
              function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                  throw new TypeError("Cannot call a class as a function");
                }
              }
              function _defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];
                  descriptor.enumerable = descriptor.enumerable || false;
                  descriptor.configurable = true;
                  if ("value" in descriptor)
                    descriptor.writable = true;
                  Object.defineProperty(target, descriptor.key, descriptor);
                }
              }
              function _createClass(Constructor, protoProps, staticProps) {
                if (protoProps)
                  _defineProperties(Constructor.prototype, protoProps);
                if (staticProps)
                  _defineProperties(Constructor, staticProps);
                return Constructor;
              }
              function _inherits(subClass, superClass) {
                if (typeof superClass !== "function" && superClass !== null) {
                  throw new TypeError("Super expression must either be null or a function");
                }
                subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
                if (superClass)
                  _setPrototypeOf(subClass, superClass);
              }
              function _setPrototypeOf(o, p) {
                _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
                  o2.__proto__ = p2;
                  return o2;
                };
                return _setPrototypeOf(o, p);
              }
              function _createSuper(Derived) {
                var hasNativeReflectConstruct = _isNativeReflectConstruct();
                return function _createSuperInternal() {
                  var Super = _getPrototypeOf(Derived), result;
                  if (hasNativeReflectConstruct) {
                    var NewTarget = _getPrototypeOf(this).constructor;
                    result = Reflect.construct(Super, arguments, NewTarget);
                  } else {
                    result = Super.apply(this, arguments);
                  }
                  return _possibleConstructorReturn(this, result);
                };
              }
              function _possibleConstructorReturn(self2, call) {
                if (call && (clipboard_typeof(call) === "object" || typeof call === "function")) {
                  return call;
                }
                return _assertThisInitialized(self2);
              }
              function _assertThisInitialized(self2) {
                if (self2 === void 0) {
                  throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return self2;
              }
              function _isNativeReflectConstruct() {
                if (typeof Reflect === "undefined" || !Reflect.construct)
                  return false;
                if (Reflect.construct.sham)
                  return false;
                if (typeof Proxy === "function")
                  return true;
                try {
                  Date.prototype.toString.call(Reflect.construct(Date, [], function() {
                  }));
                  return true;
                } catch (e) {
                  return false;
                }
              }
              function _getPrototypeOf(o) {
                _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
                  return o2.__proto__ || Object.getPrototypeOf(o2);
                };
                return _getPrototypeOf(o);
              }
              function getAttributeValue(suffix, element) {
                var attribute = "data-clipboard-".concat(suffix);
                if (!element.hasAttribute(attribute)) {
                  return;
                }
                return element.getAttribute(attribute);
              }
              var Clipboard = /* @__PURE__ */ function(_Emitter) {
                _inherits(Clipboard2, _Emitter);
                var _super = _createSuper(Clipboard2);
                function Clipboard2(trigger, options) {
                  var _this;
                  _classCallCheck(this, Clipboard2);
                  _this = _super.call(this);
                  _this.resolveOptions(options);
                  _this.listenClick(trigger);
                  return _this;
                }
                _createClass(Clipboard2, [{
                  key: "resolveOptions",
                  value: function resolveOptions() {
                    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                    this.action = typeof options.action === "function" ? options.action : this.defaultAction;
                    this.target = typeof options.target === "function" ? options.target : this.defaultTarget;
                    this.text = typeof options.text === "function" ? options.text : this.defaultText;
                    this.container = clipboard_typeof(options.container) === "object" ? options.container : document.body;
                  }
                }, {
                  key: "listenClick",
                  value: function listenClick(trigger) {
                    var _this2 = this;
                    this.listener = listen_default()(trigger, "click", function(e) {
                      return _this2.onClick(e);
                    });
                  }
                }, {
                  key: "onClick",
                  value: function onClick(e) {
                    var trigger = e.delegateTarget || e.currentTarget;
                    var action = this.action(trigger) || "copy";
                    var text = actions_default({
                      action,
                      container: this.container,
                      target: this.target(trigger),
                      text: this.text(trigger)
                    });
                    this.emit(text ? "success" : "error", {
                      action,
                      text,
                      trigger,
                      clearSelection: function clearSelection() {
                        if (trigger) {
                          trigger.focus();
                        }
                        window.getSelection().removeAllRanges();
                      }
                    });
                  }
                }, {
                  key: "defaultAction",
                  value: function defaultAction(trigger) {
                    return getAttributeValue("action", trigger);
                  }
                }, {
                  key: "defaultTarget",
                  value: function defaultTarget(trigger) {
                    var selector = getAttributeValue("target", trigger);
                    if (selector) {
                      return document.querySelector(selector);
                    }
                  }
                }, {
                  key: "defaultText",
                  value: function defaultText(trigger) {
                    return getAttributeValue("text", trigger);
                  }
                }, {
                  key: "destroy",
                  value: function destroy() {
                    this.listener.destroy();
                  }
                }], [{
                  key: "copy",
                  value: function copy(target) {
                    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                      container: document.body
                    };
                    return actions_copy(target, options);
                  }
                }, {
                  key: "cut",
                  value: function cut(target) {
                    return actions_cut(target);
                  }
                }, {
                  key: "isSupported",
                  value: function isSupported() {
                    var action = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ["copy", "cut"];
                    var actions = typeof action === "string" ? [action] : action;
                    var support = !!document.queryCommandSupported;
                    actions.forEach(function(action2) {
                      support = support && !!document.queryCommandSupported(action2);
                    });
                    return support;
                  }
                }]);
                return Clipboard2;
              }(tiny_emitter_default());
              var clipboard = Clipboard;
            },
            828: function(module2) {
              var DOCUMENT_NODE_TYPE = 9;
              if (typeof Element !== "undefined" && !Element.prototype.matches) {
                var proto = Element.prototype;
                proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
              }
              function closest(element, selector) {
                while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
                  if (typeof element.matches === "function" && element.matches(selector)) {
                    return element;
                  }
                  element = element.parentNode;
                }
              }
              module2.exports = closest;
            },
            438: function(module2, __unused_webpack_exports, __webpack_require__2) {
              var closest = __webpack_require__2(828);
              function _delegate(element, selector, type, callback, useCapture) {
                var listenerFn = listener.apply(this, arguments);
                element.addEventListener(type, listenerFn, useCapture);
                return {
                  destroy: function() {
                    element.removeEventListener(type, listenerFn, useCapture);
                  }
                };
              }
              function delegate(elements, selector, type, callback, useCapture) {
                if (typeof elements.addEventListener === "function") {
                  return _delegate.apply(null, arguments);
                }
                if (typeof type === "function") {
                  return _delegate.bind(null, document).apply(null, arguments);
                }
                if (typeof elements === "string") {
                  elements = document.querySelectorAll(elements);
                }
                return Array.prototype.map.call(elements, function(element) {
                  return _delegate(element, selector, type, callback, useCapture);
                });
              }
              function listener(element, selector, type, callback) {
                return function(e) {
                  e.delegateTarget = closest(e.target, selector);
                  if (e.delegateTarget) {
                    callback.call(element, e);
                  }
                };
              }
              module2.exports = delegate;
            },
            879: function(__unused_webpack_module, exports2) {
              exports2.node = function(value) {
                return value !== void 0 && value instanceof HTMLElement && value.nodeType === 1;
              };
              exports2.nodeList = function(value) {
                var type = Object.prototype.toString.call(value);
                return value !== void 0 && (type === "[object NodeList]" || type === "[object HTMLCollection]") && "length" in value && (value.length === 0 || exports2.node(value[0]));
              };
              exports2.string = function(value) {
                return typeof value === "string" || value instanceof String;
              };
              exports2.fn = function(value) {
                var type = Object.prototype.toString.call(value);
                return type === "[object Function]";
              };
            },
            370: function(module2, __unused_webpack_exports, __webpack_require__2) {
              var is = __webpack_require__2(879);
              var delegate = __webpack_require__2(438);
              function listen(target, type, callback) {
                if (!target && !type && !callback) {
                  throw new Error("Missing required arguments");
                }
                if (!is.string(type)) {
                  throw new TypeError("Second argument must be a String");
                }
                if (!is.fn(callback)) {
                  throw new TypeError("Third argument must be a Function");
                }
                if (is.node(target)) {
                  return listenNode(target, type, callback);
                } else if (is.nodeList(target)) {
                  return listenNodeList(target, type, callback);
                } else if (is.string(target)) {
                  return listenSelector(target, type, callback);
                } else {
                  throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");
                }
              }
              function listenNode(node, type, callback) {
                node.addEventListener(type, callback);
                return {
                  destroy: function() {
                    node.removeEventListener(type, callback);
                  }
                };
              }
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
                };
              }
              function listenSelector(selector, type, callback) {
                return delegate(document.body, selector, type, callback);
              }
              module2.exports = listen;
            },
            817: function(module2) {
              function select(element) {
                var selectedText;
                if (element.nodeName === "SELECT") {
                  element.focus();
                  selectedText = element.value;
                } else if (element.nodeName === "INPUT" || element.nodeName === "TEXTAREA") {
                  var isReadOnly = element.hasAttribute("readonly");
                  if (!isReadOnly) {
                    element.setAttribute("readonly", "");
                  }
                  element.select();
                  element.setSelectionRange(0, element.value.length);
                  if (!isReadOnly) {
                    element.removeAttribute("readonly");
                  }
                  selectedText = element.value;
                } else {
                  if (element.hasAttribute("contenteditable")) {
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
              module2.exports = select;
            },
            279: function(module2) {
              function E() {
              }
              E.prototype = {
                on: function(name, callback, ctx) {
                  var e = this.e || (this.e = {});
                  (e[name] || (e[name] = [])).push({
                    fn: callback,
                    ctx
                  });
                  return this;
                },
                once: function(name, callback, ctx) {
                  var self2 = this;
                  function listener() {
                    self2.off(name, listener);
                    callback.apply(ctx, arguments);
                  }
                  ;
                  listener._ = callback;
                  return this.on(name, listener, ctx);
                },
                emit: function(name) {
                  var data = [].slice.call(arguments, 1);
                  var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
                  var i = 0;
                  var len = evtArr.length;
                  for (i; i < len; i++) {
                    evtArr[i].fn.apply(evtArr[i].ctx, data);
                  }
                  return this;
                },
                off: function(name, callback) {
                  var e = this.e || (this.e = {});
                  var evts = e[name];
                  var liveEvents = [];
                  if (evts && callback) {
                    for (var i = 0, len = evts.length; i < len; i++) {
                      if (evts[i].fn !== callback && evts[i].fn._ !== callback)
                        liveEvents.push(evts[i]);
                    }
                  }
                  liveEvents.length ? e[name] = liveEvents : delete e[name];
                  return this;
                }
              };
              module2.exports = E;
              module2.exports.TinyEmitter = E;
            }
          };
          var __webpack_module_cache__ = {};
          function __webpack_require__(moduleId) {
            if (__webpack_module_cache__[moduleId]) {
              return __webpack_module_cache__[moduleId].exports;
            }
            var module2 = __webpack_module_cache__[moduleId] = {
              exports: {}
            };
            __webpack_modules__[moduleId](module2, module2.exports, __webpack_require__);
            return module2.exports;
          }
          !function() {
            __webpack_require__.n = function(module2) {
              var getter = module2 && module2.__esModule ? function() {
                return module2["default"];
              } : function() {
                return module2;
              };
              __webpack_require__.d(getter, { a: getter });
              return getter;
            };
          }();
          !function() {
            __webpack_require__.d = function(exports2, definition) {
              for (var key in definition) {
                if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports2, key)) {
                  Object.defineProperty(exports2, key, { enumerable: true, get: definition[key] });
                }
              }
            };
          }();
          !function() {
            __webpack_require__.o = function(obj, prop) {
              return Object.prototype.hasOwnProperty.call(obj, prop);
            };
          }();
          return __webpack_require__(686);
        }().default;
      });
    }
  });

  // node_modules/escape-html/index.js
  var require_escape_html = __commonJS({
    "node_modules/escape-html/index.js"(exports, module) {
      "use strict";
      /*!
       * escape-html
       * Copyright(c) 2012-2013 TJ Holowaychuk
       * Copyright(c) 2015 Andreas Lubbe
       * Copyright(c) 2015 Tiancheng "Timothy" Gu
       * MIT Licensed
       */
      var matchHtmlRegExp = /["'&<>]/;
      module.exports = escapeHtml;
      function escapeHtml(string) {
        var str = "" + string;
        var match = matchHtmlRegExp.exec(str);
        if (!match) {
          return str;
        }
        var escape;
        var html = "";
        var index2 = 0;
        var lastIndex = 0;
        for (index2 = match.index; index2 < str.length; index2++) {
          switch (str.charCodeAt(index2)) {
            case 34:
              escape = "&quot;";
              break;
            case 38:
              escape = "&amp;";
              break;
            case 39:
              escape = "&#39;";
              break;
            case 60:
              escape = "&lt;";
              break;
            case 62:
              escape = "&gt;";
              break;
            default:
              continue;
          }
          if (lastIndex !== index2) {
            html += str.substring(lastIndex, index2);
          }
          lastIndex = index2 + 1;
          html += escape;
        }
        return lastIndex !== index2 ? html + str.substring(lastIndex, index2) : html;
      }
    }
  });

  // node_modules/array-flat-polyfill/index.mjs
  Array.prototype.flat || Object.defineProperty(Array.prototype, "flat", { configurable: true, value: function r() {
    var t = isNaN(arguments[0]) ? 1 : Number(arguments[0]);
    return t ? Array.prototype.reduce.call(this, function(a, e) {
      return Array.isArray(e) ? a.push.apply(a, r.call(e, t - 1)) : a.push(e), a;
    }, []) : Array.prototype.slice.call(this);
  }, writable: true }), Array.prototype.flatMap || Object.defineProperty(Array.prototype, "flatMap", { configurable: true, value: function(r2) {
    return Array.prototype.map.apply(this, arguments).flat();
  }, writable: true });

  // src/assets/javascripts/bundle.ts
  var import_focus_visible = __toESM(require_focus_visible());

  // node_modules/unfetch/polyfill/index.js
  self.fetch || (self.fetch = function(e, n) {
    return n = n || {}, new Promise(function(t, s) {
      var r2 = new XMLHttpRequest(), o = [], u = [], i = {}, a = function() {
        return { ok: 2 == (r2.status / 100 | 0), statusText: r2.statusText, status: r2.status, url: r2.responseURL, text: function() {
          return Promise.resolve(r2.responseText);
        }, json: function() {
          return Promise.resolve(r2.responseText).then(JSON.parse);
        }, blob: function() {
          return Promise.resolve(new Blob([r2.response]));
        }, clone: a, headers: { keys: function() {
          return o;
        }, entries: function() {
          return u;
        }, get: function(e2) {
          return i[e2.toLowerCase()];
        }, has: function(e2) {
          return e2.toLowerCase() in i;
        } } };
      };
      for (var c in r2.open(n.method || "get", e, true), r2.onload = function() {
        r2.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function(e2, n2, t2) {
          o.push(n2 = n2.toLowerCase()), u.push([n2, t2]), i[n2] = i[n2] ? i[n2] + "," + t2 : t2;
        }), t(a());
      }, r2.onerror = s, r2.withCredentials = "include" == n.credentials, n.headers)
        r2.setRequestHeader(c, n.headers[c]);
      r2.send(n.body || null);
    });
  });

  // src/assets/javascripts/bundle.ts
  var import_url_polyfill = __toESM(require_url_polyfill());

  // node_modules/rxjs/node_modules/tslib/modules/index.js
  var import_tslib = __toESM(require_tslib(), 1);
  var {
    __extends,
    __assign,
    __rest,
    __decorate,
    __param,
    __metadata,
    __awaiter,
    __generator,
    __exportStar,
    __createBinding,
    __values,
    __read,
    __spread,
    __spreadArrays,
    __spreadArray,
    __await,
    __asyncGenerator,
    __asyncDelegator,
    __asyncValues,
    __makeTemplateObject,
    __importStar,
    __importDefault,
    __classPrivateFieldGet,
    __classPrivateFieldSet
  } = import_tslib.default;

  // node_modules/rxjs/dist/esm5/internal/util/isFunction.js
  function isFunction(value) {
    return typeof value === "function";
  }

  // node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js
  function createErrorClass(createImpl) {
    var _super = function(instance) {
      Error.call(instance);
      instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
  }

  // node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js
  var UnsubscriptionError = createErrorClass(function(_super) {
    return function UnsubscriptionErrorImpl(errors) {
      _super(this);
      this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
        return i + 1 + ") " + err.toString();
      }).join("\n  ") : "";
      this.name = "UnsubscriptionError";
      this.errors = errors;
    };
  });

  // node_modules/rxjs/dist/esm5/internal/util/arrRemove.js
  function arrRemove(arr, item) {
    if (arr) {
      var index2 = arr.indexOf(item);
      0 <= index2 && arr.splice(index2, 1);
    }
  }

  // node_modules/rxjs/dist/esm5/internal/Subscription.js
  var Subscription = function() {
    function Subscription2(initialTeardown) {
      this.initialTeardown = initialTeardown;
      this.closed = false;
      this._parentage = null;
      this._finalizers = null;
    }
    Subscription2.prototype.unsubscribe = function() {
      var e_1, _a2, e_2, _b;
      var errors;
      if (!this.closed) {
        this.closed = true;
        var _parentage = this._parentage;
        if (_parentage) {
          this._parentage = null;
          if (Array.isArray(_parentage)) {
            try {
              for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                var parent_1 = _parentage_1_1.value;
                parent_1.remove(this);
              }
            } catch (e_1_1) {
              e_1 = { error: e_1_1 };
            } finally {
              try {
                if (_parentage_1_1 && !_parentage_1_1.done && (_a2 = _parentage_1.return))
                  _a2.call(_parentage_1);
              } finally {
                if (e_1)
                  throw e_1.error;
              }
            }
          } else {
            _parentage.remove(this);
          }
        }
        var initialFinalizer = this.initialTeardown;
        if (isFunction(initialFinalizer)) {
          try {
            initialFinalizer();
          } catch (e) {
            errors = e instanceof UnsubscriptionError ? e.errors : [e];
          }
        }
        var _finalizers = this._finalizers;
        if (_finalizers) {
          this._finalizers = null;
          try {
            for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
              var finalizer = _finalizers_1_1.value;
              try {
                execFinalizer(finalizer);
              } catch (err) {
                errors = errors !== null && errors !== void 0 ? errors : [];
                if (err instanceof UnsubscriptionError) {
                  errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
                } else {
                  errors.push(err);
                }
              }
            }
          } catch (e_2_1) {
            e_2 = { error: e_2_1 };
          } finally {
            try {
              if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return))
                _b.call(_finalizers_1);
            } finally {
              if (e_2)
                throw e_2.error;
            }
          }
        }
        if (errors) {
          throw new UnsubscriptionError(errors);
        }
      }
    };
    Subscription2.prototype.add = function(teardown) {
      var _a2;
      if (teardown && teardown !== this) {
        if (this.closed) {
          execFinalizer(teardown);
        } else {
          if (teardown instanceof Subscription2) {
            if (teardown.closed || teardown._hasParent(this)) {
              return;
            }
            teardown._addParent(this);
          }
          (this._finalizers = (_a2 = this._finalizers) !== null && _a2 !== void 0 ? _a2 : []).push(teardown);
        }
      }
    };
    Subscription2.prototype._hasParent = function(parent) {
      var _parentage = this._parentage;
      return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
    };
    Subscription2.prototype._addParent = function(parent) {
      var _parentage = this._parentage;
      this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription2.prototype._removeParent = function(parent) {
      var _parentage = this._parentage;
      if (_parentage === parent) {
        this._parentage = null;
      } else if (Array.isArray(_parentage)) {
        arrRemove(_parentage, parent);
      }
    };
    Subscription2.prototype.remove = function(teardown) {
      var _finalizers = this._finalizers;
      _finalizers && arrRemove(_finalizers, teardown);
      if (teardown instanceof Subscription2) {
        teardown._removeParent(this);
      }
    };
    Subscription2.EMPTY = function() {
      var empty = new Subscription2();
      empty.closed = true;
      return empty;
    }();
    return Subscription2;
  }();
  var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
  function isSubscription(value) {
    return value instanceof Subscription || value && "closed" in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe);
  }
  function execFinalizer(finalizer) {
    if (isFunction(finalizer)) {
      finalizer();
    } else {
      finalizer.unsubscribe();
    }
  }

  // node_modules/rxjs/dist/esm5/internal/config.js
  var config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: void 0,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false
  };

  // node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js
  var timeoutProvider = {
    setTimeout: function(handler, timeout) {
      var args = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
      }
      var delegate = timeoutProvider.delegate;
      if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
        return delegate.setTimeout.apply(delegate, __spreadArray([handler, timeout], __read(args)));
      }
      return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
    },
    clearTimeout: function(handle) {
      var delegate = timeoutProvider.delegate;
      return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
    },
    delegate: void 0
  };

  // node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js
  function reportUnhandledError(err) {
    timeoutProvider.setTimeout(function() {
      var onUnhandledError = config.onUnhandledError;
      if (onUnhandledError) {
        onUnhandledError(err);
      } else {
        throw err;
      }
    });
  }

  // node_modules/rxjs/dist/esm5/internal/util/noop.js
  function noop() {
  }

  // node_modules/rxjs/dist/esm5/internal/NotificationFactories.js
  var COMPLETE_NOTIFICATION = function() {
    return createNotification("C", void 0, void 0);
  }();
  function errorNotification(error) {
    return createNotification("E", void 0, error);
  }
  function nextNotification(value) {
    return createNotification("N", value, void 0);
  }
  function createNotification(kind, value, error) {
    return {
      kind,
      value,
      error
    };
  }

  // node_modules/rxjs/dist/esm5/internal/util/errorContext.js
  var context = null;
  function errorContext(cb) {
    if (config.useDeprecatedSynchronousErrorHandling) {
      var isRoot = !context;
      if (isRoot) {
        context = { errorThrown: false, error: null };
      }
      cb();
      if (isRoot) {
        var _a2 = context, errorThrown = _a2.errorThrown, error = _a2.error;
        context = null;
        if (errorThrown) {
          throw error;
        }
      }
    } else {
      cb();
    }
  }
  function captureError(err) {
    if (config.useDeprecatedSynchronousErrorHandling && context) {
      context.errorThrown = true;
      context.error = err;
    }
  }

  // node_modules/rxjs/dist/esm5/internal/Subscriber.js
  var Subscriber = function(_super) {
    __extends(Subscriber2, _super);
    function Subscriber2(destination) {
      var _this = _super.call(this) || this;
      _this.isStopped = false;
      if (destination) {
        _this.destination = destination;
        if (isSubscription(destination)) {
          destination.add(_this);
        }
      } else {
        _this.destination = EMPTY_OBSERVER;
      }
      return _this;
    }
    Subscriber2.create = function(next, error, complete) {
      return new SafeSubscriber(next, error, complete);
    };
    Subscriber2.prototype.next = function(value) {
      if (this.isStopped) {
        handleStoppedNotification(nextNotification(value), this);
      } else {
        this._next(value);
      }
    };
    Subscriber2.prototype.error = function(err) {
      if (this.isStopped) {
        handleStoppedNotification(errorNotification(err), this);
      } else {
        this.isStopped = true;
        this._error(err);
      }
    };
    Subscriber2.prototype.complete = function() {
      if (this.isStopped) {
        handleStoppedNotification(COMPLETE_NOTIFICATION, this);
      } else {
        this.isStopped = true;
        this._complete();
      }
    };
    Subscriber2.prototype.unsubscribe = function() {
      if (!this.closed) {
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
        this.destination = null;
      }
    };
    Subscriber2.prototype._next = function(value) {
      this.destination.next(value);
    };
    Subscriber2.prototype._error = function(err) {
      try {
        this.destination.error(err);
      } finally {
        this.unsubscribe();
      }
    };
    Subscriber2.prototype._complete = function() {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    };
    return Subscriber2;
  }(Subscription);
  var _bind = Function.prototype.bind;
  function bind(fn, thisArg) {
    return _bind.call(fn, thisArg);
  }
  var ConsumerObserver = function() {
    function ConsumerObserver2(partialObserver) {
      this.partialObserver = partialObserver;
    }
    ConsumerObserver2.prototype.next = function(value) {
      var partialObserver = this.partialObserver;
      if (partialObserver.next) {
        try {
          partialObserver.next(value);
        } catch (error) {
          handleUnhandledError(error);
        }
      }
    };
    ConsumerObserver2.prototype.error = function(err) {
      var partialObserver = this.partialObserver;
      if (partialObserver.error) {
        try {
          partialObserver.error(err);
        } catch (error) {
          handleUnhandledError(error);
        }
      } else {
        handleUnhandledError(err);
      }
    };
    ConsumerObserver2.prototype.complete = function() {
      var partialObserver = this.partialObserver;
      if (partialObserver.complete) {
        try {
          partialObserver.complete();
        } catch (error) {
          handleUnhandledError(error);
        }
      }
    };
    return ConsumerObserver2;
  }();
  var SafeSubscriber = function(_super) {
    __extends(SafeSubscriber2, _super);
    function SafeSubscriber2(observerOrNext, error, complete) {
      var _this = _super.call(this) || this;
      var partialObserver;
      if (isFunction(observerOrNext) || !observerOrNext) {
        partialObserver = {
          next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
          error: error !== null && error !== void 0 ? error : void 0,
          complete: complete !== null && complete !== void 0 ? complete : void 0
        };
      } else {
        var context_1;
        if (_this && config.useDeprecatedNextContext) {
          context_1 = Object.create(observerOrNext);
          context_1.unsubscribe = function() {
            return _this.unsubscribe();
          };
          partialObserver = {
            next: observerOrNext.next && bind(observerOrNext.next, context_1),
            error: observerOrNext.error && bind(observerOrNext.error, context_1),
            complete: observerOrNext.complete && bind(observerOrNext.complete, context_1)
          };
        } else {
          partialObserver = observerOrNext;
        }
      }
      _this.destination = new ConsumerObserver(partialObserver);
      return _this;
    }
    return SafeSubscriber2;
  }(Subscriber);
  function handleUnhandledError(error) {
    if (config.useDeprecatedSynchronousErrorHandling) {
      captureError(error);
    } else {
      reportUnhandledError(error);
    }
  }
  function defaultErrorHandler(err) {
    throw err;
  }
  function handleStoppedNotification(notification, subscriber) {
    var onStoppedNotification = config.onStoppedNotification;
    onStoppedNotification && timeoutProvider.setTimeout(function() {
      return onStoppedNotification(notification, subscriber);
    });
  }
  var EMPTY_OBSERVER = {
    closed: true,
    next: noop,
    error: defaultErrorHandler,
    complete: noop
  };

  // node_modules/rxjs/dist/esm5/internal/symbol/observable.js
  var observable = function() {
    return typeof Symbol === "function" && Symbol.observable || "@@observable";
  }();

  // node_modules/rxjs/dist/esm5/internal/util/identity.js
  function identity(x) {
    return x;
  }

  // node_modules/rxjs/dist/esm5/internal/util/pipe.js
  function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      fns[_i] = arguments[_i];
    }
    return pipeFromArray(fns);
  }
  function pipeFromArray(fns) {
    if (fns.length === 0) {
      return identity;
    }
    if (fns.length === 1) {
      return fns[0];
    }
    return function piped(input) {
      return fns.reduce(function(prev, fn) {
        return fn(prev);
      }, input);
    };
  }

  // node_modules/rxjs/dist/esm5/internal/Observable.js
  var Observable = function() {
    function Observable51(subscribe) {
      if (subscribe) {
        this._subscribe = subscribe;
      }
    }
    Observable51.prototype.lift = function(operator) {
      var observable2 = new Observable51();
      observable2.source = this;
      observable2.operator = operator;
      return observable2;
    };
    Observable51.prototype.subscribe = function(observerOrNext, error, complete) {
      var _this = this;
      var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
      errorContext(function() {
        var _a2 = _this, operator = _a2.operator, source = _a2.source;
        subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
      });
      return subscriber;
    };
    Observable51.prototype._trySubscribe = function(sink) {
      try {
        return this._subscribe(sink);
      } catch (err) {
        sink.error(err);
      }
    };
    Observable51.prototype.forEach = function(next, promiseCtor) {
      var _this = this;
      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor(function(resolve, reject) {
        var subscriber = new SafeSubscriber({
          next: function(value) {
            try {
              next(value);
            } catch (err) {
              reject(err);
              subscriber.unsubscribe();
            }
          },
          error: reject,
          complete: resolve
        });
        _this.subscribe(subscriber);
      });
    };
    Observable51.prototype._subscribe = function(subscriber) {
      var _a2;
      return (_a2 = this.source) === null || _a2 === void 0 ? void 0 : _a2.subscribe(subscriber);
    };
    Observable51.prototype[observable] = function() {
      return this;
    };
    Observable51.prototype.pipe = function() {
      var operations = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        operations[_i] = arguments[_i];
      }
      return pipeFromArray(operations)(this);
    };
    Observable51.prototype.toPromise = function(promiseCtor) {
      var _this = this;
      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor(function(resolve, reject) {
        var value;
        _this.subscribe(function(x) {
          return value = x;
        }, function(err) {
          return reject(err);
        }, function() {
          return resolve(value);
        });
      });
    };
    Observable51.create = function(subscribe) {
      return new Observable51(subscribe);
    };
    return Observable51;
  }();
  function getPromiseCtor(promiseCtor) {
    var _a2;
    return (_a2 = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a2 !== void 0 ? _a2 : Promise;
  }
  function isObserver(value) {
    return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
  }
  function isSubscriber(value) {
    return value && value instanceof Subscriber || isObserver(value) && isSubscription(value);
  }

  // node_modules/rxjs/dist/esm5/internal/util/lift.js
  function hasLift(source) {
    return isFunction(source === null || source === void 0 ? void 0 : source.lift);
  }
  function operate(init) {
    return function(source) {
      if (hasLift(source)) {
        return source.lift(function(liftedSource) {
          try {
            return init(liftedSource, this);
          } catch (err) {
            this.error(err);
          }
        });
      }
      throw new TypeError("Unable to lift unknown Observable type");
    };
  }

  // node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js
  function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
    return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
  }
  var OperatorSubscriber = function(_super) {
    __extends(OperatorSubscriber2, _super);
    function OperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
      var _this = _super.call(this, destination) || this;
      _this.onFinalize = onFinalize;
      _this.shouldUnsubscribe = shouldUnsubscribe;
      _this._next = onNext ? function(value) {
        try {
          onNext(value);
        } catch (err) {
          destination.error(err);
        }
      } : _super.prototype._next;
      _this._error = onError ? function(err) {
        try {
          onError(err);
        } catch (err2) {
          destination.error(err2);
        } finally {
          this.unsubscribe();
        }
      } : _super.prototype._error;
      _this._complete = onComplete ? function() {
        try {
          onComplete();
        } catch (err) {
          destination.error(err);
        } finally {
          this.unsubscribe();
        }
      } : _super.prototype._complete;
      return _this;
    }
    OperatorSubscriber2.prototype.unsubscribe = function() {
      var _a2;
      if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
        var closed_1 = this.closed;
        _super.prototype.unsubscribe.call(this);
        !closed_1 && ((_a2 = this.onFinalize) === null || _a2 === void 0 ? void 0 : _a2.call(this));
      }
    };
    return OperatorSubscriber2;
  }(Subscriber);

  // node_modules/rxjs/dist/esm5/internal/scheduler/animationFrameProvider.js
  var animationFrameProvider = {
    schedule: function(callback) {
      var request2 = requestAnimationFrame;
      var cancel = cancelAnimationFrame;
      var delegate = animationFrameProvider.delegate;
      if (delegate) {
        request2 = delegate.requestAnimationFrame;
        cancel = delegate.cancelAnimationFrame;
      }
      var handle = request2(function(timestamp) {
        cancel = void 0;
        callback(timestamp);
      });
      return new Subscription(function() {
        return cancel === null || cancel === void 0 ? void 0 : cancel(handle);
      });
    },
    requestAnimationFrame: function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var delegate = animationFrameProvider.delegate;
      return ((delegate === null || delegate === void 0 ? void 0 : delegate.requestAnimationFrame) || requestAnimationFrame).apply(void 0, __spreadArray([], __read(args)));
    },
    cancelAnimationFrame: function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var delegate = animationFrameProvider.delegate;
      return ((delegate === null || delegate === void 0 ? void 0 : delegate.cancelAnimationFrame) || cancelAnimationFrame).apply(void 0, __spreadArray([], __read(args)));
    },
    delegate: void 0
  };

  // node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js
  var ObjectUnsubscribedError = createErrorClass(function(_super) {
    return function ObjectUnsubscribedErrorImpl() {
      _super(this);
      this.name = "ObjectUnsubscribedError";
      this.message = "object unsubscribed";
    };
  });

  // node_modules/rxjs/dist/esm5/internal/Subject.js
  var Subject = function(_super) {
    __extends(Subject7, _super);
    function Subject7() {
      var _this = _super.call(this) || this;
      _this.closed = false;
      _this.currentObservers = null;
      _this.observers = [];
      _this.isStopped = false;
      _this.hasError = false;
      _this.thrownError = null;
      return _this;
    }
    Subject7.prototype.lift = function(operator) {
      var subject = new AnonymousSubject(this, this);
      subject.operator = operator;
      return subject;
    };
    Subject7.prototype._throwIfClosed = function() {
      if (this.closed) {
        throw new ObjectUnsubscribedError();
      }
    };
    Subject7.prototype.next = function(value) {
      var _this = this;
      errorContext(function() {
        var e_1, _a2;
        _this._throwIfClosed();
        if (!_this.isStopped) {
          if (!_this.currentObservers) {
            _this.currentObservers = Array.from(_this.observers);
          }
          try {
            for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
              var observer = _c.value;
              observer.next(value);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_c && !_c.done && (_a2 = _b.return))
                _a2.call(_b);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
        }
      });
    };
    Subject7.prototype.error = function(err) {
      var _this = this;
      errorContext(function() {
        _this._throwIfClosed();
        if (!_this.isStopped) {
          _this.hasError = _this.isStopped = true;
          _this.thrownError = err;
          var observers2 = _this.observers;
          while (observers2.length) {
            observers2.shift().error(err);
          }
        }
      });
    };
    Subject7.prototype.complete = function() {
      var _this = this;
      errorContext(function() {
        _this._throwIfClosed();
        if (!_this.isStopped) {
          _this.isStopped = true;
          var observers2 = _this.observers;
          while (observers2.length) {
            observers2.shift().complete();
          }
        }
      });
    };
    Subject7.prototype.unsubscribe = function() {
      this.isStopped = this.closed = true;
      this.observers = this.currentObservers = null;
    };
    Object.defineProperty(Subject7.prototype, "observed", {
      get: function() {
        var _a2;
        return ((_a2 = this.observers) === null || _a2 === void 0 ? void 0 : _a2.length) > 0;
      },
      enumerable: false,
      configurable: true
    });
    Subject7.prototype._trySubscribe = function(subscriber) {
      this._throwIfClosed();
      return _super.prototype._trySubscribe.call(this, subscriber);
    };
    Subject7.prototype._subscribe = function(subscriber) {
      this._throwIfClosed();
      this._checkFinalizedStatuses(subscriber);
      return this._innerSubscribe(subscriber);
    };
    Subject7.prototype._innerSubscribe = function(subscriber) {
      var _this = this;
      var _a2 = this, hasError = _a2.hasError, isStopped = _a2.isStopped, observers2 = _a2.observers;
      if (hasError || isStopped) {
        return EMPTY_SUBSCRIPTION;
      }
      this.currentObservers = null;
      observers2.push(subscriber);
      return new Subscription(function() {
        _this.currentObservers = null;
        arrRemove(observers2, subscriber);
      });
    };
    Subject7.prototype._checkFinalizedStatuses = function(subscriber) {
      var _a2 = this, hasError = _a2.hasError, thrownError = _a2.thrownError, isStopped = _a2.isStopped;
      if (hasError) {
        subscriber.error(thrownError);
      } else if (isStopped) {
        subscriber.complete();
      }
    };
    Subject7.prototype.asObservable = function() {
      var observable2 = new Observable();
      observable2.source = this;
      return observable2;
    };
    Subject7.create = function(destination, source) {
      return new AnonymousSubject(destination, source);
    };
    return Subject7;
  }(Observable);
  var AnonymousSubject = function(_super) {
    __extends(AnonymousSubject2, _super);
    function AnonymousSubject2(destination, source) {
      var _this = _super.call(this) || this;
      _this.destination = destination;
      _this.source = source;
      return _this;
    }
    AnonymousSubject2.prototype.next = function(value) {
      var _a2, _b;
      (_b = (_a2 = this.destination) === null || _a2 === void 0 ? void 0 : _a2.next) === null || _b === void 0 ? void 0 : _b.call(_a2, value);
    };
    AnonymousSubject2.prototype.error = function(err) {
      var _a2, _b;
      (_b = (_a2 = this.destination) === null || _a2 === void 0 ? void 0 : _a2.error) === null || _b === void 0 ? void 0 : _b.call(_a2, err);
    };
    AnonymousSubject2.prototype.complete = function() {
      var _a2, _b;
      (_b = (_a2 = this.destination) === null || _a2 === void 0 ? void 0 : _a2.complete) === null || _b === void 0 ? void 0 : _b.call(_a2);
    };
    AnonymousSubject2.prototype._subscribe = function(subscriber) {
      var _a2, _b;
      return (_b = (_a2 = this.source) === null || _a2 === void 0 ? void 0 : _a2.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
    };
    return AnonymousSubject2;
  }(Subject);

  // node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js
  var dateTimestampProvider = {
    now: function() {
      return (dateTimestampProvider.delegate || Date).now();
    },
    delegate: void 0
  };

  // node_modules/rxjs/dist/esm5/internal/ReplaySubject.js
  var ReplaySubject = function(_super) {
    __extends(ReplaySubject2, _super);
    function ReplaySubject2(_bufferSize, _windowTime, _timestampProvider) {
      if (_bufferSize === void 0) {
        _bufferSize = Infinity;
      }
      if (_windowTime === void 0) {
        _windowTime = Infinity;
      }
      if (_timestampProvider === void 0) {
        _timestampProvider = dateTimestampProvider;
      }
      var _this = _super.call(this) || this;
      _this._bufferSize = _bufferSize;
      _this._windowTime = _windowTime;
      _this._timestampProvider = _timestampProvider;
      _this._buffer = [];
      _this._infiniteTimeWindow = true;
      _this._infiniteTimeWindow = _windowTime === Infinity;
      _this._bufferSize = Math.max(1, _bufferSize);
      _this._windowTime = Math.max(1, _windowTime);
      return _this;
    }
    ReplaySubject2.prototype.next = function(value) {
      var _a2 = this, isStopped = _a2.isStopped, _buffer = _a2._buffer, _infiniteTimeWindow = _a2._infiniteTimeWindow, _timestampProvider = _a2._timestampProvider, _windowTime = _a2._windowTime;
      if (!isStopped) {
        _buffer.push(value);
        !_infiniteTimeWindow && _buffer.push(_timestampProvider.now() + _windowTime);
      }
      this._trimBuffer();
      _super.prototype.next.call(this, value);
    };
    ReplaySubject2.prototype._subscribe = function(subscriber) {
      this._throwIfClosed();
      this._trimBuffer();
      var subscription = this._innerSubscribe(subscriber);
      var _a2 = this, _infiniteTimeWindow = _a2._infiniteTimeWindow, _buffer = _a2._buffer;
      var copy = _buffer.slice();
      for (var i = 0; i < copy.length && !subscriber.closed; i += _infiniteTimeWindow ? 1 : 2) {
        subscriber.next(copy[i]);
      }
      this._checkFinalizedStatuses(subscriber);
      return subscription;
    };
    ReplaySubject2.prototype._trimBuffer = function() {
      var _a2 = this, _bufferSize = _a2._bufferSize, _timestampProvider = _a2._timestampProvider, _buffer = _a2._buffer, _infiniteTimeWindow = _a2._infiniteTimeWindow;
      var adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
      _bufferSize < Infinity && adjustedBufferSize < _buffer.length && _buffer.splice(0, _buffer.length - adjustedBufferSize);
      if (!_infiniteTimeWindow) {
        var now = _timestampProvider.now();
        var last2 = 0;
        for (var i = 1; i < _buffer.length && _buffer[i] <= now; i += 2) {
          last2 = i;
        }
        last2 && _buffer.splice(0, last2 + 1);
      }
    };
    return ReplaySubject2;
  }(Subject);

  // node_modules/rxjs/dist/esm5/internal/scheduler/Action.js
  var Action = function(_super) {
    __extends(Action2, _super);
    function Action2(scheduler, work) {
      return _super.call(this) || this;
    }
    Action2.prototype.schedule = function(state, delay2) {
      if (delay2 === void 0) {
        delay2 = 0;
      }
      return this;
    };
    return Action2;
  }(Subscription);

  // node_modules/rxjs/dist/esm5/internal/scheduler/intervalProvider.js
  var intervalProvider = {
    setInterval: function(handler, timeout) {
      var args = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
      }
      var delegate = intervalProvider.delegate;
      if (delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) {
        return delegate.setInterval.apply(delegate, __spreadArray([handler, timeout], __read(args)));
      }
      return setInterval.apply(void 0, __spreadArray([handler, timeout], __read(args)));
    },
    clearInterval: function(handle) {
      var delegate = intervalProvider.delegate;
      return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
    },
    delegate: void 0
  };

  // node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js
  var AsyncAction = function(_super) {
    __extends(AsyncAction2, _super);
    function AsyncAction2(scheduler, work) {
      var _this = _super.call(this, scheduler, work) || this;
      _this.scheduler = scheduler;
      _this.work = work;
      _this.pending = false;
      return _this;
    }
    AsyncAction2.prototype.schedule = function(state, delay2) {
      var _a2;
      if (delay2 === void 0) {
        delay2 = 0;
      }
      if (this.closed) {
        return this;
      }
      this.state = state;
      var id = this.id;
      var scheduler = this.scheduler;
      if (id != null) {
        this.id = this.recycleAsyncId(scheduler, id, delay2);
      }
      this.pending = true;
      this.delay = delay2;
      this.id = (_a2 = this.id) !== null && _a2 !== void 0 ? _a2 : this.requestAsyncId(scheduler, this.id, delay2);
      return this;
    };
    AsyncAction2.prototype.requestAsyncId = function(scheduler, _id, delay2) {
      if (delay2 === void 0) {
        delay2 = 0;
      }
      return intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay2);
    };
    AsyncAction2.prototype.recycleAsyncId = function(_scheduler, id, delay2) {
      if (delay2 === void 0) {
        delay2 = 0;
      }
      if (delay2 != null && this.delay === delay2 && this.pending === false) {
        return id;
      }
      if (id != null) {
        intervalProvider.clearInterval(id);
      }
      return void 0;
    };
    AsyncAction2.prototype.execute = function(state, delay2) {
      if (this.closed) {
        return new Error("executing a cancelled action");
      }
      this.pending = false;
      var error = this._execute(state, delay2);
      if (error) {
        return error;
      } else if (this.pending === false && this.id != null) {
        this.id = this.recycleAsyncId(this.scheduler, this.id, null);
      }
    };
    AsyncAction2.prototype._execute = function(state, _delay) {
      var errored = false;
      var errorValue;
      try {
        this.work(state);
      } catch (e) {
        errored = true;
        errorValue = e ? e : new Error("Scheduled action threw falsy error");
      }
      if (errored) {
        this.unsubscribe();
        return errorValue;
      }
    };
    AsyncAction2.prototype.unsubscribe = function() {
      if (!this.closed) {
        var _a2 = this, id = _a2.id, scheduler = _a2.scheduler;
        var actions = scheduler.actions;
        this.work = this.state = this.scheduler = null;
        this.pending = false;
        arrRemove(actions, this);
        if (id != null) {
          this.id = this.recycleAsyncId(scheduler, id, null);
        }
        this.delay = null;
        _super.prototype.unsubscribe.call(this);
      }
    };
    return AsyncAction2;
  }(Action);

  // node_modules/rxjs/dist/esm5/internal/Scheduler.js
  var Scheduler = function() {
    function Scheduler2(schedulerActionCtor, now) {
      if (now === void 0) {
        now = Scheduler2.now;
      }
      this.schedulerActionCtor = schedulerActionCtor;
      this.now = now;
    }
    Scheduler2.prototype.schedule = function(work, delay2, state) {
      if (delay2 === void 0) {
        delay2 = 0;
      }
      return new this.schedulerActionCtor(this, work).schedule(state, delay2);
    };
    Scheduler2.now = dateTimestampProvider.now;
    return Scheduler2;
  }();

  // node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js
  var AsyncScheduler = function(_super) {
    __extends(AsyncScheduler2, _super);
    function AsyncScheduler2(SchedulerAction, now) {
      if (now === void 0) {
        now = Scheduler.now;
      }
      var _this = _super.call(this, SchedulerAction, now) || this;
      _this.actions = [];
      _this._active = false;
      return _this;
    }
    AsyncScheduler2.prototype.flush = function(action) {
      var actions = this.actions;
      if (this._active) {
        actions.push(action);
        return;
      }
      var error;
      this._active = true;
      do {
        if (error = action.execute(action.state, action.delay)) {
          break;
        }
      } while (action = actions.shift());
      this._active = false;
      if (error) {
        while (action = actions.shift()) {
          action.unsubscribe();
        }
        throw error;
      }
    };
    return AsyncScheduler2;
  }(Scheduler);

  // node_modules/rxjs/dist/esm5/internal/scheduler/async.js
  var asyncScheduler = new AsyncScheduler(AsyncAction);
  var async = asyncScheduler;

  // node_modules/rxjs/dist/esm5/internal/scheduler/AnimationFrameAction.js
  var AnimationFrameAction = function(_super) {
    __extends(AnimationFrameAction2, _super);
    function AnimationFrameAction2(scheduler, work) {
      var _this = _super.call(this, scheduler, work) || this;
      _this.scheduler = scheduler;
      _this.work = work;
      return _this;
    }
    AnimationFrameAction2.prototype.requestAsyncId = function(scheduler, id, delay2) {
      if (delay2 === void 0) {
        delay2 = 0;
      }
      if (delay2 !== null && delay2 > 0) {
        return _super.prototype.requestAsyncId.call(this, scheduler, id, delay2);
      }
      scheduler.actions.push(this);
      return scheduler._scheduled || (scheduler._scheduled = animationFrameProvider.requestAnimationFrame(function() {
        return scheduler.flush(void 0);
      }));
    };
    AnimationFrameAction2.prototype.recycleAsyncId = function(scheduler, id, delay2) {
      var _a2;
      if (delay2 === void 0) {
        delay2 = 0;
      }
      if (delay2 != null ? delay2 > 0 : this.delay > 0) {
        return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay2);
      }
      var actions = scheduler.actions;
      if (id != null && ((_a2 = actions[actions.length - 1]) === null || _a2 === void 0 ? void 0 : _a2.id) !== id) {
        animationFrameProvider.cancelAnimationFrame(id);
        scheduler._scheduled = void 0;
      }
      return void 0;
    };
    return AnimationFrameAction2;
  }(AsyncAction);

  // node_modules/rxjs/dist/esm5/internal/scheduler/AnimationFrameScheduler.js
  var AnimationFrameScheduler = function(_super) {
    __extends(AnimationFrameScheduler2, _super);
    function AnimationFrameScheduler2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    AnimationFrameScheduler2.prototype.flush = function(action) {
      this._active = true;
      var flushId = this._scheduled;
      this._scheduled = void 0;
      var actions = this.actions;
      var error;
      action = action || actions.shift();
      do {
        if (error = action.execute(action.state, action.delay)) {
          break;
        }
      } while ((action = actions[0]) && action.id === flushId && actions.shift());
      this._active = false;
      if (error) {
        while ((action = actions[0]) && action.id === flushId && actions.shift()) {
          action.unsubscribe();
        }
        throw error;
      }
    };
    return AnimationFrameScheduler2;
  }(AsyncScheduler);

  // node_modules/rxjs/dist/esm5/internal/scheduler/animationFrame.js
  var animationFrameScheduler = new AnimationFrameScheduler(AnimationFrameAction);

  // node_modules/rxjs/dist/esm5/internal/observable/empty.js
  var EMPTY = new Observable(function(subscriber) {
    return subscriber.complete();
  });

  // node_modules/rxjs/dist/esm5/internal/util/isScheduler.js
  function isScheduler(value) {
    return value && isFunction(value.schedule);
  }

  // node_modules/rxjs/dist/esm5/internal/util/args.js
  function last(arr) {
    return arr[arr.length - 1];
  }
  function popResultSelector(args) {
    return isFunction(last(args)) ? args.pop() : void 0;
  }
  function popScheduler(args) {
    return isScheduler(last(args)) ? args.pop() : void 0;
  }
  function popNumber(args, defaultValue) {
    return typeof last(args) === "number" ? args.pop() : defaultValue;
  }

  // node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js
  var isArrayLike = function(x) {
    return x && typeof x.length === "number" && typeof x !== "function";
  };

  // node_modules/rxjs/dist/esm5/internal/util/isPromise.js
  function isPromise(value) {
    return isFunction(value === null || value === void 0 ? void 0 : value.then);
  }

  // node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js
  function isInteropObservable(input) {
    return isFunction(input[observable]);
  }

  // node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js
  function isAsyncIterable(obj) {
    return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
  }

  // node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js
  function createInvalidObservableTypeError(input) {
    return new TypeError("You provided " + (input !== null && typeof input === "object" ? "an invalid object" : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
  }

  // node_modules/rxjs/dist/esm5/internal/symbol/iterator.js
  function getSymbolIterator() {
    if (typeof Symbol !== "function" || !Symbol.iterator) {
      return "@@iterator";
    }
    return Symbol.iterator;
  }
  var iterator = getSymbolIterator();

  // node_modules/rxjs/dist/esm5/internal/util/isIterable.js
  function isIterable(input) {
    return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
  }

  // node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js
  function readableStreamLikeToAsyncGenerator(readableStream) {
    return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
      var reader, _a2, value, done;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            reader = readableStream.getReader();
            _b.label = 1;
          case 1:
            _b.trys.push([1, , 9, 10]);
            _b.label = 2;
          case 2:
            if (false)
              return [3, 8];
            return [4, __await(reader.read())];
          case 3:
            _a2 = _b.sent(), value = _a2.value, done = _a2.done;
            if (!done)
              return [3, 5];
            return [4, __await(void 0)];
          case 4:
            return [2, _b.sent()];
          case 5:
            return [4, __await(value)];
          case 6:
            return [4, _b.sent()];
          case 7:
            _b.sent();
            return [3, 2];
          case 8:
            return [3, 10];
          case 9:
            reader.releaseLock();
            return [7];
          case 10:
            return [2];
        }
      });
    });
  }
  function isReadableStreamLike(obj) {
    return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
  }

  // node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js
  function innerFrom(input) {
    if (input instanceof Observable) {
      return input;
    }
    if (input != null) {
      if (isInteropObservable(input)) {
        return fromInteropObservable(input);
      }
      if (isArrayLike(input)) {
        return fromArrayLike(input);
      }
      if (isPromise(input)) {
        return fromPromise(input);
      }
      if (isAsyncIterable(input)) {
        return fromAsyncIterable(input);
      }
      if (isIterable(input)) {
        return fromIterable(input);
      }
      if (isReadableStreamLike(input)) {
        return fromReadableStreamLike(input);
      }
    }
    throw createInvalidObservableTypeError(input);
  }
  function fromInteropObservable(obj) {
    return new Observable(function(subscriber) {
      var obs = obj[observable]();
      if (isFunction(obs.subscribe)) {
        return obs.subscribe(subscriber);
      }
      throw new TypeError("Provided object does not correctly implement Symbol.observable");
    });
  }
  function fromArrayLike(array) {
    return new Observable(function(subscriber) {
      for (var i = 0; i < array.length && !subscriber.closed; i++) {
        subscriber.next(array[i]);
      }
      subscriber.complete();
    });
  }
  function fromPromise(promise) {
    return new Observable(function(subscriber) {
      promise.then(function(value) {
        if (!subscriber.closed) {
          subscriber.next(value);
          subscriber.complete();
        }
      }, function(err) {
        return subscriber.error(err);
      }).then(null, reportUnhandledError);
    });
  }
  function fromIterable(iterable) {
    return new Observable(function(subscriber) {
      var e_1, _a2;
      try {
        for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
          var value = iterable_1_1.value;
          subscriber.next(value);
          if (subscriber.closed) {
            return;
          }
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (iterable_1_1 && !iterable_1_1.done && (_a2 = iterable_1.return))
            _a2.call(iterable_1);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
      subscriber.complete();
    });
  }
  function fromAsyncIterable(asyncIterable) {
    return new Observable(function(subscriber) {
      process(asyncIterable, subscriber).catch(function(err) {
        return subscriber.error(err);
      });
    });
  }
  function fromReadableStreamLike(readableStream) {
    return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
  }
  function process(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_2, _a2;
    return __awaiter(this, void 0, void 0, function() {
      var value, e_2_1;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 5, 6, 11]);
            asyncIterable_1 = __asyncValues(asyncIterable);
            _b.label = 1;
          case 1:
            return [4, asyncIterable_1.next()];
          case 2:
            if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done))
              return [3, 4];
            value = asyncIterable_1_1.value;
            subscriber.next(value);
            if (subscriber.closed) {
              return [2];
            }
            _b.label = 3;
          case 3:
            return [3, 1];
          case 4:
            return [3, 11];
          case 5:
            e_2_1 = _b.sent();
            e_2 = { error: e_2_1 };
            return [3, 11];
          case 6:
            _b.trys.push([6, , 9, 10]);
            if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a2 = asyncIterable_1.return)))
              return [3, 8];
            return [4, _a2.call(asyncIterable_1)];
          case 7:
            _b.sent();
            _b.label = 8;
          case 8:
            return [3, 10];
          case 9:
            if (e_2)
              throw e_2.error;
            return [7];
          case 10:
            return [7];
          case 11:
            subscriber.complete();
            return [2];
        }
      });
    });
  }

  // node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js
  function executeSchedule(parentSubscription, scheduler, work, delay2, repeat2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    if (repeat2 === void 0) {
      repeat2 = false;
    }
    var scheduleSubscription = scheduler.schedule(function() {
      work();
      if (repeat2) {
        parentSubscription.add(this.schedule(null, delay2));
      } else {
        this.unsubscribe();
      }
    }, delay2);
    parentSubscription.add(scheduleSubscription);
    if (!repeat2) {
      return scheduleSubscription;
    }
  }

  // node_modules/rxjs/dist/esm5/internal/operators/observeOn.js
  function observeOn(scheduler, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    return operate(function(source, subscriber) {
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        return executeSchedule(subscriber, scheduler, function() {
          return subscriber.next(value);
        }, delay2);
      }, function() {
        return executeSchedule(subscriber, scheduler, function() {
          return subscriber.complete();
        }, delay2);
      }, function(err) {
        return executeSchedule(subscriber, scheduler, function() {
          return subscriber.error(err);
        }, delay2);
      }));
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js
  function subscribeOn(scheduler, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    return operate(function(source, subscriber) {
      subscriber.add(scheduler.schedule(function() {
        return source.subscribe(subscriber);
      }, delay2));
    });
  }

  // node_modules/rxjs/dist/esm5/internal/scheduled/scheduleObservable.js
  function scheduleObservable(input, scheduler) {
    return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
  }

  // node_modules/rxjs/dist/esm5/internal/scheduled/schedulePromise.js
  function schedulePromise(input, scheduler) {
    return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
  }

  // node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js
  function scheduleArray(input, scheduler) {
    return new Observable(function(subscriber) {
      var i = 0;
      return scheduler.schedule(function() {
        if (i === input.length) {
          subscriber.complete();
        } else {
          subscriber.next(input[i++]);
          if (!subscriber.closed) {
            this.schedule();
          }
        }
      });
    });
  }

  // node_modules/rxjs/dist/esm5/internal/scheduled/scheduleIterable.js
  function scheduleIterable(input, scheduler) {
    return new Observable(function(subscriber) {
      var iterator2;
      executeSchedule(subscriber, scheduler, function() {
        iterator2 = input[iterator]();
        executeSchedule(subscriber, scheduler, function() {
          var _a2;
          var value;
          var done;
          try {
            _a2 = iterator2.next(), value = _a2.value, done = _a2.done;
          } catch (err) {
            subscriber.error(err);
            return;
          }
          if (done) {
            subscriber.complete();
          } else {
            subscriber.next(value);
          }
        }, 0, true);
      });
      return function() {
        return isFunction(iterator2 === null || iterator2 === void 0 ? void 0 : iterator2.return) && iterator2.return();
      };
    });
  }

  // node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js
  function scheduleAsyncIterable(input, scheduler) {
    if (!input) {
      throw new Error("Iterable cannot be null");
    }
    return new Observable(function(subscriber) {
      executeSchedule(subscriber, scheduler, function() {
        var iterator2 = input[Symbol.asyncIterator]();
        executeSchedule(subscriber, scheduler, function() {
          iterator2.next().then(function(result) {
            if (result.done) {
              subscriber.complete();
            } else {
              subscriber.next(result.value);
            }
          });
        }, 0, true);
      });
    });
  }

  // node_modules/rxjs/dist/esm5/internal/scheduled/scheduleReadableStreamLike.js
  function scheduleReadableStreamLike(input, scheduler) {
    return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input), scheduler);
  }

  // node_modules/rxjs/dist/esm5/internal/scheduled/scheduled.js
  function scheduled(input, scheduler) {
    if (input != null) {
      if (isInteropObservable(input)) {
        return scheduleObservable(input, scheduler);
      }
      if (isArrayLike(input)) {
        return scheduleArray(input, scheduler);
      }
      if (isPromise(input)) {
        return schedulePromise(input, scheduler);
      }
      if (isAsyncIterable(input)) {
        return scheduleAsyncIterable(input, scheduler);
      }
      if (isIterable(input)) {
        return scheduleIterable(input, scheduler);
      }
      if (isReadableStreamLike(input)) {
        return scheduleReadableStreamLike(input, scheduler);
      }
    }
    throw createInvalidObservableTypeError(input);
  }

  // node_modules/rxjs/dist/esm5/internal/observable/from.js
  function from(input, scheduler) {
    return scheduler ? scheduled(input, scheduler) : innerFrom(input);
  }

  // node_modules/rxjs/dist/esm5/internal/observable/of.js
  function of() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var scheduler = popScheduler(args);
    return from(args, scheduler);
  }

  // node_modules/rxjs/dist/esm5/internal/observable/throwError.js
  function throwError(errorOrErrorFactory, scheduler) {
    var errorFactory = isFunction(errorOrErrorFactory) ? errorOrErrorFactory : function() {
      return errorOrErrorFactory;
    };
    var init = function(subscriber) {
      return subscriber.error(errorFactory());
    };
    return new Observable(scheduler ? function(subscriber) {
      return scheduler.schedule(init, 0, subscriber);
    } : init);
  }

  // node_modules/rxjs/dist/esm5/internal/util/isDate.js
  function isValidDate(value) {
    return value instanceof Date && !isNaN(value);
  }

  // node_modules/rxjs/dist/esm5/internal/operators/map.js
  function map(project, thisArg) {
    return operate(function(source, subscriber) {
      var index2 = 0;
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        subscriber.next(project.call(thisArg, value, index2++));
      }));
    });
  }

  // node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js
  var isArray = Array.isArray;
  function callOrApply(fn, args) {
    return isArray(args) ? fn.apply(void 0, __spreadArray([], __read(args))) : fn(args);
  }
  function mapOneOrManyArgs(fn) {
    return map(function(args) {
      return callOrApply(fn, args);
    });
  }

  // node_modules/rxjs/dist/esm5/internal/util/argsArgArrayOrObject.js
  var isArray2 = Array.isArray;
  var getPrototypeOf = Object.getPrototypeOf;
  var objectProto = Object.prototype;
  var getKeys = Object.keys;
  function argsArgArrayOrObject(args) {
    if (args.length === 1) {
      var first_1 = args[0];
      if (isArray2(first_1)) {
        return { args: first_1, keys: null };
      }
      if (isPOJO(first_1)) {
        var keys = getKeys(first_1);
        return {
          args: keys.map(function(key) {
            return first_1[key];
          }),
          keys
        };
      }
    }
    return { args, keys: null };
  }
  function isPOJO(obj) {
    return obj && typeof obj === "object" && getPrototypeOf(obj) === objectProto;
  }

  // node_modules/rxjs/dist/esm5/internal/util/createObject.js
  function createObject(keys, values) {
    return keys.reduce(function(result, key, i) {
      return result[key] = values[i], result;
    }, {});
  }

  // node_modules/rxjs/dist/esm5/internal/observable/combineLatest.js
  function combineLatest() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var scheduler = popScheduler(args);
    var resultSelector = popResultSelector(args);
    var _a2 = argsArgArrayOrObject(args), observables = _a2.args, keys = _a2.keys;
    if (observables.length === 0) {
      return from([], scheduler);
    }
    var result = new Observable(combineLatestInit(observables, scheduler, keys ? function(values) {
      return createObject(keys, values);
    } : identity));
    return resultSelector ? result.pipe(mapOneOrManyArgs(resultSelector)) : result;
  }
  function combineLatestInit(observables, scheduler, valueTransform) {
    if (valueTransform === void 0) {
      valueTransform = identity;
    }
    return function(subscriber) {
      maybeSchedule(scheduler, function() {
        var length = observables.length;
        var values = new Array(length);
        var active = length;
        var remainingFirstValues = length;
        var _loop_1 = function(i2) {
          maybeSchedule(scheduler, function() {
            var source = from(observables[i2], scheduler);
            var hasFirstValue = false;
            source.subscribe(createOperatorSubscriber(subscriber, function(value) {
              values[i2] = value;
              if (!hasFirstValue) {
                hasFirstValue = true;
                remainingFirstValues--;
              }
              if (!remainingFirstValues) {
                subscriber.next(valueTransform(values.slice()));
              }
            }, function() {
              if (!--active) {
                subscriber.complete();
              }
            }));
          }, subscriber);
        };
        for (var i = 0; i < length; i++) {
          _loop_1(i);
        }
      }, subscriber);
    };
  }
  function maybeSchedule(scheduler, execute, subscription) {
    if (scheduler) {
      executeSchedule(subscription, scheduler, execute);
    } else {
      execute();
    }
  }

  // node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js
  function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
    var buffer = [];
    var active = 0;
    var index2 = 0;
    var isComplete = false;
    var checkComplete = function() {
      if (isComplete && !buffer.length && !active) {
        subscriber.complete();
      }
    };
    var outerNext = function(value) {
      return active < concurrent ? doInnerSub(value) : buffer.push(value);
    };
    var doInnerSub = function(value) {
      expand && subscriber.next(value);
      active++;
      var innerComplete = false;
      innerFrom(project(value, index2++)).subscribe(createOperatorSubscriber(subscriber, function(innerValue) {
        onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
        if (expand) {
          outerNext(innerValue);
        } else {
          subscriber.next(innerValue);
        }
      }, function() {
        innerComplete = true;
      }, void 0, function() {
        if (innerComplete) {
          try {
            active--;
            var _loop_1 = function() {
              var bufferedValue = buffer.shift();
              if (innerSubScheduler) {
                executeSchedule(subscriber, innerSubScheduler, function() {
                  return doInnerSub(bufferedValue);
                });
              } else {
                doInnerSub(bufferedValue);
              }
            };
            while (buffer.length && active < concurrent) {
              _loop_1();
            }
            checkComplete();
          } catch (err) {
            subscriber.error(err);
          }
        }
      }));
    };
    source.subscribe(createOperatorSubscriber(subscriber, outerNext, function() {
      isComplete = true;
      checkComplete();
    }));
    return function() {
      additionalFinalizer === null || additionalFinalizer === void 0 ? void 0 : additionalFinalizer();
    };
  }

  // node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js
  function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) {
      concurrent = Infinity;
    }
    if (isFunction(resultSelector)) {
      return mergeMap(function(a, i) {
        return map(function(b, ii) {
          return resultSelector(a, b, i, ii);
        })(innerFrom(project(a, i)));
      }, concurrent);
    } else if (typeof resultSelector === "number") {
      concurrent = resultSelector;
    }
    return operate(function(source, subscriber) {
      return mergeInternals(source, subscriber, project, concurrent);
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/mergeAll.js
  function mergeAll(concurrent) {
    if (concurrent === void 0) {
      concurrent = Infinity;
    }
    return mergeMap(identity, concurrent);
  }

  // node_modules/rxjs/dist/esm5/internal/operators/concatAll.js
  function concatAll() {
    return mergeAll(1);
  }

  // node_modules/rxjs/dist/esm5/internal/observable/concat.js
  function concat() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    return concatAll()(from(args, popScheduler(args)));
  }

  // node_modules/rxjs/dist/esm5/internal/observable/defer.js
  function defer(observableFactory) {
    return new Observable(function(subscriber) {
      innerFrom(observableFactory()).subscribe(subscriber);
    });
  }

  // node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js
  var nodeEventEmitterMethods = ["addListener", "removeListener"];
  var eventTargetMethods = ["addEventListener", "removeEventListener"];
  var jqueryMethods = ["on", "off"];
  function fromEvent(target, eventName, options, resultSelector) {
    if (isFunction(options)) {
      resultSelector = options;
      options = void 0;
    }
    if (resultSelector) {
      return fromEvent(target, eventName, options).pipe(mapOneOrManyArgs(resultSelector));
    }
    var _a2 = __read(isEventTarget(target) ? eventTargetMethods.map(function(methodName) {
      return function(handler) {
        return target[methodName](eventName, handler, options);
      };
    }) : isNodeStyleEventEmitter(target) ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(target, eventName)) : isJQueryStyleEventEmitter(target) ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName)) : [], 2), add = _a2[0], remove = _a2[1];
    if (!add) {
      if (isArrayLike(target)) {
        return mergeMap(function(subTarget) {
          return fromEvent(subTarget, eventName, options);
        })(innerFrom(target));
      }
    }
    if (!add) {
      throw new TypeError("Invalid event target");
    }
    return new Observable(function(subscriber) {
      var handler = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return subscriber.next(1 < args.length ? args : args[0]);
      };
      add(handler);
      return function() {
        return remove(handler);
      };
    });
  }
  function toCommonHandlerRegistry(target, eventName) {
    return function(methodName) {
      return function(handler) {
        return target[methodName](eventName, handler);
      };
    };
  }
  function isNodeStyleEventEmitter(target) {
    return isFunction(target.addListener) && isFunction(target.removeListener);
  }
  function isJQueryStyleEventEmitter(target) {
    return isFunction(target.on) && isFunction(target.off);
  }
  function isEventTarget(target) {
    return isFunction(target.addEventListener) && isFunction(target.removeEventListener);
  }

  // node_modules/rxjs/dist/esm5/internal/observable/fromEventPattern.js
  function fromEventPattern(addHandler, removeHandler, resultSelector) {
    if (resultSelector) {
      return fromEventPattern(addHandler, removeHandler).pipe(mapOneOrManyArgs(resultSelector));
    }
    return new Observable(function(subscriber) {
      var handler = function() {
        var e = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          e[_i] = arguments[_i];
        }
        return subscriber.next(e.length === 1 ? e[0] : e);
      };
      var retValue = addHandler(handler);
      return isFunction(removeHandler) ? function() {
        return removeHandler(handler, retValue);
      } : void 0;
    });
  }

  // node_modules/rxjs/dist/esm5/internal/observable/timer.js
  function timer(dueTime, intervalOrScheduler, scheduler) {
    if (dueTime === void 0) {
      dueTime = 0;
    }
    if (scheduler === void 0) {
      scheduler = async;
    }
    var intervalDuration = -1;
    if (intervalOrScheduler != null) {
      if (isScheduler(intervalOrScheduler)) {
        scheduler = intervalOrScheduler;
      } else {
        intervalDuration = intervalOrScheduler;
      }
    }
    return new Observable(function(subscriber) {
      var due = isValidDate(dueTime) ? +dueTime - scheduler.now() : dueTime;
      if (due < 0) {
        due = 0;
      }
      var n = 0;
      return scheduler.schedule(function() {
        if (!subscriber.closed) {
          subscriber.next(n++);
          if (0 <= intervalDuration) {
            this.schedule(void 0, intervalDuration);
          } else {
            subscriber.complete();
          }
        }
      }, due);
    });
  }

  // node_modules/rxjs/dist/esm5/internal/observable/merge.js
  function merge() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var scheduler = popScheduler(args);
    var concurrent = popNumber(args, Infinity);
    var sources = args;
    return !sources.length ? EMPTY : sources.length === 1 ? innerFrom(sources[0]) : mergeAll(concurrent)(from(sources, scheduler));
  }

  // node_modules/rxjs/dist/esm5/internal/observable/never.js
  var NEVER = new Observable(noop);

  // node_modules/rxjs/dist/esm5/internal/util/argsOrArgArray.js
  var isArray3 = Array.isArray;
  function argsOrArgArray(args) {
    return args.length === 1 && isArray3(args[0]) ? args[0] : args;
  }

  // node_modules/rxjs/dist/esm5/internal/operators/filter.js
  function filter(predicate, thisArg) {
    return operate(function(source, subscriber) {
      var index2 = 0;
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        return predicate.call(thisArg, value, index2++) && subscriber.next(value);
      }));
    });
  }

  // node_modules/rxjs/dist/esm5/internal/observable/zip.js
  function zip() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var resultSelector = popResultSelector(args);
    var sources = argsOrArgArray(args);
    return sources.length ? new Observable(function(subscriber) {
      var buffers = sources.map(function() {
        return [];
      });
      var completed = sources.map(function() {
        return false;
      });
      subscriber.add(function() {
        buffers = completed = null;
      });
      var _loop_1 = function(sourceIndex2) {
        innerFrom(sources[sourceIndex2]).subscribe(createOperatorSubscriber(subscriber, function(value) {
          buffers[sourceIndex2].push(value);
          if (buffers.every(function(buffer) {
            return buffer.length;
          })) {
            var result = buffers.map(function(buffer) {
              return buffer.shift();
            });
            subscriber.next(resultSelector ? resultSelector.apply(void 0, __spreadArray([], __read(result))) : result);
            if (buffers.some(function(buffer, i) {
              return !buffer.length && completed[i];
            })) {
              subscriber.complete();
            }
          }
        }, function() {
          completed[sourceIndex2] = true;
          !buffers[sourceIndex2].length && subscriber.complete();
        }));
      };
      for (var sourceIndex = 0; !subscriber.closed && sourceIndex < sources.length; sourceIndex++) {
        _loop_1(sourceIndex);
      }
      return function() {
        buffers = completed = null;
      };
    }) : EMPTY;
  }

  // node_modules/rxjs/dist/esm5/internal/operators/audit.js
  function audit(durationSelector) {
    return operate(function(source, subscriber) {
      var hasValue = false;
      var lastValue = null;
      var durationSubscriber = null;
      var isComplete = false;
      var endDuration = function() {
        durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
        durationSubscriber = null;
        if (hasValue) {
          hasValue = false;
          var value = lastValue;
          lastValue = null;
          subscriber.next(value);
        }
        isComplete && subscriber.complete();
      };
      var cleanupDuration = function() {
        durationSubscriber = null;
        isComplete && subscriber.complete();
      };
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        hasValue = true;
        lastValue = value;
        if (!durationSubscriber) {
          innerFrom(durationSelector(value)).subscribe(durationSubscriber = createOperatorSubscriber(subscriber, endDuration, cleanupDuration));
        }
      }, function() {
        isComplete = true;
        (!hasValue || !durationSubscriber || durationSubscriber.closed) && subscriber.complete();
      }));
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/auditTime.js
  function auditTime(duration, scheduler) {
    if (scheduler === void 0) {
      scheduler = asyncScheduler;
    }
    return audit(function() {
      return timer(duration, scheduler);
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/bufferCount.js
  function bufferCount(bufferSize, startBufferEvery) {
    if (startBufferEvery === void 0) {
      startBufferEvery = null;
    }
    startBufferEvery = startBufferEvery !== null && startBufferEvery !== void 0 ? startBufferEvery : bufferSize;
    return operate(function(source, subscriber) {
      var buffers = [];
      var count = 0;
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        var e_1, _a2, e_2, _b;
        var toEmit = null;
        if (count++ % startBufferEvery === 0) {
          buffers.push([]);
        }
        try {
          for (var buffers_1 = __values(buffers), buffers_1_1 = buffers_1.next(); !buffers_1_1.done; buffers_1_1 = buffers_1.next()) {
            var buffer = buffers_1_1.value;
            buffer.push(value);
            if (bufferSize <= buffer.length) {
              toEmit = toEmit !== null && toEmit !== void 0 ? toEmit : [];
              toEmit.push(buffer);
            }
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (buffers_1_1 && !buffers_1_1.done && (_a2 = buffers_1.return))
              _a2.call(buffers_1);
          } finally {
            if (e_1)
              throw e_1.error;
          }
        }
        if (toEmit) {
          try {
            for (var toEmit_1 = __values(toEmit), toEmit_1_1 = toEmit_1.next(); !toEmit_1_1.done; toEmit_1_1 = toEmit_1.next()) {
              var buffer = toEmit_1_1.value;
              arrRemove(buffers, buffer);
              subscriber.next(buffer);
            }
          } catch (e_2_1) {
            e_2 = { error: e_2_1 };
          } finally {
            try {
              if (toEmit_1_1 && !toEmit_1_1.done && (_b = toEmit_1.return))
                _b.call(toEmit_1);
            } finally {
              if (e_2)
                throw e_2.error;
            }
          }
        }
      }, function() {
        var e_3, _a2;
        try {
          for (var buffers_2 = __values(buffers), buffers_2_1 = buffers_2.next(); !buffers_2_1.done; buffers_2_1 = buffers_2.next()) {
            var buffer = buffers_2_1.value;
            subscriber.next(buffer);
          }
        } catch (e_3_1) {
          e_3 = { error: e_3_1 };
        } finally {
          try {
            if (buffers_2_1 && !buffers_2_1.done && (_a2 = buffers_2.return))
              _a2.call(buffers_2);
          } finally {
            if (e_3)
              throw e_3.error;
          }
        }
        subscriber.complete();
      }, void 0, function() {
        buffers = null;
      }));
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/catchError.js
  function catchError(selector) {
    return operate(function(source, subscriber) {
      var innerSub = null;
      var syncUnsub = false;
      var handledResult;
      innerSub = source.subscribe(createOperatorSubscriber(subscriber, void 0, void 0, function(err) {
        handledResult = innerFrom(selector(err, catchError(selector)(source)));
        if (innerSub) {
          innerSub.unsubscribe();
          innerSub = null;
          handledResult.subscribe(subscriber);
        } else {
          syncUnsub = true;
        }
      }));
      if (syncUnsub) {
        innerSub.unsubscribe();
        innerSub = null;
        handledResult.subscribe(subscriber);
      }
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/scanInternals.js
  function scanInternals(accumulator, seed, hasSeed, emitOnNext, emitBeforeComplete) {
    return function(source, subscriber) {
      var hasState = hasSeed;
      var state = seed;
      var index2 = 0;
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        var i = index2++;
        state = hasState ? accumulator(state, value, i) : (hasState = true, value);
        emitOnNext && subscriber.next(state);
      }, emitBeforeComplete && function() {
        hasState && subscriber.next(state);
        subscriber.complete();
      }));
    };
  }

  // node_modules/rxjs/dist/esm5/internal/operators/combineLatest.js
  function combineLatest2() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var resultSelector = popResultSelector(args);
    return resultSelector ? pipe(combineLatest2.apply(void 0, __spreadArray([], __read(args))), mapOneOrManyArgs(resultSelector)) : operate(function(source, subscriber) {
      combineLatestInit(__spreadArray([source], __read(argsOrArgArray(args))))(subscriber);
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/combineLatestWith.js
  function combineLatestWith() {
    var otherSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      otherSources[_i] = arguments[_i];
    }
    return combineLatest2.apply(void 0, __spreadArray([], __read(otherSources)));
  }

  // node_modules/rxjs/dist/esm5/internal/operators/concatMap.js
  function concatMap(project, resultSelector) {
    return isFunction(resultSelector) ? mergeMap(project, resultSelector, 1) : mergeMap(project, 1);
  }

  // node_modules/rxjs/dist/esm5/internal/operators/debounceTime.js
  function debounceTime(dueTime, scheduler) {
    if (scheduler === void 0) {
      scheduler = asyncScheduler;
    }
    return operate(function(source, subscriber) {
      var activeTask = null;
      var lastValue = null;
      var lastTime = null;
      var emit = function() {
        if (activeTask) {
          activeTask.unsubscribe();
          activeTask = null;
          var value = lastValue;
          lastValue = null;
          subscriber.next(value);
        }
      };
      function emitWhenIdle() {
        var targetTime = lastTime + dueTime;
        var now = scheduler.now();
        if (now < targetTime) {
          activeTask = this.schedule(void 0, targetTime - now);
          subscriber.add(activeTask);
          return;
        }
        emit();
      }
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        lastValue = value;
        lastTime = scheduler.now();
        if (!activeTask) {
          activeTask = scheduler.schedule(emitWhenIdle, dueTime);
          subscriber.add(activeTask);
        }
      }, function() {
        emit();
        subscriber.complete();
      }, void 0, function() {
        lastValue = activeTask = null;
      }));
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/defaultIfEmpty.js
  function defaultIfEmpty(defaultValue) {
    return operate(function(source, subscriber) {
      var hasValue = false;
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        hasValue = true;
        subscriber.next(value);
      }, function() {
        if (!hasValue) {
          subscriber.next(defaultValue);
        }
        subscriber.complete();
      }));
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/take.js
  function take(count) {
    return count <= 0 ? function() {
      return EMPTY;
    } : operate(function(source, subscriber) {
      var seen = 0;
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        if (++seen <= count) {
          subscriber.next(value);
          if (count <= seen) {
            subscriber.complete();
          }
        }
      }));
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/ignoreElements.js
  function ignoreElements() {
    return operate(function(source, subscriber) {
      source.subscribe(createOperatorSubscriber(subscriber, noop));
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/mapTo.js
  function mapTo(value) {
    return map(function() {
      return value;
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/delayWhen.js
  function delayWhen(delayDurationSelector, subscriptionDelay) {
    if (subscriptionDelay) {
      return function(source) {
        return concat(subscriptionDelay.pipe(take(1), ignoreElements()), source.pipe(delayWhen(delayDurationSelector)));
      };
    }
    return mergeMap(function(value, index2) {
      return delayDurationSelector(value, index2).pipe(take(1), mapTo(value));
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/delay.js
  function delay(due, scheduler) {
    if (scheduler === void 0) {
      scheduler = asyncScheduler;
    }
    var duration = timer(due, scheduler);
    return delayWhen(function() {
      return duration;
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/distinctUntilChanged.js
  function distinctUntilChanged(comparator, keySelector) {
    if (keySelector === void 0) {
      keySelector = identity;
    }
    comparator = comparator !== null && comparator !== void 0 ? comparator : defaultCompare;
    return operate(function(source, subscriber) {
      var previousKey;
      var first = true;
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        var currentKey = keySelector(value);
        if (first || !comparator(previousKey, currentKey)) {
          first = false;
          previousKey = currentKey;
          subscriber.next(value);
        }
      }));
    });
  }
  function defaultCompare(a, b) {
    return a === b;
  }

  // node_modules/rxjs/dist/esm5/internal/operators/distinctUntilKeyChanged.js
  function distinctUntilKeyChanged(key, compare) {
    return distinctUntilChanged(function(x, y) {
      return compare ? compare(x[key], y[key]) : x[key] === y[key];
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/endWith.js
  function endWith() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      values[_i] = arguments[_i];
    }
    return function(source) {
      return concat(source, of.apply(void 0, __spreadArray([], __read(values))));
    };
  }

  // node_modules/rxjs/dist/esm5/internal/operators/finalize.js
  function finalize(callback) {
    return operate(function(source, subscriber) {
      try {
        source.subscribe(subscriber);
      } finally {
        subscriber.add(callback);
      }
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/takeLast.js
  function takeLast(count) {
    return count <= 0 ? function() {
      return EMPTY;
    } : operate(function(source, subscriber) {
      var buffer = [];
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        buffer.push(value);
        count < buffer.length && buffer.shift();
      }, function() {
        var e_1, _a2;
        try {
          for (var buffer_1 = __values(buffer), buffer_1_1 = buffer_1.next(); !buffer_1_1.done; buffer_1_1 = buffer_1.next()) {
            var value = buffer_1_1.value;
            subscriber.next(value);
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (buffer_1_1 && !buffer_1_1.done && (_a2 = buffer_1.return))
              _a2.call(buffer_1);
          } finally {
            if (e_1)
              throw e_1.error;
          }
        }
        subscriber.complete();
      }, void 0, function() {
        buffer = null;
      }));
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/merge.js
  function merge2() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var scheduler = popScheduler(args);
    var concurrent = popNumber(args, Infinity);
    args = argsOrArgArray(args);
    return operate(function(source, subscriber) {
      mergeAll(concurrent)(from(__spreadArray([source], __read(args)), scheduler)).subscribe(subscriber);
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/mergeWith.js
  function mergeWith() {
    var otherSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      otherSources[_i] = arguments[_i];
    }
    return merge2.apply(void 0, __spreadArray([], __read(otherSources)));
  }

  // node_modules/rxjs/dist/esm5/internal/operators/repeat.js
  function repeat(countOrConfig) {
    var _a2;
    var count = Infinity;
    var delay2;
    if (countOrConfig != null) {
      if (typeof countOrConfig === "object") {
        _a2 = countOrConfig.count, count = _a2 === void 0 ? Infinity : _a2, delay2 = countOrConfig.delay;
      } else {
        count = countOrConfig;
      }
    }
    return count <= 0 ? function() {
      return EMPTY;
    } : operate(function(source, subscriber) {
      var soFar = 0;
      var sourceSub;
      var resubscribe = function() {
        sourceSub === null || sourceSub === void 0 ? void 0 : sourceSub.unsubscribe();
        sourceSub = null;
        if (delay2 != null) {
          var notifier = typeof delay2 === "number" ? timer(delay2) : innerFrom(delay2(soFar));
          var notifierSubscriber_1 = createOperatorSubscriber(subscriber, function() {
            notifierSubscriber_1.unsubscribe();
            subscribeToSource();
          });
          notifier.subscribe(notifierSubscriber_1);
        } else {
          subscribeToSource();
        }
      };
      var subscribeToSource = function() {
        var syncUnsub = false;
        sourceSub = source.subscribe(createOperatorSubscriber(subscriber, void 0, function() {
          if (++soFar < count) {
            if (sourceSub) {
              resubscribe();
            } else {
              syncUnsub = true;
            }
          } else {
            subscriber.complete();
          }
        }));
        if (syncUnsub) {
          resubscribe();
        }
      };
      subscribeToSource();
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/sample.js
  function sample(notifier) {
    return operate(function(source, subscriber) {
      var hasValue = false;
      var lastValue = null;
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        hasValue = true;
        lastValue = value;
      }));
      notifier.subscribe(createOperatorSubscriber(subscriber, function() {
        if (hasValue) {
          hasValue = false;
          var value = lastValue;
          lastValue = null;
          subscriber.next(value);
        }
      }, noop));
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/scan.js
  function scan(accumulator, seed) {
    return operate(scanInternals(accumulator, seed, arguments.length >= 2, true));
  }

  // node_modules/rxjs/dist/esm5/internal/operators/share.js
  function share(options) {
    if (options === void 0) {
      options = {};
    }
    var _a2 = options.connector, connector = _a2 === void 0 ? function() {
      return new Subject();
    } : _a2, _b = options.resetOnError, resetOnError = _b === void 0 ? true : _b, _c = options.resetOnComplete, resetOnComplete = _c === void 0 ? true : _c, _d = options.resetOnRefCountZero, resetOnRefCountZero = _d === void 0 ? true : _d;
    return function(wrapperSource) {
      var connection;
      var resetConnection;
      var subject;
      var refCount = 0;
      var hasCompleted = false;
      var hasErrored = false;
      var cancelReset = function() {
        resetConnection === null || resetConnection === void 0 ? void 0 : resetConnection.unsubscribe();
        resetConnection = void 0;
      };
      var reset = function() {
        cancelReset();
        connection = subject = void 0;
        hasCompleted = hasErrored = false;
      };
      var resetAndUnsubscribe = function() {
        var conn = connection;
        reset();
        conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
      };
      return operate(function(source, subscriber) {
        refCount++;
        if (!hasErrored && !hasCompleted) {
          cancelReset();
        }
        var dest = subject = subject !== null && subject !== void 0 ? subject : connector();
        subscriber.add(function() {
          refCount--;
          if (refCount === 0 && !hasErrored && !hasCompleted) {
            resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero);
          }
        });
        dest.subscribe(subscriber);
        if (!connection && refCount > 0) {
          connection = new SafeSubscriber({
            next: function(value) {
              return dest.next(value);
            },
            error: function(err) {
              hasErrored = true;
              cancelReset();
              resetConnection = handleReset(reset, resetOnError, err);
              dest.error(err);
            },
            complete: function() {
              hasCompleted = true;
              cancelReset();
              resetConnection = handleReset(reset, resetOnComplete);
              dest.complete();
            }
          });
          innerFrom(source).subscribe(connection);
        }
      })(wrapperSource);
    };
  }
  function handleReset(reset, on) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    if (on === true) {
      reset();
      return;
    }
    if (on === false) {
      return;
    }
    var onSubscriber = new SafeSubscriber({
      next: function() {
        onSubscriber.unsubscribe();
        reset();
      }
    });
    return on.apply(void 0, __spreadArray([], __read(args))).subscribe(onSubscriber);
  }

  // node_modules/rxjs/dist/esm5/internal/operators/shareReplay.js
  function shareReplay(configOrBufferSize, windowTime, scheduler) {
    var _a2, _b, _c;
    var bufferSize;
    var refCount = false;
    if (configOrBufferSize && typeof configOrBufferSize === "object") {
      _a2 = configOrBufferSize.bufferSize, bufferSize = _a2 === void 0 ? Infinity : _a2, _b = configOrBufferSize.windowTime, windowTime = _b === void 0 ? Infinity : _b, _c = configOrBufferSize.refCount, refCount = _c === void 0 ? false : _c, scheduler = configOrBufferSize.scheduler;
    } else {
      bufferSize = configOrBufferSize !== null && configOrBufferSize !== void 0 ? configOrBufferSize : Infinity;
    }
    return share({
      connector: function() {
        return new ReplaySubject(bufferSize, windowTime, scheduler);
      },
      resetOnError: true,
      resetOnComplete: false,
      resetOnRefCountZero: refCount
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/skip.js
  function skip(count) {
    return filter(function(_, index2) {
      return count <= index2;
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/skipUntil.js
  function skipUntil(notifier) {
    return operate(function(source, subscriber) {
      var taking = false;
      var skipSubscriber = createOperatorSubscriber(subscriber, function() {
        skipSubscriber === null || skipSubscriber === void 0 ? void 0 : skipSubscriber.unsubscribe();
        taking = true;
      }, noop);
      innerFrom(notifier).subscribe(skipSubscriber);
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        return taking && subscriber.next(value);
      }));
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/startWith.js
  function startWith() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      values[_i] = arguments[_i];
    }
    var scheduler = popScheduler(values);
    return operate(function(source, subscriber) {
      (scheduler ? concat(values, source, scheduler) : concat(values, source)).subscribe(subscriber);
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/switchMap.js
  function switchMap(project, resultSelector) {
    return operate(function(source, subscriber) {
      var innerSubscriber = null;
      var index2 = 0;
      var isComplete = false;
      var checkComplete = function() {
        return isComplete && !innerSubscriber && subscriber.complete();
      };
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        innerSubscriber === null || innerSubscriber === void 0 ? void 0 : innerSubscriber.unsubscribe();
        var innerIndex = 0;
        var outerIndex = index2++;
        innerFrom(project(value, outerIndex)).subscribe(innerSubscriber = createOperatorSubscriber(subscriber, function(innerValue) {
          return subscriber.next(resultSelector ? resultSelector(value, innerValue, outerIndex, innerIndex++) : innerValue);
        }, function() {
          innerSubscriber = null;
          checkComplete();
        }));
      }, function() {
        isComplete = true;
        checkComplete();
      }));
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js
  function takeUntil(notifier) {
    return operate(function(source, subscriber) {
      innerFrom(notifier).subscribe(createOperatorSubscriber(subscriber, function() {
        return subscriber.complete();
      }, noop));
      !subscriber.closed && source.subscribe(subscriber);
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/takeWhile.js
  function takeWhile(predicate, inclusive) {
    if (inclusive === void 0) {
      inclusive = false;
    }
    return operate(function(source, subscriber) {
      var index2 = 0;
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        var result = predicate(value, index2++);
        (result || inclusive) && subscriber.next(value);
        !result && subscriber.complete();
      }));
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/tap.js
  function tap(observerOrNext, error, complete) {
    var tapObserver = isFunction(observerOrNext) || error || complete ? { next: observerOrNext, error, complete } : observerOrNext;
    return tapObserver ? operate(function(source, subscriber) {
      var _a2;
      (_a2 = tapObserver.subscribe) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver);
      var isUnsub = true;
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        var _a3;
        (_a3 = tapObserver.next) === null || _a3 === void 0 ? void 0 : _a3.call(tapObserver, value);
        subscriber.next(value);
      }, function() {
        var _a3;
        isUnsub = false;
        (_a3 = tapObserver.complete) === null || _a3 === void 0 ? void 0 : _a3.call(tapObserver);
        subscriber.complete();
      }, function(err) {
        var _a3;
        isUnsub = false;
        (_a3 = tapObserver.error) === null || _a3 === void 0 ? void 0 : _a3.call(tapObserver, err);
        subscriber.error(err);
      }, function() {
        var _a3, _b;
        if (isUnsub) {
          (_a3 = tapObserver.unsubscribe) === null || _a3 === void 0 ? void 0 : _a3.call(tapObserver);
        }
        (_b = tapObserver.finalize) === null || _b === void 0 ? void 0 : _b.call(tapObserver);
      }));
    }) : identity;
  }

  // node_modules/rxjs/dist/esm5/internal/operators/throttle.js
  var defaultThrottleConfig = {
    leading: true,
    trailing: false
  };
  function throttle(durationSelector, config4) {
    if (config4 === void 0) {
      config4 = defaultThrottleConfig;
    }
    return operate(function(source, subscriber) {
      var leading = config4.leading, trailing = config4.trailing;
      var hasValue = false;
      var sendValue = null;
      var throttled = null;
      var isComplete = false;
      var endThrottling = function() {
        throttled === null || throttled === void 0 ? void 0 : throttled.unsubscribe();
        throttled = null;
        if (trailing) {
          send();
          isComplete && subscriber.complete();
        }
      };
      var cleanupThrottling = function() {
        throttled = null;
        isComplete && subscriber.complete();
      };
      var startThrottle = function(value) {
        return throttled = innerFrom(durationSelector(value)).subscribe(createOperatorSubscriber(subscriber, endThrottling, cleanupThrottling));
      };
      var send = function() {
        if (hasValue) {
          hasValue = false;
          var value = sendValue;
          sendValue = null;
          subscriber.next(value);
          !isComplete && startThrottle(value);
        }
      };
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        hasValue = true;
        sendValue = value;
        !(throttled && !throttled.closed) && (leading ? send() : startThrottle(value));
      }, function() {
        isComplete = true;
        !(trailing && hasValue && throttled && !throttled.closed) && subscriber.complete();
      }));
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/throttleTime.js
  function throttleTime(duration, scheduler, config4) {
    if (scheduler === void 0) {
      scheduler = asyncScheduler;
    }
    if (config4 === void 0) {
      config4 = defaultThrottleConfig;
    }
    var duration$ = timer(duration, scheduler);
    return throttle(function() {
      return duration$;
    }, config4);
  }

  // node_modules/rxjs/dist/esm5/internal/operators/withLatestFrom.js
  function withLatestFrom() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      inputs[_i] = arguments[_i];
    }
    var project = popResultSelector(inputs);
    return operate(function(source, subscriber) {
      var len = inputs.length;
      var otherValues = new Array(len);
      var hasValue = inputs.map(function() {
        return false;
      });
      var ready = false;
      var _loop_1 = function(i2) {
        innerFrom(inputs[i2]).subscribe(createOperatorSubscriber(subscriber, function(value) {
          otherValues[i2] = value;
          if (!ready && !hasValue[i2]) {
            hasValue[i2] = true;
            (ready = hasValue.every(identity)) && (hasValue = null);
          }
        }, noop));
      };
      for (var i = 0; i < len; i++) {
        _loop_1(i);
      }
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        if (ready) {
          var values = __spreadArray([value], __read(otherValues));
          subscriber.next(project ? project.apply(void 0, __spreadArray([], __read(values))) : values);
        }
      }));
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/zip.js
  function zip2() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      sources[_i] = arguments[_i];
    }
    return operate(function(source, subscriber) {
      zip.apply(void 0, __spreadArray([source], __read(sources))).subscribe(subscriber);
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/zipWith.js
  function zipWith() {
    var otherInputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      otherInputs[_i] = arguments[_i];
    }
    return zip2.apply(void 0, __spreadArray([], __read(otherInputs)));
  }

  // src/assets/javascripts/browser/document/index.ts
  function watchDocument() {
    const document$2 = new ReplaySubject(1);
    fromEvent(document, "DOMContentLoaded", { once: true }).subscribe(() => document$2.next(document));
    return document$2;
  }

  // src/assets/javascripts/browser/element/_/index.ts
  function getElements(selector, node = document) {
    return Array.from(node.querySelectorAll(selector));
  }
  function getElement(selector, node = document) {
    const el = getOptionalElement(selector, node);
    if (typeof el === "undefined")
      throw new ReferenceError(
        `Missing element: expected "${selector}" to be present`
      );
    return el;
  }
  function getOptionalElement(selector, node = document) {
    return node.querySelector(selector) || void 0;
  }
  function getActiveElement() {
    return document.activeElement instanceof HTMLElement ? document.activeElement || void 0 : void 0;
  }

  // src/assets/javascripts/browser/element/focus/index.ts
  function watchElementFocus(el) {
    return merge(
      fromEvent(document.body, "focusin"),
      fromEvent(document.body, "focusout")
    ).pipe(
      debounceTime(1),
      map(() => {
        const active = getActiveElement();
        return typeof active !== "undefined" ? el.contains(active) : false;
      }),
      startWith(el === getActiveElement()),
      distinctUntilChanged()
    );
  }

  // src/assets/javascripts/browser/element/offset/_/index.ts
  function getElementOffset(el) {
    return {
      x: el.offsetLeft,
      y: el.offsetTop
    };
  }
  function watchElementOffset(el) {
    return merge(
      fromEvent(window, "load"),
      fromEvent(window, "resize")
    ).pipe(
      auditTime(0, animationFrameScheduler),
      map(() => getElementOffset(el)),
      startWith(getElementOffset(el))
    );
  }

  // src/assets/javascripts/browser/element/offset/content/index.ts
  function getElementContentOffset(el) {
    return {
      x: el.scrollLeft,
      y: el.scrollTop
    };
  }
  function watchElementContentOffset(el) {
    return merge(
      fromEvent(el, "scroll"),
      fromEvent(window, "resize")
    ).pipe(
      auditTime(0, animationFrameScheduler),
      map(() => getElementContentOffset(el)),
      startWith(getElementContentOffset(el))
    );
  }

  // node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js
  var MapShim = function() {
    if (typeof Map !== "undefined") {
      return Map;
    }
    function getIndex(arr, key) {
      var result = -1;
      arr.some(function(entry, index2) {
        if (entry[0] === key) {
          result = index2;
          return true;
        }
        return false;
      });
      return result;
    }
    return function() {
      function class_1() {
        this.__entries__ = [];
      }
      Object.defineProperty(class_1.prototype, "size", {
        get: function() {
          return this.__entries__.length;
        },
        enumerable: true,
        configurable: true
      });
      class_1.prototype.get = function(key) {
        var index2 = getIndex(this.__entries__, key);
        var entry = this.__entries__[index2];
        return entry && entry[1];
      };
      class_1.prototype.set = function(key, value) {
        var index2 = getIndex(this.__entries__, key);
        if (~index2) {
          this.__entries__[index2][1] = value;
        } else {
          this.__entries__.push([key, value]);
        }
      };
      class_1.prototype.delete = function(key) {
        var entries = this.__entries__;
        var index2 = getIndex(entries, key);
        if (~index2) {
          entries.splice(index2, 1);
        }
      };
      class_1.prototype.has = function(key) {
        return !!~getIndex(this.__entries__, key);
      };
      class_1.prototype.clear = function() {
        this.__entries__.splice(0);
      };
      class_1.prototype.forEach = function(callback, ctx) {
        if (ctx === void 0) {
          ctx = null;
        }
        for (var _i = 0, _a2 = this.__entries__; _i < _a2.length; _i++) {
          var entry = _a2[_i];
          callback.call(ctx, entry[1], entry[0]);
        }
      };
      return class_1;
    }();
  }();
  var isBrowser = typeof window !== "undefined" && typeof document !== "undefined" && window.document === document;
  var global$1 = function() {
    if (typeof global !== "undefined" && global.Math === Math) {
      return global;
    }
    if (typeof self !== "undefined" && self.Math === Math) {
      return self;
    }
    if (typeof window !== "undefined" && window.Math === Math) {
      return window;
    }
    return Function("return this")();
  }();
  var requestAnimationFrame$1 = function() {
    if (typeof requestAnimationFrame === "function") {
      return requestAnimationFrame.bind(global$1);
    }
    return function(callback) {
      return setTimeout(function() {
        return callback(Date.now());
      }, 1e3 / 60);
    };
  }();
  var trailingTimeout = 2;
  function throttle2(callback, delay2) {
    var leadingCall = false, trailingCall = false, lastCallTime = 0;
    function resolvePending() {
      if (leadingCall) {
        leadingCall = false;
        callback();
      }
      if (trailingCall) {
        proxy();
      }
    }
    function timeoutCallback() {
      requestAnimationFrame$1(resolvePending);
    }
    function proxy() {
      var timeStamp = Date.now();
      if (leadingCall) {
        if (timeStamp - lastCallTime < trailingTimeout) {
          return;
        }
        trailingCall = true;
      } else {
        leadingCall = true;
        trailingCall = false;
        setTimeout(timeoutCallback, delay2);
      }
      lastCallTime = timeStamp;
    }
    return proxy;
  }
  var REFRESH_DELAY = 20;
  var transitionKeys = ["top", "right", "bottom", "left", "width", "height", "size", "weight"];
  var mutationObserverSupported = typeof MutationObserver !== "undefined";
  var ResizeObserverController = function() {
    function ResizeObserverController2() {
      this.connected_ = false;
      this.mutationEventsAdded_ = false;
      this.mutationsObserver_ = null;
      this.observers_ = [];
      this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
      this.refresh = throttle2(this.refresh.bind(this), REFRESH_DELAY);
    }
    ResizeObserverController2.prototype.addObserver = function(observer) {
      if (!~this.observers_.indexOf(observer)) {
        this.observers_.push(observer);
      }
      if (!this.connected_) {
        this.connect_();
      }
    };
    ResizeObserverController2.prototype.removeObserver = function(observer) {
      var observers2 = this.observers_;
      var index2 = observers2.indexOf(observer);
      if (~index2) {
        observers2.splice(index2, 1);
      }
      if (!observers2.length && this.connected_) {
        this.disconnect_();
      }
    };
    ResizeObserverController2.prototype.refresh = function() {
      var changesDetected = this.updateObservers_();
      if (changesDetected) {
        this.refresh();
      }
    };
    ResizeObserverController2.prototype.updateObservers_ = function() {
      var activeObservers = this.observers_.filter(function(observer) {
        return observer.gatherActive(), observer.hasActive();
      });
      activeObservers.forEach(function(observer) {
        return observer.broadcastActive();
      });
      return activeObservers.length > 0;
    };
    ResizeObserverController2.prototype.connect_ = function() {
      if (!isBrowser || this.connected_) {
        return;
      }
      document.addEventListener("transitionend", this.onTransitionEnd_);
      window.addEventListener("resize", this.refresh);
      if (mutationObserverSupported) {
        this.mutationsObserver_ = new MutationObserver(this.refresh);
        this.mutationsObserver_.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
      } else {
        document.addEventListener("DOMSubtreeModified", this.refresh);
        this.mutationEventsAdded_ = true;
      }
      this.connected_ = true;
    };
    ResizeObserverController2.prototype.disconnect_ = function() {
      if (!isBrowser || !this.connected_) {
        return;
      }
      document.removeEventListener("transitionend", this.onTransitionEnd_);
      window.removeEventListener("resize", this.refresh);
      if (this.mutationsObserver_) {
        this.mutationsObserver_.disconnect();
      }
      if (this.mutationEventsAdded_) {
        document.removeEventListener("DOMSubtreeModified", this.refresh);
      }
      this.mutationsObserver_ = null;
      this.mutationEventsAdded_ = false;
      this.connected_ = false;
    };
    ResizeObserverController2.prototype.onTransitionEnd_ = function(_a2) {
      var _b = _a2.propertyName, propertyName = _b === void 0 ? "" : _b;
      var isReflowProperty = transitionKeys.some(function(key) {
        return !!~propertyName.indexOf(key);
      });
      if (isReflowProperty) {
        this.refresh();
      }
    };
    ResizeObserverController2.getInstance = function() {
      if (!this.instance_) {
        this.instance_ = new ResizeObserverController2();
      }
      return this.instance_;
    };
    ResizeObserverController2.instance_ = null;
    return ResizeObserverController2;
  }();
  var defineConfigurable = function(target, props) {
    for (var _i = 0, _a2 = Object.keys(props); _i < _a2.length; _i++) {
      var key = _a2[_i];
      Object.defineProperty(target, key, {
        value: props[key],
        enumerable: false,
        writable: false,
        configurable: true
      });
    }
    return target;
  };
  var getWindowOf = function(target) {
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
    return ownerGlobal || global$1;
  };
  var emptyRect = createRectInit(0, 0, 0, 0);
  function toFloat(value) {
    return parseFloat(value) || 0;
  }
  function getBordersSize(styles) {
    var positions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      positions[_i - 1] = arguments[_i];
    }
    return positions.reduce(function(size, position) {
      var value = styles["border-" + position + "-width"];
      return size + toFloat(value);
    }, 0);
  }
  function getPaddings(styles) {
    var positions = ["top", "right", "bottom", "left"];
    var paddings = {};
    for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
      var position = positions_1[_i];
      var value = styles["padding-" + position];
      paddings[position] = toFloat(value);
    }
    return paddings;
  }
  function getSVGContentRect(target) {
    var bbox = target.getBBox();
    return createRectInit(0, 0, bbox.width, bbox.height);
  }
  function getHTMLElementContentRect(target) {
    var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
    if (!clientWidth && !clientHeight) {
      return emptyRect;
    }
    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;
    var width = toFloat(styles.width), height = toFloat(styles.height);
    if (styles.boxSizing === "border-box") {
      if (Math.round(width + horizPad) !== clientWidth) {
        width -= getBordersSize(styles, "left", "right") + horizPad;
      }
      if (Math.round(height + vertPad) !== clientHeight) {
        height -= getBordersSize(styles, "top", "bottom") + vertPad;
      }
    }
    if (!isDocumentElement(target)) {
      var vertScrollbar = Math.round(width + horizPad) - clientWidth;
      var horizScrollbar = Math.round(height + vertPad) - clientHeight;
      if (Math.abs(vertScrollbar) !== 1) {
        width -= vertScrollbar;
      }
      if (Math.abs(horizScrollbar) !== 1) {
        height -= horizScrollbar;
      }
    }
    return createRectInit(paddings.left, paddings.top, width, height);
  }
  var isSVGGraphicsElement = function() {
    if (typeof SVGGraphicsElement !== "undefined") {
      return function(target) {
        return target instanceof getWindowOf(target).SVGGraphicsElement;
      };
    }
    return function(target) {
      return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === "function";
    };
  }();
  function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
  }
  function getContentRect(target) {
    if (!isBrowser) {
      return emptyRect;
    }
    if (isSVGGraphicsElement(target)) {
      return getSVGContentRect(target);
    }
    return getHTMLElementContentRect(target);
  }
  function createReadOnlyRect(_a2) {
    var x = _a2.x, y = _a2.y, width = _a2.width, height = _a2.height;
    var Constr = typeof DOMRectReadOnly !== "undefined" ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);
    defineConfigurable(rect, {
      x,
      y,
      width,
      height,
      top: y,
      right: x + width,
      bottom: height + y,
      left: x
    });
    return rect;
  }
  function createRectInit(x, y, width, height) {
    return { x, y, width, height };
  }
  var ResizeObservation = function() {
    function ResizeObservation2(target) {
      this.broadcastWidth = 0;
      this.broadcastHeight = 0;
      this.contentRect_ = createRectInit(0, 0, 0, 0);
      this.target = target;
    }
    ResizeObservation2.prototype.isActive = function() {
      var rect = getContentRect(this.target);
      this.contentRect_ = rect;
      return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
    };
    ResizeObservation2.prototype.broadcastRect = function() {
      var rect = this.contentRect_;
      this.broadcastWidth = rect.width;
      this.broadcastHeight = rect.height;
      return rect;
    };
    return ResizeObservation2;
  }();
  var ResizeObserverEntry = function() {
    function ResizeObserverEntry2(target, rectInit) {
      var contentRect = createReadOnlyRect(rectInit);
      defineConfigurable(this, { target, contentRect });
    }
    return ResizeObserverEntry2;
  }();
  var ResizeObserverSPI = function() {
    function ResizeObserverSPI2(callback, controller, callbackCtx) {
      this.activeObservations_ = [];
      this.observations_ = new MapShim();
      if (typeof callback !== "function") {
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      }
      this.callback_ = callback;
      this.controller_ = controller;
      this.callbackCtx_ = callbackCtx;
    }
    ResizeObserverSPI2.prototype.observe = function(target) {
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      if (typeof Element === "undefined" || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      if (observations.has(target)) {
        return;
      }
      observations.set(target, new ResizeObservation(target));
      this.controller_.addObserver(this);
      this.controller_.refresh();
    };
    ResizeObserverSPI2.prototype.unobserve = function(target) {
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      if (typeof Element === "undefined" || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      if (!observations.has(target)) {
        return;
      }
      observations.delete(target);
      if (!observations.size) {
        this.controller_.removeObserver(this);
      }
    };
    ResizeObserverSPI2.prototype.disconnect = function() {
      this.clearActive();
      this.observations_.clear();
      this.controller_.removeObserver(this);
    };
    ResizeObserverSPI2.prototype.gatherActive = function() {
      var _this = this;
      this.clearActive();
      this.observations_.forEach(function(observation) {
        if (observation.isActive()) {
          _this.activeObservations_.push(observation);
        }
      });
    };
    ResizeObserverSPI2.prototype.broadcastActive = function() {
      if (!this.hasActive()) {
        return;
      }
      var ctx = this.callbackCtx_;
      var entries = this.activeObservations_.map(function(observation) {
        return new ResizeObserverEntry(observation.target, observation.broadcastRect());
      });
      this.callback_.call(ctx, entries, ctx);
      this.clearActive();
    };
    ResizeObserverSPI2.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    };
    ResizeObserverSPI2.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI2;
  }();
  var observers = typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : new MapShim();
  var ResizeObserver = function() {
    function ResizeObserver2(callback) {
      if (!(this instanceof ResizeObserver2)) {
        throw new TypeError("Cannot call a class as a function.");
      }
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      var controller = ResizeObserverController.getInstance();
      var observer = new ResizeObserverSPI(callback, controller, this);
      observers.set(this, observer);
    }
    return ResizeObserver2;
  }();
  [
    "observe",
    "unobserve",
    "disconnect"
  ].forEach(function(method) {
    ResizeObserver.prototype[method] = function() {
      var _a2;
      return (_a2 = observers.get(this))[method].apply(_a2, arguments);
    };
  });
  var index = function() {
    if (typeof global$1.ResizeObserver !== "undefined") {
      return global$1.ResizeObserver;
    }
    return ResizeObserver;
  }();
  var ResizeObserver_es_default = index;

  // src/assets/javascripts/browser/element/size/_/index.ts
  var entry$ = new Subject();
  var observer$ = defer(() => of(
    new ResizeObserver_es_default((entries) => {
      for (const entry of entries)
        entry$.next(entry);
    })
  )).pipe(
    switchMap(
      (observer) => merge(NEVER, of(observer)).pipe(
        finalize(() => observer.disconnect())
      )
    ),
    shareReplay(1)
  );
  function getElementSize(el) {
    return {
      width: el.offsetWidth,
      height: el.offsetHeight
    };
  }
  function watchElementSize(el) {
    return observer$.pipe(
      tap((observer) => observer.observe(el)),
      switchMap(
        (observer) => entry$.pipe(
          filter(({ target }) => target === el),
          finalize(() => observer.unobserve(el)),
          map(() => getElementSize(el))
        )
      ),
      startWith(getElementSize(el))
    );
  }

  // src/assets/javascripts/browser/element/size/content/index.ts
  function getElementContentSize(el) {
    return {
      width: el.scrollWidth,
      height: el.scrollHeight
    };
  }
  function getElementContainer(el) {
    let parent = el.parentElement;
    while (parent)
      if (el.scrollWidth <= parent.scrollWidth && el.scrollHeight <= parent.scrollHeight)
        parent = (el = parent).parentElement;
      else
        break;
    return parent ? el : void 0;
  }

  // src/assets/javascripts/browser/element/visibility/index.ts
  var entry$2 = new Subject();
  var observer$2 = defer(() => of(
    new IntersectionObserver((entries) => {
      for (const entry of entries)
        entry$2.next(entry);
    }, {
      threshold: 0
    })
  )).pipe(
    switchMap(
      (observer) => merge(NEVER, of(observer)).pipe(
        finalize(() => observer.disconnect())
      )
    ),
    shareReplay(1)
  );
  function watchElementVisibility(el) {
    return observer$2.pipe(
      tap((observer) => observer.observe(el)),
      switchMap(
        (observer) => entry$2.pipe(
          filter(({ target }) => target === el),
          finalize(() => observer.unobserve(el)),
          map(({ isIntersecting }) => isIntersecting)
        )
      )
    );
  }
  function watchElementBoundary(el, threshold = 16) {
    return watchElementContentOffset(el).pipe(
      map(({ y }) => {
        const visible = getElementSize(el);
        const content = getElementContentSize(el);
        return y >= content.height - visible.height - threshold;
      }),
      distinctUntilChanged()
    );
  }

  // src/assets/javascripts/browser/toggle/index.ts
  var toggles = {
    drawer: getElement("[data-md-toggle=drawer]"),
    search: getElement("[data-md-toggle=search]")
  };
  function getToggle(name) {
    return toggles[name].checked;
  }
  function setToggle(name, value) {
    if (toggles[name].checked !== value)
      toggles[name].click();
  }
  function watchToggle(name) {
    const el = toggles[name];
    return fromEvent(el, "change").pipe(
      map(() => el.checked),
      startWith(el.checked)
    );
  }

  // src/assets/javascripts/browser/keyboard/index.ts
  function isSusceptibleToKeyboard(el, type) {
    switch (el.constructor) {
      case HTMLInputElement:
        if (el.type === "radio")
          return /^Arrow/.test(type);
        else
          return true;
      case HTMLSelectElement:
      case HTMLTextAreaElement:
        return true;
      default:
        return el.isContentEditable;
    }
  }
  function watchKeyboard() {
    return fromEvent(window, "keydown").pipe(
      filter((ev) => !(ev.metaKey || ev.ctrlKey)),
      map((ev) => ({
        mode: getToggle("search") ? "search" : "global",
        type: ev.key,
        claim() {
          ev.preventDefault();
          ev.stopPropagation();
        }
      })),
      filter(({ mode, type }) => {
        if (mode === "global") {
          const active = getActiveElement();
          if (typeof active !== "undefined")
            return !isSusceptibleToKeyboard(active, type);
        }
        return true;
      }),
      share()
    );
  }

  // src/assets/javascripts/browser/location/_/index.ts
  function getLocation() {
    return new URL(location.href);
  }
  function setLocation(url) {
    location.href = url.href;
  }
  function watchLocation() {
    return new Subject();
  }

  // src/assets/javascripts/utilities/h/index.ts
  function appendChild(el, child) {
    if (typeof child === "string" || typeof child === "number") {
      el.innerHTML += child.toString();
    } else if (child instanceof Node) {
      el.appendChild(child);
    } else if (Array.isArray(child)) {
      for (const node of child)
        appendChild(el, node);
    }
  }
  function h(tag, attributes, ...children) {
    const el = document.createElement(tag);
    if (attributes)
      for (const attr of Object.keys(attributes)) {
        if (typeof attributes[attr] === "undefined")
          continue;
        if (typeof attributes[attr] !== "boolean")
          el.setAttribute(attr, attributes[attr]);
        else
          el.setAttribute(attr, "");
      }
    for (const child of children)
      appendChild(el, child);
    return el;
  }

  // src/assets/javascripts/utilities/string/index.ts
  function truncate(value, n) {
    let i = n;
    if (value.length > i) {
      while (value[i] !== " " && --i > 0) {
      }
      return `${value.substring(0, i)}...`;
    }
    return value;
  }
  function round(value) {
    if (value > 999) {
      const digits = +((value - 950) % 1e3 > 99);
      return `${((value + 1e-6) / 1e3).toFixed(digits)}k`;
    } else {
      return value.toString();
    }
  }

  // src/assets/javascripts/browser/location/hash/index.ts
  function getLocationHash() {
    return location.hash.substring(1);
  }
  function setLocationHash(hash) {
    const el = h("a", { href: hash });
    el.addEventListener("click", (ev) => ev.stopPropagation());
    el.click();
  }
  function watchLocationHash() {
    return fromEvent(window, "hashchange").pipe(
      map(getLocationHash),
      startWith(getLocationHash()),
      filter((hash) => hash.length > 0),
      shareReplay(1)
    );
  }
  function watchLocationTarget() {
    return watchLocationHash().pipe(
      map((id) => getOptionalElement(`[id="${id}"]`)),
      filter((el) => typeof el !== "undefined")
    );
  }

  // src/assets/javascripts/browser/media/index.ts
  function watchMedia(query) {
    const media = matchMedia(query);
    return fromEventPattern((next) => media.addListener(() => next(media.matches))).pipe(
      startWith(media.matches)
    );
  }
  function watchPrint() {
    const media = matchMedia("print");
    return merge(
      fromEvent(window, "beforeprint").pipe(map(() => true)),
      fromEvent(window, "afterprint").pipe(map(() => false))
    ).pipe(
      startWith(media.matches)
    );
  }
  function at(query$, factory) {
    return query$.pipe(
      switchMap((active) => active ? factory() : EMPTY)
    );
  }

  // src/assets/javascripts/browser/request/index.ts
  function request(url, options = { credentials: "same-origin" }) {
    return from(fetch(`${url}`, options)).pipe(
      catchError(() => EMPTY),
      switchMap(
        (res) => res.status !== 200 ? throwError(() => new Error(res.statusText)) : of(res)
      )
    );
  }
  function requestJSON(url, options) {
    return request(url, options).pipe(
      switchMap((res) => res.json()),
      shareReplay(1)
    );
  }
  function requestXML(url, options) {
    const dom = new DOMParser();
    return request(url, options).pipe(
      switchMap((res) => res.text()),
      map((res) => dom.parseFromString(res, "text/xml")),
      shareReplay(1)
    );
  }

  // src/assets/javascripts/browser/script/index.ts
  function watchScript(src) {
    const script2 = h("script", { src });
    return defer(() => {
      document.head.appendChild(script2);
      return merge(
        fromEvent(script2, "load"),
        fromEvent(script2, "error").pipe(
          switchMap(() => throwError(() => new ReferenceError(`Invalid script: ${src}`)))
        )
      ).pipe(
        map(() => void 0),
        finalize(() => document.head.removeChild(script2)),
        take(1)
      );
    });
  }

  // src/assets/javascripts/browser/viewport/offset/index.ts
  function getViewportOffset() {
    return {
      x: Math.max(0, scrollX),
      y: Math.max(0, scrollY)
    };
  }
  function watchViewportOffset() {
    return merge(
      fromEvent(window, "scroll", { passive: true }),
      fromEvent(window, "resize", { passive: true })
    ).pipe(
      map(getViewportOffset),
      startWith(getViewportOffset())
    );
  }

  // src/assets/javascripts/browser/viewport/size/index.ts
  function getViewportSize() {
    return {
      width: innerWidth,
      height: innerHeight
    };
  }
  function watchViewportSize() {
    return fromEvent(window, "resize", { passive: true }).pipe(
      map(getViewportSize),
      startWith(getViewportSize())
    );
  }

  // src/assets/javascripts/browser/viewport/_/index.ts
  function watchViewport() {
    return combineLatest([
      watchViewportOffset(),
      watchViewportSize()
    ]).pipe(
      map(([offset, size]) => ({ offset, size })),
      shareReplay(1)
    );
  }

  // src/assets/javascripts/browser/viewport/at/index.ts
  function watchViewportAt(el, { viewport$: viewport$2, header$: header$2 }) {
    const size$ = viewport$2.pipe(
      distinctUntilKeyChanged("size")
    );
    const offset$ = combineLatest([size$, header$2]).pipe(
      map(() => getElementOffset(el))
    );
    return combineLatest([header$2, viewport$2, offset$]).pipe(
      map(([{ height }, { offset, size }, { x, y }]) => ({
        offset: {
          x: offset.x - x,
          y: offset.y - y + height
        },
        size
      }))
    );
  }

  // src/assets/javascripts/browser/worker/index.ts
  function watchWorker(worker, { tx$ }) {
    const rx$ = fromEvent(worker, "message").pipe(
      map(({ data }) => data)
    );
    return tx$.pipe(
      throttle(() => rx$, { leading: true, trailing: true }),
      tap((message) => worker.postMessage(message)),
      switchMap(() => rx$),
      share()
    );
  }

  // src/assets/javascripts/_/index.ts
  var script = getElement("#__config");
  var config2 = JSON.parse(script.textContent);
  config2.base = `${new URL(config2.base, getLocation())}`;
  function configuration() {
    return config2;
  }
  function feature(flag) {
    return config2.features.includes(flag);
  }
  function translation(key, value) {
    return typeof value !== "undefined" ? config2.translations[key].replace("#", value.toString()) : config2.translations[key];
  }

  // src/assets/javascripts/components/_/index.ts
  function getComponentElement(type, node = document) {
    return getElement(`[data-md-component=${type}]`, node);
  }
  function getComponentElements(type, node = document) {
    return getElements(`[data-md-component=${type}]`, node);
  }

  // src/assets/javascripts/components/announce/index.ts
  function watchAnnounce(el) {
    const button = getElement(".md-typeset > :first-child", el);
    return fromEvent(button, "click", { once: true }).pipe(
      map(() => getElement(".md-typeset", el)),
      map((content) => ({ hash: __md_hash(content.innerHTML) }))
    );
  }
  function mountAnnounce(el) {
    if (!feature("announce.dismiss") || !el.childElementCount)
      return EMPTY;
    return defer(() => {
      const push$ = new Subject();
      push$.pipe(
        startWith({ hash: __md_get("__announce") })
      ).subscribe(({ hash }) => {
        var _a2;
        if (hash && hash === ((_a2 = __md_get("__announce")) != null ? _a2 : hash)) {
          el.hidden = true;
          __md_set("__announce", hash);
        }
      });
      return watchAnnounce(el).pipe(
        tap((state) => push$.next(state)),
        finalize(() => push$.complete()),
        map((state) => __spreadValues({ ref: el }, state))
      );
    });
  }

  // src/assets/javascripts/components/consent/index.ts
  function watchConsent(el, { target$: target$2 }) {
    return target$2.pipe(
      map((target) => ({ hidden: target !== el }))
    );
  }
  function mountConsent(el, options) {
    const internal$ = new Subject();
    internal$.subscribe(({ hidden }) => {
      el.hidden = hidden;
    });
    return watchConsent(el, options).pipe(
      tap((state) => internal$.next(state)),
      finalize(() => internal$.complete()),
      map((state) => __spreadValues({ ref: el }, state))
    );
  }

  // src/assets/javascripts/components/content/code/_/index.ts
  var import_clipboard = __toESM(require_clipboard());

  // src/assets/javascripts/templates/tooltip/index.tsx
  function renderTooltip(id) {
    return /* @__PURE__ */ h("div", { class: "md-tooltip", id }, /* @__PURE__ */ h("div", { class: "md-tooltip__inner md-typeset" }));
  }

  // src/assets/javascripts/templates/annotation/index.tsx
  function renderAnnotation(id, prefix) {
    prefix = prefix ? `${prefix}_annotation_${id}` : void 0;
    if (prefix) {
      const anchor = prefix ? `#${prefix}` : void 0;
      return /* @__PURE__ */ h("aside", { class: "md-annotation", tabIndex: 0 }, renderTooltip(prefix), /* @__PURE__ */ h("a", { href: anchor, class: "md-annotation__index", tabIndex: -1 }, /* @__PURE__ */ h("span", { "data-md-annotation-id": id })));
    } else {
      return /* @__PURE__ */ h("aside", { class: "md-annotation", tabIndex: 0 }, renderTooltip(prefix), /* @__PURE__ */ h("span", { class: "md-annotation__index", tabIndex: -1 }, /* @__PURE__ */ h("span", { "data-md-annotation-id": id })));
    }
  }

  // src/assets/javascripts/templates/clipboard/index.tsx
  function renderClipboardButton(id) {
    return /* @__PURE__ */ h(
      "button",
      {
        class: "md-clipboard md-icon",
        title: translation("clipboard.copy"),
        "data-clipboard-target": `#${id} > code`
      }
    );
  }

  // src/assets/javascripts/templates/search/index.tsx
  function renderSearchDocument(document2, flag) {
    const parent = flag & 2 /* PARENT */;
    const teaser = flag & 1 /* TEASER */;
    const missing = Object.keys(document2.terms).filter((key) => !document2.terms[key]).reduce((list, key) => [
      ...list,
      /* @__PURE__ */ h("del", null, key),
      " "
    ], []).slice(0, -1);
    const url = new URL(document2.location);
    if (feature("search.highlight"))
      url.searchParams.set(
        "h",
        Object.entries(document2.terms).filter(([, match]) => match).reduce((highlight, [value]) => `${highlight} ${value}`.trim(), "")
      );
    const { tags } = configuration();
    return /* @__PURE__ */ h("a", { href: `${url}`, class: "md-search-result__link", tabIndex: -1 }, /* @__PURE__ */ h(
      "article",
      {
        class: [
          "md-search-result__article",
          ...parent ? ["md-search-result__article--document"] : []
        ].join(" "),
        "data-md-score": document2.score.toFixed(2)
      },
      parent > 0 && /* @__PURE__ */ h("div", { class: "md-search-result__icon md-icon" }),
      /* @__PURE__ */ h("h1", { class: "md-search-result__title" }, document2.title),
      teaser > 0 && document2.text.length > 0 && /* @__PURE__ */ h("p", { class: "md-search-result__teaser" }, truncate(document2.text, 320)),
      document2.tags && /* @__PURE__ */ h("div", { class: "md-typeset" }, document2.tags.map((tag) => {
        const id = tag.replace(/<[^>]+>/g, "");
        const type = tags ? id in tags ? `md-tag-icon md-tag-icon--${tags[id]}` : "md-tag-icon" : "";
        return /* @__PURE__ */ h("span", { class: `md-tag ${type}` }, tag);
      })),
      teaser > 0 && missing.length > 0 && /* @__PURE__ */ h("p", { class: "md-search-result__terms" }, translation("search.result.term.missing"), ": ", ...missing)
    ));
  }
  function renderSearchResultItem(result) {
    const threshold = result[0].score;
    const docs = [...result];
    const parent = docs.findIndex((doc) => !doc.location.includes("#"));
    const [article] = docs.splice(parent, 1);
    let index2 = docs.findIndex((doc) => doc.score < threshold);
    if (index2 === -1)
      index2 = docs.length;
    const best = docs.slice(0, index2);
    const more = docs.slice(index2);
    const children = [
      renderSearchDocument(article, 2 /* PARENT */ | +(!parent && index2 === 0)),
      ...best.map((section) => renderSearchDocument(section, 1 /* TEASER */)),
      ...more.length ? [
        /* @__PURE__ */ h("details", { class: "md-search-result__more" }, /* @__PURE__ */ h("summary", { tabIndex: -1 }, more.length > 0 && more.length === 1 ? translation("search.result.more.one") : translation("search.result.more.other", more.length)), ...more.map((section) => renderSearchDocument(section, 1 /* TEASER */)))
      ] : []
    ];
    return /* @__PURE__ */ h("li", { class: "md-search-result__item" }, children);
  }

  // src/assets/javascripts/templates/source/index.tsx
  function renderSourceFacts(facts) {
    return /* @__PURE__ */ h("ul", { class: "md-source__facts" }, Object.entries(facts).map(([key, value]) => /* @__PURE__ */ h("li", { class: `md-source__fact md-source__fact--${key}` }, typeof value === "number" ? round(value) : value)));
  }

  // src/assets/javascripts/templates/tabbed/index.tsx
  function renderTabbedControl(type) {
    const classes = `tabbed-control tabbed-control--${type}`;
    return /* @__PURE__ */ h("div", { class: classes, hidden: true }, /* @__PURE__ */ h("button", { class: "tabbed-button", tabIndex: -1 }));
  }

  // src/assets/javascripts/templates/table/index.tsx
  function renderTable(table) {
    return /* @__PURE__ */ h("div", { class: "md-typeset__scrollwrap" }, /* @__PURE__ */ h("div", { class: "md-typeset__table" }, table));
  }

  // src/assets/javascripts/templates/version/index.tsx
  function renderVersion(version) {
    const config4 = configuration();
    const url = new URL(`../${version.version}/`, config4.base);
    return /* @__PURE__ */ h("li", { class: "md-version__item" }, /* @__PURE__ */ h("a", { href: `${url}`, class: "md-version__link" }, version.title));
  }
  function renderVersionSelector(versions, active) {
    return /* @__PURE__ */ h("div", { class: "md-version" }, /* @__PURE__ */ h(
      "button",
      {
        class: "md-version__current",
        "aria-label": translation("select.version.title")
      },
      active.title
    ), /* @__PURE__ */ h("ul", { class: "md-version__list" }, versions.map(renderVersion)));
  }

  // src/assets/javascripts/components/content/annotation/_/index.ts
  function watchAnnotation(el, container) {
    const offset$ = defer(() => combineLatest([
      watchElementOffset(el),
      watchElementContentOffset(container)
    ])).pipe(
      map(([{ x, y }, scroll]) => {
        const { width, height } = getElementSize(el);
        return {
          x: x - scroll.x + width / 2,
          y: y - scroll.y + height / 2
        };
      })
    );
    return watchElementFocus(el).pipe(
      switchMap(
        (active) => offset$.pipe(
          map((offset) => ({ active, offset })),
          take(+!active || Infinity)
        )
      )
    );
  }
  function mountAnnotation(el, container, { target$: target$2 }) {
    const [tooltip, index2] = Array.from(el.children);
    return defer(() => {
      const push$ = new Subject();
      const done$ = push$.pipe(takeLast(1));
      push$.subscribe({
        next({ offset }) {
          el.style.setProperty("--md-tooltip-x", `${offset.x}px`);
          el.style.setProperty("--md-tooltip-y", `${offset.y}px`);
        },
        complete() {
          el.style.removeProperty("--md-tooltip-x");
          el.style.removeProperty("--md-tooltip-y");
        }
      });
      watchElementVisibility(el).pipe(
        takeUntil(done$)
      ).subscribe((visible) => {
        el.toggleAttribute("data-md-visible", visible);
      });
      merge(
        push$.pipe(filter(({ active }) => active)),
        push$.pipe(debounceTime(250), filter(({ active }) => !active))
      ).subscribe({
        next({ active }) {
          if (active)
            el.prepend(tooltip);
          else
            tooltip.remove();
        },
        complete() {
          el.prepend(tooltip);
        }
      });
      push$.pipe(
        auditTime(16, animationFrameScheduler)
      ).subscribe(({ active }) => {
        tooltip.classList.toggle("md-tooltip--active", active);
      });
      push$.pipe(
        throttleTime(125, animationFrameScheduler),
        filter(() => !!el.offsetParent),
        map(() => el.offsetParent.getBoundingClientRect()),
        map(({ x }) => x)
      ).subscribe({
        next(origin) {
          if (origin)
            el.style.setProperty("--md-tooltip-0", `${-origin}px`);
          else
            el.style.removeProperty("--md-tooltip-0");
        },
        complete() {
          el.style.removeProperty("--md-tooltip-0");
        }
      });
      fromEvent(index2, "click").pipe(
        takeUntil(done$),
        filter((ev) => !(ev.metaKey || ev.ctrlKey))
      ).subscribe((ev) => ev.preventDefault());
      fromEvent(index2, "mousedown").pipe(
        takeUntil(done$),
        withLatestFrom(push$)
      ).subscribe(([ev, { active }]) => {
        var _a2;
        if (ev.button !== 0 || ev.metaKey || ev.ctrlKey) {
          ev.preventDefault();
        } else if (active) {
          ev.preventDefault();
          const parent = el.parentElement.closest(".md-annotation");
          if (parent instanceof HTMLElement)
            parent.focus();
          else
            (_a2 = getActiveElement()) == null ? void 0 : _a2.blur();
        }
      });
      target$2.pipe(
        takeUntil(done$),
        filter((target) => target === tooltip),
        delay(125)
      ).subscribe(() => el.focus());
      return watchAnnotation(el, container).pipe(
        tap((state) => push$.next(state)),
        finalize(() => push$.complete()),
        map((state) => __spreadValues({ ref: el }, state))
      );
    });
  }

  // src/assets/javascripts/components/content/annotation/list/index.ts
  function findAnnotationMarkers(container) {
    const markers = [];
    for (const el of getElements(".c, .c1, .cm", container)) {
      const nodes = [];
      const it = document.createNodeIterator(el, NodeFilter.SHOW_TEXT);
      for (let node = it.nextNode(); node; node = it.nextNode())
        nodes.push(node);
      for (let text of nodes) {
        let match;
        while (match = /(\(\d+\))(!)?/.exec(text.textContent)) {
          const [, id, force] = match;
          if (typeof force === "undefined") {
            const marker = text.splitText(match.index);
            text = marker.splitText(id.length);
            markers.push(marker);
          } else {
            text.textContent = id;
            markers.push(text);
            break;
          }
        }
      }
    }
    return markers;
  }
  function swap(source, target) {
    target.append(...Array.from(source.childNodes));
  }
  function mountAnnotationList(el, container, { target$: target$2, print$: print$2 }) {
    const parent = container.closest("[id]");
    const prefix = parent == null ? void 0 : parent.id;
    const annotations = /* @__PURE__ */ new Map();
    for (const marker of findAnnotationMarkers(container)) {
      const [, id] = marker.textContent.match(/\((\d+)\)/);
      if (getOptionalElement(`li:nth-child(${id})`, el)) {
        annotations.set(id, renderAnnotation(id, prefix));
        marker.replaceWith(annotations.get(id));
      }
    }
    if (annotations.size === 0)
      return EMPTY;
    return defer(() => {
      const done$ = new Subject();
      const pairs = [];
      for (const [id, annotation] of annotations)
        pairs.push([
          getElement(".md-typeset", annotation),
          getElement(`li:nth-child(${id})`, el)
        ]);
      print$2.pipe(
        takeUntil(done$.pipe(takeLast(1)))
      ).subscribe((active) => {
        el.hidden = !active;
        for (const [inner, child] of pairs)
          if (!active)
            swap(child, inner);
          else
            swap(inner, child);
      });
      return merge(
        ...[...annotations].map(([, annotation]) => mountAnnotation(annotation, container, { target$: target$2 }))
      ).pipe(
        finalize(() => done$.complete()),
        share()
      );
    });
  }

  // src/assets/javascripts/components/content/code/_/index.ts
  var sequence = 0;
  function findCandidateList(el) {
    if (el.nextElementSibling) {
      const sibling = el.nextElementSibling;
      if (sibling.tagName === "OL")
        return sibling;
      else if (sibling.tagName === "P" && !sibling.children.length)
        return findCandidateList(sibling);
    }
    return void 0;
  }
  function watchCodeBlock(el) {
    return watchElementSize(el).pipe(
      map(({ width }) => {
        const content = getElementContentSize(el);
        return {
          scrollable: content.width > width
        };
      }),
      distinctUntilKeyChanged("scrollable")
    );
  }
  function mountCodeBlock(el, options) {
    const { matches: hover } = matchMedia("(hover)");
    const factory$ = defer(() => {
      const push$ = new Subject();
      push$.subscribe(({ scrollable }) => {
        if (scrollable && hover)
          el.setAttribute("tabindex", "0");
        else
          el.removeAttribute("tabindex");
      });
      if (import_clipboard.default.isSupported()) {
        const parent = el.closest("pre");
        parent.id = `__code_${++sequence}`;
        parent.insertBefore(
          renderClipboardButton(parent.id),
          el
        );
      }
      const container = el.closest(".highlight");
      if (container instanceof HTMLElement) {
        const list = findCandidateList(container);
        if (typeof list !== "undefined" && (container.classList.contains("annotate") || feature("content.code.annotate"))) {
          const annotations$ = mountAnnotationList(list, el, options);
          return watchCodeBlock(el).pipe(
            tap((state) => push$.next(state)),
            finalize(() => push$.complete()),
            map((state) => __spreadValues({ ref: el }, state)),
            mergeWith(
              watchElementSize(container).pipe(
                map(({ width, height }) => width && height),
                distinctUntilChanged(),
                switchMap((active) => active ? annotations$ : EMPTY)
              )
            )
          );
        }
      }
      return watchCodeBlock(el).pipe(
        tap((state) => push$.next(state)),
        finalize(() => push$.complete()),
        map((state) => __spreadValues({ ref: el }, state))
      );
    });
    if (feature("content.lazy"))
      return watchElementVisibility(el).pipe(
        filter((visible) => visible),
        take(1),
        switchMap(() => factory$)
      );
    return factory$;
  }

  // src/assets/javascripts/components/content/code/mermaid/index.css
  var mermaid_default = ".node circle,.node ellipse,.node path,.node polygon,.node rect{fill:var(--md-mermaid-node-bg-color);stroke:var(--md-mermaid-node-fg-color)}marker{fill:var(--md-mermaid-edge-color)!important}.edgeLabel .label rect{fill:#0000}.label{color:var(--md-mermaid-label-fg-color);font-family:var(--md-mermaid-font-family)}.label foreignObject{line-height:normal;overflow:visible}.label div .edgeLabel{color:var(--md-mermaid-label-fg-color)}.edgeLabel,.edgeLabel rect,.label div .edgeLabel{background-color:var(--md-mermaid-label-bg-color)}.edgeLabel,.edgeLabel rect{fill:var(--md-mermaid-label-bg-color);color:var(--md-mermaid-edge-color)}.edgePath .path,.flowchart-link{stroke:var(--md-mermaid-edge-color)}.edgePath .arrowheadPath{fill:var(--md-mermaid-edge-color);stroke:none}.cluster rect{fill:var(--md-default-fg-color--lightest);stroke:var(--md-default-fg-color--lighter)}.cluster span{color:var(--md-mermaid-label-fg-color);font-family:var(--md-mermaid-font-family)}defs #flowchart-circleEnd,defs #flowchart-circleStart,defs #flowchart-crossEnd,defs #flowchart-crossStart,defs #flowchart-pointEnd,defs #flowchart-pointStart{stroke:none}g.classGroup line,g.classGroup rect{fill:var(--md-mermaid-node-bg-color);stroke:var(--md-mermaid-node-fg-color)}g.classGroup text{fill:var(--md-mermaid-label-fg-color);font-family:var(--md-mermaid-font-family)}.classLabel .box{fill:var(--md-mermaid-label-bg-color);background-color:var(--md-mermaid-label-bg-color);opacity:1}.classLabel .label{fill:var(--md-mermaid-label-fg-color);font-family:var(--md-mermaid-font-family)}.node .divider{stroke:var(--md-mermaid-node-fg-color)}.relation{stroke:var(--md-mermaid-edge-color)}.cardinality{fill:var(--md-mermaid-label-fg-color);font-family:var(--md-mermaid-font-family)}.cardinality text{fill:inherit!important}defs #classDiagram-compositionEnd,defs #classDiagram-compositionStart,defs #classDiagram-dependencyEnd,defs #classDiagram-dependencyStart,defs #classDiagram-extensionEnd,defs #classDiagram-extensionStart{fill:var(--md-mermaid-edge-color)!important;stroke:var(--md-mermaid-edge-color)!important}defs #classDiagram-aggregationEnd,defs #classDiagram-aggregationStart{fill:var(--md-mermaid-label-bg-color)!important;stroke:var(--md-mermaid-edge-color)!important}g.stateGroup rect{fill:var(--md-mermaid-node-bg-color);stroke:var(--md-mermaid-node-fg-color)}g.stateGroup .state-title{fill:var(--md-mermaid-label-fg-color)!important;font-family:var(--md-mermaid-font-family)}g.stateGroup .composit{fill:var(--md-mermaid-label-bg-color)}.nodeLabel{color:var(--md-mermaid-label-fg-color);font-family:var(--md-mermaid-font-family)}.node circle.state-end,.node circle.state-start,.start-state{fill:var(--md-mermaid-edge-color);stroke:none}.end-state-inner,.end-state-outer{fill:var(--md-mermaid-edge-color)}.end-state-inner,.node circle.state-end{stroke:var(--md-mermaid-label-bg-color)}.transition{stroke:var(--md-mermaid-edge-color)}[id^=state-fork] rect,[id^=state-join] rect{fill:var(--md-mermaid-edge-color)!important;stroke:none!important}.statediagram-cluster.statediagram-cluster .inner{fill:var(--md-default-bg-color)}.statediagram-cluster rect{fill:var(--md-mermaid-node-bg-color);stroke:var(--md-mermaid-node-fg-color)}.statediagram-state rect.divider{fill:var(--md-default-fg-color--lightest);stroke:var(--md-default-fg-color--lighter)}defs #statediagram-barbEnd{stroke:var(--md-mermaid-edge-color)}.entityBox{fill:var(--md-mermaid-label-bg-color);stroke:var(--md-mermaid-node-fg-color)}.entityLabel{fill:var(--md-mermaid-label-fg-color);font-family:var(--md-mermaid-font-family)}.relationshipLabelBox{fill:var(--md-mermaid-label-bg-color);fill-opacity:1;background-color:var(--md-mermaid-label-bg-color);opacity:1}.relationshipLabel{fill:var(--md-mermaid-label-fg-color)}.relationshipLine{stroke:var(--md-mermaid-edge-color)}defs #ONE_OR_MORE_END *,defs #ONE_OR_MORE_START *,defs #ONLY_ONE_END *,defs #ONLY_ONE_START *,defs #ZERO_OR_MORE_END *,defs #ZERO_OR_MORE_START *,defs #ZERO_OR_ONE_END *,defs #ZERO_OR_ONE_START *{stroke:var(--md-mermaid-edge-color)!important}.actor,defs #ZERO_OR_MORE_END circle,defs #ZERO_OR_MORE_START circle{fill:var(--md-mermaid-label-bg-color)}.actor{stroke:var(--md-mermaid-node-fg-color)}text.actor>tspan{fill:var(--md-mermaid-label-fg-color);font-family:var(--md-mermaid-font-family)}line{stroke:var(--md-default-fg-color--lighter)}.messageLine0,.messageLine1{stroke:var(--md-mermaid-edge-color)}.loopText>tspan,.messageText,.noteText>tspan{fill:var(--md-mermaid-edge-color);stroke:none;font-family:var(--md-mermaid-font-family)!important}.noteText>tspan{fill:#000}#arrowhead path{fill:var(--md-mermaid-edge-color);stroke:none}.loopLine{stroke:var(--md-mermaid-node-fg-color)}.labelBox,.loopLine{fill:var(--md-mermaid-node-bg-color)}.labelBox{stroke:none}.labelText,.labelText>span{fill:var(--md-mermaid-node-fg-color);font-family:var(--md-mermaid-font-family)}";

  // src/assets/javascripts/components/content/code/mermaid/index.ts
  var mermaid$;
  var sequence2 = 0;
  function fetchScripts() {
    return typeof mermaid === "undefined" || mermaid instanceof Element ? watchScript("https://unpkg.com/mermaid@9.1.7/dist/mermaid.min.js") : of(void 0);
  }
  function mountMermaid(el) {
    el.classList.remove("mermaid");
    mermaid$ || (mermaid$ = fetchScripts().pipe(
      tap(() => mermaid.initialize({
        startOnLoad: false,
        themeCSS: mermaid_default,
        sequence: {
          actorFontSize: "16px",
          messageFontSize: "16px",
          noteFontSize: "16px"
        }
      })),
      map(() => void 0),
      shareReplay(1)
    ));
    mermaid$.subscribe(() => {
      el.classList.add("mermaid");
      const id = `__mermaid_${sequence2++}`;
      const host = h("div", { class: "mermaid" });
      const text = el.textContent;
      mermaid.mermaidAPI.render(id, text, (svg, fn) => {
        const shadow = host.attachShadow({ mode: "closed" });
        shadow.innerHTML = svg;
        el.replaceWith(host);
        fn == null ? void 0 : fn(shadow);
      });
    });
    return mermaid$.pipe(
      map(() => ({ ref: el }))
    );
  }

  // src/assets/javascripts/components/content/details/index.ts
  function watchDetails(el, { target$: target$2, print$: print$2 }) {
    let open = true;
    return merge(
      target$2.pipe(
        map((target) => target.closest("details:not([open])")),
        filter((details) => el === details),
        map(() => ({
          action: "open",
          reveal: true
        }))
      ),
      print$2.pipe(
        filter((active) => active || !open),
        tap(() => open = el.open),
        map((active) => ({
          action: active ? "open" : "close"
        }))
      )
    );
  }
  function mountDetails(el, options) {
    return defer(() => {
      const push$ = new Subject();
      push$.subscribe(({ action, reveal }) => {
        el.toggleAttribute("open", action === "open");
        if (reveal)
          el.scrollIntoView();
      });
      return watchDetails(el, options).pipe(
        tap((state) => push$.next(state)),
        finalize(() => push$.complete()),
        map((state) => __spreadValues({ ref: el }, state))
      );
    });
  }

  // src/assets/javascripts/components/content/table/index.ts
  var sentinel = h("table");
  function mountDataTable(el) {
    el.replaceWith(sentinel);
    sentinel.replaceWith(renderTable(el));
    return of({ ref: el });
  }

  // src/assets/javascripts/components/content/tabs/index.ts
  function watchContentTabs(el) {
    const inputs = getElements(":scope > input", el);
    const initial = inputs.find((input) => input.checked) || inputs[0];
    return merge(...inputs.map(
      (input) => fromEvent(input, "change").pipe(
        map(() => getElement(`label[for="${input.id}"]`))
      )
    )).pipe(
      startWith(getElement(`label[for="${initial.id}"]`)),
      map((active) => ({ active }))
    );
  }
  function mountContentTabs(el, { viewport$: viewport$2 }) {
    const prev = renderTabbedControl("prev");
    el.append(prev);
    const next = renderTabbedControl("next");
    el.append(next);
    const container = getElement(".tabbed-labels", el);
    return defer(() => {
      const push$ = new Subject();
      const done$ = push$.pipe(takeLast(1));
      combineLatest([push$, watchElementSize(el)]).pipe(
        auditTime(1, animationFrameScheduler),
        takeUntil(done$)
      ).subscribe({
        next([{ active }, size]) {
          const offset = getElementOffset(active);
          const { width } = getElementSize(active);
          el.style.setProperty("--md-indicator-x", `${offset.x}px`);
          el.style.setProperty("--md-indicator-width", `${width}px`);
          const content = getElementContentOffset(container);
          if (offset.x < content.x || offset.x + width > content.x + size.width)
            container.scrollTo({
              left: Math.max(0, offset.x - 16),
              behavior: "smooth"
            });
        },
        complete() {
          el.style.removeProperty("--md-indicator-x");
          el.style.removeProperty("--md-indicator-width");
        }
      });
      combineLatest([
        watchElementContentOffset(container),
        watchElementSize(container)
      ]).pipe(
        takeUntil(done$)
      ).subscribe(([offset, size]) => {
        const content = getElementContentSize(container);
        prev.hidden = offset.x < 16;
        next.hidden = offset.x > content.width - size.width - 16;
      });
      merge(
        fromEvent(prev, "click").pipe(map(() => -1)),
        fromEvent(next, "click").pipe(map(() => 1))
      ).pipe(
        takeUntil(done$)
      ).subscribe((direction) => {
        const { width } = getElementSize(container);
        container.scrollBy({
          left: width * direction,
          behavior: "smooth"
        });
      });
      if (feature("content.tabs.link"))
        push$.pipe(
          skip(1),
          withLatestFrom(viewport$2)
        ).subscribe(([{ active }, { offset }]) => {
          const tab = active.innerText.trim();
          if (active.hasAttribute("data-md-switching")) {
            active.removeAttribute("data-md-switching");
          } else {
            const y = el.offsetTop - offset.y;
            for (const set of getElements("[data-tabs]"))
              for (const input of getElements(
                ":scope > input",
                set
              )) {
                const label = getElement(`label[for="${input.id}"]`);
                if (label !== active && label.innerText.trim() === tab) {
                  label.setAttribute("data-md-switching", "");
                  input.click();
                  break;
                }
              }
            window.scrollTo({
              top: el.offsetTop - y
            });
            const tabs = __md_get("__tabs") || [];
            __md_set("__tabs", [.../* @__PURE__ */ new Set([tab, ...tabs])]);
          }
        });
      return watchContentTabs(el).pipe(
        tap((state) => push$.next(state)),
        finalize(() => push$.complete()),
        map((state) => __spreadValues({ ref: el }, state))
      );
    }).pipe(
      subscribeOn(asyncScheduler)
    );
  }

  // src/assets/javascripts/components/content/_/index.ts
  function mountContent(el, { viewport$: viewport$2, target$: target$2, print$: print$2 }) {
    return merge(
      ...getElements("pre:not(.mermaid) > code", el).map((child) => mountCodeBlock(child, { target$: target$2, print$: print$2 })),
      ...getElements("pre.mermaid", el).map((child) => mountMermaid(child)),
      ...getElements("table:not([class])", el).map((child) => mountDataTable(child)),
      ...getElements("details", el).map((child) => mountDetails(child, { target$: target$2, print$: print$2 })),
      ...getElements("[data-tabs]", el).map((child) => mountContentTabs(child, { viewport$: viewport$2 }))
    );
  }

  // src/assets/javascripts/components/dialog/index.ts
  function watchDialog(_el, { alert$: alert$2 }) {
    return alert$2.pipe(
      switchMap(
        (message) => merge(
          of(true),
          of(false).pipe(delay(2e3))
        ).pipe(
          map((active) => ({ message, active }))
        )
      )
    );
  }
  function mountDialog(el, options) {
    const inner = getElement(".md-typeset", el);
    return defer(() => {
      const push$ = new Subject();
      push$.subscribe(({ message, active }) => {
        el.classList.toggle("md-dialog--active", active);
        inner.textContent = message;
      });
      return watchDialog(el, options).pipe(
        tap((state) => push$.next(state)),
        finalize(() => push$.complete()),
        map((state) => __spreadValues({ ref: el }, state))
      );
    });
  }

  // src/assets/javascripts/components/header/_/index.ts
  function isHidden({ viewport$: viewport$2 }) {
    if (!feature("header.autohide"))
      return of(false);
    const direction$ = viewport$2.pipe(
      map(({ offset: { y } }) => y),
      bufferCount(2, 1),
      map(([a, b]) => [a < b, b]),
      distinctUntilKeyChanged(0)
    );
    const hidden$ = combineLatest([viewport$2, direction$]).pipe(
      filter(([{ offset }, [, y]]) => Math.abs(y - offset.y) > 100),
      map(([, [direction]]) => direction),
      distinctUntilChanged()
    );
    const search$ = watchToggle("search");
    return combineLatest([viewport$2, search$]).pipe(
      map(([{ offset }, search]) => offset.y > 400 && !search),
      distinctUntilChanged(),
      switchMap((active) => active ? hidden$ : of(false)),
      startWith(false)
    );
  }
  function watchHeader(el, options) {
    return defer(() => combineLatest([
      watchElementSize(el),
      isHidden(options)
    ])).pipe(
      map(([{ height }, hidden]) => ({
        height,
        hidden
      })),
      distinctUntilChanged((a, b) => a.height === b.height && a.hidden === b.hidden),
      shareReplay(1)
    );
  }
  function mountHeader(el, { header$: header$2, main$: main$2 }) {
    return defer(() => {
      const push$ = new Subject();
      const done$ = push$.pipe(takeLast(1));
      push$.pipe(
        distinctUntilKeyChanged("active"),
        combineLatestWith(header$2)
      ).subscribe(([{ active }, { hidden }]) => {
        el.classList.toggle("md-header--shadow", active && !hidden);
        el.hidden = hidden;
      });
      main$2.subscribe(push$);
      return header$2.pipe(
        takeUntil(done$),
        map((state) => __spreadValues({ ref: el }, state))
      );
    });
  }

  // src/assets/javascripts/components/header/title/index.ts
  function watchHeaderTitle(el, { viewport$: viewport$2, header$: header$2 }) {
    return watchViewportAt(el, { viewport$: viewport$2, header$: header$2 }).pipe(
      map(({ offset: { y } }) => {
        const { height } = getElementSize(el);
        return {
          active: y >= height
        };
      }),
      distinctUntilKeyChanged("active")
    );
  }
  function mountHeaderTitle(el, options) {
    return defer(() => {
      const push$ = new Subject();
      push$.subscribe(({ active }) => {
        el.classList.toggle("md-header__title--active", active);
      });
      const heading = getOptionalElement("article h1");
      if (typeof heading === "undefined")
        return EMPTY;
      return watchHeaderTitle(heading, options).pipe(
        tap((state) => push$.next(state)),
        finalize(() => push$.complete()),
        map((state) => __spreadValues({ ref: el }, state))
      );
    });
  }

  // src/assets/javascripts/components/main/index.ts
  function watchMain(el, { viewport$: viewport$2, header$: header$2 }) {
    const adjust$ = header$2.pipe(
      map(({ height }) => height),
      distinctUntilChanged()
    );
    const border$ = adjust$.pipe(
      switchMap(
        () => watchElementSize(el).pipe(
          map(({ height }) => ({
            top: el.offsetTop,
            bottom: el.offsetTop + height
          })),
          distinctUntilKeyChanged("bottom")
        )
      )
    );
    return combineLatest([adjust$, border$, viewport$2]).pipe(
      map(([header, { top, bottom }, { offset: { y }, size: { height } }]) => {
        height = Math.max(
          0,
          height - Math.max(0, top - y, header) - Math.max(0, height + y - bottom)
        );
        return {
          offset: top - header,
          height,
          active: top - header <= y
        };
      }),
      distinctUntilChanged((a, b) => a.offset === b.offset && a.height === b.height && a.active === b.active)
    );
  }

  // src/assets/javascripts/components/palette/index.ts
  function watchPalette(inputs) {
    const current = __md_get("__palette") || {
      index: inputs.findIndex((input) => matchMedia(
        input.getAttribute("data-md-color-media")
      ).matches)
    };
    return of(...inputs).pipe(
      mergeMap(
        (input) => fromEvent(input, "change").pipe(
          map(() => input)
        )
      ),
      startWith(inputs[Math.max(0, current.index)]),
      map((input) => ({
        index: inputs.indexOf(input),
        color: {
          scheme: input.getAttribute("data-md-color-scheme"),
          primary: input.getAttribute("data-md-color-primary"),
          accent: input.getAttribute("data-md-color-accent")
        }
      })),
      shareReplay(1)
    );
  }
  function mountPalette(el) {
    return defer(() => {
      const push$ = new Subject();
      push$.subscribe((palette) => {
        document.body.setAttribute("data-md-color-switching", "");
        for (const [key, value] of Object.entries(palette.color))
          document.body.setAttribute(`data-md-color-${key}`, value);
        for (let index2 = 0; index2 < inputs.length; index2++) {
          const label = inputs[index2].nextElementSibling;
          if (label instanceof HTMLElement)
            label.hidden = palette.index !== index2;
        }
        __md_set("__palette", palette);
      });
      push$.pipe(observeOn(asyncScheduler)).subscribe(() => {
        document.body.removeAttribute("data-md-color-switching");
      });
      const inputs = getElements("input", el);
      return watchPalette(inputs).pipe(
        tap((state) => push$.next(state)),
        finalize(() => push$.complete()),
        map((state) => __spreadValues({ ref: el }, state))
      );
    });
  }

  // src/assets/javascripts/integrations/clipboard/index.ts
  var import_clipboard2 = __toESM(require_clipboard());
  function extract(el) {
    el.setAttribute("data-md-copying", "");
    const text = el.innerText;
    el.removeAttribute("data-md-copying");
    return text;
  }
  function setupClipboardJS({ alert$: alert$2 }) {
    if (import_clipboard2.default.isSupported()) {
      new Observable((subscriber) => {
        new import_clipboard2.default("[data-clipboard-target], [data-clipboard-text]", {
          text: (el) => el.getAttribute("data-clipboard-text") || extract(getElement(
            el.getAttribute("data-clipboard-target")
          ))
        }).on("success", (ev) => subscriber.next(ev));
      }).pipe(
        tap((ev) => {
          const trigger = ev.trigger;
          trigger.focus();
        }),
        map(() => translation("clipboard.copied"))
      ).subscribe(alert$2);
    }
  }

  // src/assets/javascripts/integrations/sitemap/index.ts
  function preprocess(urls) {
    if (urls.length < 2)
      return [""];
    const [root, next] = [...urls].sort((a, b) => a.length - b.length).map((url) => url.replace(/[^/]+$/, ""));
    let index2 = 0;
    if (root === next)
      index2 = root.length;
    else
      while (root.charCodeAt(index2) === next.charCodeAt(index2))
        index2++;
    return urls.map((url) => url.replace(root.slice(0, index2), ""));
  }
  function fetchSitemap(base) {
    const cached = __md_get("__sitemap", sessionStorage, base);
    if (cached) {
      return of(cached);
    } else {
      const config4 = configuration();
      return requestXML(new URL("sitemap.xml", base || config4.base)).pipe(
        map((sitemap) => preprocess(
          getElements("loc", sitemap).map((node) => node.textContent)
        )),
        catchError(() => EMPTY),
        defaultIfEmpty([]),
        tap((sitemap) => __md_set("__sitemap", sitemap, sessionStorage, base))
      );
    }
  }

  // src/assets/javascripts/integrations/instant/index.ts
  function setupInstantLoading({ document$: document$2, location$: location$2, viewport$: viewport$2 }) {
    const config4 = configuration();
    if (location.protocol === "file:")
      return;
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
      fromEvent(window, "beforeunload").subscribe(() => {
        history.scrollRestoration = "auto";
      });
    }
    const favicon = getOptionalElement("link[rel=icon]");
    if (typeof favicon !== "undefined")
      favicon.href = favicon.href;
    const push$ = fetchSitemap().pipe(
      map((paths) => paths.map((path) => `${new URL(path, config4.base)}`)),
      switchMap(
        (urls) => fromEvent(document.body, "click").pipe(
          filter((ev) => !ev.metaKey && !ev.ctrlKey),
          switchMap((ev) => {
            if (ev.target instanceof Element) {
              const el = ev.target.closest("a");
              if (el && !el.target) {
                const url = new URL(el.href);
                url.search = "";
                url.hash = "";
                if (url.pathname !== location.pathname && urls.includes(url.toString())) {
                  ev.preventDefault();
                  return of({
                    url: new URL(el.href)
                  });
                }
              }
            }
            return NEVER;
          })
        )
      ),
      share()
    );
    const pop$ = fromEvent(window, "popstate").pipe(
      filter((ev) => ev.state !== null),
      map((ev) => ({
        url: new URL(location.href),
        offset: ev.state
      })),
      share()
    );
    merge(push$, pop$).pipe(
      distinctUntilChanged((a, b) => a.url.href === b.url.href),
      map(({ url }) => url)
    ).subscribe(location$2);
    const response$ = location$2.pipe(
      distinctUntilKeyChanged("pathname"),
      switchMap(
        (url) => request(url.href).pipe(
          catchError(() => {
            setLocation(url);
            return NEVER;
          })
        )
      ),
      share()
    );
    push$.pipe(
      sample(response$)
    ).subscribe(({ url }) => {
      history.pushState({}, "", `${url}`);
    });
    const dom = new DOMParser();
    response$.pipe(
      switchMap((res) => res.text()),
      map((res) => dom.parseFromString(res, "text/html"))
    ).subscribe(document$2);
    document$2.pipe(
      skip(1)
    ).subscribe((replacement) => {
      for (const selector of [
        "title",
        "link[rel=canonical]",
        "meta[name=author]",
        "meta[name=description]",
        "[data-md-component=announce]",
        "[data-md-component=container]",
        "[data-md-component=header-topic]",
        "[data-md-component=outdated]",
        "[data-md-component=logo]",
        "[data-md-component=skip]",
        ...feature("navigation.tabs.sticky") ? ["[data-md-component=tabs]"] : []
      ]) {
        const source = getOptionalElement(selector);
        const target = getOptionalElement(selector, replacement);
        if (typeof source !== "undefined" && typeof target !== "undefined") {
          source.replaceWith(target);
        }
      }
    });
    document$2.pipe(
      skip(1),
      map(() => getComponentElement("container")),
      switchMap((el) => getElements("script", el)),
      concatMap((el) => {
        const script2 = h("script");
        if (el.src) {
          for (const name of el.getAttributeNames())
            script2.setAttribute(name, el.getAttribute(name));
          el.replaceWith(script2);
          return new Observable((observer) => {
            script2.onload = () => observer.complete();
          });
        } else {
          script2.textContent = el.textContent;
          el.replaceWith(script2);
          return EMPTY;
        }
      })
    ).subscribe();
    merge(push$, pop$).pipe(
      sample(document$2)
    ).subscribe(({ url, offset }) => {
      if (url.hash && !offset) {
        setLocationHash(url.hash);
      } else {
        window.scrollTo(0, (offset == null ? void 0 : offset.y) || 0);
      }
    });
    viewport$2.pipe(
      skipUntil(push$),
      debounceTime(250),
      distinctUntilKeyChanged("offset")
    ).subscribe(({ offset }) => {
      history.replaceState(offset, "");
    });
    merge(push$, pop$).pipe(
      bufferCount(2, 1),
      filter(([a, b]) => a.url.pathname === b.url.pathname),
      map(([, state]) => state)
    ).subscribe(({ offset }) => {
      window.scrollTo(0, (offset == null ? void 0 : offset.y) || 0);
    });
  }

  // src/assets/javascripts/integrations/search/document/index.ts
  var import_escape_html = __toESM(require_escape_html());

  // src/assets/javascripts/integrations/search/highlighter/index.ts
  var import_escape_html2 = __toESM(require_escape_html());
  function setupSearchHighlighter(config4, escape) {
    const separator = new RegExp(config4.separator, "img");
    const highlight = (_, data, term) => {
      return `${data}<mark data-md-highlight>${term}</mark>`;
    };
    return (query) => {
      query = query.replace(/[\s*+\-:~^]+/g, " ").trim();
      const match = new RegExp(`(^|${config4.separator})(${query.replace(/[|\\{}()[\]^$+*?.-]/g, "\\$&").replace(separator, "|")})`, "img");
      return (value) => (escape ? (0, import_escape_html2.default)(value) : value).replace(match, highlight).replace(/<\/mark>(\s+)<mark[^>]*>/img, "$1");
    };
  }

  // src/assets/javascripts/integrations/search/query/transform/index.ts
  function defaultTransform(query) {
    return query.split(/"([^"]+)"/g).map(
      (terms, index2) => index2 & 1 ? terms.replace(/^\b|^(?![^\x00-\x7F]|$)|\s+/g, " +") : terms
    ).join("").replace(/"|(?:^|\s+)[*+\-:^~]+(?=\s+|$)/g, "").trim();
  }

  // src/assets/javascripts/integrations/search/worker/message/index.ts
  function isSearchReadyMessage(message) {
    return message.type === 1 /* READY */;
  }
  function isSearchQueryMessage(message) {
    return message.type === 2 /* QUERY */;
  }
  function isSearchResultMessage(message) {
    return message.type === 3 /* RESULT */;
  }

  // src/assets/javascripts/integrations/search/worker/_/index.ts
  function setupSearchIndex({ config: config4, docs }) {
    if (config4.lang.length === 1 && config4.lang[0] === "en")
      config4.lang = [
        translation("search.config.lang")
      ];
    if (config4.separator === "[\\s\\-]+")
      config4.separator = translation("search.config.separator");
    const pipeline = translation("search.config.pipeline").split(/\s*,\s*/).filter(Boolean);
    const options = {
      pipeline,
      suggestions: feature("search.suggest")
    };
    return { config: config4, docs, options };
  }
  function setupSearchWorker(url, index2) {
    const config4 = configuration();
    const worker = new Worker(url);
    const tx$ = new Subject();
    const rx$ = watchWorker(worker, { tx$ }).pipe(
      map((message) => {
        if (isSearchResultMessage(message)) {
          for (const result of message.data.items)
            for (const document2 of result)
              document2.location = `${new URL(document2.location, config4.base)}`;
        }
        return message;
      }),
      share()
    );
    from(index2).pipe(
      map((data) => ({
        type: 0 /* SETUP */,
        data: setupSearchIndex(data)
      }))
    ).subscribe(tx$.next.bind(tx$));
    return { tx$, rx$ };
  }

  // src/assets/javascripts/integrations/version/index.ts
  function setupVersionSelector({ document$: document$2 }) {
    const config4 = configuration();
    const versions$ = requestJSON(
      new URL("../versions.json", config4.base)
    ).pipe(
      catchError(() => EMPTY)
    );
    const current$ = versions$.pipe(
      map((versions) => {
        const [, current] = config4.base.match(/([^/]+)\/?$/);
        return versions.find(({ version, aliases }) => version === current || aliases.includes(current)) || versions[0];
      })
    );
    versions$.pipe(
      map((versions) => new Map(versions.map((version) => [
        `${new URL(`../${version.version}/`, config4.base)}`,
        version
      ]))),
      switchMap(
        (urls) => fromEvent(document.body, "click").pipe(
          filter((ev) => !ev.metaKey && !ev.ctrlKey),
          withLatestFrom(current$),
          switchMap(([ev, current]) => {
            if (ev.target instanceof Element) {
              const el = ev.target.closest("a");
              if (el && !el.target && urls.has(el.href)) {
                const url = el.href;
                if (!ev.target.closest(".md-version")) {
                  const version = urls.get(url);
                  if (version === current)
                    return EMPTY;
                }
                ev.preventDefault();
                return of(url);
              }
            }
            return EMPTY;
          }),
          switchMap((url) => {
            const { version } = urls.get(url);
            return fetchSitemap(new URL(url)).pipe(
              map((sitemap) => {
                const location2 = getLocation();
                const path = location2.href.replace(config4.base, "");
                return sitemap.includes(path.split("#")[0]) ? new URL(`../${version}/${path}`, config4.base) : new URL(url);
              })
            );
          })
        )
      )
    ).subscribe((url) => setLocation(url));
    combineLatest([versions$, current$]).subscribe(([versions, current]) => {
      const topic = getElement(".md-header__topic");
      topic.appendChild(renderVersionSelector(versions, current));
    });
    document$2.pipe(switchMap(() => current$)).subscribe((current) => {
      var _a2;
      let outdated = __md_get("__outdated", sessionStorage);
      if (outdated === null) {
        const latest = ((_a2 = config4.version) == null ? void 0 : _a2.default) || "latest";
        outdated = !current.aliases.includes(latest);
        __md_set("__outdated", outdated, sessionStorage);
      }
      if (outdated)
        for (const warning of getComponentElements("outdated"))
          warning.hidden = false;
    });
  }

  // src/assets/javascripts/components/search/query/index.ts
  function watchSearchQuery(el, { rx$ }) {
    const fn = (__search == null ? void 0 : __search.transform) || defaultTransform;
    const { searchParams } = getLocation();
    if (searchParams.has("q"))
      setToggle("search", true);
    const param$ = rx$.pipe(
      filter(isSearchReadyMessage),
      take(1),
      map(() => searchParams.get("q") || "")
    );
    watchToggle("search").pipe(
      filter((active) => !active),
      take(1)
    ).subscribe(() => {
      const url = new URL(location.href);
      url.searchParams.delete("q");
      history.replaceState({}, "", `${url}`);
    });
    param$.subscribe((value) => {
      if (value) {
        el.value = value;
        el.focus();
      }
    });
    const focus$ = watchElementFocus(el);
    const value$ = merge(
      fromEvent(el, "keyup"),
      fromEvent(el, "focus").pipe(delay(1)),
      param$
    ).pipe(
      map(() => fn(el.value)),
      startWith(""),
      distinctUntilChanged()
    );
    return combineLatest([value$, focus$]).pipe(
      map(([value, focus]) => ({ value, focus })),
      shareReplay(1)
    );
  }
  function mountSearchQuery(el, { tx$, rx$ }) {
    const push$ = new Subject();
    const done$ = push$.pipe(takeLast(1));
    push$.pipe(
      distinctUntilKeyChanged("value"),
      map(({ value }) => ({
        type: 2 /* QUERY */,
        data: value
      }))
    ).subscribe(tx$.next.bind(tx$));
    push$.pipe(
      distinctUntilKeyChanged("focus")
    ).subscribe(({ focus }) => {
      if (focus) {
        setToggle("search", focus);
        el.placeholder = "";
      } else {
        el.placeholder = translation("search.placeholder");
      }
    });
    fromEvent(el.form, "reset").pipe(
      takeUntil(done$)
    ).subscribe(() => el.focus());
    return watchSearchQuery(el, { tx$, rx$ }).pipe(
      tap((state) => push$.next(state)),
      finalize(() => push$.complete()),
      map((state) => __spreadValues({ ref: el }, state)),
      share()
    );
  }

  // src/assets/javascripts/components/search/result/index.ts
  function mountSearchResult(el, { rx$ }, { query$ }) {
    const push$ = new Subject();
    const boundary$ = watchElementBoundary(el.parentElement).pipe(
      filter(Boolean)
    );
    const meta = getElement(":scope > :first-child", el);
    const list = getElement(":scope > :last-child", el);
    const ready$ = rx$.pipe(
      filter(isSearchReadyMessage),
      take(1)
    );
    push$.pipe(
      withLatestFrom(query$),
      skipUntil(ready$)
    ).subscribe(([{ items }, { value }]) => {
      if (value) {
        switch (items.length) {
          case 0:
            meta.textContent = translation("search.result.none");
            break;
          case 1:
            meta.textContent = translation("search.result.one");
            break;
          default:
            meta.textContent = translation(
              "search.result.other",
              round(items.length)
            );
        }
      } else {
        meta.textContent = translation("search.result.placeholder");
      }
    });
    push$.pipe(
      tap(() => list.innerHTML = ""),
      switchMap(({ items }) => merge(
        of(...items.slice(0, 10)),
        of(...items.slice(10)).pipe(
          bufferCount(4),
          zipWith(boundary$),
          switchMap(([chunk]) => chunk)
        )
      ))
    ).subscribe((result) => list.appendChild(
      renderSearchResultItem(result)
    ));
    const result$ = rx$.pipe(
      filter(isSearchResultMessage),
      map(({ data }) => data)
    );
    return result$.pipe(
      tap((state) => push$.next(state)),
      finalize(() => push$.complete()),
      map((state) => __spreadValues({ ref: el }, state))
    );
  }

  // src/assets/javascripts/components/search/share/index.ts
  function watchSearchShare(_el, { query$ }) {
    return query$.pipe(
      map(({ value }) => {
        const url = getLocation();
        url.hash = "";
        url.searchParams.delete("h");
        url.searchParams.set("q", value);
        return { url };
      })
    );
  }
  function mountSearchShare(el, options) {
    const push$ = new Subject();
    push$.subscribe(({ url }) => {
      el.setAttribute("data-clipboard-text", el.href);
      el.href = `${url}`;
    });
    fromEvent(el, "click").subscribe((ev) => ev.preventDefault());
    return watchSearchShare(el, options).pipe(
      tap((state) => push$.next(state)),
      finalize(() => push$.complete()),
      map((state) => __spreadValues({ ref: el }, state))
    );
  }

  // src/assets/javascripts/components/search/suggest/index.ts
  function mountSearchSuggest(el, { rx$ }, { keyboard$: keyboard$2 }) {
    const push$ = new Subject();
    const query = getComponentElement("search-query");
    const query$ = merge(
      fromEvent(query, "keydown"),
      fromEvent(query, "focus")
    ).pipe(
      observeOn(asyncScheduler),
      map(() => query.value),
      distinctUntilChanged()
    );
    push$.pipe(
      combineLatestWith(query$),
      map(([{ suggestions }, value]) => {
        const words = value.split(/([\s-]+)/);
        if ((suggestions == null ? void 0 : suggestions.length) && words[words.length - 1]) {
          const last2 = suggestions[suggestions.length - 1];
          if (last2.startsWith(words[words.length - 1]))
            words[words.length - 1] = last2;
        } else {
          words.length = 0;
        }
        return words;
      })
    ).subscribe(
      (words) => el.innerHTML = words.join("").replace(/\s/g, "&nbsp;")
    );
    keyboard$2.pipe(
      filter(({ mode }) => mode === "search")
    ).subscribe((key) => {
      switch (key.type) {
        case "ArrowRight":
          if (el.innerText.length && query.selectionStart === query.value.length)
            query.value = el.innerText;
          break;
      }
    });
    const result$ = rx$.pipe(
      filter(isSearchResultMessage),
      map(({ data }) => data)
    );
    return result$.pipe(
      tap((state) => push$.next(state)),
      finalize(() => push$.complete()),
      map(() => ({ ref: el }))
    );
  }

  // src/assets/javascripts/components/search/_/index.ts
  function mountSearch(el, { index$: index$2, keyboard$: keyboard$2 }) {
    const config4 = configuration();
    try {
      const url = (__search == null ? void 0 : __search.worker) || config4.search;
      const worker = setupSearchWorker(url, index$2);
      const query = getComponentElement("search-query", el);
      const result = getComponentElement("search-result", el);
      const { tx$, rx$ } = worker;
      tx$.pipe(
        filter(isSearchQueryMessage),
        sample(rx$.pipe(filter(isSearchReadyMessage))),
        take(1)
      ).subscribe(tx$.next.bind(tx$));
      keyboard$2.pipe(
        filter(({ mode }) => mode === "search")
      ).subscribe((key) => {
        const active = getActiveElement();
        switch (key.type) {
          case "Enter":
            if (active === query) {
              const anchors = /* @__PURE__ */ new Map();
              for (const anchor of getElements(
                ":first-child [href]",
                result
              )) {
                const article = anchor.firstElementChild;
                anchors.set(anchor, parseFloat(
                  article.getAttribute("data-md-score")
                ));
              }
              if (anchors.size) {
                const [[best]] = [...anchors].sort(([, a], [, b]) => b - a);
                best.click();
              }
              key.claim();
            }
            break;
          case "Escape":
          case "Tab":
            setToggle("search", false);
            query.blur();
            break;
          case "ArrowUp":
          case "ArrowDown":
            if (typeof active === "undefined") {
              query.focus();
            } else {
              const els = [query, ...getElements(
                ":not(details) > [href], summary, details[open] [href]",
                result
              )];
              const i = Math.max(0, (Math.max(0, els.indexOf(active)) + els.length + (key.type === "ArrowUp" ? -1 : 1)) % els.length);
              els[i].focus();
            }
            key.claim();
            break;
          default:
            if (query !== getActiveElement())
              query.focus();
        }
      });
      keyboard$2.pipe(
        filter(({ mode }) => mode === "global")
      ).subscribe((key) => {
        switch (key.type) {
          case "f":
          case "s":
          case "/":
            query.focus();
            query.select();
            key.claim();
            break;
        }
      });
      const query$ = mountSearchQuery(query, worker);
      const result$ = mountSearchResult(result, worker, { query$ });
      return merge(query$, result$).pipe(
        mergeWith(
          ...getComponentElements("search-share", el).map((child) => mountSearchShare(child, { query$ })),
          ...getComponentElements("search-suggest", el).map((child) => mountSearchSuggest(child, worker, { keyboard$: keyboard$2 }))
        )
      );
    } catch (err) {
      el.hidden = true;
      return NEVER;
    }
  }

  // src/assets/javascripts/components/search/highlight/index.ts
  function mountSearchHiglight(el, { index$: index$2, location$: location$2 }) {
    return combineLatest([
      index$2,
      location$2.pipe(
        startWith(getLocation()),
        filter((url) => !!url.searchParams.get("h"))
      )
    ]).pipe(
      map(([index2, url]) => setupSearchHighlighter(index2.config, true)(
        url.searchParams.get("h")
      )),
      map((fn) => {
        var _a2;
        const nodes = /* @__PURE__ */ new Map();
        const it = document.createNodeIterator(el, NodeFilter.SHOW_TEXT);
        for (let node = it.nextNode(); node; node = it.nextNode()) {
          if ((_a2 = node.parentElement) == null ? void 0 : _a2.offsetHeight) {
            const original = node.textContent;
            const replaced = fn(original);
            if (replaced.length > original.length)
              nodes.set(node, replaced);
          }
        }
        for (const [node, text] of nodes) {
          const { childNodes } = h("span", null, text);
          node.replaceWith(...Array.from(childNodes));
        }
        return { ref: el, nodes };
      })
    );
  }

  // src/assets/javascripts/components/sidebar/index.ts
  function watchSidebar(el, { viewport$: viewport$2, main$: main$2 }) {
    const parent = el.parentElement;
    const adjust = parent.offsetTop - parent.parentElement.offsetTop;
    return combineLatest([main$2, viewport$2]).pipe(
      map(([{ offset, height }, { offset: { y } }]) => {
        height = height + Math.min(adjust, Math.max(0, y - offset)) - adjust;
        return {
          height,
          locked: y >= offset + adjust
        };
      }),
      distinctUntilChanged((a, b) => a.height === b.height && a.locked === b.locked)
    );
  }
  function mountSidebar(el, _a2) {
    var _b = _a2, { header$: header$2 } = _b, options = __objRest(_b, ["header$"]);
    const inner = getElement(".md-sidebar__scrollwrap", el);
    const { y } = getElementOffset(inner);
    return defer(() => {
      const push$ = new Subject();
      push$.pipe(
        auditTime(0, animationFrameScheduler),
        withLatestFrom(header$2)
      ).subscribe({
        next([{ height }, { height: offset }]) {
          inner.style.height = `${height - 2 * y}px`;
          el.style.top = `${offset}px`;
        },
        complete() {
          inner.style.height = "";
          el.style.top = "";
        }
      });
      push$.pipe(
        observeOn(animationFrameScheduler),
        take(1)
      ).subscribe(() => {
        for (const item of getElements(".md-nav__link--active[href]", el)) {
          const container = getElementContainer(item);
          if (typeof container !== "undefined") {
            const offset = item.offsetTop - container.offsetTop;
            const { height } = getElementSize(container);
            container.scrollTo({
              top: offset - height / 2
            });
          }
        }
      });
      return watchSidebar(el, options).pipe(
        tap((state) => push$.next(state)),
        finalize(() => push$.complete()),
        map((state) => __spreadValues({ ref: el }, state))
      );
    });
  }

  // src/assets/javascripts/components/source/facts/github/index.ts
  function fetchSourceFactsFromGitHub(user, repo) {
    if (typeof repo !== "undefined") {
      const url = `https://api.github.com/repos/${user}/${repo}`;
      return zip(
        requestJSON(`${url}/releases/latest`).pipe(
          catchError(() => EMPTY),
          map((release) => ({
            version: release.tag_name
          })),
          defaultIfEmpty({})
        ),
        requestJSON(url).pipe(
          catchError(() => EMPTY),
          map((info) => ({
            stars: info.stargazers_count,
            forks: info.forks_count
          })),
          defaultIfEmpty({})
        )
      ).pipe(
        map(([release, info]) => __spreadValues(__spreadValues({}, release), info))
      );
    } else {
      const url = `https://api.github.com/users/${user}`;
      return requestJSON(url).pipe(
        map((info) => ({
          repositories: info.public_repos
        })),
        defaultIfEmpty({})
      );
    }
  }

  // src/assets/javascripts/components/source/facts/gitlab/index.ts
  function fetchSourceFactsFromGitLab(base, project) {
    const url = `https://${base}/api/v4/projects/${encodeURIComponent(project)}`;
    return requestJSON(url).pipe(
      catchError(() => EMPTY),
      map(({ star_count, forks_count }) => ({
        stars: star_count,
        forks: forks_count
      })),
      defaultIfEmpty({})
    );
  }

  // src/assets/javascripts/components/source/facts/_/index.ts
  function fetchSourceFacts(url) {
    let match = url.match(/^.+github\.com\/([^/]+)\/?([^/]+)?/i);
    if (match) {
      const [, user, repo] = match;
      return fetchSourceFactsFromGitHub(user, repo);
    }
    match = url.match(/^.+?([^/]*gitlab[^/]+)\/(.+?)\/?$/i);
    if (match) {
      const [, base, slug] = match;
      return fetchSourceFactsFromGitLab(base, slug);
    }
    return EMPTY;
  }

  // src/assets/javascripts/components/source/_/index.ts
  var fetch$;
  function watchSource(el) {
    return fetch$ || (fetch$ = defer(() => {
      const cached = __md_get("__source", sessionStorage);
      if (cached) {
        return of(cached);
      } else {
        const els = getComponentElements("consent");
        if (els.length) {
          const consent = __md_get("__consent");
          if (!(consent && consent.github))
            return EMPTY;
        }
        return fetchSourceFacts(el.href).pipe(
          tap((facts) => __md_set("__source", facts, sessionStorage))
        );
      }
    }).pipe(
      catchError(() => EMPTY),
      filter((facts) => Object.keys(facts).length > 0),
      map((facts) => ({ facts })),
      shareReplay(1)
    ));
  }
  function mountSource(el) {
    const inner = getElement(":scope > :last-child", el);
    return defer(() => {
      const push$ = new Subject();
      push$.subscribe(({ facts }) => {
        inner.appendChild(renderSourceFacts(facts));
        inner.classList.add("md-source__repository--active");
      });
      return watchSource(el).pipe(
        tap((state) => push$.next(state)),
        finalize(() => push$.complete()),
        map((state) => __spreadValues({ ref: el }, state))
      );
    });
  }

  // src/assets/javascripts/components/tabs/index.ts
  function watchTabs(el, { viewport$: viewport$2, header$: header$2 }) {
    return watchElementSize(document.body).pipe(
      switchMap(() => watchViewportAt(el, { header$: header$2, viewport$: viewport$2 })),
      map(({ offset: { y } }) => {
        return {
          hidden: y >= 10
        };
      }),
      distinctUntilKeyChanged("hidden")
    );
  }
  function mountTabs(el, options) {
    return defer(() => {
      const push$ = new Subject();
      push$.subscribe({
        next({ hidden }) {
          el.hidden = hidden;
        },
        complete() {
          el.hidden = false;
        }
      });
      return (feature("navigation.tabs.sticky") ? of({ hidden: false }) : watchTabs(el, options)).pipe(
        tap((state) => push$.next(state)),
        finalize(() => push$.complete()),
        map((state) => __spreadValues({ ref: el }, state))
      );
    });
  }

  // src/assets/javascripts/components/toc/index.ts
  function watchTableOfContents(el, { viewport$: viewport$2, header$: header$2 }) {
    const table = /* @__PURE__ */ new Map();
    const anchors = getElements("[href^=\\#]", el);
    for (const anchor of anchors) {
      const id = decodeURIComponent(anchor.hash.substring(1));
      const target = getOptionalElement(`[id="${id}"]`);
      if (typeof target !== "undefined")
        table.set(anchor, target);
    }
    const adjust$ = header$2.pipe(
      distinctUntilKeyChanged("height"),
      map(({ height }) => {
        const main = getComponentElement("main");
        const grid = getElement(":scope > :first-child", main);
        return height + 0.8 * (grid.offsetTop - main.offsetTop);
      }),
      share()
    );
    const partition$ = watchElementSize(document.body).pipe(
      distinctUntilKeyChanged("height"),
      switchMap(
        (body) => defer(() => {
          let path = [];
          return of([...table].reduce((index2, [anchor, target]) => {
            while (path.length) {
              const last2 = table.get(path[path.length - 1]);
              if (last2.tagName >= target.tagName) {
                path.pop();
              } else {
                break;
              }
            }
            let offset = target.offsetTop;
            while (!offset && target.parentElement) {
              target = target.parentElement;
              offset = target.offsetTop;
            }
            return index2.set(
              [...path = [...path, anchor]].reverse(),
              offset
            );
          }, /* @__PURE__ */ new Map()));
        }).pipe(
          map((index2) => new Map([...index2].sort(([, a], [, b]) => a - b))),
          combineLatestWith(adjust$),
          switchMap(
            ([index2, adjust]) => viewport$2.pipe(
              scan(([prev, next], { offset: { y }, size }) => {
                const last2 = y + size.height >= Math.floor(body.height);
                while (next.length) {
                  const [, offset] = next[0];
                  if (offset - adjust < y || last2) {
                    prev = [...prev, next.shift()];
                  } else {
                    break;
                  }
                }
                while (prev.length) {
                  const [, offset] = prev[prev.length - 1];
                  if (offset - adjust >= y && !last2) {
                    next = [prev.pop(), ...next];
                  } else {
                    break;
                  }
                }
                return [prev, next];
              }, [[], [...index2]]),
              distinctUntilChanged((a, b) => a[0] === b[0] && a[1] === b[1])
            )
          )
        )
      )
    );
    return partition$.pipe(
      map(([prev, next]) => ({
        prev: prev.map(([path]) => path),
        next: next.map(([path]) => path)
      })),
      startWith({ prev: [], next: [] }),
      bufferCount(2, 1),
      map(([a, b]) => {
        if (a.prev.length < b.prev.length) {
          return {
            prev: b.prev.slice(Math.max(0, a.prev.length - 1), b.prev.length),
            next: []
          };
        } else {
          return {
            prev: b.prev.slice(-1),
            next: b.next.slice(0, b.next.length - a.next.length)
          };
        }
      })
    );
  }
  function mountTableOfContents(el, { viewport$: viewport$2, header$: header$2, target$: target$2 }) {
    return defer(() => {
      const push$ = new Subject();
      const done$ = push$.pipe(takeLast(1));
      push$.subscribe(({ prev, next }) => {
        for (const [anchor] of next) {
          anchor.classList.remove("md-nav__link--passed");
          anchor.classList.remove("md-nav__link--active");
        }
        for (const [index2, [anchor]] of prev.entries()) {
          anchor.classList.add("md-nav__link--passed");
          anchor.classList.toggle(
            "md-nav__link--active",
            index2 === prev.length - 1
          );
        }
      });
      if (feature("toc.follow")) {
        const smooth$ = merge(
          viewport$2.pipe(debounceTime(1), map(() => void 0)),
          viewport$2.pipe(debounceTime(250), map(() => "smooth"))
        );
        push$.pipe(
          filter(({ prev }) => prev.length > 0),
          withLatestFrom(smooth$)
        ).subscribe(([{ prev }, behavior]) => {
          const [anchor] = prev[prev.length - 1];
          if (anchor.offsetHeight) {
            const container = getElementContainer(anchor);
            if (typeof container !== "undefined") {
              const offset = anchor.offsetTop - container.offsetTop;
              const { height } = getElementSize(container);
              container.scrollTo({
                top: offset - height / 2,
                behavior
              });
            }
          }
        });
      }
      if (feature("navigation.tracking"))
        viewport$2.pipe(
          takeUntil(done$),
          distinctUntilKeyChanged("offset"),
          debounceTime(250),
          skip(1),
          takeUntil(target$2.pipe(skip(1))),
          repeat({ delay: 250 }),
          withLatestFrom(push$)
        ).subscribe(([, { prev }]) => {
          const url = getLocation();
          const anchor = prev[prev.length - 1];
          if (anchor && anchor.length) {
            const [active] = anchor;
            const { hash } = new URL(active.href);
            if (url.hash !== hash) {
              url.hash = hash;
              history.replaceState({}, "", `${url}`);
            }
          } else {
            url.hash = "";
            history.replaceState({}, "", `${url}`);
          }
        });
      return watchTableOfContents(el, { viewport$: viewport$2, header$: header$2 }).pipe(
        tap((state) => push$.next(state)),
        finalize(() => push$.complete()),
        map((state) => __spreadValues({ ref: el }, state))
      );
    });
  }

  // src/assets/javascripts/components/top/index.ts
  function watchBackToTop(_el, { viewport$: viewport$2, main$: main$2, target$: target$2 }) {
    const direction$ = viewport$2.pipe(
      map(({ offset: { y } }) => y),
      bufferCount(2, 1),
      map(([a, b]) => a > b && b > 0),
      distinctUntilChanged()
    );
    const active$ = main$2.pipe(
      map(({ active }) => active)
    );
    return combineLatest([active$, direction$]).pipe(
      map(([active, direction]) => !(active && direction)),
      distinctUntilChanged(),
      takeUntil(target$2.pipe(skip(1))),
      endWith(true),
      repeat({ delay: 250 }),
      map((hidden) => ({ hidden }))
    );
  }
  function mountBackToTop(el, { viewport$: viewport$2, header$: header$2, main$: main$2, target$: target$2 }) {
    const push$ = new Subject();
    const done$ = push$.pipe(takeLast(1));
    push$.subscribe({
      next({ hidden }) {
        el.hidden = hidden;
        if (hidden) {
          el.setAttribute("tabindex", "-1");
          el.blur();
        } else {
          el.removeAttribute("tabindex");
        }
      },
      complete() {
        el.style.top = "";
        el.hidden = true;
        el.removeAttribute("tabindex");
      }
    });
    header$2.pipe(
      takeUntil(done$),
      distinctUntilKeyChanged("height")
    ).subscribe(({ height }) => {
      el.style.top = `${height + 16}px`;
    });
    return watchBackToTop(el, { viewport$: viewport$2, main$: main$2, target$: target$2 }).pipe(
      tap((state) => push$.next(state)),
      finalize(() => push$.complete()),
      map((state) => __spreadValues({ ref: el }, state))
    );
  }

  // src/assets/javascripts/patches/indeterminate/index.ts
  function patchIndeterminate({ document$: document$2, tablet$: tablet$2 }) {
    document$2.pipe(
      switchMap(() => getElements(
        ".md-toggle--indeterminate, [data-md-state=indeterminate]"
      )),
      tap((el) => {
        el.indeterminate = true;
        el.checked = false;
      }),
      mergeMap(
        (el) => fromEvent(el, "change").pipe(
          takeWhile(() => el.classList.contains("md-toggle--indeterminate")),
          map(() => el)
        )
      ),
      withLatestFrom(tablet$2)
    ).subscribe(([el, tablet]) => {
      el.classList.remove("md-toggle--indeterminate");
      if (tablet)
        el.checked = false;
    });
  }

  // src/assets/javascripts/patches/scrollfix/index.ts
  function isAppleDevice() {
    return /(iPad|iPhone|iPod)/.test(navigator.userAgent);
  }
  function patchScrollfix({ document$: document$2 }) {
    document$2.pipe(
      switchMap(() => getElements("[data-md-scrollfix]")),
      tap((el) => el.removeAttribute("data-md-scrollfix")),
      filter(isAppleDevice),
      mergeMap(
        (el) => fromEvent(el, "touchstart").pipe(
          map(() => el)
        )
      )
    ).subscribe((el) => {
      const top = el.scrollTop;
      if (top === 0) {
        el.scrollTop = 1;
      } else if (top + el.offsetHeight === el.scrollHeight) {
        el.scrollTop = top - 1;
      }
    });
  }

  // src/assets/javascripts/patches/scrolllock/index.ts
  function patchScrolllock({ viewport$: viewport$2, tablet$: tablet$2 }) {
    combineLatest([watchToggle("search"), tablet$2]).pipe(
      map(([active, tablet]) => active && !tablet),
      switchMap(
        (active) => of(active).pipe(
          delay(active ? 400 : 100)
        )
      ),
      withLatestFrom(viewport$2)
    ).subscribe(([active, { offset: { y } }]) => {
      if (active) {
        document.body.setAttribute("data-md-scrolllock", "");
        document.body.style.top = `-${y}px`;
      } else {
        const value = -1 * parseInt(document.body.style.top, 10);
        document.body.removeAttribute("data-md-scrolllock");
        document.body.style.top = "";
        if (value)
          window.scrollTo(0, value);
      }
    });
  }

  // src/assets/javascripts/polyfills/index.ts
  if (!Object.entries)
    Object.entries = function(obj) {
      const data = [];
      for (const key of Object.keys(obj))
        data.push([key, obj[key]]);
      return data;
    };
  if (!Object.values)
    Object.values = function(obj) {
      const data = [];
      for (const key of Object.keys(obj))
        data.push(obj[key]);
      return data;
    };
  if (typeof Element !== "undefined") {
    if (!Element.prototype.scrollTo)
      Element.prototype.scrollTo = function(x, y) {
        if (typeof x === "object") {
          this.scrollLeft = x.left;
          this.scrollTop = x.top;
        } else {
          this.scrollLeft = x;
          this.scrollTop = y;
        }
      };
    if (!Element.prototype.replaceWith)
      Element.prototype.replaceWith = function(...nodes) {
        const parent = this.parentNode;
        if (parent) {
          if (nodes.length === 0)
            parent.removeChild(this);
          for (let i = nodes.length - 1; i >= 0; i--) {
            let node = nodes[i];
            if (typeof node === "string")
              node = document.createTextNode(node);
            else if (node.parentNode)
              node.parentNode.removeChild(node);
            if (!i)
              parent.replaceChild(node, this);
            else
              parent.insertBefore(this.previousSibling, node);
          }
        }
      };
  }

  // src/assets/javascripts/bundle.ts
  document.documentElement.classList.remove("no-js");
  document.documentElement.classList.add("js");
  var document$ = watchDocument();
  var location$ = watchLocation();
  var target$ = watchLocationTarget();
  var keyboard$ = watchKeyboard();
  var viewport$ = watchViewport();
  var tablet$ = watchMedia("(min-width: 960px)");
  var screen$ = watchMedia("(min-width: 1220px)");
  var print$ = watchPrint();
  var config3 = configuration();
  var index$ = document.forms.namedItem("search") ? (__search == null ? void 0 : __search.index) || requestJSON(
    new URL("search/search_index.json", config3.base)
  ) : NEVER;
  var alert$ = new Subject();
  setupClipboardJS({ alert$ });
  if (feature("navigation.instant"))
    setupInstantLoading({ document$, location$, viewport$ });
  var _a;
  if (((_a = config3.version) == null ? void 0 : _a.provider) === "mike")
    setupVersionSelector({ document$ });
  merge(location$, target$).pipe(
    delay(125)
  ).subscribe(() => {
    setToggle("drawer", false);
    setToggle("search", false);
  });
  keyboard$.pipe(
    filter(({ mode }) => mode === "global")
  ).subscribe((key) => {
    switch (key.type) {
      case "p":
      case ",":
        const prev = getOptionalElement("[href][rel=prev]");
        if (typeof prev !== "undefined")
          prev.click();
        break;
      case "n":
      case ".":
        const next = getOptionalElement("[href][rel=next]");
        if (typeof next !== "undefined")
          next.click();
        break;
    }
  });
  patchIndeterminate({ document$, tablet$ });
  patchScrollfix({ document$ });
  patchScrolllock({ viewport$, tablet$ });
  var header$ = watchHeader(getComponentElement("header"), { viewport$ });
  var main$ = document$.pipe(
    map(() => getComponentElement("main")),
    switchMap((el) => watchMain(el, { viewport$, header$ })),
    shareReplay(1)
  );
  var control$ = merge(
    ...getComponentElements("consent").map((el) => mountConsent(el, { target$ })),
    ...getComponentElements("dialog").map((el) => mountDialog(el, { alert$ })),
    ...getComponentElements("header").map((el) => mountHeader(el, { viewport$, header$, main$ })),
    ...getComponentElements("palette").map((el) => mountPalette(el)),
    ...getComponentElements("search").map((el) => mountSearch(el, { index$, keyboard$ })),
    ...getComponentElements("source").map((el) => mountSource(el))
  );
  var content$ = defer(() => merge(
    ...getComponentElements("announce").map((el) => mountAnnounce(el)),
    ...getComponentElements("content").map((el) => mountContent(el, { viewport$, target$, print$ })),
    ...getComponentElements("content").map(
      (el) => feature("search.highlight") ? mountSearchHiglight(el, { index$, location$ }) : EMPTY
    ),
    ...getComponentElements("header-title").map((el) => mountHeaderTitle(el, { viewport$, header$ })),
    ...getComponentElements("sidebar").map(
      (el) => el.getAttribute("data-md-type") === "navigation" ? at(screen$, () => mountSidebar(el, { viewport$, header$, main$ })) : at(tablet$, () => mountSidebar(el, { viewport$, header$, main$ }))
    ),
    ...getComponentElements("tabs").map((el) => mountTabs(el, { viewport$, header$ })),
    ...getComponentElements("toc").map((el) => mountTableOfContents(el, { viewport$, header$, target$ })),
    ...getComponentElements("top").map((el) => mountBackToTop(el, { viewport$, header$, main$, target$ }))
  ));
  var component$ = document$.pipe(
    switchMap(() => content$),
    mergeWith(control$),
    shareReplay(1)
  );
  component$.subscribe();
  window.document$ = document$;
  window.location$ = location$;
  window.target$ = target$;
  window.keyboard$ = keyboard$;
  window.viewport$ = viewport$;
  window.tablet$ = tablet$;
  window.screen$ = screen$;
  window.print$ = print$;
  window.alert$ = alert$;
  window.component$ = component$;
})();
//# sourceMappingURL=bundle.js.map

