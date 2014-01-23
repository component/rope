
build: components index.js
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

test:
	(sleep 2; open http://localhost:8080/__zuul) &
	zuul --local 8080 --ui mocha-bdd -- test/rope.js

.PHONY: clean test
