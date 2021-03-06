import { access, readFile, writeFile } from 'fs/promises';
import { setPath } from './object-utils.js';

// path to where node is executing
const __rootdir = process.env.PWD;
const __configdir = process.env.CONFIG_DIR || __rootdir;

// path to config file
const configJson = `${__configdir}/config.json`;

let config;

// process checks if config.json is found
try {
    await access(configJson);
    // reading config.json
    config = JSON.parse((await readFile(new URL(configJson, import.meta.url))).toString());
} catch (error) {
    console.debug('No config.json file found.');
    config = {};
}

// adding rootdir to config object
config.rootdir = __rootdir;

config.save = async () => {
    await writeFile(configJson, JSON.stringify(config));
};

// overriding or creating values with environment
for (const envKey in process.env) {
    if (Object.prototype.hasOwnProperty.call(process.env, envKey)) {
        const path = envKey
            .replaceAll('_', '.')
            .toLowerCase();
        try {
            setPath(path, config, process.env[envKey]);
        } catch(error) {
            console.error(error);
        }
    }
}

export {
    config,
};
