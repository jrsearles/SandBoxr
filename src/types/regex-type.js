import {ObjectType} from "./object-type";

export class RegexType extends ObjectType {
	constructor (value) {
		super();
		this.source = value;
		this.className = "RegExp";
	}

	init (env) {
		super.init(...arguments);

		// lastIndex is settable, all others are read-only attributes
		this.defineOwnProperty("lastIndex", {value: env.objectFactory.createPrimitive(this.source.lastIndex), writable: true});

		["source", "global", "ignoreCase", "multiline"].forEach(key => {
			if (env.options.ecmaVersion > 5) {
				let getter = function () { return objectFactory.createPrimitive(this.source[key]); };
				let getterFunc = objectFactory.createGetter(getter, key);

				this.defineOwnProperty(key, {
					getter: getter,
					get: getterFunc,
					configurable: true
				});
			} else {
				this.defineOwnProperty(key, {value: env.objectFactory.createPrimitive(this.source[key])});
			}
		});
	}

	toNative () {
		return this.source;
	}
}
