.PHONY: build
build: node_modules
	node generate.js

node_modules:
	npm install
