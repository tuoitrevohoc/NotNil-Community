#!/usr/bin/env bash

npm install
npm run-script postinstall
ng build -prod --output-path=/usr/share/nginx/html
