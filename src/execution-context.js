var ExecutionResult = require("./execution-result");

function ExecutionContext (runner, node, scope, label) {
	this.runner = runner;
	this.node = node;
	this.scope = scope;
	this.label = label;
}

ExecutionContext.prototype.execute = function () {
	return this.runner.execute(this);
};

ExecutionContext.prototype.create = function (node, scope, label) {
	return new ExecutionContext(this.runner, node, scope || this.scope, label);
};

ExecutionContext.prototype.cancel = function (label) {
	var result = new ExecutionResult(null, label);
	result.cancel = true;
	return result;
};

ExecutionContext.prototype.skip = function (label) {
	var result = new ExecutionResult(null, label);
	result.skip = true;
	return result;
};

ExecutionContext.prototype.exit = function (value) {
	var result = new ExecutionResult(value);
	result.exit = true;
	return result;
};

ExecutionContext.prototype.result = function (value, name, obj) {
	return new ExecutionResult(value, name, obj);
}

module.exports = ExecutionContext;
