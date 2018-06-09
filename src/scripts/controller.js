export default class Controller {
    constructor(model, view) {

        this.model = model;
        this.view = view;

        this.view.on('ready', this.onMapReady.bind(this));
        this.view.on('click', this.onMapClick.bind(this));
        this.view.on('submit', this.onMapSubmit.bind(this));
    }

    async onMapReady([event]) {

        let placemarks = await this.model.getPlacemarks();
        this.view.render(placemarks);

    }

    async onMapClick([event]) {

        const coords = event.get('coords');
        const address = await this.model.getAddress(coords);

        let data = {};
        data.coords = coords;
        data.address = address;
        data.reviews = [];

        this.view.openBalloon(data);

    }

    async onMapSubmit([data]) {

        const placemark = {};

        placemark.address = data.address;
        placemark.coords = data.coords;
        placemark.date = data.date;
        placemark.firstName = data.firstName;
        placemark.place = data.place;
        placemark.review = data.review;

        await this.model.addPlacemark(placemark);
    }
}