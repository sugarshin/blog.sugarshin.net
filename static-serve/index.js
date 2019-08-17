const express = require('express')

const app = express()

app.use(express.static(process.env.DIR || ''))

const server = app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log(`Started listening on port ${server.address().port}`)
})
