export interface RedisServiceInterface {
  init(): InitReturnType
  healthCheck(): HealthCheckReturnType
  hSet(key: string, field: Record<string, string | number>): HSetReturnType
  hGet(key: string, field: string): Promise<string | null>
  hIncrBy(key: string, field: string, value: number): HIncrByReturnType
  keys(pattern: string): KeysReturnType
  hGetAll(key: string): HGetAllReturnType
  scan(pattern: string, count?: number): ScanReturnType
}

export type InitReturnType = Promise<void>
export type HealthCheckReturnType = Promise<boolean>
export type HSetReturnType = Promise<number>
export type HGetReturnType = Promise<string | null>
export type HIncrByReturnType = Promise<number>
export type KeysReturnType = Promise<string[]>
export type HGetAllReturnType = Promise<Record<string, string | number>>
export type ScanReturnType = Promise<string[]>
