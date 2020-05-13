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

  selectorA.inViewport(
    175,
    175,
    [
      () => {
        selectorA.classList.add('visible');
        selectorAResult.innerHTML = 'True';
      },
      () => {
        selectorA.classList.remove('visible');
        selectorAResult.innerHTML = 'False';
      },
    ],
    20,
    {
      type: 'pixel',
    }
  );

  selectorB.inViewport(
    0.5,
    0.5,
    [
      () => {
        selectorB.classList.add('visible');
        selectorBResult.innerHTML = 'True';
      },
    ],
    20
  );

  testContainer.inViewport(
    200,
    200,
    [
      () => {
        selectorALine.classList.add('show');
        selectorBLine.classList.add('show');
      },
      () => {
        selectorALine.classList.remove('show');
        selectorBLine.classList.remove('show');
      },
    ],
    20,
    {
      type: 'pixel',
    }
  );
};

viewportExample.init();
