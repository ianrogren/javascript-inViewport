<!-- @format -->

# inViewport

A simple, light weight, zero dependency, pure javascript plugin used to determine whether an element is within the windows viewport.

See the inViewport.js in action <a href="http://ianrogren.github.io/javascript-inViewport/">here</a>.

## Installation

### npm

`npm install javascript-inviewport --save`

### yarn

`yarn add javascript-inviewport`

###  Setup

```javascript

// Using import
import 'inviewport';

// Using node require
require('inviewport');

```


## Examples

```javascript
/**
 * Toggle example.
 * Once 175 pixels is visible horizontally and vertically,
 * the first callback is fired. The second is fired when less
 * than 175 pixels is visible horizontally or vertically.
 */
const selectorA = document.getElementById('selector-a');
selectorA.inViewport(
  175,
  175,
  [
    () => {
      selectorA.classList.add('visible');
      console.log('The element is now visible!');
    },
    () => {
      selectorA.classList.remove('visible');
      console.log('The element is now hidden.');
    },
  ],
  20,
  { type: 'pixel' }
);

/**
 * Static example.
 * Once 50% is visible horizontally and vertically, the
 * callback is fired.
 */
const selectorB = document.getElementById('selector-a');
selectorB.inViewport(
  0.5,
  0.5,
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
| x | Required | <pre>null</pre> | The minimum horizontal value that must be exposed before returning true.  |
| y | Required | <pre>null</pre> | The minimum vertical value that must be exposed before returning true. |
| interval time | Required | <pre>null</pre> | The time in miliseconds to check weather an element within the viewport. Recommmended interval is <pre>20</pre> miliseconds |
| options | Optional | <pre>{ type: 'percentage' }</pre> | The option to set the exposure value by either the percentage of the element exposed or by the number of pixels the element is exposed. By default, this plugin will accept a percentage value from 0 - 1 where 1 is 100% for both the x and y values. To switch over to pixels, update the options to `{type: "pixel"}` |

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
