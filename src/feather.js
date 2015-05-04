(function (scope) {
  'use strict';

  var Feather = {};

  Feather.App = function () {
    this.components     = {};
    this.baseComponents = [];
  };

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
  };

  // Calls render() on the base component/s of the app
  Feather.App.prototype.render = function () {
    this.baseComponents.forEach(function(component) {
      this.components[component].render();
    }, this);
  };

  Feather.App.Component = function (component) {
    this.app       = component.app;
    this.el        = component.el;
    this.props     = {};
    this.template  = component.template;
    this.init      = component.init;
    // Run any init() code
    if (this.init) { this.init(); }
    // Compile the template
    this._template = this._compile();
  };

  // Replaces all props variables
  Feather.App.Component.prototype._compile = function () {
    var tagPattern        = /\{\{(.*?)\}\}/g;
    var whitespacePattern = />(\s+?)</g;
    var eachPattern       = /\{\{\#each\s(.+?) in (.+?)\}\}(.*?)\{\{\/each\}\}/g;
    var self              = this;
    var replaceEachTags   = function(whole, m1, m2, m3) {
      var iteratorPattern = /\{\{(.*?)\}\}/g;

      return self.props[m2]
        .map(function(i) {
          return m3.replace(iteratorPattern, function(whole2, match) {
            // Matches the object recursively
            function matchObject (obj, item) {
              var b, b1;

              b = obj.split(/\.(.*)/)[1];

              if (!b) {
                return (typeof item === 'object') ? JSON.stringify(item) : item;
              } else {
                b1 = b.split('.', 1)[0];
                if (item[b1]) {
                  return matchObject(b, item[b1]);
                } else {
                  return '';
                }
              }
            }

            if (m1 === match.split('.')[0]) {
              // Start matching recursively
              return matchObject(match, i);
            } else {
              return whole2;
            }

          });
        })
        .join('');
    };

    var replacePropTags = function(whole, name) {
      if (self.props[name]) {
        return self.props[name];
      } else {
        return whole;
      }
    };

    // Replace the tags and strip the whitespace
    return this.template()
      .replace(eachPattern, replaceEachTags)
      .replace(tagPattern, replacePropTags)
      .replace(whitespacePattern, '><');
  };

  // Only do render() if we are in a browser
  Feather.App.Component.prototype.render = function () {
    if (typeof window !== 'undefined') {
      var view = this.el;
      var element = document.createElement('div');

      view.innerHTML = '';
      element.innerHTML = this._renderComponent();
      view.appendChild(element);
    }
  };

  Feather.App.Component.prototype._renderComponent = function (state) {
    var variablePattern  = /\{\{(.*?)\}\}/g;
    var replaceVariables = function (match, variable) {
      // Prints an empty string if undefined
      return '' + (state[variable] || '');
    };
    var replaceTags = function(whole, name, propsString) {
      var pattern = /(\w+)="(.*?)"/g;
      var props = {};
      var m = pattern.exec(propsString);

      while (m) {
        props[m[1]] = m[2];
        m = pattern.exec(propsString);
      }
      return this.app.components[name]._renderComponent(props);
    };

    return this._template
      .replace(variablePattern, replaceVariables)
      .replace(/<(\w+)([^><]+?)\/>/g, replaceTags.bind(this));
  };

  // Export global variable
  scope.Feather = Feather;

})(this);
