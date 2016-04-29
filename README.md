# babel-plugin-jsdoced

a babel plugin which use jsdoc to implement strong typing in javascript 
It implements the principle of [jsdoced javascript](http://jsdocedjs.org) as a babel plugin.
It implements strong typing for functions in javascript.
The type of the function arguments and of the return value are checked according to your [jsdoc](http://usejsdoc.org/). 
It is working in browser and node.js. it has source maps.

On top of it it supports [es6 arrow functions](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) too!
If you use react, don't worry it works with jsx without trouble. 

Check it out! [How to install it](https://github.com/jeromeetienne/babel-plugin-jsdoced#installation)

## What is JSDoced Javascript ?
Here is a [Youtube video "JSDoced JS in 1min"](https://youtu.be/W-cdPCNxNJ8), it worth the whole minute :)

or in a single image

![jsdoced javascript in a single image](https://cloud.githubusercontent.com/assets/252962/14639163/e53f682a-0632-11e6-9a06-33b577118e53.jpg)


# Features
- no dependancies
- works in node.js and browser
- support source maps
- works with es2015 and react/jsx
- even works with new es6 arrow function
- easily integrable in modern js tools. browserify/webpack/gulp you name it

# Use cases
- Improve your tests
  - jsdoced javascript will detect a new kind of errors.
  - So this is an additional level of testing
  - better detect those bugs before your users see them :)
- Debug build for library
  - any library provide a minified version and a normal version
  - You can provide a jsdoced version 
  - this debug version contains additional code to help debug.
  - thus people can use this one when developping or testing their own project
  - and hopefully detect errors earlier.
  - Specially interesting when you are learning a library. because you are more likely to do mistakes.
    better for your users :)
  - see [/examples/gulpfile](https://github.com/jeromeetienne/babel-plugin-jsdoced/tree/master/examples/gulpfile) for a example on how to that with gulp

## Installation

```sh
$ npm install babel-plugin-jsdoced
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
{
  "plugins": ["jsdoced"]
}
```

With es6

```js
{
  "presets": ["es2015"],
  "plugins": ["jsdoced"]
}
```

### Via CLI

```sh
$ babel --plugins jsdoced script.js
```

With es6

```sh
$ babel --presets=es2015 --plugins jsdoced ./sample-es6.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["jsdoced"]
});
```
