import request from 'supertest'

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000'

describe('GET /api/health', () => {
  it('should return health status', async () => {
    const response = await request(BASE_URL).get('/api/health')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      status: 'ok',
      healths: {
        redis: true
      }
    })
  })
})
