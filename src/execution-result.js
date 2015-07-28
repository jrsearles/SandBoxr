function ExecutionResult (value, name, obj) {
	this.result = value;
	this.name = name;
	this.object = obj;

	this.cancel = false;
	this.cancelled = false;
	this.exit = false;
	this.skip = false;
}

ExecutionResult.prototype.isCancelled = function () {
	return this.cancel || this.exit;
};

ExecutionResult.prototype.shouldBreak = function (context, loop, priorResult) {
	if (this.exit) {
		return true;
	}

	if (!this.cancel && !this.skip) {
		return false;
	}

	var breaking = true;
	if (this.name && this.name === context.label) {
		breaking = this.cancelled = this.cancel;
		this.cancel = this.skip = false;
		
		if (this.cancelled) {
			this.result = priorResult && priorResult.result || this.result;
		}

		return breaking;
	}

	if (loop && !this.name) {
		breaking = this.cancelled = this.cancel;
		this.cancel = this.skip = false;
	}

	this.result = priorResult && priorResult.result || this.result;
	return breaking;
};

module.exports = ExecutionResult;
