import {PrimitiveType} from "./primitive-type";
import {PropertyDescriptor} from "./property-descriptor";
import {isInteger} from "../utils/contracts";

const charAttrs = {writable: false, enumerable: true, configurable: false};

function lazyInit (instance, key) {
	let nativeValue = instance.value;
	if (!nativeValue || !isInteger(key) || "0" in instance.properties) {
		return;
	}

	for (let i = 0, ln = nativeValue.length; i < ln; i++) {
		// we are not using the object factory to avoid circular loop
		let c = new StringType(nativeValue[i]);
		c.setPrototype(instance.proto);
		c.define("0", c, charAttrs);

		instance.define(i, c, charAttrs);
	}
}

export class StringType extends PrimitiveType {
	constructor (value) {
		super(value);
	}

	init (env) {
		super.init(...arguments);
		let length = this.value.length;

		this.properties.length = new PropertyDescriptor(this, {
			configurable: false,
			enumerable: false,
			writable: false,
			value: env.objectFactory.createPrimitive(length)
		});
	}

	getProperty (key) {
		lazyInit(this, key);
		return super.getProperty(...arguments);
	}

	getOwnProperty (key) {
		lazyInit(this, key);
		return super.getOwnProperty(...arguments);
	}

	getOwnPropertyKeys (key) {
		lazyInit(this, key);
		return super.getOwnPropertyKeys(...arguments);
	}

	has (key) {
		lazyInit(this, key);
		return super.has(...arguments);
	}

	owns (key) {
		lazyInit(this, key);
		return super.owns(...arguments);
	}
}
