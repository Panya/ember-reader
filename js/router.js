EmReader.Router = Em.Router.extend({
    enableLogging: true,
    root: Em.Route.extend({
        index: Em.Route.extend({
            route: '/',
            redirectsTo: 'feeds'
        }),
        feeds: Em.Route.extend({
            route: '/feeds',
            connectOutlets: function(router) {
                var app = router.get('applicationController');
                app.connectOutlet('feeds', 'feeds');
                app.connectOutlet('addField', 'addField');
                app.connectOutlet('body', 'entries');
            },
            feed: Em.Route.extend({
                route: '/:feed_url',
                serialize: function(router, context) {
                    return { feed_url: encodeURIComponent(context.get('feedUrl')) };
                },
                deserialize: function(router, params) {
                    return router.get('feedsController').findOrAdd(decodeURIComponent(params.feed_url));
                },
                connectOutlets: function(router, context) {
                    router.get('feedsController').set('selected', context);
                }
            })
        }),
        showEntries: function(router, e) {
            var context = e.context;

            router.get('feedsController').set('selected', context);
            router.transitionTo('feeds.feed', context);
        }
    })
});
