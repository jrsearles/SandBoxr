var ObjectType = require("./object-type");
var PrimitiveType = require("./primitive-type");

function RegexType (value, parent) {
	ObjectType.call(this, parent);
	this.value = value;
}

RegexType.prototype = Object.create(ObjectType.prototype);
RegexType.prototype.constructor = RegexType;

RegexType.prototype.init = function (objectFactory) {
	// lastIndex is settable, all others are read-only attributes
	this.setProperty("lastIndex", objectFactory.createPrimitive(this.value.lastIndex), { enumerable: false, configurable: false });
	this.setProperty("source", objectFactory.createPrimitive(this.value.source), { writable: false, enumerable: false });
	this.setProperty("global", objectFactory.createPrimitive(this.value.global), { writable: false, enumerable: false });
	this.setProperty("ignoreCase", objectFactory.createPrimitive(this.value.ignoreCase), { writable: false, enumerable: false });
	this.setProperty("multiline", objectFactory.createPrimitive(this.value.multiline), { writable: false, enumerable: false });
};

module.exports = RegexType;
