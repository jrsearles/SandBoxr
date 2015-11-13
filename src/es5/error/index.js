import {toString} from "../../utils/native";
import {isNullOrUndefined} from "../../utils/contracts";

const errorTypes = ["TypeError", "ReferenceError", "SyntaxError", "RangeError", "URIError", "EvalError"];

export default function errorApi (env) {
	const {global: globalObject, objectFactory} = env;

	let proto = objectFactory.createObject();
	proto.className = "Error";
	proto.define("name", objectFactory.createPrimitive("Error"));
	proto.define("message", objectFactory.createPrimitive(""));

	let errorClass = objectFactory.createFunction(function* (message) {
		let messageString;
		if (!isNullOrUndefined(message)) {
			messageString = yield toString(message);
		}

		return objectFactory.create("Error", new Error(messageString));
	}, proto, {configurable: false, enumerable: false, writable: false});

	proto.define("toString", objectFactory.createBuiltInFunction(function* () {
		let name = this.node.getValue("name");
		let msg;

		if (this.node.has("message")) {
			msg = yield toString(this.node.getValue("message"));
		}

		name = name && (yield toString(name));
		if (name && msg) {
			return objectFactory.create("String", name + ": " + msg);
		}

		return objectFactory.create("String", name || msg);
	}, 0, "Error.prototype.toString"));

	globalObject.define("Error", errorClass);

	errorTypes.forEach(errorType => {
		let typeProto = objectFactory.createObject();
		typeProto.define("name", objectFactory.createPrimitive(errorType));

		// add to prototype chain to represent inheritance
		typeProto.setPrototype(proto);

		let errClass = objectFactory.createFunction(function* (message) {
			let messageString = yield toString(message);
			let nativeError = new global[errorType](messageString);
			return objectFactory.create(errorType, nativeError);
		}, typeProto, {configurable: false, enumerable: false, writable: false});

		globalObject.define(errorType, errClass);
	});
}
