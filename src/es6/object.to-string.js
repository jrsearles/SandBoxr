import {isNullOrUndefined, assertIsNotNullOrUndefined} from "../utils/contracts";

export default function (target, env, factory) {
	let stringTagKey = env.getSymbol("toStringTag");

	function objectToString (obj) {
		let tag = obj.className;

		if (!isNullOrUndefined(obj)) {
			let tagProperty = obj.getProperty(stringTagKey);
			if (tagProperty) {
				let tagValue = tagProperty.getValue();
				if (tagValue && tagValue.type === "string") {
					tag = tagValue.toNative();
				}
			}
		}

		return factory.createPrimitive(`[object ${tag}]`);
	};

	target.define("toString", factory.createBuiltInFunction(function () {
		return objectToString(this.object);
	}, 0, "Object.prototype.toString"));

	target.define("toLocaleString", factory.createBuiltInFunction(function () {
		assertIsNotNullOrUndefined(this.object, "Object.prototype.toLocaleString");
		return objectToString(this.object);
	}, 0, "Object.prototype.toLocaleString"));
}
