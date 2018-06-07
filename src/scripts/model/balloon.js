export default {

    build: function () {
        this.constructor.superclass.build.call(this);

        this._$element = this.getParentElement().querySelector('.balloon');

        this._$closeElement = this._$element.querySelector('#close');
        this._$closeEvent = this.onCloseClick.bind(this);
        this._$closeElement.addEventListener('click', this._$closeEvent);

        this._$submitElement = this._$element.querySelector('form');
        this._$submitEvent = this.onSubmit.bind(this);
        this._$inputEvent = this.onInput.bind(this);
        this._$submitElement.addEventListener('submit', this._$submitEvent);
        this._$submitElement.addEventListener('input', this._$inputEvent);       

        this.data = this.getData();
    },

    clear: function () {
        this._$closeElement.removeEventListener('click', this._$closeEvent);
        this._$submitElement.removeEventListener('click', this._$submitEvent);

        this.constructor.superclass.clear.call(this);
    },

    // Используется для автопозиционирования (balloonAutoPan)
    getShape: function () {
        const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = this._$element;

        return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
            [offsetLeft, offsetTop], [offsetLeft + offsetWidth, offsetTop + offsetHeight]
        ]));
    },

    onCloseClick: function (e) {
        e.preventDefault();

        this.events.fire('userclose');
    },

    onInput: function (e) {
        e.preventDefault();

        this.data[e.target.name] = e.target.value;
    },

    onSubmit: function (e) {
        e.preventDefault();

        this.data.date = new Date().toLocaleString();
        this.data.balloon.events.fire('submit', this.data);
    }
}