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
Object.prototype.inViewport = function inViewport(xValue, yValue) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'percentage';
  var bounds = this.getBoundingClientRect();
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


  var verticalCheck = function verticalCheck() {
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


  var horizontalCheck = function horizontalCheck() {
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
        measurementDirection = boundaries.measurementDirection;
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

    objectVisible = measurementDirection === 'height' ? verticalCheck() : horizontalCheck();
    return objectVisible;
  };
  /**
   * Is In View.
   */


  var isInView = function isInView() {
    var errorFound = errorHandling();

    if (errorFound) {
      return false;
    }

    var verticalBoundaries = {
      sideA: 'top',
      sideB: 'bottom',
      measurementDirection: 'height'
    };
    var horizontalBoundaries = {
      sideA: 'right',
      sideB: 'left',
      measurementDirection: 'width'
    };
    return elementBoundsCheck(verticalBoundaries) && elementBoundsCheck(horizontalBoundaries);
  };

  return isInView();
};

var inViewport = Object.prototype.inViewport;
var _default = inViewport;
exports["default"] = _default;

//# sourceMappingURL=inviewport.js.map