#!/bin/bash
set -eu

CNAME=log.sugarshin.net

npm run clean:build && \
npm run webpack && \
npm run cp:build && \
MAIN_SCRIPT=/assets/$(basename `ls build/assets/app-*.js`) npm run pug:build && \
node scripts/articles -o build && \
echo $CNAME > build/CNAME && \
touch build/.nojekyll
