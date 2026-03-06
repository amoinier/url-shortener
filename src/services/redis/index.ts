import { configService } from '../config'
import { RedisService } from './redis.service'

export const redisService = new RedisService({ configService })
