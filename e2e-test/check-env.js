if (!process.env.BASE_URL) {
  throw new Error('`BASE_URL` must be required')
}

if (!process.env.ARTIFACTS_DIR) {
  throw new Error('`ARTIFACTS_DIR` must be required')
}
