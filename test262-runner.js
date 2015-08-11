var fs = require("fs");
var util = require("util");
var glob = require("glob");
var parser = require("./test/ast-parser");
var winston = require("winston");
var Promise = require("core-js/es6/promise");
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

var SandBoxr = require("./dist/sandboxr");
var logLevel = args.verbose ? "verbose" : "info";
var stopOnFail = args.stopOnFail;
var strictMode = args.strict;
var chapter = args.chapter;

var logFileName = "test262.log";
var root = "test262/test/";
var include = fs.readFileSync("test262-harness.js");

if (fs.existsSync(logFileName)) {
	fs.unlinkSync(logFileName);
}

var logger = new winston.Logger({
	transports: [
		new winston.transports.Console({ level: logLevel, colorize: true }),
		new winston.transports.File({ level: "verbose", filename: "test262.log" })
	]
});

var testGlobs;
if (chapter) {
	chapter = String(chapter);
	chapter = chapter.length === 1 ? "0" + chapter : chapter;
	testGlobs = [root + "suite/ch" + chapter + "/**/*.js"];
} else {
	testGlobs = [
		root + "suite/ch06/**/*.js", 	// passed!
		root + "suite/ch07/**/*.js",	// passed!
		root + "suite/ch08/**/*.js",	// passed! *
		root + "suite/ch09/**/*.js",	// passed!
		root + "suite/ch10/**/*.js",	// passed! *
		root + "suite/ch11/**/*.js",	// passed!
		root + "suite/ch12/**/*.js",
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
		root + "suite/bestPractice/**/*.js"
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
var execs = [];

var tests = Array.prototype.concat.apply([], testGlobs.map(function (pattern) { return glob.sync(pattern); }));

function runOne () {
	if (!tests.length) {
		return testsCompleted();
	}
	
	var file = tests.shift();
	
	if (exclusions.some(function (excl) { return excl.test(file); })) {
		testSkipped(file, "Excluded");
		return runOne();
	}

	contents = fs.readFileSync(file, "utf-8");

	if (negativeRgx.test(contents)) {
		testSkipped(file, "Syntax check");
		return runOne();
	}

	if (!strictMode && strictRgx.test(contents)) {
		testSkipped(file, "Strict mode");
		return runOne();
	}

	description = descriptionRgx.exec(contents)[1];

	testStarting(file, description);

	var ast = parser.parse(include + contents);
	var runner = new SandBoxr(ast, { parser: parser.parse });

	runner.execute().then(function () {
		testPassed(file, description);
	}, function (err) {
		testFailed(file, description, err);
	}).then(runOne, runOne);
}

runOne();

function testsCompleted () {
	if (passedCount) {
		logger.info("total passed: " + passedCount);
	}
	
	if (failedCount) {
		logger.error("total failed: " + failedCount);
	}
	
	if (skippedCount) {
		logger.info("total skipped: " + skippedCount);
	}	
}

function testStarting (name, desc) {
	logger.verbose("starting: %s (%s)", name, desc);
}

function testPassed (name, desc) {
	logger.verbose("passed: %s (%s)", name, desc);
	passedCount++;
}

function testFailed (name, desc, err) {
	logger.error("failed: %s (%s)", name, desc);
	failedCount++;
}

function testSkipped (name, reason) {
	logger.verbose("skipped: %s (%s)", name, reason);
	skippedCount++;
}
