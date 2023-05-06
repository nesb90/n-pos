setup:
	docker volume create --name=n-pos-db

init-db:
	docker-compose run --rm n-pos run init:db

build:
	docker build .

dev:
	docker-compose -f docker-compose.yaml -f docker/docker-compose.dev.yaml up n-pos
