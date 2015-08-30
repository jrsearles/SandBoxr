import PropertyReference from "./property-reference";

export default class ObjectEnvironment {
	constructor (parent, obj, thisArg, env) {
		this.parent = parent;
		this.strict = parent && parent.strict;
		this.object = obj;
		this.thisBinding = thisArg || obj;
		this.env = env;
	}

	getReference (name, unqualified) {
		var ref = new PropertyReference(name, this.object, this.env);
		ref.unqualified = unqualified;
		return ref;
	}

	hasProperty (name) {
		return this.parent ? this.parent.hasProperty(name) : this.hasOwnProperty(name);
	}
	
	hasOwnProperty (name) {
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
			}, this.env.isStrict());

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
		if (!this.hasOwnProperty(name)) {
			if (throwOnError) {
				throw new ReferenceError(`${name} is not defined.`);
			}

			return undefined;
		}

		return this.object.getProperty(name).getValue();
	}

	getThisBinding () {
		return this.thisBinding;
	}
}
