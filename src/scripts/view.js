import { EventEmitter } from './helpers';
import balloonTemplate from '../templates/balloon.hbs';
import CustomBalloon from './model/balloon';

export default class View extends EventEmitter {
    constructor() {
        super();

        this.ymaps = ymaps;
        this.ymaps.ready(this.handleReadyDocument.bind(this));

        this.on('ready', this.inizializeMap.bind(this));
    }

    handleReadyDocument() {
        this.map = new this.ymaps.Map('map', {
            center: [59.939095, 30.315868], // Санкт-Петербург
            zoom: 10
        });

        this.clusterer = new this.ymaps.Clusterer({
            preset: 'islands#invertedVioletClusterIcons',
            clusterDisableClickZoom: true,
            openBalloonOnClick: false
        });

        this.map.geoObjects.add(this.clusterer);

        this.emit('ready', this.map);
    }

    handlerClick(e) {
        const coords = e.get('coords');

        const data = { address: 'Невский пр., 78, Санкт-Петербург, 191025',  };
        const html = balloonTemplate(data);

        const balloonLayout = ymaps.templateLayoutFactory.createClass(html, CustomBalloon);

        this.map.balloon.open(coords, 'content', { layout: balloonLayout });
    }

    inizializeMap() {
        if (this.map) {

            this.map.events.add('click', this.handlerClick.bind(this));

        }
    }
}