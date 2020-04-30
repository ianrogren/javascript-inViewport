/**
 * inViewport Example
 *
 * @format
 */

/* eslint no-undef: 0 */
/* eslint no-var: 0 */
/* eslint prefer-arrow-callback: 0 */

import '../inviewport';

var viewportExample = {};
viewportExample.init = function viewportBuildExample() {
  console.log('test');

  var selectorA = document.getElementById('selector-A');
  var selectorALine = document.getElementById('selector-A-line');
  var selectorAResult = document.getElementById('selector-A-visibility');
  var selectorB = document.getElementById('selector-B');
  var selectorBLine = document.getElementById('selector-B-line');
  var selectorBResult = document.getElementById('selector-B-visibility');
  var testContainer = document.getElementById('test-container');
  var header = document.getElementsByTagName('header');
  var scrolling = false;

  function checkView() {
    // // Selector A
    // if (selectorA.inViewport(175, 175, 'pixel')) {
    //   selectorA.classList.add('visible');
    //   selectorAResult.innerHTML = 'True';
    // } else {
    //   selectorA.classList.remove('visible');
    //   selectorAResult.innerHTML = 'False';
    // }

    // // Selector B
    // if (selectorB.inViewport(0.5, 0.5)) {
    //   selectorB.classList.add('visible');
    //   selectorBResult.innerHTML = 'True';
    // } else {
    //   selectorB.classList.remove('visible');
    //   selectorBResult.innerHTML = 'False';
    // }

    // // Test Lines
    // if (testContainer.inViewport(200, 200, 'pixel')) {
    //   selectorALine.classList.add('show');
    //   selectorBLine.classList.add('show');
    //   header[0].classList.add('hide');
    // } else {
    //   selectorALine.classList.remove('show');
    //   selectorBLine.classList.remove('show');
    //   header[0].classList.remove('hide');
    // }

    selectorA.inViewport(
      175,
      175,
      () => {
        selectorA.classList.add('visible');
        console.log('is visible');
      },
      'pixel',
      20
    );
  }

  // window.addEventListener(
  //   'scroll',
  //   function () {
  //     scrolling = true;
  //   },
  //   false
  // );

  // setInterval(function checkScroll() {
  //   if (scrolling) {
  //     checkView();
  //     scrolling = false;
  //   }
  // }, 20);

  checkView();
};

viewportExample.init();
