const defaultKeys = {};
defaultKeys.ArrayExpression = ["elements"];
defaultKeys.AssignmentExpression = ["right", "left"];
defaultKeys.BinaryExpression = defaultKeys.LogicalExpression = ["left", "right"];
defaultKeys.BlockStatement = defaultKeys.Program = ["body"];
defaultKeys.BreakStatement = defaultKeys.ContinueStatement = ["label"];
defaultKeys.CallExpression = defaultKeys.NewExpression = ["callee", "arguments"];
defaultKeys.CatchClause = ["param", "body"];
defaultKeys.ConditionalExpression = defaultKeys.IfStatement = ["test", "consequent", "alternate"];
defaultKeys.DoWhileStatement = ["body", "test"];
defaultKeys.ExpressionStatement = ["expression"];
defaultKeys.ForStatement = ["init", "test", "body", "update"];
defaultKeys.ForInStatement = ["right", "left", "body"];
defaultKeys.FunctionDeclaration = defaultKeys.FunctionExpression = ["id", "params", "body"];
defaultKeys.LabeledStatement = ["label", "body"];
defaultKeys.MemberExpression = ["object", "property"];
defaultKeys.ObjectExpression = ["properties"];
defaultKeys.Property = ["key", "value"];
defaultKeys.ThrowStatement = defaultKeys.UnaryExpression = defaultKeys.UpdateExpression = defaultKeys.ReturnStatement = ["argument"];
defaultKeys.SequenceExpression = ["expressions"];
defaultKeys.SwitchStatement = ["discriminant", "cases"];
defaultKeys.SwitchCase = ["consequent"];
defaultKeys.TryStatement = ["block", "handler", "finalizer"];
defaultKeys.VariableDeclaration = ["declarations"];
defaultKeys.VariableDeclarator = ["id", "init"];
defaultKeys.WhileStatement = ["test", "body"];
defaultKeys.WithStatement = ["object", "body"];

// ignore
defaultKeys.DebuggerStatement = defaultKeys.EmptyStatement = defaultKeys.Identifier = defaultKeys.Literal = defaultKeys.ThisExpression = [];

function* walk (visitors, node, parent, state, w) {
	// create a bound walk function to pass to visitors so they can
	// continue walking their child nodes
	w = w || walk.bind(null, visitors);

	if (Array.isArray(node)) {
		for (let i = 0, ln = node.length; i < ln; i++) {
			yield* walk(visitors, node[i], parent, state, w);
		}
	} else if (node) {
		let visitor = visitors[node.type];
		if (typeof visitor === "function") {
			yield* visitor(node, parent, state, w);
		}
	}
}

function makeVisitor (keys) {
	// if (keys.length === 0) {
	// 	return null;
	// }

	return function* visitor (node, parent, state, w) {
		yield node;
		
		for (let i = 0, ln = keys.length; i < ln; i++) {
			let key = keys[i];
			if (node[key]) {
				yield* w(node[key], node, state);
			}
		}
	};
}

function* defaultVisitor (node, parent, state, w) {
	yield node;

	if (node.type in defaultKeys) {
		for (let i = 0, ln = defaultKeys[node.type].length; i < ln; i++) {
			let childKey = defaultKeys[node.type][i];
			let child = node[childKey];

			if (child) {
				yield* w(child, node, state);
			}
		}
	}
}

function extendVisitors (visitors) {
	Object.keys(visitors).forEach(key => {
		let visitor = visitors[key];

		if (Array.isArray(visitor)) {
			visitors[key] = makeVisitor(visitor);
		}	else if (visitors[key] === true) {
			visitors[key] = defaultVisitor;
		}
	});

	return visitors;
}

// make default visitor
// function* defaultVisitor (node, parent, state, w) {
// 	yield node;

// 	for (let i = 0, ln = defaultKeys[node.type]; i < ln; i++) {
// 		let childKey = defaultKeys[node.type][i];
// 		let child = node[childKey];

// 		if (child) {
// 			yield* w(child, node, state);
// 		}
// 	}
// }

const defaultVisitors = {};
Object.keys(defaultKeys).forEach(key => defaultVisitors[key] = defaultVisitor);

function wrapVisitors (visitors, baseVisitors) {
	let wrappedVisitors = Object.assign({}, baseVisitors);

	Object.keys(visitors).forEach(key => {
		if (visitors[key] === false) {
			wrappedVisitors[key] = false;
			return;
		}
		
		if (Array.isArray(visitors[key])) {
			wrappedVisitors[key] = makeVisitor(visitors[key]);
			return;
		}
		
		let baseVisitor = baseVisitors[key];

		wrappedVisitors[key] = function* (...args) {
			let result = yield visitors[key](...args);
			if (result !== false && baseVisitor) {
				yield* baseVisitor(...args);
			}
		};
	});

	return wrappedVisitors;
}

export default class EstreeWalker {
	constructor (node, visitors, state) {
		this.root = node;
		this.visitors = visitors;
		this.state = state;
	}

	[Symbol.iterator] () {
		return walk(this.visitors, this.root, null, this.state);
	}

	static create (node, visitors, state) {
		return new EstreeWalker(node, visitors || defaultVisitors, state);
	}

	static walk (node, visitors, state) {
		let wrappedVisitors = wrapVisitors(visitors, defaultVisitors);
		let it = walk(wrappedVisitors, node, null, state);
		let done = false;
		let value;
		
		do {
			({done, value} = it.next(value));
		} while (!done);
	}

	static extend (node, visitors, state) {
		let merged = Object.assign({}, defaultKeys, visitors);
		return EstreeWalker.create(node, extendVisitors(merged), state);
	}
};
