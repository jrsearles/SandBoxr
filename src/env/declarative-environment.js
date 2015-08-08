import Reference from "./reference";
import PropertyDescriptor from "../types/property-descriptor";

export default class DeclarativeEnvironment {
	constructor (parent, thisArg, env) {
		this.properties = Object.create(null);
		this.parent = parent;
		this.thisNode = thisArg;
		this.env = env;
	}

	getReference (name, strict) {
		return new Reference(name, this, strict, this.env);
	}

	hasVariable (name) {
		return name in this.properties;
	}

	getVariable (name) {
		return this.properties[name];
	}

	deleteVariable (name) {
		if (!this.hasVariable(name)) {
			return true;
		}

		if (!this.properties[name].configurable) {
			return false;
		}

		delete this.properties[name];
		return true;
	}

	createVariable (name) {
		if (this.hasVariable(name)) {
			return this.properties[name];
		}

		return this.properties[name] = new PropertyDescriptor(this, {
			value: undefined,
			configurable: false,
			enumerable: true,
			writable: true
		});
	}

	putValue (name, value, throwOnError) {
		if (this.hasVariable(name)) {
			if (!this.properties[name].writable) {
				if (throwOnError) {
					throw new TypeError(`Cannot write to immutable binding: ${name}`);
				}

				return;
			}

			this.properties[name].setValue(value);
		} else {
			this.parent.putValue.apply(this.parent, arguments);
		}
	}

	getValue (name, throwOnError) {
		if (this.hasVariable(name)) {
			if (!this.properties[name].value) {
				if (throwOnError) {
					throw new ReferenceError(`${name} is not defined`);
				}

				return undefined;
			}

			return this.properties[name].getValue();
		}
	}

	getThisBinding () {
		return this.thisNode;
	}
}
