export default class Controller {
    constructor(model, view) {

        this.model = model;
        this.view = view;

        this.view.on('ready', this.model.setMap.bind(this.model));
    }
}