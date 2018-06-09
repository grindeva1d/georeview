const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dbURI = 'mongodb://localhost:27017/georeview';

//
mongoose.Promise = global.Promise;

//
const placemarkSchema = new Schema({
    coords: {
        type: Array,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date().toLocaleString()
    }
});

const Placemark = mongoose.model('placemark', placemarkSchema);

exports.getPlacemarks = () => {
    return new Promise((resolve, reject) => {

        mongoose.connect(dbURI);

        Placemark.find({})
            .then((response) => {
                mongoose.disconnect();
                resolve(response);
            })
            .catch((err) => {
                mongoose.disconnect();
                reject(err);
            })
    });
}

exports.addPlacemark = (data) => {
    return new Promise((resolve, reject) => {

        mongoose.connect(dbURI);

        Placemark.findOne({ coords: data.coords })
            .then((response) => {

                Placemark.create(data)
                    .then((response) => {
                        mongoose.disconnect();
                        resolve(response);
                    })
                    .catch((err) => {
                        mongoose.disconnect();
                        reject(err);
                    });

            })
            .catch((err) => {
                mongoose.disconnect();
                reject(err);
            })
    });
}