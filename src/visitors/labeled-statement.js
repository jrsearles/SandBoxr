import {degenerate} from "../utils/async";

export default degenerate(function* LabeledStatement (context) {
	return yield context.createLabel(context.node.body, context.node.label.name).execute();
});
