/** @type {import('stylelint').Configuration} */
const styleLintConfig = {
  processors: [],
  extends: 'stylelint-config-standard',
  plugins: ['stylelint-order', 'stylelint-scss'],
  rules: {
    'at-rule-empty-line-before': 'always',
    'at-rule-name-case': 'lower',
    'block-no-empty': true,
    // scss 语法提示
    // 参考 https://github.com/stylelint/stylelint/issues/3190
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    // css书写顺序
    'order/order': [
      'declarations',
      'custom-properties',
      'dollar-variables',
      'rules',
      'at-rules',
    ],
    'order/properties-order': [
      'position',
      'z-index',
      // 其他样式的顺序
    ],
    // 其他规则
    'no-empty-source': null,
  },
};

module.exports = styleLintConfig;
