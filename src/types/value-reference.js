function ValueReference (name, obj, descriptor) {
	this.name = name;
	this.object = obj;
	this.descriptor = descriptor;
	this.reference = true;
}

ValueReference.prototype.getValue = function () {
	return this.descriptor.getValue(this.object);
};

ValueReference.prototype.setValue = function (obj, value) {
	return this.descriptor.setValue(this.object, value);
};

ValueReference.prototype.canSetValue = function () {
	return this.descriptor.canSetValue();
};

module.exports = ValueReference;
