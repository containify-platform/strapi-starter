# Strapi 5 in production mode: the admin panel is built into the image, and
# `strapi start` serves it with the API. Content types are edited in
# development (npm run develop) and committed; production can't change them.
FROM node:24-alpine AS build
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
ENV NODE_ENV=production STRAPI_TELEMETRY_DISABLED=true
RUN npm run build && npm prune --omit=dev

FROM node:24-alpine
RUN apk add --no-cache libc6-compat vips
WORKDIR /app
ENV NODE_ENV=production STRAPI_TELEMETRY_DISABLED=true PORT=1337
COPY --from=build --chown=node:node /app ./
USER node
EXPOSE 1337
CMD ["node_modules/.bin/strapi", "start"]
