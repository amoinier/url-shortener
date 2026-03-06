import { z } from 'zod'
import { SHORT_URL_LENGTH } from '../../../constant'

export const redisUrlStorageSchema = z.object({
  url: z.url(),
  usageCount: z.coerce.number().int().min(0)
})
