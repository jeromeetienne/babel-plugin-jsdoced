### How to implement function strong typing in 200lines of javascript.

- [babel jsdoced plugin](https://github.com/jeromeetienne/babel-plugin-transform-jsdoced/blob/master/transform-jsdoced.js) is only 200lines long


i love javascript so much :)

A few time ago, i had this idea of ["jsdoced javascript"](http://jsdocedjs.org/),
aka using jsdoc comment to improve javascript.




### Short intro on babel itself
- [babel](https://babeljs.io) is javascript compiler.
- It is widely used to compile
  [es6/es2015](https://babeljs.io/docs/plugins/preset-es2015/)
  and
  [jsx react](https://babeljs.io/docs/plugins/preset-react/).
- It started a year ago as a [6to5](https://github.com/6to5), an transpiler to convert es2015 to javascript.
- Then it changed its name to babel and became more generic.

- But under the hood, it has a very modular architecture.
- Since version 6, it doesn't provide any plugin by default.
- If you want to do es2015, you install it separately.
