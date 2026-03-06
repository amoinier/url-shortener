import { RedisServiceInterface } from './redis.types'

export class RedisMockService implements RedisServiceInterface {
  async init(): Promise<void> {
    throw new Error('Not implemented')
  }

  async healthCheck(): Promise<boolean> {
    throw new Error('Not implemented')
  }

  async hSet(
    key: string,
    field: Record<string, string | number>
  ): Promise<number> {
    throw new Error('Not implemented')
  }

  async hGet(key: string, field: string): Promise<string | null> {
    throw new Error('Not implemented')
  }

  async hIncrBy(key: string, field: string, value: number): Promise<number> {
    throw new Error('Not implemented')
  }

  async keys(pattern: string): Promise<string[]> {
    throw new Error('Not implemented')
  }

  async hGetAll(key: string): Promise<Record<string, string | number>> {
    throw new Error('Not implemented')
  }
}
