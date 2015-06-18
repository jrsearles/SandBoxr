var ObjectType = require("./object-type");
var PropertyDescriptor = require("./property-descriptor");

function ArrayType () {
	ObjectType.call(this);
	this.className = "Array";
}

ArrayType.prototype = Object.create(ObjectType.prototype);
ArrayType.prototype.constructor = ArrayType;

ArrayType.prototype.putValue = function (name, value) {
	if (typeof name === "number") {
		// todo: should be a better way to set length, but we can't reference object factory here
		var currentLength = this.properties.length.value;
		currentLength.value = Math.max(name + 1, currentLength.value);

		name = String(name);
		this.properties[name] = this.properties[name] || new PropertyDescriptor(null, value);
		this.properties[name].setValue(this, value);
		return;
	}

	if (name === "length") {
		var ln = this.getValue("length");
		var i = value.toNumber();

		if (ln && i < ln.value) {
			for (; i < ln.value; i++) {
				this.deleteProperty(i);
			}
		}
	}

	ObjectType.prototype.putValue.apply(this, arguments);
};

ArrayType.prototype.init = function (objectFactory) {
	this.defineOwnProperty("length", objectFactory.createPrimitive(0), { configurable: false, enumerable: false });
};

module.exports = ArrayType;
