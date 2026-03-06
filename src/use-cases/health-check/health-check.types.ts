export type HealthCheckResponse = Promise<{
  redis: boolean
}>

export interface HealthCheckUseCaseInterface {
  execute(): HealthCheckResponse
}
