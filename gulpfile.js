"use strict";

var browserify = require("browserify");
var babelify = require("babelify");
var gulp = require("gulp");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var eslint = require("gulp-eslint");
var mocha = require("gulp-mocha");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var header = require("gulp-header");

require("./tasks/test262");

var banner = [
  "/**",
  " * SandBoxr JavaScript library v<%= pkg.version %>",
  " * (c) Joshua Searles - <%= pkg.homepage %>",
  " * License: Apache 2.0 (http://www.apache.org/licenses/LICENSE-2.0)",
  " */",
  "", ""
].join("\n");

gulp.task("test", ["build"], function () {
  require("babel-core/register");
  
  return gulp.src("./test/**/*.js")
		.pipe(mocha());
});

gulp.task("lint", function () {
  return gulp.src(["./src/**/*.js"])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task("build", function () {
  var pkg = require("./package.json");
	// browserify -e index.js -s SandBoxr -t babelify -o dist/sandboxr.js
	
  return browserify({
    entries: "./index.js",
    standalone: "SandBoxr"
  }).transform(babelify)
	.bundle()
	.pipe(source("sandboxr.js"))
	.pipe(buffer())
	.pipe(header(banner, { pkg: pkg }))
	.pipe(gulp.dest("./dist"));
});

gulp.task("release", ["build"], function () {
  return gulp.src("./dist/sandboxr.js")
    .pipe(rename("sandboxr.min.js"))
    .pipe(uglify({ preserveComments: "license" }))
    .pipe(gulp.dest("./dist/"));
});

gulp.task("watch", function () {
  gulp.watch(["./src/**/*", "./test/**/*.js"], ["lint", "test"]);
});

gulp.task("default", ["build"]);
