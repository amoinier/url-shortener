export interface EnvironmentVariables {
  PORT: number
  REDIS_URL: string
}

export interface ConfigServiceInterface {
  config: EnvironmentVariables
}
