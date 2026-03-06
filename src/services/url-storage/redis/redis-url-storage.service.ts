import { RedisServiceInterface } from '../../redis/redis.types'
import {
  GetUrlResponse,
  SetUrlResponse,
  GetAllUrlsResponse,
  UrlStorageInterface,
  IncrementUsageCountResponse
} from '../url-storage.types'
import { redisUrlStorageSchema } from './redis-url-storage.schema'
import { SHORT_URL_PREFIX } from '../../../constant'

export class RedisUrlStorageService implements UrlStorageInterface {
  private readonly redisService: RedisServiceInterface

  constructor({ redisService }: { redisService: RedisServiceInterface }) {
    this.redisService = redisService
  }

  async getUrl(shortId: string): GetUrlResponse {
    const url = await this.redisService.hGet(
      `${SHORT_URL_PREFIX}${shortId}`,
      'url'
    )

    if (!url) {
      return null
    }

    return url
  }

  async setUrl(shortId: string, url: string): SetUrlResponse {
    try {
      await this.redisService.hSet(`${SHORT_URL_PREFIX}${shortId}`, {
        url,
        usageCount: 0
      })
    } catch (error) {
      throw new Error('Failed to set URL', { cause: error })
    }
  }

  async getAllUrls(): GetAllUrlsResponse {
    try {
      const keys = await this.redisService.scan(`${SHORT_URL_PREFIX}*`)

      if (keys.length === 0) {
        return []
      }

      const urls = await Promise.all(
        keys.map(async (key) => {
          const element = await this.redisService.hGetAll(key)

          return {
            shortId: key.replace(SHORT_URL_PREFIX, ''),
            ...redisUrlStorageSchema.parse(element)
          }
        })
      )

      return urls.filter((url) => !!url)
    } catch (error) {
      throw new Error('Failed to get all URLs', { cause: error })
    }
  }

  async incrementUsageCount(shortId: string): IncrementUsageCountResponse {
    try {
      return this.redisService.hIncrBy(
        `${SHORT_URL_PREFIX}${shortId}`,
        'usageCount',
        1
      )
    } catch (error) {
      throw new Error('Failed to increment usage count', { cause: error })
    }
  }
}
