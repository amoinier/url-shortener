import { RedisServiceInterface } from '../../redis/redis.types'
import {
  GetUrlResponse,
  SetUrlResponse,
  GetAllUrlsResponse,
  UrlStorageInterface
} from '../url-storage.types'

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
      console.error('Failed to set URL', { cause: error })

      throw new Error('Failed to set URL')
    }
  }

  async getAllUrls(): GetAllUrlsResponse {
    const keys = await this.redisService.keys('*')

    const urls = await Promise.all(
      keys.map(async (key) => {
        const element = await this.redisService.hGetAll(key)

        return {
          shortId: key,
          url: element.url.toString(),
          usageCount: parseInt(element.usageCount.toString(), 10)
        }
      })
    )

    return urls.filter((url) => !!url)
  }

  async incrementUsageCount(shortId: string): Promise<number> {
    try {
      return this.redisService.hIncrBy(shortId, 'usageCount', 1)
    } catch (error) {
      console.error('Failed to increment usage count', { cause: error })

      throw new Error('Failed to increment usage count')
    }
  }
}
