#!/bin/bash
set -eu

CNAME=log.sugarshin.net
BUILD=build

npm run clean:build
npm run webpack
node scripts/imagemin
node scripts/articles-index -o $BUILD
# TODO
mkdir -p $BUILD/assets/images/common
cp src/images/p.jpg $BUILD/assets/images/common/open-graph.jpg
node scripts/favicons
MAIN_SCRIPT=/assets/$(basename `ls $BUILD/assets/app-*.js`) MAIN_STYLESHEET=/assets/$(basename `ls $BUILD/assets/app-*.css`) VENDOR_SCRIPT=/assets/$(basename `ls $BUILD/assets/vendor-*.js`) VENDOR_STYLESHEET=/assets/$(basename `ls $BUILD/assets/vendor-*.css`) npm run templates:build
rm -rf ./favicons.html.tmp
node scripts/sitemap
node scripts/feed
echo $CNAME > $BUILD/CNAME
touch $BUILD/.nojekyll
