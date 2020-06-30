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
/* eslint-disable no-unused-vars */

/**
 * inviewport Object Prototype.
 *
 * @param {number} xValue
 * @param {number} yValue
 * @param {Array} callback
 */
const inViewport = (node, xValue, yValue, callback) => {
  let isVisible = false;
  let inView = false;
  let scrolling = false;
  let scrollListener = null;
  const type = isNaN(xValue) && xValue.includes('px') ? 'pixel' : '';

  /**
   * Set Scroll.
   */
  const setScroll = function setScroll() {
    scrolling = true;
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
        if (callback.length === 1) {
          window.removeEventListener('scroll', setScroll, false);
          clearInterval(scrollListener);
        }
      } else {
        callback();
        window.removeEventListener('scroll', setScroll, false);
        clearInterval(scrollListener);
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
    if (!(node instanceof Element) && !(node instanceof HTMLDocument)) {
      return false;
    }

    const bounds = node.getBoundingClientRect();

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

export default inViewport;
