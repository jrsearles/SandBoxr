import {PrimitiveType} from "./primitive-type";
import {PropertyDescriptor} from "./property-descriptor";

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

		// todo: do this lazily
		let charAttrs = {writable: false, enumerable: true, configurable: false};
		for (let i = 0; i < length; i++) {
			// we are not using the object factory to avoid circular loop
			let c = new StringType(this.value.charAt(i));
			c.setPrototype(this.getProperty());
			c.define("0", c, charAttrs);

			this.define(i, c, charAttrs);
		}
	}
}
