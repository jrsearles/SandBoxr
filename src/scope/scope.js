var ObjectType = require("../types/object-type");
var keywords = require("../keywords");

function createDescriptor (value) {
	return {
		configurable: false,
		enumerable: true,
		writable: true,
		value: value
	};
}

function Scope (parent, thisNode) {
	ObjectType.call(this);

	this.parent = parent;
	this.thisNode = thisNode;

	if (parent) {
		this.thisNode = this.thisNode || parent.thisNode;
		this.global = parent.global;
		this.version = parent.version;
		this.strict = parent.strict;
		this.setProto(parent.proto);
	} else {
		this.thisNode = this.thisNode || this;
		this.global = this;
		this.version = "es5";
		this.strict = false;
	}
}

Scope.prototype = Object.create(ObjectType.prototype);
Scope.prototype.constructor = Scope;

Scope.prototype.getValue = function (name) {
	var current = this;

	while (current) {
		if (name in current.properties) {
			return current.properties[name].getValue(current);
		}

		current = current.parent;
	}

	return this.global.proto && this.global.proto.getValue(name);
};

Scope.prototype.defineOwnProperty = function (name, value, descriptor, throwOnError, context) {
	if (throwOnError) {
		if (keywords.isReserved(name, this)) {
			throw new SyntaxError("Unexpected token " + name);
		}
	}

	// add to current scope
	descriptor = descriptor || createDescriptor(value);
	ObjectType.prototype.defineOwnProperty.call(this, name, value, descriptor, context);
};

Scope.prototype.putValue = function (name, value, throwOnError, context) {
	// look for existing in scope and traverse up scope
	var current = this;
	while (current) {
		if (name in current.properties) {
			ObjectType.prototype.putValue.call(current, name, value, context);
			return;
		}

		current = current.parent;
	}

	this.defineOwnProperty(name, null, createDescriptor(value), throwOnError, context);
};

Scope.prototype.deleteProperty = function (name) {
	name = String(name);

	if (name in this.properties) {
		return ObjectType.prototype.deleteProperty.call(this, name);
	}

	if (this.parent) {
		return this.parent.deleteProperty(name);
	}

	return true;
};

Scope.prototype.getProperty = function (name) {
	name = String(name);

	var current = this;
	while (current) {
		if (name in current.properties) {
			return current.properties[name];
		}

		current = current.parent;
	}

	return this.global.proto && this.global.proto.getProperty(name);
};

// Scope.prototype.hasProperty = function (name) {
// 	// var current = this;
// 	// while (current) {
// 	// 	if (name in current.properties) {
// 	// 		return true;
// 	// 	}

// 	// 	current = current.parent;
// 	// }

// 	// return this.global.proto.hasProperty(name);

// 	// return false;
// };

Scope.prototype.createScope = function (thisNode) {
	return new Scope(this, thisNode);
};

Scope.prototype.withObject = function (obj) {
	var scope = new Scope(this);
	scope.properties = obj.properties;
	return scope;
};

Scope.prototype.setStrict = function (strict) {
	this.strict = strict;
};

module.exports = Scope;
