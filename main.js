'use strict';

// Create and render the components

var listcomponent = new Feather.Component({
    template: (
        '<div class="listcomponent">\
            <listitem name="Tom" location="New york" />\
            <listitem name="Lyn" location="New york" />\
            <summmary />\
        </div>'
    )
});

var listitem = new Feather.Component({
    template: ('<div class="component1">{{name}} - {{location}}</div>')
});


listcomponent.renderComponent();