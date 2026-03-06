import { DotenvConfigOutput } from 'dotenv'
import { z } from 'zod'
import { ConfigServiceInterface, EnvironmentVariables } from './config.types'

export class ConfigService implements ConfigServiceInterface {
  public config: EnvironmentVariables

  constructor(envConfig: DotenvConfigOutput) {
    try {
      console.log('envConfig', envConfig.parsed)

      const configSchema = z.object({
        PORT: z.coerce.number().default(3000),
        REDIS_URL: z.url()
      })
      const validatedConfig = configSchema.parse(envConfig.parsed)

      this.config = validatedConfig
    } catch (error) {
      console.error('Failed to load config', { cause: error })
      process.exit(1)
    }
  }
}
