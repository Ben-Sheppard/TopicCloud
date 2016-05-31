var express = require('express'),
    app = express(),
    port = 3000,
    topic = require('./topic-cloud');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/data/topics', (request, response) => {
    response.send(topic.getDataFromFile());
});

app.get('/data/topic/information', (request, response) => {
    response.send(topic.getTopicDataForId(request.query.id));
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened: ', err);
    }
    console.log(`server is listening on ${port}`);
});