import { defineConfig } from 'rolldown';

export default defineConfig({
    input: 'src/config.js',
    output: {
        file: 'dist/config.js',
    },
    platform: 'node',
});