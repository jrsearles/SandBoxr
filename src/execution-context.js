var ExecutionResult = require("./execution-result");

function ExecutionContext (runner, node, callee, scope) {
	this.runner = runner;
	this.node = node;
	this.callee = callee;
	this.scope = scope;
	this.label = null;
	this.errorHandler = null;
}

ExecutionContext.prototype.execute = function () {
	return this.runner.execute(this);
};

ExecutionContext.prototype.create = function (node, callee, scope) {
	var context = new ExecutionContext(this.runner, node, callee, scope || this.scope);
	context.errorHandler = this.errorHandler;
	return context;
};

ExecutionContext.prototype.createLabel = function (node, label) {
	var context = new ExecutionContext(this.runner, node, null, this.scope);
	context.label = label;
	context.errorHandler = this.errorHandler;
	return context;
};

ExecutionContext.prototype.beginTry = function (errorHandler) {
	this.errorHandler = errorHandler;
};

ExecutionContext.prototype.endTry = function () {
	this.errorHandler = null;
};

ExecutionContext.prototype.handleError = function (err) {
	if (!this.errorHandler) {
		throw err;
	}

	this.errorHandler(err);
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

module.exports = ExecutionContext;
