import express from 'express'
import { configService } from './services/config'
import { router } from './router'
import { redisService } from './services/redis'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 500,
  standardHeaders: true,
  legacyHeaders: false
})

async function startServer() {
  await redisService.init()

  const app = express()
  const port = configService.config.PORT

  app.use(express.json({ limit: '10kb' }))

  app.use(helmet())

  app.use(cors())

  app.use('/api', limiter, router())

  app.use(
    (
      err: Error,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction
    ) => {
      if ('type' in err && err.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'Invalid JSON' })
      }
      return res.status(500).json({ error: 'Internal server error' })
    }
  )

  app.listen(port, () => {
    console.info(`Server running on port ${port}`)
  })
}

startServer().catch((error) => {
  console.error('Failed to start server', { cause: error })
  process.exit(1)
})
