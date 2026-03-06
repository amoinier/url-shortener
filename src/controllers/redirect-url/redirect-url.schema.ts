import { z } from 'zod'
import { SHORT_URL_LENGTH } from '../../constant'

export const redirectUrlSchema = z.object({
  shortId: z.string().min(SHORT_URL_LENGTH).max(SHORT_URL_LENGTH)
})

export type RedirectUrlSchema = z.infer<typeof redirectUrlSchema>
