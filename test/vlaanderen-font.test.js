const chai = require('chai');
const jsdom = require('jsdom');
const sinon = require('sinon');

const { JSDOM } = jsdom;
const { assert } = chai;

const sandbox = sinon.createSandbox();

function wait(dom, callback) {
    dom.window.addEventListener('load', () => {
        setTimeout(() => {
            callback();
        }, 500);
    });
}

function setup() {
    return new JSDOM(`
        <head>
            <script src="./vlaanderen-font.js"></script>
        </head>
    `, {
        runScripts: 'dangerously',
        resources: 'usable'
    });
}

suite('browser support', function() {
	teardown(() => {
		sandbox.restore();
    });

    test('de vlaanderen fonts worden gedefinieerd via een css en toegevoegd aan het head element', (done) => {
        const dom = setup();
        wait(dom, () => {
            const window = dom.window;
            const link = window.document.querySelector('link');
            assert.exists(link);
            assert.equal(link.getAttribute('rel'), 'stylesheet');
            assert.equal(link.getAttribute('type'), 'text/css');
            assert.equal(link.getAttribute('href'), 'https://cdn.milieuinfo.be/vlaanderen-font/LATEST/style.css');
            done();
        });
    });
});