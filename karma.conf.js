// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

import path from "node:path";
import { fileURLToPath } from "node:url";
import angularKarmaPlugin from "@angular-devkit/build-angular/plugins/karma";
import karmaChromeLauncher from "karma-chrome-launcher";
import karmaCoverage from "karma-coverage";
import karmaJasmine from "karma-jasmine";
import karmaJasmineHtmlReporter from "karma-jasmine-html-reporter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (config) => {
	config.set({
		basePath: "",
		frameworks: ["jasmine", "@angular-devkit/build-angular"],
		plugins: [
			karmaJasmine,
			karmaChromeLauncher,
			karmaJasmineHtmlReporter,
			karmaCoverage,
			angularKarmaPlugin,
		],
		client: {
			jasmine: {
				// you can add configuration options for Jasmine here
				// the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
				// for example, you can disable the random execution with `random: false`
				// or set a specific seed with `seed: 4321`
			},
		},
		jasmineHtmlReporter: {
			suppressAll: true, // removes the duplicated traces
		},
		coverageReporter: {
			dir: path.join(__dirname, "./coverage/frontend"),
			subdir: ".",
			reporters: [{ type: "html" }, { type: "text-summary" }],
		},
		reporters: ["progress", "kjhtml"],
		browsers: ["Chrome"],
		restartOnFileChange: true,
	});
};
