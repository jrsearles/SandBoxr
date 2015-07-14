var ExecutionResult = require("./execution-result");

function ExecutionContext (env, node, callee) {
	this.node = node;
	this.callee = callee;
	this.env = env;

	this.label = "";
	this.value = null;
	this.isNew = false;
	this.strict = false;
}

ExecutionContext.prototype.execute = function () {
	return this.env.runner.execute(this);
};

ExecutionContext.prototype.create = function (node, callee, isNew) {
	var context = new ExecutionContext(this.env, node, callee || this.callee);
	context.value = this.value;
	context.isNew = !!isNew;
	return context;
};

ExecutionContext.prototype.createLabel = function (node, label) {
	var context = this.create(node);
	context.label = label;
	return context;
};

ExecutionContext.prototype.cancel = function (label) {
	var result = this.result(this.value, label);
	result.cancel = true;
	return result;
};

ExecutionContext.prototype.skip = function (label) {
	var result = this.result(this.value, label);
	result.skip = true;
	return result;
};

ExecutionContext.prototype.exit = function (value) {
	this.callee = null;

	var result = this.result(value);
	result.exit = true;
	return result;
};

ExecutionContext.prototype.result = function (value, name, obj) {
	this.value = value;
	return new ExecutionResult(value, name, obj);
};

ExecutionContext.prototype.empty = function () {
	return this.result(undefined);
};

module.exports = ExecutionContext;
