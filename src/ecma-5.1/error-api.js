import * as convert from "../utils/convert";
import * as contracts from "../utils/contracts";

const errorTypes = ["TypeError", "ReferenceError", "SyntaxError", "RangeError", "URIError", "EvalError"];

function createError (objectFactory, message, name) {
	let options = null;
	if (name) {
		options = { name: name };
	}

	let obj = objectFactory.create("Error", options);

	if (!contracts.isNullOrUndefined(message)) {
		obj.defineOwnProperty("message", { value: message, configurable: true, enumerable: false, writable: true }, false);
	}

	return obj;
}

export default function errorApi (env) {
	const globalObject = env.global;
	const objectFactory = env.objectFactory;
	
	let errorClass = objectFactory.createFunction(function (message) {
		return createError(objectFactory, message);
	}, null, { configurable: false, enumerable: false, writable: false });

	let proto = errorClass.getProperty("prototype").getValue();
	proto.className = "Error";
	proto.define("name", objectFactory.createPrimitive("Error"));
	proto.define("message", objectFactory.createPrimitive(""));

	proto.define("toString", objectFactory.createBuiltInFunction(function () {
		let name = this.node.getProperty("name").getValue();
		let msg;

		if (this.node.hasProperty("message")) {
			msg = convert.toString(env, this.node.getProperty("message").getValue());
		}

		name = name && convert.toString(env, name);
		if (name && msg) {
			return objectFactory.create("String", name + ": " + msg);
		}

		return objectFactory.create("String", name || msg);
	}, 0, "Error.prototype.toString"));

	globalObject.define("Error", errorClass);

	errorTypes.forEach(type => {
		let errClass = objectFactory.createFunction(function (message) {
			return createError(objectFactory, message, type);
		}, null, { configurable: false, enumerable: false, writable: false });

		let typeProto = errClass.getProperty("prototype").getValue();
		typeProto.define("name", objectFactory.createPrimitive(type));

		// add to prototype chain to represent inheritance
		typeProto.setPrototype(proto);

		globalObject.define(type, errClass);
	});
}
