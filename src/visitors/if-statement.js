import {toBoolean} from "../utils/native";

export default function* IfStatement (node, context, next) {
	let testValue = (yield next(node.test, context)).result.getValue();
	
	if (toBoolean(testValue)) {
		return yield next(node.consequent, context);
	}

	if (node.alternate) {
		return yield next(node.alternate, context);
	}
	
	return context.empty();
}
