export default {

    build: function() {
        this.constructor.superclass.build.call(this);

        this._$element = this.getParentElement().querySelector('.balloon');

        this._$closeElement = this._$element.querySelector('#close');
        this._$closeEvent = this.onCloseClick.bind(this);
        this._$closeElement.addEventListener('click', this._$closeEvent);

        this._$submitElement = this._$element.querySelector('#submit');
        this._$submitEvent = this.onSubmit.bind(this);
        this._$submitElement.addEventListener('click', this._$submitEvent);
    },

    clear: function () {
        this._$closeElement.removeEventListener('click', this._$closeEvent);
        this._$submitElement.removeEventListener('click', this._$submitEvent);

        this.constructor.superclass.clear.call(this);
    },

    onCloseClick: function(e) {
        e.preventDefault();
        
        this.events.fire('userclose');
    },

    onSubmit: function(e) {
        e.preventDefault();
        
        this.events.fire('submit');
    }
}