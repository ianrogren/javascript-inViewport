/**
 * javascript-inViewport.
 *
 * @format
 */
interface Boundaries {
  bounds: DOMRect;
  sideA: string;
  sideB: string;
  measurementDirection: string;
  viewport: Record<string, number>;
  visible: Record<string, boolean>;
}

/**
 * inViewport.
 */
const inViewport: Function = (
  node: HTMLElement,
  xValue: string | number,
  yValue: string | number,
  callback: Function | Array<Function>
): void => {
  let isVisible: boolean = false;
  let inView: boolean = false;
  let scrolling: boolean = false;
  let scrollListener: any;
  const type: string = isNaN(xValue as any) ? 'pixel' : '';

  /**
   * Set Scroll.
   */
  const setScroll = function setScroll(): void {
    scrolling = true;
  };

  /**
   * Vertical Check.
   */
  const verticalCheck: Function = (boundaries: Boundaries): boolean => {
    const { visible, bounds } = boundaries;
    let element: number = 0;
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
  const horizontalCheck: Function = (boundaries: Boundaries): boolean => {
    const { visible, bounds } = boundaries;
    let element: number = 0;
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
   */
  const elementBoundsCheck: Function = (boundaries: Boundaries): boolean => {
    const { sideA, sideB, measurementDirection, visible, bounds } = boundaries;
    let objectVisible = false;
    const visibleCheck: boolean =
      sideA === 'top' && sideB === 'bottom'
        ? visible.top && visible.bottom
        : visible.right && visible.left;

    /**
     * Return true if element is completely visible or if the element is too
     * big for the viewport.
     */
    if (
      visibleCheck ||
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
   */
  const checkCallback: Function = (): void => {
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
  const isInView: Function = (): boolean => {
    if (!(node instanceof HTMLElement)) {
      return false;
    }

    const bounds: DOMRect = node.getBoundingClientRect();

    const viewport: Record<string, number> = {
      top: window.pageYOffset,
      left: window.pageXOffset,
      bottom: window.pageYOffset + window.innerHeight,
      right: window.pageXOffset + window.innerWidth,
    };

    const visible: Record<string, boolean> = {
      top: bounds.top >= 0 && bounds.top < window.innerHeight,
      bottom: bounds.bottom > 0 && bounds.bottom <= window.innerHeight,
      left: bounds.left >= 0 && bounds.left < window.innerWidth,
      right: bounds.right >= 0 && bounds.right <= window.innerWidth,
    };

    const verticalBoundaries: Boundaries = {
      sideA: 'top',
      sideB: 'bottom',
      measurementDirection: 'height',
      visible,
      viewport,
      bounds,
    };

    const horizontalBoundaries: Boundaries = {
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
  const addBoundaryListener: Function = (): void => {
    window.addEventListener('scroll', setScroll, false);
    scrollListener = window.setInterval((): void => {
      if (scrolling) {
        isVisible = isInView();
        scrolling = false;
      }
    }, 20);
  };
  addBoundaryListener();
};

export default inViewport;
