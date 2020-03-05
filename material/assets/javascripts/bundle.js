(function(e, a) { for(var i in a) e[i] = a[i]; }(window, /******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"assets/javascripts/bundle": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/assets/javascripts/index.ts","assets/javascripts/vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assets/javascripts/browser/document/_/index.ts":
/*!************************************************************!*\
  !*** ./src/assets/javascripts/browser/document/_/index.ts ***!
  \************************************************************/
/*! exports provided: watchDocument */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watchDocument", function() { return watchDocument; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _switch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../switch */ "./src/assets/javascripts/browser/document/switch/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Watch document
 *
 * If the location observable is passed, instant loading will be enabled which
 * means that new values will be emitted every time the location changes.
 *
 * @return Document observable
 */
function watchDocument(_a) {
    var location$ = (_a === void 0 ? {} : _a).location$;
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(document, "DOMContentLoaded")
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mapTo"])(document)), typeof location$ !== "undefined"
        ? Object(_switch__WEBPACK_IMPORTED_MODULE_2__["watchDocumentSwitch"])({ location$: location$ })
        : rxjs__WEBPACK_IMPORTED_MODULE_0__["NEVER"])
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["shareReplay"])(1));
}


/***/ }),

/***/ "./src/assets/javascripts/browser/document/index.ts":
/*!**********************************************************!*\
  !*** ./src/assets/javascripts/browser/document/index.ts ***!
  \**********************************************************/
/*! exports provided: watchDocument, watchDocumentSwitch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_ */ "./src/assets/javascripts/browser/document/_/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchDocument", function() { return ___WEBPACK_IMPORTED_MODULE_0__["watchDocument"]; });

/* harmony import */ var _switch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./switch */ "./src/assets/javascripts/browser/document/switch/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchDocumentSwitch", function() { return _switch__WEBPACK_IMPORTED_MODULE_1__["watchDocumentSwitch"]; });

/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

/***/ "./src/assets/javascripts/browser/document/switch/index.ts":
/*!*****************************************************************!*\
  !*** ./src/assets/javascripts/browser/document/switch/index.ts ***!
  \*****************************************************************/
/*! exports provided: watchDocumentSwitch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watchDocumentSwitch", function() { return watchDocumentSwitch; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_ajax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/ajax */ "./node_modules/rxjs/_esm5/ajax/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _location__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../location */ "./src/assets/javascripts/browser/location/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Watch document switch
 *
 * This function returns an observables that fetches a document if the provided
 * location observable emits a new value (i.e. URL). If the emitted URL points
 * to the same page, the request is effectively ignored (i.e. when only the
 * fragment identifier changes).
 *
 * In case the request fails, the location change is dispatched regularly.
 *
 * @param options - Options
 *
 * @return Document observable
 */
function watchDocumentSwitch(_a) {
    var location$ = _a.location$;
    return location$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilKeyChanged"])("pathname"), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["skip"])(1), 
    /* Fetch document */
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function (url) { return Object(rxjs_ajax__WEBPACK_IMPORTED_MODULE_1__["ajax"])({
        url: url.href,
        responseType: "document",
        withCredentials: true
    })
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["pluck"])("response"), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(function () {
        Object(_location__WEBPACK_IMPORTED_MODULE_3__["setLocation"])(url);
        return rxjs__WEBPACK_IMPORTED_MODULE_0__["NEVER"];
    })); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["share"])());
}


/***/ }),

/***/ "./src/assets/javascripts/browser/element/_/index.ts":
/*!***********************************************************!*\
  !*** ./src/assets/javascripts/browser/element/_/index.ts ***!
  \***********************************************************/
/*! exports provided: getElement, getElementOrThrow, getActiveElement, getElements */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getElement", function() { return getElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getElementOrThrow", function() { return getElementOrThrow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getActiveElement", function() { return getActiveElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getElements", function() { return getElements; });
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Retrieve an element matching the query selector
 *
 * @template T - Element type
 *
 * @param selector - Query selector
 * @param node - Node of reference
 *
 * @return Element or nothing
 */
function getElement(selector, node) {
    if (node === void 0) { node = document; }
    return node.querySelector(selector) || undefined;
}
/**
 * Retrieve an element matching a query selector or throw a reference error
 *
 * @template T - Element type
 *
 * @param selector - Query selector
 * @param node - Node of reference
 *
 * @return Element
 */
function getElementOrThrow(selector, node) {
    if (node === void 0) { node = document; }
    var el = getElement(selector, node);
    if (typeof el === "undefined")
        throw new ReferenceError("Missing element: expected \"" + selector + "\" to be present");
    return el;
}
/**
 * Retrieve the currently active element
 *
 * @return Element or nothing
 */
function getActiveElement() {
    return document.activeElement instanceof HTMLElement
        ? document.activeElement
        : undefined;
}
/**
 * Retrieve all elements matching the query selector
 *
 * @template T - Element type
 *
 * @param selector - Query selector
 * @param node - Node of reference
 *
 * @return Elements
 */
function getElements(selector, node) {
    if (node === void 0) { node = document; }
    return Array.from(node.querySelectorAll(selector));
}


/***/ }),

/***/ "./src/assets/javascripts/browser/element/focus/index.ts":
/*!***************************************************************!*\
  !*** ./src/assets/javascripts/browser/element/focus/index.ts ***!
  \***************************************************************/
/*! exports provided: setElementFocus, watchElementFocus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setElementFocus", function() { return setElementFocus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watchElementFocus", function() { return watchElementFocus; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_ */ "./src/assets/javascripts/browser/element/_/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Set element focus
 *
 * @param el - Element
 * @param value - Whether the element should be focused
 */
function setElementFocus(el, value) {
    if (value === void 0) { value = true; }
    if (value)
        el.focus();
    else
        el.blur();
}
/* ------------------------------------------------------------------------- */
/**
 * Watch element focus
 *
 * @param el - Element
 *
 * @return Element focus observable
 */
function watchElementFocus(el) {
    var focus$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(el, "focus");
    var blur$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(el, "blur");
    /* Map events to boolean state */
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])(focus$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mapTo"])(true)), blur$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mapTo"])(false)))
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])(el === Object(___WEBPACK_IMPORTED_MODULE_2__["getActiveElement"])()), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["shareReplay"])(1));
}


/***/ }),

/***/ "./src/assets/javascripts/browser/element/index.ts":
/*!*********************************************************!*\
  !*** ./src/assets/javascripts/browser/element/index.ts ***!
  \*********************************************************/
/*! exports provided: getElement, getElementOrThrow, getActiveElement, getElements, setElementFocus, watchElementFocus, getElementOffset, watchElementOffset, setElementSelection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_ */ "./src/assets/javascripts/browser/element/_/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getElement", function() { return ___WEBPACK_IMPORTED_MODULE_0__["getElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getElementOrThrow", function() { return ___WEBPACK_IMPORTED_MODULE_0__["getElementOrThrow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getActiveElement", function() { return ___WEBPACK_IMPORTED_MODULE_0__["getActiveElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getElements", function() { return ___WEBPACK_IMPORTED_MODULE_0__["getElements"]; });

/* harmony import */ var _focus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./focus */ "./src/assets/javascripts/browser/element/focus/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setElementFocus", function() { return _focus__WEBPACK_IMPORTED_MODULE_1__["setElementFocus"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchElementFocus", function() { return _focus__WEBPACK_IMPORTED_MODULE_1__["watchElementFocus"]; });

/* harmony import */ var _offset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./offset */ "./src/assets/javascripts/browser/element/offset/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getElementOffset", function() { return _offset__WEBPACK_IMPORTED_MODULE_2__["getElementOffset"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchElementOffset", function() { return _offset__WEBPACK_IMPORTED_MODULE_2__["watchElementOffset"]; });

/* harmony import */ var _select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./select */ "./src/assets/javascripts/browser/element/select/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setElementSelection", function() { return _select__WEBPACK_IMPORTED_MODULE_3__["setElementSelection"]; });

/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

/***/ "./src/assets/javascripts/browser/element/offset/index.ts":
/*!****************************************************************!*\
  !*** ./src/assets/javascripts/browser/element/offset/index.ts ***!
  \****************************************************************/
/*! exports provided: getElementOffset, watchElementOffset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getElementOffset", function() { return getElementOffset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watchElementOffset", function() { return watchElementOffset; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Retrieve element offset
 *
 * @param el - Element
 *
 * @return Element offset
 */
function getElementOffset(el) {
    return {
        x: el.scrollLeft,
        y: el.scrollTop
    };
}
/* ------------------------------------------------------------------------- */
/**
 * Watch element offset
 *
 * @param el - Element
 *
 * @return Element offset observable
 */
function watchElementOffset(el) {
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(el, "scroll"), Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(window, "resize"))
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function () { return getElementOffset(el); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])(getElementOffset(el)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["shareReplay"])(1));
}


/***/ }),

/***/ "./src/assets/javascripts/browser/element/select/index.ts":
/*!****************************************************************!*\
  !*** ./src/assets/javascripts/browser/element/select/index.ts ***!
  \****************************************************************/
/*! exports provided: setElementSelection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setElementSelection", function() { return setElementSelection; });
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Set element text selection
 *
 * @param el - Element
 */
function setElementSelection(el) {
    if (el instanceof HTMLInputElement)
        el.select();
    else
        throw new Error("Not implemented");
}


/***/ }),

/***/ "./src/assets/javascripts/browser/index.ts":
/*!*************************************************!*\
  !*** ./src/assets/javascripts/browser/index.ts ***!
  \*************************************************/
/*! exports provided: isSusceptibleToKeyboard, watchKeyboard, watchMedia, getToggle, setToggle, watchToggle, watchWorker, watchDocument, watchDocumentSwitch, getElement, getElementOrThrow, getActiveElement, getElements, setElementFocus, watchElementFocus, getElementOffset, watchElementOffset, setElementSelection, getLocation, setLocation, isLocationInternal, isLocationAnchor, watchLocation, getLocationHash, setLocationHash, watchLocationHash, watchViewport, watchViewportAt, getViewportOffset, setViewportOffset, watchViewportOffset, getViewportSize, watchViewportSize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _document__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./document */ "./src/assets/javascripts/browser/document/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchDocument", function() { return _document__WEBPACK_IMPORTED_MODULE_0__["watchDocument"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchDocumentSwitch", function() { return _document__WEBPACK_IMPORTED_MODULE_0__["watchDocumentSwitch"]; });

/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./element */ "./src/assets/javascripts/browser/element/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getElement", function() { return _element__WEBPACK_IMPORTED_MODULE_1__["getElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getElementOrThrow", function() { return _element__WEBPACK_IMPORTED_MODULE_1__["getElementOrThrow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getActiveElement", function() { return _element__WEBPACK_IMPORTED_MODULE_1__["getActiveElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getElements", function() { return _element__WEBPACK_IMPORTED_MODULE_1__["getElements"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setElementFocus", function() { return _element__WEBPACK_IMPORTED_MODULE_1__["setElementFocus"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchElementFocus", function() { return _element__WEBPACK_IMPORTED_MODULE_1__["watchElementFocus"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getElementOffset", function() { return _element__WEBPACK_IMPORTED_MODULE_1__["getElementOffset"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchElementOffset", function() { return _element__WEBPACK_IMPORTED_MODULE_1__["watchElementOffset"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setElementSelection", function() { return _element__WEBPACK_IMPORTED_MODULE_1__["setElementSelection"]; });

/* harmony import */ var _keyboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keyboard */ "./src/assets/javascripts/browser/keyboard/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isSusceptibleToKeyboard", function() { return _keyboard__WEBPACK_IMPORTED_MODULE_2__["isSusceptibleToKeyboard"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchKeyboard", function() { return _keyboard__WEBPACK_IMPORTED_MODULE_2__["watchKeyboard"]; });

/* harmony import */ var _location__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./location */ "./src/assets/javascripts/browser/location/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getLocation", function() { return _location__WEBPACK_IMPORTED_MODULE_3__["getLocation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setLocation", function() { return _location__WEBPACK_IMPORTED_MODULE_3__["setLocation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isLocationInternal", function() { return _location__WEBPACK_IMPORTED_MODULE_3__["isLocationInternal"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isLocationAnchor", function() { return _location__WEBPACK_IMPORTED_MODULE_3__["isLocationAnchor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchLocation", function() { return _location__WEBPACK_IMPORTED_MODULE_3__["watchLocation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getLocationHash", function() { return _location__WEBPACK_IMPORTED_MODULE_3__["getLocationHash"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setLocationHash", function() { return _location__WEBPACK_IMPORTED_MODULE_3__["setLocationHash"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchLocationHash", function() { return _location__WEBPACK_IMPORTED_MODULE_3__["watchLocationHash"]; });

/* harmony import */ var _media__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./media */ "./src/assets/javascripts/browser/media/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchMedia", function() { return _media__WEBPACK_IMPORTED_MODULE_4__["watchMedia"]; });

/* harmony import */ var _toggle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./toggle */ "./src/assets/javascripts/browser/toggle/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getToggle", function() { return _toggle__WEBPACK_IMPORTED_MODULE_5__["getToggle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setToggle", function() { return _toggle__WEBPACK_IMPORTED_MODULE_5__["setToggle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchToggle", function() { return _toggle__WEBPACK_IMPORTED_MODULE_5__["watchToggle"]; });

/* harmony import */ var _viewport__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./viewport */ "./src/assets/javascripts/browser/viewport/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchViewport", function() { return _viewport__WEBPACK_IMPORTED_MODULE_6__["watchViewport"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchViewportAt", function() { return _viewport__WEBPACK_IMPORTED_MODULE_6__["watchViewportAt"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getViewportOffset", function() { return _viewport__WEBPACK_IMPORTED_MODULE_6__["getViewportOffset"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setViewportOffset", function() { return _viewport__WEBPACK_IMPORTED_MODULE_6__["setViewportOffset"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchViewportOffset", function() { return _viewport__WEBPACK_IMPORTED_MODULE_6__["watchViewportOffset"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getViewportSize", function() { return _viewport__WEBPACK_IMPORTED_MODULE_6__["getViewportSize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchViewportSize", function() { return _viewport__WEBPACK_IMPORTED_MODULE_6__["watchViewportSize"]; });

/* harmony import */ var _worker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./worker */ "./src/assets/javascripts/browser/worker/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchWorker", function() { return _worker__WEBPACK_IMPORTED_MODULE_7__["watchWorker"]; });

/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

/***/ "./src/assets/javascripts/browser/keyboard/index.ts":
/*!**********************************************************!*\
  !*** ./src/assets/javascripts/browser/keyboard/index.ts ***!
  \**********************************************************/
/*! exports provided: isSusceptibleToKeyboard, watchKeyboard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSusceptibleToKeyboard", function() { return isSusceptibleToKeyboard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watchKeyboard", function() { return watchKeyboard; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Check whether an element may receive keyboard input
 *
 * @param el - Element
 *
 * @return Test result
 */
function isSusceptibleToKeyboard(el) {
    switch (el.tagName) {
        /* Form elements */
        case "INPUT":
        case "SELECT":
        case "TEXTAREA":
            return true;
        /* Everything else */
        default:
            return el.isContentEditable;
    }
}
/* ------------------------------------------------------------------------- */
/**
 * Watch keyboard
 *
 * @return Keyboard observable
 */
function watchKeyboard() {
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(window, "keydown")
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(function (ev) { return !(ev.metaKey || ev.ctrlKey); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (ev) { return ({
        type: ev.key,
        claim: function () {
            ev.preventDefault();
            ev.stopPropagation();
        }
    }); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["share"])());
}


/***/ }),

/***/ "./src/assets/javascripts/browser/location/_/index.ts":
/*!************************************************************!*\
  !*** ./src/assets/javascripts/browser/location/_/index.ts ***!
  \************************************************************/
/*! exports provided: getLocation, setLocation, isLocationInternal, isLocationAnchor, watchLocation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLocation", function() { return getLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLocation", function() { return setLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLocationInternal", function() { return isLocationInternal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLocationAnchor", function() { return isLocationAnchor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watchLocation", function() { return watchLocation; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Retrieve location
 *
 * This function will return a `URL` object (and not `Location`) in order to
 * normalize typings across the application. Furthermore, locations need to be
 * tracked without setting them and `Location` is a singleton which represents
 * the current location.
 *
 * @return URL
 */
function getLocation() {
    return new URL(location.href);
}
/**
 * Set location
 *
 * @param url - URL to change to
 */
function setLocation(url) {
    location.href = url.href;
}
/* ------------------------------------------------------------------------- */
/**
 * Check whether a URL is an internal link or a file (except `.html`)
 *
 * @param url - URL or HTML anchor element
 * @param ref - Reference URL
 *
 * @return Test result
 */
function isLocationInternal(url, ref) {
    if (ref === void 0) { ref = location; }
    return url.host === ref.host
        && /^(?:\/[\w-]+)*(?:\/?|\.html)$/i.test(url.pathname);
}
/**
 * Check whether a URL is an anchor link on the current page
 *
 * @param url - URL or HTML anchor element
 * @param ref - Reference URL
 *
 * @return Test result
 */
function isLocationAnchor(url, ref) {
    if (ref === void 0) { ref = location; }
    return url.pathname === ref.pathname
        && url.hash.length > 0;
}
/* ------------------------------------------------------------------------- */
/**
 * Watch location
 *
 * @return Location subject
 */
function watchLocation() {
    return new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](getLocation());
}


/***/ }),

/***/ "./src/assets/javascripts/browser/location/hash/index.ts":
/*!***************************************************************!*\
  !*** ./src/assets/javascripts/browser/location/hash/index.ts ***!
  \***************************************************************/
/*! exports provided: getLocationHash, setLocationHash, watchLocationHash */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLocationHash", function() { return getLocationHash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLocationHash", function() { return setLocationHash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watchLocationHash", function() { return watchLocationHash; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Retrieve location hash
 *
 * @return Location hash
 */
function getLocationHash() {
    return location.hash.substring(1);
}
/**
 * Set location hash
 *
 * Setting a new fragment identifier via `location.hash` will have no effect
 * if the value doesn't change. However, when a new fragment identifier is set,
 * we want the browser to target the respective element at all times, which is
 * why we use this dirty little trick.
 *
 * @param hash - Location hash
 */
function setLocationHash(hash) {
    var el = document.createElement("a");
    el.href = hash;
    el.click();
}
/* ------------------------------------------------------------------------- */
/**
 * Watch location hash
 *
 * @return Location hash observable
 */
function watchLocationHash() {
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(window, "hashchange")
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(getLocationHash), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])(getLocationHash()), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(function (hash) { return hash.length > 0; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["share"])());
}


/***/ }),

/***/ "./src/assets/javascripts/browser/location/index.ts":
/*!**********************************************************!*\
  !*** ./src/assets/javascripts/browser/location/index.ts ***!
  \**********************************************************/
/*! exports provided: getLocation, setLocation, isLocationInternal, isLocationAnchor, watchLocation, getLocationHash, setLocationHash, watchLocationHash */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_ */ "./src/assets/javascripts/browser/location/_/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getLocation", function() { return ___WEBPACK_IMPORTED_MODULE_0__["getLocation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setLocation", function() { return ___WEBPACK_IMPORTED_MODULE_0__["setLocation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isLocationInternal", function() { return ___WEBPACK_IMPORTED_MODULE_0__["isLocationInternal"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isLocationAnchor", function() { return ___WEBPACK_IMPORTED_MODULE_0__["isLocationAnchor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchLocation", function() { return ___WEBPACK_IMPORTED_MODULE_0__["watchLocation"]; });

/* harmony import */ var _hash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hash */ "./src/assets/javascripts/browser/location/hash/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getLocationHash", function() { return _hash__WEBPACK_IMPORTED_MODULE_1__["getLocationHash"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setLocationHash", function() { return _hash__WEBPACK_IMPORTED_MODULE_1__["setLocationHash"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchLocationHash", function() { return _hash__WEBPACK_IMPORTED_MODULE_1__["watchLocationHash"]; });

/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

/***/ "./src/assets/javascripts/browser/media/index.ts":
/*!*******************************************************!*\
  !*** ./src/assets/javascripts/browser/media/index.ts ***!
  \*******************************************************/
/*! exports provided: watchMedia */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watchMedia", function() { return watchMedia; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Watch media query
 *
 * @param query - Media query
 *
 * @return Media observable
 */
function watchMedia(query) {
    var media = matchMedia(query);
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEventPattern"])(function (next) {
        return media.addListener(function () { return next(media.matches); });
    })
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])(media.matches), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["shareReplay"])(1));
}


/***/ }),

/***/ "./src/assets/javascripts/browser/toggle/index.ts":
/*!********************************************************!*\
  !*** ./src/assets/javascripts/browser/toggle/index.ts ***!
  \********************************************************/
/*! exports provided: getToggle, setToggle, watchToggle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getToggle", function() { return getToggle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setToggle", function() { return setToggle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watchToggle", function() { return watchToggle; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../element */ "./src/assets/javascripts/browser/element/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Data
 * ------------------------------------------------------------------------- */
/**
 * Toggle map
 */
var toggles = {
    drawer: Object(_element__WEBPACK_IMPORTED_MODULE_2__["getElementOrThrow"])("[data-md-toggle=drawer]"),
    search: Object(_element__WEBPACK_IMPORTED_MODULE_2__["getElementOrThrow"])("[data-md-toggle=search]")
};
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Retrieve the value of a toggle
 *
 * @param name - Toggle
 *
 * @return Toggle value
 */
function getToggle(name) {
    return toggles[name].checked;
}
/**
 * Set toggle
 *
 * Simulating a click event seems to be the most cross-browser compatible way
 * of changing the value while also emitting a `change` event. Before, Material
 * used `CustomEvent` to programmatically change the value of a toggle, but this
 * is a much simpler and cleaner solution which doesn't require a polyfill.
 *
 * @param name - Toggle
 * @param value - Toggle value
 */
function setToggle(name, value) {
    if (toggles[name].checked !== value)
        toggles[name].click();
}
/* ------------------------------------------------------------------------- */
/**
 * Watch toggle
 *
 * @param name - Toggle
 *
 * @return Toggle value observable
 */
function watchToggle(name) {
    var el = toggles[name];
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(el, "change")
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function () { return el.checked; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])(el.checked));
}


/***/ }),

/***/ "./src/assets/javascripts/browser/viewport/_/index.ts":
/*!************************************************************!*\
  !*** ./src/assets/javascripts/browser/viewport/_/index.ts ***!
  \************************************************************/
/*! exports provided: watchViewport, watchViewportAt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watchViewport", function() { return watchViewport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watchViewportAt", function() { return watchViewportAt; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _offset__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../offset */ "./src/assets/javascripts/browser/viewport/offset/index.ts");
/* harmony import */ var _size__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../size */ "./src/assets/javascripts/browser/viewport/size/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Watch viewport
 *
 * @return Viewport observable
 */
function watchViewport() {
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["combineLatest"])([
        Object(_offset__WEBPACK_IMPORTED_MODULE_3__["watchViewportOffset"])(),
        Object(_size__WEBPACK_IMPORTED_MODULE_4__["watchViewportSize"])()
    ])
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
        var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), offset = _b[0], size = _b[1];
        return ({ offset: offset, size: size });
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["shareReplay"])(1));
}
/**
 * Watch viewport relative to element
 *
 * @param el - Element
 * @param options - Options
 *
 * @return Viewport observable
 */
function watchViewportAt(el, _a) {
    var header$ = _a.header$, viewport$ = _a.viewport$;
    var offset$ = viewport$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilKeyChanged"])("size"), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function () { return ({
        x: el.offsetLeft,
        y: el.offsetTop
    }); }));
    /* Compute relative viewport, return hot observable */
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["combineLatest"])([header$, viewport$, offset$])
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
        var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 3), height = _b[0].height, _c = _b[1], offset = _c.offset, size = _c.size, _d = _b[2], x = _d.x, y = _d.y;
        return ({
            offset: {
                x: offset.x - x,
                y: offset.y - y + height
            },
            size: size
        });
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["shareReplay"])(1));
}


/***/ }),

/***/ "./src/assets/javascripts/browser/viewport/index.ts":
/*!**********************************************************!*\
  !*** ./src/assets/javascripts/browser/viewport/index.ts ***!
  \**********************************************************/
/*! exports provided: watchViewport, watchViewportAt, getViewportOffset, setViewportOffset, watchViewportOffset, getViewportSize, watchViewportSize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_ */ "./src/assets/javascripts/browser/viewport/_/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchViewport", function() { return ___WEBPACK_IMPORTED_MODULE_0__["watchViewport"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchViewportAt", function() { return ___WEBPACK_IMPORTED_MODULE_0__["watchViewportAt"]; });

/* harmony import */ var _offset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./offset */ "./src/assets/javascripts/browser/viewport/offset/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getViewportOffset", function() { return _offset__WEBPACK_IMPORTED_MODULE_1__["getViewportOffset"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setViewportOffset", function() { return _offset__WEBPACK_IMPORTED_MODULE_1__["setViewportOffset"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchViewportOffset", function() { return _offset__WEBPACK_IMPORTED_MODULE_1__["watchViewportOffset"]; });

/* harmony import */ var _size__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./size */ "./src/assets/javascripts/browser/viewport/size/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getViewportSize", function() { return _size__WEBPACK_IMPORTED_MODULE_2__["getViewportSize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchViewportSize", function() { return _size__WEBPACK_IMPORTED_MODULE_2__["watchViewportSize"]; });

/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

/***/ "./src/assets/javascripts/browser/viewport/offset/index.ts":
/*!*****************************************************************!*\
  !*** ./src/assets/javascripts/browser/viewport/offset/index.ts ***!
  \*****************************************************************/
/*! exports provided: getViewportOffset, setViewportOffset, watchViewportOffset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getViewportOffset", function() { return getViewportOffset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setViewportOffset", function() { return setViewportOffset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watchViewportOffset", function() { return watchViewportOffset; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Retrieve viewport offset
 *
 * On iOS Safari, viewport offset can be negative due to overflow scrolling.
 * As this may induce strange behaviors downstream, we'll just limit it to 0.
 *
 * @return Viewport offset
 */
function getViewportOffset() {
    return {
        x: Math.max(0, pageXOffset),
        y: Math.max(0, pageYOffset)
    };
}
/**
 * Set viewport offset
 *
 * @param offset - Viewport offset
 */
function setViewportOffset(_a) {
    var x = _a.x, y = _a.y;
    window.scrollTo(x || 0, y || 0);
}
/* ------------------------------------------------------------------------- */
/**
 * Watch viewport offset
 *
 * @return Viewport offset observable
 */
function watchViewportOffset() {
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(window, "scroll"), Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(window, "resize"))
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(getViewportOffset), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])(getViewportOffset()));
}


/***/ }),

/***/ "./src/assets/javascripts/browser/viewport/size/index.ts":
/*!***************************************************************!*\
  !*** ./src/assets/javascripts/browser/viewport/size/index.ts ***!
  \***************************************************************/
/*! exports provided: getViewportSize, watchViewportSize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getViewportSize", function() { return getViewportSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watchViewportSize", function() { return watchViewportSize; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Retrieve viewport size
 *
 * @return Viewport size
 */
function getViewportSize() {
    return {
        width: innerWidth,
        height: innerHeight
    };
}
/* ------------------------------------------------------------------------- */
/**
 * Watch viewport size
 *
 * @return Viewport size observable
 */
function watchViewportSize() {
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(window, "resize")
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(getViewportSize), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])(getViewportSize()));
}


