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
                return '<div>My awesome component</div>'
            }
        });
        myapp.mycomponent.render();
    });

    it('should create the component', function(done){
        assert.equal(myapp.mycomponent.app, Feather.App());
        assert.equal(myapp.mycomponent.template(), '<div>My awesome component</div>');
        assert.equal(myapp.mycomponent.init(), 'init!');
        done();
    });

    it('should render the component', function(done){
        done();
    });

  });
});