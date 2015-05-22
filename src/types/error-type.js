var ObjectType = require("./object-type");

function ErrorType (source) {
	ObjectType.call(this);
	this.source = source;
	this.objectType = "[object Error]";
}

ErrorType.prototype = new ObjectType();
ErrorType.prototype.constructor = ErrorType;

module.exports = ErrorType;
