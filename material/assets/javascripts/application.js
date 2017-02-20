window["app"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 90);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var store = __webpack_require__(30)('wks'),
    uid = __webpack_require__(21),
    _Symbol = __webpack_require__(1).Symbol,
    USE_SYMBOL = typeof _Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(11);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var dP = __webpack_require__(12),
    createDesc = __webpack_require__(29);
module.exports = __webpack_require__(5) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var core = module.exports = { version: '2.4.0' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(25)(function () {
  return Object.defineProperty({}, 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(1),
    hide = __webpack_require__(3),
    has = __webpack_require__(6),
    SRC = __webpack_require__(21)('src'),
    TO_STRING = 'toString',
    $toString = Function[TO_STRING],
    TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(4).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else {
    if (!safe) {
      delete O[key];
      hide(O, key, val);
    } else {
      if (O[key]) O[key] = val;else hide(O, key, val);
    }
  }
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// optional / simple context binding
var aFunction = __webpack_require__(13);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1:
      return function (a) {
        return fn.call(that, a);
      };
    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };
    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }
  return function () /* ...args */{
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (it) {
  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(2),
    IE8_DOM_DEFINE = __webpack_require__(43),
    toPrimitive = __webpack_require__(63),
    dP = Object.defineProperty;

exports.f = __webpack_require__(5) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) {/* empty */}
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(9),
    TAG = __webpack_require__(0)('toStringTag')
// ES3 wrong here
,
    ARG = cof(function () {
  return arguments;
}()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function tryGet(it, key) {
  try {
    return it[key];
  } catch (e) {/* empty */}
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
  // @@toStringTag case
  : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
  // builtinTag case
  : ARG ? cof(O)
  // ES3 arguments fallback
  : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(11),
    document = __webpack_require__(1).document
// in old IE typeof document.createElement is 'object'
,
    is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var def = __webpack_require__(12).f,
    has = __webpack_require__(6),
    TAG = __webpack_require__(0)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var shared = __webpack_require__(30)('keys'),
    uid = __webpack_require__(21);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.1.4 ToInteger
var ceil = Math.ceil,
    floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(45),
    defined = __webpack_require__(15);
module.exports = function (it) {
  return IObject(defined(it));
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var id = 0,
    px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
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

exports.default = /* JSX */{

  /**
   * Create a native DOM node from JSX's intermediate representation
   *
   * @param {string} tag - Tag name
   * @param {object} properties - Properties
   * @param {...(string|number|Array)} children - Child nodes
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

          /* Append regular nodes */
        } else {
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// IE 8- don't enum bug keys
module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(1),
    core = __webpack_require__(4),
    hide = __webpack_require__(3),
    redefine = __webpack_require__(8),
    ctx = __webpack_require__(10),
    PROTOTYPE = 'prototype';

var $export = function $export(type, name, source) {
  var IS_FORCED = type & $export.F,
      IS_GLOBAL = type & $export.G,
      IS_STATIC = type & $export.S,
      IS_PROTO = type & $export.P,
      IS_BIND = type & $export.B,
      target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE],
      exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
      expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {}),
      key,
      own,
      out,
      exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1; // forced
$export.G = 2; // global
$export.S = 4; // static
$export.P = 8; // proto
$export.B = 16; // bind
$export.W = 32; // wrap
$export.U = 64; // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(1).document && document.documentElement;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LIBRARY = __webpack_require__(28),
    $export = __webpack_require__(24),
    redefine = __webpack_require__(8),
    hide = __webpack_require__(3),
    has = __webpack_require__(6),
    Iterators = __webpack_require__(7),
    $iterCreate = __webpack_require__(48),
    setToStringTag = __webpack_require__(17),
    getPrototypeOf = __webpack_require__(54),
    ITERATOR = __webpack_require__(0)('iterator'),
    BUGGY = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
,
    FF_ITERATOR = '@@iterator',
    KEYS = 'keys',
    VALUES = 'values';

var returnThis = function returnThis() {
  return this;
};

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function getMethod(kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS:
        return function keys() {
          return new Constructor(this, kind);
        };
      case VALUES:
        return function values() {
          return new Constructor(this, kind);
        };
    }return function entries() {
      return new Constructor(this, kind);
    };
  };
  var TAG = NAME + ' Iterator',
      DEF_VALUES = DEFAULT == VALUES,
      VALUES_BUG = false,
      proto = Base.prototype,
      $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
      $default = $native || getMethod(DEFAULT),
      $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined,
      $anyNative = NAME == 'Array' ? proto.entries || $native : $native,
      methods,
      key,
      IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() {
      return $native.call(this);
    };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = false;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(1),
    SHARED = '__core-js_shared__',
    store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ctx = __webpack_require__(10),
    invoke = __webpack_require__(44),
    html = __webpack_require__(26),
    cel = __webpack_require__(16),
    global = __webpack_require__(1),
    process = global.process,
    setTask = global.setImmediate,
    clearTask = global.clearImmediate,
    MessageChannel = global.MessageChannel,
    counter = 0,
    queue = {},
    ONREADYSTATECHANGE = 'onreadystatechange',
    defer,
    channel,
    port;
var run = function run() {
  var id = +this;
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function listener(event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [],
        i = 1;
    while (arguments.length > i) {
      args.push(arguments[i++]);
    }queue[++counter] = function () {
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(9)(process) == 'process') {
    defer = function defer(id) {
      process.nextTick(ctx(run, id, 1));
    };
    // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function defer(id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
    // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function defer(id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
    // Rest old browsers
  } else {
    defer = function defer(id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.1.15 ToLength
var toInteger = __webpack_require__(19),
    min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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


  _createClass(Listener, [{
    key: "listen",
    value: function listen() {
      var _this2 = this;

      this.els_.forEach(function (el) {
        _this2.events_.forEach(function (event) {
          el.addEventListener(event, _this2.update_, false);
        });
      });

      /* Execute setup handler, if implemented */
      if (typeof this.handler_.setup === "function") this.handler_.setup();
    }

    /**
     * Unregister listener for all relevant events
     */

  }, {
    key: "unlisten",
    value: function unlisten() {
      var _this3 = this;

      this.els_.forEach(function (el) {
        _this3.events_.forEach(function (event) {
          el.removeEventListener(event, _this3.update_);
        });
      });

      /* Execute reset handler, if implemented */
      if (typeof this.handler_.reset === "function") this.handler_.reset();
    }
  }]);

  return Listener;
}();

/* harmony default export */ __webpack_exports__["a"] = Listener;

/***/ }),
/* 34 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(66);
__webpack_require__(68);
__webpack_require__(69);
__webpack_require__(67);
module.exports = __webpack_require__(4).Promise;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
} catch (e) {
  var CustomEvent = function CustomEvent(event, params) {
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
          get: function get() {
            return true;
          }
        });
      } catch (e) {
        this.defaultPrevented = true;
      }
    };
    return evt;
  };

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent; // expose definition to window
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function (self) {
  'use strict';

  if (self.fetch) {
    return;
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && function () {
      try {
        new Blob();
        return true;
      } catch (e) {
        return false;
      }
    }(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  if (support.arrayBuffer) {
    var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

    var isDataView = function isDataView(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj);
    };

    var isArrayBufferView = ArrayBuffer.isView || function (obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
    };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name');
    }
    return name.toLowerCase();
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value;
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function next() {
        var value = items.shift();
        return { done: value === undefined, value: value };
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function () {
        return iterator;
      };
    }

    return iterator;
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function (value, name) {
        this.append(name, value);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function (name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function (name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ',' + value : value;
  };

  Headers.prototype['delete'] = function (name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function (name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null;
  };

  Headers.prototype.has = function (name) {
    return this.map.hasOwnProperty(normalizeName(name));
  };

  Headers.prototype.set = function (name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function (callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push(name);
    });
    return iteratorFor(items);
  };

  Headers.prototype.values = function () {
    var items = [];
    this.forEach(function (value) {
      items.push(value);
    });
    return iteratorFor(items);
  };

  Headers.prototype.entries = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items);
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'));
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function (resolve, reject) {
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function () {
        reject(reader.error);
      };
    });
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise;
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise;
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('');
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0);
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer;
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function (body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        throw new Error('unsupported BodyInit type');
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function () {
        var rejected = consumed(this);
        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob);
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]));
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob');
        } else {
          return Promise.resolve(new Blob([this._bodyText]));
        }
      };

      this.arrayBuffer = function () {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
        } else {
          return this.blob().then(readBlobAsArrayBuffer);
        }
      };
    }

    this.text = function () {
      var rejected = consumed(this);
      if (rejected) {
        return rejected;
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob);
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text');
      } else {
        return Promise.resolve(this._bodyText);
      }
    };

    if (support.formData) {
      this.formData = function () {
        return this.text().then(decode);
      };
    }

    this.json = function () {
      return this.text().then(JSON.parse);
    };

    return this;
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method;
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read');
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'omit';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests');
    }
    this._initBody(body);
  }

  Request.prototype.clone = function () {
    return new Request(this, { body: this._bodyInit });
  };

  function decode(body) {
    var form = new FormData();
    body.trim().split('&').forEach(function (bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
    return form;
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    rawHeaders.split(/\r?\n/).forEach(function (line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers;
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = 'status' in options ? options.status : 200;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function () {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    });
  };

  Response.error = function () {
    var response = new Response(null, { status: 0, statusText: '' });
    response.type = 'error';
    return response;
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function (url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code');
    }

    return new Response(null, { status: status, headers: { location: url } });
  };

  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;

  self.fetch = function (input, init) {
    return new Promise(function (resolve, reject) {
      var request = new Request(input, init);
      var xhr = new XMLHttpRequest();

      xhr.onload = function () {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function () {
        reject(new TypeError('Network request failed'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function (value, name) {
        xhr.setRequestHeader(name, value);
      });

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    });
  };
  self.fetch.polyfill = true;
})(typeof self !== 'undefined' ? self : undefined);

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fastclick__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fastclick___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_fastclick__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Material__ = __webpack_require__(73);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialize", function() { return initialize; });
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
 * Application
 * ------------------------------------------------------------------------- */

// TODO ./node_modules/.bin/gulp assets:javascripts:flow:annotate && ./node_modules/.bin/flow check
var initialize = function initialize(config) {

  /* Initialize Modernizr and FastClick */
  new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Event.Listener(document, "DOMContentLoaded", function () {

    /* Test for iOS */
    Modernizr.addTest("ios", function () {
      return !!navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
    });

    /* Attach FastClick to mitigate 300ms delay on touch devices */
    __WEBPACK_IMPORTED_MODULE_0_fastclick___default.a.attach(document.body);

    /* Wrap all data tables for better overflow scrolling */
    var tables = document.querySelectorAll("table:not([class])");
    Array.prototype.forEach.call(tables, function (table) {
      var wrap = document.createElement("div");
      wrap.classList.add("md-typeset__table");
      if (table.nextSibling) {
        table.parentNode.insertBefore(wrap, table.nextSibling);
      } else {
        table.parentNode.appendChild(wrap);
      }
      wrap.appendChild(table);
    });

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

  /* Component: sidebar with navigation */
  new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Event.MatchMedia("(min-width: 1220px)", new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Event.Listener(window, ["scroll", "resize", "orientationchange"], new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Sidebar.Position("[data-md-component=navigation]")));

  /* Component: sidebar with table of contents */
  new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Event.MatchMedia("(min-width: 960px)", new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Event.Listener(window, ["scroll", "resize", "orientationchange"], new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Sidebar.Position("[data-md-component=toc]")));

  /* Component: link blurring for table of contents */
  new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Event.MatchMedia("(min-width: 960px)", new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Event.Listener(window, "scroll", new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Nav.Blur("[data-md-component=toc] .md-nav__link")));

  /* Component: collapsible elements for navigation */
  var collapsibles = document.querySelectorAll("[data-md-component=collapsible]");
  Array.prototype.forEach.call(collapsibles, function (collapse) {
    new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Event.MatchMedia("(min-width: 1220px)", new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Event.Listener(collapse.previousElementSibling, "click", new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Nav.Collapse(collapse)));
  });

  /* Component: active pane monitor for iOS scrolling fixes */
  new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Event.MatchMedia("(max-width: 1219px)", new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Event.Listener("[data-md-component=navigation] [data-md-toggle]", "change", new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Nav.Scrolling("[data-md-component=navigation] nav")));

  /* Component: search body lock for mobile */
  new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Event.MatchMedia("(max-width: 959px)", new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Event.Listener("[data-md-toggle=search]", "change", new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Search.Lock("[data-md-toggle=search]")));

  /* Component: search results */
  new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Event.Listener(document.forms.search.query, ["focus", "keyup"], new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Search.Result("[data-md-component=result]", function () {
    return fetch(config.url.base + "/mkdocs/search_index.json", {
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

  /* Listener: prevent touches on overlay if navigation is active */
  new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Event.MatchMedia("(max-width: 1219px)", new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Event.Listener("[data-md-component=overlay]", "touchstart", function (ev) {
    return ev.preventDefault();
  }));

  /* Listener: close drawer when anchor links are clicked */
  new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Event.MatchMedia("(max-width: 959px)", new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Event.Listener("[data-md-component=navigation] [href^='#']", "click", function () {
    var toggle = document.querySelector("[data-md-toggle=drawer]");
    if (toggle instanceof HTMLInputElement && toggle.checked) {
      toggle.checked = false;
      toggle.dispatchEvent(new CustomEvent("change"));
    }
  }));

  /* Listener: focus input after opening search */
  new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Event.Listener("[data-md-toggle=search]", "change", function (ev) {
    setTimeout(function (toggle) {
      var query = document.forms.search.query;
      if (toggle instanceof HTMLInputElement && toggle.checked) query.focus();
    }, 400, ev.target);
  }).listen();

  /* Listener: open search on focus */
  new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Event.MatchMedia("(min-width: 960px)", new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Event.Listener(document.forms.search.query, "focus", function () {
    var toggle = document.querySelector("[data-md-toggle=search]");
    if (toggle instanceof HTMLInputElement && !toggle.checked) {
      toggle.checked = true;
      toggle.dispatchEvent(new CustomEvent("change"));
    }
  }));

  /* Listener: close search when clicking outside */
  new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Event.MatchMedia("(min-width: 960px)", new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Event.Listener(document.body, "click", function () {
    var toggle = document.querySelector("[data-md-toggle=search]");
    if (toggle instanceof HTMLInputElement && toggle.checked) {
      toggle.checked = false;
      toggle.dispatchEvent(new CustomEvent("change"));
    }
  }));

  /* Listener: disable search when ESC key is pressed */
  new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Event.Listener(window, "keyup", function (ev) {
    var code = ev.keyCode || ev.which;
    if (code === 27) {
      var toggle = document.querySelector("[data-md-toggle=search]");
      if (toggle instanceof HTMLInputElement && toggle.checked) {
        toggle.checked = false;
        toggle.dispatchEvent(new CustomEvent("change"));
        document.forms.search.query.blur();
      }
    }
  }).listen();

  /* Listener: fix unclickable toggle due to blur handler */
  new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Event.MatchMedia("(min-width: 960px)", new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Event.Listener("[data-md-toggle=search]", "click", function (ev) {
    return ev.stopPropagation();
  }));

  /* Listener: prevent search from closing when clicking */
  new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Event.MatchMedia("(min-width: 960px)", new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Event.Listener("[data-md-component=search]", "click", function (ev) {
    return ev.stopPropagation();
  }))

  /* Retrieve facts for the given repository type */
  ;(function () {
    var el = document.querySelector("[data-md-source]");
    if (!el) return Promise.resolve([]);
    switch (el.dataset.mdSource) {
      case "github":
        return new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Source.Adapter.GitHub(el).fetch();
      default:
        return Promise.resolve([]);
    }

    /* Render repository source information */
  })().then(function (facts) {
    var sources = document.querySelectorAll("[data-md-source]");
    Array.prototype.forEach.call(sources, function (source) {
      new __WEBPACK_IMPORTED_MODULE_1__components_Material__["a" /* default */].Source.Repository(source).initialize(facts);
    });
  });
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(0)('unscopables'),
    ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(3)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
    throw TypeError(name + ': incorrect invocation!');
  }return it;
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(20),
    toLength = __webpack_require__(32),
    toIndex = __webpack_require__(61);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this),
        length = toLength(O.length),
        index = toIndex(fromIndex, length),
        value;
    // Array#includes uses SameValueZero equality algorithm
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      if (value != value) return true;
      // Array#toIndex ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      }
    }return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ctx = __webpack_require__(10),
    call = __webpack_require__(47),
    isArrayIter = __webpack_require__(46),
    anObject = __webpack_require__(2),
    toLength = __webpack_require__(32),
    getIterFn = __webpack_require__(64),
    BREAK = {},
    RETURN = {};
var _exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () {
    return iterable;
  } : getIterFn(iterable),
      f = ctx(fn, that, entries ? 2 : 1),
      index = 0,
      length,
      step,
      iterator,
      result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
_exports.BREAK = BREAK;
_exports.RETURN = RETURN;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = !__webpack_require__(5) && !__webpack_require__(25)(function () {
  return Object.defineProperty(__webpack_require__(16)('div'), 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
                  var un = that === undefined;
                  switch (args.length) {
                                    case 0:
                                                      return un ? fn() : fn.call(that);
                                    case 1:
                                                      return un ? fn(args[0]) : fn.call(that, args[0]);
                                    case 2:
                                                      return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
                                    case 3:
                                                      return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
                                    case 4:
                                                      return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
                  }return fn.apply(that, args);
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(9);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// check on default Array iterator
var Iterators = __webpack_require__(7),
    ITERATOR = __webpack_require__(0)('iterator'),
    ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// call something on iterator step with safe closing on error
var anObject = __webpack_require__(2);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
    // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var create = __webpack_require__(52),
    descriptor = __webpack_require__(29),
    setToStringTag = __webpack_require__(17),
    IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(3)(IteratorPrototype, __webpack_require__(0)('iterator'), function () {
  return this;
});

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ITERATOR = __webpack_require__(0)('iterator'),
    SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () {
    SAFE_CLOSING = true;
  };
  Array.from(riter, function () {
    throw 2;
  });
} catch (e) {/* empty */}

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7],
        iter = arr[ITERATOR]();
    iter.next = function () {
      return { done: safe = true };
    };
    arr[ITERATOR] = function () {
      return iter;
    };
    exec(arr);
  } catch (e) {/* empty */}
  return safe;
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (done, value) {
  return { value: value, done: !!done };
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(1),
    macrotask = __webpack_require__(31).set,
    Observer = global.MutationObserver || global.WebKitMutationObserver,
    process = global.process,
    Promise = global.Promise,
    isNode = __webpack_require__(9)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function flush() {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();else last = undefined;
        throw e;
      }
    }last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function notify() {
      process.nextTick(flush);
    };
    // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true,
        node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function notify() {
      node.data = toggle = !toggle;
    };
    // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function notify() {
      promise.then(flush);
    };
    // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout
  } else {
    notify = function notify() {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    }last = task;
  };
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(2),
    dPs = __webpack_require__(53),
    enumBugKeys = __webpack_require__(23),
    IE_PROTO = __webpack_require__(18)('IE_PROTO'),
    Empty = function Empty() {/* empty */},
    PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var _createDict = function createDict() {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(16)('iframe'),
      i = enumBugKeys.length,
      lt = '<',
      gt = '>',
      iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(26).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  _createDict = iframeDocument.F;
  while (i--) {
    delete _createDict[PROTOTYPE][enumBugKeys[i]];
  }return _createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = _createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var dP = __webpack_require__(12),
    anObject = __webpack_require__(2),
    getKeys = __webpack_require__(56);

module.exports = __webpack_require__(5) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties),
      length = keys.length,
      i = 0,
      P;
  while (length > i) {
    dP.f(O, P = keys[i++], Properties[P]);
  }return O;
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(6),
    toObject = __webpack_require__(62),
    IE_PROTO = __webpack_require__(18)('IE_PROTO'),
    ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = __webpack_require__(6),
    toIObject = __webpack_require__(20),
    arrayIndexOf = __webpack_require__(41)(false),
    IE_PROTO = __webpack_require__(18)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object),
      i = 0,
      result = [],
      key;
  for (key in O) {
    if (key != IE_PROTO) has(O, key) && result.push(key);
  } // Don't enum bug & hidden keys
  while (names.length > i) {
    if (has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
  }return result;
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(55),
    enumBugKeys = __webpack_require__(23);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var redefine = __webpack_require__(8);
module.exports = function (target, src, safe) {
  for (var key in src) {
    redefine(target, key, src[key], safe);
  }return target;
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(1),
    dP = __webpack_require__(12),
    DESCRIPTORS = __webpack_require__(5),
    SPECIES = __webpack_require__(0)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function get() {
      return this;
    }
  });
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(2),
    aFunction = __webpack_require__(13),
    SPECIES = __webpack_require__(0)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor,
      S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toInteger = __webpack_require__(19),
    defined = __webpack_require__(15);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that)),
        i = toInteger(pos),
        l = s.length,
        a,
        b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toInteger = __webpack_require__(19),
    max = Math.max,
    min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.1.13 ToObject(argument)
var defined = __webpack_require__(15);
module.exports = function (it) {
  return Object(defined(it));
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(11);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__(14),
    ITERATOR = __webpack_require__(0)('iterator'),
    Iterators = __webpack_require__(7);
module.exports = __webpack_require__(4).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addToUnscopables = __webpack_require__(39),
    step = __webpack_require__(50),
    Iterators = __webpack_require__(7),
    toIObject = __webpack_require__(20);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(27)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0; // next index
  this._k = kind; // kind
  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t,
      kind = this._k,
      index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()

var classof = __webpack_require__(14),
    test = {};
test[__webpack_require__(0)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(8)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LIBRARY = __webpack_require__(28),
    global = __webpack_require__(1),
    ctx = __webpack_require__(10),
    classof = __webpack_require__(14),
    $export = __webpack_require__(24),
    isObject = __webpack_require__(11),
    aFunction = __webpack_require__(13),
    anInstance = __webpack_require__(40),
    forOf = __webpack_require__(42),
    speciesConstructor = __webpack_require__(59),
    task = __webpack_require__(31).set,
    microtask = __webpack_require__(51)(),
    PROMISE = 'Promise',
    TypeError = global.TypeError,
    process = global.process,
    $Promise = global[PROMISE],
    process = global.process,
    isNode = classof(process) == 'process',
    empty = function empty() {/* empty */},
    Internal,
    GenericPromiseCapability,
    Wrapper;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1),
        FakePromise = (promise.constructor = {})[__webpack_require__(0)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) {/* empty */}
}();

// helpers
var sameConstructor = function sameConstructor(a, b) {
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function isThenable(it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function newPromiseCapability(C) {
  return sameConstructor($Promise, C) ? new PromiseCapability(C) : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function GenericPromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
};
var perform = function perform(exec) {
  try {
    exec();
  } catch (e) {
    return { error: e };
  }
};
var notify = function notify(promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v,
        ok = promise._s == 1,
        i = 0;
    var run = function run(reaction) {
      var handler = ok ? reaction.ok : reaction.fail,
          resolve = reaction.resolve,
          reject = reaction.reject,
          domain = reaction.domain,
          result,
          then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) {
      run(chain[i++]);
    } // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function onUnhandled(promise) {
  task.call(global, function () {
    var value = promise._v,
        abrupt,
        handler,
        console;
    if (isUnhandled(promise)) {
      abrupt = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    }promise._a = undefined;
    if (abrupt) throw abrupt.error;
  });
};
var isUnhandled = function isUnhandled(promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c,
      i = 0,
      reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  }return true;
};
var onHandleUnhandled = function onHandleUnhandled(promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function $reject(value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function $resolve(value) {
  var promise = this,
      then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor) {
    this._c = []; // <- awaiting reactions
    this._a = undefined; // <- checked in isUnhandled reactions
    this._s = 0; // <- state
    this._d = false; // <- done
    this._v = undefined; // <- value
    this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false; // <- notify
  };
  Internal.prototype = __webpack_require__(57)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function _catch(onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function PromiseCapability() {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(17)($Promise, PROMISE);
__webpack_require__(58)(PROMISE);
Wrapper = __webpack_require__(4)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this),
        $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if (x instanceof $Promise && sameConstructor(x.constructor, this)) return x;
    var capability = newPromiseCapability(this),
        $$resolve = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(49)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this,
        capability = newPromiseCapability(C),
        resolve = capability.resolve,
        reject = capability.reject;
    var abrupt = perform(function () {
      var values = [],
          index = 0,
          remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++,
            alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (abrupt) reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this,
        capability = newPromiseCapability(C),
        reject = capability.reject;
    var abrupt = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (abrupt) reject(abrupt.error);
    return capability.promise;
  }
});

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $at = __webpack_require__(60)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(27)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0; // next index
  // 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t,
      index = this._i,
      point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $iterators = __webpack_require__(65),
    redefine = __webpack_require__(8),
    global = __webpack_require__(1),
    hide = __webpack_require__(3),
    Iterators = __webpack_require__(7),
    wks = __webpack_require__(0),
    ITERATOR = wks('iterator'),
    TO_STRING_TAG = wks('toStringTag'),
    ArrayValues = Iterators.Array;

for (var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++) {
  var NAME = collections[i],
      Collection = global[NAME],
      proto = Collection && Collection.prototype,
      key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    for (key in $iterators) {
      if (!proto[key]) redefine(proto, key, $iterators[key], true);
    }
  }
}

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function () {
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
			return function () {
				return method.apply(context, arguments);
			};
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
			layer.removeEventListener = function (type, callback, capture) {
				var rmv = Node.prototype.removeEventListener;
				if (type === 'click') {
					rmv.call(layer, type, callback.hijacked || callback, capture);
				} else {
					rmv.call(layer, type, callback, capture);
				}
			};

			layer.addEventListener = function (type, callback, capture) {
				var adv = Node.prototype.addEventListener;
				if (type === 'click') {
					adv.call(layer, type, callback.hijacked || (callback.hijacked = function (event) {
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
			layer.addEventListener('click', function (event) {
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
	var deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent);

	/**
  * iOS 6.0-7.* requires the target element to be manually derived
  *
  * @type boolean
  */
	var deviceIsIOSWithBadTarget = deviceIsIOS && /OS [6-7]_\d/.test(navigator.userAgent);

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
	FastClick.prototype.needsClick = function (target) {
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
				if (deviceIsIOS && target.type === 'file' || target.disabled) {
					return true;
				}

				break;
			case 'label':
			case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
			case 'video':
				return true;
		}

		return (/\bneedsclick\b/.test(target.className)
		);
	};

	/**
  * Determine whether a given element requires a call to focus to simulate click into element.
  *
  * @param {EventTarget|Element} target Target DOM element
  * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
  */
	FastClick.prototype.needsFocus = function (target) {
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
				return (/\bneedsfocus\b/.test(target.className)
				);
		}
	};

	/**
  * Send a click event to the specified element.
  *
  * @param {EventTarget|Element} targetElement
  * @param {Event} event
  */
	FastClick.prototype.sendClick = function (targetElement, event) {
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

	FastClick.prototype.determineEventType = function (targetElement) {

		//Issue #159: Android Chrome Select Box does not open with a synthetic click event
		if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
			return 'mousedown';
		}

		return 'click';
	};

	/**
  * @param {EventTarget|Element} targetElement
  */
	FastClick.prototype.focus = function (targetElement) {
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
	FastClick.prototype.updateScrollParent = function (targetElement) {
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
	FastClick.prototype.getTargetElementFromEventTarget = function (eventTarget) {

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
	FastClick.prototype.onTouchStart = function (event) {
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
		if (event.timeStamp - this.lastClickTime < this.tapDelay) {
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
	FastClick.prototype.touchHasMoved = function (event) {
		var touch = event.changedTouches[0],
		    boundary = this.touchBoundary;

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
	FastClick.prototype.onTouchMove = function (event) {
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
	FastClick.prototype.findControl = function (labelElement) {

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
	FastClick.prototype.onTouchEnd = function (event) {
		var forElement,
		    trackingClickStart,
		    targetTagName,
		    scrollParent,
		    touch,
		    targetElement = this.targetElement;

		if (!this.trackingClick) {
			return true;
		}

		// Prevent phantom clicks on fast double-tap (issue #36)
		if (event.timeStamp - this.lastClickTime < this.tapDelay) {
			this.cancelNextClick = true;
			return true;
		}

		if (event.timeStamp - this.trackingClickStart > this.tapTimeout) {
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
			if (event.timeStamp - trackingClickStart > 100 || deviceIsIOS && window.top !== window && targetTagName === 'input') {
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
	FastClick.prototype.onTouchCancel = function () {
		this.trackingClick = false;
		this.targetElement = null;
	};

	/**
  * Determine mouse events which should be permitted.
  *
  * @param {Event} event
  * @returns {boolean}
  */
	FastClick.prototype.onMouse = function (event) {

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
	FastClick.prototype.onClick = function (event) {
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
	FastClick.prototype.destroy = function () {
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
	FastClick.notNeeded = function (layer) {
		var metaViewport;
		var chromeVersion;
		var blackberryVersion;
		var firefoxVersion;

		// Devices that don't support touch don't need FastClick
		if (typeof window.ontouchstart === 'undefined') {
			return true;
		}

		// Chrome version - zero for other browsers
		chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

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
		firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

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
	FastClick.attach = function (layer, options) {
		return new FastClick(layer, options);
	};

	if ("function" === 'function' && _typeof(__webpack_require__(34)) === 'object' && __webpack_require__(34)) {

		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return FastClick;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = FastClick.attach;
		module.exports.FastClick = FastClick;
	} else {
		window.FastClick = FastClick;
	}
})();

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * JavaScript Cookie v2.1.3
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
	if (( false ? 'undefined' : _typeof(exports)) === 'object') {
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
})(function () {
	function extend() {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[i];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init(converter) {
		function api(key, value, attributes) {
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

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				return document.cookie = [key, '=', value, attributes.expires ? '; expires=' + attributes.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				attributes.path ? '; path=' + attributes.path : '', attributes.domain ? '; domain=' + attributes.domain : '', attributes.secure ? '; secure' : ''].join('');
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

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ? converter.read(cookie, name) : converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);

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
});

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 0.7.2
 * Copyright (C) 2016 Oliver Nightingale
 * @license MIT
 */

;(function () {

  /**
   * Convenience function for instantiating a new lunr index and configuring it
   * with the default pipeline functions and the passed config function.
   *
   * When using this convenience function a new index will be created with the
   * following functions already in the pipeline:
   *
   * lunr.StopWordFilter - filters out any stop words before they enter the
   * index
   *
   * lunr.stemmer - stems the tokens before entering the index.
   *
   * Example:
   *
   *     var idx = lunr(function () {
   *       this.field('title', 10)
   *       this.field('tags', 100)
   *       this.field('body')
   *       
   *       this.ref('cid')
   *       
   *       this.pipeline.add(function () {
   *         // some custom pipeline function
   *       })
   *       
   *     })
   *
   * @param {Function} config A function that will be called with the new instance
   * of the lunr.Index as both its context and first parameter. It can be used to
   * customize the instance of new lunr.Index.
   * @namespace
   * @module
   * @returns {lunr.Index}
   *
   */
  var lunr = function lunr(config) {
    var idx = new lunr.Index();

    idx.pipeline.add(lunr.trimmer, lunr.stopWordFilter, lunr.stemmer);

    if (config) config.call(idx, idx);

    return idx;
  };

  lunr.version = "0.7.2";
  /*!
   * lunr.utils
   * Copyright (C) 2016 Oliver Nightingale
   */

  /**
   * A namespace containing utils for the rest of the lunr library
   */
  lunr.utils = {};

  /**
   * Print a warning message to the console.
   *
   * @param {String} message The message to be printed.
   * @memberOf Utils
   */
  lunr.utils.warn = function (global) {
    return function (message) {
      if (global.console && console.warn) {
        console.warn(message);
      }
    };
  }(this);

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
      return "";
    } else {
      return obj.toString();
    }
  };
  /*!
   * lunr.EventEmitter
   * Copyright (C) 2016 Oliver Nightingale
   */

  /**
   * lunr.EventEmitter is an event emitter for lunr. It manages adding and removing event handlers and triggering events and their handlers.
   *
   * @constructor
   */
  lunr.EventEmitter = function () {
    this.events = {};
  };

  /**
   * Binds a handler function to a specific event(s).
   *
   * Can bind a single function to many different events in one call.
   *
   * @param {String} [eventName] The name(s) of events to bind this function to.
   * @param {Function} fn The function to call when an event is fired.
   * @memberOf EventEmitter
   */
  lunr.EventEmitter.prototype.addListener = function () {
    var args = Array.prototype.slice.call(arguments),
        fn = args.pop(),
        names = args;

    if (typeof fn !== "function") throw new TypeError("last argument must be a function");

    names.forEach(function (name) {
      if (!this.hasHandler(name)) this.events[name] = [];
      this.events[name].push(fn);
    }, this);
  };

  /**
   * Removes a handler function from a specific event.
   *
   * @param {String} eventName The name of the event to remove this function from.
   * @param {Function} fn The function to remove from an event.
   * @memberOf EventEmitter
   */
  lunr.EventEmitter.prototype.removeListener = function (name, fn) {
    if (!this.hasHandler(name)) return;

    var fnIndex = this.events[name].indexOf(fn);
    this.events[name].splice(fnIndex, 1);

    if (!this.events[name].length) delete this.events[name];
  };

  /**
   * Calls all functions bound to the given event.
   *
   * Additional data can be passed to the event handler as arguments to `emit`
   * after the event name.
   *
   * @param {String} eventName The name of the event to emit.
   * @memberOf EventEmitter
   */
  lunr.EventEmitter.prototype.emit = function (name) {
    if (!this.hasHandler(name)) return;

    var args = Array.prototype.slice.call(arguments, 1);

    this.events[name].forEach(function (fn) {
      fn.apply(undefined, args);
    });
  };

  /**
   * Checks whether a handler has ever been stored against an event.
   *
   * @param {String} eventName The name of the event to check.
   * @private
   * @memberOf EventEmitter
   */
  lunr.EventEmitter.prototype.hasHandler = function (name) {
    return name in this.events;
  };

  /*!
   * lunr.tokenizer
   * Copyright (C) 2016 Oliver Nightingale
   */

  /**
   * A function for splitting a string into tokens ready to be inserted into
   * the search index. Uses `lunr.tokenizer.separator` to split strings, change
   * the value of this property to change how strings are split into tokens.
   *
   * @module
   * @param {String} obj The string to convert into tokens
   * @see lunr.tokenizer.separator
   * @returns {Array}
   */
  lunr.tokenizer = function (obj) {
    if (!arguments.length || obj == null || obj == undefined) return [];
    if (Array.isArray(obj)) return obj.map(function (t) {
      return lunr.utils.asString(t).toLowerCase();
    });

    // TODO: This exists so that the deprecated property lunr.tokenizer.seperator can still be used. By
    // default it is set to false and so the correctly spelt lunr.tokenizer.separator is used unless
    // the user is using the old property to customise the tokenizer.
    //
    // This should be removed when version 1.0.0 is released.
    var separator = lunr.tokenizer.seperator || lunr.tokenizer.separator;

    return obj.toString().trim().toLowerCase().split(separator);
  };

  /**
   * This property is legacy alias for lunr.tokenizer.separator to maintain backwards compatability.
   * When introduced the token was spelt incorrectly. It will remain until 1.0.0 when it will be removed,
   * all code should use the correctly spelt lunr.tokenizer.separator property instead.
   *
   * @static
   * @see lunr.tokenizer.separator
   * @deprecated since 0.7.2 will be removed in 1.0.0
   * @private
   * @see lunr.tokenizer
   */
  lunr.tokenizer.seperator = false;

  /**
   * The sperator used to split a string into tokens. Override this property to change the behaviour of
   * `lunr.tokenizer` behaviour when tokenizing strings. By default this splits on whitespace and hyphens.
   *
   * @static
   * @see lunr.tokenizer
   */
  lunr.tokenizer.separator = /[\s\-]+/;

  /**
   * Loads a previously serialised tokenizer.
   *
   * A tokenizer function to be loaded must already be registered with lunr.tokenizer.
   * If the serialised tokenizer has not been registered then an error will be thrown.
   *
   * @param {String} label The label of the serialised tokenizer.
   * @returns {Function}
   * @memberOf tokenizer
   */
  lunr.tokenizer.load = function (label) {
    var fn = this.registeredFunctions[label];

    if (!fn) {
      throw new Error('Cannot load un-registered function: ' + label);
    }

    return fn;
  };

  lunr.tokenizer.label = 'default';

  lunr.tokenizer.registeredFunctions = {
    'default': lunr.tokenizer
  };

  /**
   * Register a tokenizer function.
   *
   * Functions that are used as tokenizers should be registered if they are to be used with a serialised index.
   *
   * Registering a function does not add it to an index, functions must still be associated with a specific index for them to be used when indexing and searching documents.
   *
   * @param {Function} fn The function to register.
   * @param {String} label The label to register this function with
   * @memberOf tokenizer
   */
  lunr.tokenizer.registerFunction = function (fn, label) {
    if (label in this.registeredFunctions) {
      lunr.utils.warn('Overwriting existing tokenizer: ' + label);
    }

    fn.label = label;
    this.registeredFunctions[label] = fn;
  };
  /*!
   * lunr.Pipeline
   * Copyright (C) 2016 Oliver Nightingale
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
    this._stack = [];
  };

  lunr.Pipeline.registeredFunctions = {};

  /**
   * Register a function with the pipeline.
   *
   * Functions that are used in the pipeline should be registered if the pipeline
   * needs to be serialised, or a serialised pipeline needs to be loaded.
   *
   * Registering a function does not add it to a pipeline, functions must still be
   * added to instances of the pipeline for them to be used when running a pipeline.
   *
   * @param {Function} fn The function to check for.
   * @param {String} label The label to register this function with
   * @memberOf Pipeline
   */
  lunr.Pipeline.registerFunction = function (fn, label) {
    if (label in this.registeredFunctions) {
      lunr.utils.warn('Overwriting existing registered function: ' + label);
    }

    fn.label = label;
    lunr.Pipeline.registeredFunctions[fn.label] = fn;
  };

  /**
   * Warns if the function is not registered as a Pipeline function.
   *
   * @param {Function} fn The function to check for.
   * @private
   * @memberOf Pipeline
   */
  lunr.Pipeline.warnIfFunctionNotRegistered = function (fn) {
    var isRegistered = fn.label && fn.label in this.registeredFunctions;

    if (!isRegistered) {
      lunr.utils.warn('Function is not registered with pipeline. This may cause problems when serialising the index.\n', fn);
    }
  };

  /**
   * Loads a previously serialised pipeline.
   *
   * All functions to be loaded must already be registered with lunr.Pipeline.
   * If any function from the serialised data has not been registered then an
   * error will be thrown.
   *
   * @param {Object} serialised The serialised pipeline to load.
   * @returns {lunr.Pipeline}
   * @memberOf Pipeline
   */
  lunr.Pipeline.load = function (serialised) {
    var pipeline = new lunr.Pipeline();

    serialised.forEach(function (fnName) {
      var fn = lunr.Pipeline.registeredFunctions[fnName];

      if (fn) {
        pipeline.add(fn);
      } else {
        throw new Error('Cannot load un-registered function: ' + fnName);
      }
    });

    return pipeline;
  };

  /**
   * Adds new functions to the end of the pipeline.
   *
   * Logs a warning if the function has not been registered.
   *
   * @param {Function} functions Any number of functions to add to the pipeline.
   * @memberOf Pipeline
   */
  lunr.Pipeline.prototype.add = function () {
    var fns = Array.prototype.slice.call(arguments);

    fns.forEach(function (fn) {
      lunr.Pipeline.warnIfFunctionNotRegistered(fn);
      this._stack.push(fn);
    }, this);
  };

  /**
   * Adds a single function after a function that already exists in the
   * pipeline.
   *
   * Logs a warning if the function has not been registered.
   *
   * @param {Function} existingFn A function that already exists in the pipeline.
   * @param {Function} newFn The new function to add to the pipeline.
   * @memberOf Pipeline
   */
  lunr.Pipeline.prototype.after = function (existingFn, newFn) {
    lunr.Pipeline.warnIfFunctionNotRegistered(newFn);

    var pos = this._stack.indexOf(existingFn);
    if (pos == -1) {
      throw new Error('Cannot find existingFn');
    }

    pos = pos + 1;
    this._stack.splice(pos, 0, newFn);
  };

  /**
   * Adds a single function before a function that already exists in the
   * pipeline.
   *
   * Logs a warning if the function has not been registered.
   *
   * @param {Function} existingFn A function that already exists in the pipeline.
   * @param {Function} newFn The new function to add to the pipeline.
   * @memberOf Pipeline
   */
  lunr.Pipeline.prototype.before = function (existingFn, newFn) {
    lunr.Pipeline.warnIfFunctionNotRegistered(newFn);

    var pos = this._stack.indexOf(existingFn);
    if (pos == -1) {
      throw new Error('Cannot find existingFn');
    }

    this._stack.splice(pos, 0, newFn);
  };

  /**
   * Removes a function from the pipeline.
   *
   * @param {Function} fn The function to remove from the pipeline.
   * @memberOf Pipeline
   */
  lunr.Pipeline.prototype.remove = function (fn) {
    var pos = this._stack.indexOf(fn);
    if (pos == -1) {
      return;
    }

    this._stack.splice(pos, 1);
  };

  /**
   * Runs the current list of functions that make up the pipeline against the
   * passed tokens.
   *
   * @param {Array} tokens The tokens to run through the pipeline.
   * @returns {Array}
   * @memberOf Pipeline
   */
  lunr.Pipeline.prototype.run = function (tokens) {
    var out = [],
        tokenLength = tokens.length,
        stackLength = this._stack.length;

    for (var i = 0; i < tokenLength; i++) {
      var token = tokens[i];

      for (var j = 0; j < stackLength; j++) {
        token = this._stack[j](token, i, tokens);
        if (token === void 0 || token === '') break;
      };

      if (token !== void 0 && token !== '') out.push(token);
    };

    return out;
  };

  /**
   * Resets the pipeline by removing any existing processors.
   *
   * @memberOf Pipeline
   */
  lunr.Pipeline.prototype.reset = function () {
    this._stack = [];
  };

  /**
   * Returns a representation of the pipeline ready for serialisation.
   *
   * Logs a warning if the function has not been registered.
   *
   * @returns {Array}
   * @memberOf Pipeline
   */
  lunr.Pipeline.prototype.toJSON = function () {
    return this._stack.map(function (fn) {
      lunr.Pipeline.warnIfFunctionNotRegistered(fn);

      return fn.label;
    });
  };
  /*!
   * lunr.Vector
   * Copyright (C) 2016 Oliver Nightingale
   */

  /**
   * lunr.Vectors implement vector related operations for
   * a series of elements.
   *
   * @constructor
   */
  lunr.Vector = function () {
    this._magnitude = null;
    this.list = undefined;
    this.length = 0;
  };

  /**
   * lunr.Vector.Node is a simple struct for each node
   * in a lunr.Vector.
   *
   * @private
   * @param {Number} The index of the node in the vector.
   * @param {Object} The data at this node in the vector.
   * @param {lunr.Vector.Node} The node directly after this node in the vector.
   * @constructor
   * @memberOf Vector
   */
  lunr.Vector.Node = function (idx, val, next) {
    this.idx = idx;
    this.val = val;
    this.next = next;
  };

  /**
   * Inserts a new value at a position in a vector.
   *
   * @param {Number} The index at which to insert a value.
   * @param {Object} The object to insert in the vector.
   * @memberOf Vector.
   */
  lunr.Vector.prototype.insert = function (idx, val) {
    this._magnitude = undefined;
    var list = this.list;

    if (!list) {
      this.list = new lunr.Vector.Node(idx, val, list);
      return this.length++;
    }

    if (idx < list.idx) {
      this.list = new lunr.Vector.Node(idx, val, list);
      return this.length++;
    }

    var prev = list,
        next = list.next;

    while (next != undefined) {
      if (idx < next.idx) {
        prev.next = new lunr.Vector.Node(idx, val, next);
        return this.length++;
      }

      prev = next, next = next.next;
    }

    prev.next = new lunr.Vector.Node(idx, val, next);
    return this.length++;
  };

  /**
   * Calculates the magnitude of this vector.
   *
   * @returns {Number}
   * @memberOf Vector
   */
  lunr.Vector.prototype.magnitude = function () {
    if (this._magnitude) return this._magnitude;
    var node = this.list,
        sumOfSquares = 0,
        val;

    while (node) {
      val = node.val;
      sumOfSquares += val * val;
      node = node.next;
    }

    return this._magnitude = Math.sqrt(sumOfSquares);
  };

  /**
   * Calculates the dot product of this vector and another vector.
   *
   * @param {lunr.Vector} otherVector The vector to compute the dot product with.
   * @returns {Number}
   * @memberOf Vector
   */
  lunr.Vector.prototype.dot = function (otherVector) {
    var node = this.list,
        otherNode = otherVector.list,
        dotProduct = 0;

    while (node && otherNode) {
      if (node.idx < otherNode.idx) {
        node = node.next;
      } else if (node.idx > otherNode.idx) {
        otherNode = otherNode.next;
      } else {
        dotProduct += node.val * otherNode.val;
        node = node.next;
        otherNode = otherNode.next;
      }
    }

    return dotProduct;
  };

  /**
   * Calculates the cosine similarity between this vector and another
   * vector.
   *
   * @param {lunr.Vector} otherVector The other vector to calculate the
   * similarity with.
   * @returns {Number}
   * @memberOf Vector
   */
  lunr.Vector.prototype.similarity = function (otherVector) {
    return this.dot(otherVector) / (this.magnitude() * otherVector.magnitude());
  };
  /*!
   * lunr.SortedSet
   * Copyright (C) 2016 Oliver Nightingale
   */

  /**
   * lunr.SortedSets are used to maintain an array of uniq values in a sorted
   * order.
   *
   * @constructor
   */
  lunr.SortedSet = function () {
    this.length = 0;
    this.elements = [];
  };

  /**
   * Loads a previously serialised sorted set.
   *
   * @param {Array} serialisedData The serialised set to load.
   * @returns {lunr.SortedSet}
   * @memberOf SortedSet
   */
  lunr.SortedSet.load = function (serialisedData) {
    var set = new this();

    set.elements = serialisedData;
    set.length = serialisedData.length;

    return set;
  };

  /**
   * Inserts new items into the set in the correct position to maintain the
   * order.
   *
   * @param {Object} The objects to add to this set.
   * @memberOf SortedSet
   */
  lunr.SortedSet.prototype.add = function () {
    var i, element;

    for (i = 0; i < arguments.length; i++) {
      element = arguments[i];
      if (~this.indexOf(element)) continue;
      this.elements.splice(this.locationFor(element), 0, element);
    }

    this.length = this.elements.length;
  };

  /**
   * Converts this sorted set into an array.
   *
   * @returns {Array}
   * @memberOf SortedSet
   */
  lunr.SortedSet.prototype.toArray = function () {
    return this.elements.slice();
  };

  /**
   * Creates a new array with the results of calling a provided function on every
   * element in this sorted set.
   *
   * Delegates to Array.prototype.map and has the same signature.
   *
   * @param {Function} fn The function that is called on each element of the
   * set.
   * @param {Object} ctx An optional object that can be used as the context
   * for the function fn.
   * @returns {Array}
   * @memberOf SortedSet
   */
  lunr.SortedSet.prototype.map = function (fn, ctx) {
    return this.elements.map(fn, ctx);
  };

  /**
   * Executes a provided function once per sorted set element.
   *
   * Delegates to Array.prototype.forEach and has the same signature.
   *
   * @param {Function} fn The function that is called on each element of the
   * set.
   * @param {Object} ctx An optional object that can be used as the context
   * @memberOf SortedSet
   * for the function fn.
   */
  lunr.SortedSet.prototype.forEach = function (fn, ctx) {
    return this.elements.forEach(fn, ctx);
  };

  /**
   * Returns the index at which a given element can be found in the
   * sorted set, or -1 if it is not present.
   *
   * @param {Object} elem The object to locate in the sorted set.
   * @returns {Number}
   * @memberOf SortedSet
   */
  lunr.SortedSet.prototype.indexOf = function (elem) {
    var start = 0,
        end = this.elements.length,
        sectionLength = end - start,
        pivot = start + Math.floor(sectionLength / 2),
        pivotElem = this.elements[pivot];

    while (sectionLength > 1) {
      if (pivotElem === elem) return pivot;

      if (pivotElem < elem) start = pivot;
      if (pivotElem > elem) end = pivot;

      sectionLength = end - start;
      pivot = start + Math.floor(sectionLength / 2);
      pivotElem = this.elements[pivot];
    }

    if (pivotElem === elem) return pivot;

    return -1;
  };

  /**
   * Returns the position within the sorted set that an element should be
   * inserted at to maintain the current order of the set.
   *
   * This function assumes that the element to search for does not already exist
   * in the sorted set.
   *
   * @param {Object} elem The elem to find the position for in the set
   * @returns {Number}
   * @memberOf SortedSet
   */
  lunr.SortedSet.prototype.locationFor = function (elem) {
    var start = 0,
        end = this.elements.length,
        sectionLength = end - start,
        pivot = start + Math.floor(sectionLength / 2),
        pivotElem = this.elements[pivot];

    while (sectionLength > 1) {
      if (pivotElem < elem) start = pivot;
      if (pivotElem > elem) end = pivot;

      sectionLength = end - start;
      pivot = start + Math.floor(sectionLength / 2);
      pivotElem = this.elements[pivot];
    }

    if (pivotElem > elem) return pivot;
    if (pivotElem < elem) return pivot + 1;
  };

  /**
   * Creates a new lunr.SortedSet that contains the elements in the intersection
   * of this set and the passed set.
   *
   * @param {lunr.SortedSet} otherSet The set to intersect with this set.
   * @returns {lunr.SortedSet}
   * @memberOf SortedSet
   */
  lunr.SortedSet.prototype.intersect = function (otherSet) {
    var intersectSet = new lunr.SortedSet(),
        i = 0,
        j = 0,
        a_len = this.length,
        b_len = otherSet.length,
        a = this.elements,
        b = otherSet.elements;

    while (true) {
      if (i > a_len - 1 || j > b_len - 1) break;

      if (a[i] === b[j]) {
        intersectSet.add(a[i]);
        i++, j++;
        continue;
      }

      if (a[i] < b[j]) {
        i++;
        continue;
      }

      if (a[i] > b[j]) {
        j++;
        continue;
      }
    };

    return intersectSet;
  };

  /**
   * Makes a copy of this set
   *
   * @returns {lunr.SortedSet}
   * @memberOf SortedSet
   */
  lunr.SortedSet.prototype.clone = function () {
    var clone = new lunr.SortedSet();

    clone.elements = this.toArray();
    clone.length = clone.elements.length;

    return clone;
  };

  /**
   * Creates a new lunr.SortedSet that contains the elements in the union
   * of this set and the passed set.
   *
   * @param {lunr.SortedSet} otherSet The set to union with this set.
   * @returns {lunr.SortedSet}
   * @memberOf SortedSet
   */
  lunr.SortedSet.prototype.union = function (otherSet) {
    var longSet, shortSet, unionSet;

    if (this.length >= otherSet.length) {
      longSet = this, shortSet = otherSet;
    } else {
      longSet = otherSet, shortSet = this;
    }

    unionSet = longSet.clone();

    for (var i = 0, shortSetElements = shortSet.toArray(); i < shortSetElements.length; i++) {
      unionSet.add(shortSetElements[i]);
    }

    return unionSet;
  };

  /**
   * Returns a representation of the sorted set ready for serialisation.
   *
   * @returns {Array}
   * @memberOf SortedSet
   */
  lunr.SortedSet.prototype.toJSON = function () {
    return this.toArray();
  };
  /*!
   * lunr.Index
   * Copyright (C) 2016 Oliver Nightingale
   */

  /**
   * lunr.Index is object that manages a search index.  It contains the indexes
   * and stores all the tokens and document lookups.  It also provides the main
   * user facing API for the library.
   *
   * @constructor
   */
  lunr.Index = function () {
    this._fields = [];
    this._ref = 'id';
    this.pipeline = new lunr.Pipeline();
    this.documentStore = new lunr.Store();
    this.tokenStore = new lunr.TokenStore();
    this.corpusTokens = new lunr.SortedSet();
    this.eventEmitter = new lunr.EventEmitter();
    this.tokenizerFn = lunr.tokenizer;

    this._idfCache = {};

    this.on('add', 'remove', 'update', function () {
      this._idfCache = {};
    }.bind(this));
  };

  /**
   * Bind a handler to events being emitted by the index.
   *
   * The handler can be bound to many events at the same time.
   *
   * @param {String} [eventName] The name(s) of events to bind the function to.
   * @param {Function} fn The serialised set to load.
   * @memberOf Index
   */
  lunr.Index.prototype.on = function () {
    var args = Array.prototype.slice.call(arguments);
    return this.eventEmitter.addListener.apply(this.eventEmitter, args);
  };

  /**
   * Removes a handler from an event being emitted by the index.
   *
   * @param {String} eventName The name of events to remove the function from.
   * @param {Function} fn The serialised set to load.
   * @memberOf Index
   */
  lunr.Index.prototype.off = function (name, fn) {
    return this.eventEmitter.removeListener(name, fn);
  };

  /**
   * Loads a previously serialised index.
   *
   * Issues a warning if the index being imported was serialised
   * by a different version of lunr.
   *
   * @param {Object} serialisedData The serialised set to load.
   * @returns {lunr.Index}
   * @memberOf Index
   */
  lunr.Index.load = function (serialisedData) {
    if (serialisedData.version !== lunr.version) {
      lunr.utils.warn('version mismatch: current ' + lunr.version + ' importing ' + serialisedData.version);
    }

    var idx = new this();

    idx._fields = serialisedData.fields;
    idx._ref = serialisedData.ref;

    idx.tokenizer(lunr.tokenizer.load(serialisedData.tokenizer));
    idx.documentStore = lunr.Store.load(serialisedData.documentStore);
    idx.tokenStore = lunr.TokenStore.load(serialisedData.tokenStore);
    idx.corpusTokens = lunr.SortedSet.load(serialisedData.corpusTokens);
    idx.pipeline = lunr.Pipeline.load(serialisedData.pipeline);

    return idx;
  };

  /**
   * Adds a field to the list of fields that will be searchable within documents
   * in the index.
   *
   * An optional boost param can be passed to affect how much tokens in this field
   * rank in search results, by default the boost value is 1.
   *
   * Fields should be added before any documents are added to the index, fields
   * that are added after documents are added to the index will only apply to new
   * documents added to the index.
   *
   * @param {String} fieldName The name of the field within the document that
   * should be indexed
   * @param {Number} boost An optional boost that can be applied to terms in this
   * field.
   * @returns {lunr.Index}
   * @memberOf Index
   */
  lunr.Index.prototype.field = function (fieldName, opts) {
    var opts = opts || {},
        field = { name: fieldName, boost: opts.boost || 1 };

    this._fields.push(field);
    return this;
  };

  /**
   * Sets the property used to uniquely identify documents added to the index,
   * by default this property is 'id'.
   *
   * This should only be changed before adding documents to the index, changing
   * the ref property without resetting the index can lead to unexpected results.
   *
   * The value of ref can be of any type but it _must_ be stably comparable and
   * orderable.
   *
   * @param {String} refName The property to use to uniquely identify the
   * documents in the index.
   * @param {Boolean} emitEvent Whether to emit add events, defaults to true
   * @returns {lunr.Index}
   * @memberOf Index
   */
  lunr.Index.prototype.ref = function (refName) {
    this._ref = refName;
    return this;
  };

  /**
   * Sets the tokenizer used for this index.
   *
   * By default the index will use the default tokenizer, lunr.tokenizer. The tokenizer
   * should only be changed before adding documents to the index. Changing the tokenizer
   * without re-building the index can lead to unexpected results.
   *
   * @param {Function} fn The function to use as a tokenizer.
   * @returns {lunr.Index}
   * @memberOf Index
   */
  lunr.Index.prototype.tokenizer = function (fn) {
    var isRegistered = fn.label && fn.label in lunr.tokenizer.registeredFunctions;

    if (!isRegistered) {
      lunr.utils.warn('Function is not a registered tokenizer. This may cause problems when serialising the index');
    }

    this.tokenizerFn = fn;
    return this;
  };

  /**
   * Add a document to the index.
   *
   * This is the way new documents enter the index, this function will run the
   * fields from the document through the index's pipeline and then add it to
   * the index, it will then show up in search results.
   *
   * An 'add' event is emitted with the document that has been added and the index
   * the document has been added to. This event can be silenced by passing false
   * as the second argument to add.
   *
   * @param {Object} doc The document to add to the index.
   * @param {Boolean} emitEvent Whether or not to emit events, default true.
   * @memberOf Index
   */
  lunr.Index.prototype.add = function (doc, emitEvent) {
    var docTokens = {},
        allDocumentTokens = new lunr.SortedSet(),
        docRef = doc[this._ref],
        emitEvent = emitEvent === undefined ? true : emitEvent;

    this._fields.forEach(function (field) {
      var fieldTokens = this.pipeline.run(this.tokenizerFn(doc[field.name]));

      docTokens[field.name] = fieldTokens;

      for (var i = 0; i < fieldTokens.length; i++) {
        var token = fieldTokens[i];
        allDocumentTokens.add(token);
        this.corpusTokens.add(token);
      }
    }, this);

    this.documentStore.set(docRef, allDocumentTokens);

    for (var i = 0; i < allDocumentTokens.length; i++) {
      var token = allDocumentTokens.elements[i];
      var tf = 0;

      for (var j = 0; j < this._fields.length; j++) {
        var field = this._fields[j];
        var fieldTokens = docTokens[field.name];
        var fieldLength = fieldTokens.length;

        if (!fieldLength) continue;

        var tokenCount = 0;
        for (var k = 0; k < fieldLength; k++) {
          if (fieldTokens[k] === token) {
            tokenCount++;
          }
        }

        tf += tokenCount / fieldLength * field.boost;
      }

      this.tokenStore.add(token, { ref: docRef, tf: tf });
    };

    if (emitEvent) this.eventEmitter.emit('add', doc, this);
  };

  /**
   * Removes a document from the index.
   *
   * To make sure documents no longer show up in search results they can be
   * removed from the index using this method.
   *
   * The document passed only needs to have the same ref property value as the
   * document that was added to the index, they could be completely different
   * objects.
   *
   * A 'remove' event is emitted with the document that has been removed and the index
   * the document has been removed from. This event can be silenced by passing false
   * as the second argument to remove.
   *
   * @param {Object} doc The document to remove from the index.
   * @param {Boolean} emitEvent Whether to emit remove events, defaults to true
   * @memberOf Index
   */
  lunr.Index.prototype.remove = function (doc, emitEvent) {
    var docRef = doc[this._ref],
        emitEvent = emitEvent === undefined ? true : emitEvent;

    if (!this.documentStore.has(docRef)) return;

    var docTokens = this.documentStore.get(docRef);

    this.documentStore.remove(docRef);

    docTokens.forEach(function (token) {
      this.tokenStore.remove(token, docRef);
    }, this);

    if (emitEvent) this.eventEmitter.emit('remove', doc, this);
  };

  /**
   * Updates a document in the index.
   *
   * When a document contained within the index gets updated, fields changed,
   * added or removed, to make sure it correctly matched against search queries,
   * it should be updated in the index.
   *
   * This method is just a wrapper around `remove` and `add`
   *
   * An 'update' event is emitted with the document that has been updated and the index.
   * This event can be silenced by passing false as the second argument to update. Only
   * an update event will be fired, the 'add' and 'remove' events of the underlying calls
   * are silenced.
   *
   * @param {Object} doc The document to update in the index.
   * @param {Boolean} emitEvent Whether to emit update events, defaults to true
   * @see Index.prototype.remove
   * @see Index.prototype.add
   * @memberOf Index
   */
  lunr.Index.prototype.update = function (doc, emitEvent) {
    var emitEvent = emitEvent === undefined ? true : emitEvent;

    this.remove(doc, false);
    this.add(doc, false);

    if (emitEvent) this.eventEmitter.emit('update', doc, this);
  };

  /**
   * Calculates the inverse document frequency for a token within the index.
   *
   * @param {String} token The token to calculate the idf of.
   * @see Index.prototype.idf
   * @private
   * @memberOf Index
   */
  lunr.Index.prototype.idf = function (term) {
    var cacheKey = "@" + term;
    if (Object.prototype.hasOwnProperty.call(this._idfCache, cacheKey)) return this._idfCache[cacheKey];

    var documentFrequency = this.tokenStore.count(term),
        idf = 1;

    if (documentFrequency > 0) {
      idf = 1 + Math.log(this.documentStore.length / documentFrequency);
    }

    return this._idfCache[cacheKey] = idf;
  };

  /**
   * Searches the index using the passed query.
   *
   * Queries should be a string, multiple words are allowed and will lead to an
   * AND based query, e.g. `idx.search('foo bar')` will run a search for
   * documents containing both 'foo' and 'bar'.
   *
   * All query tokens are passed through the same pipeline that document tokens
   * are passed through, so any language processing involved will be run on every
   * query term.
   *
   * Each query term is expanded, so that the term 'he' might be expanded to
   * 'hello' and 'help' if those terms were already included in the index.
   *
   * Matching documents are returned as an array of objects, each object contains
   * the matching document ref, as set for this index, and the similarity score
   * for this document against the query.
   *
   * @param {String} query The query to search the index with.
   * @returns {Object}
   * @see Index.prototype.idf
   * @see Index.prototype.documentVector
   * @memberOf Index
   */
  lunr.Index.prototype.search = function (query) {
    var queryTokens = this.pipeline.run(this.tokenizerFn(query)),
        queryVector = new lunr.Vector(),
        documentSets = [],
        fieldBoosts = this._fields.reduce(function (memo, f) {
      return memo + f.boost;
    }, 0);

    var hasSomeToken = queryTokens.some(function (token) {
      return this.tokenStore.has(token);
    }, this);

    if (!hasSomeToken) return [];

    queryTokens.forEach(function (token, i, tokens) {
      var tf = 1 / tokens.length * this._fields.length * fieldBoosts,
          self = this;

      var set = this.tokenStore.expand(token).reduce(function (memo, key) {
        var pos = self.corpusTokens.indexOf(key),
            idf = self.idf(key),
            similarityBoost = 1,
            set = new lunr.SortedSet();

        // if the expanded key is not an exact match to the token then
        // penalise the score for this key by how different the key is
        // to the token.
        if (key !== token) {
          var diff = Math.max(3, key.length - token.length);
          similarityBoost = 1 / Math.log(diff);
        }

        // calculate the query tf-idf score for this token
        // applying an similarityBoost to ensure exact matches
        // these rank higher than expanded terms
        if (pos > -1) queryVector.insert(pos, tf * idf * similarityBoost);

        // add all the documents that have this key into a set
        // ensuring that the type of key is preserved
        var matchingDocuments = self.tokenStore.get(key),
            refs = Object.keys(matchingDocuments),
            refsLen = refs.length;

        for (var i = 0; i < refsLen; i++) {
          set.add(matchingDocuments[refs[i]].ref);
        }

        return memo.union(set);
      }, new lunr.SortedSet());

      documentSets.push(set);
    }, this);

    var documentSet = documentSets.reduce(function (memo, set) {
      return memo.intersect(set);
    });

    return documentSet.map(function (ref) {
      return { ref: ref, score: queryVector.similarity(this.documentVector(ref)) };
    }, this).sort(function (a, b) {
      return b.score - a.score;
    });
  };

  /**
   * Generates a vector containing all the tokens in the document matching the
   * passed documentRef.
   *
   * The vector contains the tf-idf score for each token contained in the
   * document with the passed documentRef.  The vector will contain an element
   * for every token in the indexes corpus, if the document does not contain that
   * token the element will be 0.
   *
   * @param {Object} documentRef The ref to find the document with.
   * @returns {lunr.Vector}
   * @private
   * @memberOf Index
   */
  lunr.Index.prototype.documentVector = function (documentRef) {
    var documentTokens = this.documentStore.get(documentRef),
        documentTokensLength = documentTokens.length,
        documentVector = new lunr.Vector();

    for (var i = 0; i < documentTokensLength; i++) {
      var token = documentTokens.elements[i],
          tf = this.tokenStore.get(token)[documentRef].tf,
          idf = this.idf(token);

      documentVector.insert(this.corpusTokens.indexOf(token), tf * idf);
    };

    return documentVector;
  };

  /**
   * Returns a representation of the index ready for serialisation.
   *
   * @returns {Object}
   * @memberOf Index
   */
  lunr.Index.prototype.toJSON = function () {
    return {
      version: lunr.version,
      fields: this._fields,
      ref: this._ref,
      tokenizer: this.tokenizerFn.label,
      documentStore: this.documentStore.toJSON(),
      tokenStore: this.tokenStore.toJSON(),
      corpusTokens: this.corpusTokens.toJSON(),
      pipeline: this.pipeline.toJSON()
    };
  };

  /**
   * Applies a plugin to the current index.
   *
   * A plugin is a function that is called with the index as its context.
   * Plugins can be used to customise or extend the behaviour the index
   * in some way. A plugin is just a function, that encapsulated the custom
   * behaviour that should be applied to the index.
   *
   * The plugin function will be called with the index as its argument, additional
   * arguments can also be passed when calling use. The function will be called
   * with the index as its context.
   *
   * Example:
   *
   *     var myPlugin = function (idx, arg1, arg2) {
   *       // `this` is the index to be extended
   *       // apply any extensions etc here.
   *     }
   *
   *     var idx = lunr(function () {
   *       this.use(myPlugin, 'arg1', 'arg2')
   *     })
   *
   * @param {Function} plugin The plugin to apply.
   * @memberOf Index
   */
  lunr.Index.prototype.use = function (plugin) {
    var args = Array.prototype.slice.call(arguments, 1);
    args.unshift(this);
    plugin.apply(this, args);
  };
  /*!
   * lunr.Store
   * Copyright (C) 2016 Oliver Nightingale
   */

  /**
   * lunr.Store is a simple key-value store used for storing sets of tokens for
   * documents stored in index.
   *
   * @constructor
   * @module
   */
  lunr.Store = function () {
    this.store = {};
    this.length = 0;
  };

  /**
   * Loads a previously serialised store
   *
   * @param {Object} serialisedData The serialised store to load.
   * @returns {lunr.Store}
   * @memberOf Store
   */
  lunr.Store.load = function (serialisedData) {
    var store = new this();

    store.length = serialisedData.length;
    store.store = Object.keys(serialisedData.store).reduce(function (memo, key) {
      memo[key] = lunr.SortedSet.load(serialisedData.store[key]);
      return memo;
    }, {});

    return store;
  };

  /**
   * Stores the given tokens in the store against the given id.
   *
   * @param {Object} id The key used to store the tokens against.
   * @param {Object} tokens The tokens to store against the key.
   * @memberOf Store
   */
  lunr.Store.prototype.set = function (id, tokens) {
    if (!this.has(id)) this.length++;
    this.store[id] = tokens;
  };

  /**
   * Retrieves the tokens from the store for a given key.
   *
   * @param {Object} id The key to lookup and retrieve from the store.
   * @returns {Object}
   * @memberOf Store
   */
  lunr.Store.prototype.get = function (id) {
    return this.store[id];
  };

  /**
   * Checks whether the store contains a key.
   *
   * @param {Object} id The id to look up in the store.
   * @returns {Boolean}
   * @memberOf Store
   */
  lunr.Store.prototype.has = function (id) {
    return id in this.store;
  };

  /**
   * Removes the value for a key in the store.
   *
   * @param {Object} id The id to remove from the store.
   * @memberOf Store
   */
  lunr.Store.prototype.remove = function (id) {
    if (!this.has(id)) return;

    delete this.store[id];
    this.length--;
  };

  /**
   * Returns a representation of the store ready for serialisation.
   *
   * @returns {Object}
   * @memberOf Store
   */
  lunr.Store.prototype.toJSON = function () {
    return {
      store: this.store,
      length: this.length
    };
  };

  /*!
   * lunr.stemmer
   * Copyright (C) 2016 Oliver Nightingale
   * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
   */

  /**
   * lunr.stemmer is an english language stemmer, this is a JavaScript
   * implementation of the PorterStemmer taken from http://tartarus.org/~martin
   *
   * @module
   * @param {String} str The string to stem
   * @returns {String}
   * @see lunr.Pipeline
   */
  lunr.stemmer = function () {
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
    },
        step3list = {
      "icate": "ic",
      "ative": "",
      "alize": "al",
      "iciti": "ic",
      "ical": "ic",
      "ful": "",
      "ness": ""
    },
        c = "[^aeiou]",
        // consonant
    v = "[aeiouy]",
        // vowel
    C = c + "[^aeiouy]*",
        // consonant sequence
    V = v + "[aeiou]*",
        // vowel sequence

    mgr0 = "^(" + C + ")?" + V + C,
        // [C]VC... is m>0
    meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$",
        // [C]VC[V] is m=1
    mgr1 = "^(" + C + ")?" + V + C + V + C,
        // [C]VCVC... is m>1
    s_v = "^(" + C + ")?" + v; // vowel in stem

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
      var stem, suffix, firstch, re, re2, re3, re4;

      if (w.length < 3) {
        return w;
      }

      firstch = w.substr(0, 1);
      if (firstch == "y") {
        w = firstch.toUpperCase() + w.substr(1);
      }

      // Step 1a
      re = re_1a;
      re2 = re2_1a;

      if (re.test(w)) {
        w = w.replace(re, "$1$2");
      } else if (re2.test(w)) {
        w = w.replace(re2, "$1$2");
      }

      // Step 1b
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
            re = re_1b_2;w = w.replace(re, "");
          } else if (re4.test(w)) {
            w = w + "e";
          }
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

      // and turn initial Y back to y

      if (firstch == "y") {
        w = firstch.toLowerCase() + w.substr(1);
      }

      return w;
    };

    return porterStemmer;
  }();

  lunr.Pipeline.registerFunction(lunr.stemmer, 'stemmer');
  /*!
   * lunr.stopWordFilter
   * Copyright (C) 2016 Oliver Nightingale
   */

  /**
   * lunr.generateStopWordFilter builds a stopWordFilter function from the provided
   * list of stop words.
   *
   * The built in lunr.stopWordFilter is built using this generator and can be used
   * to generate custom stopWordFilters for applications or non English languages.
   *
   * @module
   * @param {Array} token The token to pass through the filter
   * @returns {Function}
   * @see lunr.Pipeline
   * @see lunr.stopWordFilter
   */
  lunr.generateStopWordFilter = function (stopWords) {
    var words = stopWords.reduce(function (memo, stopWord) {
      memo[stopWord] = stopWord;
      return memo;
    }, {});

    return function (token) {
      if (token && words[token] !== token) return token;
    };
  };

  /**
   * lunr.stopWordFilter is an English language stop word list filter, any words
   * contained in the list will not be passed through the filter.
   *
   * This is intended to be used in the Pipeline. If the token does not pass the
   * filter then undefined will be returned.
   *
   * @module
   * @param {String} token The token to pass through the filter
   * @returns {String}
   * @see lunr.Pipeline
   */
  lunr.stopWordFilter = lunr.generateStopWordFilter(['a', 'able', 'about', 'across', 'after', 'all', 'almost', 'also', 'am', 'among', 'an', 'and', 'any', 'are', 'as', 'at', 'be', 'because', 'been', 'but', 'by', 'can', 'cannot', 'could', 'dear', 'did', 'do', 'does', 'either', 'else', 'ever', 'every', 'for', 'from', 'get', 'got', 'had', 'has', 'have', 'he', 'her', 'hers', 'him', 'his', 'how', 'however', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'just', 'least', 'let', 'like', 'likely', 'may', 'me', 'might', 'most', 'must', 'my', 'neither', 'no', 'nor', 'not', 'of', 'off', 'often', 'on', 'only', 'or', 'other', 'our', 'own', 'rather', 'said', 'say', 'says', 'she', 'should', 'since', 'so', 'some', 'than', 'that', 'the', 'their', 'them', 'then', 'there', 'these', 'they', 'this', 'tis', 'to', 'too', 'twas', 'us', 'wants', 'was', 'we', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'will', 'with', 'would', 'yet', 'you', 'your']);

  lunr.Pipeline.registerFunction(lunr.stopWordFilter, 'stopWordFilter');
  /*!
   * lunr.trimmer
   * Copyright (C) 2016 Oliver Nightingale
   */

  /**
   * lunr.trimmer is a pipeline function for trimming non word
   * characters from the begining and end of tokens before they
   * enter the index.
   *
   * This implementation may not work correctly for non latin
   * characters and should either be removed or adapted for use
   * with languages with non-latin characters.
   *
   * @module
   * @param {String} token The token to pass through the filter
   * @returns {String}
   * @see lunr.Pipeline
   */
  lunr.trimmer = function (token) {
    return token.replace(/^\W+/, '').replace(/\W+$/, '');
  };

  lunr.Pipeline.registerFunction(lunr.trimmer, 'trimmer');
  /*!
   * lunr.stemmer
   * Copyright (C) 2016 Oliver Nightingale
   * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
   */

  /**
   * lunr.TokenStore is used for efficient storing and lookup of the reverse
   * index of token to document ref.
   *
   * @constructor
   */
  lunr.TokenStore = function () {
    this.root = { docs: {} };
    this.length = 0;
  };

  /**
   * Loads a previously serialised token store
   *
   * @param {Object} serialisedData The serialised token store to load.
   * @returns {lunr.TokenStore}
   * @memberOf TokenStore
   */
  lunr.TokenStore.load = function (serialisedData) {
    var store = new this();

    store.root = serialisedData.root;
    store.length = serialisedData.length;

    return store;
  };

  /**
   * Adds a new token doc pair to the store.
   *
   * By default this function starts at the root of the current store, however
   * it can start at any node of any token store if required.
   *
   * @param {String} token The token to store the doc under
   * @param {Object} doc The doc to store against the token
   * @param {Object} root An optional node at which to start looking for the
   * correct place to enter the doc, by default the root of this lunr.TokenStore
   * is used.
   * @memberOf TokenStore
   */
  lunr.TokenStore.prototype.add = function (token, doc, root) {
    var root = root || this.root,
        key = token.charAt(0),
        rest = token.slice(1);

    if (!(key in root)) root[key] = { docs: {} };

    if (rest.length === 0) {
      root[key].docs[doc.ref] = doc;
      this.length += 1;
      return;
    } else {
      return this.add(rest, doc, root[key]);
    }
  };

  /**
   * Checks whether this key is contained within this lunr.TokenStore.
   *
   * By default this function starts at the root of the current store, however
   * it can start at any node of any token store if required.
   *
   * @param {String} token The token to check for
   * @param {Object} root An optional node at which to start
   * @memberOf TokenStore
   */
  lunr.TokenStore.prototype.has = function (token) {
    if (!token) return false;

    var node = this.root;

    for (var i = 0; i < token.length; i++) {
      if (!node[token.charAt(i)]) return false;

      node = node[token.charAt(i)];
    }

    return true;
  };

  /**
   * Retrieve a node from the token store for a given token.
   *
   * By default this function starts at the root of the current store, however
   * it can start at any node of any token store if required.
   *
   * @param {String} token The token to get the node for.
   * @param {Object} root An optional node at which to start.
   * @returns {Object}
   * @see TokenStore.prototype.get
   * @memberOf TokenStore
   */
  lunr.TokenStore.prototype.getNode = function (token) {
    if (!token) return {};

    var node = this.root;

    for (var i = 0; i < token.length; i++) {
      if (!node[token.charAt(i)]) return {};

      node = node[token.charAt(i)];
    }

    return node;
  };

  /**
   * Retrieve the documents for a node for the given token.
   *
   * By default this function starts at the root of the current store, however
   * it can start at any node of any token store if required.
   *
   * @param {String} token The token to get the documents for.
   * @param {Object} root An optional node at which to start.
   * @returns {Object}
   * @memberOf TokenStore
   */
  lunr.TokenStore.prototype.get = function (token, root) {
    return this.getNode(token, root).docs || {};
  };

  lunr.TokenStore.prototype.count = function (token, root) {
    return Object.keys(this.get(token, root)).length;
  };

  /**
   * Remove the document identified by ref from the token in the store.
   *
   * By default this function starts at the root of the current store, however
   * it can start at any node of any token store if required.
   *
   * @param {String} token The token to get the documents for.
   * @param {String} ref The ref of the document to remove from this token.
   * @param {Object} root An optional node at which to start.
   * @returns {Object}
   * @memberOf TokenStore
   */
  lunr.TokenStore.prototype.remove = function (token, ref) {
    if (!token) return;
    var node = this.root;

    for (var i = 0; i < token.length; i++) {
      if (!(token.charAt(i) in node)) return;
      node = node[token.charAt(i)];
    }

    delete node.docs[ref];
  };

  /**
   * Find all the possible suffixes of the passed token using tokens
   * currently in the store.
   *
   * @param {String} token The token to expand.
   * @returns {Array}
   * @memberOf TokenStore
   */
  lunr.TokenStore.prototype.expand = function (token, memo) {
    var root = this.getNode(token),
        docs = root.docs || {},
        memo = memo || [];

    if (Object.keys(docs).length) memo.push(token);

    Object.keys(root).forEach(function (key) {
      if (key === 'docs') return;

      memo.concat(this.expand(token + key, memo));
    }, this);

    return memo;
  };

  /**
   * Returns a representation of the token store ready for serialisation.
   *
   * @returns {Object}
   * @memberOf TokenStore
   */
  lunr.TokenStore.prototype.toJSON = function () {
    return {
      root: this.root,
      length: this.length
    };
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
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
      /**
       * Node. Does not work with strict CommonJS, but
       * only CommonJS-like enviroments that support module.exports,
       * like Node.
       */
      module.exports = factory();
    } else {
      // Browser globals (root is window)
      root.lunr = factory();
    }
  })(this, function () {
    /**
     * Just return a value to define the module export.
     * This example returns an object, but the module
     * can return a function as the exported value.
     */
    return lunr;
  });
})();

/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Material_Event__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Material_Nav__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Material_Search__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Material_Sidebar__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Material_Source__ = __webpack_require__(85);
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

/* harmony default export */ __webpack_exports__["a"] = {
  Event: __WEBPACK_IMPORTED_MODULE_0__Material_Event__["a" /* default */],
  Nav: __WEBPACK_IMPORTED_MODULE_1__Material_Nav__["a" /* default */],
  Search: __WEBPACK_IMPORTED_MODULE_2__Material_Search__["a" /* default */],
  Sidebar: __WEBPACK_IMPORTED_MODULE_3__Material_Sidebar__["a" /* default */],
  Source: __WEBPACK_IMPORTED_MODULE_4__Material_Source__["a" /* default */]
};

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Event_Listener__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Event_MatchMedia__ = __webpack_require__(75);
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

/* harmony default export */ __webpack_exports__["a"] = {
  Listener: __WEBPACK_IMPORTED_MODULE_0__Event_Listener__["a" /* default */],
  MatchMedia: __WEBPACK_IMPORTED_MODULE_1__Event_MatchMedia__["a" /* default */]
};

/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Listener__ = __webpack_require__(33);
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

/* harmony default export */ __webpack_exports__["a"] = MatchMedia;

/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Nav_Blur__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Nav_Collapse__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Nav_Scrolling__ = __webpack_require__(79);
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

/* harmony default export */ __webpack_exports__["a"] = {
  Blur: __WEBPACK_IMPORTED_MODULE_0__Nav_Blur__["a" /* default */],
  Collapse: __WEBPACK_IMPORTED_MODULE_1__Nav_Collapse__["a" /* default */],
  Scrolling: __WEBPACK_IMPORTED_MODULE_2__Nav_Scrolling__["a" /* default */]
};

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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


  _createClass(Blur, [{
    key: "setup",
    value: function setup() {
      this.update();
    }

    /**
     * Update blur states
     *
     * Deduct the static offset of the header (56px) and sidebar offset (24px),
     * see _permalinks.scss for more information.
     */

  }, {
    key: "update",
    value: function update() {
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
    }

    /**
     * Reset blur states
     */

  }, {
    key: "reset",
    value: function reset() {
      Array.prototype.forEach.call(this.els_, function (el) {
        el.dataset.mdState = "";
      });

      /* Reset index and page y-offset */
      this.index_ = 0;
      this.offset_ = window.pageYOffset;
    }
  }]);

  return Blur;
}();

/* harmony default export */ __webpack_exports__["a"] = Blur;

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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


  _createClass(Collapse, [{
    key: "update",
    value: function update() {
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
        (function () {
          _this.el_.setAttribute("data-md-state", "expand");
          _this.el_.style.maxHeight = "";

          /* Read height and unset pseudo-toggled state */
          var height = _this.el_.getBoundingClientRect().height;
          _this.el_.removeAttribute("data-md-state");

          /* Set initial state and animate */
          _this.el_.style.maxHeight = "0px";
          requestAnimationFrame(function () {
            _this.el_.setAttribute("data-md-state", "animate");
            _this.el_.style.maxHeight = height + "px";
          });
        })();
      }

      /* Remove state on end of transition */
      var end = function end(ev) {
        var target = ev.target;
        if (!(target instanceof HTMLElement)) return;

        /* Reset height and state */
        target.removeAttribute("data-md-state");
        target.style.maxHeight = "";

        /* Only fire once, so directly remove event listener */
        target.removeEventListener("transitionend", end);
      };
      this.el_.addEventListener("transitionend", end, false);
    }

    /**
     * Reset height and pseudo-toggled state
     */

  }, {
    key: "reset",
    value: function reset() {
      this.el_.dataset.mdState = "";
      this.el_.style.maxHeight = "";
    }
  }]);

  return Collapse;
}();

/* harmony default export */ __webpack_exports__["a"] = Collapse;

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
   * @property {HTMLElement} el_ - Navigation
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


  _createClass(Scrolling, [{
    key: "setup",
    value: function setup() {

      /* Initially set overflow scrolling on main pane */
      this.el_.children[1].style.webkitOverflowScrolling = "touch";

      /* Find all toggles and check which one is active */
      var toggles = this.el_.querySelectorAll("[data-md-toggle]");
      Array.prototype.forEach.call(toggles, function (toggle) {
        if (toggle instanceof HTMLInputElement && toggle.checked) {

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
    }

    /**
     * Update active panes
     *
     * @param {Event} ev - Change event
     */

  }, {
    key: "update",
    value: function update(ev) {
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
        (function () {
          var end = function end() {
            if (pane instanceof HTMLElement) {
              parent.style.webkitOverflowScrolling = "touch";
              pane.removeEventListener("transitionend", end);
            }
          };
          pane.addEventListener("transitionend", end, false);
        })();
      }

      /* Set overflow scrolling on active pane */
      if (target.checked) {
        (function () {
          var end = function end() {
            if (pane instanceof HTMLElement) {
              active.style.webkitOverflowScrolling = "touch";
              pane.removeEventListener("transitionend", end);
            }
          };
          pane.addEventListener("transitionend", end, false);
        })();
      }
    }

    /**
     * Reset panes
     */

  }, {
    key: "reset",
    value: function reset() {

      /* Reset overflow scrolling on main pane */
      this.el_.children[1].style.webkitOverflowScrolling = "";

      /* Find all toggles and check which one is active */
      var toggles = this.el_.querySelectorAll("[data-md-toggle]");
      Array.prototype.forEach.call(toggles, function (toggle) {
        if (toggle instanceof HTMLInputElement && toggle.checked) {

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
    }
  }]);

  return Scrolling;
}();

/* harmony default export */ __webpack_exports__["a"] = Scrolling;

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Search_Lock__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Search_Result__ = __webpack_require__(82);
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

/* harmony default export */ __webpack_exports__["a"] = {
  Lock: __WEBPACK_IMPORTED_MODULE_0__Search_Lock__["a" /* default */],
  Result: __WEBPACK_IMPORTED_MODULE_1__Search_Result__["a" /* default */]
};

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
   * @property {HTMLInputElement} el_ - TODO
   * @property {number} offset_ - TODO
   *
   * @param {(string|HTMLElement)} el - Selector or HTML element
   */
  function Lock(el) {
    _classCallCheck(this, Lock);

    var ref = typeof el === "string" ? document.querySelector(el) : el;
    if (!(ref instanceof HTMLInputElement)) throw new ReferenceError();
    this.el_ = ref;
  }

  /**
   * Setup locked state
   */


  _createClass(Lock, [{
    key: "setup",
    value: function setup() {
      this.update();
    }

    /**
     * Update locked state
     */

  }, {
    key: "update",
    value: function update() {
      var _this = this;

      /* Entering search mode */
      if (this.el_.checked) {
        this.offset_ = window.pageYOffset;

        /* Scroll to top after transition, to omit flickering */
        setTimeout(function () {
          window.scrollTo(0, 0);

          /* Lock body after finishing transition */
          if (_this.el_.checked) {
            document.body.dataset.mdState = "lock";
          }
        }, 400);

        /* Exiting search mode */
      } else {
        document.body.dataset.mdState = "";

        /* Scroll to former position, but wait for 100ms to prevent flashes on
           iOS. A short timeout seems to do the trick */
        setTimeout(function () {
          if (typeof _this.offset_ !== "undefined") window.scrollTo(0, _this.offset_);
        }, 100);
      }
    }

    /**
     * Reset locked state and page y-offset
     */

  }, {
    key: "reset",
    value: function reset() {
      if (document.body.dataset.mdState === "lock") window.scrollTo(0, this.offset_);
      document.body.dataset.mdState = "";
    }
  }]);

  return Lock;
}();

/* harmony default export */ __webpack_exports__["a"] = Lock;

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(JSX) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lunr__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lunr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lunr__);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var Result = function () {

  /**
   * Perform search and update results on keyboard events
   *
   * @constructor
   *
   * @property {HTMLElement} el_ - TODO
   * @property {(Object|Array<Object>|Function)} data_ - TODO (very dirty)
   * @property {*} meta_ - TODO (must be done like this, as React$Component does not return the correct thing)
   * @property {*} list_ - TODO (must be done like this, as React$Component does not return the correct thing)
   *
   * @param {(string|HTMLElement)} el - Selector or HTML element
   * @param {(Array<Object>|Function)} data - Promise or array providing data     // TODO ????
   */
  function Result(el, data) {
    _classCallCheck(this, Result);

    this.el_ = typeof el === "string" ? document.querySelector(el) : el;

    /* Set data and create metadata and list elements */
    this.data_ = data;
    this.meta_ = JSX.createElement(
      "div",
      { "class": "md-search-result__meta" },
      "Type to start searching"
    );
    this.list_ = JSX.createElement("ol", { "class": "md-search-result__list" });

    /* Inject created elements */
    this.el_.appendChild(this.meta_);
    this.el_.appendChild(this.list_);

    /* Truncate a string after the given number of characters - this is not
       a reasonable approach, since the summaries kind of suck. It would be
       better to create something more intelligent, highlighting the search
       occurrences and making a better summary out of it */
    this.truncate_ = function (string, n) {
      var i = n;
      if (string.length > i) {
        while (string[i] !== " " && --i > 0) {}
        return string.substring(0, i) + "...";
      }
      return string;
    };
  }

  /**
   * Update search results
   *
   * @param {Event} ev - Input or focus event
   */


  _createClass(Result, [{
    key: "update",
    value: function update(ev) {
      var _this = this;

      /* Initialize index, if this has not be done yet */
      if (ev.type === "focus" && !this.index_) {
        (function () {

          /* Initialize index */
          var init = function init(data) {
            _this.index_ = __WEBPACK_IMPORTED_MODULE_0_lunr___default()(function () {
              /* eslint-disable no-invalid-this, lines-around-comment */
              this.field("title", { boost: 10 });
              this.field("text");
              this.ref("location");
              /* eslint-enable no-invalid-this, lines-around-comment */
            });

            /* Index documents */
            _this.data_ = data.reduce(function (docs, doc) {
              _this.index_.add(doc);
              docs[doc.location] = doc;
              return docs;
            }, {});
          };

          /* Initialize index after short timeout to account for transition */
          setTimeout(function () {
            return typeof _this.data_ === "function" ? _this.data_().then(init) : init(_this.data_);
          }, 250);

          /* Execute search on new input event after clearing current list */
        })();
      } else if (ev.type === "keyup") {
        while (this.list_.firstChild) {
          this.list_.removeChild(this.list_.firstChild);
        } /* Perform search on index and render documents */
        var result = this.index_.search(ev.target.value);
        result.forEach(function (item) {
          var doc = _this.data_[item.ref];

          /* Check if it's a anchor link on the current page */

          var _doc$location$split = doc.location.split("#"),
              _doc$location$split2 = _slicedToArray(_doc$location$split, 1),
              pathname = _doc$location$split2[0];

          pathname = pathname.replace(/^(\/?\.{2})+/g, "");

          /* Append search result */
          _this.list_.appendChild(JSX.createElement(
            "li",
            { "class": "md-search-result__item" },
            JSX.createElement(
              "a",
              { href: doc.location, title: doc.title,
                "class": "md-search-result__link", "data-md-rel": pathname === document.location.pathname ? "anchor" : "" },
              JSX.createElement(
                "article",
                { "class": "md-search-result__article" },
                JSX.createElement(
                  "h1",
                  { "class": "md-search-result__title" },
                  doc.title
                ),
                JSX.createElement(
                  "p",
                  { "class": "md-search-result__teaser" },
                  _this.truncate_(doc.text, 140)
                )
              )
            )
          ));
        });

        /* Bind click handlers for anchors */
        var anchors = this.list_.querySelectorAll("[data-md-rel=anchor]");
        Array.prototype.forEach.call(anchors, function (anchor) {
          anchor.addEventListener("click", function (ev2) {
            var toggle = document.querySelector("[data-md-toggle=search]");
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
        this.meta_.textContent = result.length + " search result" + (result.length !== 1 ? "s" : "");
      }
    }
  }]);

  return Result;
}();

/* harmony default export */ __webpack_exports__["a"] = Result;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(22)))

/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Sidebar_Position__ = __webpack_require__(84);
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

/* harmony default export */ __webpack_exports__["a"] = {
  Position: __WEBPACK_IMPORTED_MODULE_0__Sidebar_Position__["a" /* default */]
};

/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
   * @param {(string|HTMLElement)} el - Selector or HTML element
   */
  function Position(el) {
    _classCallCheck(this, Position);

    this.el_ = typeof el === "string" ? document.querySelector(el) : el;

    /* Initialize parent container and current height */
    this.parent_ = this.el_.parentNode;
    this.height_ = 0;
  }

  /**
   * Initialize sidebar state
   */


  _createClass(Position, [{
    key: "setup",
    value: function setup() {
      this.offset_ = this.el_.offsetTop - this.parent_.offsetTop;
      this.update();
    }

    /**
     * Update locked state and height
     *
     * The inner height of the window (= the visible area) is the maximum
     * possible height for the stretching sidebar. This height must be deducted
     * by the top offset of the parent container, which accounts for the fixed
     * header, setting the baseline. Depending on the page y-offset, the top
     * offset of the sidebar must be taken into account, as well as the case
     * where the window is scrolled beyond the sidebar container.
     */

  }, {
    key: "update",
    value: function update() {
      var offset = window.pageYOffset;
      var visible = window.innerHeight;

      /* Calculate bounds of sidebar container  */
      this.bounds_ = {
        top: this.parent_.offsetTop,
        bottom: this.parent_.offsetTop + this.parent_.offsetHeight
      };

      /* Calculate new offset and height */
      var height = visible - this.bounds_.top - Math.max(0, this.offset_ - offset) - Math.max(0, offset + visible - this.bounds_.bottom);

      /* If height changed, update element */
      if (height !== this.height_) this.el_.style.height = (this.height_ = height) + "px";

      /* Sidebar should be locked, as we're below parent offset */
      if (offset >= this.offset_) {
        if (this.el_.dataset.mdState !== "lock") this.el_.dataset.mdState = "lock";

        /* Sidebar should be unlocked, if locked */
      } else if (this.el_.dataset.mdState === "lock") {
        this.el_.dataset.mdState = "";
      }
    }

    /**
     * Reset locked state and height
     */

  }, {
    key: "reset",
    value: function reset() {
      this.el_.dataset.mdState = "";
      this.el_.style.height = "";
      this.height_ = 0;
    }
  }]);

  return Position;
}();

/* harmony default export */ __webpack_exports__["a"] = Position;

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Source_Adapter__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Source_Repository__ = __webpack_require__(89);
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

/* harmony default export */ __webpack_exports__["a"] = {
  Adapter: __WEBPACK_IMPORTED_MODULE_0__Source_Adapter__["a" /* default */],
  Repository: __WEBPACK_IMPORTED_MODULE_1__Source_Repository__["a" /* default */]
};

/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Adapter_GitHub__ = __webpack_require__(88);
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

/* harmony default export */ __webpack_exports__["a"] = {
  GitHub: __WEBPACK_IMPORTED_MODULE_0__Adapter_GitHub__["a" /* default */]
};

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_js_cookie__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_js_cookie___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_js_cookie__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var Abstract = function () {

  /**
   * Retrieve source information
   *
   * @constructor
   * @param {(string|HTMLElement)} el - Selector or HTML element
   */
  function Abstract(el) {
    _classCallCheck(this, Abstract);

    this.el_ = typeof el === "string" ? document.querySelector(el) : el;

    /* Retrieve base URL */
    this.base_ = this.el_.href;
    this.salt_ = this.hash_(this.base_);
  }

  /**
   * Retrieve data from Cookie or fetch from respective API
   *
   * @return {Promise} Promise that returns an array of facts
   */


  _createClass(Abstract, [{
    key: "fetch",
    value: function fetch() {
      var _this = this;

      return new Promise(function (resolve) {
        var cached = __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.getJSON(_this.salt_ + ".cache-source");
        if (typeof cached !== "undefined") {
          resolve(cached);

          /* If the data is not cached in a cookie, invoke fetch and set
             a cookie that automatically expires in 15 minutes */
        } else {
          _this.fetch_().then(function (data) {
            __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.set(_this.salt_ + ".cache-source", data, { expires: 1 / 96 });
            resolve(data);
          });
        }
      });
    }

    /**
     * Abstract private function that fetches relevant repository information
     *
     * @abstract
     * @return {Promise} Promise that provides the facts in an array
     */

  }, {
    key: "fetch_",
    value: function fetch_() {
      throw new Error("fetch_(): Not implemented");
    }

    /**
     * Format a number with suffix
     *
     * @param {Number} number - Number to format
     * @return {Number} Formatted number
     */

  }, {
    key: "format_",
    value: function format_(number) {
      if (number > 10000) return (number / 1000).toFixed(0) + "k";else if (number > 1000) return (number / 1000).toFixed(1) + "k";
      return number;
    }

    /**
     * Simple hash function
     *
     * Taken from http://stackoverflow.com/a/7616484/1065584
     *
     * @param {string} str - Input string
     * @return {string} Hashed string
     */

  }, {
    key: "hash_",
    value: function hash_(str) {
      var hash = 0;
      if (str.length === 0) return hash;
      for (var i = 0, len = str.length; i < len; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
      }
      return hash;
    }
  }]);

  return Abstract;
}();

/* harmony default export */ __webpack_exports__["a"] = Abstract;

/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Abstract__ = __webpack_require__(87);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var GitHub = function (_Abstract) {
  _inherits(GitHub, _Abstract);

  /**
   * Retrieve source information from GitHub
   *
   * @constructor
   * @param {(string|HTMLElement)} el - Selector or HTML element
   */
  function GitHub(el) {
    _classCallCheck(this, GitHub);

    /* Adjust base URL to reach API endpoints */
    var _this = _possibleConstructorReturn(this, (GitHub.__proto__ || Object.getPrototypeOf(GitHub)).call(this, el));

    _this.base_ = _this.base_.replace("github.com/", "api.github.com/repos/");
    return _this;
  }

  /**
   * Fetch relevant source information from GitHub
   *
   * @return {function} Promise returning an array of facts
   */


  _createClass(GitHub, [{
    key: "fetch_",
    value: function fetch_() {
      var _this2 = this;

      return fetch(this.base_).then(function (response) {
        return response.json();
      }).then(function (data) {
        return [_this2.format_(data.stargazers_count) + " Stars", _this2.format_(data.forks_count) + " Forks"];
      });
    }
  }]);

  return GitHub;
}(__WEBPACK_IMPORTED_MODULE_0__Abstract__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = GitHub;

/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(JSX) {var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
   * @param {(string|HTMLElement)} el - Selector or HTML element
   */
  function Repository(el) {
    _classCallCheck(this, Repository);

    this.el_ = typeof el === "string" ? document.querySelector(el) : el;
  }

  /**
   * Initialize the source repository
   *
   * @param {Array.<string>} facts - Facts to be rendered
   */


  _createClass(Repository, [{
    key: "initialize",
    value: function initialize(facts) {
      if (facts.length) this.el_.children[this.el_.children.length - 1].appendChild(JSX.createElement(
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
    }
  }]);

  return Repository;
}();

/* harmony default export */ __webpack_exports__["a"] = Repository;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(22)))

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(35);
__webpack_require__(36);
__webpack_require__(37);
module.exports = __webpack_require__(38);


/***/ })
/******/ ]);