/***/ }),

/***/ "./src/assets/javascripts/browser/worker/index.ts":
/*!********************************************************!*\
  !*** ./src/assets/javascripts/browser/worker/index.ts ***!
  \********************************************************/
/*! exports provided: watchWorker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watchWorker", function() { return watchWorker; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Watch a web worker
 *
 * This function returns an observable that will send all values emitted by the
 * message observable to the web worker. Web worker communication is expected
 * to be bidirectional (request-response) and synchronous. Messages that are
 * emitted during a pending request are throttled, the last one is emitted.
 *
 * @param worker - Web worker
 * @param options - Options
 *
 * @return Worker message observable
 */
function watchWorker(worker, _a) {
    var tx$ = _a.tx$;
    /* Intercept messages from worker-like objects */
    var rx$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEventPattern"])(function (next) {
        return worker.addEventListener("message", next);
    })
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["pluck"])("data"));
    /* Send and receive messages, return hot observable */
    return tx$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["throttle"])(function () { return rx$; }, { leading: true, trailing: true }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (message) { return worker.postMessage(message); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMapTo"])(rx$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["share"])());
}


/***/ }),

/***/ "./src/assets/javascripts/components/_/index.ts":
/*!******************************************************!*\
  !*** ./src/assets/javascripts/components/_/index.ts ***!
  \******************************************************/
/*! exports provided: setupComponents, useComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setupComponents", function() { return setupComponents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useComponent", function() { return useComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! browser */ "./src/assets/javascripts/browser/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Data
 * ------------------------------------------------------------------------- */
/**
 * Component map observable
 */
var components$;
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Setup bindings to components with given names
 *
 * This function will maintain bindings to the elements identified by the given
 * names in-between document switches and update the elements in-place.
 *
 * @param names - Component names
 * @param options - Options
 */
function setupComponents(names, _a) {
    var document$ = _a.document$;
    components$ = document$
        .pipe(
    /* Build component map */
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (document) { return names.reduce(function (components, name) {
        var _a;
        var el = Object(browser__WEBPACK_IMPORTED_MODULE_3__["getElement"])("[data-md-component=" + name + "]", document);
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, components), typeof el !== "undefined" ? (_a = {}, _a[name] = el, _a) : {});
    }, {}); }), 
    /* Re-compute component map on document switch */
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["scan"])(function (prev, next) {
        var e_1, _a;
        try {
            for (var names_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(names), names_1_1 = names_1.next(); !names_1_1.done; names_1_1 = names_1.next()) {
                var name = names_1_1.value;
                switch (name) {
                    /* Top-level components: update */
                    case "header-title":
                    case "container":
                    case "skip":
                        if (name in prev && typeof prev[name] !== "undefined") {
                            prev[name].replaceWith(next[name]);
                            prev[name] = next[name];
                        }
                        break;
                    /* All other components: rebind */
                    default:
                        if (typeof next[name] !== "undefined")
                            prev[name] = Object(browser__WEBPACK_IMPORTED_MODULE_3__["getElement"])("[data-md-component=" + name + "]");
                        else
                            delete prev[name];
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (names_1_1 && !names_1_1.done && (_a = names_1.return)) _a.call(names_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return prev;
    }), 
    /* Convert to hot observable */
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["shareReplay"])(1));
}
function useComponent(name) {
    return components$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function (components) { return (typeof components[name] !== "undefined"
        ? Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(components[name])
        : rxjs__WEBPACK_IMPORTED_MODULE_1__["EMPTY"]); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])());
}


/***/ }),

/***/ "./src/assets/javascripts/components/header/_/index.ts":
/*!*************************************************************!*\
  !*** ./src/assets/javascripts/components/header/_/index.ts ***!
  \*************************************************************/
/*! exports provided: mountHeader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mountHeader", function() { return mountHeader; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! browser */ "./src/assets/javascripts/browser/index.ts");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_ */ "./src/assets/javascripts/components/_/index.ts");
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../react */ "./src/assets/javascripts/components/header/react/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Mount header from source observable
 *
 * @param options - Options
 *
 * @return Operator function
 */
function mountHeader(_a) {
    var viewport$ = _a.viewport$;
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["pipe"])(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function (el) {
        var header$ = Object(_react__WEBPACK_IMPORTED_MODULE_5__["watchHeader"])(el, { viewport$: viewport$ });
        /* Compute whether the header should switch to page header */
        var type$ = Object(___WEBPACK_IMPORTED_MODULE_4__["useComponent"])("main")
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (main) { return Object(browser__WEBPACK_IMPORTED_MODULE_3__["getElement"])("h1, h2, h3, h4, h5, h6", main); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function (hx) { return typeof hx !== "undefined"; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["withLatestFrom"])(Object(___WEBPACK_IMPORTED_MODULE_4__["useComponent"])("header-title")), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function (_a) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), hx = _b[0], title = _b[1];
            return Object(browser__WEBPACK_IMPORTED_MODULE_3__["watchViewportAt"])(hx, { header$: header$, viewport$: viewport$ })
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
                var y = _a.offset.y;
                return y >= hx.offsetHeight ? "page" : "site";
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])(), Object(_react__WEBPACK_IMPORTED_MODULE_5__["applyHeaderType"])(title));
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])("site"));
        /* Combine into single observable */
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["combineLatest"])([header$, type$])
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), header = _b[0], type = _b[1];
            return (Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ type: type }, header));
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["shareReplay"])(1));
    }));
}


/***/ }),

/***/ "./src/assets/javascripts/components/header/index.ts":
/*!***********************************************************!*\
  !*** ./src/assets/javascripts/components/header/index.ts ***!
  \***********************************************************/
/*! exports provided: mountHeader, watchHeader, applyHeaderType, setHeaderTitleActive, resetHeaderTitleActive */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_ */ "./src/assets/javascripts/components/header/_/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mountHeader", function() { return ___WEBPACK_IMPORTED_MODULE_0__["mountHeader"]; });

/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./react */ "./src/assets/javascripts/components/header/react/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchHeader", function() { return _react__WEBPACK_IMPORTED_MODULE_1__["watchHeader"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyHeaderType", function() { return _react__WEBPACK_IMPORTED_MODULE_1__["applyHeaderType"]; });

/* harmony import */ var _set__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./set */ "./src/assets/javascripts/components/header/set/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setHeaderTitleActive", function() { return _set__WEBPACK_IMPORTED_MODULE_2__["setHeaderTitleActive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetHeaderTitleActive", function() { return _set__WEBPACK_IMPORTED_MODULE_2__["resetHeaderTitleActive"]; });

/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

/***/ "./src/assets/javascripts/components/header/react/index.ts":
/*!*****************************************************************!*\
  !*** ./src/assets/javascripts/components/header/react/index.ts ***!
  \*****************************************************************/
/*! exports provided: watchHeader, applyHeaderType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watchHeader", function() { return watchHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyHeaderType", function() { return applyHeaderType; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _set__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../set */ "./src/assets/javascripts/components/header/set/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Watch header
 *
 * The header is wrapped in an observable to pave the way for auto-hiding or
 * other dynamic behaviors that may be implemented later on.
 *
 * @param el - Header element
 * @param options - Options
 *
 * @return Header observable
 */
function watchHeader(el, _a) {
    var viewport$ = _a.viewport$;
    return viewport$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilKeyChanged"])("size"), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function () {
        var styles = getComputedStyle(el);
        var sticky = [
            "sticky",
            "-webkit-sticky" /* Old Safari */
        ].includes(styles.position);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])({
            sticky: sticky,
            height: sticky ? el.offsetHeight : 0
        });
    }));
}
/* ------------------------------------------------------------------------- */
/**
 * Apply header title type
 *
 * @param el - Header title element
 *
 * @return Operator function
 */
function applyHeaderType(el) {
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["pipe"])(
    /* Defer repaint to next animation frame */
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["observeOn"])(rxjs__WEBPACK_IMPORTED_MODULE_0__["animationFrameScheduler"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (type) {
        Object(_set__WEBPACK_IMPORTED_MODULE_2__["setHeaderTitleActive"])(el, type === "page");
    }), 
    /* Reset on complete or error */
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["finalize"])(function () {
        Object(_set__WEBPACK_IMPORTED_MODULE_2__["resetHeaderTitleActive"])(el);
    }));
}


/***/ }),

/***/ "./src/assets/javascripts/components/header/set/index.ts":
/*!***************************************************************!*\
  !*** ./src/assets/javascripts/components/header/set/index.ts ***!
  \***************************************************************/
/*! exports provided: setHeaderTitleActive, resetHeaderTitleActive */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setHeaderTitleActive", function() { return setHeaderTitleActive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetHeaderTitleActive", function() { return resetHeaderTitleActive; });
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Set header title active
 *
 * @param el - Header title element
 * @param value - Whether the title is shown
 */
function setHeaderTitleActive(el, value) {
    el.setAttribute("data-md-state", value ? "active" : "");
}
/**
 * Reset header title active
 *
 * @param el - Header title element
 */
function resetHeaderTitleActive(el) {
    el.removeAttribute("data-md-state");
}


/***/ }),

/***/ "./src/assets/javascripts/components/hero/_/index.ts":
/*!***********************************************************!*\
  !*** ./src/assets/javascripts/components/hero/_/index.ts ***!
  \***********************************************************/
/*! exports provided: mountHero */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mountHero", function() { return mountHero; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! browser */ "./src/assets/javascripts/browser/index.ts");
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../react */ "./src/assets/javascripts/components/hero/react/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Mount hero from source observable
 *
 * @param options - Options
 *
 * @return Operator function
 */
function mountHero(_a) {
    var header$ = _a.header$, viewport$ = _a.viewport$;
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["pipe"])(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function (el) { return Object(browser__WEBPACK_IMPORTED_MODULE_2__["watchViewportAt"])(el, { header$: header$, viewport$: viewport$ })
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (_a) {
        var y = _a.offset.y;
        return ({ hidden: y >= 20 });
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])(), Object(_react__WEBPACK_IMPORTED_MODULE_3__["applyHero"])(el)); }));
}


/***/ }),

/***/ "./src/assets/javascripts/components/hero/index.ts":
/*!*********************************************************!*\
  !*** ./src/assets/javascripts/components/hero/index.ts ***!
  \*********************************************************/
/*! exports provided: mountHero, applyHero, setHeroHidden, resetHeroHidden */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_ */ "./src/assets/javascripts/components/hero/_/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mountHero", function() { return ___WEBPACK_IMPORTED_MODULE_0__["mountHero"]; });

/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./react */ "./src/assets/javascripts/components/hero/react/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyHero", function() { return _react__WEBPACK_IMPORTED_MODULE_1__["applyHero"]; });

/* harmony import */ var _set__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./set */ "./src/assets/javascripts/components/hero/set/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setHeroHidden", function() { return _set__WEBPACK_IMPORTED_MODULE_2__["setHeroHidden"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetHeroHidden", function() { return _set__WEBPACK_IMPORTED_MODULE_2__["resetHeroHidden"]; });

/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

/***/ "./src/assets/javascripts/components/hero/react/index.ts":
/*!***************************************************************!*\
  !*** ./src/assets/javascripts/components/hero/react/index.ts ***!
  \***************************************************************/
/*! exports provided: applyHero */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyHero", function() { return applyHero; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _set__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../set */ "./src/assets/javascripts/components/hero/set/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Apply hero
 *
 * @param el - Hero element
 *
 * @return Operator function
 */
function applyHero(el) {
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["pipe"])(
    /* Defer repaint to next animation frame */
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["observeOn"])(rxjs__WEBPACK_IMPORTED_MODULE_0__["animationFrameScheduler"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (_a) {
        var hidden = _a.hidden;
        Object(_set__WEBPACK_IMPORTED_MODULE_2__["setHeroHidden"])(el, hidden);
    }), 
    /* Reset on complete or error */
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["finalize"])(function () {
        Object(_set__WEBPACK_IMPORTED_MODULE_2__["resetHeroHidden"])(el);
    }));
}


/***/ }),

/***/ "./src/assets/javascripts/components/hero/set/index.ts":
/*!*************************************************************!*\
  !*** ./src/assets/javascripts/components/hero/set/index.ts ***!
  \*************************************************************/
/*! exports provided: setHeroHidden, resetHeroHidden */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setHeroHidden", function() { return setHeroHidden; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetHeroHidden", function() { return resetHeroHidden; });
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Set hero hidden
 *
 * @param el - Hero element
 * @param value - Whether the element is hidden
 */
function setHeroHidden(el, value) {
    el.setAttribute("data-md-state", value ? "hidden" : "");
}
/**
 * Reset hero hidden
 *
 * @param el - Hero element
 */
function resetHeroHidden(el) {
    el.removeAttribute("data-md-state");
}


/***/ }),

