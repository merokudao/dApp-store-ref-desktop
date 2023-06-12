FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock ./
RUN  yarn install

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

RUN yarn build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/public ./public

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/.next/static ./.next/static

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

ENV PORT 3000

CMD ["yarn", "start"]