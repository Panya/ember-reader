EmReader.EntriesController = Em.ArrayController.extend({
    contentBinding: 'EmReader.router.feedsController.selected.entries'
});

EmReader.EntriesView = Em.View.extend({
    templateName: 'entries'
});

EmReader.Entry = Em.Object.extend({
    author: '',
    categories: [],
    content: '',
    contentSnippet: '',
    link: '',
    publishedDate: '',
    title: ''
});
