// Store
var store = {
	todoItems: [{'name': 'Tom'}, {'name': 'Lyn'}]

}

var Component = function (template) {
	this.template = template;
}

Component.prototype.render = function (state) {
  self = this;
  pattern = /\{\{(.*?)\}\}/g  // nongreedy mustaches
  function replaceVariables(match, variable){
	    return ''+state[variable];
  }

  variable = this.template.replace(pattern, replaceVariables);	

  function replaceTags(whole, name, propsString) {

		// s = 'key1="stuff" key2="morestuff"'

		pattern = /(\w+)="(.*?)"/g
		props = {}

		while (m = pattern.exec(propsString)) {
		  props[m[1]] = m[2];
		}

  	return window[name].render(props);

  }

	return variable.replace(/<(\w+) ([^><]+?)\/>/g, replaceTags);

}

var listcomponent = new Component(
	'<div class="listcomponent">\
		<listitem name="Tom" location="New york" />\
		<listitem name="Lyn" location="New york" />\
	</div>'
);


var listitem = new Component(
	'<div class="component1">{{name}} - {{location}}</div>'
);


function renderComponent(component) {
	var view = document.getElementById('view');
	view.innerHTML = '';
	var element = document.createElement('div');
	element.innerHTML = component.render({name: 'Tom'});
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
