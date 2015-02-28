// Store
var store = {
	todoItems: [{'name': 'Tom'}, {'name': 'Lyn'}]

}



var component1 = {
	state: {
		name: 'Tom'
	},
	template: '<div>{{name}}</div>',
	render: function () {

	}
}


function renderComponent(component) {
	var view = document.getElementById('view');
	view.innerHTML = '';
	var element = document.createElement('div');
	element.innerHTML = component.template;
	view.appendChild(element);
}

renderComponent(component1);


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
