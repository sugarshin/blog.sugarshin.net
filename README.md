# blog.sugarshin.net

[![Build Status][circleci-image]][circleci-url]

https://blog.sugarshin.net

## Prerequirements

⚠️ The version must be the same as [build.blog.sugarshin.net](https://github.com/sugarshin/build.blog.sugarshin.net)

```sh
$ cat .nvmrc
```

## Setup

### Environments

```sh
cp .env{.example,}
vim .env
```

https://github.com/sugarshin/blog.sugarshin.net/blob/master/.env.example

## Start dev-server

```bash
npm run dev
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

Copyright (C) 2016 [Shingo Sato](https://sugarshin.net/).

All rights reserved with all articles and pictures.

Everything else in the repository is [MIT](https://sugarshin.mit-license.org/) licensed.

[circleci-image]: https://circleci.com/gh/sugarshin/blog.sugarshin.net/tree/master.svg?style=svg&circle-token=812f62f2aeba2a3bb9bfe6adf2abd24d7754a7be
[circleci-url]: https://circleci.com/gh/sugarshin/blog.sugarshin.net/tree/master
