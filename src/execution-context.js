import {UNDEFINED} from "./types/primitive-type";
import {ExecutionResult} from "./execution-result";
import {default as expressionVisitor} from "./visitors";

export class ExecutionContext {
	constructor (env, node, callee, isNew) {
		this.node = node;
		this.callee = callee;
		this.env = env;
		this.isNew = !!isNew;

		this.label = "";
		this.value = null;
		this.strict = false;
	}

	*execute () {
		let executionResult;

		try {
			executionResult = yield expressionVisitor.visit(this);
		} catch (nativeError) {
			executionResult = this.raise(nativeError);
		}

		if (executionResult && executionResult.raised) {
			throw this.env.objectFactory.create("Error", executionResult.result);
		}

		return executionResult || this.empty();
	}

	create (node, callee, isNew) {
		let context = new ExecutionContext(this.env, node, callee || this.callee, isNew);
		context.value = this.value;
		return context;
	}

	createLabel (node, label) {
		let context = this.create(node);
		context.label = label;
		return context;
	}

	cancel (label) {
		let result = this.result(this.value, label);
		result.cancel = true;
		return result;
	}

	skip (label) {
		let result = this.result(this.value, label);
		result.skip = true;
		return result;
	}

	raise (err) {
		let result = this.result(err);
		result.raised = result.exit = true;
		return result;
	}

	exit (value) {
		this.callee = null;

		let result = this.result(value);
		result.exit = true;
		return result;
	}

	result (value, name, obj) {
		this.value = value;
		return new ExecutionResult(value, name, obj);
	}

	empty () {
		return this.result(UNDEFINED);
	}
};
