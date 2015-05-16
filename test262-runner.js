var fs = require("fs");
var glob = require("glob");
var colors = require("colors");
var acorn = require("acorn");
var SandBoxr = require("./src/sandboxr");
var verbose = false;
var stopOnFail = true;
var strictMode = false;

var root = "test262/test/";
var include = fs.readFileSync("test262-harness.js");

var tests = [
	root + "suite/ch06/**/*.js",
	//root + "suite/ch07/7.7/**/*.js",
	root + "suite/ch08/**/*.js",
	root + "suite/ch12/12.8/**/*.js"
];

var descriptionRgx = /\*.*@description\s+(.*)\s*\n/i;
var negativeRgx = /\*.*@negative\b/i;
var onlyStrictRgx = /\*.*@onlyStrict\b/i;

var running = true;
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

		if (!strictMode && onlyStrictRgx.test(contents)) {
			testSkipped(file, "Strict mode");
			continue;
		}

		description = descriptionRgx.exec(contents)[1];

		try {	
			var ast = acorn.parse(include + contents);
			var runner = new SandBoxr(ast);

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

function testPassed (name, desc) {
	if (verbose) {
		console.log(colors.green("passed: ") + name + " (" + desc + ")");
	}
}

function testFailed (name, desc, err) {
	console.log(colors.red("failed: ") + name + " (" + desc + ")");
	console.error(err);
}

function testSkipped (name, reason) {
	if (verbose) {
		console.log(colors.blue("skipped: ") + name + " (" + reason + ")");
	}
}
