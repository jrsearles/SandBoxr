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

FunctionType.prototype.hasInstance = function (obj) {
	if (obj.isPrimitive || obj === this) {
		return false;
	}

	var visited = [];
	var current = obj;

	while (current) {
		if (visited.indexOf(current) >= 0) {
			return false;
		}

		// keep a stack to avoid circular reference
		visited.push(current);
		if (current === this.proto) {
			return true;
		}

		if (current.parent && current.parent.proto === this.proto) {
			return true;
		}

		current = current.proto;
	}

	return false;
};

module.exports = FunctionType;
