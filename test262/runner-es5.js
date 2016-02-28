var path = require("path");
var fs = require("fs");
var vfs = require("vinyl-fs");
var acorn = require("acorn");
var SandBoxr = require("../dist/sandboxr");
var through = require("through2");
var gutil = require("gulp-util");
var yargs = require("yargs");

var args = 	yargs.default("verbose", false)
	.alias("v", "verbose")
	.default("in", "**/*.js")
	.alias("i", "in")
	.argv;

var failed = gutil.colors.bold.red("failed:");
var passed = gutil.colors.green("passed:");
var skipped = gutil.colors.blue("skipped:");

var harness = acorn.parse(fs.readFileSync(path.join(__dirname, "harness-es5.js")), { ecmaVersion: 5 });

var root = path.join(__dirname, "../../test262/test/suite/");
var results = [];
var verbose = args.verbose;

function getInfo (file) {
  var info = {
    src: file.contents.toString(),
    filename: path.basename(file.path)
  };

  info.negative = (/@negative/).test(info.src);

  var descMatch = (/@description\s+([^\n]*)/).exec(info.src);
  if (descMatch) {
    info.description = descMatch[1];
  }

  return info;
}

vfs.src("ch15/15.1/**/*.js", { cwd: root })
  .pipe(through.obj(function (file, enc, cb) {
    var info = getInfo(file);
    var current = { file: file, info: info };

    if (verbose) {
      gutil.log("starting:", info.filename, "-", info.description);
    }

    var ast;
    try {
      ast = acorn.parse(info.src, { ecmaVersion: 5 });
    } catch (err) {
      current.passed = info.negative; // String(info.negative || "").trim() === String(err.name).trim();

      current.err = err;
      cb(null, current);
      return;
    }

    var parser = function (text) { return acorn.parse(text, { ecmaVersion: 5 }); };
    var sandbox = SandBoxr.create(ast, { ecmaVersion: 5, parser: parser, imports: [{ ast: harness }]});

    try {
      sandbox.execute();
      current.passed = !info.negative;
      cb(null, current);
    } catch (err) {
      if ("toNative" in err) {
        err = err.toNative();
      }

      current.passed = info.negative; // === err.name;
      current.err = err;
      cb(null, current);
    }
  })).pipe(through.obj(function (result, enc, cb) {
    if (!result.passed) {
      gutil.log(failed, result.info.filename, result.info.description);

      gutil.log("path:", result.file.path);
      gutil.log(result.err);
    } else if (verbose) {
      var status = result.passed ? passed : skipped;
      gutil.log(status, result.info.filename, result.info.description);
    }

    results.push(result);
    cb();
  })).on("finish", function () {
    var totalPassed = results.filter(function (o) { return o.passed; }).length;
    
    gutil.log("TOTALS ==============================");
    gutil.log(passed, totalPassed);
    gutil.log(failed, results.length - totalPassed);
	});
