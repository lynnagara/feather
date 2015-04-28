'use strict';

+(function (scope){

    var Feather = function () {};

    Feather.App = function () {
        this.components = {};
        this.baseComponents = [];
    }

    Feather.App.prototype.createComponent = function (component) {
        if (component.el) {
            this.baseComponents.push(component.name);
        }
        this.components[component.name] = new Feather.App.Component({
            app: this,
            name: component.name,
            el: component.el,
            init: component.init,
            template: component.template
        });
    }

    // Calls render() on the base component/s of the app
    Feather.App.prototype.render = function () {
        this.baseComponents.forEach(function(component) {
            this.components[component].render();
        }, this);
    }

    Feather.App.Component = function (component) {
        this.app = component.app;
        this.el = component.el;
        this.props = {};
        this.template = component.template;
        this.init = component.init;
        // Run any init() code
        if (this.init) { this.init(); }
        // Compile the template
        this._template = this._compile();
    }

    // Replaces all props variables
    Feather.App.Component.prototype._compile = function () {
        var pattern = /\{\{(.*?)\}\}/g;
        var whitespace_pattern = />(\s+?)</g;
        var self = this;

        function replaceTags(whole, name) {
            if (self.props[name]) {
                return self.props[name];
            } else {
                return whole;
            }
        }

        // Replace the tags and strip the whitespace
        return this.template().replace(pattern, replaceTags)
        .replace(whitespace_pattern, '><');
    }

    // Only do render() if we are in a browser
    Feather.App.Component.prototype.render = function () {
        if (typeof window !== 'undefined') {
            var view = this.el;
            view.innerHTML = '';
            var element = document.createElement('div');
            element.innerHTML = this._renderComponent();
            view.appendChild(element);
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
            return this.app.components[name]._renderComponent(props);
        }
        return variable.replace(/<(\w+)([^><]+?)\/>/g, replaceTags.bind(this));
    }

    // Export global variable
    scope.Feather = Feather;

})(this);

