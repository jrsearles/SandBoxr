import * as comparers from "../utils/comparers";

var defaultDescriptor = {
	configurable: false,
	enumerable: false,
	writable: false
};

export default class PropertyDescriptor {
	constructor (base, config, value) {
		config = config || defaultDescriptor;
		this.base = base;
		this.configurable = config.configurable || false;
		this.enumerable = config.enumerable || false;
	
		if ("get" in config || "set" in config) {
			this.dataProperty = false;
			this.get = config.get;
			this.getter = config.getter;
			this.set = config.set;
			this.setter = config.setter;
		} else {
			this.writable = config.writable || false;
			this.dataProperty = true;
			this.value = value || config.value;
		}
	}
	
	bind (obj) {
		this.base = obj;
		return this;
	}
	
	update (descriptor) {
		for (var prop in descriptor) {
			if (descriptor.hasOwnProperty(prop)) {
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

				return !("value" in descriptor) || comparers.areSame(this.value, descriptor.value);
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
			return this.getter.call(this.base);
		}

		return undefined;
	}

	canSetValue () {
		return this.writable || !!this.setter;
	}

	setValue (value) {
		if (!this.canSetValue()) {
			return;
		}

		if (this.dataProperty) {
			this.value = value;
		} else if (this.setter) {
			this.setter.call(this.base, value);
		}
	}
}
