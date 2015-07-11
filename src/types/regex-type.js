var ObjectType = require("./object-type");

function RegexType (value) {
	ObjectType.call(this);
	this.source = value;
	this.className = "RegExp";
}

RegexType.prototype = Object.create(ObjectType.prototype);
RegexType.prototype.constructor = RegexType;

RegexType.prototype.init = function (objectFactory) {
	// lastIndex is settable, all others are read-only attributes
	this.defineOwnProperty("lastIndex", { value: objectFactory.createPrimitive(this.source.lastIndex), writable: true });
	this.defineOwnProperty("source", { value: objectFactory.createPrimitive(this.source.source) });
	this.defineOwnProperty("global", { value: objectFactory.createPrimitive(this.source.global) });
	this.defineOwnProperty("ignoreCase", { value: objectFactory.createPrimitive(this.source.ignoreCase) });
	this.defineOwnProperty("multiline", { value: objectFactory.createPrimitive(this.source.multiline) });
};

module.exports = RegexType;
