import redis, { createClient } from 'redis'
import {
  HGetAllReturnType,
  HGetReturnType,
  HIncrByReturnType,
  HSetReturnType,
  KeysReturnType,
  InitReturnType,
  RedisServiceInterface,
  HealthCheckReturnType
} from './redis.types'
import { ConfigServiceInterface } from '../config/config.types'

type RedisClient = ReturnType<typeof redis.createClient>

export class RedisService implements RedisServiceInterface {
  private readonly redisClient: RedisClient

  constructor({ configService }: { configService: ConfigServiceInterface }) {
    this.redisClient = createClient({
      url: configService.config.REDIS_URL
    })
  }

  async init(): InitReturnType {
    try {
      await this.redisClient.connect()
    } catch (error) {
      throw new Error('Failed to connect to Redis', { cause: error })
    }
  }

  async healthCheck(): HealthCheckReturnType {
    const result = await this.redisClient.ping()

    if (result !== 'PONG') {
      console.log('Redis is not healthy')

      return false
    }

    return true
  }

  async hSet(
    key: string,
    field: Record<string, string | number>
  ): HSetReturnType {
    return this.redisClient.hSet(key, field)
  }

  async hIncrBy(key: string, field: string, value: number): HIncrByReturnType {
    return this.redisClient.hIncrBy(key, field, value)
  }

  async hGet(key: string, field: string): HGetReturnType {
    return this.redisClient.hGet(key, field)
  }

  async hGetAll(key: string): HGetAllReturnType {
    return this.redisClient.hGetAll(key)
  }

  async keys(pattern: string): KeysReturnType {
    return this.redisClient.keys(pattern)
  }
}
