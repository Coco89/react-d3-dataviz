/**
 * Stylelint Configuration
 *
 * Documentation: https://github.com/stylelint/stylelint
 * Rules documentation: https://github.com/stylelint/stylelint/blob/master/docs/user-guide/rules.md
 */
module.exports = {
    ignoreFiles: [
    ],
    plugins: [
        // https://github.com/ismay/stylelint-no-unsupported-browser-features
        'stylelint-no-unsupported-browser-features'
    ],
    rules: {

        // https://github.com/stylelint/stylelint/blob/master/lib/rules/block-no-empty/README.md
        'block-no-empty': true,

        // https://github.com/stylelint/stylelint/blob/master/lib/rules/block-opening-brace-newline-before/README.md
        'block-closing-brace-newline-before': 'always',

        // https://github.com/stylelint/stylelint/blob/master/lib/rules/block-opening-brace-newline-after/README.md
        'block-opening-brace-newline-after': 'always',

        // https://github.com/stylelint/stylelint/blob/master/lib/rules/block-opening-brace-space-before/README.md
        'block-opening-brace-space-before': 'always',

        // https://github.com/stylelint/stylelint/blob/master/lib/rules/declaration-colon-space-after/README.md
        'declaration-colon-space-after': 'always-single-line',

        // https://github.com/stylelint/stylelint/blob/master/lib/rules/declaration-no-important/README.md
        'declaration-no-important': true,

        'function-comma-space-after': 'always',

        // https://github.com/stylelint/stylelint/blob/master/lib/rules/function-url-quotes/README.md
        'function-url-quotes': 'never',

        // https://github.com/stylelint/stylelint/tree/master/lib/rules/indentation
        indentation: 4,

        // https://github.com/stylelint/stylelint/blob/master/lib/rules/max-nesting-depth/README.md
        'max-nesting-depth': 1,

        // https://github.com/stylelint/stylelint/blob/master/lib/rules/selector-class-pattern/README.md
        'selector-class-pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',

        // https://github.com/stylelint/stylelint/blob/master/lib/rules/selector-list-comma-newline-after/README.md
        'selector-list-comma-newline-after': 'always',

        // https://github.com/stylelint/stylelint/blob/master/lib/rules/selector-max-compound-selectors/README.md
        'selector-max-compound-selectors': [
            8,
            {
                message: 'Please limit the use of compound selectors',
                severity: 'warning'
            }
        ],

        // https://github.com/stylelint/stylelint/blob/master/lib/rules/value-list-comma-space-after/README.md
        // 'value-list-comma-space-after': 'always',

        // https://github.com/ismay/stylelint-no-unsupported-browser-features#recommendations
        'plugin/no-unsupported-browser-features': [
            true,
            {
                severity: 'warning',
                ignore: [
                    'calc',
                    'css-gradients',
                    'flexbox',
                    'outline'
                ]
            }
        ]
    }
};