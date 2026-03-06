export interface RedisServiceInterface {
  init(): void
  healthCheck(): Promise<boolean>
  hSet(key: string, field: Record<string, string | number>): Promise<number>
  hGet(key: string, field: string): Promise<string | null>
  hIncrBy(key: string, field: string, value: number): Promise<number>
  keys(pattern: string): Promise<string[]>
  hGetAll(key: string): Promise<Record<string, string | number>>
}
