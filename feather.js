'use strict';

+(function(scope){

    var Feather = function() {};

    Feather.App = function () {};

    Feather.App.Component = function (component) {
        this.app = component.app;
        this.props = {};
        this.template = component.template;
        this.init = component.init;
        // Run any init() code
        if (this.init) { this.init(); }
        // Compile the template
        this._template = this._compile();
    }

    // Replaces all props variables
    Feather.App.Component.prototype._compile = function() {
        var pattern = /\{\{(.*?)\}\}/g;
        var self = this;
        return this._template = this.template().replace(pattern, function(whole, name) {
            if (self.props[name]) {
                return self.props[name];
            } else {
                return whole;
            }
        });
    }

    // Render the base component if we are in a browser
    Feather.App.Component.prototype.render = function() {
        if (typeof window !== 'undefined') {
            var view = document.body;
            view.innerHTML = '';
            var element = document.createElement('div');
            element.innerHTML = this._renderComponent();
            view.appendChild(element);
        } else {
            var element = this._renderComponent();
        }
    }

    Feather.App.Component.prototype._renderComponent = function (state) {
        var pattern = /\{\{(.*?)\}\}/g; // nongreedy mustaches

        function replaceVariables(match, variable){
            // Prints an empty string if undefined
            return '' + (state[variable] || '');
        }
        var variable = this._template.replace(pattern, replaceVariables);	

        function replaceTags(whole, name, propsString) {
            var pattern = /(\w+)="(.*?)"/g;
            var props = {};
            var m;
            while (m = pattern.exec(propsString)) {
                props[m[1]] = m[2];
            }
            return this.app[name]._renderComponent(props);
        }
        return variable.replace(/<(\w+)([^><]+?)\/>/g, replaceTags.bind(this));
    }

    // Export global variable
    scope.Feather = Feather;

})(this);

