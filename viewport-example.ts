/**
 * inViewport Example
 *
 * @format
 */

/* eslint no-undef: 0 */
import inViewport from "./inviewport";

document.addEventListener("DOMContentLoaded", (): void => {
  const verticalScrollContainer: HTMLElement | null = document.querySelector(
    ".vertical-scroll-example"
  );

  const horizontalScrollContainer: HTMLElement | null = document.querySelector(
    ".horizontal-scroll-example"
  );
  const shrug: HTMLElement | null = document.querySelector(".shrug");

  /**
   * Build Verticle Tiles.
   */
  const setupShrug: Function = (): void => {
    if (shrug) {
      inViewport(shrug, 0.5, 0.5, [
        () => {
          shrug.classList.add("visible");
        },
        () => {
          shrug.classList.remove("visible");
        },
      ]);
    }
  };

  /**
   * Build Tiles.
   */
  const buildTiles: Function = (
    orientation: string,
    container: HTMLElement
  ): void => {
    for (let i = 0; i < 9; i++) {
      const tile: HTMLElement = document.createElement("div");
      tile.classList.add(orientation);
      container.appendChild(tile);

      if (orientation === "vertical-tile") {
        inViewport(tile, "175px", "175px", [
          () => {
            tile.classList.add("visible");
          },
          () => {
            tile.classList.remove("visible");
          },
        ]);
      } else {
        inViewport(tile, 0.5, 0.5, () => {
          tile.classList.add("visible");
        });
      }
    }
  };

  /**
   * Initialize Example.
   */
  const initializeExample: Function = (): void => {
    if (verticalScrollContainer) {
      buildTiles("vertical-tile", verticalScrollContainer);
    }

    if (horizontalScrollContainer) {
      buildTiles("horizontal-tile", horizontalScrollContainer);
      inViewport(horizontalScrollContainer, 0.01, 0.8, () => {
        horizontalScrollContainer.classList.add("visible");
      });
    }

    setupShrug();
  };
  initializeExample();
});
