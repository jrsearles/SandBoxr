import * as contracts from "../utils/contracts";

export default function* WithStatement (context) {
	if (context.env.isStrict()) {
		return context.raise(new SyntaxError("Strict mode code may not include a with statement"));
	}

	let obj = (yield context.create(context.node.object).execute()).result.getValue();

	if (contracts.isNullOrUndefined(obj)) {
		return context.raise(new TypeError(`${obj.className} has no properties`));
	}

	let scope = context.env.createObjectScope(obj, context.env.getThisBinding());
	scope.init(context.node.body);

	return yield scope.use(function* () {
		return yield context.create(context.node.body).execute();
	});
}
