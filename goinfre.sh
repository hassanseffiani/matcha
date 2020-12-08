# rm -rf .docker
# rm -rf .brew
# rm -rf goinfre/.brew
# rm -rf goinfre/.docker
# rm -rf goinfre
# ln -s ../../goinfre/hseffian goinfre
# git clone --depth=1 https://github.com/Homebrew/brew goinfre/.brew
# rm -rf /Users/hseffian/Library/Caches/Homebrew/*
# ln -s goinfre/.brew .brew
# brew install docker
# brew install docker-machine
# brew install docker-compose
# docker-machine rm -f default
# docker-machine create --driver virtualbox default
# eval $(docker-machine env defautl)
# mv .docker goinfre
# ln -s goinfre/.docker .docker
# docker run --name mysql -v ~/server/mysqlSharedVolume:/docker-entrypoint-initdb.d -e MYSQL_ROOT_PASSWORD=tiger -p 3306:3306 -d mysql
# docker exec -it mysql bash
# docker run --name myadmin -d --link mysql:db -e PMA_ARBITRARY=1 -p 8080:80 phpmyadmin
# docker-machine start
# docker start mysql
# docker start myadmin
