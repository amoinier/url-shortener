import { ShortenUrlUseCase } from './shorten-url'
import { redisUrlStorageService } from '../../services/url-storage/redis'

export const shortenUrl = new ShortenUrlUseCase({
  urlStorageService: redisUrlStorageService
})
