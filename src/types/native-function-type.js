var FunctionType = require("./function-type");
var PropertyDescriptor = require("./property-descriptor");

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

	var proto = objectFactory.createObject();
	proto.properties.constructor = new PropertyDescriptor({ configurable: false, enumerable: false, writable: true, value: this });
	this.setProto(proto);
};

module.exports = NativeFunctionType;
