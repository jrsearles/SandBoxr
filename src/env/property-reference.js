import Reference from "./reference";
import PrimitiveType from "../types/primitive-type";

export default class PropertyReference extends Reference {
	constructor (name, object, strict, env) {
		super(name, object, strict, env);
		this.isPropertyReference = true;
	}
	
	getValue () {
		var prop = this.base.getProperty(this.name);
		return prop && prop.getValue() || new PrimitiveType();
	}
	
	putValue (value) {
		if (this.base.hasProperty(this.name)) {
			this.base.putValue(this.name, value, this.strict, this.env);
		} else {
			this.base.defineOwnProperty(this.name, { value: value, configurable: true, enumerable: true, writable: true }, this.strict, this.env);
		}
	}
	
	deleteBinding (name) {
		return this.base.deleteProperty(name, true);
	}
	
	isUnresolved () {
		return false;
	}
}
