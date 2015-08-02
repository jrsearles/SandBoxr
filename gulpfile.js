var browserify = require("browserify");
var babelify = require("babelify");
var derequire = require("browserify-derequire");
var gulp = require("gulp");
var source = require("vinyl-source-stream");
var eslint = require("gulp-eslint");
var mocha = require("gulp-mocha");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var streamify = require("gulp-streamify");

gulp.task("build", ["lint"], function () {
	return browserify({ standalone: "SandBoxr" })
		.transform(babelify)
		.require("./", { entry: true })
		.bundle()
		.pipe(source("sandboxr.js"))
		.pipe(gulp.dest("./dist/"))

		// minified copy
		.pipe(streamify(uglify()))
		.pipe(rename("sandboxr.min.js"))
		.pipe(gulp.dest("./dist/"));
});

gulp.task("test", function () {
	return gulp.src("./test/**/*.js")
		.pipe(mocha());
});

gulp.task("lint", function () {
	return gulp.src(["./src/**/*.js"])
		.pipe(eslint())
		.pipe(eslint.format());
});

gulp.task("default", ["build"]);

gulp.task("watch", function () {
	gulp.watch("./src/**/*.js", ["test", "build"]);
});
