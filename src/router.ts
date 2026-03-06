import express from 'express'
import { shortUrlController } from './controllers/short-url/short-url'
import { redirectUrlController } from './controllers/redirect-url/redirect-url'
import { shortUrlAnalyticsController } from './controllers/short-url-analytics/short-url-analytics'
import { healthCheckController } from './controllers/health-check/health-check'
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false
})

export function router() {
  const router = express.Router()

  router.post('/shorturl', limiter, shortUrlController)
  router.get('/shorturl/analytics', shortUrlAnalyticsController)
  router.get('/shorturl/:shortId', redirectUrlController)
  router.get('/health', healthCheckController)

  return router
}
