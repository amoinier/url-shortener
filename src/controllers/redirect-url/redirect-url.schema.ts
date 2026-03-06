import { z } from 'zod'
import { SHORT_URL_LENGTH } from '../../constant'

export const redirectUrlSchema = z.object({
  shortId: z
    .string()
    .min(SHORT_URL_LENGTH)
    .max(SHORT_URL_LENGTH)
    .regex(
      /^[A-Za-z0-9_-]+$/,
      'Only alphanumeric characters, hyphens, and underscores are allowed'
    )
})

export type RedirectUrlSchema = z.infer<typeof redirectUrlSchema>
