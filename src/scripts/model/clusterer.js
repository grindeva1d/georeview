export default {

    build: function () {
        this.constructor.superclass.build.call(this);

        this._$element = this.getParentElement().querySelector('.clusterer_balloon');

        this._$anchorElement = this._$element.querySelector('.clusterer_balloon_body > a');
        this._$clickEvent = this.onClick.bind(this);
        this._$anchorElement.addEventListener('click', this._$clickEvent);

        this.data = this.getData().properties.getAll();
    },

    onClick: function(e) {
        e.preventDefault();

        if (this.data.map) {
            this.data.map.events.fire('link', this.data);
        }
    }
}