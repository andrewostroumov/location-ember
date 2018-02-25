import Component from '@ember/component';
import { observer } from '@ember/object';
import { once } from '@ember/runloop';

export default Component.extend({
  options: {
    center: {
      lat: 50.450580,
      lng: 30.522575
    },
    disableDefaultUI: true,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER
    },
    draggableCursor: 'default',
    zoom: 12
  },

  onLocationsChange: observer('locations.[]', function() {
    once(this, 'processLocations');
  }),

  processLocations() {
    this.cleanPrevLocations();
    this.renderLocations();
    let locations = this.get('locations');
    this.set('prevLocations', locations);
  },

  didInsertElement() {
    this._super(...arguments);

    if (!this.get('map')) {
      let canvas = this.$().find('.g-map-canvas').get(0);
      let options = this.get('options');
      this.set('map', new google.maps.Map(canvas, options));
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setCenter(position.coords.latitude, position.coords.longitude);
      });
    }
  },

  setZoom(zoom) {
    let map = this.get('map');
    if (map) {
      map.setZoom(zoom);
    }
  },

  setCenter(lat, lng) {
    let map = this.get('map');
    if (map && lat && lng) {
      let center = new google.maps.LatLng(lat, lng);
      map.setCenter(center);
    }
  },

  cleanPrevLocations() {
    let prevLocations = this.get('prevLocations');
    if (!prevLocations) { return }

    prevLocations = prevLocations.filter((location) => {
      return location.get('marker');
    });

    prevLocations.forEach((location) => {
      let marker = location.get('marker');
      marker.setMap(null);
    });
  },

  // TODO: change map zoom
  // https://github.com/asennikov/ember-g-map/blob/master/addon/components/g-map.js#L127
  renderLocations() {
    let map = this.get('map');
    if (!map) { return }

    let locations = this.get('locations');
    if (!locations) { return }

    locations = locations.filter((location) => {
      return location.get('lat') && location.get('lng');
    });

    locations.forEach((location) => {
      let latLng = { lat: location.get('lat'), lng: location.get('lng') };
      let marker = new google.maps.Marker({
        position: latLng,
        map: map
      });
      location.set('marker', marker);
    });
  }
});