/***/ "./src/assets/javascripts/components/index.ts":
/*!****************************************************!*\
  !*** ./src/assets/javascripts/components/index.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_ */ "./src/assets/javascripts/components/_/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setupComponents", function() { return ___WEBPACK_IMPORTED_MODULE_0__["setupComponents"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useComponent", function() { return ___WEBPACK_IMPORTED_MODULE_0__["useComponent"]; });

/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header */ "./src/assets/javascripts/components/header/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mountHeader", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["mountHeader"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchHeader", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["watchHeader"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyHeaderType", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["applyHeaderType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setHeaderTitleActive", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["setHeaderTitleActive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetHeaderTitleActive", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["resetHeaderTitleActive"]; });

/* harmony import */ var _hero__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hero */ "./src/assets/javascripts/components/hero/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mountHero", function() { return _hero__WEBPACK_IMPORTED_MODULE_2__["mountHero"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyHero", function() { return _hero__WEBPACK_IMPORTED_MODULE_2__["applyHero"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setHeroHidden", function() { return _hero__WEBPACK_IMPORTED_MODULE_2__["setHeroHidden"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetHeroHidden", function() { return _hero__WEBPACK_IMPORTED_MODULE_2__["resetHeroHidden"]; });

/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./main */ "./src/assets/javascripts/components/main/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mountMain", function() { return _main__WEBPACK_IMPORTED_MODULE_3__["mountMain"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchMain", function() { return _main__WEBPACK_IMPORTED_MODULE_3__["watchMain"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyHeaderShadow", function() { return _main__WEBPACK_IMPORTED_MODULE_3__["applyHeaderShadow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setHeaderShadow", function() { return _main__WEBPACK_IMPORTED_MODULE_3__["setHeaderShadow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetHeaderShadow", function() { return _main__WEBPACK_IMPORTED_MODULE_3__["resetHeaderShadow"]; });

/* harmony import */ var _navigation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./navigation */ "./src/assets/javascripts/components/navigation/index.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _navigation__WEBPACK_IMPORTED_MODULE_4__) if(["setupComponents","useComponent","mountHeader","watchHeader","applyHeaderType","setHeaderTitleActive","resetHeaderTitleActive","mountHero","applyHero","setHeroHidden","resetHeroHidden","mountMain","watchMain","applyHeaderShadow","setHeaderShadow","resetHeaderShadow","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _navigation__WEBPACK_IMPORTED_MODULE_4__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./search */ "./src/assets/javascripts/components/search/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mountSearch", function() { return _search__WEBPACK_IMPORTED_MODULE_5__["mountSearch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mountSearchQuery", function() { return _search__WEBPACK_IMPORTED_MODULE_5__["mountSearchQuery"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchSearchQuery", function() { return _search__WEBPACK_IMPORTED_MODULE_5__["watchSearchQuery"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mountSearchReset", function() { return _search__WEBPACK_IMPORTED_MODULE_5__["mountSearchReset"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchSearchReset", function() { return _search__WEBPACK_IMPORTED_MODULE_5__["watchSearchReset"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mountSearchResult", function() { return _search__WEBPACK_IMPORTED_MODULE_5__["mountSearchResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applySearchResult", function() { return _search__WEBPACK_IMPORTED_MODULE_5__["applySearchResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setSearchResultMeta", function() { return _search__WEBPACK_IMPORTED_MODULE_5__["setSearchResultMeta"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetSearchResultMeta", function() { return _search__WEBPACK_IMPORTED_MODULE_5__["resetSearchResultMeta"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addToSearchResultList", function() { return _search__WEBPACK_IMPORTED_MODULE_5__["addToSearchResultList"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetSearchResultList", function() { return _search__WEBPACK_IMPORTED_MODULE_5__["resetSearchResultList"]; });

/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shared */ "./src/assets/javascripts/components/shared/index.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _shared__WEBPACK_IMPORTED_MODULE_6__) if(["setupComponents","useComponent","mountHeader","watchHeader","applyHeaderType","setHeaderTitleActive","resetHeaderTitleActive","mountHero","applyHero","setHeroHidden","resetHeroHidden","mountMain","watchMain","applyHeaderShadow","setHeaderShadow","resetHeaderShadow","mountSearch","mountSearchQuery","watchSearchQuery","mountSearchReset","watchSearchReset","mountSearchResult","applySearchResult","setSearchResultMeta","resetSearchResultMeta","addToSearchResultList","resetSearchResultList","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _shared__WEBPACK_IMPORTED_MODULE_6__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _tabs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tabs */ "./src/assets/javascripts/components/tabs/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mountTabs", function() { return _tabs__WEBPACK_IMPORTED_MODULE_7__["mountTabs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyTabs", function() { return _tabs__WEBPACK_IMPORTED_MODULE_7__["applyTabs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setTabsHidden", function() { return _tabs__WEBPACK_IMPORTED_MODULE_7__["setTabsHidden"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetTabsHidden", function() { return _tabs__WEBPACK_IMPORTED_MODULE_7__["resetTabsHidden"]; });

/* harmony import */ var _toc__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./toc */ "./src/assets/javascripts/components/toc/index.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _toc__WEBPACK_IMPORTED_MODULE_8__) if(["setupComponents","useComponent","mountHeader","watchHeader","applyHeaderType","setHeaderTitleActive","resetHeaderTitleActive","mountHero","applyHero","setHeroHidden","resetHeroHidden","mountMain","watchMain","applyHeaderShadow","setHeaderShadow","resetHeaderShadow","mountSearch","mountSearchQuery","watchSearchQuery","mountSearchReset","watchSearchReset","mountSearchResult","applySearchResult","setSearchResultMeta","resetSearchResultMeta","addToSearchResultList","resetSearchResultList","mountTabs","applyTabs","setTabsHidden","resetTabsHidden","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _toc__WEBPACK_IMPORTED_MODULE_8__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

/***/ "./src/assets/javascripts/components/main/_/index.ts":
/*!***********************************************************!*\
  !*** ./src/assets/javascripts/components/main/_/index.ts ***!
  \***********************************************************/
/*! exports provided: mountMain */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mountMain", function() { return mountMain; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_ */ "./src/assets/javascripts/components/_/index.ts");
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../react */ "./src/assets/javascripts/components/main/react/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Mount main area from source observable
 *
 * The header must be connected to the main area observable outside of the
 * operator function, as the header will persist in-between document switches
 * while the main area is replaced. However, the header observable must be
 * passed to this function, so we connect both via a long-living subject.
 *
 * @param options - Options
 *
 * @return Operator function
 */
function mountMain(_a) {
    var header$ = _a.header$, viewport$ = _a.viewport$;
    var main$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
    /* Connect to main area observable via long-living subject */
    Object(___WEBPACK_IMPORTED_MODULE_2__["useComponent"])("header")
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function (header) { return main$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilKeyChanged"])("active"), Object(_react__WEBPACK_IMPORTED_MODULE_3__["applyHeaderShadow"])(header)); }))
        .subscribe();
    /* Return operator */
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["pipe"])(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function (el) { return Object(_react__WEBPACK_IMPORTED_MODULE_3__["watchMain"])(el, { header$: header$, viewport$: viewport$ }); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (main) { return main$.next(main); }));
}


/***/ }),

/***/ "./src/assets/javascripts/components/main/index.ts":
/*!*********************************************************!*\
  !*** ./src/assets/javascripts/components/main/index.ts ***!
  \*********************************************************/
/*! exports provided: mountMain, watchMain, applyHeaderShadow, setHeaderShadow, resetHeaderShadow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_ */ "./src/assets/javascripts/components/main/_/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mountMain", function() { return ___WEBPACK_IMPORTED_MODULE_0__["mountMain"]; });

/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./react */ "./src/assets/javascripts/components/main/react/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchMain", function() { return _react__WEBPACK_IMPORTED_MODULE_1__["watchMain"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyHeaderShadow", function() { return _react__WEBPACK_IMPORTED_MODULE_1__["applyHeaderShadow"]; });

/* harmony import */ var _set__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./set */ "./src/assets/javascripts/components/main/set/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setHeaderShadow", function() { return _set__WEBPACK_IMPORTED_MODULE_2__["setHeaderShadow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetHeaderShadow", function() { return _set__WEBPACK_IMPORTED_MODULE_2__["resetHeaderShadow"]; });

/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

/***/ "./src/assets/javascripts/components/main/react/index.ts":
/*!***************************************************************!*\
  !*** ./src/assets/javascripts/components/main/react/index.ts ***!
  \***************************************************************/
/*! exports provided: watchMain, applyHeaderShadow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watchMain", function() { return watchMain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyHeaderShadow", function() { return applyHeaderShadow; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _set__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../set */ "./src/assets/javascripts/components/main/set/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Watch main area
 *
 * This function returns an observable that computes the visual parameters of
 * the main area which depends on the viewport vertical offset and height, as
 * well as the height of the header element, if the header is fixed.
 *
 * @param el - Main area element
 * @param options - Options
 *
 * @return Main area observable
 */
function watchMain(el, _a) {
    var header$ = _a.header$, viewport$ = _a.viewport$;
    /* Compute necessary adjustment for header */
    var adjust$ = header$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["pluck"])("height"));
    /* Compute the main area's visible height */
    var height$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["combineLatest"])([adjust$, viewport$])
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
        var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), adjust = _b[0], _c = _b[1], y = _c.offset.y, height = _c.size.height;
        var top = el.offsetTop;
        var bottom = el.offsetHeight + top;
        return height
            - Math.max(0, top - y, adjust)
            - Math.max(0, height + y - bottom);
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (height) { return Math.max(0, height); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])());
    /* Compute whether the viewport offset is past the main area's top */
    var active$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["combineLatest"])([adjust$, viewport$])
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
        var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), adjust = _b[0], y = _b[1].offset.y;
        return y >= el.offsetTop - adjust;
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])());
    /* Combine into a single observable */
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["combineLatest"])([adjust$, height$, active$])
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
        var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 3), adjust = _b[0], height = _b[1], active = _b[2];
        return ({
            offset: el.offsetTop - adjust,
            height: height,
            active: active
        });
    }));
}
/* ------------------------------------------------------------------------- */
/**
 * Apply header shadow
 *
 * @param el - Header element
 *
 * @return Operator function
 */
function applyHeaderShadow(el) {
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["pipe"])(
    /* Defer repaint to next animation frame */
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["observeOn"])(rxjs__WEBPACK_IMPORTED_MODULE_1__["animationFrameScheduler"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function (_a) {
        var active = _a.active;
        Object(_set__WEBPACK_IMPORTED_MODULE_3__["setHeaderShadow"])(el, active);
    }), 
    /* Reset on complete or error */
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["finalize"])(function () {
        Object(_set__WEBPACK_IMPORTED_MODULE_3__["resetHeaderShadow"])(el);
    }));
}


/***/ }),

/***/ "./src/assets/javascripts/components/main/set/index.ts":
/*!*************************************************************!*\
  !*** ./src/assets/javascripts/components/main/set/index.ts ***!
  \*************************************************************/
/*! exports provided: setHeaderShadow, resetHeaderShadow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setHeaderShadow", function() { return setHeaderShadow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetHeaderShadow", function() { return resetHeaderShadow; });
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Set header shadow
 *
 * @param el - Header element
 * @param value - Whether the shadow is shown
 */
function setHeaderShadow(el, value) {
    el.setAttribute("data-md-state", value ? "shadow" : "");
}
/**
 * Reset header shadow
 *
 * @param el - Header element
 */
function resetHeaderShadow(el) {
    el.removeAttribute("data-md-state");
}


/***/ }),

/***/ "./src/assets/javascripts/components/navigation/_/index.ts":
/*!*****************************************************************!*\
  !*** ./src/assets/javascripts/components/navigation/_/index.ts ***!
  \*****************************************************************/
/*! exports provided: mountNavigation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mountNavigation", function() { return mountNavigation; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! browser */ "./src/assets/javascripts/browser/index.ts");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared */ "./src/assets/javascripts/components/shared/index.ts");
/* harmony import */ var _layer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../layer */ "./src/assets/javascripts/components/navigation/layer/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Mount navigation from source observable
 *
 * @param options - Options
 *
 * @return Operator function
 */
function mountNavigation(_a) {
    var header$ = _a.header$, main$ = _a.main$, viewport$ = _a.viewport$, screen$ = _a.screen$;
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["pipe"])(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function (el) { return screen$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function (screen) {
        /* [screen +]: Mount navigation in sidebar */
        if (screen) {
            return Object(_shared__WEBPACK_IMPORTED_MODULE_3__["watchSidebar"])(el, { main$: main$, viewport$: viewport$ })
                .pipe(Object(_shared__WEBPACK_IMPORTED_MODULE_3__["applySidebar"])(el, { header$: header$ }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (sidebar) { return ({ sidebar: sidebar }); }));
            /* [screen -]: Mount navigation in drawer */
        }
        else {
            var els = Object(browser__WEBPACK_IMPORTED_MODULE_2__["getElements"])("nav", el);
            return Object(_layer__WEBPACK_IMPORTED_MODULE_4__["watchNavigationLayer"])(els)
                .pipe(Object(_layer__WEBPACK_IMPORTED_MODULE_4__["applyNavigationLayer"])(els), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (layer) { return ({ layer: layer }); }));
        }
    })); }));
}


/***/ }),

/***/ "./src/assets/javascripts/components/navigation/index.ts":
/*!***************************************************************!*\
  !*** ./src/assets/javascripts/components/navigation/index.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_ */ "./src/assets/javascripts/components/navigation/_/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mountNavigation", function() { return ___WEBPACK_IMPORTED_MODULE_0__["mountNavigation"]; });

/* harmony import */ var _layer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layer */ "./src/assets/javascripts/components/navigation/layer/index.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _layer__WEBPACK_IMPORTED_MODULE_1__) if(["mountNavigation","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _layer__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

/***/ "./src/assets/javascripts/components/navigation/layer/_/index.ts":
/*!***********************************************************************!*\
  !*** ./src/assets/javascripts/components/navigation/layer/_/index.ts ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

/***/ "./src/assets/javascripts/components/navigation/layer/index.ts":
/*!*********************************************************************!*\
  !*** ./src/assets/javascripts/components/navigation/layer/index.ts ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_ */ "./src/assets/javascripts/components/navigation/layer/_/index.ts");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in ___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return ___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./react */ "./src/assets/javascripts/components/navigation/layer/react/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchNavigationLayer", function() { return _react__WEBPACK_IMPORTED_MODULE_1__["watchNavigationLayer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyNavigationLayer", function() { return _react__WEBPACK_IMPORTED_MODULE_1__["applyNavigationLayer"]; });

/* harmony import */ var _set__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./set */ "./src/assets/javascripts/components/navigation/layer/set/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setOverflowScrolling", function() { return _set__WEBPACK_IMPORTED_MODULE_2__["setOverflowScrolling"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetOverflowScrolling", function() { return _set__WEBPACK_IMPORTED_MODULE_2__["resetOverflowScrolling"]; });

/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

/***/ "./src/assets/javascripts/components/navigation/layer/react/index.ts":
/*!***************************************************************************!*\
  !*** ./src/assets/javascripts/components/navigation/layer/react/index.ts ***!
  \***************************************************************************/
/*! exports provided: watchNavigationLayer, applyNavigationLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watchNavigationLayer", function() { return watchNavigationLayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyNavigationLayer", function() { return applyNavigationLayer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! browser */ "./src/assets/javascripts/browser/index.ts");
/* harmony import */ var _set__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../set */ "./src/assets/javascripts/components/navigation/layer/set/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Watch navigation layer
 *
 * On iOS we want to add `-webkit-overflow-scrolling: touch` for the menus
 * contained in the drawer, but as the navigational layers are nested, we can
 * only add it to the topmost layer or extremely weird cropping will occur.
 * This implementation keeps track of the previous and current layer.
 *
 * @param els - Navigation elements
 *
 * @return Navigation layer observable
 */
function watchNavigationLayer(els) {
    var e_1, _a;
    var table = new Map();
    try {
        for (var els_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(els), els_1_1 = els_1.next(); !els_1_1.done; els_1_1 = els_1.next()) {
            var el = els_1_1.value;
            var label = Object(browser__WEBPACK_IMPORTED_MODULE_4__["getElement"])("label", el);
            if (typeof label !== "undefined") {
                var input = Object(browser__WEBPACK_IMPORTED_MODULE_4__["getElementOrThrow"])("#" + label.htmlFor);
                table.set(input, el);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (els_1_1 && !els_1_1.done && (_a = els_1.return)) _a.call(els_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    /* Determine topmost layer */
    var layer$ = rxjs__WEBPACK_IMPORTED_MODULE_2__["merge"].apply(void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(table.keys()).map(function (input) { return (Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["fromEvent"])(input, "change")); }))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function () { return Object(browser__WEBPACK_IMPORTED_MODULE_4__["getElementOrThrow"])(".md-nav__list", table.get(Object(ramda__WEBPACK_IMPORTED_MODULE_1__["findLast"])(function (_a) {
        var checked = _a.checked;
        return checked;
    }, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(table.keys())))); }));
    /* Return previous and next layer */
    return layer$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (next) { return ({ next: next }); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["scan"])(function (_a, _b) {
        var prev = _a.next;
        var next = _b.next;
        return ({ prev: prev, next: next });
    }));
}
/* ------------------------------------------------------------------------- */
/**
 * Apply navigation layer
 *
 * @param els - Navigation elements
 *
 * @return Operator function
 */
function applyNavigationLayer(els) {
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["pipe"])(
    /* Defer repaint to next animation frame */
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["observeOn"])(rxjs__WEBPACK_IMPORTED_MODULE_2__["animationFrameScheduler"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (_a) {
        var prev = _a.prev;
        if (prev)
            Object(_set__WEBPACK_IMPORTED_MODULE_5__["resetOverflowScrolling"])(prev);
    }), 
    /* Wait until transition has finished */
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["delay"])(250), 
    /* Defer repaint to next animation frame */
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["observeOn"])(rxjs__WEBPACK_IMPORTED_MODULE_2__["animationFrameScheduler"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (_a) {
        var next = _a.next;
        Object(_set__WEBPACK_IMPORTED_MODULE_5__["setOverflowScrolling"])(next);
    }), 
    /* Reset on complete or error */
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["finalize"])(function () {
        var e_2, _a;
        try {
            for (var els_2 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(els), els_2_1 = els_2.next(); !els_2_1.done; els_2_1 = els_2.next()) {
                var el = els_2_1.value;
                Object(_set__WEBPACK_IMPORTED_MODULE_5__["resetOverflowScrolling"])(Object(browser__WEBPACK_IMPORTED_MODULE_4__["getElementOrThrow"])(".md-nav__list", el));
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (els_2_1 && !els_2_1.done && (_a = els_2.return)) _a.call(els_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }));
}


/***/ }),

/***/ "./src/assets/javascripts/components/navigation/layer/set/index.ts":
/*!*************************************************************************!*\
  !*** ./src/assets/javascripts/components/navigation/layer/set/index.ts ***!
  \*************************************************************************/
/*! exports provided: setOverflowScrolling, resetOverflowScrolling */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setOverflowScrolling", function() { return setOverflowScrolling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetOverflowScrolling", function() { return resetOverflowScrolling; });
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Set overflow scrolling
 *
 * @param el - Scrollable element
 */
function setOverflowScrolling(el) {
    el.style.webkitOverflowScrolling = "touch";
}
/**
 * Reset overflow scrolling
 *
 * @param el - Scrollable element
 */
function resetOverflowScrolling(el) {
    el.style.webkitOverflowScrolling = "";
}


/***/ }),

/***/ "./src/assets/javascripts/components/search/_/index.ts":
/*!*************************************************************!*\
  !*** ./src/assets/javascripts/components/search/_/index.ts ***!
  \*************************************************************/
/*! exports provided: mountSearch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mountSearch", function() { return mountSearch; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Mount search from source observable
 *
 * @param options - Options
 *
 * @return Operator function
 */
function mountSearch(_a) {
    var query$ = _a.query$, reset$ = _a.reset$, result$ = _a.result$;
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["pipe"])(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["combineLatest"])([query$, result$, reset$])
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
        var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), query = _b[0], result = _b[1];
        return ({ query: query, result: result });
    })); }));
}


/***/ }),

/***/ "./src/assets/javascripts/components/search/index.ts":
/*!***********************************************************!*\
  !*** ./src/assets/javascripts/components/search/index.ts ***!
  \***********************************************************/
/*! exports provided: mountSearch, mountSearchQuery, watchSearchQuery, mountSearchReset, watchSearchReset, mountSearchResult, applySearchResult, setSearchResultMeta, resetSearchResultMeta, addToSearchResultList, resetSearchResultList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_ */ "./src/assets/javascripts/components/search/_/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mountSearch", function() { return ___WEBPACK_IMPORTED_MODULE_0__["mountSearch"]; });

