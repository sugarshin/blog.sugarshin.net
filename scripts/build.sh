#!/bin/bash
set -eu

CNAME=log.sugarshin.net

npm run clean:build && \
npm run webpack && \
node scripts/imagemin && \
node scripts/articles-index -o build && \
node scripts/favicons && \
MAIN_SCRIPT=/assets/$(basename `ls build/assets/app-*.js`) MAIN_STYLESHEET=/assets/$(basename `ls build/assets/app-*.css`) npm run templates:build && \
rm -rf ./favicons.html.tmp && \
node scripts/sitemap && \
node scripts/feed && \
echo $CNAME > build/CNAME && \
touch build/.nojekyll
