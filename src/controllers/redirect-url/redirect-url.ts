import express from 'express'
import { redirectUrl } from '../../use-cases/redirect-url'
import { z } from 'zod'
import { redirectUrlSchema } from './redirect-url.schema'
import { URLNotFoundError } from '../../services/url-storage/redis/redis-url-storage.errors'

export async function redirectUrlController(
  req: express.Request,
  res: express.Response
) {
  try {
    const validatedShortId = redirectUrlSchema.parse(req.params)

    const { url } = await redirectUrl.execute({
      shortId: validatedShortId.shortId
    })

    return res.redirect(url)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(422).json({ error: z.treeifyError(error) })
    }
    if (error instanceof URLNotFoundError) {
      return res.status(404).json({ error: error.message })
    }
    return res.status(500).json({ error: 'Internal server error' })
  }
}
