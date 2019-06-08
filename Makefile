.PHONY: build
build: node_modules public/bundle.js
	node generate.js

public/bundle.js:
	npm run build

node_modules:
	npm install
