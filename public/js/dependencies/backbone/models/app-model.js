var app = app || {};

$(function () {
    app.TopicModel = Backbone.Model.extend({
        defaults:{
            name:'default name'
        }
    });
});