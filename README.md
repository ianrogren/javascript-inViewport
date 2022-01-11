<!-- @format -->

# inViewport

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e236fa46475a4b20a07be51c43ab57ab)](https://app.codacy.com/manual/ian.rogren/javascript-inViewport?utm_source=github.com&utm_medium=referral&utm_content=ianrogren/javascript-inViewport&utm_campaign=Badge_Grade_Dashboard) [![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)

A simple to use, light weight (less than 1KB), zero dependency, pure JavaScript and TypeScript ready plugin that uses the intersection observer to determine whether an element has entered within the windows viewport.  This plugin is very flexible and ideal to use for things like triggering animations, lazy loading images or adding infinite scroll to your site.  It's framework agnostic and can be used with your framework of choice like React, Vue, Svelt, Angular, etc. 

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

### Setup

```javascript
// Using import
import inViewport from 'javascript-inviewport';

// Using node require
const inViewport = require('javascript-inviewport');
```

## Basic Useage

```javascript
const element = document.querySelector('...');

// Toggle in view and out of view.
inViewport(element, threshold, [inViewCallback(), outOfViewCallback()]);

// Simple non-toggle load in view
inViewport(element, threshold, callback());
```

### Examples

```javascript
/**
 * Toggle example.
 * The threshold is set to one in this example so once the element
 * is fully visible the first callback is fired.  The second callback
 * is then fired if the element is no longer fully visible.
 */
const selectorA = document.getElementById('selector-a');
inViewport(selectorA, 1, [
  () => {
    selectorA.classList.add('visible');
    console.log('The element is now visible!');
  },
  () => {
    selectorA.classList.remove('visible');
    console.log('The element is now hidden.');
  },
]);

/**
 * Static example.
 * The threshold in this example is set to 0.5 so once the element
 * is 50% visible, the callback is fired.
 */
const selectorB = document.getElementById('selector-b');
inViewport(selectorB, 0.5, () => {
  selectorB.classList.add('visible');
  console.log('The element is now visible!');
});
```

## Options

| Settings | Type | Required | Default Value | Description |
| --- | --- | --- | --- | --- |
| Element | HTML Element | Required | `null` | HTML element to track and see if it has entered in the viewport of the window. |
| Threshold | number &#124; number[] | Required | `0.5` | Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. If you only want to detect when visibility passes the 50% mark, you can use a value of 0.5. If you want the callback to run every time visibility passes another 25%, you would specify the array [0, 0.25, 0.5, 0.75, 1]. The default is 0 (meaning as soon as even one pixel is visible, the callback will be run). A value of 1.0 means that the threshold isn't considered passed until every pixel is visible. |
| Callback | Function &#124; Function[]   | Required | `null` | Accepts either a single function as a non-toggle callback, or an array of two callback functions, one as an in view callback and another as an out of view callback |
| Config | Object | Optional | Advanced configuration for using the plugin. Please see the advanced configuration section below for more details.


## Advance Configuration

| Settings | Type | Required | Default Value | Description |
| --- | --- | --- | --- | --- |
| root | null &#124; HTML Element | Optional | `window` | The element that is used as the viewport for checking visibility of the target. Must be the ancestor of the target. Defaults to the browser viewport if not specified or if null. |
| rootMargin | string | Optional | `0px` | Margin around the root. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left). The values can be percentages. This set of values serves to grow or shrink each side of the root element's bounding box before computing intersections. Defaults to all zeros. |
| Threshold | number &#124; number[] | Required | `0.5` | Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. Same as threshold setting in main options but can be set in the advanced configuration as well. Advanced configuration threshold setting will take priority if set. |
