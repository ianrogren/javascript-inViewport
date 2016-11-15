var viewportTest = {};

viewportTest.init = function () {

	var selector_A 				= document.querySelector('#selector-A'),
			selector_A_result = document.querySelector('#selector-A-visibility'),
			selector_B 				= document.querySelector('#selector-B'),
			selector_B_result = document.querySelector('#selector-B-visibility'),
			did_scroll 				= false;

			console.log(selector_A);

			window.addEventListener('scroll', function(event){
				did_scroll = true;
			}, false);

			setInterval(function(){
				if (did_scroll === true) {
					checkView();
					did_scroll = false;
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

(function(){
	"use strict";
	viewportTest.init();
});