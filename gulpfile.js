var browserify = require("browserify");
var gulp = require("gulp");
var source = require("vinyl-source-stream");
var eslint = require("gulp-eslint");

gulp.task("browserify", ["lint"], function () {
	return browserify("./src/sandboxr.js", { standalone: "SandBoxr" })
		.transform("strictify")
		.bundle()
		.pipe(source("sandboxr.js"))
		.pipe(gulp.dest("./build/"));
});

gulp.task("lint", function () {
	return gulp.src(["./src/**/*.js"])
		.pipe(eslint())
		.pipe(eslint.format());
});

gulp.task("default", ["browserify"]);

gulp.task("watch", function () {
	gulp.watch("./src/**/*.js", ["default"]);
});
