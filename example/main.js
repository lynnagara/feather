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
            this.props.listitems = [{txt: {one: 'item 1'}, id: 1},{txt: {one: 'item 2'}, id: 2}, {txt: {one: 'item 2'}, id: 3}];
            // this.props.mylist = this.props.listitems.map(function(item) {
            //     return '<div>' + item.txt + '</div>';
            // }).join('');
            this.props.mylist2 = '<span>!!!!!</span>';

            // Add some kind of identifier to t=e dom node
            // e.g. 0.1.1.0 ?

            return (
                '<div class="listcomponent">\
                    <listitem name="{{test}}" location="New york" year="1972" />\
                    <listitem name="Lyn" location="New york" />\
                    <listitem name="Cat" location="New york" />\
                    <summary />\
                    {{#each x in listitems}}\
                        <div>Test {{x.id}} {{mylist2}}</div>\
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
