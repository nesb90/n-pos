build:
	docker build .

dev:
	docker-compose -f docker-compose.yaml -f docker/docker-compose.dev.yaml up n-pos
