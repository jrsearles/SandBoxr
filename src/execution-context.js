import ExecutionResult from "./execution-result";
import { default as expressionVisitor } from "./visitors";

export default class ExecutionContext {
	constructor (env, node, callee, isNew) {
		this.node = node;
		this.callee = callee;
		this.env = env;
		this.isNew = !!isNew;
	
		this.label = "";
		this.value = null;
		this.strict = false;
	}

	execute () {
		return expressionVisitor.visit(this);
	}

	create (node, callee, isNew) {
		var context = new ExecutionContext(this.env, node, callee || this.callee, isNew);
		context.value = this.value;
		return context;
	}

	createLabel (node, label) {
		var context = this.create(node);
		context.label = label;
		return context;
	}

	cancel (label) {
		var result = this.result(this.value, label);
		result.cancel = true;
		return result;
	}

	skip (label) {
		var result = this.result(this.value, label);
		result.skip = true;
		return result;
	}

	exit (value) {
		this.callee = null;
	
		var result = this.result(value);
		result.exit = true;
		return result;
	}

	result (value, name, obj) {
		this.value = value;
		return new ExecutionResult(value, name, obj);
	}

	empty () {
		return this.result();
	}
}
