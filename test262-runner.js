var fs = require("fs");
var glob = require("glob");
var colors = require("colors");
var acorn = require("acorn");
var args = require("yargs").argv;

var SandBoxr = require("./src/sandboxr");
var verbose = args.v || args.verbose;
var stopOnFail = true;
var strictMode = args.strict;

var root = "test262/test/";
var include = fs.readFileSync("test262-harness.js");

var tests = [
	// root + "suite/ch06/**/*.js", // passed!
	// root + "suite/ch07/**/*.js",	// passed!
	// root + "suite/ch08/**/*.js",	// passed!
	// root + "suite/ch09/**/*.js",	// passed!
	root + "suite/ch10/**/*.js",
	// root + "suite/ch12/12.8/**/*.js"
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
	console.error(err);

	failedCount++;
}

function testSkipped (name, reason) {
	if (verbose) {
		console.log(colors.blue("skipped: ") + name + " (" + reason + ")");
	}

	skippedCount++;
}
