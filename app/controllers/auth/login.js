import Controller from '@ember/controller';

export default Controller.extend({
  email: null,
  password: null,
  previousTransition: null,

  actions: {
    login() {
      let email = this.get('email');
      let password = this.get('password');
      let session = this.get('session');

      session.login(email, password).then(() => {
        session.requestUser().then(() => {
          let previousTransition = this.get('previousTransition');
          if (previousTransition) {
            this.set('previousTransition', null);
            previousTransition.retry();
          } else {
            this.transitionToRoute('index');
          }
        });

      }).catch((responseError) => {

      }).finally(() => {

      });
    }
  }
});
