<!-- @format -->

# inViewport

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/f5bd52dda49a4a40b505c0478cd78773)](https://www.codacy.com/gh/ianrogren/javascript-inViewport/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ianrogren/javascript-inViewport&amp;utm_campaign=Badge_Grade)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)
![Badgen Minzipped](https://badgen.net/bundlephobia/minzip/javascript-inviewport)

A simple to use, light weight (less than 600B gzipped), zero dependency, pure JavaScript and TypeScript ready plugin that uses the intersection observer to determine whether an element has entered within the windows viewport.  This plugin is very flexible and performant, ideal to use for things like triggering animations, lazy loading images or adding infinite scroll to your site.  It's framework agnostic and can be used directly with your framework of choice like React, Vue, Svelt, Angular, etc. 

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

> ### ⚠️ Intersection Observer
> This plugin uses the intersection observer which is widely supported in most modern web browsers. Fortunately for browsers that do not support the intersection observer there are polyfills that can help. [IntersectionObserver polyfill](https://www.npmjs.com/package/intersection-observer) is a recommended polyfill to help with unsupported browsers.


## Setup

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

// Advanced configuration settings
const advancedConfig = {
  root: document.querySelector('...'),
  rootMargin: "10px 20px 30px 40px"
}

inViewport(
  element, threshold, [inViewCallback(), outOfViewCallback()], advancedConfig
);
```

### Examples

#### Toggle example.
In this example, the threshold is set to `1` in this example so once the element is fully visible the first callback is fired.  The second callback is then fired if the element is no longer fully visible. For this example, the intersection observer continues to observe the element and will toggle functions as long as the user is on the page.
 
```javascript

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
```

#### Non-toggle example.
In this example, the threshold is set to `0.5` so once the element is at least 50% visible, the callback is then fired.  Once the callback is fired, the intersection observer no longer observes element.

```javascript
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
| Threshold | number &#124; number[] | Required | `0.5` | Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. If you only want to detect when visibility passes the 50% mark, you can use a value of 0.5. If you want the callback to run every time visibility passes another 25%, you would specify the array [0, 0.25, 0.5, 0.75, 1]. The default is 0.5 (meaning as soon as half the element is visible, the callback will be run). A value of 1.0 means that the threshold isn't considered passed until every pixel is visible. |
| Callback | Function &#124; Function[] | Required | `null` | Accepts either a single function as a non-toggle callback, or an array of two callback functions, one as an in view callback and another as an out of view callback |
| Config | Object | Optional | `null` | Advanced configuration for using the plugin. Please see the advanced configuration section below for more details.


## Advanced Configuration

| Settings | Type | Required | Default Value | Description |
| --- | --- | --- | --- | --- |
| root | null &#124; HTML Element | Optional | `window` | The element that is used as the viewport for checking visibility of the target. Must be the ancestor of the target. Defaults to the browser viewport if not specified or if null. |
| rootMargin | string | Optional | `0px` | Margin around the root. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left). The values can be percentages. This set of values serves to grow or shrink each side of the root element's bounding box before computing intersections. Defaults to all zeros. |
