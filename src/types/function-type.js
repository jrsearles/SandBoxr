var ObjectType = require("./object-type");
var PropertyDescriptor = require("./property-descriptor");

function FunctionType (node, parentScope) {
	ObjectType.call(this);
	this.type = "function";
	this.className = "Function";
	this.native = false;
	this.node = node;
	this.parentScope = parentScope;
}

FunctionType.prototype = Object.create(ObjectType.prototype);
FunctionType.prototype.constructor = FunctionType;

FunctionType.prototype.init = function (objectFactory, proto, ctor, descriptor) {
	// set length property from the number of parameters
	this.defineOwnProperty("length", objectFactory.createPrimitive(this.node.params.length), { configurable: false, enumerable: false, writable: false });

	// functions have a prototype
	proto = proto || objectFactory.createObject();
	proto.properties.constructor = new PropertyDescriptor({ configurable: true, enumerable: false, writable: true, value: ctor || this });
	this.setProto(proto, { configurable: true, enumerable: false, writable: true });
};

FunctionType.prototype.getOwnPropertyNames = function () {
	var props = ObjectType.prototype.getOwnPropertyNames.call(this);
	if ("prototype" in this.properties) {
		props.push("prototype");
	}

	return props;
};

FunctionType.prototype.createScope = function (currentScope, thisArg) {
	// if a parent scope is defined we need to limit the scope to that scope
	return (this.parentScope || currentScope).createScope(thisArg);
};

module.exports = FunctionType;
