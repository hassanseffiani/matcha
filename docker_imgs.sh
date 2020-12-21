# docker-machine start
# eval $(docker-machine env default)
# docker run --name mysql -v ~/server/mysqlSharedVolume:/docker-entrypoint-initdb.d -e MYSQL_ROOT_PASSWORD=tiger -p 3306:3306 -d mysql
# docker exec -it mysql bash
# docker run --name myadmin -d --link mysql:db -e PMA_ARBITRARY=1 -p 8080:80 phpmyadmin
# docker start mysql
# docker start myadmin