.PHONY: dev
dev:
	open http://localhost:8000
	caddy file-server --listen :8000 --browse

SFTP_PATH = "towns.dreamhost.com:~/notation.cubing.net/"
URL       = "https://notation.cubing.net/"

.PHONY: deploy
deploy:
	rsync -avz \
		--exclude .DS_Store \
		--exclude .git \
		./ \
		${SFTP_PATH}
	echo "\nDone deploying. Go to ${URL}\n"
