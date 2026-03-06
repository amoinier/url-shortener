import { redisUrlStorageService } from '../../services/url-storage/redis'
import { RedirectUrlUseCase } from './redirect-url'

export const redirectUrl = new RedirectUrlUseCase({
  urlStorageService: redisUrlStorageService
})
