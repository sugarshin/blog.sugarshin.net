#!/bin/bash
set -eu

CNAME=blog.sugarshin.net
BUILD=build

npm run clean:build
mkdir -p $BUILD
node scripts/articles-index -o $BUILD
npm run webpack
node scripts/imagemin
# TODO
mkdir -p $BUILD/assets/images/common
cp src/images/p.jpg $BUILD/assets/images/common/open-graph.jpg
node scripts/sitemap
node scripts/feed
echo $CNAME > $BUILD/CNAME
touch $BUILD/.nojekyll
