#!/bin/sh

cd $(dirname $(dirname $(readlink -f $0)))

auto-sync

if [ "$#" != "0" ]; then
    $* || exit $?
fi

exit 0
