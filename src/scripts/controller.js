export default class Controller {
    constructor(model, view) {

        this.model = model;
        this.view = view;

        this.view.on('ready', this.model.setMap.bind(this.model));
        this.view.on('click', this.onMapClick.bind(this));
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
}