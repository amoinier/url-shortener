import express from 'express'
import { shortUrlController } from './controllers/short-url/short-url'
import { redirectUrlController } from './controllers/redirect-url/redirect-url'
import { shortUrlAnalyticsController } from './controllers/short-url-analytics/short-url-analytics'
import { healthCheckController } from './controllers/health-check/health-check'

export function router() {
  const router = express.Router()

  router.post('/shorturl', shortUrlController)
  router.get('/shorturl/analytics', shortUrlAnalyticsController)
  router.get('/shorturl/:shortId', redirectUrlController)
  router.get('/health', healthCheckController)

  return router
}
