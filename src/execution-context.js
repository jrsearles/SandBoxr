var ExecutionResult = require("./execution-result");

function ExecutionContext (runner, node, callee, scope, isNew) {
	this.runner = runner;
	this.node = node;
	this.callee = callee;
	this.scope = scope;
	this.label = "";
	this.isNew = !!isNew;
	this.strict = false;
}

ExecutionContext.prototype.execute = function () {
	return this.runner.execute(this);
};

ExecutionContext.prototype.create = function (node, callee, scope, isNew) {
	var context = new ExecutionContext(this.runner, node, callee, scope || this.scope, isNew);
	context.strict = this.strict;
	return context;
};

ExecutionContext.prototype.createLabel = function (node, label) {
	var context = new ExecutionContext(this.runner, node, null, this.scope);
	context.label = label;
	context.strict = this.strict;
	return context;
};

ExecutionContext.prototype.setStrict = function () {
	this.strict = true;
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

ExecutionContext.prototype.reference = function (value, name, obj) {
	var ref = new ExecutionResult(value, name, obj);
	ref.reference = true;
	return ref;
};

ExecutionContext.prototype.empty = function () {
	return new ExecutionResult();
};

module.exports = ExecutionContext;
