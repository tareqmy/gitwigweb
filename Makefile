.PHONY: install dev build preview help

# Default target when just running 'make'
help:
	@echo "Gitwig Website Makefile Commands:"
	@echo ""
	@echo "  make install  - Install dependencies (npm install)"
	@echo "  make dev      - Start the local development server (npm run dev)"
	@echo "  make build    - Build the website for production (npm run build)"
	@echo "  make preview  - Preview the production build locally (npm run preview)"
	@echo ""

install:
	npm install

dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview
