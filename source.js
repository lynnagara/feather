console.log('asdf');



function render(list_of_stuff){
  var view = document.getElementById('view');
  view.innerHTML = '';
  for (var i = 0; i < list_of_stuff.length; i++){
    view.appendChild(item(list_of_stuff[i].name));
  }
}
  
function item(name){
  div = document.createElement('div');
  div.className = 'item';
  return div
}


stuff = [{'name': 'Tom'}, {'name': 'Lyn'}]

setInterval(function(){render(stuff)}, 1000);
