import {Reference} from "./reference";
import {PropertyDescriptor} from "../types/property-descriptor";
import {UNDEFINED} from "../types/primitive-type";

export class DeclarativeEnvironment {
	constructor (parent, thisArg, env, strict) {
		this.properties = Object.create(null);
		this.parent = parent && parent.scope;
		this.thisBinding = thisArg;
		this.env = env;
		this.strict = strict;
	}
	
	createChildScope () {
		return new DeclarativeEnvironment({scope: this}, this.thisBinding, this.env, this.strict);
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
	
	getVariable (key) {
		return this.properties[key];
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

	createVariable (key, {configurable = false, writable = true, initialized = true} = {}) {
		if (this.has(key)) {
			return this.properties[key];
		}

		return this.properties[key] = new PropertyDescriptor(this, {value: undefined, enumerable: true, configurable, writable, initialized});
	}

	setValue (key, value, throwOnError) {
		let propInfo = this.properties[key];
		if (propInfo) {
			if (!propInfo.initialized) {
				throw ReferenceError(`${key} cannot be set before it has been declared`);
			}
			
			if (propInfo.initialized && !propInfo.writable) {
				throw TypeError(`Cannot write to immutable binding: ${key}`);
			}

			propInfo.setValue(value);
			return true;
		} else {
			return this.parent.setValue(...arguments);
		}
	}

	getValue (key, throwOnError) {
		let propInfo = this.properties[key];
		if (propInfo && propInfo.value) {
			return propInfo.value;
		}
		
		if (throwOnError || (propInfo && !propInfo.initialized)) {
			throw ReferenceError(`${key} is not defined`);
		}
		
		return UNDEFINED;
	}

	getThisBinding () {
		return this.thisBinding;
	}
}
