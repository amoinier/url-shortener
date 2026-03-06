import { ConfigServiceInterface, EnvironmentVariables } from './config.types'

export class ConfigMockService implements ConfigServiceInterface {
  config: EnvironmentVariables

  constructor(config: EnvironmentVariables) {
    this.config = config
  }
}
