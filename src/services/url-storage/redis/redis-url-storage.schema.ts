import { z } from 'zod'

export const redisUrlStorageSchema = z.object({
  url: z.url(),
  usageCount: z.coerce.number().int().min(0)
})
