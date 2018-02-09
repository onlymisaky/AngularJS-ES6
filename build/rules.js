const ExtractTextPlugin = require("extract-text-webpack-plugin");
const scripts = {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/
};

const templates = {
    test: /.html$/,
    loader: 'html-loader'
};


const styles = {
    test: /\.css$/,

    use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
    }),

    use: [
        'style-loader',
        'css-loader'
    ]
};

const imgs = {
    test: /\.(png|svg|jpg|gif)$/,
    loader: 'file-loader'
}

const fonts = {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    loader: 'file-loader'
}


module.exports = [
    scripts,
    templates,
    styles,
    imgs,
    fonts
]
