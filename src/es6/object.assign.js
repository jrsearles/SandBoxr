import {toObject} from "../utils/native";
import {isNullOrUndefined} from "../utils/contracts";

export default function (objectClass, env, factory) {
	objectClass.define("assign", factory.createBuiltInFunction(function (target, ...sources) {
		let to = toObject(target, true);

		sources.forEach(next => {
			if (!isNullOrUndefined(next)) {
				let source = toObject(next);

				source.getOwnPropertyKeys().forEach(key => {
					let desc = source.getOwnProperty(key);
					if (desc && desc.enumerable) {
						if (!to.setValue(key, desc.getValue())) {
							throw TypeError(`Cannot assign to read only property '${key}'`);
						}
					}
				});
			}
		});

		return to;
	}, 2, "Object.assign"));
}
