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
                    return (
                        '<div>       <div>My {{testvar}} awesome component</div>      </div>'
                    )
                }
            });

            myapp.mynestedcomponent = new Feather.App.Component({
                template: function() {
                    return ('<p>Inner component</p>');
                }
            });

            myapp.mycomponent.render();

        });

        it('should create the component', function(done) {
            assert.equal(myapp.mycomponent.app, Feather.App());
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

        it('should render nested component', function(done) {
            done();
        });
    });
});