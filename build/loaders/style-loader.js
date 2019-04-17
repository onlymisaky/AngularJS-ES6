const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env._MODE;

/**
 * @type {Array<import('webpack').RuleSetRule>}
 */
const css = [
  mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
  {
    loader: 'css-loader',
    options: {
      sourceMap: true,
     // modules: true,
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: true
    }
  }
];

/**
 * @param {RegExp} reg 
 * @param {string} loader 
 * @param {object} options 
 * @returns {import('webpack').RuleSetRule}
 */
function genLoader(reg, loader, options = {}) {
  return {
    test: reg,
    use: css.concat({
      loader,
      options
    })
  }
}

/**
 * @type {Array<import('webpack').RuleSetRule>}
 */
const styles = [
  { test: /\.css$/, use: css },
  genLoader(/\.less$/, 'less-loader'),
  genLoader(/\.sass$/, 'sass-loader', { indentedSyntax: false }),
  genLoader(/\.scss$/, 'sass-loader'),
  /** add your style loaders below */
];

module.exports = styles;
