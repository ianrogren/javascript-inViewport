# inViewport
---

A simple, light weight, zero dependency, pure javascript plugin used to determine whether an element is within the windows viewport. 

Please note that you must use a function like a scroll event to keep checking if the element you are tracking is actually in the viewport. On it's own, this plugin only checks if the element is within the viewport and will not provide scroll events. To see an example of this, please scroll down to the example setup section.

See the inViewport.js in action <a href="http://ianrogren.github.io/javascript-inViewport/">here</a>.


# Installation
---
- Either clone or download directly from this repo or you can use npm to get the latest release:
  `npm install javascript-inviewport --save`
- Copy either `inviewport.min.js` to your scripts folder or use `import 'inviewport' or `require('inviewport')`.
- That's it!


# Browser Support

| Chrome | Firefox | Internet Explorer | Safari |
| ------ | ------- | ----------------- | ------ |
| All ✔  | All ✔   | 11+ ✔             | All ✔  |


# Basic Usage

You can append to any element or class:

``` javascript
  /**
   * Toggle example.
   * Once 175 pixels is visible horizontally and vertically, 
   * the first callback is fired. The second is fired when less
   * than 175 pixels is visible horizontally or vertically.
   */
  const selectorA = document.getElementById('selector-a');
  selectorA.inViewport(175, 175,
    [
      () => { 
        selectorA.classList.add('visible'); 
        console.log('The element is now visible!');
      },
      () => { 
        selectorA.classList.remove('visible'); 
        console.log('The element is now hidden.')
      },
    ],
    20, { type: 'pixel' }
  );

  /**
   * Static example.
   * Once 50% is visible horizontally and vertically, the 
   * callback is fired.
   */
  const selectorB = document.getElementById('selector-a');
  selectorB.inViewport(0.5, 0.5,
    [
      () => { 
        selectorB.classList.add('visible'); 
        console.log('The element is now visible!');
      },
    ],
    20
  );
```


## Custom Options

| Settings | Required | Default Value | Description |
| --- | --- | --- | --- |
| x | Required | <pre>null</pre> |  The minimum horizontal value that must be exposed before returning true.|
| y | Required | <pre>null</pre> |  The minimum vertical value that must be exposed before returning true. |
| interval time | Required | <pre>null</pre> | The time in miliseconds to check weather an element within the viewport.  Recommmended interval is <pre>20</pre> miliseconds |
| percentage/pixel | Optional | <pre>percentage</pre> | The option to set the exposure value by either the percentage of the element exposed or by the number of pixels the element is exposed.  By default, this plugin will accept a percentage value from 0 - 1 where 1 is 100%.  To switch over to pixels, use "pixel" as the third argument. |


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


