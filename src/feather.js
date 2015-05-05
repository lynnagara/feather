(function (scope) {
  'use strict';

  var Feather = {};

  Feather.App = function () {
    this.components     = {};
    this.baseComponents = [];
    // Data structure to hold the information about the nodes
    this._nodes = {};

  };

  // Calls render() on the base component/s of the app
  Feather.App.prototype.render = function () {
    this.baseComponents.forEach(function(component) {
      this.components[component].render();
    }, this);
  };

  Feather.App.Component = function (component) {
    this.app         = component.app;
    this.el          = component.el;
    this.props       = {};
    this.template    = component.template;
    this.init        = component.init;
    this._childNodes = {};
    // Run any init() code
    if (this.init) { this.init(); }
    // Compile the template
    this._template = this._compileTemplate();
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

  // Replaces all props variables
  Feather.App.Component.prototype._compileTemplate = function () {
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

  // Appends it to the dom if we are in a browser
  Feather.App.Component.prototype.render = function () {
    var componentAsStr, domNodeToAppend, tmpEl;
    if (typeof window !== 'undefined') {
      // Append only the children of the newly generated node
      domNodeToAppend = this.el;
      componentAsStr = this._generateComponent();
      tmpEl = document.createElement('div');
      tmpEl.innerHTML = componentAsStr;
      while(tmpEl.firstChild) {
        domNodeToAppend.appendChild(tmpEl.firstChild);
      }
    }
  };

  // Returns a html component
  Feather.App.Component.prototype._generateComponent = function (state, parent) {

    var variablePattern  = /\{\{(.*?)\}\}/g;
    var tagPattern = /<(\w+)([^><]+?)\/>/g;
    var dataAttrPattern = /(<div\s|.*?)>/; // Grab the start of the div tag => should prob support other tags

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
      return this.app.components[name]._generateComponent(props, this);
    };

    var getPosInNodeList = function(self, parentNodeList) {
      var key = 0;
      while (true) {
        if (!parentNodeList.hasOwnProperty(key)) {
          return key;
        } else {
          key += 1;
        }
      }
    };

    // Update the _nodes list
    var parentNodeList = this.el ? this.app._nodes : parent._childNodes;
    var pos = getPosInNodeList(this, parentNodeList);
    parentNodeList[pos] = this;

    var addDataAttrs = function(whole, startTag) {
      return startTag + ' data-featherid=' + pos + '>';
    }

    return this._template
      .replace(variablePattern, replaceVariables)
      .replace(tagPattern, replaceTags.bind(this))
      .replace(dataAttrPattern, addDataAttrs);

  };

  // Export global variable
  scope.Feather = Feather;

})(this);
