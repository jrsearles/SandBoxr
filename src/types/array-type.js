var ObjectType = require("./object-type");

function ArrayType (parent) {
	ObjectType.call(this, parent);
}

ArrayType.prototype = Object.create(ObjectType.prototype);
ArrayType.prototype.setProperty = function (name, value) {
	if (typeof name === "number") {
		// todo: should be a better way to set length, but we can't reference object factory here
		this.properties.length.value = Math.max(name + 1, this.properties.length.value);
	} else if (name === "length") {
		var ln = this.getProperty("length");
		var i = value.toNumber();

		if (ln && i < ln.value) {
			for (; i < ln.value; i++) {
				this.deleteProperty(i);
			}
		}
	}

	ObjectType.prototype.setProperty.apply(this, arguments);
};

ArrayType.prototype.init = function (objectFactory) {
	this.setProperty("length", objectFactory.createPrimitive(0));
};

ArrayType.prototype.constructor = ArrayType;
module.exports = ArrayType;
