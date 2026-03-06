import { shortenUrl } from '../../use-cases/shorten-url'
import express from 'express'
import { shortUrlSchema } from './short-url.schema'
import { z } from 'zod'

export async function shortUrlController(
  req: express.Request,
  res: express.Response
) {
  console.log('shortUrlController 1')
  try {
    const validatedUrl = shortUrlSchema.parse(req.body)

    const shortId = await shortenUrl.execute({ url: validatedUrl.url })

    return res.json({ shortId })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: z.treeifyError(error) })
    }

    console.log(error)

    return res.status(500).json({ error: 'Internal server error' })
  }
}
