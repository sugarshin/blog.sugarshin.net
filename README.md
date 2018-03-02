# blog.sugarshin.net

[![Build Status][circleci-image]][circleci-url]
[![Dependency Status][david-image]][david-url]
[![codecov](https://codecov.io/gh/sugarshin/blog.sugarshin.net/branch/master/graph/badge.svg)](https://codecov.io/gh/sugarshin/blog.sugarshin.net)

https://blog.sugarshin.net

## Setup

```sh
cp .env{.example,}
vim .env
```

https://github.com/sugarshin/blog.sugarshin.net/blob/master/.env.example

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

Merge to master branch will trigger CircleCI that deploys assets to GitHub Pages.

## License

MIT © sugarshin

[circleci-image]: https://circleci.com/gh/sugarshin/blog.sugarshin.net/tree/master.svg?style=svg&circle-token=812f62f2aeba2a3bb9bfe6adf2abd24d7754a7be
[circleci-url]: https://circleci.com/gh/sugarshin/blog.sugarshin.net/tree/master
[david-image]: https://david-dm.org/sugarshin/blog.sugarshin.net.svg?style=flat-square
[david-url]: https://david-dm.org/sugarshin/blog.sugarshin.net
