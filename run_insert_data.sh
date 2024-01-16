#!/bin/bash

docker exec -it api sh -c "python /usr/src/server/insert_data.py"
docker restart api
