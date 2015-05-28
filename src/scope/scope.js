var ObjectType = require("../types/object-type");
var objectFactory = require("../types/object-factory");

function Scope (parent, thisNode) {
	ObjectType.call(this, parent);
	this.thisNode = thisNode || (parent && parent.thisNode) || this;
	this.global = parent ? parent.global : this;
}

Scope.prototype = Object.create(ObjectType.prototype);
Scope.prototype.constructor = Scope;

Scope.prototype.getProperty = function (name) {
	var current = this;

	while (current) {
		if (name in current.properties) {
			return current.properties[name];
		}

		current = current.parent;
	}

	return undefined;
};

Scope.prototype.setProperty = function (name, value, descriptor) {
	// look for existing in scope and traverse up scope
	var current = this;
	while (current) {
		if (name in current.properties) {
			ObjectType.prototype.setProperty.call(current, name, value);
			return;
		}

		current = current.parent;
	}

	// add to current scope if not found
	ObjectType.prototype.setProperty.call(this, name, value, descriptor || { configurable: false });
};

Scope.prototype.hasProperty = function (name) {
	var current = this;
	while (current) {
		if (name in current.properties) {
			return true;
		}

		current = current.parent;
	}

	return false;
};

Scope.prototype.createScope = function (thisNode) {
	return new Scope(this, thisNode);
};

Scope.prototype.createPrimitive = function (value) {
	return objectFactory.createPrimitive(value);
};

Scope.prototype.createObject = function (value) {
	return objectFactory.createObject(value);
};

Scope.prototype.createFunction = function (fnOrNode) {
	return objectFactory.createFunction(fnOrNode);
};


module.exports = Scope;
