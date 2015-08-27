import "../polyfills";

function isThenable (obj) {
	return obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
}

function isNextable (obj) {
	return obj && typeof obj === "object" && typeof obj.next === "function";
}

export function degenerate (fn) {
	return function () {
		var generator = fn.apply(this, arguments);
		
		function handle (result) {
			if (result.done) {
				return result.value;
			}
			
			if (isThenable(result.value)) {
				return result.value.then(res => handle(generator.next(res)), err => handle(generator.throw(err)));
			}
			
			return handle(generator.next(result.value));
		}
		
		return handle(generator.next());
	};
}

export function promisify (obj) {
	if (isThenable(obj)) {
		return obj;
	}
	
	if (isNextable(obj)) {
		let result;
		while (result = obj.next()) {
			if (isThenable(result.value)) {
				return result.value;
			}
			
			if (result.done) {
				return Promise.resolve(result.value);
			}
		}
	}
	
	return Promise.resolve(obj);
}
