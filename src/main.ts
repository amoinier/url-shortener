import express from 'express'
import { configService } from './services/config'
import { router } from './router'
import { redisService } from './services/redis'

async function startServer() {
  await redisService.init()

  const app = express()
  const port = configService.config.PORT

  app.use(express.json())

  app.use('/api', router())

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
    console.log(`Server running on port ${port}`)
  })
}

startServer()
