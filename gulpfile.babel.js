import browserify from "browserify";
import babelify from "babelify";
import gulp from "gulp";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import eslint from "gulp-eslint";
import mocha from "gulp-mocha";
import uglify from "gulp-uglify";
import rename from "gulp-rename";
import streamify from "gulp-streamify";
import sourcemaps from "gulp-sourcemaps";

import "./tasks/test262";

const header = [
	"/*!",
	" * SandBoxr JavaScript library v<#= pkg.version #>",
	" * (c) Joshua Searles - https://github.com/jrsearles/SandBoxr",
	" * License: Apache 2.0 (http://www.apache.org/licenses/LICENSE-2.0)",
	" */",
	""
].join("\n");

gulp.task("build", ["lint"], () => {
	return browserify({ standalone: "SandBoxr", debug: true })
		.transform(babelify.configure({ optional: ["runtime"], sourceMaps: true }))
		.require("./", { entry: true })
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

gulp.task("release", ["test262", "build"]);

gulp.task("watch", () => {
	gulp.watch("./src/**/*", ["build"]);
});

gulp.task("test", () => {
	return gulp.src("./test/**/*.js")
		.pipe(mocha());
});

gulp.task("lint", () => {
	return gulp.src(["./src/**/*.js"])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task("default", ["build"]);
