var objectRgx = /\[object (\w+)\]/;
var integerRgx = /^-?\d+$/;

module.exports = {
	assertIsObject: function (obj, methodName, message) {
		if (!this.isObject(obj)) {
			throw new TypeError(methodName + " called on non-object");
		}
	},

	assertIsNotNullOrUndefined: function (value, methodName) {
		if (this.isNullOrUndefined(value)) {
			throw new TypeError(methodName + " called on null or undefined");
		}
	},

	assertArgIsNotNullOrUndefined: function (obj) {
		if (this.isNullOrUndefined(obj)) {
			throw new TypeError("Cannot convert null or undefined to object");
		}
	},

	assertIsFunction: function (obj, toString) {
		if (!obj || obj.className !== "Function") {
			throw new TypeError("%s is not a function");
		}
	},

	assertIsNotConstructor: function (context, methodName) {
		if (context.isNew) {
			throw new TypeError(methodName + " is not a constructor");
		}
	},

	assertIsValidArrayLength: function (length) {
		if (!this.isValidArrayLength(length)) {
			throw new RangeError("Invalid array length");
		}
	},

	assertIsValidParameterName: function (name) {
		if (/^\d|[;\(\)"']/.test(name)) {
			throw new SyntaxError("Unexpected token in " + name);
		}
	},

	isValidArrayLength: function (length) {
		return this.isInteger(length) && length >= 0 && length < 4294967296;
	},

	isObject: function (obj) {
		if (!obj) {
			return false;
		}

		if (obj.isPrimitive) {
			return obj.value && obj.type === "object";
		}

		return true;
	},

	areSame: function (a, b) {
		if (a.type !== b.type) {
			return false;
		}

		if (a.isPrimitive && b.isPrimitive) {
			if (a.value === undefined) {
				return true;
			}

			if (a.value === null) {
				return true;
			}

			if (a.type === "number") {
				if (isNaN(a.value) && isNaN(b.value)) {
					return true;
				}

				if (a.value === 0) {
					// this will account for negative zero
					return 1 / a.value === 1 / b.value;
				}
			}

			return a.value === b.value;
		}

		return a === b;
	},

	getType: function (obj) {
		return objectRgx.exec(Object.prototype.toString.call(obj))[1];
	},

	isNullOrUndefined: function (obj) {
		return this.isUndefined(obj) || this.isNull(obj);
	},

	isUndefined: function (obj) {
		return !obj || (obj.isPrimitive && obj.value === undefined);
	},

	isNull: function (obj) {
		return obj && obj.isPrimitive && obj.value === null;
	},

	isInteger: function (value) {
		if (typeof value === "string") {
			return integerRgx.test(value);
		}

		if (typeof value === "number") {
			return isFinite(value) && Math.floor(value) === value;
		}

		return false;
	}
};
