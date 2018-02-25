import Controller from '@ember/controller';
import moment from 'moment';
import { observer } from '@ember/object';
import { once } from '@ember/runloop';

export default Controller.extend({
  device: null,
  date: null,
  locations: null,


  handleRequestLocations: observer('device', 'date', function() {
    once(this, 'requestLocations');
  }),

  requestLocations() {
    let device = this.get('device');
    let date = this.get('date');

    if (device === null || date === null) {
      return;
    }

    let momentDate = moment(date).format('YYYY-MM-DD');
    this.store.query('location', { device_id: device.get('id'), date: momentDate }).then((locations) => {
      this.set('locations', locations);
    }).catch((responseError) => {
    //  TODO: show notification
    });
  }
});
