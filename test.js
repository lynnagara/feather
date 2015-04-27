'use strict';

var assert = require('assert');
var Feather = require('./feather.js').Feather;

describe('Component', function() {
    describe('Create', function() {

        // Create a component
        var myapp;

        beforeEach(function() {
            myapp = new Feather.App();
            myapp.mycomponent = new Feather.App.Component({
                init: function() {
                    return 'init!';
                },
                template: function() {
                    this.props.testvar = 'super';
                    return '<div>My {{testvar}} awesome component</div>'
                }
            });
            myapp.mycomponent.render();
        });

        it('should create the component', function(done) {
            assert.equal(myapp.mycomponent.app, Feather.App());
            assert.equal(myapp.mycomponent.init(), 'init!');
            done();
        });

        it('should compile the component', function(done) {
            assert.equal(myapp.mycomponent._template, '<div>My super awesome component</div>');
            done();
        });

    });
});