import {PropertyReference} from "./property-reference";
import {DeclarativeEnvironment} from "./declarative-environment";

export class ObjectEnvironment {
	constructor (parent, obj, thisArg, env, strict) {
		this.parent = parent && parent.scope;
		this.object = obj;
		this.thisBinding = thisArg || obj;
		this.env = env;
		this.strict = strict;
		this.block = false;
	}
	
	createChildScope () {
		return new DeclarativeEnvironment({scope: this}, this.thisBinding, this.env, this.strict, true);
	}

	getReference (key, unqualified) {
		let ref = new PropertyReference(key, this.object, this.env);
		ref.unqualified = unqualified;
		return ref;
	}

	has (key) {
		return this.parent ? this.parent.has(key) : this.owns(key);
	}

	owns (key) {
		return this.object.has(key);
	}

	getVariable (key) {
		return this.object.getProperty(key);
	}

	deleteVariable (key) {
		return this.object.deleteProperty(key, false);
	}

	createVariable (key, {configurable = true, writable = true, initialized = true} = {}) {
		if (!this.owns(key)) {
			if (this.parent) {
				return this.parent.createVariable(...arguments);
			}

			this.object.defineProperty(key, {value: undefined, enumerable: true, configurable, writable, initialized}, this.env.isStrict());
		}
		
		return this.object.getProperty(key);
	}

	setValue (key, value, throwOnError) {
		if (this.parent && !this.object.has(key)) {
			this.parent.setValue(...arguments);
		} else {
			this.object.setValue(key, value, throwOnError);
		}
	}

	getValue (key, throwOnError) {
		if (!this.owns(key)) {
			if (throwOnError) {
				throw ReferenceError(`${key} is not defined.`);
			}

			return undefined;
		}

		return this.object.getValue(key);
	}

	getThisBinding () {
		return this.thisBinding;
	}
}
