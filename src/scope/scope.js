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
	name = String(name);

	if (name in this.properties) {
		return this.properties[name].getValue(this);
	}

	if (this.parent) {
		return this.parent.getValue(name);
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
	name = String(name);

	if (name in this.properties) {
		return ObjectType.prototype.putValue.apply(this, arguments);
	}

	if (this.parent) {
		return this.parent.putValue.apply(this.parent, arguments);
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

	if (name in this.properties) {
		return this.properties[name];
	}

	if (this.parent) {
		return this.parent.getProperty(name);
	}

	return this.global.proto && this.global.proto.getProperty(name);
};

Scope.prototype.hasOwnProperty = function (name) {
	return String(name) in this.properties;
};

Scope.prototype.hasProperty = function (name) {
	return !!this.getProperty(name);
};

Scope.prototype.createScope = function (thisNode) {
	return new Scope(this, thisNode);
};

function ObjectScope (parent, obj) {
	Scope.apply(this, arguments);
	this.object = obj;
}

ObjectScope.prototype = Object.create(Scope.prototype);
ObjectScope.prototype.constructor = ObjectScope;

ObjectScope.prototype.getValue = function (name) {
	if (this.object.hasProperty(name)) {
		return this.object.getValue(name);
	}

	return this.parent.getValue(name);
};

ObjectScope.prototype.putValue = function (name, value, throwOnError, context) {
	if (this.object.hasProperty(name)) {
		return this.object.putValue.apply(this.object, arguments);
	}

	if (this.parent.hasProperty(name)) {
		return this.parent.putValue.apply(this.parent, arguments);
	}

	return this.object.defineOwnProperty(name, null, { value: value, configurable: true, enumerable: true, writable: true }, throwOnError, context);
};

ObjectScope.prototype.hasProperty = function (name) {
	return this.object.hasProperty(name) || this.parent.hasProperty(name);
};

ObjectScope.prototype.hasOwnProperty = function (name) {
	return this.object.hasOwnProperty(name);
};

ObjectScope.prototype.deleteProperty = function (name) {
	if (this.object.hasProperty(name)) {
		return this.object.deleteProperty.apply(this.object, arguments);
	}

	return this.parent.deleteProperty.apply(this.parent, arguments);
};

ObjectScope.prototype.defineOwnProperty = function () {
	return this.parent.defineOwnProperty.apply(this.parent, arguments);
};

Scope.prototype.withObject = function (obj) {
	return new ObjectScope(this, obj);
};

module.exports = Scope;
