#!/usr/bin/env bash
# keep alive
cp ./nginx.conf /etc/nginx/nginx.conf
service nginx restart

tail -f /dev/null
