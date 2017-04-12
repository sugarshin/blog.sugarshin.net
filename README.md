# log.sugarshin.net

[![Build Status][travis-image]][travis-url]
[![Dependency Status][david-image]][david-url]

https://log.sugarshin.net

## Setup

```sh
cp .env{.example,}
vim .env
```

https://github.com/sugarshin/log.sugarshin.net/blob/master/.env.example

## Start dev-server

```bash
npm start
```

## Run tests

```bash
npm test
```

## Build assets

```bash
NODE_ENV=production npm run build
```

## Add new article

```bash
npm run na -- --name example-article-url
```

## Deploy

Merge to master branch will trigger Travis CI that deploys assets to GitHub Pages.

## License

MIT © sugarshin

[travis-image]: https://img.shields.io/travis/sugarshin/log.sugarshin.net/master.svg?branch=master&style=flat-square
[travis-url]: https://travis-ci.org/sugarshin/log.sugarshin.net
[david-image]: https://david-dm.org/sugarshin/log.sugarshin.net.svg?style=flat-square
[david-url]: https://david-dm.org/sugarshin/log.sugarshin.net
