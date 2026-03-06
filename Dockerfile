FROM node:25-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./tsconfig.json
COPY src ./src

RUN npm install

RUN npm run build

RUN npm prune --production

FROM node:25-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

CMD ["npm", "start"]