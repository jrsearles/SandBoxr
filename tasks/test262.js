var path = require("path");
var test262 = require("test262-streamer");
var gulp = require("gulp");
var util = require("gulp-util");
var through = require("through2");
var parser = require("../test/ast-parser");
var args = require("yargs")
	.default("verbose", false)
	.alias("v", "verbose")
	.argv;

var descMatcher = /\*.*@description\s+(.*)\s*\n/i;
var negativeMatcher = /\*.*@negative\b/i;
var verbose = args.verbose;

gulp.task("test262", function () {
	var SandBoxr = require("../dist/sandboxr");

	var results = {
		passed: 0,
		skipped: 0,
		failed: 0
	};

	var failed = util.colors.bold.red("failed:");
	var passed = util.colors.green("passed:");
	var skipped = util.colors.blue("skipped:");

	return test262({ files: ["**/*.js", "!ch15/15.1/**/*.js", "!intl402/**/*.js"] })
		.pipe(through.obj(function (file, enc, cb) {
			var filename = path.basename(file.path);
			var src = file.contents.toString();
			var desc = descMatcher.exec(src);
			desc = desc && desc[1];

			if (negativeMatcher.test(src)) {
				results.skipped++;
				cb();
				return;
			}

			if (verbose) {
				util.log("starting:", filename, "-", desc);
			}

			var ast;
			try {
				ast = parser.parse(src);
			} catch (err) {
				results.failed++;
				cb(null, results);
				return;
			}

			var box = SandBoxr.create(ast, { parser: parser.parse });
			box.execute().then(function (res) {
				if (verbose) {
					util.log(passed, filename);
				}

				results.passed++;
				cb(null, results);
			}, function (err) {
				util.log(failed, filename, "(" + desc + ")", err);
				results.failed++;
				cb(null, results);
			});
		}))
		.on("finish", function () {
			util.log("TOTALS ==============================");
			util.log(passed, results.passed);
			util.log(skipped, results.skipped);
			util.log(failed, results.failed);

			if (results.failed) {
				throw new util.PluginError({
					plugin: "test262",
					message: results.failed + " test(s) failed."
				});
			}
		});
});
