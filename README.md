inViewport
---

A simple, light weight, pure javascript plugin used to determine whether an element is in the viewport. When applying the the inViewport function to an element, you must define how much vertical and horizontal space the element should be showing before returning true. Optional parameter to specify whether to use an elements onscreen percentage or by number of visible pixels.   Based off of the <a href="https://github.com/moagrius/isOnScreen" target="_blank">jQuery.isOncreen</a> plugin with the ability to switch from percentage to pixels.

Please note that you must use a function like a scroll event to keep checking if the element you are tracking is actually in the viewport. On it's own, this plugin only checks if the element is within the viewport and will not provide scroll events. To see an example of this, please scroll down to the example setup section.

See the inViewport.js in action <a href="http://ianrogren.github.io/javascript-inViewport/">here</a>.


### Installation
---
- Download the latest release from here (or `npm install javascript-inviewport` or `bower install javascript-inviewport`).
- Copy either `inviewport.js` or `inviewport.min.js` to your scripts folder.
- That's it!


### Browser Support

| Chrome | Firefox | Internet Explorer | Safari |
| --- | --- | --- | --- |
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

| Settings | Required | Default Value | Description |
| --- | --- | --- | --- |
| x | Required | <pre>null</pre> |  The minimum horizontal value that must be exposed before returning true. |
| y | Required | <pre>null</pre> |  The minimum vertical value that must be exposed before returning true. |
| percentage/pixel | Optional | <pre>percentage</pre> | The option to set the exposure value by either the percentage of the element exposed or by the number of pixels the element is exposed.  By default, this plugin will accept a percentage value from 0 - 1 where 1 is 100%.  To switch over to pixels, use "pixel" as the third argument. |


### Example Setup

``` javascript

  var selectorA = document.getElementById('selector-A');
  var selectorB = document.getElementById('selector-B');
  var scrolling = false;

  // Check if elements are in the viewport.
  function checkView() {
    if (selectorA.inViewport(175, 175, 'pixel')) {
      // Add 'visible' class when more then 175 pixels of 
      // selectorA are visible vertically and horizontally.
      selectorA.classList.add('visible');
    } else {
      // Remove 'visible' class from selectorA when less than
      // 175 pixels are in viewport verticlaly and horizontally.
      selectorA.classList.remove('visible');
    }
    if (selectorB.inViewport(0.5, 0.5)) {
      // Add 'visible' class when more then 50% of selectorB is 
      // visible vertically and horizontally.
      selectorB.classList.add('visible');
    } else {
      // Remove 'visible' class when less than 50% of
      // selectorB is in viewport verticlaly and horizontally.
      selectorB.classList.remove('visible');
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


