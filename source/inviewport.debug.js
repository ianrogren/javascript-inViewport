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
 */
Object.prototype.inViewport = function inViewport(xValue, yValue, callback) {
  let isVisible = false;
  let inView = false;
  let scrolling = false;
  let scrollListener = null;
  const type = isNaN(xValue) && xValue.includes('px') ? 'pixel' : '';

  /**
   * Set Scroll.
   */
  function setScroll() {
    scrolling = true;
  }

  /**
   * Error Handling.
   */
  const errorHandling = () => {
    let error = false;
    const readme =
      '\n  View the readme: https://github.com/ianrogren/javascript-inViewport';
    const windowError =
      typeof window === 'undefined'
        ? 'inViewport: No window object found.'
        : '';
    const xError =
      (isNaN(xValue) && xValue.includes('px')) || !isNaN(xValue)
        ? ''
        : '\n\tInvalid x-value input.';
    const yError =
      (isNaN(yValue) && yValue.includes('px')) || !isNaN(yValue)
        ? ''
        : '\n\tInvalid y-value input.';
    const callbackError =
      typeof callback !== 'function' && !Array.isArray(callback)
        ? '\n\tCallback is not a function or array.'
        : '';

    const errorMessage = `${windowError} ${xError} ${yError} ${callbackError}`;
    if (errorMessage !== '   ') {
      console.error('inViewport Error:', errorMessage, readme);
      error = true;
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
  const debugMode = (bounds, visible, viewport) => {
    const headingStyle =
      'font-weight: bold; font-size: 14px; margin-bottom: 10px';
    console.clear();
    console.log('%cElement bounds: \n', headingStyle, bounds, '\n\n');
    console.log('%cSide visibility: \n', headingStyle, visible, '\n\n');
    console.log('%cViewport: \n', headingStyle, viewport, '\n\n');
    console.log(
      '%cWindow & variabele checks:',
      headingStyle,
      '\n\tWidth: ',
      window.innerWidth,
      '\n\tHeight: ',
      window.innerHeight,
      '\n\tLeft offset: ',
      window.pageXOffset
    );
  };

  /**
   * Vertical Check.
   *
   * @param {object} boundaries
   */
  const verticalCheck = (boundaries) => {
    const { visible, bounds } = boundaries;
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
   *
   * @param {object} boundaries
   */
  const horizontalCheck = (boundaries) => {
    const { visible, bounds } = boundaries;
    let element = 0;
    if (visible.left && !visible.right) {
      element =
        type === 'pixel'
          ? Math.abs(bounds.left - window.innerWidth)
          : Math.abs((bounds.left - window.innerWidth) / bounds.width);
    } else if (!visible.left && visible.right) {
      element =
        type === 'pixel' ? bounds.right : Math.abs(bounds.right / bounds.width);
    }
    return element >= xValue;
  };

  /**
   * Element Bounds Check.
   *
   * @param {object} boundaries
   */
  const elementBoundsCheck = (boundaries) => {
    const { sideA, sideB, measurementDirection, visible, bounds } = boundaries;
    let objectVisible = 0;

    /**
     * Return true if element is completely visible or if the element is too
     * big for the viewport.
     */
    if (
      (visible[sideA] && visible[sideB]) ||
      (bounds.top < 0 && bounds.bottom > window.innerHeight) ||
      (bounds.left < 0 && bounds.right > window.innerWidth)
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
      if (Array.isArray(callback)) {
        callback[0]();
      } else {
        callback();
        window.removeEventListener('scroll', this.setScroll, false);
        clearInterval(this.scrollListener);
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
  const isInView = () => {
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
      right: bounds.right >= 0 && bounds.right <= window.innerWidth,
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

    const debug = false;
    if (debug) {
      debugMode(bounds, visible, viewport);
    }

    inView =
      elementBoundsCheck(verticalBoundaries) &&
      elementBoundsCheck(horizontalBoundaries);

    checkCallback();

    return inView;
  };
  isInView();

  /**
   * Boundary Listener.
   */
  const addBoundaryListener = () => {
    window.addEventListener('scroll', setScroll, false);
    scrollListener = setInterval(() => {
      if (scrolling) {
        isVisible = isInView();
        scrolling = false;
      }
    }, 20);
  };
  addBoundaryListener();
};

const inViewport = Object.prototype.inViewport;
export default inViewport;
