import {FunctionType} from "./function-type";
import {PropertyDescriptor} from "./property-descriptor";
import {UNDEFINED} from "./primitive-type";

export class NativeFunctionType extends FunctionType {
	constructor (fn) {
		super();
		this.type = "function";
		this.native = true;
		this.nativeFunction = fn;
	}

	init (env, proto, descriptor) {
		this[Symbol.for("env")] = env;

		let length = this.nativeFunction.length;
		if ("nativeLength" in this.nativeFunction) {
			length = this.nativeFunction.nativeLength;
		}

		if ("strict" in this.nativeFunction) {
			this.strict = this.nativeFunction.strict;
		}

		this.defineOwnProperty("length", {
			value: env.objectFactory.createPrimitive(length),
			configurable: false,
			enumerable: false,
			writable: false
		});

		if (proto !== null) {
			proto = proto || env.objectFactory.createObject();
			proto.properties.constructor = new PropertyDescriptor(this, {configurable: true, enumerable: false, writable: true, value: this});

			descriptor = descriptor || {configurable: false, enumerable: false, writable: true};
			let protoDescriptor = {
				value: proto,
				configurable: descriptor.configurable,
				enumerable: descriptor.enumerable,
				writable: descriptor.writable
			};

			this.defineOwnProperty("prototype", protoDescriptor);
		}
	}

	*call (thisArg, args = [], callee) {
		callee = callee || this;
		let env = this[Symbol.for("env")];

		if (!thisArg) {
			if (this.strict || env.isStrict()) {
				thisArg = UNDEFINED;
			} else {
				thisArg = env.global;
			}
		}

		let self = this;
		let scope = env.createExecutionScope(this, thisArg);

		return yield scope.use(function* () {
			return yield self.nativeFunction.apply(env.createExecutionContext(thisArg, callee), args);
		});
	}

	*construct (thisArg, args = []) {
		let self = this;
		let env = this[Symbol.for("env")];
		let scope = env.createExecutionScope(this, thisArg);

		return yield scope.use(function* () {
			return yield self.nativeFunction.apply(env.createExecutionContext(thisArg, self, true), args);
		});
	}
}
