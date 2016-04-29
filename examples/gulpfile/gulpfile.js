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
var sourcemaps = require('gulp-sourcemaps');

var fileNames = [
	'./src/*.js',
]


gulp.task('default', ['build-everything'])
gulp.task('build-everything', ['build-plain', 'build-debug', 'build-minify', 'build-jsdoced'])

//////////////////////////////////////////////////////////////////////////////////
//		Comments
//////////////////////////////////////////////////////////////////////////////////
gulp.task('build-plain', function() {
	gulp.src(fileNames)
		.pipe(concat('nicelib.js'))
		.pipe(gulp.dest('build'))
})

gulp.task('build-debug', function() {
	gulp.src(fileNames)
                .pipe(sourcemaps.init())
                .pipe(eslint({
                        rules: {
                                "valid-jsdoc": ["error", {"requireReturn": false}]
                        },
                }))
                .pipe(eslint.format())
		.pipe(babel({
			plugins : ['jsdoced'],
                        compact : false
		}))
		.pipe(concat('nicelib-debug.js'))
                .pipe(eslint.failOnError())        // Brick on failure to be super strict
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('build'))
})

gulp.task('build-minify', function() {
	gulp.src(fileNames)
		.pipe(concat('nicelib.js'))
		.pipe(minify())
		.pipe(gulp.dest('build'))
})

gulp.task('build-jsdoced', function() {
	gulp.src(fileNames)
		.pipe(babel({
			plugins : ['jsdoced'],
		}))
		.pipe(concat('nicelib-jsdoced.js'))
		.pipe(gulp.dest('build'))
})
