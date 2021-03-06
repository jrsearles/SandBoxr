export function ExecutionResult (value, name, obj) {
  this.result = value;
  this.name = name;
  this.object = obj;

  this.cancel = false;
  this.cancelled = false;
  this.exit = false;
  this.skip = false;
  this.raised = false;
}

ExecutionResult.prototype = {
  constructor: ExecutionResult,
  
  isAbrupt () {
    return this.cancel || this.exit || this.raised || this.skip;
  }
};
