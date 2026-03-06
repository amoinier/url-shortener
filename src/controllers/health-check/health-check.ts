import express from 'express'
import { healthCheck } from '../../use-cases/health-check'
import { HealthCheckError } from '../../use-cases/health-check/health-check.errors'

export async function healthCheckController(
  _req: express.Request,
  res: express.Response
) {
  try {
    const healths = await healthCheck.execute()

    return res.json({ status: 'ok', healths })
  } catch (error) {
    if (error instanceof HealthCheckError) {
      return res.status(503).json({ error: 'Service Unavailable' })
    }

    return res.status(500).json({ error: 'Internal server error' })
  }
}
