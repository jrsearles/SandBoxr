var ObjectType = require("./object-type");
var PropertyDescriptor = require("./property-descriptor");
var types = require("../utils/types");
var contracts = require("../utils/contracts");

function updateLength (arr, name) {
	if (types.isInteger(name) && contracts.isValidArrayLength(name + 1)) {
		var currentLength = arr.properties.length.getValue(this);
		currentLength.value = Math.max(Number(name) + 1, currentLength.value);
	}
}

function ArrayType () {
	ObjectType.call(this);
	this.className = "Array";
}

ArrayType.prototype = Object.create(ObjectType.prototype);
ArrayType.prototype.constructor = ArrayType;

ArrayType.prototype.putValue = function (name, value, descriptor) {
	updateLength(this, name);
	if (name === "length") {
		var ln = this.getValue("length");
		var i = value.toNumber();

		contracts.assertIsValidArrayLength(i);
		if (ln && i < ln.value) {
			for (; i < ln.value; i++) {
				this.deleteProperty(i);
			}
		}
	}

	ObjectType.prototype.putValue.apply(this, arguments);
};

ArrayType.prototype.defineOwnProperty = function (name, value, descriptor) {
	updateLength(this, name);
	ObjectType.prototype.defineOwnProperty.apply(this, arguments);
};

ArrayType.prototype.init = function (objectFactory) {
	this.defineOwnProperty("length", objectFactory.createPrimitive(0), { configurable: false, enumerable: false });
};

module.exports = ArrayType;
