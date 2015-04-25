'use strict';

var Feather = function() {};

Feather.Component = function (component) {
	this.template = component.template;
}

Feather.Component.prototype.render = function (state) {
    var self = this;
    var pattern = /\{\{(.*?)\}\}/g  // nongreedy mustaches

    function replaceVariables(match, variable){
        return ''+state[variable];
    }

    var variable = this.template.replace(pattern, replaceVariables);	

    function replaceTags(whole, name, propsString) {
        var pattern = /(\w+)="(.*?)"/g
        var props = {}
        var m;
        while (m = pattern.exec(propsString)) {
            props[m[1]] = m[2];
        }
        return window[name].render(props);
    }

	return variable.replace(/<(\w+) ([^><]+?)\/>/g, replaceTags);

}

Feather.Component.prototype.renderComponent = function() {
    var view = document.body;
    view.innerHTML = '';
    var element = document.createElement('div');
    element.innerHTML = this.render();
    view.appendChild(element);
}





