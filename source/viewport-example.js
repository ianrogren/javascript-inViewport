/**
 * inViewport Example
 *
 * @format
 */

/* eslint no-undef: 0 */
/* eslint no-var: 0 */
/* eslint prefer-arrow-callback: 0 */
/* eslint-disable comma-dangle */

import '../inviewport';

var viewportExample = {};
viewportExample.init = function viewportBuildExample() {
  const selectorA = document.getElementById('selector-A');
  const selectorALine = document.getElementById('selector-A-line');
  const selectorAResult = document.getElementById('selector-A-visibility');
  const selectorB = document.getElementById('selector-B');
  const selectorBLine = document.getElementById('selector-B-line');
  const selectorBResult = document.getElementById('selector-B-visibility');
  const testContainer = document.getElementById('test-container');
  const header = document.getElementsByTagName('header');

  // selectorA.inViewport(
  //   175,
  //   175,
  //   [
  //     () => {
  //       selectorA.classList.add('visible');
  //       selectorAResult.innerHTML = 'True';
  //     },
  //     () => {
  //       selectorA.classList.remove('visible');
  //       selectorAResult.innerHTML = 'False';
  //     },
  //   ],
  //   20,
  //   'pixel'
  // );

  selectorB.inViewport(
    0.5,
    0.5,
    [
      () => {
        selectorB.classList.add('visible');
        selectorBResult.innerHTML = 'True';
      },
      () => {
        selectorB.classList.remove('visible');
        selectorBResult.innerHTML = 'False';
      },
    ],
    20
  );

  // testContainer.inViewport(
  //   200,
  //   200,
  //   [
  //     () => {
  //       selectorALine.classList.add('show');
  //       selectorBLine.classList.add('show');
  //       header[0].classList.add('hide');
  //     },
  //     () => {
  //       selectorALine.classList.remove('show');
  //       selectorBLine.classList.remove('show');
  //       header[0].classList.remove('hide');
  //     },
  //   ],
  //   'pixel',
  //   20
  // );
};

viewportExample.init();
