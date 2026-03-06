import { redisService } from '../../services/redis'
import { HealthCheckUseCase } from './health-check'

export const healthCheck = new HealthCheckUseCase({
  redisService: redisService
})
