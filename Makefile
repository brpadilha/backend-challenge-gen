.PHONY: build
build:
	docker-compose build

.PHONY: up
up:
	docker-compose up -d

.PHONY: ps
ps:
	docker-compose ps

.PHONY: down
down:
	docker-compose down

.PHONY: create 
create:
	docker-compose exec node yarn sequelize migration:create --name=create-$(n)

.PHONY: migrate
migrate:
	docker-compose exec node yarn sequelize db:migrate

.PHONY: logs
logs:
	docker-compose logs -f $(e)
.PHONY: add
add:
	docker-compose exec node yarn add $(e)
