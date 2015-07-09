var acorn = require("acorn");
var SandBoxer = require("../src/sandboxr");

module.exports = {
	runBlock: function (code) {
		return this.getRunner(code).execute().result;
	},

	getScope: function (code) {
		var runner = this.getRunner(code);
		runner.execute();
		return runner.env;
	},

	getRunner: function (code) {
		var ast = acorn.parse(code);
		return new SandBoxer(ast);
	},

	wrapArgs: function (args) {
		return args.map(function (arg) {
			return typeof arg === "string" ? "'" + arg + "'" : String(arg);
		}).join(",");
	}
};
