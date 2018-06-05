import { EventEmitter } from "events";

export default class Model extends EventEmitter {
    constructor() {
        super();
    }

    setMap(map) {
        this.map = map;
    }
}