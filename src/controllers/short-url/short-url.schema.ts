import { z } from 'zod'

export const shortUrlSchema = z.object({
  url: z
    .url()
    .regex(
      /^(https?:\/\/)([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}(:\d{1,5})?(\/.*)?$/i,
      'Not conforming to the RFC 3986'
    )
})

export type ShortUrlSchema = z.infer<typeof shortUrlSchema>
