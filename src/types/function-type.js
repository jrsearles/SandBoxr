var ObjectType = require("./object-type");

function FunctionType (node, parentScope) {
	ObjectType.call(this);
	this.type = "function";
	this.native = false;
	this.node = node;
	this.parentScope = parentScope;
}

FunctionType.prototype = Object.create(ObjectType.prototype);
FunctionType.prototype.constructor = FunctionType;

FunctionType.prototype.init = function (objectFactory) {
	// set length property from the number of parameters
	this.setProperty("length", objectFactory.createPrimitive(this.node.params.length), { configurable: false, enumerable: false, writable: false });

	// functions have a prototype
	var proto = objectFactory.createObject();
	proto.setProperty("constructor", this, { configurable: false, enumerable: false, writable: true });
	this.setProto(proto);
};

FunctionType.prototype.createScope = function (currentScope, thisArg) {
	// if a parent scope is defined we need to limit the scope to that scope
	return (this.parentScope || currentScope).createScope(thisArg);
};

module.exports = FunctionType;
