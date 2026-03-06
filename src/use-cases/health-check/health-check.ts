import { RedisServiceInterface } from '../../services/redis/redis.types'
import { HealthCheckError } from './health-check.errors'
import {
  HealthCheckResponse,
  HealthCheckUseCaseInterface
} from './health-check.types'

export class HealthCheckUseCase implements HealthCheckUseCaseInterface {
  private readonly redisService: RedisServiceInterface

  constructor({ redisService }: { redisService: RedisServiceInterface }) {
    this.redisService = redisService
  }

  async execute(): HealthCheckResponse {
    try {
      console.debug('Checking health')

      const redisHealth = await this.redisService.healthCheck()

      if (!redisHealth) {
        throw new HealthCheckError('Redis is not healthy')
      }

      return {
        redis: redisHealth
      }
    } catch (error) {
      if (error instanceof HealthCheckError) {
        throw error
      }

      console.error('Failed to check health', { cause: error })

      throw new Error('Failed to check health', { cause: error })
    }
  }
}
