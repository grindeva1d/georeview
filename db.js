const mongoClient = require('mongodb').MongoClient;

exports.getPlacemarks = () => {
    return new Promise((resolve, reject) => {
        mongoClient.connect('mongodb://localhost:27017', (err, client) => {

            if (err) reject(err);

            const db = client.db('georeviews');
            const placemarksCollection = db.collection('placemarks');

            placemarksCollection.find().toArray((err, results) => {

                client.close();
                if (err) reject(err);
                resolve(results);

            });

        });
    });
}

exports.addPlacemark = (data) => {
    return new Promise((resolve, reject) => {
        mongoClient.connect('mongodb://localhost:27017', (err, client) => {

            if (err) reject(err);

            const db = client.db('georeviews');
            const placemarksCollection = db.collection('placemarks');

            placemarksCollection.insertOne(data, (err, results) => {

                if (err) reject(err);
                resolve(results);

            });

        });
    });
}