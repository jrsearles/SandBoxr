import * as contracts from "../utils/contracts";

export default class Reference {
	constructor (name, base, env) {
		this.name = name;
		this.base = base;
		this.env = env;
		this.strict = env.isStrict();
	}
	
	putValue (value) {
		if (this.base) {
			return this.base.putValue(this.name, value, this.strict);
		}
		
		// todo: always create variable?
		this.env.createVariable(this.name, true);
		contracts.assertIsValidIdentifier(this.name, this.strict);
		if (this.strict) {
			throw new ReferenceError(this.name + " is not defined");
		}
		
		return this.env.putValue(this.name, value);
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
