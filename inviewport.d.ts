/** @format */

interface OberverConfig {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

declare function inViewport(
  element: HTMLElement,
  threshold: number | number[],
  callback: Function | Function[],
  advancedConfiguration?: OberverConfig | null
): void;

export = inViewport;
