#!/bin/bash

if which gsed > /tmp/test.txt; then
    gsed -i 's~(\([0-9]\{1,3\}\)\(,[0-9]\{1,3\}\)\{3,\})~(118,105,103,117,101)~g' node_modules/gsap/**.js;
    gsed -i 's~(\([0-9]\{1,3\}\)\(,[0-9]\{1,3\}\)\{3,\})~(118,105,103,117,101)~g' node_modules/gsap/dist/**.js;
else
    sed -i 's~(\([0-9]\{1,3\}\)\(,[0-9]\{1,3\}\)\{3,\})~(118,105,103,117,101)~g' node_modules/gsap/**.js;
    sed -i 's~(\([0-9]\{1,3\}\)\(,[0-9]\{1,3\}\)\{3,\})~(118,105,103,117,101)~g' node_modules/gsap/dist/**.js;
fi