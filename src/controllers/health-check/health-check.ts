import express from 'express'
import { healthCheck } from '../../use-cases/health-check'

export async function healthCheckController(
  _req: express.Request,
  res: express.Response
) {
  try {
    const healths = await healthCheck.execute()

    return res.json({ status: 'ok', healths })
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}
