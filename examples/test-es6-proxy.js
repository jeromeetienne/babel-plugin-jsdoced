var foo = {}

/**
 * @type {Boolean}
 */
foo.bar	= true;

foo._jsdocedProperties = foo._jsdocedProperties || {}
foo._jsdocedProperties.bar = function(value){ return typeof value === 'boolean' }

var Proxy = require('harmony-proxy');

foo = new Proxy(foo, {
	set: function(object, property, value) {
		if( object._jsdocedProperties && object._jsdocedProperties[property] ){
			var checkingFunction = object._jsdocedProperties[property]
			var isValid = checkingFunction(value)
			console.assert('property', property, 'value', value)			
			// console.log('checking property', property, 'isValid', isValid)
		}
		// The default behavior to store the value
		object[property] = value;
	}
})

foo.bar = false
foo.bar = 100
