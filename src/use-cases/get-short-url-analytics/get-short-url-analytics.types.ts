export interface GetShortUrlAnalyticsInterface {
  execute(): GetShortUrlAnalyticsResponse
}

export type GetShortUrlAnalyticsResponse = Promise<{
  analytics: {
    shortId: string
    url: string
    usageCount: number
  }[]
}>
