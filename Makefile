.PHONY: dev
dev:
	open http://localhost:8000
	caddy file-server --listen :8000 --browse

HOSTNAME  = notation.cubing.net
SFTP_PATH = "${HOSTNAME}:~/${HOSTNAME}/"
URL       = "https://${HOSTNAME}/"

.PHONY: deploy
deploy:
	rsync -avz \
		--exclude .DS_Store \
		--exclude .git \
		./ \
		${SFTP_PATH}
	echo "\nDone deploying. Go to ${URL}\n"
