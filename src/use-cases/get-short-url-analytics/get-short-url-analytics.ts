import { UrlStorageInterface } from '../../services/url-storage/url-storage.types'
import {
  GetShortUrlAnalyticsInterface,
  GetShortUrlAnalyticsResponse
} from './get-short-url-analytics.types'

export class GetShortUrlAnalyticsUseCase implements GetShortUrlAnalyticsInterface {
  private readonly urlStorageService: UrlStorageInterface

  constructor({
    urlStorageService
  }: {
    urlStorageService: UrlStorageInterface
  }) {
    this.urlStorageService = urlStorageService
  }

  async execute(): GetShortUrlAnalyticsResponse {
    try {
      console.debug('Getting short URL analytics')
      const urls = await this.urlStorageService.getAllUrls()

      return {
        analytics: urls
      }
    } catch (error) {
      console.error('Failed to get short URL analytics', { cause: error })

      throw new Error('Failed to get short URL analytics', { cause: error })
    }
  }
}
