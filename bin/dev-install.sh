#!/bin/sh

ROOT=$(dirname $(dirname $(readlink -f $0)))/core

cd "${ROOT}" &&
    npm install "${ROOT}" -g
