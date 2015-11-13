import {areSame} from "../utils/operators";
import {exhaust as x} from "../utils/async";
import {owns} from "../utils/object";

const defaultDescriptor = {
	configurable: false,
	enumerable: false,
	writable: false
};

export class PropertyDescriptor {
	constructor (base, config = defaultDescriptor, key) {
		this.base = base;
		this.configurable = config.configurable || false;
		this.enumerable = config.enumerable || false;
		this.key = key;

		if ("get" in config || "set" in config) {
			this.dataProperty = false;
			this.get = config.get;
			this.getter = config.getter;
			this.set = config.set;
			this.setter = config.setter;
		} else {
			this.writable = config.writable || false;
			this.dataProperty = true;
			this.value = config.value;
		}
	}

	bind (obj) {
		this.base = obj;
		return this;
	}

	update (descriptor) {
		for (let prop in descriptor) {
			if (owns(descriptor, prop)) {
				this[prop] = descriptor[prop];
			}
		}

		if ("get" in descriptor || "set" in descriptor) {
			this.writable = undefined;
			this.dataProperty = false;
			this.value = undefined;
		} else if ("value" in descriptor) {
			this.writable = this.writable === undefined ? false : this.writable;
			this.dataProperty = true;
			this.get = this.getter = this.set = this.setter = undefined;
		}
	}

	canUpdate (descriptor) {
		if (this.configurable) {
			return true;
		}

		if ("configurable" in descriptor && this.configurable !== descriptor.configurable) {
			return false;
		}

		if ("enumerable" in descriptor && this.enumerable !== descriptor.enumerable) {
			return false;
		}

		if (("get" in descriptor || "set" in descriptor) && this.dataProperty) {
			return false;
		}

		if ("value" in descriptor && !this.dataProperty) {
			return false;
		}

		if (this.dataProperty) {
			if (!this.writable) {
				if (descriptor.writable) {
					return false;
				}

				return !("value" in descriptor) || areSame(this.value, descriptor.value);
			}

			return true;
		}

		if ("get" in descriptor && this.get !== descriptor.get) {
			return false;
		}

		if ("set" in descriptor && this.set !== descriptor.set) {
			return false;
		}

		return true;
	}

	getValue () {
		if (this.dataProperty) {
			return this.value;
		}

		if (this.getter) {
			return x(this.getter.call(this.base));
		}

		return undefined;
	}

	canSetValue (value) {
		return this.writable || !!this.setter;
	}

	setValue (value) {
		if (!this.canSetValue()) {
			return;
		}

		if (this.dataProperty) {
			this.value = value;
		} else if (this.setter) {
			x(this.setter.call(this.base, value));
		}
	}

	hasValue () {
		return !!this.value || !!this.getter;
	}
}
