import { RedirectUrlUseCase } from './redirect-url'
import { RedisUrlStorageMockService } from '../../services/url-storage/redis/redis-url-storage.mock'

describe('redirectUrl use-case', () => {
  let urlStorageServiceMock: RedisUrlStorageMockService
  let redirectUrl: RedirectUrlUseCase

  beforeEach(() => {
    urlStorageServiceMock = new RedisUrlStorageMockService()
    redirectUrl = new RedirectUrlUseCase({
      urlStorageService: urlStorageServiceMock
    })
  })

  it('should throw if URL is not found', async () => {
    const shortId = 'nonexistent'
    urlStorageServiceMock.getUrl = jest
      .fn()
      .mockRejectedValue(new Error('URL not found'))

    await expect(redirectUrl.execute({ shortId })).rejects.toThrow(
      'Failed to redirect URL'
    )
  })

  it('should throw if incrementUsageCount fails', async () => {
    const shortId = 'abc123'
    const url = 'https://example.com'
    urlStorageServiceMock.getUrl = jest.fn().mockResolvedValue(url)
    urlStorageServiceMock.incrementUsageCount = jest
      .fn()
      .mockRejectedValue(new Error('Failed to increment usage count'))

    await expect(redirectUrl.execute({ shortId })).rejects.toThrow(
      'Failed to redirect URL'
    )
  })

  it('should return the URL and increment usage count', async () => {
    const shortId = 'abc123'
    const url = 'https://example.com'
    urlStorageServiceMock.getUrl = jest.fn().mockResolvedValue(url)
    urlStorageServiceMock.incrementUsageCount = jest.fn().mockResolvedValue(1)

    const result = await redirectUrl.execute({ shortId })
    expect(urlStorageServiceMock.getUrl).toHaveBeenCalledWith(shortId)
    expect(urlStorageServiceMock.incrementUsageCount).toHaveBeenCalledWith(
      shortId
    )
    expect(result).toEqual({ url })
  })
})
