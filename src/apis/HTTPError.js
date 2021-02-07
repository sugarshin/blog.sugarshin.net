export class HTTPError extends Error {
  constructor(response) {
    super(
      response.statusText ||
      String(
        (response.status === 0 || response.status)
          ? response.status
          : 'Unknown response error'
      )
    )
    this.name = 'HTTPError'
    this.response = response
  }
}
