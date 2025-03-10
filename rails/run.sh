#! /usr/bin/bash

cd /app
bundle config set --global path 'vendor/bundle' && bundle install; bundle exec rails s -b 0.0.0.0