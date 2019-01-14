const chai = require('chai');
const jsdom = require('jsdom');
const sinon = require('sinon');

const { JSDOM } = jsdom;
const { assert, expect } = chai;

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

function setupMultipleTimes() {
    return new JSDOM(`
        <head>
            <script src="./vlaanderen-font.js"></script>
            <script src="./vlaanderen-font.js"></script>
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
            assert.equal(link.getAttribute('href'), 'https://cdn.milieuinfo.be/vlaanderen-font/LATEST/milieuinfo.style.css');
            done();
        });
    });

    test('de vlaanderen fonts worden niet meer toegevoegd indien deze reeds bestaan', (done) => {
        const dom = setup();
        wait(dom, () => {
            const window = dom.window;
            const links = window.document.querySelectorAll('link');
            expect(links).to.have.length(1);
            done();
        });
    });

    test('wanneer de host ruimteinfo is, zal er een ander style script gebruikt worden', (done) => {
        const dom = setup();
        dom.reconfigure({url: 'https://app.ruimteinfo.be'});
        wait(dom, () => {
            const window = dom.window;
            const link = window.document.querySelector('link');
            assert.exists(link);
            assert.equal(link.getAttribute('rel'), 'stylesheet');
            assert.equal(link.getAttribute('type'), 'text/css');
            assert.equal(link.getAttribute('href'), 'https://cdn.ruimteinfo.be/vlaanderen-font/LATEST/ruimteinfo.style.css');
            done();
        });
    });
});