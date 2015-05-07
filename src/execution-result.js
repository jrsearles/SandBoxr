function ExecutionResult (value, name, obj) {
	this.result = value;
	this.name = name;
	this.object = obj;
	
	this.cancel = false;
	this.exit = false;
	this.skip = false;
}

module.exports = ExecutionResult;
