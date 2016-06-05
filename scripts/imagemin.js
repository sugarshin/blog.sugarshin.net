// TODO output file path
const fs = require('fs');
const path = require('path');
const imagemin = require('imagemin');
const pngquant = require('imagemin-pngquant');

imagemin(['./articles/assets/images/**/*.{jpg,jpeg,png,gif,svg}'], 'build/assets', {
  plugins: [
    pngquant({ quality: '65-80' })
  ]
}).then(files => {
  files.forEach(file => {
    fs.writeFileSync(file.pathName, file.data);
  });
});
