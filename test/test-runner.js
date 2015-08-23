var parser = require("./ast-parser");
var SandBoxer = require("../dist/sandboxr");
var expect = require("chai").expect;

module.exports = {
	runBlock: function (code, done) {
		return this.getRunner(code).execute();
	},
	
	confirmBlock: function (code, done) {
		this.runBlock(code)
			.then(function (result) {
				expect(result.unwrap()).to.be.true;
				done();
			}, function (err){
				throw err;
			});
	},
	
	confirmError: function (code, errType, done) {
		this.runBlock(code)
			.then(null, function (err) {
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
		return SandBoxer.create(ast);
	},

	wrapArgs: function (args) {
		return args.map(function (arg) {
			return typeof arg === "string" ? "'" + arg + "'" : String(arg);
		}).join(",");
	}
};
