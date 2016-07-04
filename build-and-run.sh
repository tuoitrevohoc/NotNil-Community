#!/bin/bash

# update to latest code
export PATH=$PATH:/maven/bin:/swift30/usr/bin

cd src/main/angular
npm install
npm run-script postinstall
ng build -prod --output-path=../resources/static

cd ../../../
mvn package
