#!/bin/sh

ROOT=$(dirname $(dirname $(readlink -f $0)))/core

cd "${ROOT}" &&
    npm uninstall "${ROOT}" -g
    npm install "${ROOT}" -g
