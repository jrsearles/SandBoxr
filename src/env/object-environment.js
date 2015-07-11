var PropertyReference = require("./property-reference");

function ObjectEnvironment (parent, obj) {
	this.parent = parent;
	this.object = this.thisNode = obj;
}

ObjectEnvironment.prototype = {
	constructor: ObjectEnvironment,

	createReference: function (name, strict) {
		return new PropertyReference(name, this.object, strict);
	},

	getValue: function (name) {
		return this.object.getValue(name);
	},

	hasBinding: function (name) {
		return this.object.hasProperty(name);
	},

	createMutableBinding: function (name, immutable) {
		if (this.parent) {
			this.parent.createMutableBinding.apply(this.parent, arguments);
		} else {
			this.object.defineOwnProperty(name, {
				value: undefined,
				configurable: immutable,
				enumerable: true,
				writable: true
			}, true);
		}
	},

	createImmutableBinding: function (name) {
		this.createMutableBinding(name, false);
	},

	setMutableBinding: function (name, value, throwOnError) {
		if (this.parent && !this.object.hasProperty(name)) {
			this.parent.setMutableBinding.apply(this.parent, arguments);
		} else {
			this.object.putValue(name, value, throwOnError);
		}
	},

	getBindingValue: function (name, throwOnError) {
		if (!this.hasBinding(name)) {
			if (throwOnError) {
				throw new ReferenceError(name + " is not defined.");
			}

			return undefined;
		}

		return this.object.getProperty(name).getValue();
	},

	deleteBinding: function (name) {
		return this.object.deleteProperty(name, false);
	}

	// getThisBinding: function () {
	// 	return undefined;
	// }
};

module.exports = ObjectEnvironment;
