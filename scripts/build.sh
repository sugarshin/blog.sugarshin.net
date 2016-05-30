#!/bin/bash
set -eu

CNAME=log.sugarshin.net

npm run clean:build && \
npm run webpack && \
npm run cp:build && \
MAIN_SCRIPT=/assets/$(basename `ls build/assets/app-*.js`) node scripts/templates && \
node scripts/articles -o build/articles && \
echo $CNAME > build/CNAME && \
touch build/.nojekyll
