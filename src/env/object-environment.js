var PropertyReference = require("./property-reference");

function ObjectEnvironment (parent, obj, env) {
	this.parent = parent;
	this.object = this.thisNode = obj;
	this.env = env;
}

ObjectEnvironment.prototype = {
	constructor: ObjectEnvironment,

	getReference: function (name, strict) {
		return new PropertyReference(name, this.object, strict, this.env);
	},

	hasVariable: function (name) {
		return this.object.hasProperty(name);
	},

	createVariable: function (name, immutable) {
		if (this.parent) {
			this.parent.createVariable.apply(this.parent, arguments);
		} else {
			this.object.defineOwnProperty(name, {
				value: undefined,
				configurable: immutable,
				enumerable: true,
				writable: true
			}, true);
		}
	},

	putValue: function (name, value, throwOnError) {
		if (this.parent && !this.object.hasProperty(name)) {
			this.parent.putValue.apply(this.parent, arguments);
		} else {
			this.object.putValue(name, value, throwOnError);
		}
	},

	getValue: function (name, throwOnError) {
		if (!this.hasVariable(name)) {
			if (throwOnError) {
				throw new ReferenceError(name + " is not defined.");
			}

			return undefined;
		}

		return this.object.getProperty(name).getValue();
	},

	deleteVariable: function (name) {
		return this.object.deleteProperty(name, false);
	},

	getThisBinding: function () {
		return this.object;
	}
};

module.exports = ObjectEnvironment;
