'use strict';

+(function() {

    // Create the base app and register all the components
    var app = new Feather.App();


    // Create and render the components

    app.listcomponent = new Feather.App.Component({
        app: app,
        template: (
            '<div class="listcomponent">\
                <listitem name="Tom" location="New york" />\
                <listitem name="Lyn" location="New york" />\
                <listitem name="Cat" />\
                <summary />\
            </div>'
        )
    });

    app.listitem = new Feather.App.Component({
        app: app,
        template: ('<div class="component1">{{name}} - {{location}}</div>')
    });

    app.summary = new Feather.App.Component({
        app: app,
        template: ('<div>I am the summary</div>')
    });

    app.listcomponent.renderComponent();

})();
