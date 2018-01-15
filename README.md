inViewport
---

A simple, light weight, pure javascript plugin used to determine whether an element is in the viewport. When applying the the inViewport function to an element, you must define how much vertical and horizontal space the element should be showing before returning true. Optional parameter to specify whether to use an elements onscreen percentage or by number of visible pixels.   Based off of the <a href="https://github.com/moagrius/isOnScreen" target="_blank">jQuery.isOncreen</a> plugin with the ability to switch from percentage to pixels.

Please note that you must use a function like a scroll event to keep checking if the element you are tracking is actually in the viewport. On it's own, this plugin only checks if the element is within the viewport and will not provide scroll events. To see an example of this, please scroll down to the example setup section.

See the inViewport.js in action <a href="http://ianrogren.github.io/javascript-inViewport/">here</a>.


### Installation
---
- Download the latest release from here (or `npm install jquery-backdetect` or `bower install jquery-backdetect`).
- Copy either `inviewport.js` or `inviewport.min.js` to your scripts folder.
- That's it!

### Browser Support

| <img src="http://i.imgur.com/dJC1GUv.png" width="48px" height="48px" alt="Chrome logo"> | <img src="http://i.imgur.com/o1m5RcQ.png" width="48px" height="48px" alt="Firefox logo"> | <img src="http://i.imgur.com/8h3iz5H.png" width="48px" height="48px" alt="Internet Explorer logo"> | <img src="http://i.imgur.com/j3tgNKJ.png" width="48px" height="48px" alt="Safari logo"> |
| --- | --- | --- | --- | --- |
| All ✔ | All ✔ | All ✔ | All ✔ |


### Basic Usage

You can append to any element or class:

``` javascript

  // Check element in viewport by percentage
  // 50% horizontally and 50% vertically before firing
  var selectorA = document.getElementById('selectorA');
  selectorA.inViewport(0.5, 0.5);

  // Check element in viewport by pixel count
  // 150px horizontally and 175px vertically before firing
  var selectorB = document.getElementById('selector-B');
  selectorB.inViewport(150, 175, 'pixel');
```


### Custom Options

| Settings | Required | Default Value | Description
| --- | --- | --- | --- |
| x | Required | <pre>null</pre> |  The minimum horizontal value that must be exposed before returning true.  
| y | Required | <pre>null</pre> |  The minimum vertical value that must be exposed before returning true. 
| percentage/pixel | Optional | <pre>percentage</pre> | The option to set the exposure value by either the percentage of the element exposed or by the number of pixels the element is exposed.  By default, this plugin will accept a percentage value from 0 - 1 where 1 is 100%.  To switch over to pixels, use "pixel" as the third argument.


### Example Setup

``` javascript

  var selectorA = document.getElementById('selector-A');
  var selectorAResult = document.getElementById('selector-A-visibility');
  var selectorB = document.getElementById('selector-B');
  var selectorBResult = document.getElementById('selector-B-visibility');
  var scrolling = false;

  // Check if elements are in the viewport.
  function checkView() {
    if (selector_A.inViewport(175, 175, 'pixel')) {
      selectorA.classList.add('visible');
      selectorAResult.innerHTML = 'True';
    } else {
      selectorA.classList.remove('visible');
      selectorAResult.innerHTML = 'False';
    }
    if (selectorB.inViewport(0.5, 0.5)) {
      selectorB.classList.add('visible');
      selectorBResult.innerHTML = 'True';
    } else {
      selectorB.classList.remove('visible');
      selectorBResult.innerHTML = 'False';
    }
  }

  // Detect if user is scrolling.
  window.addEventListener('scroll', function scrollEvent() {
    scrolling = true;
  }, false);

  // Check the view if scrolling every 20 miliseconds.
  setInterval(function checkScroll() {
    if (scrolling === true) {
      checkView();
      scrolling = false;
    }
  }, 20);
```

### Licence 
```

		                    __
                    _,..,_ (, )
                 .,'      `,./
               .' :`.----.': `,
              :   : ^    ^ :   ;
             :   :  6    6  :   ;
             :   :          :   ;
             :   :    __    :   ;
    < MIT >   :   `:'.--.`:'   ;
               `.  : o  o :  .'
                :   `----'   :  
                : .  :'`:  . :
                `.:.'    `.:.' 
```


