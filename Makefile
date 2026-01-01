# ----------------------------------------
# Variables
# ----------------------------------------
DC=docker compose
SERVICE=react-todo
PNPM=pnpm

# ----------------------------------------
# Help
# ----------------------------------------
.PHONY: help
help:
	@echo "Available commands:"
	@echo "  make build         -> Build docker images"
	@echo "  make up            -> Start containers"
	@echo "  make down          -> Stop containers"
	@echo "  make rs            -> Restart containers"
	@echo "  make logs          -> View container logs"
	@echo "  make shell         -> Enter app container shell"
	@echo "  make pnpm install  -> Run pnpm install"
	@echo "  make pnpm <cmd>    -> Run any pnpm command"

# ----------------------------------------
# Docker commands
# ----------------------------------------
.PHONY: build
build:
	$(DC) build --no-cache

.PHONY: up
up:
	$(DC) up -d

.PHONY: down
down:
	$(DC) down

.PHONY: rs
rs:
	$(DC) down && $(DC) up -d

.PHONY: logs
logs:
	$(DC) logs -f $(SERVICE)

.PHONY: sh
sh:
	$(DC) exec $(SERVICE) sh

# ----------------------------------------
# PNPM commands
# ----------------------------------------
.PHONY: pnpm
pnpm:
	$(DC) exec $(SERVICE) $(PNPM) $(filter-out $@,$(MAKECMDGOALS))