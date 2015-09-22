import {UNDEFINED} from "../types/primitive-type";
import EstreeWalker from "../estree-walker";
import {visit as hoister} from "./hoister";
import * as contracts from "../utils/contracts";
import rules from "../syntax-rules";

function validateSyntax (root) {
	for (let node of EstreeWalker.create(root)) {
		if (node.type in rules) {
			rules[node.type](node, true);
		}
	}
}

export class Scope {
	constructor (env, scope) {
		env.globalScope = env.globalScope || this;

		this.scope = scope;
		this.env = env;
		this.priorScope = (env.current || env.globalScope).scope;
	}

	init (node) {
		if (!node) {
			return;
		}

		let env = this.env;
		this.scope.strict = contracts.isStrictNode(node.body);

		let strict = this.scope.strict || env.isStrict();
		if (strict && node.type === "Program") {
			validateSyntax(node);
		}

		hoister(node, decl => {
			let name = decl.name || decl.id.name;
			contracts.assertIsValidParameterName(name, strict);

			let value = UNDEFINED;
			if (decl.type === "FunctionDeclaration") {
				// functions can be used before they are defined
				value = env.objectFactory.createFunction(decl, null, null, strict || contracts.isStrictNode(decl.body.body));
				value.bindScope(this);
			} else if (this.scope.hasProperty(name)) {
				return;
			}

			let newVar = env.createVariable(name, true);
			newVar.setValue(value);
		});
	}

	loadArgs (params, args, callee) {
		let env = this.env;
		let scope = this.scope;

		let strict = env.isStrict() || callee.isStrict();

		let argumentList = env.objectFactory.createArguments(args, callee, strict);
		scope.createVariable("arguments");
		scope.putValue("arguments", argumentList);

		params.forEach(function (param, index) {
			contracts.assertIsValidParameterName(param.name, strict);

			if (!callee.isStrict() && !scope.hasProperty(param.name)) {
				let descriptor = scope.createVariable(param.name);
				if (args.length > index) {
					argumentList.mapProperty(index, descriptor);
				}
			}

			scope.putValue(param.name, args[index] || UNDEFINED);
		});

		// just set value if additional, unnamed arguments are passed in
		let i = callee.isStrict() ? 0 : params.length;
		let length = args.length;

		for (; i < length; i++) {
			argumentList.defineOwnProperty(i, {
				value: args[i],
				configurable: true,
				enumerable: true,
				writable: true
			});
		}

		argumentList.defineOwnProperty("length", {
			value: env.objectFactory.createPrimitive(length),
			configurable: true,
			enumerable: false,
			writable: true
		});
	}

	*use (inner) {
		try {
			let result = yield inner();
			this.exit();
			return result;
		} catch (err) {
			this.exit();
			throw err;
		}
	}

	exit () {
		this.env.setScope(this.priorScope);
	}
}
