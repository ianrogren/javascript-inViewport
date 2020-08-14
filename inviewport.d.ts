declare module "javascript-inviewport" {
  export function inViewport(
    node: HTMLElement,
    xValue: string | number,
    yValue: string | number,
    callback: Function | Array<Function>
  ): void;
}
