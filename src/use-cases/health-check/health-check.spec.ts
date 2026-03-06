import { HealthCheckUseCase } from './health-check'
import { RedisMockService } from '../../services/redis/redis.mock'

describe('healthCheck use-case', () => {
  let redisServiceMock: RedisMockService
  let healthCheck: HealthCheckUseCase

  beforeEach(() => {
    redisServiceMock = new RedisMockService()
    healthCheck = new HealthCheckUseCase({
      redisService: redisServiceMock
    })
  })

  it('should throw if healthCheck throws', async () => {
    redisServiceMock.healthCheck = jest
      .fn()
      .mockRejectedValue(new Error('Redis connection error'))

    await expect(healthCheck.execute()).rejects.toThrow(
      'Failed to check health'
    )
  })

  it('should return redis: true when Redis is healthy', async () => {
    redisServiceMock.healthCheck = jest.fn().mockResolvedValue(true)

    const result = await healthCheck.execute()
    expect(redisServiceMock.healthCheck).toHaveBeenCalled()
    expect(result).toEqual({ redis: true })
  })

  it('should return redis: false when Redis is not healthy', async () => {
    redisServiceMock.healthCheck = jest.fn().mockResolvedValue(false)

    await expect(healthCheck.execute()).rejects.toThrow('Redis is not healthy')
    expect(redisServiceMock.healthCheck).toHaveBeenCalled()
  })
})
