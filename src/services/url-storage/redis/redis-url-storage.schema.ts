import { z } from 'zod'
import { SHORT_URL_LENGTH } from '../../../constant'

export const redisUrlStorageSchema = z.object({
  shortId: z.string().min(SHORT_URL_LENGTH).max(SHORT_URL_LENGTH),
  url: z.url(),
  usageCount: z.coerce.number().int().min(0)
})
