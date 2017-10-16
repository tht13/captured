git fetch -fv
git reset origin/master --hard
git checkout master
docker-compose build
docker-compose down
docker-compose up -d
