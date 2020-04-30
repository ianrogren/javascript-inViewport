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

Object.prototype.inViewport = function inViewport(
  xValue,
  yValue,
  type = 'percentage'
) {
  const bounds = this.getBoundingClientRect();
  const viewport = {
    top: window.pageYOffset,
    left: window.pageXOffset,
    bottom: window.pageYOffset + window.innerHeight,
    right: window.pageXOffset + window.innerWidth,
  };
  const visible = {
    top: bounds.top >= 0 && bounds.top < window.innerHeight,
    bottom: bounds.bottom > 0 && bounds.bottom <= window.innerHeight,
    left: bounds.left >= 0 && bounds.left < window.innerWidth,
    right: bounds.right > 0 && bounds.right <= window.innerWidth,
  };

  /**
   * Error Handling.
   */
  const errorHandling = () => {
    let error = false;
    if (window === 'undefined') {
      console.error('inViewport: no window object found');
      error = true;
    }
    return error;
  };

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
  const verticalVisibility = (topBounds, bottomBounds, view) => {
    const yPosition = window.pageYOffset + bounds.top;
    let verticalShowing = 0;
    let verticalPercentage = 0;

    /**
     * Return true if element is completely visible or if the element is too
     * big for the viewport.
     */
    if (
      (topBounds === true && bottomBounds === true) ||
      (yPosition <= view.top && view.bottom <= yPosition + bounds.height)
    ) {
      return true;
    }

    if (topBounds && !bottomBounds) {
      verticalShowing = Math.abs(bounds.top - window.innerHeight);
      verticalPercentage = Math.abs(
        (bounds.top - window.innerHeight) / bounds.height
      );
    } else if (!topBounds && bottomBounds) {
      verticalShowing = elementBounds.bottom;
      verticalPercentage = Math.abs(bounds.bottom / bounds.height);
    }

    if (
      (verticalPercentage >= yValue && type === 'percentage') ||
      (verticalShowing >= yValue && type === 'pixel')
    ) {
      return true;
    }
    return false;
  };

  /**
   * Horizontal Visibility
   *
   * @param array elementBounds
   * @param boolean rightBounds
   * @param boolean leftBounds
   * @param string view
   *
   * @return boolean
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   */
  // const horizontalVisibility = (elementBounds, view) => {
  //   var xPosition = window.pageXOffset + elementBounds.left;
  //   var horizontalShowing = 0;
  //   var horizontalPercentage = 0;

  //   // Get the percentage of the element showing horizontally
  //   if (visible.right && !visible.left) {
  //     horizontalShowing = elementBounds.right;
  //     horizontalPercentage = Math.abs(
  //       elementBounds.right / elementBounds.width
  //     );
  //   } else if (!visible.right && visible.left) {
  //     horizontalShowing = Math.abs(viewport.right - elementBounds.left);
  //     horizontalPercentage = Math.abs(
  //       (viewport.right - elementBounds.left) / elementBounds.width
  //     );
  //   } else if (visible.right && visible.left) {
  //     return true;
  //   }

  //   // Check to see if the element is in the viewport but
  //   // the width takes up the whole screen
  //   if (
  //     xPosition <= view.left &&
  //     view.right <= xPosition + elementBounds.width
  //   ) {
  //     return true;
  //   }

  //   if (
  //     (horizontalPercentage >= yValue && type === 'percentage') ||
  //     (horizontalShowing >= yValue && type === 'pixel')
  //   ) {
  //     return true;
  //   }
  //   return false;
  // };

  /**
   * Vertical Check.
   */
  const verticalCheck = () => {
    let element = 0;

    if (visible.top && !visible.bottom) {
      element =
        type === 'pixel'
          ? Math.abs(bounds.top - window.innerHeight)
          : Math.abs((bounds.top - window.innerHeight) / bounds.height);
    } else if (!visible.top && visible.bottom) {
      element =
        type === 'pixel'
          ? bounds.bottom
          : Math.abs(bounds.bottom / bounds.height);
    }

    return element >= yValue;
  };

  /**
   *
   *
   *
   *
   *
   *
   *
   *
   *
   */
  const horizontalCheck = () => {
    return false;
  };

  /**
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   * Element Bounds Check.
   *
   * @param {object} boundCheck
   */
  const elementBoundsCheck = (boundaries) => {
    const { sideA, sideB, viewPosition, measurementDirection } = boundaries;

    let objectVisible = 0;

    /**
     * Return true if element is completely visible or if the element is too
     * big for the viewport.
     */
    if (
      (visible[sideA] && visible[sideB]) ||
      (viewPosition <= viewport[sideA] &&
        viewport[sideB] <= viewPosition + bounds[measurementDirection])
    ) {
      return true;
    }

    objectVisible =
      measurementDirection === 'height'
        ? verticalCheck(boundaries)
        : horizontalCheck(boundaries);

    return objectVisible;

    // if (visible[sideA] && !visible[sideB]) {
    //   pixelVisible = Math.abs(viewport[sideA] - bounds[sideB]);
    //   percentVisible = Math.abs(
    //     (bounds[sideA] - window.innerHeight) / bounds[measurementDirection]
    //   );
    // } else if (!visible[sideA] && visible[sideB]) {
    //   pixelVisible = bounds[sideB];
    //   percentVisible = Math.abs(bounds[sideB] / bounds.height);
    // }

    // const pixelVisible =
    //   visible[sideA] && !visible[sideB]
    //     ? bounds[sideA]
    //     : Math.abs(viewport[sideA] - bounds[sideB]);

    // const percentageVisible =
    //   visible[sideA] && !visible[sideB]
    //     ? Math.abs(bounds[sideA] / bounds.width)
    //     : Math.abs((viewport.right - bounds[sideB]) / bounds.width);

    // console.log('pixel visible', pixelVisible);
    // console.log('window position', windowPosition);

    // const elementVisible = type === 'pixel' ? pixelVisible : percentageVisible;

    // return elementVisible >= windowPosition;
  };

  /**
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   * Is In View.
   */
  const isInView = () => {
    const errorFound = errorHandling();
    if (errorFound) {
      return false;
    }

    const verticalBoundaries = {
      sideA: 'top',
      sideB: 'bottom',
      viewPosition: window.pageYOffset + bounds.top,
      windowPosition: yValue,
      measurementDirection: 'height',
    };
    const verticalPosition = elementBoundsCheck(verticalBoundaries);

    if (!verticalPosition) {
      return false;
    }

    // const horizontalBoundaries = {
    //   sideA: 'right',
    //   sideB: 'left',
    //   viewPosition: window.pageXOffset + bounds.left,
    //   windowPosition: xValue,
    //   measurementDirection: 'width',
    // };
    // const horizontalPosition = elementBoundsCheck(horizontalBoundaries);
    // console.log('horizontal:', horizontalPosition);

    // if (
    //   !horizontalVisibility(bounds, viewport) ||
    //   !verticalVisibility(visible.top, visible.bottom, viewport)
    // ) {
    //   return false;
    // }
    return true;
  };

  return isInView();
};

const inViewport = Object.prototype.inViewport;
export default inViewport;
