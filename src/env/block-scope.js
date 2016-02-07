import {inherits} from "util";
import {Scope} from "./scope";
import {reset} from "../utils/assign";

export function BlockScope (env, scope, node) {
  Scope.call(this, env, scope);
  this.node = node;
}

inherits(BlockScope, Scope);

BlockScope.prototype.use = function* (inner) {
  if (this.node.hasBindings()) {
    return yield Scope.prototype.use.call(this, inner);
  }
  
  return yield inner();
};

BlockScope.prototype.reset = function* (initNode) {
  if (this.node.hasBindings()) {
    this.exit();
    let nextScope = this.env.createBlockScope(this.node);
    
    if (initNode) {
      yield reset(this.env, initNode, this.scope, nextScope.scope);
    }
    
    return nextScope;
  }
  
  return this;
};
