const express = require('express')

const app = express()

app.use(express.static('build-e2e-test'))

const server = app.listen(process.env.PORT || 0, () => {
  // eslint-disable-next-line no-console
  console.log(`Started listening on port ${server.address().port}`)
})
