#!/bin/sh

ROOT=$(dirname $(dirname $(readlink -f $0)))

cd "${ROOT}" &&
    npm install "${ROOT}" -g
