'use strict';

+(function() {

    // Create the base app and register all the components
    var app = new Feather.App();

    // Create and render the components
    app.createComponent({
        name: 'testcomponent',
        template: function() {
            return (
                '<div>Test!</div>'
            )
        }
    });

    app.createComponent({
        name: 'listcomponent',
        el: document.body,
        init: function() {
            // Populate the component list
            this.props.test = 'Tom';
        },
        template: function() {
            this.props.listitems = ['item 1','item 2', 'item 3'];
            this.props.mylist = this.props.listitems.map(function(item) {
                return '<div>' + item + '</div>';
            }).join('');
            this.props.mylist2 = '<p>My custom list</p>';

            // Add some kind of identifier to the dom node
            // e.g. 0.1.1.0 ?

            return (
                '<div class="listcomponent">\
                    <listitem name="{{test}}" location="New york" year="1972" />\
                    <listitem name="Lyn" location="New york" />\
                    <listitem name="Cat" location="New york" />\
                    <summary />\
                    {{mylist}}\
                    {{#each x in listitems}}\
                        <div>Test {{x}}</div>\
                    {{/each}}\
                </div>'
            )
        }
    });

    app.createComponent({
        name: 'listitem',
        template: function() {
            return ('<div class="component1">{{name}} - {{location}} - {{year}}</div>')
        }
    });

    app.createComponent({
        name: 'summary',
        template: function() {
            return ('<div>I am the summary component</div>')
        }
    });

    app.render();

})();
