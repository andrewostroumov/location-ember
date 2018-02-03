import Service from '@ember/service';
import { inject as service } from '@ember/service';
const tokenKey = 'token';

export default Service.extend({
  store: service(),
  token: null,
  user:  null,

  login(email, password) {
    return this.adapter().login(email, password).then((data) => {
      this.saveToken(data.jwt);
    });
  },

  requestUser() {
    return this.adapter().requestUser().then((data) => {
      this.get('store').pushPayload(data);
      let user = this.get('store').peekAll('user').objectAt(0);
      this.set('user', user);
      return user;
    });
  },

  adapter() {
    return this.get('store').adapterFor('application');
  },

  saveToken(token) {
    localStorage.setItem(tokenKey, token);
    this.set('token', token);
  },

  loadToken() {
    let token = localStorage.getItem(tokenKey);
    this.set('token', token);
  }
});
