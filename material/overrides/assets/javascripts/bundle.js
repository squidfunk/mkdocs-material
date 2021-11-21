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

  // node_modules/fuzzaldrin-plus/lib/scorer.js
  var require_scorer = __commonJS({
    "node_modules/fuzzaldrin-plus/lib/scorer.js"(exports) {
      (function() {
        var AcronymResult, computeScore, emptyAcronymResult, isAcronymFullWord, isMatch, isSeparator, isWordEnd, isWordStart, miss_coeff, pos_bonus, scoreAcronyms, scoreCharacter, scoreConsecutives, scoreExact, scoreExactMatch, scorePattern, scorePosition, scoreSize, tau_size, wm;
        wm = 150;
        pos_bonus = 20;
        tau_size = 150;
        miss_coeff = 0.75;
        exports.score = function(string, query, options) {
          var allowErrors, preparedQuery, score, string_lw;
          preparedQuery = options.preparedQuery, allowErrors = options.allowErrors;
          if (!(allowErrors || isMatch(string, preparedQuery.core_lw, preparedQuery.core_up))) {
            return 0;
          }
          string_lw = string.toLowerCase();
          score = computeScore(string, string_lw, preparedQuery);
          return Math.ceil(score);
        };
        exports.isMatch = isMatch = function(subject, query_lw, query_up) {
          var i, j, m, n, qj_lw, qj_up, si;
          m = subject.length;
          n = query_lw.length;
          if (!m || n > m) {
            return false;
          }
          i = -1;
          j = -1;
          while (++j < n) {
            qj_lw = query_lw.charCodeAt(j);
            qj_up = query_up.charCodeAt(j);
            while (++i < m) {
              si = subject.charCodeAt(i);
              if (si === qj_lw || si === qj_up) {
                break;
              }
            }
            if (i === m) {
              return false;
            }
          }
          return true;
        };
        exports.computeScore = computeScore = function(subject, subject_lw, preparedQuery) {
          var acro, acro_score, align, csc_diag, csc_row, csc_score, csc_should_rebuild, i, j, m, miss_budget, miss_left, n, pos, query, query_lw, record_miss, score, score_diag, score_row, score_up, si_lw, start, sz;
          query = preparedQuery.query;
          query_lw = preparedQuery.query_lw;
          m = subject.length;
          n = query.length;
          acro = scoreAcronyms(subject, subject_lw, query, query_lw);
          acro_score = acro.score;
          if (acro.count === n) {
            return scoreExact(n, m, acro_score, acro.pos);
          }
          pos = subject_lw.indexOf(query_lw);
          if (pos > -1) {
            return scoreExactMatch(subject, subject_lw, query, query_lw, pos, n, m);
          }
          score_row = new Array(n);
          csc_row = new Array(n);
          sz = scoreSize(n, m);
          miss_budget = Math.ceil(miss_coeff * n) + 5;
          miss_left = miss_budget;
          csc_should_rebuild = true;
          j = -1;
          while (++j < n) {
            score_row[j] = 0;
            csc_row[j] = 0;
          }
          i = -1;
          while (++i < m) {
            si_lw = subject_lw[i];
            if (!si_lw.charCodeAt(0) in preparedQuery.charCodes) {
              if (csc_should_rebuild) {
                j = -1;
                while (++j < n) {
                  csc_row[j] = 0;
                }
                csc_should_rebuild = false;
              }
              continue;
            }
            score = 0;
            score_diag = 0;
            csc_diag = 0;
            record_miss = true;
            csc_should_rebuild = true;
            j = -1;
            while (++j < n) {
              score_up = score_row[j];
              if (score_up > score) {
                score = score_up;
              }
              csc_score = 0;
              if (query_lw[j] === si_lw) {
                start = isWordStart(i, subject, subject_lw);
                csc_score = csc_diag > 0 ? csc_diag : scoreConsecutives(subject, subject_lw, query, query_lw, i, j, start);
                align = score_diag + scoreCharacter(i, j, start, acro_score, csc_score);
                if (align > score) {
                  score = align;
                  miss_left = miss_budget;
                } else {
                  if (record_miss && --miss_left <= 0) {
                    return Math.max(score, score_row[n - 1]) * sz;
                  }
                  record_miss = false;
                }
              }
              score_diag = score_up;
              csc_diag = csc_row[j];
              csc_row[j] = csc_score;
              score_row[j] = score;
            }
          }
          score = score_row[n - 1];
          return score * sz;
        };
        exports.isWordStart = isWordStart = function(pos, subject, subject_lw) {
          var curr_s, prev_s;
          if (pos === 0) {
            return true;
          }
          curr_s = subject[pos];
          prev_s = subject[pos - 1];
          return isSeparator(prev_s) || curr_s !== subject_lw[pos] && prev_s === subject_lw[pos - 1];
        };
        exports.isWordEnd = isWordEnd = function(pos, subject, subject_lw, len) {
          var curr_s, next_s;
          if (pos === len - 1) {
            return true;
          }
          curr_s = subject[pos];
          next_s = subject[pos + 1];
          return isSeparator(next_s) || curr_s === subject_lw[pos] && next_s !== subject_lw[pos + 1];
        };
        isSeparator = function(c) {
          return c === " " || c === "." || c === "-" || c === "_" || c === "/" || c === "\\";
        };
        scorePosition = function(pos) {
          var sc;
          if (pos < pos_bonus) {
            sc = pos_bonus - pos;
            return 100 + sc * sc;
          } else {
            return Math.max(100 + pos_bonus - pos, 0);
          }
        };
        exports.scoreSize = scoreSize = function(n, m) {
          return tau_size / (tau_size + Math.abs(m - n));
        };
        scoreExact = function(n, m, quality, pos) {
          return 2 * n * (wm * quality + scorePosition(pos)) * scoreSize(n, m);
        };
        exports.scorePattern = scorePattern = function(count, len, sameCase, start, end) {
          var bonus, sz;
          sz = count;
          bonus = 6;
          if (sameCase === count) {
            bonus += 2;
          }
          if (start) {
            bonus += 3;
          }
          if (end) {
            bonus += 1;
          }
          if (count === len) {
            if (start) {
              if (sameCase === len) {
                sz += 2;
              } else {
                sz += 1;
              }
            }
            if (end) {
              bonus += 1;
            }
          }
          return sameCase + sz * (sz + bonus);
        };
        exports.scoreCharacter = scoreCharacter = function(i, j, start, acro_score, csc_score) {
          var posBonus;
          posBonus = scorePosition(i);
          if (start) {
            return posBonus + wm * ((acro_score > csc_score ? acro_score : csc_score) + 10);
          }
          return posBonus + wm * csc_score;
        };
        exports.scoreConsecutives = scoreConsecutives = function(subject, subject_lw, query, query_lw, i, j, startOfWord) {
          var k, m, mi, n, nj, sameCase, sz;
          m = subject.length;
          n = query.length;
          mi = m - i;
          nj = n - j;
          k = mi < nj ? mi : nj;
          sameCase = 0;
          sz = 0;
          if (query[j] === subject[i]) {
            sameCase++;
          }
          while (++sz < k && query_lw[++j] === subject_lw[++i]) {
            if (query[j] === subject[i]) {
              sameCase++;
            }
          }
          if (sz < k) {
            i--;
          }
          if (sz === 1) {
            return 1 + 2 * sameCase;
          }
          return scorePattern(sz, n, sameCase, startOfWord, isWordEnd(i, subject, subject_lw, m));
        };
        exports.scoreExactMatch = scoreExactMatch = function(subject, subject_lw, query, query_lw, pos, n, m) {
          var end, i, pos2, sameCase, start;
          start = isWordStart(pos, subject, subject_lw);
          if (!start) {
            pos2 = subject_lw.indexOf(query_lw, pos + 1);
            if (pos2 > -1) {
              start = isWordStart(pos2, subject, subject_lw);
              if (start) {
                pos = pos2;
              }
            }
          }
          i = -1;
          sameCase = 0;
          while (++i < n) {
            if (query[pos + i] === subject[i]) {
              sameCase++;
            }
          }
          end = isWordEnd(pos + n - 1, subject, subject_lw, m);
          return scoreExact(n, m, scorePattern(n, n, sameCase, start, end), pos);
        };
        AcronymResult = function() {
          function AcronymResult2(score, pos, count) {
            this.score = score;
            this.pos = pos;
            this.count = count;
          }
          return AcronymResult2;
        }();
        emptyAcronymResult = new AcronymResult(0, 0.1, 0);
        exports.scoreAcronyms = scoreAcronyms = function(subject, subject_lw, query, query_lw) {
          var count, fullWord, i, j, m, n, qj_lw, sameCase, score, sepCount, sumPos;
          m = subject.length;
          n = query.length;
          if (!(m > 1 && n > 1)) {
            return emptyAcronymResult;
          }
          count = 0;
          sepCount = 0;
          sumPos = 0;
          sameCase = 0;
          i = -1;
          j = -1;
          while (++j < n) {
            qj_lw = query_lw[j];
            if (isSeparator(qj_lw)) {
              i = subject_lw.indexOf(qj_lw, i + 1);
              if (i > -1) {
                sepCount++;
                continue;
              } else {
                break;
              }
            }
            while (++i < m) {
              if (qj_lw === subject_lw[i] && isWordStart(i, subject, subject_lw)) {
                if (query[j] === subject[i]) {
                  sameCase++;
                }
                sumPos += i;
                count++;
                break;
              }
            }
            if (i === m) {
              break;
            }
          }
          if (count < 2) {
            return emptyAcronymResult;
          }
          fullWord = count === n ? isAcronymFullWord(subject, subject_lw, query, count) : false;
          score = scorePattern(count, n, sameCase, true, fullWord);
          return new AcronymResult(score, sumPos / count, count + sepCount);
        };
        isAcronymFullWord = function(subject, subject_lw, query, nbAcronymInQuery) {
          var count, i, m, n;
          m = subject.length;
          n = query.length;
          count = 0;
          if (m > 12 * n) {
            return false;
          }
          i = -1;
          while (++i < m) {
            if (isWordStart(i, subject, subject_lw) && ++count > nbAcronymInQuery) {
              return false;
            }
          }
          return true;
        };
      }).call(exports);
    }
  });

  // node_modules/fuzzaldrin-plus/lib/pathScorer.js
  var require_pathScorer = __commonJS({
    "node_modules/fuzzaldrin-plus/lib/pathScorer.js"(exports) {
      (function() {
        var computeScore, countDir, file_coeff, getExtension, getExtensionScore, isMatch, scorePath, scoreSize, tau_depth, _ref;
        _ref = require_scorer(), isMatch = _ref.isMatch, computeScore = _ref.computeScore, scoreSize = _ref.scoreSize;
        tau_depth = 20;
        file_coeff = 2.5;
        exports.score = function(string, query, options) {
          var allowErrors, preparedQuery, score, string_lw;
          preparedQuery = options.preparedQuery, allowErrors = options.allowErrors;
          if (!(allowErrors || isMatch(string, preparedQuery.core_lw, preparedQuery.core_up))) {
            return 0;
          }
          string_lw = string.toLowerCase();
          score = computeScore(string, string_lw, preparedQuery);
          score = scorePath(string, string_lw, score, options);
          return Math.ceil(score);
        };
        scorePath = function(subject, subject_lw, fullPathScore, options) {
          var alpha, basePathScore, basePos, depth, end, extAdjust, fileLength, pathSeparator, preparedQuery, useExtensionBonus;
          if (fullPathScore === 0) {
            return 0;
          }
          preparedQuery = options.preparedQuery, useExtensionBonus = options.useExtensionBonus, pathSeparator = options.pathSeparator;
          end = subject.length - 1;
          while (subject[end] === pathSeparator) {
            end--;
          }
          basePos = subject.lastIndexOf(pathSeparator, end);
          fileLength = end - basePos;
          extAdjust = 1;
          if (useExtensionBonus) {
            extAdjust += getExtensionScore(subject_lw, preparedQuery.ext, basePos, end, 2);
            fullPathScore *= extAdjust;
          }
          if (basePos === -1) {
            return fullPathScore;
          }
          depth = preparedQuery.depth;
          while (basePos > -1 && depth-- > 0) {
            basePos = subject.lastIndexOf(pathSeparator, basePos - 1);
          }
          basePathScore = basePos === -1 ? fullPathScore : extAdjust * computeScore(subject.slice(basePos + 1, end + 1), subject_lw.slice(basePos + 1, end + 1), preparedQuery);
          alpha = 0.5 * tau_depth / (tau_depth + countDir(subject, end + 1, pathSeparator));
          return alpha * basePathScore + (1 - alpha) * fullPathScore * scoreSize(0, file_coeff * fileLength);
        };
        exports.countDir = countDir = function(path, end, pathSeparator) {
          var count, i;
          if (end < 1) {
            return 0;
          }
          count = 0;
          i = -1;
          while (++i < end && path[i] === pathSeparator) {
            continue;
          }
          while (++i < end) {
            if (path[i] === pathSeparator) {
              count++;
              while (++i < end && path[i] === pathSeparator) {
                continue;
              }
            }
          }
          return count;
        };
        exports.getExtension = getExtension = function(str) {
          var pos;
          pos = str.lastIndexOf(".");
          if (pos < 0) {
            return "";
          } else {
            return str.substr(pos + 1);
          }
        };
        getExtensionScore = function(candidate, ext, startPos, endPos, maxDepth) {
          var m, matched, n, pos;
          if (!ext.length) {
            return 0;
          }
          pos = candidate.lastIndexOf(".", endPos);
          if (!(pos > startPos)) {
            return 0;
          }
          n = ext.length;
          m = endPos - pos;
          if (m < n) {
            n = m;
            m = ext.length;
          }
          pos++;
          matched = -1;
          while (++matched < n) {
            if (candidate[pos + matched] !== ext[matched]) {
              break;
            }
          }
          if (matched === 0 && maxDepth > 0) {
            return 0.9 * getExtensionScore(candidate, ext, startPos, pos - 2, maxDepth - 1);
          }
          return matched / m;
        };
      }).call(exports);
    }
  });

  // node_modules/fuzzaldrin-plus/lib/query.js
  var require_query = __commonJS({
    "node_modules/fuzzaldrin-plus/lib/query.js"(exports, module) {
      (function() {
        var Query, coreChars, countDir, getCharCodes, getExtension, opt_char_re, truncatedUpperCase, _ref;
        _ref = require_pathScorer(), countDir = _ref.countDir, getExtension = _ref.getExtension;
        module.exports = Query = function() {
          function Query2(query, _arg) {
            var optCharRegEx, pathSeparator, _ref1;
            _ref1 = _arg != null ? _arg : {}, optCharRegEx = _ref1.optCharRegEx, pathSeparator = _ref1.pathSeparator;
            if (!(query && query.length)) {
              return null;
            }
            this.query = query;
            this.query_lw = query.toLowerCase();
            this.core = coreChars(query, optCharRegEx);
            this.core_lw = this.core.toLowerCase();
            this.core_up = truncatedUpperCase(this.core);
            this.depth = countDir(query, query.length, pathSeparator);
            this.ext = getExtension(this.query_lw);
            this.charCodes = getCharCodes(this.query_lw);
          }
          return Query2;
        }();
        opt_char_re = /[ _\-:\/\\]/g;
        coreChars = function(query, optCharRegEx) {
          if (optCharRegEx == null) {
            optCharRegEx = opt_char_re;
          }
          return query.replace(optCharRegEx, "");
        };
        truncatedUpperCase = function(str) {
          var char, upper, _i, _len;
          upper = "";
          for (_i = 0, _len = str.length; _i < _len; _i++) {
            char = str[_i];
            upper += char.toUpperCase()[0];
          }
          return upper;
        };
        getCharCodes = function(str) {
          var charCodes, i, len;
          len = str.length;
          i = -1;
          charCodes = [];
          while (++i < len) {
            charCodes[str.charCodeAt(i)] = true;
          }
          return charCodes;
        };
      }).call(exports);
    }
  });

  // node_modules/fuzzaldrin-plus/lib/filter.js
  var require_filter = __commonJS({
    "node_modules/fuzzaldrin-plus/lib/filter.js"(exports, module) {
      (function() {
        var Query, pathScorer, pluckCandidates, scorer, sortCandidates;
        scorer = require_scorer();
        pathScorer = require_pathScorer();
        Query = require_query();
        pluckCandidates = function(a) {
          return a.candidate;
        };
        sortCandidates = function(a, b) {
          return b.score - a.score;
        };
        module.exports = function(candidates, query, options) {
          var bKey, candidate, key, maxInners, maxResults, score, scoreProvider, scoredCandidates, spotLeft, string, usePathScoring, _i, _len;
          scoredCandidates = [];
          key = options.key, maxResults = options.maxResults, maxInners = options.maxInners, usePathScoring = options.usePathScoring;
          spotLeft = maxInners != null && maxInners > 0 ? maxInners : candidates.length + 1;
          bKey = key != null;
          scoreProvider = usePathScoring ? pathScorer : scorer;
          for (_i = 0, _len = candidates.length; _i < _len; _i++) {
            candidate = candidates[_i];
            string = bKey ? candidate[key] : candidate;
            if (!string) {
              continue;
            }
            score = scoreProvider.score(string, query, options);
            if (score > 0) {
              scoredCandidates.push({
                candidate,
                score
              });
              if (!--spotLeft) {
                break;
              }
            }
          }
          scoredCandidates.sort(sortCandidates);
          candidates = scoredCandidates.map(pluckCandidates);
          if (maxResults != null) {
            candidates = candidates.slice(0, maxResults);
          }
          return candidates;
        };
      }).call(exports);
    }
  });

  // node_modules/fuzzaldrin-plus/lib/matcher.js
  var require_matcher = __commonJS({
    "node_modules/fuzzaldrin-plus/lib/matcher.js"(exports) {
      (function() {
        var basenameMatch, computeMatch, isMatch, isWordStart, match, mergeMatches, scoreAcronyms, scoreCharacter, scoreConsecutives, _ref;
        _ref = require_scorer(), isMatch = _ref.isMatch, isWordStart = _ref.isWordStart, scoreConsecutives = _ref.scoreConsecutives, scoreCharacter = _ref.scoreCharacter, scoreAcronyms = _ref.scoreAcronyms;
        exports.match = match = function(string, query, options) {
          var allowErrors, baseMatches, matches, pathSeparator, preparedQuery, string_lw;
          allowErrors = options.allowErrors, preparedQuery = options.preparedQuery, pathSeparator = options.pathSeparator;
          if (!(allowErrors || isMatch(string, preparedQuery.core_lw, preparedQuery.core_up))) {
            return [];
          }
          string_lw = string.toLowerCase();
          matches = computeMatch(string, string_lw, preparedQuery);
          if (matches.length === 0) {
            return matches;
          }
          if (string.indexOf(pathSeparator) > -1) {
            baseMatches = basenameMatch(string, string_lw, preparedQuery, pathSeparator);
            matches = mergeMatches(matches, baseMatches);
          }
          return matches;
        };
        exports.wrap = function(string, query, options) {
          var matchIndex, matchPos, matchPositions, output, strPos, tagClass, tagClose, tagOpen, _ref1;
          if (options.wrap != null) {
            _ref1 = options.wrap, tagClass = _ref1.tagClass, tagOpen = _ref1.tagOpen, tagClose = _ref1.tagClose;
          }
          if (tagClass == null) {
            tagClass = "highlight";
          }
          if (tagOpen == null) {
            tagOpen = '<strong class="' + tagClass + '">';
          }
          if (tagClose == null) {
            tagClose = "</strong>";
          }
          if (string === query) {
            return tagOpen + string + tagClose;
          }
          matchPositions = match(string, query, options);
          if (matchPositions.length === 0) {
            return string;
          }
          output = "";
          matchIndex = -1;
          strPos = 0;
          while (++matchIndex < matchPositions.length) {
            matchPos = matchPositions[matchIndex];
            if (matchPos > strPos) {
              output += string.substring(strPos, matchPos);
              strPos = matchPos;
            }
            while (++matchIndex < matchPositions.length) {
              if (matchPositions[matchIndex] === matchPos + 1) {
                matchPos++;
              } else {
                matchIndex--;
                break;
              }
            }
            matchPos++;
            if (matchPos > strPos) {
              output += tagOpen;
              output += string.substring(strPos, matchPos);
              output += tagClose;
              strPos = matchPos;
            }
          }
          if (strPos <= string.length - 1) {
            output += string.substring(strPos);
          }
          return output;
        };
        basenameMatch = function(subject, subject_lw, preparedQuery, pathSeparator) {
          var basePos, depth, end;
          end = subject.length - 1;
          while (subject[end] === pathSeparator) {
            end--;
          }
          basePos = subject.lastIndexOf(pathSeparator, end);
          if (basePos === -1) {
            return [];
          }
          depth = preparedQuery.depth;
          while (depth-- > 0) {
            basePos = subject.lastIndexOf(pathSeparator, basePos - 1);
            if (basePos === -1) {
              return [];
            }
          }
          basePos++;
          end++;
          return computeMatch(subject.slice(basePos, end), subject_lw.slice(basePos, end), preparedQuery, basePos);
        };
        mergeMatches = function(a, b) {
          var ai, bj, i, j, m, n, out;
          m = a.length;
          n = b.length;
          if (n === 0) {
            return a.slice();
          }
          if (m === 0) {
            return b.slice();
          }
          i = -1;
          j = 0;
          bj = b[j];
          out = [];
          while (++i < m) {
            ai = a[i];
            while (bj <= ai && ++j < n) {
              if (bj < ai) {
                out.push(bj);
              }
              bj = b[j];
            }
            out.push(ai);
          }
          while (j < n) {
            out.push(b[j++]);
          }
          return out;
        };
        computeMatch = function(subject, subject_lw, preparedQuery, offset) {
          var DIAGONAL, LEFT, STOP, UP, acro_score, align, backtrack, csc_diag, csc_row, csc_score, i, j, m, matches, move, n, pos, query, query_lw, score, score_diag, score_row, score_up, si_lw, start, trace;
          if (offset == null) {
            offset = 0;
          }
          query = preparedQuery.query;
          query_lw = preparedQuery.query_lw;
          m = subject.length;
          n = query.length;
          acro_score = scoreAcronyms(subject, subject_lw, query, query_lw).score;
          score_row = new Array(n);
          csc_row = new Array(n);
          STOP = 0;
          UP = 1;
          LEFT = 2;
          DIAGONAL = 3;
          trace = new Array(m * n);
          pos = -1;
          j = -1;
          while (++j < n) {
            score_row[j] = 0;
            csc_row[j] = 0;
          }
          i = -1;
          while (++i < m) {
            score = 0;
            score_up = 0;
            csc_diag = 0;
            si_lw = subject_lw[i];
            j = -1;
            while (++j < n) {
              csc_score = 0;
              align = 0;
              score_diag = score_up;
              if (query_lw[j] === si_lw) {
                start = isWordStart(i, subject, subject_lw);
                csc_score = csc_diag > 0 ? csc_diag : scoreConsecutives(subject, subject_lw, query, query_lw, i, j, start);
                align = score_diag + scoreCharacter(i, j, start, acro_score, csc_score);
              }
              score_up = score_row[j];
              csc_diag = csc_row[j];
              if (score > score_up) {
                move = LEFT;
              } else {
                score = score_up;
                move = UP;
              }
              if (align > score) {
                score = align;
                move = DIAGONAL;
              } else {
                csc_score = 0;
              }
              score_row[j] = score;
              csc_row[j] = csc_score;
              trace[++pos] = score > 0 ? move : STOP;
            }
          }
          i = m - 1;
          j = n - 1;
          pos = i * n + j;
          backtrack = true;
          matches = [];
          while (backtrack && i >= 0 && j >= 0) {
            switch (trace[pos]) {
              case UP:
                i--;
                pos -= n;
                break;
              case LEFT:
                j--;
                pos--;
                break;
              case DIAGONAL:
                matches.push(i + offset);
                j--;
                i--;
                pos -= n + 1;
                break;
              default:
                backtrack = false;
            }
          }
          matches.reverse();
          return matches;
        };
      }).call(exports);
    }
  });

  // node_modules/fuzzaldrin-plus/lib/fuzzaldrin.js
  var require_fuzzaldrin = __commonJS({
    "node_modules/fuzzaldrin-plus/lib/fuzzaldrin.js"(exports, module) {
      (function() {
        var Query, defaultPathSeparator, filter2, matcher, parseOptions, pathScorer, preparedQueryCache, scorer;
        filter2 = require_filter();
        matcher = require_matcher();
        scorer = require_scorer();
        pathScorer = require_pathScorer();
        Query = require_query();
        preparedQueryCache = null;
        defaultPathSeparator = (typeof process !== "undefined" && process !== null ? process.platform : void 0) === "win32" ? "\\" : "/";
        module.exports = {
          filter: function(candidates, query, options) {
            if (options == null) {
              options = {};
            }
            if (!((query != null ? query.length : void 0) && (candidates != null ? candidates.length : void 0))) {
              return [];
            }
            options = parseOptions(options, query);
            return filter2(candidates, query, options);
          },
          score: function(string, query, options) {
            if (options == null) {
              options = {};
            }
            if (!((string != null ? string.length : void 0) && (query != null ? query.length : void 0))) {
              return 0;
            }
            options = parseOptions(options, query);
            if (options.usePathScoring) {
              return pathScorer.score(string, query, options);
            } else {
              return scorer.score(string, query, options);
            }
          },
          match: function(string, query, options) {
            var _i, _ref, _results;
            if (options == null) {
              options = {};
            }
            if (!string) {
              return [];
            }
            if (!query) {
              return [];
            }
            if (string === query) {
              return function() {
                _results = [];
                for (var _i2 = 0, _ref2 = string.length; 0 <= _ref2 ? _i2 < _ref2 : _i2 > _ref2; 0 <= _ref2 ? _i2++ : _i2--) {
                  _results.push(_i2);
                }
                return _results;
              }.apply(this);
            }
            options = parseOptions(options, query);
            return matcher.match(string, query, options);
          },
          wrap: function(string, query, options) {
            if (options == null) {
              options = {};
            }
            if (!string) {
              return [];
            }
            if (!query) {
              return [];
            }
            options = parseOptions(options, query);
            return matcher.wrap(string, query, options);
          },
          prepareQuery: function(query, options) {
            if (options == null) {
              options = {};
            }
            options = parseOptions(options, query);
            return options.preparedQuery;
          }
        };
        parseOptions = function(options, query) {
          if (options.allowErrors == null) {
            options.allowErrors = false;
          }
          if (options.usePathScoring == null) {
            options.usePathScoring = true;
          }
          if (options.useExtensionBonus == null) {
            options.useExtensionBonus = false;
          }
          if (options.pathSeparator == null) {
            options.pathSeparator = defaultPathSeparator;
          }
          if (options.optCharRegEx == null) {
            options.optCharRegEx = null;
          }
          if (options.wrap == null) {
            options.wrap = null;
          }
          if (options.preparedQuery == null) {
            options.preparedQuery = preparedQueryCache && preparedQueryCache.query === query ? preparedQueryCache : preparedQueryCache = new Query(query, options);
          }
          return options;
        };
      }).call(exports);
    }
  });

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
      var index = arr.indexOf(item);
      0 <= index && arr.splice(index, 1);
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
      var e_1, _a, e_2, _b;
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
                if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return))
                  _a.call(_parentage_1);
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
      var _a;
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
          (this._teardowns = (_a = this._teardowns) !== null && _a !== void 0 ? _a : []).push(teardown);
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
        var _a = context, errorThrown = _a.errorThrown, error = _a.error;
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
    function Observable11(subscribe) {
      if (subscribe) {
        this._subscribe = subscribe;
      }
    }
    Observable11.prototype.lift = function(operator) {
      var observable2 = new Observable11();
      observable2.source = this;
      observable2.operator = operator;
      return observable2;
    };
    Observable11.prototype.subscribe = function(observerOrNext, error, complete) {
      var _this = this;
      var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
      errorContext(function() {
        var _a = _this, operator = _a.operator, source = _a.source;
        subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
      });
      return subscriber;
    };
    Observable11.prototype._trySubscribe = function(sink) {
      try {
        return this._subscribe(sink);
      } catch (err) {
        sink.error(err);
      }
    };
    Observable11.prototype.forEach = function(next, promiseCtor) {
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
    Observable11.prototype._subscribe = function(subscriber) {
      var _a;
      return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable11.prototype[observable] = function() {
      return this;
    };
    Observable11.prototype.pipe = function() {
      var operations = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        operations[_i] = arguments[_i];
      }
      return pipeFromArray(operations)(this);
    };
    Observable11.prototype.toPromise = function(promiseCtor) {
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
    Observable11.create = function(subscribe) {
      return new Observable11(subscribe);
    };
    return Observable11;
  }();
  function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
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
      var _a;
      var closed = this.closed;
      _super.prototype.unsubscribe.call(this);
      !closed && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
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
    __extends(Subject2, _super);
    function Subject2() {
      var _this = _super.call(this) || this;
      _this.closed = false;
      _this.observers = [];
      _this.isStopped = false;
      _this.hasError = false;
      _this.thrownError = null;
      return _this;
    }
    Subject2.prototype.lift = function(operator) {
      var subject = new AnonymousSubject(this, this);
      subject.operator = operator;
      return subject;
    };
    Subject2.prototype._throwIfClosed = function() {
      if (this.closed) {
        throw new ObjectUnsubscribedError();
      }
    };
    Subject2.prototype.next = function(value) {
      var _this = this;
      errorContext(function() {
        var e_1, _a;
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
              if (copy_1_1 && !copy_1_1.done && (_a = copy_1.return))
                _a.call(copy_1);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
        }
      });
    };
    Subject2.prototype.error = function(err) {
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
    Subject2.prototype.complete = function() {
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
    Subject2.prototype.unsubscribe = function() {
      this.isStopped = this.closed = true;
      this.observers = null;
    };
    Object.defineProperty(Subject2.prototype, "observed", {
      get: function() {
        var _a;
        return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
      },
      enumerable: false,
      configurable: true
    });
    Subject2.prototype._trySubscribe = function(subscriber) {
      this._throwIfClosed();
      return _super.prototype._trySubscribe.call(this, subscriber);
    };
    Subject2.prototype._subscribe = function(subscriber) {
      this._throwIfClosed();
      this._checkFinalizedStatuses(subscriber);
      return this._innerSubscribe(subscriber);
    };
    Subject2.prototype._innerSubscribe = function(subscriber) {
      var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
      return hasError || isStopped ? EMPTY_SUBSCRIPTION : (observers.push(subscriber), new Subscription(function() {
        return arrRemove(observers, subscriber);
      }));
    };
    Subject2.prototype._checkFinalizedStatuses = function(subscriber) {
      var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
      if (hasError) {
        subscriber.error(thrownError);
      } else if (isStopped) {
        subscriber.complete();
      }
    };
    Subject2.prototype.asObservable = function() {
      var observable2 = new Observable();
      observable2.source = this;
      return observable2;
    };
    Subject2.create = function(destination, source) {
      return new AnonymousSubject(destination, source);
    };
    return Subject2;
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
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    AnonymousSubject2.prototype.error = function(err) {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    };
    AnonymousSubject2.prototype.complete = function() {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    AnonymousSubject2.prototype._subscribe = function(subscriber) {
      var _a, _b;
      return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
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
      var _a = this, isStopped = _a.isStopped, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow, _timestampProvider = _a._timestampProvider, _windowTime = _a._windowTime;
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
      var _a = this, _infiniteTimeWindow = _a._infiniteTimeWindow, _buffer = _a._buffer;
      var copy = _buffer.slice();
      for (var i = 0; i < copy.length && !subscriber.closed; i += _infiniteTimeWindow ? 1 : 2) {
        subscriber.next(copy[i]);
      }
      this._checkFinalizedStatuses(subscriber);
      return subscription;
    };
    ReplaySubject2.prototype._trimBuffer = function() {
      var _a = this, _bufferSize = _a._bufferSize, _timestampProvider = _a._timestampProvider, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow;
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
        var _a = this, id = _a.id, scheduler = _a.scheduler;
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
      var index = -1;
      action = action || actions.shift();
      var count = actions.length;
      do {
        if (error = action.execute(action.state, action.delay)) {
          break;
        }
      } while (++index < count && (action = actions.shift()));
      this._active = false;
      if (error) {
        while (++index < count && (action = actions.shift())) {
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
      var reader, _a, value, done;
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
            _a = _b.sent(), value = _a.value, done = _a.done;
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
      var e_1, _a;
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
          if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return))
            _a.call(iterable_1);
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
      process2(asyncIterable, subscriber).catch(function(err) {
        return subscriber.error(err);
      });
    });
  }
  function fromReadableStreamLike(readableStream) {
    return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
  }
  function process2(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_2, _a;
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
            if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return)))
              return [3, 8];
            return [4, _a.call(asyncIterable_1)];
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
  function executeSchedule(parentSubscription, scheduler, work, delay2, repeat) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    if (repeat === void 0) {
      repeat = false;
    }
    var scheduleSubscription = scheduler.schedule(function() {
      work();
      if (repeat) {
        parentSubscription.add(this.schedule(null, delay2));
      } else {
        this.unsubscribe();
      }
    }, delay2);
    parentSubscription.add(scheduleSubscription);
    if (!repeat) {
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
          var _a;
          var value;
          var done;
          try {
            _a = iterator2.next(), value = _a.value, done = _a.done;
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
      var index = 0;
      source.subscribe(new OperatorSubscriber(subscriber, function(value) {
        subscriber.next(project.call(thisArg, value, index++));
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
    var _a = argsArgArrayOrObject(args), observables = _a.args, keys = _a.keys;
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
    var index = 0;
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
      innerFrom(project(value, index++)).subscribe(new OperatorSubscriber(subscriber, function(innerValue) {
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
    var _a = __read(isEventTarget(target) ? eventTargetMethods.map(function(methodName) {
      return function(handler) {
        return target[methodName](eventName, handler, options);
      };
    }) : isNodeStyleEventEmitter(target) ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(target, eventName)) : isJQueryStyleEventEmitter(target) ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName)) : [], 2), add = _a[0], remove = _a[1];
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
      var index = 0;
      source.subscribe(new OperatorSubscriber(subscriber, function(value) {
        return predicate.call(thisArg, value, index++) && subscriber.next(value);
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
        var e_1, _a, e_2, _b;
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
            if (buffers_1_1 && !buffers_1_1.done && (_a = buffers_1.return))
              _a.call(buffers_1);
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
        var e_3, _a;
        try {
          for (var buffers_2 = __values(buffers), buffers_2_1 = buffers_2.next(); !buffers_2_1.done; buffers_2_1 = buffers_2.next()) {
            var buffer = buffers_2_1.value;
            subscriber.next(buffer);
          }
        } catch (e_3_1) {
          e_3 = { error: e_3_1 };
        } finally {
          try {
            if (buffers_2_1 && !buffers_2_1.done && (_a = buffers_2.return))
              _a.call(buffers_2);
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
    return mergeMap(function(value, index) {
      return delayDurationSelector(value, index).pipe(take(1), mapTo(value));
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

  // node_modules/rxjs/dist/esm5/internal/operators/share.js
  function share(options) {
    if (options === void 0) {
      options = {};
    }
    var _a = options.connector, connector = _a === void 0 ? function() {
      return new Subject();
    } : _a, _b = options.resetOnError, resetOnError = _b === void 0 ? true : _b, _c = options.resetOnComplete, resetOnComplete = _c === void 0 ? true : _c, _d = options.resetOnRefCountZero, resetOnRefCountZero = _d === void 0 ? true : _d;
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
    var _a, _b;
    var bufferSize;
    var refCount = false;
    if (configOrBufferSize && typeof configOrBufferSize === "object") {
      bufferSize = (_a = configOrBufferSize.bufferSize) !== null && _a !== void 0 ? _a : Infinity;
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
      var index = 0;
      var isComplete = false;
      var checkComplete = function() {
        return isComplete && !innerSubscriber && subscriber.complete();
      };
      source.subscribe(new OperatorSubscriber(subscriber, function(value) {
        innerSubscriber === null || innerSubscriber === void 0 ? void 0 : innerSubscriber.unsubscribe();
        var innerIndex = 0;
        var outerIndex = index++;
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

  // node_modules/rxjs/dist/esm5/internal/operators/tap.js
  function tap(observerOrNext, error, complete) {
    var tapObserver = isFunction(observerOrNext) || error || complete ? { next: observerOrNext, error, complete } : observerOrNext;
    return tapObserver ? operate(function(source, subscriber) {
      var _a;
      (_a = tapObserver.subscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
      var isUnsub = true;
      source.subscribe(new OperatorSubscriber(subscriber, function(value) {
        var _a2;
        (_a2 = tapObserver.next) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver, value);
        subscriber.next(value);
      }, function() {
        var _a2;
        isUnsub = false;
        (_a2 = tapObserver.complete) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver);
        subscriber.complete();
      }, function(err) {
        var _a2;
        isUnsub = false;
        (_a2 = tapObserver.error) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver, err);
        subscriber.error(err);
      }, function() {
        var _a2, _b;
        if (isUnsub) {
          (_a2 = tapObserver.unsubscribe) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver);
        }
        (_b = tapObserver.finalize) === null || _b === void 0 ? void 0 : _b.call(tapObserver);
      }));
    }) : identity;
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
  function watchElementFocus(el) {
    return merge(fromEvent(el, "focus"), fromEvent(el, "blur")).pipe(map(({ type }) => type === "focus"), startWith(el === getActiveElement()));
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

  // src/assets/javascripts/browser/location/_/index.ts
  function getLocation() {
    return new URL(location.href);
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
  function round(value) {
    if (value > 999) {
      const digits = +((value - 950) % 1e3 > 99);
      return `${((value + 1e-6) / 1e3).toFixed(digits)}k`;
    } else {
      return value.toString();
    }
  }

  // src/assets/javascripts/browser/request/index.ts
  function request(url, options = { credentials: "same-origin" }) {
    return from(fetch(`${url}`, options)).pipe(filter((res) => res.status === 200), catchError(() => EMPTY));
  }
  function requestJSON(url, options) {
    return request(url, options).pipe(switchMap((res) => res.json()), shareReplay(1));
  }

  // src/overrides/assets/javascripts/components/_/index.ts
  function getComponentElement(type, node = document) {
    return getElement(`[data-mdx-component=${type}]`, node);
  }
  function getComponentElements(type, node = document) {
    return getElements(`[data-mdx-component=${type}]`, node);
  }

  // src/assets/javascripts/_/index.ts
  var script = getElement("#__config");
  var config2 = JSON.parse(script.textContent);
  config2.base = `${new URL(config2.base, getLocation())}`;
  function configuration() {
    return config2;
  }
  function translation(key, value) {
    return typeof value !== "undefined" ? config2.translations[key].replace("#", value.toString()) : config2.translations[key];
  }

  // src/overrides/assets/javascripts/components/iconsearch/query/index.ts
  function mountIconSearchQuery(el) {
    const focus$ = watchElementFocus(el);
    const value$ = merge(fromEvent(el, "keyup"), fromEvent(el, "focus").pipe(delay(1))).pipe(map(() => el.value), distinctUntilChanged());
    focus$.pipe(filter((active) => !active), withLatestFrom(value$)).subscribe(([, value]) => {
      const path = document.location.pathname;
      if (value.length)
        ga("send", "pageview", `${path}?q=[icon]+${value}`);
    });
    return combineLatest([value$, focus$]).pipe(map(([value, focus]) => ({ ref: el, value, focus })));
  }

  // src/overrides/assets/javascripts/components/iconsearch/result/index.ts
  var import_fuzzaldrin_plus2 = __toModule(require_fuzzaldrin());

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

  // src/overrides/assets/javascripts/templates/iconsearch/index.tsx
  var import_fuzzaldrin_plus = __toModule(require_fuzzaldrin());
  function highlight(icon, query) {
    return (0, import_fuzzaldrin_plus.wrap)(icon.shortcode, query, {
      wrap: {
        tagOpen: "<b>",
        tagClose: "</b>"
      }
    });
  }
  function renderIconSearchResult(icon, query) {
    return /* @__PURE__ */ h("li", {
      class: "mdx-iconsearch-result__item"
    }, /* @__PURE__ */ h("span", {
      class: "twemoji"
    }, /* @__PURE__ */ h("img", {
      src: icon.url
    })), /* @__PURE__ */ h("button", {
      class: "md-clipboard--inline",
      title: translation("clipboard.copy"),
      "data-clipboard-text": `:${icon.shortcode}:`
    }, /* @__PURE__ */ h("code", null, `:${highlight(icon, query)}:`)));
  }

  // src/overrides/assets/javascripts/templates/sponsorship/index.tsx
  function renderPublicSponsor(user) {
    const title = `@${user.name}`;
    return /* @__PURE__ */ h("a", {
      href: user.url,
      title,
      class: "mdx-sponsorship__item"
    }, /* @__PURE__ */ h("img", {
      src: user.image
    }));
  }
  function renderPrivateSponsor(count) {
    return /* @__PURE__ */ h("a", {
      href: "https://github.com/sponsors/squidfunk",
      class: "mdx-sponsorship__item mdx-sponsorship__item--private"
    }, "+", count);
  }

  // src/overrides/assets/javascripts/components/iconsearch/result/index.ts
  function watchIconSearchResult(_el, { index$, query$ }) {
    return combineLatest([
      query$.pipe(distinctUntilKeyChanged("value")),
      index$.pipe(map(({ icons, emojis }) => [
        ...Object.keys(icons.data),
        ...Object.keys(emojis.data)
      ]))
    ]).pipe(map(([{ value }, data]) => (0, import_fuzzaldrin_plus2.filter)(data, value)), switchMap((shortcodes) => index$.pipe(map(({ icons, emojis }) => ({
      data: shortcodes.map((shortcode) => {
        const category = shortcode in icons.data ? icons : emojis;
        return {
          shortcode,
          url: [
            category.base,
            category.data[shortcode]
          ].join("")
        };
      })
    })))));
  }
  function mountIconSearchResult(el, { index$, query$ }) {
    const internal$ = new Subject();
    const boundary$ = watchElementBoundary(el).pipe(filter(Boolean));
    const meta = getElement(":scope > :first-child", el);
    internal$.pipe(observeOn(animationFrameScheduler), withLatestFrom(query$)).subscribe(([{ data }, { value }]) => {
      if (value)
        setSearchResultMeta(meta, data.length);
      else
        resetSearchResultMeta(meta);
    });
    const list = getElement(":scope > :last-child", el);
    internal$.pipe(observeOn(animationFrameScheduler), tap(() => resetSearchResultList(list)), switchMap(({ data }) => merge(of(...data.slice(0, 10)), of(...data.slice(10)).pipe(bufferCount(10), zipWith(boundary$), switchMap(([chunk]) => of(...chunk))))), withLatestFrom(query$)).subscribe(([result, { value }]) => {
      addToSearchResultList(list, renderIconSearchResult(result, value));
    });
    return watchIconSearchResult(el, { query$, index$ }).pipe(tap((state) => internal$.next(state)), finalize(() => internal$.complete()), map((state) => __spreadValues({ ref: el }, state)));
  }

  // src/overrides/assets/javascripts/components/iconsearch/_/index.ts
  function mountIconSearch(el) {
    const config3 = configuration();
    const index$ = requestJSON(new URL("overrides/assets/javascripts/iconsearch_index.json", config3.base));
    const query = getComponentElement("iconsearch-query", el);
    const result = getComponentElement("iconsearch-result", el);
    const query$ = mountIconSearchQuery(query);
    const result$ = mountIconSearchResult(result, { index$, query$ });
    return merge(query$, result$);
  }

  // src/overrides/assets/javascripts/components/sponsorship/index.ts
  function mountSponsorship(el) {
    const sponsorship$ = requestJSON("https://3if8u9o552.execute-api.us-east-1.amazonaws.com/_/");
    const count = getComponentElement("sponsorship-count");
    const total = getComponentElement("sponsorship-total");
    sponsorship$.subscribe((sponsorship) => {
      el.removeAttribute("hidden");
      const list = getElement(":scope > :first-child", el);
      for (const sponsor of sponsorship.sponsors)
        if (sponsor.type === "public")
          list.appendChild(renderPublicSponsor(sponsor.user));
      list.appendChild(renderPrivateSponsor(sponsorship.sponsors.filter(({ type }) => type === "private").length));
      count.innerText = `${sponsorship.sponsors.length}`;
      total.innerText = `$ ${sponsorship.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} a month`;
    });
    return sponsorship$.pipe(map((state) => __spreadValues({ ref: el }, state)));
  }

  // src/overrides/assets/javascripts/integrations/analytics/index.ts
  function setupAnalytics() {
    const { origin } = new URL(location.href);
    fromEvent(document.body, "click").subscribe((ev) => {
      if (ev.target instanceof HTMLElement) {
        const el = ev.target.closest("a");
        if (el && el.origin !== origin)
          ga("send", "event", "outbound", "click", el.href);
      }
    });
  }

  // src/overrides/assets/javascripts/bundle.ts
  setupAnalytics();
  var component$ = document$.pipe(switchMap(() => merge(...getComponentElements("iconsearch").map((el) => mountIconSearch(el)), ...getComponentElements("sponsorship").map((el) => mountSponsorship(el)))));
  component$.subscribe();
})();
//# sourceMappingURL=bundle.js.map

