const makeDir = require('make-dir')

;(async () => {
  console.log(`[LOG]: make a directory '${process.env.ARTIFACTS_DIR}'`)
  await makeDir(process.env.ARTIFACTS_DIR)
})()
