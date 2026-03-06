import { UrlStorageInterface } from '../../services/url-storage/url-storage.types'

export interface RedirectUrlInterface {
  execute(input: RedirectUrlInput): RedirectUrlResponse
}

export type RedirectUrlResponse = Promise<{ url: string }>

export type RedirectUrlInput = { shortId: string }
