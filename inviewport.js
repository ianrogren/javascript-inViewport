"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

/* eslint-disable consistent-return */

/* eslint-disable no-restricted-globals */

/* eslint-disable function-paren-newline */

/* eslint-disable object-curly-newline */

/**
 * inviewport Object Prototype.
 *
 * @param {number} xValue
 * @param {number} yValue
 * @param {Array} callback
 * @param {number} intervalSpeed
 * @param {object} options
 */
Object.prototype.inViewport = function inViewport(xValue, yValue, callback, intervalSpeed) {
  var _this = this;

  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
    type: 'percentage',
    debug: false
  };
  var type = options.type,
      debug = options.debug;
  var isVisible = false;
  var inView = false;
  var scrolling = false;
  var scrollListener = null;
  /**
   * Set Scroll.
   */

  function setScroll() {
    scrolling = true;
  }
  /**
   * Error Handling.
   */


  var errorHandling = function errorHandling() {
    var error = false;
    var readme = '\n  View the readme: https://github.com/ianrogren/javascript-inViewport';
    var windowError = typeof window === 'undefined' ? 'inViewport: No window object found.' : '';
    var xError = isNaN(xValue) ? '\n\tx-value is not a number.' : '';
    var yError = isNaN(yValue) ? '\n\ty-value is not a number.' : '';
    var callbackError = typeof callback !== 'function' && !Array.isArray(callback) ? '\n\tCallback is not a function or array.' : '';
    var objectWarning = _typeof(options) !== 'object' ? 'inViewport: Invalid options input.' : '';
    var errorMessage = "".concat(windowError, " ").concat(xError, " ").concat(yError, " ").concat(callbackError);

    if (errorMessage !== '   ') {
      console.error('inViewport Error:', errorMessage, readme);
      error = true;
    }

    if (objectWarning !== '') {
      console.warn(objectWarning, readme);
    }

    return error;
  };

  if (errorHandling()) {
    return false;
  }
  /**
   * Debug Mode.
   *
   * @param {object} bounds
   * @param {object} visible
   * @param {object} viewport
   */


  var debugMode = function debugMode(bounds, visible, viewport) {
    var headingStyle = 'font-weight: bold; font-size: 14px; margin-bottom: 10px';
    console.clear();
    console.log('%cElement bounds: \n', headingStyle, bounds, '\n\n');
    console.log('%cSide visibility: \n', headingStyle, visible, '\n\n');
    console.log('%cViewport: \n', headingStyle, viewport, '\n\n');
    console.log('%cWindow & variabele checks:', headingStyle, '\n\tWidth: ', window.innerWidth, '\n\tHeight: ', window.innerHeight, '\n\tLeft offset: ', window.pageXOffset);
  };
  /**
   * Vertical Check.
   *
   * @param {object} boundaries
   */


  var verticalCheck = function verticalCheck(boundaries) {
    var visible = boundaries.visible,
        bounds = boundaries.bounds;
    var element = 0;

    if (visible.top && !visible.bottom) {
      element = type === 'pixel' ? Math.abs(bounds.top - window.innerHeight) : Math.abs((bounds.top - window.innerHeight) / bounds.height);

      if (debug) {
        console.log('\tTop visible: ', element);
      }
    } else if (!visible.top && visible.bottom) {
      element = type === 'pixel' ? bounds.bottom : Math.abs(bounds.bottom / bounds.height);

      if (debug) {
        console.log('\tBottom visible: ', element);
      }
    }

    return element >= yValue;
  };
  /**
   * Horizontal Check.
   *
   * @param {object} boundaries
   */


  var horizontalCheck = function horizontalCheck(boundaries) {
    var visible = boundaries.visible,
        bounds = boundaries.bounds;
    var element = 0;

    if (visible.left && !visible.right) {
      element = type === 'pixel' ? Math.abs(bounds.left - window.innerWidth) : Math.abs((bounds.left - window.innerWidth) / bounds.width);

      if (debug) {
        console.log('\tLeft visible: ', element);
      }
    } else if (!visible.left && visible.right) {
      element = type === 'pixel' ? bounds.right : Math.abs(bounds.right / bounds.width);

      if (debug) {
        console.log('\tRight visible: ', element);
      }
    }

    return element >= xValue;
  };
  /**
   * Element Bounds Check.
   *
   * @param {object} boundaries
   */


  var elementBoundsCheck = function elementBoundsCheck(boundaries) {
    var sideA = boundaries.sideA,
        sideB = boundaries.sideB,
        measurementDirection = boundaries.measurementDirection,
        visible = boundaries.visible,
        bounds = boundaries.bounds;
    var objectVisible = 0;
    /**
     * Return true if element is completely visible or if the element is too
     * big for the viewport.
     */

    if (visible[sideA] && visible[sideB] || bounds.top < 0 && bounds.bottom > window.innerHeight || bounds.left < 0 && bounds.right > window.innerWidth) {
      if (debug) {
        if (visible[sideA] && visible[sideB]) {
          console.log("\tElement ".concat(measurementDirection.trim(), ": completely visible."));
        } else {
          console.log("\tElement ".concat(measurementDirection.trim(), ": too big for window."));
        }
      }

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
      if (Array.isArray(callback)) {
        callback[0]();
      } else {
        callback();
        window.removeEventListener('scroll', setScroll, false);
        clearInterval(scrollListener);

        if (debug) {
          console.log('Scroll interval cleared and removed window scroll');
        }
      }
    } else if (!inView && isVisible) {
      if (Array.isArray(callback) && typeof callback[1] === 'function') {
        callback[1]();
      }
    }
  };
  /**
   * Is In View.
   */


  var isInView = function isInView() {
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
      right: bounds.right >= 0 && bounds.right <= window.innerWidth
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

    if (debug) {
      debugMode(bounds, visible, viewport);
    }

    inView = elementBoundsCheck(verticalBoundaries) && elementBoundsCheck(horizontalBoundaries);
    checkCallback();
    return inView;
  };

  isInView();
  /**
   * Boundary Listener.
   */

  var addBoundaryListener = function addBoundaryListener() {
    window.addEventListener('scroll', setScroll, false);
    scrollListener = setInterval(function () {
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

//# sourceMappingURL=inviewport.js.map