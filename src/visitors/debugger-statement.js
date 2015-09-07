export default function DebuggerStatement (context) {
	if (context.env.options.allowDebugger) {
		/* eslint-disable no-debugger */
		debugger;
		/* eslint-enable no-debugger */
	}

	return context.empty();
}
