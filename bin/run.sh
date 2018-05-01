#!/bin/sh

#cd $(dirname $(dirname $(readlink -f $0)))/env

auto-sync

cd $PLAYGROUND

if [ "$#" != "0" ]; then
    $* || exit $?
fi

exit 0
