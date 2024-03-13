module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: [
        'jest',
        '@typescript-eslint',
        '@typescript-eslint/eslint-plugin',
        'eslint-plugin-tsdoc',
        'import',
        'import-newlines',
    ],
    extends: [
        'airbnb-base',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@typescript-eslint/eslint-recommended',
        // 'plugin:import/errors',
        // 'plugin:import/warnings',
        'plugin:import/recommended',
        'plugin:import/typescript',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
            },
        },
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        // disabled rules
        'no-await-in-loop': 'off',
        'no-continue': 'off',
        'no-plusplus': 'off',
        'no-prototype-builtins': 'off',
        'no-restricted-syntax': 'off',
        'no-void': 'off',
        'jest/no-hooks': 'off',
        'jest/no-disabled-tests': 'off',
        'jest/no-conditional-in-test': 'off',
        'jest/prefer-expect-assertions': 'off',
        'import/prefer-default-export': 'off',
        'import/extensions': 'off',
        'class-methods-use-this': 'off',
        'require-await': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',

        // error rules
        'no-console': 'error',
        'jest/no-restricted-matchers': [
            'error',
            {
                toBeTruthy: 'Avoid `toBeTruthy`',
                toBeFalsy: 'Avoid `toBeFalsy`',
            },
        ],
        'import/order': [
            'error',
            {
                'newlines-between': 'always',
                groups: [
                    'builtin',
                    'external',
                    'type',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                    'object',
                ],
                distinctGroup: false,
                alphabetize: { order: 'asc', caseInsensitive: true, orderImportKind: 'asc' },
                pathGroupsExcludedImportTypes: ['builtin'],
                pathGroups: [
                    {
                        pattern: '@nestjs/**',
                        group: 'external',
                        position: 'after',
                    },
                    {
                        pattern: '@platform/**',
                        group: 'internal',
                        position: 'before',
                    },
                    {
                        pattern: '@cfg/**',
                        group: 'internal',
                        position: 'before',
                    },
                    {
                        pattern: '@cmn/**',
                        group: 'internal',
                        position: 'before',
                    },
                    {
                        pattern: '@app/**',
                        group: 'internal',
                        position: 'before',
                    },
                    {
                        pattern: '@docs/**',
                        group: 'internal',
                        position: 'before',
                    },
                    {
                        pattern: '@api/**',
                        group: 'internal',
                        position: 'after',
                    },
                    {
                        pattern: '@main/**',
                        group: 'internal',
                        position: 'after',
                    },
                ],
            },
        ],
        'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.test.ts', '**/*.spec.ts', 'tests/**/*'] }],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'default',
                format: ['camelCase'],
                leadingUnderscore: 'allow',
            },
            {
                selector: 'memberLike',
                format: ['camelCase', 'UPPER_CASE', 'snake_case'],
                leadingUnderscore: 'allow',
            },
            {
                selector: 'enumMember',
                format: ['PascalCase', 'UPPER_CASE'],
            },
            {
                selector: 'property',
                filter: {
                    regex: '\\d+',
                    match: false,
                },
                format: ['camelCase', 'UPPER_CASE', 'snake_case'],
                leadingUnderscore: 'allow',
            },
            {
                selector: 'variable',
                format: ['camelCase', 'UPPER_CASE'],
                leadingUnderscore: 'allow',
            },
            {
                selector: 'variable',
                filter: {
                    regex: '^Use|Enum$',
                    match: true,
                },
                format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
                leadingUnderscore: 'allow',
            },
            {
                selector: 'typeLike',
                format: ['PascalCase'],
                leadingUnderscore: 'allow',
            },
            {
                selector: 'function',
                filter: {
                    regex: '^Is|^Use|Dto$|Factory$',
                    match: true,
                },
                format: ['camelCase', 'PascalCase'],
                leadingUnderscore: 'allow',
            },
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        'object-shorthand': ['error', 'always', { avoidQuotes: true, avoidExplicitReturnArrows: true }],
        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: '*', next: 'return' },
        ],
        'brace-style': ['error', '1tbs'],
        'comma-dangle': ['error', 'always-multiline'],
        'quotes': ['error', 'single', { 'avoidEscape': true }],
        'import-newlines/enforce': [
            'error',
            {
                items: 2,
                'max-len': 130, // have to be in sync with max-len rule
                semi: true, // have to be in sync with semi rule
            },
        ],
        'no-multiple-empty-lines': ['error', {
            max: 2,
            maxEOF: 0,
            maxBOF: 0
        }],
        'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
        'object-curly-spacing': ['error', 'always'],
        'object-curly-newline': ['error', {
            ObjectExpression: {
                minProperties: 4, multiline: true, consistent: true
            },
            ObjectPattern: {
                minProperties: 4, multiline: true, consistent: true
            },
            ImportDeclaration: {
                minProperties: 4, multiline: true, consistent: true
            },
            ExportDeclaration: {
                minProperties: 4, multiline: true, consistent: true
            }
        }],
        'curly': [
            'error',
            'all'
        ],
        '@typescript-eslint/member-delimiter-style': 'error',
        'semi': ['error', 'always'],
        'max-len': ['error', {
            code: 130,
            tabWidth: 2,
            ignoreUrls: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreRegExpLiterals: true,
        }],

        // typescript extension
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'error',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error', {
            ignoreRestSiblings: true,
            destructuredArrayIgnorePattern: '^_',
            argsIgnorePattern: '^_',
        }],
        'default-param-last': 'off',
        '@typescript-eslint/default-param-last': 'error',
        'no-empty-function': 'off',
        '@typescript-eslint/no-empty-function': ['error', { allow: [
                'private-constructors',
                'protected-constructors',
                'decoratedFunctions',
                'overrideMethods',
            ]}],
        'indent': 'off',
        '@typescript-eslint/indent': ['error', 2, {
            SwitchCase: 1,
            ignoredNodes: [
                `FunctionExpression > .params[decorators.length > 0]`,
                `FunctionExpression > .params > :matches(Decorator, :not(:first-child))`,
                `ClassBody.body > PropertyDefinition[decorators.length > 0] > .key`,
                'TSTypeParameterInstantiation',
            ],
        }],
        'no-return-await': 'off',
        '@typescript-eslint/return-await': ['error', 'always'],

        // warning rules
        'tsdoc/syntax': 'warn',
        'no-magic-numbers': ['warn', {
            ignore: [0, 1, 2, 4, 8, 10, 16, 32, 64, 100, 1000],
            ignoreDefaultValues: true,
            ignoreClassFieldInitialValues: true,
            detectObjects: true,
        }],

        // commented rules (perhaps they should be re-enabled/re-disabled)

        // 'import/no-cycle': 'off',
        // 'import/no-unresolved': 'off',
        // '@typescript-eslint/explicit-member-accessibility': [
        //   'error',
        //   {
        //     accessibility: 'explicit',
        //     overrides: {
        //       constructors: 'no-public',
        //     },
        //   },
        // ],
        // '@typescript-eslint/explicit-function-return-type': [
        //   'error',
        //   {
        //     allowExpressions: true,
        //     allowTypedFunctionExpressions: true,
        //   },
        // ],
        // '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        // '@typescript-eslint/interface-name-prefix': 'off',
        // '@typescript-eslint/no-unsafe-return': 'off',
        // '@typescript-eslint/no-unsafe-assignment': 'off',
        // '@typescript-eslint/no-unsafe-member-access': 'off',
    },
    overrides: [
        {
            files: ['**/*.spec.ts'],
            plugins: ['jest'],
            rules: {
                '@typescript-eslint/unbound-method': 'off',
                'jest/unbound-method': 'error',
                'no-magic-numbers': 'off',
            },
        },
    ],
};
