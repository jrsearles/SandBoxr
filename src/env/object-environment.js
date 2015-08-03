import PropertyReference from "./property-reference";

export default class ObjectEnvironment {
	constructor (parent, obj, env) {
		this.parent = parent;
		this.object = this.thisNode = obj;
		this.env = env;
	}

	getReference (name, strict) {
		return new PropertyReference(name, this.object, strict, this.env);
	}

	hasVariable (name) {
		return this.object.hasProperty(name);
	}

	getVariable (name) {
		return this.object.getProperty(name);
	}

	deleteVariable (name) {
		return this.object.deleteProperty(name, false);
	}

	createVariable (name, immutable) {
		if (this.parent) {
			return this.parent.createVariable.apply(this.parent, arguments);
		} else {
			this.object.defineOwnProperty(name, {
				value: undefined,
				configurable: immutable,
				enumerable: true,
				writable: true
			}, true);

			return this.object.getProperty(name);
		}
	}

	putValue (name, value, throwOnError) {
		if (this.parent && !this.object.hasProperty(name)) {
			this.parent.putValue.apply(this.parent, arguments);
		} else {
			this.object.putValue(name, value, throwOnError);
		}
	}

	getValue (name, throwOnError) {
		if (!this.hasVariable(name)) {
			if (throwOnError) {
				throw new ReferenceError(`${name} is not defined.`);
			}

			return undefined;
		}

		return this.object.getProperty(name).getValue();
	}

	getThisBinding () {
		return this.object;
	}
}
