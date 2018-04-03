const fs = require('fs');
const path = require('path');

const readFilePromise = (...args) => new Promise((resolve, reject) => {
    fs.readFile.call(null, ...args, (err, data) => {
        return err ? reject(err) : resolve(data);
    });
});

const writeFilePromise = (...args) => new Promise((resolve, reject) => {
    fs.writeFile(...args, (err) => {
        return err ? reject(err) : resolve();
    });
});

const mkdir = dirname => {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdir(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

const tocamelCase = str => {
    const arr = str.split('-');
    let s = arr[0];
    for (var i = 1; i < arr.length; i++) {
        s += arr[i];
    }
    return s;
}

const firstUpperCase = str => str.replace(/^\S/, s => s.toUpperCase());

module.exports = {
    readFilePromise,
    writeFilePromise,
    mkdir,
    tocamelCase,
    firstUpperCase,
}
