export class HealthCheckError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'HealthCheckError'
  }
}
