import { ConfigService } from './config.service'

describe('ConfigService', () => {
  let processExitSpy: jest.SpyInstance

  beforeEach(() => {
    processExitSpy = jest
      .spyOn(process, 'exit')
      .mockImplementation(() => undefined as never)
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
    new ConfigService({
      parsed: {}
    })

    expect(processExitSpy).toHaveBeenCalledWith(1)
  })

  it('should exit process when REDIS_URL is invalid', () => {
    new ConfigService({
      parsed: {
        REDIS_URL: 'not-a-url'
      }
    })

    expect(processExitSpy).toHaveBeenCalledWith(1)
  })

  it('should exit process when parsed config is undefined', () => {
    new ConfigService({})

    expect(processExitSpy).toHaveBeenCalledWith(1)
  })
})
