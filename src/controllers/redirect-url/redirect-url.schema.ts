import { z } from 'zod'

export const redirectUrlSchema = z.object({
  shortId: z.string().min(8).max(8)
})

export type RedirectUrlSchema = z.infer<typeof redirectUrlSchema>
