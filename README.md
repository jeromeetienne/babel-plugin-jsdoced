# babel-plugin-transform-jsdoced

It implements the principle of [jsdoced javascript](http://jsdocedjs.org) as a babel plugin
It implements strong typing for functions in javascript.
The type of the function arguments and of the return value are checked. 
It supports [es6 arrow functions](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) too! 

If you use react, don't worry it works with jsx without trouble. It has source maps, it is working in browser and node.js. check it out!



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
