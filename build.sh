#!/bin/bash

mkdir -p build

for dir in */; do
    echo $dir
    if [[ -f ${dir}mod.js ]]; then
        echo folder ${dir}mod.js
        zip -r build/$(basename ${dir}).zip ${dir}
    elif [[ ${dir}*.js ]]; then
        echo single ${dir}*.js
        cp -v ${dir}*.js build
    fi
done
