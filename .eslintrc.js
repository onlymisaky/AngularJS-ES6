/** @type {import('eslint').Linter.Config} */
const eslintConfig = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      tsx: true,
      jsx: true,
    },
  },
  extends: ['airbnb-base'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
  },
  rules: {
    'import/extensions': ['error', 'always', {
      js: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    }],
    'import/no-absolute-path': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'Target', // 装饰器
        'e', // for e.returnvalue
      ],
    }],
    'max-len': 'off',
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-restricted-syntax': 'off',
    'guard-for-in': 'off',
    'arrow-body-style': 'off',
    'class-methods-use-this': 'off',
  },
};

module.exports = eslintConfig;
