import {toString} from "../utils/native";
import * as contracts from "../utils/contracts";

const errorTypes = ["TypeError", "ReferenceError", "SyntaxError", "RangeError", "URIError", "EvalError"];

export default function errorApi (env) {
	const globalObject = env.global;
	const objectFactory = env.objectFactory;

	let errorClass = objectFactory.createFunction(function* (message) {
		let messageString;
		if (!contracts.isNullOrUndefined(message)) {
			messageString = yield toString(env, message);
		}

		return objectFactory.create("Error", new Error(messageString));
	}, null, { configurable: false, enumerable: false, writable: false });

	let proto = errorClass.getValue("prototype");
	proto.className = "Error";
	proto.define("name", objectFactory.createPrimitive("Error"));
	proto.define("message", objectFactory.createPrimitive(""));

	proto.define("toString", objectFactory.createBuiltInFunction(function* () {
		let name = this.node.getValue("name");
		let msg;

		if (this.node.hasProperty("message")) {
			msg = yield toString(env, this.node.getValue("message"));
		}

		name = name && (yield toString(env, name));
		if (name && msg) {
			return objectFactory.create("String", name + ": " + msg);
		}

		return objectFactory.create("String", name || msg);
	}, 0, "Error.prototype.toString"));

	globalObject.define("Error", errorClass);

	errorTypes.forEach(errorType => {
		let errClass = objectFactory.createFunction(function* (message) {
			let messageString = yield toString(env, message);
			let nativeError = new global[errorType](messageString);
			return objectFactory.create(errorType, nativeError);
		}, null, { configurable: false, enumerable: false, writable: false });

		let typeProto = errClass.getValue("prototype");
		typeProto.define("name", objectFactory.createPrimitive(errorType));

		// add to prototype chain to represent inheritance
		typeProto.setPrototype(proto);

		globalObject.define(errorType, errClass);
	});
}
