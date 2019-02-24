const { PORT } = require('./e2e-test/config')
module.exports = {
  server: {
    command: `PORT=${PORT} node e2e-test/server`,
    port: PORT,
  },
  launch: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    dumpio: true,
    headless: true,
  },
}
