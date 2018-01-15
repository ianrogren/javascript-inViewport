/* eslint-env es5 */
/* eslint no-undef: 0 */
/* eslint no-var: 0 */

var viewportExample = {};
viewportExample.init = function viewportExample() {
  var selector_A = document.getElementById('selector-A');
  var selector_A_result = document.getElementById('selector-A-visibility');
  var selector_B = document.getElementById('selector-B');
  var selector_B_result = document.getElementById('selector-B-visibility');
  var scrolling = false;

  window.addEventListener('scroll', function() {
    scrolling = true;
  }, false);

  setInterval(function checkScroll() {
    if (scrolling === true) {
      checkView();
      scrolling = false;
    }
  }, 20);

  function checkView() {
    if (selector_A.inViewport(175, 175, 'pixel')) {
      selector_A.classList.add('visible');
      selector_A_result.innerHTML = 'True';
    } else {
      selector_A.classList.remove('visible');
      selector_A_result.innerHTML = 'False';
    }
    if (selector_B.inViewport(0.5, 0.5)) {
      selector_B.classList.add('visible');
      selector_B_result.innerHTML = 'True';
    } else {
      selector_B.classList.remove('visible');
      selector_B_result.innerHTML = 'False';
    }
  }
}

(function viewportStartExample() {
  'use strict';

  viewportExample.init();
})();
