import {Reference} from "./reference";
import {PropertyDescriptor} from "../types/property-descriptor";

export class DeclarativeEnvironment {
	constructor (parent, thisArg, env, strict) {
		this.properties = Object.create(null);
		this.parent = parent && parent.scope;
		this.thisBinding = thisArg;
		this.env = env;
		this.strict = strict;
	}

	setParent (parent) {
		this.parent = parent.scope || parent;
	}

	getReference (key) {
		let ref = new Reference(key, this, this.env);
		ref.unqualified = true;
		return ref;
	}

	has (key) {
		return key in this.properties;
	}

	owns (key) {
		return this.has(key);
	}

	deleteVariable (key) {
		if (!this.has(key)) {
			return true;
		}

		if (!this.properties[key].configurable) {
			return false;
		}

		delete this.properties[key];
		return true;
	}

	createVariable (key) {
		if (this.has(key)) {
			return this.properties[key];
		}

		return this.properties[key] = new PropertyDescriptor(this, {
			value: undefined,
			configurable: false,
			enumerable: true,
			writable: true
		});
	}

	setValue (key, value, throwOnError) {
		if (this.has(key)) {
			if (!this.properties[key].writable) {
				if (throwOnError) {
					throw TypeError(`Cannot write to immutable binding: ${key}`);
				}

				return false;
			}

			this.properties[key].setValue(value);
			return true;
		} else {
			return this.parent.setValue(...arguments);
		}
	}

	getValue (key, throwOnError) {
		if (this.has(key)) {
			if (!this.properties[key].value) {
				if (throwOnError) {
					throw ReferenceError(`${key} is not defined`);
				}

				return undefined;
			}

			return this.properties[key].getValue();
		}
	}

	getThisBinding () {
		return this.thisBinding;
	}
}