/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query */ "./src/assets/javascripts/components/search/query/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mountSearchQuery", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["mountSearchQuery"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchSearchQuery", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["watchSearchQuery"]; });

/* harmony import */ var _reset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reset */ "./src/assets/javascripts/components/search/reset/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mountSearchReset", function() { return _reset__WEBPACK_IMPORTED_MODULE_2__["mountSearchReset"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchSearchReset", function() { return _reset__WEBPACK_IMPORTED_MODULE_2__["watchSearchReset"]; });

/* harmony import */ var _result__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./result */ "./src/assets/javascripts/components/search/result/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mountSearchResult", function() { return _result__WEBPACK_IMPORTED_MODULE_3__["mountSearchResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applySearchResult", function() { return _result__WEBPACK_IMPORTED_MODULE_3__["applySearchResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setSearchResultMeta", function() { return _result__WEBPACK_IMPORTED_MODULE_3__["setSearchResultMeta"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetSearchResultMeta", function() { return _result__WEBPACK_IMPORTED_MODULE_3__["resetSearchResultMeta"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addToSearchResultList", function() { return _result__WEBPACK_IMPORTED_MODULE_3__["addToSearchResultList"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetSearchResultList", function() { return _result__WEBPACK_IMPORTED_MODULE_3__["resetSearchResultList"]; });

/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

/***/ "./src/assets/javascripts/components/search/query/_/index.ts":
/*!*******************************************************************!*\
  !*** ./src/assets/javascripts/components/search/query/_/index.ts ***!
  \*******************************************************************/
/*! exports provided: mountSearchQuery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mountSearchQuery", function() { return mountSearchQuery; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! browser */ "./src/assets/javascripts/browser/index.ts");
/* harmony import */ var workers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! workers */ "./src/assets/javascripts/workers/index.ts");
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../react */ "./src/assets/javascripts/components/search/query/react/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Mount search query from source observable
 *
 * @param handler - Worker handler
 * @param options - Options
 *
 * @return Operator function
 */
function mountSearchQuery(_a, options) {
    var tx$ = _a.tx$;
    if (options === void 0) { options = {}; }
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["pipe"])(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function (el) {
        var query$ = Object(_react__WEBPACK_IMPORTED_MODULE_4__["watchSearchQuery"])(el, options);
        /* Subscribe worker to search query */
        query$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilKeyChanged"])("value"), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (_a) {
            var value = _a.value;
            return ({
                type: workers__WEBPACK_IMPORTED_MODULE_3__["SearchMessageType"].QUERY,
                data: value
            });
        }))
            .subscribe(tx$.next.bind(tx$));
        /* Toggle search on focus */
        query$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilKeyChanged"])("focus"))
            .subscribe(function (_a) {
            var focus = _a.focus;
            if (focus)
                Object(browser__WEBPACK_IMPORTED_MODULE_2__["setToggle"])("search", focus);
        });
        /* Return search query */
        return query$;
    }));
}


/***/ }),

/***/ "./src/assets/javascripts/components/search/query/index.ts":
/*!*****************************************************************!*\
  !*** ./src/assets/javascripts/components/search/query/index.ts ***!
  \*****************************************************************/
/*! exports provided: mountSearchQuery, watchSearchQuery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_ */ "./src/assets/javascripts/components/search/query/_/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mountSearchQuery", function() { return ___WEBPACK_IMPORTED_MODULE_0__["mountSearchQuery"]; });

/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./react */ "./src/assets/javascripts/components/search/query/react/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchSearchQuery", function() { return _react__WEBPACK_IMPORTED_MODULE_1__["watchSearchQuery"]; });

/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

/***/ "./src/assets/javascripts/components/search/query/react/index.ts":
/*!***********************************************************************!*\
  !*** ./src/assets/javascripts/components/search/query/react/index.ts ***!
  \***********************************************************************/
/*! exports provided: watchSearchQuery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watchSearchQuery", function() { return watchSearchQuery; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! browser */ "./src/assets/javascripts/browser/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Helper functions
 * ------------------------------------------------------------------------- */
/**
 * Default transformation function
 *
 * Rogue control characters are filtered before handing the query to the
 * search index, as `lunr` will throw otherwise.
 *
 * @param value - Query value
 *
 * @return Transformed query value
 */
function defaultTransform(value) {
    return value
        .replace(/(?:^|\s+)[*+-:^~]+(?=\s+|$)/g, "")
        .trim()
        .replace(/\s+|\b$/g, "* ");
}
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Watch search query
 *
 * Note that the focus event which triggers re-reading the current query value
 * is delayed by `1ms` so the input's empty state is allowed to propagate.
 *
 * @param el - Search query element
 * @param options - Options
 *
 * @return Search query observable
 */
function watchSearchQuery(el, _a) {
    var transform = (_a === void 0 ? {} : _a).transform;
    var fn = transform || defaultTransform;
    /* Intercept keyboard events */
    var value$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["merge"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(el, "keyup"), Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(el, "focus").pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["delay"])(1)))
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function () { return fn(el.value); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])(fn(el.value)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])());
    /* Intercept focus events */
    var focus$ = Object(browser__WEBPACK_IMPORTED_MODULE_3__["watchElementFocus"])(el);
    /* Combine into a single observable */
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["combineLatest"])([value$, focus$])
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
        var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), value = _b[0], focus = _b[1];
        return ({ value: value, focus: focus });
    }));
}


/***/ }),

/***/ "./src/assets/javascripts/components/search/reset/_/index.ts":
/*!*******************************************************************!*\
  !*** ./src/assets/javascripts/components/search/reset/_/index.ts ***!
  \*******************************************************************/
/*! exports provided: mountSearchReset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mountSearchReset", function() { return mountSearchReset; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! browser */ "./src/assets/javascripts/browser/index.ts");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_ */ "./src/assets/javascripts/components/_/index.ts");
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../react */ "./src/assets/javascripts/components/search/reset/react/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Mount search reset from source observable
 *
 * @return Operator function
 */
function mountSearchReset() {
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["pipe"])(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function (el) { return Object(_react__WEBPACK_IMPORTED_MODULE_4__["watchSearchReset"])(el)
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMapTo"])(Object(___WEBPACK_IMPORTED_MODULE_3__["useComponent"])("search-query")), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(browser__WEBPACK_IMPORTED_MODULE_2__["setElementFocus"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mapTo"])(undefined)); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])(undefined));
}


/***/ }),

/***/ "./src/assets/javascripts/components/search/reset/index.ts":
/*!*****************************************************************!*\
  !*** ./src/assets/javascripts/components/search/reset/index.ts ***!
  \*****************************************************************/
/*! exports provided: mountSearchReset, watchSearchReset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_ */ "./src/assets/javascripts/components/search/reset/_/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mountSearchReset", function() { return ___WEBPACK_IMPORTED_MODULE_0__["mountSearchReset"]; });

/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./react */ "./src/assets/javascripts/components/search/reset/react/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchSearchReset", function() { return _react__WEBPACK_IMPORTED_MODULE_1__["watchSearchReset"]; });

/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

/***/ "./src/assets/javascripts/components/search/reset/react/index.ts":
/*!***********************************************************************!*\
  !*** ./src/assets/javascripts/components/search/reset/react/index.ts ***!
  \***********************************************************************/
/*! exports provided: watchSearchReset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watchSearchReset", function() { return watchSearchReset; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Watch search reset
 *
 * @param el - Search reset element
 *
 * @return Search reset observable
 */
function watchSearchReset(el) {
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(el, "click")
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mapTo"])(undefined));
}


/***/ }),

/***/ "./src/assets/javascripts/components/search/result/_/index.ts":
/*!********************************************************************!*\
  !*** ./src/assets/javascripts/components/search/result/_/index.ts ***!
  \********************************************************************/
/*! exports provided: mountSearchResult */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mountSearchResult", function() { return mountSearchResult; });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! browser */ "./src/assets/javascripts/browser/index.ts");
/* harmony import */ var workers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! workers */ "./src/assets/javascripts/workers/index.ts");
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../react */ "./src/assets/javascripts/components/search/result/react/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Mount search result from source observable
 *
 * @param handler - Worker handler
 * @param options - Options
 *
 * @return Operator function
 */
function mountSearchResult(_a, _b) {
    var rx$ = _a.rx$;
    var query$ = _b.query$;
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["pipe"])(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function (el) {
        var container = el.parentElement;
        /* Compute whether there are more search results to fetch */
        var fetch$ = Object(browser__WEBPACK_IMPORTED_MODULE_3__["watchElementOffset"])(container)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
            var y = _a.y;
            return y >= container.scrollHeight - container.offsetHeight - 16;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(ramda__WEBPACK_IMPORTED_MODULE_0__["identity"]));
        /* Apply search results */
        return rx$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(workers__WEBPACK_IMPORTED_MODULE_4__["isSearchResultMessage"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["pluck"])("data"), Object(_react__WEBPACK_IMPORTED_MODULE_5__["applySearchResult"])(el, { query$: query$, fetch$: fetch$ }));
    }));
}


/***/ }),

/***/ "./src/assets/javascripts/components/search/result/index.ts":
/*!******************************************************************!*\
  !*** ./src/assets/javascripts/components/search/result/index.ts ***!
  \******************************************************************/
/*! exports provided: mountSearchResult, applySearchResult, setSearchResultMeta, resetSearchResultMeta, addToSearchResultList, resetSearchResultList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_ */ "./src/assets/javascripts/components/search/result/_/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mountSearchResult", function() { return ___WEBPACK_IMPORTED_MODULE_0__["mountSearchResult"]; });

/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./react */ "./src/assets/javascripts/components/search/result/react/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applySearchResult", function() { return _react__WEBPACK_IMPORTED_MODULE_1__["applySearchResult"]; });

/* harmony import */ var _set__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./set */ "./src/assets/javascripts/components/search/result/set/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setSearchResultMeta", function() { return _set__WEBPACK_IMPORTED_MODULE_2__["setSearchResultMeta"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetSearchResultMeta", function() { return _set__WEBPACK_IMPORTED_MODULE_2__["resetSearchResultMeta"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addToSearchResultList", function() { return _set__WEBPACK_IMPORTED_MODULE_2__["addToSearchResultList"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetSearchResultList", function() { return _set__WEBPACK_IMPORTED_MODULE_2__["resetSearchResultList"]; });

/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

/***/ "./src/assets/javascripts/components/search/result/react/index.ts":
/*!************************************************************************!*\
  !*** ./src/assets/javascripts/components/search/result/react/index.ts ***!
  \************************************************************************/
/*! exports provided: applySearchResult */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applySearchResult", function() { return applySearchResult; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! browser */ "./src/assets/javascripts/browser/index.ts");
/* harmony import */ var templates__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! templates */ "./src/assets/javascripts/templates/index.ts");
/* harmony import */ var _set__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../set */ "./src/assets/javascripts/components/search/result/set/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Apply search results
 *
 * This function will perform a lazy rendering of the search results, depending
 * on the vertical offset of the search result container. When the scroll offset
 * reaches the bottom of the element, more results are fetched and rendered.
 *
 * @param el - Search result element
 * @param options - Options
 *
 * @return Operator function
 */
function applySearchResult(el, _a) {
    var query$ = _a.query$, fetch$ = _a.fetch$;
    var list = Object(browser__WEBPACK_IMPORTED_MODULE_3__["getElementOrThrow"])(".md-search-result__list", el);
    var meta = Object(browser__WEBPACK_IMPORTED_MODULE_3__["getElementOrThrow"])(".md-search-result__meta", el);
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["pipe"])(
    /* Apply search result metadata */
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["withLatestFrom"])(query$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
        var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), result = _b[0], query = _b[1];
        if (query.value) {
            Object(_set__WEBPACK_IMPORTED_MODULE_5__["setSearchResultMeta"])(meta, result.length);
        }
        else {
            Object(_set__WEBPACK_IMPORTED_MODULE_5__["resetSearchResultMeta"])(meta);
        }
        return result;
    }), 
    /* Apply search result list */
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function (result) { return fetch$
        .pipe(
    /* Defer repaint to next animation frame */
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["observeOn"])(rxjs__WEBPACK_IMPORTED_MODULE_1__["animationFrameScheduler"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["scan"])(function (index) {
        var container = el.parentElement;
        while (index < result.length) {
            Object(_set__WEBPACK_IMPORTED_MODULE_5__["addToSearchResultList"])(list, Object(templates__WEBPACK_IMPORTED_MODULE_4__["renderSearchResult"])(result[index++]));
            if (container.scrollHeight - container.offsetHeight > 16)
                break;
        }
        return index;
    }, 0), 
    /* Re-map to search result */
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["mapTo"])(result), 
    /* Reset on complete or error */
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["finalize"])(function () {
        Object(_set__WEBPACK_IMPORTED_MODULE_5__["resetSearchResultList"])(list);
    })); }));
}


/***/ }),

/***/ "./src/assets/javascripts/components/search/result/set/index.ts":
/*!**********************************************************************!*\
  !*** ./src/assets/javascripts/components/search/result/set/index.ts ***!
  \**********************************************************************/
/*! exports provided: setSearchResultMeta, resetSearchResultMeta, addToSearchResultList, resetSearchResultList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSearchResultMeta", function() { return setSearchResultMeta; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetSearchResultMeta", function() { return resetSearchResultMeta; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addToSearchResultList", function() { return addToSearchResultList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetSearchResultList", function() { return resetSearchResultList; });
/* harmony import */ var utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utilities */ "./src/assets/javascripts/utilities/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Set number of search results
 *
 * @param el - Search result metadata element
 * @param value - Number of results
 */
function setSearchResultMeta(el, value) {
    switch (value) {
        /* No results */
        case 0:
            el.textContent = Object(utilities__WEBPACK_IMPORTED_MODULE_0__["translate"])("search.result.none");
            break;
        /* One result */
        case 1:
            el.textContent = Object(utilities__WEBPACK_IMPORTED_MODULE_0__["translate"])("search.result.one");
            break;
        /* Multiple result */
        default:
            el.textContent = Object(utilities__WEBPACK_IMPORTED_MODULE_0__["translate"])("search.result.other", value.toString());
    }
}
/**
 * Reset number of search results
 *
 * @param el - Search result metadata element
 */
function resetSearchResultMeta(el) {
    el.textContent = Object(utilities__WEBPACK_IMPORTED_MODULE_0__["translate"])("search.result.placeholder");
}
/* ------------------------------------------------------------------------- */
/**
 * Add an element to the search result list
 *
 * @param el - Search result list element
 * @param child - Search result element
 */
function addToSearchResultList(el, child) {
    el.appendChild(child);
}
/**
 * Reset search result list
 *
 * @param el - Search result list element
 */
function resetSearchResultList(el) {
    el.innerHTML = "";
}


/***/ }),

/***/ "./src/assets/javascripts/components/shared/index.ts":
/*!***********************************************************!*\
  !*** ./src/assets/javascripts/components/shared/index.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sidebar */ "./src/assets/javascripts/components/shared/sidebar/index.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _sidebar__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _sidebar__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

/***/ "./src/assets/javascripts/components/shared/sidebar/_/index.ts":
/*!*********************************************************************!*\
  !*** ./src/assets/javascripts/components/shared/sidebar/_/index.ts ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

/***/ "./src/assets/javascripts/components/shared/sidebar/index.ts":
/*!*******************************************************************!*\
  !*** ./src/assets/javascripts/components/shared/sidebar/index.ts ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_ */ "./src/assets/javascripts/components/shared/sidebar/_/index.ts");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in ___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return ___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./react */ "./src/assets/javascripts/components/shared/sidebar/react/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchSidebar", function() { return _react__WEBPACK_IMPORTED_MODULE_1__["watchSidebar"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applySidebar", function() { return _react__WEBPACK_IMPORTED_MODULE_1__["applySidebar"]; });

/* harmony import */ var _set__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./set */ "./src/assets/javascripts/components/shared/sidebar/set/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setSidebarOffset", function() { return _set__WEBPACK_IMPORTED_MODULE_2__["setSidebarOffset"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetSidebarOffset", function() { return _set__WEBPACK_IMPORTED_MODULE_2__["resetSidebarOffset"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setSidebarHeight", function() { return _set__WEBPACK_IMPORTED_MODULE_2__["setSidebarHeight"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetSidebarHeight", function() { return _set__WEBPACK_IMPORTED_MODULE_2__["resetSidebarHeight"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setSidebarLock", function() { return _set__WEBPACK_IMPORTED_MODULE_2__["setSidebarLock"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetSidebarLock", function() { return _set__WEBPACK_IMPORTED_MODULE_2__["resetSidebarLock"]; });

/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

/***/ "./src/assets/javascripts/components/shared/sidebar/react/index.ts":
/*!*************************************************************************!*\
  !*** ./src/assets/javascripts/components/shared/sidebar/react/index.ts ***!
  \*************************************************************************/
/*! exports provided: watchSidebar, applySidebar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watchSidebar", function() { return watchSidebar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applySidebar", function() { return applySidebar; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _set__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../set */ "./src/assets/javascripts/components/shared/sidebar/set/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Watch sidebar
 *
 * This function returns an observable that computes the visual parameters of
 * the sidebar which depends on the vertical viewport offset, as well as the
 * height of the main area. When the page is scrolled beyond the header, the
 * sidebar is locked and fills the remaining space.
 *
 * @param el - Sidebar element
 * @param options - Options
 *
 * @return Sidebar observable
 */
function watchSidebar(el, _a) {
    var main$ = _a.main$, viewport$ = _a.viewport$;
    /* Adjust for internal main area offset */
    var adjust$ = viewport$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilKeyChanged"])("size"), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function () { return parseFloat(getComputedStyle(el.parentElement)
        .getPropertyValue("padding-top")); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])());
    /* Compute the sidebar's available height */
    var height$ = viewport$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["withLatestFrom"])(adjust$, main$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
        var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 3), y = _b[0].offset.y, adjust = _b[1], _c = _b[2], offset = _c.offset, height = _c.height;
        return (height
            + Math.min(adjust, Math.max(0, y - offset))
            - adjust);
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])());
    /* Compute whether the sidebar should be locked */
    var lock$ = viewport$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["withLatestFrom"])(adjust$, main$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
        var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 3), y = _b[0].offset.y, adjust = _b[1], offset = _b[2].offset;
        return (y >= offset + adjust);
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])());
    /* Combine into single observable */
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["combineLatest"])([height$, lock$])
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
        var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), height = _b[0], lock = _b[1];
        return ({ height: height, lock: lock });
    }));
}
/* ------------------------------------------------------------------------- */
/**
 * Apply sidebar
 *
 * @param el - Sidebar element
 * @param options - Options
 *
 * @return Operator function
 */
function applySidebar(el, _a) {
    var header$ = _a.header$;
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["pipe"])(
    /* Defer repaint to next animation frame */
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["observeOn"])(rxjs__WEBPACK_IMPORTED_MODULE_1__["animationFrameScheduler"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["withLatestFrom"])(header$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function (_a) {
        var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), _c = _b[0], height = _c.height, lock = _c.lock, offset = _b[1].height;
        Object(_set__WEBPACK_IMPORTED_MODULE_3__["setSidebarHeight"])(el, height);
        Object(_set__WEBPACK_IMPORTED_MODULE_3__["setSidebarLock"])(el, lock);
        /* Set offset in locked state depending on header height */
        if (lock)
            Object(_set__WEBPACK_IMPORTED_MODULE_3__["setSidebarOffset"])(el, offset);
        else
            Object(_set__WEBPACK_IMPORTED_MODULE_3__["resetSidebarOffset"])(el);
    }), 
    /* Re-map to sidebar */
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
        var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 1), sidebar = _b[0];
        return sidebar;
    }), 
    /* Reset on complete or error */
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["finalize"])(function () {
        Object(_set__WEBPACK_IMPORTED_MODULE_3__["resetSidebarOffset"])(el);
        Object(_set__WEBPACK_IMPORTED_MODULE_3__["resetSidebarHeight"])(el);
        Object(_set__WEBPACK_IMPORTED_MODULE_3__["resetSidebarLock"])(el);
    }));
}


/***/ }),

/***/ "./src/assets/javascripts/components/shared/sidebar/set/index.ts":
/*!***********************************************************************!*\
  !*** ./src/assets/javascripts/components/shared/sidebar/set/index.ts ***!
  \***********************************************************************/
