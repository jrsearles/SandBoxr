var Reference = require("./reference");
var PropertyDescriptor = require("../types/property-descriptor");

function DeclarativeEnvironment (parent, thisArg, isEval) {
	this.bindings = Object.create(null);
	this.parent = parent;
	this.thisNode = thisArg;
	this.isEval = isEval;
}

DeclarativeEnvironment.prototype = {
	constructor: DeclarativeEnvironment,

	createReference: function (name, strict) {
		return new Reference(name, this, strict);
	},

	hasBinding: function (name) {
		return name in this.bindings;
	},

	createMutableBinding: function (name) {
		if (!this.hasBinding(name)) {
			this.bindings[name] = new PropertyDescriptor(this, {
				value: undefined,
				configurable: this.isEval,
				enumerable: true,
				writable: true
			});
		}
	},

	createImmutableBinding: function (name) {
		this.createMutableBinding(name, false);
	},

	initializeImmutableBinding: function (name, value) {
		if (this.hasBinding(name) && !this.bindings[name].value) {
			this.bindings[name].setValue(value);
		}
	},

	setMutableBinding: function (name, value, throwOnError) {
		if (this.hasBinding(name)) {
			if (!this.bindings[name].writable) {
				if (throwOnError) {
					throw new TypeError("Cannot write to immutable binding: " + name);
				}

				return;
			}

			this.bindings[name].setValue(value);
		}
	},

	getBindingValue: function (name, throwOnError) {
		if (this.hasBinding(name)) {
			if (!this.bindings[name].value) {
				if (throwOnError) {
					throw new ReferenceError(name + " is not defined");
				}

				return undefined;
			}

			return this.bindings[name].getValue();
		}
	},

	deleteBinding: function (name) {
		if (!this.hasBinding(name)) {
			return true;
		}

		if (!this.bindings[name].configurable) {
			return false;
		}

		delete this.bindings[name];
		return true;
	},

	getThisBinding: function () {
		return undefined;
	}
};

module.exports = DeclarativeEnvironment;
