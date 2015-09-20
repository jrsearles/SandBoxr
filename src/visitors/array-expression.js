export default function* ArrayExpression (context) {
	const objectFactory = context.env.objectFactory;
	let arr = objectFactory.create("Array");

	if (context.node.elements) {
		let i = 0;
		let ln = context.node.elements.length;

		while (i < ln) {
			if (context.node.elements[i]) {
				let item = (yield context.create(context.node.elements[i]).execute()).result.getValue();
				arr.defineOwnProperty(i, { value: item, configurable: true, enumerable: true, writable: true }, true, context.env);
			}

			i++;
		}

		arr.putValue("length", objectFactory.createPrimitive(ln), false, context.env);
	}

	return context.result(arr);
}
