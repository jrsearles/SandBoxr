export default function DebuggerStatement (context) {
	if (context.env.options.allowDebugger) {
		/* eslint no-debugger: 0 */
		debugger;
	}

	return context.empty();
}
