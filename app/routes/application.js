import Route from '@ember/routing/route';

export default Route.extend({
  //NOTE: this occurs twice with transition
  beforeModel(transition) {
    let loginController = this.controllerFor('auth.login');

    if (!this.get('session').token) {
      if (!transition.targetName.match("^auth.")) {
        loginController.set('previousTransition', transition);
        this.transitionTo('auth.login');
      }
      return;
    }

    return this.get('session').requestUser().then(() => {
      if (transition.targetName.match("^auth.")) {
        this.transitionTo('index');
      }
    }).catch(() => {
      if (!transition.targetName.match("^auth.")) {
        loginController.set('previousTransition', transition);
        this.transitionTo('auth.login');
      }
    });
  }
});
