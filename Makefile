start: 
	docker compose up -d

startall: 
	docker compose up --build -d

down:
	docker stop lilith_back

reset: down
	docker rm lilith_back

# Build the Docker image and save it as a tarball
tar: 
	docker build --no-cache -t lilith_back -f Dockerfile .
	docker save lilith_back -o lilith_back.tar

# Install the Docker image by loading it from a tarball and running it
install:
	docker stop lilith_back
	docker rm lilith_back
	docker image rm lilith_back
	docker load -i lilith_back.tar
	docker compose -f docker-compose.prod.yml up -d

help:
	@echo ""
	@echo "~~ Lilith_back Makefile ~~"
	@echo ""
	@echo "\033[33m make start\033[39m    : Démarre le projet"
	@echo "\033[33m make startall\033[39m : Build et démarre le projet"
	@echo "\033[33m make down\033[39m     : Stop le projet"
	@echo "\033[33m make reset\033[39m    : Reset les containers, les volumes, les networks et les données local"
	@echo ""