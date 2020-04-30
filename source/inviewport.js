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
  callback,
  intervalSpeed,
  type = 'percentage'
) {
  let isVisible = false;
  let inView = false;

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
   * Vertical Check.
   */
  const verticalCheck = (boundaries) => {
    const { viewport, visible, bounds } = boundaries;
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
   * Horizontal Check.
   */
  const horizontalCheck = (boundaries) => {
    const { viewport, visible, bounds } = boundaries;
    let element = 0;

    if (visible.right && !visible.left) {
      element =
        type === 'pixel' ? bounds.right : Math.abs(bounds.right / bounds.width);
    } else if (!visible.right && visible.left) {
      element =
        type === 'pixel'
          ? Math.abs(viewport.right - bounds.left)
          : Math.abs((viewport.right - bounds.left) / bounds.width);
    }

    return element >= xValue;
  };

  /**
   * Element Bounds Check.
   *
   * @param {object} boundCheck
   */
  const elementBoundsCheck = (boundaries) => {
    const {
      sideA,
      sideB,
      measurementDirection,
      visible,
      viewport,
      bounds,
    } = boundaries;
    const xPosition = window.pageXOffset + bounds.left;
    const yPosition = window.pageYOffset + bounds.top;

    let objectVisible = 0;

    /**
     * Return true if element is completely visible or if the element is too
     * big for the viewport.
     */
    if (
      (visible[sideA] && visible[sideB]) ||
      (yPosition <= viewport[sideA] &&
        viewport[sideB] <= yPosition + bounds[measurementDirection]) ||
      (xPosition <= viewport.left &&
        viewport.right <= xPosition + elementBounds.width)
    ) {
      return true;
    }

    objectVisible =
      measurementDirection === 'height'
        ? verticalCheck(boundaries)
        : horizontalCheck(boundaries);

    return objectVisible;
  };

  /**
   * Callback.
   *
   * @param {boolean} inView
   */
  const checkCallback = () => {
    if (inView && !isVisible) {
      console.log('in view');
      callback();
    }
  };

  /**
   * Is In View.
   */
  const isInView = () => {
    const errorFound = errorHandling();
    if (errorFound) {
      return false;
    }

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

    const verticalBoundaries = {
      sideA: 'top',
      sideB: 'bottom',
      measurementDirection: 'height',
      visible,
      viewport,
      bounds,
    };

    const horizontalBoundaries = {
      sideA: 'right',
      sideB: 'left',
      measurementDirection: 'width',
      visible,
      viewport,
      bounds,
    };

    inView =
      elementBoundsCheck(verticalBoundaries) &&
      elementBoundsCheck(horizontalBoundaries);

    console.log(`inView: ${inView}, isVisible: ${isVisible}`);

    checkCallback();

    return inView;
  };

  /**
   * Boundary Listener.
   */
  const addBoundaryListener = () => {
    console.log('adding listener...');
    let scrolling = false;

    window.addEventListener(
      'scroll',
      () => {
        scrolling = true;
      },
      false
    );

    setInterval(() => {
      if (scrolling) {
        isVisible = isInView();
        scrolling = false;
      }
    }, intervalSpeed);
  };
  addBoundaryListener();
};

const inViewport = Object.prototype.inViewport;
export default inViewport;
