#!/bin/bash
sudo /usr/local/bin/docker-compose -p $PROJECT_PREFIX -f $BACKEND_PATH/bin/production/docker-compose.yml down