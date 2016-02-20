import * as parser from "./ast-parser";
import { expect } from "chai";
import * as SandBoxr from "../dist/sandboxr";

function getRunner (code, options) {
  let ast = parser.parse(code, options);
  return SandBoxr.create(ast, options);
};

export function wrapArgs (args) {
  return args.map(arg => {
    return typeof arg === "string" ? `'${arg}'` : String(arg);
  }).join(",");
}

export const es6 = {
  confirmBlock	(code) {
    return getRunner(code, { ecmaVersion: 6 }).execute();
  },

  confirmError (code, errType) {
    try {
      getRunner(code, { ecmaVersion: 6 }).execute();

      expect(false).to.be.true;
    } catch (err) {
      expect(err).to.be.instanceOf(errType);
    }
  },

  parse (code) {
    return parser.parse(code, { ecmaVersion: 6, sourceType: "module" });
  }
};

export const es5 = {
  runBlock (code) {
    return getRunner(code).execute();
  },

  confirmBlock (code, done) {
    let value = this.runBlock(code);
    expect(value.toNative()).to.be.true;
    done && done();
  },

  confirmError (code, errType, done) {
    try {
      this.runBlock(code);

      expect(false).to.be.true;
      done && done();
    } catch (err) {
      expect(err).to.be.instanceOf(errType);
      done && done();
    }
  },

  getScope (code) {
    let env = SandBoxr.createEnvironment();
    env.init();

    let runner = getRunner(code);
    runner.execute(env);
    return env;
  }
};
