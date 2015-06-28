var PrimitiveType = require("./primitive-type");
var PropertyDescriptor = require("./property-descriptor");
var types = require("../utils/types");

function StringType (value) {
	PrimitiveType.call(this, value);
}

function getCharacter (source, position) {
	if (position < source.value.length) {
		// todo: need to set length
		var character = new StringType(source.value[position]);
		character.parent = source.parent;
		character.setProto(source.proto);
		return character;
	}

	return new PrimitiveType(undefined);
}

StringType.prototype = Object.create(PrimitiveType.prototype);
StringType.prototype.constructor = StringType;

StringType.prototype.init = function (objectFactory) {
	this.properties.length = new PropertyDescriptor({ configurable: false, enumerable: false, writable: false }, objectFactory.createPrimitive(this.value.length));
};

StringType.prototype.getProperty = function (name) {
	if (types.isInteger(name)) {
		var position = Number(name);
		if (position < this.value.length) {
			return new PropertyDescriptor({ configurable: false, enumerable: true, writable: false, value: getCharacter(this, position) });
		}
	}

	return PrimitiveType.prototype.getProperty.apply(this, arguments);
};

StringType.prototype.getOwnPropertyNames = function () {
	var props = [];
	var ln, i;
	for (i = 0, ln = this.value.length; i < ln; i++) {
		props.push(String(i));
	}

	return props.concat(PrimitiveType.prototype.getOwnPropertyNames.call(this));
};

StringType.prototype.hasOwnProperty = function (name) {
	if (types.isInteger(name)) {
		return name < this.value.length;
	}

	return PrimitiveType.prototype.hasOwnProperty.apply(this, arguments);
};

StringType.prototype.getValue = function (name) {
	if (types.isInteger(name)) {
		return getCharacter(this, Number(name));
	}

	return PrimitiveType.prototype.getValue.call(this, name);
};

module.exports = StringType;
