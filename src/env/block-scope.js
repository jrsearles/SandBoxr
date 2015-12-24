import {Scope} from "./scope";
import {reset} from "../utils/assign";

export class BlockScope extends Scope {
	constructor (env, scope, node) {
		super(env, scope);
		this.node = node;
	}
	
	*use (inner) {
		if (this.node.hasBindings()) {
			return yield super.use(inner);
		}
		
		return yield inner();
	}
	
	*reset (initNode) {
		if (this.node.hasBindings()) {
			super.exit();
			let nextScope = this.env.createBlockScope(this.node);
			
			if (initNode) {
				yield reset(this.env, initNode, this.scope, nextScope.scope);
			}
			
			return nextScope;
		}
		
		return this;
	}
}