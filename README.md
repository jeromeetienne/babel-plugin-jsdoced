# babel-plugin-transform-jsdoced

a babel plugin which use jsdoc to implement strong typing in javascript 
It implements the principle of [jsdoced javascript](http://jsdocedjs.org) as a babel plugin.
It implements strong typing for functions in javascript.
The type of the function arguments and of the return value are checked according to your [jsdoc](http://usejsdoc.org/). 
It is working in browser and node.js. it has source maps.

On top of it it supports [es6 arrow functions](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) too!
If you use react, don't worry it works with jsx without trouble. 

Check it out! 

Here is a [Youtube video "JSDoced JS in 1min"](https://youtu.be/W-cdPCNxNJ8), it worth the whole minute :)

## JSDoced Javascript in a single image
![jsdoced javascript in a single image](https://cloud.githubusercontent.com/assets/252962/14639163/e53f682a-0632-11e6-9a06-33b577118e53.jpg)


## Installation

```sh
$ npm install babel-plugin-transform-jsdoced
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
{
  "plugins": ["transform-jsdoced"]
}
```

With es6

```js
{
  "presets": ["es2015"],
  "plugins": ["transform-jsdoced"]
}
```

### Via CLI

```sh
$ babel --plugins transform-jsdoced script.js
```

With es6

```sh
$ babel --presets=es2015 --plugins transform-jsdoced ./sample-es6.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-jsdoced"]
});
```
