import * as parser from "./ast-parser";
import {expect} from "chai";
import * as SandBoxr from "../";

export default {
	runBlock (code, done) {
		return this.getRunner(code).resolve();
	},

	confirmBlock (code, done) {
		this.runBlock(code)
			.then(result => {
				expect(result.toNative()).to.be.true;
				done();
			}, done);
	},

	confirmError (code, errType, done) {
		this.runBlock(code)
			.then(() => {
				expect(false).to.be.true;
				done();
			},
			err => {
				expect(err).to.be.instanceof(errType);
				done();
			});
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
