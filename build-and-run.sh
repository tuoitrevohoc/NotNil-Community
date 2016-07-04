#!/bin/bash

# update to latest code
git pull

export PATH=$PATH:/maven/bin:/swift30/usr/bin

cd src/main/angular
ng build -prod --output-path=../resources/static

cd ../../../
mvn package
