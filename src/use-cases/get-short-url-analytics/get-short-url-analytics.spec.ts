import { GetShortUrlAnalyticsUseCase } from './get-short-url-analytics'
import { RedisUrlStorageMockService } from '../../services/url-storage/redis/redis-url-storage.mock'

describe('getShortUrlAnalytics use-case', () => {
  let urlStorageServiceMock: RedisUrlStorageMockService
  let getShortUrlAnalytics: GetShortUrlAnalyticsUseCase
  beforeEach(() => {
    urlStorageServiceMock = new RedisUrlStorageMockService()
    getShortUrlAnalytics = new GetShortUrlAnalyticsUseCase({
      urlStorageService: urlStorageServiceMock
    })
  })

  it('should return empty array if no URLs are found', async () => {
    urlStorageServiceMock.getAllUrls = jest.fn().mockResolvedValue([])

    const result = await getShortUrlAnalytics.execute()
    expect(urlStorageServiceMock.getAllUrls).toHaveBeenCalled()
    expect(result).toEqual({
      analytics: []
    })
  })

  it('should return analytics for an existing short URL', async () => {
    const shortId = 'abc123'
    const url = 'https://example.com'
    const usageCount = 15
    urlStorageServiceMock.getAllUrls = jest.fn().mockResolvedValue([
      {
        shortId,
        url,
        usageCount
      }
    ])

    const result = await getShortUrlAnalytics.execute()
    expect(urlStorageServiceMock.getAllUrls).toHaveBeenCalled()
    expect(result).toEqual({
      analytics: [
        {
          shortId,
          url,
          usageCount
        }
      ]
    })
  })

  it('should throw if Redis throws', async () => {
    urlStorageServiceMock.getAllUrls = jest
      .fn()
      .mockRejectedValue(new Error('Redis error'))

    expect(urlStorageServiceMock.getAllUrls).not.toHaveBeenCalled()
    await expect(getShortUrlAnalytics.execute()).rejects.toThrow(
      'Failed to get short URL analytics'
    )
  })
})
