var convert = require("../utils/convert");
var contracts = require("../utils/contracts");

module.exports = function (env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var regexClass = objectFactory.createFunction(function (pattern, flags) {
		if (pattern && pattern.className === "RegExp") {
			if (!contracts.isUndefined(flags)) {
				throw new TypeError("Cannot supply flags when constructing one RegExp from another");
			}

			return pattern;
		}

		var patternString = contracts.isUndefined(pattern) ? "" : convert.toString(env, pattern);
		flags = contracts.isUndefined(flags) ? "" : convert.toString(env, flags);

		return objectFactory.create("RegExp", new RegExp(patternString, flags));
	}, null, { configurable: false, enumerable: false, writable: false });

	var proto = regexClass.getProperty("prototype").getValue();
	proto.className = "RegExp";

	proto.define("test", objectFactory.createBuiltInFunction(function (str) {
		var stringValue = convert.toString(env, str);

		this.node.source.lastIndex = convert.toInt32(env, this.node.getProperty("lastIndex").getValue());
		var testValue = this.node.source.test(stringValue);
		this.node.putValue("lastIndex", objectFactory.createPrimitive(this.node.source.lastIndex));

		return objectFactory.createPrimitive(testValue);
	}, 1, "RegExp.prototype.test"));

	proto.define("exec", objectFactory.createBuiltInFunction(function (str) {
		var stringValue = convert.toString(env, str);

		// update underlying regex in case the index was manually updated
		this.node.source.lastIndex = convert.toInt32(env, this.node.getProperty("lastIndex").getValue());

		// get match from underlying regex
		var match = this.node.source.exec(stringValue);

		// update the last index from the underlying regex
		this.node.putValue("lastIndex", objectFactory.createPrimitive(this.node.source.lastIndex));

		if (match) {
			var arr = objectFactory.create("Array");
			for (var i = 0, ln = match.length; i < ln; i++) {
				arr.putValue(i, objectFactory.createPrimitive(match[i]));
			}

			// extra properties are added to the array
			arr.putValue("index", objectFactory.createPrimitive(match.index), false, this);
			arr.putValue("input", objectFactory.createPrimitive(match.input), false, this);
			return arr;
		}

		return this.env.global.getProperty("null").getValue();
	}, 1, "RegExp.prototype.exec"));

	proto.define("toString", objectFactory.createBuiltInFunction(function () {
		return objectFactory.createPrimitive(String(this.node.source));
	}, 0, "RegExp.prototype.toString"));

	proto.define("compile", convert.toNativeFunction(env, RegExp.prototype.compile, "RegExp.prototype.compile"));
	proto.defineOwnProperty("lastIndex", { value: objectFactory.createPrimitive(0), writable: true });

	["global", "ignoreCase", "multiline", "source"].forEach(name => {
		proto.defineOwnProperty(name, { value: objectFactory.createPrimitive(RegExp.prototype[name]) });
	});

	globalObject.define("RegExp", regexClass);
};
