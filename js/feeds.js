EmReader.FeedsController = Em.ArrayController.extend({
    content: [],
    selected: null,

    addFeed: function(url, force) {
        var content = this.get('content');
        var item = content.filterProperty('feedUrl', url);

        if (force || !item.length) {
            var feed = EmReader.Feed.create({
                feedUrl: url
            });

            content.addObject(feed);
            return feed;
        }
    },

    findOrAdd: function(url) {
        var content = this.get('content');
        var item = content.filterProperty('feedUrl', url);

        if (item.length) {
            return item.get('firstObject');
        } else {
            return this.addFeed(url, true);
        }
    }
});

EmReader.FeedsView = Em.View.extend({
    tagName: 'ul',
    classNames: ['b-feeds-list'],
    templateName: 'feeds'
});

EmReader.Feed = Em.Object.extend({
    feedUrl: '',
    author: '',
    title: '',
    type: '',
    link: '',
    entries: [],

    init: function() {
        var url = this.get('feedUrl');
        var feed = new google.feeds.Feed(url);
        var that = this;

        feed.setResultFormat(google.feeds.Feed.JSON_FORMAT);
        feed.load(function(output) {
            if (output.status && output.status.code == 200) {
                that.setProperties(output.feed);
            }
        });
    },

    entriesLoaded: function() {
        var entries = this.get('entries');

        if (entries.length) {
            entries.forEach(function(entry, idx) {
                entries.splice(idx, 1, EmReader.Entry.create(entry));
            });
        }
    }.observes('entries')
});
