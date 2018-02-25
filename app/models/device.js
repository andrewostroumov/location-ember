import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  deviceId: DS.attr('string'),
  manufacturer: DS.attr('string'),
  model: DS.attr('string'),
  androidRelease: DS.attr('string'),

  name: computed('manufacturer', 'model', function () {
    let manufacturer = this.get('manufacturer').capitalize();
    let model = this.get('model');
    return `${manufacturer} ${model}`;
  })
});
