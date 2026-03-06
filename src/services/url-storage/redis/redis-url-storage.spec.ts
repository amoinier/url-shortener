import { RedisUrlStorageService } from './redis-url-storage.service'
import { createClient, RedisClientType } from 'redis'
import { ConfigMockService } from '../../config/config.mock'
import { EnvironmentVariables } from '../../config/config.types'
import { RedisMockService } from '../../redis/redis.mock'

describe('RedisUrlStorage', () => {
  let redisClientMock: RedisMockService
  let redisUrlStorage: RedisUrlStorageService

  beforeEach(() => {
    redisClientMock = new RedisMockService()

    redisUrlStorage = new RedisUrlStorageService({
      redisService: redisClientMock
    })
  })

  describe('getUrl', () => {
    it('should throw an error if the URL is not found', async () => {
      const shortId = '123'
      redisClientMock.hGet = jest.fn().mockResolvedValue(null)
      await expect(redisUrlStorage.getUrl(shortId)).rejects.toThrow(
        'URL not found'
      )
    })

    it('should get a URL from Redis', async () => {
      const url = 'https://example.com'
      const shortId = '123'
      redisClientMock.hGet = jest.fn().mockResolvedValue(url)
      const result = await redisUrlStorage.getUrl(shortId)
      expect(result).toBe(url)
    })
  })

  describe('setUrl', () => {
    it('should throw an error if the URL is not set', async () => {
      const url = 'https://example.com'
      const shortId = '123'
      redisClientMock.hSet = jest
        .fn()
        .mockRejectedValue(new Error('Failed to set URL'))
      await expect(redisUrlStorage.setUrl(shortId, url)).rejects.toThrow(
        'Failed to set URL'
      )
    })

    it('should set a URL in Redis', async () => {
      const url = 'https://example.com'
      const shortId = '123'
      redisClientMock.hSet = jest.fn().mockResolvedValue(1)
      const result = await redisUrlStorage.setUrl(shortId, url)
      expect(result).toBe(void 0)
    })
  })

  describe('getAllUrls', () => {
    it('should return empty array if no URLs are found', async () => {
      redisClientMock.keys = jest.fn().mockResolvedValue([])
      const result = await redisUrlStorage.getAllUrls()
      expect(result).toEqual([])
    })

    it('should get all URLs from Redis', async () => {
      const urls = [
        { shortId: '123', url: 'https://example.com', usageCount: 0 }
      ]
      redisClientMock.keys = jest.fn().mockResolvedValue(['123'])
      redisClientMock.hGetAll = jest
        .fn()
        .mockResolvedValue(urls.find((url) => url.shortId === '123'))
      const result = await redisUrlStorage.getAllUrls()
      expect(result).toEqual(urls)
    })
  })

  describe('incrementUsageCount', () => {
    it('should throw an error if the usage count is not incremented', async () => {
      const shortId = '123'
      redisClientMock.hIncrBy = jest
        .fn()
        .mockRejectedValue(new Error('Failed to increment usage count'))
      await expect(
        redisUrlStorage.incrementUsageCount(shortId)
      ).rejects.toThrow('Failed to increment usage count')
    })

    it('should increment the usage count for a URL', async () => {
      const shortId = '123'
      redisClientMock.hIncrBy = jest.fn().mockResolvedValue(1)
      const result = await redisUrlStorage.incrementUsageCount(shortId)
      expect(result).toBe(1)
    })
  })
})
