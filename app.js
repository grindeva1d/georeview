const express = require('express');
const url = require('url');
const fs = require('fs');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static(__dirname + '/dist'));

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
        
    });
});

app.post('/api/placemarks', jsonParser, function (request, response) {

    if (!request.body) return response.sendStatus(400);

    let placemark = {};
    placemark.coords = request.body.coords;
    placemark.address = request.body.address;
    placemark.date = request.body.date;
    placemark.reviews = [{
        firstName: request.body.firstName,
        place: request.body.place,
        review: request.body.review
    }];

    console.log(request.body);
    console.log(placemark);

    db.addPlacemarks(placemark)
    .then((data) => {
        response.send(data);
    })
    .catch((reason) => {
        
    });    
});

app.listen(3000, '', () => console.log('start'));