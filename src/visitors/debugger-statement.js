export default function DebuggerStatement (node, context) {
  if (context.env.options.allowDebugger) {
    /* eslint-disable no-debugger */
    debugger;
    /* eslint-enable no-debugger */
  }

  return context.empty();
}
