const fs = require('fs');

module.exports = function writeFilePromisify(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, 'utf8', err => err ?
      console.log(`Error: writeFilePromisify:\n${err}`) :
      console.log(`Success ${filePath} !`)
    );
  });
};
