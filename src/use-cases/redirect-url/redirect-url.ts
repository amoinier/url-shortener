import { UrlStorageInterface } from '../../services/url-storage/url-storage.types'
import {
  RedirectUrlInput,
  RedirectUrlInterface,
  RedirectUrlResponse
} from './redirect-url.types'
import { URLNotFoundError } from './redirect-url.errors'

export class RedirectUrlUseCase implements RedirectUrlInterface {
  private readonly urlStorageService: UrlStorageInterface

  constructor({
    urlStorageService
  }: {
    urlStorageService: UrlStorageInterface
  }) {
    this.urlStorageService = urlStorageService
  }

  async execute(input: RedirectUrlInput): RedirectUrlResponse {
    try {
      console.debug('Redirecting URL', { shortId: input.shortId })

      const url = await this.urlStorageService.getUrl(input.shortId)

      if (!url) {
        throw new URLNotFoundError(
          `URL not found for shortId: ${input.shortId}`
        )
      }

      await this.urlStorageService.incrementUsageCount(input.shortId)

      return { url }
    } catch (error) {
      console.error('Failed to redirect URL', { cause: error })

      throw error
    }
  }
}
