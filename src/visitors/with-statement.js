import {isNullOrUndefined} from "../utils/checks";

export default function* WithStatement (node, context, next) {
  if (context.env.isStrict()) {
    return context.raise(SyntaxError("Strict mode code may not include a with statement"));
  }

  let obj = (yield next(node.object, context)).result.getValue();

  if (isNullOrUndefined(obj)) {
    return context.raise(TypeError(`${obj.className} has no properties`));
  }

  let scope = context.env.createObjectScope(obj, context.env.getThisBinding());
  scope.init(node.body);

  return yield scope.use(function* () {
    return yield next(node.body, context);
  });
}
