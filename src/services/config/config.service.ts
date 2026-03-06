import { DotenvConfigOutput } from 'dotenv'
import { z } from 'zod'
import { ConfigServiceInterface, EnvironmentVariables } from './config.types'

export class ConfigService implements ConfigServiceInterface {
  public config: EnvironmentVariables

  constructor (envConfig: DotenvConfigOutput) {
    try {
      const configSchema = z.object({
        PORT: z.coerce.number().default(3000),
        REDIS_URL: z.url()
      })
      const validatedConfig = configSchema.parse({
        ...process.env,
        ...envConfig.parsed
      })

      this.config = validatedConfig
    } catch (error) {
      console.error('Failed to load config', { cause: error })
      throw new Error('Failed to load config', { cause: error })
    }
  }
}
