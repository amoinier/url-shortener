export interface HealthCheckUseCaseInterface {
  execute(): HealthCheckResponse
}

export type HealthCheckResponse = Promise<{
  redis: boolean
}>
