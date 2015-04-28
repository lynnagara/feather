'use strict';

// var assert = require('assert');
var Feather = require('../src/feather.js').Feather;
var assert = require('chai').assert;

describe('Component', function() {

    describe('Create basic component', function() {

        // Create a component
        var myapp;

        beforeEach(function() {
            myapp = new Feather.App();

            myapp.createComponent({
                name: 'mycomponent',
                init: function() {
                    return 'init!';
                },
                template: function() {
                    this.props.testvar = 'super';
                    return (
                        '<div>       <div>My {{testvar}} awesome component</div>      </div>'
                    )
                }

            });

            myapp.components.mycomponent.render();

        });

        it('should create the component', function(done) {
            assert.equal(myapp.app, Feather.App());
            assert.isObject(myapp.components.mycomponent.props);
            done();
        });

        it('should run init()', function(done) {
            assert.equal(myapp.components.mycomponent.init(), 'init!');
            done();
        });

        it('should compile the component and strip whitespace', function(done) {
            assert.equal(
                myapp.components.mycomponent._template, 
                '<div><div>My super awesome component</div></div>'
            );
            done();
        });
    });

    describe('Create nested component', function() {

        var myapp;

        beforeEach(function() {
            myapp = new Feather.App();

            myapp.createComponent({
                name: 'mycomponent',
                template: function() {
                    this.props.testvar = 'YOLO';
                    return (
                        '<div>\
                            <div>My {{testvar}} awesome component</div>\
                            <mynestedcomponent />\
                            <mynestedcomponent />\
                            <mynestedcomponent />\
                        </div>'
                    )
                }
            });

            myapp.createComponent({
                name: 'mynestedcomponent',
                template: function() {
                     return ('<p>Inner component</p>');
                }
            });

            myapp.components.mycomponent.render();

        });

        it('should render nested component', function(done) {
            assert.equal(
                myapp.components.mycomponent._renderComponent(),
                '<div><div>My YOLO awesome component</div><p>Inner component</p><p>Inner component</p><p>Inner component</p></div>'
            );
            done();
        });
    });
});
