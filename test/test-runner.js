var parser = require("./ast-parser");
var expect = require("chai").expect;
var SandBoxr = require("../dist/sandboxr");

module.exports = {
	runBlock: function (code, done) {
		return this.getRunner(code).execute();
	},

	confirmBlock: function (code, done) {
		this.runBlock(code)
			.then(function (result) {
				expect(result.unwrap()).to.be.true;
				done();
			}, done);
	},

	confirmError: function (code, errType, done) {
		this.runBlock(code)
			.then(function () {
				expect(false).to.be.true;
				done();
			},
			function (err) {
				expect(err).to.be.instanceof(errType);
				done();
			});
	},

	getScope: function (code) {
		var runner = this.getRunner(code);
		runner.execute();
		return runner.env;
	},

	getRunner: function (code) {
		var ast = parser.parse(code);
		return SandBoxr.create(ast);
	},

	wrapArgs: function (args) {
		return args.map(function (arg) {
			return typeof arg === "string" ? "'" + arg + "'" : String(arg);
		}).join(",");
	}
};
