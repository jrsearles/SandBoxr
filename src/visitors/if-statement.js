import {toBoolean} from "../utils/native";

export default function* IfStatement (context) {
	let testValue = (yield context.create(context.node.test).execute()).result.getValue();
	if (toBoolean(testValue)) {
		return yield context.create(context.node.consequent).execute();
	}

	if (context.node.alternate) {
		return yield context.create(context.node.alternate).execute();
	}
}
