'use strict';

+(function() {

    // Create the base app and register all the components
    var app = new Feather.App();
    // Create and render the components

    app.listcomponent = new Feather.App.Component({
        app: app,
        init: function() {
            // Populate the component list
            this.props.test = "Tom";
        },
        template: function() {
            var listitems = ['item 1','item 2', 'item 3'];
            this.props.mylist = listitems.map(function(item) {
                return '<div>' + item + '</div>';
            }).join('');
            return (
                '<div class="listcomponent">\
                    <listitem name="{{test}}" location="New york" year="1972" />\
                    <listitem name="Lyn" location="New york" />\
                    <listitem name="Cat" location="New york" />\
                    <summary />\
                    {{=mylist}}\
                </div>'
            )
        }
    });

    app.listitem = new Feather.App.Component({
        app: app,
        template: function() {
            return ('<div class="component1">{{name}} - {{location}} - {{year}}</div>')
        }   
    });

    app.summary = new Feather.App.Component({
        app: app,
        template: function() {
            return ('<div>I am the summary component</div>')
        }
    });

    app.listcomponent.render();
    
})();
