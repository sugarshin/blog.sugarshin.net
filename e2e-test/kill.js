const psList = require('ps-list')

const main = async () => {
  const list = await psList()
  const p = list.find(l => /e2e-test\/server/.test(l.cmd))

  if (!p) {
    // eslint-disable-next-line no-console
    console.error('can\'t find server process')
    process.exit(1)
  }

  process.on('SIGTERM', () => {
    // eslint-disable-next-line no-console
    console.log(`PID: ${p.pid} process terminated`)
  })

  process.kill(p.pid)
}

main()
