import {degenerate} from "../utils/async";

export default degenerate(function* ThrowStatement (context) {
	// todo: handle more specific errors
	var arg = (yield context.create(context.node.argument).execute()).result.getValue();

	if (arg.isPrimitive) {
		throw arg.value;
	}

	var err = new Error();
	err.wrappedError = arg;
	throw err;
});
