


.PHONY: help


help:
	cat docs/make.help.txt

image:
	@docker-compose down --rmi all && \
		docker-compose build

console:
	@docker-compose down && \
		docker-compose run app bash

tdd:
	@docker-compose down && \
		docker-compose run app 'npm run tdd'
