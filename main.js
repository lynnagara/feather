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
        template: (
            '<div class="listcomponent">\
                <listitem name="{{test}}" location="New york" year="1972" />\
                <listitem name="Lyn" location="New york" />\
                <listitem name="Cat" location="New york" />\
                <summary />\
            </div>'
        )
    });

    app.listitem = new Feather.App.Component({
        app: app,
        template: ('<div class="component1">{{name}} - {{location}} - {{year}}</div>')
    });

    app.summary = new Feather.App.Component({
        app: app,
        template: ('<div>I am the summary</div>')
    });

    app.listcomponent.renderComponent();

})();