/*! exports provided: setSidebarOffset, resetSidebarOffset, setSidebarHeight, resetSidebarHeight, setSidebarLock, resetSidebarLock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSidebarOffset", function() { return setSidebarOffset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetSidebarOffset", function() { return resetSidebarOffset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSidebarHeight", function() { return setSidebarHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetSidebarHeight", function() { return resetSidebarHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSidebarLock", function() { return setSidebarLock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetSidebarLock", function() { return resetSidebarLock; });
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Set sidebar offset
 *
 * @param el - Sidebar element
 * @param value - Sidebar offset
 */
function setSidebarOffset(el, value) {
    el.style.top = value + "px";
}
/**
 * Reset sidebar offset
 *
 * @param el - Sidebar element
 */
function resetSidebarOffset(el) {
    el.style.top = "";
}
/* ------------------------------------------------------------------------- */
/**
 * Set sidebar height
 *
 * @param el - Sidebar element
 * @param value - Sidebar height
 */
function setSidebarHeight(el, value) {
    el.style.height = value + "px";
}
/**
 * Reset sidebar height
 *
 * @param el - Sidebar element
 */
function resetSidebarHeight(el) {
    el.style.height = "";
}
/* ------------------------------------------------------------------------- */
/**
 * Set sidebar lock
 *
 * @param el - Sidebar element
 * @param value - Whether the sidebar is locked
 */
function setSidebarLock(el, value) {
    el.setAttribute("data-md-state", value ? "lock" : "");
}
/**
 * Reset sidebar lock
 *
 * @param el - Sidebar element
 */
function resetSidebarLock(el) {
    el.removeAttribute("data-md-state");
}


/***/ }),

/***/ "./src/assets/javascripts/components/tabs/_/index.ts":
/*!***********************************************************!*\
  !*** ./src/assets/javascripts/components/tabs/_/index.ts ***!
  \***********************************************************/
/*! exports provided: mountTabs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mountTabs", function() { return mountTabs; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! browser */ "./src/assets/javascripts/browser/index.ts");
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../react */ "./src/assets/javascripts/components/tabs/react/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Mount tabs from source observable
 *
 * @param options - Options
 *
 * @return Operator function
 */
function mountTabs(_a) {
    var header$ = _a.header$, viewport$ = _a.viewport$, screen$ = _a.screen$;
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["pipe"])(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function (el) { return screen$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function (screen) {
        /* [screen +]: Mount tabs above screen breakpoint */
        if (screen) {
            return Object(browser__WEBPACK_IMPORTED_MODULE_2__["watchViewportAt"])(el, { header$: header$, viewport$: viewport$ })
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (_a) {
                var y = _a.offset.y;
                return ({ hidden: y >= 10 });
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])(), Object(_react__WEBPACK_IMPORTED_MODULE_3__["applyTabs"])(el));
            /* [screen -]: Unmount tabs below screen breakpoint */
        }
        else {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])({ hidden: true });
        }
    })); }));
}


/***/ }),

/***/ "./src/assets/javascripts/components/tabs/index.ts":
/*!*********************************************************!*\
  !*** ./src/assets/javascripts/components/tabs/index.ts ***!
  \*********************************************************/
/*! exports provided: mountTabs, applyTabs, setTabsHidden, resetTabsHidden */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_ */ "./src/assets/javascripts/components/tabs/_/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mountTabs", function() { return ___WEBPACK_IMPORTED_MODULE_0__["mountTabs"]; });

/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./react */ "./src/assets/javascripts/components/tabs/react/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyTabs", function() { return _react__WEBPACK_IMPORTED_MODULE_1__["applyTabs"]; });

/* harmony import */ var _set__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./set */ "./src/assets/javascripts/components/tabs/set/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setTabsHidden", function() { return _set__WEBPACK_IMPORTED_MODULE_2__["setTabsHidden"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetTabsHidden", function() { return _set__WEBPACK_IMPORTED_MODULE_2__["resetTabsHidden"]; });

/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

/***/ "./src/assets/javascripts/components/tabs/react/index.ts":
/*!***************************************************************!*\
  !*** ./src/assets/javascripts/components/tabs/react/index.ts ***!
  \***************************************************************/
/*! exports provided: applyTabs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyTabs", function() { return applyTabs; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _set__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../set */ "./src/assets/javascripts/components/tabs/set/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Apply tabs
 *
 * @param el - Tabs element
 *
 * @return Operator function
 */
function applyTabs(el) {
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["pipe"])(
    /* Defer repaint to next animation frame */
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["observeOn"])(rxjs__WEBPACK_IMPORTED_MODULE_0__["animationFrameScheduler"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (_a) {
        var hidden = _a.hidden;
        Object(_set__WEBPACK_IMPORTED_MODULE_2__["setTabsHidden"])(el, hidden);
    }), 
    /* Reset on complete or error */
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["finalize"])(function () {
        Object(_set__WEBPACK_IMPORTED_MODULE_2__["resetTabsHidden"])(el);
    }));
}


/***/ }),

/***/ "./src/assets/javascripts/components/tabs/set/index.ts":
/*!*************************************************************!*\
  !*** ./src/assets/javascripts/components/tabs/set/index.ts ***!
  \*************************************************************/
/*! exports provided: setTabsHidden, resetTabsHidden */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTabsHidden", function() { return setTabsHidden; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetTabsHidden", function() { return resetTabsHidden; });
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Set tabs hidden
 *
 * @param el - Tabs element
 * @param value - Whether the element is hidden
 */
function setTabsHidden(el, value) {
    el.setAttribute("data-md-state", value ? "hidden" : "");
}
/**
 * Reset tabs hidden
 *
 * @param el - Tabs element
 */
function resetTabsHidden(el) {
    el.removeAttribute("data-md-state");
}


/***/ }),

/***/ "./src/assets/javascripts/components/toc/_/index.ts":
/*!**********************************************************!*\
  !*** ./src/assets/javascripts/components/toc/_/index.ts ***!
  \**********************************************************/
/*! exports provided: mountTableOfContents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mountTableOfContents", function() { return mountTableOfContents; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! browser */ "./src/assets/javascripts/browser/index.ts");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared */ "./src/assets/javascripts/components/shared/index.ts");
/* harmony import */ var _anchor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../anchor */ "./src/assets/javascripts/components/toc/anchor/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Mount table of contents from source observable
 *
 * @param options - Options
 *
 * @return Operator function
 */
function mountTableOfContents(_a) {
    var header$ = _a.header$, main$ = _a.main$, viewport$ = _a.viewport$, tablet$ = _a.tablet$;
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["pipe"])(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function (el) { return tablet$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function (tablet) {
        /* [tablet +]: Mount table of contents in sidebar */
        if (tablet) {
            var els = Object(browser__WEBPACK_IMPORTED_MODULE_3__["getElements"])(".md-nav__link", el);
            /* Watch and apply sidebar */
            var sidebar$ = Object(_shared__WEBPACK_IMPORTED_MODULE_4__["watchSidebar"])(el, { main$: main$, viewport$: viewport$ })
                .pipe(Object(_shared__WEBPACK_IMPORTED_MODULE_4__["applySidebar"])(el, { header$: header$ }));
            /* Watch and apply anchor list (scroll spy) */
            var anchors$ = Object(_anchor__WEBPACK_IMPORTED_MODULE_5__["watchAnchorList"])(els, { header$: header$, viewport$: viewport$ })
                .pipe(Object(_anchor__WEBPACK_IMPORTED_MODULE_5__["applyAnchorList"])(els));
            /* Combine into a single hot observable */
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["combineLatest"])([sidebar$, anchors$])
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
                var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), sidebar = _b[0], anchors = _b[1];
                return ({ sidebar: sidebar, anchors: anchors });
            }));
            /* [tablet -]: Unmount table of contents */
        }
        else {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])({});
        }
    })); }));
}


/***/ }),

/***/ "./src/assets/javascripts/components/toc/anchor/_/index.ts":
/*!*****************************************************************!*\
  !*** ./src/assets/javascripts/components/toc/anchor/_/index.ts ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

/***/ "./src/assets/javascripts/components/toc/anchor/index.ts":
/*!***************************************************************!*\
  !*** ./src/assets/javascripts/components/toc/anchor/index.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_ */ "./src/assets/javascripts/components/toc/anchor/_/index.ts");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in ___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return ___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./react */ "./src/assets/javascripts/components/toc/anchor/react/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchAnchorList", function() { return _react__WEBPACK_IMPORTED_MODULE_1__["watchAnchorList"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyAnchorList", function() { return _react__WEBPACK_IMPORTED_MODULE_1__["applyAnchorList"]; });

/* harmony import */ var _set__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./set */ "./src/assets/javascripts/components/toc/anchor/set/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setAnchorBlur", function() { return _set__WEBPACK_IMPORTED_MODULE_2__["setAnchorBlur"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetAnchorBlur", function() { return _set__WEBPACK_IMPORTED_MODULE_2__["resetAnchorBlur"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setAnchorActive", function() { return _set__WEBPACK_IMPORTED_MODULE_2__["setAnchorActive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetAnchorActive", function() { return _set__WEBPACK_IMPORTED_MODULE_2__["resetAnchorActive"]; });

/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

/***/ "./src/assets/javascripts/components/toc/anchor/react/index.ts":
/*!*********************************************************************!*\
  !*** ./src/assets/javascripts/components/toc/anchor/react/index.ts ***!
  \*********************************************************************/
/*! exports provided: watchAnchorList, applyAnchorList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watchAnchorList", function() { return watchAnchorList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyAnchorList", function() { return applyAnchorList; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! browser */ "./src/assets/javascripts/browser/index.ts");
/* harmony import */ var _set__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../set */ "./src/assets/javascripts/components/toc/anchor/set/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Watch anchor list
 *
 * This is effectively a scroll-spy implementation which will account for the
 * fixed header and automatically re-calculate anchor offsets when the viewport
 * is resized. The returned observable will only emit if the anchor list needs
 * to be repainted.
 *
 * This implementation tracks an anchor element's entire path starting from its
 * level up to the top-most anchor element, e.g. `[h3, h2, h1]`. Although the
 * Material theme currently doesn't make use of this information, it enables
 * the styling of the entire hierarchy through customization.
 *
 * Note that the current anchor is the last item of the `prev` anchor list.
 *
 * @param els - Anchor elements
 * @param options - Options
 *
 * @return Anchor list observable
 */
function watchAnchorList(els, _a) {
    var e_1, _b;
    var header$ = _a.header$, viewport$ = _a.viewport$;
    var table = new Map();
    try {
        for (var els_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(els), els_1_1 = els_1.next(); !els_1_1.done; els_1_1 = els_1.next()) {
            var el = els_1_1.value;
            var id = decodeURIComponent(el.hash.substring(1));
            var target = Object(browser__WEBPACK_IMPORTED_MODULE_4__["getElement"])("[id=\"" + id + "\"]");
            if (typeof target !== "undefined")
                table.set(el, target);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (els_1_1 && !els_1_1.done && (_b = els_1.return)) _b.call(els_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    /* Compute necessary adjustment for header */
    var adjust$ = header$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (header) { return 18 + header.height; }));
    /* Compute partition of previous and next anchors */
    var partition$ = viewport$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilKeyChanged"])("size"), 
    /* Build index to map anchor paths to vertical offsets */
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function () {
        var path = [];
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(table).reduce(function (index, _a) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), anchor = _b[0], target = _b[1];
            while (path.length) {
                var last = table.get(path[path.length - 1]);
                if (last.tagName >= target.tagName) {
                    path.pop();
                }
                else {
                    break;
                }
            }
            /* If the current anchor is hidden, continue with its parent */
            var offset = target.offsetTop;
            while (!offset && target.parentElement) {
                target = target.parentElement;
                offset = target.offsetTop;
            }
            /* Map reversed anchor path to vertical offset */
            return index.set(Object(ramda__WEBPACK_IMPORTED_MODULE_1__["reverse"])(path = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(path, [anchor])), offset);
        }, new Map());
    }), 
    /* Re-compute partition when viewport offset changes */
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (index) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["combineLatest"])([adjust$, viewport$])
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["scan"])(function (_a, _b) {
        var _c = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), prev = _c[0], next = _c[1];
        var _d = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_b, 2), adjust = _d[0], y = _d[1].offset.y;
        /* Look forward */
        while (next.length) {
            var _e = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(next[0], 2), offset = _e[1];
            if (offset - adjust < y) {
                prev = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(prev, [next.shift()]);
            }
            else {
                break;
            }
        }
        /* Look backward */
        while (prev.length) {
            var _f = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(prev[prev.length - 1], 2), offset = _f[1];
            if (offset - adjust >= y) {
                next = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])([prev.pop()], next);
            }
            else {
                break;
            }
        }
        /* Return partition */
        return [prev, next];
    }, [[], Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(index)]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])(function (a, b) {
        return a[0] === b[0]
            && a[1] === b[1];
    })); }));
    /* Compute and return anchor list migrations */
    return partition$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
        var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), prev = _b[0], next = _b[1];
        return ({
            prev: prev.map(function (_a) {
                var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 1), path = _b[0];
                return path;
            }),
            next: next.map(function (_a) {
                var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 1), path = _b[0];
                return path;
            })
        });
    }), 
    /* Extract anchor list migrations */
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["startWith"])({ prev: [], next: [] }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["bufferCount"])(2, 1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
        var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), a = _b[0], b = _b[1];
        /* Moving down */
        if (a.prev.length < b.prev.length) {
            return {
                prev: b.prev.slice(Math.max(0, a.prev.length - 1), b.prev.length),
                next: []
            };
            /* Moving up */
        }
        else {
            return {
                prev: b.prev.slice(-1),
                next: b.next.slice(0, b.next.length - a.next.length)
            };
        }
    }));
}
/* ------------------------------------------------------------------------- */
/**
 * Apply anchor list
 *
 * @param els - Anchor elements
 *
 * @return Operator function
 */
function applyAnchorList(els) {
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["pipe"])(
    /* Defer repaint to next animation frame */
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["observeOn"])(rxjs__WEBPACK_IMPORTED_MODULE_2__["animationFrameScheduler"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (_a) {
        var e_2, _b;
        var prev = _a.prev, next = _a.next;
        try {
            /* Look forward */
            for (var next_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(next), next_1_1 = next_1.next(); !next_1_1.done; next_1_1 = next_1.next()) {
                var _c = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(next_1_1.value, 1), el = _c[0];
                Object(_set__WEBPACK_IMPORTED_MODULE_5__["resetAnchorActive"])(el);
                Object(_set__WEBPACK_IMPORTED_MODULE_5__["resetAnchorBlur"])(el);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (next_1_1 && !next_1_1.done && (_b = next_1.return)) _b.call(next_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        /* Look backward */
        prev.forEach(function (_a, index) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 1), el = _b[0];
            Object(_set__WEBPACK_IMPORTED_MODULE_5__["setAnchorActive"])(el, index === prev.length - 1);
            Object(_set__WEBPACK_IMPORTED_MODULE_5__["setAnchorBlur"])(el, true);
        });
    }), 
    /* Reset on complete or error */
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["finalize"])(function () {
        var e_3, _a;
        try {
            for (var els_2 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(els), els_2_1 = els_2.next(); !els_2_1.done; els_2_1 = els_2.next()) {
                var el = els_2_1.value;
                Object(_set__WEBPACK_IMPORTED_MODULE_5__["resetAnchorActive"])(el);
                Object(_set__WEBPACK_IMPORTED_MODULE_5__["resetAnchorBlur"])(el);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (els_2_1 && !els_2_1.done && (_a = els_2.return)) _a.call(els_2);
            }
            finally { if (e_3) throw e_3.error; }
        }
    }));
}


/***/ }),

/***/ "./src/assets/javascripts/components/toc/anchor/set/index.ts":
/*!*******************************************************************!*\
  !*** ./src/assets/javascripts/components/toc/anchor/set/index.ts ***!
  \*******************************************************************/
/*! exports provided: setAnchorBlur, resetAnchorBlur, setAnchorActive, resetAnchorActive */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAnchorBlur", function() { return setAnchorBlur; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetAnchorBlur", function() { return resetAnchorBlur; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAnchorActive", function() { return setAnchorActive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetAnchorActive", function() { return resetAnchorActive; });
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Set anchor blur
 *
 * @param el - Anchor element
 * @param value - Whether the anchor is blurred
 */
function setAnchorBlur(el, value) {
    el.setAttribute("data-md-state", value ? "blur" : "");
}
/**
 * Reset anchor blur
 *
 * @param el - Anchor element
 */
function resetAnchorBlur(el) {
    el.removeAttribute("data-md-state");
}
/* ------------------------------------------------------------------------- */
/**
 * Set anchor active
 *
 * @param el - Anchor element
 * @param value - Whether the anchor is active
 */
function setAnchorActive(el, value) {
    el.classList.toggle("md-nav__link--active", value);
}
/**
 * Reset anchor active
 *
 * @param el - Anchor element
 */
function resetAnchorActive(el) {
    el.classList.remove("md-nav__link--active");
}


/***/ }),

/***/ "./src/assets/javascripts/components/toc/index.ts":
/*!********************************************************!*\
  !*** ./src/assets/javascripts/components/toc/index.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_ */ "./src/assets/javascripts/components/toc/_/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mountTableOfContents", function() { return ___WEBPACK_IMPORTED_MODULE_0__["mountTableOfContents"]; });

/* harmony import */ var _anchor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./anchor */ "./src/assets/javascripts/components/toc/anchor/index.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _anchor__WEBPACK_IMPORTED_MODULE_1__) if(["mountTableOfContents","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _anchor__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

/***/ "./src/assets/javascripts/index.ts":
/*!*****************************************!*\
  !*** ./src/assets/javascripts/index.ts ***!
  \*****************************************/
/*! exports provided: setScrollLock, resetScrollLock, initialize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setScrollLock", function() { return setScrollLock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetScrollLock", function() { return resetScrollLock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialize", function() { return initialize; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _stylesheets_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../stylesheets/main.scss */ "./src/assets/stylesheets/main.scss");
/* harmony import */ var _stylesheets_palette_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../stylesheets/palette.scss */ "./src/assets/stylesheets/palette.scss");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./browser */ "./src/assets/javascripts/browser/index.ts");
/* harmony import */ var _workers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./workers */ "./src/assets/javascripts/workers/index.ts");
/* harmony import */ var components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! components */ "./src/assets/javascripts/components/index.ts");
/* harmony import */ var _integrations_clipboard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./integrations/clipboard */ "./src/assets/javascripts/integrations/clipboard/index.ts");
/* harmony import */ var integrations_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! integrations/dialog */ "./src/assets/javascripts/integrations/dialog/index.ts");
/* harmony import */ var _integrations_keyboard__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./integrations/keyboard */ "./src/assets/javascripts/integrations/keyboard/index.ts");
/* harmony import */ var integrations_instant__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! integrations/instant */ "./src/assets/javascripts/integrations/instant/index.ts");
/* harmony import */ var patches__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! patches */ "./src/assets/javascripts/patches/index.ts");
/* harmony import */ var utilities__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! utilities */ "./src/assets/javascripts/utilities/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

// TODO: remove this after we finished refactoring
// tslint:disable














/* ------------------------------------------------------------------------- */
document.documentElement.classList.remove("no-js");
document.documentElement.classList.add("js");
/* Test for iOS */
if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g))
    document.documentElement.classList.add("ios");
/**
 * Set scroll lock
 *
 * @param el - Scrollable element
 * @param value - Vertical offset
 */
function setScrollLock(el, value) {
    el.setAttribute("data-md-state", "lock");
    el.style.top = "-" + value + "px";
}
/**
 * Reset scroll lock
 *
 * @param el - Scrollable element
 */
function resetScrollLock(el) {
    var value = -1 * parseInt(el.style.top, 10);
    el.removeAttribute("data-md-state");
    el.style.top = "";
    if (value)
        window.scrollTo(0, value);
}
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Initialize Material for MkDocs
 *
 * @param config - Configuration
 */
