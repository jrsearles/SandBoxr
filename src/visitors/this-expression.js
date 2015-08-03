export default function ThisExpression (context) {
	return context.result(context.env.getThisBinding());
}
