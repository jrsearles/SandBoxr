var Reference = require("./reference");
var PropertyDescriptor = require("../types/property-descriptor");

function DeclarativeEnvironment (parent, thisArg, env) {
	this.properties = Object.create(null);
	this.parent = parent;
	this.thisNode = thisArg;
	this.env = env;
}

DeclarativeEnvironment.prototype = {
	constructor: DeclarativeEnvironment,

	getReference: function (name, strict) {
		return new Reference(name, this, strict, this.env);
	},

	hasVariable: function (name) {
		return name in this.properties;
	},

	createVariable: function (name) {
		if (this.hasVariable(name)) {
			return this.properties[name];
		}

		return this.properties[name] = new PropertyDescriptor(this, {
			value: undefined,
			configurable: false,
			enumerable: true,
			writable: true
		});
	},

	putValue: function (name, value, throwOnError) {
		if (this.hasVariable(name)) {
			if (!this.properties[name].writable) {
				if (throwOnError) {
					throw new TypeError("Cannot write to immutable binding: " + name);
				}

				return;
			}

			this.properties[name].setValue(value);
		}
	},

	getValue: function (name, throwOnError) {
		if (this.hasVariable(name)) {
			if (!this.properties[name].value) {
				if (throwOnError) {
					throw new ReferenceError(name + " is not defined");
				}

				return undefined;
			}

			return this.properties[name].getValue();
		}
	},

	deleteVariable: function (name) {
		if (!this.hasVariable(name)) {
			return true;
		}

		if (!this.properties[name].configurable) {
			return false;
		}

		delete this.properties[name];
		return true;
	},

	getThisBinding: function () {
		return this.thisNode;
	}
};

module.exports = DeclarativeEnvironment;
