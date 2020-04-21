#!/bin/bash

### Helfpul Articles
# https://nickjanetakis.com/blog/setting-up-docker-for-windows-and-wsl-to-work-flawlessly
# https://github.com/docker-library/postgres/issues/435#issuecomment-615083213
# https://hackernoon.com/dont-install-postgres-docker-pull-postgres-bee20e200198
# https://hub.docker.com/_/postgres
# https://chartio.com/resources/tutorials/how-to-set-the-default-user-password-in-postgresql/
# https://chartio.com/resources/tutorials/how-to-change-a-user-to-superuser-in-postgresql/

container=pg-docker

POSTGRES_DATA_PATH="$(grep POSTGRES_DATA_PATH ./.env | cut -d '=' -f 2)"
# echo POSTGRES_DATA_PATH: $POSTGRES_DATA_PATH && echo

POSTGRES_USER="$(grep POSTGRES_USER ./.env | cut -d '=' -f 2)"
echo POSTGRES_USER: $POSTGRES_USER

POSTGRES_PASSWORD="$(grep POSTGRES_PASSWORD ./.env | cut -d '=' -f 2)"
echo POSTGRES_PASSWORD: $POSTGRES_PASSWORD

POSTGRES_DB="$(grep POSTGRES_DB ./.env | cut -d '=' -f 2)"
echo POSTGRES_DB: $POSTGRES_DB

echo


running=$(docker container ls --all | grep ${container} | cut -d " " -f 1)

if [ ! -z "$running" ]; then
  echo PostgreSQL Docker container already running as: $running
  echo Stopping container...
  docker container stop ${container} >/dev/null 2>&1
  echo Removing container...
  docker container rm ${container} >/dev/null 2>&1
  echo
fi


echo Running PostgreSQL Docker container...
docker run  --name pg-docker  -e POSTGRES_USER=$POSTGRES_USER  -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD  -p 5432:5432  -v /var/lib/docker/basedata:/var/lib/postgresql/data  -v $POSTGRES_DATA_PATH:/mnt/postgresql_data  -e POSTGRES_DB=$POSTGRES_DB  -d  postgres

echo