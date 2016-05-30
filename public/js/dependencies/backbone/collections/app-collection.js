var app = app || {};

$(function () {
    app.TopicCollection = Backbone.Collection.extend({
        url: 'http://localhost:3000/data/topics',
        parse: function(response) {
            return response;
        }
    });
});