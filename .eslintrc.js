module.exports = {
    env: {
        browser: true,
        node: true
    },
    extends: [
        "prettier",
        "prettier/@typescript-eslint"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "tsconfig.json",
        sourceType: "module"
    },
    plugins: [
        "@typescript-eslint",
        "@typescript-eslint/tslint",
        "jsdoc",
        "import",
        "prettier",
        "html",
        "no-null"
    ],
    rules: {
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/array-type": [
            "error",
            {
                default: "array"
            }
        ],
        "@typescript-eslint/ban-types": [
            "error",
            {
                types: {
                    Object: {
                        message: "Avoid using the `Object` type. Did you mean `object`?"
                    },
                    Function: {
                        message: "Avoid using the `Function` type. Prefer a specific function type, like `() => void`."
                    },
                    Boolean: {
                        message: "Avoid using the `Boolean` type. Did you mean `boolean`?"
                    },
                    Number: {
                        message: "Avoid using the `Number` type. Did you mean `number`?"
                    },
                    String: {
                        message: "Avoid using the `String` type. Did you mean `string`?"
                    },
                    Symbol: {
                        message: "Avoid using the `Symbol` type. Did you mean `symbol`?"
                    }
                }
            }
        ],
        "@typescript-eslint/consistent-type-assertions": "error",
        "@typescript-eslint/consistent-type-definitions": "error",
        "@typescript-eslint/dot-notation": ["error"],
        "@typescript-eslint/explicit-member-accessibility": [
            "error",
            {
                accessibility: "explicit"
            }
        ],
        "@typescript-eslint/indent": [
            "off",
            2,
            {
                ObjectExpression: "first",
                SwitchCase: 2, // needs tweaking
                ignoreComments: true,
                FunctionDeclaration: {
                    parameters: "first"
                },
                FunctionExpression: {
                    parameters: "first"
                }
            }
        ],
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/member-delimiter-style": [
            "error",
            {
                multiline: {
                    delimiter: "none",
                    requireLast: true
                },
                singleline: {
                    delimiter: "semi",
                    requireLast: false
                }
            }
        ],
        "@typescript-eslint/member-ordering": "error",
        "@typescript-eslint/no-empty-function": "error",
        "@typescript-eslint/no-empty-interface": "error",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/no-this-alias": "error",
        "@typescript-eslint/no-unused-expressions": "error",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-var-requires": "error",
        "@typescript-eslint/prefer-for-of": "off",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/prefer-namespace-keyword": "error",
        "@typescript-eslint/quotes": [
            "error",
            "double",
            {
                avoidEscape: true,
                allowTemplateLiterals: true
            }
        ],
        "@typescript-eslint/semi": [
            "error",
            "never"
        ],
        "@typescript-eslint/triple-slash-reference": [
            "off",
            {
                path: "always",
                types: "prefer-import",
                lib: "always"
            }
        ],
        "@typescript-eslint/tslint/config": [
            "error",
            {
                rules: {
                    "arguments-order": true,
                    "ban": true,
                    "bool-param-default": true,
                    "consecutive-overloads": true,
                    "max-switch-cases": true,
                    "no-accessor-field-mismatch": true,
                    "no-all-duplicated-branches": true,
                    "no-alphabetical-sort": true,
                    "no-array-delete": true,
                    "no-case-with-or": true,
                    "no-collapsible-if": true,
                    "no-collection-size-mischeck": true,
                    "no-commented-code": true,
                    "no-dead-store": true,
                    "no-duplicate-in-composite": true,
                    "no-duplicated-branches": true,
                    "no-element-overwrite": true,
                    "no-empty-array": true,
                    "no-empty-destructuring": true,
                    "no-extra-semicolon": true,
                    "no-gratuitous-expressions": true,
                    "no-hardcoded-credentials": true,
                    "no-identical-conditions": true,
                    "no-identical-expressions": true,
                    "no-ignored-initial-value": true,
                    "no-ignored-return": true,
                    "no-in-misuse": true,
                    "no-invalid-await": true,
                    "no-invariant-return": true,
                    "no-inverted-boolean-check": true,
                    "no-misleading-array-reverse": true,
                    "no-misspelled-operator": true,
                    "no-multiline-string-literals": true,
                    "no-nested-switch": true,
                    "no-nested-template-literals": true,
                    "no-redundant-boolean": true,
                    "no-redundant-jump": true,
                    "no-redundant-parentheses": true,
                    "no-return-type-any": true,
                    "no-same-line-conditional": true,
                    "no-self-assignment": true,
                    "no-small-switch": true,
                    "no-statements-same-line": true,
                    "no-try-promise": true,
                    "no-unconditional-jump": true,
                    "no-undefined-argument": true,
                    "no-unenclosed-multiline-block": true,
                    "no-unthrown-error": true,
                    "no-unused-array": true,
                    "no-use-of-empty-return-value": true,
                    "no-useless-cast": true,
                    "no-useless-catch": true,
                    "no-useless-increment": true,
                    "no-useless-intersection": true,
                    "no-variable-usage-before-declaration": true,
                    "parameters-max-number": true,
                    "prefer-conditional-expression": true,
                    "prefer-default-last": true,
                    "prefer-immediate-return": true,
                    "prefer-optional": true,
                    "prefer-promise-shorthand": true,
                    "prefer-type-guard": true,
                    "use-primitive-type": true,
                    "use-type-alias": true,
                    "whitespace": true
                }
            }
        ],
        "@typescript-eslint/type-annotation-spacing": "error",
        "@typescript-eslint/unified-signatures": "error",
        "arrow-parens": [
            "error",
            "as-needed"
        ],
        "brace-style": [
            "error",
            "1tbs"
        ],
        "camelcase": "off",
        "comma-dangle": [
            "error",
            {
                objects: "never",
                arrays: "never",
                functions: "never"
            }
        ],
        "complexity": "off",
        "constructor-super": "error",
        "dot-notation": "off",
        "eol-last": "error",
        "eqeqeq": [
            "error",
            "smart"
        ],
        "guard-for-in": "error",
        "id-blacklist": "off",
        "id-match": "off",
        "import/no-extraneous-dependencies": "off",
        "import/no-internal-modules": "off",
        "import/order": "error",
        "jsdoc/check-alignment": "error",
        "jsdoc/check-indentation": "off",
        "jsdoc/newline-after-description": "error",
        "max-classes-per-file": [
            "error",
            1
        ],
        "max-len": [
            "error",
            {
                code: 120
            }
        ],
        "new-parens": "error",
        "no-bitwise": "off",
        "no-caller": "error",
        "no-cond-assign": "error",
        "no-console": "error",
        "no-debugger": "error",
        "no-duplicate-case": "error",
        "no-duplicate-imports": "error",
        "no-empty": "error",
        "no-eval": "error",
        "no-extra-bind": "error",
        "no-fallthrough": "off",
        "no-invalid-this": "off",
        "no-multiple-empty-lines": "error",
        "no-new-func": "error",
        "no-new-wrappers": "error",
        "no-null/no-null": "error",
        "no-redeclare": "error",
        "no-return-await": "error",
        "no-sequences": "error",
        "no-shadow": [
            "error",
            {
                hoist: "all"
            }
        ],
        "no-sparse-arrays": "error",
        "no-template-curly-in-string": "error",
        "no-throw-literal": "error",
        "no-trailing-spaces": "error",
        "no-undef-init": "error",
        "no-underscore-dangle": "off",
        "no-unsafe-finally": "error",
        "no-unused-expressions": "error",
        "no-unused-labels": "error",
        "no-var": "error",
        "object-shorthand": "error",
        "one-var": [
            "error",
            "never"
        ],
        "prefer-const": "error",
        "prefer-object-spread": "error",
        "prettier/prettier": "off",
        "quote-props": [
            "error",
            "consistent-as-needed"
        ],
        "radix": "error",
        "space-before-function-paren": [
            "error",
            {
                anonymous: "never",
                asyncArrow: "always",
                named: "never"
            }
        ],
        "space-in-parens": [
            "error",
            "never"
        ],
        "spaced-comment": [
            "error",
            "always",
            {
                markers: [
                    "/"
                ]
            }
        ],
        "use-isnan": "error",
        "valid-typeof": "off"
    }
}
