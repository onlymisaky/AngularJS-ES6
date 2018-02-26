const isProduction = process.env.APP_ENV === 'production';

const extract = require('extract-text-webpack-plugin').extract;

// css-loader 配置, production 环境下需要压缩
// 
let cssLoader = {
    loader: 'css-loader',
    options: {
        options: { minimize: !!isProduction }
    }
};

/**
 * @name 根据 loader 生成对用的配置
 * @param {String} loader
 * @param {options} options
 * @link https://www.npmjs.com/package/less-loader
 * @link https://www.npmjs.com/package/sass-loader
 */
const generateLoaders = (loader, options) => {

    let loaders = [cssLoader];

    if (loader) {
        loaders.push({
            loader: loader + '-loader',
            options: Object.assign({}, options) // 防止 undefined 键
        });
    }



    // production 环境下分离 css 和 js
    if (isProduction) {
        return extract({
            use: loaders,
            fallback: 'style-loader'
        });
    } else {
        return ['style-loader'].concat(loaders);
    }
}

module.exports = [
    {
        test: /\.css$/,
        use: generateLoaders()
    },
    {
        test: /\.less$/,
        use: generateLoaders('less')
    },
    {
        test: /\.sass$/,
        use: generateLoaders('sass-loader?indentedSyntax=true')
    },
    {
        test: /\.scss$/,
        use: generateLoaders('sass')
    }
];
