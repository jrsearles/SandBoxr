var ObjectType = require("./object-type");

function ErrorType (source) {
	ObjectType.call(this);
	this.source = source;
	this.className = "Error";
}

ErrorType.prototype = Object.create(ObjectType.prototype);
ErrorType.prototype.constructor = ErrorType;

module.exports = ErrorType;
