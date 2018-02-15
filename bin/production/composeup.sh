#!/bin/bash

# garantindo que os logs antigos serão apagados para que o filebeat não processe novamente os mesmos logs
rm -rf /filesystem/atendimento-backend/logs/{*.log*,*.txt*}

sudo /usr/local/bin/docker-compose -p $PROJECT_PREFIX -f $BACKEND_PATH/bin/production/docker-compose.yml up --force-recreate -d
sudo /usr/local/bin/docker-compose -p $PROJECT_PREFIX -f $BACKEND_PATH/bin/production/docker-compose.yml scale app=4