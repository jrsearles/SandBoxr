import {degenerate} from "../utils/async";

export default degenerate(function* SequenceExpression (context) {
	var value;
	
	for (var expr of context.node.expressions) {
		value = (yield context.create(expr).execute()).result.getValue();
	}
	
	return context.result(value);
});
