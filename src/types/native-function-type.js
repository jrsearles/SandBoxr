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

NativeFunctionType.prototype.init = function (objectFactory, proto, ctor, descriptor) {
	var length = this.nativeFunction.length;
	if ("nativeLength" in this.nativeFunction) {
		length = this.nativeFunction.nativeLength;
	}

	this.defineOwnProperty("length", { value: objectFactory.createPrimitive(length), configurable: false, enumerable: false, writable: false });

	proto = proto || objectFactory.createObject();
	proto.properties.constructor = new PropertyDescriptor(this, { configurable: true, enumerable: false, writable: true, value: this });
	this.setProto(proto, descriptor || { configurable: false, enumerable: false, writable: true });
};

module.exports = NativeFunctionType;
