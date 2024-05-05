.PHONY: dev
dev:
	open http://localhost:8000
	caddy file-server --listen :8000 --browse

.PHONY: deploy
deploy:
	bun x @cubing/deploy
