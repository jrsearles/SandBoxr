var browserify = require("browserify");
var gulp = require("gulp");
var source = require("vinyl-source-stream");
var eslint = require("gulp-eslint");
var mocha = require("gulp-mocha");

gulp.task("browserify", ["lint"], function () {
	return browserify("./src/index.js", { standalone: "SandBoxr" })
		.transform("strictify")
		.bundle()
		.pipe(source("sandboxr.js"))
		.pipe(gulp.dest("./build/"));
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

gulp.task("default", ["browserify"]);

gulp.task("watch", function () {
	gulp.watch("./src/**/*.js", ["test", "browserify"]);
});