function initialize(config) {
    var e_1, _a, e_2, _b;
    if (!Object(utilities__WEBPACK_IMPORTED_MODULE_14__["isConfig"])(config))
        throw new SyntaxError("Invalid configuration: " + JSON.stringify(config));
    /* Setup user interface observables */
    var location$ = Object(_browser__WEBPACK_IMPORTED_MODULE_6__["watchLocation"])();
    var hash$ = Object(_browser__WEBPACK_IMPORTED_MODULE_6__["watchLocationHash"])();
    var viewport$ = Object(_browser__WEBPACK_IMPORTED_MODULE_6__["watchViewport"])();
    var tablet$ = Object(_browser__WEBPACK_IMPORTED_MODULE_6__["watchMedia"])("(min-width: 960px)");
    var screen$ = Object(_browser__WEBPACK_IMPORTED_MODULE_6__["watchMedia"])("(min-width: 1220px)");
    /* Setup document observable */
    var document$ = config.features.includes("instant")
        ? Object(_browser__WEBPACK_IMPORTED_MODULE_6__["watchDocument"])({ location$: location$ })
        : Object(_browser__WEBPACK_IMPORTED_MODULE_6__["watchDocument"])();
    /* Setup component bindings */
    Object(components__WEBPACK_IMPORTED_MODULE_8__["setupComponents"])([
        "container",
        "header",
        "header-title",
        "hero",
        "main",
        "navigation",
        "search",
        "search-query",
        "search-reset",
        "search-result",
        "skip",
        "tabs",
        "toc" /* Table of contents */
    ], { document$: document$ });
    /* ----------------------------------------------------------------------- */
    // External index
    var index = config.search && config.search.index
        ? config.search.index
        : undefined;
    // TODO: pass URL config as first parameter, options as second
    var worker = Object(_workers__WEBPACK_IMPORTED_MODULE_7__["setupSearchWorker"])(config.url.worker.search, {
        base: config.url.base, index: index, location$: location$
    });
    /* ----------------------------------------------------------------------- */
    /* Create header observable */
    var header$ = Object(components__WEBPACK_IMPORTED_MODULE_8__["useComponent"])("header")
        .pipe(Object(components__WEBPACK_IMPORTED_MODULE_8__["mountHeader"])({ viewport$: viewport$ }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["shareReplay"])(1));
    var main$ = Object(components__WEBPACK_IMPORTED_MODULE_8__["useComponent"])("main")
        .pipe(Object(components__WEBPACK_IMPORTED_MODULE_8__["mountMain"])({ header$: header$, viewport$: viewport$ }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["shareReplay"])(1));
    /* ----------------------------------------------------------------------- */
    /* Mount search query */
    var query$ = Object(components__WEBPACK_IMPORTED_MODULE_8__["useComponent"])("search-query")
        .pipe(Object(components__WEBPACK_IMPORTED_MODULE_8__["mountSearchQuery"])(worker), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["shareReplay"])(1));
    /* Mount search reset */
    var reset$ = Object(components__WEBPACK_IMPORTED_MODULE_8__["useComponent"])("search-reset")
        .pipe(Object(components__WEBPACK_IMPORTED_MODULE_8__["mountSearchReset"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["shareReplay"])(1));
    /* Mount search result */
    var result$ = Object(components__WEBPACK_IMPORTED_MODULE_8__["useComponent"])("search-result")
        .pipe(Object(components__WEBPACK_IMPORTED_MODULE_8__["mountSearchResult"])(worker, { query$: query$ }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["shareReplay"])(1));
    /* ----------------------------------------------------------------------- */
    var search$ = Object(components__WEBPACK_IMPORTED_MODULE_8__["useComponent"])("search")
        .pipe(Object(components__WEBPACK_IMPORTED_MODULE_8__["mountSearch"])({ query$: query$, reset$: reset$, result$: result$ }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["shareReplay"])(1));
    /* ----------------------------------------------------------------------- */
    var navigation$ = Object(components__WEBPACK_IMPORTED_MODULE_8__["useComponent"])("navigation")
        .pipe(Object(components__WEBPACK_IMPORTED_MODULE_8__["mountNavigation"])({ header$: header$, main$: main$, viewport$: viewport$, screen$: screen$ }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["shareReplay"])(1) // shareReplay because there might be late subscribers
    );
    var toc$ = Object(components__WEBPACK_IMPORTED_MODULE_8__["useComponent"])("toc")
        .pipe(Object(components__WEBPACK_IMPORTED_MODULE_8__["mountTableOfContents"])({ header$: header$, main$: main$, viewport$: viewport$, tablet$: tablet$ }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["shareReplay"])(1));
    var tabs$ = Object(components__WEBPACK_IMPORTED_MODULE_8__["useComponent"])("tabs")
        .pipe(Object(components__WEBPACK_IMPORTED_MODULE_8__["mountTabs"])({ header$: header$, viewport$: viewport$, screen$: screen$ }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["shareReplay"])(1));
    var hero$ = Object(components__WEBPACK_IMPORTED_MODULE_8__["useComponent"])("hero")
        .pipe(Object(components__WEBPACK_IMPORTED_MODULE_8__["mountHero"])({ header$: header$, viewport$: viewport$ }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["shareReplay"])(1));
    /* ----------------------------------------------------------------------- */
    var keyboard$ = Object(_integrations_keyboard__WEBPACK_IMPORTED_MODULE_11__["setupKeyboard"])();
    Object(patches__WEBPACK_IMPORTED_MODULE_13__["patchDetails"])({ document$: document$, hash$: hash$ });
    Object(patches__WEBPACK_IMPORTED_MODULE_13__["patchScripts"])({ document$: document$ });
    Object(patches__WEBPACK_IMPORTED_MODULE_13__["patchSource"])({ document$: document$ });
    Object(patches__WEBPACK_IMPORTED_MODULE_13__["patchTables"])({ document$: document$ });
    /* Force 1px scroll offset to trigger overflow scrolling */
    Object(patches__WEBPACK_IMPORTED_MODULE_13__["patchScrollfix"])({ document$: document$ });
    /* Setup clipboard and dialog */
    var dialog$ = Object(integrations_dialog__WEBPACK_IMPORTED_MODULE_10__["setupDialog"])();
    var clipboard$ = Object(_integrations_clipboard__WEBPACK_IMPORTED_MODULE_9__["setupClipboard"])({ document$: document$, dialog$: dialog$ });
    /* ----------------------------------------------------------------------- */
    // // put into search...
    // hash$
    //   .pipe(
    //     switchMap(hash => useToggle("search")
    //       .pipe(
    //         filter(x => x.checked), // only active
    //         tap(toggle => setToggle(toggle, false)),
    //         delay(125), // ensure that it runs after the body scroll reset...
    //         mapTo(hash)
    //       )
    //     )
    //   )
    //     .subscribe(hash => {
    //       getElement(`[id="${hash}"]`)!.scrollIntoView()
    //     })
    // Scroll lock // document -> document$ => { body } !?
    // put into search...
    Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["combineLatest"])([
        Object(_browser__WEBPACK_IMPORTED_MODULE_6__["watchToggle"])("search"),
        tablet$,
    ])
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["withLatestFrom"])(viewport$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function (_a) {
        var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), _c = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_b[0], 2), toggle = _c[0], tablet = _c[1], y = _b[1].offset.y;
        var active = toggle && !tablet;
        return document$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["delay"])(active ? 400 : 100), // TOOD: directly combine this with the hash!
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["observeOn"])(rxjs__WEBPACK_IMPORTED_MODULE_4__["animationFrameScheduler"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["tap"])(function (_a) {
            var body = _a.body;
            return active
                ? setScrollLock(body, y)
                : resetScrollLock(body);
        }));
    }))
        .subscribe();
    /* ----------------------------------------------------------------------- */
    /* Intercept internal link clicks */
    var link$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["fromEvent"])(document.body, "click")
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["filter"])(function (ev) { return !(ev.metaKey || ev.ctrlKey); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function (ev) {
        if (ev.target instanceof HTMLElement) {
            var el = ev.target.closest("a"); // TODO: abstract as link click?
            if (el && Object(_browser__WEBPACK_IMPORTED_MODULE_6__["isLocationInternal"])(el)) {
                if (!Object(_browser__WEBPACK_IMPORTED_MODULE_6__["isLocationAnchor"])(el))
                    ev.preventDefault();
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(el);
            }
        }
        return rxjs__WEBPACK_IMPORTED_MODULE_4__["NEVER"];
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["share"])());
    /* Always close drawer on click */
    link$.subscribe(function () {
        Object(_browser__WEBPACK_IMPORTED_MODULE_6__["setToggle"])("drawer", false);
    });
    // somehow call this setupNavigation ?
    // instant loading
    if (config.features.includes("instant")) {
        /* Disable automatic scroll restoration, as it doesn't work nicely */
        if ("scrollRestoration" in history)
            history.scrollRestoration = "manual";
        try {
            /* Resolve relative links for stability */
            for (var _c = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])([
                "link[rel=\"shortcut icon\"]",
                "link[rel=\"stylesheet\"]"
            ]), _d = _c.next(); !_d.done; _d = _c.next()) {
                var selector = _d.value;
                try {
                    for (var _e = (e_2 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(Object(_browser__WEBPACK_IMPORTED_MODULE_6__["getElements"])(selector))), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var el = _f.value;
                        el.href = el.href;
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        Object(integrations_instant__WEBPACK_IMPORTED_MODULE_12__["setupInstantLoading"])({
            document$: document$, link$: link$, location$: location$, viewport$: viewport$
        });
    }
    /* ----------------------------------------------------------------------- */
    // if we use a single tab outside of search, unhide all permalinks.
    // TODO: experimental. necessary!?
    keyboard$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["filter"])(function (key) { return key.mode === "global" && ["Tab"].includes(key.type); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1))
        .subscribe(function () {
        var e_3, _a;
        try {
            for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(Object(_browser__WEBPACK_IMPORTED_MODULE_6__["getElements"])(".headerlink")), _c = _b.next(); !_c.done; _c = _b.next()) {
                var link = _c.value;
                link.style.visibility = "visible";
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
    });
    /* ----------------------------------------------------------------------- */
    var state = {
        /* Browser observables */
        document$: document$,
        viewport$: viewport$,
        /* Component observables */
        header$: header$,
        hero$: hero$,
        main$: main$,
        navigation$: navigation$,
        search$: search$,
        tabs$: tabs$,
        toc$: toc$,
        /* Integation observables */
        clipboard$: clipboard$,
        keyboard$: keyboard$,
        dialog$: dialog$
    };
    /* Subscribe to all observables */
    rxjs__WEBPACK_IMPORTED_MODULE_4__["merge"].apply(void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(Object(ramda__WEBPACK_IMPORTED_MODULE_3__["values"])(state))).subscribe();
    return state;
}


/***/ }),

/***/ "./src/assets/javascripts/integrations/clipboard/index.ts":
/*!****************************************************************!*\
  !*** ./src/assets/javascripts/integrations/clipboard/index.ts ***!
  \****************************************************************/
/*! exports provided: setupClipboard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setupClipboard", function() { return setupClipboard; });
/* harmony import */ var clipboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! clipboard */ "./node_modules/clipboard/dist/clipboard.js");
/* harmony import */ var clipboard__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clipboard__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! browser */ "./src/assets/javascripts/browser/index.ts");
/* harmony import */ var templates__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! templates */ "./src/assets/javascripts/templates/index.ts");
/* harmony import */ var utilities__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! utilities */ "./src/assets/javascripts/utilities/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Setup clipboard
 *
 * This function implements the Clipboard.js integration and injects a button
 * into all code blocks when the document changes.
 *
 * @param options - Options
 *
 * @return Clipboard observable
 */
function setupClipboard(_a) {
    var document$ = _a.document$, dialog$ = _a.dialog$;
    if (!clipboard__WEBPACK_IMPORTED_MODULE_0__["isSupported"]())
        return rxjs__WEBPACK_IMPORTED_MODULE_1__["NEVER"];
    /* Inject 'copy-to-clipboard' buttons */
    document$.subscribe(function () {
        var blocks = Object(browser__WEBPACK_IMPORTED_MODULE_3__["getElements"])("pre > code");
        blocks.forEach(function (block, index) {
            var parent = block.parentElement;
            parent.id = "__code_" + index;
            parent.insertBefore(Object(templates__WEBPACK_IMPORTED_MODULE_4__["renderClipboard"])(parent.id), block);
        });
    });
    /* Initialize and setup clipboard */
    var clipboard$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEventPattern"])(function (next) {
        new clipboard__WEBPACK_IMPORTED_MODULE_0__(".md-clipboard").on("success", next);
    })
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["share"])());
    /* Display notification for clipboard event */
    clipboard$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function (ev) { return ev.clearSelection(); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["mapTo"])(Object(utilities__WEBPACK_IMPORTED_MODULE_5__["translate"])("clipboard.copied")))
        .subscribe(dialog$);
    /* Return clipboard */
    return clipboard$;
}


/***/ }),

/***/ "./src/assets/javascripts/integrations/dialog/index.ts":
/*!*************************************************************!*\
  !*** ./src/assets/javascripts/integrations/dialog/index.ts ***!
  \*************************************************************/
/*! exports provided: setupDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setupDialog", function() { return setupDialog; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Setup dialog
 *
 * @param options - Options
 *
 * @return Dialog observable
 */
function setupDialog(_a) {
    var duration = (_a === void 0 ? {} : _a).duration;
    var dialog$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
    /* Create dialog */
    var dialog = document.createElement("div"); // TODO: improve scoping
    dialog.classList.add("md-dialog", "md-typeset");
    /* Display dialog */
    dialog$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function (text) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(document.body) // useComponent("container")
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (container) { return container.appendChild(dialog); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["observeOn"])(rxjs__WEBPACK_IMPORTED_MODULE_0__["animationFrameScheduler"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["delay"])(1), // Strangley it doesnt work when we push things to the new animation frame...
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (el) {
        el.innerHTML = text;
        el.setAttribute("data-md-state", "open");
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["delay"])(duration || 2000), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (el) { return el.removeAttribute("data-md-state"); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["delay"])(400), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (el) {
        el.innerHTML = "";
        el.remove();
    })); }))
        .subscribe();
    /* Return dialog subject */
    return dialog$;
}


/***/ }),

/***/ "./src/assets/javascripts/integrations/instant/index.ts":
/*!**************************************************************!*\
  !*** ./src/assets/javascripts/integrations/instant/index.ts ***!
  \**************************************************************/
/*! exports provided: setupInstantLoading */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setupInstantLoading", function() { return setupInstantLoading; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! browser */ "./src/assets/javascripts/browser/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Setup instant loading
 *
 * @param options - Options
 *
 * @return TODO ?
 */
function setupInstantLoading(_a) {
    var document$ = _a.document$, viewport$ = _a.viewport$, link$ = _a.link$, location$ = _a.location$;
    var state$ = link$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (el) { return ({ url: new URL(el.href) }); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["share"])());
    /* Intercept internal links to dispatch */
    var push$ = state$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])(function (prev, next) { return prev.url.href === next.url.href; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function (_a) {
        var url = _a.url;
        return !Object(browser__WEBPACK_IMPORTED_MODULE_3__["isLocationAnchor"])(url);
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["share"])());
    /* Intercept popstate events (history back and forward) */
    var pop$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(window, "popstate")
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function (ev) { return ev.state !== null; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (ev) { return ({
        url: new URL(location.href),
        offset: ev.state
    }); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["share"])());
    /* Emit location change */
    Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["merge"])(push$, pop$)
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["pluck"])("url"))
        .subscribe(location$);
    /* History: dispatch internal link */
    push$.subscribe(function (_a) {
        var url = _a.url;
        history.pushState({}, "", url.toString());
    });
    /* History: debounce update of viewport offset */
    viewport$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["debounceTime"])(250), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilKeyChanged"])("offset"))
        .subscribe(function (_a) {
        var offset = _a.offset;
        history.replaceState(offset, "");
    });
    /* Apply viewport offset from history */
    Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["merge"])(state$, pop$)
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["bufferCount"])(2, 1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function (_a) {
        var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), prev = _b[0], next = _b[1];
        return prev.url.pathname === next.url.pathname
            && !Object(browser__WEBPACK_IMPORTED_MODULE_3__["isLocationAnchor"])(next.url);
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
        var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), state = _b[1];
        return state;
    }))
        .subscribe(function (_a) {
        var offset = _a.offset;
        Object(browser__WEBPACK_IMPORTED_MODULE_3__["setViewportOffset"])(offset || { y: 0 });
    });
    /* Intercept actual instant loading */
    var instant$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["merge"])(push$, pop$)
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["sample"])(document$));
    // TODO: from here on, everything is beta.... ###############################
    instant$.subscribe(function (_a) {
        var url = _a.url, offset = _a.offset;
        if (url.hash && !offset) {
            console.log("set hash!");
            Object(browser__WEBPACK_IMPORTED_MODULE_3__["setLocationHash"])(url.hash); // must delay, if search is open!
        }
        else {
            Object(browser__WEBPACK_IMPORTED_MODULE_3__["setViewportOffset"])(offset || { y: 0 });
        }
    });
    instant$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["withLatestFrom"])(document$))
        .subscribe(function (_a) {
        var e_1, _b;
        var _c = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), _d = _c[1], title = _d.title, head = _d.head;
        document.dispatchEvent(new CustomEvent("DOMContentSwitch"));
        document.title = title;
        try {
            /* Replace meta tags */
            for (var _e = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])([
                "link[rel=\"canonical\"]",
                "meta[name=\"author\"]",
                "meta[name=\"description\"]"
            ]), _f = _e.next(); !_f.done; _f = _e.next()) {
                var selector = _f.value;
                var next = Object(browser__WEBPACK_IMPORTED_MODULE_3__["getElement"])(selector, head);
                var prev = Object(browser__WEBPACK_IMPORTED_MODULE_3__["getElement"])(selector, document.head);
                if (typeof next !== "undefined" &&
                    typeof prev !== "undefined") {
                    prev.replaceWith(next);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}


/***/ }),

/***/ "./src/assets/javascripts/integrations/keyboard/index.ts":
/*!***************************************************************!*\
  !*** ./src/assets/javascripts/integrations/keyboard/index.ts ***!
  \***************************************************************/
/*! exports provided: setupKeyboard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setupKeyboard", function() { return setupKeyboard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! browser */ "./src/assets/javascripts/browser/index.ts");
/* harmony import */ var components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! components */ "./src/assets/javascripts/components/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Setup keyboard
 *
 * This function will setup the keyboard handlers and ensure that keys are
 * correctly propagated. Currently there are two modes:
 *
 * - `global`: This mode is active when the search is closed. It is intended
 *   to assign hotkeys to specific functions of the site. Currently the search,
 *   previous and next page can be triggered.
 *
 * - `search`: This mode is active when the search is open. It maps certain
 *   navigational keys to offer search results that can be entirely navigated
 *   through keyboard input.
 *
 * The keyboard observable is returned and can be used to monitor the keyboard
 * in order toassign further hotkeys to custom functions.
 *
 * @return Keyboard observable
 */
