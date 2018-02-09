const path = require('path');
const rules = require('./rules');


const paths = {
    src: path.resolve(__dirname, '../src'),
    dist: path.resolve(__dirname, '../dist')
}

const entry = {
    vendor: [
        'angular',
        '@uirouter/angularjs',
    ],
    app: paths.src + '/app.js',
};


module.exports = {
    entry,
    module: {
        rules
    }
}
