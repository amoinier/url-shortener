import { nanoid } from 'nanoid'
import { UrlStorageInterface } from '../../services/url-storage/url-storage.types'
import {
  ShortenUrlInput,
  ShortenUrlInterface,
  ShortenUrlResponse
} from './shorten-url.types'
import { SHORT_URL_LENGTH } from '../../constant'

export class ShortenUrlUseCase implements ShortenUrlInterface {
  private readonly urlStorageService: UrlStorageInterface

  constructor({
    urlStorageService
  }: {
    urlStorageService: UrlStorageInterface
  }) {
    this.urlStorageService = urlStorageService
  }

  async execute(input: ShortenUrlInput): ShortenUrlResponse {
    try {
      console.debug('Shortening URL', { url: input.url })
      const id = nanoid(SHORT_URL_LENGTH)
      await this.urlStorageService.setUrl(id, input.url)

      return { shortUrl: id, originalUrl: input.url }
    } catch (error) {
      console.error('Failed to shorten URL', { cause: error })

      throw new Error('Failed to shorten URL', { cause: error })
    }
  }
}
