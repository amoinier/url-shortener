import { nanoid } from 'nanoid'
import { UrlStorageInterface } from '../../services/url-storage/url-storage.types'
import {
  ShortenUrlInput,
  ShortenUrlInterface,
  ShortenUrlResponse
} from './shorten-url.types'

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
      const id = nanoid(8)
      await this.urlStorageService.setUrl(id, input.url)

      return { shortId: id }
    } catch (error) {
      console.error('Failed to shorten URL', { cause: error })

      throw new Error('Failed to shorten URL', { cause: error })
    }
  }
}
