// See https://github.com/facebook/create-react-app/blob/master/packages/eslint-config-react-app/index.js for rules from CRA

module.exports = {
  'extends': 'react-app',
  'settings': {
    'import/resolver': {
      'node': {
        'extensions': [
          '.js',
          '.jsx',
        ],
        'paths': ['src'],
      },
    },
    'react': {
      'version': 'detect',
    },
  },
  'rules': {
    // eslint
    'semi': ['error', 'never'],
    'object-curly-spacing': ['error', 'never'],
    'comma-dangle': ['warn', 'always-multiline'],
    'max-len': [
      2,
      {
        'code': 120,
        'tabWidth': 2,
        'ignoreComments': true,
        'ignoreTrailingComments': true,
        'ignoreUrls': true,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true,
        'ignoreRegExpLiterals': true,
      },
    ],
    'prefer-destructuring': ['warn', {'object': true, 'array': false}],
    'class-methods-use-this': 0,
    'indent': [
      2,
      2,
      {
        'SwitchCase': 1,
      },
    ],
    'no-console': 1,
    'eqeqeq': ['error', 'always', {'null': 'ignore'}],
    'prefer-template': 2,
    'valid-typeof': 'error',
    'object-curly-spacing': ['error', 'never'],
    'no-unused-expressions': ['error', {
      allowShortCircuit: false,
      allowTernary: false,
      allowTaggedTemplates: true,
    }],
    'no-unused-vars': ['error', {'args': 'after-used'}],
    'quotes': ['error', 'single'],
    'operator-linebreak': ['error', 'before'],
    'multiline-ternary': ['error', 'always-multiline'],
    'arrow-parens': [
      'error',
      'always',
    ],
    'jsx-quotes': ['error', 'prefer-double'],
    'no-plusplus': 'error',

    // eslint-plugin-react
    'react/jsx-filename-extension': 0,
    'react/sort-comp': 'error',
    'react/jsx-first-prop-new-line': [
      2,
      'multiline',
    ],
    'react/jsx-curly-brace-presence': [
      'error',
      {
        props: 'never',
        children: 'never',
      },
    ],
    'react/destructuring-assignment': ['warn', 'always'],
    'react/prop-types': 'error',
    'react/default-props-match-prop-types': 'error',
    'react/require-default-props': 'error',

    // eslint-plugin-import
    'import/order': [
      'error',
      {
        'groups': [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
      },
    ],
    'import/no-unresolved': 'error',

    // Rules that can later be incrementally enabled
    'arrow-body-style': 'off',
    'quote-props': 0,
    'no-confusing-arrow': 0,
    'newline-per-chained-call': 0,
    'react/forbid-prop-types': 0,
    'import/no-named-as-default': 0,
    'import/prefer-default-export': 0,
  },
}
