import request from 'supertest'

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000'

describe('POST /api/shorturl', () => {
  it('should shorten a valid URL', async () => {
    const response = await request(BASE_URL)
      .post('/api/shorturl')
      .send({ url: 'https://example.com' })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('shortUrl')
    expect(response.body).toHaveProperty('originalUrl', 'https://example.com')
    expect(typeof response.body.shortUrl).toBe('string')
    expect(response.body.shortUrl).toHaveLength(10)
  })

  it('should return 400 for missing url', async () => {
    const response = await request(BASE_URL).post('/api/shorturl').send({})

    expect(response.status).toBe(422)
    expect(response.body).toHaveProperty('error')
  })

  it('should return 422 for invalid url format', async () => {
    const response = await request(BASE_URL)
      .post('/api/shorturl')
      .send({ url: 'not-a-url' })

    expect(response.status).toBe(422)
    expect(response.body).toHaveProperty('error')
  })

  it('should return 422 for empty body', async () => {
    const response = await request(BASE_URL).post('/api/shorturl').send()

    expect(response.status).toBe(422)
    expect(response.body).toHaveProperty('error')
  })
})
