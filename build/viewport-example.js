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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./source/viewport-example.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./inviewport.js":
/*!***********************!*\
  !*** ./inviewport.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/**
 * javascript-inViewport.
 *
 * @format
 */

/* eslint-env es5 */

/* eslint no-undef: 0 */

/* eslint no-var: 0 */

/* eslint no-console: 0 */

/* eslint comma-dangle: 0 */

/* eslint no-extend-native: ["error", { "exceptions": ["Object"] }] */

/* eslint-disable prefer-destructuring */

Object.prototype.inViewport = function inViewport(xValue, yValue, callback, intervalSpeed) {
  var _this = this;

  var type = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'percentage';
  var isVisible = false;
  var inView = false;
  /**
   * Error Handling.
   */

  var errorHandling = function errorHandling() {
    var error = false;

    if (window === 'undefined') {
      console.error('inViewport: no window object found');
      error = true;
    }

    return error;
  };
  /**
   * Vertical Check.
   */


  var verticalCheck = function verticalCheck(boundaries) {
    var viewport = boundaries.viewport,
        visible = boundaries.visible,
        bounds = boundaries.bounds;
    var element = 0;

    if (visible.top && !visible.bottom) {
      element = type === 'pixel' ? Math.abs(bounds.top - window.innerHeight) : Math.abs((bounds.top - window.innerHeight) / bounds.height);
    } else if (!visible.top && visible.bottom) {
      element = type === 'pixel' ? bounds.bottom : Math.abs(bounds.bottom / bounds.height);
    }

    return element >= yValue;
  };
  /**
   * Horizontal Check.
   */


  var horizontalCheck = function horizontalCheck(boundaries) {
    var viewport = boundaries.viewport,
        visible = boundaries.visible,
        bounds = boundaries.bounds;
    var element = 0;

    if (visible.right && !visible.left) {
      element = type === 'pixel' ? bounds.right : Math.abs(bounds.right / bounds.width);
    } else if (!visible.right && visible.left) {
      element = type === 'pixel' ? Math.abs(viewport.right - bounds.left) : Math.abs((viewport.right - bounds.left) / bounds.width);
    }

    return element >= xValue;
  };
  /**
   * Element Bounds Check.
   *
   * @param {object} boundCheck
   */


  var elementBoundsCheck = function elementBoundsCheck(boundaries) {
    var sideA = boundaries.sideA,
        sideB = boundaries.sideB,
        measurementDirection = boundaries.measurementDirection,
        visible = boundaries.visible,
        viewport = boundaries.viewport,
        bounds = boundaries.bounds;
    var xPosition = window.pageXOffset + bounds.left;
    var yPosition = window.pageYOffset + bounds.top;
    var objectVisible = 0;
    /**
     * Return true if element is completely visible or if the element is too
     * big for the viewport.
     */

    if (visible[sideA] && visible[sideB] || yPosition <= viewport[sideA] && viewport[sideB] <= yPosition + bounds[measurementDirection] || xPosition <= viewport.left && viewport.right <= xPosition + elementBounds.width) {
      return true;
    }

    objectVisible = measurementDirection === 'height' ? verticalCheck(boundaries) : horizontalCheck(boundaries);
    return objectVisible;
  };
  /**
   * Callback.
   *
   * @param {boolean} inView
   */


  var checkCallback = function checkCallback() {
    if (inView && !isVisible) {
      console.log('in view');
      callback();
    }
  };
  /**
   * Is In View.
   */


  var isInView = function isInView() {
    var errorFound = errorHandling();

    if (errorFound) {
      return false;
    }

    var bounds = _this.getBoundingClientRect();

    var viewport = {
      top: window.pageYOffset,
      left: window.pageXOffset,
      bottom: window.pageYOffset + window.innerHeight,
      right: window.pageXOffset + window.innerWidth
    };
    var visible = {
      top: bounds.top >= 0 && bounds.top < window.innerHeight,
      bottom: bounds.bottom > 0 && bounds.bottom <= window.innerHeight,
      left: bounds.left >= 0 && bounds.left < window.innerWidth,
      right: bounds.right > 0 && bounds.right <= window.innerWidth
    };
    var verticalBoundaries = {
      sideA: 'top',
      sideB: 'bottom',
      measurementDirection: 'height',
      visible: visible,
      viewport: viewport,
      bounds: bounds
    };
    var horizontalBoundaries = {
      sideA: 'right',
      sideB: 'left',
      measurementDirection: 'width',
      visible: visible,
      viewport: viewport,
      bounds: bounds
    };
    inView = elementBoundsCheck(verticalBoundaries) && elementBoundsCheck(horizontalBoundaries);
    console.log("inView: ".concat(inView, ", isVisible: ").concat(isVisible));
    checkCallback();
    return inView;
  };
  /**
   * Boundary Listener.
   */


  var addBoundaryListener = function addBoundaryListener() {
    console.log('adding listener...');
    var scrolling = false;
    window.addEventListener('scroll', function () {
      scrolling = true;
    }, false);
    setInterval(function () {
      if (scrolling) {
        isVisible = isInView();
        scrolling = false;
      }
    }, intervalSpeed);
  };

  addBoundaryListener();
};

