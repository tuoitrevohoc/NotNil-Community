#!/usr/bin/env bash
# nginx
nginx -g deamon off

service supervisor start && nginx
echo "Server starting..."
