var ExecutionResult = require("./execution-result");
var expressionVisitor = require("./visitors");

function ExecutionContext (env, node, callee, isNew) {
	this.node = node;
	this.callee = callee;
	this.env = env;
	this.isNew = !!isNew;

	this.label = "";
	this.value = null;
	this.strict = false;
}

ExecutionContext.prototype.execute = function () {
	return expressionVisitor.visit(this);
};

ExecutionContext.prototype.create = function (node, callee, isNew) {
	var context = new ExecutionContext(this.env, node, callee || this.callee, isNew);
	context.value = this.value;
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
	return this.result();
};

module.exports = ExecutionContext;
