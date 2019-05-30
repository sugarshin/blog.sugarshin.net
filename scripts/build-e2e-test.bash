#!/bin/bash
set -eu

BUILD=build-e2e-test

npm run clean:e2e-test
npm run mkdir:e2e-test
npm run articles-index:e2e-test
unset API_BASE SEGMENT_WRITE_KEY LOGROCKET_APP_ID SENTRY_DSN; BUILD_DIR=$BUILD E2E_TEST=1 npm run webpack
npm run cp:e2e-test
node scripts/dev-articles -o $BUILD

# TODO
mkdir -p $BUILD/assets/images/common
cp src/images/p.jpg $BUILD/assets/images/common/open-graph.jpg

node scripts/sitemap -o $BUILD
node scripts/feed -o $BUILD
touch $BUILD/.nojekyll