function setupKeyboard() {
    var keyboard$ = Object(browser__WEBPACK_IMPORTED_MODULE_2__["watchKeyboard"])()
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (key) { return (Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ mode: Object(browser__WEBPACK_IMPORTED_MODULE_2__["getToggle"])("search") ? "search" : "global" }, key)); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["share"])());
    /* Setup search keyboard handlers */
    keyboard$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(function (_a) {
        var mode = _a.mode;
        return mode === "search";
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["withLatestFrom"])(Object(components__WEBPACK_IMPORTED_MODULE_3__["useComponent"])("search-query"), Object(components__WEBPACK_IMPORTED_MODULE_3__["useComponent"])("search-result")))
        .subscribe(function (_a) {
        var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 3), key = _b[0], query = _b[1], result = _b[2];
        var active = Object(browser__WEBPACK_IMPORTED_MODULE_2__["getActiveElement"])();
        switch (key.type) {
            /* Enter: prevent form submission */
            case "Enter":
                if (active === query)
                    key.claim();
                break;
            /* Escape or Tab: close search */
            case "Escape":
            case "Tab":
                Object(browser__WEBPACK_IMPORTED_MODULE_2__["setToggle"])("search", false);
                Object(browser__WEBPACK_IMPORTED_MODULE_2__["setElementFocus"])(query, false);
                break;
            /* Vertical arrows: select previous or next search result */
            case "ArrowUp":
            case "ArrowDown":
                if (typeof active === "undefined") {
                    Object(browser__WEBPACK_IMPORTED_MODULE_2__["setElementFocus"])(query);
                }
                else {
                    var els = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])([query], Object(browser__WEBPACK_IMPORTED_MODULE_2__["getElements"])("[href]", result));
                    var i = Math.max(0, (Math.max(0, els.indexOf(active)) + els.length + (key.type === "ArrowUp" ? -1 : +1)) % els.length);
                    Object(browser__WEBPACK_IMPORTED_MODULE_2__["setElementFocus"])(els[i]);
                }
                /* Prevent scrolling of page */
                key.claim();
                break;
            /* All other keys: hand to search query */
            default:
                if (query !== Object(browser__WEBPACK_IMPORTED_MODULE_2__["getActiveElement"])())
                    Object(browser__WEBPACK_IMPORTED_MODULE_2__["setElementFocus"])(query);
        }
    });
    /* Setup global keyboard handlers */
    keyboard$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(function (_a) {
        var mode = _a.mode;
        if (mode === "global") {
            var active = Object(browser__WEBPACK_IMPORTED_MODULE_2__["getActiveElement"])();
            if (typeof active !== "undefined")
                return !Object(browser__WEBPACK_IMPORTED_MODULE_2__["isSusceptibleToKeyboard"])(active);
        }
        return false;
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["withLatestFrom"])(Object(components__WEBPACK_IMPORTED_MODULE_3__["useComponent"])("search-query")))
        .subscribe(function (_a) {
        var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), key = _b[0], query = _b[1];
        switch (key.type) {
            /* Open search and select query */
            case "f":
            case "s":
                Object(browser__WEBPACK_IMPORTED_MODULE_2__["setElementFocus"])(query);
                Object(browser__WEBPACK_IMPORTED_MODULE_2__["setElementSelection"])(query);
                key.claim();
                break;
            /* Go to previous page */
            case "p":
            case ",":
                var prev = Object(browser__WEBPACK_IMPORTED_MODULE_2__["getElement"])("[href][rel=prev]");
                if (typeof prev !== "undefined")
                    prev.click();
                break;
            /* Go to next page */
            case "n":
            case ".":
                var next = Object(browser__WEBPACK_IMPORTED_MODULE_2__["getElement"])("[href][rel=next]");
                if (typeof next !== "undefined")
                    next.click();
                break;
        }
    });
    /* Return keyboard */
    return keyboard$;
}


/***/ }),

/***/ "./src/assets/javascripts/patches/details/index.ts":
/*!*********************************************************!*\
  !*** ./src/assets/javascripts/patches/details/index.ts ***!
  \*********************************************************/
/*! exports provided: patchDetails */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "patchDetails", function() { return patchDetails; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! browser */ "./src/assets/javascripts/browser/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Patch all `details` elements
 *
 * This function will ensure that all `details` tags are opened prior to
 * printing, so the whole content of the page is included, and on anchor jumps.
 *
 * @param options - Options
 */
function patchDetails(_a) {
    var document$ = _a.document$, hash$ = _a.hash$;
    var els$ = document$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function () { return Object(browser__WEBPACK_IMPORTED_MODULE_4__["getElements"])("details"); }));
    /* Open all details before printing */
    Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["merge"])(Object(browser__WEBPACK_IMPORTED_MODULE_4__["watchMedia"])("print").pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(ramda__WEBPACK_IMPORTED_MODULE_1__["identity"])), /* Webkit */ Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["fromEvent"])(window, "beforeprint") /* IE, FF */)
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMapTo"])(els$))
        .subscribe(function (els) {
        var e_1, _a;
        try {
            for (var els_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(els), els_1_1 = els_1.next(); !els_1_1.done; els_1_1 = els_1.next()) {
                var el = els_1_1.value;
                el.setAttribute("open", "");
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (els_1_1 && !els_1_1.done && (_a = els_1.return)) _a.call(els_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
    /* Open parent details and fix anchor jump */
    hash$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (id) { return Object(browser__WEBPACK_IMPORTED_MODULE_4__["getElement"])("[id=\"" + id + "\"]"); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(function (el) { return typeof el !== "undefined"; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (el) {
        var details = el.closest("details");
        if (details && !details.open)
            details.setAttribute("open", "");
    }))
        .subscribe(function (el) { return el.scrollIntoView(); });
}


/***/ }),

/***/ "./src/assets/javascripts/patches/index.ts":
/*!*************************************************!*\
  !*** ./src/assets/javascripts/patches/index.ts ***!
  \*************************************************/
/*! exports provided: patchDetails, patchScripts, patchScrollfix, patchSource, patchTables */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _details__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./details */ "./src/assets/javascripts/patches/details/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "patchDetails", function() { return _details__WEBPACK_IMPORTED_MODULE_0__["patchDetails"]; });

/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./script */ "./src/assets/javascripts/patches/script/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "patchScripts", function() { return _script__WEBPACK_IMPORTED_MODULE_1__["patchScripts"]; });

/* harmony import */ var _scrollfix__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scrollfix */ "./src/assets/javascripts/patches/scrollfix/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "patchScrollfix", function() { return _scrollfix__WEBPACK_IMPORTED_MODULE_2__["patchScrollfix"]; });

/* harmony import */ var _source__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./source */ "./src/assets/javascripts/patches/source/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "patchSource", function() { return _source__WEBPACK_IMPORTED_MODULE_3__["patchSource"]; });

/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./table */ "./src/assets/javascripts/patches/table/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "patchTables", function() { return _table__WEBPACK_IMPORTED_MODULE_4__["patchTables"]; });

/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

/***/ "./src/assets/javascripts/patches/script/index.ts":
/*!********************************************************!*\
  !*** ./src/assets/javascripts/patches/script/index.ts ***!
  \********************************************************/
/*! exports provided: patchScripts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "patchScripts", function() { return patchScripts; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! browser */ "./src/assets/javascripts/browser/index.ts");
/* harmony import */ var components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! components */ "./src/assets/javascripts/components/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Patch all `script` elements
 *
 * This function must be run after a document switch, which means the first
 * emission must be ignored.
 *
 * @param options - Options
 */
function patchScripts(_a) {
    var document$ = _a.document$;
    var els$ = document$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["skip"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["withLatestFrom"])(Object(components__WEBPACK_IMPORTED_MODULE_3__["useComponent"])("container")), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (_a) {
        var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), el = _b[1];
        return Object(browser__WEBPACK_IMPORTED_MODULE_2__["getElements"])("script", el);
    }));
    /* Evaluate all scripts via replacement */
    els$.subscribe(function (els) {
        var e_1, _a;
        try {
            for (var els_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(els), els_1_1 = els_1.next(); !els_1_1.done; els_1_1 = els_1.next()) {
                var el = els_1_1.value;
                if (el.src || /(^|\/javascript)$/i.test(el.type)) {
                    var script = document.createElement("script");
                    var key = el.src ? "src" : "innerText";
                    script[key] = el[key];
                    el.replaceWith(script);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (els_1_1 && !els_1_1.done && (_a = els_1.return)) _a.call(els_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}


/***/ }),

/***/ "./src/assets/javascripts/patches/scrollfix/index.ts":
/*!***********************************************************!*\
  !*** ./src/assets/javascripts/patches/scrollfix/index.ts ***!
  \***********************************************************/
/*! exports provided: patchScrollfix */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "patchScrollfix", function() { return patchScrollfix; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! browser */ "./src/assets/javascripts/browser/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Helper functions
 * ------------------------------------------------------------------------- */
/**
 * Check whether the given device is an Apple device
 *
 * @return Test result
 */
function isAppleDevice() {
    return /(iPad|iPhone|iPod)/.test(navigator.userAgent);
}
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Patch all elements with `data-md-scrollfix` attributes
 *
 * This is a year-old patch which ensures that overflow scrolling works at the
 * top and bottom of containers on iOS by ensuring a `1px` scroll offset upon
 * the start of a touch event.
 *
 * @see https://bit.ly/2SCtAOO - Original source
 *
 * @param options - Options
 */
function patchScrollfix(_a) {
    var document$ = _a.document$;
    var els$ = document$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function () { return Object(browser__WEBPACK_IMPORTED_MODULE_3__["getElements"])("[data-md-scrollfix]"); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["shareReplay"])(1));
    /* Remove marker attribute, so we'll only add the fix once */
    els$.subscribe(function (els) {
        var e_1, _a;
        try {
            for (var els_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(els), els_1_1 = els_1.next(); !els_1_1.done; els_1_1 = els_1.next()) {
                var el = els_1_1.value;
                el.removeAttribute("data-md-scrollfix");
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (els_1_1 && !els_1_1.done && (_a = els_1.return)) _a.call(els_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
    /* Patch overflow scrolling on touch start */
    Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["iif"])(isAppleDevice, els$, rxjs__WEBPACK_IMPORTED_MODULE_1__["NEVER"])
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function (els) { return rxjs__WEBPACK_IMPORTED_MODULE_1__["merge"].apply(void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(els.map(function (el) { return (Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(el, "touchstart")
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["mapTo"])(el))); }))); }))
        .subscribe(function (el) {
        var top = el.scrollTop;
        /* We're at the top of the container */
        if (top === 0) {
            el.scrollTop = 1;
            /* We're at the bottom of the container */
        }
        else if (top + el.offsetHeight === el.scrollHeight) {
            el.scrollTop = top - 1;
        }
    });
}


/***/ }),

/***/ "./src/assets/javascripts/patches/source/github/index.ts":
/*!***************************************************************!*\
  !*** ./src/assets/javascripts/patches/source/github/index.ts ***!
  \***************************************************************/
/*! exports provided: fetchSourceFactsFromGitHub */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchSourceFactsFromGitHub", function() { return fetchSourceFactsFromGitHub; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_ajax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/ajax */ "./node_modules/rxjs/_esm5/ajax/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! utilities */ "./src/assets/javascripts/utilities/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Fetch GitHub source facts
 *
 * @param user - GitHub user
 * @param repo - GitHub repository
 *
 * @return Source facts observable
 */
function fetchSourceFactsFromGitHub(user, repo) {
    return Object(rxjs_ajax__WEBPACK_IMPORTED_MODULE_1__["ajax"])({
        url: typeof repo !== "undefined"
            ? "https://api.github.com/repos/" + user + "/" + repo
            : "https://api.github.com/users/" + user,
        responseType: "json"
    })
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function (_a) {
        var status = _a.status;
        return status === 200;
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["pluck"])("response"), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function (data) {
        /* GitHub repository */
        if (typeof repo !== "undefined") {
            var stargazers_count = data.stargazers_count, forks_count = data.forks_count;
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])([
                Object(utilities__WEBPACK_IMPORTED_MODULE_3__["round"])(stargazers_count || 0) + " Stars",
                Object(utilities__WEBPACK_IMPORTED_MODULE_3__["round"])(forks_count || 0) + " Forks"
            ]);
            /* GitHub user/organization */
        }
        else {
            var public_repos = data.public_repos;
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])([
                Object(utilities__WEBPACK_IMPORTED_MODULE_3__["round"])(public_repos || 0) + " Repositories"
            ]);
        }
    }));
}


/***/ }),

/***/ "./src/assets/javascripts/patches/source/gitlab/index.ts":
/*!***************************************************************!*\
  !*** ./src/assets/javascripts/patches/source/gitlab/index.ts ***!
  \***************************************************************/
/*! exports provided: fetchSourceFactsFromGitLab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchSourceFactsFromGitLab", function() { return fetchSourceFactsFromGitLab; });
/* harmony import */ var rxjs_ajax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/ajax */ "./node_modules/rxjs/_esm5/ajax/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! utilities */ "./src/assets/javascripts/utilities/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Fetch GitLab source facts
 *
 * @param base - GitLab base
 * @param project - GitLab project
 *
 * @return Source facts observable
 */
function fetchSourceFactsFromGitLab(base, project) {
    return Object(rxjs_ajax__WEBPACK_IMPORTED_MODULE_0__["ajax"])({
        url: "https://" + base + "/api/v4/projects/" + encodeURIComponent(project),
        responseType: "json"
    })
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(function (_a) {
        var status = _a.status;
        return status === 200;
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["pluck"])("response"), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (_a) {
        var star_count = _a.star_count, forks_count = _a.forks_count;
        return ([
            Object(utilities__WEBPACK_IMPORTED_MODULE_2__["round"])(star_count) + " Stars",
            Object(utilities__WEBPACK_IMPORTED_MODULE_2__["round"])(forks_count) + " Forks"
        ]);
    }));
}


/***/ }),

/***/ "./src/assets/javascripts/patches/source/index.ts":
/*!********************************************************!*\
  !*** ./src/assets/javascripts/patches/source/index.ts ***!
  \********************************************************/
/*! exports provided: patchSource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "patchSource", function() { return patchSource; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! browser */ "./src/assets/javascripts/browser/index.ts");
/* harmony import */ var templates__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! templates */ "./src/assets/javascripts/templates/index.ts");
/* harmony import */ var utilities__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! utilities */ "./src/assets/javascripts/utilities/index.ts");
/* harmony import */ var _github__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./github */ "./src/assets/javascripts/patches/source/github/index.ts");
/* harmony import */ var _gitlab__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./gitlab */ "./src/assets/javascripts/patches/source/gitlab/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Helper functions
 * ------------------------------------------------------------------------- */
/**
 * Fetch source facts
 *
 * @param url - Source repository URL
 *
 * @return Source facts observable
 */
function fetchSourceFacts(url) {
    var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(url.match(/(git(?:hub|lab))/i) || [], 1), type = _a[0];
    switch (type.toLowerCase()) {
        /* GitHub repository */
        case "github":
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(url.match(/^.+github\.com\/([^\/]+)\/?([^\/]+)/i), 3), user = _b[1], repo = _b[2];
            return Object(_github__WEBPACK_IMPORTED_MODULE_6__["fetchSourceFactsFromGitHub"])(user, repo);
        /* GitLab repository */
        case "gitlab":
            var _c = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(url.match(/^.+?([^\/]*gitlab[^\/]+)\/(.+)/i), 3), base = _c[1], project = _c[2];
            return Object(_gitlab__WEBPACK_IMPORTED_MODULE_7__["fetchSourceFactsFromGitLab"])(base, project);
        /* Everything else */
        default:
            return rxjs__WEBPACK_IMPORTED_MODULE_1__["NEVER"];
    }
}
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Patch elements containing repository information
 *
 * This function will retrieve the URL from the repository link and try to
 * query data from integrated source code platforms like GitHub or GitLab.
 *
 * @param options - Options
 */
function patchSource(_a) {
    var document$ = _a.document$;
    document$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function () { return Object(browser__WEBPACK_IMPORTED_MODULE_3__["getElementOrThrow"])(".md-source[href]"); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function (_a) {
        var href = _a.href;
        return (Object(utilities__WEBPACK_IMPORTED_MODULE_5__["cache"])("" + Object(utilities__WEBPACK_IMPORTED_MODULE_5__["hash"])(href), function () { return fetchSourceFacts(href); }));
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(function () { return rxjs__WEBPACK_IMPORTED_MODULE_1__["NEVER"]; }))
        .subscribe(function (facts) {
        var e_1, _a;
        try {
            for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(Object(browser__WEBPACK_IMPORTED_MODULE_3__["getElements"])(".md-source__repository")), _c = _b.next(); !_c.done; _c = _b.next()) {
                var el = _c.value;
                if (!el.hasAttribute("data-md-state")) {
                    el.setAttribute("data-md-state", "done");
                    el.appendChild(Object(templates__WEBPACK_IMPORTED_MODULE_4__["renderSource"])(facts));
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}


/***/ }),

/***/ "./src/assets/javascripts/patches/table/index.ts":
/*!*******************************************************!*\
  !*** ./src/assets/javascripts/patches/table/index.ts ***!
  \*******************************************************/
/*! exports provided: patchTables */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "patchTables", function() { return patchTables; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! browser */ "./src/assets/javascripts/browser/index.ts");
/* harmony import */ var templates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! templates */ "./src/assets/javascripts/templates/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Patch all `table` elements
 *
 * This function will re-render all tables by wrapping them to improve overflow
 * scrolling on smaller screen sizes.
 *
 * @param options - Options
 */
function patchTables(_a) {
    var document$ = _a.document$;
    var sentinel = document.createElement("table");
    document$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function () { return Object(browser__WEBPACK_IMPORTED_MODULE_2__["getElements"])("table:not([class])"); }))
        .subscribe(function (els) {
        var e_1, _a;
        try {
            for (var els_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(els), els_1_1 = els_1.next(); !els_1_1.done; els_1_1 = els_1.next()) {
                var el = els_1_1.value;
                el.replaceWith(sentinel);
                sentinel.replaceWith(Object(templates__WEBPACK_IMPORTED_MODULE_3__["renderTable"])(el));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (els_1_1 && !els_1_1.done && (_a = els_1.return)) _a.call(els_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}


/***/ }),

/***/ "./src/assets/javascripts/templates/clipboard/index.tsx":
/*!**************************************************************!*\
  !*** ./src/assets/javascripts/templates/clipboard/index.tsx ***!
  \**************************************************************/
/*! exports provided: renderClipboard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderClipboard", function() { return renderClipboard; });
/* harmony import */ var utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utilities */ "./src/assets/javascripts/utilities/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Data
 * ------------------------------------------------------------------------- */
/**
 * CSS classes
 */
var css = {
    container: "md-clipboard md-icon"
};
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Render a 'copy-to-clipboard' button
 *
 * @param id - Unique identifier
 *
 * @return Element
 */
function renderClipboard(id) {
    var path = __webpack_require__(/*! material-design-icons-svg/paths/content-copy.json */ "./node_modules/material-design-icons-svg/paths/content-copy.json");
    return (Object(utilities__WEBPACK_IMPORTED_MODULE_0__["h"])("button", { class: css.container, title: Object(utilities__WEBPACK_IMPORTED_MODULE_0__["translate"])("clipboard.copy"), "data-clipboard-target": "#" + id + " code" },
        Object(utilities__WEBPACK_IMPORTED_MODULE_0__["h"])("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
            Object(utilities__WEBPACK_IMPORTED_MODULE_0__["h"])("path", { d: path }))));
}


/***/ }),

/***/ "./src/assets/javascripts/templates/index.ts":
/*!***************************************************!*\
  !*** ./src/assets/javascripts/templates/index.ts ***!
  \***************************************************/
/*! exports provided: renderClipboard, renderSearchResult, renderSource, renderTable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _clipboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clipboard */ "./src/assets/javascripts/templates/clipboard/index.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "renderClipboard", function() { return _clipboard__WEBPACK_IMPORTED_MODULE_0__["renderClipboard"]; });

/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search */ "./src/assets/javascripts/templates/search/index.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "renderSearchResult", function() { return _search__WEBPACK_IMPORTED_MODULE_1__["renderSearchResult"]; });

/* harmony import */ var _source__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./source */ "./src/assets/javascripts/templates/source/index.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "renderSource", function() { return _source__WEBPACK_IMPORTED_MODULE_2__["renderSource"]; });

/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./table */ "./src/assets/javascripts/templates/table/index.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "renderTable", function() { return _table__WEBPACK_IMPORTED_MODULE_3__["renderTable"]; });

/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

/***/ "./src/assets/javascripts/templates/search/index.tsx":
/*!***********************************************************!*\
  !*** ./src/assets/javascripts/templates/search/index.tsx ***!
  \***********************************************************/
/*! exports provided: renderSearchResult */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderSearchResult", function() { return renderSearchResult; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utilities */ "./src/assets/javascripts/utilities/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Data
 * ------------------------------------------------------------------------- */
/**
 * CSS classes
 */
var css = {
    item: "md-search-result__item",
    link: "md-search-result__link",
    article: "md-search-result__article md-search-result__article--document",
    section: "md-search-result__article",
    title: "md-search-result__title",
    teaser: "md-search-result__teaser"
};
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Render a search result
 *
 * @param result - Search result
 *
 * @return Element
 */
function renderSearchResult(_a) {
    var article = _a.article, sections = _a.sections;
    // create page with icon
    var path = __webpack_require__(/*! material-design-icons-svg/paths/file-search-outline.json */ "./node_modules/material-design-icons-svg/paths/file-search-outline.json");
    var children = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])([article], sections).map(function (document) {
        var location = document.location, title = document.title, text = document.text;
        return (Object(utilities__WEBPACK_IMPORTED_MODULE_1__["h"])("a", { href: location, class: css.link, tabIndex: -1 },
            Object(utilities__WEBPACK_IMPORTED_MODULE_1__["h"])("article", { class: "parent" in document ? css.section : css.article },
                !("parent" in document)
                    ? Object(utilities__WEBPACK_IMPORTED_MODULE_1__["h"])("div", { class: "md-search-result__icon md-icon" },
                        Object(utilities__WEBPACK_IMPORTED_MODULE_1__["h"])("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
                            Object(utilities__WEBPACK_IMPORTED_MODULE_1__["h"])("path", { d: path })))
                    : null,
                Object(utilities__WEBPACK_IMPORTED_MODULE_1__["h"])("h1", { class: css.title }, title),
                text.length
                    ? Object(utilities__WEBPACK_IMPORTED_MODULE_1__["h"])("p", { class: css.teaser }, Object(utilities__WEBPACK_IMPORTED_MODULE_1__["truncate"])(text, 320))
                    : undefined)));
    });
    return (Object(utilities__WEBPACK_IMPORTED_MODULE_1__["h"])("li", { class: css.item }, children));
}


