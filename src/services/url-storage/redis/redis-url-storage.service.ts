import { RedisServiceInterface } from '../../redis/redis.types'
import {
  GetUrlResponse,
  SetUrlResponse,
  GetAllUrlsResponse,
  UrlStorageInterface,
  IncrementUsageCountResponse
} from '../url-storage.types'
import { redisUrlStorageSchema } from './redis-url-storage.schema'

export class RedisUrlStorageService implements UrlStorageInterface {
  private readonly redisService: RedisServiceInterface

  constructor({ redisService }: { redisService: RedisServiceInterface }) {
    this.redisService = redisService
  }

  async getUrl(shortId: string): GetUrlResponse {
    const url = await this.redisService.hGet(shortId, 'url')

    if (!url) {
      throw new Error('URL not found')
    }

    return url
  }

  async setUrl(shortId: string, url: string): SetUrlResponse {
    try {
      await this.redisService.hSet(shortId, { url, usageCount: 0 })
    } catch (error) {
      throw new Error('Failed to set URL', { cause: error })
    }
  }

  async getAllUrls(): GetAllUrlsResponse {
    try {
      const keys = await this.redisService.scan('*')

      if (keys.length === 0) {
        return []
      }

      const urls = await Promise.all(
        keys.map(async (key) => {
          const element = await this.redisService.hGetAll(key)

          return redisUrlStorageSchema.parse({ ...element, shortId: key })
        })
      )

      return urls.filter((url) => !!url)
    } catch (error) {
      throw new Error('Failed to get all URLs', { cause: error })
    }
  }

  async incrementUsageCount(shortId: string): IncrementUsageCountResponse {
    try {
      return this.redisService.hIncrBy(shortId, 'usageCount', 1)
    } catch (error) {
      throw new Error('Failed to increment usage count', { cause: error })
    }
  }
}
