export default class Reference {
	constructor (name, base, strict, env) {
		this.name = name;
		this.base = base;
		this.strict = strict;
		this.env = env;
	}
	
	putValue (value) {
		if (this.base === undefined && this.strict) {
			throw new ReferenceError(this.name + " is not defined");
		}

		if (this.base) {
			this.base.putValue(this.name, value, this.strict);
		} else {
			this.env.global.defineOwnProperty(this.name, { value: value, configurable: true, enumerable: true, writable: true }, false);
		}
	}
	
	getValue () {
		if (!this.base) {
			throw new ReferenceError(`${this.name} is not defined`);
		}

		return this.base.getValue(this.name, this.strict);
	}
	
	deleteBinding (name) {
		if (this.base) {
			return this.base.deleteVariable(name);
		}

		return true;
	}
	
	isUnresolved () {
		return !this.base;
	}
}
