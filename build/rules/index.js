const paths = require('./../config/paths');
const styleRules = require('./style-rules');

const scripts = {
    test: /\.js$/,
    loader: 'babel-loader',
    include: paths.src
};

const templates = {
    test: /.html$/,
    loader: 'html-loader'
};

const imgs = {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
        limit: 10000, // 10KB 以下使用 base64
        name: 'img/[name].[hash:7].[ext]'
    }
};

const fonts = {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
        limit: 10000,
        name: 'fonts/[name].[hash:7].[ext]'
    }
}

const medias = {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    loader: 'url-loader',
    options: {
        limit: 10000,
        name: 'media/[name].[hash:7].[ext]'
    }
};

let rules = [
    scripts,
    templates,
    imgs,
    fonts,
    medias
].concat(styleRules);

module.exports = rules;
