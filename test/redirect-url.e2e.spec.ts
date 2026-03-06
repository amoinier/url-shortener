import request from 'supertest'

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000'

describe('GET /api/shorturl/:shortId', () => {
  it('should redirect to original URL for a valid short URL', async () => {
    const createResponse = await request(BASE_URL)
      .post('/api/shorturl')
      .send({ url: 'https://example.com' })

    const { shortUrl: shortId } = createResponse.body

    const response = await request(BASE_URL)
      .get(`/api/shorturl/${shortId}`)
      .redirects(0)

    expect(response.status).toBe(302)
    expect(response.headers.location).toBe('https://example.com')
  })

  it('should return 422 for shortId with wrong length', async () => {
    const response = await request(BASE_URL).get('/api/shorturl/abc')

    expect(response.status).toBe(422)
    expect(response.body).toHaveProperty('error')
  })

  it('should return 404 for non-existent shortId with valid length', async () => {
    const response = await request(BASE_URL).get('/api/shorturl/zzzzzzzz')

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty(
      'error',
      'URL not found for shortId: zzzzzzzz'
    )
  })
})
