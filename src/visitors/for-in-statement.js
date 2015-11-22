import {toBoolean} from "../utils/native";
import {isNullOrUndefined} from "../utils/contracts";

export default function* ForInStatement (context) {
	let left;
	if (context.node.left.type === "VariableDeclaration") {
		// should only be one, but
		// need to unwrap the declaration to get it
		// todo: this is sloppy - need to revisit
		for (let decl of context.node.left.declarations) {
			left = (yield context.create(decl).execute()).result;
		}
	} else {
		left = (yield context.create(context.node.left).execute()).result;
	}

	let obj = (yield context.create(context.node.right).execute()).result.getValue();

	if (isNullOrUndefined(obj)) {
		return context.empty();
	}

	let it = obj.getIterator(context.env);
	let next = it.getValue("next");
	let done = false;
	let result, priorResult;

	while (!done) {
		let itResult = yield next.call(it);
		done = toBoolean(itResult.getValue("done"));

		if (!done && itResult.has("value")) {
			left.setValue(itResult.getValue("value"));
			result = yield context.create(context.node.body).execute();
			if (result && result.shouldBreak(context, true, priorResult)) {
				return result;
			}
		}

		priorResult = result;
	}

	return result;
}
