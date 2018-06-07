import { EventEmitter } from "events";

export default class Model extends EventEmitter {
    constructor() {
        super();
    }

    setMap(map) {
        this.map = map;
        this.placemarks = new Map();
    }

    async geocode(data, options = {}) {
        const result = await ymaps.geocode(data, options);

        return result.geoObjects.get(0);
    }

    async getAddress(data, options = {}) {
        const geoObject = await this.geocode(data, options);

        return geoObject.getAddressLine() || geoObject.properties.get('name');
    }

    addPlacemark({ firstName, place, review, coords, address }) {
        this.placemarks[coords] = this.placemarks[coords] || [];
        this.placemarks[coords].push({ address, firstName, place, review });
        return this.placemarks[coords];
    }
}