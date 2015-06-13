var ObjectType = require("./object-type");

function ArgumentType () {
	ObjectType.call(this);
	this.className = "Arguments";
}

ArgumentType.prototype = Object.create(ObjectType.prototype);
ArgumentType.prototype.constructor = ArgumentType;

ArgumentType.prototype.setProperty = function (name, value) {
	name = String(name);
	if (name in this.properties) {
		this.properties[name].setValue(this, value);
	}
};

module.exports = ArgumentType;
