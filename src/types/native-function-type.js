var FunctionType = require("./function-type");
var ObjectType = require("./object-type");

function NativeFunctionType (fn) {
	FunctionType.call(this);
	this.type = "function";
	this.native = true;
	this.nativeFunction = fn;
}

NativeFunctionType.prototype = Object.create(FunctionType.prototype);
NativeFunctionType.prototype.constructor = NativeFunctionType;

NativeFunctionType.prototype.init = function (objectFactory) {
	// set length property
	this.setProperty("length", objectFactory.createPrimitive(this.nativeFunction.length), { configurable: false, writable: false });

	// save prototype to `proto` for quick access
	this.proto = new ObjectType();
	this.setProperty("prototype", this.proto);
};

module.exports = NativeFunctionType;
