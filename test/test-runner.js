var parser = require("./ast-parser");
var SandBoxer = require("../src");

module.exports = {
	runBlock: function (code) {
		return this.getRunner(code).execute();
	},

	getScope: function (code) {
		var runner = this.getRunner(code);
		runner.execute();
		return runner.env;
	},

	getRunner: function (code) {
		var ast = parser.parse(code);
		return new SandBoxer(ast);
	},

	wrapArgs: function (args) {
		return args.map(function (arg) {
			return typeof arg === "string" ? "'" + arg + "'" : String(arg);
		}).join(",");
	}
};
