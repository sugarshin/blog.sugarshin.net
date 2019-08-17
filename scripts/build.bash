#!/bin/bash
set -eu

BUILD=build

npm run clean -- $BUILD
mkdir -p $BUILD
node scripts/articles-index -o $BUILD
npm run webpack
npm run cp:build

# TODO
mkdir -p $BUILD/assets/images/common
cp src/images/p.jpg $BUILD/assets/images/common/open-graph.jpg

node scripts/sitemap
node scripts/feed
echo 'blog.sugarshin.net' > $BUILD/CNAME
touch $BUILD/.nojekyll
