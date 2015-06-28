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
	this.defineOwnProperty("lastIndex", objectFactory.createPrimitive(this.source.lastIndex), { enumerable: false, configurable: false, writable: true });
	this.defineOwnProperty("source", objectFactory.createPrimitive(this.source.source), { writable: false, enumerable: false });
	this.defineOwnProperty("global", objectFactory.createPrimitive(this.source.global), { writable: false, enumerable: false });
	this.defineOwnProperty("ignoreCase", objectFactory.createPrimitive(this.source.ignoreCase), { writable: false, enumerable: false });
	this.defineOwnProperty("multiline", objectFactory.createPrimitive(this.source.multiline), { writable: false, enumerable: false });
};

module.exports = RegexType;
