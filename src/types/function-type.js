var ObjectType = require("./object-type");

function FunctionType (node) {
	ObjectType.call(this);
	this.type = "function";
	this.native = false;
	this.node = node;
}

FunctionType.prototype = Object.create(ObjectType.prototype);
FunctionType.prototype.constructor = FunctionType;

FunctionType.prototype.init = function (objectFactory) {
	// set length property
	this.setProperty("length", objectFactory.createPrimitive(this.node.params.length), { configurable: false, writable: false });

	// save prototype to `proto` for quick access
	this.proto = new ObjectType();
	this.setProperty("prototype", this.proto);
};

module.exports = FunctionType;
