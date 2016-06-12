// TODO Change code design to sync aproch
// I want using GitHub API
const fs = require('fs');
const path = require('path');
const truncate = require('lodash/truncate');
const yaml = require('js-yaml');
// const recursive  = require('recursive-readdir');
const removeMarkdown = require('remove-markdown');
const argv = require('minimist')(process.argv.slice(2));
const writeFilePromisify = require('./helpers/writeFilePromisify');

const readdirPromisify = dirPath => {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) reject(err);
      resolve(files);
    });
  });
};

// const recursivePromisify = (dirPath, ignores) => {
//   return new Promise((resolve, reject) => {
//     recursive(dirPath, ignores, (err, files) => {
//       if (err) reject(err);
//       resolve(files);
//     });
//   });
// };

const readFilePromisify = filePath => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

const HR = '---';
const parseMarkdownYamlDataWithFilePathAndPreview = ([markdown, filePath]) => {
  const rows = markdown.split('\n');
  const [firstLineIndex, secondLinesIndex] =
    rows.reduce((result, row, i) => row === HR ? [...result, i] : result, []);
  const yamlData = rows.slice(firstLineIndex, secondLinesIndex).join('\n');
  const preview = rows.slice(secondLinesIndex + 1, secondLinesIndex + 5).join('');
  return [yaml.safeLoad(yamlData), filePath, truncate(removeMarkdown(preview), { length: 140 })];
};

const readFileWithFilePath = filePath => {
  return readFilePromisify(filePath)
    .then(data => [data, filePath])
    .catch(err => console.log(`Error readFileWithFilePath: ${err}`));
};

const srcDir = argv.s || argv.src || './articles';
const outDir = argv.o || argv.out || './';
Promise.resolve(srcDir)
  //                                                         // TODO ignore assets dir
  // .then(dirPath => recursivePromisify(dirPath, ['*.json', (file, stats) => stats.isDirectory()]))
  .then(dirPath => readdirPromisify(dirPath))
  .then(files => files.map(file => path.resolve(srcDir, file)))
  .then(files => files.filter(file => /\.md$/.test(file)))
  .then(files => Promise.all(files.map(file => readFileWithFilePath(file))))
  .then(markdownWithFilePathList => Promise.all(markdownWithFilePathList.map(parseMarkdownYamlDataWithFilePathAndPreview)))
  .then(dataWithFilePathListAndPreivew => {
    return dataWithFilePathListAndPreivew
      .map(([data, filePath, preview]) => Object.assign({}, data, {
        tags: data.tags.split(',').map(tag => tag.trim()),
        url: filePath.split('_')[1].replace('.md', ''),
        preview
      }))
      .filter(data => data.public === true) // true, 'draft', false
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Descending sort
  })
  .then(data => writeFilePromisify(path.resolve(outDir, 'index.json'), JSON.stringify(data)))
  .catch(err => console.log('Error `scripts/articles`: \n', err));
