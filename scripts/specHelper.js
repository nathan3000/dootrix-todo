define(function(require) {

    var chai = require('chai'),
        chaiEnzyme = require('chai-enzyme'),
        sinon = require('sinon');

    chai.use(chaiEnzyme());
    chai.config.includeStack = false;

    before(function() {
        sinon.stub(console, 'error', function(warning) {
            throw new Error(warning);
        });
    });

    after(function() {
        console.error.restore();
    });


    require('babel-register')();

    var jsdom = require('jsdom').jsdom;

    var exposedProperties = ['window', 'navigator', 'document'];

    global.document = jsdom('');
    global.window = document.defaultView;
    Object.keys(document.defaultView).forEach((property) => {
        if (typeof global[property] === 'undefined') {
            exposedProperties.push(property);
            global[property] = document.defaultView[property];
        }
    });

    global.navigator = {
        userAgent: 'node.js'
    };

    documentRef = document;

});
