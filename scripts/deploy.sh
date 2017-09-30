#!/bin/bash
set -eu

COMMIT=$(git rev-parse --short HEAD)
REPO=https://github.com/sugarshin/log.sugarshin.net.git
DIR=build

node_modules/.bin/gh-pages -d $DIR -xt -r $REPO -m "Built artifacts of $COMMIT [ci skip]"
