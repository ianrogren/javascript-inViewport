/**
 * inViewport Example
 *
 * @format
 */

/* eslint no-undef: 0 */
/* eslint no-var: 0 */
/* eslint prefer-arrow-callback: 0 */
/* eslint-disable comma-dangle */
/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
/* eslint-disable function-paren-newline */

import inViewport from "./inviewport";

document.addEventListener("DOMContentLoaded", () => {
  const verticalScrollContainer = document.querySelector(
    ".vertical-scroll-example"
  );

  const horizontalScrollContainer = document.querySelector(
    ".horizontal-scroll-example"
  );
  const shrug = document.querySelector(".shrug");

  /**
   * Build Verticle Tiles.
   */
  const setupShrug = () => {
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
   *
   * @param {string} orientation
   * @param {object} container
   */
  const buildTiles = (orientation, container) => {
    for (let i = 0; i < 9; i++) {
      const tile = document.createElement("div");
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
  const initializeExample = () => {
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
