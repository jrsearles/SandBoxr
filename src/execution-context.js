var ExecutionResult = require("./execution-result");

function ExecutionContext (env, node, callee) {
	this.node = node;
	this.callee = callee;
	this.env = env;

	this.label = "";
	this.isNew = false;
	this.strict = false;
}

ExecutionContext.prototype.execute = function () {
	return this.env.runner.execute(this);
};

ExecutionContext.prototype.create = function (node, callee, isNew) {
	var context = new ExecutionContext(this.env, node, callee);
	context.isNew = !!isNew;
	return context;
};

ExecutionContext.prototype.createLabel = function (node, label) {
	var context = new ExecutionContext(this.env, node);
	context.label = label;
	return context;
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
};

ExecutionContext.prototype.empty = function () {
	return new ExecutionResult();
};

module.exports = ExecutionContext;
