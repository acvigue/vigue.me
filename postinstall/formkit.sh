#!/bin/bash
if which gsed > /tmp/test.txt; then
    gsed -i s,://,:xs, node_modules/@formkit/pro/index.mjs;
    gsed -i s,://,:xs, node_modules/@formkit/pro/index.cjs;
else
    sed -i s,://,:xs, node_modules/@formkit/pro/index.mjs;
    sed -i s,://,:xs, node_modules/@formkit/pro/index.cjs;
fi