const express = require('express');
const url = require('url');
const fs = require('fs');
const bodyParser = require('body-parser');
const db = require('./db');
const path = require('path');

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static(path.resolve(__dirname + '/../dist')));

app.use((request, response, next) => {
    var now = new Date();
    var hour = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`;
    console.log(data);
    fs.appendFile("server.log", data + "\n");
    next();
});

app.get('/api/placemarks', (request, response) => {

    db.getPlacemarks()
    .then((data) => {
        response.send(data);
    })
    .catch((reason) => {
        response.statusCode = 400;
        response.send(reason);
    });

});

app.post('/api/placemarks', jsonParser, function (request, response) {

    if (!request.body) return response.sendStatus(400);

    let placemark = {};
    placemark.coords = request.body.coords;
    placemark.address = request.body.address;
    placemark.firstName = request.body.firstName,
    placemark.place = request.body.place,
    placemark.review = request.body.review,
    placemark.date = request.body.date

    db.addPlacemark(placemark)
    .then((data) => {
        response.send(data);
    })
    .catch((reason) => {
        response.statusCode = 400;
        response.send(reason);
    });    
});

app.listen(3000, '', () => console.log('start'));