#!/bin/bash

# creates new empty migration file with timestamp.
#
# example usage: "./update-api.sh 0.0.2"

# args
version=$1
if [ -z $version ]; then
  echo "Release version is required"
  exit 1
fi

cd $(dirname $(readlink -f $0))/src/app/api

if [ $? -ne 0 ]; then
  echo "Error: exiting"
  exit 1
fi

rm -rf ./*

wget -q https://github.com/fabrizio-s/j2c-spring/releases/download/$version/swagger.tar.gz

if [ $? -ne 0 ]; then
  echo "Error: exiting"
  exit 1
fi

tar -xf swagger.tar.gz

if [ $? -ne 0 ]; then
  echo "Error: exiting"
  exit 1
fi

../../../node_modules/.bin/ng-openapi-gen -i swagger.json -o .

if [ $? -ne 0 ]; then
  echo "Error: exiting" 
  exit 1
fi

# some methods in the service.ts files 
# get generated with names ending with a digit for some reason.
# the following commands aim to provide a quick fix
sed -ri 's/([a-z])[0-9]/\1/g' services/*.service.ts