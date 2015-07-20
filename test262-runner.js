var fs = require("fs");
var glob = require("glob");
var colors = require("colors");
var acorn = require("acorn");
var args = require("yargs")
	.default("stopOnFail", false)
	.alias("f", "stopOnFail")
	.default("strict", false)
	.alias("s", "strict")
	.default("verbose", false)
	.alias("v", "verbose")
	.default("chapter", "")
	.alias("ch", "chapter")
	.argv;

var SandBoxr = require("./src/sandboxr");
var verbose = args.verbose;
var stopOnFail = args.stopOnFail;
var strictMode = args.strict;
var chapter = args.chapter;

var root = "test262/test/";
var include = fs.readFileSync("test262-harness.js");

var tests;
if (chapter) {
	chapter = String(chapter);
	chapter = chapter.length === 1 ? "0" + chapter : chapter;
	tests = [root + "suite/ch" + chapter + "/**/*.js"];
} else {
	tests = [
		root + "suite/ch06/**/*.js", 	// passed!
		root + "suite/ch07/**/*.js",	// passed!
		root + "suite/ch08/**/*.js",	// passed! *
		root + "suite/ch09/**/*.js",	// passed!
		root + "suite/ch10/**/*.js",	// passed! *
		root + "suite/ch11/**/*.js",	// passed!
		// root + "suite/ch12/12.6/12.6.2/**/*.js",
		root + "suite/ch13/**/*.js",	// functions	-- passed!
		root + "suite/ch14/**/*.js",	// program	-- passed!
		root + "suite/ch15/15.1/**/*.js",	// global	-- passed
		root + "suite/ch15/15.2/**/*.js",	// object	-- passed
		root + "suite/ch15/15.3/**/*.js",	// function	-- passed
		root + "suite/ch15/15.4/**/*.js",	// array		-- passed - 1
		root + "suite/ch15/15.5/**/*.js",	// string 	-- passed
		root + "suite/ch15/15.6/**/*.js",	// boolean	-- passed
		root + "suite/ch15/15.7/**/*.js",	// number -- passed
		root + "suite/ch15/15.8/**/*.js",	// math	-- passed -1
		root + "suite/ch15/15.9/**/*.js",	// date	-- passed with exceptions
		root + "suite/ch15/15.10/**/*.js",	// regex	-- passed
		root + "suite/ch15/15.11/**/*.js",	// error	-- passed
		root + "suite/ch15/15.12/**/*.js",	// json		-- passed
		root + "suite/annexB/**/*.js",	// passed
		// root + "suite/bestPractice/**/*.js"
	];
}

var exclusions = [
	/S15\.4\.4\.10_A3_T[1-2]\.js$/i,
	/S15\.4\.4\.13_A3_T2\.js$/i,
	/15\.4\.4\.15-3-14\.js$/i,
	/15\.4\.4\.15-5-12\.js$/i,
	/15\.4\.4\.15-5-16\.js$/i,
	/15\.4\.4\.18-3-14\.js$/i,
	/15\.4\.4\.19-3-14\.js$/i,
	/15\.4\.4\.19-3-28\.js$/i,
	/15\.4\.4\.19-3-29\.js$/i,
	/15\.4\.4\.19-3-8\.js$/i,
	/15\.4\.4\.20-3-14\.js$/i,
	/15\.4\.4\.21-3-14\.js$/i,
	/15\.4\.4\.22-3-14\.js/i,
	/S15\.4\.5\.2_A3_T4\.js/i
];

var descriptionRgx = /\*.*@description\s+(.*)\s*\n/i;
var negativeRgx = /\*.*@negative\b/i;
var strictRgx = /\*.*@(?:no|only)Strict\b/i;

var running = true;
var passedCount = 0;
var skippedCount = 0;
var failedCount = 0;

var files, file, contents, description;

for (var i = 0; running && i < tests.length; i++) {
	files = glob.sync(tests[i]);

	for (var j = 0; running && j < files.length && running; j++) {
		file = files[j];

		if (exclusions.some(function (excl) { return excl.test(file); })) {
			testSkipped(file, "Excluded");
			continue;
		}

		contents = fs.readFileSync(file, "utf-8");

		if (negativeRgx.test(contents)) {
			testSkipped(file, "Syntax check");
			continue;
		}

		if (!strictMode && strictRgx.test(contents)) {
			testSkipped(file, "Strict mode");
			continue;
		}

		description = descriptionRgx.exec(contents)[1];

		try {
			testStarting(file, description);

			var ast = acorn.parse(include + contents);
			var runner = new SandBoxr(ast, { parser: acorn.parse });

			runner.execute();
		} catch (err) {
			testFailed(file, description, err);

			if (stopOnFail) {
				running = false;
				break;
			}

			continue;
		}

		testPassed(file, description);
	}
}

if (passedCount) {
	console.log(colors.green("total passed: " + passedCount));
}

if (failedCount) {
	console.log(colors.red("total failed: " + failedCount));
}

if (skippedCount) {
	console.log(colors.blue("total skipped: " + skippedCount));
}

function testStarting (name, desc) {
	if (verbose) {
		console.log(colors.blue("starting: ") + name + " (" + desc + ")");
	}
}

function testPassed (name, desc) {
	if (verbose) {
		console.log(colors.green("passed: ") + name + " (" + desc + ")");
	}

	passedCount++;
}

function testFailed (name, desc, err) {
	console.log(colors.red("failed: ") + name + " (" + desc + ")");
	failedCount++;
}

function testSkipped (name, reason) {
	if (verbose) {
		console.log(colors.blue("skipped: ") + name + " (" + reason + ")");
	}

	skippedCount++;
}
