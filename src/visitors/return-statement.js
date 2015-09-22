import {UNDEFINED} from "../types/primitive-type";

export default function* ReturnStatement (context) {
	if (context.node.argument) {
		return context.exit((yield context.create(context.node.argument).execute()).result.getValue());
	}

	return context.exit(UNDEFINED);
}
