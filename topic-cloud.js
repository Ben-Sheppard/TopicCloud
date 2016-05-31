var arraySort = require('array-sort'),
    topicJson = arraySort(require('../data/topicData.json').topics, 'volume'),
    positions = ['left','right'],
    urlencode = require('urlencode');
    exports = module.exports = {};

exports.getTopicSentimentColourFromScore = function(sentimentScore) {
    if (sentimentScore < 40) {
        return "red";
    } else if (sentimentScore > 60) {
        return "green";
    } else {
        return "grey";
    }
}

exports.getVolumeForTopic = function(topic) {
    return topic.volume;
}

exports.getWeightForTopic = function(iteration) {
    return iteration / exports.getNumberOfTopicsPerTextSize();
}

exports.getNumberOfTopicsPerTextSize = function() {
    return exports.getNumberOfTopicsInJson() / exports.getLevelsOfTopicWordSize();
}

exports.getNumberOfTopicsInJson = function() {
    return topicJson.length;
}

exports.getLevelsOfTopicWordSize = function() {
    return 6;
}

exports.getRandomPositionForTopic = function() {
    return positions[Math.floor(Math.random() * positions.length)];
}

exports.getVolumeOfPositiveSentimentForTopic = function(topic) {
    return topic.sentiment.positive || 0;
}

exports.getVolumeOfNeutralSentimentForTopic = function(topic) {
    return topic.sentiment.neutral || 0;
}

exports.getVolumeOfNegativeSentimentForTopic = function(topic) {
    return topic.sentiment.negative || 0;
}

exports.getRefinedTopicDataFromDataSource = function() {
    var parsedData = [];
    for (topic in topicJson) {
        parsedData.push({
            'id': topicJson[topic].id,
            'label': topicJson[topic].label,
            'volume': exports.getVolumeForTopic(topicJson[topic]),
            'weight': parseInt(exports.getWeightForTopic(topic)) + 1,
            'position': exports.getRandomPositionForTopic(),
            'sentimentColour': exports.getTopicSentimentColourFromScore(topicJson[topic].sentimentScore),
            'positiveSentimentVolume': exports.getVolumeOfPositiveSentimentForTopic(topicJson[topic]),
            'neutralSentimentVolume': exports.getVolumeOfNeutralSentimentForTopic(topicJson[topic]),
            'negativeSentimentVolume': exports.getVolumeOfNegativeSentimentForTopic(topicJson[topic])
        });
    }
    return parsedData;
}

exports.getRefinedTopicDataForASpecificId = function(id) {
    var singleTopicData = [];
    for (topic in topicJson) {
        if (topicJson[topic].id == id) {
            singleTopicData.push({
                'id': topicJson[topic].id,
                'label': topicJson[topic].label,
                'volume': exports.getVolumeForTopic(topicJson[topic]),
                'positiveSentimentVolume': exports.getVolumeOfPositiveSentimentForTopic(topicJson[topic]),
                'neutralSentimentVolume': exports.getVolumeOfNeutralSentimentForTopic(topicJson[topic]),
                'negativeSentimentVolume': exports.getVolumeOfNegativeSentimentForTopic(topicJson[topic])
            });
        }
    }
    return singleTopicData;
}

exports.getDataFromFile = function() {
    return exports.getRefinedTopicDataFromDataSource();
}

exports.getTopicDataForId = function(id) {
    return exports.getRefinedTopicDataForASpecificId(id);
}

