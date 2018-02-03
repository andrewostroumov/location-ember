import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.JSONAPIAdapter.extend({
  host: 'http://localhost:3000',
  namespace: 'api/v1',
  headers: computed('session.token', function() {
    return {
      'Authorization': this.get('session.token')
    };
  }),

  login(email, password) {
    return this.ajax(this.loginUrl(), 'POST', { data: { auth: { email: email, password: password }}});
  },

  requestUser() {
    return this.ajax(this.requestUserUrl());
  },

  loginUrl() {
    return `${this.host}/auth/login`;
  },

  requestUserUrl() {
    return this.buildURL('user').singularize();
  }
});
