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

import '../inviewport';

document.addEventListener('DOMContentLoaded', () => {
  const verticalScrollContainer = document.querySelector(
    '.vertical-scroll-example'
  );
  const horizontalScrollContainer = document.querySelector(
    '.horizontal-scroll-example'
  );
  const shrug = document.querySelector('.shrug');

  /**
   * Build Verticle Tiles.
   */
  const setupShrug = () => {
    if (shrug) {
      console.log(shrug);

      shrug.inViewport(
        0.5,
        0.5,
        [
          () => {
            shrug.classList.add('visible');
          },
          () => {
            shrug.classList.remove('visible');
          },
        ],
        20
      );
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
      const tile = document.createElement('div');
      tile.classList.add(orientation);
      container.appendChild(tile);

      if (orientation === 'vertical-tile') {
        tile.inViewport(
          175,
          175,
          [
            () => {
              tile.classList.add('visible');
            },
            () => {
              tile.classList.remove('visible');
            },
          ],
          20,
          { type: 'pixel' }
        );
      } else {
        tile.inViewport(
          0.5,
          0.5,
          [
            () => {
              tile.classList.add('visible');
            },
          ],
          20
        );
      }
    }
  };

  /**
   * Reset Horizontal Tiles.
   */
  const resetHorizontalTiles = () => {
    const tiles = document.querySelectorAll('.horizontal-tile');
    if (tiles.length > 0) {
      tiles.forEach((tile) => {
        tile.classList.remove('visible');
      });
    }
  };

  /**
   * Initialize Example.
   */
  const initializeExample = () => {
    if (verticalScrollContainer) {
      buildTiles('vertical-tile', verticalScrollContainer);
    }

    if (horizontalScrollContainer) {
      buildTiles('horizontal-tile', horizontalScrollContainer);
      horizontalScrollContainer.inViewport(
        0.01,
        0.8,
        [
          () => {
            horizontalScrollContainer.classList.add('visible');
          },
          () => {
            horizontalScrollContainer.classList.remove('visible');
            resetHorizontalTiles();
          },
        ],
        20
      );
    }

    setupShrug();
  };
  initializeExample();
});
