/**
 * inViewport.
 *
 * @format
 */

interface OberverConfig {
  root: Element | null;
  rootMargin: string;
  threshold: number;
}

export default function inViewport(
  element: HTMLElement,
  threshold: number,
  callback: Function | Function[]
): void {
  if ('IntersectionObserver' in window && element) {
    const config: OberverConfig = {
      root: null,
      rootMargin: '0px',
      threshold: threshold >= 0 && threshold <= 1 ? threshold : 0.5,
    };

    const observer = new IntersectionObserver(onChange, config);
    observer.observe(element);

    /**
     * On Change.
     *
     * @param changes
     * @param observer
     */
    function onChange(changes, observer: IntersectionObserver) {
      changes.forEach((change) => {
        if (change.intersectionRatio > 0) {
          if (Array.isArray(callback)) {
            callback[0]();
            if (callback.length == 1) {
              observer.unobserve(change.target);
            }
          } else {
            callback();
          }
        }

        if (change.isIntersecting === false) {
          if (Array.isArray(callback) && typeof callback[1] === 'function') {
            callback[1]();
          }
        }
      });
    }
  }
}
