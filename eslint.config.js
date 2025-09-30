// eslint.config.js
import {defineConfig, globalIgnores} from "eslint/config";
import js from '@eslint/js';
import globals from 'globals';

export default defineConfig(
    [
        {
            rules: {
                semi: "error",
                "prefer-const": "error",
            },
            plugins: {
                js
            },
            extends: [
                "js/recommended",
            ],
            languageOptions: {
                sourceType: "module",
                globals: {
                    ...globals.node,
                }
            },
        },
    ],
    globalIgnores(['dist/**/*']),
);
