import { EventEmitter } from './helpers';
import balloonTemplate from '../templates/yballoon.html';
import placemarkTemplate from '../templates/yplacemark.html';
import clustererTemplate from '../templates/yclusterer.html';
import Balloon from './model/balloon';
import Cluster from './model/clusterer';

export default class View extends EventEmitter {
    constructor() {
        super();

        this.placemarks = new Map();

        ymaps.ready(this.handleReadyDocument.bind(this));

        this.on('ready', this.inizializeMap.bind(this));
    }

    handleReadyDocument() {

        // Создание карты
        this.map = new ymaps.Map('map', {
            center: [59.939095, 30.315868], // Санкт-Петербург
            zoom: 15
        }, {
                searchControlProvider: 'yandex#search'
            });

        // Добавление шаблонов
        ymaps.layout.storage.add('my#balloonlayout', ymaps.templateLayoutFactory.createClass(balloonTemplate, Balloon));
        ymaps.layout.storage.add('my#placemarklayout', ymaps.templateLayoutFactory.createClass(placemarkTemplate, Balloon));
        ymaps.layout.storage.add('my#clustererlayout', ymaps.templateLayoutFactory.createClass(clustererTemplate, Cluster));

        // Создание кластера
        this.clusterer = new ymaps.Clusterer({
            preset: 'islands#invertedVioletClusterIcons',
            clusterDisableClickZoom: true,
            clusterOpenBalloonOnClick: true,
            clusterBalloonContentLayout: 'cluster#balloonCarousel',
            clusterBalloonItemContentLayout: 'my#clustererlayout',
            clusterBalloonPanelMaxMapArea: 0,
            clusterBalloonContentLayoutWidth: 300,
            clusterBalloonPagerSize: 5
        });

        this.map.geoObjects.add(this.clusterer);

        this.emit('ready', this.map);
    }

    handlerClick(e) {
        this.emit('click', e);
    }

    addPlacemark(data) {
        let placemarkData = Object.assign(data, { reviews: [{ firstName: data.firstName, place: data.place, review: data.review }] });

        const key = data.coords + '';
        if (this.placemarks.has(key)) {
            let placemark = this.placemarks.get(key);
            placemarkData.reviews = [...placemark.reviews, ...placemarkData.reviews];
            this.placemarks.set(key, placemarkData);
        } else {
            this.placemarks.set(key, placemarkData);
        }

        let placemark = new ymaps.Placemark(data.coords, placemarkData, {
            balloonLayout: "my#placemarklayout"
        });

        placemark.events.add('click', (e) => { e.preventDefault(); this.openBalloon(placemarkData); });

        this.clusterer.add(placemark);
        return placemarkData;
    }

    handlerSubmit({ originalEvent }) {
        const newPlacemark = this.addPlacemark(originalEvent);

        this.map.balloon.setData(newPlacemark);
        this.emit('submit', newPlacemark);
    }

    handlerLink({ originalEvent }) {
        const key = originalEvent.coords + '';

        if (key && this.placemarks.has(key)) {
            const placemarkData = this.placemarks.get(key)

            this.map.balloon.open(originalEvent.coords, placemarkData, { layout: 'my#balloonlayout' });
        }
    }

    inizializeMap() {
        if (this.map) {
            this.map.events.add('click', this.handlerClick.bind(this));
            this.map.events.add('link', this.handlerLink.bind(this));
            this.map.balloon.events.add('submit', this.handlerSubmit.bind(this));
        }
    }

    openBalloon(data) {
        this.map.balloon.open(data.coords, Object.assign(data, { map: this.map, balloon: this.map.balloon }), { layout: 'my#balloonlayout' });
    }

    render(placemarks) {

        const newPlacemarks = placemarks
        .map((placemark) => {
            placemark.map = this.map;
            placemark.balloon = this.map.balloon;
            let _pl = new ymaps.Placemark(placemark.coords, placemark, { balloonLayout: "my#placemarklayout" })

            _pl.events.add('click', (e) => { e.preventDefault(); this.openBalloon(placemark); });
            return _pl;
        });

        this.clusterer.add(newPlacemarks);

    }
}