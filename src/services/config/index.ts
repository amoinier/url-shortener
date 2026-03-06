import { ConfigService } from './config.service'
import { config } from 'dotenv'

export const configService = new ConfigService(config({ path: '.env' }))
