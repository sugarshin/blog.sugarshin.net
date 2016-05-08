const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const recursive  = require('recursive-readdir');
const argv = require('minimist')(process.argv.slice(2));
const writeFilePromisify = require('../helpers/writeFilePromisify');

const recursivePromisify = (dirPath, ignores) => {
  return new Promise((resolve, reject) => {
    recursive(dirPath, ignores, (err, files) => {
      if (err) reject(err);
      resolve(files);
    });
  });
};

const readFilePromisify = filePath => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

const HR = '---';
const parseMarkdownYamlDataWithFilePath = ([markdown, filePath]) => {
  const rows = markdown.split('\n');
  const [firstLineIndex, secondLinesIndex] =
  rows.reduce((result, row, i) => row === HR ? [...result, i] : result, []);
  const yamlData = rows.slice(firstLineIndex, secondLinesIndex).join('\n');
  return [yaml.safeLoad(yamlData), filePath];
};

const readFileWithFilePath = filePath => {
  return readFilePromisify(filePath)
    .then(data => [data, filePath])
    .catch(err => console.log(`Error readFileWithFilePath: ${err}`));
};

Promise.resolve('./articles')
  .then(dirPath => recursivePromisify(dirPath, ['*.json']))
  .then(files => Promise.all(files.map(file => readFileWithFilePath(file))))
  .then(markdownWithFilePathList => Promise.all(markdownWithFilePathList.map(parseMarkdownYamlDataWithFilePath)))
  .then(dataWithFilePathList => (
    dataWithFilePathList.map(([data, filePath]) => Object.assign({}, data, {
      tags: data.tags.split(','),
      url: filePath.split('_')[1].replace('.md', '')
    }))
  ))
  .then(data => writeFilePromisify(path.resolve(argv.o, 'index.json'), JSON.stringify(data)))
  .catch(err => console.log(err));
