import { RedisUrlStorageService } from './redis-url-storage.service'
import { redisService } from '../../redis'

export const redisUrlStorageService = new RedisUrlStorageService({
  redisService
})
