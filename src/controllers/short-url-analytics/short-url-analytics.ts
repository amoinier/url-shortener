import { getShortUrlAnalytics } from '../../use-cases/get-short-url-analytics'
import express from 'express'

export async function shortUrlAnalyticsController (
  req: express.Request,
  res: express.Response
) {
  try {
    const analytics = await getShortUrlAnalytics.execute()

    return res.json(analytics)
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}
