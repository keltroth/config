import { access, readFile } from 'fs/promises';
import { resolve, join } from 'path';

// path to where node is executing
const __rootdir = resolve(process.env.PWD);
const __configdir = process.env.CONFIG_DIR ? resolve(process.env.CONFIG_DIR) : __rootdir;

// path to config file
const configJson = join(__configdir, 'config.json');

const config = new Map();

let jsonFileContent;

// process checks if config.json is found
try {
    await access(configJson);
    const loadedConfig = await readFile(resolve(configJson), { encoding: 'utf8' });
    // reading config.json
    jsonFileContent = JSON.parse(loadedConfig);
} catch (error) {
    console.debug(`No config.json file found (${configJson}).`, error);
    jsonFileContent = {};
}

// adding rootdir to config object
config.set('rootdir', __rootdir);
config.set('fileLoaded', configJson);

function flat(obj, prefix= '', delimiter= '.') {
    const result = new Map();
    for (const key of Object.keys(obj)) {
        const newPrefix = prefix !== '' ? prefix + delimiter + key : key;
        if (typeof obj[key] === 'object') {
            const temp = flat(obj[key], newPrefix, delimiter);
            temp.forEach((value, key) => {
                result.set(key, value);
            });
        } else {
            result.set(newPrefix, obj[key]);
        }
    }
    return result;
}

flat(jsonFileContent).forEach((value, key) => {
    config.set(key, value);
});

// overriding or creating values with environment
for (const envKey in process.env) {
    if (Object.prototype.hasOwnProperty.call(process.env, envKey)) {
        const path = envKey.replaceAll('_', '.').toLowerCase();
        try {
            let value = process.env[envKey];
            if (!Number.isNaN(Number.parseInt(value))) {
                value = Number.parseInt(value);
            }

            config.set(path, value);

        } catch(error) {
            console.error(error);
        }
    }
}

export {
    config,
};
