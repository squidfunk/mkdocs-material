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
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // node_modules/lunr/lunr.js
  var require_lunr = __commonJS({
    "node_modules/lunr/lunr.js"(exports, module) {
      /**
       * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 2.3.9
       * Copyright (C) 2020 Oliver Nightingale
       * @license MIT
       */
      (function() {
        var lunr3 = function(config) {
          var builder = new lunr3.Builder();
          builder.pipeline.add(lunr3.trimmer, lunr3.stopWordFilter, lunr3.stemmer);
          builder.searchPipeline.add(lunr3.stemmer);
          config.call(builder, builder);
          return builder.build();
        };
        lunr3.version = "2.3.9";
        /*!
         * lunr.utils
         * Copyright (C) 2020 Oliver Nightingale
         */
        lunr3.utils = {};
        lunr3.utils.warn = function(global) {
          return function(message) {
            if (global.console && console.warn) {
              console.warn(message);
            }
          };
        }(this);
        lunr3.utils.asString = function(obj) {
          if (obj === void 0 || obj === null) {
            return "";
          } else {
            return obj.toString();
          }
        };
        lunr3.utils.clone = function(obj) {
          if (obj === null || obj === void 0) {
            return obj;
          }
          var clone = Object.create(null), keys = Object.keys(obj);
          for (var i = 0; i < keys.length; i++) {
            var key = keys[i], val = obj[key];
            if (Array.isArray(val)) {
              clone[key] = val.slice();
              continue;
            }
            if (typeof val === "string" || typeof val === "number" || typeof val === "boolean") {
              clone[key] = val;
              continue;
            }
            throw new TypeError("clone is not deep and does not support nested objects");
          }
          return clone;
        };
        lunr3.FieldRef = function(docRef, fieldName, stringValue) {
          this.docRef = docRef;
          this.fieldName = fieldName;
          this._stringValue = stringValue;
        };
        lunr3.FieldRef.joiner = "/";
        lunr3.FieldRef.fromString = function(s) {
          var n = s.indexOf(lunr3.FieldRef.joiner);
          if (n === -1) {
            throw "malformed field ref string";
          }
          var fieldRef = s.slice(0, n), docRef = s.slice(n + 1);
          return new lunr3.FieldRef(docRef, fieldRef, s);
        };
        lunr3.FieldRef.prototype.toString = function() {
          if (this._stringValue == void 0) {
            this._stringValue = this.fieldName + lunr3.FieldRef.joiner + this.docRef;
          }
          return this._stringValue;
        };
        /*!
         * lunr.Set
         * Copyright (C) 2020 Oliver Nightingale
         */
        lunr3.Set = function(elements) {
          this.elements = Object.create(null);
          if (elements) {
            this.length = elements.length;
            for (var i = 0; i < this.length; i++) {
              this.elements[elements[i]] = true;
            }
          } else {
            this.length = 0;
          }
        };
        lunr3.Set.complete = {
          intersect: function(other) {
            return other;
          },
          union: function() {
            return this;
          },
          contains: function() {
            return true;
          }
        };
        lunr3.Set.empty = {
          intersect: function() {
            return this;
          },
          union: function(other) {
            return other;
          },
          contains: function() {
            return false;
          }
        };
        lunr3.Set.prototype.contains = function(object) {
          return !!this.elements[object];
        };
        lunr3.Set.prototype.intersect = function(other) {
          var a, b, elements, intersection = [];
          if (other === lunr3.Set.complete) {
            return this;
          }
          if (other === lunr3.Set.empty) {
            return other;
          }
          if (this.length < other.length) {
            a = this;
            b = other;
          } else {
            a = other;
            b = this;
          }
          elements = Object.keys(a.elements);
          for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (element in b.elements) {
              intersection.push(element);
            }
          }
          return new lunr3.Set(intersection);
        };
        lunr3.Set.prototype.union = function(other) {
          if (other === lunr3.Set.complete) {
            return lunr3.Set.complete;
          }
          if (other === lunr3.Set.empty) {
            return this;
          }
          return new lunr3.Set(Object.keys(this.elements).concat(Object.keys(other.elements)));
        };
        lunr3.idf = function(posting, documentCount) {
          var documentsWithTerm = 0;
          for (var fieldName in posting) {
            if (fieldName == "_index")
              continue;
            documentsWithTerm += Object.keys(posting[fieldName]).length;
          }
          var x = (documentCount - documentsWithTerm + 0.5) / (documentsWithTerm + 0.5);
          return Math.log(1 + Math.abs(x));
        };
        lunr3.Token = function(str, metadata) {
          this.str = str || "";
          this.metadata = metadata || {};
        };
        lunr3.Token.prototype.toString = function() {
          return this.str;
        };
        lunr3.Token.prototype.update = function(fn) {
          this.str = fn(this.str, this.metadata);
          return this;
        };
        lunr3.Token.prototype.clone = function(fn) {
          fn = fn || function(s) {
            return s;
          };
          return new lunr3.Token(fn(this.str, this.metadata), this.metadata);
        };
        /*!
         * lunr.tokenizer
         * Copyright (C) 2020 Oliver Nightingale
         */
        lunr3.tokenizer = function(obj, metadata) {
          if (obj == null || obj == void 0) {
            return [];
          }
          if (Array.isArray(obj)) {
            return obj.map(function(t) {
              return new lunr3.Token(lunr3.utils.asString(t).toLowerCase(), lunr3.utils.clone(metadata));
            });
          }
          var str = obj.toString().toLowerCase(), len = str.length, tokens = [];
          for (var sliceEnd = 0, sliceStart = 0; sliceEnd <= len; sliceEnd++) {
            var char = str.charAt(sliceEnd), sliceLength = sliceEnd - sliceStart;
            if (char.match(lunr3.tokenizer.separator) || sliceEnd == len) {
              if (sliceLength > 0) {
                var tokenMetadata = lunr3.utils.clone(metadata) || {};
                tokenMetadata["position"] = [sliceStart, sliceLength];
                tokenMetadata["index"] = tokens.length;
                tokens.push(new lunr3.Token(str.slice(sliceStart, sliceEnd), tokenMetadata));
              }
              sliceStart = sliceEnd + 1;
            }
          }
          return tokens;
        };
        lunr3.tokenizer.separator = /[\s\-]+/;
        /*!
         * lunr.Pipeline
         * Copyright (C) 2020 Oliver Nightingale
         */
        lunr3.Pipeline = function() {
          this._stack = [];
        };
        lunr3.Pipeline.registeredFunctions = Object.create(null);
        lunr3.Pipeline.registerFunction = function(fn, label) {
          if (label in this.registeredFunctions) {
            lunr3.utils.warn("Overwriting existing registered function: " + label);
          }
          fn.label = label;
          lunr3.Pipeline.registeredFunctions[fn.label] = fn;
        };
        lunr3.Pipeline.warnIfFunctionNotRegistered = function(fn) {
          var isRegistered = fn.label && fn.label in this.registeredFunctions;
          if (!isRegistered) {
            lunr3.utils.warn("Function is not registered with pipeline. This may cause problems when serialising the index.\n", fn);
          }
        };
        lunr3.Pipeline.load = function(serialised) {
          var pipeline = new lunr3.Pipeline();
          serialised.forEach(function(fnName) {
            var fn = lunr3.Pipeline.registeredFunctions[fnName];
            if (fn) {
              pipeline.add(fn);
            } else {
              throw new Error("Cannot load unregistered function: " + fnName);
            }
          });
          return pipeline;
        };
        lunr3.Pipeline.prototype.add = function() {
          var fns = Array.prototype.slice.call(arguments);
          fns.forEach(function(fn) {
            lunr3.Pipeline.warnIfFunctionNotRegistered(fn);
            this._stack.push(fn);
          }, this);
        };
        lunr3.Pipeline.prototype.after = function(existingFn, newFn) {
          lunr3.Pipeline.warnIfFunctionNotRegistered(newFn);
          var pos = this._stack.indexOf(existingFn);
          if (pos == -1) {
            throw new Error("Cannot find existingFn");
          }
          pos = pos + 1;
          this._stack.splice(pos, 0, newFn);
        };
        lunr3.Pipeline.prototype.before = function(existingFn, newFn) {
          lunr3.Pipeline.warnIfFunctionNotRegistered(newFn);
          var pos = this._stack.indexOf(existingFn);
          if (pos == -1) {
            throw new Error("Cannot find existingFn");
          }
          this._stack.splice(pos, 0, newFn);
        };
        lunr3.Pipeline.prototype.remove = function(fn) {
          var pos = this._stack.indexOf(fn);
          if (pos == -1) {
            return;
          }
          this._stack.splice(pos, 1);
        };
        lunr3.Pipeline.prototype.run = function(tokens) {
          var stackLength = this._stack.length;
          for (var i = 0; i < stackLength; i++) {
            var fn = this._stack[i];
            var memo = [];
            for (var j = 0; j < tokens.length; j++) {
              var result = fn(tokens[j], j, tokens);
              if (result === null || result === void 0 || result === "")
                continue;
              if (Array.isArray(result)) {
                for (var k = 0; k < result.length; k++) {
                  memo.push(result[k]);
                }
              } else {
                memo.push(result);
              }
            }
            tokens = memo;
          }
          return tokens;
        };
        lunr3.Pipeline.prototype.runString = function(str, metadata) {
          var token = new lunr3.Token(str, metadata);
          return this.run([token]).map(function(t) {
            return t.toString();
          });
        };
        lunr3.Pipeline.prototype.reset = function() {
          this._stack = [];
        };
        lunr3.Pipeline.prototype.toJSON = function() {
          return this._stack.map(function(fn) {
            lunr3.Pipeline.warnIfFunctionNotRegistered(fn);
            return fn.label;
          });
        };
        /*!
         * lunr.Vector
         * Copyright (C) 2020 Oliver Nightingale
         */
        lunr3.Vector = function(elements) {
          this._magnitude = 0;
          this.elements = elements || [];
        };
        lunr3.Vector.prototype.positionForIndex = function(index2) {
          if (this.elements.length == 0) {
            return 0;
          }
          var start = 0, end = this.elements.length / 2, sliceLength = end - start, pivotPoint = Math.floor(sliceLength / 2), pivotIndex = this.elements[pivotPoint * 2];
          while (sliceLength > 1) {
            if (pivotIndex < index2) {
              start = pivotPoint;
            }
            if (pivotIndex > index2) {
              end = pivotPoint;
            }
            if (pivotIndex == index2) {
              break;
            }
            sliceLength = end - start;
            pivotPoint = start + Math.floor(sliceLength / 2);
            pivotIndex = this.elements[pivotPoint * 2];
          }
          if (pivotIndex == index2) {
            return pivotPoint * 2;
          }
          if (pivotIndex > index2) {
            return pivotPoint * 2;
          }
          if (pivotIndex < index2) {
            return (pivotPoint + 1) * 2;
          }
        };
        lunr3.Vector.prototype.insert = function(insertIdx, val) {
          this.upsert(insertIdx, val, function() {
            throw "duplicate index";
          });
        };
        lunr3.Vector.prototype.upsert = function(insertIdx, val, fn) {
          this._magnitude = 0;
          var position = this.positionForIndex(insertIdx);
          if (this.elements[position] == insertIdx) {
            this.elements[position + 1] = fn(this.elements[position + 1], val);
          } else {
            this.elements.splice(position, 0, insertIdx, val);
          }
        };
        lunr3.Vector.prototype.magnitude = function() {
          if (this._magnitude)
            return this._magnitude;
          var sumOfSquares = 0, elementsLength = this.elements.length;
          for (var i = 1; i < elementsLength; i += 2) {
            var val = this.elements[i];
            sumOfSquares += val * val;
          }
          return this._magnitude = Math.sqrt(sumOfSquares);
        };
        lunr3.Vector.prototype.dot = function(otherVector) {
          var dotProduct = 0, a = this.elements, b = otherVector.elements, aLen = a.length, bLen = b.length, aVal = 0, bVal = 0, i = 0, j = 0;
          while (i < aLen && j < bLen) {
            aVal = a[i], bVal = b[j];
            if (aVal < bVal) {
              i += 2;
            } else if (aVal > bVal) {
              j += 2;
            } else if (aVal == bVal) {
              dotProduct += a[i + 1] * b[j + 1];
              i += 2;
              j += 2;
            }
          }
          return dotProduct;
        };
        lunr3.Vector.prototype.similarity = function(otherVector) {
          return this.dot(otherVector) / this.magnitude() || 0;
        };
        lunr3.Vector.prototype.toArray = function() {
          var output = new Array(this.elements.length / 2);
          for (var i = 1, j = 0; i < this.elements.length; i += 2, j++) {
            output[j] = this.elements[i];
          }
          return output;
        };
        lunr3.Vector.prototype.toJSON = function() {
          return this.elements;
        };
        /*!
         * lunr.stemmer
         * Copyright (C) 2020 Oliver Nightingale
         * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
         */
        lunr3.stemmer = function() {
          var step2list = {
            "ational": "ate",
            "tional": "tion",
            "enci": "ence",
            "anci": "ance",
            "izer": "ize",
            "bli": "ble",
            "alli": "al",
            "entli": "ent",
            "eli": "e",
            "ousli": "ous",
            "ization": "ize",
            "ation": "ate",
            "ator": "ate",
            "alism": "al",
            "iveness": "ive",
            "fulness": "ful",
            "ousness": "ous",
            "aliti": "al",
            "iviti": "ive",
            "biliti": "ble",
            "logi": "log"
          }, step3list = {
            "icate": "ic",
            "ative": "",
            "alize": "al",
            "iciti": "ic",
            "ical": "ic",
            "ful": "",
            "ness": ""
          }, c = "[^aeiou]", v = "[aeiouy]", C = c + "[^aeiouy]*", V = v + "[aeiou]*", mgr0 = "^(" + C + ")?" + V + C, meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$", mgr1 = "^(" + C + ")?" + V + C + V + C, s_v = "^(" + C + ")?" + v;
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
          var porterStemmer = function porterStemmer2(w) {
            var stem, suffix, firstch, re, re2, re3, re4;
            if (w.length < 3) {
              return w;
            }
            firstch = w.substr(0, 1);
            if (firstch == "y") {
              w = firstch.toUpperCase() + w.substr(1);
            }
            re = re_1a;
            re2 = re2_1a;
            if (re.test(w)) {
              w = w.replace(re, "$1$2");
            } else if (re2.test(w)) {
              w = w.replace(re2, "$1$2");
            }
            re = re_1b;
            re2 = re2_1b;
            if (re.test(w)) {
              var fp = re.exec(w);
              re = re_mgr0;
              if (re.test(fp[1])) {
                re = re_1b_2;
                w = w.replace(re, "");
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
                if (re2.test(w)) {
                  w = w + "e";
                } else if (re3.test(w)) {
                  re = re_1b_2;
                  w = w.replace(re, "");
                } else if (re4.test(w)) {
                  w = w + "e";
                }
              }
            }
            re = re_1c;
            if (re.test(w)) {
              var fp = re.exec(w);
              stem = fp[1];
              w = stem + "i";
            }
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
            re = re_5;
            if (re.test(w)) {
              var fp = re.exec(w);
              stem = fp[1];
              re = re_mgr1;
              re2 = re_meq1;
              re3 = re3_5;
              if (re.test(stem) || re2.test(stem) && !re3.test(stem)) {
                w = stem;
              }
            }
            re = re_5_1;
            re2 = re_mgr1;
            if (re.test(w) && re2.test(w)) {
              re = re_1b_2;
              w = w.replace(re, "");
            }
            if (firstch == "y") {
              w = firstch.toLowerCase() + w.substr(1);
            }
            return w;
          };
          return function(token) {
            return token.update(porterStemmer);
          };
        }();
        lunr3.Pipeline.registerFunction(lunr3.stemmer, "stemmer");
        /*!
         * lunr.stopWordFilter
         * Copyright (C) 2020 Oliver Nightingale
         */
        lunr3.generateStopWordFilter = function(stopWords) {
          var words = stopWords.reduce(function(memo, stopWord) {
            memo[stopWord] = stopWord;
            return memo;
          }, {});
          return function(token) {
            if (token && words[token.toString()] !== token.toString())
              return token;
          };
        };
        lunr3.stopWordFilter = lunr3.generateStopWordFilter([
          "a",
          "able",
          "about",
          "across",
          "after",
          "all",
          "almost",
          "also",
          "am",
          "among",
          "an",
          "and",
          "any",
          "are",
          "as",
          "at",
          "be",
          "because",
          "been",
          "but",
          "by",
          "can",
          "cannot",
          "could",
          "dear",
          "did",
          "do",
          "does",
          "either",
          "else",
          "ever",
          "every",
          "for",
          "from",
          "get",
          "got",
          "had",
          "has",
          "have",
          "he",
          "her",
          "hers",
          "him",
          "his",
          "how",
          "however",
          "i",
          "if",
          "in",
          "into",
          "is",
          "it",
          "its",
          "just",
          "least",
          "let",
          "like",
          "likely",
          "may",
          "me",
          "might",
          "most",
          "must",
          "my",
          "neither",
          "no",
          "nor",
          "not",
          "of",
          "off",
          "often",
          "on",
          "only",
          "or",
          "other",
          "our",
          "own",
          "rather",
          "said",
          "say",
          "says",
          "she",
          "should",
          "since",
          "so",
          "some",
          "than",
          "that",
          "the",
          "their",
          "them",
          "then",
          "there",
          "these",
          "they",
          "this",
          "tis",
          "to",
          "too",
          "twas",
          "us",
          "wants",
          "was",
          "we",
          "were",
          "what",
          "when",
          "where",
          "which",
          "while",
          "who",
          "whom",
          "why",
          "will",
          "with",
          "would",
          "yet",
          "you",
          "your"
        ]);
        lunr3.Pipeline.registerFunction(lunr3.stopWordFilter, "stopWordFilter");
        /*!
         * lunr.trimmer
         * Copyright (C) 2020 Oliver Nightingale
         */
        lunr3.trimmer = function(token) {
          return token.update(function(s) {
            return s.replace(/^\W+/, "").replace(/\W+$/, "");
          });
        };
        lunr3.Pipeline.registerFunction(lunr3.trimmer, "trimmer");
        /*!
         * lunr.TokenSet
         * Copyright (C) 2020 Oliver Nightingale
         */
        lunr3.TokenSet = function() {
          this.final = false;
          this.edges = {};
          this.id = lunr3.TokenSet._nextId;
          lunr3.TokenSet._nextId += 1;
        };
        lunr3.TokenSet._nextId = 1;
        lunr3.TokenSet.fromArray = function(arr) {
          var builder = new lunr3.TokenSet.Builder();
          for (var i = 0, len = arr.length; i < len; i++) {
            builder.insert(arr[i]);
          }
          builder.finish();
          return builder.root;
        };
        lunr3.TokenSet.fromClause = function(clause) {
          if ("editDistance" in clause) {
            return lunr3.TokenSet.fromFuzzyString(clause.term, clause.editDistance);
          } else {
            return lunr3.TokenSet.fromString(clause.term);
          }
        };
        lunr3.TokenSet.fromFuzzyString = function(str, editDistance) {
          var root = new lunr3.TokenSet();
          var stack = [{
            node: root,
            editsRemaining: editDistance,
            str
          }];
          while (stack.length) {
            var frame = stack.pop();
            if (frame.str.length > 0) {
              var char = frame.str.charAt(0), noEditNode;
              if (char in frame.node.edges) {
                noEditNode = frame.node.edges[char];
              } else {
                noEditNode = new lunr3.TokenSet();
                frame.node.edges[char] = noEditNode;
              }
              if (frame.str.length == 1) {
                noEditNode.final = true;
              }
              stack.push({
                node: noEditNode,
                editsRemaining: frame.editsRemaining,
                str: frame.str.slice(1)
              });
            }
            if (frame.editsRemaining == 0) {
              continue;
            }
            if ("*" in frame.node.edges) {
              var insertionNode = frame.node.edges["*"];
            } else {
              var insertionNode = new lunr3.TokenSet();
              frame.node.edges["*"] = insertionNode;
            }
            if (frame.str.length == 0) {
              insertionNode.final = true;
            }
            stack.push({
              node: insertionNode,
              editsRemaining: frame.editsRemaining - 1,
              str: frame.str
            });
            if (frame.str.length > 1) {
              stack.push({
                node: frame.node,
                editsRemaining: frame.editsRemaining - 1,
                str: frame.str.slice(1)
              });
            }
            if (frame.str.length == 1) {
              frame.node.final = true;
            }
            if (frame.str.length >= 1) {
              if ("*" in frame.node.edges) {
                var substitutionNode = frame.node.edges["*"];
              } else {
                var substitutionNode = new lunr3.TokenSet();
                frame.node.edges["*"] = substitutionNode;
              }
              if (frame.str.length == 1) {
                substitutionNode.final = true;
              }
              stack.push({
                node: substitutionNode,
                editsRemaining: frame.editsRemaining - 1,
                str: frame.str.slice(1)
              });
            }
            if (frame.str.length > 1) {
              var charA = frame.str.charAt(0), charB = frame.str.charAt(1), transposeNode;
              if (charB in frame.node.edges) {
                transposeNode = frame.node.edges[charB];
              } else {
                transposeNode = new lunr3.TokenSet();
                frame.node.edges[charB] = transposeNode;
              }
              if (frame.str.length == 1) {
                transposeNode.final = true;
              }
              stack.push({
                node: transposeNode,
                editsRemaining: frame.editsRemaining - 1,
                str: charA + frame.str.slice(2)
              });
            }
          }
          return root;
        };
        lunr3.TokenSet.fromString = function(str) {
          var node = new lunr3.TokenSet(), root = node;
          for (var i = 0, len = str.length; i < len; i++) {
            var char = str[i], final = i == len - 1;
            if (char == "*") {
              node.edges[char] = node;
              node.final = final;
            } else {
              var next = new lunr3.TokenSet();
              next.final = final;
              node.edges[char] = next;
              node = next;
            }
          }
          return root;
        };
        lunr3.TokenSet.prototype.toArray = function() {
          var words = [];
          var stack = [{
            prefix: "",
            node: this
          }];
          while (stack.length) {
            var frame = stack.pop(), edges = Object.keys(frame.node.edges), len = edges.length;
            if (frame.node.final) {
              frame.prefix.charAt(0);
              words.push(frame.prefix);
            }
            for (var i = 0; i < len; i++) {
              var edge = edges[i];
              stack.push({
                prefix: frame.prefix.concat(edge),
                node: frame.node.edges[edge]
              });
            }
          }
          return words;
        };
        lunr3.TokenSet.prototype.toString = function() {
          if (this._str) {
            return this._str;
          }
          var str = this.final ? "1" : "0", labels = Object.keys(this.edges).sort(), len = labels.length;
          for (var i = 0; i < len; i++) {
            var label = labels[i], node = this.edges[label];
            str = str + label + node.id;
          }
          return str;
        };
        lunr3.TokenSet.prototype.intersect = function(b) {
          var output = new lunr3.TokenSet(), frame = void 0;
          var stack = [{
            qNode: b,
            output,
            node: this
          }];
          while (stack.length) {
            frame = stack.pop();
            var qEdges = Object.keys(frame.qNode.edges), qLen = qEdges.length, nEdges = Object.keys(frame.node.edges), nLen = nEdges.length;
            for (var q = 0; q < qLen; q++) {
              var qEdge = qEdges[q];
              for (var n = 0; n < nLen; n++) {
                var nEdge = nEdges[n];
                if (nEdge == qEdge || qEdge == "*") {
                  var node = frame.node.edges[nEdge], qNode = frame.qNode.edges[qEdge], final = node.final && qNode.final, next = void 0;
                  if (nEdge in frame.output.edges) {
                    next = frame.output.edges[nEdge];
                    next.final = next.final || final;
                  } else {
                    next = new lunr3.TokenSet();
                    next.final = final;
                    frame.output.edges[nEdge] = next;
                  }
                  stack.push({
                    qNode,
                    output: next,
                    node
                  });
                }
              }
            }
          }
          return output;
        };
        lunr3.TokenSet.Builder = function() {
          this.previousWord = "";
          this.root = new lunr3.TokenSet();
          this.uncheckedNodes = [];
          this.minimizedNodes = {};
        };
        lunr3.TokenSet.Builder.prototype.insert = function(word) {
          var node, commonPrefix = 0;
          if (word < this.previousWord) {
            throw new Error("Out of order word insertion");
          }
          for (var i = 0; i < word.length && i < this.previousWord.length; i++) {
            if (word[i] != this.previousWord[i])
              break;
            commonPrefix++;
          }
          this.minimize(commonPrefix);
          if (this.uncheckedNodes.length == 0) {
            node = this.root;
          } else {
            node = this.uncheckedNodes[this.uncheckedNodes.length - 1].child;
          }
          for (var i = commonPrefix; i < word.length; i++) {
            var nextNode = new lunr3.TokenSet(), char = word[i];
            node.edges[char] = nextNode;
            this.uncheckedNodes.push({
              parent: node,
              char,
              child: nextNode
            });
            node = nextNode;
          }
          node.final = true;
          this.previousWord = word;
        };
        lunr3.TokenSet.Builder.prototype.finish = function() {
          this.minimize(0);
        };
        lunr3.TokenSet.Builder.prototype.minimize = function(downTo) {
          for (var i = this.uncheckedNodes.length - 1; i >= downTo; i--) {
            var node = this.uncheckedNodes[i], childKey = node.child.toString();
            if (childKey in this.minimizedNodes) {
              node.parent.edges[node.char] = this.minimizedNodes[childKey];
            } else {
              node.child._str = childKey;
              this.minimizedNodes[childKey] = node.child;
            }
            this.uncheckedNodes.pop();
          }
        };
        /*!
         * lunr.Index
         * Copyright (C) 2020 Oliver Nightingale
         */
        lunr3.Index = function(attrs) {
          this.invertedIndex = attrs.invertedIndex;
          this.fieldVectors = attrs.fieldVectors;
          this.tokenSet = attrs.tokenSet;
          this.fields = attrs.fields;
          this.pipeline = attrs.pipeline;
        };
        lunr3.Index.prototype.search = function(queryString) {
          return this.query(function(query) {
            var parser = new lunr3.QueryParser(queryString, query);
            parser.parse();
          });
        };
        lunr3.Index.prototype.query = function(fn) {
          var query = new lunr3.Query(this.fields), matchingFields = Object.create(null), queryVectors = Object.create(null), termFieldCache = Object.create(null), requiredMatches = Object.create(null), prohibitedMatches = Object.create(null);
          for (var i = 0; i < this.fields.length; i++) {
            queryVectors[this.fields[i]] = new lunr3.Vector();
          }
          fn.call(query, query);
          for (var i = 0; i < query.clauses.length; i++) {
            var clause = query.clauses[i], terms = null, clauseMatches = lunr3.Set.empty;
            if (clause.usePipeline) {
              terms = this.pipeline.runString(clause.term, {
                fields: clause.fields
              });
            } else {
              terms = [clause.term];
            }
            for (var m = 0; m < terms.length; m++) {
              var term = terms[m];
              clause.term = term;
              var termTokenSet = lunr3.TokenSet.fromClause(clause), expandedTerms = this.tokenSet.intersect(termTokenSet).toArray();
              if (expandedTerms.length === 0 && clause.presence === lunr3.Query.presence.REQUIRED) {
                for (var k = 0; k < clause.fields.length; k++) {
                  var field = clause.fields[k];
                  requiredMatches[field] = lunr3.Set.empty;
                }
                break;
              }
              for (var j = 0; j < expandedTerms.length; j++) {
                var expandedTerm = expandedTerms[j], posting = this.invertedIndex[expandedTerm], termIndex = posting._index;
                for (var k = 0; k < clause.fields.length; k++) {
                  var field = clause.fields[k], fieldPosting = posting[field], matchingDocumentRefs = Object.keys(fieldPosting), termField = expandedTerm + "/" + field, matchingDocumentsSet = new lunr3.Set(matchingDocumentRefs);
                  if (clause.presence == lunr3.Query.presence.REQUIRED) {
                    clauseMatches = clauseMatches.union(matchingDocumentsSet);
                    if (requiredMatches[field] === void 0) {
                      requiredMatches[field] = lunr3.Set.complete;
                    }
                  }
                  if (clause.presence == lunr3.Query.presence.PROHIBITED) {
                    if (prohibitedMatches[field] === void 0) {
                      prohibitedMatches[field] = lunr3.Set.empty;
                    }
                    prohibitedMatches[field] = prohibitedMatches[field].union(matchingDocumentsSet);
                    continue;
                  }
                  queryVectors[field].upsert(termIndex, clause.boost, function(a, b) {
                    return a + b;
                  });
                  if (termFieldCache[termField]) {
                    continue;
                  }
                  for (var l = 0; l < matchingDocumentRefs.length; l++) {
                    var matchingDocumentRef = matchingDocumentRefs[l], matchingFieldRef = new lunr3.FieldRef(matchingDocumentRef, field), metadata = fieldPosting[matchingDocumentRef], fieldMatch;
                    if ((fieldMatch = matchingFields[matchingFieldRef]) === void 0) {
                      matchingFields[matchingFieldRef] = new lunr3.MatchData(expandedTerm, field, metadata);
                    } else {
                      fieldMatch.add(expandedTerm, field, metadata);
                    }
                  }
                  termFieldCache[termField] = true;
                }
              }
            }
            if (clause.presence === lunr3.Query.presence.REQUIRED) {
              for (var k = 0; k < clause.fields.length; k++) {
                var field = clause.fields[k];
                requiredMatches[field] = requiredMatches[field].intersect(clauseMatches);
              }
            }
          }
          var allRequiredMatches = lunr3.Set.complete, allProhibitedMatches = lunr3.Set.empty;
          for (var i = 0; i < this.fields.length; i++) {
            var field = this.fields[i];
            if (requiredMatches[field]) {
              allRequiredMatches = allRequiredMatches.intersect(requiredMatches[field]);
            }
            if (prohibitedMatches[field]) {
              allProhibitedMatches = allProhibitedMatches.union(prohibitedMatches[field]);
            }
          }
          var matchingFieldRefs = Object.keys(matchingFields), results = [], matches = Object.create(null);
          if (query.isNegated()) {
            matchingFieldRefs = Object.keys(this.fieldVectors);
            for (var i = 0; i < matchingFieldRefs.length; i++) {
              var matchingFieldRef = matchingFieldRefs[i];
              var fieldRef = lunr3.FieldRef.fromString(matchingFieldRef);
              matchingFields[matchingFieldRef] = new lunr3.MatchData();
            }
          }
          for (var i = 0; i < matchingFieldRefs.length; i++) {
            var fieldRef = lunr3.FieldRef.fromString(matchingFieldRefs[i]), docRef = fieldRef.docRef;
            if (!allRequiredMatches.contains(docRef)) {
              continue;
            }
            if (allProhibitedMatches.contains(docRef)) {
              continue;
            }
            var fieldVector = this.fieldVectors[fieldRef], score = queryVectors[fieldRef.fieldName].similarity(fieldVector), docMatch;
            if ((docMatch = matches[docRef]) !== void 0) {
              docMatch.score += score;
              docMatch.matchData.combine(matchingFields[fieldRef]);
            } else {
              var match = {
                ref: docRef,
                score,
                matchData: matchingFields[fieldRef]
              };
              matches[docRef] = match;
              results.push(match);
            }
          }
          return results.sort(function(a, b) {
            return b.score - a.score;
          });
        };
        lunr3.Index.prototype.toJSON = function() {
          var invertedIndex = Object.keys(this.invertedIndex).sort().map(function(term) {
            return [term, this.invertedIndex[term]];
          }, this);
          var fieldVectors = Object.keys(this.fieldVectors).map(function(ref) {
            return [ref, this.fieldVectors[ref].toJSON()];
          }, this);
          return {
            version: lunr3.version,
            fields: this.fields,
            fieldVectors,
            invertedIndex,
            pipeline: this.pipeline.toJSON()
          };
        };
        lunr3.Index.load = function(serializedIndex) {
          var attrs = {}, fieldVectors = {}, serializedVectors = serializedIndex.fieldVectors, invertedIndex = Object.create(null), serializedInvertedIndex = serializedIndex.invertedIndex, tokenSetBuilder = new lunr3.TokenSet.Builder(), pipeline = lunr3.Pipeline.load(serializedIndex.pipeline);
          if (serializedIndex.version != lunr3.version) {
            lunr3.utils.warn("Version mismatch when loading serialised index. Current version of lunr '" + lunr3.version + "' does not match serialized index '" + serializedIndex.version + "'");
          }
          for (var i = 0; i < serializedVectors.length; i++) {
            var tuple = serializedVectors[i], ref = tuple[0], elements = tuple[1];
            fieldVectors[ref] = new lunr3.Vector(elements);
          }
          for (var i = 0; i < serializedInvertedIndex.length; i++) {
            var tuple = serializedInvertedIndex[i], term = tuple[0], posting = tuple[1];
            tokenSetBuilder.insert(term);
            invertedIndex[term] = posting;
          }
          tokenSetBuilder.finish();
          attrs.fields = serializedIndex.fields;
          attrs.fieldVectors = fieldVectors;
          attrs.invertedIndex = invertedIndex;
          attrs.tokenSet = tokenSetBuilder.root;
          attrs.pipeline = pipeline;
          return new lunr3.Index(attrs);
        };
        /*!
         * lunr.Builder
         * Copyright (C) 2020 Oliver Nightingale
         */
        lunr3.Builder = function() {
          this._ref = "id";
          this._fields = Object.create(null);
          this._documents = Object.create(null);
          this.invertedIndex = Object.create(null);
          this.fieldTermFrequencies = {};
          this.fieldLengths = {};
          this.tokenizer = lunr3.tokenizer;
          this.pipeline = new lunr3.Pipeline();
          this.searchPipeline = new lunr3.Pipeline();
          this.documentCount = 0;
          this._b = 0.75;
          this._k1 = 1.2;
          this.termIndex = 0;
          this.metadataWhitelist = [];
        };
        lunr3.Builder.prototype.ref = function(ref) {
          this._ref = ref;
        };
        lunr3.Builder.prototype.field = function(fieldName, attributes) {
          if (/\//.test(fieldName)) {
            throw new RangeError("Field '" + fieldName + "' contains illegal character '/'");
          }
          this._fields[fieldName] = attributes || {};
        };
        lunr3.Builder.prototype.b = function(number) {
          if (number < 0) {
            this._b = 0;
          } else if (number > 1) {
            this._b = 1;
          } else {
            this._b = number;
          }
        };
        lunr3.Builder.prototype.k1 = function(number) {
          this._k1 = number;
        };
        lunr3.Builder.prototype.add = function(doc, attributes) {
          var docRef = doc[this._ref], fields = Object.keys(this._fields);
          this._documents[docRef] = attributes || {};
          this.documentCount += 1;
          for (var i = 0; i < fields.length; i++) {
            var fieldName = fields[i], extractor = this._fields[fieldName].extractor, field = extractor ? extractor(doc) : doc[fieldName], tokens = this.tokenizer(field, {
              fields: [fieldName]
            }), terms = this.pipeline.run(tokens), fieldRef = new lunr3.FieldRef(docRef, fieldName), fieldTerms = Object.create(null);
            this.fieldTermFrequencies[fieldRef] = fieldTerms;
            this.fieldLengths[fieldRef] = 0;
            this.fieldLengths[fieldRef] += terms.length;
            for (var j = 0; j < terms.length; j++) {
              var term = terms[j];
              if (fieldTerms[term] == void 0) {
                fieldTerms[term] = 0;
              }
              fieldTerms[term] += 1;
              if (this.invertedIndex[term] == void 0) {
                var posting = Object.create(null);
                posting["_index"] = this.termIndex;
                this.termIndex += 1;
                for (var k = 0; k < fields.length; k++) {
                  posting[fields[k]] = Object.create(null);
                }
                this.invertedIndex[term] = posting;
              }
              if (this.invertedIndex[term][fieldName][docRef] == void 0) {
                this.invertedIndex[term][fieldName][docRef] = Object.create(null);
              }
              for (var l = 0; l < this.metadataWhitelist.length; l++) {
                var metadataKey = this.metadataWhitelist[l], metadata = term.metadata[metadataKey];
                if (this.invertedIndex[term][fieldName][docRef][metadataKey] == void 0) {
                  this.invertedIndex[term][fieldName][docRef][metadataKey] = [];
                }
                this.invertedIndex[term][fieldName][docRef][metadataKey].push(metadata);
              }
            }
          }
        };
        lunr3.Builder.prototype.calculateAverageFieldLengths = function() {
          var fieldRefs = Object.keys(this.fieldLengths), numberOfFields = fieldRefs.length, accumulator = {}, documentsWithField = {};
          for (var i = 0; i < numberOfFields; i++) {
            var fieldRef = lunr3.FieldRef.fromString(fieldRefs[i]), field = fieldRef.fieldName;
            documentsWithField[field] || (documentsWithField[field] = 0);
            documentsWithField[field] += 1;
            accumulator[field] || (accumulator[field] = 0);
            accumulator[field] += this.fieldLengths[fieldRef];
          }
          var fields = Object.keys(this._fields);
          for (var i = 0; i < fields.length; i++) {
            var fieldName = fields[i];
            accumulator[fieldName] = accumulator[fieldName] / documentsWithField[fieldName];
          }
          this.averageFieldLength = accumulator;
        };
        lunr3.Builder.prototype.createFieldVectors = function() {
          var fieldVectors = {}, fieldRefs = Object.keys(this.fieldTermFrequencies), fieldRefsLength = fieldRefs.length, termIdfCache = Object.create(null);
          for (var i = 0; i < fieldRefsLength; i++) {
            var fieldRef = lunr3.FieldRef.fromString(fieldRefs[i]), fieldName = fieldRef.fieldName, fieldLength = this.fieldLengths[fieldRef], fieldVector = new lunr3.Vector(), termFrequencies = this.fieldTermFrequencies[fieldRef], terms = Object.keys(termFrequencies), termsLength = terms.length;
            var fieldBoost = this._fields[fieldName].boost || 1, docBoost = this._documents[fieldRef.docRef].boost || 1;
            for (var j = 0; j < termsLength; j++) {
              var term = terms[j], tf = termFrequencies[term], termIndex = this.invertedIndex[term]._index, idf, score, scoreWithPrecision;
              if (termIdfCache[term] === void 0) {
                idf = lunr3.idf(this.invertedIndex[term], this.documentCount);
                termIdfCache[term] = idf;
              } else {
                idf = termIdfCache[term];
              }
              score = idf * ((this._k1 + 1) * tf) / (this._k1 * (1 - this._b + this._b * (fieldLength / this.averageFieldLength[fieldName])) + tf);
              score *= fieldBoost;
              score *= docBoost;
              scoreWithPrecision = Math.round(score * 1e3) / 1e3;
              fieldVector.insert(termIndex, scoreWithPrecision);
            }
            fieldVectors[fieldRef] = fieldVector;
          }
          this.fieldVectors = fieldVectors;
        };
        lunr3.Builder.prototype.createTokenSet = function() {
          this.tokenSet = lunr3.TokenSet.fromArray(Object.keys(this.invertedIndex).sort());
        };
        lunr3.Builder.prototype.build = function() {
          this.calculateAverageFieldLengths();
          this.createFieldVectors();
          this.createTokenSet();
          return new lunr3.Index({
            invertedIndex: this.invertedIndex,
            fieldVectors: this.fieldVectors,
            tokenSet: this.tokenSet,
            fields: Object.keys(this._fields),
            pipeline: this.searchPipeline
          });
        };
        lunr3.Builder.prototype.use = function(fn) {
          var args = Array.prototype.slice.call(arguments, 1);
          args.unshift(this);
          fn.apply(this, args);
        };
        lunr3.MatchData = function(term, field, metadata) {
          var clonedMetadata = Object.create(null), metadataKeys = Object.keys(metadata || {});
          for (var i = 0; i < metadataKeys.length; i++) {
            var key = metadataKeys[i];
            clonedMetadata[key] = metadata[key].slice();
          }
          this.metadata = Object.create(null);
          if (term !== void 0) {
            this.metadata[term] = Object.create(null);
            this.metadata[term][field] = clonedMetadata;
          }
        };
        lunr3.MatchData.prototype.combine = function(otherMatchData) {
          var terms = Object.keys(otherMatchData.metadata);
          for (var i = 0; i < terms.length; i++) {
            var term = terms[i], fields = Object.keys(otherMatchData.metadata[term]);
            if (this.metadata[term] == void 0) {
              this.metadata[term] = Object.create(null);
            }
            for (var j = 0; j < fields.length; j++) {
              var field = fields[j], keys = Object.keys(otherMatchData.metadata[term][field]);
              if (this.metadata[term][field] == void 0) {
                this.metadata[term][field] = Object.create(null);
              }
              for (var k = 0; k < keys.length; k++) {
                var key = keys[k];
                if (this.metadata[term][field][key] == void 0) {
                  this.metadata[term][field][key] = otherMatchData.metadata[term][field][key];
                } else {
                  this.metadata[term][field][key] = this.metadata[term][field][key].concat(otherMatchData.metadata[term][field][key]);
                }
              }
            }
          }
        };
        lunr3.MatchData.prototype.add = function(term, field, metadata) {
          if (!(term in this.metadata)) {
            this.metadata[term] = Object.create(null);
            this.metadata[term][field] = metadata;
            return;
          }
          if (!(field in this.metadata[term])) {
            this.metadata[term][field] = metadata;
            return;
          }
          var metadataKeys = Object.keys(metadata);
          for (var i = 0; i < metadataKeys.length; i++) {
            var key = metadataKeys[i];
            if (key in this.metadata[term][field]) {
              this.metadata[term][field][key] = this.metadata[term][field][key].concat(metadata[key]);
            } else {
              this.metadata[term][field][key] = metadata[key];
            }
          }
        };
        lunr3.Query = function(allFields) {
          this.clauses = [];
          this.allFields = allFields;
        };
        lunr3.Query.wildcard = new String("*");
        lunr3.Query.wildcard.NONE = 0;
        lunr3.Query.wildcard.LEADING = 1;
        lunr3.Query.wildcard.TRAILING = 2;
        lunr3.Query.presence = {
          OPTIONAL: 1,
          REQUIRED: 2,
          PROHIBITED: 3
        };
        lunr3.Query.prototype.clause = function(clause) {
          if (!("fields" in clause)) {
            clause.fields = this.allFields;
          }
          if (!("boost" in clause)) {
            clause.boost = 1;
          }
          if (!("usePipeline" in clause)) {
            clause.usePipeline = true;
          }
          if (!("wildcard" in clause)) {
            clause.wildcard = lunr3.Query.wildcard.NONE;
          }
          if (clause.wildcard & lunr3.Query.wildcard.LEADING && clause.term.charAt(0) != lunr3.Query.wildcard) {
            clause.term = "*" + clause.term;
          }
          if (clause.wildcard & lunr3.Query.wildcard.TRAILING && clause.term.slice(-1) != lunr3.Query.wildcard) {
            clause.term = "" + clause.term + "*";
          }
          if (!("presence" in clause)) {
            clause.presence = lunr3.Query.presence.OPTIONAL;
          }
          this.clauses.push(clause);
          return this;
        };
        lunr3.Query.prototype.isNegated = function() {
          for (var i = 0; i < this.clauses.length; i++) {
            if (this.clauses[i].presence != lunr3.Query.presence.PROHIBITED) {
              return false;
            }
          }
          return true;
        };
        lunr3.Query.prototype.term = function(term, options) {
          if (Array.isArray(term)) {
            term.forEach(function(t) {
              this.term(t, lunr3.utils.clone(options));
            }, this);
            return this;
          }
          var clause = options || {};
          clause.term = term.toString();
          this.clause(clause);
          return this;
        };
        lunr3.QueryParseError = function(message, start, end) {
          this.name = "QueryParseError";
          this.message = message;
          this.start = start;
          this.end = end;
        };
        lunr3.QueryParseError.prototype = new Error();
        lunr3.QueryLexer = function(str) {
          this.lexemes = [];
          this.str = str;
          this.length = str.length;
          this.pos = 0;
          this.start = 0;
          this.escapeCharPositions = [];
        };
        lunr3.QueryLexer.prototype.run = function() {
          var state = lunr3.QueryLexer.lexText;
          while (state) {
            state = state(this);
          }
        };
        lunr3.QueryLexer.prototype.sliceString = function() {
          var subSlices = [], sliceStart = this.start, sliceEnd = this.pos;
          for (var i = 0; i < this.escapeCharPositions.length; i++) {
            sliceEnd = this.escapeCharPositions[i];
            subSlices.push(this.str.slice(sliceStart, sliceEnd));
            sliceStart = sliceEnd + 1;
          }
          subSlices.push(this.str.slice(sliceStart, this.pos));
          this.escapeCharPositions.length = 0;
          return subSlices.join("");
        };
        lunr3.QueryLexer.prototype.emit = function(type) {
          this.lexemes.push({
            type,
            str: this.sliceString(),
            start: this.start,
            end: this.pos
          });
          this.start = this.pos;
        };
        lunr3.QueryLexer.prototype.escapeCharacter = function() {
          this.escapeCharPositions.push(this.pos - 1);
          this.pos += 1;
        };
        lunr3.QueryLexer.prototype.next = function() {
          if (this.pos >= this.length) {
            return lunr3.QueryLexer.EOS;
          }
          var char = this.str.charAt(this.pos);
          this.pos += 1;
          return char;
        };
        lunr3.QueryLexer.prototype.width = function() {
          return this.pos - this.start;
        };
        lunr3.QueryLexer.prototype.ignore = function() {
          if (this.start == this.pos) {
            this.pos += 1;
          }
          this.start = this.pos;
        };
        lunr3.QueryLexer.prototype.backup = function() {
          this.pos -= 1;
        };
        lunr3.QueryLexer.prototype.acceptDigitRun = function() {
          var char, charCode;
          do {
            char = this.next();
            charCode = char.charCodeAt(0);
          } while (charCode > 47 && charCode < 58);
          if (char != lunr3.QueryLexer.EOS) {
            this.backup();
          }
        };
        lunr3.QueryLexer.prototype.more = function() {
          return this.pos < this.length;
        };
        lunr3.QueryLexer.EOS = "EOS";
        lunr3.QueryLexer.FIELD = "FIELD";
        lunr3.QueryLexer.TERM = "TERM";
        lunr3.QueryLexer.EDIT_DISTANCE = "EDIT_DISTANCE";
        lunr3.QueryLexer.BOOST = "BOOST";
        lunr3.QueryLexer.PRESENCE = "PRESENCE";
        lunr3.QueryLexer.lexField = function(lexer) {
          lexer.backup();
          lexer.emit(lunr3.QueryLexer.FIELD);
          lexer.ignore();
          return lunr3.QueryLexer.lexText;
        };
        lunr3.QueryLexer.lexTerm = function(lexer) {
          if (lexer.width() > 1) {
            lexer.backup();
            lexer.emit(lunr3.QueryLexer.TERM);
          }
          lexer.ignore();
          if (lexer.more()) {
            return lunr3.QueryLexer.lexText;
          }
        };
        lunr3.QueryLexer.lexEditDistance = function(lexer) {
          lexer.ignore();
          lexer.acceptDigitRun();
          lexer.emit(lunr3.QueryLexer.EDIT_DISTANCE);
          return lunr3.QueryLexer.lexText;
        };
        lunr3.QueryLexer.lexBoost = function(lexer) {
          lexer.ignore();
          lexer.acceptDigitRun();
          lexer.emit(lunr3.QueryLexer.BOOST);
          return lunr3.QueryLexer.lexText;
        };
        lunr3.QueryLexer.lexEOS = function(lexer) {
          if (lexer.width() > 0) {
            lexer.emit(lunr3.QueryLexer.TERM);
          }
        };
        lunr3.QueryLexer.termSeparator = lunr3.tokenizer.separator;
        lunr3.QueryLexer.lexText = function(lexer) {
          while (true) {
            var char = lexer.next();
            if (char == lunr3.QueryLexer.EOS) {
              return lunr3.QueryLexer.lexEOS;
            }
            if (char.charCodeAt(0) == 92) {
              lexer.escapeCharacter();
              continue;
            }
            if (char == ":") {
              return lunr3.QueryLexer.lexField;
            }
            if (char == "~") {
              lexer.backup();
              if (lexer.width() > 0) {
                lexer.emit(lunr3.QueryLexer.TERM);
              }
              return lunr3.QueryLexer.lexEditDistance;
            }
            if (char == "^") {
              lexer.backup();
              if (lexer.width() > 0) {
                lexer.emit(lunr3.QueryLexer.TERM);
              }
              return lunr3.QueryLexer.lexBoost;
            }
            if (char == "+" && lexer.width() === 1) {
              lexer.emit(lunr3.QueryLexer.PRESENCE);
              return lunr3.QueryLexer.lexText;
            }
            if (char == "-" && lexer.width() === 1) {
              lexer.emit(lunr3.QueryLexer.PRESENCE);
              return lunr3.QueryLexer.lexText;
            }
            if (char.match(lunr3.QueryLexer.termSeparator)) {
              return lunr3.QueryLexer.lexTerm;
            }
          }
        };
        lunr3.QueryParser = function(str, query) {
          this.lexer = new lunr3.QueryLexer(str);
          this.query = query;
          this.currentClause = {};
          this.lexemeIdx = 0;
        };
        lunr3.QueryParser.prototype.parse = function() {
          this.lexer.run();
          this.lexemes = this.lexer.lexemes;
          var state = lunr3.QueryParser.parseClause;
          while (state) {
            state = state(this);
          }
          return this.query;
        };
        lunr3.QueryParser.prototype.peekLexeme = function() {
          return this.lexemes[this.lexemeIdx];
        };
        lunr3.QueryParser.prototype.consumeLexeme = function() {
          var lexeme = this.peekLexeme();
          this.lexemeIdx += 1;
          return lexeme;
        };
        lunr3.QueryParser.prototype.nextClause = function() {
          var completedClause = this.currentClause;
          this.query.clause(completedClause);
          this.currentClause = {};
        };
        lunr3.QueryParser.parseClause = function(parser) {
          var lexeme = parser.peekLexeme();
          if (lexeme == void 0) {
            return;
          }
          switch (lexeme.type) {
            case lunr3.QueryLexer.PRESENCE:
              return lunr3.QueryParser.parsePresence;
            case lunr3.QueryLexer.FIELD:
              return lunr3.QueryParser.parseField;
            case lunr3.QueryLexer.TERM:
              return lunr3.QueryParser.parseTerm;
            default:
              var errorMessage = "expected either a field or a term, found " + lexeme.type;
              if (lexeme.str.length >= 1) {
                errorMessage += " with value '" + lexeme.str + "'";
              }
              throw new lunr3.QueryParseError(errorMessage, lexeme.start, lexeme.end);
          }
        };
        lunr3.QueryParser.parsePresence = function(parser) {
          var lexeme = parser.consumeLexeme();
          if (lexeme == void 0) {
            return;
          }
          switch (lexeme.str) {
            case "-":
              parser.currentClause.presence = lunr3.Query.presence.PROHIBITED;
              break;
            case "+":
              parser.currentClause.presence = lunr3.Query.presence.REQUIRED;
              break;
            default:
              var errorMessage = "unrecognised presence operator'" + lexeme.str + "'";
              throw new lunr3.QueryParseError(errorMessage, lexeme.start, lexeme.end);
          }
          var nextLexeme = parser.peekLexeme();
          if (nextLexeme == void 0) {
            var errorMessage = "expecting term or field, found nothing";
            throw new lunr3.QueryParseError(errorMessage, lexeme.start, lexeme.end);
          }
          switch (nextLexeme.type) {
            case lunr3.QueryLexer.FIELD:
              return lunr3.QueryParser.parseField;
            case lunr3.QueryLexer.TERM:
              return lunr3.QueryParser.parseTerm;
            default:
              var errorMessage = "expecting term or field, found '" + nextLexeme.type + "'";
              throw new lunr3.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
          }
        };
        lunr3.QueryParser.parseField = function(parser) {
          var lexeme = parser.consumeLexeme();
          if (lexeme == void 0) {
            return;
          }
          if (parser.query.allFields.indexOf(lexeme.str) == -1) {
            var possibleFields = parser.query.allFields.map(function(f) {
              return "'" + f + "'";
            }).join(", "), errorMessage = "unrecognised field '" + lexeme.str + "', possible fields: " + possibleFields;
            throw new lunr3.QueryParseError(errorMessage, lexeme.start, lexeme.end);
          }
          parser.currentClause.fields = [lexeme.str];
          var nextLexeme = parser.peekLexeme();
          if (nextLexeme == void 0) {
            var errorMessage = "expecting term, found nothing";
            throw new lunr3.QueryParseError(errorMessage, lexeme.start, lexeme.end);
          }
          switch (nextLexeme.type) {
            case lunr3.QueryLexer.TERM:
              return lunr3.QueryParser.parseTerm;
            default:
              var errorMessage = "expecting term, found '" + nextLexeme.type + "'";
              throw new lunr3.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
          }
        };
        lunr3.QueryParser.parseTerm = function(parser) {
          var lexeme = parser.consumeLexeme();
          if (lexeme == void 0) {
            return;
          }
          parser.currentClause.term = lexeme.str.toLowerCase();
          if (lexeme.str.indexOf("*") != -1) {
            parser.currentClause.usePipeline = false;
          }
          var nextLexeme = parser.peekLexeme();
          if (nextLexeme == void 0) {
            parser.nextClause();
            return;
          }
          switch (nextLexeme.type) {
            case lunr3.QueryLexer.TERM:
              parser.nextClause();
              return lunr3.QueryParser.parseTerm;
            case lunr3.QueryLexer.FIELD:
              parser.nextClause();
              return lunr3.QueryParser.parseField;
            case lunr3.QueryLexer.EDIT_DISTANCE:
              return lunr3.QueryParser.parseEditDistance;
            case lunr3.QueryLexer.BOOST:
              return lunr3.QueryParser.parseBoost;
            case lunr3.QueryLexer.PRESENCE:
              parser.nextClause();
              return lunr3.QueryParser.parsePresence;
            default:
              var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'";
              throw new lunr3.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
          }
        };
        lunr3.QueryParser.parseEditDistance = function(parser) {
          var lexeme = parser.consumeLexeme();
          if (lexeme == void 0) {
            return;
          }
          var editDistance = parseInt(lexeme.str, 10);
          if (isNaN(editDistance)) {
            var errorMessage = "edit distance must be numeric";
            throw new lunr3.QueryParseError(errorMessage, lexeme.start, lexeme.end);
          }
          parser.currentClause.editDistance = editDistance;
          var nextLexeme = parser.peekLexeme();
          if (nextLexeme == void 0) {
            parser.nextClause();
            return;
          }
          switch (nextLexeme.type) {
            case lunr3.QueryLexer.TERM:
              parser.nextClause();
              return lunr3.QueryParser.parseTerm;
            case lunr3.QueryLexer.FIELD:
              parser.nextClause();
              return lunr3.QueryParser.parseField;
            case lunr3.QueryLexer.EDIT_DISTANCE:
              return lunr3.QueryParser.parseEditDistance;
            case lunr3.QueryLexer.BOOST:
              return lunr3.QueryParser.parseBoost;
            case lunr3.QueryLexer.PRESENCE:
              parser.nextClause();
              return lunr3.QueryParser.parsePresence;
            default:
              var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'";
              throw new lunr3.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
          }
        };
        lunr3.QueryParser.parseBoost = function(parser) {
          var lexeme = parser.consumeLexeme();
          if (lexeme == void 0) {
            return;
          }
          var boost = parseInt(lexeme.str, 10);
          if (isNaN(boost)) {
            var errorMessage = "boost must be numeric";
            throw new lunr3.QueryParseError(errorMessage, lexeme.start, lexeme.end);
          }
          parser.currentClause.boost = boost;
          var nextLexeme = parser.peekLexeme();
          if (nextLexeme == void 0) {
            parser.nextClause();
            return;
          }
          switch (nextLexeme.type) {
            case lunr3.QueryLexer.TERM:
              parser.nextClause();
              return lunr3.QueryParser.parseTerm;
            case lunr3.QueryLexer.FIELD:
              parser.nextClause();
              return lunr3.QueryParser.parseField;
            case lunr3.QueryLexer.EDIT_DISTANCE:
              return lunr3.QueryParser.parseEditDistance;
            case lunr3.QueryLexer.BOOST:
              return lunr3.QueryParser.parseBoost;
            case lunr3.QueryLexer.PRESENCE:
              parser.nextClause();
              return lunr3.QueryParser.parsePresence;
            default:
              var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'";
              throw new lunr3.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
          }
        };
        (function(root, factory) {
          if (typeof define === "function" && define.amd) {
            define(factory);
          } else if (typeof exports === "object") {
            module.exports = factory();
          } else {
            root.lunr = factory();
          }
        })(this, function() {
          return lunr3;
        });
      })();
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

  // src/assets/javascripts/integrations/search/worker/main/index.ts
  var import_lunr = __toModule(require_lunr());

  // src/assets/javascripts/integrations/search/document/index.ts
  var import_escape_html = __toModule(require_escape_html());
  function setupSearchDocumentMap(docs) {
    const documents = new Map();
    const parents = new Set();
    for (const doc of docs) {
      const [path, hash] = doc.location.split("#");
      const location = doc.location;
      const title = doc.title;
      const text = (0, import_escape_html.default)(doc.text).replace(/\s+(?=[,.:;!?])/g, "").replace(/\s+/g, " ");
      if (hash) {
        const parent2 = documents.get(path);
        if (!parents.has(parent2)) {
          parent2.title = doc.title;
          parent2.text = text;
          parents.add(parent2);
        } else {
          documents.set(location, {
            location,
            title,
            text,
            parent: parent2
          });
        }
      } else {
        documents.set(location, {
          location,
          title,
          text
        });
      }
    }
    return documents;
  }

  // src/assets/javascripts/integrations/search/highlighter/index.ts
  var import_escape_html2 = __toModule(require_escape_html());
  function setupSearchHighlighter(config, escape) {
    const separator = new RegExp(config.separator, "img");
    const highlight = (_, data, term) => {
      return `${data}<mark data-md-highlight>${term}</mark>`;
    };
    return (query) => {
      query = query.replace(/[\s*+\-:~^]+/g, " ").trim();
      const match = new RegExp(`(^|${config.separator})(${query.replace(/[|\\{}()[\]^$+*?.-]/g, "\\$&").replace(separator, "|")})`, "img");
      return (value) => (escape ? (0, import_escape_html2.default)(value) : value).replace(match, highlight).replace(/<\/mark>(\s+)<mark[^>]*>/img, "$1");
    };
  }

  // src/assets/javascripts/integrations/search/query/_/index.ts
  function parseSearchQuery(value) {
    const query = new lunr.Query(["title", "text"]);
    const parser = new lunr.QueryParser(value, query);
    parser.parse();
    return query.clauses;
  }
  function getSearchQueryTerms(query, terms) {
    const clauses = new Set(query);
    const result = {};
    for (let t = 0; t < terms.length; t++)
      for (const clause of clauses)
        if (terms[t].startsWith(clause.term)) {
          result[clause.term] = true;
          clauses.delete(clause);
        }
    for (const clause of clauses)
      result[clause.term] = false;
    return result;
  }

  // src/assets/javascripts/integrations/search/_/index.ts
  function difference(a, b) {
    const [x, y] = [new Set(a), new Set(b)];
    return [
      ...new Set([...x].filter((value) => !y.has(value)))
    ];
  }
  var Search = class {
    constructor({ config, docs, options }) {
      this.options = options;
      this.documents = setupSearchDocumentMap(docs);
      this.highlight = setupSearchHighlighter(config, false);
      lunr.tokenizer.separator = new RegExp(config.separator);
      this.index = lunr(function() {
        if (config.lang.length === 1 && config.lang[0] !== "en") {
          this.use(lunr[config.lang[0]]);
        } else if (config.lang.length > 1) {
          this.use(lunr.multiLanguage(...config.lang));
        }
        const fns = difference([
          "trimmer",
          "stopWordFilter",
          "stemmer"
        ], options.pipeline);
        for (const lang of config.lang.map((language) => language === "en" ? lunr : lunr[language])) {
          for (const fn of fns) {
            this.pipeline.remove(lang[fn]);
            this.searchPipeline.remove(lang[fn]);
          }
        }
        this.ref("location");
        this.field("title", { boost: 1e3 });
        this.field("text");
        for (const doc of docs)
          this.add(doc);
      });
    }
    search(query) {
      if (query) {
        try {
          const highlight = this.highlight(query);
          const clauses = parseSearchQuery(query).filter((clause) => clause.presence !== lunr.Query.presence.PROHIBITED);
          const groups = this.index.search(`${query}*`).reduce((item, { ref, score, matchData }) => {
            const document2 = this.documents.get(ref);
            if (typeof document2 !== "undefined") {
              const { location, title, text, parent: parent2 } = document2;
              const terms = getSearchQueryTerms(clauses, Object.keys(matchData.metadata));
              const boost = +!parent2 + +Object.values(terms).every((t) => t);
              item.push({
                location,
                title: highlight(title),
                text: highlight(text),
                score: score * (1 + boost),
                terms
              });
            }
            return item;
          }, []).sort((a, b) => b.score - a.score).reduce((items, result) => {
            const document2 = this.documents.get(result.location);
            if (typeof document2 !== "undefined") {
              const ref = "parent" in document2 ? document2.parent.location : document2.location;
              items.set(ref, [...items.get(ref) || [], result]);
            }
            return items;
          }, new Map());
          let suggestions;
          if (this.options.suggestions) {
            const titles = this.index.query((builder) => {
              for (const clause of clauses)
                builder.term(clause.term, {
                  fields: ["title"],
                  presence: lunr.Query.presence.REQUIRED,
                  wildcard: lunr.Query.wildcard.TRAILING
                });
            });
            suggestions = titles.length ? Object.keys(titles[0].matchData.metadata) : [];
          }
          return __spreadValues({
            items: [...groups.values()]
          }, typeof suggestions !== "undefined" && { suggestions });
        } catch (e) {
          console.warn(`Invalid query: ${query} \u2013 see https://bit.ly/2s3ChXG`);
        }
      }
      return { items: [] };
    }
  };

  // src/assets/javascripts/integrations/search/worker/message/index.ts
  var SearchMessageType;
  (function(SearchMessageType2) {
    SearchMessageType2[SearchMessageType2["SETUP"] = 0] = "SETUP";
    SearchMessageType2[SearchMessageType2["READY"] = 1] = "READY";
    SearchMessageType2[SearchMessageType2["QUERY"] = 2] = "QUERY";
    SearchMessageType2[SearchMessageType2["RESULT"] = 3] = "RESULT";
  })(SearchMessageType || (SearchMessageType = {}));

  // src/assets/javascripts/integrations/search/worker/main/index.ts
  var index;
  function setupSearchLanguages(config) {
    return __async(this, null, function* () {
      let base = "../lunr";
      if (typeof parent !== "undefined" && "IFrameWorker" in parent) {
        const worker = document.querySelector("script[src]");
        const [path] = worker.src.split("/worker");
        base = base.replace("..", path);
      }
      const scripts = [];
      for (const lang of config.lang) {
        switch (lang) {
          case "ja":
            scripts.push(`${base}/tinyseg.js`);
            break;
          case "hi":
          case "th":
            scripts.push(`${base}/wordcut.js`);
            break;
        }
        if (lang !== "en")
          scripts.push(`${base}/min/lunr.${lang}.min.js`);
      }
      if (config.lang.length > 1)
        scripts.push(`${base}/min/lunr.multi.min.js`);
      if (scripts.length)
        yield importScripts(`${base}/min/lunr.stemmer.support.min.js`, ...scripts);
    });
  }
  function handler(message) {
    return __async(this, null, function* () {
      switch (message.type) {
        case SearchMessageType.SETUP:
          yield setupSearchLanguages(message.data.config);
          index = new Search(message.data);
          return {
            type: SearchMessageType.READY
          };
        case SearchMessageType.QUERY:
          return {
            type: SearchMessageType.RESULT,
            data: index ? index.search(message.data) : { items: [] }
          };
        default:
          throw new TypeError("Invalid message type");
      }
    });
  }
  self.lunr = import_lunr.default;
  addEventListener("message", (ev) => __async(void 0, null, function* () {
    postMessage(yield handler(ev.data));
  }));
})();
//# sourceMappingURL=search.js.map

