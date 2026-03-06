import { UrlStorageInterface } from '../../services/url-storage/url-storage.types'

export interface ShortenUrlInterface {
  execute(input: ShortenUrlInput): ShortenUrlResponse
}

export type ShortenUrlResponse = Promise<{ shortId: string }>

export type ShortenUrlInput = { url: string }
