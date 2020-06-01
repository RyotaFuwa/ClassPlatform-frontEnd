#!/usr/bin/env bash

pushd .
if [ $1 == 'page' ]
then
  cd pages
elif [ $1 == 'component' ]
then
  cd components
else
  exit
fi

cd $2
rename "s/$2/$3/" *
cd ..
rename "s/$2/$3/" *
popd

