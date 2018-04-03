const fs = require('fs');
const path = require('path');
const utils = require('./utils');

const root = path.resolve(__dirname, '..');
const fileType = process.argv[2];
let filename = process.argv[3];
let filePath = root + '/src/';

const space = '       ';

if (!filename.trim() || Number(filename)) {
    console.error(`${space}ERROR : name error!`);
    process.exit();
}


filename = filename.replace(path.dirname(filename) + '/', '');
const fileName = utils.tocamelCase(filename);
const FileName = utils.firstUpperCase(fileName);

const reg = /<%\s*([^%>]\S+)\s*%>/;
const reg2 = /<%if\s*(.*)\s*endif%>/;
const reg3 = /template\\*([^%>]\S+)\s*.tpl/;

let templatePathList = [];
switch (fileType) {
    case 'directive':
        templatePathList = ['directive.js.tpl'];
        filePath += 'directives/';
        break;

    case 'component':
    case 'view':
        templatePathList = [
            'scss.tpl',
            'html.tpl',
            'controller.js.tpl',
            'component.js.tpl',
            'module.js.tpl',
        ];
        if (fileType === 'view') {
            templatePathList.push('router.js.tpl');
            filePath += 'views/';
        } else {
            filePath += 'components/';
        }
        break;
    default:
        break;
}

if (fileType !== 'directive') {
    filePath += process.argv[3];
}

let psRead = [];
for (var i = 0; i < templatePathList.length; i++) {
    templatePathList[i] = path.resolve(root + '/generator/template/' + templatePathList[i]);
    psRead.push(utils.readFilePromise(templatePathList[i], 'utf-8'));
    // console.log(`${space}Being read : ${templatePathList[i]}`);
}

let psWrite = [];
Promise.all(psRead).then(templateList => {
    const o = { fileType, filename, fileName, FileName };
    templateList.forEach((template, index) => {
        // console.log(`${space}Being parsed : ${templatePathList[index]}`);
        let match = null;
        while (match = reg.exec(template)) {
            template = template.replace(match[0], o[match[1]]);
        }
        while (match = reg2.exec(template)) {
            if (fileType === 'view') {
                template = template.replace(match[0], match[1].trim());
            }
            else {
                template = template.replace(match[0], '');
            }
        }

        if (fs.existsSync(filePath) && fileType !== 'directive') {
            filePath += '-' + Date.parse(new Date());
        }
        const ext = '.' + reg3.exec(templatePathList[index])[1];
        const writePath = path.resolve(filePath + '/' + filename + ext);

        psWrite.push([writePath, template, 'utf-8']);
    });
    utils.mkdir(filePath);

    psWrite.forEach((v, i) => {
        console.log(`${space}Being write : ${v[0]}`);
        psWrite[i] = utils.writeFilePromise(...v);
    });
    return Promise.all(psWrite);
}).then(() => {
    console.log(`${space}Create success!`);
}).catch(err => {
    console.error(`${space}Create failure : `);
    console.error(`${space}${err}`);
});
