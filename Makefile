
build: components index.js
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

publish:
	@component build
	@rm -fr gh-pages
	@mkdir gh-pages
	@mv build gh-pages/
	@cp example.html gh-pages/index.html
	@ghp-import gh-pages -n
	@rm -fr gh-pages

watch:
	rewatch *.js -c "make build"

.PHONY: clean watch build
