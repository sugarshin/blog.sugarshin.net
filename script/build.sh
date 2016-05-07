#!/bin/bash
set -eu

CNAME=log.sugarshin.net

npm run clean:build && \
npm run webpack && \
MAIN_SCRIPT=/assets/$(basename `ls build/assets/app-*.js`) npm run pug:build
echo $CNAME > build/CNAME
