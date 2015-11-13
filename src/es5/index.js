import {UNDEFINED, NULL} from "../types/primitive-type";
import {ObjectFactory} from "../types/object-factory";
import numberAPI from "./number/";
import stringAPI from "./string/";
import functionAPI from "./function/";
import objectAPI from "./object/";
import booleanAPI from "./boolean/";
import dateAPI from "./date/";
import arrayAPI from "./array/";
import mathAPI from "./math/";
import regexAPI from "./regex/";
import errorAPI from "./error/";
import jsonAPI from "./json/";
import consoleAPI from "./console/";
import globalAPI from "./globals";

const frozen = {configurable: false, enumerable: false, writable: false};

export default function ecma51 (env) {
	const objectFactory = env.objectFactory = new ObjectFactory(env);
	const globalObject = env.global = objectFactory.createObject();

	env.createObjectScope(globalObject);

	globalObject.define("undefined", UNDEFINED, frozen);
	globalObject.define("null", NULL, frozen);

	// todo: node vs browser - do we care?
	globalObject.define("window", globalObject, frozen);

	functionAPI(env);
	objectAPI(env);
	arrayAPI(env);
	booleanAPI(env);
	numberAPI(env);
	stringAPI(env);
	dateAPI(env);
	regexAPI(env);
	mathAPI(env);
	errorAPI(env);
	jsonAPI(env);
	consoleAPI(env);
	globalAPI(env);
}
