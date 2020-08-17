<!-- @format -->

# inViewport

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e236fa46475a4b20a07be51c43ab57ab)](https://app.codacy.com/manual/ian.rogren/javascript-inViewport?utm_source=github.com&utm_medium=referral&utm_content=ianrogren/javascript-inViewport&utm_campaign=Badge_Grade_Dashboard) [![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)

A simple to use, light weight, zero dependency, pure javascript plugin used to determine whether an element has entered within the windows viewport.

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

### Basic Setup

```javascript
// Using import
import inViewport from "javascript-inviewport";

// Using node require
const inViewport = require("javascript-inviewport");
```

## Basic Use

```javascript
const element = document.querySelector("...");

// Toggle in view and out of view.
inViewport(element, xValue, yValue, [inViewCallback(), outOfViewCallback()]);

// Simple non-toggle load in view
inViewport(element, xValue, yValue, callback());
```

### Examples

```javascript
/**
 * Toggle example.
 * Once 175 pixels is visible horizontally and vertically,
 * the first callback is fired. The second callback is fired when less
 * than 175 pixels is visible horizontally or vertically.
 */
const selectorA = document.getElementById("selector-a");
inViewport(selectorA, "175px", "175px", [
  () => {
    selectorA.classList.add("visible");
    console.log("The element is now visible!");
  },
  () => {
    selectorA.classList.remove("visible");
    console.log("The element is now hidden.");
  },
]);

/**
 * Static example.
 * Once 50% is visible horizontally and vertically, the
 * callback is fired.
 */
const selectorB = document.getElementById("selector-b");
inViewport(selectorB, 0.5, 0.5, () => {
  selectorB.classList.add("visible");
  console.log("The element is now visible!");
});
```

## Custom Options

| Settings  | Required | Default Value | Description                                                                                                                                                                                               |
| --------- | -------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HTML node | Required | `null`        | Valid HTML element to check to see if it's in the viewport of the window.                                                                                                                                 |
| X-value   | Required | `null`        | The minimum horizontal value that must be exposed before returning true. Accepts either a pixel amount as a string works (e.g. '100px') or a number as a percentage, where 0 is 0% and 1 is 100% visible. |
| Y-value   | Required | `null`        | The minimum vertical value that must be exposed before returning true. Accepts either a pixel amount as a string works (e.g. '100px') or a number as a percentage, where 0 is 0% and 1 is 100% visible.   |
| Callback  | Required | `null`        | Accepts either a single function or an array as a non-toggle callback, or an array of two callback functions, one as an in view callback and another as an out of view callback                           |
