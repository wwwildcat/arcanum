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
        'no-restricted-syntax': ['off'],
        'no-underscore-dangle': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'react/jsx-sort-props': [
            'error',
            {
                ignoreCase: true,
            },
        ],
        'react/no-array-index-key': 'off',
        'react/react-in-jsx-scope': 'off',
        'prefer-destructuring': ['error', { object: true, array: false }],
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
