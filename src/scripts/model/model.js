import { get, post } from '../helpers';
import { EventEmitter } from "events";

export default class Model extends EventEmitter {
    constructor() {
        super();
    }

    async geocode(data, options = {}) {
        const result = await ymaps.geocode(data, options);

        return result.geoObjects.get(0);
    }

    async getAddress(data, options = {}) {
        const geoObject = await this.geocode(data, options);

        return geoObject.getAddressLine() || geoObject.properties.get('name');
    }

    async getPlacemarks() {
        let placemarks = await get('/api/placemarks');
        return JSON.parse(placemarks);
    }

    async addPlacemark(placemark) {
        let data = JSON.stringify(placemark);
        return await post('/api/placemarks', data);
    }
}