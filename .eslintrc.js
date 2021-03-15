module.exports = {
    extends: [
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended',
    ],
    plugins: ['react', '@typescript-eslint'],
    env: {
        browser: true,
        es6: true,
        jest: true,
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    rules: {
        'linebreak-style': 'off',
        'react/jsx-sort-props': [
            'error',
            {
                ignoreCase: true,
            },
        ],
        'react/no-array-index-key': 'off',
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
                printWidth: 100,
                singleQuote: true,
                tabWidth: 4,
            },
        ],
    },
};
