<!-- @format -->

# inViewport

A simple to use, light weight 1.8K minified, zero dependency, pure javascript plugin used to determine whether an element has entered within the windows viewport.

See the inViewport.js in action <a href="http://ianrogren.github.io/javascript-inViewport/">here</a>.

## Installation

### npm

```javascript
npm install javascript-inviewport --save
```

### yarn

```javascript
yarn add javascript-inviewport
```

###  Basic Setup

```javascript

// Using import
import 'inviewport';

// Using node require
require('inviewport');

```


## Basic Use

```javascript
const element = document.querySelector('...');

// Toggle in view and out of view.
element.inViewport(xValue, yValue, [inViewCallback(), outOfViewCallback()]);

// Simple non-toggle load in view
element.inViewport(xValue, yValue, callback());


```

### Examples

```javascript
  /**
   * Toggle example.
   * Once 175 pixels is visible horizontally and vertically, 
   * the first callback is fired. The second is fired when less
   * than 175 pixels is visible horizontally or vertically.
   */
  const selectorA = document.getElementById('selector-a');
  selectorA.inViewport('175px', '175px',
    [
      () => { 
        selectorA.classList.add('visible'); 
        console.log('The element is now visible!');
      },
      () => { 
        selectorA.classList.remove('visible'); 
        console.log('The element is now hidden.')
      },
    ]
  );

  /**
   * Static example.
   * Once 50% is visible horizontally and vertically, the 
   * callback is fired.
   */
  const selectorB = document.getElementById('selector-b');
  selectorB.inViewport(0.5, 0.5, () => { 
    selectorB.classList.add('visible'); 
    console.log('The element is now visible!');
  });
```

## Custom Options

| Settings | Required | Default Value | Description |
| --- | --- | --- | --- |
| X-value | Required | `null` | The minimum horizontal value that must be exposed before returning true.  Accepts either a pixel amount as a string works (e.g. '100px') or a number 0 - 1 for a percentage, where 1 is 100% visible.  |
| Y-value | Required | `null` | The minimum vertical value that must be exposed before returning true. Accepts either a pixel amount as a string works (e.g. '100px') or a number 0 - 1 for a percentage, where 1 is 100% visible. |
| Callback | Required | `null`| Accepts either a single function or an array of of one function as a non-toggle callback, or an array of two callback functions, one as an in view callback and another as an out of view callback | 

## Licence

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
