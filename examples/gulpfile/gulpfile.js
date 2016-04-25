/**
 * Example of gulpfile.js
 */

/**
 * @TODO move the build embedded assets to a /bin
 * @TODO find what is contained in four.js dist
 * @TODO try to see if you can produce a -debug.js with eslint + jsdoced and sourcemap
 * @TODO try with webpack
 *
 * ## /build
 * - four.js
 * - four-debug.js
 * - four-min.js
 */

'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var filter = require('gulp-filter');
var notify = require('gulp-notify');
var eslint = require('gulp-eslint');


var fileNames = [
	'./src/isOdd.js',
]


gulp.task('build-bundle', function() {
	gulp.src(fileNames)
		.pipe(concat('nicelib-bundle.js'))
		.pipe(gulp.dest('build'))
});

gulp.task('build-debug', function() {
	gulp.src(fileNames)
                // .pipe(notify("Found file: <%= file.relative %>!"))
                .pipe(eslint({
                        rules: {
                                "valid-jsdoc": ["error", {"requireReturn": false}]
                        },
                }))
                .pipe(eslint.format())
		.pipe(babel({
			plugins : ['transform-jsdoced'],
                        compact : false
		}))
		.pipe(concat('nicelib-debug.js'))
                .pipe(eslint.failOnError())        // Brick on failure to be super strict
		.pipe(gulp.dest('build'))
});

gulp.task('build-minify', function() {
	gulp.src(fileNames)
		.pipe(concat('nicelib.js'))
		.pipe(minify())
		.pipe(gulp.dest('build'))
});