/***/ }),

/***/ "./src/assets/javascripts/templates/source/index.tsx":
/*!***********************************************************!*\
  !*** ./src/assets/javascripts/templates/source/index.tsx ***!
  \***********************************************************/
/*! exports provided: renderSource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderSource", function() { return renderSource; });
/* harmony import */ var utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utilities */ "./src/assets/javascripts/utilities/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Data
 * ------------------------------------------------------------------------- */
/**
 * CSS classes
 */
var css = {
    facts: "md-source__facts",
    fact: "md-source__fact"
};
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Render source facts
 *
 * @param facts - Source facts
 *
 * @return Element
 */
function renderSource(facts) {
    var children = facts.map(function (fact) { return (Object(utilities__WEBPACK_IMPORTED_MODULE_0__["h"])("li", { class: css.fact }, fact)); });
    return (Object(utilities__WEBPACK_IMPORTED_MODULE_0__["h"])("ul", { class: css.facts }, children));
}


/***/ }),

/***/ "./src/assets/javascripts/templates/table/index.tsx":
/*!**********************************************************!*\
  !*** ./src/assets/javascripts/templates/table/index.tsx ***!
  \**********************************************************/
/*! exports provided: renderTable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderTable", function() { return renderTable; });
/* harmony import */ var utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utilities */ "./src/assets/javascripts/utilities/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Data
 * ------------------------------------------------------------------------- */
/**
 * CSS classes
 */
var css = {
    wrapper: "md-typeset__scrollwrap",
    table: "md-typeset__table"
};
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Render a table inside a wrapper to improve scrolling on mobile
 *
 * @param table - Table element
 *
 * @return Element
 */
function renderTable(table) {
    return (Object(utilities__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: css.wrapper },
        Object(utilities__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: css.table }, table)));
}


/***/ }),

/***/ "./src/assets/javascripts/utilities/config/index.ts":
/*!**********************************************************!*\
  !*** ./src/assets/javascripts/utilities/config/index.ts ***!
  \**********************************************************/
/*! exports provided: isConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isConfig", function() { return isConfig; });
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Ensure that the given value is a valid configuration
 *
 * We could use `jsonschema` or any other schema validation framework, but that
 * would just add more bloat to the bundle, so we'll keep it plain and simple.
 *
 * @param config - Configuration
 *
 * @return Test result
 */
function isConfig(config) {
    return typeof config === "object"
        && typeof config.url === "object"
        && typeof config.url.base === "string"
        && typeof config.url.worker === "object"
        && typeof config.url.worker.search === "string";
}


/***/ }),

/***/ "./src/assets/javascripts/utilities/index.ts":
/*!***************************************************!*\
  !*** ./src/assets/javascripts/utilities/index.ts ***!
  \***************************************************/
/*! exports provided: isConfig, h, cache, translate, truncate, round, hash */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/assets/javascripts/utilities/config/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isConfig", function() { return _config__WEBPACK_IMPORTED_MODULE_0__["isConfig"]; });

/* harmony import */ var _jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./jsx */ "./src/assets/javascripts/utilities/jsx/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "h", function() { return _jsx__WEBPACK_IMPORTED_MODULE_1__["h"]; });

/* harmony import */ var _rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rxjs */ "./src/assets/javascripts/utilities/rxjs/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cache", function() { return _rxjs__WEBPACK_IMPORTED_MODULE_2__["cache"]; });

/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./string */ "./src/assets/javascripts/utilities/string/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "translate", function() { return _string__WEBPACK_IMPORTED_MODULE_3__["translate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "truncate", function() { return _string__WEBPACK_IMPORTED_MODULE_3__["truncate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "round", function() { return _string__WEBPACK_IMPORTED_MODULE_3__["round"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hash", function() { return _string__WEBPACK_IMPORTED_MODULE_3__["hash"]; });

/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

/***/ "./src/assets/javascripts/utilities/jsx/index.ts":
/*!*******************************************************!*\
  !*** ./src/assets/javascripts/utilities/jsx/index.ts ***!
  \*******************************************************/
/*! exports provided: h */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return h; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/index.js");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Helper functions
 * ------------------------------------------------------------------------- */
/**
 * Create an element
 *
 * @param tag - HTML or SVG tag
 *
 * @return Element
 */
function createElement(tag) {
    switch (tag) {
        /* SVG elements */
        case "svg":
        case "path":
            return document.createElementNS("http://www.w3.org/2000/svg", tag);
        /* HTML elements */
        default:
            return document.createElement(tag);
    }
}
/**
 * Set an attribute
 *
 * @param el - Element
 * @param name - Attribute name
 * @param value - Attribute value
 */
function setAttribute(el, name, value) {
    switch (name) {
        /* Attributes to be ignored */
        case "xmlns":
            break;
        /* Attributes of SVG elements */
        case "viewBox":
        case "d":
            if (typeof value !== "boolean")
                el.setAttributeNS(null, name, value);
            else if (value)
                el.setAttributeNS(null, name, "");
            break;
        /* Attributes of HTML elements */
        default:
            if (typeof value !== "boolean")
                el.setAttribute(name, value);
            else if (value)
                el.setAttribute(name, "");
    }
}
/**
 * Append a child node to an element
 *
 * @param el - Element
 * @param child - Child node(s)
 */
function appendChild(el, child) {
    var e_1, _a;
    /* Handle primitive types (including raw HTML) */
    if (typeof child === "string" || typeof child === "number") {
        el.innerHTML += child.toString();
        /* Handle nodes */
    }
    else if (child instanceof Node) {
        el.appendChild(child);
        /* Handle nested children */
    }
    else if (Array.isArray(child)) {
        try {
            for (var child_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(child), child_1_1 = child_1.next(); !child_1_1.done; child_1_1 = child_1.next()) {
                var node = child_1_1.value;
                appendChild(el, node);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (child_1_1 && !child_1_1.done && (_a = child_1.return)) _a.call(child_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
}
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * JSX factory
 *
 * @param tag - HTML or SVG tag
 * @param attributes - HTML attributes
 * @param children - Child elements
 *
 * @return Element
 */
function h(tag, attributes) {
    var e_2, _a, e_3, _b;
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    var el = createElement(tag);
    /* Set attributes, if any */
    if (attributes)
        try {
            for (var _c = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(Object(ramda__WEBPACK_IMPORTED_MODULE_1__["keys"])(attributes)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var attr = _d.value;
                setAttribute(el, attr, attributes[attr]);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
    try {
        /* Append child nodes */
        for (var children_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(children), children_1_1 = children_1.next(); !children_1_1.done; children_1_1 = children_1.next()) {
            var child = children_1_1.value;
            appendChild(el, child);
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (children_1_1 && !children_1_1.done && (_b = children_1.return)) _b.call(children_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    /* Return element */
    return el;
}


/***/ }),

/***/ "./src/assets/javascripts/utilities/rxjs/index.ts":
/*!********************************************************!*\
  !*** ./src/assets/javascripts/utilities/rxjs/index.ts ***!
  \********************************************************/
/*! exports provided: cache */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cache", function() { return cache; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Cache the last value emitted by an observable in session storage
 *
 * If the key is not found in session storage, the factory is executed and the
 * latest value emitted will automatically be persisted to sessions storage.
 * Note that the values emitted by the returned observable must be serializable
 * as `JSON`, or data will be lost.
 *
 * @template T - Value type
 *
 * @param key - Cache key
 * @param factory - Observable factory
 *
 * @return Value observable
 */
function cache(key, factory) {
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["defer"])(function () {
        var data = sessionStorage.getItem(key);
        if (data) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(JSON.parse(data));
            /* Retrieve value from observable factory and write to storage */
        }
        else {
            var value$ = factory();
            value$.subscribe(function (value) {
                try {
                    sessionStorage.setItem(key, JSON.stringify(value));
                }
                catch (err) {
                    /* Uncritical, just swallow */
                }
            });
            /* Return value */
            return value$;
        }
    });
}


/***/ }),

/***/ "./src/assets/javascripts/utilities/string/index.ts":
/*!**********************************************************!*\
  !*** ./src/assets/javascripts/utilities/string/index.ts ***!
  \**********************************************************/
/*! exports provided: translate, truncate, round, hash */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translate", function() { return translate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "truncate", function() { return truncate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "round", function() { return round; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hash", function() { return hash; });
/* harmony import */ var browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! browser */ "./src/assets/javascripts/browser/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * Data
 * ------------------------------------------------------------------------- */
/**
 * Translations
 */
var lang;
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Translate the given key
 *
 * @param key - Key to be translated
 * @param value - Value to be replaced
 *
 * @return Translation
 */
function translate(key, value) {
    if (typeof lang === "undefined") {
        var el = Object(browser__WEBPACK_IMPORTED_MODULE_0__["getElementOrThrow"])("#__lang");
        lang = JSON.parse(el.innerText);
    }
    if (typeof lang[key] === "undefined") {
        throw new ReferenceError("Invalid translation: " + key);
    }
    return typeof value !== "undefined"
        ? lang[key].replace("#", value)
        : lang[key];
}
/**
 * Truncate a string after the given number of characters
 *
 * This is not a very reasonable approach, since the summaries kind of suck.
 * It would be better to create something more intelligent, highlighting the
 * search occurrences and making a better summary out of it, but this note was
 * written three years ago, so who knows if we'll ever fix it.
 *
 * @param value - Value to be truncated
 * @param n - Number of characters
 *
 * @return Truncated value
 */
function truncate(value, n) {
    var i = n;
    if (value.length > i) {
        while (value[i] !== " " && --i > 0)
            ; // tslint:disable-line
        return value.substring(0, i) + "...";
    }
    return value;
}
/**
 * Round a number for display with source facts
 *
 * This is a reverse engineered version of GitHub's weird rounding algorithm
 * for stars, forks and all other numbers. While all numbers below `1,000` are
 * returned as-is, bigger numbers are converted to fixed numbers:
 *
 * - `1,049` => `1k`
 * - `1,050` => `1.1k`
 * - `1,949` => `1.9k`
 * - `1,950` => `2k`
 *
 * @param value - Original value
 *
 * @return Rounded value
 */
function round(value) {
    if (value > 999) {
        var digits = +((value - 950) % 1000 > 99);
        return ((value + 1) / 1000).toFixed(digits) + "k";
    }
    else {
        return value.toString();
    }
}
/**
 * Simple hash function
 *
 * @see https://bit.ly/2wsVjJ4 - Original source
 *
 * @param value - Value to be hashed
 *
 * @return Hash as 32bit integer
 */
function hash(value) {
    var h = 0;
    for (var i = 0, len = value.length; i < len; i++) {
        h = ((h << 5) - h) + value.charCodeAt(i);
        h |= 0; // Convert to 32bit integer
    }
    return h;
}


/***/ }),

/***/ "./src/assets/javascripts/workers/index.ts":
/*!*************************************************!*\
  !*** ./src/assets/javascripts/workers/index.ts ***!
  \*************************************************/
/*! exports provided: setupSearchWorker, SearchMessageType, isSearchSetupMessage, isSearchDumpMessage, isSearchQueryMessage, isSearchResultMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./search */ "./src/assets/javascripts/workers/search/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setupSearchWorker", function() { return _search__WEBPACK_IMPORTED_MODULE_0__["setupSearchWorker"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SearchMessageType", function() { return _search__WEBPACK_IMPORTED_MODULE_0__["SearchMessageType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isSearchSetupMessage", function() { return _search__WEBPACK_IMPORTED_MODULE_0__["isSearchSetupMessage"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isSearchDumpMessage", function() { return _search__WEBPACK_IMPORTED_MODULE_0__["isSearchDumpMessage"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isSearchQueryMessage", function() { return _search__WEBPACK_IMPORTED_MODULE_0__["isSearchQueryMessage"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isSearchResultMessage", function() { return _search__WEBPACK_IMPORTED_MODULE_0__["isSearchResultMessage"]; });

/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

/***/ "./src/assets/javascripts/workers/search/_/index.ts":
/*!**********************************************************!*\
  !*** ./src/assets/javascripts/workers/search/_/index.ts ***!
  \**********************************************************/
/*! exports provided: setupSearchWorker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setupSearchWorker", function() { return setupSearchWorker; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_ajax__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/ajax */ "./node_modules/rxjs/_esm5/ajax/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! browser */ "./src/assets/javascripts/browser/index.ts");
/* harmony import */ var utilities__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! utilities */ "./src/assets/javascripts/utilities/index.ts");
/* harmony import */ var _message__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../message */ "./src/assets/javascripts/workers/search/message/index.ts");
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * FITNESS FOR A RTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */







/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Setup search web worker
 *
 * This function will create a web worker to setup and query the search index
 * which is done using `lunr`. The index can be passed explicitly in order to
 * enable hacks like _localsearch_ via search index embedding as JSON. If no
 * index is given, this function will load it from the default location.
 *
 * @param url - Worker url
 * @param options - Options
 *
 * @return Worker handler
 */
function setupSearchWorker(url, _a) {
    var base = _a.base, index = _a.index, location$ = _a.location$;
    var worker = new Worker(url);
    /* Ensure stable base URL */
    var origin$ = location$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
        var href = _a.href;
        return new URL(base, href)
            .toString()
            .replace(/\/$/, "");
    }));
    /* Create communication channels and resolve relative links */
    var tx$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    var rx$ = Object(browser__WEBPACK_IMPORTED_MODULE_4__["watchWorker"])(worker, { tx$: tx$ })
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["withLatestFrom"])(origin$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
        var e_1, _b, e_2, _c;
        var _d = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), message = _d[0], origin = _d[1];
        if (Object(_message__WEBPACK_IMPORTED_MODULE_6__["isSearchResultMessage"])(message)) {
            try {
                for (var _e = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(message.data), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var _g = _f.value, article = _g.article, sections = _g.sections;
                    article.location = origin + "/" + article.location;
                    try {
                        for (var sections_1 = (e_2 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(sections)), sections_1_1 = sections_1.next(); !sections_1_1.done; sections_1_1 = sections_1.next()) {
                            var section = sections_1_1.value;
                            section.location = origin + "/" + section.location;
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (sections_1_1 && !sections_1_1.done && (_c = sections_1.return)) _c.call(sections_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return message;
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["shareReplay"])(1));
    /* Fetch index if it wasn't passed explicitly */
    var index$ = typeof index !== "undefined"
        ? Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])(index)
        : origin$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (origin) { return Object(rxjs_ajax__WEBPACK_IMPORTED_MODULE_2__["ajax"])({
            url: origin + "/search/search_index.json",
            responseType: "json",
            withCredentials: true
        })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["pluck"])("response")); }));
    function isConfigDefaultLang(config) {
        return config.lang.length === 1 && config.lang[0] === "en";
    }
    function isConfigDefaultSeparator(config) {
        return config.separator === "[\s\-]+";
    }
    index$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
        var config = _a.config, rest = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_a, ["config"]);
        return (Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ config: {
                lang: isConfigDefaultLang(config)
                    ? [Object(utilities__WEBPACK_IMPORTED_MODULE_5__["translate"])("search.config.lang")]
                    : config.lang,
                separator: isConfigDefaultSeparator(config)
                    ? Object(utilities__WEBPACK_IMPORTED_MODULE_5__["translate"])("search.config.separator")
                    : config.separator
            }, pipeline: Object(utilities__WEBPACK_IMPORTED_MODULE_5__["translate"])("search.config.pipeline")
                .split(/\s*,\s*/)
                .filter(Boolean) }, rest));
    }))
        //     .subscribe(console.log)
        // /* Send index to worker */
        // index$
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) { return ({
        type: _message__WEBPACK_IMPORTED_MODULE_6__["SearchMessageType"].SETUP,
        data: data
    }); }))
        .subscribe(tx$.next.bind(tx$));
    /* Return worker handler */
    return { tx$: tx$, rx$: rx$ };
}


/***/ }),

/***/ "./src/assets/javascripts/workers/search/index.ts":
/*!********************************************************!*\
  !*** ./src/assets/javascripts/workers/search/index.ts ***!
  \********************************************************/
/*! exports provided: setupSearchWorker, SearchMessageType, isSearchSetupMessage, isSearchDumpMessage, isSearchQueryMessage, isSearchResultMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_ */ "./src/assets/javascripts/workers/search/_/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setupSearchWorker", function() { return ___WEBPACK_IMPORTED_MODULE_0__["setupSearchWorker"]; });

/* harmony import */ var _message__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./message */ "./src/assets/javascripts/workers/search/message/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SearchMessageType", function() { return _message__WEBPACK_IMPORTED_MODULE_1__["SearchMessageType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isSearchSetupMessage", function() { return _message__WEBPACK_IMPORTED_MODULE_1__["isSearchSetupMessage"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isSearchDumpMessage", function() { return _message__WEBPACK_IMPORTED_MODULE_1__["isSearchDumpMessage"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isSearchQueryMessage", function() { return _message__WEBPACK_IMPORTED_MODULE_1__["isSearchQueryMessage"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isSearchResultMessage", function() { return _message__WEBPACK_IMPORTED_MODULE_1__["isSearchResultMessage"]; });

/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

/***/ "./src/assets/javascripts/workers/search/message/index.ts":
/*!****************************************************************!*\
  !*** ./src/assets/javascripts/workers/search/message/index.ts ***!
  \****************************************************************/
/*! exports provided: SearchMessageType, isSearchSetupMessage, isSearchDumpMessage, isSearchQueryMessage, isSearchResultMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchMessageType", function() { return SearchMessageType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSearchSetupMessage", function() { return isSearchSetupMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSearchDumpMessage", function() { return isSearchDumpMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSearchQueryMessage", function() { return isSearchQueryMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSearchResultMessage", function() { return isSearchResultMessage; });
/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
 * FITNESS FOR A RTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */
/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */
/**
 * Search message type
 */
var SearchMessageType;
(function (SearchMessageType) {
    SearchMessageType[SearchMessageType["SETUP"] = 0] = "SETUP";
    SearchMessageType[SearchMessageType["DUMP"] = 1] = "DUMP";
    SearchMessageType[SearchMessageType["QUERY"] = 2] = "QUERY";
    SearchMessageType[SearchMessageType["RESULT"] = 3] = "RESULT"; /* Search results */
})(SearchMessageType || (SearchMessageType = {}));
/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */
/**
 * Type guard for search setup messages
 *
 * @param message - Search worker message
 *
 * @return Test result
 */
function isSearchSetupMessage(message) {
    return message.type === SearchMessageType.SETUP;
}
/**
 * Type guard for search dump messages
 *
 * @param message - Search worker message
 *
 * @return Test result
 */
function isSearchDumpMessage(message) {
    return message.type === SearchMessageType.DUMP;
}
/**
 * Type guard for search query messages
 *
 * @param message - Search worker message
 *
 * @return Test result
 */
function isSearchQueryMessage(message) {
    return message.type === SearchMessageType.QUERY;
}
/**
 * Type guard for search result messages
 *
 * @param message - Search worker message
 *
 * @return Test result
 */
function isSearchResultMessage(message) {
    return message.type === SearchMessageType.RESULT;
}


/***/ }),

/***/ "./src/assets/stylesheets/main.scss":
/*!******************************************!*\
  !*** ./src/assets/stylesheets/main.scss ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/Users/squidfunk/Desktop/General/Sources/mkdocs-material-typescript/material/main.css");

/***/ }),

/***/ "./src/assets/stylesheets/palette.scss":
/*!*********************************************!*\
  !*** ./src/assets/stylesheets/palette.scss ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/Users/squidfunk/Desktop/General/Sources/mkdocs-material-typescript/material/palette.css");

/***/ })

/******/ })));
//# sourceMappingURL=bundle.js.map