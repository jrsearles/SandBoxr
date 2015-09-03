var fs = require("fs");
var util = require("util");
var glob = require("glob");
var async = require("async");
var parser = require("./test/ast-parser");
var winston = require("winston");
var args = require("yargs")
	.default("stopOnFail", false)
	.alias("f", "stopOnFail")
	.default("strict", true)
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

var testGlobs;
if (chapter) {
	chapter = String(chapter);
	chapter = chapter.length === 1 ? "0" + chapter : chapter;
	testGlobs = [root + "suite/ch" + chapter + "/**/*.js"];
} else {
	testGlobs = [
		root + "suite/ch06/**/*.js", 	// passed! +s
		root + "suite/ch07/**/*.js",	// passed! +s
		root + "suite/ch08/**/*.js",	// passed! +s
		root + "suite/ch09/**/*.js",	// passed! +s
		root + "suite/ch10/**/*.js",	// passed! +s
		root + "suite/ch11/**/*.js",	// passed! +s
		root + "suite/ch12/**/*.js",	// passed! +s
		root + "suite/ch13/**/*.js",	// functions	-- passed! +s
		root + "suite/ch14/**/*.js",	// program	-- passed! +s
		root + "suite/ch15/15.1/**/*.js",	// global	-- passed
		root + "suite/ch15/15.2/**/*.js",	// object	-- passed +s
		root + "suite/ch15/15.3/**/*.js",	// function	-- passed +s
		root + "suite/ch15/15.4/**/*.js",	// array		-- passed - 1 +s
		root + "suite/ch15/15.5/**/*.js",	// string 	-- passed +s
		root + "suite/ch15/15.6/**/*.js",	// boolean	-- passed +s
		root + "suite/ch15/15.7/**/*.js",	// number -- passed +s
		root + "suite/ch15/15.8/**/*.js",	// math	-- passed -1 +s
		root + "suite/ch15/15.9/**/*.js",	// date	-- passed with exceptions +s
		root + "suite/ch15/15.10/**/*.js",	// regex	-- passed +s
		root + "suite/ch15/15.11/**/*.js",	// error	-- passed +s
		root + "suite/ch15/15.12/**/*.js",	// json		-- passed +s
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
	/S15\.4\.5\.2_A3_T4\.js/i,
	
	/S15\.1\.2\.2_A8\.js$/i,
	/S15\.1\.2\.3_A6\.js$/i,
	/S15\.1\.3\.1_A2\.5_T1\.js$/i,
	/S15\.1\.3\.1_A2\.1_T1\.js$/i,
	/S15\.1\.3\.2_A2\.1_T1\.js$/i,
	/S15\.1\.3\.2_A2\.5_T1\.js$/i
];

var descriptionRgx = /\*.*@description\s+(.*)\s*\n/i;
var negativeRgx = /\*.*@negative\b/i;
var strictRgx = /\*.*@(?:no|only)Strict\b/i;

async.map(testGlobs, glob, start);

function initLog () {
	return new winston.Logger({
		transports: [
			new winston.transports.Console({ level: logLevel, colorize: true }),
			new winston.transports.File({ level: "verbose", filename: "test262.log" })
		]
	});
}

function resetLog (cb) {
	fs.exists(logFileName, function (exists) {
		if (exists) {
			fs.unlink(logFileName, function () { cb(null, initLog()); });
		} else {
			cb(null, initLog());
		}
	});
}

function start (err, files) {
	// flatten array
	files = Array.prototype.concat.apply([], files);

	async.series({
		logger: resetLog,
		include: function (cb) { fs.readFile("test262-harness.js", cb); }
	}, function (err, results) {
		results.files = files;
		runTests(results);
	});	
}

function runTests (config) {
	var logger = config.logger;
	
	async.mapLimit(config.files, 5, function (file, cb) {
		var result = { file: file, skipped: false, passed: false };
		
		if (exclusions.some(function (excl) { return excl.test(file); })) {
			testSkipped(logger, file, "Excluded");
			result.skipped = true;
			return cb(null, result);
		}
		
		fs.readFile(file, "utf-8", function (err, contents) {
	
			if (negativeRgx.test(contents)) {
				testSkipped(logger, file, "Syntax check");
				result.skipped = true;
				return cb(null, result);
			}
		
			if (!strictMode && strictRgx.test(contents)) {
				testSkipped(logger, file, "Strict mode");
				result.skipped = true;
				return cb(null, result);
			}
		
			var startTime = Date.now();
			var descriptionMatch = descriptionRgx.exec(contents);
			var description = descriptionMatch && descriptionMatch[1];
			testStarting(logger, file, description);
			
			var prefix = "";
			if (strictMode) {
				// need to verify if strict is used at top level and move to top if so
				var code = parser.parse(contents);
				var node = code.body[0];
				if (node 
					&& node.type === "ExpressionStatement"
					&& node.expression.type === "Literal"
					&& node.expression.value === "use strict") {
					prefix = "\"use strict\";";
				}
			}
			
			var ast = parser.parse(prefix + config.include + contents);
			var runner = SandBoxr.create(ast, { parser: parser.parse });
		
			runner.execute().then(function () {
				var duration = Date.now() - startTime;
				
				result.passed = true;
				testPassed(logger, file, description, duration);
				cb(null, result);
			}, function (err) {
				var duration = Date.now() - startTime;
				
				testFailed(logger, file, description, err, duration);
				cb(stopOnFail ? err : null, result);
			});
		});
	}, function (err, results) {
		var passedCount = 0;
		var skippedCount = 0;
		var failedCount = 0;
		
		results.forEach(function (result) {
			passedCount += result.passed ? 1 : 0;
			skippedCount += result.skipped ? 1 : 0;
			failedCount += !result.passed && !result.skipped ? 1 : 0;	
		});

		if (passedCount) {
			logger.info("total passed: " + passedCount);
		}
		
		if (failedCount) {
			logger.error("total failed: " + failedCount);
		}
		
		if (skippedCount) {
			logger.info("total skipped: " + skippedCount);
		}
	});
}

function testStarting (logger, name, desc) {
	logger.verbose("starting: %s (%s)", name, desc);
}

function testPassed (logger, name, desc, duration) {
	logger.verbose("passed: %s (%s) - (%s ms)", name, desc, duration);
}

function testFailed (logger, name, desc, err) {
	logger.error("failed: %s (%s)", name, desc);
}

function testSkipped (logger, name, reason, duration) {
	logger.verbose("skipped: %s (%s) - (%s ms)", name, reason, duration);
}
