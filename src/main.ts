import express from 'express'
import { configService } from './services/config'

const app = express()
const port = configService.config.PORT

app.use(express.json())

app.get('/', (_req, res) => {
  console.log('Hello World')

  res.json({ status: 'ok' })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
