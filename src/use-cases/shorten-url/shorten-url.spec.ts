import { ShortenUrlUseCase } from './shorten-url'
import { RedisUrlStorageMockService } from '../../services/url-storage/redis/redis-url-storage.mock'

jest.mock('nanoid', () => ({
  nanoid: jest.fn().mockReturnValue('abcd1234')
}))

describe('shortenUrl use-case', () => {
  let urlStorageServiceMock: RedisUrlStorageMockService
  let shortenUrl: ShortenUrlUseCase

  beforeEach(() => {
    urlStorageServiceMock = new RedisUrlStorageMockService()
    shortenUrl = new ShortenUrlUseCase({
      urlStorageService: urlStorageServiceMock
    })
  })

  it('should throw if storage fails', async () => {
    const url = 'https://example.com'
    urlStorageServiceMock.getUrl = jest.fn().mockResolvedValue(null)
    urlStorageServiceMock.setUrl = jest
      .fn()
      .mockRejectedValue(new Error('Failed to set URL'))

    await expect(shortenUrl.execute({ url })).rejects.toThrow(
      'Failed to set URL'
    )
  })

  it('should throw if failed to generate unique ID', async () => {
    const url = 'https://example.com'
    urlStorageServiceMock.getUrl = jest.fn().mockResolvedValue(url)
    await expect(shortenUrl.execute({ url })).rejects.toThrow(
      'Failed to generate unique ID'
    )
  })

  it('should generate a short ID and store the URL', async () => {
    const url = 'https://example.com'
    urlStorageServiceMock.setUrl = jest.fn().mockResolvedValue(undefined)
    urlStorageServiceMock.getUrl = jest.fn().mockResolvedValue(null)

    const result = await shortenUrl.execute({ url })
    expect(urlStorageServiceMock.setUrl).toHaveBeenCalledWith('abcd1234', url)
    expect(result).toEqual({ shortUrl: 'abcd1234', originalUrl: url })
  })
})
