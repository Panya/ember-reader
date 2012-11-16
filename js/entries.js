EmReader.EntriesController = Em.ArrayController.extend({
    content: []
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
