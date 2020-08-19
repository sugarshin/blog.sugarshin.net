# ref: https://github.com/buildkite/docker-puppeteer/blob/9daecd5ee72b8a915a5ff921e5cdf584742081ab/Dockerfile
FROM node:12.18.3-slim AS build

RUN apt-get update \
  # Install latest chrome dev package, which installs the necessary libs to
  # make the bundled version of Chromium that Puppeteer installs work.
  && apt-get install -y wget --no-install-recommends \
  && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y google-chrome-unstable --no-install-recommends \
  && rm -rf /var/lib/apt/lists/* \
  && wget --quiet https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/sbin/wait-for-it.sh \
  && chmod +x /usr/sbin/wait-for-it.sh

WORKDIR /usr/src/app

COPY articles articles
COPY bin bin
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
RUN bin/react-snap --source=build-review-app --cns

FROM node:12.18.3-alpine AS release

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
