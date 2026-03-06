import { GetShortUrlAnalyticsUseCase } from './get-short-url-analytics'
import { redisUrlStorageService } from '../../services/url-storage/redis'

export const getShortUrlAnalytics = new GetShortUrlAnalyticsUseCase({
  urlStorageService: redisUrlStorageService
})
