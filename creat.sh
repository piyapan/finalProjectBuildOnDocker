#/bin/bash
docker-machine create --driver virtualbox manager01
for ((i = 1; i <= $1; i++)); do
    docker-machine create --driver virtualbox worker0$i
done

