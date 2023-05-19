#!/bin/bash
set -eu

BUILD=build-e2e-test

npm run clean:e2e-test
npm run mkdir:e2e-test
npm run articles-index:e2e-test
unset API_BASE SEGMENT_WRITE_KEY SENTRY_DSN; BUILD_DIR=$BUILD npm run webpack
node scripts/copy-articles -o $BUILD
npm run cp:e2e-test

# TODO
mkdir -p $BUILD/assets/images/common
cp src/images/p.jpg $BUILD/assets/images/common/open-graph.jpg

cp -Rn ./src/static/. "./${BUILD}/"
rm -rf "./${BUILD}/.well-known"

node scripts/sitemap -o $BUILD
node scripts/feed -o $BUILD
