FROM node:12.6.0 AS build

WORKDIR /usr/src/app

COPY articles articles
COPY config config
COPY helpers helpers
COPY scripts scripts
COPY src src
COPY babel.config.js .
COPY package.json .
COPY postcss.config.js .
COPY yarn.lock .

RUN yarn install --production --frozen-lockfile

ENV NODE_ENV production
RUN npm run build:review-app

FROM node:12.6.0-alpine AS release

WORKDIR /usr/src/app

RUN apk add --no-cache ca-certificates

COPY static-serve static-serve
COPY review-app/package.json package.json
COPY review-app/package-lock.json package-lock.json
COPY --from=build /usr/src/app/build-review-app build-review-app

RUN npm install --production

ENV NODE_ENV production
ENV DIR build-review-app

CMD node static-serve
