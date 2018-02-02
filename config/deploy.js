/* eslint-env node */
'use strict';

module.exports = function(deployTarget) {
  let ENV = {
    build: {
      environment: deployTarget
    },
    pipeline: {
      activateOnDeploy: true
    }
  };

  if (deployTarget === 'development') {
  }

  if (deployTarget === 'staging') {
  }

  if (deployTarget === 'production') {
    ENV['s3'] = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      bucket: 'location-ember',
      region: 'eu-central-1'
    };

    ENV['s3-index'] = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      bucket: 'location-ember-index',
      region: 'eu-central-1'
    };
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
