#!/bin/sh

ROOT=$(dirname $(dirname $(readlink -f $0)))/core
LIB_DIR=/usr/lib/node_modules
TO_UNINSTALL=

for module in $(ls -1 ${LIB_DIR}); do
    if [ "$module" != npm ]; then
        TO_UNINSTALL="${TO_UNINSTALL} $module"
    fi
done


cd "${ROOT}" &&
    npm uninstall "${ROOT}" -g
    npm uninstall ${TO_UNINSTALL} -g
    npm install "${ROOT}" -g


