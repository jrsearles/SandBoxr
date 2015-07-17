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

	createReference: function (name, strict) {
		return new Reference(name, this, strict, this.env);
	},

	hasBinding: function (name) {
		return name in this.properties;
	},

	createMutableBinding: function (name) {
		if (this.hasBinding(name)) {
			return this.properties[name];
		}

		return this.properties[name] = new PropertyDescriptor(this, {
			value: undefined,
			configurable: false,
			enumerable: true,
			writable: true
		});
	},

	createImmutableBinding: function (name) {
		this.createMutableBinding(name, false);
	},

	initializeImmutableBinding: function (name, value) {
		if (this.hasBinding(name) && !this.properties[name].value) {
			this.properties[name].setValue(value);
		}
	},

	setMutableBinding: function (name, value, throwOnError) {
		if (this.hasBinding(name)) {
			if (!this.properties[name].writable) {
				if (throwOnError) {
					throw new TypeError("Cannot write to immutable binding: " + name);
				}

				return;
			}

			this.properties[name].setValue(value);
		}
	},

	getBindingValue: function (name, throwOnError) {
		if (this.hasBinding(name)) {
			if (!this.properties[name].value) {
				if (throwOnError) {
					throw new ReferenceError(name + " is not defined");
				}

				return undefined;
			}

			return this.properties[name].getValue();
		}
	},

	deleteBinding: function (name) {
		if (!this.hasBinding(name)) {
			return true;
		}

		if (!this.properties[name].configurable) {
			return false;
		}

		delete this.properties[name];
		return true;
	},

	getThisBinding: function () {
		return undefined;
	}
};

module.exports = DeclarativeEnvironment;
