#/bin/bash
docker-machine stop $(docker-machine ls -q)
docker-machine rm -y $(docker-machine ls -q)

