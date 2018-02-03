export function initialize(appInstance) {
  let session = appInstance.lookup('service:session');
  session.loadToken();
  injectSession(appInstance);
}

function injectSession(appInstance) {
  [
    'adapter',
    'controller',
    'route',
  ].forEach((type) => {
    appInstance.inject(type, 'session', 'service:session');
  });
}

export default {
  initialize
};
