export type ShortenUrlResponse = Promise<{
  shortUrl: string
  originalUrl: string
}>

export type ShortenUrlInput = { url: string }

export interface ShortenUrlInterface {
  execute(input: ShortenUrlInput): ShortenUrlResponse
}
