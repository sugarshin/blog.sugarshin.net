const fs = require('fs')

module.exports = function writeFilePromisify(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, 'utf8', err => {
      if (err) {
        console.log(`Error: writeFilePromisify:\n${err}`)
        reject(err)
      } else {
        console.log(`Success ${filePath} !`)
        resolve()
      }
    })
  })
}
