/* eslint-env es5 */
/* eslint no-undef: 0 */
/* eslint no-var: 0 */
/* eslint no-console: 0 */
/* eslint no-extend-native: ["error", { "exceptions": ["Object"] }] */

Object.prototype.inViewport = function inViewport(xValue, yValue, measurementType) {
  var win = typeof window !== 'undefined' && window;
  var x = xValue;
  var y = yValue;
  var measurement = 'pixel';
  var scrolling = false;

  var viewport = {
    top: win.pageYOffset,
    left: win.pageXOffset,
    bottom: win.pageYOffset + win.innerHeight,
    right: win.pageXOffset + win.innerWidth,
  };

  var bounds = this.getBoundingClientRect();
  var topVisible = bounds.top >= 0 && bounds.top < win.innerHeight;
  var bottomVisible = bounds.bottom > 0 && bounds.bottom <= win.innerHeight;
  var leftVisible = bounds.left >= 0 && bounds.left < win.innerWidth;
  var rightVisible = bounds.right > 0 && bounds.right <= win.innerWidth;


  /**
   * Variable Validate
   *
   * @param int xInput
   * @param int yInput
   * @param string measurementInput
   *
   * @return boolean
   */
  function variableValidate(xInput, yInput, measurementInput) {
    var validVariables = true;

    if (x === null || typeof x === 'undefined') {
      validVariables = false;
      console.warn('inViewport.js: missing x-axis viewport edge value.' +
        '\nPlease see valid variable inputs at https://github.com/ianrogren/javascript-inViewport');
    }

    if (y === null || typeof y === 'undefined') {
      validVariables = false;
      console.warn('inViewport.js: missing x-axis viewport edge value.' +
        '\nPlease see valid variable inputs at https://github.com/ianrogren/javascript-inViewport');
    }

    if (measurementInput === null ||
      typeof measurementInput === 'undefined' ||
      measurementInput === 'percentage') {
      measurement = 'percentage';
    } else if (measurementInput === 'pixel') {
      measurement = 'pixel';
    } else {
      measurement = 'percentage';
      console.warn('inViewport.js: invalid measurement setting.  Defaulting to percentage.' +
        '\nPlease see valid variable inputs at https://github.com/ianrogren/javascript-inViewport');
    }

    if (!validVariables) {
      return false;
    }
    return true;
  }


  /**
   * Vertical Visibility
   *
   * @param array elementBounds
   * @param boolean topBounds
   * @param boolean bottomBounds
   * @param string view
   *
   * @return boolean
   */
  function verticalVisibility(elementBounds, topBounds, bottomBounds, view) {
    var yPosition = win.pageYOffset + elementBounds.top;
    var verticalShowing = 0;
    var verticalPercentage = 0;

    if (topBounds === true && bottomBounds === false) {
      verticalShowing = Math.abs(elementBounds.top - win.innerHeight);
      verticalPercentage = Math.abs((elementBounds.top - win.innerHeight) / elementBounds.height);
    } else if (topBounds === false && bottomBounds === true) {
      verticalShowing = elementBounds.bottom;
      verticalPercentage = Math.abs(elementBounds.bottom / elementBounds.height);
    } else if (topBounds === true && bottomBounds === true) {
      return true;
    }

    // Check to see if the element is in the viewport but
    // the height takes up the whole screen
    if (yPosition <= view.top && view.bottom <= (yPosition + bounds.height)) {
      return true;
    }

    if ((verticalPercentage >= y && measurement === 'percentage') ||
      (verticalShowing >= y && measurement === 'pixel')) {
      return true;
    }
    return false;
  }


  /**
   * Horizontal Visibility
   *
   * @param array elementBounds
   * @param boolean rightBounds
   * @param boolean leftBounds
   * @param string view
   *
   * @return boolean
   */
  function horizontalVisibility(elementBounds, rightBounds, leftBounds, view) {
    var xPosition = win.pageXOffset + elementBounds.left;
    var horizontalShowing = 0;
    var horizontalPercentage = 0;

    // Get the percentage of the element showing horizontally
    if (rightVisible === true && leftVisible === false) {
      horizontalShowing = elementBounds.right;
      horizontalPercentage = Math.abs(elementBounds.right / elementBounds.width);
    } else if (rightVisible === false && leftVisible === true) {
      horizontalShowing = Math.abs(viewport.right - elementBounds.left);
      horizontalPercentage = Math.abs((viewport.right - elementBounds.left) / elementBounds.width);
    } else if (rightVisible === true && leftVisible === true) {
      horizontalShowing = x;
      horizontalPercentage = 1;
    }

    // Check to see if the element is in the viewport but
    // the width takes up the whole screen
    if (xPosition <= view.left && view.right <= (xPosition + elementBounds.width)) {
      return true;
    }

    if ((horizontalPercentage >= y && measurement === 'percentage') ||
      (horizontalShowing >= y && measurement === 'pixel')) {
      return true;
    }
    return false;
  }

  /**
   * Check in View
   */
  function checkInView() {
    // Validate input variables
    if (variableValidate(xValue, yValue, measurementType) === false) {
      return false;
    }

    // Check horizontal visibility
    if (horizontalVisibility(bounds, rightVisible, leftVisible, viewport) === false) {
      return false;
    }

    // Chceck vertical visibility
    if (verticalVisibility(bounds, topVisible, bottomVisible, viewport) === false) {
      return false;
    }

    return true;
  }

  return checkInView();
};

