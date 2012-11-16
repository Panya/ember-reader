var EmReader = Em.Application.create();

EmReader.ApplicationController = Em.Controller.extend({
    title: 'Ember Reader'
});

EmReader.ApplicationView = Em.View.extend({
    classNames: ['b-app'],
    templateName: 'application'
});

EmReader.AddFieldView = Em.TextField.extend({
    classNames: ['b-input'],
    placeholder: 'Add feed url...',
    insertNewline: function(e) {
        var url = $.trim(this.get('value'));

        if (url && /^https?/i.test(url)) {
            EmReader.get('router').get('feedsController').addFeed(url);
            this.set('value', '');
        }
    }
});

google.load('feeds', '1');
