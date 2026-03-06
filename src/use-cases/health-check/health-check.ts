import { RedisServiceInterface } from '../../services/redis/redis.types'
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
    return {
      redis: await this.redisService.healthCheck()
    }
  }
}
