#!/bin/bash
set -eu

CNAME=log.sugarshin.net

npm run clean:build && \
npm run webpack && \
npm run cp:build && \
node scripts/articles-index -o build && \
node scripts/favicons && \
MAIN_SCRIPT=/assets/$(basename `ls build/assets/app-*.js`) npm run templates:build && \
rm -rf ./favicons.html.tmp && \
node scripts/sitemap && \
node scripts/feed && \
echo $CNAME > build/CNAME && \
touch build/.nojekyll
