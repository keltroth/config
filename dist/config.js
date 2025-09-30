import { access, readFile } from "fs/promises";
import { join, resolve } from "path";

//#region src/config.js
const __rootdir = resolve(process.env.PWD);
const __configdir = process.env.CONFIG_DIR ? resolve(process.env.CONFIG_DIR) : __rootdir;
const configJson = join(__configdir, "config.json");
const config = /* @__PURE__ */ new Map();
let jsonFileContent;
try {
	await access(configJson);
	const loadedConfig = await readFile(resolve(configJson), { encoding: "utf8" });
	jsonFileContent = JSON.parse(loadedConfig);
} catch (error) {
	console.debug(`No config.json file found (${configJson}).`, error);
	jsonFileContent = {};
}
config.set("rootdir", __rootdir);
config.set("fileLoaded", configJson);
function flat(obj, prefix = "", delimiter = ".") {
	const result = /* @__PURE__ */ new Map();
	for (const key of Object.keys(obj)) {
		const newPrefix = prefix !== "" ? prefix + delimiter + key : key;
		if (typeof obj[key] === "object") flat(obj[key], newPrefix, delimiter).forEach((value, key$1) => {
			result.set(key$1, value);
		});
		else result.set(newPrefix, obj[key]);
	}
	return result;
}
flat(jsonFileContent).forEach((value, key) => {
	config.set(key, value);
});
for (const envKey in process.env) if (Object.prototype.hasOwnProperty.call(process.env, envKey)) {
	const path = envKey.replaceAll("_", ".").toLowerCase();
	try {
		let value = process.env[envKey];
		if (!Number.isNaN(Number.parseInt(value))) value = Number.parseInt(value);
		config.set(path, value);
	} catch (error) {
		console.error(error);
	}
}

//#endregion
export { config };