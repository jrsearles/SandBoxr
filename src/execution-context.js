import {UNDEFINED} from "./types/primitive-type";
import {ExecutionResult} from "./execution-result";
import {visitors} from "./visitors";
import {step} from "./estree";
import rules from "./syntax-rules";

export class ExecutionContext {
	constructor (env, obj, callee, isNew) {
		this.object = obj;
		this.callee = callee;
		this.env = env;
		this.isNew = !!isNew;

		this.label = "";
		this.value = null;
		this.strict = false;
	}

	*execute (node, callee) {
		let executionResult;
		
		try {
			executionResult = yield step(node, visitors, this, rules);
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

	createLabel (label) {
		let context = this.create();
		context.label = label;
		return context;
	}
	
	createLoop () {
		let context = this.create();
		context.label = this.label;
		context.loop = true;
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
		let wrappedError = this.env.objectFactory.create("Error", err);
		let result = this.result(wrappedError);
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
	
	abrupt (result, priorResult) {
		if (priorResult && !result.raised && !result.exit) {
			result.result = priorResult.result;
		}
		
		return result || this.empty();
	}
	
	shouldBreak (result) {
		if (!result) {
			return false;
		}
		
		if (result.exit || result.raised) {
			return true;
		}

		if (!result.cancel && !result.skip) {
			return false;
		}

		let breaking = true;
		if (result.name && result.name === this.label) {
			breaking = result.cancelled = result.cancel;
			result.cancel = result.skip = false;

			return breaking;
		}

		if (this.loop && !result.name) {
			breaking = result.cancelled = result.cancel;
			result.cancel = result.skip = false;
		}

		return breaking;
	}
};
