/**
 * inViewport.
 *
 * @format
 */

interface OberverConfig {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export function inViewport(
  element: HTMLElement,
  threshold: number | number[],
  callback: Function | Function[],
  advancedConfiguration: OberverConfig | null = null
): void {
  if ('IntersectionObserver' in window && element) {
    const safeRoot =
      advancedConfiguration && advancedConfiguration.root
        ? advancedConfiguration.root
        : null;
    const safeRootMargin =
      advancedConfiguration && advancedConfiguration.rootMargin
        ? advancedConfiguration.rootMargin
        : '0px';

    const config: OberverConfig = {
      root: safeRoot,
      rootMargin: safeRootMargin,
      threshold:
        (Array.isArray(threshold) && threshold.length > 0) ||
        (threshold >= 0 && threshold <= 1)
          ? threshold
          : 0.5,
    };

    /**
     * Observer.
     */
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((change) => {
        if (change.intersectionRatio > 0) {
          if (Array.isArray(callback)) {
            callback[0]();
            if (callback.length === 1) {
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
    }, config);
    observer.observe(element);
  }
}
