export type RedirectUrlResponse = Promise<{ url: string }>

export type RedirectUrlInput = { shortId: string }

export interface RedirectUrlInterface {
  execute(input: RedirectUrlInput): RedirectUrlResponse
}
