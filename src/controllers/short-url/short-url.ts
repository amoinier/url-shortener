import { shortenUrl } from '../../use-cases/shorten-url'
import express from 'express'
import { shortUrlSchema } from './short-url.schema'
import { z } from 'zod'

export async function shortUrlController(
  req: express.Request,
  res: express.Response
) {
  try {
    const validatedUrl = shortUrlSchema.parse(req.body)

    const shortUrl = await shortenUrl.execute({ url: validatedUrl.url })

    return res.json(shortUrl)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(422).json({ error: z.treeifyError(error) })
    }

    return res.status(500).json({ error: 'Internal server error' })
  }
}
