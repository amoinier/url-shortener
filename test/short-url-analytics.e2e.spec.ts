import request from 'supertest'

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000'

describe('GET /api/shorturl/analytics', () => {
  it('should return analytics data', async () => {
    const response = await request(BASE_URL).get('/api/shorturl/analytics')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('analytics')
    expect(Array.isArray(response.body.analytics)).toBe(true)
  })
})
