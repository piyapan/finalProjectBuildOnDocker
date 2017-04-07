#!/bin/bash

docker-compose up -d
docker exec mysql sh -c 'exec mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" --databases project' > ./mysql/network.sql.gz
