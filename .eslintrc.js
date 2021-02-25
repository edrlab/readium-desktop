module.exports = {
    parser: "@typescript-eslint/parser",
    env: {
        node: true,
        browser: true,
        es6: true,
        es2020: true,
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    extends: [
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "plugin:prettier/recommended",
    ],
    plugins: ["unused-imports", "prettier", "eslint-plugin-local-rules"],
    rules: {
        quotes: ["error", "double"],
        "comma-dangle": ["error", "always-multiline"],
        "eol-last": ["error", "always"],
        semi: ["error", "always"],

        "no-unused-vars": 0,
        "@typescript-eslint/no-unused-vars": 0,
        // "@typescript-eslint/no-unused-vars": [
        //     "error",
        //     {
        //         vars: "all",
        //         args: "all",
        //         argsIgnorePattern: "^_",
        //         varsIgnorePattern: "^_",
        //         caughtErrorsIgnorePattern: "^_",
        //         caughtErrors: "all",
        //     },
        // ],
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
            "error",
            {
                vars: "all",
                args: "all",
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_",
                caughtErrorsIgnorePattern: "^_",
                caughtErrors: "all",
            },
        ],

        // react/jsx-uses-react
        // react/jsx-uses-vars

        // TODO?
        "react/prop-types": 0,

        // TODO! (deprecated and fobidden in strict mode)
        "react/no-find-dom-node": 0,

        // TODO ({} used as anonymous / generic object type)
        "@typescript-eslint/ban-types": 0,

        // TODO (many any!!)
        "@typescript-eslint/no-explicit-any": 0,

        // TODO (missing return types on functions)
        "@typescript-eslint/explicit-module-boundary-types": 0,
        // "@typescript-eslint/explicit-module-boundary-types": [
        //     "error",
        //     {
        //         allowArgumentsExplicitlyTypedAsAny: true,
        //         allowDirectConstAssertionInArrowFunctions: true,
        //         allowedNames: [],
        //         allowHigherOrderFunctions: true,
        //         allowTypedFunctionExpressions: true,
        //     },
        // ],

        // "@typescript-eslint/explicit-function-return-type": 0,
        // "@typescript-eslint/explicit-function-return-type": [
        //     "error",
        //     {
        //         allowExpressions: true,
        //         allowTypedFunctionExpressions: true,
        //     },
        // ],

        "prettier/prettier": "error",
    },
    overrides: [
        {
            files: ["./**/*.ts"],
            excludedFiles: ["./**/*.spec.ts"],
            rules: {
                "local-rules/typed-redux-saga-use-typed-effects": "error",
                "local-rules/typed-redux-saga-delegate-effects": "error",
            },
        },
    ],
    // overrides: [
    //     {
    //         files: ["*.ts", "*.tsx"],
    //         rules: {
    //             "@typescript-eslint/explicit-function-return-type": [
    //                 "error",
    //                 {
    //                     allowExpressions: true,
    //                 },
    //             ],
    //         },
    //     },
    // ],
};
