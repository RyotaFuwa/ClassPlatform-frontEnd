#!/usr/bin/env bash
pushd .
mkdir $1
cd $1
touch $1.js $1.css
popd
