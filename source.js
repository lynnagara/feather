// Store
var store = {
	todoItems: [{'name': 'Tom'}, {'name': 'Lyn'}]

}

var Component = function (state, template) {
	this.state = state;
	this.template = template;
}

Component.prototype.render = function () {
  self = this;
  pattern = /\{\{(.*?)\}\}/g  // nongreedy mustaches
  function replace(match, variable){
  	if (variable[0] === '*') {
  		return window[variable.slice(1)].render();
  	} else {
	    return ''+self.state[variable];
  	}

  }
  return this.template.replace(pattern, replace);	
}

var listcomponent = new Component(
	{ name: '' },
	'<div class="listcomponent">{{*component1}}</div>'
);


var component1 = new Component(
	{ name: 'Tom' },
	'<div class="component1">{{name}}</div>'
);


function renderComponent(component) {
	var view = document.getElementById('view');
	view.innerHTML = '';
	var element = document.createElement('div');
	element.innerHTML = component.render();
	view.appendChild(element);
}

renderComponent(listcomponent);


// function render(list_of_stuff){
//   var view = document.getElementById('view');
//   view.innerHTML = '';
//   for (var i = 0; i < list_of_stuff.length; i++){
//     view.appendChild(item(list_of_stuff[i].name));
//   }
// }
  
// function item(name){
//   div = document.createElement('div');
//   div.className = 'item';
//   return div
// }


// stuff = [{'name': 'Tom'}, {'name': 'Lyn'}]

// setInterval(function(){render(stuff)}, 1000);
