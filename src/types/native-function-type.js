import FunctionType from "./function-type";
import PropertyDescriptor from "./property-descriptor";

export default class NativeFunctionType extends FunctionType {
	constructor (fn) {
		super();
		this.type = "function";
		this.native = true;
		this.nativeFunction = fn;
	}

	init (objectFactory, proto, descriptor) {
		var length = this.nativeFunction.length;
		if ("nativeLength" in this.nativeFunction) {
			length = this.nativeFunction.nativeLength;
		}
		
		if ("strict" in this.nativeFunction) {
			this.strict = this.nativeFunction.strict;
		}
		
		this.initStrict(objectFactory);
		this.defineOwnProperty("length", {
			value: objectFactory.createPrimitive(length),
			configurable: false,
			enumerable: false,
			writable: false
		});
	
		proto = proto || objectFactory.createObject();
		proto.properties.constructor = new PropertyDescriptor(this, { configurable: true, enumerable: false, writable: true, value: this });
	
		descriptor = descriptor || { configurable: false, enumerable: false, writable: true };
		var protoDescriptor = {
			value: proto,
			configurable: descriptor.configurable,
			enumerable: descriptor.enumerable,
			writable: descriptor.writable
		};
	
		this.defineOwnProperty("prototype", protoDescriptor);
	}
}
