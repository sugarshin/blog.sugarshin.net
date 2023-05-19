#!/bin/bash
set -eu

BUILD=build-review-app

npm run clean -- $BUILD
npm run mkdirp -- $BUILD
node scripts/articles-index --out=$BUILD
unset API_BASE SEGMENT_WRITE_KEY SENTRY_DSN; BUILD_DIR=$BUILD NOINDEX=1 npm run webpack
node scripts/copy-articles -o $BUILD
npm run cp:review-app

# TODO
mkdir -p $BUILD/assets/images/common
cp src/images/p.jpg $BUILD/assets/images/common/open-graph.jpg

node scripts/sitemap -o $BUILD
node scripts/feed -o $BUILD
