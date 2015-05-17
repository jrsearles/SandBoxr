var FunctionType = require("./function-type");
var ObjectType = require("./object-type");

function NativeFunctionType (fn, parentScope) {
	FunctionType.call(this, null, parentScope);
	this.type = "function";
	this.native = true;
	this.nativeFunction = fn;
}

NativeFunctionType.prototype = Object.create(FunctionType.prototype);
NativeFunctionType.prototype.constructor = NativeFunctionType;

NativeFunctionType.prototype.init = function (objectFactory) {
	// set length property
	this.setProperty("length", objectFactory.createPrimitive(this.nativeFunction.length), { configurable: false, enumerable: false, writable: false });

	var proto = new ObjectType();
	proto.setProperty("constructor", this, { configurable: false, enumerable: false, writable: false });
	this.setProto(proto);
};

module.exports = NativeFunctionType;
