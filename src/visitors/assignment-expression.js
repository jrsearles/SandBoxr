import Reference from "../env/reference";
import operators from "../utils/operators";
import {degenerate} from "../utils/async";

var assignOperators = {
	"+=": operators["+"],
	"-=": operators["-"],
	"*=": operators["*"],
	"/=": operators["/"],
	"%=": operators["%"],
	"<<=": operators["<<"],
	">>=": operators[">>"],
	">>>=": operators[">>>"],
	"|=": operators["|"],
	"^=": operators["^"],
	"&=": operators["&"]
};

export default degenerate(function* AssignmentExpression (context) {
	var assignment = context.node.operator === "=";
	var right = (yield context.create(context.node.right).execute()).result;

	var left = (yield context.create(context.node.left).execute()).result;
	if (!(left instanceof Reference)) {
		throw new ReferenceError("Invalid left-hand side in assignment");
	}

	var newValue;
	if (assignment) {
		newValue = right.getValue();
	} else {
		var rawValue = assignOperators[context.node.operator](context.env, left.getValue(), right.getValue());
		newValue = context.env.objectFactory.createPrimitive(rawValue);
	}

	left.putValue(newValue);
	return context.result(newValue);
});
