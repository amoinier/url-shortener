export type GetShortUrlAnalyticsResponse = Promise<{
  analytics: {
    shortId: string
    url: string
    usageCount: number
  }[]
    }>

export interface GetShortUrlAnalyticsInterface {
  execute(): GetShortUrlAnalyticsResponse
}
