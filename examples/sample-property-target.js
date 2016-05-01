var foo = new Proxy({
        /**
         * great salutation
         * @type {String}
         */
        message: 'hello world',
        command: 'run',
	_jsdocedProperties : {
		message: function(value){ return typeof message === 'string' },
	}
}, {
	set: function(object, property, value) {
		if( object._jsdocedProperties && object._jsdocedProperties[property] ){
			var checkingFunction = object._jsdocedProperties[property]
			var isValid = checkingFunction(value)
			console.assert(isValid, 'property "'+property+ '" value is invalid')
		}

		// The default behavior to store the value
		object[property] = value;
	}
})

/**
 * @type {Boolean}
 */
foo._jsdocedProperties = foo._jsdocedProperties || {}
foo._jsdocedProperties.bar = function(value){ return typeof value === 'boolean' }
foo.bar	= 100
