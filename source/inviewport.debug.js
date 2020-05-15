/**
 * Debug Mode.
 *
 * @format
 * @param {object} bounds
 * @param {object} visible
 * @param {object} viewport
 */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable comma-dangle */

export const debugMode = (bounds, visible, viewport) => {
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
