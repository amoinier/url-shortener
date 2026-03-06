import { ConfigService } from './config.service'

describe('ConfigService', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should parse valid config with all values', () => {
    const config = new ConfigService({
      parsed: {
        PORT: '4000',
        REDIS_URL: 'redis://localhost:6379'
      }
    })

    expect(config.config).toEqual({
      PORT: 4000,
      REDIS_URL: 'redis://localhost:6379'
    })
  })

  it('should use default PORT when not provided', () => {
    const config = new ConfigService({
      parsed: {
        REDIS_URL: 'redis://localhost:6379'
      }
    })

    expect(config.config.PORT).toBe(3000)
  })

  it('should exit process when REDIS_URL is missing', () => {
    expect(() => new ConfigService({ parsed: {} })).toThrow(
      'Failed to load config'
    )
  })

  it('should exit process when REDIS_URL is invalid', () => {
    expect(
      () => new ConfigService({ parsed: { REDIS_URL: 'not-a-url' } })
    ).toThrow('Failed to load config')
  })

  it('should exit process when parsed config is undefined', () => {
    expect(() => new ConfigService({})).toThrow('Failed to load config')
  })
})
