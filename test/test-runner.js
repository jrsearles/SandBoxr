import * as parser from "./ast-parser";
import {expect} from "chai";
import * as SandBoxr from "../";

export default {
	runBlock (code) {
		return this.getRunner(code).execute();
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
			expect(err.toNative()).to.be.instanceOf(errType);
			done && done();
		}
	},

	getScope (code) {
		let env = SandBoxr.createEnvironment();
		env.init();

		let runner = this.getRunner(code);
		return runner.resolve(env).then(function () {
			return env;
		});
	},

	getRunner (code) {
		let ast = parser.parse(code);
		return SandBoxr.create(ast);
	},

	wrapArgs (args) {
		return args.map(arg => {
			return typeof arg === "string" ? `'${arg}'` : String(arg);
		}).join(",");
	}
};
