# blog.sugarshin.net

[![GitHub Actions Status](https://github.com/sugarshin/blog.sugarshin.net/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/sugarshin/blog.sugarshin.net/actions/workflows/deploy.yml?query=branch%3Amain)

https://blog.sugarshin.net

## Prerequirements

```sh
$ cat .node-version
```

## Setup

```sh
$ npm i
```

## Environment variables

```sh
$ cp .env.example .env.development
$ vim .env.development

$ cp .dev.vars.example .dev.vars
$ vim .dev.vars
```

## Start dev-server

```sh
$ npm run dev
```

### Pages Functions

Prepare Pages Functions local development environment to debug the search-related feature.

```sh
$ npx wrangler pages dev --live-reload .
```

## Build assets

```sh
$ npm run build
```

## Deploy

Merge to a default branch will trigger GitHub Actions that deploys assets to Cloudflare Pages.

## License

Copyright (C) 2025 [Shingo Sato](https://sugarshin.net/).

All rights reserved with all articles and pictures.

Everything else in the repository is [MIT](https://sugarshin.mit-license.org/) licensed.
