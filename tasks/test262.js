import * as SandBoxr from "../";
import path from  "path";
import test262 from "test262-streamer";
import streamer6 from "../../test262-6-streamer";
import gulp from "gulp";
import util from "gulp-util";
import through from "through2";
import * as parser from "../test/ast-parser";
import yargs from "yargs";

let args = 	yargs.default("verbose", false)
	.alias("v", "verbose")
	.argv;

let descMatcher = /\*.*@description\s+(.*)\s*\n/i;
let negativeMatcher = /\*.*@negative\b/i;
let verbose = args.verbose;

let results = {
	passed: 0,
	skipped: 0,
	failed: 0
};

let failed = util.colors.bold.red("failed:");
let passed = util.colors.green("passed:");
let skipped = util.colors.blue("skipped:");
let stopOnFail = false;

function testsCompleted () {
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
}

gulp.task("test262-6", function () {
	let descriptionMatcher = /^description:\s*([\s\S]+)(?:^--)/mi;
	let negMatcher = /^negative:/mi;

	// types +
	// white-space +


	// built-ins
	//	- Object -41
	//	- Number -1 (needs typed arrays)
	//	- Boolean +
	//	- Array -21
	//	- Date -8
	//	- undefined +
	//	- Symbol -2
	//	- String -2
	//	- Error +
	//	- Proxy +
	//	- Reflect +
	//	- Map -11 (needs WeakMap)
	//	- MapIterator +
	//	- Set -8 (needs WeakSet)
	//	- SetIterator +

	return streamer6({ files: ["/built-ins/string/**/*.js"] })
		.pipe(through.obj(function (file, enc, cb) {
			let filename = path.basename(file.path);

			try {
				let src = file.contents.toString();
				let desc = descriptionMatcher.exec(src);
				desc = desc && desc[1];

				if (negMatcher.test(src)) {
					if (verbose) {
						util.log(skipped, filename);
					}

					results.skipped++;
					cb(null, results);
					return;
				}

				let useStrictMatcher = /^flags:.*\bonlystrict\b.*$/mi;
				let useStrict = useStrictMatcher.test(src);

				if (verbose) {
					util.log("starting:", filename, "-", desc);
					util.log("strict:", String(useStrict));
				}

				let parseFn = function (text) { return parser.parse(text, { ecmaVersion: 6 }); };
				let ast = parseFn(src);
				let box = SandBoxr.create(ast, { ecmaVersion: 6, useStrict: useStrict, parser: parseFn });

				// console.log(ast);

				box.execute().then(function (res) {
					if (verbose) {
						util.log(passed, filename);
					}

					results.passed++;
					cb(null, results);
				}, function (err) {
					util.log(failed, filename, err.toString());
					results.failed++;

					cb(stopOnFail ? err : null, results);
				});

			} catch (err) {
				util.log(failed, filename, err.toString());
				cb(stopOnFail ? err : null, results);
			}
		}))
		.on("finish", testsCompleted);
});

gulp.task("test262", () => {
	// "!ch15/15.1/**/*.js",
	return test262({ files: ["**/*.js", "!intl402/**/*.js"] })
		.pipe(through.obj((file, enc, cb) => {
			let filename = path.basename(file.path);
			let src = file.contents.toString();
			let desc = descMatcher.exec(src);
			desc = desc && desc[1];

			if (negativeMatcher.test(src)) {
				results.skipped++;
				cb();
				return;
			}

			if (verbose) {
				util.log("starting:", filename, "-", desc);
			}

			let ast;
			try {
				ast = parser.parse(src);
			} catch (err) {
				results.failed++;
				cb(null, results);
				return;
			}

			let box = SandBoxr.create(ast, { parser: parser.parse });
			box.execute().then(res => {
				if (verbose) {
					util.log(passed, filename);
				}

				results.passed++;
				cb(null, results);
			}, err => {
				util.log(failed, filename, "(" + desc + ")", err);
				results.failed++;
				cb(null, results);
			});
		}))
		.on("finish", testsCompleted);
});
