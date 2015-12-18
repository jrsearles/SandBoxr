export default function InterruptStatement (node, context) {
	let label;
	
	if (node.label) {
		label = node.label.name;
	}

	if (node.isBreakStatement()) {
		return context.cancel(label);
	}

	return context.skip(label);
}
