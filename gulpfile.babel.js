import browserify from "browserify";
import babelify from "babelify";
import gulp from "gulp";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import eslint from "gulp-eslint";
import mocha from "gulp-mocha";
import uglify from "gulp-uglify";
import rename from "gulp-rename";
// import header from "gulp-header";
// import sourcemaps from "gulp-sourcemaps";
import gutil from "gulp-util";
import "./tasks/test262";

// const banner = [
// 	"/**",
// 	" * SandBoxr JavaScript library v<%= pkg.version %>",
// 	" * (c) Joshua Searles - <%= pkg.homepage %>",
// 	" * License: Apache 2.0 (http://www.apache.org/licenses/LICENSE-2.0)",
// 	" */",
// 	""
// ].join("\n");

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

gulp.task("build", () => {
	// let pkg = require("./package.json");
	
	return browserify({standalone: "SandBoxr", debug: false})
		.transform(babelify.configure({optional: ["runtime"]}))
		.require("./", {entry: true})
		.bundle()
		.on("error", gutil.log)
		.pipe(source("sandboxr.js"))
		.pipe(buffer())
		// .pipe(header(banner, {pkg: pkg}))
		.pipe(gulp.dest("./dist"))
	
		.pipe(rename("sandboxr.min.js"))
		// .pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify({preserveComments: "license"}))
		// .pipe(sourcemaps.write("."))
		.pipe(gulp.dest("./dist/"));
});

gulp.task("release", ["test262", "build"]);

gulp.task("watch", () => {
	gulp.watch("./src/**/*", ["build"]);
});

gulp.task("default", ["build"]);