var inViewport = Object.prototype.inViewport;
var _default = inViewport;
exports["default"] = _default;

/***/ }),

/***/ "./source/viewport-example.js":
/*!************************************!*\
  !*** ./source/viewport-example.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _inviewport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../inviewport */ "./inviewport.js");
/* harmony import */ var _inviewport__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_inviewport__WEBPACK_IMPORTED_MODULE_0__);
/**
 * inViewport Example
 *
 * @format
 */

/* eslint no-undef: 0 */

/* eslint no-var: 0 */

/* eslint prefer-arrow-callback: 0 */

var viewportExample = {};

viewportExample.init = function viewportBuildExample() {
  console.log('test');
  var selectorA = document.getElementById('selector-A');
  var selectorALine = document.getElementById('selector-A-line');
  var selectorAResult = document.getElementById('selector-A-visibility');
  var selectorB = document.getElementById('selector-B');
  var selectorBLine = document.getElementById('selector-B-line');
  var selectorBResult = document.getElementById('selector-B-visibility');
  var testContainer = document.getElementById('test-container');
  var header = document.getElementsByTagName('header');
  var scrolling = false;

  function checkView() {
    // // Selector A
    // if (selectorA.inViewport(175, 175, 'pixel')) {
    //   selectorA.classList.add('visible');
    //   selectorAResult.innerHTML = 'True';
    // } else {
    //   selectorA.classList.remove('visible');
    //   selectorAResult.innerHTML = 'False';
    // }
    // // Selector B
    // if (selectorB.inViewport(0.5, 0.5)) {
    //   selectorB.classList.add('visible');
    //   selectorBResult.innerHTML = 'True';
    // } else {
    //   selectorB.classList.remove('visible');
    //   selectorBResult.innerHTML = 'False';
    // }
    // // Test Lines
    // if (testContainer.inViewport(200, 200, 'pixel')) {
    //   selectorALine.classList.add('show');
    //   selectorBLine.classList.add('show');
    //   header[0].classList.add('hide');
    // } else {
    //   selectorALine.classList.remove('show');
    //   selectorBLine.classList.remove('show');
    //   header[0].classList.remove('hide');
    // }
    selectorA.inViewport(175, 175, function () {
      selectorA.classList.add('visible');
      console.log('is visible');
    }, 'pixel', 20);
  } // window.addEventListener(
  //   'scroll',
  //   function () {
  //     scrolling = true;
  //   },
  //   false
  // );
  // setInterval(function checkScroll() {
  //   if (scrolling) {
  //     checkView();
  //     scrolling = false;
  //   }
  // }, 20);


  checkView();
};

viewportExample.init();

/***/ })

/******/ })));
//# sourceMappingURL=viewport-example.js.map