FROM mcr.microsoft.com/playwright:bionic AS builder

RUN apt-get update && apt-get install -y git

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt update && apt install yarn

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

# workaround for https://github.com/sugarshin/blog.sugarshin.net/blob/cdb3413c189eb653a6875889cb67a32f9e8c7210/config/webpack.config.js#L21
RUN git init

ENV NODE_ENV production
RUN npm run build:review-app
RUN bin/react-snap --source=build-review-app --cns

FROM node:22.13.0-alpine AS production

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
