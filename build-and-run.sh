#!/bin/bash

# update to latest code
git pull

cd src/main/angular
ng build -prod --output-path=../resources/static

cd ../../../
mvn package
