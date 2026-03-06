# url-shortener

A lightweight, self-hosted URL shortener built with Express 5 and Redis.

## Features

- Shorten any URL into a unique 8-character identifier
- Redirect to the original URL via the short link
- Track usage analytics per shortened URL (visit count)
- Health check endpoint for monitoring
- Rate limiting on URL creation (100 requests / 15 min)
- Input validation with Zod
- Docker-ready with multi-stage build

## Tech Stack

- **Runtime**: Node.js 25 / TypeScript
- **Framework**: Express 5
- **Storage**: Redis
- **Validation**: Zod
- **ID Generation**: nanoid
- **Testing**: Jest + Supertest

## Prerequisites

- [Node.js](https://nodejs.org/) v25+ (see `.nvmrc`)
- [Redis](https://redis.io/) 7+
- Or [Docker](https://www.docker.com/) + Docker Compose

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/amoinier/url-shortener.git
cd url-shortener
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

| Variable    | Description          | Default                  |
| ----------- | -------------------- | ------------------------ |
| `PORT`      | Server port          | `3000`                   |
| `REDIS_URL` | Redis connection URL | `redis://localhost:6379` |

### 3. Start

**With Docker Compose (recommended):**

```bash
docker compose up -d
```

This starts both Redis and the app. The API is available at `http://localhost:3000`.

**Without Docker:**

Make sure Redis is running, then:

```bash
npm run build
npm start
```

**Development mode (hot reload):**

```bash
docker compose up redis -d   # start Redis only
npm run start:dev
```

## API

### `POST /api/shorturl`

Shorten a URL.

```bash
curl -X POST http://localhost:3000/api/shorturl \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

```json
{
  "shortUrl": "aBcD1234",
  "originalUrl": "https://example.com"
}
```

### `GET /api/shorturl/:shortId`

Redirect to the original URL. Returns a `302` with the `Location` header.

```bash
curl -L http://localhost:3000/api/shorturl/aBcD1234
```

### `GET /api/shorturl/analytics`

Get usage statistics for all shortened URLs.

```bash
curl http://localhost:3000/api/shorturl/analytics
```

```json
{
  "analytics": [
    {
      "shortId": "aBcD1234",
      "url": "https://example.com",
      "usageCount": 42
    }
  ]
}
```

### `GET /api/health`

Health check endpoint.

```json
{
  "status": "ok",
  "healths": {
    "redis": true
  }
}
```

## Scripts

| Command             | Description                                  |
| ------------------- | -------------------------------------------- |
| `npm run build`     | Compile TypeScript to `dist/`                |
| `npm start`         | Start production server                      |
| `npm run start:dev` | Start dev server with hot reload             |
| `npm run lint`      | Check code style (standard)                  |
| `npm run lint:fix`  | Auto-fix code style                          |
| `npm test`          | Run unit tests                               |
| `npm run test:e2e`  | Run E2E tests (requires running app + Redis) |
| `npm run test:cov`  | Run tests with coverage report               |
| `npm run format`    | Format code with Prettier                    |

## Testing

**Unit tests** (no dependencies required):

```bash
npm test
```

**E2E tests** (requires the app and Redis to be running):

```bash
docker compose up -d
npm run test:e2e
```

You can target a different host with the `TEST_BASE_URL` environment variable:

```bash
TEST_BASE_URL=http://localhost:4000 npm run test:e2e
```

## Project Structure

```
src/
  controllers/         # HTTP handlers (short-url, redirect-url, health-check, analytics)
  services/
    config/            # Environment config with Zod validation
    redis/             # Redis client wrapper
    url-storage/       # URL persistence layer (Redis implementation)
  use-cases/           # Business logic (shorten, redirect, analytics, health)
  router.ts            # Route definitions + rate limiting
  main.ts              # App bootstrap
test/                  # E2E tests
```

## License

[MIT](LICENSE)
