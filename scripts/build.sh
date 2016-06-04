#!/bin/bash
set -eu

CNAME=log.sugarshin.net

npm run clean:build && \
npm run webpack && \
npm run cp:build && \
node scripts/articles -o build/_articles && \
MAIN_SCRIPT=/assets/$(basename `ls build/assets/app-*.js`) node scripts/templates && \
echo $CNAME > build/CNAME && \
touch build/.nojekyll
