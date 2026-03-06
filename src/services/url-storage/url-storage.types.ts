export type GetUrlResponse = Promise<string>
export type SetUrlResponse = Promise<void>
export type GetAllUrlsResponse = Promise<
  { shortId: string; url: string; usageCount: number }[]
  >
export type IncrementUsageCountResponse = Promise<number>

export interface UrlStorageInterface {
  getUrl(shortId: string): GetUrlResponse
  setUrl(shortId: string, url: string): SetUrlResponse
  getAllUrls(): GetAllUrlsResponse
  incrementUsageCount(shortId: string): IncrementUsageCountResponse
}
