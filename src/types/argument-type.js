var ObjectType = require("./object-type");

function ArgumentType () {
	ObjectType.call(this);
	this.className = "Arguments";
	this.parameterMap = Object.create(null);
}

ArgumentType.prototype = Object.create(ObjectType.prototype);
ArgumentType.prototype.constructor = ArgumentType;

ArgumentType.prototype.mapProperty = function (index, binding) {
	index = String(index);

	ObjectType.prototype.defineOwnProperty.call(this, index, {
		configurable: true,
		enumerable: true,
		writable: true,
		value: undefined
	}, true);

	this.parameterMap[index] = binding;
};

ArgumentType.prototype.getProperty = function (name) {
	var ownProperty = this.getOwnProperty(name);
	if (ownProperty) {
		return ownProperty;
	}

	return ObjectType.prototype.getProperty.apply(this, arguments);
};

ArgumentType.prototype.getOwnProperty = function (name) {
	name = String(name);

	if (name in this.parameterMap) {
		var mappedProperty = this.properties[name];
		var linkedProperty = this.parameterMap[name];

		mappedProperty.value = linkedProperty.getValue();
		mappedProperty.setValue = linkedProperty.setValue.bind(linkedProperty);
		return mappedProperty;
	}

	return ObjectType.prototype.getOwnProperty.apply(this, arguments);
};

ArgumentType.prototype.defineOwnProperty = function (name, descriptor, throwOnError) {
	name = String(name);

	var allowed = ObjectType.prototype.defineOwnProperty.apply(this, arguments);
	if (allowed && name in this.parameterMap) {
		if ("set" in descriptor || "get" in descriptor) {
			delete this.parameterMap[name];
		} else if ("value" in descriptor) {
			this.parameterMap[name].setValue(descriptor.value, throwOnError);
		}

		if ("writable" in descriptor && !descriptor.writable) {
			delete this.parameterMap[name];
		}
	}

	return allowed;
};

ArgumentType.prototype.deleteProperty = function (name, throwOnError) {
	name = String(name);
	if (name in this.parameterMap) {
		delete this.parameterMap[name];
	}

	return ObjectType.prototype.deleteProperty.apply(this, arguments);
};

module.exports = ArgumentType;
