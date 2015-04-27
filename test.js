'use strict';

// var assert = require('assert');
var Feather = require('./feather.js').Feather;
var assert = require('chai').assert;

describe('Component', function() {

    describe('Create basic component', function() {

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
                    return (
                        '<div>       <div>My {{testvar}} awesome component</div>      </div>'
                    )
                }
            });

            myapp.mycomponent.render();

        });

        it('should create the component', function(done) {
            assert.equal(myapp.mycomponent.app, Feather.App());
            assert.isObject(myapp.mycomponent.props);
            done();
        });

        it('should run init()', function(done) {
            assert.equal(myapp.mycomponent.init(), 'init!');
            done();
        });

        it('should compile the component and strip whitespace', function(done) {
            assert.equal(
                myapp.mycomponent._template, 
                '<div><div>My super awesome component</div></div>'
            );
            done();
        });
    });

    describe('Create nested component', function() {

        var myapp;

        beforeEach(function() {
            myapp = new Feather.App();
            myapp.mycomponent = new Feather.App.Component({
                app: myapp,
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

            myapp.mynestedcomponent = new Feather.App.Component({
                app: myapp,
                template: function() {
                    return ('<p>Inner component</p>');
                }
            });
        });

        it('should render nested component', function(done) {
            assert.equal(
                myapp.mycomponent._renderComponent(),
                '<div><div>My YOLO awesome component</div><p>Inner component</p><p>Inner component</p><p>Inner component</p></div>'
            );
            done();
        });
    });
});
