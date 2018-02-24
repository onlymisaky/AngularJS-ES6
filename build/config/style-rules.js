const extract = require('extract-text-webpack-plugin').extract;

let cssLoader = 'css-loader';

let loaders = {
    css: cssLoader,
    less: [cssLoader, 'less-loader'],
    sass: [cssLoader, 'sass-loader?indentedSyntax=true'],
    scss: [cssLoader, 'sass-loader']
};

let styleRules = [];

Object.keys(loaders).forEach(ext => {

    let rule = {
        test: new RegExp('\\.' + ext + '$'),
        use: extract({
            fallback: 'style-loader',
            use: loaders[ext],
        })
    };

    // 压缩css
    if (ext === 'css') {
        rule.use = extract({
            fallback: 'style-loader',
            use: [{
                loader: 'css-loader',
                options: { minimize: true }
            }]
        });
    }

    styleRules.push(rule);

});

module.exports = styleRules;
