var yargs = require("yargs");
var acorn = require("acorn");
var through = require("through2");
var gulp = require("gulp");
var gutil = require("gulp-util");
var path = require("path");

var args = 	yargs.default("verbose", false)
	.alias("v", "verbose")
	.argv;

var descMatcher = /\*.*@description\s+(.*)\s*\n/i;
var negativeMatcher = /\*.*@negative\b/i;
var verbose = args.verbose;

var results = {
	passed: 0,
	skipped: 0,
	failed: 0
};

var failed = gutil.colors.bold.red("failed:");
var passed = gutil.colors.green("passed:");
var skipped = gutil.colors.blue("skipped:");
var stopOnFail = false;

function testsCompleted () {
	gutil.log("TOTALS ==============================");
	gutil.log(passed, results.passed);
	gutil.log(skipped, results.skipped);
	gutil.log(failed, results.failed);

	if (results.failed) {
		throw new gutil.PluginError({
			plugin: "test262",
			message: results.failed + " test(s) failed."
		});
	}
}

gulp.task("test262-6", ["build"], function () {
	var SandBoxr = require("../dist/sandboxr");
	var descriptionMatcher = /^description:\s*([\s\S]+)(?:^--)/mi;
	var negMatcher = /^negative:/mi;
	var streamer6 = require("../../test262-6-streamer");
	
	// types +
	// white-space +


	// built-ins
	//	- Object -20
	//	- Number -1 (needs typed arrays)
	//	- Boolean +
	//	- String -10
	//	- Array -10
	//	- Date -16
	//	- Map -10 (needs WeakMap)
	//	- MapIteratorPrototype +
	//	- Set -7 (needs WeakSet)
	//	- SetIteratorPrototype +
	//	- undefined +
	//	- Reflect +		
	//	- Symbol -4
	//	- Error +
	
	//	- Proxy +


	return streamer6({ files: ["/built-ins/Proxy/**/*.js"] })
		.pipe(through.obj(function (file, enc, cb) {
			var filename = path.basename(file.path);

			try {
				var src = file.contents.toString();
				var desc = descriptionMatcher.exec(src);
				desc = desc && desc[1];

				if (negMatcher.test(src)) {
					if (verbose) {
						gutil.log(skipped, filename);
					}

					results.skipped++;
					cb(null, results);
					return;
				}

				var useStrictMatcher = /^flags:.*\bonlystrict\b.*$/mi;
				var useStrict = useStrictMatcher.test(src);

				if (verbose) {
					gutil.log("starting:", filename, "-", desc);
					gutil.log("strict:", String(useStrict));
				}

				var parseFn = function (text) { return acorn.parse(text, { ecmaVersion: 6 }); };
				var ast = parseFn(src);
				var box = SandBoxr.create(ast, { ecmaVersion: 6, useStrict: useStrict, parser: parseFn });

				box.execute();
				if (verbose) {
					gutil.log(passed, filename);
				}

				results.passed++;
				cb(null, results);
			} catch (err) {
				results.failed++;
				
				gutil.log(failed, filename, err.toString());
				cb(stopOnFail ? err : null, results);
			}
		}))
		.on("finish", testsCompleted);
});

gulp.task("test262", ["build"], function () {
	var SandBoxr = require("../dist/sandboxr");
	var test262 = require("../../test262-5-streamer");
	var base = path.join(__dirname, "../../test262/test/suite/");
	
	// "!ch15/15.1/**/*.js",
	return test262({ files: ["**/*.js", "!ch15/15.1/**/*.js", "!intl402/**/*.js"], base: base })
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
				gutil.log("starting:", filename, "-", desc);
			}

			var ast;
			try {
				ast = acorn.parse(src);
			} catch (err) {
				results.failed++;
				cb(null, results);
				return;
			}

			var box = SandBoxr.create(ast, { parser: acorn.parse, useStrict: file.useStrict });

			try {
				box.execute();
				if (verbose) {
					gutil.log(passed, filename);
				}

				results.passed++;
				cb(null, results);
			} catch (err) {
				if ("toNative" in err) {
					err = err.toNative();
				}
				
				gutil.log(failed, filename, "(" + desc + ")", err);
				results.failed++;
				cb(null, results);
			}
		}))
		.on("finish", testsCompleted);
});
