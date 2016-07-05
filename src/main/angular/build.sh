#!/usr/bin/env bash

cd src/main/angular
npm install
npm run-script postinstall
ng build -prod --output-path=/usr/share/nginx/html
