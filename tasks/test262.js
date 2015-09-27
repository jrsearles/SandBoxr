import SandBoxr from "../";
import path from  "path";
import test262 from "test262-streamer";
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


gulp.task("test262", () => {
	let results = {
		passed: 0,
		skipped: 0,
		failed: 0
	};

	let failed = util.colors.bold.red("failed:");
	let passed = util.colors.green("passed:");
	let skipped = util.colors.blue("skipped:");

	return test262({ files: ["**/*.js", "!ch15/15.1/**/*.js", "!intl402/**/*.js"] })
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
		.on("finish", () => {
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
