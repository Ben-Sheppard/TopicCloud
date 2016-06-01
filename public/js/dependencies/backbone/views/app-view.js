var app = app || {};

$(function () {
    app.TopicCloud = Backbone.View.extend({
        el: '.topic',
        initialize: function() {
            app.TopicCloudCollection = Backbone.Collection.extend({
                url: 'http://localhost:3000/data/topics',
                parse: function (response) {
                    return _.shuffle(response);
                }
            });

            var topics = new app.TopicCloudCollection;
            topics.fetch({
                reset:true,
                success: function (collection) {
                    collection.each(function(item) {
                        this.$(".topicCloud").append(
                            "<li class='topicItem topic-size-" + item.get("weight") +
                            " topic-sentiment-" + item.get("sentimentColour") +
                            " topic-position-" + item.get("position") + "' data-id='" + encodeURIComponent(item.get("id")).replace(/[!'()*]/g, escape) + "'>" +
                                item.get("label") +
                            "</li>"
                        );
                    });
                }
            });

            app.topicInformation = Backbone.Collection.extend({
                url: 'http://localhost:3000/data/topic/information',
                parse: function (response) {
                    return response;
                }
            });
        },
        events: {
            'click .topicItem':'topicClicked'
        },
        topicClicked: function(e){
            var topicInformation = new app.topicInformation;
            topicInformation.fetch({
                data: $.param({id: decodeURIComponent($(e.target).attr("data-id"))}),
                reset:true,
                success: function (collection) {
                    collection.each(function(item) {
                        this.$(".topicInformation").html(
                            "Information for: " + item.get("label") + " <br/><br />Total Mentions: " + item.get("volume") +
                                "<br /><br />Positive Sentiment Volume: " + item.get("positiveSentimentVolume") +
                                "<br />Neutral Sentiment Volume: " + item.get("neutralSentimentVolume") +
                                "<br />Negative Sentiment Volume: " + item.get("negativeSentimentVolume")
                        );
                    });
                }
            });
        },
    });
});