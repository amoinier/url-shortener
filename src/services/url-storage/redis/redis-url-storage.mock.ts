import {
  GetUrlResponse,
  GetAllUrlsResponse,
  SetUrlResponse,
  UrlStorageInterface,
  IncrementUsageCountResponse
} from '../url-storage.types'

export class RedisUrlStorageMockService implements UrlStorageInterface {
  async getUrl (shortId: string): GetUrlResponse {
    throw new Error('Not implemented')
  }

  async setUrl (shortId: string, url: string): SetUrlResponse {
    throw new Error('Not implemented')
  }

  async getAllUrls (): GetAllUrlsResponse {
    throw new Error('Not implemented')
  }

  async incrementUsageCount (shortId: string): IncrementUsageCountResponse {
    throw new Error('Not implemented')
  }
}
