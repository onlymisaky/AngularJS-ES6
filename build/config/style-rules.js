const extract = require('extract-text-webpack-plugin').extract;

let cssLoader = ['css-loader'];

let loaders = {
    css: cssLoader,
    less: cssLoader.concat('less-loader'),
    sass: cssLoader.concat('sass-loader?indentedSyntax=true'),
    scss: cssLoader.concat('sass-loader')
};

let styleRules = [];

Object.keys(loaders).forEach(ext => {
    styleRules.push({
        test: new RegExp('\\.' + ext + '$'),
        use: extract({
            use: loaders[ext],
            fallback: 'style-loader',
        })
    });
});

module.exports = styleRules;
