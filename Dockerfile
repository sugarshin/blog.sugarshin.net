# ref: https://github.com/buildkite/docker-puppeteer/blob/a459bfd8280cdb6501a2ce927c8ad3e53b965cbe/Dockerfile
FROM node:12.6.0-buster-slim AS builder

RUN  apt-get update \
  && apt-get install -y wget gnupg ca-certificates \
  && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  # We install Chrome to get all the OS level dependencies, but Chrome itself
  # is not actually used as it's packaged in the node puppeteer library.
  # Alternatively, we could could include the entire dep list ourselves
  # (https://github.com/puppeteer/puppeteer/blob/master/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix)
  # but that seems too easy to get out of date.
  && apt-get install -y google-chrome-stable \
  && rm -rf /var/lib/apt/lists/* \
  && wget --quiet https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/sbin/wait-for-it.sh \
  && chmod +x /usr/sbin/wait-for-it.sh

WORKDIR /usr/src/app

COPY articles articles
COPY bin bin
COPY config config
COPY markdown markdown
COPY scripts scripts
COPY src src
COPY babel.config.js .
COPY package.json .
COPY postcss.config.js .
COPY yarn.lock .

RUN yarn install --production --frozen-lockfile

ENV NODE_ENV production
RUN npm run build:review-app
RUN bin/react-snap --source=build-review-app --cns

FROM node:12.6.0-alpine AS production

WORKDIR /usr/src/app

RUN apk add --no-cache ca-certificates

COPY static-serve static-serve
COPY review-app/package.json package.json
COPY review-app/package-lock.json package-lock.json
COPY --from=builder /usr/src/app/build-review-app build-review-app

RUN npm install --production

ENV NODE_ENV production
ENV DIR build-review-app

CMD node static-serve
