import { nanoid } from 'nanoid'
import { UrlStorageInterface } from '../../services/url-storage/url-storage.types'
import {
  ShortenUrlInput,
  ShortenUrlInterface,
  ShortenUrlResponse
} from './shorten-url.types'
import { MAX_RETRIES, SHORT_URL_LENGTH } from '../../constant'

export class ShortenUrlUseCase implements ShortenUrlInterface {
  private readonly urlStorageService: UrlStorageInterface

  constructor({
    urlStorageService
  }: {
    urlStorageService: UrlStorageInterface
  }) {
    this.urlStorageService = urlStorageService
  }

  private async generateUniqueId(retries = 0): Promise<string> {
    if (retries > MAX_RETRIES) {
      throw new Error('Failed to generate unique ID')
    }

    const id = nanoid(SHORT_URL_LENGTH)
    const url = await this.urlStorageService.getUrl(id)
    if (url) {
      return this.generateUniqueId(retries + 1)
    }
    return id
  }

  async execute(input: ShortenUrlInput): ShortenUrlResponse {
    try {
      console.debug('Shortening URL', { url: input.url })
      const id = await this.generateUniqueId()
      await this.urlStorageService.setUrl(id, input.url)

      return { shortUrl: id, originalUrl: input.url }
    } catch (error) {
      console.error('Failed to shorten URL', { cause: error })

      throw error
    }
  }
}
