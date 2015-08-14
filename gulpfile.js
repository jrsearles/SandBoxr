var browserify = require("browserify");
var babelify = require("babelify");
var gulp = require("gulp");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var eslint = require("gulp-eslint");
var mocha = require("gulp-mocha");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var streamify = require("gulp-streamify");
var sourcemaps = require("gulp-sourcemaps");

gulp.task("build", ["lint"], function () {
	return browserify({ standalone: "SandBoxr", debug: true })
		.transform(babelify.configure({ optional: ["runtime"], sourceMaps: true }))
		.require("./src/", { entry: true })
		.bundle()
		.pipe(source("sandboxr.js"))
		.pipe(buffer())
		.pipe(gulp.dest("./dist/"))

		// minified copy
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(streamify(uglify()))
		.pipe(sourcemaps.write("./"))
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
	gulp.watch("./src/**/*.js", ["build", "test"]);
});
