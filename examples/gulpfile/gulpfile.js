/**
 * Example of gulpfile.js 
 */

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


gulp.task('default', ['build-everything']);
gulp.task('build-everything', ['build-bundle', 'build-debug', 'build-minify']);

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
		.pipe(concat('nicelib-bundle.js'))
		.pipe(minify())
		.pipe(gulp.dest('build'))
});
