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
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
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
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

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
          var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
          if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
          else
            for (var i = decorators.length - 1; i >= 0; i--)
              if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
          return c > 3 && r && Object.defineProperty(target, key, r), r;
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
          var i = m.call(o), r, ar = [], e;
          try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
              ar.push(r.value);
          } catch (error) {
            e = { error };
          } finally {
            try {
              if (r && !r.done && (m = i["return"]))
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
          for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
          return r;
        };
        __spreadArray2 = function(to, from2) {
          for (var i = 0, il = from2.length, j = to.length; i < il; i++, j++)
            to[j] = from2[i];
          return to;
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
          function step(r) {
            r.value instanceof __await2 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
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
        __classPrivateFieldGet2 = function(receiver, privateMap) {
          if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
          }
          return privateMap.get(receiver);
        };
        __classPrivateFieldSet2 = function(receiver, privateMap, value) {
          if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
          }
          privateMap.set(receiver, value);
          return value;
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
       * clipboard.js v2.0.8
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
            134: function(__unused_webpack_module, __webpack_exports__, __webpack_require__2) {
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
              var ClipboardAction = /* @__PURE__ */ function() {
                function ClipboardAction2(options) {
                  _classCallCheck(this, ClipboardAction2);
                  this.resolveOptions(options);
                  this.initSelection();
                }
                _createClass(ClipboardAction2, [{
                  key: "resolveOptions",
                  value: function resolveOptions() {
                    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                    this.action = options.action;
                    this.container = options.container;
                    this.emitter = options.emitter;
                    this.target = options.target;
                    this.text = options.text;
                    this.trigger = options.trigger;
                    this.selectedText = "";
                  }
                }, {
                  key: "initSelection",
                  value: function initSelection() {
                    if (this.text) {
                      this.selectFake();
                    } else if (this.target) {
                      this.selectTarget();
                    }
                  }
                }, {
                  key: "createFakeElement",
                  value: function createFakeElement() {
                    var isRTL = document.documentElement.getAttribute("dir") === "rtl";
                    this.fakeElem = document.createElement("textarea");
                    this.fakeElem.style.fontSize = "12pt";
                    this.fakeElem.style.border = "0";
                    this.fakeElem.style.padding = "0";
                    this.fakeElem.style.margin = "0";
                    this.fakeElem.style.position = "absolute";
                    this.fakeElem.style[isRTL ? "right" : "left"] = "-9999px";
                    var yPosition = window.pageYOffset || document.documentElement.scrollTop;
                    this.fakeElem.style.top = "".concat(yPosition, "px");
                    this.fakeElem.setAttribute("readonly", "");
                    this.fakeElem.value = this.text;
                    return this.fakeElem;
                  }
                }, {
                  key: "selectFake",
                  value: function selectFake() {
                    var _this = this;
                    var fakeElem = this.createFakeElement();
                    this.fakeHandlerCallback = function() {
                      return _this.removeFake();
                    };
                    this.fakeHandler = this.container.addEventListener("click", this.fakeHandlerCallback) || true;
                    this.container.appendChild(fakeElem);
                    this.selectedText = select_default()(fakeElem);
                    this.copyText();
                    this.removeFake();
                  }
                }, {
                  key: "removeFake",
                  value: function removeFake() {
                    if (this.fakeHandler) {
                      this.container.removeEventListener("click", this.fakeHandlerCallback);
                      this.fakeHandler = null;
                      this.fakeHandlerCallback = null;
                    }
                    if (this.fakeElem) {
                      this.container.removeChild(this.fakeElem);
                      this.fakeElem = null;
                    }
                  }
                }, {
                  key: "selectTarget",
                  value: function selectTarget() {
                    this.selectedText = select_default()(this.target);
                    this.copyText();
                  }
                }, {
                  key: "copyText",
                  value: function copyText() {
                    var succeeded;
                    try {
                      succeeded = document.execCommand(this.action);
                    } catch (err) {
                      succeeded = false;
                    }
                    this.handleResult(succeeded);
                  }
                }, {
                  key: "handleResult",
                  value: function handleResult(succeeded) {
                    this.emitter.emit(succeeded ? "success" : "error", {
                      action: this.action,
                      text: this.selectedText,
                      trigger: this.trigger,
                      clearSelection: this.clearSelection.bind(this)
                    });
                  }
                }, {
                  key: "clearSelection",
                  value: function clearSelection() {
                    if (this.trigger) {
                      this.trigger.focus();
                    }
                    document.activeElement.blur();
                    window.getSelection().removeAllRanges();
                  }
                }, {
                  key: "destroy",
                  value: function destroy() {
                    this.removeFake();
                  }
                }, {
                  key: "action",
                  set: function set() {
                    var action = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "copy";
                    this._action = action;
                    if (this._action !== "copy" && this._action !== "cut") {
                      throw new Error('Invalid "action" value, use either "copy" or "cut"');
                    }
                  },
                  get: function get() {
                    return this._action;
                  }
                }, {
                  key: "target",
                  set: function set(target) {
                    if (target !== void 0) {
                      if (target && _typeof(target) === "object" && target.nodeType === 1) {
                        if (this.action === "copy" && target.hasAttribute("disabled")) {
                          throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                        }
                        if (this.action === "cut" && (target.hasAttribute("readonly") || target.hasAttribute("disabled"))) {
                          throw new Error(`Invalid "target" attribute. You can't cut text from elements with "readonly" or "disabled" attributes`);
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
                return ClipboardAction2;
              }();
              var clipboard_action = ClipboardAction;
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
              function clipboard_classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                  throw new TypeError("Cannot call a class as a function");
                }
              }
              function clipboard_defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];
                  descriptor.enumerable = descriptor.enumerable || false;
                  descriptor.configurable = true;
                  if ("value" in descriptor)
                    descriptor.writable = true;
                  Object.defineProperty(target, descriptor.key, descriptor);
                }
              }
              function clipboard_createClass(Constructor, protoProps, staticProps) {
                if (protoProps)
                  clipboard_defineProperties(Constructor.prototype, protoProps);
                if (staticProps)
                  clipboard_defineProperties(Constructor, staticProps);
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
                  clipboard_classCallCheck(this, Clipboard2);
                  _this = _super.call(this);
                  _this.resolveOptions(options);
                  _this.listenClick(trigger);
                  return _this;
                }
                clipboard_createClass(Clipboard2, [{
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
                    if (this.clipboardAction) {
                      this.clipboardAction = null;
                    }
                    this.clipboardAction = new clipboard_action({
                      action: this.action(trigger),
                      target: this.target(trigger),
                      text: this.text(trigger),
                      container: this.container,
                      trigger,
                      emitter: this
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
                    if (this.clipboardAction) {
                      this.clipboardAction.destroy();
                      this.clipboardAction = null;
                    }
                  }
                }], [{
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
          return __webpack_require__(134);
        }().default;
      });
    }
  });

  // node_modules/escape-html/index.js
  var require_escape_html = __commonJS({
    "node_modules/escape-html/index.js"(exports, module) {
      /*!
       * escape-html
       * Copyright(c) 2012-2013 TJ Holowaychuk
       * Copyright(c) 2015 Andreas Lubbe
       * Copyright(c) 2015 Tiancheng "Timothy" Gu
       * MIT Licensed
       */
      "use strict";
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

  // src/assets/javascripts/bundle.ts
  var import_focus_visible = __toModule(require_focus_visible());

  // node_modules/rxjs/node_modules/tslib/modules/index.js
  var import_tslib = __toModule(require_tslib());
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
      this._teardowns = null;
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
        var initialTeardown = this.initialTeardown;
        if (isFunction(initialTeardown)) {
          try {
            initialTeardown();
          } catch (e) {
            errors = e instanceof UnsubscriptionError ? e.errors : [e];
          }
        }
        var _teardowns = this._teardowns;
        if (_teardowns) {
          this._teardowns = null;
          try {
            for (var _teardowns_1 = __values(_teardowns), _teardowns_1_1 = _teardowns_1.next(); !_teardowns_1_1.done; _teardowns_1_1 = _teardowns_1.next()) {
              var teardown_1 = _teardowns_1_1.value;
              try {
                execTeardown(teardown_1);
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
              if (_teardowns_1_1 && !_teardowns_1_1.done && (_b = _teardowns_1.return))
                _b.call(_teardowns_1);
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
          execTeardown(teardown);
        } else {
          if (teardown instanceof Subscription2) {
            if (teardown.closed || teardown._hasParent(this)) {
              return;
            }
            teardown._addParent(this);
          }
          (this._teardowns = (_a2 = this._teardowns) !== null && _a2 !== void 0 ? _a2 : []).push(teardown);
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
      var _teardowns = this._teardowns;
      _teardowns && arrRemove(_teardowns, teardown);
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
  function execTeardown(teardown) {
    if (isFunction(teardown)) {
      teardown();
    } else {
      teardown.unsubscribe();
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
    setTimeout: function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var delegate = timeoutProvider.delegate;
      return ((delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) || setTimeout).apply(void 0, __spreadArray([], __read(args)));
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
  var SafeSubscriber = function(_super) {
    __extends(SafeSubscriber2, _super);
    function SafeSubscriber2(observerOrNext, error, complete) {
      var _this = _super.call(this) || this;
      var next;
      if (isFunction(observerOrNext)) {
        next = observerOrNext;
      } else if (observerOrNext) {
        next = observerOrNext.next, error = observerOrNext.error, complete = observerOrNext.complete;
        var context_1;
        if (_this && config.useDeprecatedNextContext) {
          context_1 = Object.create(observerOrNext);
          context_1.unsubscribe = function() {
            return _this.unsubscribe();
          };
        } else {
          context_1 = observerOrNext;
        }
        next = next === null || next === void 0 ? void 0 : next.bind(context_1);
        error = error === null || error === void 0 ? void 0 : error.bind(context_1);
        complete = complete === null || complete === void 0 ? void 0 : complete.bind(context_1);
      }
      _this.destination = {
        next: next ? wrapForErrorHandling(next, _this) : noop,
        error: wrapForErrorHandling(error !== null && error !== void 0 ? error : defaultErrorHandler, _this),
        complete: complete ? wrapForErrorHandling(complete, _this) : noop
      };
      return _this;
    }
    return SafeSubscriber2;
  }(Subscriber);
  function wrapForErrorHandling(handler, instance) {
    return function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      try {
        handler.apply(void 0, __spreadArray([], __read(args)));
      } catch (err) {
        if (config.useDeprecatedSynchronousErrorHandling) {
          captureError(err);
        } else {
          reportUnhandledError(err);
        }
      }
    };
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
    function Observable43(subscribe) {
      if (subscribe) {
        this._subscribe = subscribe;
      }
    }
    Observable43.prototype.lift = function(operator) {
      var observable2 = new Observable43();
      observable2.source = this;
      observable2.operator = operator;
      return observable2;
    };
    Observable43.prototype.subscribe = function(observerOrNext, error, complete) {
      var _this = this;
      var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
      errorContext(function() {
        var _a2 = _this, operator = _a2.operator, source = _a2.source;
        subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
      });
      return subscriber;
    };
    Observable43.prototype._trySubscribe = function(sink) {
      try {
        return this._subscribe(sink);
      } catch (err) {
        sink.error(err);
      }
    };
    Observable43.prototype.forEach = function(next, promiseCtor) {
      var _this = this;
      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor(function(resolve, reject) {
        var subscription;
        subscription = _this.subscribe(function(value) {
          try {
            next(value);
          } catch (err) {
            reject(err);
            subscription === null || subscription === void 0 ? void 0 : subscription.unsubscribe();
          }
        }, reject, resolve);
      });
    };
    Observable43.prototype._subscribe = function(subscriber) {
      var _a2;
      return (_a2 = this.source) === null || _a2 === void 0 ? void 0 : _a2.subscribe(subscriber);
    };
    Observable43.prototype[observable] = function() {
      return this;
    };
    Observable43.prototype.pipe = function() {
      var operations = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        operations[_i] = arguments[_i];
      }
      return pipeFromArray(operations)(this);
    };
    Observable43.prototype.toPromise = function(promiseCtor) {
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
    Observable43.create = function(subscribe) {
      return new Observable43(subscribe);
    };
    return Observable43;
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
  var OperatorSubscriber = function(_super) {
    __extends(OperatorSubscriber2, _super);
    function OperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize) {
      var _this = _super.call(this, destination) || this;
      _this.onFinalize = onFinalize;
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
      var closed = this.closed;
      _super.prototype.unsubscribe.call(this);
      !closed && ((_a2 = this.onFinalize) === null || _a2 === void 0 ? void 0 : _a2.call(this));
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
    __extends(Subject6, _super);
    function Subject6() {
      var _this = _super.call(this) || this;
      _this.closed = false;
      _this.observers = [];
      _this.isStopped = false;
      _this.hasError = false;
      _this.thrownError = null;
      return _this;
    }
    Subject6.prototype.lift = function(operator) {
      var subject = new AnonymousSubject(this, this);
      subject.operator = operator;
      return subject;
    };
    Subject6.prototype._throwIfClosed = function() {
      if (this.closed) {
        throw new ObjectUnsubscribedError();
      }
    };
    Subject6.prototype.next = function(value) {
      var _this = this;
      errorContext(function() {
        var e_1, _a2;
        _this._throwIfClosed();
        if (!_this.isStopped) {
          var copy = _this.observers.slice();
          try {
            for (var copy_1 = __values(copy), copy_1_1 = copy_1.next(); !copy_1_1.done; copy_1_1 = copy_1.next()) {
              var observer = copy_1_1.value;
              observer.next(value);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (copy_1_1 && !copy_1_1.done && (_a2 = copy_1.return))
                _a2.call(copy_1);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
        }
      });
    };
    Subject6.prototype.error = function(err) {
      var _this = this;
      errorContext(function() {
        _this._throwIfClosed();
        if (!_this.isStopped) {
          _this.hasError = _this.isStopped = true;
          _this.thrownError = err;
          var observers = _this.observers;
          while (observers.length) {
            observers.shift().error(err);
          }
        }
      });
    };
    Subject6.prototype.complete = function() {
      var _this = this;
      errorContext(function() {
        _this._throwIfClosed();
        if (!_this.isStopped) {
          _this.isStopped = true;
          var observers = _this.observers;
          while (observers.length) {
            observers.shift().complete();
          }
        }
      });
    };
    Subject6.prototype.unsubscribe = function() {
      this.isStopped = this.closed = true;
      this.observers = null;
    };
    Object.defineProperty(Subject6.prototype, "observed", {
      get: function() {
        var _a2;
        return ((_a2 = this.observers) === null || _a2 === void 0 ? void 0 : _a2.length) > 0;
      },
      enumerable: false,
      configurable: true
    });
    Subject6.prototype._trySubscribe = function(subscriber) {
      this._throwIfClosed();
      return _super.prototype._trySubscribe.call(this, subscriber);
    };
    Subject6.prototype._subscribe = function(subscriber) {
      this._throwIfClosed();
      this._checkFinalizedStatuses(subscriber);
      return this._innerSubscribe(subscriber);
    };
    Subject6.prototype._innerSubscribe = function(subscriber) {
      var _a2 = this, hasError = _a2.hasError, isStopped = _a2.isStopped, observers = _a2.observers;
      return hasError || isStopped ? EMPTY_SUBSCRIPTION : (observers.push(subscriber), new Subscription(function() {
        return arrRemove(observers, subscriber);
      }));
    };
    Subject6.prototype._checkFinalizedStatuses = function(subscriber) {
      var _a2 = this, hasError = _a2.hasError, thrownError = _a2.thrownError, isStopped = _a2.isStopped;
      if (hasError) {
        subscriber.error(thrownError);
      } else if (isStopped) {
        subscriber.complete();
      }
    };
    Subject6.prototype.asObservable = function() {
      var observable2 = new Observable();
      observable2.source = this;
      return observable2;
    };
    Subject6.create = function(destination, source) {
      return new AnonymousSubject(destination, source);
    };
    return Subject6;
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
    setInterval: function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var delegate = intervalProvider.delegate;
      return ((delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) || setInterval).apply(void 0, __spreadArray([], __read(args)));
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
      this.id = this.id || this.requestAsyncId(scheduler, this.id, delay2);
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
      intervalProvider.clearInterval(id);
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
      _this._scheduled = void 0;
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
      if (delay2 === void 0) {
        delay2 = 0;
      }
      if (delay2 != null && delay2 > 0 || delay2 == null && this.delay > 0) {
        return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay2);
      }
      if (scheduler.actions.length === 0) {
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
      this._scheduled = void 0;
      var actions = this.actions;
      var error;
      var index2 = -1;
      action = action || actions.shift();
      var count = actions.length;
      do {
        if (error = action.execute(action.state, action.delay)) {
          break;
        }
      } while (++index2 < count && (action = actions.shift()));
      this._active = false;
      if (error) {
        while (++index2 < count && (action = actions.shift())) {
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
      source.subscribe(new OperatorSubscriber(subscriber, function(value) {
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

  // node_modules/rxjs/dist/esm5/internal/util/isDate.js
  function isValidDate(value) {
    return value instanceof Date && !isNaN(value);
  }

  // node_modules/rxjs/dist/esm5/internal/operators/map.js
  function map(project, thisArg) {
    return operate(function(source, subscriber) {
      var index2 = 0;
      source.subscribe(new OperatorSubscriber(subscriber, function(value) {
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
            source.subscribe(new OperatorSubscriber(subscriber, function(value) {
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
  function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalTeardown) {
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
      innerFrom(project(value, index2++)).subscribe(new OperatorSubscriber(subscriber, function(innerValue) {
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
    source.subscribe(new OperatorSubscriber(subscriber, outerNext, function() {
      isComplete = true;
      checkComplete();
    }));
    return function() {
      additionalTeardown === null || additionalTeardown === void 0 ? void 0 : additionalTeardown();
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
      source.subscribe(new OperatorSubscriber(subscriber, function(value) {
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
        innerFrom(sources[sourceIndex2]).subscribe(new OperatorSubscriber(subscriber, function(value) {
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

  // node_modules/rxjs/dist/esm5/internal/operators/bufferCount.js
  function bufferCount(bufferSize, startBufferEvery) {
    if (startBufferEvery === void 0) {
      startBufferEvery = null;
    }
    startBufferEvery = startBufferEvery !== null && startBufferEvery !== void 0 ? startBufferEvery : bufferSize;
    return operate(function(source, subscriber) {
      var buffers = [];
      var count = 0;
      source.subscribe(new OperatorSubscriber(subscriber, function(value) {
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
      innerSub = source.subscribe(new OperatorSubscriber(subscriber, void 0, void 0, function(err) {
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
      source.subscribe(new OperatorSubscriber(subscriber, function(value) {
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
      source.subscribe(new OperatorSubscriber(subscriber, function(value) {
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
      source.subscribe(new OperatorSubscriber(subscriber, function(value) {
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
      source.subscribe(new OperatorSubscriber(subscriber, function(value) {
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
      source.subscribe(new OperatorSubscriber(subscriber, noop));
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
      source.subscribe(new OperatorSubscriber(subscriber, function(value) {
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
      source.subscribe(new OperatorSubscriber(subscriber, function(value) {
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

  // node_modules/rxjs/dist/esm5/internal/operators/sample.js
  function sample(notifier) {
    return operate(function(source, subscriber) {
      var hasValue = false;
      var lastValue = null;
      source.subscribe(new OperatorSubscriber(subscriber, function(value) {
        hasValue = true;
        lastValue = value;
      }));
      var emit = function() {
        if (hasValue) {
          hasValue = false;
          var value = lastValue;
          lastValue = null;
          subscriber.next(value);
        }
      };
      notifier.subscribe(new OperatorSubscriber(subscriber, emit, noop));
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
      var connection = null;
      var resetConnection = null;
      var subject = null;
      var refCount = 0;
      var hasCompleted = false;
      var hasErrored = false;
      var cancelReset = function() {
        resetConnection === null || resetConnection === void 0 ? void 0 : resetConnection.unsubscribe();
        resetConnection = null;
      };
      var reset = function() {
        cancelReset();
        connection = subject = null;
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
        if (!connection) {
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
          from(source).subscribe(connection);
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
      return null;
    }
    if (on === false) {
      return null;
    }
    return on.apply(void 0, __spreadArray([], __read(args))).pipe(take(1)).subscribe(function() {
      return reset();
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/shareReplay.js
  function shareReplay(configOrBufferSize, windowTime, scheduler) {
    var _a2, _b;
    var bufferSize;
    var refCount = false;
    if (configOrBufferSize && typeof configOrBufferSize === "object") {
      bufferSize = (_a2 = configOrBufferSize.bufferSize) !== null && _a2 !== void 0 ? _a2 : Infinity;
      windowTime = (_b = configOrBufferSize.windowTime) !== null && _b !== void 0 ? _b : Infinity;
      refCount = !!configOrBufferSize.refCount;
      scheduler = configOrBufferSize.scheduler;
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
      var skipSubscriber = new OperatorSubscriber(subscriber, function() {
        skipSubscriber === null || skipSubscriber === void 0 ? void 0 : skipSubscriber.unsubscribe();
        taking = true;
      }, noop);
      innerFrom(notifier).subscribe(skipSubscriber);
      source.subscribe(new OperatorSubscriber(subscriber, function(value) {
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
      source.subscribe(new OperatorSubscriber(subscriber, function(value) {
        innerSubscriber === null || innerSubscriber === void 0 ? void 0 : innerSubscriber.unsubscribe();
        var innerIndex = 0;
        var outerIndex = index2++;
        innerFrom(project(value, outerIndex)).subscribe(innerSubscriber = new OperatorSubscriber(subscriber, function(innerValue) {
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

  // node_modules/rxjs/dist/esm5/internal/operators/switchMapTo.js
  function switchMapTo(innerObservable, resultSelector) {
    return isFunction(resultSelector) ? switchMap(function() {
      return innerObservable;
    }, resultSelector) : switchMap(function() {
      return innerObservable;
    });
  }

  // node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js
  function takeUntil(notifier) {
    return operate(function(source, subscriber) {
      innerFrom(notifier).subscribe(new OperatorSubscriber(subscriber, function() {
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
      source.subscribe(new OperatorSubscriber(subscriber, function(value) {
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
      source.subscribe(new OperatorSubscriber(subscriber, function(value) {
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
  function throttle(durationSelector, _a2) {
    var _b = _a2 === void 0 ? defaultThrottleConfig : _a2, leading = _b.leading, trailing = _b.trailing;
    return operate(function(source, subscriber) {
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
        return throttled = innerFrom(durationSelector(value)).subscribe(new OperatorSubscriber(subscriber, endThrottling, cleanupThrottling));
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
      source.subscribe(new OperatorSubscriber(subscriber, function(value) {
        hasValue = true;
        sendValue = value;
        !(throttled && !throttled.closed) && (leading ? send() : startThrottle(value));
      }, function() {
        isComplete = true;
        !(trailing && hasValue && throttled && !throttled.closed) && subscriber.complete();
      }));
    });
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
        innerFrom(inputs[i2]).subscribe(new OperatorSubscriber(subscriber, function(value) {
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
      source.subscribe(new OperatorSubscriber(subscriber, function(value) {
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
      throw new ReferenceError(`Missing element: expected "${selector}" to be present`);
    return el;
  }
  function getOptionalElement(selector, node = document) {
    return node.querySelector(selector) || void 0;
  }
  function getActiveElement() {
    return document.activeElement instanceof HTMLElement ? document.activeElement || void 0 : void 0;
  }

  // src/assets/javascripts/browser/element/focus/index.ts
  function setElementFocus(el, value = true) {
    if (value)
      el.focus();
    else
      el.blur();
  }
  function watchElementFocus(el) {
    return merge(fromEvent(el, "focus"), fromEvent(el, "blur")).pipe(map(({ type }) => type === "focus"), startWith(el === getActiveElement()));
  }

  // src/assets/javascripts/browser/element/offset/_/index.ts
  function getElementOffset(el) {
    return {
      x: el.offsetLeft,
      y: el.offsetTop
    };
  }
  function watchElementOffset(el) {
    return fromEvent(window, "resize").pipe(map(() => getElementOffset(el)), startWith(getElementOffset(el)));
  }

  // src/assets/javascripts/browser/element/offset/content/index.ts
  function getElementContentOffset(el) {
    return {
      x: el.scrollLeft,
      y: el.scrollTop
    };
  }
  function watchElementContentOffset(el) {
    return merge(fromEvent(el, "scroll"), fromEvent(window, "resize")).pipe(map(() => getElementContentOffset(el)), startWith(getElementContentOffset(el)));
  }

  // src/assets/javascripts/browser/element/selection/index.ts
  function setElementSelection(el) {
    if (el instanceof HTMLInputElement)
      el.select();
    else
      throw new Error("Not implemented");
  }

  // src/assets/javascripts/browser/element/size/_/index.ts
  var entry$ = new Subject();
  var observer$ = defer(() => of(new ResizeObserver((entries) => {
    for (const entry of entries)
      entry$.next(entry);
  }))).pipe(switchMap((observer) => NEVER.pipe(startWith(observer)).pipe(finalize(() => observer.disconnect()))), shareReplay(1));
  function getElementSize(el) {
    return {
      width: el.offsetWidth,
      height: el.offsetHeight
    };
  }
  function watchElementSize(el) {
    return observer$.pipe(tap((observer) => observer.observe(el)), switchMap((observer) => entry$.pipe(filter(({ target }) => target === el), finalize(() => observer.unobserve(el)), map(() => getElementSize(el)))), startWith(getElementSize(el)));
  }

  // src/assets/javascripts/browser/element/size/content/index.ts
  function getElementContentSize(el) {
    return {
      width: el.scrollWidth,
      height: el.scrollHeight
    };
  }

  // src/assets/javascripts/browser/element/visibility/index.ts
  var entry$2 = new Subject();
  var observer$2 = defer(() => of(new IntersectionObserver((entries) => {
    for (const entry of entries)
      entry$2.next(entry);
  }, {
    threshold: 1
  }))).pipe(switchMap((observer) => NEVER.pipe(startWith(observer)).pipe(finalize(() => observer.disconnect()))), shareReplay(1));
  function watchElementBoundary(el, threshold = 16) {
    return watchElementContentOffset(el).pipe(map(({ y }) => {
      const visible = getElementSize(el);
      const content = getElementContentSize(el);
      return y >= content.height - visible.height - threshold;
    }), distinctUntilChanged());
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
    return fromEvent(el, "change").pipe(map(() => el.checked), startWith(el.checked));
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
    return fromEvent(window, "keydown").pipe(filter((ev) => !(ev.metaKey || ev.ctrlKey)), map((ev) => ({
      mode: getToggle("search") ? "search" : "global",
      type: ev.key,
      claim() {
        ev.preventDefault();
        ev.stopPropagation();
      }
    })), filter(({ mode, type }) => {
      if (mode === "global") {
        const active = getActiveElement();
        if (typeof active !== "undefined")
          return !isSusceptibleToKeyboard(active, type);
      }
      return true;
    }), share());
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
    if (attributes) {
      for (const attr of Object.keys(attributes))
        if (typeof attributes[attr] !== "boolean")
          el.setAttribute(attr, attributes[attr]);
        else if (attributes[attr])
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
    return fromEvent(window, "hashchange").pipe(map(getLocationHash), startWith(getLocationHash()), filter((hash) => hash.length > 0), shareReplay(1));
  }
  function watchLocationTarget() {
    return watchLocationHash().pipe(map((id) => getOptionalElement(`[id="${id}"]`)), filter((el) => typeof el !== "undefined"));
  }

  // src/assets/javascripts/browser/media/index.ts
  function watchMedia(query) {
    const media = matchMedia(query);
    return fromEventPattern((next) => media.addListener(() => next(media.matches))).pipe(startWith(media.matches));
  }
  function watchPrint() {
    return merge(fromEvent(window, "beforeprint").pipe(mapTo(true)), fromEvent(window, "afterprint").pipe(mapTo(false)));
  }
  function at(query$, factory) {
    return query$.pipe(switchMap((active) => active ? factory() : NEVER));
  }

  // src/assets/javascripts/browser/request/index.ts
  function request(url, options = { credentials: "same-origin" }) {
    return from(fetch(`${url}`, options)).pipe(filter((res) => res.status === 200), catchError(() => EMPTY));
  }
  function requestJSON(url, options) {
    return request(url, options).pipe(switchMap((res) => res.json()), shareReplay(1));
  }
  function requestXML(url, options) {
    const dom = new DOMParser();
    return request(url, options).pipe(switchMap((res) => res.text()), map((res) => dom.parseFromString(res, "text/xml")), shareReplay(1));
  }

  // src/assets/javascripts/browser/viewport/offset/index.ts
  function getViewportOffset() {
    return {
      x: Math.max(0, scrollX),
      y: Math.max(0, scrollY)
    };
  }
  function setViewportOffset({ x, y }) {
    window.scrollTo(x || 0, y || 0);
  }
  function watchViewportOffset() {
    return merge(fromEvent(window, "scroll", { passive: true }), fromEvent(window, "resize", { passive: true })).pipe(map(getViewportOffset), startWith(getViewportOffset()));
  }

  // src/assets/javascripts/browser/viewport/size/index.ts
  function getViewportSize() {
    return {
      width: innerWidth,
      height: innerHeight
    };
  }
  function watchViewportSize() {
    return fromEvent(window, "resize", { passive: true }).pipe(map(getViewportSize), startWith(getViewportSize()));
  }

  // src/assets/javascripts/browser/viewport/_/index.ts
  function watchViewport() {
    return combineLatest([
      watchViewportOffset(),
      watchViewportSize()
    ]).pipe(map(([offset, size]) => ({ offset, size })), shareReplay(1));
  }
  function watchViewportAt(el, { viewport$: viewport$2, header$: header$2 }) {
    const size$ = viewport$2.pipe(distinctUntilKeyChanged("size"));
    const offset$ = combineLatest([size$, header$2]).pipe(map(() => getElementOffset(el)));
    return combineLatest([header$2, viewport$2, offset$]).pipe(map(([{ height }, { offset, size }, { x, y }]) => ({
      offset: {
        x: offset.x - x,
        y: offset.y - y + height
      },
      size
    })));
  }

  // src/assets/javascripts/browser/worker/index.ts
  function watchWorker(worker, { tx$ }) {
    const rx$ = fromEvent(worker, "message").pipe(map(({ data }) => data));
    return tx$.pipe(throttle(() => rx$, { leading: true, trailing: true }), tap((message) => worker.postMessage(message)), switchMapTo(rx$), share());
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

  // src/assets/javascripts/components/content/code/index.ts
  var import_clipboard = __toModule(require_clipboard());

  // src/assets/javascripts/actions/_/index.ts
  function setFocusable(el, value = 0) {
    el.setAttribute("tabindex", value.toString());
  }
  function resetFocusable(el) {
    el.removeAttribute("tabindex");
  }
  function setScrollLock(el, value) {
    el.setAttribute("data-md-state", "lock");
    el.style.top = `-${value}px`;
  }
  function resetScrollLock(el) {
    const value = -1 * parseInt(el.style.top, 10);
    el.removeAttribute("data-md-state");
    el.style.top = "";
    if (value)
      window.scrollTo(0, value);
  }

  // src/assets/javascripts/actions/anchor/index.ts
  function setAnchorState(el, state) {
    el.setAttribute("data-md-state", state);
  }
  function resetAnchorState(el) {
    el.removeAttribute("data-md-state");
  }
  function setAnchorActive(el, value) {
    el.classList.toggle("md-nav__link--active", value);
  }
  function resetAnchorActive(el) {
    el.classList.remove("md-nav__link--active");
  }

  // src/assets/javascripts/actions/dialog/index.ts
  function setDialogMessage(el, value) {
    el.firstElementChild.innerHTML = value;
  }
  function setDialogState(el, state) {
    el.setAttribute("data-md-state", state);
  }
  function resetDialogState(el) {
    el.removeAttribute("data-md-state");
  }

  // src/assets/javascripts/actions/header/_/index.ts
  function setHeaderState(el, state) {
    el.setAttribute("data-md-state", state);
  }
  function resetHeaderState(el) {
    el.removeAttribute("data-md-state");
  }

  // src/assets/javascripts/actions/header/title/index.ts
  function setHeaderTitleState(el, state) {
    el.setAttribute("data-md-state", state);
  }
  function resetHeaderTitleState(el) {
    el.removeAttribute("data-md-state");
  }

  // src/assets/javascripts/actions/search/query/index.ts
  function setSearchQueryPlaceholder(el, value) {
    el.placeholder = value;
  }
  function resetSearchQueryPlaceholder(el) {
    el.placeholder = translation("search.placeholder");
  }

  // src/assets/javascripts/actions/search/result/index.ts
  function setSearchResultMeta(el, value) {
    switch (value) {
      case 0:
        el.textContent = translation("search.result.none");
        break;
      case 1:
        el.textContent = translation("search.result.one");
        break;
      default:
        el.textContent = translation("search.result.other", round(value));
    }
  }
  function resetSearchResultMeta(el) {
    el.textContent = translation("search.result.placeholder");
  }
  function addToSearchResultList(el, child) {
    el.appendChild(child);
  }
  function resetSearchResultList(el) {
    el.innerHTML = "";
  }

  // src/assets/javascripts/actions/sidebar/index.ts
  function setSidebarOffset(el, value) {
    el.style.top = `${value}px`;
  }
  function resetSidebarOffset(el) {
    el.style.top = "";
  }
  function setSidebarHeight(el, value) {
    const scrollwrap = el.firstElementChild;
    scrollwrap.style.height = `${value - 2 * scrollwrap.offsetTop}px`;
  }
  function resetSidebarHeight(el) {
    const scrollwrap = el.firstElementChild;
    scrollwrap.style.height = "";
  }

  // src/assets/javascripts/actions/source/index.ts
  function setSourceFacts(el, child) {
    el.lastElementChild.appendChild(child);
  }
  function setSourceState(el, state) {
    el.lastElementChild.setAttribute("data-md-state", state);
  }

  // src/assets/javascripts/actions/tabs/index.ts
  function setTabsState(el, state) {
    el.setAttribute("data-md-state", state);
  }
  function resetTabsState(el) {
    el.removeAttribute("data-md-state");
  }

  // src/assets/javascripts/actions/top/index.ts
  function setBackToTopState(el, state) {
    el.setAttribute("data-md-state", state);
  }
  function resetBackToTopState(el) {
    el.removeAttribute("data-md-state");
  }
  function setBackToTopOffset(el, value) {
    el.style.top = `${value}px`;
  }
  function resetBackToTopOffset(el) {
    el.style.top = "";
  }

  // src/assets/javascripts/templates/clipboard/index.tsx
  function renderClipboardButton(id) {
    return /* @__PURE__ */ h("button", {
      class: "md-clipboard md-icon",
      title: translation("clipboard.copy"),
      "data-clipboard-target": `#${id} > code`
    });
  }

  // src/assets/javascripts/templates/code/index.tsx
  function renderAnnotation(id, content) {
    return /* @__PURE__ */ h("aside", {
      class: "md-annotation",
      "data-index": id,
      tabIndex: 0
    }, /* @__PURE__ */ h("div", {
      class: "md-annotation__inner md-tooltip"
    }, /* @__PURE__ */ h("div", {
      class: "md-tooltip__inner md-typeset"
    }, Array.from(content))), /* @__PURE__ */ h("span", {
      class: "md-annotation__index"
    }, id));
  }

  // src/assets/javascripts/templates/search/index.tsx
  var Flag;
  (function(Flag2) {
    Flag2[Flag2["TEASER"] = 1] = "TEASER";
    Flag2[Flag2["PARENT"] = 2] = "PARENT";
  })(Flag || (Flag = {}));
  function renderSearchDocument(document2, flag) {
    const parent = flag & 2;
    const teaser = flag & 1;
    const missing = Object.keys(document2.terms).filter((key) => !document2.terms[key]).map((key) => [/* @__PURE__ */ h("del", null, key), " "]).flat().slice(0, -1);
    const url = new URL(document2.location);
    if (feature("search.highlight"))
      url.searchParams.set("h", Object.entries(document2.terms).filter(([, match]) => match).reduce((highlight, [value]) => `${highlight} ${value}`.trim(), ""));
    return /* @__PURE__ */ h("a", {
      href: `${url}`,
      class: "md-search-result__link",
      tabIndex: -1
    }, /* @__PURE__ */ h("article", {
      class: [
        "md-search-result__article",
        ...parent ? ["md-search-result__article--document"] : []
      ].join(" "),
      "data-md-score": document2.score.toFixed(2)
    }, parent > 0 && /* @__PURE__ */ h("div", {
      class: "md-search-result__icon md-icon"
    }), /* @__PURE__ */ h("h1", {
      class: "md-search-result__title"
    }, document2.title), teaser > 0 && document2.text.length > 0 && /* @__PURE__ */ h("p", {
      class: "md-search-result__teaser"
    }, truncate(document2.text, 320)), teaser > 0 && missing.length > 0 && /* @__PURE__ */ h("p", {
      class: "md-search-result__terms"
    }, translation("search.result.term.missing"), ": ", missing)));
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
      renderSearchDocument(article, 2 | +(!parent && index2 === 0)),
      ...best.map((section) => renderSearchDocument(section, 1)),
      ...more.length ? [
        /* @__PURE__ */ h("details", {
          class: "md-search-result__more"
        }, /* @__PURE__ */ h("summary", {
          tabIndex: -1
        }, more.length > 0 && more.length === 1 ? translation("search.result.more.one") : translation("search.result.more.other", more.length)), more.map((section) => renderSearchDocument(section, 1)))
      ] : []
    ];
    return /* @__PURE__ */ h("li", {
      class: "md-search-result__item"
    }, children);
  }

  // src/assets/javascripts/templates/source/index.tsx
  function renderSourceFacts(facts) {
    return /* @__PURE__ */ h("ul", {
      class: "md-source__facts"
    }, Object.entries(facts).map(([key, value]) => /* @__PURE__ */ h("li", {
      class: `md-source__fact md-source__fact--${key}`
    }, typeof value === "number" ? round(value) : value)));
  }

  // src/assets/javascripts/templates/table/index.tsx
  function renderTable(table) {
    return /* @__PURE__ */ h("div", {
      class: "md-typeset__scrollwrap"
    }, /* @__PURE__ */ h("div", {
      class: "md-typeset__table"
    }, table));
  }

  // src/assets/javascripts/templates/version/index.tsx
  function renderVersion(version) {
    const config4 = configuration();
    const url = new URL(`../${version.version}/`, config4.base);
    return /* @__PURE__ */ h("li", {
      class: "md-version__item"
    }, /* @__PURE__ */ h("a", {
      href: url.toString(),
      class: "md-version__link"
    }, version.title));
  }
  function renderVersionSelector(versions, active) {
    return /* @__PURE__ */ h("div", {
      class: "md-version"
    }, /* @__PURE__ */ h("button", {
      class: "md-version__current",
      "aria-label": translation("select.version.title")
    }, active.title), /* @__PURE__ */ h("ul", {
      class: "md-version__list"
    }, versions.map(renderVersion)));
  }

  // src/assets/javascripts/components/content/code/index.ts
  var index = 0;
  function findAnnotationsList(el) {
    if (el.nextElementSibling) {
      const sibling = el.nextElementSibling;
      if (sibling.tagName === "OL")
        return sibling;
      else if (sibling.tagName === "P" && !sibling.children.length)
        return findAnnotationsList(sibling);
    }
    return void 0;
  }
  function watchCodeBlock(el, { viewport$: viewport$2, print$: print$2 }) {
    const reveal$ = defer(() => {
      const container = el.closest("[data-tabs]");
      if (container instanceof HTMLElement) {
        return merge(...getElements(":scope > input", container).map((input) => fromEvent(input, "change")));
      }
      return NEVER;
    });
    const scroll$ = viewport$2.pipe(distinctUntilKeyChanged("size"), mergeWith(reveal$), map(() => {
      const visible = getElementSize(el);
      const content = getElementContentSize(el);
      return content.width > visible.width;
    }), distinctUntilChanged());
    const offset$ = watchElementContentOffset(el);
    const finish$ = offset$.pipe(debounceTime(125), mapTo(false));
    const hidden$ = merge(finish$, offset$.pipe(throttle(() => finish$), mapTo(true)));
    hidden$.subscribe((hidden) => {
      if (hidden) {
        console.log("scrolling...");
      } else {
        console.log("scrolling done");
        el.removeAttribute("data-md-state");
      }
    });
    const annotations$ = defer(() => {
      const annotations = [];
      const container = el.closest(".highlighttable") || el.closest(".highlight");
      if (!(container instanceof HTMLElement))
        return NEVER;
      if (container instanceof HTMLElement) {
        const list = findAnnotationsList(container);
        if (typeof list !== "undefined" && (container.classList.contains("annotate") || feature("content.code.annotate"))) {
          const items = getElements(":scope > li", list);
          for (const comment of getElements(".c, .c1, .cm", el)) {
            let match;
            let text = comment.firstChild;
            do {
              match = /\((\d+)\)/.exec(text.textContent);
              if (match && match.index) {
                const bubble = text.splitText(match.index);
                text = bubble.splitText(match[0].length);
                const [, j = -1] = match;
                const content = items[+j - 1];
                if (typeof content !== "undefined") {
                  const annotation = renderAnnotation(+j, content.childNodes);
                  bubble.replaceWith(annotation);
                  annotations.push(annotation);
                }
              }
            } while (match);
          }
        }
      }
      for (const annotation of annotations) {
        const size = getElementSize(annotation);
        offset$.pipe(withLatestFrom(watchElementOffset(annotation)), map(([scroll, offset]) => {
          annotation.style.setProperty("--md-tooltip-x", `${offset.x - scroll.x}px`);
          annotation.style.setProperty("--md-tooltip-y", `${offset.y - scroll.y}px`);
        })).subscribe();
      }
      return of(annotations);
    });
    return viewport$2.pipe(distinctUntilKeyChanged("size"), mergeWith(reveal$), switchMapTo(annotations$), map((annotations) => {
      const visible = getElementSize(el);
      const content = getElementContentSize(el);
      return __spreadValues({
        scroll: content.width > visible.width
      }, annotations.length && { annotations });
    }), distinctUntilKeyChanged("scroll"));
  }
  function mountCodeBlock(el, _a2) {
    var _b = _a2, { hover$: hover$2 } = _b, options = __objRest(_b, ["hover$"]);
    const internal$ = new Subject();
    internal$.pipe(withLatestFrom(hover$2)).subscribe(([{ scrollable: scroll }, hover]) => {
      if (scroll && hover)
        setFocusable(el);
      else
        resetFocusable(el);
    });
    if (import_clipboard.default.isSupported()) {
      const parent = el.closest("pre");
      parent.id = `__code_${++index}`;
      parent.insertBefore(renderClipboardButton(parent.id), el);
    }
    return watchCodeBlock(el, options).pipe(tap((state) => internal$.next(state)), finalize(() => internal$.complete()), map((state) => __spreadValues({ ref: el }, state)));
  }

  // src/assets/javascripts/components/content/details/index.ts
  function watchDetails(el, { target$: target$2, print$: print$2 }) {
    let open = false;
    return merge(target$2.pipe(map((target) => target.closest("details:not([open])")), filter((details) => el === details), mapTo({ action: "open", scroll: true })), print$2.pipe(filter((active) => active || !open), tap(() => open = el.open), map((active) => ({
      action: active ? "open" : "close"
    }))));
  }
  function mountDetails(el, options) {
    const internal$ = new Subject();
    internal$.subscribe(({ action, scroll }) => {
      if (action === "open")
        el.setAttribute("open", "");
      else
        el.removeAttribute("open");
      if (scroll)
        el.scrollIntoView();
    });
    return watchDetails(el, options).pipe(tap((state) => internal$.next(state)), finalize(() => internal$.complete()), map((state) => __spreadValues({ ref: el }, state)));
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
    return merge(...getElements(":scope > input", el).map((input) => fromEvent(input, "change").pipe(mapTo(input.id)))).pipe(map((id) => ({
      active: getElement(`label[for=${id}]`)
    })));
  }
  function mountContentTabs(el) {
    const internal$ = new Subject();
    internal$.subscribe(({ active }) => {
      const container = active.parentElement;
      if (active.offsetLeft + active.offsetWidth > container.scrollLeft + container.offsetWidth || active.offsetLeft < container.scrollLeft)
        container.scrollTo({
          behavior: "smooth",
          left: active.offsetLeft
        });
    });
    return watchContentTabs(el).pipe(tap((state) => internal$.next(state)), finalize(() => internal$.complete()), map((state) => __spreadValues({ ref: el }, state)));
  }

  // src/assets/javascripts/components/content/_/index.ts
  function mountContent(el, { target$: target$2, viewport$: viewport$2, hover$: hover$2, print$: print$2 }) {
    return merge(...getElements("pre > code", el).map((child) => mountCodeBlock(child, { viewport$: viewport$2, hover$: hover$2, print$: print$2 })), ...getElements("table:not([class])", el).map((child) => mountDataTable(child)), ...getElements("details", el).map((child) => mountDetails(child, { target$: target$2, print$: print$2 })), ...getElements("[data-tabs]", el).map((child) => mountContentTabs(child)));
  }

  // src/assets/javascripts/components/dialog/index.ts
  function watchDialog(_el, { alert$: alert$2 }) {
    return alert$2.pipe(switchMap((message) => merge(of(true), of(false).pipe(delay(2e3))).pipe(map((open) => ({ message, open })))));
  }
  function mountDialog(el, options) {
    const internal$ = new Subject();
    internal$.pipe(observeOn(animationFrameScheduler)).subscribe(({ message, open }) => {
      setDialogMessage(el, message);
      if (open)
        setDialogState(el, "open");
      else
        resetDialogState(el);
    });
    return watchDialog(el, options).pipe(tap((state) => internal$.next(state)), finalize(() => internal$.complete()), map((state) => __spreadValues({ ref: el }, state)));
  }

  // src/assets/javascripts/components/header/_/index.ts
  function isHidden({ viewport$: viewport$2 }) {
    if (!feature("header.autohide"))
      return of(false);
    const direction$ = viewport$2.pipe(map(({ offset: { y } }) => y), bufferCount(2, 1), map(([a, b]) => [a < b, b]), distinctUntilKeyChanged(0));
    const hidden$ = combineLatest([viewport$2, direction$]).pipe(filter(([{ offset }, [, y]]) => Math.abs(y - offset.y) > 100), map(([, [direction]]) => direction), distinctUntilChanged());
    const search$ = watchToggle("search");
    return combineLatest([viewport$2, search$]).pipe(map(([{ offset }, search]) => offset.y > 400 && !search), distinctUntilChanged(), switchMap((active) => active ? hidden$ : of(false)), startWith(false));
  }
  function watchHeader(el, options) {
    return defer(() => {
      const styles = getComputedStyle(el);
      return of(styles.position === "sticky" || styles.position === "-webkit-sticky");
    }).pipe(combineLatestWith(watchElementSize(el), isHidden(options)), map(([sticky, { height }, hidden]) => ({
      height: sticky ? height : 0,
      sticky,
      hidden
    })), distinctUntilChanged((a, b) => a.sticky === b.sticky && a.height === b.height && a.hidden === b.hidden), shareReplay(1));
  }
  function mountHeader(el, { header$: header$2, main$: main$2 }) {
    const internal$ = new Subject();
    internal$.pipe(distinctUntilKeyChanged("active"), combineLatestWith(header$2), observeOn(animationFrameScheduler)).subscribe(([{ active }, { hidden }]) => {
      if (active)
        setHeaderState(el, hidden ? "hidden" : "shadow");
      else
        resetHeaderState(el);
    });
    main$2.subscribe((main) => internal$.next(main));
    return header$2.pipe(map((state) => __spreadValues({ ref: el }, state)));
  }

  // src/assets/javascripts/components/header/title/index.ts
  function watchHeaderTitle(el, { viewport$: viewport$2, header$: header$2 }) {
    return watchViewportAt(el, { header$: header$2, viewport$: viewport$2 }).pipe(map(({ offset: { y } }) => {
      const { height } = getElementSize(el);
      return {
        active: y >= height
      };
    }), distinctUntilKeyChanged("active"));
  }
  function mountHeaderTitle(el, options) {
    const internal$ = new Subject();
    internal$.pipe(observeOn(animationFrameScheduler)).subscribe(({ active }) => {
      if (active)
        setHeaderTitleState(el, "active");
      else
        resetHeaderTitleState(el);
    });
    const headline = getOptionalElement("article h1");
    if (typeof headline === "undefined")
      return NEVER;
    return watchHeaderTitle(headline, options).pipe(tap((state) => internal$.next(state)), finalize(() => internal$.complete()), map((state) => __spreadValues({ ref: el }, state)));
  }

  // src/assets/javascripts/components/main/index.ts
  function watchMain(el, { viewport$: viewport$2, header$: header$2 }) {
    const adjust$ = header$2.pipe(map(({ height }) => height), distinctUntilChanged());
    const border$ = adjust$.pipe(switchMap(() => watchElementSize(el).pipe(map(({ height }) => ({
      top: el.offsetTop,
      bottom: el.offsetTop + height
    })), distinctUntilKeyChanged("bottom"))));
    return combineLatest([adjust$, border$, viewport$2]).pipe(map(([header, { top, bottom }, { offset: { y }, size: { height } }]) => {
      height = Math.max(0, height - Math.max(0, top - y, header) - Math.max(0, height + y - bottom));
      return {
        offset: top - header,
        height,
        active: top - header <= y
      };
    }), distinctUntilChanged((a, b) => a.offset === b.offset && a.height === b.height && a.active === b.active));
  }

  // src/assets/javascripts/components/palette/index.ts
  function watchPalette(inputs) {
    const current = __md_get("__palette") || {
      index: inputs.findIndex((input) => matchMedia(input.getAttribute("data-md-color-media")).matches)
    };
    const palette$ = of(...inputs).pipe(mergeMap((input) => fromEvent(input, "change").pipe(mapTo(input))), startWith(inputs[Math.max(0, current.index)]), map((input) => ({
      index: inputs.indexOf(input),
      color: {
        scheme: input.getAttribute("data-md-color-scheme"),
        primary: input.getAttribute("data-md-color-primary"),
        accent: input.getAttribute("data-md-color-accent")
      }
    })), shareReplay(1));
    palette$.subscribe((palette) => {
      __md_set("__palette", palette);
    });
    return palette$;
  }
  function mountPalette(el) {
    const internal$ = new Subject();
    internal$.subscribe((palette) => {
      for (const [key, value] of Object.entries(palette.color))
        if (typeof value === "string")
          document.body.setAttribute(`data-md-color-${key}`, value);
      for (let index2 = 0; index2 < inputs.length; index2++) {
        const label = inputs[index2].nextElementSibling;
        if (label instanceof HTMLElement)
          label.hidden = palette.index !== index2;
      }
    });
    const inputs = getElements("input", el);
    return watchPalette(inputs).pipe(tap((state) => internal$.next(state)), finalize(() => internal$.complete()), map((state) => __spreadValues({ ref: el }, state)));
  }

  // src/assets/javascripts/integrations/clipboard/index.ts
  var import_clipboard2 = __toModule(require_clipboard());
  function extract(el) {
    const annotations = getElements(".md-annotation", el);
    for (const annotation of annotations)
      annotation.hidden = true;
    const text = el.innerText;
    for (const annotation of annotations)
      annotation.hidden = false;
    return text;
  }
  function setupClipboardJS({ alert$: alert$2 }) {
    if (import_clipboard2.default.isSupported()) {
      new Observable((subscriber) => {
        new import_clipboard2.default("[data-clipboard-target], [data-clipboard-text]", {
          text: (el) => el.getAttribute("data-clipboard-text") || extract(getElement(el.getAttribute("data-clipboard-target")))
        }).on("success", (ev) => subscriber.next(ev));
      }).subscribe(() => alert$2.next(translation("clipboard.copied")));
    }
  }

  // src/assets/javascripts/integrations/instant/index.ts
  function preprocess(urls) {
    if (urls.length < 2)
      return urls;
    const [root, next] = urls.sort((a, b) => a.length - b.length).map((url) => url.replace(/[^/]+$/, ""));
    let index2 = 0;
    if (root === next)
      index2 = root.length;
    else
      while (root.charCodeAt(index2) === next.charCodeAt(index2))
        index2++;
    const config4 = configuration();
    return urls.map((url) => url.replace(root.slice(0, index2), config4.base));
  }
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
    const push$ = requestXML(new URL("sitemap.xml", config4.base)).pipe(map((sitemap) => preprocess(getElements("loc", sitemap).map((node) => node.textContent))), switchMap((urls) => fromEvent(document.body, "click").pipe(filter((ev) => !ev.metaKey && !ev.ctrlKey), switchMap((ev) => {
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
    }))), share());
    const pop$ = fromEvent(window, "popstate").pipe(filter((ev) => ev.state !== null), map((ev) => ({
      url: new URL(location.href),
      offset: ev.state
    })), share());
    merge(push$, pop$).pipe(distinctUntilChanged((a, b) => a.url.href === b.url.href), map(({ url }) => url)).subscribe(location$2);
    const response$ = location$2.pipe(distinctUntilKeyChanged("pathname"), switchMap((url) => request(url.href).pipe(catchError(() => {
      setLocation(url);
      return NEVER;
    }))), share());
    push$.pipe(sample(response$)).subscribe(({ url }) => {
      history.pushState({}, "", `${url}`);
    });
    const dom = new DOMParser();
    response$.pipe(switchMap((res) => res.text()), map((res) => dom.parseFromString(res, "text/html"))).subscribe(document$2);
    document$2.pipe(skip(1)).subscribe((replacement) => {
      for (const selector of [
        "title",
        "link[rel=canonical]",
        "meta[name=author]",
        "meta[name=description]",
        "[data-md-component=announce]",
        "[data-md-component=container]",
        "[data-md-component=header-topic]",
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
    document$2.pipe(skip(1), map(() => getComponentElement("container")), switchMap((el) => of(...getElements("script", el))), concatMap((el) => {
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
    })).subscribe();
    merge(push$, pop$).pipe(sample(document$2)).subscribe(({ url, offset }) => {
      if (url.hash && !offset) {
        setLocationHash(url.hash);
      } else {
        setViewportOffset(offset || { y: 0 });
      }
    });
    viewport$2.pipe(skipUntil(push$), debounceTime(250), distinctUntilKeyChanged("offset")).subscribe(({ offset }) => {
      history.replaceState(offset, "");
    });
    merge(push$, pop$).pipe(bufferCount(2, 1), filter(([a, b]) => a.url.pathname === b.url.pathname), map(([, state]) => state)).subscribe(({ offset }) => {
      setViewportOffset(offset || { y: 0 });
    });
  }

  // src/assets/javascripts/integrations/search/document/index.ts
  var import_escape_html = __toModule(require_escape_html());

  // src/assets/javascripts/integrations/search/highlighter/index.ts
  var import_escape_html2 = __toModule(require_escape_html());
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
    return query.split(/"([^"]+)"/g).map((terms, index2) => index2 & 1 ? terms.replace(/^\b|^(?![^\x00-\x7F]|$)|\s+/g, " +") : terms).join("").replace(/"|(?:^|\s+)[*+\-:^~]+(?=\s+|$)/g, "").trim();
  }

  // src/assets/javascripts/integrations/search/worker/message/index.ts
  var SearchMessageType;
  (function(SearchMessageType2) {
    SearchMessageType2[SearchMessageType2["SETUP"] = 0] = "SETUP";
    SearchMessageType2[SearchMessageType2["READY"] = 1] = "READY";
    SearchMessageType2[SearchMessageType2["QUERY"] = 2] = "QUERY";
    SearchMessageType2[SearchMessageType2["RESULT"] = 3] = "RESULT";
  })(SearchMessageType || (SearchMessageType = {}));
  function isSearchReadyMessage(message) {
    return message.type === 1;
  }
  function isSearchQueryMessage(message) {
    return message.type === 2;
  }
  function isSearchResultMessage(message) {
    return message.type === 3;
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
    const rx$ = watchWorker(worker, { tx$ }).pipe(map((message) => {
      if (isSearchResultMessage(message)) {
        for (const result of message.data.items)
          for (const document2 of result)
            document2.location = `${new URL(document2.location, config4.base)}`;
      }
      return message;
    }), share());
    from(index2).pipe(map((data) => ({
      type: SearchMessageType.SETUP,
      data: setupSearchIndex(data)
    }))).subscribe(tx$.next.bind(tx$));
    return { tx$, rx$ };
  }

  // src/assets/javascripts/integrations/version/index.ts
  function setupVersionSelector() {
    const config4 = configuration();
    const versions$ = requestJSON(new URL("../versions.json", config4.base));
    const current$ = versions$.pipe(map((versions) => {
      const [, current] = config4.base.match(/([^/]+)\/?$/);
      return versions.find(({ version, aliases }) => version === current || aliases.includes(current)) || versions[0];
    }));
    combineLatest([versions$, current$]).subscribe(([versions, current]) => {
      var _a2;
      const topic = getElement(".md-header__topic");
      topic.appendChild(renderVersionSelector(versions, current));
      if (__md_get("__outdated", sessionStorage) === null) {
        const latest = ((_a2 = config4.version) == null ? void 0 : _a2.default) || "latest";
        const outdated = !current.aliases.includes(latest);
        __md_set("__outdated", outdated, sessionStorage);
        if (outdated)
          for (const warning of getComponentElements("outdated"))
            warning.hidden = false;
      }
    });
  }

  // src/assets/javascripts/components/search/query/index.ts
  function watchSearchQuery(el, { rx$ }) {
    const fn = (__search == null ? void 0 : __search.transform) || defaultTransform;
    const { searchParams } = getLocation();
    if (searchParams.has("q"))
      setToggle("search", true);
    const param$ = rx$.pipe(filter(isSearchReadyMessage), take(1), map(() => searchParams.get("q") || ""));
    param$.subscribe((value) => {
      if (value)
        el.value = value;
    });
    const focus$ = watchElementFocus(el);
    const value$ = merge(fromEvent(el, "keyup"), fromEvent(el, "focus").pipe(delay(1)), param$).pipe(map(() => fn(el.value)), startWith(""), distinctUntilChanged());
    return combineLatest([value$, focus$]).pipe(map(([value, focus]) => ({ value, focus })), shareReplay(1));
  }
  function mountSearchQuery(el, { tx$, rx$ }) {
    const internal$ = new Subject();
    internal$.pipe(distinctUntilKeyChanged("value"), map(({ value }) => ({
      type: SearchMessageType.QUERY,
      data: value
    }))).subscribe(tx$.next.bind(tx$));
    internal$.pipe(distinctUntilKeyChanged("focus")).subscribe(({ focus }) => {
      if (focus) {
        setToggle("search", focus);
        setSearchQueryPlaceholder(el, "");
      } else {
        resetSearchQueryPlaceholder(el);
      }
    });
    fromEvent(el.form, "reset").pipe(takeUntil(internal$.pipe(takeLast(1)))).subscribe(() => setElementFocus(el));
    return watchSearchQuery(el, { tx$, rx$ }).pipe(tap((state) => internal$.next(state)), finalize(() => internal$.complete()), map((state) => __spreadValues({ ref: el }, state)));
  }

  // src/assets/javascripts/components/search/result/index.ts
  function mountSearchResult(el, { rx$ }, { query$ }) {
    const internal$ = new Subject();
    const boundary$ = watchElementBoundary(el.parentElement).pipe(filter(Boolean));
    const meta = getElement(":scope > :first-child", el);
    const list = getElement(":scope > :last-child", el);
    const ready$ = rx$.pipe(filter(isSearchReadyMessage), take(1));
    internal$.pipe(observeOn(animationFrameScheduler), withLatestFrom(query$), skipUntil(ready$)).subscribe(([{ items }, { value }]) => {
      if (value)
        setSearchResultMeta(meta, items.length);
      else
        resetSearchResultMeta(meta);
    });
    internal$.pipe(observeOn(animationFrameScheduler), tap(() => resetSearchResultList(list)), switchMap(({ items }) => merge(of(...items.slice(0, 10)), of(...items.slice(10)).pipe(bufferCount(4), zipWith(boundary$), switchMap(([chunk]) => of(...chunk)))))).subscribe((result) => {
      addToSearchResultList(list, renderSearchResultItem(result));
    });
    const result$ = rx$.pipe(filter(isSearchResultMessage), map(({ data }) => data));
    return result$.pipe(tap((state) => internal$.next(state)), finalize(() => internal$.complete()), map((state) => __spreadValues({ ref: el }, state)));
  }

  // src/assets/javascripts/components/search/share/index.ts
  function watchSearchShare(_el, { query$ }) {
    return query$.pipe(map(({ value }) => {
      const url = getLocation();
      url.hash = "";
      url.searchParams.delete("h");
      url.searchParams.set("q", value);
      return { url };
    }));
  }
  function mountSearchShare(el, options) {
    const internal$ = new Subject();
    internal$.subscribe(({ url }) => {
      el.setAttribute("data-clipboard-text", el.href);
      el.href = `${url}`;
    });
    fromEvent(el, "click").subscribe((ev) => ev.preventDefault());
    return watchSearchShare(el, options).pipe(tap((state) => internal$.next(state)), finalize(() => internal$.complete()), map((state) => __spreadValues({ ref: el }, state)));
  }

  // src/assets/javascripts/components/search/suggest/index.ts
  function mountSearchSuggest(el, { rx$ }, { keyboard$: keyboard$2 }) {
    const internal$ = new Subject();
    const query = getComponentElement("search-query");
    const query$ = merge(fromEvent(query, "keydown"), fromEvent(query, "focus")).pipe(observeOn(asyncScheduler), map(() => query.value), distinctUntilChanged());
    internal$.pipe(combineLatestWith(query$), map(([{ suggestions }, value]) => {
      const words = value.split(/([\s-]+)/);
      if ((suggestions == null ? void 0 : suggestions.length) && words[words.length - 1]) {
        const last2 = suggestions[suggestions.length - 1];
        if (last2.startsWith(words[words.length - 1]))
          words[words.length - 1] = last2;
      } else {
        words.length = 0;
      }
      return words;
    })).subscribe((words) => el.innerHTML = words.join("").replace(/\s/g, "&nbsp;"));
    keyboard$2.pipe(filter(({ mode }) => mode === "search")).subscribe((key) => {
      switch (key.type) {
        case "ArrowRight":
          if (el.innerText.length && query.selectionStart === query.value.length)
            query.value = el.innerText;
          break;
      }
    });
    const result$ = rx$.pipe(filter(isSearchResultMessage), map(({ data }) => data));
    return result$.pipe(tap((state) => internal$.next(state)), finalize(() => internal$.complete()), map(() => ({ ref: el })));
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
      tx$.pipe(filter(isSearchQueryMessage), sample(rx$.pipe(filter(isSearchReadyMessage))), take(1)).subscribe(tx$.next.bind(tx$));
      keyboard$2.pipe(filter(({ mode }) => mode === "search")).subscribe((key) => {
        const active = getActiveElement();
        switch (key.type) {
          case "Enter":
            if (active === query) {
              const anchors = new Map();
              for (const anchor of getElements(":first-child [href]", result)) {
                const article = anchor.firstElementChild;
                anchors.set(anchor, parseFloat(article.getAttribute("data-md-score")));
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
            setElementFocus(query, false);
            break;
          case "ArrowUp":
          case "ArrowDown":
            if (typeof active === "undefined") {
              setElementFocus(query);
            } else {
              const els = [query, ...getElements(":not(details) > [href], summary, details[open] [href]", result)];
              const i = Math.max(0, (Math.max(0, els.indexOf(active)) + els.length + (key.type === "ArrowUp" ? -1 : 1)) % els.length);
              setElementFocus(els[i]);
            }
            key.claim();
            break;
          default:
            if (query !== getActiveElement())
              setElementFocus(query);
        }
      });
      keyboard$2.pipe(filter(({ mode }) => mode === "global")).subscribe((key) => {
        switch (key.type) {
          case "f":
          case "s":
          case "/":
            setElementFocus(query);
            setElementSelection(query);
            key.claim();
            break;
        }
      });
      const query$ = mountSearchQuery(query, worker);
      const result$ = mountSearchResult(result, worker, { query$ });
      return merge(query$, result$).pipe(mergeWith(...getComponentElements("search-share", el).map((child) => mountSearchShare(child, { query$ })), ...getComponentElements("search-suggest", el).map((child) => mountSearchSuggest(child, worker, { keyboard$: keyboard$2 }))));
    } catch (err) {
      el.hidden = true;
      return NEVER;
    }
  }

  // src/assets/javascripts/components/search/highlight/index.ts
  function mountSearchHiglight(el, { index$: index$2, location$: location$2 }) {
    return combineLatest([
      index$2,
      location$2.pipe(startWith(getLocation()), filter((url) => url.searchParams.has("h")))
    ]).pipe(map(([index2, url]) => setupSearchHighlighter(index2.config, true)(url.searchParams.get("h"))), map((fn) => {
      var _a2;
      const nodes = new Map();
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
    }));
  }

  // src/assets/javascripts/components/sidebar/index.ts
  function watchSidebar(el, { viewport$: viewport$2, main$: main$2 }) {
    const parent = el.parentElement;
    const adjust = parent.offsetTop - parent.parentElement.offsetTop;
    return combineLatest([main$2, viewport$2]).pipe(map(([{ offset, height }, { offset: { y } }]) => {
      height = height + Math.min(adjust, Math.max(0, y - offset)) - adjust;
      return {
        height,
        locked: y >= offset + adjust
      };
    }), distinctUntilChanged((a, b) => a.height === b.height && a.locked === b.locked));
  }
  function mountSidebar(el, _a2) {
    var _b = _a2, { header$: header$2 } = _b, options = __objRest(_b, ["header$"]);
    const internal$ = new Subject();
    internal$.pipe(observeOn(animationFrameScheduler), withLatestFrom(header$2)).subscribe({
      next([{ height }, { height: offset }]) {
        setSidebarHeight(el, height);
        setSidebarOffset(el, offset);
      },
      complete() {
        resetSidebarOffset(el);
        resetSidebarHeight(el);
      }
    });
    return watchSidebar(el, options).pipe(tap((state) => internal$.next(state)), finalize(() => internal$.complete()), map((state) => __spreadValues({ ref: el }, state)));
  }

  // src/assets/javascripts/components/source/facts/github/index.ts
  function fetchSourceFactsFromGitHub(user, repo) {
    if (typeof repo !== "undefined") {
      const url = `https://api.github.com/repos/${user}/${repo}`;
      return zip(requestJSON(`${url}/releases/latest`).pipe(map((release) => ({
        version: release.tag_name
      })), defaultIfEmpty({})), requestJSON(url).pipe(map((info) => ({
        stars: info.stargazers_count,
        forks: info.forks_count
      })), defaultIfEmpty({}))).pipe(map(([release, info]) => __spreadValues(__spreadValues({}, release), info)));
    } else {
      const url = `https://api.github.com/users/${user}`;
      return requestJSON(url).pipe(map((info) => ({
        repositories: info.public_repos
      })), defaultIfEmpty({}));
    }
  }

  // src/assets/javascripts/components/source/facts/gitlab/index.ts
  function fetchSourceFactsFromGitLab(base, project) {
    const url = `https://${base}/api/v4/projects/${encodeURIComponent(project)}`;
    return requestJSON(url).pipe(map(({ star_count, forks_count }) => ({
      stars: star_count,
      forks: forks_count
    })), defaultIfEmpty({}));
  }

  // src/assets/javascripts/components/source/facts/_/index.ts
  function fetchSourceFacts(url) {
    const [type] = url.match(/(git(?:hub|lab))/i) || [];
    switch (type.toLowerCase()) {
      case "github":
        const [, user, repo] = url.match(/^.+github\.com\/([^/]+)\/?([^/]+)?/i);
        return fetchSourceFactsFromGitHub(user, repo);
      case "gitlab":
        const [, base, slug] = url.match(/^.+?([^/]*gitlab[^/]+)\/(.+?)\/?$/i);
        return fetchSourceFactsFromGitLab(base, slug);
      default:
        return NEVER;
    }
  }

  // src/assets/javascripts/components/source/_/index.ts
  var fetch$;
  function watchSource(el) {
    return fetch$ || (fetch$ = defer(() => {
      const cached = __md_get("__source", sessionStorage);
      if (cached)
        return of(cached);
      else
        return fetchSourceFacts(el.href).pipe(tap((facts) => __md_set("__source", facts, sessionStorage)));
    }).pipe(catchError(() => NEVER), filter((facts) => Object.keys(facts).length > 0), map((facts) => ({ facts })), shareReplay(1)));
  }
  function mountSource(el) {
    const internal$ = new Subject();
    internal$.subscribe(({ facts }) => {
      setSourceFacts(el, renderSourceFacts(facts));
      setSourceState(el, "done");
    });
    return watchSource(el).pipe(tap((state) => internal$.next(state)), finalize(() => internal$.complete()), map((state) => __spreadValues({ ref: el }, state)));
  }

  // src/assets/javascripts/components/tabs/index.ts
  function watchTabs(el, { viewport$: viewport$2, header$: header$2 }) {
    return watchElementSize(document.body).pipe(switchMap(() => watchViewportAt(el, { header$: header$2, viewport$: viewport$2 })), map(({ offset: { y } }) => {
      return {
        hidden: y >= 10
      };
    }), distinctUntilKeyChanged("hidden"));
  }
  function mountTabs(el, options) {
    const internal$ = new Subject();
    internal$.pipe(observeOn(animationFrameScheduler)).subscribe({
      next({ hidden }) {
        if (hidden)
          setTabsState(el, "hidden");
        else
          resetTabsState(el);
      },
      complete() {
        resetTabsState(el);
      }
    });
    return (feature("navigation.tabs.sticky") ? of({ hidden: false }) : watchTabs(el, options)).pipe(tap((state) => internal$.next(state)), finalize(() => internal$.complete()), map((state) => __spreadValues({ ref: el }, state)));
  }

  // src/assets/javascripts/components/toc/index.ts
  function watchTableOfContents(el, { viewport$: viewport$2, header$: header$2 }) {
    const table = new Map();
    const anchors = getElements("[href^=\\#]", el);
    for (const anchor of anchors) {
      const id = decodeURIComponent(anchor.hash.substring(1));
      const target = getOptionalElement(`[id="${id}"]`);
      if (typeof target !== "undefined")
        table.set(anchor, target);
    }
    const adjust$ = header$2.pipe(map((header) => 24 + header.height));
    const partition$ = watchElementSize(document.body).pipe(distinctUntilKeyChanged("height"), switchMap((body) => defer(() => {
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
        return index2.set([...path = [...path, anchor]].reverse(), offset);
      }, new Map()));
    }).pipe(map((index2) => new Map([...index2].sort(([, a], [, b]) => a - b))), switchMap((index2) => combineLatest([viewport$2, adjust$]).pipe(scan(([prev, next], [{ offset: { y }, size }, adjust]) => {
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
    }, [[], [...index2]]), distinctUntilChanged((a, b) => a[0] === b[0] && a[1] === b[1]))))));
    return partition$.pipe(map(([prev, next]) => ({
      prev: prev.map(([path]) => path),
      next: next.map(([path]) => path)
    })), startWith({ prev: [], next: [] }), bufferCount(2, 1), map(([a, b]) => {
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
    }));
  }
  function mountTableOfContents(el, options) {
    const internal$ = new Subject();
    internal$.pipe(observeOn(animationFrameScheduler)).subscribe(({ prev, next }) => {
      for (const [anchor] of next) {
        resetAnchorActive(anchor);
        resetAnchorState(anchor);
      }
      for (const [index2, [anchor]] of prev.entries()) {
        setAnchorActive(anchor, index2 === prev.length - 1);
        setAnchorState(anchor, "blur");
      }
      if (feature("navigation.tracking")) {
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
      }
    });
    return watchTableOfContents(el, options).pipe(tap((state) => internal$.next(state)), finalize(() => internal$.complete()), map((state) => __spreadValues({ ref: el }, state)));
  }

  // src/assets/javascripts/components/top/index.ts
  function watchBackToTop(_el, { viewport$: viewport$2, main$: main$2 }) {
    const direction$ = viewport$2.pipe(map(({ offset: { y } }) => y), bufferCount(2, 1), map(([a, b]) => a > b && b), distinctUntilChanged());
    const hidden$ = main$2.pipe(distinctUntilKeyChanged("active"));
    return combineLatest([hidden$, direction$]).pipe(map(([{ active }, direction]) => ({
      hidden: !(active && direction)
    })), distinctUntilChanged((a, b) => a.hidden === b.hidden));
  }
  function mountBackToTop(el, { viewport$: viewport$2, header$: header$2, main$: main$2 }) {
    const internal$ = new Subject();
    internal$.pipe(observeOn(animationFrameScheduler), withLatestFrom(header$2.pipe(distinctUntilKeyChanged("height")))).subscribe({
      next([{ hidden }, { height }]) {
        setBackToTopOffset(el, height + 16);
        if (hidden) {
          setBackToTopState(el, "hidden");
          setElementFocus(el, false);
          setFocusable(el, -1);
        } else {
          resetBackToTopState(el);
          resetFocusable(el);
        }
      },
      complete() {
        resetBackToTopOffset(el);
        resetBackToTopState(el);
        resetFocusable(el);
      }
    });
    return watchBackToTop(el, { viewport$: viewport$2, header$: header$2, main$: main$2 }).pipe(tap((state) => internal$.next(state)), finalize(() => internal$.complete()), map((state) => __spreadValues({ ref: el }, state)));
  }

  // src/assets/javascripts/patches/indeterminate/index.ts
  function patchIndeterminate({ document$: document$2, tablet$: tablet$2 }) {
    document$2.pipe(switchMap(() => of(...getElements("[data-md-state=indeterminate]"))), tap((el) => {
      el.indeterminate = true;
      el.checked = false;
    }), mergeMap((el) => fromEvent(el, "change").pipe(takeWhile(() => el.hasAttribute("data-md-state")), mapTo(el))), withLatestFrom(tablet$2)).subscribe(([el, tablet]) => {
      el.removeAttribute("data-md-state");
      if (tablet)
        el.checked = false;
    });
  }

  // src/assets/javascripts/patches/scrollfix/index.ts
  function isAppleDevice() {
    return /(iPad|iPhone|iPod)/.test(navigator.userAgent);
  }
  function patchScrollfix({ document$: document$2 }) {
    document$2.pipe(switchMap(() => of(...getElements("[data-md-scrollfix]"))), tap((el) => el.removeAttribute("data-md-scrollfix")), filter(isAppleDevice), mergeMap((el) => fromEvent(el, "touchstart").pipe(mapTo(el)))).subscribe((el) => {
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
    combineLatest([watchToggle("search"), tablet$2]).pipe(map(([active, tablet]) => active && !tablet), switchMap((active) => of(active).pipe(delay(active ? 400 : 100), observeOn(animationFrameScheduler))), withLatestFrom(viewport$2)).subscribe(([active, { offset: { y } }]) => {
      if (active)
        setScrollLock(document.body, y);
      else
        resetScrollLock(document.body);
    });
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
  var hover$ = watchMedia("(hover)");
  var print$ = watchPrint();
  var config3 = configuration();
  var index$ = document.forms.namedItem("search") ? (__search == null ? void 0 : __search.index) || requestJSON(new URL("search/search_index.json", config3.base)) : NEVER;
  var alert$ = new Subject();
  setupClipboardJS({ alert$ });
  if (feature("navigation.instant"))
    setupInstantLoading({ document$, location$, viewport$ });
  var _a;
  if (((_a = config3.version) == null ? void 0 : _a.provider) === "mike")
    setupVersionSelector();
  merge(location$, target$).pipe(delay(125)).subscribe(() => {
    setToggle("drawer", false);
    setToggle("search", false);
  });
  keyboard$.pipe(filter(({ mode }) => mode === "global")).subscribe((key) => {
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
  var main$ = document$.pipe(map(() => getComponentElement("main")), switchMap((el) => watchMain(el, { viewport$, header$ })), shareReplay(1));
  var control$ = merge(...getComponentElements("dialog").map((el) => mountDialog(el, { alert$ })), ...getComponentElements("header").map((el) => mountHeader(el, { viewport$, header$, main$ })), ...getComponentElements("palette").map((el) => mountPalette(el)), ...getComponentElements("search").map((el) => mountSearch(el, { index$, keyboard$ })), ...getComponentElements("source").map((el) => mountSource(el)));
  var content$ = defer(() => merge(...getComponentElements("content").map((el) => mountContent(el, { target$, viewport$, hover$, print$ })), ...getComponentElements("content").map((el) => feature("search.highlight") ? mountSearchHiglight(el, { index$, location$ }) : NEVER), ...getComponentElements("header-title").map((el) => mountHeaderTitle(el, { viewport$, header$ })), ...getComponentElements("sidebar").map((el) => el.getAttribute("data-md-type") === "navigation" ? at(screen$, () => mountSidebar(el, { viewport$, header$, main$ })) : at(tablet$, () => mountSidebar(el, { viewport$, header$, main$ }))), ...getComponentElements("tabs").map((el) => mountTabs(el, { viewport$, header$ })), ...getComponentElements("toc").map((el) => mountTableOfContents(el, { viewport$, header$ })), ...getComponentElements("top").map((el) => mountBackToTop(el, { viewport$, header$, main$ }))));
  var component$ = document$.pipe(switchMap(() => content$), mergeWith(control$), shareReplay(1));
  component$.subscribe();
  window.document$ = document$;
  window.location$ = location$;
  window.target$ = target$;
  window.keyboard$ = keyboard$;
  window.viewport$ = viewport$;
  window.tablet$ = tablet$;
  window.screen$ = screen$;
  window.hover$ = hover$;
  window.print$ = print$;
  window.alert$ = alert$;
  window.component$ = component$;
})();
//# sourceMappingURL=bundle.js.map

