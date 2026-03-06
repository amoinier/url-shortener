import redis, { createClient } from 'redis'
import { RedisServiceInterface } from './redis.types'
import { configService } from '../config'
import { ConfigServiceInterface } from '../config/config.types'

type RedisClient = ReturnType<typeof redis.createClient>

export class RedisService implements RedisServiceInterface {
  private readonly redisClient: RedisClient

  constructor({ configService }: { configService: ConfigServiceInterface }) {
    this.redisClient = createClient({
      url: configService.config.REDIS_URL
    })
  }

  async init() {
    try {
      await this.redisClient.connect()
    } catch (error) {
      console.error('Failed to connect to Redis', { cause: error })

      throw new Error('Failed to connect to Redis', { cause: error })
    }
  }

  async healthCheck() {
    const result = await this.redisClient.ping()

    if (result !== 'PONG') {
      console.log('Redis is not healthy')

      return false
    }

    return true
  }

  async hSet(key: string, field: Record<string, string | number>) {
    return this.redisClient.hSet(key, field)
  }

  async hIncrBy(key: string, field: string, value: number) {
    return this.redisClient.hIncrBy(key, field, value)
  }

  async hGet(key: string, field: string) {
    return this.redisClient.hGet(key, field)
  }

  async hGetAll(key: string) {
    return this.redisClient.hGetAll(key)
  }

  async keys(pattern: string) {
    return this.redisClient.keys(pattern)
  }
}
