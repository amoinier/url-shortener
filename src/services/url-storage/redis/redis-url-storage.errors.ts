export class URLNotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'URLNotFoundError'
  }
}
