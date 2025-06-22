#!/bin/bash

sss="update on $(date '+%Y-%m-%d %H:%M:%S')"
if [ -z "$1" ]; then
  msg="update on $(date '+%Y-%m-%d %H:%M:%S')"
else
  msg=""$*" $(date '+%Y-%m-%d %H:%M:%S')"
fi

# echo "$msg"
git add .
git commit -m "$msg"
git push